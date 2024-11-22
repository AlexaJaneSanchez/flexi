import BaseAPIService from "../BaseAPIService";

class CustomerService extends BaseAPIService {
    // Fetch all customers
    async getCustomers(): Promise<any> {
        return await this.request(`/admin/customers`, "GET");
    }

    // Fetch a single customer by ID
    async getCustomerById(id: number): Promise<any> {
        return await this.request(`/admin/customers/${id}`, "GET");
    }

    // Create a new customer
    async createCustomer(params: object): Promise<any> {
        return await this.request(`/admin/customers`, "POST", params);
    }

    // Update an existing customer
    async updateCustomer(id: number, params: object): Promise<any> {
        return await this.request(`/admin/customers/${id}`, "PUT", params);
    }

    // Delete a customer by ID
    async deleteCustomer(id: number): Promise<any> {
        return await this.request(`/admin/customers/${id}`, "DELETE");
    }
}

export const customerService = new CustomerService();