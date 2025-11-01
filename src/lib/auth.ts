import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import prisma from "./prisma"
import { Adapter } from "next-auth/adapters"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  trustHost: true,
  providers: [],
})