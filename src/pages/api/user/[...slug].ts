import { getUsername } from "@/repository/AuthRepository";
import { getPost } from "@/repository/PostRepository";
import { response } from "@/types";
import {
  responseAccepted,
  responseConflict,
  responseInternalServerError,
} from "@/utils/http-status-response";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<response>
): Promise<void> => {
  try {
    if (req.query.slug) {
      const isUsernameExisted = await getUsername(req.query.slug[0]);
      if (!isUsernameExisted) {
        return responseConflict(res, "Username", false);
      }

      const result = await getPost(req.query.slug[0]);
      return responseAccepted(res, result);
    }
  } catch (error) {
    return responseInternalServerError(res, error);
  }
};


export default handler;