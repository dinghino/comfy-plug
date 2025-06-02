import { tv, VariantProps } from 'tailwind-variants'
import { cn } from '@/lib/utils'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'

const variants = tv({
  slots: {
    card: 'flex flex-col flex-start rounded-lg p-4 md:p-8 gap-4',
    title: 'text-lg font-semibold',
    icon: 'stroke-2',
  },
  variants: {
    background: {
      light: { card: 'bg-brand-green-light text-brand-green-light-foreground' },
      dark: { card: 'bg-brand-green-alt text-brand-green-alt-foreground' },
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
    typeof children === 'string' ? <p className="text-sm font-medium">{children}</p> : children
  return (
    <div className={cn(classes.card(), className)}>
      <div className="flex flex-col gap-2">
        <DynamicIcon size={48} name={icon} className={cn(classes.icon())} />
        <h3 className={cn(classes.title())}>{title}</h3>
      </div>
      {description}
    </div>
  )
}

export default FeatureCard
