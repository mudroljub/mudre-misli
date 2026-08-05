"use client";

import Link from "next/link";
import { useState } from "react";
import Sidebar from "./Sidebar";
import LanguageSwitcher from "./LanguageSwitcher";
import { getTextForLanguage, getAuthorName } from "../lib/data";
import { getTranslation } from "../lib/translations";
import type { AuthorData, Language, Entry } from "../types/data";

interface AuthorPageClientProps {
  author: string;
  authorData: AuthorData;
  authorEntries: Entry[];
}

export default function AuthorPageClient({
  author,
  authorData,
  authorEntries,
}: AuthorPageClientProps) {
  const [language, setLanguage] = useState<Language>("stsl");
  const t = getTranslation(language);
  const authorName = getAuthorName(author, language);

  const quotesSection = authorEntries.filter(
    (entry) => entry.type === "quote" || entry.type === "reported",
  );

  const lifeEventsSection = authorEntries.filter(
    (entry) => entry.type === "anecdote" || entry.type === "bio",
  );

  return (
    <main className="page-shell">
      <Sidebar language={language} />

      <section className="content">
        <LanguageSwitcher currentLang={language} onChange={setLanguage} />

        <h2>{authorName}</h2>

        <img
          className="author-portrait"
          src={authorData.src}
          alt={authorName}
        />

        {lifeEventsSection.length > 0 && (
          <section>
            <h3>{t.sectionAnecdotes}</h3>

            {lifeEventsSection.map((entry) => (
              <div key={entry._id} className="quote-card">
                <p>{getTextForLanguage(entry, language)}</p>
                <Link href={`/quotes/${entry._id}`}>{t.openQuote}</Link>
              </div>
            ))}
          </section>
        )}

        {quotesSection.length > 0 && (
          <section>
            <h3>{t.sectionQuotes}</h3>

            {quotesSection.map((entry) => (
              <div key={entry._id} className="quote-card">
                <p>{getTextForLanguage(entry, language)}</p>
                <Link href={`/quotes/${entry._id}`}>{t.openQuote}</Link>
              </div>
            ))}
          </section>
        )}
      </section>
    </main>
  );
}
