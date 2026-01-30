import "dotenv/config"
import pkg from "pg"
const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

pool.on("connect", () => console.log("Connected to Postgres!"))

export default pool
