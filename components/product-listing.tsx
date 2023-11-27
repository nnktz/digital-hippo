'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Product } from '@/server/payload-type'
import { cn, formatPrice } from '@/lib/utils'
import { PRODUCT_CATEGORIES } from '@/config'

import { Skeleton } from './ui/skeleton'
import { ImageSlider } from './image-slider'

interface ProductListingProps {
  product: Product | null
  index: number
}

export const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  const ProductPlaceholder = () => {
    return (
      <div className="flex w-full flex-col">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100">
          <Skeleton className="h-full w-full" />
        </div>

        <Skeleton className="mt-4 h-4 w-2/3 rounded-lg" />
        <Skeleton className="mt-2 h-4 w-16 rounded-lg" />
        <Skeleton className="mt-2 h-4 w-12 rounded-lg" />
      </div>
    )
  }

  if (!product || !isVisible) {
    return <ProductPlaceholder />
  }

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category,
  )?.label

  const validUrls = product.images
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[]

  if (isVisible && product) {
    return (
      <Link
        href={`/products/${product.id}`}
        className={cn(
          'group/main invisible h-full w-full',
          isVisible && 'visible animate-in fade-in-5',
        )}
      >
        <div className="flex w-full flex-col">
          <ImageSlider urls={validUrls} />

          <h3 className="mt-4 text-sm font-medium text-gray-700">
            {product.name}
          </h3>

          <p className="mt-1 to-gray-500 text-sm">{label}</p>

          <p className="mt-1 text-sm font-medium text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    )
  }
}
