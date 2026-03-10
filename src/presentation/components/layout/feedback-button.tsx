export function FeedbackButton({ isKorean = true }: { isKorean?: boolean }) {
  return (
    <a
      href="mailto:contact@cs-pedia.io"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white border border-zinc-200 text-zinc-600 text-sm font-medium px-4 py-2.5 rounded-full shadow-md hover:shadow-lg hover:border-zinc-300 hover:text-zinc-900 transition-all"
    >
      💬 {isKorean ? "피드백" : "Feedback"}
    </a>
  );
}
