import { NextResponse } from 'next/server';

export const GET = async (req: Request, { params: { id } }: { params: { id: string } }) => {
    try {
        const data = await fetch(`http://localhost:3000/address/${id}`);
        const json = await data.json();
        return NextResponse.json(json, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 400 });
    }
};

export const PUT = async (req: Request, { params: { id } }: { params: { id: string } }) => {
    try {
        const body = await req.json();
        const data = await fetch(`http://localhost:3000/address/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const json = await data.json();
        return NextResponse.json(json, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 400 });
    }
};

export const POST = async (req: Request, { params: { id } }: { params: { id: string } }) => {
    try {
        const body = await req.json();
        const data = await fetch(`http://localhost:3000/address/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const json = await data.json();
        return NextResponse.json(json, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 400 });
    }
};

export const PATCH = async (req: Request, { params: { id } }: { params: { id: string } }) => {
    try {
        const body = await req.json();
        const data = await fetch(`http://localhost:3000/address/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const json = await data.json();
        return NextResponse.json(json, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 400 });
    }
};
