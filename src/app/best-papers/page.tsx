import type { Metadata } from "next";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { BestPaperClientSection } from "@/presentation/components/best-papers/best-paper-client-section";

export const metadata: Metadata = {
  title: "Best Papers — CS-Pedia",
  description: "Best Paper award archive across top CS conferences. Browse by year and venue.",
};

export const revalidate = 86400;

export default async function BestPapersPage() {
  const fs = await import("fs/promises");
  const path = await import("path");
  const raw = await fs.readFile(path.join(process.cwd(), "public/data/best-papers.json"), "utf8");
  const papers = JSON.parse(raw);

  return (
    <div className="min-h-screen bg-page-gradient">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
        <div className="mb-6">
          <div className="text-[11px] tracking-[0.12em] uppercase text-indigo-400 mb-1.5 font-mono font-medium">
            Best Papers
          </div>
          <h1 className="font-bold text-2xl tracking-[-0.025em] text-zinc-900">
            Best Paper Archive
          </h1>
        </div>

        <BestPaperClientSection papers={papers} />

        <SiteFooter />
      </main>
    </div>
  );
}
