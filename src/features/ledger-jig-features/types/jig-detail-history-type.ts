export interface JigDetailHistoryInterface {
	id: string;
	regNo: string;
	approveBy: string;
	checkedBy: string;
	makeBy: string;
	registrationDate: string;
	machineUse: string;
	partNo: string;
	partName: string;
	acquiredDate: string;
	location: string;
	fileName: string;
	remark: string;
	inActive: boolean;
	createdBy: string;
	updatedBy: string;
	createdAt: string;
	updatedAt: string;
	LedgerJigDetailId: string;
}

export interface JigDetailHistoryWithPictureFile extends JigDetailHistoryInterface {
	picture: File | undefined;
}

export type CreateJigDetailHistoryType = Pick<JigDetailHistoryWithPictureFile, "regNo" | "approveBy" | "checkedBy" | "makeBy" | "registrationDate" | "machineUse" | "partNo" | "partName" | "acquiredDate" | "location" | "picture" | "LedgerJigDetailId">;
export type UpdateJigDetailHistoryType = Partial<JigDetailHistoryWithPictureFile>;