
<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
    >
      <template slot="items" slot-scope="props">
        <td>
          <v-edit-dialog
            :return-value.sync="props.item.name"
            lazy
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          > {{ props.item.name }}
            <v-text-field
              slot="input"
              v-model="props.item.name"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">
          <v-edit-dialog
            :return-value.sync="props.item.iron"
            large
            lazy
            persistent
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            <div>{{ props.item.iron }}</div>
            <div slot="input" class="mt-3 title">Update Iron</div>
            <v-text-field
              slot="input"
              v-model="props.item.iron"
              :rules="[max25chars]"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </v-edit-dialog>
        </td>
      </template>
    </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: 'tabla',
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
}
</script>