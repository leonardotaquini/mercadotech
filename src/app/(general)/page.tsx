import { Card } from "@/components/ui/card";
import { Producto } from "@/interfaces/producto.interface";
import { promises as fs } from "fs";
export default async function GeneralPage() {


    const file = await fs.readFile(process.cwd() + "/src/data/listado_productos_GA.json", "utf8");
    const productos : Producto[] = JSON.parse(file);
    const uniqueCategories = Array.from(new Set(productos.map(product => product.categoria))).sort((a, b) => a.localeCompare(b));  


  return (
    <main className="h-full">
      <header className="p-8 my-4">
        <h2 className="text-center text-2xl">¿Qué vas a comprar hoy?</h2>
      </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {uniqueCategories.map((category) => (
            <Card key={category} className="grid place-items-center hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold uppercase ">{category}</h3>
            </Card>
          ))}
        </div> 
    </main>
  );
}
