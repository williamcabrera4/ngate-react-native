import React from 'react';
import { StyleSheet, Modal, View, Text } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import { colors } from '../constants/constants';


let styles = {};

class ActivityModal extends React.PureComponent {

  render() {
    const {
      title,
      modalVisible,
    } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.root}>
          <View style={styles.backgroundWrapper}/>
          <View style={styles.modalRoot}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.childrenContainer}>
                <BarIndicator size={40} color={colors.colorPrimary} count={7}/>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

}

styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backgroundWrapper: {
    height: '100%',
    backgroundColor: '#444',
    opacity: 0.8,
  },
  modalRoot: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    maxHeight: 140,
    opacity: 1,
    padding: 20,
    borderRadius: 5,
    width: 200,
    backgroundColor: 'white',
  },
  childrenContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ActivityModal;
