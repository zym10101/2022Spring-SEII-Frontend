<template>
  <Layout>
    <div v-if="authorization()===1">
      <Title title="工资单制定"></Title>
    </div>
    <div v-else-if="authorization()===2">
      <Title title="工资单审批"></Title>
    </div>
    <div v-else>
      <Title title="工资单管理"></Title>
    </div>
    <div v-if="authorization()!==2">
      <el-button type="primary" size="medium" @click="dialogVisible = true">制定工资单</el-button>
    </div>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <wage-sheet-list :list="pendingLevel1List" :type="1" @refresh="getWageSheets()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="pendingLevel2List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <wage-sheet-list :list="pendingLevel2List" :type="2" @refresh="getWageSheets()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <wage-sheet-list :list="successList" :type="3"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <wage-sheet-list :list="failureList" :type="4"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
        title="创建工资单"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="wageSheetForm" label-width="140px" ref="wageSheetForm">
          <el-form-item label="请选择员工: ">
            <el-select v-model="wageSheetForm.employeeId" style="width: 150px">
              <el-option
                  v-for="item in employeeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否计算年终奖？">
            <el-radio-group v-model="wageSheetForm.yearBonus">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('wageSheetForm')">立即创建</el-button>
      </span>
    </el-dialog>

  </Layout>

</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import WageSheetList from "@/views/financial/components/WageSheetList";
import {createWageSheet, getWageByState} from "@/network/Financial";
import {getAllEmployee} from "@/network/hr";

export default {
  name: "WageSheetView",
  components: {
    WageSheetList,
    Layout,
    Title
  },
  data() {
    return {
      activeName: "PENDING_LEVEL_1",
      wageSheetList: [],
      dialogVisible: false,
      pendingLevel1List: [],
      pendingLevel2List: [],
      successList: [],
      failureList: [],
      employeeList:[],
      wageSheetForm: {
        id: "",
        employeeId: "",
        name: "",
        operator: "",
        state: "",
        bankAccount: "",
        totalAmount: "",
        tax:"",
        finalAmount:"",
        yearBonus:false,
      },
      rules: {
        employeeId: [
          {required: true, message: "请选择一个员工", trigger: "change"}
        ]
      },


    };
  },
  mounted() {
    this.getWageSheets();
    getAllEmployee({}).then(_res => {
      this.employeeList = _res.result;
    })
  },
  methods: {
    /**
     * 获取工资单列表
     */
    getWageSheets() {
      getWageByState({params: {state: "PENDING_LEVEL_1"}}).then(_res => {
        this.pendingLevel1List = _res.result;
      })
      getWageByState({params: {state: "PENDING_LEVEL_2"}}).then(_res => {
        this.pendingLevel2List = _res.result;
      })
      getWageByState({params: {state: "SUCCESS"}}).then(_res => {
        this.successList = _res.result;
      })
      getWageByState({params: {state: "FAILURE"}}).then(_res => {
        this.failureList = _res.result;
      })
    },
    /**
     * 取消创建工资单
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
          .then(_ => {
            this.resetForm();
            done();
          })
          .catch(_ => {
          });
    },
    /**
     * 重置工资单
     */
    resetForm() {
      this.wageSheetForm = {
        employee: "",
        yearBonus: false,
      };
    },
    /**
     * 提交工资单
     */
    submitForm(formName) {
      this.wageSheetForm.id = null;
      this.wageSheetForm.name = null;
      this.wageSheetForm.operator = sessionStorage.getItem("name");
      this.wageSheetForm.state = null;
      this.wageSheetForm.bankAccount=null;
      this.wageSheetForm.totalAmount = null;
      this.wageSheetForm.tax=null;
      this.wageSheetForm.finalAmount = null;
      if(this.wageSheetForm.employeeId!==""){
        createWageSheet(this.wageSheetForm).then(_res => {
          if (_res.msg === "Success") {
            this.$message.success("创建成功!");
            this.resetForm();
            this.dialogVisible = false;
            this.getWageSheets();
          }else{
            this.$message.error("创建失败!");
          }
        });
      }else{
        this.$message.error("请选择员工!")
      }

    },
    authorization() {
      if (sessionStorage.getItem("role") === "FINANCIAL_STAFF") {
        return 1;
      } else if(sessionStorage.getItem("role") === "GM"){
        return 2;
      }
    },

  }


};
</script>

<style lang="scss" scoped>
.body {
  margin: 0 auto;
  margin-top: 10px;
  height: 80vh;
  overflow-y: auto;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
}
</style>