import { z } from "zod"


const createTodo = z.object({
    title : z.string(),
    desc : z.string()
})

const updateTodo = z.object({
    id : z.number()
})

export {
    createTodo,
    updateTodo
}