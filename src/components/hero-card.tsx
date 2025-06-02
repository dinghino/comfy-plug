import Image from 'next/image'
import Link from 'next/link'

import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'
import { cn } from '@/lib/utils'

export type LinkProps = {
  href: string
  children: React.ReactNode
  // props?: ComponentProps<typeof Button>
} & ComponentProps<typeof Button>

export type HeroCardProps = {
  title: React.ReactNode
  description?: React.ReactNode
  actions: [LinkProps, ...LinkProps[]]
  image?: string
}

// const variants = tv({})

const heroVariants = tv({
  slots: {
    image: 'rounded-2xl',
    card: 'shadow-none bg-brand-green text-brand-green-foreground max-w-5xl mx-auto md:overflow-visible',
    container: 'flex flex-col lg:flex-row lg:relative lg:py-16 lg:px-8 pt-0',
    content:
      'flex flex-col gap-6 p-8 sm:p-12 lg:gap-8 lg:pr-96 lg:justify-center text-center lg:text-left',
    title: 'text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl',
    description: 'text-brand-green-light/95 text-sm sm:text-lg lg:text-xl',
    actions:
      'flex flex-col sm:flex-row gap-4 sm:gap-6 lg:flex-row lg:gap-8 justify-center lg:justify-start',
  },
  variants: {
    mobile: {
      true: {
        content: 'justify-center text-center',
        image:
          'relative h-64 sm:h-80 w-full lg:hidden -mt-8 max-w-[75%] min-h-[32rem] mx-auto overflow-hidden shadow-lg',
      },
      false: {
        image: 'hidden lg:block absolute -top-16 -bottom-16 right-8 w-80 overflow-hidden shadow-lg',
      },
    },
  },
  defaultVariants: {
    mobile: false,
  },
})

export const HeroCard: React.FC<HeroCardProps> = async (props) => {
  const { title, description, image = '/images/hero-image.png', actions } = props

  const classes = heroVariants()

  return (
    <Card className={cn(classes.card(), 'pt-0')}>
      <div className={cn(classes.container())}>
        {/* Mobile Image - Shows on mobile/tablet only */}
        <div className={cn(classes.image({ mobile: true }))}>
          <Image
            src={image}
            alt="Hero Image"
            fill
            sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw"
            className="object-cover object-top"
          />
        </div>

        {/* Content - Responsive layout */}
        <CardContent className={cn(classes.content())}>
          <h2 className={cn(classes.title())}>{title}</h2>
          <p className={cn(classes.description())}>{description}</p>
          <div className={cn(classes.actions())}>
            {actions?.map(({ href, children, ...props }, index) => (
              <Button key={index} {...props} asChild>
                <Link href={href}>{children}</Link>
              </Button>
            ))}
          </div>
        </CardContent>

        {/* Desktop Image - Shows on desktop only */}
        <div className={cn(classes.image())}>
          <Image src={image} alt="Hero Image" fill className="object-cover" />
        </div>
      </div>
    </Card>
  )
}

export default HeroCard
