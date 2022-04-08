import { configureStore } from '@reduxjs/toolkit';
import { cardReducer } from './card.slice';

const reducer = {
  card: cardReducer,
};

const store = configureStore({
  reducer,
});

export default store;

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    return undefined;
  }
};
