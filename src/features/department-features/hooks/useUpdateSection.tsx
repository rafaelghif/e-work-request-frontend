import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { updateSectionService } from "../../../services/section-service";
import { errorToast, successToast } from "../../../services/toast-service";
import { SectionInterface } from "../types/section-type";

const useUpdateSection = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: SectionInterface) => updateSectionService(payload),
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

export default useUpdateSection;