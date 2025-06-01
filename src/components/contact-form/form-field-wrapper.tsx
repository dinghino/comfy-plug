/**
 * ADHD wrapper component for React Hook Form fields, because i just hate
 * repeating myself over and over again - so i do it over and over again.
 */

import { ReactNode } from 'react'
import { Control, FieldPath, FieldValues, ControllerRenderProps } from 'react-hook-form'
import { cn } from '@/lib/utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

interface FormFieldWrapperProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>
  name: TName
  label: string
  children: (field: ControllerRenderProps<TFieldValues, TName>) => ReactNode
  className?: string
  required?: boolean
}

export function FormFieldWrapper<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  children,
  className,
  required = false,
}: FormFieldWrapperProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            {children(field)}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
