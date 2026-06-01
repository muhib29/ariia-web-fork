// app/header-test/page.tsx

import { MobileHeader } from "@/components/homepage/header/mobileheader";

export default function HeaderTest() {
  return (
    <div>
      <MobileHeader />
      <div style={{ height: '200vh', background: '#f9f9f9' }} />
    </div>
  );
}