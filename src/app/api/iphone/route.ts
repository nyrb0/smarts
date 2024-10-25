import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
    try {
        const res = await fetch('http://localhost:3000/iphone');
        const data = await res.json();

        if (!res.ok) throw new Error('Error in phone api');

        return NextResponse.json(data, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: 'Error phone' }, { status: 500 });
    }
};
