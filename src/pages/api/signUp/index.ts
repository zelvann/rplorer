import { getUsername } from "@/repository/AuthRepository";
import { createUser } from "@/repository/UserRepository";
import { response } from "@/types";
import { responseConflict, responseCreated, responseInternalServerError } from "@/utils/http-status-response";
import { user } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<response>) : Promise<void> => {
  try {
    const attribute: user = req.body;

    const isUsernameExisted = await getUsername(attribute.username);
    if(isUsernameExisted) {
      return responseConflict(res, 'Username', true);
    }

    const data = await createUser(attribute);
    return responseCreated(res, 'User', 0, data);
  } catch (error) {
    return responseInternalServerError(res, error);
  }
}

export default handler;