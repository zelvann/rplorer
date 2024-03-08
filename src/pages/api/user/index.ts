import { getUsername } from "@/repository/AuthRepository";
import { getPost } from "@/repository/PostRepository";
import { response } from "@/types";
import {
  responseAccepted,
  responseConflict,
  responseInternalServerError,
} from "@/utils/http-status-response";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<response>
): Promise<void> => {
  try {
    const { username } = req.query;

    const isUsernameExisted = await getUsername(username as string);
    if (!isUsernameExisted) {
      return responseConflict(res, "Username", false);
    }

    const result = await getPost(username as string);
    return responseAccepted(res, result);
  } catch (error) {
    return responseInternalServerError(res, error);
  }
};

export default handler;
