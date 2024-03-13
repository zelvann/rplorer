import { getUsername } from "@/repository/AuthRepository";
import { createUser } from "@/repository/UserRepository";
import { response } from "@/types";
import {
  responseConflict,
  responseCreated,
  responseInternalServerError,
} from "@/utils/http-status-response";
import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { user } from "@/model";
import { sign } from "jsonwebtoken";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<response>
): Promise<void> => {
  try {
    const attribute: user = req.body;

    const isUsernameExisted = await getUsername(attribute.username);
    if (isUsernameExisted) {
      return responseConflict(res, "Username", true);
    }

    const hashPass = await hash("RPLorer", 10); // will be hashed
    const data = await createUser({
      ...attribute,
      password: hashPass,
    });

    sign({username: attribute.username},
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    )

    return responseCreated(res, "User", 0, data);
  } catch (error) {
    return responseInternalServerError(res, error);
  }
};

export default handler;
