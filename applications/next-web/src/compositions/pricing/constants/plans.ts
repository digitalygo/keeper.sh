export type PricingPlan = {
  id: number
  name: string
  price: string
  priceNote?: string
  description: string
  features: string[]
  buttonText: string
  buttonHref: string
  highlighted?: boolean
}

export const plans: PricingPlan[] = [
  {
    id: 1,
    name: "Free",
    price: "$0",
    description: "For users that just want to get basic calendar syncing up and running.",
    features: [
      "Up to 2 calendar sources",
      "1 push destination",
      "Aggregate iCal feed",
      "Standard syncing every 30 minutes"
    ],
    buttonText: "Get Started",
    buttonHref: "/register"
  },
  {
    id: 2,
    name: "Pro",
    price: "$5",
    description: "For power users who want minutely syncs and unlimited calendars.",
    features: [
      "Unlimited calendar sources",
      "Unlimited push destinations",
      "Aggregate iCal feed",
      "Priority syncing every minute"
    ],
    buttonText: "Start Free Trial",
    buttonHref: "/register",
    highlighted: true
  }
]
