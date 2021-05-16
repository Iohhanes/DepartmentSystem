import {createAsyncThunk, createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import axios from "../../utils/department-api"
import {PageRequest} from "../../model/page-request.model";
import {DataState} from "../../model/data-state.model";
import {DeleteEntitiesRequest} from "../../model/delete-entities-request.model";
import {UploadDataRequest} from "../../model/upload-data-request.model";
import {UploadStatus} from "../../model/upload-status.model";
import {DEFAULT_PAGE_SIZE} from "../../utils/constants.utils";
import {PGStudent} from "../../model/pg-student/pg-student.model";
import {AddPGStudentRequest} from "../../model/pg-student/add-pg-student-request.model";
import {EditPGStudentRequest} from "../../model/pg-student/edit-pg-student-request.model";

interface GraduateStudentsState extends DataState<PGStudent> {
    uploadStatus: UploadStatus;
}

const initialState: GraduateStudentsState = {
    loadingOnAdd: false,
    loading: false,
    loadingOnEdit: false,
    totalCount: 0,
    uploadStatus: UploadStatus.NO_UPLOADING
};

export const loadGraduateStudents = createAsyncThunk("loadGraduateStudents", async (requestData: PageRequest) => {
    const {data} = await axios.get<PGStudent[]>(`/graduate-students/page/${requestData.page}/count/${requestData.count}`);
    return data;
});

export const addGraduateStudent = createAsyncThunk("addGraduateStudent", async (requestData: AddPGStudentRequest) => {
    await axios.post("/graduate-students/add", requestData);
});

export const editGraduateStudent = createAsyncThunk("editGraduateStudent", async (requestData: EditPGStudentRequest) => {
    await axios.post(`/graduate-students/${requestData.id}/edit`, {
        lastName: requestData.lastName,
        firstName: requestData.firstName,
        middleName: requestData.middleName,
        birthDate: requestData.birthDate,
        phone: requestData.phone,
        email: requestData.email,
        startDate: requestData.startDate,
        endDate: requestData.endDate,
        comment: requestData.comment,
        facultyMemberId: requestData.facultyMemberId
    });
});

export const loadGraduateStudent = createAsyncThunk("loadGraduateStudent", async (id: string) => {
    const {data} = await axios.get<PGStudent>(`/graduate-students/${id}`);
    return data;
});

export const deleteGraduateStudents = createAsyncThunk("deleteGraduateStudents", async (requestData: DeleteEntitiesRequest) => {
    const {data} = await axios.post<PGStudent[]>("/graduate-students/delete", requestData);
    return data;
});

export const uploadGraduateStudentData = createAsyncThunk("uploadGraduateStudentData", async (requestData: UploadDataRequest) => {
    let formData = new FormData();
    formData.append("file", requestData.file);
    const {data} = await axios.post<PGStudent[]>("/graduate-students/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return data;
})

export const loadCount = createAsyncThunk("loadTotalCount", async () => {
    const {data} = await axios.get<number>("/graduate-students/count");
    return data;
});

const slice = createSlice({
    name: "graduate-students",
    initialState,
    reducers: {
        setUploadStatus: (state, action: PayloadAction<UploadStatus>) => {
            state.uploadStatus = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(uploadGraduateStudentData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.uploadStatus = UploadStatus.SUCCESS
        })
        builder.addCase(uploadGraduateStudentData.rejected, (state) => {
            state.loading = false;
            state.uploadStatus = UploadStatus.ERROR
        })
        builder.addCase(uploadGraduateStudentData.pending, (state) => {
            state.loading = true;
            state.uploadStatus = UploadStatus.PENDING
        })
        builder.addCase(loadGraduateStudent.fulfilled, (state, action) => {
            state.current = action.payload;
            state.loadingOnEdit = false;
        });
        builder.addCase(loadCount.fulfilled, (state, action) => {
            state.totalCount = action.payload;
        })
        builder.addCase(loadCount.rejected, (state) => {
            state.totalCount = DEFAULT_PAGE_SIZE;
        });
        builder.addMatcher(
            isAnyOf(addGraduateStudent.fulfilled, editGraduateStudent.fulfilled), () => {
                window.location.pathname = "/graduate-students";
            }
        );
        builder.addMatcher(
            isAnyOf(loadGraduateStudents.fulfilled, deleteGraduateStudents.fulfilled), (state, action) => {
                state.data = action.payload;
                state.loading = false;
            }
        );
        builder.addMatcher(
            isAnyOf(loadGraduateStudents.pending, loadGraduateStudents.rejected, deleteGraduateStudents.pending, deleteGraduateStudents.rejected),
            state => {
                state.loading = true;
            }
        );
        builder.addMatcher(
            isAnyOf(loadGraduateStudent.rejected, loadGraduateStudent.pending, editGraduateStudent.pending, editGraduateStudent.rejected),
            state => {
                state.loadingOnEdit = true;
            }
        );
        builder.addMatcher(
            isAnyOf(addGraduateStudent.pending, addGraduateStudent.rejected), (state) => {
                state.loadingOnAdd = true;
            });
    }
});

export const {setUploadStatus} = slice.actions;

export const selectGraduateStudents = (state: RootState) => state.graduateStudents.data;
export const selectLoading = (state: RootState) => state.graduateStudents.loading;
export const selectCurrentGraduateStudent = (state: RootState) => state.graduateStudents.current;
export const selectLoadingOnEdit = (state: RootState) => state.graduateStudents.loadingOnEdit;
export const selectLoadingOnAdd = (state: RootState) => state.graduateStudents.loadingOnAdd;
export const selectUploadStatus = (state: RootState) => state.graduateStudents.uploadStatus;
export const selectTotalCount = (state: RootState) => state.graduateStudents.totalCount;

export const graduateStudentsReducer = slice.reducer;