import { fecther } from '@/libs/fetcher'
import useSwr from 'swr'

export const usePosts = (userId?:string)=>{
    console.log("I am from the posts searching")
    const url = userId ? `/api/posts?userId=${userId}` : '/api/posts'
    const{
        data,
        error,
        isLoading,
        mutate,
    } = useSwr(url,fecther);
    return{
        data,
        error,
        isLoading,
        mutate,
    }
}