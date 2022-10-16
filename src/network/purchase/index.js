import request from "@/network/request";

const testAPI = require("@/apis");

export const getAllPurchase = config => request._get(testAPI.PURCHASE_ALL, config);
export const createPurchase = config => request._post(testAPI.PURCHASE_CREATE, config);
export const firstApproval = config => request._get(testAPI.PURCHASE_FIRST_APPROVAL, config);
export const secondApproval = config => request._get(testAPI.PURCHASE_SECOND_APPROVAL, config);
export const getAllPurchaseReturn = config => request._get(testAPI.PURCHASE_RETURN_ALL, config);
export const createPurchaseReturn = config => request._post(testAPI.PURCHASE_RETURN_CREATE, config);
export const returnFirstApproval = config => request._get(testAPI.PURCHASE_RETURN_FIRST_APPROVAL, config);
export const returnSecondApproval = config => request._get(testAPI.PURCHASE_RETURN_SECOND_APPROVAL, config);
export const getAllCustomer = config => request._get(testAPI.CUSTOMER_QUERY, config);
export const getPurchaseBySheetId = config => request._get(testAPI.PURCHASE_FIND_SHEET_BY_ID, config);
export const registerCustomer = config => request._post(testAPI.SALE_CUSTOMER_ADD,config);
export const dropCustomer =config => request._get(testAPI.SALE_CUSTOMER_DROP,config);
export const getPurchaseSheetIODetailByTime =config => request._get(testAPI.PURCHASE_IO_DETAIL_BY_TIME,config);
export const getPurchaseInputByTime =config => request._get(testAPI.PURCHASE_INPUT_BY_TIME,config);
export const getPurchaseOutputByTime =config => request._get(testAPI.PURCHASE_OUTPUT_BY_TIME,config);
