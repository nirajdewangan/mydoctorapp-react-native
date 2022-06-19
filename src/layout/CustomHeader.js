import React from 'react';
import {StyleSheet, Button, Icon, View, Text} from 'react-native';
import {Header, Body, Right, Title} from 'native-base';

import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {signOut} from '../action/auth';

const CustomHeader = ({signOut, authState, navigation}) => {
  return (
    <View>
      {/* <Text>My Doctor App</Text> */}

      {authState.isAuthenticated && (
        <>
          <Button transparent onPress={() => signOut()} title="Logout"></Button>
        </>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  authState: state.auth,
});

const mapDispatchToProps = {
  signOut,
};

CustomHeader.prototypes = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
