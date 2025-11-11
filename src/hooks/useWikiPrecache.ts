import { useEffect } from 'react';
import { precacheWikiContent } from '../utils/serviceWorkerRegistration';


export function useWikiPrecache(entries?: { id: number | string }[]) {
  useEffect(() => {
    if (!entries || entries.length === 0) return;

    const urls = entries.map((entry) => `/wiki/${entry.id}`);
    
    const apiUrls = [
      '/api/wiki/entries',
      '/api/categories',
    ];

    precacheWikiContent([...urls, ...apiUrls]);
  }, [entries]);
}

export function useWikiEntryPrecache(entryId?: number | string) {
  useEffect(() => {
    if (!entryId) return;

    const urls = [
      `/wiki/${entryId}`,
      `/api/wiki/entries/${entryId}`,
    ];

    precacheWikiContent(urls);
  }, [entryId]);
}

