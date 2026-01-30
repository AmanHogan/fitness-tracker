import pool from "../src/lib/db.js"

async function seed() {
  try {
    console.log("Seeding database...")

    // Create tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS logs (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        food VARCHAR(255) NOT NULL,
        calories INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `)

    // Insert users
    await pool.query(`
      INSERT INTO users (email, password)
      VALUES 
        ('aman@example.com', 'hashedpassword1'),
        ('jane@example.com', 'hashedpassword2')
      ON CONFLICT DO NOTHING;
    `)

    // Insert logs
    await pool.query(`
      INSERT INTO logs (user_id, food, calories)
      VALUES 
        (1, 'Apple', 95),
        (1, 'Banana', 105),
        (2, 'Salad', 150)
      ON CONFLICT DO NOTHING;
    `)

    console.log("Seeding finished!")
    process.exit(0)
  } catch (err) {
    console.error("Seeding error:", err)
    process.exit(1)
  }
}

seed()
