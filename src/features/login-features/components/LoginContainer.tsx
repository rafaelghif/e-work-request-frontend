import { IonButton, IonImg, IonInput, IonItem } from "@ionic/react";
import { useState } from "react";
import yokogawaImage from "../../../assets/images/yokogawa.png";
import { LoginInterface } from "../types/login-type";
import "../../../theme/font.css";
import useLogin from "../hooks/useLogin";

const LoginContainer: React.FC = () => {
    const [formData, setFormData] = useState<LoginInterface>({ badgeId: "", password: "" });
    const { mutate } = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
    }

    const handleChangeInput = (key: keyof LoginInterface, value: string | number) => {
        setFormData(old => ({ ...old, [key]: value }));
    }

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-slate-100">
            <div className="bg-white h-[21em] w-11/12 md:w-1/2 rounded-lg shadow-lg p-5">
                <div className="flex flex-col items-center justify-center gap-3 my-5">
                    <IonImg src={yokogawaImage} className="h-auto w-[240px]" />
                    <span className="block font-['Lato'] font-bold text-xl">E-Work Request</span>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <IonItem>
                            <IonInput type="text" value={formData.badgeId} label="BadgeId" labelPlacement="stacked" onIonChange={(e) => handleChangeInput("badgeId", e.detail.value!)} />
                        </IonItem>
                        <IonItem>
                            <IonInput type="password" value={formData.password} label="Password" labelPlacement="stacked" onIonChange={(e) => handleChangeInput("password", e.detail.value!)} />
                        </IonItem>
                        <IonButton type="submit" expand="block" className="mt-3">Login</IonButton>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginContainer;