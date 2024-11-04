import prismaClient from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const users = await prismaClient.user.findMany();
  return users;
});
