import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Pressable, ScrollView, Image } from 'react-native';
import { styles } from './styles';

const Result = (props) => {
    // const [offices, setOffices] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // useEffect(() => {
    //     fetch('https://api.postalpincode.in/pincode/835217')
    //         .then((res) => res.json())
    //         .then((data) => {
    //             if (data[0]?.Status === 'Success') {
    //                 setOffices(data[0].PostOffice || []);
    //             } else {
    //                 setOffices([]);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('API Error:', error);
    //             setOffices([]);
    //         });
    // }, []);

    const currentOffice = props.officeFound[currentIndex];

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.bodyFrame}>
                <View style={styles.tabHeader}>
                    <Text style={styles.resultText}>Result</Text>
                </View>

                {/* Show current card only */}
                {currentOffice ? (
                    <View style={styles.resultCard}>
                        <Text style={styles.resultTextItem}>Name: {currentOffice.Name}</Text>
                        <Text style={styles.resultTextItem}>Branch Type: {currentOffice.BranchType}</Text>
                        <Text style={styles.resultTextItem}>Delivery: {currentOffice.DeliveryStatus}</Text>
                        <Text style={styles.resultTextItem}>Circle: {currentOffice.Circle}</Text>
                        <Text style={styles.resultTextItem}>District: {currentOffice.District}</Text>
                        <Text style={styles.resultTextItem}>Division: {currentOffice.Division}</Text>
                        <Text style={styles.resultTextItem}>Region: {currentOffice.Region}</Text>
                        <Text style={styles.resultTextItem}>Block: {currentOffice.Block}</Text>
                        <Text style={styles.resultTextItem}>State: {currentOffice.State}</Text>
                        <Text style={styles.resultTextItem}>Country: {currentOffice.Country}</Text>
                        <Text style={styles.resultTextItem}>Pincode: {currentOffice.Pincode}</Text>
                    </View>
                ) : (
                    <Text style={styles.noResultText}>No post offices found.</Text>
                )}

                {/* Toggle Buttons */}
                {props.officeFound.length > 1 && (
                    <View style={styles.toggleButtonContainer}>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                currentIndex === 0 && styles.disabledButton,
                            ]}
                            onPress={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                            disabled={currentIndex === 0}
                        >
                            {/* <Text style={styles.toggleButtonText}>Previous</Text> */}
                            <Image source={require('./static/btn.png')} style={styles.btnPrev}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.backButton} onPress={() => { props.officeFoundFn([]); props.setBackTo(false) }}>
                            <Text style={styles.searchText}>Back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                currentIndex === props.officeFound.length - 1 && styles.disabledButton,
                            ]}
                            onPress={() =>
                                setCurrentIndex((prev) => Math.min(prev + 1, props.officeFound.length - 1))
                            }
                            disabled={currentIndex === props.officeFound.length - 1}
                        >
                            {/* <Text style={styles.toggleButtonText}>Next</Text> */}
                            <Image source={require('./static/btn.png')} style={styles.btnNext}></Image>
                        </TouchableOpacity>
                    </View>
                )}

                {/* <TouchableOpacity style={styles.backButton} onPress={() => {props.officeFoundFn([]);props.setBackTo(false)}}>
                    <Text style={styles.searchText}>Back</Text>
                </TouchableOpacity> */}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Result;