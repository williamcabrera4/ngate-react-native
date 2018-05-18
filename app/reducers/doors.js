import { SAVE_DOOR, EDIT_DOOR, DELETE_DOOR, REORDER_DOORS } from '../actions/doorActionCreators';
import doorFunctions from './functions/doorFunctions';


const defaultState = {
  doors: []
};

export default function doors(state = defaultState, action) {
  switch (action.type) {
    case SAVE_DOOR:
      return doorFunctions.saveDoor(state, action);
    case DELETE_DOOR:
      return doorFunctions.deleteDoor(state, action);
    case EDIT_DOOR:
      return doorFunctions.editDoor(state, action);
    case REORDER_DOORS:
      return doorFunctions.reorderDoor(state, action);

    default:
      return state;
  }
}
