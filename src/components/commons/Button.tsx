'use client'

import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md'
  variant?: 'primary' | 'secondary'
  loading?: boolean
}

const sizeClasses = {
  sm: 'h-8 px-3 text-sm rounded-lg',
  md: 'h-11 px-6 rounded-xl',
}

const variantClasses = {
  primary: 'bg-linear-to-tr from-[#54dbed] to-[#8ef275] text-[#0C3803] font-semibold',
  secondary: 'bg-white border border-gray-300 text-gray-700 font-medium',
}

export default function Button({
  size = 'md',
  variant = 'primary',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2 cursor-pointer transition-all
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md active:scale-95'}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
        </svg>
      )}
      {children}
    </button>
  )
}
