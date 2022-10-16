//TEST
const TEST_GET = "/api/test/get";
const TEST_POST = "/api/test/post";

const AUTH = "/api/user/auth";
const LOGIN = "/api/user/login";
const REGISTER = "/api/user/register";

// 商品分类管理
const COMMODITY_CLASSIFICATION_ALL = "/api/category/queryAll";
const COMMODITY_CLASSIFICATION_CREATE = "/api/category/create";
const COMMODITY_CLASSIFICATION_UPDATE = "/api/category/update";
const COMMODITY_CLASSIFICATION_DELETE = "/api/category/delete";

// 商品管理
const COMMODITY_ALL = "/api/product/queryAll";
const COMMODITY_CREATE = "/api/product/create";
const COMMODITY_UPDATE = "/api/product/update";
const COMMODITY_DELETE = "/api/product/delete";


const WAREHOUSE_INPUT = "/api/warehouse/input";
const WAREHOUSE_OUTPUT_PRE = "/api/warehouse/product/count";
const WAREHOUSE_OUTPUT = "/api/warehouse/output";
const WAREHOUSE_GET_INPUTSHEET = "/api/warehouse/inputSheet/state";
const WAREHOUSE_GET_OUTPUTSHEET = "/api/warehouse/outputSheet/state";
const WAREHOUSE_IO_DETAIL_BY_TIME = "/api/warehouse/sheetContent/time";
const WAREHOUSE_SPECIAL_IO_DETAIL_BY_TIME = "/api/warehouse/specialSheetContent/time";
const WAREHOUSE_IPQ_BY_TIME = "/api/warehouse/inputSheet/time/quantity";
const WAREHOUSE_OPQ_BY_TIME = "/api/warehouse/outputSheet/time/quantity";
const WAREHOUSE_OUTPUTSHEET_APPROVE = "/api/warehouse/outputSheet/approve";
const WAREHOUSE_INPUTSHEET_APPROVE = "/api/warehouse/inputSheet/approve";
const WAREHOUSE_DAILY_COUNT = "/api/warehouse/warehouse/counting";
const WAREHOUSE_PRESENT = "/api/warehouse/warehouse/present";
const WAREHOUSE_OVERFLOW = "/api/warehouse/warehouse/overflow";
const OVERFLOW_BY_TIME = "/api/warehouse/warehouse/overflowTotal";
const WAREHOUSE_LOSS = "/api/warehouse/warehouse/loss";
const LOSS_BY_TIME = "/api/warehouse/warehouse/lossTotal";
const PRESENT_BY_TIME = "/api/warehouse/warehouse/presentTotal";
const WAREHOUSE_EXPORT_EXCEL = "/api/warehouse/warehouse/exportExcel";


// 销售管理
// 进货管理
const PURCHASE_ALL = "/api/purchase/sheet-show";
const PURCHASE_FIND_SHEET_BY_ID = "/api/purchase/find-sheet";
const PURCHASE_CREATE = "/api/purchase/sheet-make";
const PURCHASE_FIRST_APPROVAL = "/api/purchase/first-approval";
const PURCHASE_SECOND_APPROVAL = "/api/purchase/second-approval";
const PURCHASE_IO_DETAIL_BY_TIME = "/api/purchase/sheetContent/time";
const PURCHASE_INPUT_BY_TIME = "/api/purchase/time";
// 进货退货管理
const PURCHASE_RETURN_ALL = "/api/purchase-returns/sheet-show";
const PURCHASE_RETURN_CREATE = "/api/purchase-returns/sheet-make";
const PURCHASE_RETURN_FIRST_APPROVAL = "/api/purchase-returns/first-approval";
const PURCHASE_RETURN_SECOND_APPROVAL = "/api/purchase-returns/second-approval";
const PURCHASE_OUTPUT_BY_TIME = "/api/purchase-returns/time";
// 销售管理
const SALE_ALL = "/api/sale/sheet-show";
const SALE_CREATE = "/api/sale/sheet-make";
const SALE_FIRST_APPROVAL = "/api/sale/first-approval";
const SALE_SECOND_APPROVAL = "/api/sale/second-approval";
const SALE_FIND_SHEET_BY_ID = "/api/sale/find-sheet";
const SALE_IO_DETAIL_BY_TIME = "/api/sale/sheetContent/time";
const SALE_INCOME_BY_TIME = "/api/sale/income";
const SALE_DISCOUNT_BY_TIME = "/api/sale/discount";
const SALE_VOUCHER_BY_TIME = "/api/sale/voucher";
const SALE_COST_BY_TIME = "/api/sale/cost";
const SALE_OUTGO_BY_TIME = "/api/sale-returns/outgo";
const SALE_DETAIL = "/api/sale/saleDetail";
// 销售退货管理
const SALE_RETURN_ALL = "/api/sale-returns/sheet-show";
const SALE_RETURN_CREATE = "/api/sale-returns/sheet-make";
const SALE_RETURN_FIRST_APPROVAL = "/api/sale-returns/first-approval";
const SALE_RETURN_SECOND_APPROVAL = "/api/sale-returns/second-approval";
const SALE_RETURN_COST_BY_TIME = "/api/sale-returns/cost";
// 客户管理
const CUSTOMER_QUERY = "/api/customer/findByType";
const SALE_PURCHASE_ALL = "/api/purchase/sheet-show";
const SALE_PURCHASE_CREATE = "/api/purchase/sheet-make";
const SALE_CUSTOMER_QUERY = "/api/customer/findByType";
const SALE_CUSTOMER_MAX = "/api/sale/maxAmountCustomer";
const SALE_CUSTOMER_ADD = "/api/customer/register";
const SALE_CUSTOMER_DROP = "/api/customer/drop";
//促销管理
const USER_LEVEL_PROMOTION = "/api/promotion/user-level-promotion";
const GET_ALL_USER_LEVEL_PROMOTION = "/api/promotion/get-all-user-level-promotion";
const TOTAL_AMOUNT_PROMOTION = "/api/promotion/total-amount-promotion";
const GET_ALL_TOTAL_AMOUNT_PROMOTION = "/api/promotion/get-all-total-amount-promotion";
const DELETE_TOTAL_AMOUNT_PROMOTION = "/api/promotion/delete-total-amount-promotion/";
const ADD_TOTAL_AMOUNT_PROMOTION = "/api/promotion/add-total-amount-promotion/";
// 财务管理
const FINANCIAL_ACCOUNT_SHOW = "/api/account/queryAll";
const FINANCIAL_ACCOUNT_ADD = "/api/account/register";
const FINANCIAL_ACCOUNT_DELETE = "/api/account/drop";
const FINANCIAL_ACCOUNT_UPDATE = "/api/account/update";
const FINANCIAL_PAY_SHEET_MAKE = "/api/pay/sheet-make";
const FINANCIAL_PAY_SHEET_SHOW = "/api/pay/sheet-show";
const FINANCIAL_PAY_SHEET_APPROVAL = "/api/pay/approval";
const FINANCIAL_RECEIVE_SHEET_MAKE = "/api/receive/sheet-make";
const FINANCIAL_RECEIVE_SHEET_SHOW = "/api/receive/sheet-show";
const FINANCIAL_RECEIVE_SHEET_APPROVAL = "/api/receive/approval";
const FINANCIAL_WAGE_SHEET_MAKE = "/api/wage/sheet-make";
const FINANCIAL_WAGE_SHEET_SHOW = "/api/wage/sheet-show";
const FINANCIAL_WAGE_SHEET_FIRST_APPROVAL = "/api/wage/first-approval";
const FINANCIAL_WAGE_SHEET_SECOND_APPROVAL = "/api/wage/second-approval";
const FINANCIAL_IO_DETAIL_BY_TIME = "/api/financial/sheetContent/time";
const FINANCIAL_WAGE_IO_DETAIL_BY_TIME = "/api/financial/wageSheetContent/time";
const SALARY_BY_TIME = "/api/wage/salary/time";
const EMPLOYEE_WAGE = "/api/employee/findAll";
const YEAR_BONUS = "/api/employee-post/addYearBonus";
// 人力资源
const HR_CLOCK_IN_BY_TIME = "/api/attendance/findByTime";
const HR_EMPLOYEE_SHOW = "/api/employee/findGeneralInfoUnion";
const HR_EMPLOYEE_MONTH_SHOW = "/api/employee/findMonthlyInfoUnion";
const HR_EMPLOYEE_BAC_SHOW = "/api/employee/findCommissionInfoUnion";
const HR_EMPLOYEE_YEAR_SHOW = "/api/employee/findYearlyInfoUnion";
const HR_EMPLOYEE_SHOW_BY_ID = "/api/employee/findById";
const HR_EMPLOYEE_POST_SHOW_BY_ID = "/api/employee-post/findById";
const HR_EMPLOYEE_ADD = "/api/employee/add";
const HR_EMPLOYEE_POST_ADD = "/api/employee-post/add";
const HR_EMPLOYEE_UPDATE = "/api/employee/update";
const HR_EMPLOYEE_POST_UPDATE = "/api/employee-post/update";
const HR_EMPLOYEE_DELETE = "/api/employee/delete";
const HR_EMPLOYEE_POST_DELETE = "/api/employee-post/delete";
const HR_ADD_CLOCK_IN = "/api/attendance/add";
const HR_EMPLOYEE_SALARY_CAL = "/api/employee-post/calSalary";
const HR_EMPLOYEE_MONTH_CAL = "/api/employee-post/addParaM";
const HR_EMPLOYEE_BAC_CAL = "/api/employee-post/addParaA";
const HR_EMPLOYEE_YEAR_CAL = "/api/employee-post/addParaY";
const HR_EMPLOYEE_MONTH_UPDATE = "/api/employee-post/updateM";
const HR_EMPLOYEE_BAC_UPDATE = "/api/employee-post/updateB";
const HR_EMPLOYEE_YEAR_UPDATE = "/api/employee-post/updateY";


module.exports = {
  TEST_GET,
  TEST_POST,

  AUTH,
  LOGIN,
  REGISTER,
  COMMODITY_CLASSIFICATION_ALL,
  COMMODITY_CLASSIFICATION_CREATE,
  COMMODITY_CLASSIFICATION_UPDATE,
  COMMODITY_CLASSIFICATION_DELETE,

  COMMODITY_ALL,
  COMMODITY_CREATE,
  COMMODITY_UPDATE,
  COMMODITY_DELETE,

  WAREHOUSE_INPUT,
  WAREHOUSE_OUTPUT_PRE,
  WAREHOUSE_OUTPUT,
  WAREHOUSE_GET_INPUTSHEET,
  WAREHOUSE_GET_OUTPUTSHEET,
  WAREHOUSE_IO_DETAIL_BY_TIME,
  WAREHOUSE_SPECIAL_IO_DETAIL_BY_TIME,
  WAREHOUSE_IPQ_BY_TIME,
  WAREHOUSE_OPQ_BY_TIME,
  WAREHOUSE_OUTPUTSHEET_APPROVE,
  WAREHOUSE_INPUTSHEET_APPROVE,
  WAREHOUSE_DAILY_COUNT,
  WAREHOUSE_PRESENT,
  WAREHOUSE_OVERFLOW,
  OVERFLOW_BY_TIME,
  WAREHOUSE_LOSS,
  LOSS_BY_TIME,
  PRESENT_BY_TIME,
  WAREHOUSE_EXPORT_EXCEL,

  PURCHASE_ALL,
  PURCHASE_CREATE,
  PURCHASE_FIRST_APPROVAL,
  PURCHASE_SECOND_APPROVAL,
  PURCHASE_IO_DETAIL_BY_TIME,
  PURCHASE_INPUT_BY_TIME,
  PURCHASE_RETURN_ALL,
  PURCHASE_RETURN_CREATE,
  PURCHASE_RETURN_FIRST_APPROVAL,
  PURCHASE_RETURN_SECOND_APPROVAL,
  PURCHASE_OUTPUT_BY_TIME,
  PURCHASE_FIND_SHEET_BY_ID,

  SALE_ALL,
  SALE_CREATE,
  SALE_FIRST_APPROVAL,
  SALE_SECOND_APPROVAL,
  SALE_RETURN_ALL,
  SALE_RETURN_CREATE,
  SALE_RETURN_FIRST_APPROVAL,
  SALE_RETURN_SECOND_APPROVAL,
  SALE_RETURN_COST_BY_TIME,
  SALE_CUSTOMER_QUERY,
  SALE_CUSTOMER_MAX,
  SALE_FIND_SHEET_BY_ID,
  SALE_INCOME_BY_TIME,
  SALE_DISCOUNT_BY_TIME,
  SALE_VOUCHER_BY_TIME,
  SALE_COST_BY_TIME,
  SALE_OUTGO_BY_TIME,
  SALE_DETAIL,

  CUSTOMER_QUERY,
  SALE_CUSTOMER_ADD,
  SALE_CUSTOMER_DROP,
  SALE_PURCHASE_ALL,
  SALE_PURCHASE_CREATE,
  SALE_IO_DETAIL_BY_TIME,


  USER_LEVEL_PROMOTION,
  TOTAL_AMOUNT_PROMOTION,
  GET_ALL_USER_LEVEL_PROMOTION,
  GET_ALL_TOTAL_AMOUNT_PROMOTION,
  DELETE_TOTAL_AMOUNT_PROMOTION,
  ADD_TOTAL_AMOUNT_PROMOTION,

  FINANCIAL_ACCOUNT_SHOW,
  FINANCIAL_ACCOUNT_ADD,
  FINANCIAL_ACCOUNT_DELETE,
  FINANCIAL_ACCOUNT_UPDATE,
  FINANCIAL_PAY_SHEET_MAKE,
  FINANCIAL_PAY_SHEET_SHOW,
  FINANCIAL_PAY_SHEET_APPROVAL,
  FINANCIAL_RECEIVE_SHEET_MAKE,
  FINANCIAL_RECEIVE_SHEET_SHOW,
  FINANCIAL_RECEIVE_SHEET_APPROVAL,
  FINANCIAL_WAGE_SHEET_MAKE,
  FINANCIAL_WAGE_SHEET_SHOW,
  FINANCIAL_WAGE_SHEET_FIRST_APPROVAL,
  FINANCIAL_WAGE_SHEET_SECOND_APPROVAL,
  FINANCIAL_IO_DETAIL_BY_TIME,
  FINANCIAL_WAGE_IO_DETAIL_BY_TIME,
  SALARY_BY_TIME,
  EMPLOYEE_WAGE,
  YEAR_BONUS,
  HR_CLOCK_IN_BY_TIME,
  HR_EMPLOYEE_SHOW,
  HR_EMPLOYEE_MONTH_SHOW,
  HR_EMPLOYEE_BAC_SHOW,
  HR_EMPLOYEE_YEAR_SHOW,
  HR_EMPLOYEE_SHOW_BY_ID,
  HR_EMPLOYEE_POST_SHOW_BY_ID,
  HR_EMPLOYEE_ADD,
  HR_EMPLOYEE_POST_ADD,
  HR_EMPLOYEE_UPDATE,
  HR_EMPLOYEE_POST_UPDATE,
  HR_EMPLOYEE_DELETE,
  HR_EMPLOYEE_POST_DELETE,
  HR_ADD_CLOCK_IN,
  HR_EMPLOYEE_SALARY_CAL,
  HR_EMPLOYEE_MONTH_CAL,
  HR_EMPLOYEE_BAC_CAL,
  HR_EMPLOYEE_YEAR_CAL,
  HR_EMPLOYEE_MONTH_UPDATE,
  HR_EMPLOYEE_BAC_UPDATE,
  HR_EMPLOYEE_YEAR_UPDATE,
};
