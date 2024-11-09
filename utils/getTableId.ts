import type { H3Event, EventHandlerRequest } from "h3";

export const getTableId = (event: H3Event<EventHandlerRequest>) => {
  const params = getRouterParams(event);

  if (!params.tableId) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required to fetch a timetable",
    });
  }

  return params.tableId as string;
};
