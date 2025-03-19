<template>
    <div calss="container">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="phone" label="账户" width="180">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="180">
            </el-table-column>
          <el-table-column prop="username" label="用户名" width="180">
          </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>

          <el-table-column prop="password" label="密码">
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

    import request from "../utils/request";

    export default {
      data() {
        return{
          tableData: [],
          total: 0,
          params: {
              pageNum: 1,
              pageSize: 10,
              name: '',
              phone: ''
          }
        }
      },
      created() {
        this.load()
      },
      methods:{
        load(){
          // fetch('http://localhost:9090/user/list').then(res => res.json()).then(res => {
          //   console.log(res)
          //   this.tableData = res
          request.get('/user/page' , {
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
        }


        }


    }
  </script>

