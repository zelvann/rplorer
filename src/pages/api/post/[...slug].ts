import { response } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { post } from "@/model";
import { commentidIsExisted, likeidIsExisted, postidIsExisted, postisLiked } from "@/repository/AuthRepository";
import { createComment, deletePost, detailPost, getOwner, like_transaction, unlike, updatePost } from "@/repository/PostRepository";
import { responseAccepted, responseBadRequest, responseConflict, responseCreated, responseInternalServerError } from "@/utils/http-status-response";

const handler = async (req: NextApiRequest, res: NextApiResponse<response>) : Promise<void> => {
  try {
    if(req.query.slug) {
      const isPostIDExisted = await postidIsExisted(req.query.slug[0]);
      if(!isPostIDExisted) {
        return responseConflict(res, 'PostID', false);
      }

      if(req.query.slug.length === 1) {
        const { edit, del, like} = req.query;
        if(req.method === "GET" && (!del && !edit)) {
          const result = await detailPost(req.query.slug[0]);
          return responseAccepted(res, result);
        }

        else if(req.method === "DELETE" && del === "true") {
          const result = await deletePost(req.query.slug[0]);
          return responseCreated(res, 'Post', 2, result);
        }

        else if(req.method === "PUT" && edit === "true") {
          const attribute : post = req.body;
          const result = await updatePost(req.query.slug[0], attribute);
          return responseCreated(res, 'Post', 1, result);
        } 

        else if(req.method === "POST" && like === "true") {
          const owner = await getOwner(req.query.slug[0]);
          const isLiked = await postisLiked(req.query.slug[0], owner?.user_name as string);
          if(isLiked) {
            const result = await unlike(req.query.slug[0], owner?.user_name as string);
            return responseCreated(res, 'Post', 4, result);
          } 

          const { id } : { id: string } = req.body;
          const isLikeIDExisted = await likeidIsExisted(id);
          if(isLikeIDExisted) {
            return responseConflict(res, 'LikeID', true);
          }

          const result = await like_transaction({
            id: id,
            user_name: owner?.user_name as string,
            post_id: req.query.slug[0]
          })
          return responseCreated(res, 'Post', 3, result);
        } else {
          return responseBadRequest(res);
        }
      }

      else if(req.method === "POST" && req.query.slug.length === 2 && req.query.slug[1] === "comment") {
        const owner = await getOwner(req.query.slug[0]);
        const { id, comment } = req.body;

        const isCommentIDExisted = await commentidIsExisted(id);
        if(isCommentIDExisted) {
          return responseConflict(res, 'CommentID', true);
        }
        
        const result  = await createComment({
          id: id,
          comment: comment,
          user_name: owner?.user_name as string,
          post_id: req.query.slug[0]
        })
        return responseCreated(res, 'Comment', 0, result);
      } else {
        return responseBadRequest(res);
      }
    }
  } catch (error) {
    return responseInternalServerError(res, error);
  }
} 

export default handler;