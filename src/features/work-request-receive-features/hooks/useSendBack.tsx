import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { fetchWorkRequestReceiveCount } from "../../../redux/slice/workRequestReceiveCountSlice";
import { errorToast, successToast } from "../../../services/toast-service";
import { sendBackService } from "../../../services/work-request-service";
import { SendBackToAssignee } from "../../../types/work-request-type";
import { useMutation, useQueryClient } from "react-query";

const useSendBack = () => {
	const dispatch = useAppDispatch();
	const dispatch2 = useDispatch<any>();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: SendBackToAssignee) => sendBackService(payload),
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

export default useSendBack;