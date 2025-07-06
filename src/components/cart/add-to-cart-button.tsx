"use client"

import { useCartStore } from "@/lib/store/cart-store";
import { Button } from "@/components/ui/button";

interface ProductInfo {
  id: number;
  name: string;
  price: number;
}

export function AddToCartButton({ product }: { product: ProductInfo }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Button size="sm" onClick={() => addItem(product)}>
      Agregar
    </Button>
  );
}
