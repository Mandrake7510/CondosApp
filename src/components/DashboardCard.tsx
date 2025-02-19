import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text, Icon } from '@rneui/themed';

interface DashboardCardProps {
    title: string;
    icon: string;
    color: string;
    onPress: () => void;
    badge?: number;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    icon,
    color,
    onPress,
    badge
}) => {
    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
                <Icon
                    name={icon}
                    type="material"
                    color="white"
                    size={32}
                />
                {badge ? (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{badge}</Text>
                    </View>
                ) : null}
            </View>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '45%',
        aspectRatio: 1,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#333',
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#FF4444',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
