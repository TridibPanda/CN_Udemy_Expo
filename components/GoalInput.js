import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const GoalInput = props => {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [check,setCheck]=useState(false);

  const goalInputHandler = enteredText => {
    setEnteredGoal(enteredText);
    setCheck(false);
  };

  const addGoalHandler = () => {
    if(enteredGoal){
      props.onAddGoal(enteredGoal);
      setEnteredGoal('');
      setCheck(false);
    }else{
      setCheck(true);
    }
  
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          style={[styles.input,{borderColor: check ? 'red' : 'black'}]}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="CANCEL" color="red" onPress={props.onCancel} />
          </View>
          <View style={styles.button}>
            <Button title="ADD" onPress={addGoalHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%'
  },
  button: {
    width: '40%'
  }
});

export default GoalInput;
