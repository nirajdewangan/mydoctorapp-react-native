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
} from 'react-native';
import {useWindowDimensions} from 'react-native';

const DoctorsInfo = ({route, navigation, userDetails}) => {
  const [doctorDetails, setDoctorDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const {height, width} = useWindowDimensions();

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `http://9d81-14-97-167-154.ngrok.io/v1/accounts/${route.params.doc_details.account_id}`,
      );
      setDoctorDetails(response.data.data);
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

  function handleAppoinmentBookingNavigation() {
    navigation.navigate('BookAppointment', {
      doc_details: {
        account_id: route.params.doc_details.account_id,
        userDetails: route.params.doc_details.userDetails,
      },
    });
  }

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldName}>Name</Text>
          <Text style={styles.fieldValue}>
            Dr. {doctorDetails?.first_name + ' ' + doctorDetails?.last_name}
          </Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldName}>Specialization</Text>
          <Text style={styles.fieldValue}>
            {doctorDetails?.specialization ? doctorDetails.specialization : '-'}
          </Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldName}>Age</Text>
          <Text style={styles.fieldValue}>{doctorDetails?.age}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldName}>Gender</Text>
          <Text style={styles.fieldValue}>{doctorDetails?.gender}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldName}>Email</Text>
          <Text style={styles.emailFieldValue}>{doctorDetails?.email}</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldName}>City</Text>
          <Text style={styles.fieldValue}>{doctorDetails?.city}</Text>
        </View>
        <View style={styles.submitBtn}>
          <Button
            title="Book an appointment"
            onPress={handleAppoinmentBookingNavigation}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorsInfo;

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
    textTransform: 'capitalize',
  },
  emailFieldValue: {
    width: '50%',
    color: '#F4F7F4',
  },
  submitBtn: {
    marginHorizontal: 24,
    marginTop: 16,
  },
});
