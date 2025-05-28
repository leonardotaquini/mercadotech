import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
}

interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getItemQuantity: (productId: number) => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product: Product) => {
        const { items } = get()
        const existingItem = items.find((item) => item.id === product.id)

        if (existingItem) {
          // Si el producto ya existe, incrementar cantidad
          set((state) => ({
            items: state.items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }))
        } else {
          // Si es un producto nuevo, agregarlo al carrito
          set((state) => ({
            items: [...state.items, { ...product, quantity: 1 }],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }))
        }
      },

      removeItem: (productId: number) => {
        const { items } = get()
        const item = items.find((item) => item.id === productId)

        if (item) {
          set((state) => ({
            items: state.items.filter((item) => item.id !== productId),
            totalItems: state.totalItems - item.quantity,
            totalPrice: state.totalPrice - item.price * item.quantity,
          }))
        }
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        const { items } = get()
        const item = items.find((item) => item.id === productId)

        if (item) {
          const quantityDiff = quantity - item.quantity
          set((state) => ({
            items: state.items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
            totalItems: state.totalItems + quantityDiff,
            totalPrice: state.totalPrice + item.price * quantityDiff,
          }))
        }
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        })
      },

      getItemQuantity: (productId: number) => {
        const { items } = get()
        const item = items.find((item) => item.id === productId)
        return item ? item.quantity : 0
      },
    }),
    {
      name: "cart-storage", // nombre para localStorage
    },
  ),
)
