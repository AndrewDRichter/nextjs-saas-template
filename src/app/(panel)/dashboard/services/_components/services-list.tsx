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
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { ServiceDialogContent } from "./service-dialog-content";

export function ServicesList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
              <ServiceDialogContent />
            </DialogContent>
          </CardHeader>
        </Card>
      </section>
    </Dialog>
  );
}
