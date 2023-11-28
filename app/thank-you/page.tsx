import Image from 'next/image'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { getServerSideUser } from '@/lib/payload-utils'
import { getPayloadClient } from '@/server/get-payload'
import { Product, User } from '@/server/payload-type'
import { formatPrice } from '@/lib/utils'

import { ProductItem } from './_components/product-item'
import { PaymentStatus } from '@/components/payment-status'

interface ThankYouPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const ThankYouPage = async ({ searchParams }: ThankYouPageProps) => {
  const orderId = searchParams.orderId
  const nextCookie = cookies()

  const { user } = await getServerSideUser(nextCookie)

  const payload = await getPayloadClient()

  const { docs: orders } = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  })

  const [order] = orders

  if (!order) {
    return notFound()
  }

  const orderUserId =
    typeof order.user === 'string' ? order.user : order.user.id

  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`)
  }

  const products = order.products as Product[]

  const orderTotal = products.reduce((total, product) => {
    return total + product.price
  }, 0)

  const fee = products.length > 0 ? 1 : 0

  return (
    <div className="relative lg:min-h-full">
      <div className="hidden h-80 overflow-hidden md:block lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          src={'/checkout-thank-you.jpg'}
          alt="Thank you"
          fill
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div>
        <div className="p mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-blue-600">
              Order successful
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Thanks for ordering
            </h1>

            {order._isPaid ? (
              <p className="mt-2 text-base text-muted-foreground">
                You order was processed and assets are available to download
                below. We&apos;ve sent your receipt and order details to{' '}
                {typeof order.user !== 'string' && (
                  <span className="font-medium text-gray-900">
                    {order.user.email}
                  </span>
                )}
              </p>
            ) : (
              <p className="mt-2 text-base text-muted-foreground">
                We appreciate your order, and we&apos;re currently processing
                it. So hang tight and we&apos;ll send you confirm very soon!
              </p>
            )}

            <div className="mt-16 text-sm font-medium">
              <div className="text-muted-foreground">Order nr.</div>
              <div className="mt-2 text-gray-900">{order.id}</div>

              <ul className="mt-6 divide-y divide-gray-200 border-t border-t-gray-200 text-xs font-medium text-muted-foreground">
                {(order.products as Product[]).map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    isPaid={order._isPaid}
                  />
                ))}
              </ul>

              <div className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="text-gray-900">{formatPrice(orderTotal)}</p>
                </div>

                <div className="flex justify-between">
                  <p>Transaction Fee</p>
                  <p className="text-gray-900">{formatPrice(fee)}</p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <p className="text-base">Total</p>
                  <p className="text-base">{formatPrice(orderTotal + fee)}</p>
                </div>
              </div>

              <PaymentStatus
                orderEmail={(order.user as User).email}
                isPaid={order._isPaid}
                orderId={order.id}
              />

              <div className="mt-16 border-t border-gray-200 py-6 text-right">
                <Link
                  href={'/products'}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Continue Shopping %rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThankYouPage
