import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {RootState} from "../store";
import axios from "../../utils/department-api"
import {PageRequest} from "../../model/page-request.model";
import {DataState} from "../../model/data-state.model";
import {DeleteEntitiesRequest} from "../../model/delete-entities-request.model";
import {Subject, SubjectData} from "../../model/subject/subject.model";
import {DEFAULT_PAGE_SIZE} from "../../utils/constants.utils";

interface SubjectsState extends DataState<Subject> {
}

const initialState: SubjectsState = {
    loadingOnAdd: false,
    loading: false,
    loadingOnEdit: false,
    totalCount: 0
};

export const loadSubjects = createAsyncThunk("loadSubjects", async (requestData: PageRequest) => {
    const {data} = await axios.get<Subject[]>(`/subjects/page/${requestData.page}/count/${requestData.count}`);
    return data;
});

export const addSubject = createAsyncThunk("addSubject", async (requestData: SubjectData) => {
    await axios.post("/subjects/add", requestData);
});

export const editSubject = createAsyncThunk("editSubject", async (requestData: Subject) => {
    await axios.post(`/subjects/${requestData.id}/edit`, {title: requestData.title});
});

export const loadSubject = createAsyncThunk("loadSubject", async (id: string) => {
    const {data} = await axios.get<Subject>(`/subjects/${id}`);
    return data;
});

export const deleteSubjects = createAsyncThunk("deleteSubjects", async (requestData: DeleteEntitiesRequest) => {
    const {data} = await axios.post<Subject[]>("/subjects/delete", requestData);
    const countResponse = await axios.get<number>("/subjects/count");
    return {data: data, count: countResponse.data};
});

export const loadCount = createAsyncThunk("loadTotalCount", async () => {
    const {data} = await axios.get<number>("/subjects/count");
    return data;
});

const slice = createSlice({
    name: "subjects",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loadSubject.fulfilled, (state, action) => {
            state.current = action.payload;
            state.loadingOnEdit = false;
        });
        builder.addCase(loadCount.fulfilled, (state, action) => {
            state.totalCount = action.payload;
        })
        builder.addCase(loadCount.rejected, (state) => {
            state.totalCount = DEFAULT_PAGE_SIZE;
        });
        builder.addCase(addSubject.fulfilled, (state) => {
                ++state.totalCount;
                window.location.pathname = "/subjects";
            }
        );
        builder.addCase(editSubject.fulfilled, () => {
                window.location.pathname = "/subjects";
            }
        );
        builder.addCase(deleteSubjects.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.totalCount = action.payload.count;
                state.loading = false;
            }
        );
        builder.addCase(loadSubjects.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            }
        );
        builder.addMatcher(
            isAnyOf(loadSubjects.pending, loadSubjects.rejected, deleteSubjects.pending, deleteSubjects.rejected),
            state => {
                state.loading = true;
            }
        );
        builder.addMatcher(
            isAnyOf(loadSubject.rejected, loadSubject.pending, editSubject.pending, editSubject.rejected),
            state => {
                state.loadingOnEdit = true;
            }
        );
        builder.addMatcher(
            isAnyOf(addSubject.pending, addSubject.rejected), (state) => {
                state.loadingOnAdd = true;
            });
    }
});


export const selectSubjects = (state: RootState) => state.subjects.data;
export const selectLoading = (state: RootState) => state.subjects.loading;
export const selectCurrentSubject = (state: RootState) => state.subjects.current;
export const selectLoadingOnEdit = (state: RootState) => state.subjects.loadingOnEdit;
export const selectLoadingOnAdd = (state: RootState) => state.subjects.loadingOnAdd;
export const selectTotalCount = (state: RootState) => state.subjects.totalCount;

export const subjectsReducer = slice.reducer;