import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getJigDetails } from "../../../services/ledger-jig-service";

const useQueryJigDetail = (jigId: string = "") => {
	const dispatch = useAppDispatch();
	return useQuery({
		queryKey: ["ledger-jigs-detail", { jigId }],
		queryFn: () => getJigDetails(jigId),
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

export default useQueryJigDetail;