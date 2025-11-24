"use client";

import { DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export function ServiceDialogContent() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Novo Serviço</DialogTitle>
        <DialogDescription>Adicionar novo serviço</DialogDescription>
      </DialogHeader>

      <div>
        <h4>Conteúdo do modal</h4>
      </div>
    </>
  );
}
