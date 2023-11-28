'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Check, X } from 'lucide-react'

import { Product } from '@/server/payload-type'
import { PRODUCT_CATEGORIES } from '@/config'
import { formatPrice } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface CartItemProps {
  product: Product
  removeItem: () => void
}

export const CartItem = ({ product, removeItem }: CartItemProps) => {
  const label = PRODUCT_CATEGORIES.find((c) => c.value === product.category)
    ?.label

  const { image } = product.images[0]

  return (
    <li key={product.id} className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <div className="relative h-24 w-24">
          {typeof image !== 'string' && image.url && (
            <Image
              src={image.url}
              alt="Product image"
              fill
              className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
            />
          )}
        </div>
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <Link
                  href={`/products/${product.id}`}
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {product.name}
                </Link>
              </h3>
            </div>

            <div className="mt-1 flex text-sm">
              <p className="text-muted-foreground">Category: {label}</p>
            </div>

            <p className="mt-1 text-sm font-medium text-gray-900">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="mt-4 w-20 sm:mt-0 sm:pr-9">
            <div className="absolute right-0 top-0">
              <Button
                aria-label="remove product"
                onClick={removeItem}
                variant={'ghost'}
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
          <Check className="h-5 w-5 flex-shrink-0 text-green-500" />

          <span>Eligible for instant delivery</span>
        </p>
      </div>
    </li>
  )
}
