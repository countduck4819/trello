import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateApi } from "../../middleware/inputMiddleware";

function EditColumn({ dataColumn, dataColumnId }) {
    const [check, setCheck] = useState(false);
    const [columnName, setColumnName] = useState(dataColumn.columnName);
    const dispatch = useDispatch();
    const dataBlog = useSelector((state) => state.input.dataBlog);
    const dataMessage = useSelector((state) => state.input.dataMessage);
    const handleDoubleClick = (e) => {
        e.preventDefault();
        setCheck(true);
        async function overClick(e) {
            if (
                !e.target.classList.contains("edit-column") &&
                !e.target.classList.contains("input-edit-column")
            ) {
                const inputValue = document.querySelector(".input-edit-column");
                if (inputValue.value !== dataColumn.columnName) {
                    const newDataBlog = dataBlog.map((value, index) => {
                        if (value._id === dataColumnId) {
                            value.columnName = inputValue.value;
                            return value;
                        }
                        return value;
                    });
                    await dispatch({
                        type: "data/submit",
                        payload: newDataBlog,
                    });
                    await dispatch(updateApi(dataMessage));
                }
                setCheck(false);

                window.removeEventListener("click", overClick);
            }
        }
        window.addEventListener("click", overClick);
    };
    return (
        <>
            <div className="edit-column">
                {check ? (
                    <input
                        value={columnName}
                        className="input-edit-column"
                        type="text"
                        onChange={(e) => {
                            setColumnName(e.target.value);
                        }}
                    />
                ) : (
                    <div
                        className="title"
                        onClick={(e) => e.preventDefault()}
                        onDoubleClick={handleDoubleClick}
                    >
                        {columnName}
                    </div>
                )}
            </div>
        </>
    );
}

export default EditColumn;

// const dataBlog = useSelector((state) => state.input.dataBlog);
//     const dataMessage = useSelector((state) => state.input.dataMessage)
//     const dispatch = useDispatch();
