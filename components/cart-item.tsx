'use client'

import Image from 'next/image'
import { ImageIcon, X } from 'lucide-react'

import { PRODUCT_CATEGORIES } from '@/config'
import { Product } from '@/server/payload-type'
import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils'

interface CartItemProps {
  data: Product
}

export const CartItem = ({ data }: CartItemProps) => {
  const { image } = data.images[0]

  const { removeItem } = useCart()

  const label = PRODUCT_CATEGORIES.find(({ value }) => value === data.category)
    ?.label

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof image !== 'string' && image.url ? (
              <Image
                src={image.url}
                alt={data.name}
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
            <span className="mb-1 line-clamp-1 text-sm font-medium">
              {data.name}
            </span>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {label}
            </span>

            <div className="mt-4 to-muted-foreground text-xs">
              <button
                onClick={() => removeItem(data.id)}
                className="flex items-center gap-0.5 transition hover:opacity-75"
              >
                <X className="h-4 w-3" />
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatPrice(data.price)}
          </span>
        </div>
      </div>
    </div>
  )
}
