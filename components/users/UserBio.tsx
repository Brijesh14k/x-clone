import { useCurrentUser } from "@/hooks/useCurrentUser"
import {format} from 'date-fns'
import { useUser } from "@/hooks/useUser"
import { useMemo } from "react"
import { Button } from "../Button"
import {BiCalendar} from "react-icons/bi"
import { useEditModal } from "@/hooks/useEditModal"

interface UserBioProps{
    userId:string
}
export const UserBio:React.FC<UserBioProps> = ({userId})=>{
    const{data:currentUser } = useCurrentUser()
    const{data:fectedUser}= useUser(userId)
    const editModal = useEditModal()
    const createdAt = useMemo(()=>{
        if(!fectedUser?.createdAt){
            return null
        }
        return format(new Date(fectedUser.createdAt),'MMMM yyyy')
    },[fectedUser?.createdAt])
    return <div className="border-b-[1px] border-neutral-800 pb-4">
        <div className="flex justify-end p-2">
            {
                currentUser?.id === userId?(
                    <Button secondary label="Edit" onclick={()=>{
                        console.log("I am running")
                        editModal.onOpen()
                    }}/>
                ):(
                    <Button onclick={()=>{}}
                    label="follow"
                    secondary/>
                )
            }
        </div>
            <div className="mt-8 px-4">
                <div className="flex flex-col">
                    <p className="text-white text-2xl font-semibold">
                        {fectedUser?.name}
                    </p>
                    <p className="text-md text-neutral-500">
                        @{fectedUser?.username}
                    </p>
                </div>
                <div className="flex flex-col mt-4">
                    <p className="text-white">
                        {fectedUser?.bio}
                    </p>
                    <div className="flex -flex-row items-center
                    gap-2
                    mt-4
                    text-neutral-500">
                        <BiCalendar size={24}
                        />
                        <p>
                            Joined{createdAt}
                        </p>
                    </div>
                    <div className="flex flex-row items-cetner mt-4 gap-6">
                        <div className="flex flex-row items-center gap-1">
                            <p className="text-white">
                                {fectedUser?.followingIds?.length}
                            </p>
                            <p className="text-neutral-500">
                                Following
                            </p>
                        </div>
                    <div className="flex flex-row items-center gap-1">
                        <p className="text-white">
                            {fectedUser?.followersCount||0}
                        </p>
                        <p className="text-neutral-500">
                            Followers
                        </p>
                    </div>

                    </div>
                </div>
            </div>
    </div>
}