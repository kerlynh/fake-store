import { jwtDecode } from "jwt-decode";

export const adaptLoginResponse = (
  response: Record<string, string>
): string | undefined => {
  const decodedToken = jwtDecode(response.token);
  localStorage.setItem("token", JSON.stringify(decodedToken.sub));
  return response.token;
};
