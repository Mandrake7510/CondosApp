import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://backend.freelanceapp.store/api';

interface ApiResponse {
    message: string;
    token?: string;
    id?: number;
    nombre?: string;
    email?: string;
    telefono?: string;
    rol?: string;
}

export const loginApi = async (email: string, password: string): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario: email,
                password: password
            }),
        });

        const data = await response.json();

        if (data.message === 'successfully logged') {
            // Guardar el token en AsyncStorage
            await AsyncStorage.setItem('@CondosApp:token', data.token);
            return data;
        } else {
            throw new Error(data.message || 'Error en el inicio de sesión');
        }
    } catch (error) {
        throw new Error('Error de conexión con el servidor');
    }
};

export const getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('@CondosApp:token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};
