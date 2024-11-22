import BaseAPIService from "../BaseAPIService.js";

class SupplierReturnDetailService extends BaseAPIService {
    // Fetch all suppliers
    async getSupplierReturnDetails(): Promise<any> {
        return await this.request(`/admin/supplier_return_detail`, "GET");
    }

    // Fetch a single supplier by ID
    async getSupplierReturnDetailById(id: number): Promise<any> {
        return await this.request(`/admin/supplier_return_detail/${id}`, "GET");
    }

    // Create a new supplier
    async createSupplierReturnDetail(params: object): Promise<any> {
        return await this.request(`/admin/supplier_return_detail`, "POST", params);
    }

    // Update an existing supplier
    async updateSupplierReturnDetail(id: number, params: object): Promise<any> {
        return await this.request(`/admin/supplier_return_detail/${id}`, "PUT", params);
    }

    // Delete a supplier by ID
    async deleteSupplierReturnDetail(id: number): Promise<any> {
        return await this.request(`/admin/supplier_return_detail/${id}`, "DELETE");
    }
}

export const supplierReturnDetailService = new SupplierReturnDetailService();