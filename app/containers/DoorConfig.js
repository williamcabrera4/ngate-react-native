import fp from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DoorConfig from '../components/DoorConfig';
import { editDoor, saveDoor } from '../actions/doorActionCreators';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch, ownProps) {
  const editMode = fp.get('navigation.state.params.editMode')(ownProps) || false;
  const saveDoorCallback = editMode ? editDoor : saveDoor;
  return bindActionCreators({
      saveDoor: saveDoorCallback,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DoorConfig);
