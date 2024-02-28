import { toast } from "react-toastify";
import { app } from "../js/config/app";
import { client } from "../js/config/client";
const newDataPush = async (getState) => {
    let newData = [];
    for (var i = 0; i < getState().input.dataMessage.length; i++) {
        if (getState().input.dataMessage[i]?.hidden === true) {
            continue;
        }
        const object = await getState().input.dataBlog.find((value, index) => {
            // console.log(
            //     getState().input.dataMessage[i].column,
            //     value.column
            // );
            return getState().input.dataMessage[i].column === value.column;
        });

        if (object) {
            newData.push({
                columnName: object.columnName,
                column: getState().input.dataMessage[i].column,
                content: getState().input.dataMessage[i].content,
            });
        }
    }
    return newData;
};
export const fetchInput = () => {
    return async (dispatch, getState) => {
        const data = await app.getData("17loiten@gmail.com");
        localStorage.setItem("apiKey", JSON.stringify(data.data.apiKey));
        client.setApiKey(data.data.apiKey);
        dispatch({
            type: "input/submit",
            payload: data.data.apiKey,
        });
    };
};

export const getApiKey = () => {
    return async (dispatch, getState) => {
        const { data, res } = await client.get("/tasks");

        if (!res.ok) {
            localStorage.removeItem("apiKey");
            await dispatch({
                type: "input/submit",
                payload: "",
            });
        } else {
            await dispatch({
                type: "data/submit",
                payload: data.data.columns,
            });
            await dispatch({
                type: "data/message",
                payload: data.data.tasks,
            });
        }
    };
};

export const updateApi = (columnName, column, content, _id) => {
    return async (dispatch, getState) => {
        await dispatch({
            type: "create/id",
        });
        await dispatch({
            type: "add/task",
            payload: {
                _id,
                column,
                content,
            },
        });
        const newData = await newDataPush(getState);
        const { data, res } = await client.post("/tasks", newData);
        if (res.ok) {
            toast.success("Updated data success 🤩");
        }
    };
};

export const deleteMessageApi = (newDataMessages) => {
    return async (dispatch, getState) => {
        await dispatch({
            type: "data/message",
            payload: newDataMessages,
        });
        const newData = await newDataPush(getState);
        const { data, res } = await client.post("/tasks", newData);
        if (res.ok) {
            toast.success("Updated data success 🤩");
        }
    };
};

export const updatedMessageApi = (newDataMessages) => {
    return async (dispatch, getState) => {
        await dispatch({
            type: "data/message",
            payload: newDataMessages,
        });
        const newData = await newDataPush(getState);
        const { data, res } = await client.post("/tasks", newData);
        if (res.ok) {
            toast.success("Updated data success 🤩");
        }
    };
};

export const changeMessageApi = () => {
    return async (dispatch, getState) => {
        const newData = await newDataPush(getState);
        const { data, res } = await client.post("/tasks", newData);
        if (res.ok) {
            toast.success("Updated data success 🤩");
        }
    };
};
