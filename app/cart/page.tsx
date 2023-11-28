'use client'

import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useCart } from '@/hooks/use-cart'
import { cn, formatPrice } from '@/lib/utils'
import { trpc } from '@/trpc/client'

import { Button } from '@/components/ui/button'
import { CartItem } from './_components/cart-item'

const CartPage = () => {
  const router = useRouter()
  const { items, removeItem } = useCart()

  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url)
      },
      onError: ({ data }) => {
        if (data?.code === 'UNAUTHORIZED') {
          toast.error('Please login.')
        }
      },
    })

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-opacity-75">
        <Loader2 className="h-16 w-16 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0,
  )

  const fee = items.length > 0 ? 1 : 0

  const productIds = items.map(({ product }) => product.id)

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="to-gray-900 text-3xl font-bold tracking-tight sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn(
              'lg:col-span-7',
              items.length === 0 &&
                'rounded-lg border-2 border-dashed border-zinc-200 p-12',
            )}
          >
            <h2 className="sr-only">Item in your shopping cart</h2>

            {items.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="relative mb-4 h-40 w-40 text-muted-foreground"
                >
                  <Image
                    src={'/hippo-empty-cart.png'}
                    alt="Empty cart"
                    loading="eager"
                    fill
                  />
                </div>

                <h3 className="text-2xl font-bold">Your cart is empty</h3>

                <p className="text-center text-muted-foreground">
                  Whoop! Nothing to show here yet.
                </p>
              </div>
            )}

            <ul
              className={cn(
                items.length > 0 &&
                  'divide-y divide-gray-200 border-b border-t border-gray-200',
              )}
            >
              {items.map(({ product }) => (
                <CartItem
                  key={product.id}
                  product={product}
                  removeItem={() => removeItem(product.id)}
                />
              ))}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className=" text-sm font-medium text-gray-900">
                  {formatPrice(cartTotal)}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Flat Transaction Fee</span>
                </div>

                <div className="text-sm font-medium text-gray-900">
                  {formatPrice(fee)}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-t-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">
                  Order total
                </div>

                <div className="text-base font-medium text-gray-900">
                  {formatPrice(fee + cartTotal)}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                disabled={isLoading || items.length === 0}
                onClick={() => createCheckoutSession({ productIds })}
                className="w-full"
                size={'lg'}
              >
                {isLoading && (
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                )}
                Checkout
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CartPage
