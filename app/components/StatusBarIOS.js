import React from 'react';
import { StyleSheet, View, StatusBar, Text, Image, TouchableHighlight } from 'react-native';
import { colors } from '../constants/constants';
import { withNavigation } from 'react-navigation';

let styles = {};

class StatusBarIOS extends React.PureComponent {

  render() {
    const { backButton, navigation } = this.props;
    const image = backButton ? require('../images/back.png') : require('../images/menu.png');
    const onPress = backButton ? () => navigation.goBack() : () => navigation.navigate('DrawerOpen');
    return (
      <View>
        <StatusBar barStyle="light-content"/>
        <View style={styles.statusBar}/>
        <View style={styles.appBar}>
          <TouchableHighlight
            underlayColor={colors.colorPrimary}
            onPress={onPress}
          >
            <View style={styles.backIconContainer}>
              <Image
                style={styles.backIcon}
                source={image}
              />
            </View>
          </TouchableHighlight>
          <Text style={styles.appBarTitle}>NGate</Text>
          <View style={styles.filler}/>
        </View>
      </View>
    );
  }
}


styles = StyleSheet.create({
  statusBar: {
    height: 20,
    backgroundColor: colors.colorPrimary,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.colorPrimary,
    height: 44,
  },
  appBarTitle: {
    fontSize: 22,
    color: colors.white,
  },
  backIcon: {
    height: 20,
    width: 20,
    marginLeft: 20,
  },
  backIconContainer: {
    flex: 1,
    width: 70,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  filler: {
    width: 70,
  }
});

export default withNavigation(StatusBarIOS);
