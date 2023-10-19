import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "./prisma";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
