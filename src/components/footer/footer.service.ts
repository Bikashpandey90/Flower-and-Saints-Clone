import HttpService from "@/services/http.service";

class FooterService extends HttpService {
    async newsLetter(data: { email: string }) {
        try {
            const response = await this.postRequest('/micro/news-letter', data, { auth: false })
            return response

        } catch (exception) {
            throw exception
        }
    }

}
const footerSvc = new FooterService()
export default footerSvc