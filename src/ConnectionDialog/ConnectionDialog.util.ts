import { QueryFunction, QueryKey } from "react-query";
import { ConnectionForm } from "./ConnectionDialog.types";

export interface ConnectionPayload {
  connection: ConnectionForm;
}

export interface ConnectionResponse {
  // Add your response fields here
}

export const saveConnection: QueryFunction<
  ConnectionResponse,
  QueryKey,
  ConnectionPayload
> = async ({ connection }) => {
  console.log({ connection });
  // This is a mock API call, replace with your actual API call
  const response = await fetch("/api/saveConnection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(connection)
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json() as Promise<ConnectionResponse>;
};
