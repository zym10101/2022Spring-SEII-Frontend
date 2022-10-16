<template>
  <Layout>
    <Title title="查看经营情况"></Title>
    <div>
      <span>  请选择一段时间:  </span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="getData()">
      </el-date-picker>
      <div v-if="date !== ''" class="mt15">
        <h4>{{ beginDate }}&nbsp;至&nbsp;{{ endDate }}内的</h4>
        <div>
          <div class="mt15">
            <span style="font-size: larger; color: red "><strong> 收入类总额：{{ allIn }}（元）</strong></span>&nbsp;&nbsp;
            <el-button size="medium" type="primary" icon="el-icon-download" @click="exportData1">导出Excel
            </el-button>
          </div>
          <div class="mt15">
            <el-table
              id="incomeTable"
              :data="incomeTable"
              stripe
              style="width: 100%"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              class="mt15">
              <el-table-column
                prop="saleIncome"
                label="售价总额（元）"
                min-width="1">
              </el-table-column>
              <el-table-column
                prop="saleDiscount"
                label="折让总额（元）"
                min-width="1">
              </el-table-column>
              <el-table-column
                prop="saleVoucher"
                label="代金券总额（元）"
                min-width="1">
              </el-table-column>
              <el-table-column
                prop="overflow"
                label="库存报溢总额（元）"
                min-width="1">
              </el-table-column>
              <el-table-column
                prop="allIn"
                label="收入总额（元）"
                min-width="1">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div id="2">
          <div class="mt15">
            <span style="font-size: larger; color: red "><strong> 支出类总额：{{ allOut }}（元）</strong></span>&nbsp;&nbsp;
            <el-button size="medium" type="primary" icon="el-icon-download" @click="exportData2">导出Excel
            </el-button>
          </div>
          <div class="mt15">
            <el-table
              id="outgoTable"
              :data="outgoTable"
              stripe
              style="width: 100%"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              class="mt15">
              <el-table-column
                prop="saleOutgo"
                label="退货总额:（元）"
                min-width="1">
              </el-table-column>
              <el-table-column
                prop="saleCost"
                label="销售成本总额（元）"
                min-width="1">
              </el-table-column>
              <el-table-column
                prop="saleReturnCost"
                label="退货成本总额（元）"
                min-width="1">
              </el-table-column>
              <el-table-column
                prop="loss"
                label="库存报损总额（元）"
                min-width="1">
              </el-table-column>
              <el-table-column
                prop="present"
                label="商品赠送总额（元）"
                min-width="1">
              </el-table-column>
              <el-table-column
                prop="salary"
                label="员工工资总额（元）"
                min-width="1">
              </el-table-column>
              <el-table-column
                prop="allOut"
                label="支出总额（元）"
                min-width="1">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="mt15">
          <span
            style="font-size: larger; color: red "><strong> 利润：{{ profit }}（元）</strong></span>&nbsp;&nbsp;
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import FileSaver from "file-saver";
import { getSaleIncomeByTime } from "@/network/sale";
import { getSaleOutgoByTime } from "@/network/sale";
import { getSaleDiscountByTime } from "@/network/sale";
import { getSaleVoucherByTime } from "@/network/sale";
import { getSaleCostByTime } from "@/network/sale";
import { getSaleReturnCostByTime } from "@/network/sale";
import { getOverflowByTime } from "@/network/warehouse";
import { getLossByTime } from "@/network/warehouse";
import { getPresentByTime } from "@/network/warehouse";
import { formatDate } from "@/common/utils";
import { getSalaryByTime } from "@/network/Financial";

export default {
  components: {
    Layout,
    Title
  },
  data() {
    return {
      date: "",
      status: "",
      incomeTable: [{
        saleIncome: "",
        saleDiscount: "",
        saleVoucher: "",
        overflow: ""
      }],
      outgoTable: [{
        saleOutgo: "",
        saleCost: "",
        saleReturnCost: "",
        loss: "",
        present: "",
        salary: ""
      }],
      profit: "",
      allIn: "",
      allOut: ""
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
    getData() {
      const config = {
        params: {
          beginDateStr: this.beginDate,
          endDateStr: this.endDate
        }
      };
      getSaleIncomeByTime(config).then(_res => {
        this.incomeTable[0].saleIncome = _res.result;
      });
      getSaleDiscountByTime(config).then(_res => {
        this.incomeTable[0].saleDiscount = _res.result;
      });
      getSaleVoucherByTime(config).then(_res => {
        this.incomeTable[0].saleVoucher = _res.result;
      });
      getOverflowByTime(config).then(_res => {
        this.incomeTable[0].overflow = _res.result;
      });
      getSaleOutgoByTime(config).then(_res => {
        this.outgoTable[0].saleOutgo = _res.result;
      });
      getSaleCostByTime(config).then(_res => {
        this.outgoTable[0].saleCost = _res.result;
      });
      getSaleReturnCostByTime(config).then(_res => {
        this.outgoTable[0].saleReturnCost = _res.result;
      });
      getLossByTime(config).then(_res => {
        this.outgoTable[0].loss = _res.result;
      });
      getPresentByTime(config).then(_res => {
        this.outgoTable[0].present = _res.result;
      });
      getSalaryByTime(config).then(_res => {
        this.outgoTable[0].salary = _res.result;
      });
      setTimeout(this.cal1, 1000);
      setTimeout(this.cal2, 1010);
      setTimeout(this.cal3, 1020);
    },
    cal1() {
      this.incomeTable[0].allIn = this.incomeTable[0].saleIncome - this.incomeTable[0].saleDiscount - this.incomeTable[0].saleVoucher + this.incomeTable[0].overflow;
      this.outgoTable[0].allOut = this.outgoTable[0].saleOutgo + this.outgoTable[0].saleCost - this.outgoTable[0].saleReturnCost + this.outgoTable[0].loss + this.outgoTable[0].present + this.outgoTable[0].salary;
    },
    cal2() {
      this.allIn = this.incomeTable[0].allIn;
      this.allOut = this.outgoTable[0].allOut;
    },
    cal3() {
      this.profit = this.allIn - this.allOut;
    },
    exportData1() {
      this.$message({
        message: "导出成功！",
        type: "success"
      });
      const XLSX = require("xlsx");
      const xlsxParam = { raw: true };
      let excelName = "收入类明细.xlsx";
      let tables = document.getElementById("incomeTable").cloneNode(true);
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
    exportData2() {
      this.$message({
        message: "导出成功！",
        type: "success"
      });
      const XLSX = require("xlsx");
      const xlsxParam = { raw: true };
      let excelName = "支出类明细.xlsx";
      let tables = document.getElementById("outgoTable").cloneNode(true);
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
