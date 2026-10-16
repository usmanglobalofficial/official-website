import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, Save, Loader2, Upload, CheckCircle, X } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || '').trim();
}

export default function BlogPostEditor({ post, onBack }) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    cover_image_url: post?.cover_image_url || '',
    body_html: post?.body_html || '',
    excerpt: post?.excerpt || '',
    author: post?.author || '',
    status: post?.status || 'draft',
    seo_title: post?.seo_title || '',
    meta_description: post?.meta_description || '',
    keywords: post?.keywords || '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [slugEdited, setSlugEdited] = useState(!!post?.slug);

  const handleChange = (field, value) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'title' && !slugEdited) {
        next.slug = generateSlug(value);
      }
      return next;
    });
  };

  const handleSlugChange = value => {
    setSlugEdited(true);
    handleChange('slug', value);
  };

  const handleImageUpload = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      handleChange('cover_image_url', file_url);
    } catch (err) {
      // error
    }
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const data = { ...formData };
      if (!data.excerpt && data.body_html) {
        const text = stripHtml(data.body_html);
        data.excerpt = text.length > 150 ? text.slice(0, 150) + '…' : text;
      }
      const auditFields = ['title', 'slug', 'seo_title', 'meta_description', 'keywords', 'excerpt', 'author', 'status', 'cover_image_url', 'body_html'];
      const fieldChanges = auditFields
        .map(field => ({
          field,
          old_value: post?.[field] || '',
          new_value: data[field] || '',
        }))
        .filter(change => change.old_value !== change.new_value);

      if (post?.id) {
        await base44.entities.BlogPost.update(post.id, data);
      } else {
        await base44.entities.BlogPost.create(data);
      }

      if (fieldChanges.length > 0) {
        try {
          let userName = 'Unknown user';
          try {
            const user = await base44.auth.me();
            userName = user.full_name || user.email || 'Unknown user';
          } catch {}
          await base44.entities.ContentAuditLog.create({
            section_key: `blog:${data.slug}`,
            action: post?.id ? 'update' : 'create',
            field_changes: JSON.stringify(fieldChanges),
            changed_by_name: userName,
          });
        } catch (e) {
          console.error('Blog audit log entry failed:', e);
        }
      }

      setSaved(true);
      setTimeout(() => onBack(), 800);
    } catch (err) {
      // error
    }
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Posts
      </button>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => handleChange('title', e.target.value)}
            placeholder="Enter post title..."
            className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">URL Slug</label>
          <p className="text-xs text-muted-foreground mb-2">The URL path: /blog/<span className="text-primary font-medium">{formData.slug || 'your-slug'}</span></p>
          <input
            type="text"
            value={formData.slug}
            onChange={e => handleSlugChange(e.target.value)}
            placeholder="auto-generated-from-title"
            className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-4">
          <div>
            <h3 className="text-base font-bold text-foreground">Blog SEO</h3>
            <p className="text-xs text-muted-foreground mt-1">Use one clear topic per article. These fields control the article search title and description.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">SEO Title</label>
            <input
              type="text"
              value={formData.seo_title}
              onChange={e => handleChange('seo_title', e.target.value)}
              placeholder="Search title for this article..."
              className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <div className="text-xs text-muted-foreground mt-1">{formData.seo_title.length} characters</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Meta Description</label>
            <textarea
              rows={3}
              value={formData.meta_description}
              onChange={e => handleChange('meta_description', e.target.value)}
              placeholder="Describe what the article answers for searchers..."
              className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
            />
            <div className="text-xs text-muted-foreground mt-1">{formData.meta_description.length} characters</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Keyword Topic Map</label>
            <input
              type="text"
              value={formData.keywords}
              onChange={e => handleChange('keywords', e.target.value)}
              placeholder="used clothing wholesale, clothing grading, UAE exporter..."
              className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={e => handleChange('author', e.target.value)}
              placeholder="Author name"
              className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Status</label>
            <select
              value={formData.status}
              onChange={e => handleChange('status', e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              <option value="draft">Draft (not visible)</option>
              <option value="published">Published (live)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Cover Image</label>
          {formData.cover_image_url ? (
            <div className="relative inline-block">
              <img
                src={formData.cover_image_url}
                alt="Cover preview"
                className="w-full max-w-md h-40 object-cover rounded-xl border border-border"
              />
              <button
                onClick={() => handleChange('cover_image_url', '')}
                className="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <label className="flex items-center justify-center gap-2 w-full max-w-md h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
              {uploading ? (
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              ) : (
                <>
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload cover image</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Excerpt</label>
          <p className="text-xs text-muted-foreground mb-2">Short summary shown on blog cards. Leave empty to auto-generate from body.</p>
          <input
            type="text"
            value={formData.excerpt}
            onChange={e => handleChange('excerpt', e.target.value)}
            placeholder="Short summary..."
            className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Body Content</label>
          <div className="rounded-xl overflow-hidden border border-border">
            <ReactQuill
              theme="snow"
              value={formData.body_html}
              onChange={value => handleChange('body_html', value)}
              modules={QUILL_MODULES}
              placeholder="Write your blog post content here..."
              style={{ minHeight: '300px' }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={handleSave}
            disabled={saving || !formData.title || !formData.slug}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
              <CheckCircle className="w-4 h-4" /> Saved successfully
            </span>
          )}
        </div>
      </div>
    </div>
  );
}