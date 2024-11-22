import BaseAPIService from "../BaseAPIService";

class PaymentDetailService extends BaseAPIService {
    // Fetch all payment details
    async getPaymentDetails(): Promise<any> {
        return await this.request(`/admin/payment_details`, "GET");
    }

    // Fetch a single payment detail by ID
    async getPaymentDetailById(paymentDetailId: number): Promise<any> {
        return await this.request(`/admin/payment_details/${paymentDetailId}`, "GET");
    }

    // Create a new payment detail
    async createPaymentDetail(params: object): Promise<any> {
        return await this.request(`/admin/payment_details`, "POST", params);
    }

    // Update an existing payment detail
    async updatePaymentDetail(paymentDetailId: number, params: object): Promise<any> {
        return await this.request(`/admin/payment_details/${paymentDetailId}`, "PUT", params);
    }

    // Delete a payment detail by ID
    async deletePaymentDetail(paymentDetailId: number): Promise<any> {
        return await this.request(`/admin/payment_details/${paymentDetailId}`, "DELETE");
    }
}

export const paymentDetailService = new PaymentDetailService();
