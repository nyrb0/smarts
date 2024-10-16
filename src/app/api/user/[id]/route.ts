import { NextResponse } from 'next/server';

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    // const { saved, user } = await req.json();
    const updateData = await req.json();
    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const data = await fetch(`http://localhost:3000/user/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });
        return NextResponse.json({ data }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
};

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    try {
        const data = await fetch(`http://localhost:3000/user/${id}`);
        if (!data.ok) {
            const errorData = await data.json();
            return NextResponse.json({ message: errorData.message || 'Failed to fetch user' }, { status: data.status });
        }
        const userData = await data.json();
        return NextResponse.json(userData, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
};

export const POST = async (req: Request, { params }: { params: { id: string } }) => {
    // const { saved, user } = await req.json();
    const updateData = await req.json();
    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const data = await fetch(`http://localhost:3000/user/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });
        return NextResponse.json({ data }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
};

// body: saved ? JSON.stringify({ saved }) : JSON.stringify(user),
