import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import prisma from "./database.service";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_SECRET as string,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: payload.id },
        select: { id: true, role: true }, // ✅ Fetch only ID and role
      });

      if (!user) return done(null, false);
      return done(null, user); // ✅ Only storing { id, role } in req.user
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
