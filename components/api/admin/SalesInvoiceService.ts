import BaseAPIService from "../BaseAPIService";

class SalesInvoiceService extends BaseAPIService {
    // Fetch all sales invoices
    async getSalesInvoices(): Promise<any> {
        return await this.request(`/admin/sales_invoice`, "GET");
    }

    // Fetch a single sales invoice by ID
    async getSalesInvoiceById(id: number): Promise<any> {
        return await this.request(`/admin/sales_invoice/${id}`, "GET");
    }

    // Create a new sales invoice
    async createSalesInvoice(params: object): Promise<any> {
        return await this.request(`/admin/sales_invoice`, "POST", params);
    }

    // Update an existing sales invoice
    async updateSalesInvoice(id: number, params: object): Promise<any> {
        return await this.request(`/admin/sales_invoice/${id}`, "PUT", params);
    }

    // Delete a sales invoice by ID
    async deleteSalesInvoice(id: number): Promise<any> {
        return await this.request(`/admin/sales_invoice/${id}`, "DELETE");
    }
}

export const salesInvoiceService = new SalesInvoiceService();