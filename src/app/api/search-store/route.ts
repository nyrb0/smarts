import { NextResponse } from 'next/server';

export const GET = async (req: Request, res: Response) => {
    try {
        const res = await fetch('http://localhost:3000/search-store');
        if (!res.ok) return NextResponse.json({ message: 'Error getting search story' });
        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: e }, { status: 500 });
    }
};

export const POST = (req: Request, res: Response) => {};
export const DELETE = (req: Request, res: Response) => {};
