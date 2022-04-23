export const setTokenCookie = (token: string) => {
  console.log("token", token);
  fetch("/api/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
};

export const removeTokenCookie = () => {
  fetch("/api/logout", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
};
