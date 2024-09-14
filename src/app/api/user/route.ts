import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { userName, name, lastName, password } = await req.json();
    if (!userName || !name || !password) {
        return NextResponse.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }
    const obj = {
        name,
        lastName,
        password,
        userName,
    };
    try {
        const fetching = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });
        const data = await fetching.json();
        return NextResponse.json({ data }, { status: 201 });
    } catch (err) {
        return NextResponse.json(
            { message: 'Server Error', err },
            { status: 500 }
        );
    }
}
export async function GET(req: Request) {
    try {
        const fetching = await fetch('http://localhost:3000/user', {
            method: 'GET',
        });
        const data = await fetching.json();
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(
            { message: 'The Error:', err },
            { status: 200 }
        );
    }
}
