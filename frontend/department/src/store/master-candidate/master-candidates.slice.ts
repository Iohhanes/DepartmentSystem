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

interface MasterCandidatesState extends DataState<PGStudent> {
    uploadStatus: UploadStatus;
}

const initialState: MasterCandidatesState = {
    loadingOnAdd: false,
    loading: false,
    loadingOnEdit: false,
    totalCount: 0,
    uploadStatus: UploadStatus.NO_UPLOADING
};

export const loadMasterCandidates = createAsyncThunk("loadMasterCandidates", async (requestData: PageRequest) => {
    const {data} = await axios.get<PGStudent[]>(`/master-candidates/page/${requestData.page}/count/${requestData.count}`);
    return data;
});

export const addMasterCandidate = createAsyncThunk("addMasterCandidate", async (requestData: AddPGStudentRequest) => {
    await axios.post("/master-candidates/add", requestData);
});

export const editMasterCandidate = createAsyncThunk("editMasterCandidate", async (requestData: EditPGStudentRequest) => {
    await axios.post(`/master-candidates/${requestData.id}/edit`, {
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

export const loadMasterCandidate = createAsyncThunk("loadMasterCandidate", async (id: string) => {
    const {data} = await axios.get<PGStudent>(`/master-candidates/${id}`);
    return data;
});

export const deleteMasterCandidates = createAsyncThunk("deleteMasterCandidates", async (requestData: DeleteEntitiesRequest) => {
    const {data} = await axios.post<PGStudent[]>("/master-candidates/delete", requestData);
    return data;
});

export const uploadMasterCandidateData = createAsyncThunk("uploadMasterCandidateData", async (requestData: UploadDataRequest) => {
    let formData = new FormData();
    formData.append("file", requestData.file);
    const {data} = await axios.post<PGStudent[]>("/master-candidates/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return data;
})

export const loadCount = createAsyncThunk("loadTotalCount", async () => {
    const {data} = await axios.get<number>("/master-candidates/count");
    return data;
});

const slice = createSlice({
    name: "master-candidates",
    initialState,
    reducers: {
        setUploadStatus: (state, action: PayloadAction<UploadStatus>) => {
            state.uploadStatus = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(uploadMasterCandidateData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.uploadStatus = UploadStatus.SUCCESS
        })
        builder.addCase(uploadMasterCandidateData.rejected, (state) => {
            state.loading = false;
            state.uploadStatus = UploadStatus.ERROR
        })
        builder.addCase(uploadMasterCandidateData.pending, (state) => {
            state.loading = true;
            state.uploadStatus = UploadStatus.PENDING
        })
        builder.addCase(loadMasterCandidate.fulfilled, (state, action) => {
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
            isAnyOf(addMasterCandidate.fulfilled, editMasterCandidate.fulfilled), () => {
                window.location.pathname = "/master-candidates";
            }
        );
        builder.addMatcher(
            isAnyOf(loadMasterCandidates.fulfilled, deleteMasterCandidates.fulfilled), (state, action) => {
                state.data = action.payload;
                state.loading = false;
            }
        );
        builder.addMatcher(
            isAnyOf(loadMasterCandidates.pending, loadMasterCandidates.rejected, deleteMasterCandidates.pending, deleteMasterCandidates.rejected),
            state => {
                state.loading = true;
            }
        );
        builder.addMatcher(
            isAnyOf(loadMasterCandidate.rejected, loadMasterCandidate.pending, editMasterCandidate.pending, editMasterCandidate.rejected),
            state => {
                state.loadingOnEdit = true;
            }
        );
        builder.addMatcher(
            isAnyOf(addMasterCandidate.pending, addMasterCandidate.rejected), (state) => {
                state.loadingOnAdd = true;
            });
    }
});

export const {setUploadStatus} = slice.actions;

export const selectMasterCandidates = (state: RootState) => state.masterCandidates.data;
export const selectLoading = (state: RootState) => state.masterCandidates.loading;
export const selectCurrentMasterCandidate = (state: RootState) => state.masterCandidates.current;
export const selectLoadingOnEdit = (state: RootState) => state.masterCandidates.loadingOnEdit;
export const selectLoadingOnAdd = (state: RootState) => state.masterCandidates.loadingOnAdd;
export const selectUploadStatus = (state: RootState) => state.masterCandidates.uploadStatus;
export const selectTotalCount = (state: RootState) => state.masterCandidates.totalCount;

export const masterCandidatesReducer = slice.reducer;