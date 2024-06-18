import Image from "next/image"
import { LoggedInButton } from "../auth/LoggedInButton"
import { SigninButton } from "../auth/SigninButton"
import { Layout } from "@/components/layout"
import { ModeToggle } from "../theme/MoveToggle"

export const Header = async () => {
    return (
        <header className="w-full border-b border-border py-1">
            <Layout className="flex items-center grap-4">
                <div className="flex-1">
                    <Image
                        src="/icon.png"
                        width={32}
                        height={32}
                        alt="sport-lix logo" />
                </div>
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <LoggedInButton />
                </div>
            </Layout>
        </header>
    )
}