import HttpService from "@/services/http.service";
export enum BrandStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export interface BrandData {
    _id?: string,
    title: string,
    startDate: Date,
    endDate: Date,
    status: BrandStatus,
    image: any,
    slug?: string
}

class BrandService extends HttpService {

    //using tanstackquery and axios 
    async createBrand(data: BrandData) {
        try {
            const response = await this.postRequest('/brand', data, { auth: true, file: true })
            return response.data


        } catch (exception) {
            throw exception
        }
    }
    async getAllBrandList(page = 3, limit = 10, search: string = '') {
        try {
            const response = await this.getRequest('/brand', {
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
    async deleteBrand(id: string) {
        try {
            const delResponse = await this.deleteRequest('/brand/' + id, { auth: true })
            return delResponse

        } catch (exception) {
            throw exception
        }
    }

    async getBrandById(id: string) {
        try {
            const detail = await this.getRequest('/brand/' + id, { auth: true })
            return detail

        } catch (exception) {
            throw exception
        }
    }
    async updateBrand(id: string, data: BrandData) {
        try {
            const response = await this.patchRequest('/brand/' + id, data, { auth: true, file: true })
            return response.data


        } catch (exception) {
            throw exception
        }
    }

    async getHomeBrandList() {
        try {
            const detail = await this.getRequest('brand/home-brand', { auth: false });
            return detail


        } catch (exception) {
            throw exception
        }
    }
    async fetchBySlug(slug: string) {
        try {
            const detail = await this.getRequest('/brand/' + slug + '/by-slug', { auth: false })
            return detail
        } catch (exception) {
            throw exception
        }
    }


}
const brandSvc = new BrandService()
export default brandSvc;