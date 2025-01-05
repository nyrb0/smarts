'use client';

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Item {
    id: string;
    text: string;
}

const DraggableList: React.FC = () => {
    const [items, setItems] = useState<Item[]>([
        { id: '1', text: 'Блок 1' },
        { id: '2', text: 'Блок 2' },
        { id: '3', text: 'Блок 3' },
        { id: '4', text: 'Блок 4' },
    ]);

    const handleDragEnd = (result: DropResult): void => {
        const { source, destination } = result;

        if (!destination) {
            return; // Если элемент не был перемещен (выход за пределы)
        }

        // Если элемент не изменил позицию, ничего не делаем
        if (source.index === destination.index) {
            return;
        }

        const reorderedItems = Array.from(items);
        const [movedItem] = reorderedItems.splice(source.index, 1);
        reorderedItems.splice(destination.index, 0, movedItem);

        setItems(reorderedItems);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='droppable'>
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                            padding: '10px',
                            backgroundColor: '#f0f0f0',
                            minHeight: '200px', // Добавим минимальную высоту
                        }}
                    >
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {provided => (
                                    <div
                                        ref={provided.innerRef} // Обязательно передаем ref
                                        {...provided.draggableProps} // Обязательно передаем draggableProps
                                        {...provided.dragHandleProps} // Обязательно передаем dragHandleProps
                                        style={{
                                            padding: '10px',
                                            margin: '5px 0',
                                            backgroundColor: '#fff',
                                            border: '1px solid #ddd',
                                            cursor: 'move',
                                            ...provided.draggableProps.style, // Обязательно объединяем стили
                                        }}
                                    >
                                        {item.text}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DraggableList;
