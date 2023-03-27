export const post = async (url: string, body: string) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body,
  }).then(res => res.json());
};
