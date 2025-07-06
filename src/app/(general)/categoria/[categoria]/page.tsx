import { Producto } from "@/interfaces/producto.interface";
import { promises as fs } from "fs";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import Link from "next/link";

export default async function CategoriaPage({ params }: { params: { categoria: string } }) {
  const file = await fs.readFile(process.cwd() + "/src/data/listado_productos_GA.json", "utf8");
  const productos: Producto[] = JSON.parse(file);
  const productosFiltrados = productos
    .map((p, idx) => ({ ...p, id: idx }))
    .filter((p) => p.categoria.toLowerCase() === decodeURIComponent(params.categoria).toLowerCase());

  return (
    <main className="p-4 space-y-4">
      <h2 className="text-xl font-semibold capitalize">
        {decodeURIComponent(params.categoria)}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Precio USD</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">{p.nombre}</td>
                <td className="px-4 py-2">${p.precio_usd}</td>
                <td className="px-4 py-2 text-right">
                  <AddToCartButton product={{ id: p.id, name: p.nombre, price: parseFloat(p.precio_usd.replace(',', '.')) }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link href="/" className="text-sm underline">
        ← Volver
      </Link>
    </main>
  );
}
