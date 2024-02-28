import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
function AddColumn() {
    const id = useSelector((state) => state.input.id);
    const dispatch = useDispatch();
    const handleClick = async (e) => {
        await dispatch({
            type: "add/column",
            payload: {
                _id: id,
                column: uuidv4(),
                columnName: `Column ${id}`,
            },
        });
        
        await dispatch({
            type: "create/id",
        });
    };
    return (
        <div className="add-column" onClick={handleClick}>
            <span>+</span>
            <div>Add task</div>
        </div>
    );
}

export default AddColumn;
