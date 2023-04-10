import Card from "../../../components/Card";
import CreateWorkRequestForm from "./CreateWorkRequestForm";

const ContainerWorkRequestForm: React.FC = () => {
    return (
        <div className="flex justify-center">
            <div className="w-full lg:w-[45em]">
                <Card title="Work Request Form" headerColor="light">
                    <CreateWorkRequestForm />
                </Card>
            </div>
        </div>
    );
}

export default ContainerWorkRequestForm;
