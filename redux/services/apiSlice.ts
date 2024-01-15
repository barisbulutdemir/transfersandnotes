import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setAuth, logout } from "../features/authSlice";
import { Mutex } from "async-mutex";


interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface SocialAuthArgs {
  state: string;
  code: string;
}

interface CreateUserResponse {
  success: boolean;
  user: User;
}

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
  credentials: "include",
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: "/jwt/refresh/",
            method: "POST",
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(setAuth());
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // kullanıcı bilgileri
    retriveUser: builder.query<User, void >({
      query: () => "/profile/",
    }),

    // google login
    googleAuthenticate: builder.mutation<CreateUserResponse, SocialAuthArgs>({
      query: ({ state, code }) => ({
        url: `o/google-oauth2/?state=${encodeURIComponent(state)}&code=${code}/`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),

      login: builder.mutation({
        query: ({ email, password }) => ({
          url: "/jwt/create/",
          method: "POST",
          body: { email, password },
        }),
      }),
      //register
      register: builder.mutation({
        query: ({ first_name, last_name, email, password, re_password }) => ({
          url: "/users/",
          method: "POST",
          body: { first_name, last_name, email, password, re_password },
        }),
      }),
      verify: builder.mutation({
        query: () => ({
          url: '/jwt/verify/',
          method: "POST",
        })
      }),
      logout: builder.mutation({
        query: () => ({
          url: '/logout/',
          method: "POST",
        })
      }),
      activation: builder.mutation({
        query: ({ uid, token }) => ({
          url: '/users/activation/',
          method: "POST",
          body: { uid, token }
        })
      }),
      resetPassword: builder.mutation({
        query: ( email ) => ({
          url: '/users/reset_password/',
          method: "POST",
          body: { email }
        })
      }),
      resetPasswordConfirm: builder.mutation({
        query: ( {uid, token, new_password, re_new_password } ) => ({
          url: '/users/reset_password_confirm/',
          method: "POST",
          body: {uid, token, new_password, re_new_password } 
        })
      }),
  }),
});


export const {
  useRetriveUserQuery ,
  useGoogleAuthenticateMutation,
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
  useActivationMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
} = apiSlice;