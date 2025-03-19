<template>
  <div>
    <div style=" margin: auto;
    width:85%;">
      <div style="margin-bottom: 25px">
        <el-input style="width: 240px;" placeholder="搜索书名" v-model="params.name"></el-input>

        <el-input style="width: 240px;" placeholder="搜索标识码" v-model="params.isbn"></el-input>
        <el-input style="width: 240px;" placeholder="搜索分类" v-model="params.category"></el-input>
        <el-button style="margin-left: 5px;" type="primary" @click="load"><i class="el-icon-search"></i>搜索</el-button>
        <el-button style="margin-left: 5px;" type="warning" @click="reset"><i class="el-icon-refresh"></i> 重置</el-button>
      </div>
    </div>
    <div >

      <div style="
    float:left;
  margin-left: 60px;
  margin-top: 20px;width: 100%;height: 100%">
        <el-row  style="margin:0  10px;width:100%;max-height: 1000px;min-height: 350px" >
          <el-col  class="el-col-4" :span="4" v-for="item   in tableData" :key="item.id"   style="margin: 5px 5px;width: 210px;" :model="tableData" >
            <el-card style="height: 360px; width: 210px; ">
              <div style="height: 285px;width: 210px;"><img  :src="item.cover"  class="image"></div>
              <div class="cardtextbotton">
                <div class="tx">
                  <div style="display: block">{{item.name}}</div>


                </div>

                <div class="cardbotton" >

                    <el-button size="mini" type="danger" class="button">{{item.price}}￥购买</el-button>
                    <el-button size="mini" type="danger" plain icon="el-icon-shopping-cart-1"></el-button>
<!--                    <el-button size="mini" type="warning" @click="save(tableData.scope.row.id,admin.id)" plain icon="el-icon-star-off"></el-button>-->
                    <el-button size="mini"   type="warning" @click="addStar(item.id,admin.accountId)" plain icon="el-icon-star-off"></el-button>



                </div>

              </div>


            </el-card>
          </el-col>

        </el-row>
        <div style="margin-top: 20px;margin-left: 500px">
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

    </div>




  </div>
</template>

<script>
import request from "@/utils/request";
import Cookies from "js-cookie";

export default {
  name: "Cardbook",
  data() {


    return{
       admin: Cookies.get('admin') ? JSON.parse(Cookies.get('admin')) : {},
      // isCollect: false,
       tableData: [],
       ub: {
        uid:'1',
        bid:'2'
       },
      total: 0,
      params: {
        pageNum: 1,
        pageSize: 12,
        id: '',
        isbn:'',
        name: '',
        category:'',
        createtime:'',
        updatetime:'',
        price:''


      }
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      // fetch('http://localhost:9090/Book/list').then(res => res.json()).then(res => {
      //   console.log(res)
      //   this.tableData = res
       request.get('/book/page' , {
        params: this.params

      } ).then(res => {

        if(res.code === '200'){
          // tablecard:res.data.list
          this.tableData = res.data.list
          this.total = res.data.total
         // console.log(this.tableData);


        }
      })

    },
    addStar(bid,uid) {
        this.ub.bid = bid;
        this.ub.uid = uid;
      // console.log(this.ub);

          request.post('/collect/save', this.ub).then(res => {
            if (res.code === '200') {
              // 通过是否等于200来判断本次请求是否成功
              //使用三等号来判断是否等于
              this.$notify.success('收藏成功');
              //this.form = {};
              // this.$refs['ruleForm'].resetFields();
             // this.$router.push("/CategoryList");
            } else {


              this.$notify.error(res.msg)
            }
          })





    },
    reset() {
      this.params = {
        pageNum: 1,
        pageSize: 12,
        name: '',
        id: '',
        isbn:'',
        category:'',
        price:''
      }
      this.load()
    },
    handleCurrentChange(pageNum){
      //分页按钮触发份分页
      this.params.pageNum = pageNum
      this.load()
    },
    // del(id){
    //   request.delete("/book/delete/" + id).then(res => {
    //     if(res.code === '200') {
    //       this.$notify.success("成功删除");
    //       this.load();
    //     }else{
    //       this.$notify.error(res.msg);
    //     }
    //   })
    //
    // }




  }





}


</script>

<style scoped>
.cardbook{
  display: block;
  float:left;
  margin-left: 10px;
  margin-top: 20px;

}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  margin-bottom: 0px;
}

.button {
  /*padding: 0;*/
  margin-left:2px;
}

.image {
  margin: 0 auto;
  display: block;
  /*height: 300px;*/
  /*width: 210px;*/
  height: 285px;
  width: 100%;

}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
.el-col-4 {
  width: 20%;
  height: 360px;
}
.cardtextbotton {
   height: 70px;
   width: 100%;
   margin: 0 0;
   padding: 0;
}
.tx {
    margin-bottom: 10px;
    height: 40px;
   margin-bottom: 10px;

}


.cardbotton {
  height: 20px;
  margin-top: -3px;

}
</style>