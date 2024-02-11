import { Router } from "express";
import authMiddleware from "../middleware/authmiddleware";
import { handleGetUserreq, handleModifyReq, handleSignInReq, handleSignUpReq } from "../controller/user";

const router = Router();

router.get("/get",authMiddleware, handleGetUserreq);
router.post("/signup", handleSignUpReq);
router.post("/signup", handleSignInReq);
router.post("/update", authMiddleware, handleModifyReq)



export default router;