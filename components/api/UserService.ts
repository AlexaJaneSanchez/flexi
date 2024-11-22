import BaseAPIService from "./BaseAPIService";

class UserService extends BaseAPIService {

    async getUserByEmail(email: string): Promise<any> {
        return await this.request(`/users/email/${email}`, "GET");
    }
}

export const userService = new UserService();