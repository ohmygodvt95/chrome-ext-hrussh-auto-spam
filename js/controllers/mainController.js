app.controller('main', function ($scope, $http) {

    $scope.groups = [];
    $scope.user = {message: null, image: null};
    function getListGroup() {
        $http.get('https://www.facebook.com/bookmarks/groups/').then(function(response) {
            var arr = response.data.match(/id:"([^"]*)",name:"([^"]*)",count:(\d+)/ig);
            for(var i = 0; i < arr.length; i++) {
                var matches = arr[i].match(/id:"([^"]*)",name:"([^"]*)",count:(\d+)/);
                $scope.groups.push({id: matches[1], name: matches[2], checked: false});
            }
        });
    }

    function init() {
        getListGroup();
    }

    $scope.autoSpam = function () {
        var access_token = "EAACEdEose0cBAInFMc9oix0JDDbJQ0RtRvZBPbsHQAoNRY7H0mCGDs29AqO6UGUCb202aDSFkWsZCuJnlRe4aUue127n170CGpomHGMKwiqZCO2UYhzrmAlvY2nVu4O5sZCyb9XtEH2ypUmhy8j6wtxj8AIlTLqg6grBco9b5kK7FGEbz1aKqQEuYr51AF9YVLjgiIOyFgZDZD";
        for(var i = 0; i < $scope.groups.length; i++) {
            var group = $scope.groups[i];
            if (group.checked === true) {
                $http.post('https://graph.facebook.com/v2.11/' + group.id + '/feed?access_token=' + access_token, $scope.user).then(function (response) {
                    console.log(response.data);
                });
            }
        }
    };

    init();
});
