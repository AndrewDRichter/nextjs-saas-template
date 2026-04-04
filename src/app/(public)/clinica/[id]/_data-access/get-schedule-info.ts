"use server"

import prisma from "@/lib/prisma";

export async function getScheduleInfo({ clinicId }: { clinicId: string }) {
    try {
        if (!clinicId) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: {
                id: clinicId,
            },
            include: {
                subscription: true,
                services: {
                    where: {
                        status: true,
                    }
                },
            }
        });

        if (!user) {
            return null;
        }

        return user;

    } catch (err) {

    }
}