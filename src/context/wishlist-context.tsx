import wishListSvc from "@/pages/wishlist/wishlist.service";
import { useEffect, useState } from "react";
import { createContext } from "react";

interface Wishlist {

}
interface WishListContextType {
    wishlists: Wishlist[];

}

export const WishListContext = createContext<WishListContextType | undefined>(
    undefined
)

export const WishListProvider = ({ children }: { children: React.ReactNode }) => {
    const [wishlists, setWishList] = useState<Wishlist[]>([])

    const fecthWishlist = async () => {
        try {
            const response = await wishListSvc.getMyWishList()
            setWishList(response.data.detail)
        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fecthWishlist()
    }, [])


    return (<>
        <WishListContext.Provider value={{ wishlists }}>
            {children}
        </WishListContext.Provider>

    </>)
}
