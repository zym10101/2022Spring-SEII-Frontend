<template>
  <div class="card">
    <el-card v-for="(item, index) in list" :index="item.index" :key="item.id" shadow="hover">
      <template #header>
        <el-row>
          <el-col :span="18">
            <span><strong>id: </strong>{{ item.id }}</span>
            <el-button v-if="authorization() === 1" style="margin-left: 10px"
                       type="success" icon="el-icon-check" circle size="mini" @click="approval(item.id)"></el-button>
            <el-button v-if="authorization() === 1"
                       type="danger" icon="el-icon-close" circle size="mini" @click="deny(item.id)"></el-button>
            <el-button v-if="authorization() === 2" style="margin-left: 10px"
                       type="success" icon="el-icon-check" circle size="mini" @click="approval(item.id)"></el-button>
            <el-button v-if="authorization() === 2"
                       type="danger" icon="el-icon-close" circle size="mini" @click="deny(item.id)"></el-button>
            <span style="margin-left: 10px">
              <el-tag v-if="type === 3" effect="dark" type="success">审核通过</el-tag>
              <el-tag v-if="type === 4" effect="dark" type="danger">审核未通过</el-tag>
            </span>
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <el-col :span="6">
            <span><strong>员工id: </strong>{{ item.employeeId }}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>员工姓名: </strong>{{ item.name }}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>操作员: </strong>{{ item.operator }}</span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 25px">
          <el-col :span="8">
            <span><strong>工资卡:</strong>{{item.bankAccount}}</span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 25px">
          <el-col :span="6">
            <span><strong>应发:</strong>{{item.totalAmount}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>扣除税款:</strong>{{item.tax}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>实发:</strong>{{item.finalAmount}}</span>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import {firstApproval, secondApproval} from "@/network/Financial";

export default {
  name: "WageSheetList",
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
      showAll: []
    };
  },
  mounted() {
    this.showAll = new Array(this.list.length).fill(false);
  },
  methods: {
    changeState(index) {
      this.$set(this.showAll, index, !this.showAll[index]);
    },
    authorization() {
      if(this.type === 1 && sessionStorage.getItem("role") === "HR"){
        return 1;
      } else if(this.type === 2 && sessionStorage.getItem("role") === "GM") {
        return 2;
      }
    },
    approval(id) {
      let config = {
        params: {
          wageSheetId: id,
          state: this.type === 1 ? "PENDING_LEVEL_2" : "SUCCESS"
        }
      };
      if (this.type === 1) {
        firstApproval(config).then(res => {
          this.$emit("refresh");
          this.$message({
            message: "操作成功!",
            type: "success"
          });
        });
      } else {
        secondApproval(config).then(res => {
          this.$emit("refresh");
          this.$message({
            message: "操作成功!",
            type: "success"
          });
        });
      }
    },
    deny(id) {
      let config = {
        params: {
          wageSheetId: id,
          state: "FAILURE"
        }
      };
      if (this.type === 1) {
        firstApproval(config).then(res => {
          this.$emit("refresh");
          this.$message({
            message: "操作成功!",
            type: "success"
          });
        });
      } else {
        secondApproval(config).then(res => {
          this.$emit("refresh");
          this.$message({
            message: "操作成功!",
            type: "success"
          });
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 80%;
  margin: 0 auto;

  .button {
    float: right;
    padding: 3px 0
  }
}

.el-card {
  margin-bottom: 20px;
  background: #EEF7F2;
}
</style>