export const useAuth = () => {
  const token = useCookie<string | null>("token", {
    default: () => null,
    watch: true,
  });

  async function login(credentials: { email: string; password: string }) {
    const newToken = await $fetch<string>("/api/auth/login", {
      body: credentials,
      method: "POST",
    });

    token.value = newToken;
  }

  function logout() {
    token.value = null;
  }

  return { login, logout, token };
};
