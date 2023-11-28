'use client'

import { useEffect, useState } from 'react'

import { useCart } from '@/hooks/use-cart'
import { Product } from '@/server/payload-type'

import { Button } from './ui/button'

interface AddToCartButtonProps {
  product: Product
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addItem } = useCart()

  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  return (
    <Button
      disabled={isSuccess}
      onClick={() => {
        addItem(product)
        setIsSuccess(true)
      }}
      size={'lg'}
      className="w-full"
    >
      {isSuccess ? 'Added' : 'Add to cart'}
    </Button>
  )
}
