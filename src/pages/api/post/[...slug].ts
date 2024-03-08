import { response } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { post } from "@/model";
import { commentidIsExisted, likeidIsExisted, postidIsExisted, postisLiked } from "@/repository/AuthRepository";
import { createComment, deletePost, detailPost, getOwner, like_transaction, unlike, updatePost } from "@/repository/PostRepository";

const handler = async (req: NextApiRequest, res: NextApiResponse<response>) => {
  try {
    if(req.query.slug) {
      const isPostExisted = await postidIsExisted(req.query.slug[0]);
      if(!isPostExisted) {
        return res.status(409).json({
          'status': 409,
          'message': 'Post does not exist in the database',
        });
      }

      if(req.query.slug.length === 1) {
        const { edit, del, like} = req.query;

        if(req.method === "GET" && (!del && !edit)) {
          const result = await detailPost(req.query.slug[0]);
          return res.status(202).json({
            'status': 202,
            'message': 'Data fetched successfully',
            'data': result
          });
        }

        else if(req.method === "DELETE" && del === "true") {
          const result = await deletePost(req.query.slug[0]);
          return res.status(201).json({
            'status': 201,
            'message': 'Post is deleted successfully',
            'data': result
          });
        }

        else if(req.method === "PUT" && edit === "true") {
          const attribute : post = req.body;
          const result = await updatePost(req.query.slug[0], attribute);
          return res.status(201).json({
            'status': 201,
            'message': 'Post is updated successfully',
            'data': result
          });
        } 

        else if(req.method === "POST" && like === "true") {
          const owner = await getOwner(req.query.slug[0]);
          const isLiked = await postisLiked(req.query.slug[0], owner?.user_name as string);
          if(isLiked) {
            const result = await unlike(req.query.slug[0], owner?.user_name as string);
            return res.status(201).json({
              'status': 201,
              'message': 'Post is unliked successfully',
              'data': result
            });
          } 

          const { id } : { id: string } = req.body;
          const isExisted = await likeidIsExisted(id);
          if(isExisted) {
            return res.status(409).json({
              'status': 409,
              'message': 'Like id already exist',
            });
          }

          const result = await like_transaction({
            id: id,
            user_name: owner?.user_name as string,
            post_id: req.query.slug[0]
          })
          return res.status(201).json({
            'status': 201,
            'message': 'Post is liked successfully',
            'data': result
          });
        } else {
          return res.status(400).json({
            'status': 400,
            'message': 'Bad request'
          });
        }
      }

      else if(req.query.slug.length === 2 && req.query.slug[1] === "comment") {
        if(req.method === "POST") {
          const owner = await getOwner(req.query.slug[0]);
          const { id, comment } = req.body;
          const isExisted = await commentidIsExisted(id);
          if(isExisted) {
            return res.status(409).json({
              'status': 409,
              'message': 'Comment id already exist',
            });
          }
          const result  = await createComment({
            id: id,
            comment: comment,
            user_name: owner?.user_name as string,
            post_id: req.query.slug[0]
          })

          return res.status(201).json({
            'status': 201,
            'message': 'Comment is created successfully',
            'data': result
          });
        } else {
          return res.status(400).json({
            'status': 400,
            'message': 'Bad request'
          });
        }
      }
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