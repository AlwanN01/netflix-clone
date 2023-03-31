import Input from '@/components/Input'
import { useAuth } from '@/hooks/useAuth'
const Auth = () => {
  const set = useAuth.setAuth()

  return (
    <div className="relative h-full w-full bg-[url('../../public/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img src='/images/logo.png' alt='Logo' className='h-12' />
          <div className='flex justify-center'>
            <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
              <h2 className='text-white text-4xl mb-8 font-semibold'>Sign In</h2>
              <div className='flex flex-col gap-4'>
                <Input id='name' label='Name' onChange={set('name')} />
                <Input id='email' label='Email' type='email' onChange={set('email')} />
                <Input id='password' label='Password' type='password' onChange={set('password')} />
              </div>
              <input type='text' />
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Auth
