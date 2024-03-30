import FeaturedProperties from '../components/FeaturedProperties';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import InfoBoxes from '../components/infoBoxes';

export default function page() {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <Footer />
    </>
  );
}
