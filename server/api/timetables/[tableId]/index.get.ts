import prismaClient from "~/lib/prisma";
import { getTestUser } from "~/utils/getTestUser";

export default defineEventHandler(async (event) => {
  const params = getRouterParams(event);

  if (!params.tableId) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required to fetch a timetable",
    });
  }

  const table = await prismaClient.timetable.findUnique({
    where: {
      id: params.tableId as string,
    },
  });
  return table;
});
