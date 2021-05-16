import {createAsyncThunk, createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import axios from "../../utils/department-api"
import {PageRequest} from "../../model/page-request.model";
import {DataState} from "../../model/data-state.model";
import {DeleteEntitiesRequest} from "../../model/delete-entities-request.model";
import {UploadDataRequest} from "../../model/upload-data-request.model";
import {UploadStatus} from "../../model/upload-status.model";
import {DEFAULT_PAGE_SIZE} from "../../utils/constants.utils";
import {FacultyMember} from "../../model/faculty-member/faculty-member.model";
import {AddFacultyMemberRequest} from "../../model/faculty-member/add-faculty-member-request.model";
import {EditFacultyMemberRequest} from "../../model/faculty-member/edit-faculty-member-request.model";

interface FacultyMembersState extends DataState<FacultyMember> {
    uploadStatus: UploadStatus;
}

const initialState: FacultyMembersState = {
    loadingOnAdd: false,
    loading: false,
    loadingOnEdit: false,
    totalCount: 0,
    uploadStatus: UploadStatus.NO_UPLOADING
};

export const loadFacultyMembers = createAsyncThunk("loadFacultyMembers", async (requestData: PageRequest) => {
    const {data} = await axios.get<FacultyMember[]>(`/faculty-members/page/${requestData.page}/count/${requestData.count}`);
    return data;
});

export const addFacultyMember = createAsyncThunk("addFacultyMember", async (requestData: AddFacultyMemberRequest) => {
    await axios.post("/faculty-members/add", requestData);
});

export const editFacultyMember = createAsyncThunk("editFacultyMember", async (requestData: EditFacultyMemberRequest) => {
    await axios.post(`/faculty-members/${requestData.id}/edit`, {
        lastName: requestData.lastName,
        firstName: requestData.firstName,
        middleName: requestData.middleName,
        birthDate: requestData.birthDate,
        phone: requestData.phone,
        email: requestData.email,
        degreeId: requestData.degreeId,
        rankId: requestData.rankId,
        workloadRequest: requestData.workloadRequest
    });
});

export const loadFacultyMember = createAsyncThunk("loadFacultyMember", async (id: string) => {
    const {data} = await axios.get<FacultyMember>(`/faculty-members/${id}`);
    return data;
});

export const deleteFacultyMembers = createAsyncThunk("deleteFacultyMembers", async (requestData: DeleteEntitiesRequest) => {
    const {data} = await axios.post<FacultyMember[]>("/faculty-members/delete", requestData);
    return data;
});

export const uploadFacultyMemberData = createAsyncThunk("uploadFacultyMemberData", async (requestData: UploadDataRequest) => {
    let formData = new FormData();
    formData.append("file", requestData.file);
    const {data} = await axios.post<FacultyMember[]>("/faculty-members/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return data;
})

export const loadCount = createAsyncThunk("loadTotalCount", async () => {
    const {data} = await axios.get<number>("/faculty-members/count");
    return data;
});

const slice = createSlice({
    name: "faculty-members",
    initialState,
    reducers: {
        setUploadStatus: (state, action: PayloadAction<UploadStatus>) => {
            state.uploadStatus = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(uploadFacultyMemberData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.uploadStatus = UploadStatus.SUCCESS
        })
        builder.addCase(uploadFacultyMemberData.rejected, (state) => {
            state.loading = false;
            state.uploadStatus = UploadStatus.ERROR
        })
        builder.addCase(uploadFacultyMemberData.pending, (state) => {
            state.loading = true;
            state.uploadStatus = UploadStatus.PENDING
        })
        builder.addCase(loadFacultyMember.fulfilled, (state, action) => {
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
            isAnyOf(addFacultyMember.fulfilled, editFacultyMember.fulfilled), () => {
                window.location.pathname = "/faculty-members";
            }
        );
        builder.addMatcher(
            isAnyOf(loadFacultyMembers.fulfilled, deleteFacultyMembers.fulfilled), (state, action) => {
                state.data = action.payload;
                state.loading = false;
            }
        );
        builder.addMatcher(
            isAnyOf(loadFacultyMembers.pending, loadFacultyMembers.rejected, deleteFacultyMembers.pending, deleteFacultyMembers.rejected),
            state => {
                state.loading = true;
            }
        );
        builder.addMatcher(
            isAnyOf(loadFacultyMember.rejected, loadFacultyMember.pending, editFacultyMember.pending, editFacultyMember.rejected),
            state => {
                state.loadingOnEdit = true;
            }
        );
        builder.addMatcher(
            isAnyOf(addFacultyMember.pending, addFacultyMember.rejected), (state) => {
                state.loadingOnAdd = true;
            });
    }
});

export const {setUploadStatus} = slice.actions;

export const selectFacultyMembers = (state: RootState) => state.facultyMembers.data;
export const selectLoading = (state: RootState) => state.facultyMembers.loading;
export const selectCurrentFacultyMember = (state: RootState) => state.facultyMembers.current;
export const selectLoadingOnEdit = (state: RootState) => state.facultyMembers.loadingOnEdit;
export const selectLoadingOnAdd = (state: RootState) => state.facultyMembers.loadingOnAdd;
export const selectUploadStatus = (state: RootState) => state.facultyMembers.uploadStatus;
export const selectTotalCount = (state: RootState) => state.facultyMembers.totalCount;

export const facultyMembersReducer = slice.reducer;