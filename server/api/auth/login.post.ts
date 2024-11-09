import prismaClient from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const credentials = await readBody(event);

  const user = await prismaClient.user.findUnique({
    where: {
      email: credentials.email,
      password: credentials.password,
    },
  });

  const token = btoa(JSON.stringify(user));

  return { user, token };
});
