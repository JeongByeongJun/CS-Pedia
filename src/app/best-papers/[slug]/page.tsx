import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { AWARD_TYPE_LABELS } from "@/domain/entities/best-paper";
import { conferenceUrl } from "@/shared/utils/url";

interface BestPaperEntry {
  conferenceSlug: string;
  conferenceAcronym: string;
  conferenceField: string;
  year: number;
  paperTitle: string;
  authors: string | null;
  awardType: string;
  tags: string[];
  paperUrl: string | null;
}

async function getBestPapersForSlug(slug: string) {
  const fs = await import("fs/promises");
  const path = await import("path");
  const raw = await fs.readFile(path.join(process.cwd(), "public/data/best-papers.json"), "utf8");
  const all: BestPaperEntry[] = JSON.parse(raw);
  return all.filter((p) => p.conferenceSlug === slug);
}

async function getConferenceInfo(slug: string) {
  const fs = await import("fs/promises");
  const path = await import("path");
  try {
    const raw = await fs.readFile(path.join(process.cwd(), `public/data/conferences/${slug}.json`), "utf8");
    const data = JSON.parse(raw);
    return { acronym: data.acronym as string, nameEn: data.nameEn as string, field: data.field as string };
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const fs = await import("fs/promises");
  const path = await import("path");
  const raw = await fs.readFile(path.join(process.cwd(), "public/data/best-papers.json"), "utf8");
  const all: BestPaperEntry[] = JSON.parse(raw);
  const slugs = [...new Set(all.map((p) => p.conferenceSlug))];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const info = await getConferenceInfo(slug);
  if (!info) return {};
  const papers = await getBestPapersForSlug(slug);
  const years = [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a);
  const yearRange = years.length > 0 ? `${years[years.length - 1]}–${years[0]}` : "";

  const title = `${info.acronym} Best Papers ${yearRange}`;
  const description = `${info.acronym} (${info.nameEn}) Best Paper Award winners and distinguished papers. ${papers.length} papers from ${yearRange}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://cs-pedia.io/best-papers/${slug}`,
      siteName: "CS-Pedia",
      locale: "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical: `https://cs-pedia.io/best-papers/${slug}` },
  };
}

export const revalidate = 86400;

export default async function ConferenceBestPapersPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [papers, info] = await Promise.all([getBestPapersForSlug(slug), getConferenceInfo(slug)]);
  if (!info || papers.length === 0) return notFound();

  const byYear = new Map<number, BestPaperEntry[]>();
  for (const p of papers) {
    if (!byYear.has(p.year)) byYear.set(p.year, []);
    byYear.get(p.year)!.push(p);
  }
  const years = [...byYear.keys()].sort((a, b) => b - a);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "CS-Pedia", item: "https://cs-pedia.io" },
      { "@type": "ListItem", position: 2, name: "Best Papers", item: "https://cs-pedia.io/best-papers" },
      { "@type": "ListItem", position: 3, name: `${info.acronym} Best Papers`, item: `https://cs-pedia.io/best-papers/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-page-gradient">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
            <Link href="/best-papers" className="hover:text-indigo-500 transition-colors">Best Papers</Link>
            <span>/</span>
            <span>{info.acronym}</span>
          </div>
          <h1 className="font-bold text-2xl tracking-[-0.025em] text-zinc-900 mb-1">
            {info.acronym} Best Papers
          </h1>
          <p className="text-sm text-zinc-500">{info.nameEn}</p>
          <p className="text-xs text-zinc-400 mt-1">
            {papers.length} papers · {years[years.length - 1]}–{years[0]}
          </p>
          <Link
            href={conferenceUrl(slug)}
            className="inline-flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 mt-2 transition-colors"
          >
            ← {info.acronym} Conference Info
          </Link>
        </div>

        <div className="space-y-6">
          {years.map((year) => (
            <section key={year}>
              <h2 className="text-lg font-semibold text-zinc-800 mb-3 flex items-center gap-2">
                <span className="text-indigo-500">🏆</span> {year}
                <span className="text-xs text-zinc-400 font-normal">({byYear.get(year)!.length})</span>
              </h2>
              <div className="space-y-2">
                {byYear.get(year)!.map((paper, i) => (
                  <div key={i} className="bg-white rounded-xl border border-zinc-200/80 p-4">
                    <div className="text-xs text-indigo-400 font-medium mb-1">
                      {AWARD_TYPE_LABELS[paper.awardType as keyof typeof AWARD_TYPE_LABELS] ?? paper.awardType}
                    </div>
                    {paper.paperUrl ? (
                      <a
                        href={paper.paperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-zinc-800 hover:text-indigo-600 transition-colors"
                      >
                        {paper.paperTitle}
                      </a>
                    ) : (
                      <div className="text-sm font-medium text-zinc-800">{paper.paperTitle}</div>
                    )}
                    {paper.authors && (
                      <div className="text-xs text-zinc-400 mt-1">{paper.authors}</div>
                    )}
                    {paper.tags.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {paper.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <SiteFooter />
      </main>
    </div>
  );
}
