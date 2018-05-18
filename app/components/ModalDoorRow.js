import React from 'react';
import { StyleSheet, Modal, View, Text, TouchableHighlight } from 'react-native';


let styles = {};

class ModalDoorRow extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onRowPress = this.onRowPress.bind(this);
  }

  onRowPress() {
    const { onPress, door } = this.props;
    if (typeof onPress === 'function') {
      onPress(door);
    }
  }

  render() {
    const { door, onPress } = this.props;
    return (
      <TouchableHighlight
        underlayColor="transparent"
        style={styles.row}
        onPress={this.onRowPress}
        {...this.props.sortHandlers}
      >
        <Text style={styles.text}>
          {door.name}
        </Text>
      </TouchableHighlight>
    );
  }
}

styles = StyleSheet.create({
  row: {
    flex: 1,
    height: 30,
    padding: 25,
  },
  text: {
    fontSize: 16,
  },
});

export default ModalDoorRow;
