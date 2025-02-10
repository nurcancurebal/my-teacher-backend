export type TDecoded = {
  userId: number;
  refresh: boolean;
};

export type TErrorResponse = {
  error: boolean;
  message: string;
  data: null;
  stack?: Error["stack"];
};

export type TGetLang = (key: string, lang?: string) => string;
