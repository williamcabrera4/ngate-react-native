import { UPDATE_SCREEN } from '../actions/navigationActionCreators';

const defaultState = {
  date: new Date().getMilliseconds(),
};

export default function navigation(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_SCREEN:
      return { date: new Date().getMilliseconds() };

    default:
      return state;
  }
}
