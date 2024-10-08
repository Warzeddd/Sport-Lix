"use client"

import { Layout } from "@/components/layout";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInButton } from "@/features/auth/SignInButton";


export default function RouteError() {
    return (
        <Layout>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Program not found.
                    </CardTitle>
                    <CardDescription>
                        The program may deleted or you don't have permission to view it.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <SignInButton />
                </CardFooter>
            </Card>
        </Layout>
    )
}