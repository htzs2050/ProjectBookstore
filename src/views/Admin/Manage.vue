<template>
    <div style="padding: 0 15px;width: 50%">
<!--      会员更改-->
      <h2>管理员编辑</h2>
      <el-form :inline="true" :model="form"  label-width="90px">
        <el-form-item label="用户id(电话）">
          <el-input v-model="form.accountId" placeholder="请输入需要更改的电话号码" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入需要更改的用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入需要更改账号的密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入需要更改账号的邮箱"></el-input>
        </el-form-item>
<!--        <el-form-item label="手机">-->
<!--          <el-input v-model="form.phone" placeholder="请输入用户号码"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="号码">
          <el-input v-model="form.phone" placeholder="请输入用户号码"></el-input>
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
  name:'ManageAdmin',
  data() {
    return {
      form: {

      }
    }

  },
  created() {
    const  accountId = this.$route.query.accountId
    request.get("/admin/" + accountId).then(res => {
        this.form = res.data


    })

  },
  methods: {

    save() {
      request.put('/admin/update',this.form).then(res =>{
        if(res.code === '200'){
          // 通过是否等于200来判断本次请求是否成功
          //使用三等号来判断是否等于
          this.$notify.success('更新成功');
          this.$router.push("/AdminList");
        }
        else{
          this.$notify.error('插入失败');
        }
      })
    }

  }

}

</script>

