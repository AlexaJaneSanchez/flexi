import BaseAPIService from "../BaseAPIService.js";

class SupplierReturnService extends BaseAPIService {
    // Fetch all supplier returns
    async getSupplierReturns(): Promise<any> {
        return await this.request(`/admin/supplier_returns`, "GET");
    }

    // Fetch a single supplier return by ID
    async getSupplierReturnById(id: number): Promise<any> {
        return await this.request(`/admin/supplier_returns/${id}`, "GET");
    }

    // Create a new supplier return
    async createSupplierReturn(params: object): Promise<any> {
        return await this.request(`/admin/supplier_returns`, "POST", params);
    }

    // Update an existing supplier return
    async updateSupplierReturn(id: number, params: object): Promise<any> {
        return await this.request(`/admin/supplier_returns/${id}`, "PUT", params);
    }

    // Delete a supplier return by ID
    async deleteSupplierReturn(id: number): Promise<any> {
        return await this.request(`/admin/supplier_returns/${id}`, "DELETE");
    }
}

export const supplierReturnService = new SupplierReturnService();
