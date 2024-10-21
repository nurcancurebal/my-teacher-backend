import { omit } from "lodash";

interface FilterOptions {
  orderBy?: string;
  page?: number;
  limit?: number;
  search?: string;
  orderColumn?: string;
  status?: string;
  [key: string]: unknown; // Diğer dinamik anahtarlar için
}

/**
 * Filter options for using in where statement
 * @param options
 * @returns
 */

export const whereFilter = (options: FilterOptions) => {
  const where = omit({ ...options }, [
    "orderBy",
    "page",
    "limit",
    "search",
    "orderColumn",
  ]);
  for (const key in where) {
    if (Object.hasOwnProperty.call(where, key)) {
      const element = where[key];
      if (element === null || element === undefined || element === "") {
        delete where[key];
      }

      if (key === "status" && (element === "all" || element === "")) {
        delete where["status"];
      }
    }
  }

  return where;
};
