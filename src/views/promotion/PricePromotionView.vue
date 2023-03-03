<template>
  <Layout>
    <Title title="特价包商品管理"></Title>
    <div class="commodity-body">
      <el-table
        :data="commodityList.filter(data => !search || data.name.includes(search) || data.id.includes(search))"
        style="width: 100%;"
        :header-cell-style="{'text-align': 'center'}"
        :cell-style="{'text-align': 'center'}">
        <el-table-column
          fixed
          prop="id"
          label="编号"
          min-width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="type"
          label="型号"
          min-width="300">
        </el-table-column>
        <el-table-column
          prop="purchasePrice"
          label="进价"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="retailPrice"
          label="零售价"
          min-width="150">
        </el-table-column>
        <el-table-column min-width="220">
          <template slot="header">
            <div class="top">
              <div class="left">
                <el-input
                  v-model="search"
                  size="medium"
                  placeholder="商品名称关键字搜索" />
              </div>
            </div>
          </template>
          <template slot-scope="scope">
            <el-button @click="editProduct(scope.row.id)" type="warning" size="small">降价</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="设置商品特价"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="close()">
      <el-form :model="editForm" :label-width="'100px'" size="mini">
        <el-form-item label="名称">
          <el-input v-model="editForm.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="型号">
          <el-input v-model="editForm.type" type="textarea" :rows="2" placeholder="请输入商品类型"></el-input>
        </el-form-item>
        <el-form-item label="原价">
          <el-col :span="11">
            <el-input :disabled="true" v-model="editForm.retailPrice" type="number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="现价">
          <el-col :span="11">
            <el-input v-model="editForm.retailPrice" type="number" placeholder="请输入商品现价"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleEdit(false)">取 消</el-button>
        <el-button type="primary" @click="handleEdit(true)">确 定</el-button>
      </div>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  getAllCommodityClassification,
  getAllCommodity,
  updateCommodity
} from "@/network/commodity";

export default {
  components: {
    Layout,
    Title
  },
  data() {
    return {
      commodityList: [],
      search: "",
      classificationList: [],
      addDialogVisible: false,
      addForm: {
        categoryId: "暂未选择",
        name: "",
        type: "",
        purchasePrice: "",
        retailPrice: ""
      },
      editDialogVisible: false,
      editForm: {}
    };
  },
  mounted() {
    this.getAll();
    getAllCommodityClassification({}).then(_res => {
      this.classificationList = _res.result;
      var tempList = this.classificationList.map((item, index) => {
        return Object.assign({}, { id: item.id, name: item.name });
      });
      this.classificationList = tempList;
    }).catch(err => {
      this.$message({
        type: "error",
        message: "获取商品分类列表失败!" + err
      });
    });
  },
  methods: {
    getAll() {
      getAllCommodity({}).then(_res => {
        this.commodityList = _res.result;
        this.commodityList.forEach((item) => {
          if (item.recentPp == null) {
            item.recentPp = "暂无";
          }
          if (item.recentRp == null) {
            item.recentRp = "暂无";
          }
        });
      }).catch(err => {
        this.$message({
          type: "error",
          message: "获取商品列表失败!" + err
        });
      });
    },
    addProduct() {
      this.addDialogVisible = true;
    },
    editProduct(id) {
      this.editForm = this.commodityList.filter(x => x.id === id)[0];
      if (this.editForm.recentPp === "暂无") {
        this.editForm.recentPp = null;
      }
      if (this.editForm.recentRp === "暂无") {
        this.editForm.recentRp = null;
      }
      this.editDialogVisible = true;
    },
    handleEdit(type) {
      if (type === false) {
        this.editDialogVisible = false;
        this.editForm = {};
      } else if (type === true) {
        updateCommodity(this.editForm).then(_res => {
          if (_res.code === "B0003") {
            this.$message({
              type: "error",
              message: _res.msg
            });
          } else {
            this.$message({
              type: "success",
              message: "修改成功！"
            });
            this.editForm = {};
            this.editDialogVisible = false;
            this.getAll();
          }
        });
      }
    },
    close() {
      this.addForm = {};
      this.editForm = {};
    }
  }
};
</script>

<style scoped>
.commodity-body {
  width: 100%;
  margin: 0 auto;
}

.top {
  display: flex;
}

.left {
  float: left;
  width: 80%;
}

.right {
  flex: 1;
}
</style>
