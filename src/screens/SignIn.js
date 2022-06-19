import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  Button,
  TextInput,
} from 'react-native';

import {Container, Form, Item, Input, H3} from 'native-base';

import Welcome from '../assets/doctor-logo.png';

import {connect} from 'react-redux';
import {signIn} from '../action/auth';
import propTypes from 'prop-types';

const SignIn = ({navigation, signIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doSignIn = () => {
    signIn({email, password});
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text>Welcome to Doctor Patient App</Text>

        <Image
          source={Welcome}
          style={{width: null, height: 150, marginTop: 30}}
          resizeMode="contain"
        />
        <TextInput
          placeholder="enter your registerd email"
          value={email}
          style={styles.input}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="enter your registerd password"
          value={password}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={text => setPassword(text)}
        />
        <Button rounded block onPress={doSignIn} title="SignIn"></Button>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={{marginTop: 10}}>
          <Text style={{color: '#000', textAlign: 'center'}}>
            Do not have an account, SignUp here
          </Text>
        </TouchableOpacity>
        {/*
        <Form>
          <Item rounded style={styles.formItem}>
            <TextInput
              placeholder="enter your registerd email"
              value={email}
              style={{color: '#eee'}}
              onChangeText={text => setEmail(text)}
            />
          </Item>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="enter your registerd password"
              value={password}
              secureTextEntry={true}
              style={{color: '#eee'}}
              onChangeText={text => setPassword(text)}
            />
          </Item>
          <Button rounded block onPress={doSignIn}>
            <Text>SignIn</Text>
          </Button>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={{marginTop: 10}}>
            <Text style={{color: '#fff', textAlign: 'center'}}>
              Do not have an account, SignUp here
            </Text>
          </TouchableOpacity>
        </Form> */}
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = {
  signIn: data => signIn(data),
};

SignIn.propTypes = {
  signIn: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#fdcb9e',
    marginHorizontal: 5,
    marginTop: 30,
  },
  formItem: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
