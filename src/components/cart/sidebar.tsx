"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { RocketIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useCartStore } from "../../stores/cart-store";
import { useUIStore } from "../../stores/ui-store";
import CheckoutDialog from "../checkout/dialog";
import { Button } from "../ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import CartItem from "./item";

const CartSidebar = () => {
    const items = useCartStore((state) => state.items);
    const isOpen = useUIStore((state) => state.isCartOpen);
    const setOpen = useUIStore((state) => (state.isCartOpen ? state.closeCart : state.openCart));
    const hasNotification = useUIStore((state) => state.hasCartNotification);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const subtotal = useMemo(
        () => items.reduce((total, item) => total + item.price * item.quantity, 0),
        [items]
    );

    const renderItems = () => {
        if (items.length === 0) {
            return <p className="text-center text-muted-foreground">Seu carrinho está vazio.</p>;
        }

        return (
            <ul className="space-y-3">
                {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </ul>
        );
    };

    return (
        <>
            <Sheet open={isOpen} onOpenChange={(open) => open ? useUIStore.getState().openCart() : useUIStore.getState().closeCart()}>
                <SheetTrigger asChild>
                    <div className="relative">
                        <Button
                            id="cart-button"
                            aria-label="Abrir carrinho"
                            onClick={() => useUIStore.getState().openCart()}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                            <RocketIcon className="h-5 w-5" />
                            <span className="text-sm font-medium">Carrinho</span>
                        </Button>
                        {hasNotification && (
                            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
                        )}
                    </div>
                </SheetTrigger>

                <SheetContent className="flex flex-col justify-between h-full p-6 space-y-4">
                    <div>
                        <SheetHeader>
                            <SheetTitle className="text-lg font-semibold">Shopping Cart</SheetTitle>
                        </SheetHeader>

                        <div className="mt-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
                            {renderItems()}
                        </div>

                        <Separator className="my-4 h-px bg-gray-300 dark:bg-gray-700" />

                        <div className="flex items-center justify-between text-sm font-medium">
                            <span>Subtotal:</span>
                            <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <Separator className="my-4 h-px bg-gray-300 dark:bg-gray-700" />
                        <Button
                            className="w-full"
                            onClick={() => setIsDialogOpen(true)}
                            disabled={items.length === 0}
                        >
                            Finalizar compra
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            <CheckoutDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </>
    );
};

export default CartSidebar;
