import prismaClient from "~/lib/prisma";

export const updateTimetableUpdatedAt = async (timetableId: string) => {
  await prismaClient.timetable.update({
    where: {
      id: timetableId,
    },
    data: {
      updatedAt: new Date(),
    },
  });
};
