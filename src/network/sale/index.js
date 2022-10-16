import request from "@/network/request";

const testAPI = require("@/apis");


export const getAllCustomer = config => request._get(testAPI.SALE_CUSTOMER_QUERY, config);
export const getMaxAmountCustomerOfSalesmanByTime = config => request._get(testAPI.SALE_CUSTOMER_MAX, config);

export const getAllSale = config => request._get(testAPI.SALE_ALL, config);
export const getAllSaleReturn = config => request._get(testAPI.SALE_RETURN_ALL, config);
export const createSale = config => request._post(testAPI.SALE_CREATE, config);
export const createSaleReturn = config => request._post(testAPI.SALE_RETURN_CREATE, config);
export const returnFirstApproval = config => request._get(testAPI.SALE_RETURN_FIRST_APPROVAL, config);
export const firstApproval = config => request._get(testAPI.SALE_FIRST_APPROVAL, config);
export const returnSecondApproval = config => request._get(testAPI.SALE_RETURN_SECOND_APPROVAL, config);
export const secondApproval = config => request._get(testAPI.SALE_SECOND_APPROVAL, config);
export const getSaleBySheetId = config => request._get(testAPI.SALE_FIND_SHEET_BY_ID, config);
export const getSaleSheetIODetailByTime = config => request._get(testAPI.SALE_IO_DETAIL_BY_TIME, config);
export const getSaleIncomeByTime = config => request._get(testAPI.SALE_INCOME_BY_TIME, config);
export const getSaleDiscountByTime = config => request._get(testAPI.SALE_DISCOUNT_BY_TIME, config);
export const getSaleVoucherByTime = config => request._get(testAPI.SALE_VOUCHER_BY_TIME, config);
export const getSaleCostByTime = config => request._get(testAPI.SALE_COST_BY_TIME, config);
export const getSaleReturnCostByTime = config => request._get(testAPI.SALE_RETURN_COST_BY_TIME, config);
export const getSaleOutgoByTime = config => request._get(testAPI.SALE_OUTGO_BY_TIME, config);

export const getSaleDetailByFilter = config => request._get(testAPI.SALE_DETAIL, config);

