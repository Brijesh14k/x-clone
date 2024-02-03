import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { useLoginModal } from "@/hooks/useLoginModel"
import { useRegisterModal } from "@/hooks/useRegisteModal";
import { signIn } from "next-auth/react";
import { useCallback } from "react";
import { useState } from "react";

export const LoginModal = ()=>{
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [email,setEmail] = useState<string>('') 
    const[password,setPassword] = useState<string>('')
    const[isLoading,setIsLoading] = useState<boolean>(false);
    const onToggle = useCallback(()=>{
        if(isLoading)
        {
            return;
        }
        else
        {
            loginModal.onClose();
            registerModal.onOpen()
        }
    },[isLoading,loginModal,registerModal])
    const onsubmit = useCallback(async ()=> {
        try {
            setIsLoading(true)
            await signIn('credentials',{
                email,
                password
            })
            loginModal.onClose()

        }
        catch (err) {
            console.error(err)
        }finally{
            setIsLoading(false)
        }
    },[loginModal,email,password])
    const bodsyContent =(
        <div className="flex flex-col gap-4">
            <Input 
            palceholder="Email"
            onchange={(e)=> setEmail(e.target.value)}
            value={email}
            disable={isLoading}/>
            <Input
                palceholder="Password"
                type="password"
                onchange={(e) => setPassword(e.target.value)}
                value={password}
                disable={isLoading} />
        </div>
    )
    const footerContent = (
        <div>
            <p className="
        text-neutral-400
        text-center
        mt-4">New to Here? <span className="text-white
                cursor-pointer
                hover:underline" onClick={onToggle}>
                &nbsp;Register</span></p>
        </div>
    )
    return <div>
        <Modal disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Signin"
        onsubmit={onsubmit}
        body={bodsyContent}
        onclose={loginModal.onClose}
        footer={footerContent}
        />
    </div>
}