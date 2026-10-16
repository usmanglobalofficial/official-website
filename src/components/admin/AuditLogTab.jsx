import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { SECTION_LABELS } from '@/lib/sections';
import { History, User, Calendar, FileText, RefreshCw } from 'lucide-react';

export default function AuditLogTab() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSection, setFilterSection] = useState('all');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const records = await base44.entities.ContentAuditLog.list('-created_date', 200);
      setLogs(records);
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filtered = filterSection === 'all'
    ? logs
    : logs.filter(l => l.section_key === filterSection);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Change History</h2>
        </div>
        <button
          onClick={fetchLogs}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      <p className="text-sm text-muted-foreground">
        Every SEO, keyword, and page-content change is recorded here with before and after values.
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterSection('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            filterSection === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/70'
          }`}
        >
          All Sections
        </button>
        {Object.entries(SECTION_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilterSection(key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filterSection === key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/70'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No changes logged yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((log) => {
            let changes = [];
            try { changes = JSON.parse(log.field_changes); } catch {}
            return (
              <div key={log.id} className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="flex flex-wrap items-center gap-3 px-5 py-3 bg-muted/50 border-b border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{log.changed_by_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(log.created_date).toLocaleString('en-GB', {
                      day: '2-digit', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-semibold">
                    {SECTION_LABELS[log.section_key] || log.section_key}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                    log.action === 'create'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {log.action === 'create' ? 'Created' : 'Updated'}
                  </span>
                </div>
                <div className="px-5 py-4 space-y-3">
                  {changes.map((c, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div className="font-medium text-muted-foreground capitalize">
                        {c.field.replace(/_/g, ' ')}
                      </div>
                      <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                        <div className="text-xs text-red-500 font-semibold mb-1">Before</div>
                        <div className="text-red-900 line-through whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
                          {c.old_value || <span className="text-red-300 italic">empty</span>}
                        </div>
                      </div>
                      <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                        <div className="text-xs text-green-600 font-semibold mb-1">After</div>
                        <div className="text-green-900 whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
                          {c.new_value || <span className="text-green-300 italic">empty</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}