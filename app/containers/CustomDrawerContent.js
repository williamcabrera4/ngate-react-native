import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { deleteDoor, reorderDoors } from '../actions/doorActionCreators';
import { updateScreen } from '../actions/navigationActionCreators';

function mapStateToProps(state) {
  return {
    doors: state.doors.doors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      deleteDoor,
      reorderDoors,
      updateScreen,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent);
