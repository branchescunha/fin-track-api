import { cert, getApps, initializeApp } from "firebase-admin/app";
import { env } from "./env";

const initializeFirebaseAdmin = (): void => {
  if (getApps().length > 0) return;

  const { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID } = env;

  if (!FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY || !FIREBASE_PROJECT_ID) {
    throw new Error("🚨 Falha ao iniciar Firebase - Credenciais faltando");
  }

  try {
    initializeApp({
      credential: cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY,
      }),
    });
  } catch (err) {
    console.error("🚨 Falha ao conectar Firebase:", err);
    process.exit(1);
  }
};

export default initializeFirebaseAdmin;
