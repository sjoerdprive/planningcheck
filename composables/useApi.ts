import type { NitroFetchOptions, NitroFetchRequest } from "nitropack";

export const $api = async <T>(
  url: NitroFetchRequest,
  options?: NitroFetchOptions<NitroFetchRequest>
) => {
  const { addToast } = useToasts();
  const { token } = useAuth();

  try {
    return $fetch<T>(url, {
      ...options,
      headers: {
        "x-testauth": token.value || "",
        ...options?.headers,
      },
    });
  } catch (err: any) {
    console.error(err);
    addToast({ message: err, type: "error" });
  }
};
