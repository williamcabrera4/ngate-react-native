import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert, Image } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import StatusBarIOS from './StatusBarIOS';
import ScreenWrapper from './ScreenWrapper';
import Button from './Button';
import { colors } from '../constants/constants';
import { getDeviceState } from '../services/NGateAPI';
import bigIcon from '../images/bigIcon.png';

let styles = {};

class EmptyScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.addDoor = this.addDoor.bind(this);
  }

  addDoor() {
    this.props.navigation.navigate('DoorConfig');
  }

  render() {
    return (
      <ScreenWrapper>
        <Image
          style={styles.homeIcon}
          resizeMode="contain"
          source={bigIcon}
        />
        <Text style={styles.message}>
          No hay portones registrados,
          favor de agregar un portón
        </Text>
        <Button
          onPress={this.addDoor}
          style={styles.actionButton}
          labelStyle={styles.actionButtonLabel}
          label="Agregar Portón"
        />
      </ScreenWrapper>
    );
  }
}

styles = StyleSheet.create({
  homeIcon: {
    width: '60%',
    height: '40%',
  },
  message: {
    fontSize: 30,
    color: '#888',
  },
  actionButton: {
    marginTop: 60,
  }
});

export default EmptyScreen;
