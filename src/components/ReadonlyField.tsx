import { useId, type ComponentProps, type ReactNode } from 'react'

type ReadonlyFieldProps = Omit<ComponentProps<'input'>, 'readOnly' | 'value'> & {
  label: string
  value: string
  action?: ReactNode
}

export function ReadonlyField({
  label,
  value,
  action,
  id,
  ...props
}: ReadonlyFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="relative flex h-[50px] items-center rounded-[13px] border-[1.5px] border-border has-[input:focus-visible]:border-primary">
      <label
        htmlFor={inputId}
        className="pointer-events-none absolute left-[4.5px] top-0 -translate-y-1/2 bg-white px-1 text-[13px] leading-none text-text-gray"
      >
        {label}
      </label>
      <input
        {...props}
        id={inputId}
        value={value}
        readOnly
        className="h-full min-w-0 flex-1 truncate bg-transparent pl-4 text-[16.5px] text-text-gray outline-none"
      />
      {action && <div className="mr-5 ml-3 shrink-0">{action}</div>}
    </div>
  )
}
