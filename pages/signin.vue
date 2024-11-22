<template>

    <Head>
        <Title>{{ runtimeConfig.public.appName }}</Title>
    </Head>
    <button @click="backToHome" class="ml-4 mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-6 hover:text-zinc-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
    </button>
  <div class="flex min-h-screen items-center justify-center pt-40 sm:px-6 lg:px-8 pb-40">
       

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            
            <div class="bg-gray-100 px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img class="mx-auto h-10 w-auto" src="/public/images/Logo.png" alt="Your Company" />
           <!-- <h2 class="mt-6 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
            </h2> -->
        </div>
                <form class="mt-5 space-y-3" method="POST" @submit.prevent="login">
                    <Alert type="danger" :text="state?.error?.message" v-if="
                        state.error?.message &&
                        state.error.message.length > 0
                    " />
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                            address</label>
                        <div class="mt-2">
                            <input id="email" name="email" type="email" autocomplete="email" v-model="state.email"
                                class="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <FormError :error="v$?.email?.$errors[0]?.$message.toString()" />
                        <FormError :error="state?.error?.errors?.email?.[0]" />
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div class="mt-2">
                            <input id="password" name="password" type="password" autocomplete="current-password"
                                v-model="state.password"
                                class="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <FormError :error="v$?.password?.$errors[0]?.$message.toString()
                            " />
                        <FormError :error="state?.error?.errors?.password?.[0]" />
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                            <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900">Remember
                                me</label>
                        </div>

                        <div class="text-sm leading-6">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                            in</button>
                    </div>
                            <p class="mt-10 text-center text-sm text-gray-500 ">
                        Not a member?
                        <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ">Start a 14 day free
                            trial</a>
                    </p>
                        </form>

               <!-- <div>
                    <div class="relative mt-10">
                        <div class="absolute inset-0 flex items-center" aria-hidden="true">
                            <div class="w-full border-t border-gray-200"></div>
                        </div>
                        <div class="relative flex justify-center text-sm font-medium leading-6">
                            <span class="bg-white px-6 text-gray-900">Or continue with</span>
                        </div>
                    </div>

                    <div class="mt-6 grid grid-cols-2 gap-4">
                        <a href="#"
                            class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
                            <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                <path
                                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                    fill="#EA4335" />
                                <path
                                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                    fill="#4285F4" />
                                <path
                                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                    fill="#FBBC05" />
                                <path
                                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                    fill="#34A853" />
                            </svg>
                            <span class="text-sm font-semibold leading-6">Google</span>
                        </a>
                        

                        <a href="#"
                            class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
                            <svg class="h-5 w-5 fill-[#24292F]" aria-hidden="true" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.641.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.694-4.566 4.941.359.31.678.92.678 1.855 0 1.338-.012 2.42-.012 2.75 0 .269.18.58.688.481C17.137 18.194 20 14.442 20 10.017 20 4.484 15.523 0 10 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="text-sm font-semibold leading-6">GitHub</span>
                        </a>
                    </div> 
                </div> -->
            </div>

            
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import FormError from "../components/form/Error.vue"; // Adjust the path if necessary
import { authService } from "~/components/api/AuthService";
import { computed } from "vue";
const runtimeConfig = useRuntimeConfig();

interface LoginError {
    message?: string;
    errors?: {
        [key: string]: string[];
    };
}

const state = reactive({
    email: '',
    error: {} as LoginError,
    isPageLoading: false,
    password: null,
    slideOver: {
        isLanguageSwitcherOpen: false
    },
})

const rules = computed(() => {
    return {
        email: {
            required: helpers.withMessage("this field is required", required),
        },
        password: {
            required: helpers.withMessage("this field is required", required),
        },
    }
})
const v$ = useVuelidate(rules, state)

async function login() {
    state.error = {}
    v$.value.$validate()
    if (!v$.value.$error) {
        state.isPageLoading = true
        try {
            const params = {
                email: state.email,
                password: state.password,
            }
            const response = await authService.login(params)
            if (response.data) {
                localStorage.setItem("_token", response.data?.token)
                // Retrieve the user's role from the database
                const userResponse = await authService.getUserByEmail(state.email);
                console.log(userResponse);
                localStorage.setItem('firstname', userResponse.data.firstname);
                localStorage.setItem('lastname', userResponse.data.lastname);
                localStorage.setItem('user_id', userResponse.data.id);
                // localStorage.setItem('', userResponse.firstname.value);
                console.log("role:" + userResponse.data.role.name + " and id:" + userResponse.data.id);
                if (userResponse.data.role) {
                    const role = userResponse.data.role.name
                    if (role == 'superadmin') {
                        navigateTo('/superadmin/dashboard')
                    }
                    else if (role == 'Admin') {
                        navigateTo('/admin/dashboard')
                    }
                    else {
                        navigateTo('/employee/dashboard')
                    }
                }
            }
        } catch (error: any) {
            state.error = error
        }
        state.isPageLoading = false
    }
}

function backToHome() {
    navigateTo('./');
}
</script>