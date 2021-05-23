import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {RootState} from "../store";
import axios from "../../utils/department-api"
import {PageRequest} from "../../model/page-request.model";
import {DataState} from "../../model/data-state.model";
import {DeleteEntitiesRequest} from "../../model/delete-entities-request.model";
import {ProgressInfo, ProgressInfoData} from "../../model/progress-info/progress-info.model";
import {DEFAULT_PAGE_SIZE} from "../../utils/constants.utils";

interface DegreesState extends DataState<ProgressInfo> {
}

const initialState: DegreesState = {
    loadingOnAdd: false,
    loading: false,
    loadingOnEdit: false,
    totalCount: 0
};

export const loadDegrees = createAsyncThunk("loadDegrees", async (requestData: PageRequest) => {
    const {data} = await axios.get<ProgressInfo[]>(`/degrees/page/${requestData.page}/count/${requestData.count}`);
    return data;
});

export const addDegree = createAsyncThunk("addDegree", async (requestData: ProgressInfoData) => {
    await axios.post("/degrees/add", requestData);
});

export const editDegree = createAsyncThunk("editDegree", async (requestData: ProgressInfo) => {
    await axios.post(`/degrees/${requestData.id}/edit`, {
        title: requestData.title,
        abbreviated: requestData.abbreviated
    });
});

export const loadDegree = createAsyncThunk("loadDegree", async (id: string) => {
    const {data} = await axios.get<ProgressInfo>(`/degrees/${id}`);
    return data;
});

export const deleteDegrees = createAsyncThunk("deleteDegrees", async (requestData: DeleteEntitiesRequest) => {
    const {data} = await axios.post<ProgressInfo[]>("/degrees/delete", requestData);
    const countResponse = await axios.get<number>("/degrees/count");
    return {data: data, count: countResponse.data};
});

export const loadCount = createAsyncThunk("loadTotalCount", async () => {
    const {data} = await axios.get<number>("/degrees/count");
    return data;
});

const slice = createSlice({
    name: "degrees",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loadDegree.fulfilled, (state, action) => {
            state.current = action.payload;
            state.loadingOnEdit = false;
        });
        builder.addCase(loadCount.fulfilled, (state, action) => {
            state.totalCount = action.payload;
        })
        builder.addCase(loadCount.rejected, (state) => {
            state.totalCount = DEFAULT_PAGE_SIZE;
        });
        builder.addCase(addDegree.fulfilled, (state) => {
                ++state.totalCount;
                window.location.pathname = "/degrees";
            }
        );
        builder.addCase(editDegree.fulfilled, () => {
                window.location.pathname = "/degrees";
            }
        );
        builder.addCase(deleteDegrees.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.totalCount = action.payload.count;
                state.loading = false;
            }
        );
        builder.addCase(loadDegrees.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            }
        );
        builder.addMatcher(
            isAnyOf(loadDegrees.pending, loadDegrees.rejected, deleteDegrees.pending, deleteDegrees.rejected),
            state => {
                state.loading = true;
            }
        );
        builder.addMatcher(
            isAnyOf(loadDegree.rejected, loadDegree.pending, editDegree.pending, editDegree.rejected),
            state => {
                state.loadingOnEdit = true;
            }
        );
        builder.addMatcher(
            isAnyOf(addDegree.pending, addDegree.rejected), (state) => {
                state.loadingOnAdd = true;
            });
    }
});


export const selectDegrees = (state: RootState) => state.degrees.data;
export const selectLoading = (state: RootState) => state.degrees.loading;
export const selectCurrentDegree = (state: RootState) => state.degrees.current;
export const selectLoadingOnEdit = (state: RootState) => state.degrees.loadingOnEdit;
export const selectLoadingOnAdd = (state: RootState) => state.degrees.loadingOnAdd;
export const selectTotalCount = (state: RootState) => state.degrees.totalCount;

export const degreesReducer = slice.reducer;