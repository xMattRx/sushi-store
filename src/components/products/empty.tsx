// components/ui/empty.tsx (ou onde preferir)
import { PackageX } from "lucide-react";

const Empty = ({ message = "Nenhum item encontrado." }) => {
    return (
        <div className="flex flex-col items-center justify-center col-span-full py-10 text-center text-muted-foreground">
            <PackageX className="w-8 h-8 mb-2" />
            <p className="text-sm">{message}</p>
        </div>
    );
};

export default Empty;
