import type { User } from "@prisma/client";

export const useAuth = () => {
  const token = useCookie<string | null>("token", {
    default: () => null,
    watch: true,
  });

  const user = useCookie<User | null>("user", {
    default: () => null,
    watch: true,
  });

  async function login(credentials: { email: string; password: string }) {
    const { token: newToken, user: newUser } = await $fetch<{
      user: User;
      token: string;
    }>("/api/auth/login", {
      body: credentials,
      method: "POST",
    });

    token.value = newToken;
    user.value = newUser;
  }

  function logout() {
    token.value = null;
  }

  return { login, logout, token, user };
};
