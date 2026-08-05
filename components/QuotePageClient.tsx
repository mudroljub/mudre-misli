"use client";

import Link from "next/link";
import { useState } from "react";
import Sidebar from "./Sidebar";
import LanguageSwitcher from "./LanguageSwitcher";
import { getTextForLanguage, getAuthorName, authorSlugs, getSourceName } from "../lib/data";
import { getTranslation } from "../lib/translations";
import type { AuthorData, Language, EntryWithId } from "../types/data";

interface QuotePageClientProps {
  quote: EntryWithId;
  authorMeta?: AuthorData;
}

export default function QuotePageClient({
  quote,
  authorMeta,
}: QuotePageClientProps) {
  const [language, setLanguage] = useState<Language>("stsl");
  const t = getTranslation(language);
  const authorName = getAuthorName(quote.author, language);

  return (
    <main className="page-shell">
      <Sidebar language={language} />
      <section className="content">
        <LanguageSwitcher currentLang={language} onChange={setLanguage} />
        <div className="quote-card">
          {authorMeta?.src ? (
            <img src={authorMeta.src} alt={authorName} />
          ) : null}
          <h2>{authorName}</h2>

          <blockquote>{getTextForLanguage(quote, language)}</blockquote>

          {quote.el && (
            <blockquote className="original-quote">{quote.el}</blockquote>
          )}

          <p className="source-line">
            {t.source}: {getSourceName(quote.source, language)}, {quote.reference}
          </p>

          <Link href={`/authors/${authorSlugs[quote.author] ?? quote.author}`}>
            {t.viewAllQuotes}
          </Link>
        </div>
      </section>
    </main>
  );
}
