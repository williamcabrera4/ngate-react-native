import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { colors } from '../constants/constants';

let styles = {};

const Button = ({ label, style, onPress, labelStyle, underlayColor }) => {
  const containerStyle = StyleSheet.flatten([styles.container, style]);
  const textStyle = StyleSheet.flatten([styles.label, labelStyle]);
  const underlayColorWithDefault = underlayColor || colors.colorPrimaryDark;
  return (
    <TouchableHighlight
      underlayColor={underlayColorWithDefault}
      style={containerStyle}
      onPress={onPress}
    >
      <Text style={textStyle}>{label.toUpperCase()}</Text>
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
    overflow: 'hidden',
  },
  label: {
    fontSize: 20,
    color: colors.white,
  },
});

export default Button;
