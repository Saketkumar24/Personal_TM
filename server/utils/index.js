import jwt from "jsonwebtoken";
const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // required for HTTPS
    sameSite: "None", // important for cross-origin cookies
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export default createJWT;