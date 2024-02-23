const { sql } = require('@vercel/postgres');

async function connectToDatabase() {
  const db = await sql.connect(process.env.DATABASE_URL);

  async function seedSubscribed() {
    const createTable = await sql`
  CREATE TABLE IF NOT EXISTS subscribed (
    id SERIAL PRIMARY KEY,
    names VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255),
    email VARCHAR(255)
  );
    `

    console.log(`Created "users" table`)

    const users = await Promise.all([
      sql`
          INSERT INTO users (name, email, image)
          VALUES ('Guillermo', 'Rauch', '1234567890', 'rauchg@vercel.com')
          ON CONFLICT (email) DO NOTHING;
      `,
      sql`
          INSERT INTO users (name, email, image)
          VALUES ('Lee Robinson', '7890123456', 'lee@vercel.com')
          ON CONFLICT (email) DO NOTHING;
      `,
      sql`
          INSERT INTO users (name, email, image)
          VALUES ('Steven Tey', '0987654321', 'stey@vercel.com')
          ON CONFLICT (email) DO NOTHING;
      `,
    ])
    console.log(`Seeded ${users.length} users`)

    return {
      createTable,
      users,
    }
  }
}

module.exports = {
  seedSubscribed
};





/* import { db } from '@vercel/postgres';


export default async function handler(req, res) {
  try {
    console.log('Iniciando proceso de seeding...');

    const client = await db.connect();
    console.log('Conexión a la base de datos establecida.');

    // Ejecutar las funciones de seeding aquí
    await seedSubscribed(client);

    await client.end();
    res.status(200).json({ message: 'Seeding completed successfully' });
    console.log('Seeding finalizado con éxito.');
  } catch (error) {
    console.error('Error durante el seeding:', error);
    res.status(500).json({ message: 'Seeding failed' });
  }
}

async function seedSubscribed(client) {
  console.log('Creando tabla "Subscribed" (si no existe)...');

  await client.sql`
    CREATE TABLE IF NOT EXISTS subscribed (
      id SERIAL PRIMARY KEY,
      names VARCHAR(255) NOT NULL,
      surname VARCHAR(255) NOT NULL,
      phone_number VARCHAR(255),
      email VARCHAR(255)
    );
  `;

  console.log('Insertando datos de ejemplo en la tabla "Subscribed"...');

  const insertedSubscribers = await Promise.all([
    // Inserta cada elemento de la lista de datos de ejemplo
    client.sql`
      INSERT INTO subscribed (names, surname, phone_number, email)
      VALUES (${'John Doe'}, ${'Doe'}, ${'1234567890'}, ${'johndoe@example.com'})
    `,
    client.sql`
      INSERT INTO subscribed (names, surname, email)
      VALUES (${'Jane Doe'}, ${'Doe'}, ${null}, ${'janedoe@example.com'})
    `,
  ]);

  console.log(`Seeded ${insertedSubscribers.length} subscribers`);
} */




// const { db } = require('@vercel/postgres');
// const {
//   invoices,
//   customers,
//   revenue,
//   users,
// } = require('../app/lib/placeholder-data.js');
// const bcrypt = require('bcrypt');

// async function seedUsers(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     // Create the "users" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS users (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email TEXT NOT NULL UNIQUE,
//         password TEXT NOT NULL
//       );
//     `;

//     console.log(`Created "users" table`);

//     // Insert data into the "users" table
//     const insertedUsers = await Promise.all(
//       users.map(async (user) => {
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         return client.sql`
//         INSERT INTO users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//       }),
//     );

//     console.log(`Seeded ${insertedUsers.length} users`);

//     return {
//       createTable,
//       users: insertedUsers,
//     };
//   } catch (error) {
//     console.error('Error seeding users:', error);
//     throw error;
//   }
// }

// async function seedInvoices(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Create the "invoices" table if it doesn't exist
//     const createTable = await client.sql`
//     CREATE TABLE IF NOT EXISTS invoices (
//     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//     customer_id UUID NOT NULL,
//     amount INT NOT NULL,
//     status VARCHAR(255) NOT NULL,
//     date DATE NOT NULL
//   );
// `;

//     console.log(`Created "invoices" table`);

//     // Insert data into the "invoices" table
//     const insertedInvoices = await Promise.all(
//       invoices.map(
//         (invoice) => client.sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedInvoices.length} invoices`);

//     return {
//       createTable,
//       invoices: insertedInvoices,
//     };
//   } catch (error) {
//     console.error('Error seeding invoices:', error);
//     throw error;
//   }
// }

// async function seedCustomers(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Create the "customers" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS customers (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL,
//         image_url VARCHAR(255) NOT NULL
//       );
//     `;

//     console.log(`Created "customers" table`);

//     // Insert data into the "customers" table
//     const insertedCustomers = await Promise.all(
//       customers.map(
//         (customer) => client.sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedCustomers.length} customers`);

//     return {
//       createTable,
//       customers: insertedCustomers,
//     };
//   } catch (error) {
//     console.error('Error seeding customers:', error);
//     throw error;
//   }
// }

// async function seedRevenue(client) {
//   try {
//     // Create the "revenue" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS revenue (
//         month VARCHAR(4) NOT NULL UNIQUE,
//         revenue INT NOT NULL
//       );
//     `;

//     console.log(`Created "revenue" table`);

//     // Insert data into the "revenue" table
//     const insertedRevenue = await Promise.all(
//       revenue.map(
//         (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedRevenue.length} revenue`);

//     return {
//       createTable,
//       revenue: insertedRevenue,
//     };
//   } catch (error) {
//     console.error('Error seeding revenue:', error);
//     throw error;
//   }
// }

// async function main() {
//   const client = await db.connect();

//   await seedUsers(client);
//   await seedCustomers(client);
//   await seedInvoices(client);
//   await seedRevenue(client);

//   await client.end();
// }

// main().catch((err) => {
//   console.error(
//     'An error occurred while attempting to seed the database:',
//     err,
//   );
// });