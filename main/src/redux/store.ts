import { configureStore } from '@reduxjs/toolkit';
import type { Reducer } from '@reduxjs/toolkit';

type RootReducer = {
  [key: string]: Reducer;
};

const createRootReducer = (asyncReducers: RootReducer = {}) => {
  return {
    ...asyncReducers,
  };
};

let reducerManager: ReturnType<typeof createReducerManager>;

function createReducerManager(initialReducers: RootReducer = {}) {
  let asyncReducers = { ...initialReducers };

  return {
    getReducerMap: () => asyncReducers,
    reduce: (state: any, action: any) => {
      const reducers = createRootReducer(asyncReducers);

      const combinedReducer = (state: any, action: any) => {
        const keys = Object.keys(reducers);
        if (keys.length === 0) return state || {};
        
        const nextState: any = {};
        for (const key of keys) {
          nextState[key] = reducers[key](state?.[key], action);
        }
        return nextState;
      };
      return combinedReducer(state, action);
    },
    add: (key: string, reducer: Reducer) => {
      if (asyncReducers[key]) {
        return;
      }
      asyncReducers[key] = reducer;
    },
    remove: (key: string) => {
      delete asyncReducers[key];
    },
  };
}


reducerManager = createReducerManager();


export const store = configureStore({
  reducer: (state, action) => {
    return reducerManager.reduce(state, action);
  },
  preloadedState: {},
});

export const injectReducer = (key: string, reducer: Reducer) => {
  reducerManager.add(key, reducer);

  console.log(`Reducer '${key}' injected into store`);
};


export const getReducerMap = () => {
  return reducerManager.getReducerMap();
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

