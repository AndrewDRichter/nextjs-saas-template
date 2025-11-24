import { getUserServices } from "../_data-access/get-user-services";
import { ServicesList } from "./services-list";

interface ServiceContentProps {
  userId: string;
}

export async function ServiceContent({ userId }: ServiceContentProps) {
  const services = await getUserServices({ userId });

  console.log("Services: ", services);

  return (
    <div>
      <ServicesList />
    </div>
  );
}
