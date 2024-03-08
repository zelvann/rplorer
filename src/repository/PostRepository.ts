import db from "@/config/init";
import { post } from "@/model";
import { comment, like } from "@prisma/client";

export const createPost = (attribute: post) => {
  return db.post.create({
    data: {
      id: attribute.id as string,
      image_path: attribute.image_path,
      caption: attribute.caption,
      user_name: attribute.user_name
    }
  });
};

export const getPost = (userID: string) => {
  return db.post.findMany({
    where: {
      user_name: userID
    },
    select: {
      user_name: userID ? false : true,
      id: true,
      image_path: true
    }
  });
};

export const detailPost = (postID: string) => {
  return db.post.findFirst({
    select: {
      user_name: true,
      image_path: true,
      caption: true,
      likes: true,
      comment: {
        select: {
          user_name: true,
          comment: true
        }
      },
      created_at: true,
    },
    where: {
      id: postID
    }
  });
};

export const updatePost = (postID: string,attribute: post) => {
  return db.post.update({
    data: {
      image_path: attribute.image_path,
      caption: attribute.caption,
      user_name: attribute.user_name
    },
    where: {
      id: postID
    }
  })
}
export const deletePost = (postID: string) => {
  return db.post.delete({
    where: {
      id: postID
    }
  });
};

export const createComment = (attribute: comment) => {
  return db.comment.create({
    data: {
      id: attribute.id,
      comment: attribute.comment,
      post_id: attribute.post_id,
      user_name: attribute.user_name
    }
  });
};

export const like_transaction = (attribute: like) => {
  return db.$transaction([
    db.post.update({
      data: {
        likes: {
          increment: 1
        }
      },
      where: {
        id: attribute.post_id
      }
    }),
    db.like.create({
      data: {
        id: attribute.id,
        user_name: attribute.user_name,
        post_id: attribute.post_id
      }
    })
  ]);
};

export const unlike = (postID: string,username: string) => {
  return db.$transaction([
    db.post.update({
      data: {
        likes: {
          decrement: 1
        }
      },
      where: {
        id: postID
      }
    }),
    // exactly one
    db.like.deleteMany({
      where: {
        user_name: username,
        post_id: postID
      }
    })
  ]);
};

export const getOwner = (postID: string) => {
  return db.post.findFirst({
    select: {
      user_name: true
    },
    where: {
      id: postID
    }
  });
};