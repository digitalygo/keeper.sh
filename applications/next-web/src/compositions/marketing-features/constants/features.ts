export type Feature = {
  id: number
  title: string
  description: string
  gridClasses: string
}

export const features: Feature[] = [
  {
    id: 1,
    title: "Universal Calendar Sync",
    description: "Google Calendar, Outlook, Apple Calendar, and more. Automatically sync events between your all your calendars no matter the provider.",
    gridClasses: "lg:col-start-5 lg:col-span-6 lg:row-start-1 border-border border-b sm:border-r"
  },
  {
    id: 2,
    title: "Privacy-First & Open Source",
    description: "Open-source, released under an AGPL-3.0 license. Secure and community driven.",
    gridClasses: "lg:col-start-1 lg:col-span-4 lg:row-start-1 border-border border-b lg:border-r"
  },
  {
    id: 3,
    title: "Simple Synchronization Engine",
    description: "Your events are aggregated, and computed against the destination. Discrepencies are reconciled. Built to prevent orphan events.",
    gridClasses: "lg:col-start-1 lg:col-span-6 lg:row-start-2 border-border border-b sm:border-b-0 sm:border-r"
  },
  {
    id: 4,
    title: "Quick Setup",
    description: "Source from OAuth connections, ICS links or CalDAV. Quick and simple to set up.",
    gridClasses: "lg:col-start-7 lg:col-span-4 lg:row-start-2 border-border"
  }
]
