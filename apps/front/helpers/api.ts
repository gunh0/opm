import { Url } from "opm-models";

const Header = {
  json: {
    "Content-Type": "application/json",
  },
};

export const Api = {
  get: async (path: string, headers = Header.json) => {
    return fetch(`${Url.SERVER}${path}`, {
      method: "GET",
      headers,
    });
  },
  post: async (path: string, body: any, headers = Header.json) => {
    return fetch(`${Url.SERVER}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  },
};
