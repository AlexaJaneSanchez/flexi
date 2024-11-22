import BaseAPIService from "../BaseAPIService";

class BillService extends BaseAPIService {
    // Fetch all products
    async getBills(): Promise<any> {
        return await this.request(`/admin/bills`, "GET");
    }

    // Fetch a single product by ID
    async getBillById(id: number): Promise<any> {
        return await this.request(`/admin/bills/${id}`, "GET");
    }

    // Create a new product
    async createBills(params: object): Promise<any> {
        return await this.request(`/admin/bills`, "POST", params);
    }

    // Update an existing product
    async updateBills(id: number, params: object): Promise<any> {
        return await this.request(`/admin/bills/${id}`, "PUT", params);
    }

    // Delete a product by ID
    async deleteBills(id: number): Promise<any> {
        return await this.request(`/admin/bills/${id}`, "DELETE");
    }
}

export const billService = new BillService();