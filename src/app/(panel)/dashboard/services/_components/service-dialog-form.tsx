import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface UseServiceFormProps {
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

const serviceFormSchema = z.object({
  name: z.string().min(3, { message: "O nome é obrigatório" }),
  price: z.string().min(1, { message: "O preço do serviço é obrigatório" }),
  hours: z.string(),
  minutes: z.string(),
});

export type ServiceFormData = z.infer<typeof serviceFormSchema>;

export function useServiceForm() {
  return useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: "",
      price: "",
      hours: "",
      minutes: "",
    },
  });
}
