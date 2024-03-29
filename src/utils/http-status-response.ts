import { response } from "@/types";
import { NextApiResponse } from "next";

export const responseConflict = (res: NextApiResponse<response>, id: string, flag: boolean) => {
  return res.status(409).json({
    'status': 409,
    'message': id + (flag ? " already exist" : " does not exist in the database")
  });
};

export const responseCreated = (res: NextApiResponse<response>, id: string, flag: number, data: any) => {
  return res.status(201).json({
    'status': 201,
    'message': id + ' is ' + (flag == 0 ? "created" : (flag == 1 ? "updated" : (flag == 2 ? "deleted" : (flag === 3 ? "liked" : "unliked")))) + ' successfully',
    'data': data
  });
};

export const responseAccepted = (res: NextApiResponse<response>, flag: boolean, data?: any) => {
  return res.status(202).json({
    'status': 202,
    'message': (flag ? "Login successfully" : "Data retrieved" ),
    'data': data
  });
};

export const responseBadRequest = (res: NextApiResponse<response>) => {
  return res.status(400).json({
    'status': 400,
    'message': 'Bad request'
  });
};

export const responseInternalServerError = (res: NextApiResponse<response>, error: any) => {
  return res.status(500).json({
    'status': 500,
    'message': 'Unexpected error',
    'error_info': error
  });
}

export const responseAuth = (res: NextApiResponse<response>, flag: number) => {
  return res.status(401).json({
    'status': 401,
    'message': (flag === 0 ? "Invalid token" : "Invalid credentials")
  });
}