export const isBuyer = (req, res, next) => {
  if (req.user.role !== "buyer") {
    return res.status(403).json({
      message: "Only buyer allowed",
    });
  }

  next();
};
