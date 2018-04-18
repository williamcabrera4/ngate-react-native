import fp from 'lodash/fp';
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import StatusBarIOS from './StatusBarIOS';
import ActivityModal from './ActivityModal';
import ScreenWrapper from './ScreenWrapper';
import Button from './Button';
import { colors } from '../constants/constants';
import { getDeviceState } from '../services/NGateAPI';

let styles = {};

class DoorConfig extends React.PureComponent {

  constructor(props) {
    super(props);

    this.addDoor = this.addDoor.bind(this);
    this.cancelAction = this.cancelAction.bind(this);
    this.scanQrCode = this.scanQrCode.bind(this);

    this.state = {
      doorName: '',
      uuid: '',
      showActivityModal: false,
    };
  }

  componentDidMount() {
    // Read default value
    const door = fp.get('props.navigation.state.params')(this) || {};
    this.setState({
      doorName: door.name || '',
      uuid: door.uuid || '',
    });
  }

  validateInputText() {
    const { doorName, uuid } = this.state;
    if (!doorName.length) {
      Alert.alert('NGate', 'Favor de elegir un nombre');
      return false;
    }
    if (!uuid.length) {
      Alert.alert('NGate', 'Favor de colocar un UUID');
      return false;
    }

    return true;
  }

  addDoor() {
    const { doorName, uuid } = this.state;
    const { saveDoor, navigation } = this.props;

    if (!this.validateInputText()) {
      return;
    }

    this.setState({ showActivityModal: true });
    getDeviceState(uuid)
      .then((response) => {
        const door = {
          name: doorName,
          uuid,
          deviceType: response.deviceType,
          deviceServerId: response.id,
        };
        saveDoor(door);
        this.setState({ showActivityModal: false }, () => navigation.navigate('DoorViewPager'));
      })
      .catch((error) => {
        this.setState({ showActivityModal: false }, () => {
          setTimeout(() => Alert.alert('Error', 'UUID no se ha podido encontrar en el servidor'), 1200);
        });
      });
  }

  cancelAction() {
    this.props.navigation.navigate('DoorViewPager');
  }

  scanQrCode() {
    const { doorName } = this.state;
    this.props.navigation.navigate('ScanQrScreen', { name: doorName });
  }

  render() {
    const { showActivityModal } = this.state;

    return (
      <View style={styles.container}>
        <StatusBarIOS backButton={true}/>
        <ActivityModal modalVisible={showActivityModal} title="Guardando"/>
        <ScreenWrapper>
          <View style={styles.separator}/>
          <Hoshi
            label="Nombre del portón"
            style={styles.doorNameInput}
            borderColor={colors.colorPrimary}
            onChangeText={(doorName) => this.setState({ doorName })}
            value={this.state.doorName}
          />
          <View style={styles.separator}/>
          <Hoshi
            label="UUID"
            style={styles.doorNameInput}
            borderColor={colors.colorPrimary}
            onChangeText={(uuid) => this.setState({ uuid })}
            value={this.state.uuid}
          />
          <View style={styles.separator}/>
          <Button
            onPress={this.scanQrCode}
            style={styles.scanQrButton}
            labelStyle={styles.actionButtonLabel}
            label="Escanear código QR"
          />
          <View style={styles.fill}/>
          <View style={styles.actionButtonContainer} removeClippedSubviews={true}>
            <Button
              onPress={this.cancelAction}
              style={styles.actionButton}
              labelStyle={styles.actionButtonLabel}
              label="Cancelar"
            />
            <Button
              onPress={this.addDoor}
              style={styles.actionButton}
              labelStyle={styles.actionButtonLabel}
              label="Guargar Portón"
            />
          </View>
        </ScreenWrapper>
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.subContainerBackgroundColor,
  },
  viewPagerStyle: {
    flex: 1,
  },
  doorNameInput: {
    alignSelf: 'stretch',
  },
  separator: {
    marginTop: 20,
  },
  uuidInput: {
    alignSelf: 'stretch',
  },
  fill: {
    flex: 1,
  },
  actionButtonContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
  },
  actionButton: {
    height: 50,
    flex: 1,
    margin: 10,
  },
  actionButtonLabel: {
    fontSize: 15,
  },
  scanQrButton: {
    height: 50,
    width: '90%',
  },
});

export default DoorConfig;
