'use client'

import Image from 'next/image'

import { Product, ProductFile } from '@/server/payload-type'
import { PRODUCT_CATEGORIES } from '@/config'
import { formatPrice } from '@/lib/utils'

interface ProductItemProps {
  product: Product
  isPaid: boolean
}

export const ProductItem = ({ product, isPaid }: ProductItemProps) => {
  const label = PRODUCT_CATEGORIES.find((c) => c.value === product.category)
    ?.label

  const downloadUrl = (product.product_files as ProductFile).url as string

  const { image } = product.images[0]

  return (
    <li key={product.id} className="flex space-x-6 py-6">
      <div className="relative h-24 w-24">
        {typeof image !== 'string' && image.url && (
          <Image
            src={image.url}
            alt={`${product.name} image`}
            fill
            className="flex-none rounded-md bg-gray-100 object-cover object-center"
          />
        )}
      </div>

      <div className="flex flex-auto flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-gray-900">{product.name}</h3>

          <p className="my-1">Category: {label}</p>
        </div>

        {isPaid && (
          <a
            href={downloadUrl}
            download={product.name}
            className="text-blue-600 underline-offset-2 hover:underline"
          >
            Download asset
          </a>
        )}
      </div>

      <p className="flex-none font-medium text-gray-900">
        {formatPrice(product.price)}
      </p>
    </li>
  )
}
