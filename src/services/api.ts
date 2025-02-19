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

interface Payment {
    id_residente: string;
    idcuota: number;
    condominio: string;
    adeudo: number;
    email: string;
    concepto: string;
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

export const getPendingPayments = async (email: string): Promise<Payment[]> => {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/todosLosPagos/${email}`, {
            headers
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error al obtener pagos');
        }

        return data;
    } catch (error) {
        console.error('Error fetching payments:', error);
        throw error;
    }
};

export const submitPayment = async (paymentData: {
    idCuota: number;
    email: string;
    cantidad: number;
    fecha: string;
    comprobante: FormData;
}) => {
    try {
        const headers = await getAuthHeaders();
        // Aquí necesitaremos el endpoint correcto para enviar el pago
        const response = await fetch(`${API_URL}/registrarPago`, {
            method: 'POST',
            headers: {
                ...headers,
                // No incluimos Content-Type porque FormData lo establece automáticamente
            },
            body: paymentData.comprobante
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error al registrar el pago');
        }

        return data;
    } catch (error) {
        console.error('Error submitting payment:', error);
        throw error;
    }
};
