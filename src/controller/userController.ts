import { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Hello from the server side!",
  });
};

export default { getUser };
