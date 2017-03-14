var adminApp = angular.module('adminApp', ['Service', 'Filter']);
adminApp.directive('tabs', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {selected:"="},
            controller: [ "$scope", "$rootScope", function($scope, $rootScope) {
                var panes = $scope.panes = [];

                $scope.select = function(pane,ind) {
                    angular.forEach(panes, function(pane) {
                        pane.selected = false;
                    });
                    if(ind!=undefined)
                        $scope.selected = ind;
                    pane.selected = true;
                    $rootScope.$broadcast('updateTransaction',{
                        'type' : ind
                    })
                };
                $scope.$watch('selected',function(newVal){
                    var pane  = $scope.panes[newVal];
                    if(pane)
                        $scope.select(pane);
                });
                this.addPane = function(pane) {
                    panes.push(pane);
                    if (panes.length == $scope.selected+1) $scope.select(pane);
                }
            }],
            template:
            '<div class="tabbable">' +
            '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
            '<a href="" ng-click="select(pane,$index)">{{pane.title}}</a>' +
            '</li>' +
            '</ul>' +
            '<div class="tab-content" ng-transclude></div>' +
            '</div>',
            replace: true
        };
    })
    .directive('pane', function() {
        return {
            require: '^tabs',
            restrict: 'E',
            transclude: true,
            scope: { title: '@' },
            link: function(scope, element, attrs, tabsCtrl) {
                attrs.$$element[0].title = '';
                tabsCtrl.addPane(scope);
            },
            template:
            '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
            '</div>',
            replace: true
        };
    })
    .directive('fileChange', ['$parse', function($parse) {

        return {
            require: 'ngModel',
            restrict: 'A',
            link: function ($scope, element, attrs, ngModel) {

                var attrHandler = $parse(attrs['fileChange']);

                var handler = function (e) {

                    $scope.$apply(function () {
                        attrHandler($scope, { $event: e, files: e.target.files });
                    });
                };
                // Attach the handler to the HTML change event
                element[0].addEventListener('change', handler, false);
            }
        };
    }])
;
