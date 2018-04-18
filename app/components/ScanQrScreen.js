import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { colors } from '../constants/constants';
import { withNavigation } from 'react-navigation';
import fp from 'lodash/fp';

class ScanQrScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onRead = this.onRead.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onRead(e) {
    const name = fp.get('props.navigation.state.params.name')(this) || '';
    const door = {
      uuid: e.data,
      name,
    };
    this.props.navigation.navigate('DoorConfig', door);
  }

  onCancel() {
    const name = fp.get('props.navigation.state.params.name')(this) || '';
    const door = {
      name,
    };
    this.props.navigation.navigate('DoorConfig', door);
  }

  render() {
    const data = fp.get('props.navigation.state.params')(this) || '';
    return (
      <QRCodeScanner
        onRead={this.onRead}
        topContent={
          <Text style={styles.centerText}>
            Escanear código QR {JSON.stringify(data)}
          </Text>
        }
        bottomContent={
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={this.onCancel}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 23,
    color: colors.colorPrimary,
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default withNavigation(ScanQrScreen);
