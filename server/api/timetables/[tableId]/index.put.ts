import prismaClient from "~/lib/prisma";
import { getTableId } from "~/utils/getTableId";
import { getTestAuthUser } from "~/utils/getTestAuthUser";

export default defineEventHandler(async (event) => {
  const user = getTestAuthUser(event);
  const id = getTableId(event);
  const data = await readBody(event);

  const tables = await prismaClient.timetable.update({
    where: {
      id,
    },
    data,
  });
  return tables;
});
