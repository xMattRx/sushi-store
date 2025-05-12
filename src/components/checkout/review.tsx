import { Button } from "@/components/ui/button";

type Props = {
    name: string;
    phone: string;
    address: string;
    onSend: () => void;
};

const CheckoutReview = ({ name, phone, address, onSend }: Props) => {
    return (
        <div className="space-y-4 text-sm text-muted-foreground border border-gray-200 p-4 rounded-md bg-gray-50 dark:bg-gray-900">
            <div>
                <span className="font-semibold text-gray-900 dark:text-white">Nome:</span> {name}
            </div>
            <div>
                <span className="font-semibold text-gray-900 dark:text-white">WhatsApp:</span> {phone}
            </div>
            <div>
                <span className="font-semibold text-gray-900 dark:text-white">Endereço:</span> {address}
            </div>
            <Button className="w-full" type="button" onClick={onSend}>
                Enviar via WhatsApp
            </Button>
        </div>
    );
};

export default CheckoutReview;
