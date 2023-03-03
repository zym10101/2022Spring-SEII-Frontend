<template>
  <Layout>
    <Title title="总价促销策略"></Title>
    <div>
      <span><strong> 总价促销策略 </strong></span>
      <el-button type="primary" size="small" @click="add">新增策略</el-button><br><br>
      <div style="margin-top: 10px">
        <el-table
          :data="totalAmountForm"
          stripe
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
          <el-table-column
            prop="totalAmountMin"
            label="总价高于"
            min-width="200" sortable>
          </el-table-column>
          <el-table-column
            prop="giftName"
            label="赠品"
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="voucher"
            label="代金券"
            min-width="200">
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
              <el-button type="warning" size="small" @click.native.prevent="editInfo2(scope.row)">编辑</el-button>&nbsp;
              <el-popconfirm title="确认删除这条数据吗？" @confirm="handleDelete2(scope.row)">
                <template #reference>
                  <el-button type="danger" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="编辑总价促销策略"
      :visible.sync="dialogVisibleEdit2"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="form2" label-width="100px" ref="EditReturnForm1">
          <el-form-item label="总价高于:  ">
            <el-input :disabled="true" v-model=form2.totalAmountMin style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="赠品:  ">
            <el-input type="text" v-model=form2.giftName style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="代金券:  ">
            <el-input v-model=form2.voucher style="width: 100px"></el-input>
          </el-form-item>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>起始日期：</span>
          <el-date-picker
            style="width: 200px"
            v-model="form2.beginTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="起始日期">
          </el-date-picker>
          <br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>结束日期：</span>
          <el-date-picker
            style="width: 200px"
            v-model="form2.endTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="结束日期">
          </el-date-picker>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormEdit2()">编辑完成</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加总价促销策略"
      :visible.sync="dialogVisibleEdit3"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="addForm" label-width="100px">
          <el-form-item label="总价高于:  ">
            <el-input v-model=addForm.totalAmountMin style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="赠品:  ">
            <el-input type="text" v-model=addForm.giftName style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="代金券:  ">
            <el-input v-model=addForm.voucher style="width: 100px"></el-input>
          </el-form-item>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>起始日期：</span>
          <el-date-picker
            style="width: 200px"
            v-model="addForm.beginTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="起始日期">
          </el-date-picker>
          <br><br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>结束日期：</span>
          <el-date-picker
            style="width: 200px"
            v-model="addForm.endTime"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="结束日期">
          </el-date-picker>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFormEdit3()">添加</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { formatBirthday } from "@/common/utils";
import {
  updateTotalAmountPromotion,
  getTotalAmountPromotion,
  addTotalAmountPromotion
} from "@/network/promotion";
import request from "@/network/request";
import testAPI from "@/apis";

export default {
  components: {
    Layout,
    Title
  },
  data() {
    return {
      form2: {},
      addForm: {},
      totalAmountForm: [],
      dialogVisibleEdit2: false,
      dialogVisibleEdit3: false
    };
  },
  created() {
    this.load();
  },
  methods: {
    formatBirthday,
    load() {
      getTotalAmountPromotion().then(_res => {
        this.totalAmountForm = _res.result;
      });
    },
    editInfo2(row) {
      this.form2 = JSON.parse(JSON.stringify(row));
      this.dialogVisibleEdit2 = true;
    },
    add() {
      this.addForm = {};
      this.dialogVisibleEdit3 = true;
    },
    handleDelete2(row) {
      request._delete(testAPI.DELETE_TOTAL_AMOUNT_PROMOTION + row.totalAmountMin).then(_res => {
        this.load();//刷新表格数据
      });
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
    submitFormEdit2() {
      const config = {
        params: this.form2
      };
      updateTotalAmountPromotion(config).then(_res => {
        this.totalAmountForm = _res.result;
        this.dialogVisibleEdit2 = false;
        this.load();
      });
    },
    submitFormEdit3() {
      const config = {
        params: this.addForm
      };
      addTotalAmountPromotion(config).then(_res => {
        this.totalAmountForm = _res.result;
        this.dialogVisibleEdit3 = false;
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