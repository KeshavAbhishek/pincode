import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Pressable, Alert } from 'react-native';
import { styles } from './styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const BodyFrame = (props) => {
    const [activeTab, setActiveTab] = useState('pincode');
    const slideAnim = useRef(new Animated.Value(0)).current;
    const [pincode, setPincode] = useState();
    const [officename, setOfficeName] = useState();
    const [type, setType] = useState('pincode');
    const [search, setSearch] = useState("Search");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        Animated.timing(slideAnim, {
            toValue: tab === 'pincode' ? 0 : -SCREEN_WIDTH,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleReq = async () => {
        const isPinValid = type === 'pincode' && pincode?.trim() !== '';
        const isNameValid = type !== 'pincode' && officename?.trim() !== '';

        if (isPinValid || isNameValid) {
            try {
                setSearch("Searching...");
                const queryParam = type === 'pincode' ? pincode.trim() : officename.trim();
                const response = await fetch(`https://api.postalpincode.in/${type}/${queryParam}`);
                const data = await response.json();

                if (data[0]?.Status === 'Success') {
                    props.officeFoundFn(data[0].PostOffice || []);
                    setSearch("Found");
                    setTimeout(() => {

                        props.setGoTo(true);
                    }, 450);
                } else {
                    props.officeFoundFn([]);
                    setSearch("Search");
                }
            } catch (error) {
                console.error('API Error:', error);
                props.officeFoundFn([]);
                setSearch("Search");
            }
        } else {
            // Invalid input
            props.officeFoundFn([]);
            setSearch("Search");
        }
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <View style={styles.bodyFrame}>
                {/* Tab Header */}
                <View style={styles.tabHeader}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'pincode' && styles.activeTab]}
                        onPress={() => { handleTabChange('pincode'); setType('pincode') }}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.tabText}>By Pincode</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'name' && styles.activeTab]}
                        onPress={() => { handleTabChange('name'); setType('postoffice') }}
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
                        <Text style={styles.inputLabel}>Search by Pincode </Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="e.g. 110001"
                            placeholderTextColor="#999"
                            keyboardType="number-pad"
                            maxLength={6}
                            onChangeText={(val) => { setPincode(val) }}
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
                            onChangeText={(val) => { setOfficeName(val) }}
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
}

export default BodyFrame;
