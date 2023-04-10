import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { getLineService } from "../../../services/line-service";
import { errorToast } from "../../../services/toast-service";

const useQueryLine = (search: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["lines", { search: search }],
        queryFn: () => getLineService(search),
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

export default useQueryLine;