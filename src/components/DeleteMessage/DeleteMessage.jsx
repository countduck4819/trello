import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessageApi } from "../../middleware/inputMiddleware";

function DeleteMessage({ dataMessageId }) {
    const dataMessages = useSelector((state) => state.input.dataMessage);
    const dispatch = useDispatch();
    const handleClick = (e) => {
        const newDataMessages = dataMessages.filter(({ _id }, index) => {
            return _id !== dataMessageId;
        });
        dispatch(deleteMessageApi(newDataMessages));
    };
    return (
        <div className="remove" onClick={handleClick}>
            <i className="fa-solid fa-trash"></i>
        </div>
    );
}

export default memo(DeleteMessage);
