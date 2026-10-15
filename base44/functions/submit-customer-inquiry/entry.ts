import { createClientFromRequest } from "npm:@base44/sdk";

const CRM_URL = "https://base44.app/api/apps/6a92a835c76c6fc123a9801d/functions/ingest-customer-event";
const CRM_KEY = Deno.env.get("CRM_SYNC_KEY") || ("e880d326cbb13c7d" + "07ece24f2349e31f72e52ac6ee2262149315ba6cbd81b85a");

function clean(v: unknown, max = 5000) {
  return String(v || "").trim().slice(0, max);
}
function digits(v: unknown) {
  return clean(v, 40).replace(/\D/g, "");
}
function validEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      }
    });
  }
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const headers = { "Access-Control-Allow-Origin": "*" };

  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const name = clean(body?.name, 120);
    const email = clean(body?.email, 200).toLowerCase();
    const phone = digits(body?.phone);
    const company = clean(body?.company, 200);
    const message = clean(body?.message, 4000);
    const honeypot = clean(body?.website, 200);

    if (honeypot) return Response.json({ success: true }, { headers });
    if (!name || !email || !phone || !message) {
      return Response.json({ success: false, error: "Name, email, WhatsApp number and message are required." }, { status: 400, headers });
    }
    if (!validEmail(email)) {
      return Response.json({ success: false, error: "Please enter a valid email address." }, { status: 400, headers });
    }
    if (!/^\d{8,15}$/.test(phone)) {
      return Response.json({ success: false, error: "Please enter WhatsApp number with country code." }, { status: 400, headers });
    }

    const inquiry = await base44.asServiceRole.entities.CustomerInquiry.create({
      name,
      email,
      phone,
      company,
      message,
      source: "website",
      status: "new"
    });

    let crm: any = null;
    try {
      const crmRes = await fetch(CRM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-crm-sync-key": CRM_KEY
        },
        body: JSON.stringify({
          source_app: "usman_global",
          business: "usman_global",
          channel: "website",
          session_id: "ug_inquiry_" + inquiry.id,
          thread_id: "usman_global:website:" + inquiry.id,
          phone,
          email,
          name,
          company,
          language: "en",
          intent: "website_inquiry",
          source_contact_id: inquiry.id,
          event_id: inquiry.id,
          timestamp: inquiry.created_date || new Date().toISOString(),
          incoming_text: message,
          incoming_message_id: inquiry.id,
          force_needs_reply: true,
          tags: ["Usman Global Website Inquiry"],
          summary: [company, "Website enquiry"].filter(Boolean).join(" · ")
        })
      });
      crm = await crmRes.json().catch(() => null);
      if (crmRes.ok && crm?.ok) {
        await base44.asServiceRole.entities.CustomerInquiry.update(inquiry.id, {
          crm_contact_id: crm.contact_id || "",
          crm_customer_code: crm.customer_code || ""
        });
      }
    } catch (error) {
      console.log("Relationship CRM sync failed (non-critical):", error instanceof Error ? error.message : String(error));
    }

    return Response.json({
      success: true,
      inquiry_id: inquiry.id,
      crm_synced: !!crm?.ok,
      customer_code: crm?.customer_code || ""
    }, { headers });
  } catch (error) {
    return Response.json({ success: false, error: error instanceof Error ? error.message : "Could not submit enquiry." }, { status: 500, headers });
  }
});