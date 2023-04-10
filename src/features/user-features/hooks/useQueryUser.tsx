import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getUserService } from "../../../services/user-service";

const useQueryUser = (search: string) => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["users", { search: search }],
        queryFn: () => getUserService(search),
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

export default useQueryUser;