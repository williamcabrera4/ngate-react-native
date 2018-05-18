import React from 'react';
import { StyleSheet, TouchableHighlight, Text, Animated, Easing, Image, View, Alert } from 'react-native';
import Button from './Button';
import ScreenWrapper from './ScreenWrapper';
import ActivityModal from './ActivityModal';
import { sendDeviceAction } from '../services/NGateAPI';
import { colors, operations } from '../constants/constants';
import cogImage from '../images/cog.png';
import leftImage from '../images/left_limit.png';
import rightImage from '../images/right_limit.png';
import shareButtonImage from '../images/shareButton.png';


let styles = {};

class DoorControl extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0),
      showActivityModal: false,
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
    this.setState({ showActivityModal: true });
    sendDeviceAction(uuid, { status: operations.OPEN_CLOSE })
      .then((response) => {
        this.setState({ showActivityModal: false });

        if (response.error) {
          this.setState({ showActivityModal: false }, () => {
            setTimeout(() => Alert.alert('Error', response.error), 1200);
          });
        }

      })
      .catch(() => {
        this.setState({ showActivityModal: false }, () => {
          setTimeout(() => Alert.alert('Error', 'Error al conectarse servidor, favor intentar de nuevo'), 1200);
        });
      });

    // TODO: add later
    // Animated.timing(
    //   this.state.spinValue,
    //   {
    //     toValue: .6,
    //     duration: 1000,
    //     easing: Easing.linear,
    //     useNativeDriver: true,
    //   }
    // ).start(() => this.setState({ spinValue: new Animated.Value(0) }));
  }

  render() {
    const { doorName } = this.props;
    const { spinValue, showActivityModal } = this.state;
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const cogStyle = StyleSheet.flatten([styles.cogImage, { transform: [{ rotate: spin }] }]);

    return (
      <View style={styles.root}>
        <ActivityModal modalVisible={showActivityModal} title="Procesando"/>
        <ScreenWrapper>
          <Text style={styles.doorName}>{doorName}</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.leftTriangle}
              source={leftImage}
            />
            <Animated.Image
              style={cogStyle}
              resizeMode="contain"
              source={cogImage}
            />
            <Image
              style={styles.rightTriangle}
              source={rightImage}
            />
          </View>
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
      </View>
    );
  }
}

styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  doorName: {
    marginTop: 15,
    color: colors.gridItemStroke,
    fontWeight: 'bold',
    fontSize: 26,
  },
  cogImage: {
    marginTop: 40,
    height: 160,
    width: 160,
  },
  leftTriangle: {
    marginTop: 40,
    height: 50,
    width: 50,
    opacity: 0.3,
    marginRight: 20,
  },
  rightTriangle: {
    marginTop: 40,
    height: 50,
    width: 50,
    opacity: 0.3,
    marginLeft: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});

export default DoorControl;
