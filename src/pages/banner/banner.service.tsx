import HttpService from "@/services/http.service";
export enum BannerStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export interface BannerData {
    _id?: string,
    title: string,
    startDate: Date,
    endDate: Date,
    status: BannerStatus,
    image: any,
    link: string

}

class BannerService extends HttpService {

    //using tanstackquery and axios 
    async createBanner(data: BannerData) {
        try {
            const response = await this.postRequest('/banner', data, { auth: true, file: true })
            return response.data


        } catch (exception) {
            throw exception
        }
    }
    async getAllBannerList(page = 1, limit = 10, search: string = '') {
        try {
            const response = await this.getRequest('/banner', {
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
    async deleteBanner(id: string) {
        try {
            const delResponse = await this.deleteRequest('/banner/' + id, { auth: true })
            return delResponse

        } catch (exception) {
            throw exception
        }
    }

    async getBannerById(id: string) {
        try {
            const detail = await this.getRequest('/banner/' + id, { auth: true })
            return detail

        } catch (exception) {
            throw exception
        }
    }
    async updateBanner(id: string, data: BannerData) {
        try {
            const response = await this.patchRequest('/banner/' + id, data, { auth: true, file: true })
            return response.data


        } catch (exception) {
            throw exception
        }
    }

    async getHomeBannerList() {
        try {
            const response = await this.getRequest('banner/home-banner', { auth: false });
            return response


        } catch (exception) {
            throw exception
        }
    }


}
const bannerSvc = new BannerService()
export default bannerSvc;