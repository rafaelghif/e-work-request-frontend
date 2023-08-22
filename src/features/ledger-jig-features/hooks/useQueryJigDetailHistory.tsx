import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getJigDetailHistories } from "../../../services/ledger-jig-service";

const useQueryJigDetailHistory = (jigDetailId: string = "") => {
	const dispatch = useAppDispatch();
	return useQuery({
		queryKey: ["ledger-jigs-detail-history", { jigDetailId }],
		queryFn: () => getJigDetailHistories(jigDetailId),
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

export default useQueryJigDetailHistory;