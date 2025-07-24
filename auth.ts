import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import crypto from "crypto";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [MicrosoftEntraID({
    id: "techpass",
    name: "TechPass",
    issuer: `https://login.microsoftonline.com/${process.env.TECHPASS_TENANT_ID}/v2.0`,
    clientId: process.env.TECHPASS_CLIENT_ID,
    clientSecret: process.env.TECHPASS_CLIENT_SECRET,
    authorization: { params: { scope: "openid profile email" } },
    style: {
      logo: "/img/providers/techpass.svg",
    },
  }),
  Credentials({
    id: "otp",
    name: "OTP",
    credentials: {
      otp: { label: "OTP", type: "text" },
    },
    authorize: async (credentials) => {
      const otp = credentials.otp as string;
      const [id, pin] = otp.split("-");
      const user = await verifyOTP(id, pin);
      return user;
    },
  }),
  ],
  pages: {
    signIn: "/signin",
  },
});

export async function sendOTP(email: string) {
  const endpoint = "https://otp.stg.techpass.suite.gov.sg/otp";
  const token = getToken();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Failed to send OTP");
  }

  const data = await response.json();
  return data.id;
}

export async function verifyOTP(id: string, pin: string) {
  const endpoint = `https://otp.stg.techpass.suite.gov.sg/otp/${id}`;
  const token = getToken();

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ pin }),
  });
  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const user: User = {
    email: data.email,
  };
  return user;
}

function getToken() {
  const app_namespace = "okreator";
  const app_id = "okreator";
  const app_secret = process.env.TECHPASS_OTP_SECRET!;

  const secret = crypto.createHmac('sha256', app_secret)
                      .update(app_id)
                      .digest('hex');
  const token = Buffer.from(`${app_namespace}:${app_id}:${secret}`).toString('base64');
  return token;
}