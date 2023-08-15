import { type UserProfileType } from "~/server/queries/module/user/user.query";

// Define the type for your global state
export interface GlobalState {
  user: UserProfileType | undefined;
  something: any;
  // Your global state properties and types here
}

export enum ActionReducer {
  UPDATE_USER = "UPDATE_USER",
  UPDATE_SOMETHING = "UPDATE_SOMETHING",
}

// Define the action types
export type ActionType =
  | {
      type: typeof ActionReducer.UPDATE_USER;
      payload: GlobalState["user"]; // Define payload type as needed
    }
  | {
      type: typeof ActionReducer.UPDATE_SOMETHING;
      payload: GlobalState["user"]; // Define payload type as needed
    };
