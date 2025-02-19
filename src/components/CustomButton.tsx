import React from 'react';
import { Button, ButtonProps } from '@rneui/themed';
import { StyleSheet } from 'react-native';

interface CustomButtonProps extends ButtonProps {
    title: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ title, ...props }) => {
    return (
        <Button
            {...props}
            title={title}
            buttonStyle={[styles.button, props.buttonStyle]}
            titleStyle={[styles.buttonText, props.titleStyle]}
            containerStyle={[styles.container, props.containerStyle]}
            raised
        />
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        marginVertical: 8,
    },
    button: {
        backgroundColor: '#2196F3',
        paddingVertical: 12,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
