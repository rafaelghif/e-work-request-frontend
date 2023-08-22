import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getLastSequence } from "../../../services/ledger-jig-service";

const useQueryLastSequence = () => {
    const dispatch = useAppDispatch();
    return useQuery({
        queryKey: ["jig-last-sequence"],
        queryFn: () => getLastSequence(),
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

export default useQueryLastSequence;