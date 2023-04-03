import { getSession, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next/types'

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}

export default function Home() {
  const router = useRouter()
  const { data } = useSession()
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='text-3xl font-bold underline'>Netflix Clone</h1>
      {data && <p className='text-white'>Log in as : {data.user.email}</p>}
      <button className='h-10 w-full bg-white' onClick={() => void signOut({ redirect: false }).then(() => router.push('/auth'))}>
        Log Out
      </button>
    </>
  )
}
