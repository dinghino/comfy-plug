import Image from 'next/image'
import { ContactForm } from '@/components/contact-form'
import { HeroCard } from '@/components/hero-card'
import { cn } from '@/lib/utils'
import { tv } from 'tailwind-variants'
import { FeatureCard } from '@/components/feature-card'

import * as data from '@/data'

const variants = tv({
  slots: {
    main: 'p-0 sm:p-4 md:p-16',
    wrapper: 'container mx-auto overflow-hidden sm:rounded-3xl shadow-lg p-0',
    section: 'px-4 md:px-8',
    container: 'container mx-auto overflow-hidden sm:rounded-3xl shadow-xl p-0',
  },
  variants: {
    background: {
      primary: {
        section: 'bg-brand-brown',
      },
      secondary: {
        section: 'bg-brand-brown/50',
      },
    },
  },
})

export default async function Home() {
  const classes = variants()

  const heroTitle = (
    <>
      Comfy is the
      <br />
      <span className="text-brand-brown font-semibold italic">new Plug</span>
    </>
  )

  return (
    <>
      <main className={cn(classes.main())}>
        <div className={cn(classes.wrapper())}>
          <header className={cn(classes.section({ background: 'primary' }), 'py-2 text-center')}>
            <Image
              src="/images/nav-bar-logo-small.png"
              alt="ComfyPlug Logo"
              width={215}
              height={32}
              className="inline-block py-2"
            />
          </header>
          {/* hero */}
          <section
            className={cn(classes.section({ background: 'secondary' }), 'py-24 pb-8 md:pt-32')}
          >
            <HeroCard
              actions={data.actions}
              title={heroTitle}
              description="Sit back and relax as the grey-market turns green"
            />
          </section>
          {/* features section */}
          <section
            className={cn(classes.section({ background: 'secondary' }), 'pt-8 pb-32 md:pb-48')}
          >
            <div className="container mx-auto max-w-5xl">
              <div className="text-brand-green mb-16">
                <h2 className="text-5xl font-semibold">How it works</h2>
                {/* <p className="text-sm"> We are not disrupting the plug. We ARE the plug - but legal.</p> */}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
                {data.features.map((feature, index) => (
                  <FeatureCard {...feature} className="" key={index} />
                ))}
              </div>
            </div>
          </section>
          {/* waitlist */}
          <section className="bg-brand-brown p-4 pt-32 pb-16 md:px-16">
            <div className="bg-brand-green-light text-brand-green mx-auto -mt-48 max-w-5xl rounded-2xl p-8 px-8 shadow-lg md:px-24">
              <h2 className="mb-16 text-center text-4xl font-semibold">Join the waitlist</h2>
              <ContactForm />
            </div>
          </section>
          <footer id="waitlist" className="bg-brand-brown py-16">
            <div
              className="h-24 w-full opacity-50"
              style={{
                backgroundImage: "url('/images/coming-soon.png')",
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'center',
                backgroundSize: 'auto 100%',
              }}
              aria-label="Coming soon banner"
            />
          </footer>
        </div>
      </main>
    </>
  )
}
