<template>
  <Layout>
    <Title title="账户管理"></Title>
    通过名称搜索账户：
    <el-input type="text" v-model="search" style="width: 200px"></el-input>
    <!--<el-button type="primary" size="medium" icon="el-icon-search" style="margin-left: 10px" @click="searchAccount"></el-button>-->
    <br>
    <el-button type="primary" size="medium" style="margin-top: 10px" @click="accountAdd">新增账户</el-button>
    <div style="margin-top: 15px">
      <el-table
          :data="searchAccount(accountList)"
          stripe
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="accountName"
            label="账户名称"
            width="300">
        </el-table-column>
        <el-table-column
            prop="balance"
            label="余额"
            width="300">
        </el-table-column>
        <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="editInfo(scope.row)"
                type="warning"
                size="small">
              编辑
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
            label="删除">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="accountDelete(scope.row.accountName)"
                type="danger"
                size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="增加账户"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="addForm" label-width="100px" ref="addForm" :rules="addRules">
          <el-form-item label="账户名称" prop="accountName">
            <el-input type="text" v-model="addForm.accountName" style="width: 150px"></el-input>
          </el-form-item>
          <el-form-item label="账户余额" prop="balance">
            <el-input type="number" v-model="addForm.balance" style="width: 150px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">立即创建</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="编辑账户名称"
        :visible.sync="dialogVisibleEdit"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="editForm" label-width="200px" ref="editForm" :rules="editRules">
          <el-form-item label="请输入修改后的账户名称" prop="name">
          <el-input type="text" v-model="editForm.name" style="width: 150px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpdate()">立即修改</el-button>
      </span>
    </el-dialog>
  </Layout>

</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {addAccount, deleteAccount, getAccount, updateAccount} from "@/network/Financial";


export default {
  name: "FinancialView",
  components: {
    Layout,
    Title
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisibleEdit: false,
      accountList: [],
      id: "",
      editForm:{
        name: "",
      },
      search: "",
      addForm: {
        id: "",
        accountName: "",
        balance: 0,
      },

      addRules: {
        accountName: [
          {required: true, message: "请输入账户名称", trigger: "blur"}
        ],
        balance: [
          {required: true, message: "请输入账户余额", trigger: "blur"}
        ],
      },
      editRules:{
        name: [
          {required: true, message: "账户名称不能为空", trigger: "blur"}
        ],
      }
    };
  },
  mounted() {
    getAccount({}).then(_res => {
      this.accountList = _res.result;
    });
  },
  methods: {
    accountAdd() {
      this.dialogVisible = true;
    },
    accountDelete(name) {
      let config = {
        params: {
          accountName: name
        }
      };
      this.$confirm("确认删除？").then(_ => {
        deleteAccount(config).then(_res => {
          if (_res.msg === "Success") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            getAccount({}).then(_res => {
              this.accountList = _res.result;
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败!"
            });
            alert(name);
          }
        })
      })
    },
    submitForm() {
      this.addForm.id = null;
      if(this.addForm.accountName===""||this.addForm.balance===""){
        this.$message.error("表单信息不全！");
      }else{
        addAccount(this.addForm).then(_res => {
          if (_res.msg === "Success") {
            this.$message.success("创建成功!");
            this.resetForm();
            this.dialogVisible = false;
            getAccount({}).then(_res => {
              this.accountList = _res.result;
            });
          } else {
            this.$message.error("创建失败!");
          }
        })
      }
    },
    editInfo(row) {
      this.dialogVisibleEdit = true;
      this.id = row.id;
      this.editForm.name = JSON.parse(JSON.stringify(row.accountName));
    },
    submitUpdate() {
      let config = {
        params: {
          id: this.id,
          name: this.editForm.name,
        }
      }
      if(this.editForm.name!==""){
        updateAccount(config).then(_res => {
          if (_res.msg === "Success") {
            this.$message.success("修改成功!");
            this.dialogVisibleEdit = false;
            getAccount({}).then(_res => {
              this.accountList = _res.result;
            });
          } else {
            this.$message.error("修改失败!");
          }
        })
      }
    },
    resetForm() {
      this.addForm.accountName = "";
      this.addForm.balance = 0;
    },
    searchAccount() {
      if (this.search === "") {
        return this.accountList;
      } else {
        return this.accountList.filter(item => {
          if (item.accountName.includes(this.search)) {
            return item;
          }
        })
      }
    },
    handleClose(done) {
      this.$confirm("确认取消？")
          .then(_ => {
            this.resetForm();
            this.dialogVisible = false;
            done();
          })
          .catch(_ => {
          });
    },
  },
}
</script>

<style scoped>

</style>