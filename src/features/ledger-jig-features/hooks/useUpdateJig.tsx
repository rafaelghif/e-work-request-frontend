import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "../../../redux/hook"
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast, successToast } from "../../../services/toast-service";
import { UpdateJigType } from "../types/jig-type";
import { updateJigService } from "../../../services/ledger-jig-service";

const useUpdateJig = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: UpdateJigType) => updateJigService(payload),
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
                queryKey: ["ledger-jigs"]
            });
        },
        onSettled: () => {
            dispatch(setLoading(false));
        }
    });
}

export default useUpdateJig;