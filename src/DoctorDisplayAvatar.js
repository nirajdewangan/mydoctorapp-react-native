import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const DoctorDisplayAvatar = ({name, account_id}) => {
  const navigation = useNavigation();

  function AllDoctorsNavigationHandler() {
    navigation.navigate('DoctorsInfo', {
      doc_details: {
        account_id: account_id,
      },
    });
  }
  return (
    <View style={styles.mainContainer}>
      <Pressable
        onPress={AllDoctorsNavigationHandler}
        style={styles.avatarContainer}>
        <View style={{textAlign: 'center'}}>
          <Image
            style={styles.avatarImg}
            source={require('./assets/avtar.jpeg')}
            accessibilityLabel={'Doctor Avatar'}
          />
          <Text
            numberOfLines={2}
            style={styles.avatarName}
            style={{flexShrink: 1, flexWrap: 'wrap'}}>
            {name}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default DoctorDisplayAvatar;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    flex: 1,
    paddingVertical: 12,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F0F0F0',
    width: 120,
  },
  avatarImg: {
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: '#010101',
  },
  avatarName: {
    fontSize: 12,
    width: 50,
    marginTop: 8,
    // textAlign: "center",
  },
});
