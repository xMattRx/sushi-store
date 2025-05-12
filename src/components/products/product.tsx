'use client';

import { Product } from "@/types/Product";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "../../stores/cart-store";
import { useUIStore } from "../../stores/ui-store";

type Props = {
    product: Product;
};

const ProductCard = ({ product }: Props) => {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = () => {
        addToCart(product);

        toast.success("Produto adicionado ao carrinho!", {
            description: product.name,
            duration: 2500,
            action: {
                label: "Ver carrinho",
                onClick: () => {
                    useUIStore.getState().openCart();
                },
            },
        });
        useUIStore.getState().notifyCart();
    };

    return (
        <article className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {product.image ? (
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-40 object-cover"
                />
            ) : (
                <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-sm">
                    Sem imagem
                </div>
            )}

            <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
                <button
                    onClick={handleAddToCart}
                    className="mt-2 w-full bg-gray-800 text-white text-sm py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                    <ShoppingCart className="h-4 w-4" />
                    Adicionar
                </button>
            </div>
        </article>
    );
};

export default ProductCard;
