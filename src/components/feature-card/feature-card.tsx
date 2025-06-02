import { tv, VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'

const variants = tv({
  slots: {
    card: ['flex flex-col flex-start p-4 md:p-8 gap-8', 'rounded-lg', 'text-center'],
    title: 'text-lg font-semibold',
    icon: 'stroke-1',
    header: 'flex flex-col items-center gap-2',
  },
  variants: {
    background: {
      light: {
        card: 'bg-brand-green-light text-brand-green-light-foreground',
      },
      dark: {
        card: 'bg-brand-green-alt text-brand-green-alt-foreground',
      },
    },
  },
  defaultVariants: {
    background: 'light',
  },
})

export type FeatureCardProps = {
  className?: string
  title: string
  children: React.ReactNode
  icon: IconName
} & VariantProps<typeof variants>

export const FeatureCard: React.FC<FeatureCardProps> = (props) => {
  const { className, title, children, icon, ...rest } = props
  const classes = variants({ ...rest })
  const description =
    typeof children === 'string' ? (
      <p className="text-md font-light tracking-wide">{children}</p>
    ) : (
      children
    )
  return (
    <article className={cn(classes.card(), className)}>
      <header className={cn(classes.header())}>
        <DynamicIcon size={48} name={icon} className={cn(classes.icon())} />
        <h3 className={cn(classes.title())}>{title}</h3>
      </header>
      {description}
    </article>
  )
}

export default FeatureCard
