import db from "@/config/init";
import { user } from "@prisma/client";

export const createUser = (attribute: user) => {
  return db.user.create({
    data: {
      username: attribute.username,
      firstname: attribute.firstname,
      lastname: attribute.lastname,
      bio: attribute.bio,
      password: attribute.password
    }
  });
};