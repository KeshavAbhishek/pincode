// src/HomeScreen.jsx
import React from 'react';
import { View, SafeAreaView, StatusBar, Text, ImageBackground } from 'react-native';
import { styles } from './styles';

export const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="gold" />

            <View style={styles.navbar}>
                <ImageBackground source={require('./static/Logo.png')} style={styles.logo} />
            </View>

            <View style={styles.bdy}>
                <View
                    style={styles.tile}
                    onTouchEnd={() => navigation.navigate('BodyFrame', { type: 'pincode' })}
                >
                    <ImageBackground source={require('./static/search.png')} style={styles.logoSearch} />
                    <Text style={styles.label}>By Pincode</Text>
                </View>

                <View
                    style={styles.tile}
                    onTouchEnd={() => navigation.navigate('BodyFrame', { type: 'postoffice' })}
                >
                    <ImageBackground source={require('./static/byname.png')} style={styles.postName} />
                    <Text style={styles.label}>By Office Name</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};
