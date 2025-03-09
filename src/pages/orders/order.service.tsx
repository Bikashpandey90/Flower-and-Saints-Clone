import HttpService from "@/services/http.service"

class OrderService extends HttpService {

    async getMyCart() {
        try {
            const response = await this.getRequest('/order/my-cart', { auth: true })
            return response

        } catch (exception) {
            throw exception
        }
    }
    async addItemsToCart(productId: string, quantity: number) {
        try {
            const response = await this.postRequest('/order/add-to-cart', { productId, quantity }, { auth: true })
            return response
        }
        catch (exception) {
            throw exception
        }

    }
    async removeItemFromCart(cartId: string, quantity: number) {

        try {
            const response = await this.putRequest(`/order/${cartId}/update-cart`, { quantity }, { auth: true })
            return response





        } catch (exception) {
            throw exception
        }
    }

    async placeOrder(data: any) {
        try {

            const response = await this.postRequest('/order/place-order', data, { auth: true })
            return response

        } catch (exception) {
            throw exception
        }
    }
    async listOrders() {
        try {
            const response = await this.getRequest('/order/list', { auth: true })
            return response


        } catch (exception) {
            throw exception
        }
    }
    async makePaymentConfirmation(data: any, orderId: string) {
        try {
            const detail = await this.postRequest('/order/' + orderId + '/payment', data, { auth: true })
            return detail
        } catch (exception) {
            throw exception
        }
    }


}


const orderSvc = new OrderService()
export default orderSvc