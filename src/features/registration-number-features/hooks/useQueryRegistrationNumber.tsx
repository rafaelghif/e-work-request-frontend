import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { getRegistrationNumberService } from "../../../services/registration-number-service";
import { errorToast } from "../../../services/toast-service";

const useQueryRegistrationNumber = () => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["registration-numbers"],
        queryFn: () => getRegistrationNumberService(),
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

export default useQueryRegistrationNumber;