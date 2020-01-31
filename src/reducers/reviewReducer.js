import initialState from "./initialState";

let blankReview = {
    product: '',
    review: '',
    style: 0,
    fit: 0,
    overall: 0,

};
const review = (state = initialState, action ) => {
  if(action.type === 'ADD_NAME'){
    return {
        ...state,
        name: action.payload
    };
  } else if(action.type === 'CHOOSE_PRODUCT'){
    return {
        ...state,
        product: action.payload,
    };
  } else if(action.type === 'ADD_REVIEW'){
      return {
          ...state,
          product: action.payload
      };
  } else if (action.type === 'FIT_RATING') {
      return {
          ...state,
          fit: action.payload,
      }
  } else if (action.type === 'STYLE_RATING'){
    return {
          ...state,
          style: action.payload,
      }
  } else if (action.type === 'OVERALL_RATING'){
      return {
          ...state,
          overall: action.payload,
      }
  } else if (action.type === 'CLEAR_RATING'){
      return blankFeedback;
  } else {
      return state;
  }
}
const home = (state = true, action) => {
  if (action.type === 'NAV_TO_REVIEW'){
      return false;
  } else {
      return state;
  }
}
export default combineReducers({
  review,
  home
});