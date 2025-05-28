
import { Header } from "@/components/header/header";
import { ProductList } from "@/components/product/product-list";

export default async function GeneralPage() {


  return (
    <main className="h-full">
      <Header />
      <ProductList />
    </main>
  );
}
