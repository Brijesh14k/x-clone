import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useLoginModal } from "@/hooks/useLoginModel";
import { formatDistanceStrict } from "date-fns";
import { useRouter } from "next/navigation";
import React from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { Avatar } from "../Avatar";

interface PostItemProps {
    userId?: string
    data: Record<string, any>

}
const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
    const router = useRouter()
    const logingModal = useLoginModal()
    const { data: currentUser } = useCurrentUser()
    const gotoUser = useCallback((event: any) => {
        event.stopPropagation()

        router.push(`/user/${data.user.id}`)
    }, [router, data.user.id])
    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`)
    }, [router, data.id])
    const onLike = useCallback((event: any) => {
        event.stopPropagation();
        logingModal.onOpen()
    }, [logingModal])
    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null;
        }
        const baseDate = new Date();
        return formatDistanceStrict(new Date(data.createdAt),baseDate);
    }, [data?.createdAt]);

    return <div onClick={goToPost}
    className="
    border-b-[1px]
    border-neutral-800
    p-5
    cursor-pointer
    hover:bg-neutral-900
    transition">
        <div className="flex flex-row items-start gap-3">
            <Avatar userId={data.user.id}/>
        </div>
        <div className="flex
        flex-row
        items-center gap-2">
            <p
            onClick={gotoUser} 
            className="text-white font-semibold
            cursor-pointer
            hover:underline">
                {data.user.name}
            </p>
            <span 
            onClick={gotoUser}className="text-neutral-500
            cursor-pointer
            hover:underline
            hidden
            md:block">
                @{data.user.username}
            </span>
            <span className="
            text-neutral-500
            text-sm">
                {createdAt}
            </span>
        </div>
        <div className="text-white mt-1">
            {data.body}
        </div>
        <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500
            gap-2
            cursor:pointer
            transition
            hover:text-sky-500">
                <AiOutlineMessage size={20}/>
                <p>
                    {data.comments?.length||0}
                </p>
            </div>
            <div 
            onClick={onLike}
            className="flex flex-row items-center text-neutral-500
            gap-2
            cursor:pointer
            transition
            hover:text-red-500">
                <AiOutlineHeart size={20} />
                <p>
                    {data.like?.length || 0}
                </p>
            </div>
        </div>
    </div>
}

export default PostItem;