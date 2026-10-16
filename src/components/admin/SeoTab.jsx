import { useState } from 'react';
import { SECTION_DEFS } from '@/lib/sections';
import { useSiteContentEditor } from '@/hooks/useSiteContentEditor';
import { Save, Loader2, CheckCircle } from 'lucide-react';

const SEO_FIELDS = ['seo_title', 'meta_description', 'keywords'];

export default function SeoTab() {
  const [selectedSection, setSelectedSection] = useState(SECTION_DEFS[0].key);
  const { formData, loading, saving, saved, handleChange, handleSave } =
    useSiteContentEditor(selectedSection, SEO_FIELDS);

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
            <label className="block text-sm font-medium text-foreground mb-1.5">SEO Title</label>
            <p className="text-xs text-muted-foreground mb-2">Recommended: 10–60 characters. Appears in browser tab and search results.</p>
            <input
              type="text"
              value={formData.seo_title}
              onChange={e => handleChange('seo_title', e.target.value)}
              placeholder="Enter SEO title..."
              className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <div className="text-xs text-muted-foreground mt-1">{formData.seo_title.length} characters</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Meta Description</label>
            <p className="text-xs text-muted-foreground mb-2">Recommended: up to 160 characters. Summary shown in search results.</p>
            <textarea
              rows={3}
              value={formData.meta_description}
              onChange={e => handleChange('meta_description', e.target.value)}
              placeholder="Enter meta description..."
              className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
            />
            <div className="text-xs text-muted-foreground mt-1">{formData.meta_description.length} characters</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Keywords</label>
            <p className="text-xs text-muted-foreground mb-2">Comma-separated keywords relevant to this section.</p>
            <input
              type="text"
              value={formData.keywords}
              onChange={e => handleChange('keywords', e.target.value)}
              placeholder="second-hand clothing, wholesale, UAE..."
              className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
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