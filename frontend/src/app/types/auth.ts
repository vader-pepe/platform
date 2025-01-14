export interface LoginResponse {
    success: boolean;
    token?: string;
    error?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}
