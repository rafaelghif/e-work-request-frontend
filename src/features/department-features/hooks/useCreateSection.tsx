import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "../../../redux/hook"
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast, successToast } from "../../../services/toast-service";
import { CreateSectionInterface } from "../types/section-type";
import { createSectionService } from "../../../services/section-service";

const useCreateSection = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateSectionInterface) => createSectionService(payload),
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
                queryKey: ["sections"]
            });
        },
        onSettled: () => {
            dispatch(setLoading(false));
        }
    });
}

export default useCreateSection;