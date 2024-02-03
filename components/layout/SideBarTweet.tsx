import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useLoginModal } from "@/hooks/useLoginModel"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { FaFeather } from "react-icons/fa"
export  const SideBarTweetButton = ()=>{
    const router = useRouter()
    const {data:currentUser} = useCurrentUser()
    const LoginModal = useLoginModal();
    const doNothing = ()=>{
        return;
    }
    const onclick = useCallback(()=>{
        LoginModal.onOpen()
    },[LoginModal])
return <div onClick={ !currentUser ? onclick : doNothing}>
    <div className="
    mt-6
    lg:hidden
    rounded-full
    h-14
    w-14
    p-4
    flex
    items-center
    justify-center
    bg-sky-500
    hover:bg-opacity-80
    transition
    cursor-pointer
    ">
        <FaFeather size={24} color="white"/>
    </div>
    <div className="
    mt-6
    hidden
    lg:block
    rounded-full
    px-4
    py-2
    bg-sky-500
    hover:bg-opacity-90
    transition
    cursor-pointer
    ">
        {/* <FaFeather size={24} color="white" /> */}
        <p className="
        hidden
        lg:block
        text-center
        font-semibold
        text-white
        text-[20px]">
            Tweet
        </p>
    </div>
</div>
}