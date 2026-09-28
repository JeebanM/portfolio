export default function DemoTrailerSection() {
  return (
    <section id="demo-trailer" className="w-full max-w-[1440px] mx-auto px-gutter py-space-xl overflow-hidden">
      <div className="flex flex-col items-center gap-space-md max-w-5xl mx-auto">
        <div className="flex items-center gap-3 w-full justify-center">
          <span className="text-[13px] text-primary font-mono tracking-widest">// SYSTEM PREVIEW</span>
        </div>
        <h2 className="text-[36px] sm:text-[48px] font-bold text-center tracking-tight text-on-surface">
          Watch it in Action
        </h2>
        <p className="text-[16px] text-center text-on-surface-variant max-w-2xl">
          A quick 22-second cinematic overview of the RAG platform, generated directly from the codebase.
        </p>

        <div className="w-full relative mt-space-md rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(208,188,255,0.15)] border border-surface-container-high bg-surface-container-lowest">
          <video 
            src="/brag.mp4" 
            poster="/brag.jpg"
            controls 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-auto aspect-video object-cover"
          />
        </div>
      </div>
    </section>
  );
}
