<template>
  <div>

    <el-table :data="tableData" style="width: 100%" row-key="id" default-expand-all>
      <el-table-column prop="id" label="账号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="分类名">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间">
      </el-table-column>
      <el-table-column prop="updatetime" label="更新时间">
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <!--          scope.row就是当前行数据-->
          <el-button type="warning" icon="el-icon-edit"  @click="$router.push('/EditCategory?id=' + scope.row.id)">修改
          </el-button>
          <el-popconfirm

              icon="el-icon-info"
              icon-color="red"
              title="您确认要删除该用户吗？"
              @confirm="del(scope.row.id)"
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
      </el-pagination>`
    </div>
  </div>
</template>

<script>

import request from "../../utils/request";

export default {
  name:'CategoryList',

  data() {
    return{
      tableData: [],
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
        id: '',
        name: '',
        remark: ''


      }
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      // fetch('http://localhost:9090/category/list').then(res => res.json()).then(res => {
      //   console.log(res)
      //   this.tableData = res
      request.get('/category/page' , {
        params: this.params
      } ).then(res => {

        if(res.code === '200'){
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })

    },
    handleCurrentChange(pageNum){
      //分页按钮触发份分页
      this.params.pageNum = pageNum
      this.load()
    },
    del(accountId){
      request.delete("/category/delete/" + accountId).then(res => {
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