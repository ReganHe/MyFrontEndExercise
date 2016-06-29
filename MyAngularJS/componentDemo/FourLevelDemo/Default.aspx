<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Default" %>

<!DOCTYPE html>

<html ng-app="categoryApp">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="Scripts/lib/angular.min.js"></script>
    <script src="Scripts/lib/ui-bootstrap-1.1.1.min.js"></script>
    <script src="Scripts/jquery-1.10.2.js"></script>
    <script type="text/javascript">
        var app = angular.module('categoryApp', ['ui.bootstrap']);
        app.controller('CategoryController', ['$scope', '$q', '$http', function ($scope, $q, $http) {
            var getCategory = function () {
                var deferred = $q.defer();
                if (!$scope.waiting) {
                    deferred.resolve(1);
                } else {
                    $http.get('Handler.ashx', null)
                        .success(function (data) {
                            $scope.tempCate = data;
                            $scope.categories = new Array(5);
                            $scope.c = new Array(5);
                            $scope.categories[1] = $scope.tempCate.filter(function (value, index, array) {
                                return value.depth == 1;
                            });

                            $scope.$watch('c[1]', function (newVal, oldVal) {
                                $scope.categories[2] = null;
                                $scope.categories[3] = null;
                                $scope.categories[4] = null;
                                if (newVal) {
                                    $("#hfCategory").val(newVal.cateId);
                                    $scope.categories[2] = $scope.tempCate.filter(function (value, index, array) {
                                        return value.depth == 2 && value.parentId == newVal.cateId;
                                    });

                                }
                            });

                            $scope.$watch('c[2]', function (newVal, oldVal) {
                                if (newVal) {
                                    $("#hfCategory").val(newVal.cateId);
                                    $scope.categories[3] = $scope.tempCate.filter(function (value, index, array) {
                                        return value.depth == 3 && value.parentId == newVal.cateId;
                                    });
                                    $scope.categories[4] = null;
                                }
                            });

                            $scope.$watch('c[3]', function (newVal, oldVal) {
                                if (newVal) {
                                    $("#hfCategory").val(newVal.cateId);
                                    $scope.categories[4] = $scope.tempCate.filter(function (value, index, array) {
                                        return value.depth == 4 && value.parentId == newVal.cateId;
                                    });
                                }
                            });

                            $scope.$watch('c[4]', function (newVal, oldVal) {
                                if (newVal) {
                                    $("#hfCategory").val(newVal.cateId);
                                }
                            });

                            if ($scope.categoryId) {
                                var category = $scope.tempCate.filter(function (value, index, array) {
                                    return value.cateId == $scope.categoryId;
                                })[0];
                                $scope.c[category.depth] = category;
                                var parentId = category.parentId;
                                for (var i = category.depth - 1; i > 0; i--) {
                                    var currentCate = $scope.tempCate.filter(function (value, index, array) {
                                        return value.cateId == parentId;
                                    })[0];
                                    parentId = currentCate.parentId;
                                    $scope.c[i] = currentCate;
                                }
                            }
                        }).finally(function () {
                            deferred.resolve(1);
                        });;
                }

                return deferred.promise;
            };

            var init = function (waiting) {
                $scope.categoryId = <%=LoadCategoryId%>;
                $scope.waiting = waiting || false;
                getCategory();
            };

            init(1);

            function getSelectedCategoryId() {
                var result;
                if ($scope.categories[4] && $scope.categories[4][0] && $('#category4').val()) {
                    result = $scope.c[4];
                }
                else if ($scope.categories[3] && $scope.categories[3][0] && $('#category3').val()) {
                    result = $scope.c[3];
                }
                else if ($scope.categories[2] && $scope.categories[2][0] && $('#category2').val()) {
                    result = $scope.c[2];
                }
                return (result && result.isLeaf) ? result.cateId : null;
            }

        }]);
    </script>
</head>
<body ng-controller="CategoryController">
    <form id="form1" runat="server">
        <div class="form-group course-category">
            <label for="courseName" class="form-item-title">所属类目</label>
            <select class="form-control" id="category1" name="category1" ng-model="c[1]" ng-show="categories[1]" ng-options="category as category.cateName for category in categories[1]">
                <option value="">请选择类目</option>
            </select>
            <select class="form-control" id="category2" name="category2" ng-model="c[2]" ng-show="categories[2] && categories[2][0]" ng-options="category as category.cateName for category in categories[2]">
                <option value="">请选择类目</option>
            </select>
            <select class="form-control" id="category3" name="category3" ng-model="c[3]" ng-show="categories[3] && categories[3][0]" ng-options="category as category.cateName for category in categories[3]">
                <option value="">请选择类目</option>
            </select>
            <select class="form-control" id="category4" name="category4" ng-model="c[4]" ng-show="categories[4] && categories[4][0]" ng-options="category as category.cateName for category in categories[4]">
                <option value="">请选择类目</option>
            </select>
            <asp:HiddenField runat="server" ID="hfCategory" />
        </div>
        <asp:Button ID="Button1" runat="server" Text="Button" OnClick="Button1_Click" Style="height: 21px" />
    </form>
</body>
</html>
