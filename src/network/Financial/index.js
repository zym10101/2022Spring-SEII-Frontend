import request from "@/network/request";

const testAPI = require("@/apis");

export const getAccount = config => request._get(testAPI.FINANCIAL_ACCOUNT_SHOW, config);
export const addAccount = config => request._post(testAPI.FINANCIAL_ACCOUNT_ADD, config);
export const deleteAccount = config => request._get(testAPI.FINANCIAL_ACCOUNT_DELETE, config);
export const updateAccount = config => request._get(testAPI.FINANCIAL_ACCOUNT_UPDATE, config);

export const createPaySheet = config => request._post(testAPI.FINANCIAL_PAY_SHEET_MAKE, config);
export const getPayByState = config => request._get(testAPI.FINANCIAL_PAY_SHEET_SHOW, config);
export const paySheetApproval = config => request._get(testAPI.FINANCIAL_PAY_SHEET_APPROVAL, config);

export const createReceiveSheet = config => request._post(testAPI.FINANCIAL_RECEIVE_SHEET_MAKE, config);
export const getReceiveByState = config => request._get(testAPI.FINANCIAL_RECEIVE_SHEET_SHOW, config);
export const receiveSheetApproval = config => request._get(testAPI.FINANCIAL_RECEIVE_SHEET_APPROVAL, config);

export const createWageSheet = config => request._post(testAPI.FINANCIAL_WAGE_SHEET_MAKE, config);
export const getWageByState = config => request._get(testAPI.FINANCIAL_WAGE_SHEET_SHOW, config);
export const firstApproval = config => request._get(testAPI.FINANCIAL_WAGE_SHEET_FIRST_APPROVAL, config);
export const secondApproval = config => request._get(testAPI.FINANCIAL_WAGE_SHEET_SECOND_APPROVAL, config);

export const getFinancialSheetIODetailByTime = config => request._get(testAPI.FINANCIAL_IO_DETAIL_BY_TIME, config);
export const getFinancialWageSheetIODetailByTime = config => request._get(testAPI.FINANCIAL_WAGE_IO_DETAIL_BY_TIME, config);
export const getSalaryByTime = config => request._get(testAPI.SALARY_BY_TIME, config);
export const getEmployeeWage = config => request._get(testAPI.EMPLOYEE_WAGE, config);
export const addYearBonus = config => request._get(testAPI.YEAR_BONUS, config);