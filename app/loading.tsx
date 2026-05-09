export default function RootLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-champagne-500/15" />
          <div className="absolute inset-0 rounded-full border-2 border-t-champagne-400 animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-white/40 text-sm">Loading BeautyBody</p>
          <p className="text-white/20 text-xs mt-1">AI Skin Expert</p>
        </div>
      </div>
    </div>
  );
}
