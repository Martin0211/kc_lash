import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

const setNoCacheHeaders = (response) => {
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  return response;
};

export async function GET(request) {
  console.log('Request method:', request.method);
  console.log('Request URL:', request.url);

  try {
    const { rows } = await sql`SELECT * FROM subscribed;`;
    let response = NextResponse.json({ subscribers: rows }, { status: 200 });
    response = setNoCacheHeaders(response);
    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request) {
  console.log('Request method:', request.method);
  console.log('Request URL:', request.url);

  const body = await request.json();
  const { names, surname, phone_number, email } = body;

  if (!names || !surname) {
    return NextResponse.json({ error: 'Names and surname are required' }, { status: 400 });
  }

  if (!phone_number && !email) {
    return NextResponse.json({ error: 'At least one contact method (email or phone_number) is required' }, { status: 400 });
  }

  try {
    await sql`INSERT INTO subscribed (names, surname, phone_number, email) VALUES (${names}, ${surname}, ${phone_number}, ${email});`;
    const { rows } = await sql`SELECT * FROM subscribed ORDER BY id DESC LIMIT 1;`;
    const response = NextResponse.json({ subscriber: rows[0] }, { status: 200 });
    return setNoCacheHeaders(response);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PUT(request) {
  console.log('Request method:', request.method);
  console.log('Request URL:', request.url);

  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const body = await request.json();
  const { names, surname, phone_number, email } = body;

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await sql`
      UPDATE subscribed
      SET names = ${names},
          surname = ${surname},
          phone_number = ${phone_number},
          email = ${email}
      WHERE id = ${id};
    `;
    const response = NextResponse.json({ message: 'Subscriber updated successfully' }, { status: 200 });
    return setNoCacheHeaders(response);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request) {
  console.log('Request method:', request.method);
  console.log('Request URL:', request.url);

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await sql`DELETE FROM subscribed WHERE id = ${id}`;
    const response = NextResponse.json({ message: 'Subscriber deleted successfully' }, { status: 200 });
    return setNoCacheHeaders(response);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
