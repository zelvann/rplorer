import db from "@/config/init";

export const postisLiked = (postID: string, username: string) => {
  return db.like.findFirst({
    where: {
      post_id: postID,
      user_name: username
    }
  });
};

export const getUsername = (user: string) => {
  return db.user.findFirst({
    where: {
      username: user
    },
  });
};

export const postidIsExisted = (postID: string) => {
  return db.post.findFirst({
    where: {
      id: postID
    }
  });
};