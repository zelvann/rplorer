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
  return db.user.findUniqueOrThrow({
    where: {
      username: user
    }
  });
};