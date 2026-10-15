import type { ComponentProps } from 'react'
import { Check } from 'lucide-react'

type CheckboxProps = Omit<ComponentProps<'input'>, 'type'> & {
  label: string
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-[13.5px] text-[16.5px] text-text-gray ${className}`}
    >
      <span className="relative flex size-5 shrink-0">
        <input
          {...props}
          type="checkbox"
          className="peer size-5 cursor-pointer appearance-none rounded-[3px] border-[1.5px] border-[#8A8A8A] transition-colors checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
        />
        <Check
          aria-hidden="true"
          strokeWidth={3}
          className="pointer-events-none absolute inset-0 m-auto size-3.5 text-white opacity-0 peer-checked:opacity-100"
        />
      </span>
      {label}
    </label>
  )
}
