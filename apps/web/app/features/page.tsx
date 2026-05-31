
import { NewsletterFooter } from '../../components/homepage/footer';
import { FeaturesSection } from '../../components/homepage/FeaturesSection';
import { Header } from '@/components/homepage/header/header';

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
