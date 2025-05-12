import { products } from "@/data/products";
import { Product } from "@/types/Product";

export const getAllProducts = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 2000);
    });
};
