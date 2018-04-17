import fp from 'lodash/fp';
import React from 'react';
import { StyleSheet, View, Text, Clipboard, Share } from 'react-native';
import QRCode from 'react-native-qrcode';
import StatusBarIOS from './StatusBarIOS';
import ScreenWrapper from './ScreenWrapper';
import Button from './Button';
import { colors } from '../constants/constants';

let styles = {};

class ShareScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.saveOnClipBoard = this.saveOnClipBoard.bind(this);
    this.shareUuid = this.shareUuid.bind(this);
  }

  saveOnClipBoard() {
    const uuid = fp.get('props.navigation.state.params.uuid')(this) || '';
    Clipboard.setString(uuid);
  }

  shareUuid() {
    const uuid = fp.get('props.navigation.state.params.uuid')(this) || '';
    Share.share({
      message: uuid,
      title: 'NGate',
    });
  }

  render() {
    const uuid = fp.get('props.navigation.state.params.uuid')(this) || '';
    return (
      <View style={styles.container}>
        <StatusBarIOS backButton={true}/>
        <ScreenWrapper>
          <Button
            style={styles.buttonStyle}
            labelStyle={styles.buttonLabelStyle}
            label="Copiar UUID al portapapeles"
            onPress={this.saveOnClipBoard}
          />
          <Button
            style={styles.buttonStyle}
            labelStyle={styles.buttonLabelStyle}
            label="Compartir"
            onPress={this.shareUuid}
          />
          <Text style={styles.text}>Código QR</Text>
          <View
            style={styles.qrCode}
          >
            <QRCode
              value={uuid}
              size={250}
              bgColor='#000'
              fgColor='#fff'/>
          </View>
        </ScreenWrapper>
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.subContainerBackgroundColor,
  },
  buttonStyle: {
    width: '85%',
    marginTop: 20,
    height: 40,
  },
  buttonLabelStyle: {
    fontSize: 17,
  },
  text: {
    marginLeft: 30,
    alignSelf: 'flex-start',
    marginTop: 40,
    fontSize: 17,
    color: '#666'
  },
  qrCode: {
    marginTop: 20,
  },
});

export default ShareScreen;
