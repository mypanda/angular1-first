## angular-first


* 安装依赖
	* `npm install`
* 启动http服务
	* `npm start`


#### 注意

```
var bookStoreApp = angular.module('bookStoreApp',[
    'ngRoute',
    'ngAnimate',
    'bookStoreCtrls',
    'bookStoreFilters',
    'bookStoreServices',
    'bookStoreDirectives'
]);

//加载的服务，过滤，控制器，指令都要导出默认的,不能空着，或者你不加载
```

##### 不能使用cdn加载angular

##### 两个路由

* localhost:8080/app/#/hello
* localhost:8080/app/#/list

##### app1是另外几个文件

http://www.imooc.com/video/2924