import { connect } from 'react-redux';
import DoorViewPager from '../components/DoorViewPager';

function mapStateToProps(state) {
  return {
    doors: state.doors.doors
  };
}

export default connect(mapStateToProps)(DoorViewPager);