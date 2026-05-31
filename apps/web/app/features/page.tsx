import { Header } from '../../components/homepage/header';
import { NewsletterFooter } from '../../components/homepage/footer';
import { FeaturesSection } from '../../components/homepage/FeaturesSection';

export const revalidate = 60;

export default async function FeaturesPage() {
  return (
    <>
      <Header  />     {/* //changed */}
      <FeaturesSection />
      <NewsletterFooter isHomePage={false} />
    </>
  );
}
