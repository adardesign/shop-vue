<template>
  <div>
    <h3>Products</h3>
    <div>
      <label>Filter by price:
          {{searchFilter}} - {{priceHigh}}
          <input type="range" v-bind:value="priceLow"  v-bind:min="priceLow" v-bind:max="priceHigh"  v-model="searchFilter" placeholder="edit me">
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
      searchFilter : 0
    }
  },
  computed: mapState({
    //productRows: state => chunk(state.products.all, 3)
    productRows : function(state){
      //console.log(this.$data.searchFilter)
      let products = state.products.all.filter( (e) => e.price > this.$data.searchFilter)

      return chunk(products, 3)
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
