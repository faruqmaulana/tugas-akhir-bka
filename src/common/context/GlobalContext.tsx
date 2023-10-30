/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

import {
  ActionReducer,
  type ActionType,
  type GlobalState,
} from "../types/context/GlobalContextType";

// Initial state
const initialState: GlobalState = {
  user: undefined,
  notification: undefined,
  globalFileMeta: [],
  // Initial global state values here
};

// Reducer function
const reducer = (state: GlobalState, action: ActionType): GlobalState => {
  switch (action.type) {
    case ActionReducer.UPDATE_USER:
      return { ...state, user: action.payload };
    case ActionReducer.UPDATE_NOTIFICATION_COUNT:
      return { ...state, notification: action.payload };
    case ActionReducer.UPDATE_FILE_META:
      return { ...state, globalFileMeta: action.payload };
    // Add more cases for different actions
    default:
      return state;
  }
};

// Create context
const GlobalContext = createContext<
  | {
      state: GlobalState;
      dispatch: React.Dispatch<ActionType>;
    }
  | undefined
>(undefined);

// Provider component
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
