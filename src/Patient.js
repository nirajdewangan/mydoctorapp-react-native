import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';
import DoctorDisplayAvatar from '../component/DoctorDisplayAvatar';

const Patient = ({route}) => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        'http://250a-14-97-167-154.ngrok.io/v1/accounts/list/DOCTOR',
      );
      setDoctors(response.data.data);
      console.log('response.data', response.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setIsError(true);
        console.log('C1');
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        setIsError(true);
        console.log('C2');
      } else {
        // Something happened in setting up the request that triggered an Error
        setIsError(true);
        console.log('C3');
      }
      setIsError(true);
      console.log('C4');
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  console.log('doctors', doctors);

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.heading}>Doctors</Text>
      </View>

      <SafeAreaView style={styles.doctorsContainer}>
        <FlatList
          data={doctors}
          renderItem={({item}) => (
            <DoctorDisplayAvatar
              name={item.full_name}
              account_id={item.account_id}
            />
          )}
          keyExtractor={item => item.account_id}
          // ItemSeparatorComponent={Separator}
          horizontal={true}
        />
      </SafeAreaView>
    </View>
  );
};

export default Patient;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'left',
    color: '#00b7c2',
    marginHorizontal: 24,
    marginVertical: 24,
  },
  doctorsContainer: {
    height: 100,
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
  },
});
