"use client";
import { useProfileForm } from "./profile-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import placeholderIMG from "../../../../../../public/foto1.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function ProfileContent() {
  const form = useProfileForm();

  return (
    <div className="mx-auto">
      <Form {...form}>
        <form>
          <Card>
            <CardHeader>
              <CardTitle>Meu perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden">
                  <Image
                    src={placeholderIMG}
                    alt="Profile photo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Nome completo
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite o nome da clínica..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Endereço</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Endereço da clínica..."
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Telefone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Telefone da clínica..."
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Status da Clínica
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue="active"
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status da clínica" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">
                              Ativo (clínica aberta)
                            </SelectItem>
                            <SelectItem value="inactive">
                              Inativo (clínica fechada)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">
                  Configurar horários de funcionamento da clínica
                </Label>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      Clique aqui para selecionar horários
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Horários de funcionamento</DialogTitle>
                      <DialogDescription>Em construção...</DialogDescription>
                    </DialogHeader>

                    <section className="py-4">
                      <p className="text-sm text-muted-foreground">
                        Clique nos horários abaixo para marcar ou desmarcar
                      </p>
                      <div>...</div>
                    </section>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
