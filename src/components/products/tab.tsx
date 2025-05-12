import { getAllProducts } from "@/services/product";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Empty from "./empty";
import ProductCard from "./product";

const ProductsTab = async () => {
    const products = await getAllProducts();

    const tabs = [
        {
            title: "Sushi",
            value: "sushi",
            products: products.filter((p) => p.category === "sushi"),
        },
        {
            title: "Temaki",
            value: "temaki",
            products: products.filter((p) => p.category === "temaki"),
        },
        {
            title: "Combinados",
            value: "pack",
            products: products.filter((p) => p.category === "pack"),
        },
        {
            title: "Bebidas",
            value: "bebidas",
            products: products.filter((p) => p.category === "bebidas"),
        },
    ];

    return (
        <Tabs defaultValue="sushi" className="w-full max-w-6xl mx-auto">
            <div className="flex justify-center mb-4">
                <TabsList className="inline-flex items-center bg-muted rounded-md p-1 space-x-1">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground px-5 py-2 text-base font-semibold rounded-md transition-colors"
                        >
                            {tab.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            {tabs.map((tab) => (
                <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {tab.products.length > 0 ? (
                        tab.products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <Empty message={`Nenhum item em "${tab.title}"`} />
                    )}
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default ProductsTab;
