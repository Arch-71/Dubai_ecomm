/* Core */
import { configureStore } from '@reduxjs/toolkit';
import { useSelector as useReduxSelector, useDispatch as useReduxDispatch } from 'react-redux';
import { persistStore } from 'redux-persist';

/* Instruments */
import rootReducer from './rootReducer';
import { middleware } from './middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

export const persistor = persistStore(store);
export const useDispatch = () => useReduxDispatch();
export const useSelector = useReduxSelector;
