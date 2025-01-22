import { LoginResponse } from "@/types";
import { fetchApi } from "../lib/api";

export const loginUser = async (credentials: {
    email: string;
    password: string;
}): Promise<LoginResponse> => {
    try {
        const response = await fetchApi("/v1/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return {
            success: true,
            token: data.token,
            user: data.user,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Login failed",
        };
    }
};
