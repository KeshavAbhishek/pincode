import { StyleSheet, Platform, StatusBar } from "react-native";
import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        paddingTop: Platform.OS === 'android' ? 0 : 0
    },
    navbar: {
        backgroundColor: 'gold',
        paddingHorizontal: 15,
        paddingVertical: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        aspectRatio: 297 / 162,
        resizeMode: 'contain'
    },
    bodyFrame: {
        width: '100%',
        backgroundColor: '',
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    tabHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: 'gold',
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical: 20,

    },

    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 100,
        paddingVertical: 20,
    },

    activeTab: {
        backgroundColor: '#ffffff70',
        fontWeight: 'bold',
        width: '45%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset 2px 2px 5px crimson, inset -2px -2px 5px crimson',

    },
    tabText: {
        fontSize: RFValue(14),
        fontWeight: 'bold'
    },
    tabSlideWrapper: {
        flexDirection: 'row',
        width: SCREEN_WIDTH * 2,
    },
    tabContent: {
        padding: 20,
        borderRadius: 10,
    },
    inputLabel: {
        fontSize: 16,
        fontSize: RFValue(16),
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#444',
        marginBottom: 20,
    },

    inputField: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        borderRadius: 16,
        // fontSize: 16,
        color: '#333',
        width: '90%',
        borderWidth: 2,
        borderColor: 'green',
        paddingVertical: 18,
        ...Platform.select({
            ios: {
                shadowColor: '#fff',
                shadowOffset: { width: -3, height: -3 },
                shadowOpacity: 1,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
        fontSize: RFValue(15),
        fontWeight: 'bold'

    },
    search: {
        backgroundColor: 'crimson',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 15,
        width: '60%',
        marginHorizontal: 'auto',
        marginVertical: 15
    },
    searchText: {
        color: 'white',
        // fontSize: 16,
        fontSize: RFValue(16),
        fontWeight: 'bold'
    },
    resultText: {
        fontSize: RFValue(30),
        fontWeight: 'bold',
        paddingVertical: 0,
        width: '100%',
        textAlign: 'center'
    },
    backButton: {
        backgroundColor: 'navy',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical: 15,
        borderRadius: 15,
        width: '40%',
        // marginHorizontal: 'auto',
        // marginVertical: 15
    },
    resultCard: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        // elevation: 4,
        marginVertical: 15,
        borderWidth: 1.5,
        borderColor: 'transparent', // 👈 Updated here
        boxShadow: 'inset 6px 6px 1px crimson, inset -6px -6px 0px gold',
        borderEndStartRadius: 50,
        borderEndEndRadius: 50
    },

    toggleButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        // marginBottom: 20,
        marginVertical: 15
    },

    toggleButton: {
        backgroundColor: '#4285F4',
        // paddingVertical: 10,
        // paddingHorizontal: 20,
        borderRadius: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    disabledButton: {
        backgroundColor: '#ccc',
    },

    toggleButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        fontSize: RFValue(13)
    },

    resultTextItem: {
        // fontSize: 14,
        fontSize: RFValue(15),
        marginBottom: 4,
        color: '#333'
    },

    noResultText: {
        fontSize: RFValue(16),
        textAlign: 'center',
        color: 'gray',
        marginTop: 40,
    },
    btnNext: {
        width: RFValue(40),
        height: RFValue(40)
    },
    btnPrev: {
        width: RFValue(40),
        height: RFValue(40),
        transform: 'rotate(180deg)'
    },
    // MODAL
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertBox: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
    },
    alertMessage: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    okButton: {
        backgroundColor: '#4285F4',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    okButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
})