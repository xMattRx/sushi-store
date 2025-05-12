import { Skeleton } from "../ui/skeleton";

const TabsSkeleton = () => {
    return (
        <div className="w-full max-w-6xl mx-auto mt-6 space-y-6 px-4">
            {/* Tabs fake loading */}
            <Skeleton className="h-10 w-40 rounded-md" />

            {/* Grid de cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="space-y-3">
                        <Skeleton className="h-40 w-full rounded-lg" /> {/* Imagem */}
                        <Skeleton className="h-4 w-3/4 rounded" />       {/* Nome */}
                        <Skeleton className="h-4 w-1/4 rounded" />       {/* Preço */}
                        <Skeleton className="h-9 w-1/2 rounded" />       {/* Botão */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabsSkeleton;
