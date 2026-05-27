import { fetchAPI } from '../../utils/api-helper';
import { industryQuery } from '../../graphql/querys';
import IndustriesClient from './IndustriesClient';

export const revalidate = 60;

export default async function IndustriesPage() {
  const res = await fetchAPI(industryQuery);
  const industry = res?.data?.industry || null;

  return <IndustriesClient industry={industry} />;
}
