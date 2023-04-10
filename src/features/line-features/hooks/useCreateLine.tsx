import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "../../../redux/hook"
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast, successToast } from "../../../services/toast-service";
import { CreateLineInterface } from "../types/line-type";
import { createLineService } from "../../../services/line-service";

const useCreateLine = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateLineInterface) => createLineService(payload),
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
                queryKey: ["lines"]
            });
        },
        onSettled: () => {
            dispatch(setLoading(false));
        }
    });
}

export default useCreateLine;