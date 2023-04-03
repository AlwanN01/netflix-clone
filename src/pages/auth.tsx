import Input from '@/components/Input'
import { useAuth } from '@/hooks/useAuth'
import { shallow } from 'zustand/shallow'
import { useRouter } from 'next/router'

const Auth = () => {
  const router = useRouter()
  const variant = useAuth.variant()
  const isRegistered = useAuth.isRegistered()
  const { setVariant, setAuth, dispatch } = useAuth(({ setVariant, setAuth, dispatch }) => ({ setVariant, setAuth, dispatch }), shallow)
  return (
    <div className="relative h-full w-full bg-[url('../../public/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img src='/images/logo.png' alt='Logo' className='h-12' />
          <div className='flex justify-center'>
            <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
              {isRegistered && <h1 className='text-green-400 text-5xl mb-8 font-semibold'>Successfull Registered</h1>}
              <h2 className='text-white text-4xl mb-8 font-semibold'>{variant == 'login' ? 'Sign In' : 'Create an Account'}</h2>
              <div className='flex flex-col gap-4'>
                {variant == 'register' && <Input id='name' label='Name' onChange={setAuth('name')} />}
                <Input id='email' label='Email' type='email' onChange={setAuth('email')} />
                <Input id='password' label='Password' type='password' onChange={setAuth('password')} />
              </div>
              <button
                onClick={() => dispatch({ type: variant == 'login' ? 'login' : 'register', router })}
                className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700'>
                {variant == 'login' ? 'Sign in' : 'Register'}
              </button>
              <p className='text-neutral-500 mt-12'>
                {variant == 'login' ? 'First time using Netflix ?' : 'Already have an account ?'}
                <span onClick={setVariant} className='text-white ml-1 hover:underline cursor-pointer select-none'>
                  {variant == 'login' ? 'Create an account' : 'Login'}
                </span>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Auth
