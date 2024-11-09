import type { H3Event, EventHandlerRequest } from "h3";

export const getTableRowId = (event: H3Event<EventHandlerRequest>) => {
  const params = getRouterParams(event);

  if (!params.rowId) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID is required to fetch a row",
    });
  }

  return params.rowId as string;
};
