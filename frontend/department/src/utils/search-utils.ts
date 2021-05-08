import axios from "./department-api";

export const search = async <T>(prefix: string, query: string) => {
    const {data} = await axios.get<T[]>(`/${prefix}/search?query=${query}`);
    return data;
}