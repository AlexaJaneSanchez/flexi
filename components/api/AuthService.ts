import BaseAPIService from "./BaseAPIService";

class AuthService extends BaseAPIService {
    async login(params: object): Promise<any> {
        return await this.request(`/admin/auth/login`, "POST", params);
    }

    async logout(): Promise<any> {
        return await this.request(`/admin/auth/logout`, "POST");
    }

    async createUser(params: object): Promise<any> {
        return await this.request(`/admin/auth/register`, "POST", params);
    }

    async getUserByEmail(email: string): Promise<any> {
        return await this.request(`/admin/auth/users/email/${email}`, "GET");
    }

    async getCurrentUser(): Promise<any> {
        return await this.request(`/admin/users/`, "GET");
    }
}

export const authService = new AuthService();
