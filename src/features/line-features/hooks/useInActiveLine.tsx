import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { inActiveLineService } from "../../../services/line-service";
import { errorToast, successToast } from "../../../services/toast-service";

const useInActiveLine = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (lineId: string) => inActiveLineService(lineId),
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

export default useInActiveLine;