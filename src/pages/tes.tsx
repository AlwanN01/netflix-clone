import { useSession } from 'next-auth/react'

export default function Component() {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return <p>Signed in as {session.user.email}</p>
  }

  // eslint-disable-next-line @next/next/no-html-link-for-pages
  return <a href='/auth'>Sign in</a>
}
