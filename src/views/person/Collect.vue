<template>
  <div>
    <h2>我的收藏</h2>
    <el-table :data="tableData" style="width: 100%"  default-expand-all>
      <el-table-column prop="bid" label="书号" width="180">
      </el-table-column>
      <el-table-column prop="cover" label="图片" width="180">
        <template v-slot="scope">
          <el-image :src="scope.row.cover" :preview-src-list="[scope.row.cover]">

          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注">

        <el-table-column prop="isbn" label="标识码" ></el-table-column>
        <el-table-column prop="name" label="书名" ></el-table-column>
        <el-table-column prop="description" label="简介" width="500px"></el-table-column>
        <el-table-column  prop="publishdate" label="出版日期" ></el-table-column>
        <el-table-column prop="publisher" label="出版社" ></el-table-column>
        <el-table-column prop="author" label="作者" ></el-table-column>
        <el-table-column prop="category" label="分类" ></el-table-column>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <!--          scope.row就是当前行数据-->
<!--          <el-button type="warning" icon="el-icon-edit"  @click="$router.push('/EditBook?id=' + scope.row.id)">修改-->
<!--          </el-button>-->
          <el-popconfirm

              icon="el-icon-info"
              icon-color="red"
              title="您确认将该书籍从收藏中删除吗？"
              @confirm="del(scope.row.cid)"
          >
            <el-button type="danger" icon="el-icon-delete" slot="reference">删除</el-button>
          </el-popconfirm>

        </template>
      </el-table-column>

    </el-table>

    <div style="margin-top: 20px">
      <el-pagination
          background
          :current-page="params.pageNum"
          :page-size="params.pageSize"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import request from "../../utils/request";
import Cookies from "js-cookie";

export default {
  name:'Collect',

  data() {
    return{
      admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {},
      tableData: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
        uid:'',



      }
    }
  },
  created() {


    // console.log(this.admin.accountId)
     this.params.uid=this.admin.accountId;
     console.log(this.params)
     this.load();
  },

  methods:{
    load(){

      // fetch('http://localhost:9090/collect/list').then(res => res.json()).then(res => {
      //   console.log(res)
      //   this.tableData = res
      request.get('/collect/page' ,{
            params: this.params
      }

       ).then(res => {

        if(res.code === '200'){
          this.tableData = res.data.list
          console.log(this.tableData);
          this.total = res.data.total
        }
      })

    },

    handleCurrentChange(pageNum){
      //分页按钮触发份分页
      this.params.pageNum = pageNum
      this.load()
    },
    del(cid){
      request.delete("/collect/delete/" + cid).then(res => {
        if(res.code === '200') {
          this.$notify.success("成功删除");
          this.load();
        }else{
          this.$notify.error(res.msg);
        }
      })

    }


  }


}
</script>

<style scoped>

</style>