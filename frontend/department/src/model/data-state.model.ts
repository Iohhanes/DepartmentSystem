export interface DataState<T> {
    data?: T[];
    loading: boolean;
    loadingOnAdd: boolean;
    loadingOnEdit: boolean;
    current?: T;
}