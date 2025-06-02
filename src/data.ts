import type { HeroCardProps } from "@/components/hero-card"
import type { FeatureCardProps } from "@/components/feature-card"

export const actions: HeroCardProps['actions'] = [
  { href: '#waitlist', children: 'Early access', variant: 'secondary' },
  // { href: '#', children: 'Become a partner', variant: 'outline', className: 'bg-transparent' }
]

export const features: FeatureCardProps[] = [
  {
    icon: 'store',
    title: 'You sign up and shop',
    children: 'Choose your product or join as reseller with no overhead',
  },
  {
    icon: 'tree-pine',
    title: 'We pack and ship',
    children: 'Your order is fulfilled by licensed partner - no stress',
    background: 'dark',
  },
  {
    title: 'Right to your doorstep',
    children: 'Stay comfy as the goods come to you',
    icon: 'door-open',
  },
]
