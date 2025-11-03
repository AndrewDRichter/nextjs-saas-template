import getSession from "@/lib/getSession";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getUserData } from "./_data-access/get-info-user";

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const user = await getUserData({ userId: session.user?.id });

  if (!user) {
    redirect("/");
  }

  return (
    <section>
      <h1>Profile page</h1>
    </section>
  );
}
