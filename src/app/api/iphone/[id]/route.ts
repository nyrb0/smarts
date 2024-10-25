import { NextResponse } from 'next/server';

const GET = async (req: Request, { params: { id } }: { params: { id: string } }) => {
    try {
        const res = await fetch(`http://localhost:3000/iphone/${id}`);
    } catch {
        return NextResponse.json({ message: 'Error id phone' });
    }
};
