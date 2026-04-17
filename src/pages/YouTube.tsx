import React from 'react';
import { Play, ExternalLink, X, Youtube, ArrowLeft, Radio, Video as VideoIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchCategorizedVideos, type YouTubeVideo } from '@/src/services/youtube';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const YouTube: React.FC = () => {
  const [liveStreams, setLiveStreams] = React.useState<YouTubeVideo[]>([]);
  const [regularVideos, setRegularVideos] = React.useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = React.useState<YouTubeVideo | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchCategorizedVideos().then(data => {
      setLiveStreams(data.liveStreams);
      setRegularVideos(data.regularVideos);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="pt-24 pb-32 px-4 md:px-12 max-w-[1700px] mx-auto space-y-20">
      {/* Back Button & Header */}
      <div className="space-y-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-hud-accent hover:text-hud-accent transition-all font-mono text-[10px] tracking-widest uppercase group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          GO BACK
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-hud-border pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Youtube size={16} className="text-hud-accent" />
              <span className="text-[10px] font-mono text-hud-accent tracking-[0.3em] uppercase">YouTube Videos</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">MY <span className="text-hud-accent">VIDEOS</span></h1>
            <p className="text-text-dim font-mono text-[10px] uppercase tracking-widest max-w-xl leading-relaxed">
              Watch all my live streams and latest gaming videos here.
            </p>
          </div>
          
          <div className="flex gap-12 text-right">
            <div className="space-y-1">
              <p className="text-[10px] font-mono text-hud-accent tracking-widest uppercase">Live</p>
              <p className="text-4xl font-display font-black">{liveStreams.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-mono text-hud-accent tracking-widest uppercase">Other</p>
              <p className="text-4xl font-display font-black">{regularVideos.length}</p>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-4 text-hud-accent animate-pulse">
          <Radio size={48} className="animate-bounce" />
          <p className="font-mono text-sm tracking-[0.5em]">LOADING...</p>
        </div>
      ) : (
        <>
          {/* Live Streams Section */}
          {liveStreams.length > 0 && (
            <VideoGrid 
              title="LIVE VIDEOS" 
              icon={<Radio size={20} />} 
              videos={liveStreams} 
              onSelect={setSelectedVideo}
              accentColor="text-hud-accent"
            />
          )}

          {/* Regular Videos Section */}
          {regularVideos.length > 0 && (
            <VideoGrid 
              title="OTHER VIDEOS" 
              icon={<VideoIcon size={20} />} 
              videos={regularVideos} 
              onSelect={setSelectedVideo}
              accentColor="text-white"
            />
          )}
        </>
      )}

      {/* Video Modal Player - Fixed Ratio */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/98 backdrop-blur-2xl"
          >
            <div className="relative w-full max-w-6xl space-y-4">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-hud-accent tracking-widest uppercase">Playing Now</p>
                  <h2 className="text-sm md:text-lg font-black uppercase tracking-tight line-clamp-1">{selectedVideo.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-hud-accent hover:text-black transition-all font-mono text-[10px] tracking-widest uppercase"
                >
                  CLOSE <X size={16} />
                </button>
              </div>

              <div className="relative w-full aspect-video bg-black border border-white/10 shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                  title={selectedVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="flex justify-center gap-4 pt-4 opacity-30">
                <div className="h-px w-24 bg-gradient-to-r from-transparent to-hud-accent" />
                <div className="h-px w-24 bg-gradient-to-l from-transparent to-hud-accent" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const VideoGrid: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  videos: YouTubeVideo[]; 
  onSelect: (v: YouTubeVideo) => void;
  accentColor: string;
}> = ({ title, icon, videos, onSelect, accentColor }) => (
  <div className="space-y-10">
    <div className="flex items-center gap-4">
      <div className={cn("p-2 border border-white/10", accentColor)}>{icon}</div>
      <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video, i) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="group relative bg-[#0a0a0a] border border-white/5 overflow-hidden flex flex-col"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-black/10 transition-all" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-hud-accent flex items-center justify-center text-black">
                <Play size={20} fill="currentColor" />
              </div>
            </div>
            
            {video.type === 'live' && (
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-hud-accent text-black text-[8px] font-black tracking-widest uppercase">
                SAVED LIVE
              </div>
            )}
          </div>

          <div className="p-5 flex-1 flex flex-col gap-5">
            <div className="space-y-2">
              <h3 className="text-xs font-bold tracking-tight uppercase line-clamp-2 leading-snug group-hover:text-hud-accent transition-colors">
                {video.title}
              </h3>
              <div className="flex justify-between items-center text-[8px] font-mono text-text-dim uppercase tracking-widest">
                <span>{video.views}</span>
                <span>{video.date}</span>
              </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-2">
              <button 
                onClick={() => onSelect(video)}
                className="flex items-center justify-center gap-2 py-3 bg-hud-accent text-black text-[9px] font-black tracking-widest uppercase hover:bg-white transition-all transform active:scale-95"
              >
                WATCH NOW
              </button>
              <a 
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 border border-white/5 text-white text-[9px] font-black tracking-widest uppercase hover:bg-white/5 transition-all transform active:scale-95"
              >
                YOUTUBE
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);



