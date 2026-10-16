import { createClientFromRequest } from "npm:@base44/sdk";

const TARGET_QUERIES = [
  "used clothing wholesale uae",
  "second hand clothing supplier uae",
  "used clothes exporter uae",
  "used clothing bales wholesale",
  "wholesale second hand clothes",
  "used clothing supplier sharjah",
  "used clothes bulk supplier",
  "used clothing grading uae",
  "used clothing sorting uae",
  "usman global",
];

function toDateOnly(date: Date) {
  return date.toISOString().slice(0, 10);
}

function defaultRange() {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 2);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 27);
  return { startDate: toDateOnly(start), endDate: toDateOnly(end) };
}

async function jsonOrThrow(response: Response) {
  const text = await response.text();
  let data: any = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!response.ok) {
    throw new Error(data?.error?.message || data?.message || `Google API error ${response.status}`);
  }
  return data;
}

async function querySearchAnalytics(accessToken: string, siteUrl: string, body: Record<string, any>) {
  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  return jsonOrThrow(response);
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || !["admin", "content_manager"].includes(user.role)) {
      return Response.json({ error: "Admin or content-manager access required." }, { status: 403 });
    }

    let connection;
    try {
      connection = await base44.asServiceRole.connectors.getConnection("google_search_console");
    } catch {
      return Response.json({
        connected: false,
        error: "Google Search Console is not connected yet.",
      }, { status: 409 });
    }

    const { accessToken } = connection;
    const payload = await req.json().catch(() => ({}));
    const fallback = defaultRange();
    const startDate = payload.startDate || fallback.startDate;
    const endDate = payload.endDate || fallback.endDate;

    const sitesResponse = await fetch("https://www.googleapis.com/webmasters/v3/sites", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const sitesData = await jsonOrThrow(sitesResponse);
    const sites = (sitesData.siteEntry || []).map((site: any) => ({
      siteUrl: site.siteUrl,
      permissionLevel: site.permissionLevel,
    }));

    const requestedSite = payload.siteUrl;
    const matchingSite = requestedSite
      ? sites.find((s: any) => s.siteUrl === requestedSite)
      : sites.find((s: any) => String(s.siteUrl).toLowerCase().includes("usmanglobal.com"));

    if (!matchingSite) {
      return Response.json({
        connected: true,
        propertyFound: false,
        sites,
        startDate,
        endDate,
        error: "No Search Console property containing usmanglobal.com is available to this Google account.",
      });
    }

    const siteUrl = matchingSite.siteUrl;
    const baseBody = { startDate, endDate, type: "web" };

    const [summaryData, topQueriesData, topPagesData, dailyData] = await Promise.all([
      querySearchAnalytics(accessToken, siteUrl, {
        ...baseBody,
        aggregationType: "auto",
      }),
      querySearchAnalytics(accessToken, siteUrl, {
        ...baseBody,
        dimensions: ["query"],
        rowLimit: 100,
      }),
      querySearchAnalytics(accessToken, siteUrl, {
        ...baseBody,
        dimensions: ["page"],
        rowLimit: 50,
      }),
      querySearchAnalytics(accessToken, siteUrl, {
        ...baseBody,
        dimensions: ["date"],
        rowLimit: 100,
      }),
    ]);

    const targetResults = await Promise.all(TARGET_QUERIES.map(async (query) => {
      const result = await querySearchAnalytics(accessToken, siteUrl, {
        ...baseBody,
        dimensions: ["query"],
        dimensionFilterGroups: [{
          groupType: "and",
          filters: [{ dimension: "query", operator: "equals", expression: query }],
        }],
        rowLimit: 10,
      });
      const row = result.rows?.[0];
      return {
        query,
        clicks: row?.clicks || 0,
        impressions: row?.impressions || 0,
        ctr: row?.ctr || 0,
        position: row?.position ?? null,
      };
    }));

    const summaryRow = summaryData.rows?.[0] || {};

    return Response.json({
      connected: true,
      propertyFound: true,
      siteUrl,
      permissionLevel: matchingSite.permissionLevel,
      startDate,
      endDate,
      metrics: {
        clicks: summaryRow.clicks || 0,
        impressions: summaryRow.impressions || 0,
        ctr: summaryRow.ctr || 0,
        position: summaryRow.position ?? null,
      },
      targetQueries: targetResults,
      topQueries: (topQueriesData.rows || []).map((row: any) => ({
        query: row.keys?.[0] || "",
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: row.ctr || 0,
        position: row.position ?? null,
      })),
      topPages: (topPagesData.rows || []).map((row: any) => ({
        page: row.keys?.[0] || "",
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: row.ctr || 0,
        position: row.position ?? null,
      })),
      daily: (dailyData.rows || []).map((row: any) => ({
        date: row.keys?.[0] || "",
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: row.ctr || 0,
        position: row.position ?? null,
      })),
      availableSites: sites,
    });
  } catch (error) {
    console.error("search-console-baseline error", error);
    return Response.json({ error: error?.message || "Unable to load Search Console data." }, { status: 500 });
  }
});
