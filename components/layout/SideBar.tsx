import {BsBellFill, BsHouseFill} from 'react-icons/bs'
import {FaUser} from 'react-icons/fa'
import { SideBarItem } from './SideBarItem'
import { SideBarLogo } from './SideBarLogo'
import { IconType } from "react-icons"
import {BiLogOut} from 'react-icons/bi'
import { SideBarTweetButton } from './SideBarTweet'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'
interface ItemProps{
    label:string
    href:string
    icon:IconType,
    auth?:boolean
}
export const SideBar = ()=>{
    const {data:currentUser} = useCurrentUser()
    const items:ItemProps[] =[
        {
            label:'Home',
            href:'/',
            icon:BsHouseFill
        },{
            label:'Notifications',
            href:'/notifications',
            icon:BsBellFill,
            auth:true
        },
        {
            label:"Profile",
            href:'/users/123',
            icon:FaUser,
            auth:true
        }
    ]
    return <div className='col-span1 h-full pr-4 md:pr-6'>
        <div className='flex flex-col items-end'>
            <div className='space-y-2 lg:w-[230px]'>
                <SideBarLogo/>
                {
                    items.map(item => <SideBarItem key={item.href} href={item.href} label={item.label} icon={item.icon} auth={item.auth}/>)
                }
                {/* todo need to add the href */}
                {
                    currentUser &&(<><SideBarItem onclick={() => signOut() } icon={BiLogOut} label='logout' href='' /></>)
                }
                <SideBarTweetButton />
            </div>
        </div>
    </div>
} 