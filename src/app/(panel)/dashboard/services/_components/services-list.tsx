"use client";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon, PencilIcon, XIcon } from "lucide-react";
import { ServiceDialogContent } from "./service-dialog-content";
import { Service } from "@/generated/prisma/client";
import { formatCurrency } from "@/utils/currencyConvert";
import { deleteService } from "../_actions/delete-service";
import { toast } from "sonner";

interface ServicesListProps {
  services: Service[];
}

export function ServicesList({ services }: ServicesListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function handleDeleteService(serviceId: string) {
    const response = await deleteService({ serviceId: serviceId });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.data);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-bold text-xl md:text-2xl">
              Serviços
            </CardTitle>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="w-4 h-4" />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <ServiceDialogContent
                closeModal={() => {
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section className="space-y-4 mt-4">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex justify-between gap-2">
                    <h3 className="font-semibold">{service.name}</h3>
                    <span className="text-gray-500">-</span>
                    <span className="text-gray-500">
                      {formatCurrency(service.price / 100)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-1">
                    <Button variant={"ghost"} size={"icon"} onClick={() => {}}>
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  );
}
