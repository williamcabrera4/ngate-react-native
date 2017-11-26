import React from 'react';
import { StyleSheet, View, StatusBar, Text } from 'react-native';
import { colors } from '../constants/constants';

let styles = {};

const StatusBarIOS = () => (
  <View>
    <StatusBar barStyle="light-content"/>
    <View style={styles.statusBar}/>
    <View style={styles.appBar}>
      <Text style={styles.appBarTitle}>NGate</Text>
    </View>
  </View>
);

styles = StyleSheet.create({
  statusBar: {
    height: 20,
    backgroundColor: colors.colorPrimary,
  },
  appBar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.colorPrimary,
    height: 44,
  },
  appBarTitle: {
    fontSize: 22,
    color: colors.white,
  }
});

export default StatusBarIOS;