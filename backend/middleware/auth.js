import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "No token Found",
      });
    }
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: error.message,
    });
  }
};
