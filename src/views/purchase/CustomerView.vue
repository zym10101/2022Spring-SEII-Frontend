<template>
  <Layout>
    <Title title="客户管理"></Title>
    <el-button type="primary" size="medium" @click="addCustomer">新增客户</el-button>
    <el-button type="danger" size="medium" @click="deleteCustomer">删除客户</el-button>
    <div style="margin-top: 10px">
      <el-table
          :data="customerList"
          stripe
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="id"
            label="id"
            width="40">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="70">
        </el-table-column>
        <el-table-column
            prop="type"
            label="类型"
            width="100"
            :filters="[{ text: '供应商', value: '供应商' }, { text: '销售商', value: '销售商' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.type === '供应商' ? 'primary' : 'success'"
                disable-transitions>{{ scope.row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="level"
            label="级别"
            width="50">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话"
            width="100">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="100">
        </el-table-column>
        <el-table-column
            prop="zipcode"
            label="邮编"
            width="100">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            width="150">
        </el-table-column>
        <el-table-column
            prop="lineOfCredit"
            label="应收额度(元)"
            width="120">
        </el-table-column>
        <el-table-column
            prop="receivable"
            label="应收(元)"
            width="100">
        </el-table-column>
        <el-table-column
            prop="payable"
            label="应付(元)"
            width="100">
        </el-table-column>
        <el-table-column
            prop="operator"
            label="操作员"
            width="100">
        </el-table-column>
        <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="editInfo(scope.row.id)"
                type="warning"
                size="small">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="增加客户"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="customerAddReturnForm" label-width="100px" ref="customerAddReturnForm">
          <el-form-item label="姓名： ">
            <el-input type="text" v-model="customerName" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="类型：">
            <el-select v-model="customerType" placeholder="请选择客户类型">
              <el-option value="供应商">供应商</el-option>
              <el-option value="销售商">销售商</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="级别： ">
            <el-input type="number" v-model="customerLevel" style="width: 100px" min="1" max="5"></el-input>
          </el-form-item>
          <el-form-item label="电话： ">
            <el-input type="text" v-model="customerPhone" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="地址： ">
            <el-input type="text" v-model="customerAddress" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="邮编： ">
            <el-input type="text" v-model="customerZipcode" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="邮箱： ">
            <el-input type="text" v-model="customerEmail" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="应收额度： ">
            <el-input type="text" v-model="customerLineOfCredit" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="应收： ">
            <el-input type="text" v-model="customerAR" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="应付： ">
            <el-input type="text" v-model="customerAP" style="width: 200px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">立即创建</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="编辑客户信息"
        :visible.sync="dialogVisibleEdit"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="customerEditReturnForm" label-width="100px" ref="customerEditReturnForm">
          <el-form-item label="姓名： ">
            <el-input type="text" v-model="customerName" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="类型：">
            <el-select v-model="customerType" placeholder="请选择客户类型">
              <el-option value="供应商">供应商</el-option>
              <el-option value="销售商">销售商</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="级别： ">
            <el-input type="number" v-model="customerLevel" style="width: 100px" min="1" max="5"></el-input>
          </el-form-item>
          <el-form-item label="电话： ">
            <el-input type="text" v-model="customerPhone" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="地址： ">
            <el-input type="text" v-model="customerAddress" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="邮编： ">
            <el-input type="text" v-model="customerZipcode" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="邮箱： ">
            <el-input type="text" v-model="customerEmail" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="应收额度： ">
            <el-input type="text" v-model="customerLineOfCredit" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="应收： ">
            <el-input type="text" v-model="customerAR" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="应付： ">
            <el-input type="text" v-model="customerAP" style="width: 200px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormEdit()">编辑完成</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="删除客户"
      :visible.sync="dialogVisibleDelete"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="customerDeleteReturnForm" label-width="200px" ref="customerDeleteReturnForm">
          <el-form-item label="请输入想要删除的客户的ID： ">
            <el-input type="text" v-model="customerDeleteID" style="width: 100px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="customerDeleteConfirm(customerDeleteID)">确认删除</el-button>
      </span>
    </el-dialog>

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {getAllCustomer} from "@/network/purchase";
import {registerCustomer} from "@/network/purchase";
import {dropCustomer} from "@/network/purchase";

export default {
  name: "CustomerView",
  components: {
    Layout,
    Title
  },
  data() {
    return {
      customerList: [],
      customerAddReturnForm: [],
      customerEditReturnForm: [],
      customerDeleteReturnForm: [],
      dialogVisible: false,
      dialogVisibleEdit: false,
      dialogVisibleDelete: false,
      customerID: "",
      customerName: "",
      customerType: "",
      customerLevel: "",
      customerPhone: "",
      customerAddress: "",
      customerZipcode: "",
      customerEmail: "",
      customerLineOfCredit: "",
      customerAR: "",
      customerAP: "",
      customerForm: {
        ID: "",
        type: "",
        level: "",
        name: "",
        phone: "",
        address: "",
        zipcode: "",
        email: "",
        lineOfCredit: "",
        receivable: "",
        payable: "",
        operator: ""
      },
      customerDeleteID: ""

    };
  },
  async mounted() {
    await getAllCustomer({params: {type: "SUPPLIER"}}).then(_res => {
      this.customerList = this.customerList.concat(_res.result);
    });
    await getAllCustomer({params: {type: "SELLER"}}).then(_res => {
      this.customerList = this.customerList.concat(_res.result);
    });
  },
  methods: {
    filterTag(value, row) {
      return row.type === value;
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
    addCustomer() {
      // TODO: 新增客户
      this.dialogVisible = true;
      //registerCustomer()
    },
    submitForm() {
      this.dialogVisible = false;
      this.customerForm.ID = null;
      this.customerForm.name = this.customerName;
      this.customerForm.level = parseInt(this.customerLevel);
      this.customerForm.type = this.customerType;
      this.customerForm.phone = this.customerPhone;
      this.customerForm.address = this.customerAddress;
      this.customerForm.zipcode = this.customerZipcode;
      this.customerForm.email = this.customerEmail;
      this.customerForm.lineOfCredit = Number(this.customerLineOfCredit);
      this.customerForm.receivable = Number(this.customerAR);
      this.customerForm.payable = Number(this.customerAP);
      this.customerForm.operator = sessionStorage.getItem("name");
      registerCustomer(this.customerForm);
      this.$message({
        type: "success",
        message: "添加成功!"
      });
      this.resetForm();
      location.reload();
      //this.getCustomerForms();
    },
    deleteCustomer() {
      //删除客户
      this.dialogVisibleDelete = true;
    },
    customerDeleteConfirm(id) {
      let config = {
        params: {
          id: id
        }
      };
      this.$confirm("是否要删除该客户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=> {
        dropCustomer(config).then(_res => {
          if (_res.msg === "Success") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            alert("删除失败");
          }
        });
      });
      this.customerDeleteID="";
    },
    resetForm() {
      this.customerID = "";
      this.customerName = "";
      this.customerType = "";
      this.customerLevel = "";
      this.customerPhone = "";
      this.customerAddress = "";
      this.customerZipcode = "";
      this.customerEmail = "";
      this.customerLineOfCredit = "";
      this.customerAR = "";
      this.customerAP = "";
    }
    ,
    editInfo(id) {
      // TODO: 修改客户信息
      this.dialogVisibleEdit=true;
    },
    submitFormEdit(){

    }
  }
};
</script>

<style>

</style>