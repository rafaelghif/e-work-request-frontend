import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { inActiveRegistrationNumberService } from "../../../services/registration-number-service";
import { errorToast, successToast } from "../../../services/toast-service";

const useInActiveRegistrationNumber = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (registrationNumberId: string) => inActiveRegistrationNumberService(registrationNumberId),
        onMutate: () => {
            dispatch(setLoading(true));
        },
        onError: async (error) => {
            dispatch(setLoading(false));
            await errorToast(error);
        },
        onSuccess: async (response) => {
            await successToast(`${response.message}`);
            queryClient.invalidateQueries({
                queryKey: ["registration-numbers"]
            });
        },
        onSettled: () => {
            dispatch(setLoading(false));
        }
    });
}

export default useInActiveRegistrationNumber;