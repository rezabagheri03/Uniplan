import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { authAPI } from '@/utils/api';
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from '@/utils/auth';
import toast from 'react-hot-toast';

interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUserState] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check authentication status on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = getToken();
        const storedUser = getUser();

        if (token && storedUser) {
            try {
                // Verify token with backend
                const response = await authAPI.me();
                setUserState(response.data);
                setUser(response.data);
            } catch (error) {
                // Token is invalid
                removeToken();
                removeUser();
                setUserState(null);
            }
        }
        setLoading(false);
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await authAPI.login(email, password);
            const { token, user: userData } = response.data;

            setToken(token);
            setUser(userData);
            setUserState(userData);

            toast.success(`خوش آمدید ${userData.name}! 🎉`);

            // Redirect to dashboard
            router.push('/');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'خطا در ورود';
            toast.error(errorMessage);
            throw error;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await authAPI.register(name, email, password);
            const { token, user: userData } = response.data;

            setToken(token);
            setUser(userData);
            setUserState(userData);

            toast.success(`ثبت نام موفقیت‌آمیز بود! خوش آمدید ${userData.name} 🎉`);

            // Redirect to dashboard
            router.push('/');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'خطا در ثبت نام';
            toast.error(errorMessage);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            // Continue with logout even if API call fails
        } finally {
            removeToken();
            removeUser();
            setUserState(null);
            toast.success('خروج موفقیت‌آمیز بود');
            router.push('/login');
        }
    };

    const refreshUser = async () => {
        try {
            const response = await authAPI.me();
            setUserState(response.data);
            setUser(response.data);
        } catch (error) {
            logout();
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
            </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default useAuth;