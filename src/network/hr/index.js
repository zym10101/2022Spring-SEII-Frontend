import request from "@/network/request";

const testAPI = require("@/apis");

export const getClockInByTime = config => request._get(testAPI.HR_CLOCK_IN_BY_TIME, config);

export const getAllEmployee = config => request._get(testAPI.HR_EMPLOYEE_SHOW, config);
export const getMonthEmployee = config => request._get(testAPI.HR_EMPLOYEE_MONTH_SHOW, config);
export const getBaseAndCommissionEmployee = config => request._get(testAPI.HR_EMPLOYEE_BAC_SHOW, config);
export const getYearEmployee = config => request._get(testAPI.HR_EMPLOYEE_YEAR_SHOW, config);
export const getEmployeeById = config => request._get(testAPI.HR_EMPLOYEE_SHOW_BY_ID, config);
export const getEmployeePostById = config => request._get(testAPI.HR_EMPLOYEE_POST_SHOW_BY_ID, config);
export const employeeAdd = config => request._post(testAPI.HR_EMPLOYEE_ADD, config);
export const employeePostAdd = config => request._post(testAPI.HR_EMPLOYEE_POST_ADD, config);
export const employeeUpdate = config => request._post(testAPI.HR_EMPLOYEE_UPDATE, config);
export const employeePostUpdate = config => request._post(testAPI.HR_EMPLOYEE_POST_UPDATE, config);
export const employeeDelete = config => request._get(testAPI.HR_EMPLOYEE_DELETE, config);
export const employeePostDelete = config => request._get(testAPI.HR_EMPLOYEE_POST_DELETE, config);
export const addClockIn = config => request._post(testAPI.HR_ADD_CLOCK_IN, config);
export const employeeCalSalary = config => request._get(testAPI.HR_EMPLOYEE_SALARY_CAL, config);
export const monthlyCal = config => request._post(testAPI.HR_EMPLOYEE_MONTH_CAL, config);
export const baseAndCommissionCal = config => request._post(testAPI.HR_EMPLOYEE_BAC_CAL, config);
export const yearlyCal = config => request._post(testAPI.HR_EMPLOYEE_YEAR_CAL, config);
export const monthlyUpdate = config => request._post(testAPI.HR_EMPLOYEE_MONTH_UPDATE, config);
export const baseAndCommissionUpdate = config => request._post(testAPI.HR_EMPLOYEE_BAC_UPDATE, config);
export const yearlyUpdate = config => request._post(testAPI.HR_EMPLOYEE_YEAR_UPDATE, config);
