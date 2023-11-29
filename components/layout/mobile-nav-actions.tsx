'use client'

import Link from 'next/link'

import { useAuth } from '@/hooks/use-auth'
import { User } from '@/server/payload-type'

interface MobileNavActionsProps {
  user?: User | null
  closeOnCurrent: (href: string) => void
}

export const MobileNavActions = ({
  user,
  closeOnCurrent,
}: MobileNavActionsProps) => {
  const { signOut } = useAuth()

  return (
    <>
      {user ? (
        <div className="flow-root">
          <div
            role="button"
            onClick={signOut}
            className="-m-2 block rounded-md p-2 font-medium text-gray-900 hover:bg-gray-100"
          >
            Logout
          </div>
        </div>
      ) : (
        <>
          <div className="flow-root">
            <Link
              onClick={() => closeOnCurrent('/sign-in')}
              href="/sign-in"
              className="-m-2 block rounded-md p-2 font-medium text-gray-900 hover:bg-gray-100"
            >
              Sign in
            </Link>
          </div>
          <div className="flow-root">
            <Link
              onClick={() => closeOnCurrent('/sign-up')}
              href="/sign-up"
              className="-m-2 block rounded-md p-2 font-medium text-gray-900 hover:bg-gray-100"
            >
              Sign up
            </Link>
          </div>
        </>
      )}
    </>
  )
}
