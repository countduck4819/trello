import { client } from "./client";

export const app = {
    getData: async function (email) {
        const { res, data } = await client.get(`/api-key?email=${email}`);
        if (!res.ok) {
            throw new Error("Khong the dang nhap");
        }
        // console.log(data);
        return data;
    },
};
