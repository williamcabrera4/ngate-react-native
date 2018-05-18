export const SAVE_DOOR = 'SAVE_DOOR';
export const saveDoor = (door) => ({
  type: SAVE_DOOR,
  door
});

export const EDIT_DOOR = 'EDIT_DOOR';
export const editDoor = (door) => ({
  type: EDIT_DOOR,
  door
});

export const DELETE_DOOR = 'DELETE_DOOR';
export const deleteDoor = (doorUuid) => ({
  type: DELETE_DOOR,
  doorUuid
});


export const REORDER_DOORS = 'REORDER_DOORS';
export const reorderDoors = (doors) => ({
  type: REORDER_DOORS,
  doors
});
