const pool = require("../db");

class PostgresRepository {
    async getAll() {
        const result = await pool.query("SELECT * FROM tasks ORDER BY id");
        return result.rows;
    }

    async getById(id) {
        const result = await pool.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );

        return result.rows[0] || null;
    }

    async create(title) {
        const result = await pool.query(
            "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
            [title]
        );

        return result.rows[0];
    }

    async update(id, data) {
        const task = await this.getById(id);

        if (!task) {
            return null;
        }

        const title = data.title ?? task.title;
        const done = data.done ?? task.done;

        const result = await pool.query(
            "UPDATE tasks SET title = $1, done = $2 WHERE id = $3 RETURNING *",
            [title, done, id]
        );

        return result.rows[0];
    }

    async delete(id) {
        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1",
            [id]
        );

        return result.rowCount > 0;
    }
}

module.exports = PostgresRepository;