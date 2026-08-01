import { quotesData } from '@/lib/data';
import HomeContent from '@/components/HomeContent';

export default function HomePage() {
  const featured = quotesData.find((quote) => quote.author === 'Gautama Buddha') || quotesData[0];

  return <HomeContent featured={featured} />;
}
