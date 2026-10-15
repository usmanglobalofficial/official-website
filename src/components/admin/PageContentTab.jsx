import { useState } from 'react';
import { SECTION_DEFS } from '@/lib/sections';
import { useSiteContentEditor } from '@/hooks/useSiteContentEditor';
import { Save, Loader2, CheckCircle } from 'lucide-react';

const CONTENT_FIELDS = ['heading', 'body_text'];

export default function PageContentTab() {
  const [selectedSection, setSelectedSection] = useState(SECTION_DEFS[0].key);
  const sectionDef = SECTION_DEFS.find(s => s.key === selectedSection);
  const { formData, loading, saving, saved, handleChange, handleSave } =
    useSiteContentEditor(selectedSection, CONTENT_FIELDS);

  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">Select Section</label>
        <select
          value={selectedSection}
          onChange={e => setSelectedSection(e.target.value)}
          className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          {SECTION_DEFS.map(s => (
            <option key={s.key} value={s.key}>{s.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Heading</label>
            <p className="text-xs text-muted-foreground mb-2">The main heading displayed on this section of the page.</p>
            <input
              type="text"
              value={formData.heading}
              onChange={e => handleChange('heading', e.target.value)}
              placeholder={sectionDef?.defaultHeading || 'Enter heading...'}
              className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Body Text</label>
            <p className="text-xs text-muted-foreground mb-2">The supporting paragraph displayed under the heading.</p>
            <textarea
              rows={5}
              value={formData.body_text}
              onChange={e => handleChange('body_text', e.target.value)}
              placeholder={sectionDef?.defaultBody || 'Enter body text...'}
              className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
            />
          </div>

          <div className="bg-muted/50 rounded-xl p-4 text-xs text-muted-foreground">
            <strong className="text-foreground">Tip:</strong> Leave a field empty to use the default text. Changes appear on the live site immediately after saving.
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {saved && (
              <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
                <CheckCircle className="w-4 h-4" /> Saved successfully
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}