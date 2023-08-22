export interface JigDetailInterface {
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
	inActive: boolean;
	createdBy: string;
	updatedBy: string;
	createdAt: string;
	updatedAt: string;
	LedgerJigId: string;
}

export interface JigDetailWithPictureFile extends JigDetailInterface {
	picture: File | undefined;
	remark: string;
}

export type CreateJigDetailType = Pick<JigDetailWithPictureFile, "regNo" | "approveBy" | "checkedBy" | "makeBy" | "registrationDate" | "machineUse" | "partNo" | "partName" | "acquiredDate" | "location" | "picture" | "LedgerJigId">;
export type UpdateJigDetailType = Partial<JigDetailWithPictureFile>;