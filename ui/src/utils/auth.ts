import jwt_decode from "jwt-decode";
import { tokenKey } from "../constants/config";
import { User } from "../model/user";

interface Token {
  accessToken: string;
  notBeforeTimestampInMillis: number;
  expirationTimestampInMillis: number;
}

interface JWTPayload {
  _id: string;
  email: string;
  iat: number;
  exp: number;
}

class WrongCredentialsException extends Error {}

let logoutIfExpiredHandlerId: NodeJS.Timeout;

export function setLogoutIfExpiredHandler(setUser: (user: any) => void) {
  if (!isTokenActive()) {
    return;
  }
  const token = getToken();
  if (!token) {
    return;
  }

  logoutIfExpiredHandlerId = setTimeout(
    () => setUser(undefined),
    token.expirationTimestampInMillis - Date.now()
  );
}

export function setAuthToken(accessToken: string) {
  const tokenPayload = getPayload(accessToken);
  const token: Token = {
    accessToken: accessToken,
    notBeforeTimestampInMillis: tokenPayload.iat * 1000,
    expirationTimestampInMillis: tokenPayload.exp * 1000,
  };
  localStorage.setItem(tokenKey, JSON.stringify(token));
}

function logout() {
  removeAuthToken();
  clearTimeout(logoutIfExpiredHandlerId);
}

export function removeAuthToken() {
  localStorage.removeItem(tokenKey);
}

function getPayload(token: string): JWTPayload {
  return jwt_decode(token);
}

function getToken(): Token | null {
  let token: Token;
  const tokenJson = localStorage.getItem(tokenKey);
  if (tokenJson) {
    token = JSON.parse(tokenJson);
    return token;
  }
  return null;
}

function getAccessToken(): string {
  const token = getToken();
  if (token) {
    return token.accessToken;
  }
  return "";
}

export function getCurrentUser(): User | undefined {
  const token = getToken();
  if (token) {
    if (!isTokenActive()) {
      logout();
      return undefined;
    }
    const tokenPayload = getPayload(token.accessToken);
    return {
      _id: tokenPayload._id,
      active: true,
      email: tokenPayload.email,
    };
  } else {
    return undefined;
  }
}

function isTokenActive(): boolean {
  const token = getToken();
  const currentTimestamp = Date.now();

  return !!(
    token &&
    token.expirationTimestampInMillis - currentTimestamp > 0 &&
    token.notBeforeTimestampInMillis <= currentTimestamp
  );
}

export { WrongCredentialsException, logout, getAccessToken, isTokenActive };
