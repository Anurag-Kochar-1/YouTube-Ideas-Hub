"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./routes/api"));
const zod_middleware_1 = require("./middlewares/zod.middleware");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const express_session_1 = __importDefault(require("express-session"));
const db_config_1 = require("./db/db.config");
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(zod_middleware_1.zodMiddleware);
app.use((0, cors_1.default)({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
}));
// ============ START => Sign in with google shit ============
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID_DEV,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET_DEV,
    callbackURL: "/api/v1/auth/google/callback",
    scope: ["profile", "email"],
}, function (accessToken, refreshToken, profile, callback) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const email = (profile === null || profile === void 0 ? void 0 : profile.emails) || undefined;
        if (email !== undefined && email[0]) {
            try {
                const existingUser = yield db_config_1.prisma.user.findFirst({
                    where: {
                        email: (_a = email[0]) === null || _a === void 0 ? void 0 : _a.value,
                    },
                });
                if (!existingUser) {
                    try {
                        const newUser = yield db_config_1.prisma.user.create({
                            data: {
                                email: email[0].value,
                                firstName: profile.displayName,
                                lastName: profile.displayName,
                                password: new Date().toString(),
                            },
                        });
                        console.log(`🍎 newUser`);
                        console.log(newUser);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                else {
                }
                console.log(`🍎 existingUser`);
                console.log(existingUser);
            }
            catch (error) {
                console.log(error);
            }
        }
        callback(null, profile);
    });
}));
passport_1.default.serializeUser((user, done) => {
    console.log(`\n--------> Serialize User:`);
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
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
    }
    else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});
app.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});
app.get("/api/v1/auth/google", passport_1.default.authenticate("google", ["profile", "email"]));
app.get("/api/v1/auth/google/callback", passport_1.default.authenticate("google", {
    successRedirect: `http://localhost:3000/`,
    failureRedirect: "/login/failed",
}));
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect(`http://localhost:3000/`);
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// ============ END => Sign in with google shit ============
app.use("/api/v1", api_1.default);
app.listen(port, () => {
    console.log(`🚗 now listening on port ${port}`);
});
