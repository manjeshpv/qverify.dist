'use strict';

angular.module('appApp', ['appApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'restangular', 'ngAnimate',
//'angularMoment',
'toaster',
//'chart.js'
"naif.base64", 'angular-oauth2']).config(function ($urlRouterProvider, $locationProvider, RestangularProvider, OAuthProvider, OAuthTokenProvider) {

  var URLS = {
    QVERIFY_API: 'http://app.qverify.dev/api',
    QVERIFY_SERVER: 'http://app.qverify.dev'
  };
  switch (window.location.host) {
    case 'app.qverify.com':
      URLS = {
        QVERIFY_API: 'https://app.qverify.com/api',
        QVERIFY_SERVER: 'https://app.qverify.com'
      };
      break;
    case 'staging-app.qverify.com':
      URLS = {
        QVERIFY_API: 'https://staging-app.qverify.com/api',
        QVERIFY_SERVER: 'https://staging-app.qverify.com'
      };
      break;
  }

  OAuthTokenProvider.configure({
    name: 'token',
    options: {
      secure: false,
      path: '/'
    }
  });

  OAuthProvider.configure({
    baseUrl: URLS.QVERIFY_SERVER,
    clientId: 'accounts',
    clientSecret: 'accountssecret', // optional
    grantPath: '/oauth/token'
  });

  RestangularProvider.setBaseUrl(URLS.QVERIFY_API);
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
});
//# sourceMappingURL=app.js.map

'use strict';

angular.module('appApp.util', []);
//# sourceMappingURL=util.module.js.map

"use strict";

(function (angular, undefined) {
	angular.module("appApp.constants", []).constant("appConfig", {
		"userRoles": ["guest", "user", "admin"]
	});
})(angular);
//# sourceMappingURL=app.constant.js.map

'use strict';

angular.module('appApp').service('QverifyConnection', function ($q, Restangular) {
  // Service logic
  // ...
  function QVC() {}

  QVC.prototype.fetchCases = function () {
    var defer = $q.defer();
    Restangular.all('cases').getList().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchClient = function () {
    var defer = $q.defer();
    Restangular.all('users/client').getList().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchVendor = function () {
    var defer = $q.defer();
    Restangular.all('users/vendor').getList().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchCaseTypes = function () {
    var defer = $q.defer();
    Restangular.all('case_types').getList().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchUserType = function () {
    var defer = $q.defer();
    Restangular.all('user_types').getList().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchHouseType = function () {
    var defer = $q.defer();
    Restangular.all('house_types').getList().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchDegree = function () {
    var defer = $q.defer();
    Restangular.all('degrees').getList().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchDesignation = function () {
    var defer = $q.defer();
    Restangular.all('designations').getList().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchUniversityName = function () {
    var defer = $q.defer();
    Restangular.all('university_names').getList().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchStatus = function () {
    var defer = $q.defer();
    Restangular.all('status').getList().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.createCase = function (newCase) {
    var defer = $q.defer();
    Restangular.all('cases').post(newCase).then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.login = function (username, password) {
    var defer = $q.defer();
    Restangular.all('open/users/login').post({
      username: username,
      password: password
    }).then(function (response) {
      OAuthToken.setToken(JSON.parse(response));
      Auth.setSessionData();
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.register = function (user) {
    var defer = $q.defer();
    Restangular.all('open/users/register').post(user).then(function (data) {

      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.createAddress = function (case_address_verification) {
    var defer = $q.defer();
    Restangular.all('case_address_verifications').post(case_address_verification).then(function (data) {

      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchAddress = function (case_address_verification) {
    var defer = $q.defer();
    Restangular.all('case_address_verifications').get().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.createCriminal = function (case_criminal_verification) {
    var defer = $q.defer();
    Restangular.all('case_criminal_verifications').post(case_criminal_verification).then(function (data) {

      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchCriminal = function (case_criminal_verification) {
    var defer = $q.defer();
    Restangular.all('case_criminal_verifications').get().then(function (data) {

      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.createEducation = function (case_education_verification) {
    var defer = $q.defer();
    Restangular.all('case_education_verifications').post(case_education_verification).then(function (data) {

      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchEducation = function (case_criminal_verification) {
    var defer = $q.defer();
    Restangular.all('case_criminal_verifications').get().then(function (data) {

      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.createSite = function (case_site_verification) {
    var defer = $q.defer();
    Restangular.all('case_site_verifications').post(case_site_verification).then(function (data) {

      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchSite = function (case_site_verification) {
    var defer = $q.defer();
    Restangular.all('case_site_verifications').get().then(function (data) {

      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.company = function (company) {
    console.log(company);
    var defer = $q.defer();
    Restangular.all('companys').post(company).then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };
  QVC.prototype.createAllocation = function (allocation) {
    var defer = $q.defer();
    Restangular.all('allocations').post(allocation).then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchLocation = function (location) {
    var defer = $q.defer();
    Restangular.all('locations').getList().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchAllocationByStatus = function (status) {
    var defer = $q.defer();
    Restangular.all('allocations').one('status', status).getList().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchAllocation = function (allocation) {
    var defer = $q.defer();
    Restangular.all('allocations').getList().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchCase = function (id) {
    var defer = $q.defer();
    Restangular.one('cases', id).get().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchCompany = function (company) {
    var defer = $q.defer();
    Restangular.all('companys/').getList().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };

  QVC.prototype.fetchVendorUploadedCases = function () {
    var defer = $q.defer();
    Restangular.all('allocations/').getList().then(function (data) {
      defer.resolve(data);
    }).catch(function (error) {
      defer.reject(error);
    });
    return defer.promise;
  };
  return QVC;
});
//# sourceMappingURL=QverifyConnection.service.js.map

'use strict';

angular.module('appApp').factory('URLS', function () {
  var vars = {
    QVERIFY_API: 'http://app.qverify.dev/api',
    QVERIFY_SERVER: 'http://app.qverify.dev'
  };
  switch (window.location.host) {
    case "app.qverify.com":
      vars = {
        QVERIFY_API: 'https://app.qverify.com/api',
        QVERIFY_SERVER: 'https://app.qverify.com'
      };
      break;
    case 'staging-app.qverify.com':
      vars = {
        QVERIFY_API: 'https://staging-app.qverify.com/api',
        QVERIFY_SERVER: 'https://staging-app.qverify.com'
      };
      break;
  }
  return vars;
});
//# sourceMappingURL=URLS.service.js.map

'use strict';

angular.module('appApp')
// Depending on constant: AUTH_EVENTS
.factory('Auth', function ($log, $http, $q, Session, URLS, OAuthToken) {
  var authService = {};
  var LOG_TAG = "Auth.js";
  var refreshingToken = false;

  authService.login = function login(credentials) {
    var url = URLS.QVERIFY_API + '/third-party/quezx/login';
    return $http.post(url, credentials, { ignoreAuthModule: true }).then(function (response) {
      // save in cookies - angular-oauth2 bower component
      OAuthToken.setToken(JSON.parse(response.data));
      return Session.create('oauth', response.data);
    }).catch(function (res) {
      $log.log(LOG_TAG, "err", res.data);
      Session.destroy();
      return $q.reject(res.data);
    });
  };

  authService.refreshToken = function () {
    // To Save Multiple Async RefreshToken Request
    if (refreshingToken) {
      $log.warn(LOG_TAG, 'Refresh token request already sent.');
      return $q.reject({ warning: 'Refresh token request already sent.' });
    }
    refreshingToken = true; // Set refresh_token reuqest tracker flag
    var url = URLS.QVERIFY_API + '/third-party/quezx/refresh';
    return $http.post(url, { refresh_token: Session.read('oauth').refresh_token }, { ignoreAuthModule: true }).then(function (res) {
      Session.create('oauth', res.data);
      refreshingToken = false; // reset refresh_token reuqest tracker flag
      return $q.resolve(res);
    }).catch(function (res) {
      refreshingToken = false; // reset refresh_token reuqest tracker flag
      return $q.reject(res);
    });
  };

  authService.logout = function logout() {
    var url = URLS.QVERIFY_API + '/third-party/quezx/logout';
    return $http.post(url, { access_token: Session.getAccessToken() }).then(function (response) {
      // Destroy Session data
      Session.destroy();
      return response.data;
    }, function (err) {
      Session.destroy();
      return $q.reject(err.data);
    });
  };

  authService.setSessionData = function () {
    return $q.all([$http.get(URLS.QVERIFY_API + '/users/me').then(function (response) {
      Session.create('userinfo', response.data);
    })]);
  };

  return authService;
});
//# sourceMappingURL=auth.js.map

'use strict';

angular.module('appApp').factory('Session', ['$window', function Session($window) {
  var sessionService = {};

  sessionService.create = function create(key, value) {
    $window.localStorage[key] = angular.toJson(value);
  };

  sessionService.read = function read(key) {
    return angular.fromJson($window.localStorage[key]);
  };

  sessionService.destroy = function destroy() {
    $window.localStorage.clear();
  };

  sessionService.isAuthenticated = function isAuthenticated() {
    return !!(sessionService.read('oauth') && sessionService.read('oauth').access_token);
  };

  sessionService.getAccessToken = function getAccessToken() {
    return sessionService.read('oauth') && sessionService.read('oauth').access_token;
  };

  sessionService.isAuthorized = function isAuthorized(authorizedRoles) {
    var roles = authorizedRoles;
    if (!angular.isArray(roles)) {
      roles = [].push(roles);
    }

    return sessionService.isAuthenticated() && ~roles.indexOf(sessionService.userRole);
  };

  return sessionService;
}]);
//# sourceMappingURL=session.js.map

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var MainController = function () {
    function MainController($http) {
      _classCallCheck(this, MainController);

      this.$http = $http;
      this.awesomeThings = [];
    }

    _createClass(MainController, [{
      key: '$onInit',
      value: function $onInit() {
        var _this = this;

        this.$http.get('/api/things').then(function (response) {
          _this.awesomeThings = response.data;
        });
      }
    }, {
      key: 'addThing',
      value: function addThing() {
        if (this.newThing) {
          this.$http.post('/api/things', { name: this.newThing });
          this.newThing = '';
        }
      }
    }, {
      key: 'deleteThing',
      value: function deleteThing(thing) {
        this.$http.delete('/api/things/' + thing._id);
      }
    }]);

    return MainController;
  }();

  angular.module('appApp').component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });
})();
//# sourceMappingURL=main.controller.js.map

'use strict';

angular.module('appApp').config(function ($stateProvider) {
  $stateProvider.state('main', {
    url: '/',
    template: '<main></main>'
  });
});
//# sourceMappingURL=main.js.map

'use strict';

(function () {

  function AddressComponent($log, QverifyConnection, toaster, $stateParams) {
    var LOG_TAG = 'AddressComponent';
    var vm = this;
    var qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchHouseType().then(function (house_types) {
      vm.HouseType = house_types;
    });
    vm.createAddress = function () {
      vm.address.case_id = $stateParams.case_id;
      qverifyConnection.createAddress(vm.address);
      //.then(res=> toaster.pop('success', "Address Created"))
      //.catch(err => toaster.pop('error', err.data ? err.data.message : 'Unexpected Error'));
    };
  }

  angular.module('appApp').component('address', {
    templateUrl: 'app/routes/address/address.html',
    controller: AddressComponent,
    controllerAs: 'Address'
  });
})();
//# sourceMappingURL=address.controller.js.map

'use strict';

angular.module('appApp').config(function ($stateProvider) {
  $stateProvider.state('address', {
    url: '/case/:case_id/address',
    template: '<address></address>'
  });
});
//# sourceMappingURL=address.js.map

'use strict';

(function () {

  function AllocationComponent(QverifyConnection, toaster) {
    var vm = this;
    var qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchVendor().then(function (vendors) {
      vm.Vendor = vendors;
    });
    qverifyConnection.fetchCases().then(function (cases) {
      vm.Case = cases;
    });

    vm.create = function () {
      console.log(vm.allocation);
      qverifyConnection.createAllocation(vm.allocation).then(function (allocation) {});
      toaster.pop('success', "Allocated");
    };
  }

  angular.module('appApp').component('allocation', {
    templateUrl: 'app/routes/allocation/allocation.html',
    controller: AllocationComponent,
    controllerAs: 'Allocation'
  });
})();
//# sourceMappingURL=allocation.controller.js.map

'use strict';

angular.module('appApp').config(function ($stateProvider) {
  $stateProvider.state('allocation', {
    url: '/allocation',
    template: '<allocation></allocation>'
  });
});
//# sourceMappingURL=allocation.js.map

'use strict';

(function () {
  function CandidateComponent($log, QverifyConnection, $stateParams, $state, Restangular) {
    var LOG_TAG = 'CandidateComponent';
    var vm = this;
    console.log(LOG_TAG, $stateParams.case_id);
    var qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchCase($stateParams.case_id).then(function (caseObj) {
      vm.Case = caseObj;
    });

    vm.openCase = function () {
      switch (vm.Case.case_type_id) {
        case 1:
          // address
          $state.go("address", { case_id: $stateParams.case_id });
          break;
        case 2:
          // criminal
          $state.go("criminal", { case_id: $stateParams.case_id });
          break;
        case 3:
          // education
          $state.go("education", { case_id: $stateParams.case_id });
          break;
        case 4:
          // site
          $state.go("site", { case_id: $stateParams.case_id });
          break;
      }
    };

    vm.updateStatus = function (status_id) {
      Restangular.one('cases', $stateParams.case_id).put({ status_id: status_id }).then(function (data) {
        console.log("Request successful");
      }).catch(function (error) {
        console.log("Request failed");
      });
    };
  }

  angular.module('appApp').component('candidate', {
    templateUrl: 'app/routes/candidate/candidate.html',
    controller: CandidateComponent,
    controllerAs: 'Candidate'
  });
})();
//# sourceMappingURL=candidate.controller.js.map

'use strict';

angular.module('appApp').config(function ($stateProvider) {
  $stateProvider.state('candidate', {
    url: '/candidate/:case_id',
    template: '<candidate></candidate>'
  });
});
//# sourceMappingURL=candidate.js.map

'use strict';

(function () {

  function CompanyComponent(QverifyConnection, toaster) {
    console.log('here');
    var vm = this;
    var qverifyConnection = new QverifyConnection();
    vm.createCompany = function (company) {
      qverifyConnection.company(company).then(function (company) {

        for (var i = 0; i < vm.Location.length; i++) {
          if (vm.Location[i].id == company.location_id) {
            toaster.pop('success', "Company Created", company.name + "," + company.address + "," + vm.Location[i].name);
            break;
          }
        }
        if (company == undefined) alert("Incorrect");
        console.log(company.plain());
      }).catch(function (err) {
        console.log(err);
      });
      var options = {};

      vm.create = function () {
        qverifyConnection.createCompany(vm.company);
      };
    };
    qverifyConnection.fetchLocation().then(function (locations) {
      vm.Location = locations;
    });
    qverifyConnection.fetchUserType().then(function (user_types) {
      vm.UserType = user_types;
    });
    //yolo
  }

  angular.module('appApp').component('company', {
    templateUrl: 'app/routes/company/company.html',
    controller: CompanyComponent,
    controllerAs: 'Company'
  });
})();

//(function () {
//
//  function CompanyComponent(QverifyConnection,  toaster) {
//    let vm = this;
//    let qverifyConnection = new QverifyConnection;
//    vm.createCompany = function (company) {
//      qverifyConnection.createCompany(company).then((company)=> {
//        console.log(company);
//        for (let i = 0; i < vm.Location.length; i++) {
//          if (vm.Location[i].id == company.location_id) {
//            toaster.pop('success', "Company Created",company.name + "," +company.address + "," + vm.Location[i].name)
//            break;
//          }
//        }
//        if (company == undefined)
//          alert("Incorrect");
//        console.log(company.plain())
//      }).catch((err)=> {
//        console.log(err)
//      });
//      var options = {};
//
//
//    };
//    qverifyConnection.fetchLocation().then((locations)=> {
//      vm.Location = locations;
//    });
//    qverifyConnection.fetchUserType().then((user_types)=> {
//      vm.UserType = user_types;
//    });
////yolo
//
//  }
//
//
//  angular.module('appApp')
//    .component('company', {
//      templateUrl: 'app/routes/company/company.html',
//      controller: CompanyComponent,
//      controllerAs: 'Company',
//    });
//
//})();
//# sourceMappingURL=company.controller.js.map

'use strict';

angular.module('appApp').config(function ($stateProvider) {
  $stateProvider.state('company', {
    url: '/company',
    template: '<company></company>'
  });
});
//# sourceMappingURL=company.js.map

'use strict';

(function () {

  function CreationComponent($log, QverifyConnection, toaster) {
    var LOG_TAG = 'CreationComponent';
    var vm = this;
    var qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchClient().then(function (clients) {
      vm.Client = clients;
    });
    qverifyConnection.fetchCaseTypes().then(function (case_types) {
      vm.CaseTypes = case_types;
    });
    qverifyConnection.fetchDegree().then(function (degrees) {
      vm.Degree = degrees;
    });
    vm.create = function () {
      qverifyConnection.createCase(vm.case).then(function (res) {
        return toaster.pop('success', "Case Created");
      }).catch(function (err) {
        return toaster.pop('error', err.data ? err.data.message : 'Unexpected Error');
      });
    };
  }

  angular.module('appApp').component('creation', {
    templateUrl: 'app/routes/creation/creation.html',
    controller: CreationComponent,
    controllerAs: 'Creation'
  });
})();
//# sourceMappingURL=creation.controller.js.map

'use strict';

angular.module('appApp').config(function ($stateProvider) {
  $stateProvider.state('creation', {
    url: '/creation',
    template: '<creation></creation>'
  });
});
//# sourceMappingURL=creation.js.map

'use strict';

(function () {

  function CriminalComponent($log, $stateParams, QverifyConnection, toaster) {
    var LOG_TAG = 'CriminalComponent';
    var vm = this;
    var qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchDesignation().then(function (designations) {
      vm.Designation = designations;
    });
    qverifyConnection.fetchStatus().then(function (status) {
      vm.Status = status;
    });
    vm.createCriminal = function () {
      vm.criminal.case_id = $stateParams.case_id;
      console.log(vm.criminal.dob);
      qverifyConnection.createCriminal(vm.criminal);
      //toaster.pop('success', "Criminal Created")
    };
  }

  angular.module('appApp').component('criminal', {
    templateUrl: 'app/routes/criminal/criminal.html',
    controller: CriminalComponent,
    controllerAs: 'Criminal'
  });
})();
//# sourceMappingURL=criminal.controller.js.map

'use strict';

angular.module('appApp').config(function ($stateProvider) {
  $stateProvider.state('criminal', {
    url: '/case/:case_id/criminal',
    template: '<criminal></criminal>'
  });
});
//# sourceMappingURL=criminal.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var DashboardComponent = function DashboardComponent() {
    _classCallCheck(this, DashboardComponent);

    this.message = 'Hello';
  };

  angular.module('appApp').component('dashboard', {
    templateUrl: 'app/routes/dashboard/dashboard.html',
    controller: DashboardComponent,
    controllerAs: 'Dashboard'
  });
})();
//# sourceMappingURL=dashboard.controller.js.map

'use strict';

angular.module('appApp').config(function ($stateProvider) {
  $stateProvider.state('dashboard', {
    url: '/dashboard',
    template: '<dashboard></dashboard>'
  });
});
//# sourceMappingURL=dashboard.js.map

'use strict';

(function () {

  function EducationComponent($log, QverifyConnection, toaster, $stateParams) {
    var LOG_TAG = 'EducationComponent';
    var vm = this;
    var qverifyConnection = new QverifyConnection();
    //qverifyConnection.fetchStatus().then((status)=> {
    //  vm.Status = status;
    //});
    qverifyConnection.fetchDesignation().then(function (designations) {
      vm.Designation = designations;
    });
    qverifyConnection.fetchUniversityName().then(function (university_names) {
      vm.UniversityName = university_names;
    });
    qverifyConnection.fetchDegree().then(function (degrees) {
      vm.Degree = degrees;
    });
    vm.createEducation = function () {
      vm.education.case_id = $stateParams.case_id;
      qverifyConnection.createEducation(vm.education);
      //toaster.pop('success', "Education Created")
    };
  }

  angular.module('appApp').component('education', {
    templateUrl: 'app/routes/education/education.html',
    controller: EducationComponent,
    controllerAs: 'Education'
  });
})();
//# sourceMappingURL=education.controller.js.map

'use strict';

angular.module('appApp').config(function ($stateProvider) {
  $stateProvider.state('education', {
    url: '/case/:case_id/education',
    template: '<education></education>'
  });
});
//# sourceMappingURL=education.js.map

'use strict';

(function () {
  function LoginComponent(QverifyConnection, $state, Restangular, OAuthToken, Auth) {
    var LOG_TAG = 'LoginComponent';
    var user = JSON.parse(localStorage.getItem("user"));
    if (user != undefined) {
      console.log(user);
      if (user.Company.user_type_id === 3) $state.go("partner");else $state.go("overview");
    }
    var vm = this;
    var qverifyConnection = new QverifyConnection();
    vm.user = {
      username: '',
      password: ''
    };
    vm.login = function (user) {
      console.log(user);
      Restangular.all('open/users/login').post({
        username: user.username,
        password: user.password
      }).then(function (response) {
        OAuthToken.setToken(JSON.parse(response));
        Auth.setSessionData().then(function () {
          var user = JSON.parse(localStorage.getItem('userinfo'));
          if (user.Company.user_type_id === 3) $state.go("partner");else $state.go("overview");
        });
      }).catch(function (error) {
        console.log(LOG_TAG, error);
      });
    };
  }

  angular.module('appApp').component('login', {
    templateUrl: 'app/routes/login/login.html',
    controller: LoginComponent,
    controllerAs: 'Login'
  });
})();
//# sourceMappingURL=login.controller.js.map

'use strict';

angular.module('appApp').config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    template: '<login></login>'
  });
});
//# sourceMappingURL=login.js.map

'use strict';

(function () {
  function OverviewComponent($log, QverifyConnection) {
    var LOG_TAG = 'OverviewComponent';
    var vm = this;
    var qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchAllocation().then(function (allocations) {
      vm.Allocation = allocations;
    });
  }

  angular.module('appApp').component('overview', {
    templateUrl: 'app/routes/overview/overview.html',
    controller: OverviewComponent,
    controllerAs: 'Overview'
  });
})();
//# sourceMappingURL=overview.controller.js.map

'use strict';

angular.module('appApp').config(function ($stateProvider) {
  $stateProvider.state('overview', {
    url: '/overview',
    template: '<overview></overview>'
  });
});
//# sourceMappingURL=overview.js.map

'use strict';

(function () {

  function PartnerComponent($log, QverifyConnection) {
    var LOG_TAG = 'PartnerComponent';
    var vm = this;
    var qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchAllocationByStatus(1).then(function (allocations) {
      vm.Allocation = allocations;
      console.log(vm.Allocation);
    });
    qverifyConnection.fetchAllocationByStatus(2).then(function (allocations) {
      vm.Allocated = allocations;
    });
  }

  angular.module('appApp').component('partner', {
    templateUrl: 'app/routes/partner/partner.html',
    controller: PartnerComponent,
    controllerAs: 'Partner'
  });
})();
//# sourceMappingURL=partner.controller.js.map

'use strict';

angular.module('appApp').config(function ($stateProvider) {
  $stateProvider.state('partner', {
    url: '/partner',
    template: '<partner></partner>'
  });
});
//# sourceMappingURL=partner.js.map

'use strict';

(function () {

  function RegisterComponent(QverifyConnection, toaster) {
    var vm = this;
    var qverifyConnection = new QverifyConnection();
    vm.register = function (user) {
      if (!user) return;
      qverifyConnection.register(user).then(function (user) {
        console.log(user);
        //for (let i = 0; i < vm.Company.length; i++) {
        //  if (vm.Company[i].id == user.Company_id) {
        //    toaster.pop('success', user.username , user.name  + "," + vm.Company[i].name + "," + user.email_id  + "," +user.contact  )
        //    break;
        //  }
        //}
        toaster.pop('success', "Registered", user.username + "," + user.name + "," + user.email_id + "," + user.contact);
        if (user == undefined) alert("Incorrect");
        console.log(user.plain());
      }).catch(function (err) {
        console.log(err);
      });
      var options = {};
    };
    qverifyConnection.fetchCompany().then(function (companys) {
      vm.Company = companys;
    });
  }

  angular.module('appApp').component('register', {
    templateUrl: 'app/routes/register/register.html',
    controller: RegisterComponent,
    controllerAs: 'Register'
  });
})();
//# sourceMappingURL=register.controller.js.map

'use strict';

angular.module('appApp').config(function ($stateProvider) {
  $stateProvider.state('register', {
    url: '/register',
    template: '<register></register>'
  });
});
//# sourceMappingURL=register.js.map

'use strict';

(function () {

  function SiteComponent($log, QverifyConnection, toaster, $stateParams) {
    var LOG_TAG = 'SiteComponent';
    var vm = this;
    var qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchDesignation().then(function (designations) {
      vm.Designation = designations;
    });
    vm.createSite = function () {
      vm.site.case_id = $stateParams.case_id;
      qverifyConnection.createSite(vm.site);
      //toaster.pop('success', "Site Created")
    };
  }

  angular.module('appApp').component('site', {
    templateUrl: 'app/routes/site/site.html',
    controller: SiteComponent,
    controllerAs: 'Site'
  });
})();
//# sourceMappingURL=site.controller.js.map

'use strict';

angular.module('appApp').config(function ($stateProvider) {
  $stateProvider.state('site', {
    url: '/case/:case_id/site',
    template: '<site></site>'
  });
});
//# sourceMappingURL=site.js.map

'use strict';

(function () {

  function ViewComponent($log, QverifyConnection, $stateParams) {
    var LOG_TAG = 'ViewComponent';
    var vm = this;
    console.log(LOG_TAG, $stateParams.case_id);
    var qverifyConnection = new QverifyConnection();
    qverifyConnection.fetchCase($stateParams.case_id).then(function (caseObj) {
      //console.log(caseObj.plain());
      vm.Case = caseObj;
    });
  }

  angular.module('appApp').component('view', {
    templateUrl: 'app/routes/view/view.html',
    controller: ViewComponent,
    controllerAs: 'View'
  });
})();
//# sourceMappingURL=view.controller.js.map

'use strict';

angular.module('appApp').config(function ($stateProvider) {
  $stateProvider.state('view', {
    url: '/view/:case_id',
    template: '<view></view>'
  });
});
//# sourceMappingURL=view.js.map

'use strict';

angular.module('appApp').directive('footer', function () {
  return {
    templateUrl: 'components/footer/footer.html',
    restrict: 'E',
    link: function link(scope, element) {
      element.addClass('footer');
    }
  };
});
//# sourceMappingURL=footer.directive.js.map

'use strict';

angular.module('appApp').factory('Modal', function ($rootScope, $uibModal) {
  /**
   * Opens a modal
   * @param  {Object} scope      - an object to be merged with modal's scope
   * @param  {String} modalClass - (optional) class(es) to be applied to the modal
   * @return {Object}            - the instance $uibModal.open() returns
   */
  function openModal() {
    var scope = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var modalClass = arguments.length <= 1 || arguments[1] === undefined ? 'modal-default' : arguments[1];

    var modalScope = $rootScope.$new();

    angular.extend(modalScope, scope);

    return $uibModal.open({
      templateUrl: 'components/modal/modal.html',
      windowClass: modalClass,
      scope: modalScope
    });
  }

  // Public API here
  return {

    /* Confirmation modals */
    confirm: {

      /**
       * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
       * @param  {Function} del - callback, ran when delete is confirmed
       * @return {Function}     - the function to open the modal (ex. myModalFn)
       */

      delete: function _delete() {
        var del = arguments.length <= 0 || arguments[0] === undefined ? angular.noop : arguments[0];

        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed straight to del callback
         */
        return function () {
          var args = Array.prototype.slice.call(arguments),
              name = args.shift(),
              deleteModal;

          deleteModal = openModal({
            modal: {
              dismissable: true,
              title: 'Confirm Delete',
              html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
              buttons: [{
                classes: 'btn-danger',
                text: 'Delete',
                click: function click(e) {
                  deleteModal.close(e);
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                click: function click(e) {
                  deleteModal.dismiss(e);
                }
              }]
            }
          }, 'modal-danger');

          deleteModal.result.then(function (event) {
            del.apply(event, args);
          });
        };
      }
    }
  };
});
//# sourceMappingURL=modal.service.js.map

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarController =
//end-non-standard

//start-non-standard
function NavbarController() {
  _classCallCheck(this, NavbarController);

  this.menu = [{
    'title': 'Home',
    'state': 'main'
  }];
  this.isCollapsed = true;
};

angular.module('appApp').controller('NavbarController', NavbarController);
//# sourceMappingURL=navbar.controller.js.map

'use strict';

angular.module('appApp').directive('navbar', function () {
  return {
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'nav'
  };
});
//# sourceMappingURL=navbar.directive.js.map

'use strict';

(function () {

  /**
   * The Util service is for thin, globally reusable, utility functions
   */
  function UtilService($window) {
    var Util = {
      /**
       * Return a callback or noop function
       *
       * @param  {Function|*} cb - a 'potential' function
       * @return {Function}
       */

      safeCb: function safeCb(cb) {
        return angular.isFunction(cb) ? cb : angular.noop;
      },


      /**
       * Parse a given url with the use of an anchor element
       *
       * @param  {String} url - the url to parse
       * @return {Object}     - the parsed url, anchor element
       */
      urlParse: function urlParse(url) {
        var a = document.createElement('a');
        a.href = url;

        // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
        if (a.host === '') {
          a.href = a.href;
        }

        return a;
      },


      /**
       * Test whether or not a given url is same origin
       *
       * @param  {String}           url       - url to test
       * @param  {String|String[]}  [origins] - additional origins to test against
       * @return {Boolean}                    - true if url is same origin
       */
      isSameOrigin: function isSameOrigin(url, origins) {
        url = Util.urlParse(url);
        origins = origins && [].concat(origins) || [];
        origins = origins.map(Util.urlParse);
        origins.push($window.location);
        origins = origins.filter(function (o) {
          return url.hostname === o.hostname && url.port === o.port && url.protocol === o.protocol;
        });
        return origins.length >= 1;
      }
    };

    return Util;
  }

  angular.module('appApp.util').factory('Util', UtilService);
})();
//# sourceMappingURL=util.service.js.map

angular.module("appApp").run(["$templateCache", function($templateCache) {$templateCache.put("app/main/main.html","<header id=\"banner\" class=\"hero-unit\"><div class=\"container\"><h1>\'Allo, \'Allo!</h1><p class=\"lead\">Kick-start your next web app with Angular Fullstack</p><img src=\"assets/images/yeoman-1cab7d4d37.png\" alt=\"I\'m Yeoman\"/></div></header><div class=\"container\"><div class=\"row\"><div class=\"col-lg-12\"><h1 class=\"page-header\">Features:</h1><ul ng-repeat=\"thing in $ctrl.awesomeThings\" class=\"nav nav-tabs nav-stacked col-md-4 col-lg-4 col-sm-6\"><li><a href=\"#\" uib-tooltip=\"{{thing.info}}\">{{thing.name}}</a></li></ul></div></div></div>");
$templateCache.put("components/footer/footer.html","<!--.container-->");
$templateCache.put("components/modal/modal.html","<div class=\"modal-header\"><button ng-if=\"modal.dismissable\" type=\"button\" ng-click=\"$dismiss()\" class=\"close\">&times;</button><h4 ng-if=\"modal.title\" ng-bind=\"modal.title\" class=\"modal-title\"></h4></div><div class=\"modal-body\"><p ng-if=\"modal.text\" ng-bind=\"modal.text\"></p><div ng-if=\"modal.html\" ng-bind-html=\"modal.html\"></div></div><div class=\"modal-footer\"><button ng-repeat=\"button in modal.buttons\" ng-class=\"button.classes\" ng-click=\"button.click($event)\" ng-bind=\"button.text\" class=\"btn\"></button></div>");
$templateCache.put("components/navbar/navbar.html","<!--div.navbar.navbar-default.navbar-static-top(ng-controller=\'NavbarController\')--><!--  div.container--><!--    div.navbar-header--><!--      button.navbar-toggle(type=\'button\', ng-click=\'nav.isCollapsed = !nav.isCollapsed\')--><!--        span.sr-only Toggle navigation--><!--        span.icon-bar--><!--        span.icon-bar--><!--        span.icon-bar--><!--      a.navbar-brand(href=\'/\') Partner--><!----><!--    div#navbar-main.navbar-collapse.collapse(uib-collapse=\'nav.isCollapsed\')--><!--      ul.nav.navbar-nav--><!--        //li(ng-repeat=\'item in nav.menu\', ui-sref-active=\'active\')--><!--        //  a(ui-sref=\'{{item.state}}\') {{item.title}}--><!--        li(ng-controller=\'LogoutController as logout\')--><!--          a(ng-click=\'logout.init()\') Logout-->");
$templateCache.put("app/routes/address/address.html","<div ui-view=\"\" class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\"><!--toaster-container(toaster-options=\"{\'time-out\': 1000, \'position-class\': \'toast-top-right\', \'close-button\':true, \'animation-class\': \'toast-top-right\'}\")--><div style=\"padding-left:2px\" class=\"m-t-xl padder no-margin\"><div class=\"hbox\"><div class=\"wrapper-md bg-light\"><form name=\"form\" ng-submit=\"Address.createAddress()\" class=\"form-validation\"><div class=\"list-group list-group-sm m-b-md\"><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Visiting address<input type=\"text\" placeholder=\"eg.Visiting address\" ng-model=\"Address.address.visiting_address\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Visiting person name<input type=\"text\" placeholder=\"eg.Visiting person name\" ng-model=\"Address.address.visiting_person_name\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Relation with candidate<input type=\"text\" placeholder=\"eg.Relation with candidate\" ng-model=\"Address.address.relation_with_candidate\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">House types id<select type=\"text\" placeholder=\"eg.House types id\" ng-options=\"item.id as item.name for item in Address.HouseType\" ng-model=\"Address.address.house_type_id\" class=\"form form-control\"></select></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">years of staying<input type=\"text\" placeholder=\"eg.years of staying\" ng-model=\"Address.address.years_of_staying\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">image<input type=\"file\" placeholder=\"eg.image\" ng-model=\"Address.address.img\" base-sixty-four-input=\"base-sixty-four-input\" maxsize=\"10000\" name=\"file\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">remarks<input type=\"text\" placeholder=\"eg.Relation with candidate\" ng-model=\"Address.address.remark\" class=\"form form-control\"/></label></div></div></div><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'visiting address\' ng-model=\'Address.address.visiting_address\' required)--><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'visiting person name\' ng-model=\'Address.address.visiting_person_name\' required)--><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'relation with candidate\' ng-model=\'Address.address.relation_with_candidate\' required)--><!--.list-group-item: select.form-control.no-border(type=\'text\' placeholder=\'house types id\' ng-options=\'item.id as item.name for item in Address.HouseType\' ng-model=\'Address.address.house_type_id\' required)--><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'years of staying\' ng-model=\'Address.address.years_of_staying\' required)--><!--.list-group-item: input.form-control.no-border(type=\'file\' placeholder=\'image\' ng-model=\'Address.address.img\' base-sixty-four-input maxsize=\"10000\" name=\'file\' required)--><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'remarks\' ng-model=\'Address.address.remark\' required)--><button type=\"submit\" ng-disabled=\"form.$invalid\" class=\"btn btn-primary pull-left\"><i class=\"fa fa-upload\"></i>&nbsp;&nbsp;Submit</button></div></form></div></div></div></div>");
$templateCache.put("app/routes/allocation/allocation.html","<div class=\"dashboard-page\"><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-3 col-md-2 sidebar\"><div class=\"text-center\"><h2 class=\"brand\">Q Verify</h2><img src=\"images/11-256-6ac3f3b722.png\"/><br/><a ui-sref=\"login\" class=\"btn btn-white btn-outline btn-rounded btn-sm\">Logout</a></div><ul class=\"nav nav-sidebar\"><li ng-class=\"{active: $state.includes(\'overview\')}\"><a ui-sref=\"overview\">Overview<span class=\"sr-only\">(current)</span></a></li><li ng-class=\"{active: $state.includes(\'company\')}\"><a ui-sref=\"company\">Company</a></li><li ng-class=\"{active: $state.includes(\'register\')}\"><a ui-sref=\"register\">Register</a></li><li ng-class=\"{active: $state.includes(\'allocation\')}\"><a ui-sref=\"allocation\">Allocation</a></li><li ng-class=\"{active: $state.includes(\'creation\')}\"><a ui-sref=\"creation\">Creation</a></li></ul></div><div ui-view=\"\" class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\"><toaster-container toaster-options=\"{\'time-out\': 1000, \'position-class\': \'toast-top-right\', \'close-button\':true, \'animation-class\': \'toast-top-right\'}\"></toaster-container><div style=\"padding-left:200px ; padding-right:200px\" class=\"m-t-xl padder no-margin\"><div class=\"hbox\"><div class=\"wrapper-md bg-light\"><h1 class=\"m-n font-thin h3\"><span>Case Allocation</span></h1><form name=\"AllocationDataForm\" class=\"form-horizontal wrapper-md\"><div class=\"row\"><!-- Form Block--><div class=\"col-md-7 col-sm-7 col-xs-7\"><!-- Form Items--><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-6 col-sm-6 col-xs-12\"><label class=\"col-xs-12 input-group\">Case<select ng-options=\"item.id as item.name for item in Allocation.Case\" ng-model=\"Allocation.allocation.cases_id\" class=\"form form-control\"></select></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-6 col-sm-6 col-xs-12\"><label class=\"col-xs-12 input-group\">Vendor<select ng-options=\"item.id as item.name for item in Allocation.Vendor\" ng-model=\"Allocation.allocation.user_id\" class=\"form form-control\"></select></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"></div><div class=\"row\"><div class=\"col-md-4 col-xs-12\"><!--ng-disabled=\'AllocationDataForm.$invalid\'--><button type=\"submit\" ng-click=\"Allocation.create()\" class=\"btn btn-primary pull-left\"><i class=\"fa fa-upload\"></i>&nbsp;&nbsp;Submit</button></div></div></div></div></form></div></div></div></div></div></div></div>");
$templateCache.put("app/routes/candidate/candidate.html","<div class=\"container\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><p><h4 style=\"color:#1750a9\" title=\"{{Candidate.Case.name}}\" class=\"text-ellipsis\">{{Candidate.Case.name}}</h4></p></div><div class=\"panel-body\"><ul class=\"list-group\"><li style=\"color:#383f44\" class=\"list-group-item\"> Case Name = {{Candidate.Case.name}}</li><li style=\"color:#383f44\" class=\"list-group-item\"> Address = {{Candidate.Case.address}}</li><li style=\"color:#383f44\" class=\"list-group-item\"> Phone = {{Candidate.Case.phone}}</li><li style=\"color:#383f44\" class=\"list-group-item\"> Client = {{Candidate.Case.User.name}}</li></ul><!--p--><!--  i.fa.fa-bookmark(style=\"color:#383f44\")--><!--    | &nbsp;&nbsp;{{Candidate.Case.name}}--><!--p--><!--  i.fa.fa-briefcase(style=\"color:#383f44\")--><!--    | &nbsp;{{Candidate.Case.address}}--><!--p--><!--  i.fa.fa-briefcase(style=\"color:#383f44\")--><!--    | &nbsp;{{Candidate.Case.phone}}--><!--p--><!--  i.fa.fa-briefcase(style=\"color:#383f44\")--><!--    | &nbsp;{{Candidate.Case.User.name}}-->\n\n<div class=\"col-md-12\"><div class=\"col-md-3 col-xs-4\"><button type=\"submit\" ng-click=\"Candidate.updateStatus(3)\" class=\"btn btn-primary pull-right\">Accept</button></div><div class=\"col-md-3 col-xs-4\"><button type=\"submit\" ng-click=\"Candidate.openCase()\" class=\"btn btn-success pull-right\">Upload</button></div><div class=\"col-md-3 col-xs-4\"><button type=\"submit\" ng-click=\"Candidate.updateStatus(5)\" class=\"btn btn-danger pull-right\">Reject</button></div></div></div></div></div>");
$templateCache.put("app/routes/company/company.html","<div class=\"dashboard-page\"><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-3 col-md-2 sidebar\"><div class=\"text-center\"><h2 class=\"brand\">Q Verify</h2><img src=\"images/11-256-6ac3f3b722.png\" class=\"user-avatar\"/><br/><a ui-sref=\"login\" class=\"btn btn-white btn-outline btn-rounded btn-sm\">Logout</a></div><ul class=\"nav nav-sidebar\"><li ng-class=\"{active: $state.includes(\'overview\')}\"><a ui-sref=\"overview\">Overview<span class=\"sr-only\">(current)</span></a></li><li ng-class=\"{active: $state.includes(\'company\')}\"><a ui-sref=\"company\">Company</a></li><li ng-class=\"{active: $state.includes(\'register\')}\"><a ui-sref=\"register\">Register</a></li><li ng-class=\"{active: $state.includes(\'allocation\')}\"><a ui-sref=\"allocation\">Allocation</a></li><li ng-class=\"{active: $state.includes(\'creation\')}\"><a ui-sref=\"creation\">Creation</a></li></ul></div><div ui-view=\"\" class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\"><toaster-container toaster-options=\"{\'time-out\': 1000, \'position-class\': \'toast-top-right\', \'close-button\':true, \'animation-class\': \'toast-top-right\'}\"></toaster-container><div style=\"padding-left:200px ; padding-right:200px\" class=\"m-t-xl padder no-margin\"><div class=\"hbox\"><div class=\"wrapper-md bg-light\"><form name=\"form\" ng-submit=\"Company.createCompany(Company.company)\" class=\"form-validation\"><div class=\"list-group list-group-sm m-b-md\"><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Name<input type=\"text\" placeholder=\"eg.Name\" ng-model=\"Company.company.name\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Address<input type=\"text\" placeholder=\"eg.address\" ng-model=\"Company.company.address\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">User Type<select ng-options=\"item.id as item.name for item in Company.UserType\" ng-model=\"Company.company.user_type_id\" class=\"form form-control\"></select></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Location<select ng-options=\"item.id as item.name for item in Company.Location\" ng-model=\"Company.company.location_id\" class=\"form form-control\"></select></label></div></div></div><button type=\"submit\" ng-disabled=\"form.$invalid\" class=\"btn btn-lg btn-primary btn-block\">Company</button></div></form></div></div></div></div></div></div></div><!--.dashboard-page--><!--  .container-fluid--><!--    .row--><!--      .col-sm-3.col-md-2.sidebar--><!--        .text-center--><!--          h2.brand--><!--            | Q Verify--><!----><!--          img.user-avatar(src=\'images/flat-avatar.png\')--><!--          br--><!--          a.btn.btn-white.btn-outline.btn-rounded.btn-sm(ui-sref=\'login\') Logout--><!--        ul.nav.nav-sidebar--><!--          li(ng-class=\"{active: $state.includes(\'overview\')}\")--><!--            a(ui-sref=\'overview\')--><!--              | Overview--><!--              span.sr-only (current)--><!--          li(ng-class=\"{active: $state.includes(\'company\')}\")--><!--            a(ui-sref=\'company\') Company--><!--          li(ng-class=\"{active: $state.includes(\'register\')}\")--><!--            a(ui-sref=\'register\') Register--><!--          li(ng-class=\"{active: $state.includes(\'allocation\')}\")--><!--            a(ui-sref=\'allocation\') Allocation--><!--          li(ng-class=\"{active: $state.includes(\'creation\')}\")--><!--            a(ui-sref=\'creation\') Creation--><!----><!--      .col-sm-9.col-sm-offset-3.col-md-10.col-md-offset-2.main(ui-view=\'\')--><!--        toaster-container(toaster-options=\"{\'time-out\': 1000, \'position-class\': \'toast-top-right\', \'close-button\':true, \'animation-class\': \'toast-top-right\'}\")--><!----><!--        div.m-t-xl.padder.no-margin(style=\"padding-left:200px\" )--><!--          .hbox--><!--            .wrapper-md.bg-light--><!--              form.form-validation(name=\"form\" ng-submit=\'Company.createCompany(Company.company)\')--><!----><!----><!--                .list-group.list-group-sm.m-b-md--><!--                  .line.line-dashed.b-b.line-lg.pull-in--><!--                    .row--><!--                      .col-md-12.col-sm-12.col-xs-12--><!--                        label.col-xs-12.input-group--><!--                          | Name--><!--                          input.form.form-control(type=\'text\' placeholder=\'eg.Name\' ng-model=\'Creation.company.name\' )--><!--                  .line.line-dashed.b-b.line-lg.pull-in--><!--                    .row--><!--                      .col-md-12.col-sm-12.col-xs-12--><!--                        label.col-xs-12.input-group--><!--                          | Address--><!--                          input.form.form-control(type=\'text\' placeholder=\'eg.Address\' ng-model=\'Creation.company.address\'  )--><!--                  .line.line-dashed.b-b.line-lg.pull-in--><!--                    .row--><!--                      .col-md-12.col-sm-12.col-xs-12--><!--                        label.col-xs-12.input-group--><!--                          | User Type--><!--                          select.form.form-control(ng-options=\'item.id as item.name for item in Company.UserType\' ng-model=\'Creation.company.user_type_id\' )--><!--                  .line.line-dashed.b-b.line-lg.pull-in--><!--                    .row--><!--                      .col-md-12.col-sm-12.col-xs-12--><!--                        label.col-xs-12.input-group--><!--                          | Location--><!--                          select.form.form-control( ng-options=\'item.id as item.name for item in Company.Location\' ng-model=\'Creation.company.Location\'   )--><!----><!----><!----><!----><!--                button.btn.btn-lg.btn-primary.btn-block(type=\'submit\' ng-disabled=\'form.$invalid\' ) Company--><!----><!---->");
$templateCache.put("app/routes/creation/creation.html","<div class=\"dashboard-page\"><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-3 col-md-2 sidebar\"><div class=\"text-center\"><h2 class=\"brand\">Q Verify</h2><img src=\"images/11-256-6ac3f3b722.png\" class=\"user-avatar\"/><br/><a ui-sref=\"login\" class=\"btn btn-white btn-outline btn-rounded btn-sm\">Logout</a></div><ul class=\"nav nav-sidebar\"><li ng-class=\"{active: $state.includes(\'overview\')}\"><a ui-sref=\"overview\">Overview<span class=\"sr-only\">(current)</span></a></li><li ng-class=\"{active: $state.includes(\'company\')}\"><a ui-sref=\"company\">Company</a></li><li ng-class=\"{active: $state.includes(\'register\')}\"><a ui-sref=\"register\">Register</a></li><li ng-class=\"{active: $state.includes(\'allocation\')}\"><a ui-sref=\"allocation\">Allocation</a></li><li ng-class=\"{active: $state.includes(\'creation\')}\"><a ui-sref=\"creation\">Creation</a></li></ul></div><div ui-view=\"\" class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\"><toaster-container toaster-options=\"{\'time-out\': 1000, \'position-class\': \'toast-top-right\', \'close-button\':true, \'animation-class\': \'toast-top-right\'}\"></toaster-container><div style=\"padding-left:200px ; padding-right:200px\" class=\"m-t-xl padder no-margin\"><div class=\"hbox\"><div class=\"wrapper-md bg-light\"><h1 class=\"m-n font-thin h3\"><span>Case Creation</span></h1><form name=\"CreationDataForm\" class=\"form-horizontal wrapper-md\"><div class=\"row\"><!-- Form Block--><div class=\"col-md-7 col-sm-7 col-xs-7\"><!-- Form Items--><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Type of Cases<span class=\"text-danger\">*</span><select ng-options=\"item.id as item.name for item in Creation.CaseTypes\" ng-model=\"Creation.case.case_type_id\" class=\"form-control\"></select></label></div></div><div ng-if=\"Creation.case.case_type_id != undefined\" class=\"line line-dashed b-b line-lg pull-in\"><div ng-if=\"Creation.case.case_type_id != undefined\" class=\"row\"><div class=\"col-md-6 col-sm-6 col-xs-12\"><label class=\"col-xs-12 input-group\">Client<select ng-options=\"item.id as item.name for item in Creation.Client\" ng-model=\"Creation.case.user_id\" class=\"form form-control\"></select></label></div></div></div><div ng-if=\"Creation.case.case_type_id != undefined\" class=\"line line-dashed b-b line-lg pull-in\"></div><div ng-if=\"Creation.case.case_type_id != undefined\" class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Name<input type=\"text\" placeholder=\"eg.Name\" ng-model=\"Creation.case.name\" q-text-maxlength=\"60\" ng-pattern=\"/^[a-zA-Z ]*$/\" class=\"form form-control\"/></label></div></div><div class=\"line line-dashed b-b line-lg pull-in\"></div><div ng-if=\"Creation.case.case_type_id != undefined\" class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Address<textarea placeholder=\"eg. Address\" rows=\"5\" ng-model=\"Creation.case.address\" q-text-maxlength=\"600\" ng-pattern=\"/^[a-zA-Z ]*$/\" class=\"form form-control\"></textarea></label></div></div><div ng-if=\"Creation.case.case_type_id != undefined\" class=\"line line-dashed b-b line-lg pull-in\"></div><div ng-if=\"Creation.case.case_type_id != undefined\" class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Contact No<input type=\"text\" placeholder=\"eg. Phone no\" ng-model=\"Creation.case.phone\" q-text-maxlength=\"60\" ng-pattern=\"/^[0-9 ]*$/\" class=\"form form-control\"/></label></div></div><div ng-if=\"Creation.case.case_type_id == &quot;4&quot; \" class=\"line line-dashed b-b line-lg pull-in\"></div><div ng-if=\"Creation.case.case_type_id == &quot;4&quot;\" class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Company Name<input type=\"text\" placeholder=\"eg. Company Name\" ng-model=\"Creation.case.company_name\" q-text-maxlength=\"60\" class=\"form form-control\"/></label></div></div><div ng-if=\"Creation.case.case_type_id == &quot;4&quot;\" class=\"line line-dashed b-b line-lg pull-in\"></div><div ng-if=\"Creation.case.case_type_id == &quot;4&quot;\" class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Concern person<input type=\"text\" placeholder=\"eg. Concern person\" ng-model=\"Creation.case.concern_person\" q-text-maxlength=\"60\" class=\"form form-control\"/></label></div></div><div ng-if=\"Creation.case.case_type_id == &quot;2&quot;\" class=\"line line-dashed b-b line-lg pull-in\"></div><div ng-if=\"Creation.case.case_type_id == &quot;2&quot;\" class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">DOB<input type=\"date\" placeholder=\"eg. DOB\" ng-model=\"Creation.case.criminal.dob\" q-text-maxlength=\"60\" class=\"form form-control\"/></label></div></div><div ng-if=\"Creation.case.case_type_id == &quot;2&quot;\" class=\"line line-dashed b-b line-lg pull-in\"></div><div ng-if=\"Creation.case.case_type_id == &quot;2&quot;\" class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Father\'s Name<input type=\"text\" placeholder=\"eg. Father Name\" ng-model=\"Creation.case.criminal.father_name\" q-text-maxlength=\"60\" class=\"form form-control\"/></label></div></div><div ng-if=\"Creation.case.case_type_id == &quot;3&quot;\" class=\"line line-dashed b-b line-lg pull-in\"></div><!--.row--><!--    .col-md-12.col-sm-12.col-xs-12--><!--        label.col-xs-12.input-group--><!--            | Short Description (max 50 word)--><!--            textarea.form.form-control(placeholder=\'eg. Short Description (max 50 word)\' rows=5 ng-model=\'Creation.data.short_description\' q-text-maxlength=\"50\" )--><!--.line.line-dashed.b-b.line-lg.pull-in--><div ng-if=\"Creation.case.case_type_id == &quot;3&quot;\" class=\"row\"><div class=\"col-md-6 col-sm-6 col-xs-12\"><label class=\"col-xs-12 input-group\">Degree<select ng-options=\"item.id as item.name for item in Creation.Degree\" ng-model=\"Creation.case.education.degree_id\" class=\"form form-control\"></select></label></div></div><div ng-if=\"Creation.case.case_type_id == &quot;3&quot;\" class=\"line line-dashed b-b line-lg pull-in\"></div><div ng-if=\"Creation.case.case_type_id != undefined\" class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Document in pdf {{Creation.case.logo}}<input type=\"file\" ng-model=\"Creation.case.logo\" base-sixty-four-input=\"base-sixty-four-input\" maxsize=\"10000\" name=\"file\" class=\"form-control\"/></label></div></div><div class=\"line line-dashed b-b line-lg pull-in\"></div><div ng-if=\"Creation.case.case_type_id != undefined\" class=\"row\"><div class=\"col-md-4 col-xs-12\"><!--ng-disabled=\'CreationDataForm.$invalid\'--><button type=\"submit\" ng-click=\"Creation.create()\" class=\"btn btn-primary pull-left\"><i class=\"fa fa-upload\"></i>&nbsp;&nbsp;Submit</button></div></div></div></div></form></div></div></div></div></div></div></div>");
$templateCache.put("app/routes/dashboard/dashboard.html","<div class=\"dashboard-page\"><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-3 col-md-2 sidebar\"><div class=\"text-center\"><h2 class=\"brand\">Q Verify</h2><img src=\"images/11-256-6ac3f3b722.png\" class=\"user-avatar\"/><br/><a ui-sref=\"login\" class=\"btn btn-white btn-outline btn-rounded btn-sm\">Logout</a></div><ul class=\"nav nav-sidebar\"><li ng-class=\"{active: $state.includes(\'overview\')}\"><a ui-sref=\"overview\">Overview<span class=\"sr-only\">(current)</span></a></li><li ng-class=\"{active: $state.includes(\'company\')}\"><a ui-sref=\"company\">Company</a></li><li ng-class=\"{active: $state.includes(\'register\')}\"><a ui-sref=\"register\">Register</a></li><li ng-class=\"{active: $state.includes(\'allocation\')}\"><a ui-sref=\"allocation\">Allocation</a></li><li ng-class=\"{active: $state.includes(\'creation\')}\"><a ui-sref=\"creation\">Creation</a></li></ul></div><div ui-view=\"\" class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\"></div></div></div></div>");
$templateCache.put("app/routes/criminal/criminal.html","<div ui-view=\"\" class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\"><!--toaster-container(toaster-options=\"{\'time-out\': 1000, \'position-class\': \'toast-top-right\', \'close-button\':true, \'animation-class\': \'toast-top-right\'}\")--><div style=\"padding-left:2px\" class=\"m-t-xl padder no-margin\"><div class=\"hbox\"><div class=\"wrapper-md bg-light\"><form name=\"form\" ng-submit=\"Criminal.createCriminal()\" class=\"form-validation\"><div class=\"list-group list-group-sm m-b-md\"><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Police station name<input type=\"text\" placeholder=\"eg.police station name\" ng-model=\"Criminal.criminal.police_station_name\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Police authority name<input type=\"text\" placeholder=\"eg.police authority name\" ng-model=\"Criminal.criminal.police_authority_name\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Father name<input type=\"text\" placeholder=\"eg.father name\" ng-model=\"Criminal.criminal.father_name\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Remark<input type=\"text\" placeholder=\"eg.remarks\" ng-model=\"Criminal.criminal.remark\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">DOB<input type=\"date\" placeholder=\"eg.dob\" ng-model=\"Criminal.criminal.dob\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Address<select type=\"text\" placeholder=\"eg.designation\" ng-options=\"item.id as item.name for item in Criminal.Designation\" ng-model=\"Criminal.criminal.designation_id\" class=\"form form-control\"></select></label></div></div></div><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'police station name\' ng-model=\'Criminal.criminal.police_station_name\' required)--><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'police authority name\' ng-model=\'Criminal.criminal.police_authority_name\' required)--><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'father name\' ng-model=\'Criminal.criminal.father_name\' required)--><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'remarks\' ng-model=\'Criminal.criminal.remark\' required)--><!--.list-group-item: input.form-control.no-border(type=\'date\' placeholder=\'DOB\' ng-model=\'Criminal.criminal.dob\' required)--><!--.list-group-item: select.form-control.no-border(type=\'text\' placeholder=\'designation id\' ng-options=\'item.id as item.name for item in Criminal.Designation\' ng-model=\'Criminal.criminal.designation_id\' required)--><button type=\"submit\" ng-disabled=\"form.$invalid\" class=\"btn btn-primary pull-left\"><i class=\"fa fa-upload\"></i>&nbsp;&nbsp;Submit</button></div></form></div></div></div></div>");
$templateCache.put("app/routes/education/education.html","<div ui-view=\"\" class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\"><!--toaster-container(toaster-options=\"{\'time-out\': 1000, \'position-class\': \'toast-top-right\', \'close-button\':true, \'animation-class\': \'toast-top-right\'}\")--><div style=\"padding-left:2px\" class=\"m-t-xl padder no-margin\"><div class=\"hbox\"><div class=\"wrapper-md bg-light\"><form name=\"form\" ng-submit=\"Education.createEducation()\" class=\"form-validation\"><div class=\"list-group list-group-sm m-b-md\"><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">University Name<select type=\"text\" placeholder=\"eg.university name id\" ng-options=\"item.id as item.name for item in Education.UniversityName\" ng-model=\"Education.education.university_name_id\" class=\"form form-control\"></select></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Degree<select type=\"text\" placeholder=\"eg.Degree\" ng-options=\"item.id as item.name for item in Education.Degree\" ng-model=\"Education.education.degree_id\" class=\"form form-control\"></select></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Remarks<input type=\"text\" placeholder=\"eg.Remarks\" ng-model=\"Education.education.remarks\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Designation<select type=\"text\" placeholder=\"eg.Designation\" ng-options=\"item.id as item.name for item in Education.Designation\" ng-model=\"Education.education.designation_id\" class=\"form form-control\"></select></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Verifier name<input type=\"text\" placeholder=\"eg.verifier name\" ng-model=\"Education.education.verifier_name\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Role no<input type=\"text\" placeholder=\"eg.role no\" ng-model=\"Education.education.role_no\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Passing year<input type=\"text\" placeholder=\"eg.passing year\" ng-model=\"Education.education.passing_year\" class=\"form form-control\"/></label></div></div></div><!--.list-group-item: select.form-control.no-border(type=\'text\' placeholder=\'university name id\' ng-options=\'item.id as item.name for item in Education.UniversityName\' ng-model=\'Education.education.university_name_id\' required)--><!--.list-group-item: select.form-control.no-border(type=\'text\' placeholder=\'degree id\' ng-options=\'item.id as item.name for item in Education.Degree\' ng-model=\'Education.education.degree_id\' required)--><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'remarks\' ng-model=\'Education.education.name\' required)--><!--.list-group-item: select.form-control.no-border(type=\'text\' placeholder=\'designation id\' ng-options=\'item.id as item.name for item in Education.Designation\' ng-model=\'Education.education.designation_id\' required)--><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'verifier name\' ng-model=\'Education.education.verifier_name\' required)--><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'role no\' ng-model=\'Education.education.role_no\' required)--><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'passing year\' ng-model=\'Education.education.passing_year\' required)--><button type=\"submit\" ng-disabled=\"form.$invalid\" class=\"btn btn-primary pull-left\"><i class=\"fa fa-upload\"></i>&nbsp;&nbsp;Submit</button></div></form></div></div></div></div>");
$templateCache.put("app/routes/login/login.html","<div ng-init=\"App.app.settings.container = false;\" class=\"container w-xxl w-auto-xs\"><!--a.navbar-brand.block.m-t(href=\'\')--><!--  img(src=\'/assets/images/quezx-logo.svg\', alt=\'{{App.app.name}}\')--><div class=\"m-b-xs\"><!--.wrapper.text-center: strong Sign in--><div class=\"wrapper\"></div><!--form.form-validation(name=\"form\" ng-submit=\'Login.login(Login.user)\')--><!--  //.text-danger.wrapper.text-center(ng-show=\'Signin.authError\') {{Signin.authError}}--><!----><!--  .list-group.list-group-sm.m-b-md--><!--    .list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'Username\' ng-model=\'Login.user.username\' required)--><!--    .list-group-item: input.form-control.no-border(type=\'password\' placeholder=\'Password\' ng-model=\'Login.user.password\' required)--><!----><!--  button.btn.btn-lg.btn-primary.btn-block(type=\'submit\' ng-disabled=\'form.$invalid\') Log in--><!----><!--  .hide.text-center.m-t.m-b: a(ui-sref=\'access.forgotpass\') Forgot password?--><!----><!--  .line.line-dashed--><!--.login-page--><!--  .form--><!--    form.register-form--><!--      input(type=\'text\', placeholder=\'name\')--><!--      input(type=\'password\', placeholder=\'password\')--><!--      input(type=\'text\', placeholder=\'email address\')--><!--      button create--><!--      p.message--><!--        | Already registered?--><!--        a(href=\'#\') Sign In--><!--    form.login-form(role=\'form\', ng-submit=\'Login.login(Login.user)\')--><!--      input(type=\'text\', placeholder=\'username\', ng-model=\'Login.user.username\' required)--><!--      input(type=\'password\', placeholder=\'password\', ng-model=\'Login.user.password\' required)--><!--      button login--><!--      p.message--><!--        | Not registered?--><!--        a(href=\'#\') Create an account--><!--.login-page--><!--  //.img-container--><!--  //  .text-center.pull-right.photo--><!--  //    img.user-avatar.img-circle.img-responsive(src=\'/assets/images/quezx-logo.svg\')--><!--  .form-content--><!--    form.bottom-75(role=\'form\', ng-submit=\'Login.login(Login.user)\')--><!--      .table-form--><!--        .form-groups--><!--          .form-group--><!--            input.form-control.input-lg(type=\'text\',  placeholder=\'EMAIL\', ng-model=\'Login.user.username\' required)--><!--          .form-group--><!--            input.form-control.input-lg(type=\'password\',  placeholder=\'PASSWORD\', ng-model=\'Login.user.password\' required)--><!--        .button-container--><!--          button.btn.btn-default.login(type=\'submit\')--><!--            |        submit--><!--      .remember--><!--        label.checkbox1(for=\'Option\')--><!--          input#Option(type=\'checkbox\')--><!--          span--><!--        |        remember me--><!--        span.pass  forgot password?--><div class=\"login-page\"><div class=\"row\"><div class=\"col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4\"><!--img.user-avatar(src=\'images/flat-avatar.png\')--><h1>Q-Verify</h1><form role=\"form\" ng-submit=\"Login.login(Login.user)\"><div class=\"form-content\"><div class=\"form-group\"><input type=\"text\" placeholder=\"Email\" ng-model=\"Login.user.username\" required=\"required\" class=\"form-control input-underline input-lg\"/></div><div class=\"form-group\"><input type=\"password\" id=\"\" placeholder=\"Password\" ng-model=\"Login.user.password\" required=\"required\" class=\"form-control input-underline input-lg\"/></div></div><button type=\"submit\" class=\"btn btn-white btn-outline btn-lg btn-rounded\">Login</button></form></div></div></div></div><div class=\"text-center\"><footer></footer></div></div>");
$templateCache.put("app/routes/overview/overview.html","<div class=\"dashboard-page\"><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-3 col-md-2 sidebar\"><div class=\"text-center\"><h2 class=\"brand\">Q Verify</h2><img src=\"images/11-256-6ac3f3b722.png\" class=\"user-avatar\"/><br/><a ui-sref=\"login\" class=\"btn btn-white btn-outline btn-rounded btn-sm\">Logout</a></div><ul class=\"nav nav-sidebar\"><li ng-class=\"{active: $state.includes(\'overview\')}\"><a ui-sref=\"overview\">Overview<span class=\"sr-only\">(current)</span></a></li><li ng-class=\"{active: $state.includes(\'company\')}\"><a ui-sref=\"company\">Company</a></li><li ng-class=\"{active: $state.includes(\'register\')}\"><a ui-sref=\"register\">Register</a></li><li ng-class=\"{active: $state.includes(\'allocation\')}\"><a ui-sref=\"allocation\">Allocation</a></li><li ng-class=\"{active: $state.includes(\'creation\')}\"><a ui-sref=\"creation\">Creation</a></li></ul></div><div ui-view=\"\" class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\"><div class=\"col-md-12 col-sm-12 col-xs-12 panel panel-info no-padder\"><div class=\"panel-heading font-bold h4 text-ellipsis bg-light\"><div class=\"fa fa-mouse-pointer text-dark\"></div>&nbsp;&nbsp;Overview<!--i.fa.fa-angle-right.pull-right.font-bold--></div><div class=\"panel-body p-5px\"><scrollable-table watch=\"Dashboard.summary.applicantData\"><table class=\"table table-striped table-bordered m-b\"><thead><tr><th class=\"font-bold\">Client</th><th class=\"font-bold\">Vendor</th><th class=\"font-bold\">Case with Case type</th><th style=\"width:25%\" class=\"font-bold\">Status</th></tr></thead><!--(ng-if=\'Dash.pipeline.length>0\')--><tbody><tr ng-class=\"$last ?\'\':\'b-b\'\" ng-repeat=\"allocation in Overview.Allocation\" ui-sref=\"view({case_id: allocation.cases_id })\"><td><a class=\"text-ellipsis\">{{allocation.Case.User.name}}</a></td><td><a class=\"text-ellipsis\">{{allocation.User.name}}</a></td><td><a class=\"text-ellipsi\">{{allocation.Case.name}} ({{allocation.Case.CaseType.name}})</a></td><td><span class=\"text-ellipsis\">{{allocation.Case.Status.name}}</span></td></tr></tbody></table></scrollable-table></div></div></div></div></div></div>");
$templateCache.put("app/routes/partner/partner.html","<div ng-controller=\"NavbarController\" class=\"navbar navbar-default navbar-static-top\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" ng-click=\"nav.isCollapsed = !nav.isCollapsed\" class=\"navbar-toggle\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/\" class=\"navbar-brand\">Partner</a></div></div><div ui-view=\"\" class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\"><div class=\"col-md-12 col-sm-12 col-xs-12 panel panel-info no-padder\"><div class=\"panel-heading font-bold h4 text-ellipsis bg-light\"><div class=\"fa fa-mouse-pointer text-dark\"></div>&nbsp;&nbsp;Cases<!--i.fa.fa-angle-right.pull-right.font-bold--></div><div class=\"panel-body p-5px\"><scrollable-table watch=\"Dashboard.summary.applicantData\"><table class=\"table table-striped table-bordered m-b\"><thead><tr><th class=\"font-bold\">Case view</th><th style=\"width:25%\" class=\"font-bold\">Status</th></tr></thead><!--(ng-if=\'Dash.pipeline.length>0\')--><tbody><tr ng-repeat=\"allocation in Partner.Allocated\" ui-sref=\"view({case_id: allocation.cases_id })\"><td><a class=\"text-ellipsis\">{{allocation.Case.name}}</a></td><td><span class=\"text-ellipsis\">{{allocation.Case.Status.name}}</span></td></tr></tbody></table></scrollable-table></div></div></div><div ui-view=\"\" class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\"><div class=\"col-md-12 col-sm-12 col-xs-12 panel panel-info no-padder\"><div class=\"panel-heading font-bold h4 text-ellipsis bg-light\"><div class=\"fa fa-mouse-pointer text-dark\"></div>&nbsp;&nbsp;Allocated Case<!--i.fa.fa-angle-right.pull-right.font-bold--></div><div class=\"panel-body p-5px\"><scrollable-table watch=\"Dashboard.summary.applicantData\"><table class=\"table table-striped table-bordered m-b\"><thead><tr><th class=\"font-bold\">Case</th><th style=\"width:25%\" class=\"font-bold\">Allocated date</th></tr></thead><!--(ng-if=\'Dash.pipeline.length>0\')--><tbody><tr ng-repeat=\"allocation in Partner.Allocation\" ui-sref=\"candidate({case_id: allocation.cases_id })\"><td><a class=\"text-ellipsis\">{{allocation.Case.name}} ({{allocation.Case.CaseType.name}})</a></td><td><span YYYY-MM-DD=\"YYYY-MM-DD\" class=\"text-ellipsis moment format\">{{allocation.Case.created_at}}</span></td></tr></tbody></table></scrollable-table></div></div></div></div>");
$templateCache.put("app/routes/register/register.html","<div class=\"dashboard-page\"><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-3 col-md-2 sidebar\"><div class=\"text-center\"><h2 class=\"brand\">Q Verify</h2><img src=\"images/11-256-6ac3f3b722.png\" class=\"user-avatar\"/><br/><a ui-sref=\"login\" class=\"btn btn-white btn-outline btn-rounded btn-sm\">Logout</a></div><ul class=\"nav nav-sidebar\"><li ng-class=\"{active: $state.includes(\'overview\')}\"><a ui-sref=\"overview\">Overview<span class=\"sr-only\">(current)</span></a></li><li ng-class=\"{active: $state.includes(\'company\')}\"><a ui-sref=\"company\">Company</a></li><li ng-class=\"{active: $state.includes(\'register\')}\"><a ui-sref=\"register\">Register</a></li><li ng-class=\"{active: $state.includes(\'allocation\')}\"><a ui-sref=\"allocation\">Allocation</a></li><li ng-class=\"{active: $state.includes(\'creation\')}\"><a ui-sref=\"creation\">Creation</a></li></ul></div><div ui-view=\"\" class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\"><toaster-container toaster-options=\"{\'time-out\': 1000, \'position-class\': \'toast-top-right\', \'close-button\':true, \'animation-class\': \'toast-top-right\'}\"></toaster-container><div style=\"padding-left:200px ; padding-right:200px\" class=\"m-t-xl padder no-margin\"><div class=\"hbox\"><div class=\"wrapper-md bg-light\"><form name=\"form\" ng-submit=\"Register.register(Register.user)\" class=\"form-validation\"><div class=\"list-group list-group-sm m-b-md\"><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Username<input type=\"text\" placeholder=\"eg.Username\" ng-model=\"Register.user.username\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Company<select ng-options=\"item.id as item.name for item in Register.Company\" ng-model=\"Register.user.company_id\" class=\"form form-control\"></select></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Name<input type=\"text\" placeholder=\"name\" ng-model=\"Register.user.name\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Password<input type=\"password\" placeholder=\"password\" ng-model=\"Register.user.password\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\"> Confirm Password<input type=\"password\" placeholder=\" confirm password\" ng-model=\"Register.user.confirm_password\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">E-mail<input type=\"email\" placeholder=\"email id\" ng-model=\"Register.user.email\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Contact<input type=\"text\" placeholder=\"contact\" ng-model=\"Register.user.mobile\" class=\"form form-control\"/></label></div></div></div></div><button type=\"submit\" ng-disabled=\"form.$invalid\" class=\"btn btn-lg btn-primary btn-block\">Register</button></form></div></div></div></div></div></div></div>");
$templateCache.put("app/routes/site/site.html","<div ui-view=\"\" class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\"><!--toaster-container(toaster-options=\"{\'time-out\': 1000, \'position-class\': \'toast-top-right\', \'close-button\':true, \'animation-class\': \'toast-top-right\'}\")--><div style=\"padding-left:2px\" class=\"m-t-xl padder no-margin\"><div class=\"hbox\"><div class=\"wrapper-md bg-light\"><form name=\"form\" ng-submit=\"Site.createSite()\" class=\"form-validation\"><div class=\"list-group list-group-sm m-b-md\"><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Name of company<input type=\"text\" placeholder=\"eg.Name of company\" ng-model=\"Site.site.name_of_company\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Address<input type=\"text\" placeholder=\"eg.Address\" ng-model=\"Site.site.address\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Phone<input type=\"text\" placeholder=\"eg.Phone\" ng-model=\"Site.site.telephone\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Fax no<input type=\"text\" placeholder=\"eg.Fax no\" ng-model=\"Site.site.fax_no\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Email id<input type=\"email\" placeholder=\"eg.email\" ng-model=\"Site.site.email_id\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Website<input type=\"text\" placeholder=\"eg.website\" ng-model=\"Site.site.website\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Total no of employees<input type=\"text\" placeholder=\"eg.total no of employees\" ng-model=\"Site.site.total_no_of_employees\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Name of employees<input type=\"text\" placeholder=\"eg.name of employees\" ng-model=\"Site.site.name_of_employees\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">No of employees present<input type=\"text\" placeholder=\"eg.no_of_employee_present\" ng-model=\"Site.site.no_of_employee_present\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Name of chief executive<input type=\"text\" placeholder=\"eg.name of chief executive\" ng-model=\"Site.site.name_of_chief_executive\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Company sign present<input type=\"text\" placeholder=\"eg.company sign present\" ng-model=\"Site.site.company_sign_present\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Director<input type=\"text\" placeholder=\"eg.director\" ng-model=\"Site.site.director\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Computers<input type=\"text\" placeholder=\"eg.computers\" ng-model=\"Site.site.computers\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Tables<input type=\"text\" placeholder=\"eg.tables\" ng-model=\"Site.site.tables\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Chairs<input type=\"text\" placeholder=\"eg.Chairs\" ng-model=\"Site.site.chairs\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Approx<input type=\"text\" placeholder=\"eg.approx\" ng-model=\"Site.site.approx\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Area<input type=\"text\" placeholder=\"eg.area\" ng-model=\"Site.site.area\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Approx<input type=\"text\" placeholder=\"eg.approx\" ng-model=\"Site.site.approx\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Employee awareness<input type=\"text\" placeholder=\"eg.employee_awareness\" ng-model=\"Site.site.employee_awareness\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Neighbours name<input type=\"text\" placeholder=\"eg.neighbours_name\" ng-model=\"Site.site.neighbours_name\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Designation<select ng-options=\"item.id as item.name for item in Site.Designation\" ng-model=\"Site.site.designation_id\" class=\"form form-control\"></select></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Remarks<input type=\"text\" placeholder=\"eg.remarks\" ng-model=\"Site.site.remarks\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Comment<input type=\"text\" placeholder=\"eg.comment\" ng-model=\"Site.site.comment\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Concern person<input type=\"text\" placeholder=\"eg.concern_person\" ng-model=\"Site.site.concern_person\" class=\"form form-control\"/></label></div></div></div><div class=\"line line-dashed b-b line-lg pull-in\"><div class=\"row\"><div class=\"col-md-12 col-sm-12 col-xs-12\"><label class=\"col-xs-12 input-group\">Company name<input type=\"text\" placeholder=\"eg.company_name\" ng-model=\"Site.site.company_name\" class=\"form form-control\"/></label></div></div><button type=\"submit\" ng-disabled=\"form.$invalid\" class=\"btn btn-primary pull-left\"><i class=\"fa fa-upload\"></i>&nbsp;&nbsp;Submit</button></div></div><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'name of company\'  ng-model=\'Site.site.name_of_company\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'address\'  ng-model=\'Site.site.address\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'telephone\' ng-model=\'Site.site.telephone\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'fax no\'  ng-model=\'Site.site.fax_no\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'email\' placeholder=\'email\'   ng-model=\'Site.site.email_id\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'website\' ng-model=\'Site.site.website\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'total no of employees\' ng-model=\'Site.site.total_no_of_employees\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'name of employees\' ng-model=\'Site.site.name_of_employees\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'no_of_employee_present\' ng-model=\'Site.site.no_of_employee_present\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'name of chief executive\' ng-model=\'Site.site.name_of_chief_executive\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'director\' ng-model=\'Site.site.director\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'company sign present\' ng-model=\'Site.site.company_sign_present\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'computers\' ng-model=\'Site.site.computers\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'tables\' ng-model=\'Site.site.tables\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'chairs\' ng-model=\'Site.site.chairs\' required)--><!--  ////.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'approx\' ng-model=\'Site.site.approx\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'area\' ng-model=\'Site.site.area\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'employee awareness\' ng-model=\'Site.site.employee_awareness\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'neighbours name\' ng-model=\'Site.site.neighbours_name\' required)--><!--  //.list-group-item: select.form-control.no-border(type=\'text\' placeholder=\'designation id\' ng-options=\'item.id as item.name for item in Site.Designation\'  ng-model=\'Site.site.designation_id\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'remarks\' ng-model=\'Site.site.remarks\' required)--><!--  //.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'comment\' ng-model=\'Site.site.comment\' required)--><!--  .list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'concern_person\' ng-model=\'Site.site.concern_person\' required)--><!--  .list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'company_name\' ng-model=\'Site.site.company_name\' required)-->\n\n\n\n\n</form></div></div></div></div>");
$templateCache.put("app/routes/view/view.html","<div class=\"container\"><div class=\"panel-heading\"><p><h4 style=\"color:#1750a9\" title=\"{{View.Case.name}}\" class=\"text-ellipsis\">{{View.Case.name}}</h4></p></div><ul ng-show=\"View.Case.CaseAddressVerifications.length&gt;0\" class=\"list-group\"><div class=\"panel panel-info\"><div class=\"panel-heading\">Visiting address</div><div class=\"panel-body\">{{View.Case.CaseAddressVerifications[0].visiting_address}}</div></div><div class=\"panel panel-info\"><div class=\"panel-heading\">Visiting person name</div><div class=\"panel-body\">{{View.Case.CaseAddressVerifications[0].visiting_person_name}}</div></div><div class=\"panel panel-info\"><div class=\"panel-heading\">Relation with candidate</div><div class=\"panel-body\">{{View.Case.CaseAddressVerifications[0].relation_with_candidate}}</div></div><div class=\"panel panel-info\"><div class=\"panel-heading\">File</div><div class=\"panel-body\">{{View.Case.CaseAddressVerifications[0].image}}</div></div><div class=\"panel panel-info\"><div class=\"panel-heading\">House Type</div><div class=\"panel-body\">{{View.Case.CaseAddressVerifications[0].HouseType.name}}</div></div><div style=\"color:#383f44\" class=\"panel panel-info\"><div class=\"panel-heading\">Years of staying</div><div class=\"panel-body\">{{View.Case.CaseAddressVerifications[0].years_of_staying}}</div></div><!-- criminal //--></ul><ul ng-show=\"View.Case.CaseCriminalVerifications.length&gt;0\" class=\"list-group\"><div class=\"panel panel-warning\"><div class=\"panel-heading\">Police Station Name</div><div class=\"panel-body\">{{View.Case.CaseCriminalVerifications[0].police_station_name}}</div></div><div class=\"panel panel-warning\"><div class=\"panel-heading\">Police Authority Name</div><div class=\"panel-body\">{{View.Case.CaseCriminalVerifications[0].police_authority_name}}</div></div><div class=\"panel panel-warning\"><div class=\"panel-heading\">Remark</div><div class=\"panel-body\">{{View.Case.CaseCriminalVerifications[0].remark}}</div></div><div class=\"panel panel-warning\"><div class=\"panel-heading\">Date Of Birth</div><div class=\"panel-body\">{{View.Case.CaseCriminalVerifications[0].dob}}</div></div><div class=\"panel panel-warning\"><div class=\"panel-heading\">Father\'s Name</div><div class=\"panel-body\">{{View.Case.CaseCriminalVerifications[0].father_name}}</div></div><div class=\"panel panel-warning\"><div class=\"panel-heading\">Designation</div><div class=\"panel-body\">{{View.Case.CaseCriminalVerifications[0].Designation.name}}</div></div><!-- education //--></ul><ul ng-show=\"View.Case.CaseEducationVerifications.length&gt;0\" class=\"list-group\"><div class=\"panel panel-success\"><div class=\"panel-heading\">Degree</div><div class=\"panel-body\">{{View.Case.CaseEducationVerifications[0].Degree.name}}</div></div><div class=\"panel panel-success\"><div class=\"panel-heading\">Role no</div><div class=\"panel-body\">{{View.Case.CaseEducationVerifications[0].role_no}}</div></div><div class=\"panel panel-success\"><div class=\"panel-heading\">Passing year</div><div class=\"panel-body\">{{View.Case.CaseEducationVerifications[0].passing_year}}</div></div><div class=\"panel panel-success\"><div class=\"panel-heading\">Verifier\'s Name</div><div class=\"panel-body\">{{View.Case.CaseEducationVerifications[0].verifier_name}}</div></div><div class=\"panel panel-success\"><div class=\"panel-heading\">Designation</div><div class=\"panel-body\">{{View.Case.CaseEducationVerifications[0].Designation.name}}</div></div><div class=\"panel panel-success\"><div class=\"panel-heading\">University name</div><div class=\"panel-body\">{{View.Case.CaseEducationVerifications[0].university_name_id}}</div></div><div class=\"panel panel-success\"><div class=\"panel-heading\">Remarks</div><div class=\"panel-body\">{{View.Case.CaseEducationVerifications[0].remarks}}</div></div><!-- Site//--></ul><ul ng-show=\"View.Case.CaseSiteVerifications.length&gt;0\" class=\"list-group\"><div class=\"panel panel-danger\"><div class=\"panel-heading\">Company Name</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].company_name}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Company Address</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].address}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Phone no</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].telephone}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Fax no</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].fax_no}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Email id</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].email_id}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Website</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].website}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Name of chief executive</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].name_of_chief_executive}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Director</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].director}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Company sign present</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].company_sign_present}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Computers present</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].computers}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Tables present</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].tables}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Chairs present</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].chairs}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Approx</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].approx}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Area</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].area}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Employee Awareness</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].employee_awareness}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Neighbours name</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].neighbours_name}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Designation</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].Designation.name}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Remarks</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].remarks}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Comment</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].comment}}</div></div><div class=\"panel panel-danger\"><div class=\"panel-heading\">Concern Person</div><div class=\"panel-body\">{{View.Case.CaseSiteVerifications[0].concern_person}}</div></div><!--p--><!--  i.fa.fa-briefcase(ng-show=\"View.Case.CaseSiteVerifications.length>0\"style=\"color:#383f44\")--><!--    | Total no of employees;{{View.Case.CaseSiteVerifications[0].total_no _of_employees}}--><!--p--><!--  i.fa.fa-briefcase(ng-show=\"View.Case.CaseSiteVerifications.length>0\"style=\"color:#383f44\")--><!--    | Name of employees;{{View.Case.CaseSiteVerifications[0].name_of employees}}--><!--p--><!--  i.fa.fa-briefcase(ng-show=\"length>=0\"style=\"color:#383f44\")--><!--    | &nbsp;{{View.phone}}-->\n\n</ul></div>");}]);