/**
 * 404 Not Found Route Handler for API
 *
 * Returns 404 status code for non-existent API routes.
 */
import type { Request, Response } from "express";

export const handleNotFound = (req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested API endpoint was not found",
    path: req.path,
    statusCode: 404,
  });
};
