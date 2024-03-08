import { post } from "@/model";
import { getUsername, postidIsExisted } from "@/repository/AuthRepository";
import { createPost } from "@/repository/PostRepository";
import { response } from "@/types";
import { responseConflict, responseCreated, responseInternalServerError } from "@/utils/http-status-response";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<response>) : Promise<void> => {
  try {
    const attribute: post = req.body;

    const ispostIDExisted = await postidIsExisted(attribute.id as string);
    if(ispostIDExisted) {
      return responseConflict(res, 'PostID', true);
    }

    const isUsernameExisted = await getUsername(attribute.user_name);
    if(!isUsernameExisted) {
      return responseConflict(res, 'Username', false);
    }

    const data = await createPost(attribute);
    return responseCreated(res,'Post', 0, data);
  } catch (error) {
    return responseInternalServerError(res, error);
  }
}

export default handler;