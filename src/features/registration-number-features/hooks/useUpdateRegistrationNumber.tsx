import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { updateRegistrationNumberService } from "../../../services/registration-number-service";
import { errorToast, successToast } from "../../../services/toast-service";
import { RegistrationNumberInterface } from "../types/registration-number-type";

const useUpdateRegistrationNumber = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: RegistrationNumberInterface) => updateRegistrationNumberService(payload),
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

export default useUpdateRegistrationNumber;