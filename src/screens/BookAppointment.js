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
  Pressable,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookAppointment = ({route, navigation, userDetails}) => {
  const [doctorDetails, setDoctorDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState('');

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    let fTime =
      'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
    setText(fDate + '\n' + fTime);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    console.log('Here');
    setShow(true);
    showMode('date');
  };

  const showTimepicker = () => {
    setShow(true);
    showMode('time');
  };

  console.log('show', show);

  const handleBookAppoinmentBooking = async () => {
    alert('Appointment Booked');
    try {
      const response = await axios.post(
        `http://127.0.0.1:3000/v1/appointments/${route.params.doc_details.account_id}`,
        {
          doctors_account_id: '1b92b4c1-252a-430a-abeb-c2943bb78b58',
          appointment_date: date,
          mobile: phone,
          note: note,
        },
      );
      if (response) {
        setShowSuccessAlert(true);
      }
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setIsError(true);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        setIsError(true);
      } else {
        // Something happened in setting up the request that triggered an Error
        setIsError(true);
      }
      setIsError(true);
    }
  };

  const handleAppoinmentBookingNavigation = () => {
    navigation.navigate('Home');
  };

  console.log('open', date);

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldName}>Patient Name</Text>
          <Text style={styles.fieldValue}>Sunny</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldName}>Appointment date</Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
          <View style={styles.fieldValue}>
            <Pressable onPress={showDatepicker}>
              <Text style={styles.dateBtn}>{date.toDateString()}</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldName}>Time</Text>
          <TextInput
            style={styles.fieldValue}
            placeholderTextColor={'#F4F7F4'}
            placeholder="Select slot"
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldName}>Phone no.</Text>
          <TextInput
            onChange={text => setPhone(text)}
            style={styles.fieldValue}
            placeholderTextColor={'#F4F7F4'}
            placeholder="Enter phone"
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldName}>Note</Text>
          <TextInput
            onChange={text => setNote(text)}
            numberOfLines={4}
            style={styles.fieldValue}
            placeholderTextColor={'#F4F7F4'}
            placeholder="Enter more details"
          />
        </View>
        <View style={styles.submitBtn}>
          <Button onPress={handleBookAppoinmentBooking} title="Submit" />
        </View>
      </ScrollView>
    </View>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'left',
    color: '#F4F7F4',
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 24,
    marginVertical: 24,
  },
  fieldContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginVertical: 12,
    color: '#F4F7F4',
  },
  fieldName: {
    width: '50%',
    color: '#F4F7F4',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  fieldValue: {
    width: '50%',
    color: '#F4F7F4',
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: 8,
  },
  FieldTextColor: {
    color: '#F4F7F4',
  },
  emailFieldValue: {
    width: '50%',
    color: '#F4F7F4',
  },
  submitBtn: {
    marginHorizontal: 24,
    marginTop: 16,
  },
  dateBtn: {
    color: '#F4F7F4',
  },
});
