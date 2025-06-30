import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, Image } from 'react-native';
import { styles } from './src/styles';
import { ImageBackground } from 'react-native';
import BodyFrame from './src/BodyFrame';
import Result from './src/Result';

const App = () => {
  const [result, setResult] = useState(false);
  const [offices, setOffices] = useState([]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="gold" />

      <View style={styles.navbar}>
        <ImageBackground source={require('./src/static/Logo.png')} style={styles.logo} />
      </View>
      {result === false ?
        <BodyFrame setGoTo={setResult} officeFound={offices} officeFoundFn={setOffices} />
        :
        <Result setBackTo={setResult} officeFound={offices} officeFoundFn={setOffices} />}
      {/* <BodyFrame /> */}
    </SafeAreaView>
  );
};

export default App;
