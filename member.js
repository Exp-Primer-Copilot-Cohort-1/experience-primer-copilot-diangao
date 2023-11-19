function skillsMember(){
      return {
    restrict: 'E',
    templateUrl: 'templates/member.html',
    scope: {
      member: '=',
      remove: '&'
    },
    controller: function($scope){
      $scope.delete = function(){
        $scope.remove();
      }
    }
  }
}