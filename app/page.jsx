import FeaturedProperties from '../components/FeaturedProperties';
import Hero from '../components/Hero';
import InfoBoxes from '../components/infoBoxes';

export const dynamic = 'force-dynamic';

export default function page() {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
    </>
  );
}
