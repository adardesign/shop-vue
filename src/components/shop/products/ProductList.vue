<template>
  <div>
    <h3>Products</h3>

    <h4>Filters:</h4>
    <div>
      <label>
        Filter by category:
          <select v-model="categoryFilter">
            <option value="">All</option>
            <option v-for="option in categories" v-bind:value="option">{{option}}</option>
          </select>
      </label>
    </div>
    <div>
      <label>
        Filter by price:
          {{searchFilter || priceLow}} - {{priceHigh}}
          <input type="range" step="20" v-bind:value="priceLow" v-bind:min="priceLow" v-bind:max="priceHigh"  v-model="searchFilter" placeholder="edit me">
      </label>
    </div>

    <div class="row" v-for="row in productRows">
      <div class="col-sm-4" v-for="product in row">
        <product
          :product="product"
          track-by="id">
        </product>
      </div>
    </div>
  </div>
</template>

<script>
import Product from './Product'
import { mapActions, mapState } from 'vuex'
import chunk from 'chunk'

export default {
  data(){
    return {
      searchFilter : 0,
      categoryFilter:""
    }
  },
  computed: mapState({
    //productRows: state => chunk(state.products.all, 3)
    productRows : function(state){
      //console.log(this.$data.searchFilter)
      let products = state.products.all.filter((e) => this.$data.categoryFilter ? e.category == this.$data.categoryFilter : true && e.price > this.$data.searchFilter)

      return chunk(products, 3)
    },
    categories : function(state){
      return new Set(state.products.all.map( o => o.category)).toJSON();
    },
    priceHigh:function(state){
      if(!state.products.all.length) return 0;
      return Math.max.apply(Math,state.products.all.map(function(o){return o.price;}))
    },
    priceLow:function(state){
      if(!state.products.all.length) return 0;
      return Math.min.apply(Math,state.products.all.map(function(o){return o.price;}))

    }

  }),
  methods: mapActions([
    'getProducts'
  ]),
  components: { Product },
  created () {
    this.getProducts()
  }
}
</script>
