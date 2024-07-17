"use server"

import { ActionError, userAction } from "@/safe-action";
import { z } from "zod";
import { put } from "@vercel/blob";

export const uploadImageAction = userAction(
    z.instanceof(FormData),
    async (FormData: FormData) => {
        const file = FormData.get("file") as File;

        if(!file) {
            throw new ActionError("file not found");
        }

        const name = file.name;

        const result = await put(name, file, {
            access: "public",
        });
        return result;
    }
);