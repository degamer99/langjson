// src/store/cartStore.ts
'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
// import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
// import { db } from '@/store/userStore'


const mockProducts_Later = [
  { name: "Accessories",
    items: [
      {id: 1,name: "20w hot glue stick",reviews: "(0)",price: "₦270.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 2,name: "Male-male jumper wire (single)",reviews: "(0)",price: "₦100.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 3,name: "Male-female jumper wire (single)",reviews: "(0)",price: "₦100.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 4,name: "Male-female jumper wire (set)",reviews: "(0)",price: "₦1,500.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 5,name: "Hot glue sticks-60w",reviews: "(0)",price: "₦400.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 6,name: "Neodymium super magnet 8x5mm",reviews: "(0)",price: "₦350.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 7,name: "Female-female jumper wire (single)",reviews: "(0)",price: "₦100.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 8,name: "Female-female jumper wire (set)",reviews: "(0)",price: "₦1,400.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 9,name: "Tact switch 12*12*6",reviews: "(0)",price: "₦100.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9}
    ]
  },
  { name: "Modules",
    items: [
      {id: 10,name: "HC-SR04 UltraSonic Sensor",reviews: "(0)",price: "₦2,500.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 11,name: "Blue LCD 1602",reviews: "(0)",price: "₦3,000.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 12,name: "PIR motion sensor",reviews: "(0)",price: "₦2,000.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 13,name: "Relay module 1 channel",reviews: "(0)",price: "₦1,400.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 14,name: "LM2596 Buck DC-DC power module",reviews: "(0)",price: "₦2,000.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 15,name: "sim800L GSM module",reviews: "(0)",price: "₦8,800.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 16,name: "DHT11 Temperature and humidity sensor",reviews: "(0)",price: "₦1,700.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 17,name: "L298N Dual H Bridge DC Stepper Motor Driver",reviews: "(0)",price: "₦5,500.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
      {id: 18,name: "HC-05 bluetooth Module",reviews: "(0)",price: "₦6,000.00",imageUrl: "https://placehold.co/150x100/E0E0E0/white?text=Product",quantity: 9},
    ]
  }
];

// Product and Cart Types
export interface Product {
    id: number;
    name: string;
    reviews: string;
    price: string;
    imageUrl: string;
    quantity: number;
}
export interface CartItem extends Product {
    quantity: number; // Represents quantity in cart
}
interface CartStore {
    items: CartItem[];
    products: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    setProducts: (products: Product[]) => void;
    addProduct: (newProductData: Omit<Product, 'id'>) => void;
    updateProduct: (productId: number, updatedProductData: Partial<Product>) => void;
    deleteProduct: (productId: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      products: [],

      addToCart: (product) => {
        const { items } = get();
        const existing = items.find((item) => item.id === product.id);

        if (existing) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = parseFloat(item.price.replace(/[^\d.-]/g, "").replace(",", ""));
          return total + price * item.quantity;
        }, 0);
      },

      setProducts: (products) => set({ products }),

      addProduct: (newProductData) => {
        const newId = nanoid();
        const newProduct: Product = { ...newProductData, id: +newId, reviews: newProductData.reviews || "(0)" };
        set((state) => ({
          products: [...state.products, newProduct],
        }));
      },

      updateProduct: (productId, updatedProductData) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId ? { ...product, ...updatedProductData } : product
          ),
        }));
      },

      deleteProduct: (productId) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== productId),
        }));
      },
    }),
    { name: 'cart-storage' }
  )
);
















// // Types
// export interface Product {
//   id: string
//   category: string
//   name: string
//   reviews: string
//   price: string
//   imageUrl: string
//   quantity: number
// }
//
// interface CartItem {
//   productId: string
//   quantity: number
// }
//
// interface CartStore {
//   products: Product[]
//   cart: CartItem[]
//   searchTerm: string
//
//   // Product CRUD
//   setProducts: (products: Product[]) => void
//   addProduct: (product: Omit<Product, 'id'>) => Promise<void>
//   updateProduct: (id: string, updates: Partial<Omit<Product, 'id'>>) => Promise<void>
//   deleteProduct: (id: string) => Promise<void>
//
//   // Cart actions
//   addToCart: (productId: string, qty?: number) => void
//   removeFromCart: (productId: string) => void
//   updateCartQuantity: (productId: string, quantity: number) => void
//   clearCart: () => void
//
//   // Search
//   setSearchTerm: (term: string) => void
//
//   // Selectors
//   getFilteredProducts: () => Product[]
//   getGroupedProducts: () => Record<string, Product[]>
//   getCartItems: () => (Product & { quantity: number })[]
// }
//
// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => {
//       const productsCol = collection(db, 'products')
//       // Subscribe to Firestore products
//       onSnapshot(productsCol, snapshot => {
//         const prods: Product[] = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Product, 'id'>) }))
//         set({ products: prods })
//       })
//
//       return {
//         products: [],
//         cart: [],
//         searchTerm: '',
//
//         setProducts: products => set({ products }),
//
//         addProduct: async productData => {
//           await addDoc(productsCol, productData)
//         },
//
//         updateProduct: async (id, updates) => {
//           const docRef = doc(db, 'products', id)
//           await updateDoc(docRef, updates)
//         },
//
//         deleteProduct: async id => {
//           const docRef = doc(db, 'products', id)
//           await deleteDoc(docRef)
//           set(({ cart }) => ({ cart: cart.filter(i => i.productId !== id) }))
//         },
//
//         addToCart: (productId, qty = 1) =>
//           set(({ cart }) => {
//             const idx = cart.findIndex(i => i.productId === productId)
//             if (idx > -1) {
//               const updated = [...cart]
//               updated[idx].quantity += qty
//               return { cart: updated }
//             }
//             return { cart: [...cart, { productId, quantity: qty }] }
//           }),
//
//         removeFromCart: productId =>
//           set(({ cart }) => ({ cart: cart.filter(i => i.productId !== productId) })),
//
//         updateCartQuantity: (productId, quantity) => {
//           if (quantity <= 0) return get().removeFromCart(productId)
//           set(({ cart }) => ({
//             cart: cart.map(i => (i.productId === productId ? { ...i, quantity } : i)),
//           }))
//         },
//
//         clearCart: () => set({ cart: [] }),
//
//         setSearchTerm: term => set({ searchTerm: term }),
//
//         getFilteredProducts: () => {
//           const { products, searchTerm } = get()
//           return searchTerm
//             ? products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
//             : products
//         },
//
//         getGroupedProducts: () =>
//           get()
//             .getFilteredProducts()
//             .reduce((acc, p) => {
//               (acc[p.category] ||= []).push(p)
//               return acc
//             }, {} as Record<string, Product[]>),
//
//         getCartItems: () => {
//           const { cart, products } = get()
//           return cart
//             .map(ci => {
//               const p = products.find(x => x.id === ci.productId)
//               return p ? { ...p, quantity: ci.quantity } : null
//             })
//             .filter((x): x is Product & { quantity: number } => Boolean(x))
//         },
//       }
//     },
//     { name: 'cart-storage' }
//   )
// )
