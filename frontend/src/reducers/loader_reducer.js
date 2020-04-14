export function loader(state = false, action) {
  if (action.type.includes("_REQUEST")){
    return true;
  }
  if (action.type.includes("_SUCCESS")){
    return false;
  }
  if (action.type.includes("_ERROR")){
    return false;
  }

  return state;
}