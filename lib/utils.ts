import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

// Data Processing
// -------------------------------------------------------
export function sliceData<T>(data: T[], count: number): T[] {
  return data.slice(0, count)
}

export function currencyFormatter(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`
  } else if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`
  } else if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(1)}K`
  } else {
    return `$${amount.toLocaleString('en-US')}`
  }
}

export function quantityFormatter(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`
  } else {
    return value.toFixed(1).toLocaleString()
  }
}

export function numberFormatter(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(0)}B`
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(0)}M`
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}K`
  } else {
    return value.toFixed(0).toLocaleString()
  }
}

export function percentageFormatter(value: number): string {
  return `${value.toFixed(1)}%`
}

export function percentageFormatter2(value: number): string {
  return `${value.toFixed(2)}%`
}

export function floatFormatter(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`
  } else {
    return value.toLocaleString()
  }
}

export function quantityFormatterT(value: number): string {
  return `${value.toLocaleString()} t`
}

export function formatNumberWithCommas(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// -------------------------------------------------------
