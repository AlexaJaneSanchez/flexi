// plugins/i18n.ts
import { createI18n } from 'vue-i18n';

export default defineNuxtPlugin(nuxtApp => {
    const i18n = createI18n({
        legacy: false,
        locale: 'en',
        messages: {
            en: {
                alert: {
                    Success: "Success",
                    customerSuccessfullyUpdated: "Customer successfully updated",
                    customerUpdateFailed: "Customer update failed",
                    customerSuccessfullyCreated: "Customer successfully created",
                    customerCreationFailed: "Customer creation failed",
                    errorOccurredWhileSavingCustomer: "An error occurred while saving the customer"
                }
            }
        }
    });

    nuxtApp.vueApp.use(i18n);
});
