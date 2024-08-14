"use client"


import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/features/theme/ThemeProvider"
import { PropsWithChildren } from "react"
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import { SessionProvider } from "next-auth/react"

const queryClient = new QueryClient()

export type ProvidersProps = PropsWithChildren

export const Providers = (props: ProvidersProps) => {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <QueryClientProvider client={queryClient}>
                <Toaster />
                {props.children}
                </QueryClientProvider>
            </ThemeProvider>
        </SessionProvider>
    )
}