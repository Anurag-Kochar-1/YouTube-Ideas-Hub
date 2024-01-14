// import session from "express-session";
// import passport from "passport";
// import { Strategy as GoogleStategy } from "passport-google-oauth20";

// const passportUtil = (app: any) => {
//   app.use(
//     session({
//       secret: process.env.SESSION_SECRET,
//       resave: false,
//       saveUninitialized: false,
//       cookie: {
//         maxAge: 1000 * 60 * 60 * 24, // 1 day
//       },
//     } as any)
//   );
//   app.use(passport.initialize());
//   app.use(passport.session());

//   passport.use(
//     new GoogleStategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID_DEV,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET_DEV,
//         callbackURL: "/api/v1/auth/google/callback",
//         scope: ["profile", "email"],
//       } as any,
//       (accessToken: string, refreshToken: string, profile: any, callback: any) => {
//         console.log(accessToken);
//         console.log(refreshToken);
//         callback(null, profile);
//       }
//     )
//   );
//   passport.serializeUser((user: any, done) => {
//     done(null, user);
//   });

//   passport.deserializeUser((user: any, done) => {
//     done(null, user);
//   });
// };

// export default passportUtil;


