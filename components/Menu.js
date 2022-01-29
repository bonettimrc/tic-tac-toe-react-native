import React from "react";
import { Button, StyleSheet, View } from 'react-native';
export default function Menu(props) {
    return (
        <View style={styles.container}>
            <Button
                title="SinglePlayer"
                onPress={() =>
                    props.navigation.navigate('singlePlayer')
                }
            />
            <Button
                title="Multiplayer"
                onPress={() =>
                    props.navigation.navigate('multiPlayer')
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
});
