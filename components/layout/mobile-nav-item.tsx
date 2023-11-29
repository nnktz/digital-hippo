import Image from 'next/image'
import Link from 'next/link'

import { PRODUCT_CATEGORIES } from '@/config'

type Category = (typeof PRODUCT_CATEGORIES)[number]

export const MobileNavItem = ({ category }: { category: Category }) => {
  return (
    <li key={category.label} className="space-y-10 px-4 pb-8 pt-10">
      <div className="border-b border-gray-200">
        <div className="-mb-px flex">
          <p className="flex-1 whitespace-nowrap border-b-2 border-transparent py-4 text-base font-medium text-gray-900">
            {category.label}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10">
        {category.featured.map((item) => (
          <div key={item.name} className="group relative text-sm">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
              <Image
                fill
                src={item.imageSrc}
                alt="product category image"
                className="object-cover object-center"
              />
            </div>
            <Link
              href={item.href}
              className="mt-6 block font-medium text-gray-900"
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </li>
  )
}
