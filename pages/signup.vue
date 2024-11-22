<template>

    <Head>
        <Title>{{ runtimeConfig.public.appName }}</Title>
    </Head>
    <LoadingSpinner :isActive="state.isPageLoading">
        <div class="flex h-screen items-center justify-center">
            <div class=" min-h-screen flex flex-col justify-center sm:px-6 lg:px-8">
                <div class="sm:mx-auto sm:w-full sm:max-w-md">
                    <div class="py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <button @click="backToHome">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6 hover:text-zinc-500">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <img class="mx-auto h-10 w-auto" src="/public/images/Logo.png" alt="Your Company" />
                        <h2 class=" text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
                            Register your account
                        </h2>
                        <form class="mt-3 space-y-3" @submit.prevent="createUserAccount">
                            <div class="space-y-2">
                                <div class="flex justify-center">
                                    <div class="w-full max-w-xs">
                                        <FormLabel for="firstname" label="First Name" />
                                        <FormTextField id="firstname" name="firstname" placeholder="First Name"
                                            v-model="state.firstname"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md text-xs" />
                                        <FormError :error="v$?.firstname?.$errors[0]?.$message.toString()" />
                                        <FormError :error="state?.error?.errors?.firstname?.[0]" />
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex justify-center">
                                    <div class="w-full max-w-xs">
                                        <FormLabel for="lastname" label="Last Name" />
                                        <FormTextField id="lastname" name="lastname" placeholder="Last Name"
                                            v-model="state.lastname"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md text-xs" />
                                        <FormError :error="v$?.firstname?.$errors[0]?.$message.toString()" />
                                        <FormError :error="state?.error?.errors?.firstname?.[0]" />
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex justify-center">
                                    <div class="w-full max-w-xs text-xs">
                                        <FormLabel for="email" label="Email" />
                                        <FormTextField type="email" id="email" name="email" placeholder="Email"
                                            v-model="state.email"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md text-xs"
                                            size="40" />
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex justify-center">
                                    <div class="w-full max-w-xs">
                                        <FormLabel for="password" label="Password" />
                                        <FormPasswordField id="password" name="password" placeholder="Password"
                                            v-model="state.password"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md text-xs" />
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex justify-center">
                                    <div class="w-full max-w-xs">
                                        <FormLabel for="password_confirmation" label="Confirm Password" />
                                        <FormPasswordField id="password_confirmation" name="password_confirmation"
                                            placeholder="Confirm Password" v-model="state.password_confirmation"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md text-xs" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <FormButton type="submit"
                                    class="group relative mt-7 w-full flex justify-center py-2 px-4 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 ">
                                    Create Account
                                </FormButton>
                            </div>
                        </form>
                    </div>
                    <div class="mt-5">
                        <div class="grid grid-cols-2 gap-2 justify-center ml-12">
                            <p class="text-right text-xs">Already have an account?</p>
                            <a href="#" class="font-bold text-xs text-blue-600 hover:text-blue-500"
                                @click="navigateToLogin">Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </LoadingSpinner>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators';
import { authService } from '@/components/api/AuthService.js';
import { useAlert } from '@/composables/alert';
import { useI18n } from 'vue-i18n';
const runtimeConfig = useRuntimeConfig();

const { successAlert } = useAlert();
const { errorAlert } = useAlert();
const { t } = useI18n();

const state = reactive<{
    role_id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    password_confirmation: string;
    error: any;
    isPageLoading: boolean;
}>({
    role_id: 2,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
    error: null,
    isPageLoading: false,
});


const rules = computed(() => {
    return {
        firstname: {
            required: helpers.withMessage('Name is required.', required),
        },
        lastname: {
            required: helpers.withMessage('Name is required.', required),
        },
        email: {
            required: helpers.withMessage('Email is required.', required),
            email: helpers.withMessage('Enter a valid email address.', email),
        },
        password: {
            required: helpers.withMessage('Password is required.', required),
            minLength: helpers.withMessage('Password must be at least 6 characters.', minLength(6)),
        },
        password_confirmation: {
            required: helpers.withMessage('Please confirm your password.', required),
            sameAsPassword: helpers.withMessage('Passwords do not match.', sameAs(state.password)),
        },
    };
});

const v$ = useVuelidate(rules, state);

async function createUserAccount() {
    try {
        state.isPageLoading = true;
        const params = {
            role_id: 2,
            firstname: state.firstname,
            lastname: state.lastname,
            email: state.email,
            password: state.password,
        };
        const response = await authService.createUser(params);
        state.isPageLoading = false;

        if (response) {
            successAlert(`Success!`, `User created successfully!`);
            console.log(response);
            const id = response.data.id;
            navigateTo(`/select-plan?user_id=${id}`);
            state.error = null; // Clear any previous errors
        } else {
            errorAlert(`Error!`, `User creation failed.`);
            console.log("errror: " + response);
        }
    } catch (error: any) {
        state.isPageLoading = false;

        // Check if the error response has data and set it to the state
        if (error.response?.data) {
            state.error = error.response.data;
        } else {
            state.error = { errors: { general: ['Server error. Please try again. If the problem persists, contact your system administrator'] } };
        }

        console.error('Error creating user:', error.message);
        errorAlert(`Error!`, `Error occured while creating user.`);
        console.log(state);
    }
}


function navigateToLogin(event: Event) {
    event.preventDefault();
    window.location.href = '/signin'; // Navigate to the login page
}

function backToHome() {
    navigateTo('./');
}
</script>
