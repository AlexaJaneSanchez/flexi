import BaseAPIService from "../BaseAPIService";

class BillDetailService extends BaseAPIService {
    // Fetch all products
    async getBillDetails(): Promise<any> {
        return await this.request(`/admin/billdetails`, "GET");
    }

    // Fetch a single product by ID
    async getBillDetailById(id: number): Promise<any> {
        return await this.request(`/admin/billdetails/${id}`, "GET");
    }

    // Create a new product
    async createBillDetails(params: object): Promise<any> {
        return await this.request(`/admin/billdetails`, "POST", params);
    }

    // Update an existing product
    async updateBillDetails(id: number, params: object): Promise<any> {
        return await this.request(`/admin/billdetails/${id}`, "PUT", params);
    }

    // Delete a product by ID
    async deleteBillDetails(id: number): Promise<any> {
        return await this.request(`/admin/billdetails/${id}`, "DELETE");
    }
}

export const billDetailService = new BillDetailService();