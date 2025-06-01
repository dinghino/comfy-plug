import Image from 'next/image'
import { ContactForm } from "@/components/contact-form"
import { HeroCard, type HeroCardProps } from "@/components/hero-card"
import { cn } from "@/lib/utils"
import { tv } from "tailwind-variants"

const actions: HeroCardProps['actions'] = [
  { href: '#form', children: 'Early access', variant: 'secondary' },
  // { href: '#', children: 'Become a partner', variant: 'outline', className: 'bg-transparent' }
]

const variants = tv({
  slots: {
    main: 'p-0 sm:p-4 md:p-16',
    wrapper: 'container mx-auto overflow-hidden sm:rounded-3xl shadow-xl p-0',
    section: 'px-4 md:px-8',
    container: 'container mx-auto overflow-hidden sm:rounded-3xl shadow-xl p-0',
  },
  variants: {
    background: {
      primary: {
        section: 'bg-brand-brown'
      },
      secondary: {
        section: 'bg-brand-brown/50'
      },
    }
  }
})

export default async function Home() {
  const classes = variants()
  return (
    <main className={cn(classes.main())}>
      <div className={cn(classes.wrapper())}>
        <header className={cn(classes.section({ background: 'primary' }), "py-2 text-center")}>
          <Image src="/images/nav-bar-logo-small.png" alt="ComfyPlug Logo" width={215} height={32} className="inline-block py-2" />
        </header>
        <section className={cn(classes.section({ background: 'secondary' }), "pt-16 pb-24 md:pt-32 md:pb-72")}>
          {/* <div> */}
          <HeroCard
            actions={actions}
            title={<>Comfy is the<br /><span className="italic font-semibold text-brand-brown">new Plug</span></>}
            description="Sit back and relax as the black-market turns green"
          />
          {/* </div> */}
        </section>
        <section className="bg-brand-brown p-4 md:px-16 pt-32 pb-16">
          <div className="rounded-2xl bg-brand-green-light text-brand-green p-8 -mt-48 max-w-3xl mx-auto shadow-2xl">
            <h2 className="text-4xl font-semibold text-center mb-16">Join the waitlist</h2>
            <ContactForm />
          </div>
        </section>
        <section id="form" className="bg-brand-brown py-16">
          <div
            className=" opacity-50 h-24 w-full"
            style={{
              backgroundImage: "url('/images/coming-soon.png')",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "center",
              backgroundSize: "auto 100%",
            }}
            aria-label="Coming soon banner"
          />
        </section>
      </div>
    </main>
  )
}
