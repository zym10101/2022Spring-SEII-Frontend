<template>
  <Layout>
    <Title title="员工薪资"></Title>
    <span>   请选择员工类型：   </span>
    <el-select v-model="type" style="width: 150px" @mousedown.native="initList()">
      <el-option value="全体员工">全体员工</el-option>
      <el-option value="销售人员">销售人员</el-option>
      <el-option value="库存人员">库存人员</el-option>
      <el-option value="财务人员">财务人员</el-option>
      <el-option value="人力资源人员">人力资源人员</el-option>
      <el-option value="总经理">总经理</el-option>
    </el-select>
    <div v-if="type==='全体员工'||type===''">
      搜索员工：
      <el-input type="text" v-model="search" style="width: 200px;margin-bottom: 1.5%;margin-top: 1.5%"></el-input>
      <el-table
          :data="searchEmployee(employeeList)"
          stripe
          border
          style="width:100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="id"
            label="ID"
            width="80">
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
            label="手机">
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
            label="设置工资">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="salaryCal(scope.row.id)"
                type="warning"
                size="small">
              工资认定
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="type==='销售人员'">
      <el-table
          :data="saleList"
          stripe
          border
          style="width:100%;margin-top: 1.5%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="bankAccount"
            label="银行账户"
            width="180">
        </el-table-column>
        <el-table-column
            prop="position"
            label="工作岗位">
        </el-table-column>
        <el-table-column
            prop="baseSalary"
            label="基础工资">
        </el-table-column>
        <el-table-column
            prop="commissionRate"
            label="提成率">
        </el-table-column>
        <el-table-column
            label="设置工资">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="salaryCal(scope.row.id)"
                type="warning"
                size="small">
              工资认定
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else-if="type==='库存人员'">
      <el-table
          :data="inventoryList"
          stripe
          border
          style="width:100%;margin-top: 1.5%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="bankAccount"
            label="银行账户"
            width="180">
        </el-table-column>
        <el-table-column
            prop="position"
            label="工作岗位">
        </el-table-column>
        <el-table-column
            prop="baseSalary"
            label="基础工资">
        </el-table-column>
        <el-table-column
            prop="postRank"
            label="岗位等级">
        </el-table-column>
        <el-table-column
            prop="postSalary"
            label="岗位工资">
        </el-table-column>
        <el-table-column
            label="设置工资">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="salaryCal(scope.row.id)"
                type="warning"
                size="small">
              工资认定
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else-if="type==='财务人员'">
      <el-table
          :data="financialList"
          stripe
          border
          style="width:100%;margin-top: 1.5%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="bankAccount"
            label="银行账户"
            width="180">
        </el-table-column>
        <el-table-column
            prop="position"
            label="工作岗位">
        </el-table-column>
        <el-table-column
            prop="baseSalary"
            label="基础工资">
        </el-table-column>
        <el-table-column
            prop="postRank"
            label="岗位等级">
        </el-table-column>
        <el-table-column
            prop="postSalary"
            label="岗位工资">
        </el-table-column>
        <el-table-column
            label="设置工资">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="salaryCal(scope.row.id)"
                type="warning"
                size="small">
              工资认定
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="type==='人力资源人员'">
      <el-table
          :data="hrList"
          stripe
          border
          style="width:100%;margin-top: 1.5%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="bankAccount"
            label="银行账户"
            width="180">
        </el-table-column>
        <el-table-column
            prop="position"
            label="工作岗位">
        </el-table-column>
        <el-table-column
            prop="baseSalary"
            label="基础工资">
        </el-table-column>
        <el-table-column
            prop="postRank"
            label="岗位等级">
        </el-table-column>
        <el-table-column
            prop="postSalary"
            label="岗位工资">
        </el-table-column>
        <el-table-column
            label="设置工资">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="salaryCal(scope.row.id)"
                type="warning"
                size="small">
              工资认定
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="type==='总经理'">
      <el-table
          :data="managerList"
          stripe
          border
          style="width:100%;margin-top: 1.5%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="bankAccount"
            label="银行账户"
            width="180">
        </el-table-column>
        <el-table-column
            prop="position"
            label="工作岗位">
        </el-table-column>
        <el-table-column
            prop="yearlySalary"
            label="年薪">
        </el-table-column>
        <el-table-column
            label="设置工资">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="salaryCal(scope.row.id)"
                type="warning"
                size="small">
              工资认定
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="员工工资认定"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <span>  请选择时间段：  </span>
        <el-date-picker
            style="width: 150px"
            v-model="beginDate"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd"
            placeholder="开始日期">
        </el-date-picker>
        至
        <el-date-picker
            style="width: 150px"
            v-model="endDate"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd"
            placeholder="结束日期">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">立即认定</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  employeeCalSalary,
  getAllEmployee,
  getBaseAndCommissionEmployee,
  getMonthEmployee,
  getYearEmployee
} from "@/network/hr";
import {formatBirthday} from "@/common/utils";

export default {
  name: "EmployeeWageManagementView",
  components: {
    Layout,
    Title,
  },
  data() {
    return {
      employeeList: [],
      monthList: [],
      baseAndCommissionList: [],
      yearList: [],
      saleList: [],
      inventoryList: [],
      financialList: [],
      hrList: [],
      managerList: [],
      type: "全体员工",
      search: "",
      dialogVisible: false,
      beginDate: "",
      endDate: "",
      id: "",
    };
  },
  created() {
    getAllEmployee({}).then(_res => {
      this.employeeList = _res.result;
    });
    getMonthEmployee({}).then(_res => {
      this.monthList = _res.result;
    });
    getBaseAndCommissionEmployee({}).then(_res => {
      this.baseAndCommissionList = _res.result;
    });
    getYearEmployee({}).then(_res => {
      this.yearList = _res.result;
    });
    this.saleList = this.baseAndCommissionList.filter(item => item.position === "销售人员");
    this.inventoryList = this.monthList.filter(item => item.position === "库存人员");
    this.financialList = this.monthList.filter(item => item.position === "财务人员");
    this.hrList = this.monthList.filter(item => item.position === "人力资源人员");
    this.managerList = this.yearList.filter(item => item.position === "总经理");
  },
  methods: {
    initList() {
      getMonthEmployee({}).then(_res => {
        this.monthList = _res.result;
      });
      getBaseAndCommissionEmployee({}).then(_res => {
        this.baseAndCommissionList = _res.result;
      });
      getYearEmployee({}).then(_res => {
        this.yearList = _res.result;
      });
      this.saleList = this.baseAndCommissionList.filter(item => item.position === "销售人员");
      this.inventoryList = this.monthList.filter(item => item.position === "库存人员");
      this.financialList = this.monthList.filter(item => item.position === "财务人员");
      this.hrList = this.monthList.filter(item => item.position === "人力资源人员");
      this.managerList = this.yearList.filter(item => item.position === "总经理")
    },
    formatBirthday,
    handleClose(done) {
      this.$confirm("确认取消？")
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
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
    salaryCal(id) {
      this.id = id;
      this.dialogVisible = true;
    },
    submitForm() {
      const config = {
        params: {
          beginTimeStr: this.beginDate,
          endTimeStr: this.endDate,
          id: this.id,
        }
      }
      if(this.beginDate===""||this.endDate===""){
        this.$message.error("请选择时间段！");
      }else{
        employeeCalSalary(config).then(_res => {
          console.log(_res);
          if (_res.msg === "Success") {
            this.$message.success("编辑成功!");
            this.dialogVisible = false;
            location.reload();
          } else {
            this.$message.error("编辑失败!");
          }
        });
      }
    }
  }
}
</script>

<style scoped>

</style>