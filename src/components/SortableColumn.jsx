import React from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AddMessage from "./AddMessage/AddMessage";
import ListMessage from "./ListMessage";
import { useSelector } from "react-redux";
import RemoveColumn from "./RemoveColumn/RemoveColumn";
import EditColumn from "./EditColumn/EditColumn";
function SortableColumn({ dataColumn, dataMessages }) {
    const listMessage = useSelector((state) => state.input.dataMessage);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: dataColumn._id, data: { ...dataColumn } });
    const style = {
        touchAction: "none",
        transition: "opacity 0.2s ease-in",
        transform: CSS.Translate.toString(transform),
        height: "100%",
        opacity: isDragging ? 0.5 : undefined,
    };
    return (
        <>
            <div ref={setNodeRef} style={style} {...attributes}>
                <div {...listeners} className="sub-column">
                    <div className="header">
                        <EditColumn
                            dataColumn={dataColumn}
                            dataColumnId={dataColumn._id}
                        />
                        <RemoveColumn dataColumnId={dataColumn._id} />
                    </div>
                    <div className="messages">
                        <ListMessage
                            dataMessages={dataMessages}
                            statusCol={dataColumn.column}
                            listMessage={listMessage}
                        />
                    </div>
                    <AddMessage
                        columnName={dataColumn.columnName}
                        statusCol={dataColumn.column}
                    />
                </div>
            </div>
        </>
    );
}

export default SortableColumn;
