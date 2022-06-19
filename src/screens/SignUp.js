import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Button,
} from 'react-native';

import {Container, Form, Item, Input, Thumbnail, Content} from 'native-base';

import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';

import ImagePicker from 'react-native-image-picker';
import {options} from '../utils/options';

//redux
import propTypes from 'prop-types';
import {signUp} from '../action/auth';
import {connect} from 'react-redux';
// import {TextInput} from 'react-native-gesture-handler';

const SignUp = ({signUp}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instaUserName, setInstaUserName] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(
    'https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png',
  );

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const chooseImage = async () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
        uploadImage(response);
      }
    });
  };

  const uploadImage = async response => {
    setImageUploading(true);
    const reference = storage().ref(response.fileName);

    const task = reference.putFile(response.path);
    task.on('state_changed', taskSnapshot => {
      const percentage =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000;

      setUploadStatus(percentage);
    });

    task.then(async () => {
      const url = await reference.getDownloadURL();

      setImage(url);
      setImageUploading(false);
    });
  };

  const doSignUp = async () => {
    signUp({name, instaUserName, bio, country, email, password, image});
  };

  return (
    <View style={styles.container}>
      <Text> Sign Up</Text>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={chooseImage}>
            <Image source={{uri: image}} style={{width: 66, height: 100}} />
          </TouchableOpacity>
        </View>
        {imageUploading && (
          <ProgressBar progress={uploadStatus} style={styles.progress} />
        )}

        <TextInput
          placeholder="name"
          value={name}
          style={styles.input}
          onChangeText={text => setName(text)}
        />

        <TextInput
          placeholder="email"
          value={email}
          style={styles.input}
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          placeholder="password"
          value={password}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={text => setPassword(text)}
        />

        <TextInput
          placeholder="Instagram user name"
          value={instaUserName}
          style={styles.input}
          onChangeText={text => setInstaUserName(text)}
        />

        <TextInput
          placeholder="Your Short Bio"
          value={bio}
          style={styles.input}
          onChangeText={text => setBio(text)}
        />

        <TextInput
          placeholder="country"
          value={country}
          style={styles.input}
          onChangeText={text => setCountry(text)}
        />

        <Button regular block onPress={doSignUp} title="SignUp"></Button>
      </ScrollView>
    </View>
  );
};

const mapDispatchToProps = {
  signUp: data => signUp(data),
};

SignUp.propTypes = {
  signUp: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    flex: 1,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  progress: {width: null, marginBottom: 20},
  formItem: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
});
