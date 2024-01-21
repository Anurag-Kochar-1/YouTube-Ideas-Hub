import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export const Logo = ({className}: {className: string}) => {
  return (
    <Link href={`/`} className={cn(`text-xl`, className)}>
        💡
    </Link>
  )
}
