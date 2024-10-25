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

export const POST = async (req: Request, res: Response) => {
    try {
        const data = await req.json();
        const response = await fetch('http://localhost:3000/search-store');
        if (!response.ok) {
            throw new Error('Ошибка при получении данных с сервера.');
        }
        const existingData = await response.json();
        const isDuplicate = Array.isArray(existingData) && existingData.some((item: any) => item.name === data.name);
        if (isDuplicate) {
            return NextResponse.json({ message: 'Дубликат найден' }, { status: 400 });
        }
        const postResponse = await fetch('http://localhost:3000/search-store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!postResponse.ok) {
            throw new Error('Ошибка при сохранении данных на сервере.');
        }
        const json = await postResponse.json();
        return NextResponse.json(json, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ message: e.message || 'Произошла ошибка' }, { status: 500 });
    }
};

export const DELETE = (req: Request, res: Response) => {};
