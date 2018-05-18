import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../constants/constants';

let styles = {};

const ScreenWrapper = ({ children }) => (
  <View style={styles.subContainer}>
    <View style={styles.gridItem} removeClippedSubviews={true}>
      {children}
    </View>
  </View>
);

styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.subContainerBackgroundColor,
  },
  gridItem: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
    borderColor: colors.gridItemStroke,
    borderWidth: 1,
    backgroundColor: colors.gridItemBackground,
  },
});

export default ScreenWrapper;