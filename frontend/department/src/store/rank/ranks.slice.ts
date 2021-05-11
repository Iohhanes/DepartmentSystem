import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {RootState} from "../store";
import axios from "../../utils/department-api"
import {PageRequest} from "../../model/page-request.model";
import {DataState} from "../../model/data-state.model";
import {DeleteEntitiesRequest} from "../../model/delete-entities-request.model";
import {ProgressInfo, ProgressInfoData} from "../../model/progress-info/progress-info.model";

interface RanksState extends DataState<ProgressInfo> {
}

const initialState: RanksState = {
    loadingOnAdd: false,
    loading: false,
    loadingOnEdit: false
};

export const loadRanks = createAsyncThunk("loadRanks", async (requestData: PageRequest) => {
    const {data} = await axios.get<ProgressInfo[]>(`/ranks/page/${requestData.page}/count/${requestData.count}`);
    return data;
});

export const addRank = createAsyncThunk("addRank", async (requestData: ProgressInfoData) => {
    await axios.post("/ranks/add", requestData);
});

export const editRank = createAsyncThunk("editRank", async (requestData: ProgressInfo) => {
    await axios.post(`/ranks/${requestData.id}/edit`, {
        title: requestData.title,
        abbreviated: requestData.abbreviated
    });
});

export const loadRank = createAsyncThunk("loadRank", async (id: string) => {
    const {data} = await axios.get<ProgressInfo>(`/ranks/${id}`);
    return data;
});

export const deleteRanks = createAsyncThunk("deleteRanks", async (requestData: DeleteEntitiesRequest) => {
    const {data} = await axios.post<ProgressInfo[]>("/ranks/delete", requestData);
    return data;
});

const slice = createSlice({
    name: "ranks",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loadRank.fulfilled, (state, action) => {
            state.current = action.payload;
            state.loadingOnEdit = false;
        });
        builder.addMatcher(
            isAnyOf(editRank.fulfilled, addRank.fulfilled), () => {
                window.location.pathname = "/ranks";
            }
        );
        builder.addMatcher(
            isAnyOf(loadRanks.fulfilled, deleteRanks.fulfilled), (state, action) => {
                state.data = action.payload;
                state.loading = false;
            }
        );
        builder.addMatcher(
            isAnyOf(loadRanks.pending, loadRanks.rejected, deleteRanks.pending, deleteRanks.rejected),
            state => {
                state.loading = true;
            }
        );
        builder.addMatcher(
            isAnyOf(loadRank.rejected, loadRank.pending, editRank.pending, editRank.rejected),
            state => {
                state.loadingOnEdit = true;
            }
        );
        builder.addMatcher(
            isAnyOf(addRank.pending, addRank.rejected), (state) => {
                state.loadingOnAdd = true;
            });
    }
});


export const selectRanks = (state: RootState) => state.ranks.data;
export const selectLoading = (state: RootState) => state.ranks.loading;
export const selectCurrentRank = (state: RootState) => state.ranks.current;
export const selectLoadingOnEdit = (state: RootState) => state.ranks.loadingOnEdit;
export const selectLoadingOnAdd = (state: RootState) => state.ranks.loadingOnAdd;

export const ranksReducer = slice.reducer;