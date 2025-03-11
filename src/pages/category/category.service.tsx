import HttpService from "@/services/http.service";
export enum CategoryStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export interface CategoryData {
    _id?: string,
    title: string,
    createdAt: Date,
    status: CategoryStatus,
    image: any,
    parentId: string | null,
    slug?: string
}

class CategoryService extends HttpService {

    //using tanstackquery and axios 
    async createCategory(data: CategoryData) {
        try {
            const response = await this.postRequest('/category', data, { auth: true, file: true })
            return response.data


        } catch (exception) {
            throw exception
        }
    }
    async getAllCategoryList(page = 3, limit = 10, search: string = '') {
        try {
            const response = await this.getRequest('/category', {
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
    async getAllCategoryListUser() {
        try {
            const response = await this.getRequest('category/home-category', { auth: false })
            return response

        } catch (exception) {
            throw exception
        }

    }
    async deleteCategory(id: string) {
        try {
            const delResponse = await this.deleteRequest('/category/' + id, { auth: true })
            return delResponse

        } catch (exception) {
            throw exception
        }
    }

    async getCategoryById(id: string) {
        try {
            const detail = await this.getRequest('/category/' + id, { auth: true })
            return detail

        } catch (exception) {
            throw exception
        }
    }
    async updateCategory(id: string, data: CategoryData) {
        try {
            const response = await this.patchRequest('/category/' + id, data, { auth: true, file: true })
            return response.data


        } catch (exception) {
            throw exception
        }
    }

    async getHomeCategoryList() {
        try {
            const detail = await this.getRequest('category/home-category', { auth: false });
            return detail


        } catch (exception) {
            throw exception
        }
    }
    async getParentCategory() {
        try {
            const detail = await this.getRequest('category/home-parent-category', { auth: false });
            return detail


        } catch (exception) {
            throw exception
        }
    }

    async fetchProductBySlug(slug: string) {
        try {
            const data = await this.getRequest('/category/' + slug + '/by-slug', { auth: false })
            return data
        } catch (exception) {

            console.log(exception)
        }
    }

}
const categorySvc = new CategoryService()
export default categorySvc;