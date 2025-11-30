import { PRODUCT_PROPS } from '@/services/dtos';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem extends PRODUCT_PROPS {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;

    setIsOpen: (val: boolean) => void;
    addToCart: (product: PRODUCT_PROPS) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    clearCart: () => void;

    totalPrice: () => number;
    totalItems: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            setIsOpen: (val) => set({ isOpen: val }),

            addToCart: (product) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === product.id);

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({
                        items: [...currentItems, { ...product, quantity: 1 }],
                    });
                }
            },

            removeFromCart: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) });
            },

            increaseQuantity: (id) => {
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                });
            },

            decreaseQuantity: (id) => {
                const currentItems = get().items;
                const targetItem = currentItems.find((item) => item.id === id);

                if (targetItem?.quantity === 1) {
                    get().removeFromCart(id);
                } else {
                    set({
                        items: currentItems.map((item) =>
                            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                        ),
                    });
                }
            },

            clearCart: () => set({ items: [] }),

            totalPrice: () => {
                return get().items.reduce((total, item) => {
                    let priceValue = 0;
                    if (typeof item.price === 'string') {
                        priceValue = parseFloat(item.price.replace(/[^0-9]/g, "")) || 0;
                    } else if (typeof item.price === 'number') {
                        priceValue = item.price;
                    }
                    return total + priceValue * item.quantity;
                }, 0);
            },

            totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);