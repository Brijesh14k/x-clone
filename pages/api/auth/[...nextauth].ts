import bcrypt from "bcrypt"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/libs/prismadb"
// import { debug } from "console"

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                try{
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Ivalid credentials')
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user || !user?.hashedPassword) {
                    throw new Error("Invalid Credentials")
                }
                const isCorrect = bcrypt.compare(credentials.password,
                    user.hashedPassword
                )
                if (!isCorrect) {
                    throw new Error('Invalid Credentials')
                }
                    return Promise.resolve(user)
            }catch(err)
            {
                    return Promise.resolve(null)
            }
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET

})