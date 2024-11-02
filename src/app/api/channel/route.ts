import { NextResponse } from 'next/server';

export const GET = async (req: Request, res: Response) => {
    try {
        const fetches = await fetch('http://localhost:3000/channel');
        if (!fetches.ok) {
            return NextResponse.json({ message: 'Ошибка при получении адрессные данные' }, { status: 400 });
        }
        const data = await fetches.json();
        return NextResponse.json(data, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: e }, { status: 500 });
    }
};

export const PATCH = async (req: Request, res: Response) => {
    const request = await req.json();
    try {
        const fetches = await fetch('http://localhost:3000/channel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!fetches.ok) {
            return NextResponse.json({ message: 'Ошибка при получении адрессные данные' }, { status: 400 });
        }
        const data = await fetches.json();
        return NextResponse.json(data, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: e }, { status: 500 });
    }
};
