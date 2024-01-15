import { Session, handleAuth, handleCallback, handleLogin } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

const afterCallback = async (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => {
  const { user } = session;
  console.log(`🍎 user`);
  console.log(user);
  return session;
};

export const GET = handleAuth({
  // async callback(req: any, res: any) {
  //   try {
  //     await handleCallback(req, res, {
  //       afterCallback,
  //     });
  //   } catch (error: any) {
  //     res.send(error.status || 5000).end(error.message);
  //   }
  // },

  // async login(req: any, res: any) {
  //   try {
  //     await handleLogin(req, res, {
  //       authorizationParams: {
  //         audience: "youtube-ideas-hub-api-identifier", // or AUTH0_AUDIENCE
  //         // Add the `offline_access` scope to also get a Refresh Token
  //         scope: "openid profile email read:products", // or AUTH0_SCOPE
  //         client_id: process.env.AUTH0_CLIENT_ID,
          
  //       },
  //     });
  //   } catch (error: any) {
  //     res.status(error.status || 400).end(error.message);
  //   }
  // },
});
