import express from "express"
import db from "../db.js"

const router = express.Router()

// Get all todos for logged-in user
router.get("/", (req, res) => {
    const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
    const todos = getTodos.all(req.userId)
    res.json({ todos })
    // new stuff
    try {
        const query = `
            SELECT 
                t.*,
                l.id AS label_id,
                l.name AS label_name,
                l.color_hex AS label_color
            FROM todos t
            LEFT JOIN todo_labels tl ON t.id = tl.todo_id
            LEFT JOIN labels l ON tl.label_id = l.id
            WHERE t.user_id = ?
            ORDER BY t.created_at DESC
        `;
        const stmt = db.prepare(query);
        const rows = stmt.all(req.userId);
        // ...rest is the same
})

// Create a new todo
router.post("/", (req, res) => {})

// Update a todo
router.put("/:id", (req, res) => {})

// Delete a todo
router.delete("/:id", (req, res) => {})

export default router