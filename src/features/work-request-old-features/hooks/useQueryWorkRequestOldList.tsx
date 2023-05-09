import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getWorkRequestOld } from "../../../services/work-request-old-service";

const useQueryWorkRequestOldList = (search: string, type: string, year: string, month: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["work-request-old-list", { search, type, year, month }],
        queryFn: () => getWorkRequestOld({ search, type, year, month }),
        onError: async (error) => {
            dispatch(setLoading(false));
            await errorToast(error);
        },
        onSettled: async () => {
            dispatch(setLoading(false));
        },
        refetchOnWindowFocus: false,
        retry: false
    });
}

export default useQueryWorkRequestOldList;