import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {

  try {
    
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token not found",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "token is not verified",
      });
    }
    console.log(decodedToken);

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication Error",
      error: error.message,
    });
  }
};
export default isAuth;


