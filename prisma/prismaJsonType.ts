/* eslint-disable @typescript-eslint/no-namespace */
export {};

declare global {
  // you can use typical basic types
  // or you can use classes, interfaces, object types, etc.
  namespace PrismaJson {
    type UserInfoType = {
      value: string;
      label: string;
      isKetua: boolean;
    }[];
  }
}
