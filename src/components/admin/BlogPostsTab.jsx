import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Pencil, Trash2, Loader2, FileText, Eye, EyeOff } from 'lucide-react';
import BlogPostEditor from '@/components/admin/BlogPostEditor';

export default function BlogPostsTab({ isAdmin = false }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const all = await base44.entities.BlogPost.list('-created_date', 50);
      setPosts(all);
    } catch (e) {
      setPosts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleToggleStatus = async (post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      await base44.entities.BlogPost.update(post.id, { status: newStatus });
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: newStatus } : p));

      try {
        const user = await base44.auth.me();
        const userName = user.full_name || user.email || 'Unknown user';
        await base44.entities.ContentAuditLog.create({
          section_key: `blog:${post.slug}`,
          action: 'update',
          field_changes: JSON.stringify([{ field: 'status', old_value: post.status || '', new_value: newStatus }]),
          changed_by_name: userName,
        });
      } catch (auditError) {
        console.error('Blog status audit log entry failed:', auditError);
      }
    } catch (e) {
      // error
    }
  };

  const handleDelete = async (post) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    try {
      await base44.entities.BlogPost.delete(post.id);
      setPosts(prev => prev.filter(p => p.id !== post.id));
    } catch (e) {
      // error
    }
  };

  if (editing !== null) {
    return (
      <BlogPostEditor
        post={editing === 'new' ? null : editing}
        onBack={() => {
          setEditing(null);
          loadPosts();
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">Blog Posts</h2>
        <button
          onClick={() => setEditing('new')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border p-12 text-center">
          <FileText className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No blog posts yet. Click "New Post" to create your first one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-xl border border-border p-4 flex items-center gap-4 hover:shadow-sm transition-shadow"
            >
              {post.cover_image_url ? (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-muted-foreground/40" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground text-sm truncate">{post.title}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                      post.status === 'published'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {post.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {post.author ? `By ${post.author}` : 'No author'} · {post.slug ? `/${post.slug}` : 'no slug'}
                </p>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => handleToggleStatus(post)}
                  title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                >
                  {post.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setEditing(post)}
                  title="Edit"
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(post)}
                    title="Delete"
                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}