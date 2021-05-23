import {createAsyncThunk, createSlice, isAnyOf, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import axios from "../../utils/department-api"
import {PageRequest} from "../../model/page-request.model";
import {DataState} from "../../model/data-state.model";
import {DeleteEntitiesRequest} from "../../model/delete-entities-request.model";
import {Curriculum} from "../../model/curriculum/curriculum.model";
import {AddCurriculumRequest} from "../../model/curriculum/add-curriculum-request.model";
import {EditCurriculumRequest} from "../../model/curriculum/edit-curriculum-request.model";
import {UploadStatus} from "../../model/upload-status.model";
import {DEFAULT_PAGE_SIZE} from "../../utils/constants.utils";

interface CurriculumsState extends DataState<Curriculum> {
    uploadStatus: UploadStatus;
}

const initialState: CurriculumsState = {
    loadingOnAdd: false,
    loading: false,
    loadingOnEdit: false,
    uploadStatus: UploadStatus.NO_UPLOADING,
    totalCount: 0
};

export const loadCurriculums = createAsyncThunk("loadCurriculums", async (requestData: PageRequest) => {
    const {data} = await axios.get<Curriculum[]>(`/curriculums/page/${requestData.page}/count/${requestData.count}`);
    return data;
});

export const addCurriculum = createAsyncThunk("addCurriculum", async (requestData: AddCurriculumRequest) => {
    let formData = new FormData();
    if (requestData.content) {
        formData.append("content", requestData.content);
    }
    formData.append("specialityId", requestData.specialityId);
    formData.append("yearOfEntry", requestData.yearOfEntry.toString());
    await axios.post("/curriculums/add", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
});

export const editCurriculum = createAsyncThunk("editCurriculum", async (requestData: EditCurriculumRequest) => {
    let formData = new FormData();
    if (requestData.content) {
        formData.append("content", requestData.content);
    }
    formData.append("specialityId", requestData.specialityId);
    formData.append("yearOfEntry", requestData.yearOfEntry.toString());
    await axios.post(`/curriculums/${requestData.id}/edit`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
});

export const loadCurriculum = createAsyncThunk("loadCurriculum", async (id: string) => {
    const {data} = await axios.get<Curriculum>(`/curriculums/${id}`);
    return data;
});

export const deleteCurriculums = createAsyncThunk("deleteCurriculums", async (requestData: DeleteEntitiesRequest) => {
    const {data} = await axios.post<Curriculum[]>("/curriculums/delete", requestData);
    const countResponse = await axios.get<number>("/curriculums/count");
    return {data: data, count: countResponse.data};
});

export const loadCount = createAsyncThunk("loadTotalCount", async () => {
    const {data} = await axios.get<number>("/curriculums/count");
    return data;
});

const slice = createSlice({
    name: "curriculums",
    initialState,
    reducers: {
        setUploadStatus: (state, action: PayloadAction<UploadStatus>) => {
            state.uploadStatus = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(loadCurriculum.fulfilled, (state, action) => {
            state.current = action.payload;
            state.loadingOnEdit = false;
        });
        builder.addCase(loadCount.fulfilled, (state, action) => {
            state.totalCount = action.payload;
        })
        builder.addCase(loadCount.rejected, (state) => {
            state.totalCount = DEFAULT_PAGE_SIZE;
        });
        builder.addCase(addCurriculum.fulfilled, (state) => {
                ++state.totalCount;
                window.location.pathname = "/curriculums";
            }
        );
        builder.addCase(editCurriculum.fulfilled, () => {
                window.location.pathname = "/curriculums";
            }
        );
        builder.addCase(deleteCurriculums.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.totalCount = action.payload.count;
                state.loading = false;
            }
        );
        builder.addCase(loadCurriculums.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            }
        );
        builder.addMatcher(
            isAnyOf(loadCurriculums.pending, loadCurriculums.rejected, deleteCurriculums.pending, deleteCurriculums.rejected),
            state => {
                state.loading = true;
            }
        );
        builder.addMatcher(
            isAnyOf(loadCurriculum.pending, editCurriculum.pending),
            state => {
                state.loadingOnEdit = true;
                state.uploadStatus = UploadStatus.PENDING;
            }
        );
        builder.addMatcher(
            isAnyOf(loadCurriculum.rejected, editCurriculum.rejected),
            state => {
                state.loadingOnEdit = true;
                state.uploadStatus = UploadStatus.ERROR;
            }
        );
        builder.addMatcher(
            isAnyOf(addCurriculum.pending, addCurriculum.rejected), (state) => {
                state.loadingOnAdd = true;
            });
    }
});

export const {setUploadStatus} = slice.actions;

export const selectCurriculums = (state: RootState) => state.curriculums.data;
export const selectLoading = (state: RootState) => state.curriculums.loading;
export const selectCurrentCurriculum = (state: RootState) => state.curriculums.current;
export const selectLoadingOnEdit = (state: RootState) => state.curriculums.loadingOnEdit;
export const selectLoadingOnAdd = (state: RootState) => state.curriculums.loadingOnAdd;
export const selectUploadStatus = (state: RootState) => state.curriculums.uploadStatus;
export const selectTotalCount = (state: RootState) => state.curriculums.totalCount;

export const curriculumsReducer = slice.reducer;