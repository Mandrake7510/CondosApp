import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image,
} from 'react-native';
import { Text, Button, Card, Input, Icon } from '@rneui/themed';
import { useAuth } from '../context/AuthContext';
import { getPendingPayments, submitPayment } from '../services/api';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Payment {
    id_residente: string;
    idcuota: number;
    condominio: string;
    adeudo: number;
    email: string;
    concepto: string;
}

export const PaymentsScreen = () => {
    const { user } = useAuth();
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {
        try {
            if (user?.email) {
                const data = await getPendingPayments(user.email);
                setPayments(data);
            }
        } catch (error) {
            console.error('Error loading payments:', error);
        } finally {
            setLoading(false);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handlePayment = async () => {
        if (!selectedPayment || !amount || !image) {
            alert('Por favor complete todos los campos');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('idCuota', selectedPayment.idcuota.toString());
            formData.append('email', user?.email || '');
            formData.append('cantidad', amount);
            formData.append('fecha', date.toISOString().split('T')[0]);
            formData.append('comprobante', {
                uri: image,
                type: 'image/jpeg',
                name: 'payment.jpg',
            } as any);

            await submitPayment({
                idCuota: selectedPayment.idcuota,
                email: user?.email || '',
                cantidad: parseFloat(amount),
                fecha: date.toISOString().split('T')[0],
                comprobante: formData,
            });

            alert('Pago registrado exitosamente');
            setSelectedPayment(null);
            setAmount('');
            setImage(null);
            loadPayments(); // Recargar la lista de pagos
        } catch (error) {
            console.error('Error submitting payment:', error);
            alert('Error al registrar el pago');
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Cargando pagos...</Text>
            </View>
        );
    }

    if (selectedPayment) {
        return (
            <ScrollView style={styles.container}>
                <Card>
                    <Card.Title>Detalles del Pago</Card.Title>
                    <Card.Divider />
                    <Text style={styles.label}>Concepto:</Text>
                    <Text style={styles.value}>{selectedPayment.concepto}</Text>
                    <Text style={styles.label}>Monto Adeudado:</Text>
                    <Text style={styles.value}>${selectedPayment.adeudo}</Text>
                    
                    <Text style={styles.label}>Cantidad a Pagar:</Text>
                    <Input
                        placeholder="Ingrese la cantidad"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />

                    <Text style={styles.label}>Fecha de Pago:</Text>
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text>{date.toLocaleDateString()}</Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) {
                                    setDate(selectedDate);
                                }
                            }}
                        />
                    )}

                    <Button
                        title="Seleccionar Comprobante"
                        onPress={pickImage}
                        buttonStyle={styles.button}
                    />

                    {image && (
                        <Image
                            source={{ uri: image }}
                            style={styles.image}
                        />
                    )}

                    <View style={styles.buttonContainer}>
                        <Button
                            title="Registrar Pago"
                            onPress={handlePayment}
                            buttonStyle={[styles.button, styles.submitButton]}
                        />
                        <Button
                            title="Cancelar"
                            onPress={() => setSelectedPayment(null)}
                            buttonStyle={[styles.button, styles.cancelButton]}
                        />
                    </View>
                </Card>
            </ScrollView>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text h4 style={styles.title}>Pagos Pendientes</Text>
            {payments.length === 0 ? (
                <Text style={styles.noPayments}>No hay pagos pendientes</Text>
            ) : (
                payments.map((payment, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedPayment(payment)}
                    >
                        <Card>
                            <View style={styles.paymentItem}>
                                <View style={styles.paymentInfo}>
                                    <Text style={styles.conceptText}>{payment.concepto}</Text>
                                    <Text style={styles.amountText}>${payment.adeudo}</Text>
                                </View>
                                <Icon name="chevron-right" type="material" />
                            </View>
                        </Card>
                    </TouchableOpacity>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        padding: 15,
        textAlign: 'center',
    },
    paymentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    paymentInfo: {
        flex: 1,
    },
    conceptText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    amountText: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
    dateButton: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginVertical: 10,
    },
    button: {
        marginVertical: 10,
        borderRadius: 5,
    },
    submitButton: {
        backgroundColor: '#2196F3',
    },
    cancelButton: {
        backgroundColor: '#f44336',
    },
    buttonContainer: {
        marginTop: 20,
    },
    image: {
        width: '100%',
        height: 200,
        marginVertical: 10,
        borderRadius: 5,
    },
    noPayments: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});
