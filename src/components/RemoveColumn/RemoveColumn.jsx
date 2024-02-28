import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateApi } from "../../middleware/inputMiddleware";

function RemoveColumn({ dataColumnId }) {
    const dataMessage = useSelector((state) => state.input.dataMessage);
    const dataBlog = useSelector((state) => state.input.dataBlog);
    const dispatch = useDispatch();
    const handleRemove = async (e) => {
        const newDataBlog = dataBlog.filter((value, index) => {
            return value._id !== dataColumnId;
        });
        await dispatch({
            type: "data/submit",
            payload: newDataBlog,
        });
        dispatch(updateApi(dataMessage));
    };
    return (
        <div className="remove" onClick={handleRemove}>
            <i className="fa-solid fa-trash"></i>
        </div>
    );
}

export default RemoveColumn;
