import { Router } from "express";
import { handleDeleteReq, handleGetReq, handlePostReq, handlePutReq } from "../controller/todo";
import authMiddleware from "../middleware/authmiddleware";

const router = Router();

router.post("/", authMiddleware, handlePostReq)

router.get("/todos", handleGetReq)

router.put("/completed", handlePutReq)

router.delete("/delete", handleDeleteReq)



export default router;