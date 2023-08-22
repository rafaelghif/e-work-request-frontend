import Modal from "../../../components/Modal";
import { JigDetailHistoryInterface } from "../types/jig-detail-history-type";
import { JigDetailInterface } from "../types/jig-detail-type";
import { JigInterface } from "../types/jig-type";

interface ModalDetailJigDetailProps {
	data: JigDetailInterface | JigDetailHistoryInterface | undefined;
	jigData: JigInterface;
	isOpen: boolean;
	onDidDismiss: () => void;
}

const ModalDetailJigDetail: React.FC<ModalDetailJigDetailProps> = ({ data, jigData, isOpen, onDidDismiss }) => {
	return (
		<Modal title={`Detail ${data?.regNo}`} isOpen={isOpen} onDidDismiss={onDidDismiss} className="modal-lg">
			<div className="flex flex-col w-full h-full gap-4">
				<div className="flex flex-row gap-3">
					<div className="flex flex-col justify-center flex-grow gap-1 p-2 border rounded-md shadow">
						<span className="font-semibold">APP</span>
						<span className="self-center">{data?.approveBy}</span>
					</div>
					<div className="flex flex-col justify-center flex-grow gap-1 p-2 border rounded-md shadow">
						<span className="font-semibold">CHK.</span>
						<span className="self-center">{data?.checkedBy}</span>
					</div>
					<div className="flex flex-col justify-center flex-grow gap-1 p-2 border rounded-md shadow">
						<span className="font-semibold">DRW.</span>
						<span className="self-center">{data?.makeBy}</span>
					</div>
					<div className="flex flex-col justify-center flex-grow gap-1 p-2 border rounded-md shadow">
						<span className="font-semibold">DATE</span>
						<span className="self-center">{data?.registrationDate}</span>
					</div>
					<div className="flex flex-col justify-center flex-grow gap-1 p-2 border rounded-md shadow">
						<span className="font-semibold">LOCALITY</span>
						<span className="self-center">{data?.location}</span>
					</div>
				</div>
				<div className="flex flex-row self-center w-full gap-3">
					<div className="flex flex-col items-center self-start justify-center w-6/12 gap-2 p-3 border rounded-md shadow">
						<div className="grid w-full grid-cols-2 p-2 border-b">
							<p className="font-semibold">Name</p>
							<p><span className="font-semibold">:</span> {jigData.name}</p>
						</div>
						<div className="grid justify-center w-full grid-cols-2 p-2 border-b">
							<p className="font-semibold">Machine Use</p>
							<p><span className="font-semibold">:</span> {data?.machineUse}</p>
						</div>
						<div className="grid justify-center w-full grid-cols-2 p-2 border-b">
							<p className="font-semibold">Part No</p>
							<p><span className="font-semibold">:</span> {data?.partNo}</p>
						</div>
						<div className="grid justify-center w-full grid-cols-2 p-2 border-b">
							<p className="font-semibold">Part Name</p>
							<p><span className="font-semibold">:</span> {data?.partName}</p>
						</div>
						<div className="grid justify-center w-full grid-cols-2 p-2 border-b">
							<p className="font-semibold">Manufacture</p>
							<p><span className="font-semibold">:</span> {jigData?.maker}</p>
						</div>
						<div className="grid justify-center w-full grid-cols-2 p-2 border-b">
							<p className="font-semibold">Registration Number</p>
							<p><span className="font-semibold">:</span> {jigData?.regNo}</p>
						</div>
						<div className="grid justify-center w-full grid-cols-2 p-2">
							<p className="font-semibold">Acquired Date</p>
							<p><span className="font-semibold">:</span> {data?.acquiredDate}</p>
						</div>
					</div>
					<div className="flex items-center justify-center w-6/12">
						<img src={`${process.env.REACT_APP_PUBLIC}/ledgers/jigs/${data?.fileName}`} alt="Jig Detail Pictures" className="border shadow-md rounded-2xl" />
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default ModalDetailJigDetail;