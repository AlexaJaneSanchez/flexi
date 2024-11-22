import BaseAPIService from "../BaseAPIService";

class PaymentChequeService extends BaseAPIService {
    // Fetch all payment details
    async getPaymentCheques(): Promise<any> {
        return await this.request(`/admin/payment_cheques`, "GET");
    }

    // Fetch a single payment detail by ID
    async getPaymentChequeById(paymentCheque: number): Promise<any> {
        return await this.request(`/admin/payment_cheques/${paymentCheque}`, "GET");
    }

    // Create a new payment detail
    async createPaymentCheque(params: object): Promise<any> {
        return await this.request(`/admin/payment_cheques`, "POST", params);
    }

    // Update an existing payment detail
    async updatePaymentCheque(paymentCheque: number, params: object): Promise<any> {
        return await this.request(`/admin/payment_cheques/${paymentCheque}`, "PUT", params);
    }

    // Delete a payment detail by ID
    async deletePaymentCheque(paymentCheque: number): Promise<any> {
        return await this.request(`/admin/payment_cheques/${paymentCheque}`, "DELETE");
    }
}

export const paymentChequeService = new PaymentChequeService();