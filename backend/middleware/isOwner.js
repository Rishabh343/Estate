export const isOwner = (req, res, next) => {
  if (req.user.role !== "owner") {
    return res.status(403).json({
      message: "Only owner allowed",
    });
  }

  next();
};