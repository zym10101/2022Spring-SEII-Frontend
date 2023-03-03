<template>
  <Layout>
    <Title title="库存报溢单"></Title>
    （当实际库房中的商品数量比系统中的多时要进行库存报溢，向系统库存中添加商品使一致。）
    <div class="table-body">
      <el-table
        :data="cur_list"
        style="width: 100%;"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column fixed type="index" label="行号" min-width="15%">
        </el-table-column>
        <el-table-column prop="id" label="单号" min-width="20%">
        </el-table-column>
        <el-table-column prop="batchId" label="批次" min-width="8%">
        </el-table-column>
        <el-table-column prop="operator" label="操作员" min-width="10%">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="15%">
          <template slot-scope="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="pid" label="商品id" min-width="15%">
        </el-table-column>
        <el-table-column prop="purchasePrice" label="单价" min-width="8%">
        </el-table-column>
        <el-table-column prop="byQuantity" label="报溢数量" min-width="8%">
        </el-table-column>
      </el-table>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { getWarehouseOverflow } from "@/network/warehouse";
import { formatDate } from "@/common/utils";

export default {
  components: {
    Layout,
    Title
  },
  data() {
    return {
      cur_list: [],
      cur_row: {},
      dialogVisible: false
    };
  },
  mounted() {
    getWarehouseOverflow().then(_res => {
      console.log("库存报溢");
      this.cur_list = _res.result;
      this.cur_row = this.cur_list[0];
    });
  },
  methods: {
    showProduct(row) {
      this.cur_row = row;
      this.dialogVisible = true;
    },
    handleClose(done) {
      done();
    },
    formatDate
  }
};
</script>

<style scoped>
.table-body {
  width: 100%;
  margin: 20px auto;
}
</style>
