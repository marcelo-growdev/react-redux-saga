import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'aplication_name',
      storage,
      whitelist: ['person'],
    },
    reducers
  );

  return persistedReducer;
};
