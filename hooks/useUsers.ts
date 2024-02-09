import useSWR from "swr"

import { fecther } from "@/libs/fetcher"
export const useUsers = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/users', fecther)
    return {
        data,
        error,
        isLoading,
        mutate
    }
}