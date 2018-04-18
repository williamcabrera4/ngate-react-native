import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';

class Proxy extends React.PureComponent {

  componentDidMount() {
    this.props.navigation.navigate('DoorViewPager');
  }

  render() {
    return (
      <View/>
    );
  }
}

export default withNavigation(Proxy);
