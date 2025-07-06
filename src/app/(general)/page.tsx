import { Card } from "@/components/ui/card";
import { Producto } from "@/interfaces/producto.interface";
import { promises as fs } from "fs";
import Link from "next/link";
export default async function GeneralPage() {


    const file = await fs.readFile(process.cwd() + "/src/data/listado_productos_GA.json", "utf8");
    const productos : Producto[] = JSON.parse(file);
    const uniqueCategories = Array.from(new Set(productos.map(product => product.categoria))).sort((a, b) => a.localeCompare(b));  


  return (
    <main className="h-full">
      <header className="p-8 my-4 text-center space-y-2">
        <h1 className="text-3xl font-bold">Bienvenido a GA Alberdi</h1>
        <p className="text-muted-foreground">¿Qué vas a comprar hoy?</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {uniqueCategories.map((category) => (
          <Link key={category} href={`/categoria/${encodeURIComponent(category)}`}> 
            <Card className="p-6 grid place-items-center hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold uppercase">{category}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
