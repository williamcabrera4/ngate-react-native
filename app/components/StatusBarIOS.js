import React from 'react';
import { StyleSheet, View, StatusBar, Text, Image } from 'react-native';
import { colors } from '../constants/constants';
import backIcon from '../images/back.png';
import menuIcon from '../images/menu.png';

let styles = {};

const StatusBarIOS = ({ isBack }) => (
  <View>
    <StatusBar barStyle="light-content"/>
    <View style={styles.statusBar}/>
    <View style={styles.appBar}>
      <Image
        style={styles.backIcon}
        source={menuIcon}
      />
      <Text style={styles.appBarTitle}>NGate</Text>
      <View />
    </View>
  </View>
);

styles = StyleSheet.create({
  statusBar: {
    height: 20,
    backgroundColor: colors.colorPrimary,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.colorPrimary,
    height: 44,
  },
  appBarTitle: {
    marginRight: 40,
    fontSize: 22,
    color: colors.white,
  },
  backIcon: {
    height: 20,
    width: 20,
    marginLeft: 20,
  }
});

export default StatusBarIOS;
