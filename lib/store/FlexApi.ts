import { baseFlexApi as api } from './baseFlexApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postApiV1AuthLogin: build.mutation<PostApiV1AuthLoginApiResponse, PostApiV1AuthLoginApiArg>({
      query: (queryArg) => ({ url: `api/v1/auth/login`, method: 'POST', body: queryArg }),
    }),
    postApiV1AuthSendOtp: build.mutation<PostApiV1AuthSendOtpApiResponse, PostApiV1AuthSendOtpApiArg>({
      query: (queryArg) => ({ url: `api/v1/auth/send-otp`, method: 'POST', body: queryArg }),
    }),
    postApiV1AuthVerifyOtp: build.mutation<PostApiV1AuthVerifyOtpApiResponse, PostApiV1AuthVerifyOtpApiArg>({
      query: (queryArg) => ({ url: `api/v1/auth/verify-otp`, method: 'POST', body: queryArg }),
    }),
    postApiInternalApiShipmentParcel: build.mutation<
      PostApiInternalApiShipmentParcelApiResponse,
      PostApiInternalApiShipmentParcelApiArg
    >({
      query: (queryArg) => ({ url: `/api/internal/api/shipment/parcel`, method: 'POST', body: queryArg }),
    }),
    postApiInternalApiParcelCancel: build.mutation<
      PostApiInternalApiParcelCancelApiResponse,
      PostApiInternalApiParcelCancelApiArg
    >({
      query: (queryArg) => ({ url: `/api/internal/api/parcel/cancel`, method: 'POST', body: queryArg }),
    }),
    postApiInternalParcelPayablePriceUpdate: build.mutation<
      PostApiInternalParcelPayablePriceUpdateApiResponse,
      PostApiInternalParcelPayablePriceUpdateApiArg
    >({
      query: (queryArg) => ({ url: `/api/internal/parcel/payable-price/update`, method: 'POST', body: queryArg }),
    }),
    getApiExample: build.query<GetApiExampleApiResponse, GetApiExampleApiArg>({
      query: (queryArg) => ({ url: `api/example`, params: { id: queryArg } }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as FlexApi };
export type PostApiV1AuthLoginApiResponse = /** status 200  */ {
  status_code?: number;
  data?: {
    access_token?: string;
    refresh_token?: string | null;
  };
};
export type PostApiV1AuthLoginApiArg = {
  mobile: string;
  password: string;
};
export type PostApiV1AuthSendOtpApiResponse = /** status 200  */ {
  status_code?: number;
  data?: {
    ttl?: number;
  };
};
export type PostApiV1AuthSendOtpApiArg = {
  mobile: string;
};
export type PostApiV1AuthVerifyOtpApiResponse = /** status 200  */ {
  status_code?: number;
  data?: {
    access_token?: string;
    refresh_token?: string | null;
  };
};
export type PostApiV1AuthVerifyOtpApiArg = {
  mobile: string;
  code: string;
};
export type PostApiInternalApiShipmentParcelApiResponse = unknown;
export type PostApiInternalApiShipmentParcelApiArg = {
  reference_shipment_id?: number;
  consignor_id?: number;
  parcel_reference_code?: string;
  parcel_shipping_code?: string;
  parcel_information?: {
    weight?: number;
    value?: number;
    payable_price?: number;
    is_critical?: boolean;
    is_fragile?: boolean;
    is_liquid?: boolean;
    description?: string | null;
    dimension?: {
      height?: number;
      depth?: number;
      width?: number;
    };
  };
};
export type PostApiInternalApiParcelCancelApiResponse = unknown;
export type PostApiInternalApiParcelCancelApiArg = {
  consignor_id?: number;
  parcel_reference_code?: string;
};
export type PostApiInternalParcelPayablePriceUpdateApiResponse = /** status 200  */ {
  parcel_code?: string;
  shipment_id?: string;
  parcel_reference_code?: string;
  no_shipment?: boolean;
  invalid_parent?: boolean;
  invalid_status?: boolean;
  newly_created_parcel_codes?: string[];
  newly_cancelled_parcel_codes?: string[];
};
export type PostApiInternalParcelPayablePriceUpdateApiArg = {
  parcel_reference_code?: string;
  payable_price: number;
};
export type GetApiExampleApiResponse = /** status 200  */ {
  status_code?: number;
  data?: {
    result?: string;
  };
};
export type GetApiExampleApiArg = number;
export const {
  usePostApiV1AuthLoginMutation,
  usePostApiV1AuthSendOtpMutation,
  usePostApiV1AuthVerifyOtpMutation,
  usePostApiInternalApiShipmentParcelMutation,
  usePostApiInternalApiParcelCancelMutation,
  usePostApiInternalParcelPayablePriceUpdateMutation,
  useGetApiExampleQuery,
  useLazyGetApiExampleQuery,
} = injectedRtkApi;
