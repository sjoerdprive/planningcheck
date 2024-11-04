import type { H3Event, EventHandlerRequest } from "h3";

export function getTestUser(event: H3Event<EventHandlerRequest>) {
  const headers = getRequestHeaders(event);
  const user = headers["x-testuser"];

  return user;
}
