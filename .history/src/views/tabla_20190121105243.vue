<template>
  <div class="container">
    <div class="card">
      <h3 class="card-header text-center font-weight-bold text-uppercase py-4">Editable table</h3>
      <div class="card-body">
        <mdb-table-editable
          :columns="columns"
          :rows="rows"
          class="text-center"
          striped
          bordered/>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbTableEditable } from 'mdbvue';

export default {
  name: 'TableEditablePage',
  components: {
    mdbTableEditable
  },
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Position',
          field: 'position',
        },
        {
          label: 'Office',
          field: 'office',
        },
        {
          label: 'Age',
          field: 'age',
        },
        {
          label: 'Start date',
          field: 'date',
          sort: 'asc'
        },
        {
          label: 'Salary',
          field: 'salary',
        }
      ],
      rows: [
        {
          name: 'Tiger Nixon',
          position: 'System Architect',
          office: 'Edinburgh',
          age: '61',
          date: '2011/04/25',
          salary: '$320'
        },
        {
          name: 'Garrett Winters',
          position: 'Accountant',
          office: 'Tokyo',
          age: '63',
          date: '2011/07/25',
          salary: '$170'
        },
        {
          name: 'Ashton Cox',
          position: 'Junior Technical Author',
          office: 'San Francisco',
          age: '66',
          date: '2009/01/12',
          salary: '$86'
        },
        {
          name: 'Cedric Kelly',
          position: 'Senior Javascript Developer',
          office: 'Edinburgh',
          age: '22',
          date: '2012/03/29',
          salary: '$433'
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>