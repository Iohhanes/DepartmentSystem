import {createAsyncThunk, createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import axios from "../../utils/department-api"
import {PageRequest} from "../../model/page-request.model";
import {DataState} from "../../model/data-state.model";
import {DeleteEntitiesRequest} from "../../model/delete-entities-request.model";
import {Student} from "../../model/student/student.model";
import {AddStudentRequest} from "../../model/student/add-student-request.model";
import {UploadDataRequest} from "../../model/upload-data-request.model";
import {UploadStatus} from "../../model/upload-status.model";
import {EditStudentRequest} from "../../model/student/edit-student-request.model";
import {DEFAULT_PAGE_SIZE} from "../../utils/constants.utils";

interface StudentsState extends DataState<Student> {
    uploadStatus: UploadStatus;
}

const initialState: StudentsState = {
    loadingOnAdd: false,
    loading: false,
    loadingOnEdit: false,
    totalCount: 0,
    uploadStatus: UploadStatus.NO_UPLOADING
};

export const loadStudents = createAsyncThunk("loadStudents", async (requestData: PageRequest) => {
    const {data} = await axios.get<Student[]>(`/students/page/${requestData.page}/count/${requestData.count}`);
    return data;
});

export const addStudent = createAsyncThunk("addStudent", async (requestData: AddStudentRequest) => {
    await axios.post("/students/add", requestData);
});

export const editStudent = createAsyncThunk("editStudent", async (requestData: EditStudentRequest) => {
    await axios.post(`/students/${requestData.id}/edit`, {
        lastName: requestData.lastName,
        firstName: requestData.firstName,
        middleName: requestData.middleName,
        birthDate: requestData.birthDate,
        phone: requestData.phone,
        email: requestData.email,
        groupId: requestData.groupId
    });
});

export const loadStudent = createAsyncThunk("loadStudent", async (id: string) => {
    const {data} = await axios.get<Student>(`/students/${id}`);
    return data;
});

export const deleteStudents = createAsyncThunk("deleteStudents", async (requestData: DeleteEntitiesRequest) => {
    const {data} = await axios.post<Student[]>("/students/delete", requestData);
    const countResponse = await axios.get<number>("/students/count");
    return {data: data, count: countResponse.data};
});

export const uploadStudentData = createAsyncThunk("uploadStudentData", async (requestData: UploadDataRequest) => {
    let formData = new FormData();
    formData.append("file", requestData.file);
    const {data} = await axios.post<Student[]>("/students/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    const countResponse = await axios.get<number>("/students/count");
    return {data: data, count: countResponse.data};
})

export const loadCount = createAsyncThunk("loadTotalCount", async () => {
    const {data} = await axios.get<number>("/students/count");
    return data;
});

const slice = createSlice({
    name: "students",
    initialState,
    reducers: {
        setUploadStatus: (state, action: PayloadAction<UploadStatus>) => {
            state.uploadStatus = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(uploadStudentData.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.totalCount = action.payload.count;
            state.loading = false;
            state.uploadStatus = UploadStatus.SUCCESS
        })
        builder.addCase(uploadStudentData.rejected, (state) => {
            state.loading = false;
            state.uploadStatus = UploadStatus.ERROR
        })
        builder.addCase(uploadStudentData.pending, (state) => {
            state.loading = true;
            state.uploadStatus = UploadStatus.PENDING
        })
        builder.addCase(loadStudent.fulfilled, (state, action) => {
            state.current = action.payload;
            state.loadingOnEdit = false;
        });
        builder.addCase(loadCount.fulfilled, (state, action) => {
            state.totalCount = action.payload;
        })
        builder.addCase(loadCount.rejected, (state) => {
            state.totalCount = DEFAULT_PAGE_SIZE;
        });
        builder.addCase(addStudent.fulfilled, (state => {
            ++state.totalCount;
            window.location.pathname = "/students";
        }))
        builder.addCase(editStudent.fulfilled, () => {
                window.location.pathname = "/students";
            }
        );
        builder.addCase(deleteStudents.fulfilled, (state, action) => {
            state.data = action.payload.data;
            state.totalCount = action.payload.count;
            state.loading = false;
        });
        builder.addCase(loadStudents.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            }
        );
        builder.addMatcher(
            isAnyOf(loadStudents.pending, loadStudents.rejected, deleteStudents.pending, deleteStudents.rejected),
            state => {
                state.loading = true;
            }
        );
        builder.addMatcher(
            isAnyOf(loadStudent.rejected, loadStudent.pending, editStudent.pending, editStudent.rejected),
            state => {
                state.loadingOnEdit = true;
            }
        );
        builder.addMatcher(
            isAnyOf(addStudent.pending, addStudent.rejected), (state) => {
                state.loadingOnAdd = true;
            });
    }
});

export const {setUploadStatus} = slice.actions;

export const selectStudents = (state: RootState) => state.students.data;
export const selectLoading = (state: RootState) => state.students.loading;
export const selectCurrentStudent = (state: RootState) => state.students.current;
export const selectLoadingOnEdit = (state: RootState) => state.students.loadingOnEdit;
export const selectLoadingOnAdd = (state: RootState) => state.students.loadingOnAdd;
export const selectUploadStatus = (state: RootState) => state.students.uploadStatus;
export const selectTotalCount = (state: RootState) => state.students.totalCount;

export const studentsReducer = slice.reducer;