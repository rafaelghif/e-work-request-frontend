import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: false,
    timerProgressBar: true,
    iconColor: "white",
    customClass: {
        popup: "colored-toast"
    },
});

export default Toast;