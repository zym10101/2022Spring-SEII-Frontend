import request from "@/network/request";

const testAPI = require("@/apis"); //此处务必使用require导入（因为是module.exports导出的...）

export const warehouseInput = config => request._post(testAPI.WAREHOUSE_INPUT, config);
export const warehouseOutputPre = config => request._post(testAPI.WAREHOUSE_OUTPUT_PRE, config);
export const warehouseOutput = config => request._post(testAPI.WAREHOUSE_OUTPUT, config);
export const getWarehouseInputSheet = config => request._get(testAPI.WAREHOUSE_GET_INPUTSHEET, config);
export const getWarehouseOutputSheet = config => request._get(testAPI.WAREHOUSE_GET_OUTPUTSHEET, config);

export const getWarehouseIODetailByTime = config => request._get(testAPI.WAREHOUSE_IO_DETAIL_BY_TIME, config);
export const getWarehouseSpecialIODetailByTime = config => request._get(testAPI.WAREHOUSE_SPECIAL_IO_DETAIL_BY_TIME, config);
export const getWarehouseIPQByTime = config => request._get(testAPI.WAREHOUSE_IPQ_BY_TIME, config);
export const getWarehouseOPQByTime = config => request._get(testAPI.WAREHOUSE_OPQ_BY_TIME, config);

export const warehouseOutputSheetApprove = config => request._get(testAPI.WAREHOUSE_OUTPUTSHEET_APPROVE, config);
export const warehouseInputSheetApprove = config => request._get(testAPI.WAREHOUSE_INPUTSHEET_APPROVE, config);
export const getWarehouseCounting = config => request._get(testAPI.WAREHOUSE_DAILY_COUNT, config);
export const getWarehousePresent = config => request._get(testAPI.WAREHOUSE_PRESENT, config);
export const getWarehouseOverflow = config => request._get(testAPI.WAREHOUSE_OVERFLOW, config);
export const getWarehouseLOSS = config => request._get(testAPI.WAREHOUSE_LOSS, config);
export const getOverflowByTime = config => request._get(testAPI.OVERFLOW_BY_TIME, config);
export const getLossByTime = config => request._get(testAPI.LOSS_BY_TIME, config);
export const getPresentByTime = config => request._get(testAPI.PRESENT_BY_TIME, config);




