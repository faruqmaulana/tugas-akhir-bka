import { type AllNotificationType } from "~/server/api/module/notification/notification";
import { type UserProfileType } from "~/server/queries/module/user/user.query";

// Define the type for your global state
export interface GlobalState {
  user: UserProfileType | undefined;
  notification: AllNotificationType | undefined;
  // Your global state properties and types here
}

export enum ActionReducer {
  UPDATE_USER = "UPDATE_USER",
  UPDATE_NOTIFICATION_COUNT = "UPDATE_NOTIFICATION_COUNT",
}

// Define the action types
export type ActionType =
  | {
      type: typeof ActionReducer.UPDATE_USER;
      payload: GlobalState["user"]; // Define payload type as needed
    }
  | {
      type: typeof ActionReducer.UPDATE_NOTIFICATION_COUNT;
      payload: GlobalState["notification"]; // Define payload type as needed
    };
