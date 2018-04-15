import React from 'react';
import { StyleSheet, Modal, View, Text } from 'react-native';
import Button from './Button';


let styles = {};

class NGateModal extends React.PureComponent {

  render() {
    const {
      title,
      cancelText,
      acceptText,
      modalVisible,
      onRequestClose,
      children,
      onCancel,
      onAccept,
    } = this.props;

    const cancelTextRequired = cancelText || 'Cancelar';

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}
      >
        <View style={styles.root}>
          <View style={styles.backgroundWrapper}/>
          <View style={styles.modalRoot}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.childrenContainer}>
                {children}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={onCancel}
                  label={cancelTextRequired}
                  style={styles.buttonStyle}
                  labelStyle={styles.buttonLabelStyle}
                  underlayColor="transparent"
                />
                {acceptText && (
                  <Button
                    label={acceptText}
                    onPress={onAccept}
                    style={styles.acceptButtonStyle}
                    labelStyle={styles.buttonLabelStyle}
                    underlayColor="transparent"
                  />
                )}
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
    maxHeight: 300,
    opacity: 1,
    padding: 20,
    borderRadius: 5,
    width: 300,
    backgroundColor: 'white',
  },
  childrenContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    right: 0,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  buttonStyle: {
    width: 'auto',
    backgroundColor: 'transparent',
    height: 30,
  },
  buttonLabelStyle: {
    fontSize: 16,
    color: '#005f75',
  },
  acceptButtonStyle: {
    width: 'auto',
    backgroundColor: 'transparent',
    height: 30,
    marginLeft: 25,
  }
});

export default NGateModal;
