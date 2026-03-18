export function FeedbackButton({ isKorean = true }: { isKorean?: boolean }) {
  return (
    <a
      href="https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io&su=CS-Pedia%20Feedback"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-1.5 sm:gap-2 bg-zinc-900 border border-white/10 text-zinc-300 text-xs sm:text-sm font-medium px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-lg hover:bg-zinc-800 hover:text-white transition-all"
    >
      💬 {isKorean ? "피드백" : "Feedback"}
    </a>
  );
}
