import { getUsername } from "@/repository/AuthRepository";
import { createUser } from "@/repository/UserRepository";
import { response } from "@/types";
import { user } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<response>,) => {
  try {
    const attribute: user = req.body;
    const isExisted = await getUsername(attribute.username);
    if(isExisted) {
      return res.status(409).json({
        'status': 409,
        'message': "Username already exist",
      });
    }
    const data = await createUser(attribute);
    return res.status(201).json({
      'status': 201,
      'message': "User is created successfully",
      'data': data
    });
  } catch (error) {
    return res.status(500).json({
      'status': 500,
      'message': "Something went wrong",
      'error_info': error
    });
  }
}

export default handler;