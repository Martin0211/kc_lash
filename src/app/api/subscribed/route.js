import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
      const { rows } = await sql`SELECT * FROM subscribed;`;
      return NextResponse.json({ subscribers: rows }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }


export async function POST(request) {
    const body = await request.json();
    const names = body.names;
    const surname = body.surname;
    const phone_number = body.phone_number;
    const email = body.email;

    /* if (!names || !surname) {
        return NextResponse.json({ error: 'Names and surname are required' }, { status: 400 });
    }

    if (!phone_number && !email) {
        return NextResponse.json({ error: 'At least one contact method (email or phone_number) is required' }, { status: 400 });
    } */

    try {
        await sql`INSERT INTO subscribed (names, surname, phone_number, email) VALUES (${names}, ${surname}, ${phone_number}, ${email});`;
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    const pets = await sql`SELECT * FROM subscribed;`;
    return NextResponse.json({ pets }, { status: 200 });
}