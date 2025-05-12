import {
    useCartStore,
    type CartItem as CartItemType,
} from "@/stores/cart-store";
import {
    Minus,
    Plus,
    Trash2,
} from "lucide-react";

type Props = {
    item: CartItemType;
};

const CartItem = ({ item }: Props) => {
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);


    return (
        <li className="flex items-start gap-3 border-b pb-3 last:border-b-0">
            {/* Imagem */}
            <div className="w-12 h-12 min-w-[3rem] rounded-md overflow-hidden">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800">
                        sem imagem
                    </div>
                )}
            </div>

            {/* Info + ações */}
            <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                        <p className="text-sm font-medium leading-tight">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                            R$ {item.price.toFixed(2).replace(".", ",")} cada
                        </p>
                    </div>

                    <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold whitespace-nowrap">
                            R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                        </span>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted-foreground hover:text-red-500 transition-colors"
                            title="Remover"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Controles de quantidade */}
                <div className="flex items-center gap-2 mt-2">
                    <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 dark:border-gray-700 text-xs"
                        title="Diminuir"
                    >
                        <Minus className="h-3 w-3" />
                    </button>

                    <span className="text-sm">{item.quantity}</span>

                    <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 dark:border-gray-700 text-xs"
                        title="Aumentar"
                    >
                        <Plus className="h-3 w-3" />
                    </button>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
