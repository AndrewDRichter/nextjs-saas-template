
import { redirect } from "next/navigation";
import { getScheduleInfo } from "./_data-access/get-schedule-info";

export default async function SchedulePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const userId = (await params).id;
    const user = await getScheduleInfo({ clinicId: userId });

    if (!user) {
        redirect("/");
    }

    console.log(user);
    return <p>
        Clinica <strong>{user?.name}</strong>
    </p>
}