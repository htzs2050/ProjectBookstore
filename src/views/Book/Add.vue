<template>
    <div style="padding: 0 15px;width: 900px;height: 600px">

      <div  style="margin-left: 50px;"><h2>图书添加</h2></div>
      <el-form :inline="true" :model="form" :rules="rules" ref="ruleForm"  label-width="90px" style="width:1000px;height: 500px">
        <el-form-item label="图书ID">
          <el-input v-model="form.id" placeholder="自动分配" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="图书名">
          <el-input v-model="form.name" placeholder="请输入需要添加的书名"></el-input>
        </el-form-item>
        <el-form-item label="ISBN">
          <el-input v-model="form.isbn" placeholder="请输入ISBN"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author" placeholder="请输入作者"></el-input>
        </el-form-item>
        <el-form-item  label="出版日期">
          <el-date-picker value-format="yyyy-MM-dd" type="date" v-model="form.publishdate"></el-date-picker>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="form.publisher"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-cascader
              :props="{ value: 'name', label: 'name'}"
              v-model="form.categories"
              :options="categories"
              @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea"  v-model="form.description" :autosize="{ minRows: 3, maxRows: 10}" ></el-input>
        </el-form-item>
        <el-form-item label="封面链接">
            <el-input v-model="form.cover"></el-input>
        </el-form-item>



        <!--        <el-form-item label="邮箱"  prop="email">-->
<!--          <el-input v-model="form.phone" placeholder="请输入邮箱" ></el-input>-->
<!--        </el-form-item>-->


      </el-form>
      <div style="text-align: center;margin-top: 20px">
        <el-button type="primary" @click="save" size="medium">提交</el-button>


      </div>
    </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name:'AddBook',
  data() {
    // const checkPhone = (rule, value, callback) => {
    //       if (!value) {
    //         return callback(new Error('手机号不能为空'));
    //       }
    //
    //         if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
    //           callback(new Error('请输入合法的手机号嗷'));
    //         }
    //         callback()
    //
    // };
    return {
      form: {


      },
      categories:[],
      rules: {

        isbn: [
          { required: true, message: 'ISBN由10位数字组成', trigger: 'blur' },
          {min:10 , max: 10,  message: 'ISBN由10位数字组成', trigger: 'blur'}
        ],
        // phone: [
        //   {validator: checkPhone , trigger:'blur'}
        // ],
      }
    }

  },
  created() {
    request.get('/category/tree').then(
        res=>{
          this.categories = res.data
        }
    )
  },
  methods: {

    save() {
      this.$refs['ruleForm'].validate((valid) => {
        if(valid) {
          request.post('/book/save', this.form).then(res => {
            if (res.code === '200') {
              // 通过是否等于200来判断本次请求是否成功
              //使用三等号来判断是否等于
              this.$notify.success('新增成功');
               //this.form = {};
               // this.$refs['ruleForm'].resetFields();
              this.$router.push("/bookList");
            } else {
            //  this.$notify.error('插入失败');
              this.$notify.error(res.msg)
            }
          })
        }
      });



    },
    handleCurrentChange(val){
      console.log(val);
    },

  }

}

</script>

