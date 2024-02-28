import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { forwardRef, memo, useLayoutEffect } from "react";
import "./ConfigTrello.scss";
import DeleteMessage from "./DeleteMessage/DeleteMessage";
import EditMessage from "./EditMessage/EditMessage";

function Message({ dataMessage, messageHidden }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: dataMessage._id, data: { ...dataMessage } });
    const style = {
        transition: "opacity 0.5s linear",
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.4 : 1,
        border: isDragging ? "2px solid tomato" : undefined,
        height: "93px",
        boxSizing: "border-box",
        display: messageHidden ? "none" : "block",
        // visibility: messageHidden ? "hidden" : "visible",
        // display: checkHidden ? "none" : "block",
    };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            style={style}
            {...attributes}
            className="message"
        >
            <EditMessage dataMessageId={dataMessage._id}>
                {dataMessage.content}
            </EditMessage>
            <DeleteMessage dataMessageId={dataMessage._id} />
        </div>
    );
}

export default memo(Message);
