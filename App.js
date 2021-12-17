import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [data,setData]=useState();
  useEffect(()=>{
  var array = ["C","CN","CN U","CN Ud","CN Ude","CN Udem","CN Udemy","CN Udemy E","CN Udemy Ex","CN Udemy Exp","CN Udemy Expo"];
  var i = 0;
  setInterval(()=>{
    setData(array[i]);
    i > array.length? i = 0: i += 1;
  },1500)
  
    
  },[])
  return (
    <View style={styles.container}>
      <Text style={styles.textcontainer}>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textcontainer:{
    color:"green",
    fontSize:45,
  }
});
