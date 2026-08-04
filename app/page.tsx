import { quotesData } from '../lib/data';
import HomeContent from '../components/HomeContent';

export default function HomePage() {
  const randomIndex = Math.floor(Math.random() * quotesData.length);
  const featured = quotesData[randomIndex];

  if (!featured) {
    return <main className="content">Nema dostupnih citata.</main>;
  }

  return <HomeContent featured={featured} />;
}
