import BaseAPIService from "../BaseAPIService";

class ProductService extends BaseAPIService {
    // Fetch all products
    async getProducts(): Promise<any> {
        return await this.request(`/admin/products`, "GET");
    }

    // Fetch a single product by ID
    async getProductById(productId: number): Promise<any> {
        return await this.request(`/admin/products/${productId}`, "GET");
    }

    // Create a new product
    async createProduct(params: object): Promise<any> {
        return await this.request(`/admin/products`, "POST", params);
    }

    // Update an existing product
    async updateProduct(productId: number, params: object): Promise<any> {
        return await this.request(`/admin/products/${productId}`, "PUT", params);
    }

    // Delete a product by ID
    async deleteProduct(productId: number): Promise<any> {
        return await this.request(`/admin/products/${productId}`, "DELETE");
    }
}

export const productService = new ProductService();