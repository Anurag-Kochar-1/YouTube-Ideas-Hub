import "dotenv/config";
import express, { Express, Request, Response, Router } from "express";
import cors from "cors";
import ApiRoutes from "./routes/api";
import { zodMiddleware } from "./middlewares/zod.middleware";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import session from "express-session";
import { prisma } from "./db/db.config";
const port = process.env.PORT || 8000;
const app: Express = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(zodMiddleware);

app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  })
);

// ============ START => Sign in with google shit ============
passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID_DEV,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_DEV,
      callbackURL: "/api/v1/auth/google/callback",
      scope: ["profile", "email"],
    } as any,
    async function (accessToken: string, refreshToken: string, profile, callback: any) {
      const email: Record<string, any>[] | undefined = profile?.emails || undefined;
      if (email !== undefined && email[0]) {
        try {
          const existingUser = await prisma.user.findFirst({
            where: {
              email: email[0]?.value,
            },
          });
          if (!existingUser) {
            try {
              const newUser = await prisma.user.create({
                data: {
                  email: email[0].value as string,
                  firstName: profile.displayName,
                  lastName: profile.displayName,
                  password: new Date().toString(),
                },
              });
              console.log(`🍎 newUser`);
              console.log(newUser);
            } catch (error) {
              console.log(error);
            }
          } else {
          }
          console.log(`🍎 existingUser`);
          console.log(existingUser);
        } catch (error) {
          console.log(error);
        }
      }
      callback(null, profile);
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  console.log(`\n--------> Serialize User:`);
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  console.log("\n--------- Deserialized User:");
  done(null, user);
});

app.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

app.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

app.get("/api/v1/auth/google", passport.authenticate("google", ["profile", "email"] as any));

app.get(
  "/api/v1/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `http://localhost:3000/`,
    failureRedirect: "/login/failed",
  })
);

app.get("/logout", (req: any, res: any) => {
  req.logout();
  res.redirect(`http://localhost:3000/`);
});
app.use(passport.initialize());
app.use(passport.session());
// ============ END => Sign in with google shit ============

app.use("/api/v1", ApiRoutes);
app.listen(port, () => {
  console.log(`🚗 now listening on port ${port}`);
});
