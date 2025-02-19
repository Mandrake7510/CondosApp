import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DashboardCard } from '../components/DashboardCard';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
    const { user, signOut } = useAuth();
    const navigation = useNavigation();

    const dashboardItems = [
        {
            title: 'Estado de Cuenta',
            icon: 'account-balance',
            color: '#2196F3',
            screen: 'AccountStatement',
        },
        {
            title: 'Pagos',
            icon: 'payment',
            color: '#4CAF50',
            screen: 'Payments',
            badge: 2,
        },
        {
            title: 'Calendario',
            icon: 'event',
            color: '#FF9800',
            screen: 'Calendar',
            badge: 3,
        },
        {
            title: 'Amenidades',
            icon: 'pool',
            color: '#9C27B0',
            screen: 'Amenities',
        },
        {
            title: 'Votaciones',
            icon: 'how-to-vote',
            color: '#F44336',
            screen: 'Votes',
            badge: 1,
        },
        {
            title: 'Visitantes',
            icon: 'qr-code',
            color: '#009688',
            screen: 'Visitors',
        },
        {
            title: 'Chat',
            icon: 'chat',
            color: '#795548',
            screen: 'Chat',
            badge: 1,
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text h4>Bienvenido,</Text>
                <Text style={styles.userName}>{user?.name}</Text>
                <Text style={styles.unitText}>Unidad: {user?.unit}</Text>
            </View>

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.cardsContainer}>
                    {dashboardItems.map((item, index) => (
                        <DashboardCard
                            key={index}
                            title={item.title}
                            icon={item.icon}
                            color={item.color}
                            badge={item.badge}
                            onPress={() => navigation.navigate(item.screen as never)}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
    },
    unitText: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 10,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 5,
    },
});
