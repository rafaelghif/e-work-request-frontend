import { useQuery } from "react-query";
import { useAppDispatch } from "../redux/hook";
import { setLoading } from "../redux/slice/loadingSlice";
import { getRegistrationNumberActiveService } from "../services/registration-number-service";
import { errorToast } from "../services/toast-service";

const useQueryActiveRegistrationNumber = () => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["active-registration-numbers"],
        queryFn: () => getRegistrationNumberActiveService(),
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

export default useQueryActiveRegistrationNumber;