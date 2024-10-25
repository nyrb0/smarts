import { NextResponse } from 'next/server';

export const DELETE = async (req: Request, res: Response) => {
    try {
        const response = await fetch('http://localhost:3000/search-store');
        const data = await response.json();

        await Promise.all(
            data.map(async (item: any) => {
                await fetch(`http://localhost:3000/search-store/${item.id}`, {
                    method: 'DELETE',
                });
            })
        );

        return NextResponse.json({ message: 'Все записи успешно удалены' }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ message: e.message || 'Произошла ошибка' }, { status: 500 });
    }
};
