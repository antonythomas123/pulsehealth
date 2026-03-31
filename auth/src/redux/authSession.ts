import {
  getIdTokenResult,
  type User,
  type UserCredential,
} from "firebase/auth";
import cookie from "react-cookies";

const SESSION_COOKIE_NAME = "pulsehealth_auth_session";
const SESSION_REASON_COOKIE_NAME = "pulsehealth_auth_session_reason";
const SESSION_REASON_TTL_MS = 5 * 60 * 1000;

export const SESSION_EXPIRED_MESSAGE =
  "Your session expired. Please sign in again to continue.";

export type AuthSessionMeta = {
  uid: string;
  email: string | null;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  expiresAt: number;
  refreshedAt: number;
};

type SessionReason = "expired";

let sessionExpiryTimer: ReturnType<typeof setTimeout> | null = null;

type FirebaseTokenResponse = {
  idToken?: string;
  refreshToken?: string;
  expiresIn?: string;
};

const getCookieOptions = (expires?: Date) => ({
  path: "/",
  sameSite: "strict" as const,
  secure:
    typeof window !== "undefined" && window.location.protocol === "https:",
  ...(expires ? { expires } : {}),
});

const isSessionMeta = (value: unknown): value is AuthSessionMeta => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<AuthSessionMeta>;

  return (
    typeof candidate.uid === "string" &&
    (typeof candidate.email === "string" || candidate.email === null) &&
    typeof candidate.idToken === "string" &&
    typeof candidate.refreshToken === "string" &&
    typeof candidate.expiresIn === "string" &&
    typeof candidate.expiresAt === "number" &&
    typeof candidate.refreshedAt === "number"
  );
};

export const isSessionExpired = (expiresAt: number) => expiresAt <= Date.now();

const extractTokenResponse = (
  credential: UserCredential,
): FirebaseTokenResponse | null => {
  const tokenResponse = (
    credential as UserCredential & { _tokenResponse?: FirebaseTokenResponse }
  )._tokenResponse;

  if (!tokenResponse || typeof tokenResponse !== "object") {
    return null;
  }

  return tokenResponse;
};

const normalizeFirebaseSessionData = ({
  uid,
  email,
  idToken,
  refreshToken,
  expiresIn,
}: {
  uid: string;
  email: string | null;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}): AuthSessionMeta => {
  const refreshedAt = Date.now();
  const expiresInSeconds = Number(expiresIn);
  const normalizedExpiresInSeconds = Number.isFinite(expiresInSeconds)
    ? Math.max(expiresInSeconds, 0)
    : 0;

  return {
    uid,
    email,
    idToken,
    refreshToken,
    expiresIn: normalizedExpiresInSeconds.toString(),
    expiresAt: refreshedAt + normalizedExpiresInSeconds * 1000,
    refreshedAt,
  };
};

const saveAuthSession = (sessionMeta: AuthSessionMeta) => {
  cookie.save(
    SESSION_COOKIE_NAME,
    sessionMeta,
    getCookieOptions(new Date(sessionMeta.expiresAt)),
  );
  cookie.remove(SESSION_REASON_COOKIE_NAME, getCookieOptions());
};

const getFirebaseSessionData = async (user: User): Promise<AuthSessionMeta> => {
  const tokenResult = await getIdTokenResult(user);
  const expiresAt = Date.parse(tokenResult.expirationTime);
  const refreshedAt = Date.now();
  const normalizedExpiresAt = Number.isFinite(expiresAt) ? expiresAt : refreshedAt;

  return normalizeFirebaseSessionData({
    uid: user.uid,
    email: user.email,
    idToken: tokenResult.token,
    refreshToken: user.refreshToken,
    expiresIn: Math.max(
      Math.floor((normalizedExpiresAt - refreshedAt) / 1000),
      0,
    ).toString(),
  });
};

export const persistAuthSessionFromCredential = (
  credential: UserCredential,
): AuthSessionMeta | null => {
  const tokenResponse = extractTokenResponse(credential);

  if (
    !tokenResponse?.idToken ||
    !tokenResponse.refreshToken ||
    !tokenResponse.expiresIn
  ) {
    return null;
  }

  const sessionMeta = normalizeFirebaseSessionData({
    uid: credential.user.uid,
    email: credential.user.email,
    idToken: tokenResponse.idToken,
    refreshToken: tokenResponse.refreshToken,
    expiresIn: tokenResponse.expiresIn,
  });

  saveAuthSession(sessionMeta);

  return sessionMeta;
};

export const persistAuthSession = async (
  user: User,
): Promise<AuthSessionMeta> => {
  const sessionMeta = await getFirebaseSessionData(user);

  saveAuthSession(sessionMeta);

  return sessionMeta;
};

export const loadAuthSessionMeta = (): AuthSessionMeta | null => {
  const sessionMeta = cookie.load(SESSION_COOKIE_NAME);

  if (!isSessionMeta(sessionMeta)) {
    return null;
  }

  return sessionMeta;
};

export const markSessionExpired = () => {
  cookie.save(
    SESSION_REASON_COOKIE_NAME,
    "expired" satisfies SessionReason,
    getCookieOptions(new Date(Date.now() + SESSION_REASON_TTL_MS)),
  );
};

export const consumeSessionReasonMessage = (): string | null => {
  const reason = cookie.load(SESSION_REASON_COOKIE_NAME);
  cookie.remove(SESSION_REASON_COOKIE_NAME, getCookieOptions());

  if (reason === "expired") {
    return SESSION_EXPIRED_MESSAGE;
  }

  return null;
};

export const clearAuthSession = (preserveReason = false) => {
  cookie.remove(SESSION_COOKIE_NAME, getCookieOptions());

  if (!preserveReason) {
    cookie.remove(SESSION_REASON_COOKIE_NAME, getCookieOptions());
  }
};

export const scheduleSessionExpiry = (
  expiresAt: number,
  onExpire: () => void,
) => {
  clearSessionExpiryTimer();

  const msUntilExpiry = Math.max(expiresAt - Date.now(), 0);
  sessionExpiryTimer = setTimeout(onExpire, msUntilExpiry);
};

export const clearSessionExpiryTimer = () => {
  if (sessionExpiryTimer) {
    clearTimeout(sessionExpiryTimer);
    sessionExpiryTimer = null;
  }
};
