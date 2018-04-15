import React from 'react';
import { ViewPager } from 'rn-viewpager';
import { StyleSheet, View } from 'react-native';
import DoorControl from './DoorControl';
import EmptyScreen from './EmptyScreen';
import StatusBarIOS from './StatusBarIOS';
import { colors } from '../constants/constants';

let styles = {};

class DoorViewPager extends React.PureComponent {

  static navigationOptions = {
    drawerLabel: 'Home',
  };

  componentDidMount() {
    this.props.navigation.navigate('DrawerOpen'); // open drawer
  }

  renderDoor(door) {
    return (
      <View key={door.uuid}>
        <DoorControl doorName={door.name}/>
      </View>
    );
  }

  renderViewPagerItems() {
    const { doors, navigation } = this.props;

    if (!doors.length) {
      return (
        <View key={'emptyDoor'}>
          <EmptyScreen navigation={navigation} />
        </View>
      );
    }

    return doors.map((door) => this.renderDoor(door));
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBarIOS/>
        <ViewPager style={styles.viewPagerStyle}>
          {this.renderViewPagerItems()}
        </ViewPager>
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
});

export default DoorViewPager;
