
import VueRouter from 'vue-router'


export default  function (argument) {
    // body...

  const Foo = { template: '<div>foo</div>' }
  const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
  const Bar = { template: '<div>bar</div>' }

  const router = new VueRouter({
    routes // short for routes: routes
  })
}



