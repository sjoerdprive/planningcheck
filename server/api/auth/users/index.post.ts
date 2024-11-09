import prismaClient from "~/lib/prisma";
import { faker } from "@faker-js/faker";

type Credentials = {
  email?: string;
  password?: string;
};

export default defineEventHandler(async (event) => {
  const credentials = await readBody<Credentials>(event);

  const connectedPlannings = await prismaClient.timetable.findMany({
    where: {
      OR: [
        {
          sharedWith: {
            some: {
              email: credentials?.email,
            },
          },
        },
        {
          owner: {
            email: credentials?.email,
          },
        },
      ],
    },
  });

  const user = await prismaClient.user.create({
    data: {
      email: credentials?.email || faker.internet.email(),
      password: credentials?.password || faker.internet.password(),
      name: faker.person.firstName(),
      timetables:
        connectedPlannings.length > 0
          ? {
              connect: connectedPlannings.map((planning) => ({
                id: planning.id,
              })),
            }
          : undefined,
    },
  });

  const token = btoa(JSON.stringify(user));

  return token;
});
