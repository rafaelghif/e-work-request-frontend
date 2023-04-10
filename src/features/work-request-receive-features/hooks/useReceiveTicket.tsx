import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { fetchWorkRequestReceiveCount } from "../../../redux/slice/workRequestReceiveCountSlice";
import { errorToast, successToast } from "../../../services/toast-service";
import { receiveTicketService } from "../../../services/work-request-service";



const useReceiveTicket = () => {
    const dispatch = useAppDispatch();
    const dispatch2 = useDispatch<any>();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: string) => receiveTicketService(payload),
        onMutate: () => {
            dispatch(setLoading(true));
        },
        onError: async (error) => {
            dispatch(setLoading(false));
            await errorToast(error);
        },
        onSuccess: async (response) => {
            await successToast(`${response.message}`, 2500);
            queryClient.invalidateQueries({
                queryKey: ["work-request-receive"]
            });
        },
        onSettled: () => {
            dispatch(setLoading(false));
            dispatch2(fetchWorkRequestReceiveCount());
        }
    });
}

export default useReceiveTicket;