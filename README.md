## 创建项目
```
vue create 项目名称
```
### 配置脚手架项目
```
浏览器自动打开
3.1在package.json文件中
"scripts": {
    "serve": "vue-cli-service serve --open", (需要在node_modules/@vue/cli-service/lib/commands/serve.js改一下ip地址)
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
},

3.2关闭eslint校验工具
创建vue.config.js文件：需要对外暴露
module.exports = {
   lintOnSave:false,
}
```

## 安装路由
```
npm install vue-router 
注意：vue2需要下载vue-router@3,vue3需要下载vue-router@4,

```
### 路由分析
```
路由的一个分析
确定项目结构顺序:上中下 -----只有中间部分的V在发生变化，中间部分应该使用的是路由组件
2个非路由组件|四个路由组件
两个非路由组件：Header 、Footer
路由组件:Home、Search、Login（没有底部的Footer组件，带有二维码的）、Register（没有底部的Footer组件，带二维码的）
```

components文件夹:一般放置非路由组件（或者项目共用的组件）
路由组件一般放在：pages/view文件夹下


### 创建非路由组件
非路由组件使用分为几步:
```
第一步：定义
第二步：引入
第三步：注册
第四步:使用
```

项目采用的less样式,浏览器不识别less语法，需要一些loader进行处理，把less语法转换为CSS语法
```
1.安装less 和 less-loader@7
2:需要在style标签的身上加上lang="less",不添加样式不生效
```

### 路由的跳转
```
1.router-link  必须要有to，写上要跳转的路径
2.编程式跳转：this.$router.push() 或者 this.$router.replace() 里面传的是一个配置对象
```
```
面试题：v-show与v-if区别?
v-show:通过样式display控制
v-if：通过元素上树与下树进行操作
面试题:开发项目的时候，优化手段有哪些?
1:v-show|v-if
2:按需加载
8)首页|搜索底部是有Footer组件，而登录注册是没有Footer组件
Footer组件显示|隐藏，选择v-show|v-if
路由元信息 ：在路由配置文件中添加meta属性，通过布尔值来控制是否显示

```
### params传参和query传参
```
params传参：路由需要占位，程序就崩了，属于URL当中一部分
query传参：路由不需要传参，
路由传递参数先关面试题
     1:路由传递参数（对象写法）path是否可以结合params参数一起使用?
     不可以：路由传参的时候，可以是name和path形式，但是需要注意的是，path这种写法不能与params参数一起使用
     2:如何指定params参数可传可不传? 
     如果路由要求传递params参数，你没有传，url会出现问题
     在配置路由的时候，在占位的后面加上一个问号，就表示params参数可传可不传
     3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
     如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题，使用undefind解决
     4: 路由组件能不能传递props数据?
     可以，
```

### 编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
```
注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
这种异常，对于程序没有任何影响的。
为什么会出现这种现象:
由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,
第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调,可以捕获到当前的错误，可以解决。
 this.$router.push(
        {
          name: "search",
          // path: "/search",
          params: {
            keyword: this.keyword,
          },
          query: {
            k: this.keyword.toUpperCase(),
          },
        },
        () => {},
        () => {}
      );
第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；

第二种解决方案：
this是当前的组件实例对象，当我们在入口文件注册路由VueRouter的时候，会给组件实例添加两个属性，一个$route和$router。
$router:这个属性，属性值是VueRouter的一个实例对象，他的身上并没有push方法，push方法是VueRouter原型对象上的一个方法,它是借用的VueRouter原型上的push方法

$router是通过new VueRouter 出来的
function VueRouter(){

}
push方法是VueRouter原型对象上的一个方法
VueRouter.prototype.push = function({
    //函数的this是VueRouter的一个实例对象
})

//重写push和replace方法，在我们的router/index.js下
//重写push和replace方法
//先将VueRouter原型上的push和replace方法备份一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写
//第一个参数，告诉原来push方法你要往哪里跳转（传递那些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
//call和apply的区别
//相同点：都可以调用函数一次，都可以改变函数的this
//不同点：传递多个参数时，call传递参数用逗号隔开，apply传递一个数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
这样就可以根治掉这个问题了
```

### 将Home组件的静态组件拆分
```
--先把静态页面完成
--拆分出静态组件
--获取服务器的数据进行展示
--动态业务
```
### Home模块三级联动组件完成
```
TypeNav全局组件（在Home，Search，Detail都使用）

Home剩下的静态组件拆分：HTML+CSS+图片资源
```


### axios的二次封装
```
XMLHttpRequest ,fetch,jq,axios
为什么需要进行二次封装axios
请求拦截器，响应拦截器，请求拦截器可以在发送请求之前处理一些业务，响应拦截器在当服务器数据返回后，可以处理一些事情

在项目中经常有API文件夹用来存放axios
接口当中，路径都带有api
baseURL："/api""
```

### 接口统一管理
```
跨域问题：协议，域名，端口号不同请求，称之为跨域
解决方案：传统jsonp node中的cros vue中的代理
```

### nprogress模块实现进度条功能
```
安装 npm install  nprogress
引入nprogress.css样式
nprogress.start()  进度条开始
nprogress.done()   进度条结束
可以才nprogress.css中修改样式
```

### vuex
```
vuex：在vue中实现集中状态数据管理的一个vue插件，对vue应用中多个组件的共享数据进行集中式的管理，也是一种组件的通信方式，且适用于任意组件间的通信
何时使用：多个组件需要共享数据时

```


### 完成三级联动展示数据的业务
```
组件加载完成通知vuex发送请求，拿到数据
存储到home仓库下的state中
在组件中通过mapstateAPI获取数据
通过v-for将数据展示到页面
```

### 完成三级联动移入移出时的背景色
```
添加移入移出事件
通过判断currentIndex是否等于当前节点的下标值来决定是否给当前节点加带有背景色的class类名
移出事件加给最外面的父元素，因为这样就不存在只在当前节点上才能显示背景色
```

### 防抖和节流
```
正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间短，而且回调函数内部有计算，那么很可能出现浏览器卡顿）
节流：在规定的间隔时间范围内不会重复执行回调，只有大于这个时间间隔才会触发回调，把频繁触发变成少量触发
防抖：前面的所有触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次


完成三级联动节流的操作
引入lodash
运用lodash里面的throttle这个方法
```
### 优化项目。
```
v-if|v-show
按需加载
函数防抖与节流
按需加载:对于loadsh插件，它里面封装的函数功能很多
import _ from lodash 相当于把全部功能引入进来，但是我们只是需要节流。
```


### 三级联动组件的路由跳转与传递参数
```
三级联动用户可以点击的：一级分类，二级分类，三级分类，当你点击的时候
Home模块跳转到Search模块，一级会把用户选中的产品（产品的名字，产品的id），在路由跳转的时候进行传递

路由的跳转：编程式跳转，router-link

如果使用声明式导航router-link可以实现路由的跳转和传递参数
但是需要注意出现卡顿现象
router-link是一个组件，当服务器数据返回之后，循环出很多的router-link一个组件，很耗内存，因此出现了卡顿现象

跳转方式：编程式导航+事件委托
给他们的父元素添加事件，给a标签添加自定义属性
获取触发事件的子节点，判断他们身上是否有已定义的自定义属性
然后进行参数准备和跳转
```
### search组件中三级联动的显示与隐藏
```
通过v-show
当组件挂载完毕之后，判断当前路径是否是home，如果不是，将他隐藏
当鼠标移入时显示
当鼠标移除时判断当前组件是否是home，如果不是将他隐藏

动画效果
transtion包裹要实现动画的结构
name为slot
- 元素进入的样式：
  1. slot-enter：进入的起点
  2. slot-enter-active：进入过程中
  3. slot-enter-to：进入的终点
- 元素离开的样式：
  1. slot-leave：离开的起点
  2. slot-leave-active：离开过程中
  3. slot-leave-to：离开的终点

```

### 关于组件请求数据
```
如果将请求数据放到app.vue身上只会发一次请求，放到自己的组件上每次组件重新挂载就都会发请求
```

### 合并数据
```
在跳转页面之前，判断本身自带是否有参数，有的话就携带上进行跳转
```

### 三级联动业务:
```

3.1前面基础课程当中v-for很少使用index，以后在写项目的时候，index索引值切记加上
3.2防抖与节流【面试经常出现】
3.3vuex可以模块式开发
vuex经常用的套路是state、mutations、actions、getters、modules
```


### mock生成随机数据 ，拦截ajax请求
```
webpack默认对外暴露的：图片，json格式数据
1:mockjs模块实现模拟数据
---对于将来实际工作的时候，后台没有准备好接口（服务器没有开发出来），前端工程师可以利用mock技术，
实现模拟数据，将来项目上线（后台真实接口）写好了，替换为真实接口即可。
---对于咱们而言，后台老师确实没有给首页中轮播这部分的接口，mock数据，你可以当中一个真实接口就行了。
上线的时候，对于mock数据对于项目而言没有任何影响。

对于项目而言:真实的接口 /api/xxxx    模拟的数据/mock/xxxx
模拟数据JSON：没有空格，最好使用格式化插件进行格式化。

使用步骤：
安装 npm install mockjs
在项目当前的src文件夹下创建mock文件夹
准备好对应的json数据，图片资源放到public文件夹下，因为public文件夹下的资源打包的时候会原封不动的打包
进行配置
在main.js中引入执行一次
```

### swiper的基本使用
```
安装 npm install swiper@5
引入 相应的css和js  import 'swiper/css/swiper.css'  引入样式不需要from那样引  import Swiper from 'swiper'
界面中的结构必须有
new swiper实例 各种配置项可以看官网
```

### 在执行swiper脚本控制轮播图时遇到的问题
```

初始化swiper实例之前，页面中的节点（结构）务必要有
mounted-->组件挂载完毕
动态效果为什么没有出来？
Swiper需要获取到轮播图的节点DOM，才能给swiper轮播添加动态效果，
因为没有获取到节点。

第一种解决方案，延迟器（不是完美的解决方案）
【错误的想法】
created里面：created执行与mounted执行，时间差可能2ms，白扯
updated里面：如果组件有很多响应式（data），只要有一个属性值发生变化updated还会再次执行，再次初始化实例。
总结：第一种解决方案可以通过延迟器（异步）去解决问题，
但是这种解决方案存在风险（无法确定用户请求到底需要多长时间），因此没办法确定
延迟器时间。

第二种解决方案：watch+$nextick
Swiper在Vue项目中使用完美解决方案
第一种解决方案问题出现在哪里：v-for,在遍历来自于Vuex（数据:通过ajax向服务器发请求，存在异步）

watch:监听属性，watch可以检测到属性值的变化，当属性值发生变化的时候，可以触发一次。

Vuex当中的仓库数据bannerList（组件在使用）：
bannerList仓库数据有没有发生过变化？
一定是有的：bannerList初始值空数组，当服务器的数据返回以后，它的bannerList存储的属性值会发生变化【变为服务器返回的数据】
组件实例在使用仓库中的bannerList，组件的这个属性bannerList一定是发生过变化，watch可以监听到。

组件实例的一个方法:$nextTick
this.$nextTick(()=>{

})
nextTick官网解释:
在下次DOM更新, 循环结束之后,执行延迟回调。在 修改数据之后 立即使用这个方法，获取更新后的DOM。
注意：组件实例的$nextTick方法，在工作当中经常使用，经常结合第三方插件使用，获取更新后的DOM节点


总结:
1:Swiper插件工作的是很常用（今晚把API、基本使用方法）看看
2:组件实例的$nextTick方法。
在下次DOM更新, 循环结束之后,执行延迟回调。在 修改数据之后 立即使用这个方法，获取更新后的DOM
```


### floor组件开发
```
仓库中state中的数据格式，不能瞎写，要根据服务器返回的数据格式
getFloorList这个action在哪里触发？
是需要在home路由组件中触发，不能在floor组件内部触发，因为我们需要v-for遍历floor组件

v-for也可以在组件上使用

组件通信的方式有哪些？（面试频率极高）
props：用于父子组件通信，父给子传递数据
自定义事件：用于子给父传递数据  $on  $emit
全局事件总线：$bus 万能
消息订阅与发布：万能
插槽 
vuex ：共享数据


拿到数据渲染结构
这里的轮播图new swiper 可以直接放到mounted中，因为数据是父组件传过来的，发送请求那一步实在父组件中进行的，数据结构肯定有了
```

### search路由组件的开发
```
静态页面+静态组件拆分出来
发请求
vuex（三联坏）
组件获取仓库数据，动态展示数据

swiper|lodash|moment插件工作的时候经常使用----【API：有时间翻看一下】

在search组件中我们要多次发送请求
所以封装一个方法，将需要携带的参数存到data中，利用生命周期钩子beforeMount在组件挂载完毕之前用 Object.assign修改参数，然后调用vuex发送请求


监听路由的变化发送请求再次获取数据
通过监听$route来监听用户是否修改了请求
如果修改了将修够后的参数携带上再次发送请求拿数据
因为有可能存在携带不同的1，2，3级分类id，所以在每次请求之后将当前的id清空，下次在携带新的id


面包屑问题
删除名字之前，我们需要把参数全部清空，回到默认的样子，在向服务器发送请求
因为带的参数都是可有可无的，所以我们设置为underfined就不会携带这个参数
因为我们当前清的只是query参数
所以我们要判断有没有params参数，有的话需要携带


平台售卖属性
通过自定义事件将所需要的参数发给search组件，search组件拿到数据，整理数据，发送请求
收集平台属性的时候，因为参数是个数组，可能会有多个数据，所以避免数据重复，再添加的时候要进行数组去重

排序
通过判断字符串中是否包含1或2从而决定active类名加在谁身上，箭头朝上还是朝下取决于参数中包含但是desc还是asc

点击调用一个方法 并且传入一个flag参数，flag为1表示点击的是综合，为2表示点击的是价格
在拿到初始值
判断于初始值是不是点击的是一个，如果是由升序变为降序，如果不是则改变flag值再赋初始值
整理参数
发送请求
```

### 分页器
```

2)分页器业务
前端三大件:轮播图、分页、日历。这属于前端开发常见三种业务

2.1:为什么很多项目中都采用分页功能?
比如电商平台：搜索一个奶粉，奶粉的产品有10000+，一次渲染10000+条数据，可能慢。
数据多的时候，可以选择分页，比如每一次只是展示10

2.2拆分分页组件（静态组件），注册为全局组件，因为其他模块也在使用分页功能。



面试当中:你自己封装过一个通用的组件吗?-----分页组件 **********



分页器封装业务分析:
封装分页器组件的时候：需要知道哪些条件？
假如你知道条件1、条件2：知道一共多少页 100/3
1:分页器组件需要知道我一共展示多少条数据 ----total【100条数据】

2:每一个需要展示几条数据------pageSize【每一页3条数据】

3:需要知道当前在第几页-------pageNo[当前在第几页]

4:需要知道连续页码数【起始数字、结束数字：连续页码数市场当中一般5、7、9】奇数，对称好看 continues


分页器起始数字与结束数字计算
首先判断连续页码数是否大于总页数，起始数字等于1，结束数字等于总页数
如果总页数大于连续页码数，则起始数字等于当前页码数减去连续页码数除2取整，结束数字等于当前页码数+连续页码数除2取整
还有判断起始数字是否小于1，因为页码数不存在0页和负数页 ，起始数字等于1，结束数字等于连续页码数
还要判断结束数字是否大于总页码数，起始数字等于最后一页的页码数减去连续页码数+1，结束数字等于总页码数

通过自定义事件传递数据，拿到数据整理参数，发送请求

注意：v-for可以遍历Array | Object | number | string | Iterable (2.6 新增)

经典面试题：v-for与v-if优先级？ v-for优先级更高

总结:
面试问题：v-for与v-if优先级?
        工作当中是否自己封装过一些通用的组件？
对于一个分页器:
1)需要知道数据总条数
2)每一个需要展示数据条数
3)知道当前是第几页
4)连续页码数字
5)自定义事件【子给父通信的】
```

### 详情页
```
点击图片的时候，跳转到商品详情页，在跳转的时候带上产品的id给详情页

滚轮滚动
  //滚轮滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
    跳转到时候滚动条距离顶部为0


发送请求拿到数据渲染页面

产品售卖属性高亮：运用排他法，点击那个先将全部的高亮去除然后给当前点击的添加高亮

给放大镜部分传递数据
利用全局事件总线让放大镜的两个组件进行通信，小图片点击的时候判断下标值是否和data中给定的那个值相等，如果相等就高亮，并且将点击图片的
下标值传给另一个组件，另一个组件拿到下标值展示对应的图片

购买数量
首先验证用户输入的是否是非数字和负数，如果是直接将值变为1
如果是小数，进行取整


加入购物车
需要带产品id和购买数量发送请求，告诉服务器将数据存到数据库
返回的是成功还是失败
随后跳转路由
需要带上你买手机的数量，还有手机的基本信息，我们利用回话存储技术在路由跳转之前存下来，路由跳转之后再取出来
因为回话存储技术不知吃对象，我们先利用JSON.stringify将对象转换为json字符串，取得时候再用JSON.parse转换为对象

加入购物车失败提示信息

查看商品详情：带着商品id返回详情页
去购物车结算：跳转路由到购物车页面

购物车
购物车静态组件，添加路由，修改样式结构
获取购物车数据，向服务器发送ajax
当我们添加到购物车时，需要提供一个自己的身份，购物车获取数据的时候，才能获取到该用户的数据
利用uuid生成一个唯一的数据，存储到本地服务器下，封装一个模块，在每次要生成uuid的时候，先获取本地存储器的uuid，看看是否已经有了，
如果有了，就不再生成，如果没有，将生成uuid，并将他存储到本地服务器，
将生成的uuid存到加入购物车的vuex仓库中
在发送请求之前。验证是否有请求头如果有的话将添加请求头字段一起发送请求，以便验证身份
这样所有请求在发送的时候都会携带请求头
uuid临时游客身份
utils里面放的是一些常用的功能模块

动态展示购物车
全选按钮那一块利用数组中的every方法
它返回的时一个布尔值
只要有一个为假返回的就是假，只有全部为真返回的才是真


修改购物车数量，定义一个函数接受三个参数，第一个参数判断点的是哪一个（加或减或手动输入），第二个是数量，第三个是数据id
这里要给加和减进行防抖或节流，节流更适合，
首先判断是哪一个，然后整理数据，在发送请求，请求成功之后在重新获取数据

删除购物车数据
发送delete请求，带的参数是产品id，删除成功之后在重新获取数据

修改商品选中状态：通过调用接口传入id和1或0，1表示选中，0表示未选中，请求成功之后再重新获取数据

删除购物车数据：利用context调用原有的删除单个数据的actions，通过遍历存数据的那个数组来多次调用，再通过getters获取到数据id传进去进行删除
将每一次调用返回的promise对象存到一个数组中，运用promise.all方法将这个数组存进去返回，成功的话获取新的数据更新页面

全选：将全选的isChecked属性值传递给action，在action中遍历数据，将每一条数剧的ischecked属性值设置为全选的ischecked属性值，将他们的返回的promise对象添加的一个数组，将这个数组用Promise.all方法返回，如果成功重新获取数据，刷新页面


面试题：GET与POST
相同点：都是HTTP协议。
不同点:
1:GET请求携带参数是有上限的 post请求携带的参数是没有'上限的'
2:GET请求相对而言不安全，POST安全


面试题:H5新增那些特性？
CSS4、本地存储、多媒体、canvas


面试题：本地存储与会话存储区别？
```

### 注册
```
先获取验证码
然后带着手机号，验证码，密码进行注册
```

### 登录
```
携带手机号，密码，发送请求进行登录，登陆成功后会返回token ，在vuex中进行存储token是非持久化的
在其他组件中携带token获取用户信息，需要将token进行持久性存储，localStorage

token面试题:项目当中token过期、失效如何处理？
答：清除本地token（本地存储），让用户回到登录页，获取最新的token

blur:失去焦点--->点击空白的地方
change:文本需要有变化，而且还需要点击空白的地方
input:只要文本发生变化立马执行【不许点击空白的地方】

以后在工作当中出现了一些，想不明白、或者没有思路。【前一个月：有问题，尽可能别问同事】
```
### 关于路由守卫跳转页面
```
1.当我们登录之后不能再跳转登录页
全局前置路由守卫，引入store，获取到token，判断是否登录，如果未登录一切路由组件都放行，如果登录了，判断是否要跳转登录组件，如果是，直接返回到home首页，如果不是，判断要跳转的页面是否有用户信息，如果有直接跳转，如果没有，派发action请求用户信息，请求成功之后跳转，如果请求用户信息失败
可能是token过期，派发action消除本地token以及登录信息，返回到登录页重新登录重新获取token
```



### 退出登录
```
二、退出登录
2.1发请求，需要通知服务器，把现在用户身份token【销毁】
2.2清除仓库数据+本地存储数据【都需要清理】


```

### 订单信息页面
```
静态组件
发送请求拿到数据
动态展示页面

因为接口的原因，返回的数据没有isDefault为1的，所以最终地址哪里无法直接通过计算属性获得，所以通过v-if当他为underfind的时候，让他隐藏，最终有了isdefault为1的时候在显示,或者直接还会一个空对象

渲染商品清单
```
### 提交订单
```
从这里开始，我们发请求不用vuex,我们将api文件从入口文件引入，挂载到vue.prototype上，这样所有的组件都可以使用，
提交订单成功之后会返回一个订单编号，
携带订单编号跳转到支付页面
发送请求拿到支付信息
```
### 立即支付
```
利用elementUi组件生成立即支付显示的那个弹窗
this.$alert(`<img src=${url} />`, '请使用微信扫码支付', {
        //是否将 message 属性作为 HTML 片段处理
        dangerouslyUseHTMLString: true,
        //MessageBox 是否显示右上角关闭按钮
        showClose: false,
        //是否显示取消按钮
        showCancelButton: true,
        //	取消按钮的文本内容
        cancelButtonText: '支付遇见问题',
        //确定按钮的文本内容
        confirmButtonText: '已支付成功',
        //是否居中布局
        center: true
      });
展示二维码----qrcode插件  let url = await QRCode.toDataURL(this.payinfo.codeUrl)

判断是否支付成功
设置一个timer值来判断是否知否成功
如果timer值为null开启一个定时器
在定时器中不断发送请求，来获取是否支付成功，用timer接受定时器的返回值
如果成功，关掉定时器，将timer值清空为null
关闭弹窗
保存返回支付成功结果的code值
跳转路由

继续购物回到首页
查看订单跳转到订单页
1.封装一个发请求获取订单列表的函数，需要携带两个参数，当前页和每页展示多少条数据，将请求的到的数据存到data中
动态渲染数据
用已封装的分页器进行切换页码发请求拿数据
```

### 未登录时不能跳转的页面
```
在未登录时我们不能去提交订单页trade，支付页和支付成功页（pay和paysuccess）和我的订单页center，所以要在路由前置守卫中限制
登录之后直接跳转到想去的页面
将想去的页面添加到地址信息中，在登陆时查看是否有query参数，如果有就跳转到参数的地址，如果没有就跳转到首页


路由独享守卫
在进入订单页trade必须从购物车页进入，进入支付页，必须从订单页进入，进入支付成功页必须从支付页进入

组件内守卫
  beforeRouteEnter (to, from, next) {
    // ...
  },
  beforeRouteLeave (to, from, next) {
    // ...
  },
  beforeRouteUpdate(to, from, next) {
    // ...
  },
  2)未登录全局守卫的判断

在前面课程当中:导航守卫【导航:路由发生变化，守卫可以检测到，通过判断，确定这次路由跳转】

前置守卫：在路由跳转之前，进行判断
后置守卫:路由都已经跳转完毕才执行。


未登录的情况:
全局守卫:只要的项目当中任何某一个路由发生变化，就会出发。
项目守卫使用:一般有用前置全局守卫

用户登录:

用户未登录：点击购物车的结算按钮->交易页面【没有登录:去不了】
           未登录不能调到支付页面
           未登录不能调到支付成功页面
           未登录不能去个人中心【都不知道你是谁：展示谁的个人中心啊】




3)路由独享守卫
路由独享守卫：需要在配置路由的地方使用
导航守卫:全局守卫->项目当中有任何路由变化【a->b,b->d】触发。
        路由独享守卫：专门负责某一个路由

用户登陆了:
去交易页面:从购物车才能跳转到交易页面。

next():你本来想去哪里，我就放行，你就去完事了。

next('/login'):执行守卫放行到执行的路由。

next(false):路由跳转的时候，从哪里来回那里去。



4)组件内守卫---->一般很少用【全局 + 路由独享守卫】
组件内守卫：也是专门负责某一个路由【并非负责全部路由】，写法和路由独享守卫有区别？
组件内守卫需要书写在组件内部

beforeRouteEnter
beforeRouteUpdate (2.2 新增)
beforeRouteLeave


```

### 6)路由懒加载
```
面试【高频的面试】:项目的性能优化手段有哪些？
v-if|v-show:尽可能采用v-show
按需引入【lodash、elementUI】
防抖与节流
路由懒加载：当用户访问的时候，加载对应组件进行展示。

```




### 7)图片懒加载
```

vue-lazyload:图片懒加载
图片：比用用户网络不好，服务器的数据没有回来，
总不可能让用户看白色，至少有一个默认图片在展示。
```

### 表单验证
```
8)表单验证【后台管理系统：大量使用elementUI】
以后工作的时候经常会进行表单验证【element-ui】进行表单验证，so 简单。
项目当中表单验证功能比较常见的。

8.1vee-validate插件：Vue官方提供的一个表单验证的插件【老师接下来的操作能大概看懂即可】
这个插件很难用：如果你翻看它的文档（看一个月：不保证能看懂），依赖文件很多（文档书写的很难理解）
花大量时间学习，很难搞懂。


8.2哪怕将来工作了，真的使用vee-valadiate【老师项目搞出来：改老师代码即可】


使用步骤：
1：安装vee-valadite，别安装最新版本@2
2：在plugins文件夹中创建一个validate.js[专门注册vee-valadite]
3:注册插件
4：注册插件的时候，用中文，以及需要验证的字段【用中文显示提示形式】
5：在入口文件需要引入执行一次
6:使用vee-valadiate插件

8)vee-validate 基本使用

第一步：插件安装与引入
cnpm i vee-validate@2 --save  安装的插件安装2版本的

import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'   // 引入中文 message
Vue.use(VeeValidate)

第二步：提示信息
VeeValidate.Validator.localize('zh_CN', {
messages: {
...zh_CN.messages,
is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
},
attributes: { // 给校验的 field 属性名映射中文名称
phone: '手机号',
code: '验证码',
password:'密码',
password1:'确认密码',
isCheck:'协议'
}
})

第三步：基本使用
<input
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
<span class="error-msg">{{ errors.first("phone") }}</span>

const success = await this.$validator.validateAll(); //全部表单验证
//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('agree', {
validate: value => {
return value
},
getMessage: field => field + '必须同意'
})


```

### nginx配置
```
1.xshell进入根目录/etc
2.进入etc目录，下面有一个nginx目录，进入到这个目录，如果安装过nginx会有很多文件，如果没有安装过，只有四五个文件
3.安装： yum install nginx
4.安装完nginx之后，会多一个nginx.conf文件，在这个文件中进行配置
5.vim nginx.conf 进行编辑，主要添加以下两项
第一个问题：为什么能直接访问我们的项目
location / {
  root  /root/ljy/www/shangpinhui/dist;
  index index.html;
  try_files $url $url/ index.html;
}
第二个问题 请求拿数据
location /api {
  proxy_pass http://gmall-h5-api.atguigu.cn;
}
6.启动nginx服务器哦
service nginx start
```