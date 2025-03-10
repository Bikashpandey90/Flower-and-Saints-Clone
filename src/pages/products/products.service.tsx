import HttpService from "@/services/http.service";
import { BannerData } from "../banner/banner.service";

class ProductService extends HttpService {

    async createProduct(data: any) {  //todo manage the datatype
        try {
            const response = await this.postRequest('/product', data, { auth: true, files: true })
            return response.data

        } catch (exception) {
            throw exception
        }
    }

    async getProductForHome(page: number, limit = 10, search: string = '') {
        try {
            const response = await this.getRequest('/product/home-product', {
                auth: false, params: {
                    page: page,
                    limit: limit,
                    search: search

                }
            }

            )
            return response
        } catch (exception) {
            throw exception
        }
    }
    async getSearchProduct(page: number, limit = 10, search: string = '') {
        try {
            const response = await this.getRequest('/product/home-product', {
                auth: false, params: {
                    page: page,
                    limit: limit,
                    search: search

                }
            }

            )
            return response
        } catch (exception) {
            throw exception
        }
    }
    async getDealsProduct() {
        try {
            const response = await this.getRequest('/product/home-deals-product', { auth: false })
            return response
        } catch (exception) {
            throw exception
        }
    }

    async getAllProductList(page = 1, limit = 30, search: string = '') {
        try {
            const response = await this.getRequest('/product', {
                auth: true,
                params: {
                    page: page,
                    limit: limit,
                    search: search
                }
            })
            return response

        } catch (exception) {
            throw exception
        }
    }
    async deleteProduct(id: string) {
        try {
            const delResponse = await this.deleteRequest('/product/' + id, { auth: true })
            return delResponse

        } catch (exception) {
            throw exception
        }
    }
    async getMyProducts(page = 1, limit = 30, search: string = '') {
        try {
            const response = await this.getRequest('/product/myproducts', {
                auth: true,
                params: {
                    page: page,
                    limit: limit,
                    search: search
                }
            })
            return response

        } catch (exception) {
            throw exception
        }
    }
    async getProductById(id: string) {
        try {
            const detail = await this.getRequest('/product/' + id, { auth: true })
            return detail

        } catch (exception) {
            throw exception
        }
    }

    async updateProduct(id: string, data: BannerData) {
        try {
            const response = await this.patchRequest('/product/' + id, data, { auth: true, files: true })
            return response.data
        } catch (exception) {
            throw exception
        }
    }
    async fetchProductBySlug(slug: string) {
        try {
            const response = await this.getRequest('/product/' + slug + '/by-slug', { auth: false })
            return response

        } catch (exception) {
            throw exception
        }
    }
    async getNewArrivals() {
        try {
            const response = await this.getRequest('/product/home-new-product', { auth: false })
            return response

        } catch (exception) {
            throw exception
        }
    }


}
const productSvc = new ProductService()
export default productSvc;