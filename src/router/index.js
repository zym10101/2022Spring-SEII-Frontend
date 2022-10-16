import Vue from "vue";
import VueRouter from "vue-router";
import { ROLE, PATH } from "@/common/const";

const Error = () => import("../components/content/Error");
const Login = () => import("../views/auth/Login");
const Home = () => import("../views/Home");
const CommodityManagement = () =>
  import("../views/commodity/CommodityManagement");
const CommodityClassification = () =>
  import("../views/commodity/CommodityClassification");
const InventoryManagement = () => import("../views/inventory/InventoryManagement");
const InventoryCheck = () => import("../views/inventory/InventoryCheck");
const InventoryOperation = () =>
  import("../views/inventory/InventoryOperation");
const InventoryIn = () => import("../views/inventory/InventoryIn");
const InventoryOut = () => import("../views/inventory/InventoryOut");
const InventoryLoss = () => import("../views/inventory/InventoryLoss");
const InventoryOverflow = () => import("../views/inventory/InventoryOverflow");
const InventoryPresent = () => import("../views/inventory/InventoryPresent");
const InventoryView = () => import("../views/inventory/InventoryView");
const InventoryWarning = () => import("../views/inventory/InventoryWarning");
const PurchaseView = () => import("../views/purchase/PurchaseView");
const PurchaseReturnView = () => import("../views/purchase/PurchaseReturnView");
const SaleView = () => import("../views/sale/SaleView");
const SaleReturnView = () => import("../views/sale/SaleReturnView");
const CustomerView = () => import ("../views/purchase/CustomerView");
const FinancialView = () => import("../views/financial/FinancialView");
const PaySheetView = () => import("../views/financial/PaySheetView");
const ReceiveSheetView = () => import("../views/financial/ReceiveSheetView");
const WageSheetView = () => import("../views/financial/WageSheetView");
const yearBonus = () => import("../views/financial/YearBonus");
const BusinessDetailView = () => import("../views/financial/BusinessDetailView");
const BusinessHistoryView = () => import("../views/financial/BusinessHistoryView");
const BusinessSituationView = () => import("../views/financial/BusinessSituationView");
const UserLevelPromotionStrategy = () => import("../views/promotion/UserLevelPromotionView");
const TotalAmountPromotionStrategy = () => import("../views/promotion/TotalAmountPromotionView");
const PricePromotionStrategy = () => import("../views/promotion/PricePromotionView");
const EmployeeManagementView = () => import("../views/hr/EmployeeManagementView");
const EmployeeClockInView = () => import("../views/hr/EmployeeClockInView");
const EmployeeWageManagementView = () => import("../views/hr/EmployeeWageManagementView");


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/error",
    component: Error
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: () => import("@/views/auth/register.vue")
  },
  // 商品管理
  {
    path: PATH.COMMODITY_CLASSIFICATION.path,
    component: CommodityClassification,
    meta: { requiresAuth: PATH.COMMODITY_CLASSIFICATION.requiresAuth }
  },
  {
    path: PATH.COMMODITY_MANAGEMENT.path,
    component: CommodityManagement,
    meta: { requiresAuth: PATH.COMMODITY_MANAGEMENT.requiresAuth }
  },
  // 库存管理
  {
    path: PATH.INVENTORY_MANAGEMENT.path,
    component: InventoryManagement,
    meta: { requiresAuth: PATH.INVENTORY_MANAGEMENT.requiresAuth }
  },
  {
    path: PATH.INVENTORY_CHECK.path,
    component: InventoryCheck,
    meta: { requiresAuth: PATH.INVENTORY_CHECK.requiresAuth }
  },
  {
    path: PATH.INVENTORY_OPERATION.path,
    component: InventoryOperation,
    name: "InventoryOperation",
    meta: { requiresAuth: PATH.INVENTORY_OPERATION.requiresAuth }
  },
  {
    path: PATH.INVENTORY_IN.path,
    component: InventoryIn,
    name: "InventoryIn",
    meta: { requiresAuth: PATH.INVENTORY_LOSS.requiresAuth }
  },
  {
    path: PATH.INVENTORY_OUT.path,
    component: InventoryOut,
    name: "InventoryOut",
    meta: { requiresAuth: PATH.INVENTORY_LOSS.requiresAuth }
  },
  {
    path: PATH.INVENTORY_LOSS.path,
    component: InventoryLoss,
    name: "InventoryLoss",
    meta: { requiresAuth: PATH.INVENTORY_LOSS.requiresAuth }
  },
  {
    path: PATH.INVENTORY_OVERFLOW.path,
    component: InventoryOverflow,
    name: "InventoryOverflow",
    meta: { requiresAuth: PATH.INVENTORY_OVERFLOW.requiresAuth }
  },
  {
    path: PATH.INVENTORY_PRESENT.path,
    component: InventoryPresent,
    name: "InventoryPresent",
    meta: { requiresAuth: PATH.INVENTORY_PRESENT.requiresAuth }
  },
  {
    path: PATH.INVENTORY_VIEW.path,
    component: InventoryView,
    meta: { requiresAuth: PATH.INVENTORY_VIEW.requiresAuth }
  },
  {
    path: PATH.INVENTORY_WARNING.path,
    component: InventoryWarning,
    name: "InventoryWarning",
    meta: { requiresAuth: PATH.INVENTORY_WARNING.requiresAuth }
  },
  // 销售管理
  {
    path: PATH.PURCHASE_VIEW.path,
    component: PurchaseView,
    name: "PurchaseView",
    meta: { requiresAuth: PATH.PURCHASE_VIEW.requiresAuth }
  },
  {
    path: PATH.PURCHASE_RETURN_VIEW.path,
    component: PurchaseReturnView,
    name: "PurchaseReturnView",
    meta: { requiresAuth: PATH.PURCHASE_RETURN_VIEW.requiresAuth }
  },
  {
    path: PATH.SALE_VIEW.path,
    component: SaleView,
    name: "SaleView",
    meta: { requiresAuth: PATH.SALE_VIEW.requiresAuth }
  },
  {
    path: PATH.SALE_RETURN_VIEW.path,
    component: SaleReturnView,
    name: "SaleReturnView",
    meta: { requiresAuth: PATH.SALE_RETURN_VIEW.requiresAuth }
  },
  {
    path: PATH.CUSTOMER_VIEW.path,
    component: CustomerView,
    name: "CustomerView",
    meta: { requiresAuth: PATH.CUSTOMER_VIEW.requiresAuth }
  },
  //财务
  {
    path: PATH.FINANCIAL_VIEW.path,
    component: FinancialView,
    meta: { requiresAuth: PATH.FINANCIAL_VIEW.requiresAuth }
  },
  {
    path: PATH.PAY_SHEET_VIEW.path,
    component: PaySheetView,
    meta: { requiresAuth: PATH.PAY_SHEET_VIEW.requiresAuth }
  },
  {
    path: PATH.RECEIVE_SHEET_VIEW.path,
    component: ReceiveSheetView,
    meta: { requiresAuth: PATH.RECEIVE_SHEET_VIEW.requiresAuth }
  },
  {
    path: PATH.WAGE_SHEET_VIEW.path,
    component: WageSheetView,
    meta: { requiresAuth: PATH.WAGE_SHEET_VIEW.requiresAuth }
  },
  {
    path: PATH.YEAR_BONUS.path,
    component: yearBonus,
    meta: { requiresAuth: PATH.YEAR_BONUS.requiresAuth }
  },
  {
    path: PATH.BUSINESS_DETAIL_VIEW.path,
    component: BusinessDetailView,
    meta: { requiresAuth: PATH.BUSINESS_DETAIL_VIEW.requiresAuth }
  },
  {
    path: PATH.BUSINESS_HISTORY_VIEW.path,
    component: BusinessHistoryView,
    meta: { requiresAuth: PATH.BUSINESS_HISTORY_VIEW.requiresAuth }
  },
  {
    path: PATH.BUSINESS_SITUATION_VIEW.path,
    component: BusinessSituationView,
    meta: { requiresAuth: PATH.BUSINESS_SITUATION_VIEW.requiresAuth }
  },
  {
    path: PATH.USER_LEVEL_PROMOTION_STRATEGY.path,
    component: UserLevelPromotionStrategy,
    meta: { requiresAuth: PATH.USER_LEVEL_PROMOTION_STRATEGY.requiresAuth }
  },
  {
    path: PATH.TOTAL_AMOUNT_PROMOTION_STRATEGY.path,
    component: TotalAmountPromotionStrategy,
    meta: { requiresAuth: PATH.TOTAL_AMOUNT_PROMOTION_STRATEGY.requiresAuth }
  },
  {
    path: PATH.PRICE_PROMOTION_STRATEGY.path,
    component: PricePromotionStrategy,
    meta: { requiresAuth: PATH.PRICE_PROMOTION_STRATEGY.requiresAuth }
  },
  // HR
  {
    path: PATH.EMPLOYEE_MANAGEMENT_VIEW.path,
    component: EmployeeManagementView,
    meta: { requiresAuth: PATH.EMPLOYEE_MANAGEMENT_VIEW.requiresAuth }
  },
  {
    path: PATH.EMPLOYEE_CLOCK_IN_VIEW.path,
    component: EmployeeClockInView,
    meta: { requiresAuth: PATH.EMPLOYEE_CLOCK_IN_VIEW.requiresAuth }
  },
  {
    path: PATH.EMPLOYEE_WAGE_MANAGEMENT_VIEW.path,
    component: EmployeeWageManagementView,
    meta: { requiresAuth: PATH.EMPLOYEE_WAGE_MANAGEMENT_VIEW.requiresAuth }
  },

  // -----------------------未找到页面-----------------------------
  {
    path: "*",
    redirect: "/error"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  // console.log(to.path);
  if (to.path === "/error" || to.path === "/login") {
    next();
  } else if (to.path === "/") {
    let token = sessionStorage.getItem("token");
    let role = sessionStorage.getItem("role");
    if (token == null || role == null) next("/login");
    else next();
  } else if (to.meta.requiresAuth) {
    if (
      to.meta.requiresAuth.some(
        role => role.toString() === sessionStorage.getItem("role")
      )
    ) {
      //有权限
      // console.log("获得访问权限");
      next();
    } else {
      // console.log("无权限访问");
      next("/"); //无权限,跳回主页
    }
  } else {
    // 非法路径, 直接next (跳转error)
    next();
  }
});

export default router;
