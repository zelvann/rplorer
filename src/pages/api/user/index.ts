import { getUsername } from "@/repository/AuthRepository";
import { getPost } from "@/repository/PostRepository";
import { response } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<response>) => {
  try {
    const { username } = req.query;
    
    const isUserExisted = await getUsername(username as string);
    if(!isUserExisted) {
      return res.status(409).json({
        'status': 409,
        'message': 'User does not exist in the database',
      });
    }

    const result = await getPost(username as string);
    return res.status(202).json({
      'status': 202,
      'message': 'Data fetched successfully',
      'data': result
    }); 
  } catch (error) {
    return res.status(500).json({
      'status': 500,
      'message': 'Something went wrong'
    }); 
  } 
} 

export default handler;