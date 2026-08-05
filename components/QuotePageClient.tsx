"use client";

import Link from "next/link";
import { useState } from "react";
import Sidebar from "./Sidebar";
import LanguageSwitcher from "./LanguageSwitcher";
import { getTextForLanguage, getAuthorName, authorSlugs, getSourceName } from "../lib/data";
import { getTranslation } from "../lib/translations";
import type { AuthorData, Language, Entry } from "../types/data";

interface QuotePageClientProps {
  quote: Entry;
  authorData?: AuthorData;
}

export default function QuotePageClient({
  quote,
  authorData,
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
          {authorData?.src ? (
            <img src={authorData.src} alt={authorName} />
          ) : null}
          <h2>{authorName}</h2>

          <blockquote>{getTextForLanguage(quote, language)}</blockquote>

          <blockquote className="original-quote">{quote.el}</blockquote>

          <p className="source-line">
            <b>{t.source}</b>: {getSourceName(quote.source, language)}, {quote.reference}
          </p>

          <Link href={`/authors/${authorSlugs[quote.author] ?? quote.author}`}>
            {t.gotoAuthor}
          </Link>
        </div>
      </section>
    </main>
  );
}
