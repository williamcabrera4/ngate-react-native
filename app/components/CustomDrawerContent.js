import React from 'react';
import { Text, ScrollView, StyleSheet, View, Image, TouchableHighlight, Modal } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import SortableListView from 'react-native-sortable-listview';
import NGateModal from './NGateModal';
import { colors } from '../constants/constants';
import appIcon from '../images/bigIcon.png';
import addIcon from '../images/add.png';
import reorderIcon from '../images/reorder_black.png';
import editIcon from '../images/edit.png';
import removeIcon from '../images/remove.png';
import ModalDoorRow from './ModalDoorRow';

class CustomDrawerContent extends React.PureComponent {

  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.onModalCancelOption = this.onModalCancelOption.bind(this);
    this.onModalAcceptOption = this.onModalAcceptOption.bind(this);
    this.editDoor = this.editDoor.bind(this);
    this.deleteDoor = this.deleteDoor.bind(this);

    this.state = {
      modal: {
        showModal: false,
        onPress: null,
        onAccept: null,
        sortMode: false
      }
    };
  }

  showModal({ sortMode, onPress } = {}) {
    this.setState({
      modal: {
        showModal: true,
        sortMode,
        onPress,
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
    this.onModalCancelOption();
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
    const editDoorParameter = {
      sortMode: false,
      onPress: this.editDoor,
    };
    const deleteDoorParameter = {
      sortMode: false,
      onPress: this.deleteDoor,
    };
    return (
      <View style={styles.doorControlContainer}>
        <Text style={styles.menuTitle}>Control de Puertas</Text>
        {this.renderItem(addIcon, 'Agregar Puerta', () => this.props.navigation.navigate('DoorConfig'))}
        {this.renderItem(reorderIcon, 'Ordenar Puertas', () => this.showModal())}
        {this.renderItem(editIcon, 'Modificar Puerta', () => this.showModal(editDoorParameter))}
        {this.renderItem(removeIcon, 'Eliminar Puerta', () => this.showModal(deleteDoorParameter))}
      </View>
    );
  }

  createModal() {
    const { doors } = this.props;
    const { showModal, onPress, sortMode } = this.state.modal;

    if (!doors.length) {
      return;
    }

    return (
      <NGateModal
        modalVisible={showModal}
        onAccept={this.onModalCancelOption}
        onCancel={this.onModalAcceptOption}
        onRequestClose={this.onModalCancelOption}
      >
        <SortableListView
          disableSorting={sortMode}
          disableAnimatedScrolling={true}
          moveOnPressIn={!sortMode}
          style={{ flex: 1 }}
          data={doors}
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
