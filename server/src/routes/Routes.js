import express from "express";

const router = express.Router();


import * as todoController from "../controllers/todoController.js";


// create
router.post("/createTodo", todoController.createTodo);

// read
router.get("/getTodos", todoController.getTodos);

// update
router.put("/updateTodo", todoController.updateTodo);

// delete
router.delete("/deleteTodo", todoController.deleteTodo);


export default router;

