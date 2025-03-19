<template>
    <div style="padding: 0 15px;width: 50%">
<!--      会员添加-->
      <h2>图书分类编辑</h2>
      <el-form :inline="true" :model="form"  label-width="90px">
        <el-form-item label="分类id">
          <el-input v-model="form.id" placeholder="请输入需要添加的电话号码" disabled></el-input>
        </el-form-item>
        <el-form-item label="类名">
          <el-input v-model="form.name" placeholder="请输入需要添加的用户名"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" placeholder="请输入需要添加账号的密码"></el-input>
        </el-form-item>

      </el-form>
      <div style="text-align: center;margin-top: 20px">
        <el-button type="primary" @click="save" size="medium">提交</el-button>


      </div>
    </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name:'EditCategory',
  data() {
    return {
      form: {

      }
    }

  },
  created() {
    const  id = this.$route.query.id
    request.get("/category/" + id).then(res => {
        this.form = res.data


    })

  },
  methods: {

    save() {
      request.put('/category/update',this.form).then(res =>{
        if(res.code === '200'){
          // 通过是否等于200来判断本次请求是否成功
          //使用三等号来判断是否等于
          this.$notify.success('更新成功');
          this.$router.push("/CategoryList");
        }
        else{
          this.$notify.error('插入失败');
        }
      })
    }

  }

}

</script>

