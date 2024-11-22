import BaseAPIService from "../BaseAPIService";

class BillPaymentChequeService extends BaseAPIService {
    // Fetch all bill payment cheques
    async getBillPaymentCheques(): Promise<any> {
        return await this.request(`/admin/bills_payment_cheques`, "GET");
    }

    // Fetch a single bill payment cheque by ID
    async getBillPaymentChequeById(id: number): Promise<any> {
        return await this.request(`/admin/bills_payment_cheques/${id}`, "GET");
    }

    // Create a new bill payment cheque
    async createBillPaymentCheque(params: object): Promise<any> {
        return await this.request(`/admin/bills_payment_cheques`, "POST", params);
    }

    // Update an existing bill payment cheque
    async updateBillPaymentCheque(id: number, params: object): Promise<any> {
        return await this.request(`/admin/bills_payment_cheques/${id}`, "PUT", params);
    }

    // Delete a bill payment cheque by ID
    async deleteBillPaymentCheque(id: number): Promise<any> {
        return await this.request(`/admin/bills_payment_cheques/${id}`, "DELETE");
    }
}

// Exporting an instance of BillPaymentChequeService
export const billPaymentChequeService = new BillPaymentChequeService();
