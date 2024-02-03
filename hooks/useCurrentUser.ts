import useSWR from "swr"

import { fecther  } from "@/libs/fetcher"
export const useCurrentUser = ()=>{
    const {data,error,isLoading,mutate} = useSWR('/api/current',fecther)
    return {
        data,
        error,
        isLoading,
        mutate
    }
}