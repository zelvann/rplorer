import { post } from "@/model";
import { getUsername, postidIsExisted } from "@/repository/AuthRepository";
import { createPost } from "@/repository/PostRepository";
import { response } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<response>) => {
  try {
    const attribute: post = req.body;

    const postidIsUsed = await postidIsExisted(attribute.id as string);
    if(postidIsUsed) {
      return res.status(409).json({
        'message': 'Post already exist',
        'status': 409
      });
    }

    const isUserExisted = await getUsername(attribute.user_name);
    if(!isUserExisted) {
      return res.status(409).json({
        'status': 409,
        'message': 'User does not exist in the database',
        'data': isUserExisted
      });
    }

    const data = await createPost(attribute);
    return res.status(201).json({
      'status': 201,
      'message': 'Post is created successfully',
      'data': data
    });
  } catch (error) {
    return res.status(500).json({
      'status': 500,
      'message': 'Something went wrong',
      'error_info': error
    })
  }
}

export default handler;