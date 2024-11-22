import BaseAPIService from "../BaseAPIService.js";

class SupplierService extends BaseAPIService {
    // Fetch all suppliers
    async getSuppliers(): Promise<any> {
        return await this.request(`/admin/suppliers`, "GET");
    }

    // Fetch a single supplier by ID
    async getSupplierById(id: number): Promise<any> {
        return await this.request(`/admin/suppliers/${id}`, "GET");
    }

    // Create a new supplier
    async createSupplier(params: object): Promise<any> {
        return await this.request(`/admin/suppliers`, "POST", params);
    }

    // Update an existing supplier
    async updateSupplier(id: number, params: object): Promise<any> {
        return await this.request(`/admin/suppliers/${id}`, "PUT", params);
    }

    // Delete a supplier by ID
    async deleteSupplier(id: number): Promise<any> {
        return await this.request(`/admin/suppliers/${id}`, "DELETE");
    }
}

export const supplierService = new SupplierService();