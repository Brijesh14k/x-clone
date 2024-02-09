import { NextApiRequest } from "next";
import { getSession} from "next-auth/react";
import prisma from '@/libs/prismadb'
export const serverAuth = async (req:NextApiRequest)=>{
    const session = await getSession({req})
    if(!session?.user?.email)
    {
        throw new Error('Not sigin there is no email sending here')
    }
    const currentUser = await prisma?.user.findUnique({
        where:{
            email:session.user.email
        }
    })
    if(!currentUser)
    {
        throw new Error ("Not sigin")
    }
    return {currentUser}
}
