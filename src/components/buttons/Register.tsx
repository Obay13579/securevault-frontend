import React from 'react'
import { Button } from '@headlessui/react'
import Link from 'next/link'

const Register = () => {
  return (
    <Link href="/auth/register">
      <Button className="rounded-lg py-3 px-4 ml-1 mr-1 bg-white text-black font-[family-name:var(--font-now)] data-[hover]:bg-slate-200 data-[active]:bg-slate-50">
        Register
      </Button>
    </Link>
  )
}

export default Register