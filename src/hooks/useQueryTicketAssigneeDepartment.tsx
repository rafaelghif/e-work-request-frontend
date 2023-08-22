import { useQuery } from "react-query";
import { useAppDispatch } from "../redux/hook";
import { setLoading } from "../redux/slice/loadingSlice";
import { getTicketAssigneeDepartment } from "../services/department-service";
import { errorToast } from "../services/toast-service";

const useQueryTicketAssigneeDepartment = (ticketId: string) => {
	const dispatch = useAppDispatch();
	return useQuery({
		queryKey: ["ticket-assignee-departments", { ticketId }],
		queryFn: () => getTicketAssigneeDepartment(ticketId),
		onError: async (error) => {
			dispatch(setLoading(false));
			await errorToast(error);
		},
		onSettled: async () => {
			dispatch(setLoading(false));
		},
		refetchOnWindowFocus: false,
		retry: false
	});
}

export default useQueryTicketAssigneeDepartment;