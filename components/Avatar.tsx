import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import Image from 'next/image'
interface AvatarProps{
    userId:string
    isLarge?:boolean
    hasBorder?:boolean
}
export const Avatar:React.FC<AvatarProps> = ({
    userId,
    isLarge,
    hasBorder
})=>{
    const router = useRouter()
    const {data:user = {}} = useUser(userId)
    console.log(user)
    const onclick = useCallback((event:any)=>{
        event.stopPropagation();
        const url = `/users/${userId}`
        router.push(url)
    },[router,userId])
    return <div className={
        `${hasBorder ? 'border-4 border-black':''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full
        hover:opacity-90
        transition
        cursor-pointer
        relative`
    }>
        <Image fill style={{
            objectFit:'cover',
            borderRadius:'100%'
        }}
        onClick={onclick}
        alt="Avatar"
            src={user.profileImage || '/images/placeholder.png'}/>
    </div>
}