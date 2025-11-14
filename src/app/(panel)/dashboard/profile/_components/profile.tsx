"use client";
import { useState } from "react";
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
import { cn } from "@/lib/utils";

export function ProfileContent() {
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useProfileForm();

  function generateTimeSlots(): string[] {
    const hours: string[] = [];

    for (let i = 7; i <= 20; i++) {
      for (let j = 0; j < 2; j++) {
        const hour =
          i.toString().padStart(2, "0") +
          ":" +
          (j * 30).toString().padStart(2, "0");
        hours.push(`${hour}`);
      }
    }

    return hours;
  }

  const hours = generateTimeSlots();

  function toggleHour(hour: string) {
    setSelectedHours((prev) =>
      prev.includes(hour)
        ? prev.filter((h) => h !== hour)
        : [...prev, hour].sort()
    );
  }

  const timeZones = Intl.supportedValuesOf('timeZone').filter((zone) =>
    zone.startsWith('America/Asuncion') ||
    zone.startsWith('America/Argentina/Buenos_Aires') ||
    zone.startsWith('America/Fortaleza') ||
    zone.startsWith('America/Recife') ||
    zone.startsWith('America/Bahia') ||
    zone.startsWith('America/Belem') ||
    zone.startsWith('America/Manaus') ||
    zone.startsWith('America/Cuiaba') ||
    zone.startsWith('America/Boa_Vista') ||
    zone.startsWith('America/Sao_Paulo')
  )

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

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                      <p className="text-sm text-muted-foreground mb-2">
                        Clique nos horários abaixo para marcar ou desmarcar
                      </p>
                      <div className="grid grid-cols-4 md:grid-cols-6 gap-1">
                        {hours.map((hour) => (
                          <Button
                            key={hour}
                            variant="outline"
                            className={cn(
                              "h-10",
                              selectedHours.includes(hour) &&
                              "border-2 border-emerald-500 text-primary"
                            )}
                            onClick={() => toggleHour(hour)}
                          >
                            {hour}
                          </Button>
                        ))}
                      </div>
                    </section>

                    <Button
                      className="w-full"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Fechar
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>

              <FormField
                control={form.control}
                name="timeZone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Fuso-horário
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o fuso-horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeZones.map((zone) => (
                            <SelectItem key={zone} value="zone">
                              {zone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400"
              >
                Salvar alterações
              </Button>

            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
