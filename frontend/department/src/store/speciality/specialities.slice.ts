import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {RootState} from "../store";
import axios from "../../utils/department-api"
import {PageRequest} from "../../model/page-request.model";
import {Speciality, SpecialityData} from "../../model/speciality/speciality.model";
import {DataState} from "../../model/data-state.model";
import {DeleteEntitiesRequest} from "../../model/delete-entities-request.model";

interface SpecialitiesState extends DataState<Speciality> {
}

const initialState: SpecialitiesState = {
    loadingOnAdd: false,
    loading: false,
    loadingOnEdit: false
};

export const loadSpecialities = createAsyncThunk("loadSpecialities", async (requestData: PageRequest) => {
    const {data} = await axios.get<Speciality[]>(`/specialities/page/${requestData.page}/count/${requestData.count}`);
    return data;
});

export const addSpeciality = createAsyncThunk("addSpeciality", async (requestData: SpecialityData) => {
    await axios.post("/specialities/add", requestData);
});

export const editSpeciality = createAsyncThunk("editSpeciality", async (requestData: Speciality) => {
    await axios.post(`/specialities/${requestData.id}/edit`, {code: requestData.code, title: requestData.title});
});

export const loadSpeciality = createAsyncThunk("loadSpeciality", async (id: string) => {
    const {data} = await axios.get<Speciality>(`/specialities/${id}`);
    return data;
});

export const deleteSpecialities = createAsyncThunk("deleteSpecialities", async (requestData: DeleteEntitiesRequest) => {
    const {data} = await axios.post<Speciality[]>("/specialities/delete", requestData);
    return data;
});

const slice = createSlice({
    name: "specialities",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loadSpeciality.fulfilled, (state, action) => {
            state.current = action.payload;
            state.loadingOnEdit = false;
        });
        builder.addMatcher(
            isAnyOf(editSpeciality.fulfilled, addSpeciality.fulfilled), () => {
                window.location.pathname = "/specialities";
            }
        );
        builder.addMatcher(
            isAnyOf(loadSpecialities.fulfilled, deleteSpecialities.fulfilled), (state, action) => {
                state.data = action.payload;
                state.loading = false;
            }
        );
        builder.addMatcher(
            isAnyOf(loadSpecialities.pending, loadSpecialities.rejected, deleteSpecialities.pending, deleteSpecialities.rejected),
            state => {
                state.loading = true;
            }
        );
        builder.addMatcher(
            isAnyOf(loadSpeciality.rejected, loadSpeciality.pending, editSpeciality.pending, editSpeciality.rejected),
            state => {
                state.loadingOnEdit = true;
            }
        );
        builder.addMatcher(
            isAnyOf(addSpeciality.pending, addSpeciality.rejected), (state) => {
                state.loadingOnAdd = true;
            });
    }
});


export const selectSpecialities = (state: RootState) => state.specialities.data;
export const selectLoading = (state: RootState) => state.specialities.loading;
export const selectCurrentSpeciality = (state: RootState) => state.specialities.current;
export const selectLoadingOnEdit = (state: RootState) => state.specialities.loadingOnEdit;
export const selectLoadingOnAdd = (state: RootState) => state.specialities.loadingOnAdd;

export const specialitiesReducer = slice.reducer;