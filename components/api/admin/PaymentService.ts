import BaseAPIService from "../BaseAPIService";

class PaymentService extends BaseAPIService {
    // Fetch all payments
    async getPayments(): Promise<any> {
        return await this.request(`/admin/payments`, "GET");
    }

    // Fetch a single payment by ID
    async getPaymentById(paymentId: number): Promise<any> {
        return await this.request(`/admin/payments/${paymentId}`, "GET");
    }

    // Create a new payment
    async createPayment(params: object): Promise<any> {
        return await this.request(`/admin/payments`, "POST", params);
    }

    // Update an existing payment
    async updatePayment(paymentId: number, params: object): Promise<any> {
        return await this.request(`/admin/payments/${paymentId}`, "PUT", params);
    }

    // Delete a payment by ID
    async deletePayment(paymentId: number): Promise<any> {
        return await this.request(`/admin/payments/${paymentId}`, "DELETE");
    }
}

export const paymentService = new PaymentService();
