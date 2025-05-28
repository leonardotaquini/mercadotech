"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Plus, Minus } from "lucide-react"
import Image from "next/image"
import { useCartStore } from "@/lib/store/cart-store"
import { toast } from "sonner"
import { Product } from "@/interfaces/product.interface"



interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {

  const { addItem, updateQuantity, getItemQuantity } = useCartStore()
  const quantity = getItemQuantity(product.id)

  const handleAddToCart = () => {
    addItem(product)
    toast.success(`${product.name} agregado al carrito`)
  }

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1)
    toast.success(`Cantidad actualizada: ${quantity + 1}`)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1)
      toast.success(`Cantidad actualizada: ${quantity - 1}`)
    } else {
      updateQuantity(product.id, 0)
      toast.success(`${product.name} removido del carrito`)
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <Badge variant={product.inStock ? "default" : "secondary"} className="absolute top-2 right-2">
          {product.inStock ? "En Stock" : "Agotado"}
        </Badge>
        {quantity > 0 && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            En carrito: {quantity}
          </Badge>
        )}
      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <Badge variant="outline">{product.category}</Badge>
        </div>
        <CardDescription className="text-sm text-green-500">Envio Gratis</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-gray-200 text-gray-200" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        {quantity === 0 ? (
          <Button
            className="flex-1"
            disabled={!product.inStock}
            variant={product.inStock ? "default" : "secondary"}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.inStock ? "Agregar al Carrito" : "No Disponible"}
          </Button>
        ) : (
          <div className="flex items-center gap-2 flex-1">
            <Button variant="outline" size="sm" onClick={handleDecrement} className="h-8 w-8 p-0">
              <Minus className="w-4 h-4" />
            </Button>
            <span className="flex-1 text-center font-medium">{quantity} en carrito</span>
            <Button variant="outline" size="sm" onClick={handleIncrement} className="h-8 w-8 p-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
