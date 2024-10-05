<template>
    <div>
      <h1>Lista de Datos</h1>
      <ul>
        <li v-for="item in items" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: []
      };
    },
    mounted() {
      this.$axios.get('/api')
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  </script>
  