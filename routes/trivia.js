const pool = require("../db");
const router = require("express").Router();

// GET all or filter by category
router.get("/", async (req, res) => {
    try {
        let sql = "SELECT id, category, text AS question, answer1, answer2, answer3, answer4 FROM question";
        const params = [];

        if (req.query.category) {
            sql += " WHERE category = ?";
            params.push(req.query.category);
        } 
        const [rows] = await pool.query(sql, params);
        res.status(200).json(rows);
    } catch (ex) {
        res.status(418).json({ error: ex.message });
    }
});

// GET by ID
router.get(":id", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id, category, text AS question, answer1, answer2, answer3, answer4 FROM question WHERE id = ?", [req.params.id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(rows[0]);
    } catch (ex) {
        res.status(418).json({ message: "Database error" });
    }
});

// POST a new question
router.post("/", async (req, res) => {
    const { category, question, answers } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO question (category, text, answer1, answer2, answer3, answer4) VALUES (?, ?, ?, ?, ?, ?)",
            [category, question, answers.answer1, answers.answer2, answers.answer3, answers.answer4]
        );
        
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (ex) {
        res.status(418).json({ error: ex.message });
    }
});

// PUT (Update) a question
router.put(":id", async (req, res) => {
    const { category, question, answers } = req.body;
    try {
        const [rows] = await pool.query("SELECT id, category, text AS question, answer1, answer2, answer3, answer4 FROM question WHERE id = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: "Question not found" });

        const updatedCategory = category || rows[0].category;
        const updatedQuestion = question || rows[0].question;
        const updatedAnswer1 = answers?.answer1 || rows[0].answer1;
        const updatedAnswer2 = answers?.answer2 || rows[0].answer2;
        const updatedAnswer3 = answers?.answer3 || rows[0].answer3;
        const updatedAnswer4 = answers?.answer4 || rows[0].answer4;

        await pool.query(
            "UPDATE question SET category = ?, text = ?, answer1 = ?, answer2 = ?, answer3 = ?, answer4 = ? WHERE id = ?",
            [updatedCategory, updatedQuestion, updatedAnswer1, updatedAnswer2, updatedAnswer3, updatedAnswer4, req.params.id]
        );

        res.sendStatus(204);
    } catch (ex) {
        res.status(418).json({ error: ex.message });
    }
});

// DELETE a question
router.delete(":id", async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM question WHERE id = ?", [req.params.id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.sendStatus(204);
    } catch (ex) {
        res.status(418).json({ error: ex.message });
    }
});
module.exports = router;