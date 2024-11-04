import type { User } from "@prisma/client";
import type { H3Event, EventHandlerRequest } from "h3";

export function getTestAuthUser(event: H3Event<EventHandlerRequest>) {
  const headers = getRequestHeaders(event);
  const token = headers["x-testauth"] || "";

  if (!token) {
    return {} as User;
  }

  const user = JSON.parse(atob(token));

  return user as User;
}
