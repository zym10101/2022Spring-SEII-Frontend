<template>
  <Layout>
    <Title title="查看销售明细"></Title>
    <div>
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
      <br><br>
      <span>   请选择商品名：   </span>
      <el-select v-model="commodity" style="width: 150px">
        <el-option value="全部商品">全部商品</el-option>
        <el-option
            v-for="item in commodityList"
            :key="item.name"
            :label="item.name"
            :value="item.name">
        </el-option>
      </el-select>
      <br><br>
      <span>   请选择客户名：   </span>
      <el-select v-model="customer" style="width: 150px">
        <el-option
            v-for="item in customers"
            :key="item.name"
            :label="item.name"
            :value="item.name">
        </el-option>
      </el-select>
      <br><br>
      <span>   请输入业务员：   </span>
      <el-input type="text" v-model="operator" style="width: 150px"></el-input>
      <br><br>
      <el-button :disabled="disable" type="primary" size="medium" @click="getData()">查看筛选结果</el-button>
      <br><br>
      <div>
        <el-table
            :data="saleDetails"
            stripe
            style="width: 100%"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}">
          <el-table-column
              prop="type"
              label="类型"
              width="100"
              :filters="[{ text: '销售', value: 'sale' }, { text: '销售退货', value: 'sale_return' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                  :type="scope.row.type === 'sale' ? 'primary' : 'success'"
                  disable-transitions>{{ saleTransform(scope.row.type) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
              prop="sheetId"
              label="单据ID"
              width="250">
          </el-table-column>
          <el-table-column
              label="创建时间"
              width="200">
            <template slot-scope="scope">
              {{ formatDate(scope.row.createTime) }}
            </template>
          </el-table-column>
          <el-table-column
              prop="productName"
              label="商品名"
              width="100">
          </el-table-column>
          <el-table-column
              prop="quantity"
              label="数量"
              width="100">
          </el-table-column>
          <el-table-column
              prop="unitPrice"
              label="单价"
              width="100">
          </el-table-column>
          <el-table-column
              prop="totalPrice"
              label="总价"
              width="100">
          </el-table-column>
        </el-table>
        <div v-if="saleDetails.length!==0">
          <download-excel
              class="export-excel-wrapper"
              :data="saleDetails"
              :fields="field"
              name="销售明细单据.xls">
            <el-button type="primary" size="medium" style="margin-top: 16px" @click="remind">导出excel</el-button>
          </download-excel>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {formatDate} from "@/common/utils";
import {getSaleDetailByFilter} from "@/network/sale";
import {getAllCommodity} from "@/network/commodity";
import {getAllCustomer} from "@/network/purchase";


export default {
  components: {
    Layout,
    Title
  },
  data() {
    return {
      disable: false,      //disable留作后面优化用，当有筛选条件输入为空时启用
      beginDate: "",
      endDate: "",
      commodity: "",
      customer: "",
      operator: "",
      status: "",
      commodityList: [],
      customers: [],
      saleDetails: [],
      field: {
        "类型": "type",
        "单据id": "sheetId",
        "商品名称": "productName",
        "数量": "quantity",
        "单价": "unitPrice",
        "总价": "totalPrice",
        "创建时间": "createTime"
      }

    };
  },
  mounted() {
    getAllCommodity({}).then(_res => {
      let res = _res.result;
      res.forEach(item => this.commodityList.push({name: item.name}));
      //this.commodityList=this.commodityList.concat(_res.result);
    });

    getAllCustomer({params: {type: "SELLER"}}).then(_res => {
      this.customers = _res.result;
    });
  },

  methods: {
    /**
     * 后端获取筛选条件
     */
    getData() {
      this.saleDetails=[];
      const config = {
        params: {
          beginDateStr: this.beginDate,
          endDateStr: this.endDate,
          productName: this.commodity,
          customer: this.customer,
          salesman: this.operator
        }
      };
      if (this.commodity === "全部商品") {
        this.commodityList.forEach(item => {
          setTimeout(() => {
            config.params.productName = item.name;
            getSaleDetailByFilter(config).then(_res => {
              this.saleDetails = this.saleDetails.concat(_res.result);
            });
          }, 100);
        })
      } else {
        getSaleDetailByFilter(config).then(_res => {
          this.saleDetails = _res.result;
        });
      }
      clearTimeout(this.timer);      //延时器，否则既会弹出提示又会显示
      this.timer =setTimeout(()=>{
        if(this.saleDetails.length===0){
          this.$message.warning("没有查找到相关单据！")
        }
      },500)
    },
    filterTag(value, row) {
      return row.type === value;
    },
    formatDate,
    saleTransform(type) {
      return type === "sale" ? "销售" : "销售退货";
    },
    remind(){
      this.$message.success("导出成功");   //导出提示
    }

  }
};
</script>

<style scoped lang="scss">
.mt15 {
  margin-top: 15px;
}
</style>
