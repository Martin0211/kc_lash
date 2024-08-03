import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Eliminar esta línea:
    // const result = await sql`CREATE TABLE IF NOT EXISTS subscribed (
    //   id SERIAL PRIMARY KEY,
    //   names VARCHAR(255) NOT NULL,
    //   surname VARCHAR(255) NOT NULL,
    //   phone_number VARCHAR(255),
    //   email VARCHAR(255)
    // );`;

    // Resto de tu código
    return NextResponse.json({ message: 'Table creation prevented' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
