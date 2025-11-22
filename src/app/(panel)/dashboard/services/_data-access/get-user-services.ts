"use server";
import prisma from "@/lib/prisma";

interface GetUserServicesProps {
  userId: string;
}

export async function getUserServices({ userId }: GetUserServicesProps) {
  try {
    if (!userId) {
      return null;
    }

    const services = await prisma.service.findMany({
      where: {
        userId: userId,
      },
    });

    if (!services) {
      return null;
    }

    return services;
  } catch (err) {
    console.log(err);
  }
}
