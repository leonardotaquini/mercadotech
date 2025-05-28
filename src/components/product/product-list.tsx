import { promises as fs } from "fs";
import { ProductsData } from "@/interfaces/product.interface";
import { ProductCard } from "./product-card"

export const ProductList = async () => {
  const file = await fs.readFile(process.cwd() + "/src/data/products.json", "utf8");
  const data: ProductsData = JSON.parse(file);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
         {data.products.map((product) => ( <ProductCard key={product.id} product={product} />))}
    </div>
  )
}
