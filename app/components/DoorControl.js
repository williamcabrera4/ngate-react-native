import React from 'react';
import { StyleSheet, TouchableHighlight, Text, Animated, Easing, Image } from 'react-native';
import Button from './Button';
import ScreenWrapper from './ScreenWrapper';
import { sendDeviceAction } from '../services/NGateAPI';
import { colors, operations } from '../constants/constants';
import cogImage from '../images/cog.png';
import shareButtonImage from '../images/shareButton.png';


let styles = {};

class DoorControl extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0),
    };

    this.openDoorAction = this.openDoorAction.bind(this);
    this.openShareScreen = this.openShareScreen.bind(this);
  }

  openShareScreen() {
    const { uuid } = this.props;
    this.props.navigation.navigate('ShareScreen', { uuid });
  }

  openDoorAction() {
    const { uuid } = this.props;
    sendDeviceAction(uuid, { status: operations.OPEN_CLOSE });
    Animated.timing(
      this.state.spinValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start(() => this.setState({ spinValue: new Animated.Value(0) }));
  }

  render() {
    const { doorName } = this.props;
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const cogStyle = StyleSheet.flatten([styles.cogImage, { transform: [{ rotate: spin }] }]);

    return (
      <ScreenWrapper>
        <Text style={styles.doorName}>{doorName}</Text>
        <Animated.Image
          style={cogStyle}
          resizeMode="contain"
          source={cogImage}
        />
        <Button
          onPress={this.openDoorAction}
          style={styles.actionButton}
          label="Activar"
        />
        <TouchableHighlight
          style={styles.shareButton}
          onPress={this.openShareScreen}
        >
          <Image
            style={styles.shareButtonImage}
            source={shareButtonImage}
          />
        </TouchableHighlight>
      </ScreenWrapper>
    );
  }
}

styles = StyleSheet.create({
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
    marginTop: '25%',
  },
  shareButton: {
    alignSelf: 'flex-end',
    marginRight: 50,
    marginTop: 30,
  },
  shareButtonImage: {
    height: 50,
    width: 50,
  }
});

export default DoorControl;
