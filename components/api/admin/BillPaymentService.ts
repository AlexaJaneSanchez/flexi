import BaseAPIService from "../BaseAPIService";

class BillPaymentService extends BaseAPIService {
    // Fetch all bill payments
    async getBillPayments(): Promise<any> {
        return await this.request(`/admin/bills_payment`, "GET");
    }

    // Fetch a single bill payment by ID
    async getBillPaymentById(id: number): Promise<any> {
        return await this.request(`/admin/bills_payment/${id}`, "GET");
    }

    // Create a new bill payment
    async createBillPayment(params: object): Promise<any> {
        return await this.request(`/admin/bills_payment`, "POST", params);
    }

    // Update an existing bill payment
    async updateBillPayment(id: number, params: object): Promise<any> {
        return await this.request(`/admin/bills_payment/${id}`, "PUT", params);
    }

    // Delete a bill payment by ID
    async deleteBillPayment(id: number): Promise<any> {
        return await this.request(`/admin/bills_payment/${id}`, "DELETE");
    }
}

export const billPaymentService = new BillPaymentService();
