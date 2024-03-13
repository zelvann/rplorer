import { response } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { responseUnauthorized } from "./http-status-response";
import { verify } from "jsonwebtoken";

export const auth = (req: NextApiRequest, res: NextApiResponse<response>) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return responseUnauthorized(res);
  }
  const token = authorization.split(" ")[1];
  verify(token, process.env.JWT_SECRET as string, (err) => {
    if (err) {
      return responseUnauthorized(res);
    }
    return res.status(202).json({
      status: 202,
      message: "Login Success",
      token: token,
    });
  });
};
