import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Input, Text } from '@rneui/themed';
import { CustomButton } from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signIn } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Por favor ingresa email y contraseña');
            return;
        }

        try {
            await signIn(email, password);
        } catch (err) {
            setError('Email o contraseña incorrectos');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.logoContainer}>
                        <Text h1 style={styles.title}>CondosApp</Text>
                        <Text style={styles.subtitle}>Gestión de Condominios</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <Input
                            placeholder="Email"
                            leftIcon={{ type: 'material', name: 'email' }}
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            containerStyle={styles.inputContainer}
                        />

                        <Input
                            placeholder="Contraseña"
                            leftIcon={{ type: 'material', name: 'lock' }}
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry
                            containerStyle={styles.inputContainer}
                        />

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <CustomButton
                            title="Iniciar Sesión"
                            onPress={handleLogin}
                            containerStyle={styles.buttonContainer}
                        />

                        <Text style={styles.forgotPassword}>
                            ¿Olvidaste tu contraseña?
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        color: '#2196F3',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
    },
    formContainer: {
        width: '100%',
    },
    inputContainer: {
        paddingHorizontal: 0,
        marginVertical: 5,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    forgotPassword: {
        color: '#2196F3',
        textAlign: 'center',
        marginTop: 15,
    },
});
