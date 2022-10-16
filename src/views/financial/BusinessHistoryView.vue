<template>
  <Layout>
    <Title title="查看经营历程"></Title>
    <div>
      <span>  请选择单据类型:  </span>
      <el-select v-model="status" placeholder="请选择单据类型">
        <el-option label="销售类" value="1"></el-option>
        <el-option label="进货类" value="2"></el-option>
        <el-option label="财务类" value="3"></el-option>
        <el-option label="库存类" value="4"></el-option>
      </el-select>
      <br><br><span>  请选择一段时间:  </span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="getData()">
      </el-date-picker>
      <div v-if="date !== ''" class="mt15">
        <div class="mt15">
          <div v-if="status === '1'">
            <el-button size="medium" type="primary" icon="el-icon-download" @click="exportData">导出Excel
            </el-button>
            <el-table
              id="sale-table"
              :data="saleSheetContent"
              stripe
              style="width: 100%"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              class="mt15">
              <el-table-column
                prop="type"
                label="类型"
                min-width="10"
                :filters="[{ text: '销售', value: 'sale' }, { text: '销售退货', value: 'sale_return' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.type === 'sale' ? 'primary' : 'success'"
                    disable-transitions>{{ sale_transform(scope.row.type) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="sheetId"
                label="id"
                min-width="20">
              </el-table-column>
              <el-table-column
                prop="productName"
                label="产品名称"
                min-width="20">
              </el-table-column>
              <el-table-column
                prop="quantity"
                label="数量"
                min-width="15">
              </el-table-column>
              <el-table-column
                prop="unitPrice"
                label="单价(元)"
                min-width="15">
              </el-table-column>
              <el-table-column
                prop="totalPrice"
                label="总价(元)"
                min-width="15">
              </el-table-column>
              <el-table-column
                label="时间" min-width="20">
                <template slot-scope="scope">
                  {{ formatDate(scope.row.createTime) }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="status === '2'">
            <el-button size="medium" type="primary" icon="el-icon-download" @click="exportData">导出Excel</el-button>
            <el-table
              id="purchase-table"
              :data="purchaseSheetContent"
              stripe
              style="width: 100%"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              class="mt15">
              <el-table-column
                prop="type"
                label="类型"
                min-width="10"
                :filters="[{ text: '进货', value: 'purchase' }, { text: '退货', value: 'purchase_return' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.type === 'purchase' ? 'primary' : 'success'"
                    disable-transitions>{{ purchase_transform(scope.row.type) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="sheetId"
                label="id"
                min-width="20">
              </el-table-column>
              <el-table-column
                prop="productName"
                label="产品名称"
                min-width="20">
              </el-table-column>
              <el-table-column
                prop="quantity"
                label="数量"
                min-width="15">
              </el-table-column>
              <el-table-column
                prop="unitPrice"
                label="单价(元)"
                min-width="15">
              </el-table-column>
              <el-table-column
                prop="totalPrice"
                label="总价(元)"
                min-width="15">
              </el-table-column>
              <el-table-column
                label="时间" min-width="20">
                <template slot-scope="scope">
                  {{ formatDate(scope.row.createTime) }}
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="status === '3'">
            <span><strong>付款/收款单</strong></span>&nbsp;&nbsp;
            <el-form :inline="true">
              <el-form-item label="筛选：操作员">
                <el-input v-model.trim="search0"></el-input>
              </el-form-item>
              <el-form-item label="客户">
                <el-input v-model.trim="search1"></el-input>
              </el-form-item>
              <el-button size="medium" type="primary" icon="el-icon-download" @click="exportData">导出Excel</el-button>
            </el-form>
            <el-table
              id="financial-table"
              :data="handleSearch1(financialSheetContent)"
              stripe
              style="width: 100%"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              class="mt15">
              <el-table-column
                prop="type"
                label="类型"
                min-width="10"
                :filters="[{ text: '付款', value: 'pay' }, { text: '收款', value: 'receive' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.type === 'pay' ? 'primary' : 'success'"
                    disable-transitions>{{ financial_transform(scope.row.type) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="id"
                label="id"
                min-width="20">
              </el-table-column>
              <el-table-column
                prop="customer"
                label="客户"
                min-width="12">
              </el-table-column>
              <el-table-column
                prop="operator"
                label="操作员"
                min-width="15">
              </el-table-column>
              <el-table-column
                prop="state"
                label="单据状态"
                min-width="20">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                min-width="25">
                <template slot-scope="scope">
                  {{ formatDate(scope.row.createTime) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="totalAmount"
                label="总价"
                min-width="17">
              </el-table-column>
            </el-table>
            <br>
            <span><strong>工资单</strong></span>&nbsp;&nbsp;
            <el-form :inline="true">
              <el-form-item label="筛选：操作员">
                <el-input v-model.trim="search2"></el-input>
              </el-form-item>
              <el-button size="medium" type="primary" icon="el-icon-download" @click="exportWageData">导出Excel
              </el-button>
            </el-form>
            <el-table
              id="financial-wage-table"
              :data="handleSearch2(financialWageSheetContent)"
              stripe
              style="width: 100%"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              class="mt15">
              <el-table-column label="类型" min-width="8">
                <template>
                  <el-tag type="warning" disable-transitions> 工资</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="id"
                label="id"
                min-width="17">
              </el-table-column>
              <el-table-column
                prop="operator"
                label="操作员"
                min-width="8">
              </el-table-column>
              <el-table-column
                prop="employeeId"
                label="员工id"
                min-width="8">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                min-width="8">
              </el-table-column>
              <el-table-column
                prop="state"
                label="单据状态"
                min-width="10">
              </el-table-column>
              <el-table-column
                prop="bankAccount"
                label="银行账户"
                min-width="20">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                min-width="16">
                <template slot-scope="scope">
                  {{ formatDate(scope.row.createTime) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="totalAmount"
                label="应发工资"
                min-width="8">
              </el-table-column>
              <el-table-column
                prop="tax"
                label="应扣税款"
                min-width="10">
              </el-table-column>
              <el-table-column
                prop="finalAmount"
                label="实发工资"
                min-width="8">
              </el-table-column>
            </el-table>
          </div>
          <div v-if="status==='4'">
            <el-button size="medium" type="primary" icon="el-icon-download" @click="exportData">导出Excel</el-button>
            <el-table
              id="warehouse-table"
              :data="warehouseSpecialSheetContent"
              stripe
              style="width: 100%"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              class="mt15">
              <el-table-column
                prop="type"
                label="类型"
                min-width="10"
                :filters="[{ text: '报溢单', value: 'warehouse_byd' }, { text: '报损单', value: 'warehouse_bsd' }, { text: '赠送单', value: 'warehouse_zsd' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.type === 'warehouse_zsd' ? 'primary' : (scope.row.type === 'warehouse_byd'? 'success': 'warning')"
                    disable-transitions>{{ warehouse_transform(scope.row.type) }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="sheetId"
                label="id"
                min-width="20">
              </el-table-column>
              <el-table-column
                prop="productName"
                label="产品名称"
                min-width="20">
              </el-table-column>
              <el-table-column
                prop="quantity"
                label="数量"
                min-width="15">
              </el-table-column>
              <el-table-column
                prop="unitPrice"
                label="单价(元)"
                min-width="15">
              </el-table-column>
              <el-table-column
                label="时间" min-width="20">
                <template slot-scope="scope">
                  {{ formatDate(scope.row.createTime) }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import FileSaver from "file-saver";
import { formatDate } from "@/common/utils";
import { getSaleSheetIODetailByTime } from "@/network/sale";
import { getPurchaseSheetIODetailByTime } from "@/network/purchase";
import { getWarehouseSpecialIODetailByTime } from "@/network/warehouse";
import { getFinancialSheetIODetailByTime } from "@/network/Financial";
import { getFinancialWageSheetIODetailByTime } from "@/network/Financial";

export default {
  components: {
    Layout,
    Title
  },
  data() {
    return {
      date: "",
      status: "",
      search0: "",
      search1: "",
      search2: "",
      saleSheetContent: [],
      purchaseSheetContent: [],
      financialSheetContent: [],
      financialWageSheetContent: [],
      warehouseSpecialSheetContent: []
    };
  },
  computed: {
    beginDate: function() {
      return this.date === "" ? "" : formatDate(this.date[0]);
    },
    endDate: function() {
      return this.date === "" ? "" : formatDate(this.date[1]);
    }
  },
  methods: {
    handleSearch1() {
      return this.financialSheetContent.filter(item => {
        if (item.operator.includes(this.search0)) {
          if (this.search1 === "") {
            return item;
          } else {
            if (item.customer == this.search1) {
              return item;
            }
          }
        }
      });
    },
    handleSearch2() {
      return this.financialWageSheetContent.filter(item => {
        if (item.operator.includes(this.search2)) {
          return item;
        }
      });
    },
    getData() {
      const config = {
        params: {
          beginDateStr: this.beginDate,
          endDateStr: this.endDate
        }
      };
      getSaleSheetIODetailByTime(config).then(_res => {
        this.saleSheetContent = _res.result;
      });
      getPurchaseSheetIODetailByTime(config).then(_res => {
        this.purchaseSheetContent = _res.result;
      });
      getFinancialSheetIODetailByTime(config).then(_res => {
        this.financialSheetContent = _res.result;
      });
      getFinancialWageSheetIODetailByTime(config).then(_res => {
        this.financialWageSheetContent = _res.result;
      });
      getWarehouseSpecialIODetailByTime(config).then(_res => {
        this.warehouseSpecialSheetContent = _res.result;
      });
    },
    filterTag(value, row) {
      return row.type === value;
    },
    sale_transform(type) {
      return type === "sale" ? "销售" : "销售退货";
    },
    purchase_transform(type) {
      return type === "purchase" ? "进货" : "退货";
    },
    financial_transform(type) {
      return type === "pay" ? "付款" : "收款";
    },
    warehouse_transform(type) {
      if (type === "warehouse_byd") {
        return "报溢单";
      } else if (type === "warehouse_bsd") {
        return "报损单";
      } else if (type === "warehouse_zsd") {
        return "赠送单";
      }
    },
    formatDate,
    exportData() {
      this.$message({
        message: "导出成功！",
        type: "success"
      });
      const XLSX = require("xlsx");
      const xlsxParam = { raw: true };
      let tables, excelName;
      if (this.status === "1") {
        excelName = "销售类单据.xlsx";
        tables = document.getElementById("sale-table").cloneNode(true);
      } else if (this.status === "2") {
        excelName = "进货类单据.xlsx";
        tables = document.getElementById("purchase-table").cloneNode(true);
      } else if (this.status === "3") {
        excelName = "收付款单据.xlsx";
        tables = document.getElementById("financial-table").cloneNode(true);
      } else if (this.status === "4") {
        excelName = "库存类单据.xlsx";
        tables = document.getElementById("warehouse-table").cloneNode(true);
      }
      if (tables.querySelector(".el-table__fixed") !== null) {
        tables.removeChild(tables.querySelector(".el-table__fixed"));
      }
      let table_book = XLSX.utils.table_to_book(tables, xlsxParam);
      const table_write = XLSX.write(table_book, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([table_write], { type: "application/octet-stream" })
          , excelName
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, table_write);
      }
      return table_write;
    },
    exportWageData() {
      this.$message({
        message: "导出成功！",
        type: "success"
      });
      const XLSX = require("xlsx");
      const xlsxParam = { raw: true };
      let tables = document.getElementById("financial-wage-table").cloneNode(true);
      let excelName = "工资单.xlsx";
      if (tables.querySelector(".el-table__fixed") !== null) {
        tables.removeChild(tables.querySelector(".el-table__fixed"));
      }
      let table_book = XLSX.utils.table_to_book(tables, xlsxParam);
      const table_write = XLSX.write(table_book, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([table_write], { type: "application/octet-stream" })
          , excelName
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, table_write);
      }
      return table_write;
    }
  }
};
</script>

<style scoped lang="scss">
.mt15 {
  margin-top: 15px;
}
</style>
