import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Type, History, ExternalLink, BarChart3 } from 'lucide-react';
import SeoTab from '@/components/admin/SeoTab';
import BlogPostsTab from '@/components/admin/BlogPostsTab';
import PageContentTab from '@/components/admin/PageContentTab';
import AuditLogTab from '@/components/admin/AuditLogTab';
import SearchPerformanceTab from '@/components/admin/SearchPerformanceTab';
import { base44 } from '@/api/base44Client';

const TABS = [
  { id: 'performance', label: 'SEO Performance', icon: BarChart3 },
  { id: 'seo', label: 'On-Page SEO', icon: Search },
  { id: 'blog', label: 'Blog Posts', icon: FileText },
  { id: 'content', label: 'Page Content', icon: Type },
  { id: 'audit', label: 'Change Log', icon: History },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('performance');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setCurrentUser).catch(() => setCurrentUser(null));
  }, []);

  const isAdmin = currentUser?.role === 'admin';
  const visibleTabs = TABS.filter(tab => !tab.adminOnly || isAdmin);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold font-playfair text-foreground">Content Management</h1>
            <p className="text-xs text-muted-foreground">Manage SEO, blog posts &amp; page content</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> View Site
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-1 mb-8 bg-white rounded-xl p-1 border border-border">
          {visibleTabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {activeTab === 'performance' && <SearchPerformanceTab isAdmin={isAdmin} />}
        {activeTab === 'seo' && <SeoTab />}
        {activeTab === 'blog' && <BlogPostsTab isAdmin={isAdmin} />}
        {activeTab === 'content' && <PageContentTab />}
        {activeTab === 'audit' && <AuditLogTab />}
      </div>
    </div>
  );
}