import { useEffect } from 'react';
import { useSiteContent } from '@/hooks/useSiteContent';

const SITE_URL = 'https://usmanglobal.com/';
const DEFAULT_TITLE = 'Used Clothing Wholesale Supplier UAE | Usman Global';
const DEFAULT_DESC = 'Wholesale used clothing, shoes and bags sourced globally, sorted in UAE facilities and exported to Africa, Asia and worldwide markets. Usman Global F.Z.C.';
const SOCIAL_IMAGE = 'https://usmanglobal.com/social-share.png';

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setOgMeta(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

function setStructuredData() {
  const id = 'usman-global-structured-data';
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }

  el.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}#organization`,
        name: 'Usman Global F.Z.C.',
        url: SITE_URL,
        email: 'info@usmanglobal.com',
        telephone: '+971549969994',
        description: 'UAE-based wholesale used clothing sorting, grading and export company serving international markets.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Sharjah',
          addressCountry: 'AE',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        url: SITE_URL,
        name: 'Usman Global',
        alternateName: 'Usman Global F.Z.C.',
        publisher: { '@id': `${SITE_URL}#organization` },
      },
    ],
  });
}

export default function SeoManager() {
  const { content } = useSiteContent();

  useEffect(() => {
    // The homepage is one URL, so its search metadata must remain stable.
    // Section-specific keyword maps are kept in the CMS for content planning,
    // not swapped into the browser title while a visitor scrolls.
    const home = content?.home;
    const title = home?.seo_title || DEFAULT_TITLE;
    const desc = home?.meta_description || DEFAULT_DESC;
    const keywords = home?.keywords || '';

    document.title = title;
    setMeta('description', desc);
    setMeta('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    if (keywords) setMeta('keywords', keywords);

    setCanonical(SITE_URL);
    setOgMeta('og:type', 'website');
    setOgMeta('og:site_name', 'Usman Global F.Z.C.');
    setOgMeta('og:title', title);
    setOgMeta('og:description', desc);
    setOgMeta('og:url', SITE_URL);
    setOgMeta('og:image', SOCIAL_IMAGE);
    setOgMeta('og:image:secure_url', SOCIAL_IMAGE);
    setOgMeta('og:image:type', 'image/png');
    setOgMeta('og:image:width', '1200');
    setOgMeta('og:image:height', '630');
    setOgMeta('og:image:alt', 'Usman Global logo');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', SOCIAL_IMAGE);

    setStructuredData();
  }, [content]);

  return null;
}
