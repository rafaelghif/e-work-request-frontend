import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getJigs } from "../../../services/ledger-jig-service";

const useQueryJig = (search: string) => {
	const dispatch = useAppDispatch();
	return useQuery({
		queryKey: ["ledger-jigs", { search }],
		queryFn: () => getJigs(search),
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

export default useQueryJig;