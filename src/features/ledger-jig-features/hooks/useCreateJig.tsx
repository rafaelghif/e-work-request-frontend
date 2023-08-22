import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "../../../redux/hook"
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast, successToast } from "../../../services/toast-service";
import { CreateJigType } from "../types/jig-type";
import { createJigService } from "../../../services/ledger-jig-service";

const useCreateJig = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateJigType) => createJigService(payload),
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

export default useCreateJig;