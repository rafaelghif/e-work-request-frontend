import { IonItem, IonSelect, IonSelectOption } from "@ionic/react"
import useQueryTicketAssigneeDepartment from "../hooks/useQueryTicketAssigneeDepartment";

interface SelectTicketAssigneeDepartmentProps {
	value: string[];
	ticketId: string;
	handleChange: (ticketAssigneeIds: string[]) => void;
}

const SelectTicketAssigneeDepartment: React.FC<SelectTicketAssigneeDepartmentProps> = ({ value, ticketId, handleChange }) => {
	const { data } = useQueryTicketAssigneeDepartment(ticketId);
	return (
		<IonItem>
			<IonSelect value={value} onIonChange={(e) => handleChange(e.detail.value!)} label="Department" labelPlacement="stacked" multiple={true}>
				{data?.data?.map((ticketAssignee: any) => (
					<IonSelectOption value={ticketAssignee.id} key={`select-department-${ticketAssignee.AssigneeDepartment.id}`}>{ticketAssignee.AssigneeDepartment.abbreviation}</IonSelectOption>
				))}
			</IonSelect>
		</IonItem>
	);
}

export default SelectTicketAssigneeDepartment;