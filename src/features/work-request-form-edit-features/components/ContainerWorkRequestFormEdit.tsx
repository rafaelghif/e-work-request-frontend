import Card from "../../../components/Card";
import FormUpdateWorkRequest from "./FormUpdateWorkRequest";

const ContainerWorkRequestFormEdit: React.FC = () => {
    return (
        <div className="flex justify-center">
            <div className="w-full lg:w-[45em]">
                <Card title="Work Request Form Edit" headerColor="light">
                    <FormUpdateWorkRequest />
                </Card>
            </div>
        </div>
    );
}

export default ContainerWorkRequestFormEdit;