export type JigStatusType = "Operation" | "Superseded";

export interface JigInterface {
	id: string;
	regNo: string;
	sequence: number;
	name: string;
	maker: string;
	location: string;
	qty: number;
	remark: string;
	status: JigStatusType;
	inActive: boolean;
	createdBy: string;
	updatedBy: string;
	createdAt: string;
	updatedAt: string;
}

export type CreateJigType = Pick<JigInterface, "regNo" | "sequence" | "name" | "maker" | "location" | "qty" | "remark">;
export type UpdateJigType = Partial<JigInterface>;