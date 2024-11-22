import BaseAPIService from "../BaseAPIService";

class BillPaymentDetailService extends BaseAPIService {
    // Fetch all bill payment details
    async getBillPaymentDetails(): Promise<any> {
        return await this.request(`/admin/bills_payment_details`, "GET");
    }

    // Fetch a single bill payment detail by ID
    async getBillPaymentDetailById(id: number): Promise<any> {
        return await this.request(`/admin/bills_payment_details/${id}`, "GET");
    }

    // Create a new bill payment detail
    async createBillPaymentDetail(params: object): Promise<any> {
        return await this.request(`/admin/bills_payment_details`, "POST", params);
    }

    // Update an existing bill payment detail
    async updateBillPaymentDetail(id: number, params: object): Promise<any> {
        return await this.request(`/admin/bills_payment_details/${id}`, "PUT", params);
    }

    // Delete a bill payment detail by ID
    async deleteBillPaymentDetail(id: number): Promise<any> {
        return await this.request(`/admin/bills_payment_details/${id}`, "DELETE");
    }
}

// Exporting an instance of BillPaymentDetailService
export const billPaymentDetailService = new BillPaymentDetailService();
