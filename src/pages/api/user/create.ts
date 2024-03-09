import { getUsername } from "@/repository/AuthRepository";
import { createPost } from "@/repository/PostRepository";
import { response } from "@/types";
import {
  responseConflict,
  responseCreated,
  responseInternalServerError,
} from "@/utils/http-status-response";
import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<response>
): Promise<void> => {
  try {
    const { image_path, caption, user_name } = req.body;

    const isUsernameExisted = await getUsername(user_name);
    if (!isUsernameExisted) {
      return responseConflict(res, "Username", false);
    }

    const hashID = await hash("P", 10);
    const id = hashID.replace(/\//g, "-");
    const data = await createPost({
      id: id,
      image_path,
      caption,
      user_name,
    });
    return responseCreated(res, "Post", 0, data);
  } catch (error) {
    return responseInternalServerError(res, error);
  }
};

export default handler;
