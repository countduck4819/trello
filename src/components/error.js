import React, { useState } from "react";
import "./ConfigTrello.scss";
import { data1 } from "./dfjkas";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
    useSortable,
    sortableKeyboardCoordinates,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const SortableColumn = ({ subdata }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: subdata._id });
    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="sub-column"
        >
            <div className="header">
                <div className="title">{subdata.columnName}</div>
                <div className="remove">
                    <i className="fa-solid fa-trash"></i>
                </div>
            </div>
            <div className="messages">
                <div className="message">
                    <div className="content-text">Do homework</div>
                    <div className="remove">
                        <i className="fa-solid fa-trash"></i>
                    </div>
                </div>
                <div className="message">
                    <div className="content-text">Do homework</div>
                    <div className="remove">
                        <i className="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
            <div className="footer">
                <span></span>
                <div>Add task</div>
            </div>
        </div>
    );
};
function ConfigTrello() {
    const [data, setData] = useState(data1);
    const onDragEnd = function (e) {
        const { active, over } = e;
        if (active.id === over.id) {
            return;
        }
        setData((datas) => {
            const oldIndex = datas.findIndex((data) => data._id === active.id);
            const newIndex = datas.findIndex((data) => data._id === over.id);
            return arrayMove(datas, oldIndex, newIndex);
        });
    };
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    return (
        <div className="container">
            <div className="columns">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={onDragEnd}
                >
                    <SortableContext
                        items={data}
                        strategy={horizontalListSortingStrategy}
                    >
                        {data.map((subdata) => {
                            return (
                                <SortableColumn
                                    key={subdata._id}
                                    subdata={subdata}
                                />
                            );
                        })}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
}

export default ConfigTrello;
