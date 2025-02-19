import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PaymentsScreen } from '../screens/PaymentsScreen';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

const commonHeaderStyle = {
    headerStyle: {
        backgroundColor: '#2196F3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

export const AppNavigator = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#2196F3" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    // Rutas autenticadas
                    <>
                        <Stack.Screen 
                            name="Home" 
                            component={HomeScreen}
                            options={{ 
                                title: 'CondosApp',
                                ...commonHeaderStyle
                            }}
                        />
                        <Stack.Screen 
                            name="AccountStatement" 
                            component={() => null}
                            options={{ 
                                title: 'Estado de Cuenta',
                                ...commonHeaderStyle
                            }}
                        />
                        <Stack.Screen 
                            name="Payments" 
                            component={PaymentsScreen}
                            options={{ 
                                title: 'Pagos',
                                ...commonHeaderStyle
                            }}
                        />
                        <Stack.Screen 
                            name="Calendar" 
                            component={() => null}
                            options={{ 
                                title: 'Calendario',
                                ...commonHeaderStyle
                            }}
                        />
                        <Stack.Screen 
                            name="Amenities" 
                            component={() => null}
                            options={{ 
                                title: 'Amenidades',
                                ...commonHeaderStyle
                            }}
                        />
                        <Stack.Screen 
                            name="Votes" 
                            component={() => null}
                            options={{ 
                                title: 'Votaciones',
                                ...commonHeaderStyle
                            }}
                        />
                        <Stack.Screen 
                            name="Visitors" 
                            component={() => null}
                            options={{ 
                                title: 'Visitantes',
                                ...commonHeaderStyle
                            }}
                        />
                        <Stack.Screen 
                            name="Chat" 
                            component={() => null}
                            options={{ 
                                title: 'Chat',
                                ...commonHeaderStyle
                            }}
                        />
                    </>
                ) : (
                    // Rutas no autenticadas
                    <>
                        <Stack.Screen 
                            name="Login" 
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen 
                            name="Register" 
                            component={() => null}
                            options={{ headerShown: false }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
