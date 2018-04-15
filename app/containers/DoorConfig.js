import fp from 'lodash/fp';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DoorConfig from '../components/DoorConfig';
import { editDoor, saveDoor } from '../actions/doorActionCreators';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch, ownProps) {
  const saveDoorCallback = fp.isEmpty(ownProps.navigation.state.params) ? saveDoor : editDoor;
  return bindActionCreators({
      saveDoor: saveDoorCallback,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DoorConfig);
