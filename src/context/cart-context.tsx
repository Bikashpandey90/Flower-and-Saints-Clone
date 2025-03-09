import { createContext, useState, useEffect, ReactNode } from "react";
import orderSvc from "@/pages/orders/order.service";

export interface Cart {
    _id: string;
    orderId: string | null;
    buyer: any;
    product: any;
    price: number;
    quantity: number;
    totalAmt: number;
    status: string;
    seller: string;
    createdBy: string;
    updatedBy: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface CartContextType {
    carts: Cart[];
    fetchCart: () => void;
    removeItemFromCart: (cartId: string, quantity: number) => Promise<void>;
    addToCart: (cartId: string, quantity: number) => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(
    undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [carts, setCarts] = useState<Cart[]>([]);

    // Fetch the cart when the component mounts
    const fetchCart = async () => {
        try {
            const response = await orderSvc.getMyCart(); // Ensure this API call fetches the cart items
            setCarts(response.detail);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const removeItemFromCart = async (cartId: string, quantity: number) => {
        try {
            await orderSvc.removeItemFromCart(cartId, quantity);
            fetchCart(); // Refresh the cart after removal
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };
    const addToCart = async (id: string, quantity: number) => {
        try {
            await orderSvc.addItemsToCart(id, quantity)
            fetchCart()

        } catch (exception) {
            console.error("Error adding item to cart:", exception)
        }
    }

    return (
        <CartContext.Provider value={{ carts, fetchCart, removeItemFromCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
