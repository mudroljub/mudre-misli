import { quotesData } from '../lib/data';
import HomeContent from '../components/HomeContent';

export default function HomePage() {
  const featured = quotesData.find((entry) => entry.author === 'Gautama Buddha') ?? quotesData[0];

  if (!featured) {
    return <main className="content">Nema dostupnih citata.</main>;
  }

  return <HomeContent featured={featured} />;
}
