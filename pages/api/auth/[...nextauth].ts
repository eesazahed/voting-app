import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { Profile } from "next-auth";
import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter";
import GoogleProvider from "next-auth/providers/google";
import { OAuthConfig } from "next-auth/providers";
import sequelize from "../../../models";
import { DataTypes } from "sequelize";

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  return await NextAuth(req, res, {
    adapter: SequelizeAdapter(sequelize, {
      models: {
        User: sequelize.define(
          "user",
          {
            ...models.User,
            id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              primaryKey: true,
            },
          },
          {
            timestamps: false,
          }
        ),
      },
    }),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }) as OAuthConfig<Profile>,
    ],
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
      signIn: async ({ user, account, profile }) => {
        return true;
      },
      redirect: async ({ url, baseUrl }) => {
        return "/";
      },
      jwt: async ({ token, user, account }) => {
        return token;
      },
      session: async ({ session, token }) => {
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/auth/signin",
    },
  });
};

export default auth;
