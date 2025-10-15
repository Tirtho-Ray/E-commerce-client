export type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    exp: number;
} | null;

export interface AuthContextType {
    user: User;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}
