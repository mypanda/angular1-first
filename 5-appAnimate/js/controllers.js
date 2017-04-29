// var bookStoreCtrls = angular.module('bookStoreCtrls', []);

// bookStoreCtrls.controller('HelloCtrl', ['$scope',
//     function($scope) {
//         $scope.greeting = {
//             text: 'Hello'
//         };
//     }
// ]);

// bookStoreCtrls.controller('BookListCtrl', ['$scope',
//     function($scope) {
//         $scope.books =[
//         	{title:"《Ext江湖》",author:"大漠穷秋"},
//         	{title:"《ActionScript游戏设计基础（第二版）》",author:"大漠穷秋"},
//         	{title:"《用AngularJS开发下一代WEB应用》",author:"大漠穷秋"}
//         ]
//     }
// ]);

var bookStoreCtrls = angular.module('bookStoreCtrls',[]);

bookStoreCtrls.controller('HelloCtrl',function($scope) {
    $scope.greeting = {
        text:'Hello'
    }
    $scope.pageClass="hello";
});


bookStoreCtrls.controller('BookListCtrl',function($scope) {
    $scope.books = [
        {name:'《西游记》',author:'吴承恩'},
        {name:'《红楼梦》',author:'曹雪芹'},
        {name:'《水浒传》',author:'施耐庵'}
    ]
    $scope.pageClass="list";
});