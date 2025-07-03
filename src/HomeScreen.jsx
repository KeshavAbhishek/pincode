// src/HomeScreen.jsx
import React, { useRef } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  ImageBackground,
  Pressable,
  Animated,
  Platform,
} from 'react-native';
import { styles } from './styles';
import HapticFeedback from 'react-native-haptic-feedback';

export const HomeScreen = ({ navigation }) => {
  const scale1 = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(1)).current;

  const handlePress = (targetScreen, type, anim) => {
    // Haptic feedback
    HapticFeedback.trigger('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });

    // Animation
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate(targetScreen, { type });
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="gold" />

      <View style={styles.navbar}>
        <ImageBackground source={require('./static/Logo.png')} style={styles.logo} />
      </View>

      <View style={styles.bdy}>
        <Animated.View style={{ transform: [{ scale: scale1 }] }}>
          <Pressable
            style={styles.tile}
            onPress={() => handlePress('BodyFrame', 'pincode', scale1)}
          >
            <ImageBackground
              source={require('./static/search.png')}
              style={styles.logoSearch}
            />
            <Text style={styles.label}>By Pincode</Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: scale2 }] }}>
          <Pressable
            style={styles.tile}
            onPress={() => handlePress('BodyFrame', 'postoffice', scale2)}
          >
            <ImageBackground
              source={require('./static/byname.png')}
              style={styles.postName}
            />
            <Text style={styles.label}>By Office Name</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};
