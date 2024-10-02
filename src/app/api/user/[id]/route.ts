import { NextResponse } from 'next/server';

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const { saved, user } = await req.json();
    const { id } = params;
    if (!id) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const res = await fetch(`http://localhost:3000/user/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: saved ? JSON.stringify({ saved }) : JSON.stringify(user),
        });
        return NextResponse.json({ res }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
};
