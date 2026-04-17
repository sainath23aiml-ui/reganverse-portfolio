/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// USE ENVIRONMENT VARIABLES (MAKE SURE TO RESTART SERVER)
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || 'AIzaSyCutC_5VK-y8YFU-nKBkEHKPIOr9pwkEMk'; // Fallback for debugging
const CHANNEL_ID = 'UClNqxp3O0Xe5wzWgwN-EfLQ';
const UPLOADS_PLAYLIST_ID = 'UUlNqxp3O0Xe5wzWgwN-EfLQ';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  date: string;
  url: string;
  type?: 'live' | 'video';
}

/**
 * More robust fetch using PlaylistItems (Cheaper on Quota)
 */
export const fetchCategorizedVideos = async () => {
  console.log("YouTube Sync: INITIALIZED");
  
  try {
    // We use PlaylistItems instead of Search to save quota (1 point vs 100 points)
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=40&key=${API_KEY}`
    );

    const data = await response.json();

    if (data.error) {
      console.error("YouTube API Error:", data.error.message);
      return { liveStreams: [], regularVideos: [] };
    }

    if (!data.items) {
      console.warn("YouTube API returned no items.");
      return { liveStreams: [], regularVideos: [] };
    }

    const allVideos = data.items.map((item: any) => {
      const videoId = item.snippet.resourceId.videoId;
      const pubDate = new Date(item.snippet.publishedAt);
      
      // Determine if it's likely a stream (titles often contain | or LIVE)
      const isLiveStream = item.snippet.title.toUpperCase().includes('LIVE') || 
                           item.snippet.title.includes('|') ||
                           item.snippet.title.toUpperCase().includes('STREAM');

      return {
        id: videoId,
        title: item.snippet.title,
        thumbnail: `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        views: isLiveStream ? 'PAST STREAM' : 'VIDEO',
        date: pubDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase(),
        url: `https://www.youtube.com/watch?v=${videoId}`,
        type: (isLiveStream ? 'live' : 'video') as 'live' | 'video'
      };
    });

    const liveStreams = allVideos.filter(v => v.type === 'live');
    const regularVideos = allVideos.filter(v => v.type === 'video');

    console.log(`YouTube Sync: Success! Found ${allVideos.length} videos.`);
    return { liveStreams, regularVideos };

  } catch (error) {
    console.error('YouTube Fetch Fatal Error:', error);
    return { liveStreams: [], regularVideos: [] };
  }
};

export const fetchLatestVideos = async (): Promise<YouTubeVideo[]> => {
  const { regularVideos } = await fetchCategorizedVideos();
  return regularVideos;
};
