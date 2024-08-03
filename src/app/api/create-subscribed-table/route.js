import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Eliminar la tabla si existe
    await sql`DROP TABLE IF EXISTS subscribed;`;
    return NextResponse.json({ message: 'Table dropped successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  try {
    const result =
      await sql`CREATE TABLE IF NOT EXISTS subscribed (
        id SERIAL PRIMARY KEY,
        names VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        phone_number VARCHAR(255),
        email VARCHAR(255)
      );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
} */