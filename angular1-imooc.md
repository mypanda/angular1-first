## angular实战

====================================================

#### 第一部分 快速上手

##### 1.1 感受ANgularJS的4大核心特征

第一个例子 mvc

```
<!DOCTYPE html>
<html ng-app='myapp'>
<head>
	<meta charset="UTF-8">
</head>
<body>
	<div ng-controller='HelloAngular'>
		<p>{{greeting.text}},Angular</p>
	</div>
	<script src="https://cdn.bootcss.com/angular.js/1.3.0/angular.js"></script>
	<script>
	var myApp = angular.module('myapp',[]);

	myApp.controller('HelloAngular',function($scope) {
		$scope.greeting = {
			text:'hello'
		}
	})
	</script>
</body>
</html>
```
第二个例子 模块化

```
<!DOCTYPE html>
<html ng-app='myapp'>
<head>
	<meta charset="UTF-8">
</head>
<body>
	<div ng-controller='HelloAngular'>
		<p>{{greeting.text}},Angular</p>
	</div>
	<script src="https://cdn.bootcss.com/angular.js/1.3.0/angular.js"></script>
	<script>
	var myApp = angular.module('myapp',[]);

	myApp.controller('HelloAngular',['$scope',
		function($scope) {
			$scope.greeting = {
				text:'hello'
			}
		}
	]);
	</script>
</body>
</html>
```
第三个例子 指令系统

```
<!DOCTYPE html>
<html ng-app='myapp'>
<head>
	<meta charset="UTF-8">
</head>
<body>
	<hello></hello>
	<script src="https://cdn.bootcss.com/angular.js/1.3.0/angular.js"></script>
	<script>
	var myApp = angular.module('myapp',[]);

	myApp.directive('hello',function() {
		return {
			restrict:'E',
			template:'<h1>Hello World!!!</h1>',
			replace:true
		}
	})
	</script>
</body>
</html>
```
第四个例子 双向数据绑定

```
<!DOCTYPE html>
<html ng-app='myapp'>
<head>
	<meta charset="UTF-8">
</head>
<body>
	<div ng-controller="textController">
		<input ng-model="greeting.text">
		<p>{{greeting.text}},AngularJS</p>
	</div>
	<script src="https://cdn.bootcss.com/angular.js/1.3.0/angular.js"></script>
	<script>
	var myApp = angular.module('myapp',[]);

	myApp.controller('textController',function($scope) {
		$scope.greeting = {
			text:'hello'
		}
	})
	</script>
</body>
</html>
```

##### 1.2 自己松手搭建开发环境、调试、测试环境

* 代码编辑工具
	* sublime
	* webstorm
* 断点调试
	* Angular Batarang -- chromeStore
* 版本管理工具
	* git
	* tortoisegit
* 代码合并和混淆工具
	* grunt
* 依赖管理工具
	* bower
* 单元测试工具
	* karma
		* 用来跑测试用例的runner
	* jasmine
* 集成测试工具
* 其他
	* 开发环境nodeJS
	* 简洁的服务器http-server

```
karma

用来跑测试用例的runner


jasmine

作用：提供一套语法，用来编写测试用例

四个核心概念；分组、用例、期望、匹配分别对应Jasmine的四种函数
* describe(string,function)这个函数表示分组，也就是一组测试用例
* it(string,function)这个函数表示测试用例
* expect(expression)表示期望expression这个表达式具有某个值或者具有某种行为
* to***(arg)这个函数表示匹配


专门为AngularJS定制的测试工具 -- Protractor

proctactor基于webDriverJS
原理利用webDriverJS，可以借助于Nodejs直接调用浏览器(IE FF Chrome)的接口
Protractor基于webDriverJS
[Protractor](https://github.com/angualr/protractor)

[Protractor](https://code.google.com/p/selenium/wiki/webDriverjs)

Protractor是专门为Angualrjs定制的工具,但是webDriverjs是通用的

```

#### 第二部分 基本概念和用法

##### 2.1 MVC

* 为什么需要MVC
* 前端MVC的困难在哪里
* AngularJS语境下的MVC是如何是实现的


```
//这种方式不推荐
<!DOCTYPE html>
<html ng-app='myapp'>
<head>
	<meta charset="UTF-8">
</head>
<body>
	<div ng-controller="CommonController">
		<div ng-controller="Controller1">
			<p>{{greeting.text}},angular</p>
			<button ng-click="test1()">test1</button>
			<button ng-click="commonFn()">通用</button>
		</div>
		<div ng-controller="Controller2">
			<p>{{greeting.text}},angular</p>
			<button ng-click="test2()">test2</button>
			<button ng-click="commonFn()">通用</button>
		</div>
		<button ng-click="commonFn()">通用</button>
	</div>
	<script src="https://cdn.bootcss.com/angular.js/1.3.0/angular.js"></script>
	<script>
	var myApp = angular.module('myapp',[]);

	myApp.controller('CommonController',function($scope) {
		$scope.commonFn = function(){
			alert('这是通用功能!');
		}
	});

	myApp.controller('Controller1',function($scope) {
		$scope.greeting = {
			text:"hello1"
		}
		$scope.test1 = function(){
			alert('test1');
		}
	});

	myApp.controller('Controller2',function($scope) {
		$scope.greeting = {
			text:"hello2"
		}
		$scope.test2 = function(){
			alert('test2');
		}
	});
	</script>
</body>
</html>
```

controller使用注意点

* 不要试图去复用controller，一个控制器一般只负责一小块视图
* 不要在controller中操作DOM，这不是控制器的职责
* 不要再controller里面做数据格式化，ng有很好用的表单控件
* 不要再controller里面做数据过滤操作，ng有$filter服务
* 一般来说，controller是不会互相调用的，控制器之间的交互会通过事件进行


```
//$rootScope输入module的一个顶级对象，module里面的任何一个controller都可以访问
<!DOCTYPE html>
<html ng-app='myapp'>
<head>
	<meta charset="UTF-8">
</head>
<body>
	<div class="show-scope-demo">
		<div ng-controller='GreetCtrl'>
			hello {{name}}!
		</div>
		<div ng-controller="ListCtrl">
			<ol>
				<li ng-repeat="name in names">
					{{name}} from {{department}}
				</li>
			</ol>
		</div>
	</div>
	<script src="https://cdn.bootcss.com/angular.js/1.3.0/angular.js"></script>
	<script>
	var myApp = angular.module('myapp',[]);

	myApp.controller('GreetCtrl',function($scope,$rootScope) {
		$scope.name='World';
		$rootScope.department='Angular';
	});

	myApp.controller('ListCtrl',function($scope) {
		$scope.names=['Igor','Misko','Vojta'];
	});
	</script>
</body>
</html>
```

```
//下级向上级传递数据
<!DOCTYPE html>
<html ng-app='myapp'>
<head>
	<meta charset="UTF-8">
</head>
<body>
	<div ng-controller='EventController'>
		Root scope
		<tt>MyEvent</tt> count:{{count}}
		<ul>
			<li ng-repeat='i in [1]' ng-controller='EventController'>
				<button ng-click='$emit("MyEvent")'>$emit("MyEvent")</button>
				<button ng-click='$broadcast("MyEvent")'>$broadcast("MyEvent")</button>
				<br>
				Middle scope
				<tt>MyEvent</tt> count :{{count}}
				<ul>
					<li ng-repeat='i in [1,2]' ng-controller='EventController'>
						Leaf scope
						<tt>MyEvent</tt> count: {{count}}
					</li>
				</ul>
			</li>
		</ul>
	</div>
	<script src="https://cdn.bootcss.com/angular.js/1.3.0/angular.js"></script>
	<script>
	var myApp = angular.module('myapp',[]);

	myApp.controller('EventController',function($scope) {
		$scope.count=0;
		$scope.$on('MyEvent',function(){
			$scope.count++;
		})
	});
	</script>
</body>
</html>
```

神奇的$scope

* $scope是一个POJO(Plain Old Javascript Object)
* $scope提供一些工具方法$watch()/$apply()
* $scope是表达式的执行环境(或者教作用域)
* $scope是一个树形结构,与DOM标签平行
* 子$scope对象会继承父$scope上的属性和方法
* 每一个ANgular应用只有一个根$scope对象(一般位于ng-app)
* $scope可以传播事件，蕾西DOM事件，可可以向上也可以向下
* $scope不仅是MVC的基础，也是后面实现双向数据绑定的基础
* 可以用angular.element($0).scope()进行调试
	* ffInspect Angular Scope插件



$scope生命周期

* create
* watcher registration
* model mutation
* mutation observation
* scope destruction


##### 2.2 模块化与依赖注入

* AngularJS的模块化实现
* 一个完整的项目结构是什么样的? -- 实例演示
* 使用ngRoute进行视图之间的路由
* 一切都是从模块开始的
* ng官方推荐的模块切分方式是什么？
* 模块之间的依赖应该怎么做? -- 依赖注入


```
//目录结构
BookStore
	app
		css
		framework
			ui框架
		imgs
		js
			app.js
			controllers.js
			directives.js
			filters.js
			services.js
		tpls
			booklist.html
			hello.html
		index.html
	node_modules
		http-server
	package.json

这个例子是结合route做的一个渲染页面的例子
```

##### 2.3 双向数据绑定

* 最简单的例子
* 取值表达式与ng-bing指令
* 双向绑定的典型场景 -- 表单
* 动态切换标签样式
* ng-show和ng-hide
* ng-class
* ngAnimate

```
不显示花括号

{{greeting.text}}

<p ng-bind="greeting.text"></p>





```


##### 2.4 指令
##### 2.5 Service
##### 2.6 Provider
##### 2.7 表单
##### 2.8 综合实力BookStore

#### 第三部分 核心原理分析

##### 3.1 Parser
##### 3.2 双向数据绑定
##### 3.3 依赖注入

#### 第四部分 ng控件开发

##### 4.1 用AngularJS改写jQuery控件
##### 4.2 angularjs-ui
##### 4.3 移动控件库ionic

#### 第五部分 TDD和前端自动化测试

##### 5.1 TDD
##### 5.2 详解Jasmine与Protractor


====================================================

#### 版本使用v1.3.0-beta.10
#### 不支持IE8
#### 23种设计模式