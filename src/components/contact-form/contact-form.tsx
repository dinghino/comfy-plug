'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { tv } from 'tailwind-variants'
import { cn } from '@/lib/utils'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FormFieldWrapper } from './form-field-wrapper'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { ContactFormData, contactFormSchema } from '@/lib/schemas'
import { submitWaitlistForm } from '@/lib/actions/waitlist'

const roles = contactFormSchema.shape.role.options

const variants = tv({
  slots: {
    input: 'w-full bg-brand-green/10 py-6 border-brand-green/20 rounded-xl text-xs md:text-sm',
    checkbox: 'bg-brand-green/10 shadow-none',
  },
})

type SubmissionState = {
  isSubmitting: boolean
  message: string
  success: boolean
}

export const ContactForm = () => {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitting: false,
    message: '',
    success: false,
  })

  const [selectKey, setSelectKey] = useState(0) // Key to force Select reset

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      role: roles[0],
      alias: '',
      phone: '',
      email: '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionState({ isSubmitting: true, message: '', success: false })

    try {
      // Call server action directly with validated data
      const { success, message } = await submitWaitlistForm(data)

      setSubmissionState({ isSubmitting: false, message, success })

      if (success) {
        form.reset()
        setSelectKey((prev) => prev + 1) // Force Select component to re-render
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmissionState({
        isSubmitting: false,
        message: 'Something went wrong. Please try again.',
        success: false,
      })
    }
  }

  const classes = variants()

  return (
    <div className="relative mx-auto w-full">
      {submissionState.success && (
        <div className="bg-brand-green-light absolute inset-0 z-50 grid place-items-center">
          <h2 className="text-brand-green text-xl font-semibold">Thank you for signing up!</h2>
        </div>
      )}
      {/* Success/Error Messages */}
      <SubmitResult state={submissionState} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Role Select */}
          <FormFieldWrapper control={form.control} name="role" label="I am a">
            {(field) => (
              <Select
                key={selectKey} // Force re-render on reset
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger className={cn(classes.input())}>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormFieldWrapper>

          {/* Alias Input */}
          <FormFieldWrapper control={form.control} name="alias" label="Alias" required>
            {(field) => (
              <Input className={cn(classes.input())} placeholder="Enter your alias" {...field} />
            )}
          </FormFieldWrapper>

          {/* Email Input */}
          <FormFieldWrapper control={form.control} name="email" label="Email" required>
            {(field) => (
              <Input
                type="email"
                className={cn(classes.input())}
                placeholder="Enter your email address"
                {...field}
              />
            )}
          </FormFieldWrapper>

          {/* Phone Number Input */}
          <FormFieldWrapper control={form.control} name="phone" label="Phone Number">
            {(field) => (
              <Input
                type="tel"
                className={cn(classes.input())}
                placeholder="Enter your phone number"
                {...field}
              />
            )}
          </FormFieldWrapper>

          {/* Early Access Checkbox */}
          {/* <FormFieldWrapper control={form.control} name="wantsUpdates" label="" className="flex flex-row items-start space-y-0 space-x-3">
            {(field) => (
              <div className="flex items-start space-x-3">
                <Checkbox checked={field.value} className={cn(classes.checkbox())} onCheckedChange={field.onChange} />
                <div className="space-y-1 leading-none">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Send me updates
                  </label>
                </div>
              </div>
            )}
          </FormFieldWrapper> */}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submissionState.isSubmitting || !form.formState.isValid}
            className="bg-brand-green hover:bg-brand-green/90 w-full"
          >
            {submissionState.isSubmitting ? 'Joining...' : 'Stay Plugged In'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

const SubmitResult = ({ state }: { state: SubmissionState }) => {
  if (!state.message) return null
  return (
    <div
      className={cn(
        'mb-4 rounded-lg p-4 text-sm',
        state.success
          ? 'border border-green-200 bg-green-50 text-green-800'
          : 'border border-red-200 bg-red-50 text-red-800'
      )}
    >
      {state.message}
    </div>
  )
}
