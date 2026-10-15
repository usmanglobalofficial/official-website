import { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

let contentCache = null;
let loadPromise = null;

export function useSiteContent() {
  const [content, setContent] = useState(contentCache);
  const [loading, setLoading] = useState(!contentCache);

  useEffect(() => {
    let mounted = true;

    if (contentCache) {
      setContent(contentCache);
      setLoading(false);
      return;
    }

    if (!loadPromise) {
      loadPromise = base44.entities.SiteContent.list()
        .then(records => {
          if (Array.isArray(records)) {
            contentCache = records.reduce((acc, r) => {
              if (r && r.section_key) {
                acc[r.section_key] = r;
              }
              return acc;
            }, {});
          } else {
            contentCache = {};
          }
        })
        .catch(() => {
          contentCache = {};
        })
        .finally(() => {
          loadPromise = null;
        });
    }

    loadPromise.then(() => {
      if (mounted) {
        setContent(contentCache);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const getContent = useCallback(
    (sectionKey, field, fallback) => {
      if (content && content[sectionKey] && content[sectionKey][field]) {
        return content[sectionKey][field];
      }
      return fallback;
    },
    [content]
  );

  return { content, loading, getContent };
}