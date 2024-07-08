"use client"

import { Layout } from "@/components/layout";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SigninButton } from "@/features/auth/SigninButton";


export default function RouteError() {
    return (
        <Layout>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Sorry, you need to be logged in to view this page.
                    </CardTitle>
                </CardHeader>
                <CardFooter>
                    <SigninButton />
                </CardFooter>
            </Card>
        </Layout>
    )
}