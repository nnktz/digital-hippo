'use client'

import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { PRODUCT_CATEGORIES } from '@/config'

import { MobileNavItem } from './mobile-nav-item'
import { MobileNavActions } from './mobile-nav-actions'
import { User } from '@/server/payload-type'

interface MobileNavProps {
  user?: User | null
}

export const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false)
    }
  }

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 lg:hidden"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    )

  return (
    <div>
      <div className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>

      <div className="fixed inset-0 z-40 flex overflow-y-scroll overscroll-y-none">
        <div className="w-4/5">
          <div className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-2">
              <ul>
                {PRODUCT_CATEGORIES.map((category) => (
                  <MobileNavItem key={category.value} category={category} />
                ))}
              </ul>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <MobileNavActions
                closeOnCurrent={() => closeOnCurrent}
                user={user}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
