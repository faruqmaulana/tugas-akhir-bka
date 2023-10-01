export type GlobalApiResType<T = object> = {
  status: "ok" | "error";
  code: number;
  message: string;
  data: T;
};
