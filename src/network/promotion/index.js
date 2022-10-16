import request from "@/network/request";

const testAPI = require("@/apis");
export const updateUserLevelPromotion = config => request._get(testAPI.USER_LEVEL_PROMOTION, config);
export const getUserLevelPromotion = config => request._get(testAPI.GET_ALL_USER_LEVEL_PROMOTION, config);
export const updateTotalAmountPromotion = config => request._get(testAPI.TOTAL_AMOUNT_PROMOTION, config);
export const getTotalAmountPromotion = config => request._get(testAPI.GET_ALL_TOTAL_AMOUNT_PROMOTION, config);
export const addTotalAmountPromotion = config => request._get(testAPI.ADD_TOTAL_AMOUNT_PROMOTION, config);