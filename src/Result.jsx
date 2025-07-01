// Result.jsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { styles } from './styles';

const Result = ({ route, navigation }) => {
    const { offices } = route.params;
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentOffice = offices[currentIndex];

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.bodyFrame}>
                <View style={styles.tabHeader}>
                    <Text style={styles.resultText}>Result</Text>
                </View>

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

                {offices.length > 1 && (
                    <View style={styles.toggleButtonContainer}>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                currentIndex === 0 && styles.disabledButton,
                            ]}
                            onPress={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                            disabled={currentIndex === 0}
                        >
                            <Image source={require('./static/btn.png')} style={styles.btnPrev} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.searchText}>Back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                currentIndex === offices.length - 1 && styles.disabledButton,
                            ]}
                            onPress={() =>
                                setCurrentIndex((prev) => Math.min(prev + 1, offices.length - 1))
                            }
                            disabled={currentIndex === offices.length - 1}
                        >
                            <Image source={require('./static/btn.png')} style={styles.btnNext} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Result;