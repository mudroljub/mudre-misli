import Link from 'next/link';
import { authorsData, authorSlugs } from '@/lib/data';

export default function Sidebar() {
  const authorList = Object.keys(authorsData || {});

  return (
    <aside className="sidebar">
      <h1>Mudre misli</h1>
      <nav>
        {authorList.map((author) => {
          const meta = authorsData[author] || {};
          const slug = authorSlugs[author] || author;
          return (
            <Link key={author} href={`/authors/${slug}`} className="sidebar-author">
              {meta.src ? <img src={meta.src} alt={author} /> : null}
              <span>{author}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
