import HttpService from "@/services/http.service"

class WishListService extends HttpService {

    getMyWishList = async () => {
        try {
            const detail = await this.getRequest('/wishlist/my-wishlist', { auth: true })
            return detail

        } catch (exception) {
            throw exception

        }
    }
    removeWishlist = async (id: string) => {
        try {
            const detail = await this.deleteRequest('/wishlist/' + id, { auth: true })
            return detail

        } catch (exception) {
            throw exception
        }
    }
    wishlist = async (productId: string) => {
        try {
            const detail = await this.postRequest('/wishlist/add-to-wishlist', { productId }, { auth: true })
            return detail

        } catch (exception) {
            throw exception
        }
    }

}
const wishListSvc = new WishListService()
export default wishListSvc