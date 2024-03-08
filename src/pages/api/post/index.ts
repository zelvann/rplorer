import { post } from "@/model";
import { postidIsExisted } from "@/repository/AuthRepository";
import { deletePost, detailPost, updatePost } from "@/repository/PostRepository";
import { response } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<response>,) => {
  try {
    const { id, edit, del } = req.query;
    const isPostExisted = await postidIsExisted(id as string);
    if(!isPostExisted) {
      return res.status(409).json({
        'status': 409,
        'message': 'Post does not exist in the database',
      });
    }

    if(req.method === "GET" && id && (!del && !edit)) {
      const result = await detailPost(id as string);
      return res.status(202).json({
        'status': 202,
        'message': 'Data fetched successfully',
        'data': result
      });
    } 

    else if(req.method === "DELETE" && id && del === "true") {
      const result = await deletePost(id as string);
      return res.status(201).json({
        'status': 201,
        'message': 'Post is deleted successfully',
        'data': result
      });
    } 
    
    else if(req.method === "PUT" && id && edit === "true") {
      const attribute : post = req.body;
      const result = await updatePost(id as string, attribute);
      return res.status(201).json({
        'status': 201,
        'message': 'Post is updated successfully',
        'data': result
      });
    } else {
      return res.status(400).json({
        'status': 400,
        'message': 'Bad request'
      });
    }
  } catch (error) {
    return res.status(500).json({
      'status': 500,
      'message': 'Something went wrong',
      'error_info': error
    });
  }
}

export default handler;