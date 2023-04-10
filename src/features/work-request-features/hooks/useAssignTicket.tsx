import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { fetchWorkRequestCount } from "../../../redux/slice/workRequestCountSlice";
import { errorToast, successToast } from "../../../services/toast-service";
import { assignTicketService } from "../../../services/work-request-service";
import { AssignTicketInterface } from "../types/work-request-type";

const useAssignTicket = () => {
    const dispatch = useAppDispatch();
    const dispatch2 = useDispatch<any>();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: AssignTicketInterface) => assignTicketService(payload),
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
                queryKey: ["work-request"]
            });
        },
        onSettled: () => {
            dispatch(setLoading(false));
            dispatch2(fetchWorkRequestCount());
        }
    });
}

export default useAssignTicket;