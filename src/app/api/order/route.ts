import { NextResponse } from 'next/server';

export const POST = async (req: Request, res: Response) => {
    const dat = res.json();
    try {
        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dat),
        });
    } catch (err) {
        return NextResponse.json({ message: 'Error in server' }, { status: 500 });
    }
};
export const GET = async (req: Request, res: Response) => {};
export const PUT = async (req: Request, res: Response) => {};
