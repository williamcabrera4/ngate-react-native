import React from 'react';
import { ViewPager } from 'rn-viewpager';
import { StyleSheet, View } from 'react-native';
import DoorControl from './DoorControl';
import EmptyScreen from './EmptyScreen';
import StatusBarIOS from './StatusBarIOS';
import { colors } from '../constants/constants';

let styles = {};

class DoorViewPager extends React.PureComponent {

  renderDoor(door) {
    const { navigation } = this.props;

    return (
      <View key={door.uuid}>
        <DoorControl uuid={door.uuid} doorName={door.name} navigation={navigation}/>
      </View>
    );
  }

  renderViewPagerItems() {
    const { doors, navigation } = this.props;

    if (!doors.length) {
      return (
        <View key={'emptyDoor'}>
          <EmptyScreen navigation={navigation}/>
        </View>
      );
    }

    return doors.map((door) => this.renderDoor(door));
  }

  render() {
    console.log('render ' + new Date().toTimeString());
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
