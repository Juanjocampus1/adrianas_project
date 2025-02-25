var myapp = angular.module("myApp", [])
myapp.controller("mycontroller", function($scope) {

    $scope.data = [{
        name: 'John Doe',
        profileImage: 'https://mdn.mozillademos.org/files/12245/frame_image.svg',
        role: 'Administrator',
        status: 'active'
    }, {
        name: 'Steve ',
        profileImage: 'https://mdn.mozillademos.org/files/12245/frame_image.svg',
        role: 'Technician',
        status: 'inactive'
    } , {
        name: 'Jasna',
        profileImage: 'https://mdn.mozillademos.org/files/12245/frame_image.svg',
        role: 'Reception',
        status: 'active'
    }, {
        name: 'Paul',
        profileImage: 'https://mdn.mozillademos.org/files/12245/frame_image.svg',
        role: 'Reception',
        status: 'inactive'
    }, {
        name: 'Rusell Peters',
        profileImage: 'https://mdn.mozillademos.org/files/12245/frame_image.svg',
        role: 'Reception',
        status: 'inactive'
    }

    ];

    $scope.removeItem = function($index){

        $scope.data.splice($index,1)
    };

});
