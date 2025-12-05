"use client";

import { useState } from "react";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useServiceForm, ServiceFormData } from "./service-dialog-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { convertRealToCents } from "@/utils/currencyConvert";
import { createService } from "../_actions/create-service";
import { toast } from "sonner";
import { updateService } from "../_actions/update-service";

interface ServiceDialogProps {
  closeModal: () => void;
  serviceId?: string;
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

export function ServiceDialogContent({
  closeModal,
  serviceId,
  initialValues,
}: ServiceDialogProps) {
  const form = useServiceForm({ initialValues });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: ServiceFormData) {
    setIsLoading(true);
    const priceInCents = convertRealToCents(values.price);
    const hours = parseInt(values.hours) || 0;
    const minutes = parseInt(values.minutes) || 0;

    const duration = hours * 60 + minutes;

    if (serviceId) {
      await editServiceById({
        serviceId: serviceId,
        name: values.name,
        priceInCents: priceInCents,
        duration: duration,
      });

      setIsLoading(false);

      return;
    }

    const response = await createService({
      name: values.name,
      price: priceInCents,
      duration: duration,
    });

    setIsLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    } else {
      toast.success("Serviço cadastrado com sucesso!");
      handleCloseModal();
    }
  }

  async function editServiceById({
    serviceId,
    name,
    priceInCents,
    duration,
  }: {
    serviceId: string;
    name: string;
    priceInCents: number;
    duration: number;
  }) {
    const response = await updateService({
      serviceId: serviceId,
      name: name,
      price: priceInCents,
      duration: duration,
    });

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Serviço atualizado com sucesso!");
    handleCloseModal();
  }

  function handleCloseModal() {
    form.reset();
    closeModal();
  }

  function currencyMask(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.replace(/\D/g, "");

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace(".", ",");
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    event.target.value = value;
    form.setValue("price", value);
  }

  return (
    <>
      {serviceId ? (
        <DialogHeader>
          <DialogTitle>Editar Serviço</DialogTitle>
          <DialogDescription>Atualizar dados do serviço</DialogDescription>
        </DialogHeader>
      ) : (
        <DialogHeader>
          <DialogTitle>Novo Serviço</DialogTitle>
          <DialogDescription>Adicionar novo serviço</DialogDescription>
        </DialogHeader>
      )}

      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serviço</FormLabel>
                  <FormControl>
                    <Input placeholder="Serviço..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0,00"
                      {...field}
                      onChange={currencyMask}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p>Duração do Serviço</p>
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horas:</FormLabel>
                    <FormControl>
                      <Input placeholder="0" min="0" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minutos:</FormLabel>
                    <FormControl>
                      <Input placeholder="0" min="0" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            className="w-full font-semibold"
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? "Cadastrando..."
              : `${serviceId ? "Atualizar" : "Cadastrar"}`}
          </Button>
        </form>
      </Form>
    </>
  );
}
