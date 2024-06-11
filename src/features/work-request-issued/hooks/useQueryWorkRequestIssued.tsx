import { useQuery } from "react-query";
import { useAppDispatch } from "../../../redux/hook";
import { setLoading } from "../../../redux/slice/loadingSlice";
import { errorToast } from "../../../services/toast-service";
import { getWorkRequestIssued } from "../../../services/work-request-service";

const useQueryWorkRequestIssued = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: ["work-request-issued"],
    queryFn: () => getWorkRequestIssued(),
    onError: async (error) => {
      dispatch(setLoading(false));
      await errorToast(error);
    },
    onSettled: async () => {
      dispatch(setLoading(false));
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export default useQueryWorkRequestIssued;
