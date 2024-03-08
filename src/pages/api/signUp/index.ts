import { getUsername } from "@/repository/AuthRepository";
import { createUser } from "@/repository/UserRepository";
import { user } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>,) => {
  try {
    const attribute = req.body as user;
    const isExist = await getUsername(attribute.username);
    if(isExist) {
      res.status(409).json({
        'message': "Username already exist",
      });
    } else {
      const result = await createUser(attribute);
      res.status(201).json({
        message: "User is created successfully",
        result
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error
    });
  }
}

export default handler;