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
    type FileResponse = {
      bytes: string;
      asset_id: string;
      public_id: string;
      secure_url: string;
      created_at: string;
      version_id: string;
      original_filename: string;
    };
  }
}
