// BodyFrame.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Dimensions,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import { styles } from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const BodyFrame = ({ route, navigation }) => {
    const initialType = route?.params?.type || 'pincode';

    const [activeTab, setActiveTab] = useState(initialType === 'postoffice' ? 'name' : 'pincode');
    const slideAnim = useRef(new Animated.Value(initialType === 'postoffice' ? -SCREEN_WIDTH : 0)).current;

    const [pincode, setPincode] = useState('');
    const [officename, setOfficeName] = useState('');
    const [type, setType] = useState(initialType);
    const [search, setSearch] = useState("Search");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setType(tab === 'pincode' ? 'pincode' : 'postoffice');

        Animated.timing(slideAnim, {
            toValue: tab === 'pincode' ? 0 : -SCREEN_WIDTH,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleReq = async () => {
        const isPinValid = type === 'pincode' && pincode?.trim() !== '';
        const isNameValid = type === 'postoffice' && officename?.trim() !== '';

        if (isPinValid || isNameValid) {
            try {
                setSearch("Searching...");
                const queryParam = type === 'pincode' ? pincode.trim() : officename.trim();
                const response = await fetch(`https://api.postalpincode.in/${type}/${queryParam}`);
                const data = await response.json();

                if (data[0]?.Status === 'Success') {
                    const offices = data[0].PostOffice || [];
                    setSearch("Found");
                    setTimeout(() => {
                        navigation.navigate('Result', { offices });
                    }, 400);
                } else {
                    Alert.alert("No Data", "No matching post offices found.");
                    setSearch("Search");
                }
            } catch (error) {
                console.error('API Error:', error);
                Alert.alert("Error", "Something went wrong while searching.");
                setSearch("Search");
            }
        } else {
            Alert.alert("Invalid Input", "Please enter a valid pincode or office name.");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.bodyFrame}>
                {/* Tab Header */}
                <View style={styles.tabHeader}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'pincode' && styles.activeTab]}
                        onPress={() => handleTabChange('pincode')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.tabText}>By Pincode</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'name' && styles.activeTab]}
                        onPress={() => handleTabChange('name')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.tabText}>By Name</Text>
                    </TouchableOpacity>
                </View>

                {/* Sliding Tab Content */}
                <Animated.View
                    style={[
                        styles.tabSlideWrapper,
                        { transform: [{ translateX: slideAnim }] },
                    ]}
                >
                    {/* PinCode Tab */}
                    <View style={[styles.tabContent, { width: SCREEN_WIDTH }]}>
                        <Text style={styles.inputLabel}>Search by Pincode</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="e.g. 110001"
                            placeholderTextColor="#999"
                            keyboardType="number-pad"
                            maxLength={6}
                            onChangeText={setPincode}
                            value={pincode}
                        />
                    </View>

                    {/* Name Tab */}
                    <View style={[styles.tabContent, { width: SCREEN_WIDTH }]}>
                        <Text style={styles.inputLabel}>Search by Name</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="e.g. Delhi"
                            placeholderTextColor="#999"
                            onChangeText={setOfficeName}
                            value={officename}
                        />
                    </View>
                </Animated.View>

                <TouchableOpacity style={styles.search} onPress={handleReq}>
                    <Text style={styles.searchText}>{search}</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default BodyFrame;
