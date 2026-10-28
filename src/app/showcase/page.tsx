import { WorkIndexView } from "@/components/organisms/WorkIndexView";

// The private portfolio link shared with Upwork clients: the Work page without the navbar, contact details or links back into the personal site.
export const metadata = { title: "Portfolio", description: "Product design case studies.", robots: { index: false, follow: false } };

export default function Showcase() {
  return <WorkIndexView share />;
}
