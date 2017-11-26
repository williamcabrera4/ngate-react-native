import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { colors } from '../constants/constants';

let styles = {};

const Button = ({ label, style, onPress }) => {
  const containerStyle = StyleSheet.flatten([styles.container, style]);
  return (
    <TouchableHighlight
      underlayColor={colors.colorPrimaryDark}
      style={containerStyle}
      onPress={onPress}
    >
      <Text style={styles.label}>{label.toUpperCase()}</Text>
    </TouchableHighlight>
  )
};

styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    backgroundColor: colors.colorPrimary,
    height: 100,
  },
  label: {
    fontSize: 20,
    color: colors.white,
  }
});

export default Button;
