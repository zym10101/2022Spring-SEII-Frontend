<template>
  <Layout>
    <Title title="员工打卡"></Title>
    <div>
      <span>  请选择一段时间:  </span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="getData()">
      </el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" size="medium" @click="allClockIn">全勤
      </el-button>
      <div v-if="date !== ''" class="mt15">
        <h4>{{ beginDate }}&nbsp;至&nbsp;{{ endDate }}内的员工打卡记录：</h4>
        <el-form :inline="true">
          <el-form-item label="筛选：员工姓名">
            <el-input v-model.trim="search1"></el-input>
          </el-form-item>
          <el-form-item label="工作岗位">
            <el-input v-model.trim="search2"></el-input>
          </el-form-item>
          <el-button size="medium" type="primary" icon="el-icon-download" @click="exportData">导出Excel
          </el-button>
        </el-form>
        <el-table
          id="clockIn-table"
          :data="handleSearch(clockInTable)"
          stripe
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          class="mt15">
          <el-table-column
            prop="id"
            label="编号"
            min-width="10">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            min-width="15">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            min-width="15">
          </el-table-column>
          <el-table-column
            prop="birthday"
            label="出生日期"
            min-width="20">
            <template slot-scope="scope">
              {{ formatBirthday(scope.row.birthday) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="phoneNumber"
            label="电话号码"
            min-width="20">
          </el-table-column>
          <el-table-column
            prop="position"
            label="工作岗位"
            min-width="15">
          </el-table-column>
          <el-table-column
            prop="attendanceDate"
            label="打卡记录"
            min-width="25">
            <template slot-scope="scope">
              {{ formatDate(scope.row.attendanceDate) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { formatBirthday, formatDate } from "@/common/utils";
import { getClockInByTime } from "@/network/hr";
import { addClockIn } from "@/network/hr";
import FileSaver from "file-saver";

export default {
  components: {
    Layout,
    Title
  },
  data() {
    return {
      date: "",
      search1: "",
      search2: "",
      clockInTable: [],
      addForm: {
        attendanceNo: "",
        employeeId: "",
        attendanceDate: ""
      }
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
      getClockInByTime(config).then(_res => {
        this.clockInTable = _res.result;
      });
    },
    formatBirthday,
    formatDate,
    handleSearch() {
      return this.clockInTable.filter(item => {
        if (item.name.includes(this.search1)) {
          if (this.search2 === "") {
            return item;
          } else {
            if (item.position.includes(this.search2)) {
              return item;
            }
          }
        }
      });
    },
    exportData() {
      this.$message({
        message: "导出成功！",
        type: "success"
      });
      const XLSX = require("xlsx");
      const xlsxParam = { raw: true };
      let tables = document.getElementById("clockIn-table").cloneNode(true);
      let excelName = "员工打卡明细.xlsx";
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
    allClockIn() {
      for (let i = 1; i <= 5; i++) {
        setTimeout(() => {
          this.addForm.attendanceNo = null;
          this.addForm.employeeId = i;
          this.addForm.attendanceDate = Date.now();
          addClockIn(this.addForm);
        }, 1000);
      }
      this.$message({
        message: "今日员工全部出勤！",
        type: "success"
      });
    }
  }
};
</script>

<style scoped>
.table-body {
  width: 100%;
  margin: 20px auto;
}
</style>
