import { createSlice } from '@reduxjs/toolkit';

export const loadState = (state) => {
  try {
    const serializedState = localStorage.getItem(state);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
const getInitialState = () => {
  if (loadState('state')) {
    return loadState('state');
  } else {
    return [];
  }
};

const cardSlice = createSlice({
  name: 'card',
  initialState: getInitialState(),
  reducers: {
    addToCard: (state, action) => {
     state.push({...action.payload});
    },
    removeFromCard: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
      console.log(action);
    },
    editCard: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state.splice(index, 1, {title: action.payload.title, discription: action.payload.discription, id: action.payload.id});
    }
  },
});

export const cardReducer = cardSlice.reducer;

export const {
  addToCard,
  removeFromCard,
  editCard
} = cardSlice.actions;
