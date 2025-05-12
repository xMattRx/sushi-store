import Footer from "@/components/footer";
import Header from "@/components/header";
import TabsSkeleton from "@/components/products/skeleton";
import ProductsTab from "@/components/products/tab";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 pt-6 pb-20">
        <div className="w-full max-w-6xl mx-auto">
          <Suspense fallback={<TabsSkeleton />}>
            <ProductsTab />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
