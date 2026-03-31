import type { Reducer } from '@reduxjs/toolkit';
import { injectReducer as storeInjectReducer } from './store';


export class StoreRegistry {
  private registeredReducers: Map<string, Reducer> = new Map();
  private injectReducer = storeInjectReducer;

  
  registerModule(namespace: string, reducer: Reducer) {
    if (this.registeredReducers.has(namespace)) {
      console.warn(
        `Module '${namespace}' is already registered. Skipping registration.`
      );
      return;
    }

    this.registeredReducers.set(namespace, reducer);
    this.injectReducer(namespace, reducer);
    console.log(`Module '${namespace}' registered successfully`);
  }

  
  registerSlices(
    namespace: string,
    slices: { [key: string]: Reducer }
  ) {

    const combinedReducer = (state: any = {}, action: any) => {
      const nextState = { ...state };
      for (const [key, reducer] of Object.entries(slices)) {
        nextState[key] = reducer(state[key], action);
      }
      return nextState;
    };

    this.registerModule(namespace, combinedReducer);
  }

  
  getRegisteredModules() {
    return Array.from(this.registeredReducers.keys());
  }


  
  isModuleRegistered(namespace: string): boolean {
    return this.registeredReducers.has(namespace);
  }
}

export const storeRegistry = new StoreRegistry();
