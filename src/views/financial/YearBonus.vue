<template>
  <Layout>
    <Title title="制定年终奖"></Title>
    <div>
      <div class="mt15">
        <span><strong>员工基本信息</strong></span>&nbsp;&nbsp;
        <el-button size="medium" type="primary" icon="el-icon-download" @click="exportData">导出Excel</el-button>
        <el-table
          id="table"
          :data="employeeWageContent"
          stripe
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          class="mt15">
          <el-table-column
            prop="id"
            label="编号"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="birthday"
            label="出生日期"
            min-width="180">
            <template slot-scope="scope">
              {{ formatBirthday(scope.row.birthday) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="phoneNumber"
            label="电话号码"
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="position"
            label="工作岗位"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="total"
            label="前11个月工资"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="yearBonus"
            label="年终奖"
            min-width="150">
          </el-table-column>
          <el-table-column
            label="操作" min-width="120">
            <template slot-scope="scope">
              <el-button type="warning" size="small" @click.native.prevent="editInfo(scope.row)">编辑</el-button>&nbsp;
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="制定年终奖"
          :visible.sync="dialogVisibleEdit"
          width="40%"
          :before-close="handleClose">
          <div style="width: 90%; margin: 0 auto">
            <el-form :model="editForm" label-width="100px" ref="EditReturnForm">
              <el-form-item label="编号:  ">
                <el-input :disabled="true" v-model=editForm.id style="width: 100px"></el-input>
              </el-form-item>
              <el-form-item label="姓名:  ">
                <el-input :disabled="true" v-model=editForm.name style="width: 100px"></el-input>
              </el-form-item>
              <el-form-item label="年终奖:  ">
                <el-input v-model=editForm.yearBonus style="width: 200px"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormEdit()">编辑完成</el-button>
      </span>
        </el-dialog>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { formatBirthday } from "@/common/utils";
import { getEmployeeWage } from "@/network/Financial";
import { addYearBonus } from "@/network/Financial";
import FileSaver from "file-saver";

export default {
  components: {
    Layout,
    Title
  },
  data() {
    return {
      date: "",
      editForm: {},
      employeeWageContent: [],
      dialogVisibleEdit: false
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      getEmployeeWage().then(_res => {
        this.employeeWageContent = _res.result;
        console.log(this.employeeWageContent.total);
      });
    },
    formatBirthday,
    editInfo(row) {
      this.editForm = JSON.parse(JSON.stringify(row));
      this.dialogVisibleEdit = true;
    },
    handleClose(done) {
      this.$confirm("确认取消？")
        .then(_ => {
          this.resetForm();
          done();
        })
        .catch(_ => {
        });
    },
    resetForm() {

    },
    submitFormEdit() {
      const config = {
        params: {
          id: this.editForm.id,
          yearBonus: this.editForm.yearBonus
        }
      };
      console.log(config);
      addYearBonus(config).then(_res => {
        this.employeeWageContent = _res.result;
      });
      this.dialogVisibleEdit = false;
      this.load();
    },
    exportData() {
      this.$message({
        message: "导出成功！",
        type: "success"
      });
      const XLSX = require("xlsx");
      const xlsxParam = { raw: true };
      let tables = document.getElementById("table").cloneNode(true);
      let excelName = "员工年终奖.xlsx";
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