import { User } from "@prisma/client";
import prismaClient from "~/lib/prisma";
import { getTestAuthUser } from "~/utils/getTestAuthUser";

export default defineEventHandler(async (event) => {
  const user = getTestAuthUser(event);

  const tables = await prismaClient.timetable.findMany({
    where: {
      OR: [
        {
          sharedWith: {
            some: {
              email: {
                equals: user.email,
              },
            },
          },
        },
        {
          owner: {
            email: {
              equals: user.email,
            },
          },
        },
      ],
    },
  });
  return tables;
});
