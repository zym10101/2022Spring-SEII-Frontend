<template>
  <Layout>
    <Title title="员工管理"></Title>
    搜索员工：
    <el-input type="text" v-model="search" style="width: 200px"></el-input>
    <el-button type="primary" size="medium" @click="addEmployee" style="margin-bottom: 15px;margin-left: 57%">员工入职登记
    </el-button>
    <div>
      <el-table
          :data="searchEmployee(employeeList)"
          stripe
          border
          style="width:100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="id"
            label="ID">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="80">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="50">
        </el-table-column>
        <el-table-column
            prop="birthday"
            label="出生日期"
            width="100">
          <template slot-scope="scope">
            {{ formatBirthday(scope.row.birthday) }}
          </template>
        </el-table-column>
        <el-table-column
            prop="phoneNumber"
            label="手机"
            width="120">
        </el-table-column>
        <el-table-column
            prop="bankAccount"
            label="银行账户"
            width="180">
        </el-table-column>
        <el-table-column
            prop="position"
            label="工作岗位"
            width="110">
        </el-table-column>
        <el-table-column
            prop="salaryCalculationStrategy"
            label="薪资计算方式"
            width="120">
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
                @click.native.prevent="deleteEmployee(scope.row.id)"
                type="danger"
                size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="员工入职登记"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="employeeForm" label-width="120px" ref="employeeForm" :rules="rules">
          <el-form-item label="ID：" prop="id">
            <el-input type="text" v-model="employeeForm.id" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input type="text" v-model="employeeForm.name" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="employeeForm.sex" placeholder="请选择生理性别" style="width: 150px">
              <el-option value="男">男</el-option>
              <el-option value="女">女</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期：" prop="birthday">
            <el-date-picker
                style="width: 150px"
                v-model="employeeForm.birthday"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="出生日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="手机：" prop="phoneNumber">
            <el-input type="text" v-model="employeeForm.phoneNumber" style="width: 150px"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="employeePostForm" label-width="120px" ref="employeePostForm" :rules="postRules">
          <el-form-item label="银行账户：" prop="bankAccount">
            <el-input type="text" v-model="employeePostForm.bankAccount" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="工作岗位：" prop="position">
            <el-select v-model="employeePostForm.position" placeholder="请选择工作岗位" style="width: 150px"
                       @change="salaryTypeControl()">
              <el-option value="销售人员">销售人员</el-option>
              <el-option value="库存人员">库存人员</el-option>
              <el-option value="财务人员">财务人员</el-option>
              <el-option value="人力资源人员">人力资源人员</el-option>
              <el-option value="总经理">总经理</el-option>
            </el-select>
          </el-form-item>
          <div v-if="authorization()===1">
            <el-form-item label="基本工资：">
              <el-input type="text" v-model="baseAndCommissionForm.baseSalary" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="提成率：">
              <el-input type="text" v-model="baseAndCommissionForm.commissionRate" style="width: 150px"></el-input>
            </el-form-item>
          </div>
          <div v-if="authorization()===2">
            <el-form-item label="年薪：">
              <el-input type="text" v-model="yearForm.yearlySalary" style="width: 150px"></el-input>
            </el-form-item>
          </div>
          <div v-if="authorization()===3">
            <el-form-item label="基本工资：">
              <el-input type="text" v-model="monthForm.baseSalary" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="岗位级别：">
              <el-select v-model="monthForm.postRank" placeholder="请选择岗位级别" style="width: 150px">
                <el-option value="初级" label="初级">初级</el-option>
                <el-option value="高级" label="高级">高级</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="岗位工资：">
              <el-input type="text" v-model="monthForm.postSalary" style="width: 150px"></el-input>
            </el-form-item>

          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm(1)">立即提交</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="员工信息编辑"
        :visible.sync="dialogVisibleEdit"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="employeeForm" label-width="120px" ref="employeeForm">
          <el-form-item label="ID：">
            <el-input type="text" disabled=true v-model="employeeForm.id" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input type="text" v-model="employeeForm.name" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-select v-model="employeeForm.sex" placeholder="请选择生理性别" style="width: 150px">
              <el-option value="男">男</el-option>
              <el-option value="女">女</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期：">
            <el-date-picker
                style="width: 150px"
                v-model="employeeForm.birthday"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="出生日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="手机：">
            <el-input type="text" v-model="employeeForm.phoneNumber" style="width: 150px"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="employeePostForm" label-width="120px" ref="employeePostForm">
          <el-form-item label="银行账户：">
            <el-input type="text" v-model="employeePostForm.bankAccount" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="工作岗位：">
            <el-select v-model="employeePostForm.position" placeholder="请选择工作岗位" style="width: 150px"
                       @change="salaryTypeControl()">
              <el-option value="销售人员">销售人员</el-option>
              <el-option value="库存人员">库存人员</el-option>
              <el-option value="财务人员">财务人员</el-option>
              <el-option value="人力资源人员">人力资源人员</el-option>
              <el-option value="总经理">总经理</el-option>
            </el-select>
          </el-form-item>
          <div v-if="authorization()===1">
            <el-form-item label="基本工资：">
              <el-input type="text" v-model="baseAndCommissionForm.baseSalary" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="提成率：">
              <el-input type="text" v-model="baseAndCommissionForm.commissionRate" style="width: 150px"></el-input>
            </el-form-item>
          </div>
          <div v-if="authorization()===2">
            <el-form-item label="年薪：">
              <el-input type="text" v-model="yearForm.yearlySalary" style="width: 150px"></el-input>
            </el-form-item>
          </div>
          <div v-if="authorization()===3">
            <el-form-item label="基本工资：">
              <el-input type="text" v-model="monthForm.baseSalary" style="width: 150px"></el-input>
            </el-form-item>
            <el-form-item label="岗位级别：">
              <el-select v-model="monthForm.postRank" placeholder="请选择岗位级别" style="width: 150px">
                <el-option value="初级" label="初级">初级</el-option>
                <el-option value="高级" label="高级">高级</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="岗位工资：">
              <el-input type="text" v-model="monthForm.postSalary" style="width: 150px"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.prevent="submitForm(2)">立即提交</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  baseAndCommissionCal, baseAndCommissionUpdate,
  employeeAdd, employeeDelete,
  employeePostAdd, employeePostDelete,
  employeePostUpdate,
  employeeUpdate,
  getAllEmployee,
  getEmployeeById, monthlyCal, monthlyUpdate, yearlyCal, yearlyUpdate
} from "@/network/hr";
import {formatBirthday} from "@/common/utils";
import {deleteAccount} from "@/network/Financial";

export default {
  name: "EmployeeManagementView",
  components: {
    Layout,
    Title
  },
  data() {
    return {
      flag: false,
      dialogVisible: false,
      dialogVisibleEdit: false,
      search: "",
      employeeList: [],
      employeeForm: {
        id: "",
        name: "",
        sex: "",
        birthday: "",
        phoneNumber: "",
      },
      employeePostForm: {
        id: "",
        bankAccount: "",
        position: "",
        salaryCalculationStrategy: "",
      },
      monthForm: {
        id: "",
        baseSalary: "",
        postSalary: 0,
        postRank: "",
      },
      baseAndCommissionForm: {
        id: "",
        baseSalary: "",
        commissionRate: "",
      },
      yearForm: {
        id: "",
        yearlySalary: "",
      },
      rules: {
        id: [
          {required: true, message: "请输入ID", trigger: "blur"}
        ],
        name: [
          {required: true, message: "请输入名字", trigger: "blur"}
        ],
        phoneNumber: [
          {required: true, message: "请输入手机号码", trigger: "blur"}
        ],
      },
      postRules: {
        bankAccount: [
          {required: true, message: "请输入银行账户", trigger: "blur"}
        ],
      }

    };
  },
  mounted() {
    getAllEmployee({}).then(_res => {
      this.employeeList = _res.result;
    })

  },
  methods: {
    searchEmployee() {
      if (this.search === "") {
        return this.employeeList;
      } else {
        return this.employeeList.filter(item => {
          if (item.name.includes(this.search)) {
            return item;
          }
        })
      }
    },
    formatBirthday,
    handleClose(done) {
      this.$confirm("确认取消？")
          .then(_ => {
            this.resetForm();
            done();
          })
          .catch(_ => {
          });
    },
    addEmployee() {
      this.dialogVisible = true;
    },
    salaryTypeControl() {
      if (this.employeePostForm.position === "销售人员") {
        this.employeePostForm.salaryCalculationStrategy = "提成制";
      } else if (this.employeePostForm.position === "库存人员"
          || this.employeePostForm.position === "人力资源人员"
          || this.employeePostForm.position === "财务人员") {
        this.employeePostForm.salaryCalculationStrategy = "月薪制";
      } else if (this.employeePostForm.position === "总经理") {
        this.employeePostForm.salaryCalculationStrategy = "年薪制";
      }
    },
    submitForm(index) {
      const id = this.employeeForm.id;
      this.employeePostForm.id = id;
      this.monthForm.id = id;
      this.baseAndCommissionForm.id = id;
      this.yearForm.id = id;
      if (this.employeeForm.id === ""
          || this.employeeForm.name === ""
          || this.employeeForm.sex === ""
          || this.employeeForm.birthday === ""
          || this.employeePostForm.position === ""
          || this.employeePostForm.bankAccount === "") {
        this.flag = true;
        this.$message.error("表单信息不完整！");
      }
      if (index === 1 && this.flag === false) {
        if (this.authorization() === 1) {
          if(this.baseAndCommissionForm.baseSalary===""||this.baseAndCommissionForm.commissionRate===""){
            this.flag=true;
          }else{
            baseAndCommissionCal(this.baseAndCommissionForm);
          }
        } else if (this.authorization() === 2) {
          if(this.yearForm.yearlySalary===""){
            this.flag=true;
          }else{
            yearlyCal(this.yearForm);
          }
        } else if (this.authorization() === 3) {
          if(this.monthForm.baseSalary===""||this.monthForm.postSalary===""||this.monthForm.postRank===""){
            this.flag=true;
          }else{
            monthlyCal(this.monthForm);
          }
        }
        if(this.flag===false){
          employeeAdd(this.employeeForm);
          employeePostAdd(this.employeePostForm).then(_res => {
            if (_res.msg === "Success") {
              this.$message.success("创建成功!");
              this.resetForm();
              this.dialogVisible = false;
              getAllEmployee({}).then(_res => {
                this.employeeList = _res.result;
              });
            } else {
              this.$message.error("创建失败！");
            }
          });
        }else{
          this.$message.error("表单信息不完整！");
        }
      } else if (index === 2 && this.flag === false) {
        if (this.authorization() === 1) {
          if(this.baseAndCommissionForm.baseSalary===""||this.baseAndCommissionForm.commissionRate===""){
            this.flag=true;
          }else{
            baseAndCommissionUpdate(this.baseAndCommissionForm);
          }
        } else if (this.authorization() === 2) {
          if(this.yearForm.yearlySalary===""){
            this.flag=true;
          }else{
            yearlyUpdate(this.yearForm);
          }
        } else if (this.authorization() === 3) {
          if(this.monthForm.baseSalary===""||this.monthForm.postSalary===""||this.monthForm.postRank===""){
            this.flag=true;
          }else{
            monthlyUpdate(this.monthForm);
          }
        }
        if(this.flag===false){
          employeeUpdate(this.employeeForm);
          employeePostUpdate(this.employeePostForm).then(_res => {
            if (_res.msg === "Success") {
              this.$message.success("修改成功!");
              this.resetForm();
              this.dialogVisibleEdit = false;
              getAllEmployee({}).then(_res => {
                this.employeeList = _res.result;
              });
            } else {
              this.$message.error("修改失败！");
            }
          });
        }else{
          this.$message.error("表单信息不完整！");
        }
      }
      clearTimeout(this.timer);  //清除延迟执行
      this.timer = setTimeout(()=>{   //设置延迟执行
        this.flag=false;
      },1000);
    },
    editInfo(row) {
      this.employeeForm = JSON.parse(JSON.stringify(row));
      this.employeePostForm = JSON.parse(JSON.stringify(row));
      this.dialogVisibleEdit = true;
    },
    deleteEmployee(id) {
      this.$confirm("确认删除？").then(_ => {
        employeeDelete({params: {id: id}}).then(_res => {
          if (_res.msg === "Success") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            getAllEmployee({}).then(_res => {
              this.employeeList = _res.result;
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
    resetForm() {
      this.employeeForm = {
        id: "",
        name: "",
        sex: "",
        birthday: "",
        phoneNumber: "",
      };
      this.employeePostForm = {
        id: "",
        bankAccount: "",
        position: "",
        baseSalary: "",
        postSalary: "",
        postRank: "",
        salaryCalculationStrategy: "",
        salaryPayment: "",
      }
    },
    authorization() {
      if (this.employeePostForm.position === "销售人员") {
        return 1;
      } else if (this.employeePostForm.position === "总经理") {
        return 2;
      } else if (this.employeePostForm.position === "库存人员"
          || this.employeePostForm.position === "人力资源人员"
          || this.employeePostForm.position === "财务人员") {
        return 3;
      } else {
        return 4;
      }

    }
  }

}
</script>

<style scoped>

</style>