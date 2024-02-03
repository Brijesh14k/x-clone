import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useLoginModal } from "@/hooks/useLoginModel"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { IconType } from "react-icons"


interface SideBarItemProps {
    label: string
    href: string
    icon: IconType
    onclick?: () => void
    auth?:boolean
}
export const SideBarItem = ({
    href,
    label,
    icon: Icon,
    onclick,
    auth
}: SideBarItemProps) => {
    const loginModal = useLoginModal()
    const {data:currentUser} = useCurrentUser()
    const router = useRouter()
    const handelClick  = useCallback(()=>{
        if(onclick)
        {
            return onclick();
        }
        if(auth && !currentUser)
        {
            loginModal.onOpen()
        }
        else
        {
            router.push(href)
        }
    },[router,onclick,href,currentUser,auth,loginModal])
    return <div onClick={handelClick} 
    className="flex flex-row item-center">
        <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10  cursor-pointer lg:hidden ">
            <Icon size={28} color="white" />
        </div>
        <div className="
            relative
            hidden
            lg:flex
            gap-4
            p-4
            rounded-full
            hover:bg-slate-300
            hover:bg-opacity-10
            cursor-pointer
            items-center
        ">
            <Icon size={24} color="white"/>
            <p className="
            hidden
            lg:block
            text-white
            text-xl
            ">
                {label}
            </p>
        </div>
    </div>
}