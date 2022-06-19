import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container, Spinner} from 'native-base';

const EmptyContainer = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text>Loading ....</Text>
    </View>
  );
};

export default EmptyContainer;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
