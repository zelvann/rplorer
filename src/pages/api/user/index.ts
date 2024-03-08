import { getUsername } from "@/repository/AuthRepository";
import { getPostByID } from "@/repository/PostRepository";
import { response } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse<response>) => {
  try {
    if(req.query) {
      const { username } = req.query;
      
      const isUserExisted = await getUsername(username as string);
      if(!isUserExisted) {
        return res.status(409).json({
          'status': 409,
          'message': 'User does not exist in the database',
        });
      }

      const result = await getPostByID(username as string);
      return res.status(202).json({
        'status': 202,
        'message': 'Data fetched successfully',
        'data': result
      }); 
    } else {
      return res.status(400).json({
        'status': 400,
        'message': 'Bad request'
      })
    }
  } catch (error) {
    return res.status(500).json({
      'status': 500,
      'message': 'Something went wrong'
    }); 
  } 
} 

export default handler;