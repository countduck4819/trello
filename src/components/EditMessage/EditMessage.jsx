import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatedMessageApi } from "../../middleware/inputMiddleware";

function EditMessage({ children, dataMessageId }) {
    const dataMessage = useSelector((state) => state.input.dataMessage);
    const dispatch = useDispatch();
    const [check, setCheck] = useState(false);
    const [content, setContent] = useState(children);
    const handleDoubleClick = (e) => {
        setCheck(true);
    };

    const handleClick = async () => {
        const newDataMessages = dataMessage.map((value, index) => {
            if (value._id === dataMessageId) {
                value.content = content;
                return value;
            }
            return value;
        });
        await dispatch(updatedMessageApi(newDataMessages));
        setCheck((check) => !check);
    };

    const handleCancelClick = () => {
        setCheck(false);
        setContent(children);
    };
    return (
        <>
            {check ? (
                <div className="change">
                    <input
                        value={content}
                        type="text"
                        className="input-message"
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    />
                    <div className="action">
                        <button
                            className="change-content"
                            onClick={handleClick}
                        >
                            Add
                        </button>
                        <button className="cancel" onClick={handleCancelClick}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="content-text" onDoubleClick={handleDoubleClick}>
                    {content}
                </div>
            )}
        </>
    );
}

export default EditMessage;

// const clickOver = async (e) => {
//     if (
//  //    !e.target.classList.contains("message") &&
//      //  !e.target.classList.contains("input-message")
//     ) {
//         const newDataMessages = dataMessage.map((value, index) => {
//             console.log(value._id === dataMessageId, value._id, dataMessageId);
//             if (value._id === dataMessageId) {
//                 value.content = document.querySelector(".input-message").value;
//                 console.log(value, content);
//                 return value;
//             }
//             return value;
//         });
//         console.log(newDataMessages);
//         await dispatch(updatedMessageApi(newDataMessages));
//         document.removeEventListener("click", clickOver);
//         setCheck((check) => !check);
//     }
// };
// useEffect(() => {
//     if (check === true) {
//         document.addEventListener("click", clickOver);
//     }
// }, [check]);
