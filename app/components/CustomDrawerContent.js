import React from 'react';
import { Text, ScrollView, StyleSheet, View, Image, TouchableHighlight, Share } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import SortableListView from 'react-native-sortable-listview';
import NGateModal from './NGateModal';
import { colors } from '../constants/constants';
import appIcon from '../images/bigIcon.png';
import addIcon from '../images/add.png';
import reorderIcon from '../images/reorder_black.png';
import editIcon from '../images/edit.png';
import removeIcon from '../images/remove.png';
import shareIcon from '../images/share.png';
import ModalDoorRow from './ModalDoorRow';
import { updateScreen } from '../actions/navigationActionCreators';

class CustomDrawerContent extends React.PureComponent {

  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.onModalCancelOption = this.onModalCancelOption.bind(this);
    this.onModalAcceptOption = this.onModalAcceptOption.bind(this);
    this.editDoor = this.editDoor.bind(this);
    this.deleteDoor = this.deleteDoor.bind(this);
    this.reorderDoor = this.reorderDoor.bind(this);
    this.shareApp = this.shareApp.bind(this);

    this.state = {
      modal: {
        title: '',
        showModal: false,
        onPress: null,
        onAccept: null,
        sortMode: false,
        acceptText: null,
      }
    };
  }

  showModal({ title, sortMode, onPress, onAccept, acceptText } = {}) {
    this.setState({
      modal: {
        title,
        showModal: true,
        sortMode,
        onPress,
        onAccept,
        acceptText,
      }
    });
    this.props.navigation.navigate('DrawerClose');
  }

  onModalCancelOption() {
    this.setState({ modal: { showModal: false } });
  }

  onModalAcceptOption() {
    this.setState({ modal: { showModal: false } });
  }

  editDoor(door) {
    this.props.navigation.navigate('DoorConfig', door);
    this.onModalCancelOption();
  }

  deleteDoor(door) {
    const { deleteDoor } = this.props;
    deleteDoor(door.uuid);
    updateScreen();
    this.onModalCancelOption();
  }

  reorderDoor() {
    const { doors, reorderDoors, updateScreen } = this.props;
    reorderDoors(doors);
    updateScreen();
    this.onModalCancelOption();
  }

  shareApp() {
    Share.share({
      message: 'Control remoto de tu portón eléctrico desde tu celular con el NGate',
      url: 'http://www.google.com',
      title: 'NGate',
    });
  }

  renderItem(icon, text, onPress) {
    return (
      <TouchableHighlight
        underlayColor="#eee"
        onPress={onPress}
      >
        <View style={styles.menuItem}>
          <Image
            source={icon}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.menuItemLink}>{text}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderTopContainer() {
    return (
      <View style={styles.topContainer}>
        <Image
          source={appIcon}
          style={styles.appIcon}
          resizeMode="contain"
        />
        <Text style={styles.nGateLabel}>NGate</Text>
        <Text style={styles.nGateDescription}>Sistema de control de portón eléctrico</Text>
      </View>
    );
  }

  renderDoorControlSection() {
    const reorderDoorParameter = {
      title: 'Ordenar puertas',
      sortMode: true,
      acceptText: 'Aceptar',
      onAccept: this.reorderDoor,
    };
    const editDoorParameter = {
      title: 'Editar puerta',
      sortMode: false,
      onPress: this.editDoor,
    };
    const deleteDoorParameter = {
      title: 'Eliminar puerta',
      sortMode: false,
      onPress: this.deleteDoor,
    };
    return (
      <View style={styles.doorControlContainer}>
        <Text style={styles.menuTitle}>Control de Puertas</Text>
        {this.renderItem(addIcon, 'Agregar Puerta', () => this.props.navigation.navigate('DoorConfig', null))}
        {this.renderItem(reorderIcon, 'Ordenar Puertas', () => this.showModal(reorderDoorParameter))}
        {this.renderItem(editIcon, 'Modificar Puerta', () => this.showModal(editDoorParameter))}
        {this.renderItem(removeIcon, 'Eliminar Puerta', () => this.showModal(deleteDoorParameter))}
      </View>
    );
  }

  renderShareSection() {
    return (
      <View style={styles.doorControlContainer}>
        <Text style={styles.menuTitle}>Social y Ayuda</Text>
        {this.renderItem(shareIcon, 'Compartir', this.shareApp)}
      </View>
    );
  }

  createModal() {
    const { doors } = this.props;
    const { title, showModal, onPress, sortMode, onAccept, acceptText } = this.state.modal;

    if (!doors.length) {
      return;
    }

    return (
      <NGateModal
        title={title}
        modalVisible={showModal}
        onAccept={onAccept}
        acceptText={acceptText}
        onCancel={this.onModalCancelOption}
        onRequestClose={this.onModalCancelOption}
      >
        <SortableListView
          disableSorting={!sortMode}
          disableAnimatedScrolling={true}
          moveOnPressIn={sortMode}
          style={{ flex: 1 }}
          data={doors}
          onRowMoved={e => {
            doors.splice(e.to, 0, doors.splice(e.from, 1)[0]);
            this.forceUpdate();
          }}
          renderRow={(door) =>
            <ModalDoorRow
              door={door}
              onPress={onPress}
            />
          }
        />
      </NGateModal>
    );
  }

  render() {
    return (
      <ScrollView bounces={false}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={{ flex: 1 }}>
            {this.renderTopContainer()}
            {this.renderDoorControlSection()}
            {this.renderShareSection()}
            {this.createModal()}
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorPrimary
  },
  topContainer: {
    flex: 1,
    backgroundColor: colors.colorPrimary,
  },
  doorControlContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  appIcon: {
    marginLeft: 10,
    marginTop: 10,
    height: 50,
    width: 50,
  },
  nGateLabel: {
    fontSize: 15,
    paddingLeft: 15,
    marginTop: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  nGateDescription: {
    fontSize: 14,
    paddingLeft: 15,
    paddingTop: 2,
    paddingBottom: 10,
    color: '#fff',
  },
  menuTitle: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#888',
  },
  menuItem: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 20,
  },
  icon: {
    width: 25,
    height: 25,
    opacity: 0.7,
  },
  menuItemLink: {
    marginTop: 2,
    fontSize: 15,
    marginLeft: 15,
  }
});

export default CustomDrawerContent;
