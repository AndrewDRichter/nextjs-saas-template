import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <h1>Página Dashboard</h1>
      <div className="w-full h-[85vh] bg-emerald-50"></div>
      <div className="w-full h-[100vh] bg-emerald-200"></div>
      <div className="w-full h-[100vh] bg-emerald-500"></div>
    </div>
  );
}
