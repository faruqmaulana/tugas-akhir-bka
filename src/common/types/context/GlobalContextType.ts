import { type AllNotificationType } from "~/server/api/module/notification/notification";
import { type UserProfileType } from "~/server/queries/module/user/user.query";

export type globalFileMetaType = {
  key: string;
  type: string;
  src: string;
  fileName: string;
};

export type AllUsersType = {
  id: string;
  name: string;
  npm: string;
  prodiName?: string;
  semester?: string;
  // nidn: string;
  // role: string;
};

// Define the type for your global state
export interface GlobalState {
  user: UserProfileType | undefined;
  notification: AllNotificationType | undefined;
  globalFileMeta: globalFileMetaType[] | [];
  allUsers: AllUsersType[] | [];
  pengajuDokumen: string | undefined;
  // Your global state properties and types here
}

export enum ActionReducer {
  UPDATE_USER = "UPDATE_USER",
  UPDATE_NOTIFICATION_COUNT = "UPDATE_NOTIFICATION_COUNT",
  UPDATE_ALL_USERS = "UPDATE_ALL_USERS",
  UPDATE_PENGAJU_DOKUMEN = "UPDATE_PENGAJU_DOKUMEN",
  // HANDLE GLOBAL FILE
  UPDATE_FILE_META = "UPDATE_FILE_META",
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
    }
  | {
      type: typeof ActionReducer.UPDATE_ALL_USERS;
      payload: GlobalState["allUsers"]; // Define payload type as needed
    }
  | {
      type: typeof ActionReducer.UPDATE_FILE_META;
      payload: GlobalState["globalFileMeta"]; // Define payload type as needed
    }
  | {
      type: typeof ActionReducer.UPDATE_PENGAJU_DOKUMEN;
      payload: GlobalState["pengajuDokumen"]; // Define payload type as needed
    };
