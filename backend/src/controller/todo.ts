import { Request, Response } from "express";
import { createTodo, updateTodo } from "../zod/todo";
import { PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient();

enum StatusCode {
    Success = 200,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError = 500,
    CustomError = 411 // You can add more custom status codes if needed
}

interface RequestWithUserId extends Request {
    userId?: number;
  }

async function handlePostReq(req: RequestWithUserId, res: Response) {
    const createPayload = req.body;
    const paresedPayload = createTodo.safeParse(createPayload);
    if (!paresedPayload.success){
        res.status(StatusCode.CustomError).json({
            msg: "You sent the worng input"
        })
        return;
    }

    const userID: number = req.userId!;
    const resp= await prisma.todo.create({
        data:{
            title: createPayload.title,
            desc: createPayload.description,
            userId: userID
        }
    })
    res.status(StatusCode.Success).json({
        msg: "Todo Created"
    })
}

async function handleGetReq(req: RequestWithUserId, res: Response) {
    const todos = await prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    });
    res.status(StatusCode.Success).json({
        todos
    })
}

const handlePutReq = async (req: Request,res: Response)=>{
    const updatePayload = req.body;
    const paresedPayload = updateTodo.safeParse(updatePayload);
    if (!paresedPayload.success){
        res.status(StatusCode.CustomError).json({
            msg: "You sent the worng input"
        })
        return;
    }
    await prisma.todo.update({where:{ id: updatePayload.id}, data:{completed: true}})
    res.status(StatusCode.Success).json({
        msg: "Todo marked as completed"
    })
}

const handleDeleteReq = async(req: Request,res: Response)=>{
    const updatePayload = req.body;
    const paresedPayload = updateTodo.safeParse(updatePayload);
    if (!paresedPayload.success){
        res.status(StatusCode.CustomError).json({
            msg: "You sent the worng input"
        })
        return;
    }
    await prisma.todo.delete({where:{id: updatePayload.id}})
    res.status(StatusCode.Success).json({
        msg: "Todo marked as completed"
    })
}

export {
    handlePostReq,
    handleGetReq,
    handlePutReq,
    handleDeleteReq
}