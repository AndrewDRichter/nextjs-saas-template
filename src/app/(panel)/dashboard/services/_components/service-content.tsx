import { getUserServices } from "../_data-access/get-user-services";

interface ServiceContentProps {
  userId: string;
}

export async function ServiceContent({ userId }: ServiceContentProps) {
  const services = await getUserServices({ userId });

  console.log("Services: ", services);
  if (!services) {
    return <div>No services found.</div>;
  }

  return (
    <div>
      <h2>Service Content Component</h2>
    </div>
  );
}
