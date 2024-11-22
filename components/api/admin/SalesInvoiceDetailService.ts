import BaseAPIService from "../BaseAPIService";

class SalesInvoiceDetailService extends BaseAPIService {
    // Fetch all sales invoice details
    async getSalesInvoiceDetails(): Promise<any> {
        return await this.request(`/admin/sales_invoice_details`, "GET");
    }

    // Fetch a single sales invoice detail by ID
    async getSalesInvoiceDetailById(id: number): Promise<any> {
        return await this.request(`/admin/sales_invoice_details/${id}`, "GET");
    }

    // Create a new sales invoice detail
    async createSalesInvoiceDetail(params: object): Promise<any> {
        return await this.request(`/admin/sales_invoice_details`, "POST", params);
    }

    // Update an existing sales invoice detail
    async updateSalesInvoiceDetail(id: number, params: object): Promise<any> {
        return await this.request(`/admin/sales_invoice_details/${id}`, "PUT", params);
    }

    // Delete a sales invoice detail by ID
    async deleteSalesInvoiceDetail(id: number): Promise<any> {
        return await this.request(`/admin/sales_invoice_details/${id}`, "DELETE");
    }
}

export const salesInvoiceDetailService = new SalesInvoiceDetailService();
