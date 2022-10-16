<template>
  <Layout>
    <div v-if="authorization()===1">
      <Title title="收款单制定"></Title>
    </div>
    <div v-else-if="authorization()===2">
      <Title title="收款单审批"></Title>
    </div>
    <div v-else>
      <Title title="收款单管理"></Title>
    </div>
    <div v-if="authorization()!==2">
      <el-button type="primary" size="medium" @click="dialogVisible = true">制定收款单</el-button>
    </div>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <receive-sheet-list :list="pendingLevel1List" :type="1" @refresh="getReceiveSheets()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <receive-sheet-list :list="successList" :type="2"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <receive-sheet-list :list="failureList" :type="3"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
        title="创建收款单"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="receiveSheetForm" label-width="110px" ref="receiveSheetForm" :rules="rules">
          <el-form-item label="客户: " prop="customer">
            <el-select v-model="receiveSheetForm.customer" placeholder="请选择客户">
              <el-option
                  v-for="item in customers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
              v-for="(item, index) in receiveSheetForm.receiveSheetContent"
              :key="index"
              :label="'收款账户 '">
            <div>
              <el-select v-model="item.bankAccount" placeholder="请选择账户">
                <el-option
                    v-for="item in bankAccounts"
                    :key="item.accountName"
                    :label="item.accountName"
                    :value="item.accountName">
                </el-option>
              </el-select>
              <el-input type="number" v-model="item.amount" style="width: 200px;margin-top: 10px"
                        placeholder="请输入收款金额"></el-input>
            </div>
            <div style="margin-top: 10px">
              <el-button type="text" size="small" @click="addAccount"
                         v-if="index === receiveSheetForm.receiveSheetContent.length - 1">添加收款账户
              </el-button>
              <el-button type="text" size="small" @click.prevent="removeAccount(item)" v-if="index !== 0">删除</el-button>
            </div>
          </el-form-item>
          <el-form-item label="备注: ">
            <el-input type="textarea" v-model="receiveSheetForm.receiveSheetContent.remark"></el-input>
          </el-form-item>
          <!--<el-form-item label="收款银行账户: " prop="bankAccount">
            <el-select v-model="receiveSheetForm.receiveSheetContent.bankAccount" placeholder="请选择收款账户">
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
          <el-form-item label="收款银行账户:">
            <el-input type="text" v-model="receiveSheetForm.receiveSheetContent.bankAccount" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="转账金额:">
            <el-input type="text" v-model="receiveSheetForm.receiveSheetContent.amount" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="备注: ">
            <el-input type="textarea" v-model="receiveSheetForm.receiveSheetContent.remark"></el-input>
          </el-form-item>
          -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('receiveSheetForm')">立即创建</el-button>
      </span>
    </el-dialog>

  </Layout>

</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import receiveSheetList from "@/views/financial/components/ReceiveSheetList";
import {createReceiveSheet, getAccount, getReceiveByState} from "@/network/Financial";
import {getAllCustomer} from "@/network/purchase";

export default {
  name: "receiveSheetView",
  components: {
    receiveSheetList,
    Layout,
    Title
  },
  /**
   * 用到的数据
   * @returns {{}}
   */
  data() {
    return {
      flag:false,
      activeName: "PENDING_LEVEL_1",
      receiveSheetList: [],
      dialogVisible: false,
      pendingLevel1List: [],
      successList: [],
      failureList: [],
      customers: [],
      bankAccounts: [],
      receiveSheetForm: {
        id: "",
        customer: "",
        operator: "",
        state: "",
        totalAmount: "",
        receiveSheetContent: [
          {
            id: "",
            receiveSheetId: "",
            bankAccount: "",
            amount: "",
            remark: ""
          }
        ]
      },
      rules: {
        customer: [
          {required: true, message: "请选择一个客户", trigger: "change"}
        ],
      },


    };
  },
  /**
   * 加载页面
   */
  mounted() {
    this.getReceiveSheets();
    getAllCustomer({params: {type: "SELLER"}}).then(_res => {
      this.customers = _res.result;
    });
    getAccount({}).then(_res => {
      this.bankAccounts = _res.result;
    });

  },
  /**
   * 页面里用到的方法
   */
  methods: {
    /**
     * 获取收款单列表
     */
    getReceiveSheets() {
      getReceiveByState({params: {state: "PENDING_LEVEL_1"}}).then(_res => {
        this.pendingLevel1List = _res.result;
      })
      getReceiveByState({params: {state: "SUCCESS"}}).then(_res => {
        this.successList = _res.result;
      })
      getReceiveByState({params: {state: "FAILURE"}}).then(_res => {
        this.failureList = _res.result;
      })
    },
    /**
     * 取消创建收款单
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
     * 重置收款单
     */
    resetForm() {
      this.receiveSheetForm = {
        customer: "",
        receiveSheetContent: [
          {
            bankAccount: "",
            amount: "",
            remark: "",
          }
        ]
      };
    },
    /**
     * 提交收款单
     */
    submitForm(formName) {

      this.receiveSheetForm.id = null;
      this.receiveSheetForm.operator = sessionStorage.getItem("name");
      this.receiveSheetForm.state = null;
      this.receiveSheetForm.totalAmount = null;

      this.receiveSheetForm.receiveSheetContent.id = null;
      this.receiveSheetForm.receiveSheetContent.receiveSheetId = null;
      this.receiveSheetForm.receiveSheetContent.amount = parseInt(this.receiveSheetForm.receiveSheetContent.amount);

      this.receiveSheetForm.receiveSheetContent.forEach((item) => {
        if (item.bankAccount === "" || item.amount === "" || this.receiveSheetForm.customer === "") {
          this.$message.error("表单信息不全！");
          this.flag = true;
        }
      })
      if(this.flag===false){
        createReceiveSheet(this.receiveSheetForm).then(_res => {
          console.log(_res);
          if (_res.msg === "Success") {
            this.$message.success("创建成功!");
            this.resetForm();
            this.dialogVisible = false;
            this.getReceiveSheets();
          }
        });
      }else{
        this.flag=false;
      }
    },
    addAccount() {
      this.receiveSheetForm.receiveSheetContent.push({});
    },
    removeAccount(item) {
      var index = this.receiveSheetForm.receiveSheetContent.indexOf(item);
      if (index !== -1) {
        this.receiveSheetForm.receiveSheetContent.splice(index, 1);
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


}
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