import React from 'react';
import { StyleSheet, View, Text, Image, Animated, Easing } from 'react-native';
import StatusBarIOS from './StatusBarIOS';
import Button from './Button';
import { sendDeviceAction } from '../services/NGateAPI';
import { colors, config } from '../constants/constants';
import cogImage from '../images/cog.png';


let styles = {};

class DoorControl extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0)
    }
  }

  openDoorAction() {
    sendDeviceAction(config.deviceUUID, { status: 'open' });
    Animated.timing(
      this.state.spinValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => this.setState({ spinValue: new Animated.Value(0) }));
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    const cogStyle = StyleSheet.flatten([styles.cogImage, { transform: [{ rotate: spin }] }]);

    return (
      <View style={styles.container}>
        <StatusBarIOS/>
        <View style={styles.subContainer}>
          <View style={styles.gridItem}>
            <Text style={styles.doorName}>Home {config.nGateHost}</Text>

            <Animated.Image
              style={cogStyle}
              resizeMode="contain"
              source={cogImage}
            />
            <Button
              onPress={() => this.openDoorAction()}
              style={styles.actionButton}
              label="Activar"
            />
          </View>
        </View>
      </View>
    );
  }
}

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
  doorName: {
    marginTop: 15,
    color: colors.gridItemStroke,
    fontWeight: 'bold',
    fontSize: 26,
  },
  cogImage: {
    marginTop: 40,
    height: '30%',
    width: '50%',
  },
  actionButton: {
    marginTop: '40%',
  }
});

export default DoorControl;