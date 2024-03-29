import prisma from '@/libs/prismadb'
import { compare } from 'bcrypt'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import githubProvider from 'next-auth/providers/github'
import googleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
export default NextAuth({
  providers: [
    githubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || ''
    }),
    googleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) throw new Error('Email and Password required')
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user || !user.hashedPassword) throw new Error('Email does not exist')
        const isCorrectPassword = await compare(credentials.password, user.hashedPassword)
        if (!isCorrectPassword) throw new Error('Inccorect Password')
        return user
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      const user = await prisma.user.findUnique({ where: { email: token.email! } })
      if (!user) throw new Error('Email does not exist')
      session.user = user
      return session
    }
  },
  pages: {
    signIn: '/auth'
  },
  debug: process.env.NODE_ENV == 'development',
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  jwt: { secret: process.env.NEXTAUTH_JWT_SECRET },
  secret: process.env.NEXTAUTH_SECRET
})
