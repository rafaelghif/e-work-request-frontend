import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast, successToast } from "../../../services/toast-service";
import { headActionTicketService } from "../../../services/work-request-service";
import { HeadActionTicketInterface } from "../types/ticket-request-type";
import { fetchTicketRequestCount } from "../../../redux/slice/ticketRequestCountSlice";

const useHeadActionTicket = () => {
    const dispatch = useAppDispatch();
    const dispatch2 = useDispatch<any>();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: HeadActionTicketInterface) => headActionTicketService(payload),
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
                queryKey: ["ticket-request"]
            });
        },
        onSettled: () => {
            dispatch(setLoading(false));
            dispatch2(fetchTicketRequestCount());
        }
    });
}

export default useHeadActionTicket;