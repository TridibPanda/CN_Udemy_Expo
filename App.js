import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import * as FileSystem from 'expo-file-system';
import NetInfo from '@react-native-community/netinfo';

const downloadSizeInBits = 81752256;
const imageURI = "https://vidoes.pitchers.ai/Dev-Pitches/cRjsX0idQAR1IiXbTpvZD4Hh2843/1617172373834/video";

const App = (props) => {
  const [internet, setInternet] = useState(false);
  const [speedTest, setSpeedTest] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0); // max speed 81752256
  const [ping, setPing] = useState(0);
  const [isWifiEnabled, setIsWifiEnabled] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type, state.isInternetReachable);
      console.log('Is connected?', state.isConnected, state);
      setInternet(state.isConnected);
      setIsWifiEnabled(state.isWifiEnabled);
      setDetails(state.details)
    },[]);

    return () => {
      unsubscribe();
    };

  }, []);
  const speed = async () => {
    setDownloadSpeed(1);
    setPing(1);
    if (internet) {
      setSpeedTest(true);
      const startTime = (new Date()).getTime();
      FileSystem.downloadAsync(imageURI, FileSystem.documentDirectory + "image")
        .then(async ({ uri }) => {
          const endTime = (new Date()).getTime();
          const duration = (endTime - startTime) / 1000;
          const speed = (downloadSizeInBits / (1024 * 1024 * duration));
          console.log(speed, duration, 'speed details')
          setDownloadSpeed(speed);
          setPing(duration);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Check your internet connection");
    }
  }

  return (
    speedTest ? <View style={{
      flex: 1,
      backgroundColor: '#1491b3',
      alignItems: 'center',
    }}>
      {isWifiEnabled ? <View style={{ marginBottom: '20%', marginTop: '35%' }}>
        <Text style={styles.textstyle}>Connection type : wifi</Text>
        <Text style={styles.textstyle}>ipAddress : {details.ipAddress}</Text>
        <Text style={styles.textstyle}>subnet : {details.subnet}</Text>
        <Text style={styles.textstyle}>frequency : {(details.frequency / 1000).toFixed(1)} GHz</Text>
        <Text style={styles.textstyle}>strength : {details.strength}</Text>
      </View> :
        <View style={{ marginBottom: '30%', marginTop: '35%' }}>
          <Text style={styles.textstyle}>Connection type :{`${details.carrier} (${details.cellularGeneration})`} </Text>
        </View>}
      <View style={{marginTop: '3%' , alignItems: 'center',}}>
        <Text style={styles.speed}>Download Speed : {downloadSpeed.toFixed(1)} Mbps</Text>
        <Text style={styles.speed}>Ping : {Math.round(ping)} ms</Text>
        <TouchableOpacity onPress={() => setSpeedTest(false)} style={styles.botten}>
          <Text style={styles.speed}>Test Again</Text>
        </TouchableOpacity>
      </View>
    </View> :
      <View style={[styles.container, { backgroundColor: internet ? '#1e294a' : '#f71b02' }]}>
        <TouchableOpacity onPress={speed} style={styles.gocontainer}>
          <Text style={styles.gotext}>Go</Text>
        </TouchableOpacity>
        <Text style={styles.footertext}>Tridib</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#1e294a',
  },
  gotext: {
    fontSize: 50,
    color: '#fff',
  },
  gocontainer: {
    height: 200,
    width: 200,
    borderRadius: 200,
    borderColor: '#ad7411',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footertext: {
    top: '30%',
    fontSize: 15,
    color: '#fff',
  },
  progressBackground: {
    height: "2%",
    width: "80%",
    backgroundColor: '#333f42',
    borderRadius: 10
  },
  progress: {
    height: "100%",
    backgroundColor: '#9c0699',
    borderRadius: 10
  },
  textstyle: {
    fontSize: 20,
    color: '#fff',
  },
  speed: {
    fontSize: 20,
    color: '#fff',
  },
  botten: {
    marginTop: '25%',
    height: 50,
    width: 200,
    borderRadius: 25,
    backgroundColor: '#9c0699',
    borderColor: '#ff03fa',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }

});

export default App;
