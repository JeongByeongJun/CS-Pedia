export function FeedbackButton({ isKorean = true }: { isKorean?: boolean }) {
  return (
    <a
      href="https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io&su=CS-Pedia%20Feedback"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-1.5 sm:gap-2 bg-indigo-600 text-white text-xs sm:text-sm font-medium px-4 py-2.5 sm:px-5 sm:py-3 rounded-full shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 hover:shadow-indigo-500/40 hover:scale-105 cursor-pointer transition-all"
    >
      💬 {isKorean ? "피드백" : "Feedback"}
    </a>
  );
}
