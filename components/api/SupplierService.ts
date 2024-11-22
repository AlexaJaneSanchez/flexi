import BaseAPIService from "./BaseAPIService";

class SupplierService extends BaseAPIService {
    // Fetch all suppliers
    async getSuppliers(): Promise<any> {
        return await this.request(`/suppliers`, "GET");
    }

    // Fetch a single supplier by ID
    async getSupplierById(supplierId: number): Promise<any> {
        return await this.request(`/suppliers/${supplierId}`, "GET");
    }

    // Create a new supplier
    async createSupplier(params: object): Promise<any> {
        return await this.request(`/suppliers`, "POST", params);
    }

    // Update an existing supplier
    async updateSupplier(supplierId: number, params: object): Promise<any> {
        return await this.request(`/suppliers/${supplierId}`, "PUT", params);
    }

    // Delete a supplier by ID
    async deleteSupplier(supplierId: number): Promise<any> {
        return await this.request(`/suppliers/${supplierId}`, "DELETE");
    }
}

export const supplierService = new SupplierService();