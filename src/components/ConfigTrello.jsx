import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ConfigTrello.scss";
import { data1 } from "./dfjkas";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
    closestCorners,
    DragOverlay,
    defaultDropAnimationSideEffects,
    pointerWithin,
    rectIntersection,
    getFirstCollision,
} from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
    useSortable,
    sortableKeyboardCoordinates,
    arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import SortableColumn from "./SortableColumn";
import Message from "./Message";
import AddColumn from "./AddColumn/AddColumn";
import { changeMessageApi, updateApi } from "../middleware/inputMiddleware";
const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
    MESSAGE: "ACTIVE_DRAG_ITEM_TYPE_MESSAGE",
};
function ConfigTrello() {
    const dispatch = useDispatch();
    const dataBlog = useSelector((state) => state.input.dataBlog);
    const dataMessage = useSelector((state) => state.input.dataMessage);
    const [dataMessages, setDataMessages] = useState(dataMessage);
    const [dataColumns, setDataColumns] = useState(dataBlog);

    const [activeDragItemId, setActiveDragItemid] = useState(null);
    const [activeDragItemType, setActiveDragItemType] = useState(null);
    const [activeDragData, setActiveDragItemData] = useState(null);
    const [oldColumnWhenDraggingMessage, setOldColumnWhenDraggingMessage] =
        useState(null);

    const lastOverId = useRef(null);
    const customDropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: { active: { opacity: "0.5" } },
        }),
    };
    const dispatchAwait = async (dispatch) => {
        await dispatch;
    };
    const dispatchMiddleware = async () => {
        await dispatch(updateApi(dataMessage));
    };
    const findColumnByMessageId = (messageId) => {
        return dataColumns?.find(
            (dataColumn) =>
                dataMessages?.filter(({ _id, column }) => {
                    return _id === messageId && column === dataColumn.column;
                }).length > 0
        );
    };
    const findIndexMessage = (messageId, dataColumn) => {
        return dataMessages?.findIndex(({ _id, column }) => {
            return _id === messageId && dataColumn.column === column;
        });
    };
    const moveMessageBetweenColumnData = (
        disawait,
        overMessageId,
        overColumn,
        activeDraggingMessageId,
        activeColumn,
        over,
        active
    ) => {
        const lengthColumnMessage = dataMessages.filter(({ column }) => {
            return overColumn.column === column;
        }).length;
        const overMessageIndex = findIndexMessage(overMessageId, overColumn);

        const activeMessageIndex = findIndexMessage(
            activeDraggingMessageId,
            activeColumn
        );
        let newMessageIndex;
        const isBelowOverItem =
            active.rect.current.translated &&
            active.rect.current.translated.top >
                over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;

        newMessageIndex =
            overMessageIndex >= 0
                ? overMessageIndex + modifier
                : lengthColumnMessage + 1;

        setDataMessages((dataMessages) => {
            const [data] = dataMessages.splice(activeMessageIndex, 1);
            data.column = overColumn.column;
            dataMessages.splice(newMessageIndex, 0, data);
            if (disawait === 1) {
                dispatchAwait(
                    dispatch({
                        type: "data/message",
                        payload: dataMessages,
                    })
                );
                dispatchMiddleware(changeMessageApi());
            }
            return dataMessages;
        });
    };
    const handleDragStart = (e) => {
        setActiveDragItemid(e?.active?.id);
        setActiveDragItemType(
            e?.active?.data?.current?.columnName
                ? ACTIVE_DRAG_ITEM_TYPE.COLUMN
                : ACTIVE_DRAG_ITEM_TYPE.MESSAGE
        );
        setActiveDragItemData(e?.active?.data?.current);
        if (!e?.active?.data?.current?.columnName) {
            setOldColumnWhenDraggingMessage(
                findColumnByMessageId(e?.active?.id)
            );
        }
    };
    const handleDragOver = (e) => {
        const { active, over } = e;
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return;
        }

        if (!active || !over) {
            return;
        }
        const {
            id: activeDraggingMessageId,
            data: { current: activeDraggingMessageData },
        } = active;
        const { id: overMessageId } = over;

        const activeColumn = findColumnByMessageId(activeDraggingMessageId);
        const overColumn = over.data.current;

        // console.log("1278312783", activeColumn);
        // console.log("overColumn", overColumn);
        if (
            !activeColumn ||
            !overColumn ||
            activeColumn === -1 ||
            overColumn === -1
        ) {
            return;
        }
        // console.log(
        //     activeColumn._id !== overColumn._id,
        //     activeColumn._id,
        //     overColumn._id
        // );
        // console.log(dataMessages);
        if (activeColumn._id !== overColumn._id) {
            moveMessageBetweenColumnData(
                0,
                overMessageId,
                overColumn,
                activeDraggingMessageId,
                activeColumn,
                over,
                active
            );
        }
    };
    const handleDragEnd = function (e) {
        const { active, over } = e;

        if (!over) {
            return;
        }
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.MESSAGE) {
            const {
                id: activeDraggingMessageId,
                data: { current: activeDraggingMessageData },
            } = active;
            const { id: overMessageId } = over;

            const activeColumn = findColumnByMessageId(activeDraggingMessageId);
            const overColumn = findColumnByMessageId(overMessageId);

            if (
                !activeColumn ||
                !overColumn ||
                activeColumn === -1 ||
                overColumn === -1
            ) {
                return;
            }
            if (oldColumnWhenDraggingMessage._id !== overColumn._id) {
                moveMessageBetweenColumnData(
                    1,
                    overMessageId,
                    overColumn,
                    activeDraggingMessageId,
                    activeColumn,
                    over,
                    active
                );
            } else {
                // setDataMessages((dataMessages) => {
                //     const oldMessageIndex = dataMessages.findIndex(
                //         (data) => data._id === activeDraggingMessageId
                //     );
                //     const newMessageIndex = dataMessages.findIndex(
                //         (data) => data._id === overMessageId
                //     );
                //     let newData = arrayMove(
                //         dataMessages,
                //         oldMessageIndex,
                //         newMessageIndex
                //     );
                //     if (newMessageIndex === -1) {
                //         dispatchAwait(
                //             dispatch({
                //                 type: "data/message",
                //                 payload: newData,
                //             })
                //         );
                //         dispatchMiddleware();
                //     }
                //     if (newMessageIndex === -1) {
                //         newData = arrayMove(
                //             dataMessages,
                //             oldMessageIndex,
                //             oldMessageIndex
                //         );
                //     }
                //     return newData;
                // });
            }
        }

        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (active.id !== over.id) {
                setDataColumns((datas) => {
                    const oldIndex = datas.findIndex(
                        (data) => data._id === active.id
                    );
                    const newIndex = datas.findIndex(
                        (data) => data._id === over.id
                    );
                    if (newIndex === -1)
                        return arrayMove(datas, oldIndex, oldIndex);
                    return arrayMove(datas, oldIndex, newIndex);
                });
            }
        }

        setActiveDragItemid(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
        setOldColumnWhenDraggingMessage(null);
    };
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 500,
            },
        })
    );
    useEffect(() => {
        if (JSON.stringify(dataBlog) !== JSON.stringify(dataColumns)) {
            setDataColumns(dataBlog);
        }
        // dispatch({
        //     type: "data/submit",
        //     payload: dataColumns,
        // });
    });
    useEffect(() => {
        if (JSON.stringify(dataMessage) !== JSON.stringify(dataMessages)) {
            setDataMessages(dataMessage);
        }
    });

    const collisionDetectionStrategy = useCallback(
        (args) => {
            if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
                return closestCorners({ ...args });
            }

            const pointerIntersections = pointerWithin(args);
            if (!pointerIntersections?.length) {
                return;
            }
            const intersections = !!pointerIntersections?.length
                ? pointerIntersections
                : rectIntersection(args);
            // console.log(pointerIntersections)
            let overId = getFirstCollision(pointerIntersections, "id");
            if (overId) {
                const checkColumn = dataColumns.find(
                    (column) => column._id === overId
                );
                if (checkColumn) {
                    overId = closestCorners({
                        ...args,
                        droppableContainers: args.droppableContainers.filter(
                            (container) => {
                                return (
                                    container.id !== overId &&
                                    dataMessages.findIndex(
                                        ({ _id, column }) => {
                                            return (
                                                _id === container.id &&
                                                column === checkColumn.column
                                            );
                                        }
                                    )
                                );
                            }
                        ),
                    })[0]?.id;
                }
                lastOverId.current = overId;
                return [{ id: overId }];
            }
            return lastOverId.current ? [{ id: lastOverId.current }] : [];
        },
        [activeDragItemType, dataColumns]
    );
    return (
        <div className="container">
            <div className="columns">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    // collisionDetection={collisionDetectionStrategy}
                    // collisionDetection={pointerWithin}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={dataColumns?.map(({ _id }) => _id)}
                        strategy={horizontalListSortingStrategy}
                    >
                        {dataColumns.map((dataColumn) => {
                            return (
                                <SortableColumn
                                    dataMessages={dataMessages}
                                    key={dataColumn._id}
                                    dataColumn={dataColumn}
                                />
                            );
                        })}
                    </SortableContext>
                    <AddColumn />
                    <DragOverlay dropAnimation={customDropAnimation}>
                        {!activeDragItemType && null}
                        {activeDragItemType ===
                            ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                            <SortableColumn
                                dataColumn={activeDragData}
                            ></SortableColumn>
                        )}
                        {activeDragItemType ===
                            ACTIVE_DRAG_ITEM_TYPE.MESSAGE && (
                            <Message dataMessage={activeDragData}></Message>
                        )}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
}

export default ConfigTrello;
