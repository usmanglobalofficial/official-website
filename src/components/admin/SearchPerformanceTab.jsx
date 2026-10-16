import { useEffect, useMemo, useState } from 'react';
import { base44 } from '@/api/base44Client';
import {
  BarChart3,
  RefreshCw,
  Save,
  Loader2,
  Search,
  Eye,
  MousePointerClick,
  TrendingUp,
  History,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function defaultDates() {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 2);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 27);
  return { startDate: isoDate(start), endDate: isoDate(end) };
}

function pct(value) {
  return `${((value || 0) * 100).toFixed(2)}%`;
}

function position(value) {
  return value == null ? '—' : Number(value).toFixed(1);
}

function safeParse(value, fallback = {}) {
  try { return JSON.parse(value || ''); } catch { return fallback; }
}

function MetricCard({ icon: Icon, label, value, help }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-muted-foreground">{label}</div>
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </div>
      <div className="text-3xl font-bold text-foreground font-playfair">{value}</div>
      <div className="text-xs text-muted-foreground mt-2">{help}</div>
    </div>
  );
}

export default function SearchPerformanceTab({ isAdmin = false }) {
  const initialDates = useMemo(() => defaultDates(), []);
  const [startDate, setStartDate] = useState(initialDates.startDate);
  const [endDate, setEndDate] = useState(initialDates.endDate);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snapshots, setSnapshots] = useState([]);
  const [snapshotLabel, setSnapshotLabel] = useState('Baseline Before External SEO Work');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const loadSnapshots = async () => {
    try {
      const rows = await base44.entities.SeoPerformanceSnapshot.list('-created_date', 30);
      setSnapshots(rows || []);
    } catch {
      setSnapshots([]);
    }
  };

  const loadPerformance = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await base44.functions.invoke('search-console-baseline', { startDate, endDate });
      const result = response?.data || response;
      if (!result?.connected) {
        setData(null);
        setError(result?.error || 'Google Search Console is not connected yet.');
      } else if (!result?.propertyFound) {
        setData(result);
        setError(result?.error || 'Usman Global was not found in the connected Search Console account.');
      } else {
        setData(result);
      }
    } catch (err) {
      const result = err?.response?.data;
      setData(null);
      setError(result?.error || err?.message || 'Unable to load Search Console data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSnapshots();
    loadPerformance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasPerformanceData = Number(data?.metrics?.impressions || 0) > 0;

  const saveSnapshot = async () => {
    if (!isAdmin || !data?.propertyFound || !hasPerformanceData || !snapshotLabel.trim()) return;
    setSaving(true);
    setSaved(false);
    try {
      let capturedBy = 'Unknown user';
      try {
        const user = await base44.auth.me();
        capturedBy = user.full_name || user.email || capturedBy;
      } catch {}

      await base44.entities.SeoPerformanceSnapshot.create({
        label: snapshotLabel.trim(),
        period_start: data.startDate,
        period_end: data.endDate,
        site_url: data.siteUrl,
        metrics_json: JSON.stringify(data.metrics || {}),
        target_queries_json: JSON.stringify(data.targetQueries || []),
        top_queries_json: JSON.stringify(data.topQueries || []),
        top_pages_json: JSON.stringify(data.topPages || []),
        notes: 'Saved from Google Search Console for before/after SEO comparison.',
        captured_by_name: capturedBy,
      });
      setSaved(true);
      await loadSnapshots();
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err?.message || 'Unable to save SEO snapshot.');
    } finally {
      setSaving(false);
    }
  };

  const comparison = useMemo(() => {
    if (snapshots.length < 2) return null;
    const latest = snapshots[0];
    const previous = snapshots[1];
    const a = safeParse(latest.metrics_json);
    const b = safeParse(previous.metrics_json);
    return { latest, previous, a, b };
  }, [snapshots]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">SEO Performance Baseline</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Direct Google Search Console measurements. Use the same query set and fixed reporting periods to compare SEO work fairly.
            </p>
            {data?.siteUrl && (
              <div className="text-xs text-muted-foreground mt-2">
                Property: <span className="font-medium text-foreground">{data.siteUrl}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <label className="text-xs text-muted-foreground">
              Start date
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="mt-1 block px-3 py-2 border border-border rounded-lg text-sm text-foreground"
              />
            </label>
            <label className="text-xs text-muted-foreground">
              End date
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="mt-1 block px-3 py-2 border border-border rounded-lg text-sm text-foreground"
              />
            </label>
            <button
              onClick={loadPerformance}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-semibold text-amber-900">Search Console needs attention</div>
            <div className="text-sm text-amber-800 mt-1">{error}</div>
            <div className="text-xs text-amber-700 mt-2">
              Connect the Google account that owns or has access to the usmanglobal.com Search Console property, then press Refresh Data.
            </div>
          </div>
        </div>
      )}

      {loading && !data ? (
        <div className="bg-white rounded-2xl border border-border py-16 flex items-center justify-center">
          <Loader2 className="w-7 h-7 text-primary animate-spin" />
        </div>
      ) : data?.propertyFound ? (
        <>
          {!hasPerformanceData && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-blue-900">Search Console connected — performance baseline not ready yet</div>
                <div className="text-sm text-blue-800 mt-1">
                  This property is connected correctly, but Google has not returned any impressions for the selected period yet. Do not treat these zeros as a real SEO-performance baseline.
                </div>
                <div className="text-xs text-blue-700 mt-2">
                  Keep this screen as the technical activation marker. Save the official “Baseline Before External SEO Work” only after Search Console begins returning genuine impression data.
                </div>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard icon={MousePointerClick} label="Clicks" value={Number(data.metrics?.clicks || 0).toLocaleString()} help="Visits from Google Search" />
            <MetricCard icon={Eye} label="Impressions" value={Number(data.metrics?.impressions || 0).toLocaleString()} help="Times your result appeared" />
            <MetricCard icon={TrendingUp} label="CTR" value={pct(data.metrics?.ctr)} help="Clicks ÷ impressions" />
            <MetricCard icon={Search} label="Average Position" value={position(data.metrics?.position)} help="Lower position is better" />
          </div>

          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="px-6 py-5 border-b border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-bold text-foreground">Fixed Benchmark Queries</h3>
                <p className="text-xs text-muted-foreground mt-1">These stay unchanged so the before/after comparison cannot be manipulated by changing the keyword list.</p>
              </div>
              <div className="text-xs text-muted-foreground">{data.startDate} → {data.endDate}</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="text-left px-5 py-3 font-medium">Query</th>
                    <th className="text-right px-4 py-3 font-medium">Clicks</th>
                    <th className="text-right px-4 py-3 font-medium">Impressions</th>
                    <th className="text-right px-4 py-3 font-medium">CTR</th>
                    <th className="text-right px-5 py-3 font-medium">Avg. Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(data.targetQueries || []).map(row => (
                    <tr key={row.query} className="hover:bg-muted/20">
                      <td className="px-5 py-3 font-medium text-foreground">{row.query}</td>
                      <td className="px-4 py-3 text-right">{row.clicks}</td>
                      <td className="px-4 py-3 text-right">{row.impressions}</td>
                      <td className="px-4 py-3 text-right">{pct(row.ctr)}</td>
                      <td className="px-5 py-3 text-right font-semibold">{position(row.position)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="px-6 py-5 border-b border-border">
                <h3 className="font-bold text-foreground">Top Queries Google Actually Shows</h3>
                <p className="text-xs text-muted-foreground mt-1">Useful for discovering opportunities outside our fixed benchmark list.</p>
              </div>
              <div className="max-h-[420px] overflow-auto divide-y divide-border">
                {(data.topQueries || []).slice(0, 30).map((row, i) => (
                  <div key={`${row.query}-${i}`} className="px-5 py-3 flex items-center justify-between gap-4 text-sm">
                    <div className="min-w-0">
                      <div className="font-medium text-foreground truncate">{row.query}</div>
                      <div className="text-xs text-muted-foreground">{row.impressions} impressions · {row.clicks} clicks</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-foreground">#{position(row.position)}</div>
                      <div className="text-xs text-muted-foreground">{pct(row.ctr)} CTR</div>
                    </div>
                  </div>
                ))}
                {(data.topQueries || []).length === 0 && (
                  <div className="px-5 py-10 text-center text-sm text-muted-foreground">No query data for this period.</div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="px-6 py-5 border-b border-border">
                <h3 className="font-bold text-foreground">Top Landing Pages</h3>
                <p className="text-xs text-muted-foreground mt-1">Shows which pages are earning impressions and clicks from Google.</p>
              </div>
              <div className="max-h-[420px] overflow-auto divide-y divide-border">
                {(data.topPages || []).slice(0, 20).map((row, i) => (
                  <div key={`${row.page}-${i}`} className="px-5 py-3 flex items-center justify-between gap-4 text-sm">
                    <div className="min-w-0">
                      <div className="font-medium text-foreground truncate">{row.page}</div>
                      <div className="text-xs text-muted-foreground">{row.impressions} impressions · {row.clicks} clicks</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-foreground">#{position(row.position)}</div>
                      <div className="text-xs text-muted-foreground">{pct(row.ctr)} CTR</div>
                    </div>
                  </div>
                ))}
                {(data.topPages || []).length === 0 && (
                  <div className="px-5 py-10 text-center text-sm text-muted-foreground">No page data for this period.</div>
                )}
              </div>
            </div>
          </div>

          {isAdmin && (
            <div className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-start gap-3 mb-5">
                <Save className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground">Save This Period as a Locked Comparison Snapshot</h3>
                  <p className="text-xs text-muted-foreground mt-1">A saved snapshot preserves today’s numbers even after future SEO changes.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  value={snapshotLabel}
                  onChange={e => setSnapshotLabel(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm"
                  placeholder="Snapshot label"
                />
                <button
                  onClick={saveSnapshot}
                  disabled={saving || !hasPerformanceData || !snapshotLabel.trim()}
                  title={!hasPerformanceData ? 'Snapshot disabled until Google reports at least one impression.' : undefined}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {hasPerformanceData ? 'Save Snapshot' : 'Waiting for Search Data'}
                </button>
                {saved && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Saved
                  </span>
                )}
              </div>
            </div>
          )}
        </>
      ) : null}

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-6 py-5 border-b border-border flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-bold text-foreground">Saved SEO Snapshots</h3>
            <p className="text-xs text-muted-foreground mt-1">Permanent before/after measurement history.</p>
          </div>
        </div>

        {comparison && (
          <div className="mx-5 mt-5 rounded-xl bg-primary/5 border border-primary/15 p-4">
            <div className="text-sm font-semibold text-foreground">Latest vs Previous Snapshot</div>
            <div className="text-xs text-muted-foreground mt-1">
              {comparison.latest.label} compared with {comparison.previous.label}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
              <div><span className="text-muted-foreground">Clicks:</span> <span className="font-semibold">{comparison.a.clicks || 0} vs {comparison.b.clicks || 0}</span></div>
              <div><span className="text-muted-foreground">Impressions:</span> <span className="font-semibold">{comparison.a.impressions || 0} vs {comparison.b.impressions || 0}</span></div>
              <div><span className="text-muted-foreground">CTR:</span> <span className="font-semibold">{pct(comparison.a.ctr)} vs {pct(comparison.b.ctr)}</span></div>
              <div><span className="text-muted-foreground">Position:</span> <span className="font-semibold">{position(comparison.a.position)} vs {position(comparison.b.position)}</span></div>
            </div>
          </div>
        )}

        <div className="divide-y divide-border">
          {snapshots.map(snapshot => {
            const metrics = safeParse(snapshot.metrics_json);
            return (
              <div key={snapshot.id} className="px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <div>
                  <div className="font-semibold text-foreground">{snapshot.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {snapshot.period_start} → {snapshot.period_end} · {snapshot.site_url}
                  </div>
                  {snapshot.captured_by_name && (
                    <div className="text-xs text-muted-foreground mt-1">Saved by {snapshot.captured_by_name}</div>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4 text-center text-xs">
                  <div><div className="font-bold text-foreground text-base">{metrics.clicks || 0}</div><div className="text-muted-foreground">Clicks</div></div>
                  <div><div className="font-bold text-foreground text-base">{metrics.impressions || 0}</div><div className="text-muted-foreground">Impressions</div></div>
                  <div><div className="font-bold text-foreground text-base">{pct(metrics.ctr)}</div><div className="text-muted-foreground">CTR</div></div>
                  <div><div className="font-bold text-foreground text-base">{position(metrics.position)}</div><div className="text-muted-foreground">Position</div></div>
                </div>
              </div>
            );
          })}
          {snapshots.length === 0 && (
            <div className="px-6 py-12 text-center text-sm text-muted-foreground">No SEO performance snapshots saved yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
