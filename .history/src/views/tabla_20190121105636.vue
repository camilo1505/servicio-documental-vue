
<template>
    <xt-table
        :data="data"
        type="edit"
        :rules="rules"
        @success="handleSuccess"
        @delete="handleDelete"
        ref="data">
          <xt-table-column
          prop="name"
          label="姓名"
          propType="input">
          </xt-table-column>
          <xt-table-column
          prop="sex"
          propType="select"
          label="性别"
          :options="selectOptions"
          :props="{label:'name',value:'id',labelProp:'productName'}"
          filterable
          ></xt-table-column>
          <xt-table-column prop="sex"
            label="性别"
            :edit="true"
            propType="input"
            :options="selectOptions">
            <template slot-scope="scope" type="expand">
              <el-input v-model="scope.row.sex" size="mini"></el-input>
              <!--<el-input ></el-input>-->
            </template>
          </xt-table-column>
          <xt-table-column label="操作" type="operate">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handlePrint(scope.row)">打印</el-button>
              </template>
            </xt-table-column>
      </xt-table>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data () {
    return {
      msg: '表格展示',
      data:[{id:1,name:'苏三',sex:'男',birth:'2003-01-05',hobby:'女',age:21},{id:2,name:'李四',sex:'男',birth:'2010-06-05',hobby:'唱歌',age:11}],
      selectOptions:[{name:'男',value:'男'},{name:'女',value:'女'}]
    }
  },
  methods:{
    handleAdd(callback){
      let item={name:'',sex:'',birth:'',hobby:'',age:0,isEdit:true}
      this.data.push(item);
      callback(item);
    },
    handleClick(row){
      console.log(row)
    },
    handleSuccess(row,callback){
        callback(true)
    },
    handleDelete(row,callback){
      callback(true)
    },
    handlePrint(row) {
      console.log(row, "打印");
    },
  }
</script>