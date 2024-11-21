import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
    try {
        const get = await fetch('http://localhost:3000/country');
        const data = await get.json();
        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
};
