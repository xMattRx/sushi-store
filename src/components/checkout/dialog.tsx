// components/cart/CheckoutDialog.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useCartStore } from "@/stores/cart-store";
import { useCheckoutStore } from "@/stores/checkout-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import CheckoutProgressBar from "./ProgressBar";
import CheckoutReview from "./review";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    phone: z.string().min(1, "WhatsApp é obrigatório"),
    street: z.string().min(1, "Rua é obrigatória"),
    number: z.string().min(1, "Número é obrigatório"),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    zip: z.string().min(1, "CEP é obrigatório"),
});

type FormData = z.infer<typeof formSchema>;

const CheckoutDialog = ({ open, onOpenChange }: Props) => {
    const items = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clearCart);
    const { setCheckoutData } = useCheckoutStore();
    const [checkoutStep, setCheckoutStep] = useState(1);

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            street: "",
            number: "",
            neighborhood: "",
            city: "",
            zip: "",
        },
    });


    const { name, phone, street, number, neighborhood, city, zip } = watch();
    const address = `${street}, ${number}, ${neighborhood}, ${city} - ${zip}`;

    const handleSendWhatsApp = () => {
        const text = encodeURIComponent(
            `🍒 Novo Pedido:\n\nNome: ${name}\nWhatsApp: ${phone}\nEndereço: ${address}\n\n` +
            `Itens:\n` +
            items.map((item) => `- ${item.name} (R$ ${item.price.toFixed(2)})`).join("\n")
        );

        const url = `https://wa.me/+5531999999999?text=${text}`;
        window.open(url, "_blank");
        clearCart();
        onOpenChange(false);
        setCheckoutData({ name, phone, street, number, neighborhood, city, zip });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="pt-6">
                <CheckoutProgressBar step={checkoutStep} />

                <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl font-semibold">
                        {checkoutStep === 1 && "Informe seus dados"}
                        {checkoutStep === 2 && "Endereço de entrega"}
                        {checkoutStep === 3 && "Enviar pedido"}
                    </DialogTitle>
                </DialogHeader>

                <form className="space-y-4">
                    {checkoutStep === 1 && (
                        <>
                            <div>
                                <InputField
                                    placeholder="Seu nome"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                                )}
                            </div>
                            <div>
                                <InputField
                                    placeholder="Número de WhatsApp (com DDD)"
                                    {...register("phone")}
                                />
                                {errors.phone && (
                                    <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                                )}
                            </div>
                        </>
                    )}

                    {checkoutStep === 2 && (
                        <div className="space-y-3">
                            <div>
                                <InputField placeholder="Rua" {...register("street")} />
                                {errors.street && (
                                    <p className="text-sm text-red-500 mt-1">{errors.street.message}</p>
                                )}
                            </div>
                            <div>
                                <InputField placeholder="Número" {...register("number")} />
                                {errors.number && (
                                    <p className="text-sm text-red-500 mt-1">{errors.number.message}</p>
                                )}
                            </div>
                            <div>
                                <InputField placeholder="Bairro" {...register("neighborhood")} />
                                {errors.neighborhood && (
                                    <p className="text-sm text-red-500 mt-1">{errors.neighborhood.message}</p>
                                )}
                            </div>
                            <div>
                                <InputField placeholder="Cidade" {...register("city")} />
                                {errors.city && (
                                    <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
                                )}
                            </div>
                            <div>
                                <InputField placeholder="CEP" {...register("zip")} />
                                {errors.zip && (
                                    <p className="text-sm text-red-500 mt-1">{errors.zip.message}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {checkoutStep === 3 && (
                        <CheckoutReview name={name} phone={phone} address={address} onSend={handleSendWhatsApp} />
                    )}


                </form>


                <DialogFooter className="flex justify-between pt-6">
                    {checkoutStep > 1 && checkoutStep < 3 && (
                        <Button variant="outline" onClick={() => setCheckoutStep((s) => s - 1)}>
                            Voltar
                        </Button>
                    )}
                    {checkoutStep < 3 && (
                        <Button
                            type="button"
                            onClick={async () => {
                                const fieldsStep1 = ["name", "phone"] as const;
                                const fieldsStep2 = ["street", "number", "neighborhood", "city", "zip"] as const;

                                if (checkoutStep === 1) {
                                    const isValid = await trigger(fieldsStep1);
                                    if (isValid) setCheckoutStep(2);
                                } else if (checkoutStep === 2) {
                                    const isValid = await trigger(fieldsStep2);
                                    if (isValid) setCheckoutStep(3);
                                }
                            }}

                        >
                            Avançar
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutDialog;
