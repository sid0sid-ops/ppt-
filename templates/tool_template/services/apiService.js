export class ApiService {
    constructor() {
        this.baseUrl = "/api/v1";
    }

    async fetchData(endpoint) {
        try {
            // Mock API Fetch Structure
            // const response = await fetch(`${this.baseUrl}/${endpoint}`);
            // return await response.json();
            return { status: "success", data: [] };
        } catch (error) {
            console.error("Tool API Fetch Error", error);
            throw error;
        }
    }
}
