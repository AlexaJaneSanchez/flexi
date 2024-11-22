import BaseAPIService from "./BaseAPIService";

class ProcessPlanService extends BaseAPIService {

    // Fetch all plans
    async getPlans(): Promise<any> {
        return await this.request('/admin/auth/plans', 'GET');
    }

    async processPlan(planId: string, frequency: string, id: string): Promise<any> {
        const params = {
            plan: planId,
            frequency: frequency,
            user_id: id, // Add the user_id here
        };

        return await this.request(`/admin/auth/process-plan`, "POST", params);
    }
}

export const processPlanService = new ProcessPlanService();