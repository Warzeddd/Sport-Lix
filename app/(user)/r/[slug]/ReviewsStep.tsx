"use client"

import { Program } from "@prisma/client"
import { useState } from "react"

export const ReviewsStep = ({ program }: { program: Program }) => {
    const [step, setStep] = useState(0);

    if (step === 0) {
        return(
            <div className="flex h-full flex-col items-center justify-center">
                <h2 className="text-lg font-bold">
                    {program.description ?? `The program is ${program.name}`}
                </h2>
            </div>
        )
    }
}