import pool from "../src/lib/db.ts"

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


      CREATE TABLE IF NOT EXISTS foods (
        id SERIAL PRIMARY KEY,

        name VARCHAR(255) NOT NULL,

        -- Required macronutrients
        calories INT NOT NULL,
        protein DECIMAL(6,2) NOT NULL,
        carbs DECIMAL(6,2) NOT NULL,
        fat DECIMAL(6,2) NOT NULL,

        -- Optional fats
        saturated_fat DECIMAL(6,2),
        polyunsaturated_fat DECIMAL(6,2),
        monounsaturated_fat DECIMAL(6,2),
        trans_fat DECIMAL(6,2),

        -- Optional others
        fiber DECIMAL(6,2),
        sugar DECIMAL(6,2),
        sodium DECIMAL(6,2),
        cholesterol DECIMAL(6,2),
        caffeine DECIMAL(6,2),

        -- Vitamins (common ones)
        vitamin_a_iu DECIMAL(10,2),
        vitamin_c_mg DECIMAL(10,2),
        vitamin_d_iu DECIMAL(10,2),
        vitamin_e_mg DECIMAL(10,2),
        vitamin_k_mcg DECIMAL(10,2),
        thiamin_mg DECIMAL(10,2),
        riboflavin_mg DECIMAL(10,2),
        niacin_mg DECIMAL(10,2),
        vitamin_b6_mg DECIMAL(10,2),
        folate_mcg DECIMAL(10,2),
        vitamin_b12_mcg DECIMAL(10,2),
        biotin_mg DECIMAL(6,4),
        pantothenic_acid_mg DECIMAL(6,4),

        -- Minerals
        calcium_mg DECIMAL(10,2),
        iron_mg DECIMAL(10,2),
        magnesium_mg DECIMAL(10,2),
        phosphorus_mg DECIMAL(10,2),
        potassium_mg DECIMAL(10,2),
        zinc_mg DECIMAL(10,2),
        copper_mg DECIMAL(6,4),
        manganese_mg DECIMAL(6,4),
        selenium_mcg DECIMAL(10,2),

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

    // Insert foods
    await pool.query(`
    INSERT INTO foods (
      name, calories, protein, carbs, fat,
      saturated_fat, polyunsaturated_fat, monounsaturated_fat,
      fiber, sugar, sodium, cholesterol, caffeine,
      vitamin_a_iu, vitamin_c_mg, vitamin_d_iu, vitamin_e_mg,
      vitamin_k_mcg, thiamin_mg, riboflavin_mg, niacin_mg,
      vitamin_b6_mg, folate_mcg, vitamin_b12_mcg, biotin_mg,
      pantothenic_acid_mg, calcium_mg, iron_mg, magnesium_mg,
      phosphorus_mg, potassium_mg, zinc_mg, copper_mg, manganese_mg,
      selenium_mcg
    ) VALUES (
      'Coffee', 2, 0.3, 0.0, 0.0,
      NULL, NULL, NULL,
      NULL, 0.0, 5.0, 0.0, 95.0,
      0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 0.0,
      0.0, 0.0, 0.0, 0.0,
      0.0, 10.0, 0.0, 7.0,
      10.0, 116.0, 0.0, 0.0, 0.0,
      0.0
    );
    `)

    console.log("Seeding finished!")
    process.exit(0)
  } catch (err) {
    console.error("Seeding error:", err)
    process.exit(1)
  }
}

seed()
