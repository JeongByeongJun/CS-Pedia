export function FeedbackButton({ isKorean = true }: { isKorean?: boolean }) {
  return (
    <a
      href="mailto:contact@cs-pedia.io"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-zinc-900 border border-white/10 text-zinc-300 text-sm font-medium px-4 py-2.5 rounded-full shadow-lg hover:bg-zinc-800 hover:text-white transition-all"
    >
      💬 {isKorean ? "피드백" : "Feedback"}
    </a>
  );
}
