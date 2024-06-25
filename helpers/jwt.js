import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// generate token request

export const generateToken = (user) => {
//   const data = {
//     id: user.id,
//     username: user.username,
//     lastname: user.lastname,
//     email: user.email,
//     createdAt: user.createdAt,
//     isActive: user.isActive,
//     role: user.role,
//   };

  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '14d',
  });
};

// authenticator middleware s ka iihay


export const authenticator = async (req, res, next) => {
  try {
    // hel the tokenka
    
    const token =
    req.headers.authorization?.startsWith('Bearer') &&
    req.headers.authorization?.split(' ')[1];
    
    if (!token)
    return res.status(401).json({
  isSuccess: false,
  message: 'Please login to get your token.',
});

// decode token isameee

// const decoded = jwt.verify(token, process.env.JWT_SECRET);
const decoded = jwt.verify(token, process.env.JWT_SECRET)

console.log(decoded)
    // check garee userka
    const user = await prisma.users.findFirst({
      where: {
        id: decoded.id,
        isActive: true,
      },
    });

    if (!user)
      return res.status(401).json({
        isSuccess: false,
        message: 'UNAUTHORIZED',
      });

    req.user = decoded;


    next();
  } catch (error) {
    res.status(401).json({
      isSuccess: false,
      message: 'UNAUTHORIZED',
    });
  }
};

// AUTHORIZATION MIDDLEWARE ka ii haya

export const authorizer = (...allowedRoles) => {
  return (req, res, next) => {
    if (allowedRoles.includes(req.user.role)) {
      return next();
    }

    res.status(401).json({
      isSuccess: false,
      message: 'Permission denied',
    });
  };
};