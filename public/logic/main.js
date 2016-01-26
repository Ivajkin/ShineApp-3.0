/**
 * Created by
 * Timofey S. Ivaykin, MEng
 * on 1/26/16.
 */

angular.module("ShineApp", [])
    .filter('fromTo', function() {
        return function(input, from, total, lessThan) {
            from = parseInt(from);
            total = parseInt(total);
            for (var i = from; i < from + total && i < lessThan; i++) {
                input.push(i);
            }
            return input;
        }
    })
    .factory('instagram', ['$http',
        function($http) {
            return {
                fetchPopular: function(callback) {

                    var endPoint = "https://api.instagram.com/v1/media/popular?client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK";

                    $http.jsonp(endPoint).success(function(response) {
                        callback(response.data);
                    });
                }
            }
        }
    ])
    .controller("ShineController", function($scope, $interval, instagram) {
        $scope.pics = [];
        $scope.have = [];
        $scope.orderBy = "-likes.count";
        $scope.getMore = function() {
            instagram.fetchPopular(function(data) {
                for(var i=0; i<data.length; i++) {
                    if (typeof $scope.have[data[i].id]==="undefined") {
                        $scope.pics.push(data[i]) ;
                        $scope.have[data[i].id] = "1";
                    }
                }
            });
        };
        $scope.getMore();

        $scope.tags = [
            'Bootstrap', 'AngularJS', 'Instagram', 'Factory'
        ]
    });

app.service('anchorSmoothScroll', function(){

    this.scrollTo = function(eID) {

        // This scrolling function
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };

});
app.controller('ScrollCtrl', function($scope, $location, anchorSmoothScroll) {

    $scope.gotoElement = function (eID){
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash('bottom');

        // call $anchorScroll()
        anchorSmoothScroll.scrollTo(eID);

    };
});