import useSWR from "swr"

import { fecther } from "@/libs/fetcher"
export const useUser = (userId:string) => {
    const { data, error, isLoading, mutate } = useSWR(userId ? `/api/users/${userId}`: null, fecther)
    return {
        data,
        error,
        isLoading,
        mutate
    }
}