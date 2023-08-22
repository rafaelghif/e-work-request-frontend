import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "../../../redux/hook"
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast, successToast } from "../../../services/toast-service";
import { updateJigDetailService } from "../../../services/ledger-jig-service";
import { UpdateJigDetailType } from "../types/jig-detail-type";

const useUpdateJigDetail = (jigId: string) => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: UpdateJigDetailType) => updateJigDetailService(payload),
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
				queryKey: ["ledger-jigs-detail", { jigId }]
			});
			queryClient.invalidateQueries({
				queryKey: ["ledger-jigs-detail-history"]
			});
		},
		onSettled: () => {
			dispatch(setLoading(false));
		}
	});
}

export default useUpdateJigDetail;