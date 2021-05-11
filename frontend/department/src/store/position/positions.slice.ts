import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {RootState} from "../store";
import axios from "../../utils/department-api"
import {PageRequest} from "../../model/page-request.model";
import {DataState} from "../../model/data-state.model";
import {DeleteEntitiesRequest} from "../../model/delete-entities-request.model";
import {ProgressInfo, ProgressInfoData} from "../../model/progress-info/progress-info.model";

interface PositionsState extends DataState<ProgressInfo> {
}

const initialState: PositionsState = {
    loadingOnAdd: false,
    loading: false,
    loadingOnEdit: false
};

export const loadPositions = createAsyncThunk("loadPositions", async (requestData: PageRequest) => {
    const {data} = await axios.get<ProgressInfo[]>(`/positions/page/${requestData.page}/count/${requestData.count}`);
    return data;
});

export const addPosition = createAsyncThunk("addPosition", async (requestData: ProgressInfoData) => {
    await axios.post("/positions/add", requestData);
});

export const editPosition = createAsyncThunk("editPosition", async (requestData: ProgressInfo) => {
    await axios.post(`/positions/${requestData.id}/edit`, {
        title: requestData.title,
        abbreviated: requestData.abbreviated
    });
});

export const loadPosition = createAsyncThunk("loadPosition", async (id: string) => {
    const {data} = await axios.get<ProgressInfo>(`/positions/${id}`);
    return data;
});

export const deletePositions = createAsyncThunk("deletePositions", async (requestData: DeleteEntitiesRequest) => {
    const {data} = await axios.post<ProgressInfo[]>("/positions/delete", requestData);
    return data;
});

const slice = createSlice({
    name: "positions",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loadPosition.fulfilled, (state, action) => {
            state.current = action.payload;
            state.loadingOnEdit = false;
        });
        builder.addMatcher(
            isAnyOf(editPosition.fulfilled, addPosition.fulfilled), () => {
                window.location.pathname = "/positions";
            }
        );
        builder.addMatcher(
            isAnyOf(loadPositions.fulfilled, deletePositions.fulfilled), (state, action) => {
                state.data = action.payload;
                state.loading = false;
            }
        );
        builder.addMatcher(
            isAnyOf(loadPositions.pending, loadPositions.rejected, deletePositions.pending, deletePositions.rejected),
            state => {
                state.loading = true;
            }
        );
        builder.addMatcher(
            isAnyOf(loadPosition.rejected, loadPosition.pending, editPosition.pending, editPosition.rejected),
            state => {
                state.loadingOnEdit = true;
            }
        );
        builder.addMatcher(
            isAnyOf(addPosition.pending, addPosition.rejected), (state) => {
                state.loadingOnAdd = true;
            });
    }
});


export const selectPositions = (state: RootState) => state.positions.data;
export const selectLoading = (state: RootState) => state.positions.loading;
export const selectCurrentPosition = (state: RootState) => state.positions.current;
export const selectLoadingOnEdit = (state: RootState) => state.positions.loadingOnEdit;
export const selectLoadingOnAdd = (state: RootState) => state.positions.loadingOnAdd;

export const positionsReducer = slice.reducer;