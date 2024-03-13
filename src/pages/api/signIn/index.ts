import { getUsername } from "@/repository/AuthRepository";
import { response } from "@/types";
import { auth } from "@/utils/auth";
import {
  responseAccepted,
  responseAuth,
  responseInternalServerError,
} from "@/utils/http-status-response";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<response>) : Promise<void> => {
  try {
    const { username, password }: { username: string; password: string } = req.body;
    const isUsernameExisted = await getUsername(username);
    if(!isUsernameExisted || isUsernameExisted.password !== password) {
      return responseAuth(res, 1);
    }

    auth(req,res);
    return responseAccepted(res, true);
  } catch (error) {
    return responseInternalServerError(res, error);
  }
};

export default handler;
