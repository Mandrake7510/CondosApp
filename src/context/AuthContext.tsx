import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import { loginApi } from '../services/api';

interface AuthContextData {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStorageData();
    }, []);

    async function loadStorageData(): Promise<void> {
        try {
            const storedUser = await AsyncStorage.getItem('@CondosApp:user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Error loading stored auth data:', error);
        } finally {
            setLoading(false);
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            const response = await loginApi(email, password);
            
            if (response.message === 'successfully logged') {
                const userData: User = {
                    id: response.id?.toString() || '',
                    name: response.nombre || '',
                    email: response.email || '',
                    unit: 'A-101', // Esto debería venir de tu API
                    role: response.rol === 'admin' ? 'admin' : 'resident'
                };

                await AsyncStorage.setItem('@CondosApp:user', JSON.stringify(userData));
                setUser(userData);
            } else {
                throw new Error('Credenciales inválidas');
            }
        } catch (error) {
            console.error('Error during sign in:', error);
            throw new Error('Error en el inicio de sesión');
        }
    };

    const signOut = async () => {
        try {
            await AsyncStorage.removeItem('@CondosApp:user');
            await AsyncStorage.removeItem('@CondosApp:token');
            setUser(null);
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
