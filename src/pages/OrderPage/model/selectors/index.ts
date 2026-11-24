import { IStateSchema } from "resources/store/StoreProvider";

export const getOrderData = (state: IStateSchema) => state.orderPage?.data;
export const getOrderIsLoading = (state: IStateSchema) => state.orderPage?.isLoading || false;
export const getOrderError = (state: IStateSchema) => state.orderPage?.error;
