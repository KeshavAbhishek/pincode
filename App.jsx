// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Animated,
    Dimensions,
    Easing,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BodyFrame from './src/BodyFrame';
import Result from './src/Result';
import { HomeScreen } from './src/HomeScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;
const Stack = createNativeStackNavigator();

const App = () => {
    const [isSplashVisible, setIsSplashVisible] = useState(true);
    const slideAnim = useRef(new Animated.Value(0)).current;

    // Dot animations
    const dotAnims = [
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
    ];

    useEffect(() => {
        const startDotAnimation = (dot, delay) => {
            Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(dot, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                        easing: Easing.ease,
                    }),
                    Animated.timing(dot, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                        easing: Easing.ease,
                    }),
                ])
            ).start();
        };

        // Start dot animations
        dotAnims.forEach((dot, i) => startDotAnimation(dot, i * 200));

        // Slide out splash screen after delay
        const timer = setTimeout(() => {
            Animated.timing(slideAnim, {
                toValue: -SCREEN_WIDTH,
                duration: 600,
                useNativeDriver: true,
            }).start(() => {
                setIsSplashVisible(false);
            });
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {/* App Always Renders Below */}
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="BodyFrame" component={BodyFrame} />
                    <Stack.Screen name="Result" component={Result} />
                </Stack.Navigator>
            </NavigationContainer>

            {/* Splash Overlay (Animated) */}
            {isSplashVisible && (
                <Animated.View
                    style={[
                        splashStyles.container,
                        { transform: [{ translateX: slideAnim }] },
                    ]}
                    pointerEvents="none"
                >
                    <Image
                        source={require('./src/static/Logo.png')}
                        style={splashStyles.logo}
                    />
                    <Text style={splashStyles.title}>Post Office Finder</Text>

                    {/* Traversing Dots */}
                    <View style={splashStyles.dotContainer}>
                        {[0, 1, 2].map((index) => (
                            <Animated.View
                                key={index}
                                style={[
                                    splashStyles.dot,
                                    {
                                        transform: [
                                            {
                                                translateY: dotAnims[index].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, -10],
                                                }),
                                            },
                                        ],
                                    },
                                ]}
                            />
                        ))}
                    </View>
                </Animated.View>
            )}
        </View>
    );
};

const splashStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1000,
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#fff8dc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 40,
    },
    dotContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 30,
        marginTop: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#333',
        marginHorizontal: 6,
    },
});

export default App;
