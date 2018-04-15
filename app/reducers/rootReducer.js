import { combineReducers } from 'redux';
import doors from './doors';
import navigation from './navigation';

export default combineReducers({
  doors,
  navigation,
});
