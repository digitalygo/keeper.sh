import {
  CalendarSourcesSection,
  DestinationsSection,
  ICalLinkSection,
} from "@/components/integrations";
import { PageContent } from "@/components/page-content";

export default function IntegrationsPage() {
  return (
    <PageContent>
      <CalendarSourcesSection />
      <DestinationsSection />
      <ICalLinkSection />
    </PageContent>
  );
}
