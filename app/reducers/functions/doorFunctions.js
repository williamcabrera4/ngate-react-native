const saveDoor = (state, action) => {
  return { ...state, doors: [...state.doors, action.door] };
};

const deleteDoor = (state, action) => {
  const doors = state.doors.filter(({ uuid }) => uuid !== action.doorUuid);
  return { ...state, doors };
};

const editDoor = (state, action) => {
  const doors = state.doors.map((door) => door.uuid === action.door.uuid ? action.door : door);
  return { ...state, doors };
};

const reorderDoor = (state, action) => {
  return { ...state, doors: action.doors };
};

export default {
  saveDoor,
  deleteDoor,
  editDoor,
  reorderDoor,
};
