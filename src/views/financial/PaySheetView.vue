<template>
  <Layout>
    <div v-if="authorization()===1">
      <Title title="付款单制定"></Title>
    </div>
    <div v-else-if="authorization()===2">
      <Title title="付款单审批"></Title>
    </div>
    <div v-else>
      <Title title="付款单管理"></Title>
    </div>
    <div v-if="authorization()!==2">
      <el-button type="primary" size="medium" @click="dialogVisible = true">制定付款单</el-button>
    </div>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <pay-sheet-list :list="pendingLevel1List" :type="1" @refresh="getPaySheets()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <pay-sheet-list :list="successList" :type="2"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <pay-sheet-list :list="failureList" :type="3"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
        title="创建付款单"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="paySheetForm" label-width="110px" ref="paySheetForm" :rules="rules">
          <el-form-item label="客户: " prop="customer">
            <el-select v-model="paySheetForm.customer" placeholder="请选择客户">
              <el-option
                  v-for="item in customers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
              v-for="(item, index) in paySheetForm.paySheetContent"
              :key="index"
              :label="'付款账户 '">
            <div>
              <el-select v-model="item.bankAccount" placeholder="请选择账户">
                <el-option
                    v-for="item in bankAccounts"
                    :key="item.accountName"
                    :label="item.accountName"
                    :value="item.accountName">
                </el-option>
              </el-select>
              <el-input type="number" v-model="item.amount" style="width: 200px;margin-top: 10px" placeholder="请输入付款金额"></el-input>
            </div>
            <div style="margin-top: 10px">
              <el-button type="text" size="small" @click="addAccount"
                         v-if="index === paySheetForm.paySheetContent.length - 1">添加付款账户
              </el-button>
              <el-button type="text" size="small" @click.prevent="removeAccount(item)" v-if="index !== 0">删除</el-button>
            </div>
          </el-form-item>
          <el-form-item label="备注: ">
            <el-input type="textarea" v-model="paySheetForm.paySheetContent.remark"></el-input>
          </el-form-item>
          <!--
          <el-form-item label="付款银行账户: " prop="bankAccount">
            <el-select v-model="paySheetForm.paySheetContent.bankAccount" placeholder="请选择付款账户">
              <el-option
                  v-for="item in bankAccounts"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          -->
          <!--
          <el-form-item label="付款银行账户: ">
            <el-input type="text" v-model="paySheetForm.paySheetContent.bankAccount" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="转账金额:">
            <el-input type="text" v-model="paySheetForm.paySheetContent.amount" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="备注: ">
            <el-input type="textarea" v-model="paySheetForm.paySheetContent.remark"></el-input>
          </el-form-item>
          -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('paySheetForm')">立即创建</el-button>
      </span>
    </el-dialog>

  </Layout>

</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import PaySheetList from "@/views/financial/components/PaySheetList";
import {createPaySheet, getAccount, getPayByState} from "@/network/Financial";
import {getAllCustomer} from "@/network/purchase";

export default {
  name: "PaySheetView",
  components: {
    PaySheetList,
    Layout,
    Title
  },
  /**
   * 用到的数据
   * @returns {{}}
   */
  data() {
    return {
      activeName: "PENDING_LEVEL_1",
      paySheetList: [],
      dialogVisible: false,
      flag:false,
      pendingLevel1List: [],
      successList: [],
      failureList: [],
      customers: [],
      bankAccounts: [],
      paySheetForm: {
        id: "",
        customer: "",
        operator: "",
        state: "",
        totalAmount: "",
        paySheetContent: [
          {
            id: "",
            paySheetId: "",
            bankAccount: "",
            amount: "",
            remark: ""
          }
        ]
      },
      rules: {
        customer: [
          {required: true, message: "请选择一个客户", trigger: "change"}
        ]
      },


    };
  },
  mounted() {
    this.getPaySheets();
    getAllCustomer({params: {type: "SUPPLIER"}}).then(_res => {
      this.customers = _res.result;
    });
    getAccount({}).then(_res => {
      this.bankAccounts = _res.result;
    });
  },
  methods: {
    /**
     * 获取付款单列表
     */
    getPaySheets() {
      getPayByState({params: {state: "PENDING_LEVEL_1"}}).then(_res => {
        this.pendingLevel1List = _res.result;
      })
      getPayByState({params: {state: "SUCCESS"}}).then(_res => {
        this.successList = _res.result;
      })
      getPayByState({params: {state: "FAILURE"}}).then(_res => {
        this.failureList = _res.result;
      })
    },
    /**
     * 取消创建付款单
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
     * 重置付款单
     */
    resetForm() {
      this.paySheetForm = {
        customer: "",
        paySheetContent: [
          {
            bankAccount: "",
            amount: "",
            remark: "",
          }
        ]
      };
    },
    /**
     * 提交付款单
     */
    submitForm(formName) {
      this.paySheetForm.id = null;
      this.paySheetForm.operator = sessionStorage.getItem("name");
      this.paySheetForm.state = null;
      this.paySheetForm.totalAmount = null;

      this.paySheetForm.paySheetContent.forEach((item) => {
        if(item.bankAccount===""||item.amount===""||this.paySheetForm.customer===""){
          this.$message.error("表单信息不全！");
          this.flag=true;
          throw new Error("ending");
        }
        this.bankAccounts.forEach((account)=>{
          if(account.accountName===item.bankAccount&&Number(item.amount)>Number(account.balance)){
            alert(account.accountName+"账户余额不足！");
            this.flag=true;
          }
        })
      });

      if(this.flag===false){
        this.paySheetForm.paySheetContent.forEach((item) => {
          item.id = null;
          item.paySheetId = null;
          item.amount=Number(item.amount);
        });
        createPaySheet(this.paySheetForm).then(_res => {
          console.log(_res);
          if (_res.msg === "Success") {
            this.$message.success("创建成功!");
            this.resetForm();
            this.dialogVisible = false;
            this.getPaySheets();
          }else{
            alert("创建失败！");
          }
        });
      }else{
        this.flag=false;
      }



      //this.paySheetForm.paySheetContent.id = null;
      //this.paySheetForm.paySheetContent.paySheetId = null;
      //this.paySheetForm.paySheetContent.amount = Number(this.paySheetForm.paySheetContent.amount);

    },
    addAccount() {
      this.paySheetForm.paySheetContent.push({});
    },
    removeAccount(item) {
      var index = this.paySheetForm.paySheetContent.indexOf(item);
      if (index !== -1) {
        this.paySheetForm.paySheetContent.splice(index, 1);
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
  margin: 10px auto 0;
  height: 80vh;
  overflow-y: auto;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
}
</style>