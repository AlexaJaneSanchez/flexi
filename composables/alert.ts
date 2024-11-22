import { notify } from "@kyvg/vue3-notification"

export function useAlert() {
    function errorAlert(title: string, message: string) {
        notify({
            title: title,
            text: message || 'An unknown error occurred.',
            type: 'error',
        })
    }

    function successAlert(title: string, message: string) {
        notify({
            title: title,
            text: message,
            type: 'success',
        })
    }

    function warningAlert(title: string, message: string) {
        notify({
            title: title,
            text: message,
            type: 'warn',
        });

        // // Wait a moment to allow the notification to be added to the DOM
        // setTimeout(() => {
        //     const notificationElement = document.querySelector('.vue-notification');
        //     if (notificationElement) {
        //         notificationElement.classList.add('notification-center');
        //     }
        // }, 0);
    }

    return { errorAlert, successAlert, warningAlert }
}