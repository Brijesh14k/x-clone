import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { useLoginModal } from "@/hooks/useLoginModel"
import { useRegisterModal } from "@/hooks/useRegisteModal";
import axios from "axios";
import { useCallback } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export const RegisterModal = ()=>{
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const[name,setName] = useState<string>('')
    const[username,setUsername] = useState<string>('')
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
            registerModal.onClose()
            loginModal.onOpen()
        }
    },[isLoading,registerModal,loginModal])
    const onsubmit = useCallback(async ()=> {
        try {
            setIsLoading(true)
            await axios.post('/api/register',{
                email,
                password,
                username,
                name
            })
            toast.success('Accont Created')
            signIn('credentials',{
                email,
                password
            })
            registerModal.onClose()

        }
        catch (err) {
            console.error(err)
            toast.error('Something went wrong')
        }finally{
            setIsLoading(false)
        }
    },[loginModal,email,password,username,name])
    const bodsyContent =(
        <div className="flex flex-col gap-4">
           
            <Input
                palceholder="Name"
                onchange={(e) => setName(e.target.value)}
                value={name}
                disable={isLoading} />
            <Input
                palceholder="Username"
                onchange={(e) => setUsername(e.target.value)}
                value={username}
                disable={isLoading} />
            <Input
                palceholder="Email"
                onchange={(e) => setEmail(e.target.value)}
                value={email}
                disable={isLoading} />
            <Input
                palceholder="Password"
                type="password"
                onchange={(e) => setPassword(e.target.value)}
                value={password}
                disable={isLoading} />
        </div>
    )
    const footerContent =(
        <div className="
        text-neutral-400
        text-center
        mt-4">
            <p>Already Have accont? 
                <span className="text-white
                cursor-pointer
                hover:underline"onClick={onToggle}>
                    &nbsp;SignIn
                </span>
            </p>
        </div>
    )
    return <div>
        <Modal disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Create an Accont"
        actionLabel="Register"
        onsubmit={onsubmit}
        body={bodsyContent}
        onclose={registerModal.onClose
        }
        footer={footerContent}
        />
    </div>
}