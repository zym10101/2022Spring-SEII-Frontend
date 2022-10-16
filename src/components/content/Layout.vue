<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="250px" style="background-color: #545c64">
      <header class="title">
        <div class="title-inner">ERP</div>
      </header>
      <el-menu
        :default-active="getActivePath"
        class="el-menu-vertical-demo"
        background-color="#fff"
        text-color="#000000DE"
        @open="handleOpen"
        @close="handleClose"
        active-text-color="#7e57c2"
        router
      >
        <el-submenu index="1"
                    v-if="permit(PATH.COMMODITY_CLASSIFICATION.requiresAuth)">
          <template slot="title">
            <i class="el-icon-receiving"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item
            :index="PATH.COMMODITY_CLASSIFICATION.path"
            v-if="permit(PATH.COMMODITY_CLASSIFICATION.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">商品分类管理</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.COMMODITY_MANAGEMENT.path"
            v-if="permit(PATH.COMMODITY_MANAGEMENT.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="2" v-if="permit(PATH.INVENTORY_OPERATION.requiresAuth)">
          <template slot="title">
            <i class="el-icon-receiving"></i>
            <span slot="title">库存管理</span>
          </template>
          <el-menu-item
            :index="PATH.INVENTORY_MANAGEMENT.path"
            v-if="permit(PATH.INVENTORY_MANAGEMENT.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">库存管理</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.INVENTORY_VIEW.path"
            v-if="permit(PATH.INVENTORY_VIEW.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">库存查看</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.INVENTORY_CHECK.path"
            v-if="permit(PATH.INVENTORY_CHECK.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">库存盘点</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.INVENTORY_PRESENT.path"
            v-if="permit(PATH.INVENTORY_PRESENT.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">库存赠送</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.INVENTORY_OVERFLOW.path"
            v-if="permit(PATH.INVENTORY_OVERFLOW.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">库存报溢</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.INVENTORY_LOSS.path"
            v-if="permit(PATH.INVENTORY_LOSS.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">库存报损</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.INVENTORY_WARNING.path"
            v-if="permit(PATH.INVENTORY_WARNING.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">库存报警</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3"
                    v-if="permit(PATH.CUSTOMER_VIEW.requiresAuth)">
          <template slot="title">
            <i class="el-icon-sell"></i>
            <span slot="title">销售管理</span>
          </template>
          <el-menu-item
            :index="PATH.PURCHASE_VIEW.path"
            v-if="permit(PATH.PURCHASE_VIEW.requiresAuth)"
          >
            <i class="el-icon-shopping-cart-full"></i>
            <span slot="title">进货管理</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.PURCHASE_RETURN_VIEW.path"
            v-if="permit(PATH.PURCHASE_RETURN_VIEW.requiresAuth)"
          >
            <i class="el-icon-shopping-cart-2"></i>
            <span slot="title">进货退货管理</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.SALE_VIEW.path"
            v-if="permit(PATH.SALE_VIEW.requiresAuth)"
          >
            <i class="el-icon-sell"></i>
            <span slot="title">销售管理</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.SALE_RETURN_VIEW.path"
            v-if="permit(PATH.SALE_RETURN_VIEW.requiresAuth)"
          >
            <i class="el-icon-sell"></i>
            <span slot="title">销售退货管理</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.CUSTOMER_VIEW.path"
            v-if="permit(PATH.CUSTOMER_VIEW.requiresAuth)"
          >
            <i class="el-icon-user"></i>
            <span slot="title">客户管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4"
                    v-if="permit(PATH.BUSINESS_DETAIL_VIEW.requiresAuth)">
          <template slot="title">
            <i class="el-icon-receiving"></i>
            <span slot="title">财务管理</span>
          </template>
          <el-menu-item
            :index="PATH.FINANCIAL_VIEW.path"
            v-if="permit(PATH.FINANCIAL_VIEW.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">账户管理</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.RECEIVE_SHEET_VIEW.path"
            v-if="permit(PATH.RECEIVE_SHEET_VIEW.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title" v-if="getUserRole==='FINANCIAL_STAFF'">收款单制定</span>
            <span slot="title" v-if="getUserRole==='GM'">收款单审批</span>
            <span slot="title" v-if="getUserRole==='ADMIN'">收款单管理</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.PAY_SHEET_VIEW.path"
            v-if="permit(PATH.PAY_SHEET_VIEW.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title" v-if="getUserRole==='FINANCIAL_STAFF'">付款单制定</span>
            <span slot="title" v-if="getUserRole==='GM'">付款单审批</span>
            <span slot="title" v-if="getUserRole==='ADMIN'">付款单管理</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.WAGE_SHEET_VIEW.path"
            v-if="permit(PATH.WAGE_SHEET_VIEW.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title" v-if="getUserRole==='FINANCIAL_STAFF'">工资单制定</span>
            <span slot="title" v-if="getUserRole==='GM'">工资单审批</span>
            <span slot="title" v-if="getUserRole==='ADMIN'">工资单管理</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.YEAR_BONUS.path"
            v-if="permit(PATH.YEAR_BONUS.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">制定年终奖</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.BUSINESS_DETAIL_VIEW.path"
            v-if="permit(PATH.BUSINESS_DETAIL_VIEW.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">查看销售明细</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.BUSINESS_HISTORY_VIEW.path"
            v-if="permit(PATH.BUSINESS_HISTORY_VIEW.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">查看经营历程</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.BUSINESS_SITUATION_VIEW.path"
            v-if="permit(PATH.BUSINESS_SITUATION_VIEW.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">查看经营情况</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="5"
                    v-if="permit(PATH.EMPLOYEE_CLOCK_IN_VIEW.requiresAuth)">
          <template slot="title">
            <i class="el-icon-receiving"></i>
            <span slot="title">人力资源管理</span>
          </template>
          <el-menu-item
            :index="PATH.EMPLOYEE_MANAGEMENT_VIEW.path"
            v-if="permit(PATH.EMPLOYEE_MANAGEMENT_VIEW.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">员工管理</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.EMPLOYEE_CLOCK_IN_VIEW.path"
            v-if="permit(PATH.EMPLOYEE_CLOCK_IN_VIEW.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">员工打卡</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.EMPLOYEE_WAGE_MANAGEMENT_VIEW.path"
            v-if="permit(PATH.EMPLOYEE_WAGE_MANAGEMENT_VIEW.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">员工薪资</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.WAGE_SHEET_VIEW.path"
            v-if="permit(PATH.WAGE_SHEET_VIEW.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">工资单审批</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="6"
                    v-if="permit(PATH.USER_LEVEL_PROMOTION_STRATEGY.requiresAuth)">
          <template slot="title">
            <i class="el-icon-receiving"></i>
            <span slot="title">促销策略</span>
          </template>
          <el-menu-item
            :index="PATH.USER_LEVEL_PROMOTION_STRATEGY.path"
            v-if="permit(PATH.USER_LEVEL_PROMOTION_STRATEGY.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">用户等级促销策略</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.TOTAL_AMOUNT_PROMOTION_STRATEGY.path"
            v-if="permit(PATH.TOTAL_AMOUNT_PROMOTION_STRATEGY.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">总价促销策略</span>
          </el-menu-item>
          <el-menu-item
            :index="PATH.PRICE_PROMOTION_STRATEGY.path"
            v-if="permit(PATH.PRICE_PROMOTION_STRATEGY.requiresAuth)"
          >
            <i class="el-icon-receiving"></i>
            <span slot="title">特价包商品管理</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="logout-fix">
        <el-button round="round" type="success" size="mini" icon="el-icon-user" class="button1">{{ getUsername() }}</el-button>
        <el-button round="round" type="success" size="mini" icon="el-icon-switch-button" @click="logout" class="button2">退出登录</el-button>
      </div>
    </el-aside>

    <el-main style="overflow-x: hidden">
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script>
import { ROLE, PATH } from "@/common/const";

export default {
  name: "Layout",
  props: {
    activePath: String
  },
  data() {
    return {
      ROLE: ROLE,
      PATH: PATH
    };
  },
  mounted() {
  },
  computed: {
    getActivePath() {
      if (this.activePath == null) {
        return this.$route.path;
      } else {
        return this.activePath;
      }
    },
    getUserRole() {
      return sessionStorage.getItem("role");
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      sessionStorage.removeItem("name"); // name
      sessionStorage.removeItem("role"); // role
      sessionStorage.removeItem("token"); // token
      // this.$router.push('/');
      location.href = "/";
    },
    getUsername() {
      return sessionStorage.getItem("name");
    },
    permit(arr) {
      return arr.some(role => role === sessionStorage.getItem("role"));
    }
  }
};
</script>

<style>
.title {
  padding: 16px;
  margin-bottom: 10px;
}

.title-inner {
  background-color: #9fa8da !important;
  border-color: #9fa8da !important;
  border-radius: 8px !important;
  line-height: 40px;
  height: 40px;
  text-align: center;
  font-size: 21px;
  font-weight: bold;
}

.el-aside {
  background-color: #fff !important;
  margin-right: 10px;
}

.el-menu {
  border-right: solid 1px #fff;
}

.el-menu-item {
  width: 92%;
  margin: 0 auto;
  padding: 0 10px !important;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
}

.el-menu-item > i {
  margin-right: 30px !important;
}

.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: #f6f6f6 !important;
}

.el-menu-item.is-active {
  color: #7e57c2;
  background-color: #f0ebf8 !important;
}

.logout-fix {
  position: fixed;
  left: 30px;
  bottom: 86%;
}

.button1 {
  color: #fff;
  background-color: #7e57c2;
  border-color: #7e57c2;
}
.button2 {
  color: #fff;
  background-color: #7e57c2;
  border-color: #7e57c2;
}

</style>
