"use client"


import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/features/theme/ThemeProvider"
import { PropsWithChildren } from "react"
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export type ProvidersProps = PropsWithChildren

export const Providers = (props: ProvidersProps) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
            </QueryClientProvider>
            <Toaster />
            {props.children}
        </ThemeProvider>
    )
}