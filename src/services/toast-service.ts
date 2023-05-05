import Toast from "../libs/sweetalert";

/**
 * Displays a success toast with the given message.
 * 
 * @param message - The success message to display in the toast.
 * @param duration - The duration of the toast in milliseconds. Defaults to 1000.
 * 
 * @returns A Promise that resolves when the toast is displayed, or rejects if an error occurs.
 */
export const successToast = async (message: string, duration: number | undefined = 1000): Promise<void> => {
    try {
        await Toast.fire({
            icon: "success",
            position: "bottom-end",
            title: message,
            timer: duration,
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * Displays an information toast with the given message.
 * 
 * @param message - The information message to display in the toast.
 * @param duration - The duration of the toast in milliseconds. Defaults to 1000.
 * 
 * @returns A Promise that resolves when the toast is displayed, or rejects if an error occurs.
 */
export const infoToast = async (message: string, duration: number | undefined = 1000): Promise<void> => {
    try {
        await Toast.fire({
            icon: "info",
            position: "bottom-end",
            title: message,
            timer: duration,
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * Displays a warning toast with the given message.
 * 
 * @param message - The warning message to display in the toast.
 * @param duration - The duration of the toast in milliseconds. Defaults to 1000.
 * 
 * @returns A Promise that resolves when the toast is displayed, or rejects if an error occurs.
 */
export const warningToast = async (message: string, duration: number | undefined = 1000): Promise<void> => {
    try {
        await Toast.fire({
            icon: "warning",
            position: "bottom-end",
            title: message,
            timer: duration,
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

/**
 * Displays an error toast with the given message and title.
 * 
 * @param messageData - The error message or error object to display in the toast.
 * @param titleData - The title of the toast. Defaults to an empty string.
 * @param duration - The duration of the toast in milliseconds. Defaults to 2500.
 * 
 * @returns A Promise that resolves when the toast is displayed, or rejects if an error occurs.
 */
export const errorToast = async (messageData: any, titleData: string = "", duration: number = 2500): Promise<void> => {
    let toastTitle = titleData;
    let toastText = messageData;
    try {
        if (typeof messageData === "undefined") {
            toastTitle = "Something Wrong!";
            toastText = "Please Contact Engineering!";
        } else if (typeof messageData === "object") {
            if ("response" in messageData) {
                const response = messageData.response;
                const { data, isExpressValidation } = response.data;
                if (isExpressValidation) {
                    const { title, validationError } = data;
                    toastTitle = title;
                    toastText = validationError.map((data: any) => data.msg).join("<br />");
                } else {
                    if (data) {
                        const { title, message } = data;
                        toastTitle = title;
                        toastText = message;
                    } else {
                        toastTitle = "Error!";
                        toastText = messageData.response.data.toString();
                        duration = 10000
                    }
                }
            } else {
                if ("message" in messageData) {
                    const { message, name } = messageData;
                    toastTitle = name;
                    toastText = `${message} - Too Many Requests`;
                }
            }
        }
    } catch (err: any) {
        toastTitle = "Something Wrong!";
        toastText = err.toString();
    }

    await Toast.fire({
        icon: "error",
        position: "center",
        title: toastTitle,
        html: toastText,
        timer: duration,
    });
}