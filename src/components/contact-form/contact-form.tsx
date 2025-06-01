'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { tv } from 'tailwind-variants'
import { cn } from '@/lib/utils'

// Zod Schema
const contactFormSchema = z.object({
  role: z.enum(['customer', 'retailer', 'other'], {
    required_error: 'Please select your role.',
  }),
  alias: z.string().min(1, {
    message: 'Alias is required.',
  }),
  phone: z.string().min(1, {
    message: 'Phone number is required.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  wantsUpdates: z.boolean().default(false),
})

const roles = contactFormSchema.shape.role.options

// TypeScript type
type ContactFormData = z.input<typeof contactFormSchema>

const variants = tv({
  slots: {
    input: 'w-full bg-brand-green/10 py-6 border-brand-green/20 rounded-xl text-xs md:text-sm',
    checkbox: 'bg-brand-green/10 shadow-none',
  }
})

export const ContactForm = () => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      role: undefined,
      alias: '',
      phone: '',
      email: '',
      wantsUpdates: false,
    },
  })

  const onSubmit = (data: ContactFormData) => {
    console.log('Form data:', data)
  }

  const classes = variants()

  return (
    <div className="w-full max-w-lg mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Role Select */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>I am a</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={cn(classes.input())}>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Alias Input */}
          <FormField
            control={form.control}
            name="alias"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alias</FormLabel>
                <FormControl>
                  <Input className={cn(classes.input())} placeholder="Enter your alias" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number Input */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    type="tel"
                    className={cn(classes.input())}
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Input */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    className={cn(classes.input())}
                    placeholder="Enter your email address" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Early Access Checkbox */}
          <FormField
            control={form.control}
            name="wantsUpdates"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    className={cn(classes.checkbox())}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I want early access and updates
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-brand-green hover:bg-brand-green/90"
          >
            Stay Plugged In
          </Button>
        </form>
      </Form>
    </div>
  )
}
