import { response } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { responseAuth } from "./http-status-response";

export const auth = (req: NextApiRequest, res: NextApiResponse<response>) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return responseAuth(res, 0);
  }

  const token : string = authorization.split(" ")[1];
  verify(token, process.env.JWT_SECRET as string, (err) => {
    if (err) {
      return responseAuth(res, 0);
    } 
    return;
  });
};
