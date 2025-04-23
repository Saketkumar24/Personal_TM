import jwt from "jsonwebtoken";
const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // Use secure cookies in production
   maxAge: 7 * 24 * 60 * 60 * 1000, // 1 days
  });
};

export default createJWT;