import type { UseFetchOptions } from "nuxt/app";
import type { NitroFetchRequest } from "nitropack";

export const useApi = async <T>(
  url: NitroFetchRequest,
  options?: UseFetchOptions<T>
) => {
  const { token } = useAuth();

  return useFetch(url, {
    ...options,
    headers: {
      "x-testauth": token.value || "",
      ...options?.headers,
    },
  });
};
