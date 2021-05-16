import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {RootState} from "../store";
import axios from "../../utils/department-api"
import {PageRequest} from "../../model/page-request.model";
import {DataState} from "../../model/data-state.model";
import {DeleteEntitiesRequest} from "../../model/delete-entities-request.model";
import {Group} from "../../model/group/group.model";
import {AddGroupRequest} from "../../model/group/add-group-request.model";
import {EditGroupRequest} from "../../model/group/edit-group-request.model";
import {DEFAULT_PAGE_SIZE} from "../../utils/constants.utils";

interface GroupsState extends DataState<Group> {
}

const initialState: GroupsState = {
    loadingOnAdd: false,
    loading: false,
    loadingOnEdit: false,
    totalCount: 0
};

export const loadGroups = createAsyncThunk("loadGroups", async (requestData: PageRequest) => {
    const {data} = await axios.get<Group[]>(`/groups/page/${requestData.page}/count/${requestData.count}`);
    return data;
});

export const addGroup = createAsyncThunk("addGroup", async (requestData: AddGroupRequest) => {
    await axios.post("/groups/add", requestData);
});

export const editGroup = createAsyncThunk("editGroup", async (requestData: EditGroupRequest) => {
    await axios.post(`/groups/${requestData.id}/edit`, {
        number: requestData.number,
        yearOfEntry: requestData.yearOfEntry,
        specialityId: requestData.specialityId
    });
});

export const loadGroup = createAsyncThunk("loadGroup", async (id: string) => {
    const {data} = await axios.get<Group>(`/groups/${id}`);
    return data;
});

export const deleteGroups = createAsyncThunk("deleteGroups", async (requestData: DeleteEntitiesRequest) => {
    const {data} = await axios.post<Group[]>("/groups/delete", requestData);
    return data;
});

export const loadCount = createAsyncThunk("loadTotalCount", async () => {
    const {data} = await axios.get<number>("/groups/count");
    return data;
});

const slice = createSlice({
    name: "groups",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loadGroup.fulfilled, (state, action) => {
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
            isAnyOf(addGroup.fulfilled, editGroup.fulfilled), () => {
                window.location.pathname = "/groups";
            }
        );
        builder.addMatcher(
            isAnyOf(loadGroups.fulfilled, deleteGroups.fulfilled), (state, action) => {
                state.data = action.payload;
                state.loading = false;
            }
        );
        builder.addMatcher(
            isAnyOf(loadGroups.pending, loadGroups.rejected, deleteGroups.pending, deleteGroups.rejected),
            state => {
                state.loading = true;
            }
        );
        builder.addMatcher(
            isAnyOf(loadGroup.rejected, loadGroup.pending, editGroup.pending, editGroup.rejected),
            state => {
                state.loadingOnEdit = true;
            }
        );
        builder.addMatcher(
            isAnyOf(addGroup.pending, addGroup.rejected), (state) => {
                state.loadingOnAdd = true;
            });
    }
});

export const selectGroups = (state: RootState) => state.groups.data;
export const selectLoading = (state: RootState) => state.groups.loading;
export const selectCurrentGroup = (state: RootState) => state.groups.current;
export const selectLoadingOnEdit = (state: RootState) => state.groups.loadingOnEdit;
export const selectLoadingOnAdd = (state: RootState) => state.groups.loadingOnAdd;
export const selectTotalCount = (state: RootState) => state.groups.totalCount;

export const groupsReducer = slice.reducer;