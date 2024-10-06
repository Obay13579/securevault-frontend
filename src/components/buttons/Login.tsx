import React from 'react';
import { Button } from '@headlessui/react';
import Link from 'next/link';

const Login = () => {
  return (
    <Link href="/auth/login">
      <Button className="rounded-lg py-3 px-4 ml-1 mr-1 bg-black text-white font-[family-name:var(--font-now)] data-[hover]:bg-zinc-800 data-[active]:bg-zinc-950">
        Login
      </Button>
    </Link>
  )
}

export default Login;