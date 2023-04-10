import { useQuery } from "react-query";
import { useAppDispatch } from "../redux/hook";
import { setLoading } from "../redux/slice/loadingSlice";
import { errorToast } from "../services/toast-service";
import { getPicService } from "../services/user-service";

const useQueryPic = (userId: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["pics", { userId: userId }],
        queryFn: () => getPicService(),
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

export default useQueryPic;