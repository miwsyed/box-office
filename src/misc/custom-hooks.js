import { useReducer, useEffect } from 'react';

function showsReducer(prevState, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevState, action.showId];
    }

    case 'REMOVE': {
      //filter our current state

      return prevState.filter(showId => showId !== action.showId);
    }

    default:
      return prevState;
  }
}

function usePersistentReducers(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    //to read from local storage
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  //to synchronise our state whenever we update it with local storage

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]); //this achieves synchronizatoin with local storage

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistentReducers(showsReducer, [], key);
}
