import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

export default function ProtectedAdminRoute({ children }) {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    base44.auth
      .me()
      .then(user => setState({ loading: false, user }))
      .catch(() => setState({ loading: false, user: null }));
  }, []);

  if (state.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/30">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!state.user) {
    base44.auth.redirectToLogin('/admin');
    return null;
  }

  if (state.user.role !== 'admin' && state.user.role !== 'content_manager') {
    return <Navigate to="/" replace />;
  }

  return children;
}