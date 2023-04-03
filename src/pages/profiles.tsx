import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)
  return session
    ? { props: {} }
    : {
        redirect: {
          destination: '/auth',
          permanent: false
        }
      }
}

type Props = {}
export default function Profiles({}: Props) {
  return (
    <div className='grid place-items-center h-full'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-white text-3xl md:text-6xl'>Who is Watching ?</h1>
        <div className='group flex-row w-44 mx-auto'>
          <div className='w-44 h-44 rounded-md border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'>
            <img src='/images/default-blue.png' alt='Profile' draggable={false} />
          </div>
          <div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white'>Name</div>
        </div>
      </div>
    </div>
  )
}
