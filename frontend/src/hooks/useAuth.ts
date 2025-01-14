import { useAuthStore } from "@/store/useAuthStore";

export const useAuth = () => {
    const { user, token, isAuthenticated, login, logout } = useAuthStore();

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout,
    };
};
