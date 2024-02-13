import { PrismaClient } from "@prisma/client";
import { checkSignUp, checkSignIn, checkUpdate } from "../zod/user";
import Jwt from "jsonwebtoken";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const JWT_SECRET: string = process.env.JWT_SECRET!;

console.log("signup"+JWT_SECRET);


interface RequestWithUserId extends Request {
  userId?: number;
}
interface body {
  username?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
}

const handleSignUpReq = async (req: Request, res: Response) => {
  const body: body = req.body;
  console.log(req.body);
  // check the user input is valid or not
  const checked = checkSignUp.safeParse(body);
  if (!checked.success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  
  // check the username already exist or not
  const isUserExist = await prisma.user.findFirst({
    where: { username: body.username },
  });

  if (isUserExist != null) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  //create user and store in database
  const dbUser = await prisma.user.create({
    data: {
      username: body.username!,
      password: body.password!,
      firstname: body.firstname!,
      lastname: body.lastname,
    },
  });
  const userId = dbUser.id;

  //create jwt token
  const token = Jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
};

const handleSignInReq = async (req: Request, res: Response) => {
  const body: body = req.body;
  //check the user input is valid or not
  const { success } = checkSignIn.safeParse(body); // zod always return an object which contain success and data that's why i use {success} to direct catch "true or false".
  if (!success) {
    return res.status(411).json({
      message: "Invalid Input",
    });
  }

  // check user is exist or not
  const isUserExist = await prisma.user.findFirst({
    where: {
      username: body.username!,
      password: body.password!,
    },
  });

  if (isUserExist == null) {
    return res.status(411).json({
      message: "Invalid username or password",
    });
  }

  // retrive the userId from the existing user
  const userId = isUserExist.id;
  //create token
  const token = Jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  return res.status(200).json({
    message: "Sign in",
    token: token,
  });
};

const handleModifyReq = async (req: RequestWithUserId, res: Response) => {
  const body: body = req.body;
  // check the valid input
  const { success } = checkUpdate.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "Input isn't match the basic requirement",
    });
  }
  const userId: number = req.userId!;
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      firstname: body.firstname,
      lastname: body.lastname,
      password: body.password,
    },
  });

  return res.status(200).json({
    message: "Update successfully",
  });
};

interface UserData {
  id: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

const handleGetUserreq = async (req: RequestWithUserId, res: Response) => {
  try {
    const userData = await prisma.user.findFirst({
      where: { id: req.userId },
    });

    if (userData == null) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({
        user: {
          username: userData.username,
          firstname: userData.firstname,
          lastname: userData.lastname,
          id: userData.id,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { handleModifyReq, handleSignInReq, handleSignUpReq, handleGetUserreq };
