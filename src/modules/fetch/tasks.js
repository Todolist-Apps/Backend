import { instance } from "../axios/index.js";
import Swal from "sweetalert2";


async function getAllTask() {
    try {
        const response = await instance.get("/tasks");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getTaskDetail(id,) {
    try {
        const response = await instance.get(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong")
    }
}

async function createNewTask(data) {
    try {
        const response = await instance.post("/tasks", data)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteTaskById(id) {
    try {
        const response = await instance.delete(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editTask(id, data) {
    try {
        const response = await instance.put(`/tasks/${id}`, { ...data });
        Swal.fire({
            position: "middle",
            icon: "success",
            title: "Update Profile Successfully.",
            showConfirmButton: false,
            timer: 1500
          });
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message || "Something went wrong"
          });
    }
}

export {
    getAllTask,
    createNewTask,
    deleteTaskById,
    editTask,
    getTaskDetail
}