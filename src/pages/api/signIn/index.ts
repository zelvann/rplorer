import { getUsername } from "@/repository/AuthRepository";
import { response } from "@/types";
import {
  responseAccepted,
  responseConflict,
  responseInternalServerError,
} from "@/utils/http-status-response";
import type { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse<response>) : Promise<void> => {
  try {
    const { username, password } = req.body;
    const isUsernameExisted = await getUsername(username);
    if(!isUsernameExisted) {
      return responseConflict(res, 'Username', false);
    }

    if(isUsernameExisted.password !== password) {
      return res.status(401).json({
        status: 401,
        message: "Wrong Password"
      });
    }
    return responseAccepted(res, isUsernameExisted);
  } catch (error) {
    return responseInternalServerError(res, error);
  }
};

export default handler;
