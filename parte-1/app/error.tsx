"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-5 text-center">
      <h1 className="text-[40px] font-medium text-dark leading-tight">
        Something went wrong
      </h1>
      <p className="text-[18px] leading-[26px] text-dark/60 max-w-[480px]">
        An unexpected error occurred. Please try again or refresh the page.
      </p>
      <button
        onClick={reset}
        className="inline-block bg-dark text-white text-[20px] rounded-btn px-btn-x py-5 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dark"
      >
        Try again
      </button>
    </main>
  );
}
