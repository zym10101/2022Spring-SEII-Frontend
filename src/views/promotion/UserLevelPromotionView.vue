<template>
  <Layout>
    <Title title="用户等级促销策略"></Title>
    <div>
      <span><strong> 用户等级促销策略 </strong></span>
      <div style="margin-top: 10px">
        <el-table
          :data="userLevelForm"
          stripe
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
          <el-table-column
            prop="userLevel"
            label="用户等级"
            min-width="100" sortable>
          </el-table-column>
          <el-table-column
            prop="giftName"
            label="赠品"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="discount"
            label="折让"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="voucher"
            label="代金券"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="beginTime"
            label="起始日期"
            min-width="200">
            <template slot-scope="scope">
              {{ formatBirthday(scope.row.beginTime) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="结束日期"
            min-width="200">
            <template slot-scope="scope">
              {{ formatBirthday(scope.row.endTime) }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作" min-width="200">
            <template slot-scope="scope">
              <el-button type="warning" size="small" @click.native.prevent="editInfo1(scope.row)">编辑</el-button>&nbsp;
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="编辑用户等级促销策略"
      :visible.sync="dialogVisibleEdit1"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="form1" label-width="100px" ref="EditReturnForm1">
          <el-form-item label="用户等级:  ">
            <el-input :disabled="true" v-model="form1.userLevel" style="width: 100px"
            ></el-input>
          </el-form-item>
          <el-form-item label="赠品:  ">
            <el-input type="text" v-model="form1.giftName" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="折让:  ">
            <el-input v-model="form1.discount" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="代金券:  ">
            <el-input v-model="form1.voucher" style="width: 100px"></el-input>
          </el-form-item>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>起始日期：</span>
          <el-date-picker
            style="width: 200px"
            v-model="form1.beginTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="起始日期">
          </el-date-picker>
          <br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>结束日期：</span>
          <el-date-picker
            style="width: 200px"
            v-model="form1.endTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="结束日期">
          </el-date-picker>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormEdit1()">编辑完成</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { formatBirthday } from "@/common/utils";
import {
  updateUserLevelPromotion,
  getUserLevelPromotion
} from "@/network/promotion";

export default {
  components: {
    Layout,
    Title
  },
  data() {
    return {
      form1: {},
      userLevelForm: [],
      dialogVisibleEdit1: false
    };
  },
  created() {
    this.load();
  },
  methods: {
    formatBirthday,
    load() {
      getUserLevelPromotion().then(_res => {
        this.userLevelForm = _res.result;
      });
    },
    editInfo1(row) {
      this.form1 = JSON.parse(JSON.stringify(row));
      this.dialogVisibleEdit1 = true;
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
    submitFormEdit1() {
      const config = {
        params: this.form1
      };
      updateUserLevelPromotion(config).then(_res => {
        this.userLevelForm = _res.result;
        this.dialogVisibleEdit1 = false;
        this.load();
      });
    }
  }
};
</script>

<style scoped lang="scss">
.mt15 {
  margin-top: 15px;
}
</style>