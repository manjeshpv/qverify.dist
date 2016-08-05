"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}angular.module("appApp",["appApp.constants","ngCookies","ngResource","ngSanitize","ui.router","ui.bootstrap","restangular","ngAnimate","toaster","naif.base64","angular-oauth2"]).config(["$urlRouterProvider","$locationProvider","RestangularProvider","OAuthProvider","OAuthTokenProvider",function(e,t,n,o,a){var i={QVERIFY_API:"http://app.qverify.dev/api",QVERIFY_SERVER:"http://app.qverify.dev"};switch(window.location.host){case"app.qverify.com":i={QVERIFY_API:"https://app.qverify.com/api",QVERIFY_SERVER:"https://app.qverify.com"};break;case"staging-app.qverify.com":i={QVERIFY_API:"https://staging-app.qverify.com/api",QVERIFY_SERVER:"https://staging-app.qverify.com"}}a.configure({name:"token",options:{secure:!1,path:"/"}}),o.configure({baseUrl:i.QVERIFY_SERVER,clientId:"accounts",clientSecret:"accountssecret",grantPath:"/oauth/token"}),n.setBaseUrl(i.QVERIFY_API),e.otherwise("/"),t.html5Mode(!0)}]),angular.module("appApp.util",[]),function(e,t){e.module("appApp.constants",[]).constant("appConfig",{userRoles:["guest","user","admin"]})}(angular),angular.module("appApp").service("QverifyConnection",["$q","Restangular",function(e,t){function n(){}return n.prototype.fetchCases=function(){var n=e.defer();return t.all("cases").getList().then(function(e){n.resolve(e)})["catch"](function(e){n.reject(e)}),n.promise},n.prototype.fetchClient=function(){var n=e.defer();return t.all("users/client").getList().then(function(e){n.resolve(e)})["catch"](function(e){n.reject(e)}),n.promise},n.prototype.fetchVendor=function(){var n=e.defer();return t.all("users/vendor").getList().then(function(e){n.resolve(e)})["catch"](function(e){n.reject(e)}),n.promise},n.prototype.fetchCaseTypes=function(){var n=e.defer();return t.all("case_types").getList().then(function(e){n.resolve(e)})["catch"](function(e){n.reject(e)}),n.promise},n.prototype.fetchUserType=function(){var n=e.defer();return t.all("user_types").getList().then(function(e){n.resolve(e)})["catch"](function(e){n.reject(e)}),n.promise},n.prototype.fetchHouseType=function(){var n=e.defer();return t.all("house_types").getList().then(function(e){n.resolve(e)})["catch"](function(e){n.reject(e)}),n.promise},n.prototype.fetchDegree=function(){var n=e.defer();return t.all("degrees").getList().then(function(e){n.resolve(e)})["catch"](function(e){n.reject(e)}),n.promise},n.prototype.fetchDesignation=function(){var n=e.defer();return t.all("designations").getList().then(function(e){n.resolve(e)})["catch"](function(e){n.reject(e)}),n.promise},n.prototype.fetchUniversityName=function(){var n=e.defer();return t.all("university_names").getList().then(function(e){n.resolve(e)})["catch"](function(e){n.reject(e)}),n.promise},n.prototype.fetchStatus=function(){var n=e.defer();return t.all("status").getList().then(function(e){n.resolve(e)})["catch"](function(e){n.reject(e)}),n.promise},n.prototype.createCase=function(n){var o=e.defer();return t.all("cases").post(n).then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.login=function(n,o){var a=e.defer();return t.all("open/users/login").post({username:n,password:o}).then(function(e){OAuthToken.setToken(JSON.parse(e)),Auth.setSessionData(),a.resolve(data)})["catch"](function(e){a.reject(e)}),a.promise},n.prototype.register=function(n){var o=e.defer();return t.all("open/users/register").post(n).then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.createAddress=function(n){var o=e.defer();return t.all("case_address_verifications").post(n).then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.fetchAddress=function(n){var o=e.defer();return t.all("case_address_verifications").get().then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.createCriminal=function(n){var o=e.defer();return t.all("case_criminal_verifications").post(n).then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.fetchCriminal=function(n){var o=e.defer();return t.all("case_criminal_verifications").get().then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.createEducation=function(n){var o=e.defer();return t.all("case_education_verifications").post(n).then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.fetchEducation=function(n){var o=e.defer();return t.all("case_criminal_verifications").get().then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.createSite=function(n){var o=e.defer();return t.all("case_site_verifications").post(n).then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.fetchSite=function(n){var o=e.defer();return t.all("case_site_verifications").get().then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.company=function(n){console.log(n);var o=e.defer();return t.all("companys").post(n).then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.createAllocation=function(n){var o=e.defer();return t.all("allocations").post(n).then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.fetchLocation=function(n){var o=e.defer();return t.all("locations").getList().then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.fetchAllocationByStatus=function(n){var o=e.defer();return t.all("allocations").one("status",n).getList().then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.fetchAllocation=function(n){var o=e.defer();return t.all("allocations").getList().then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.fetchCase=function(n){var o=e.defer();return t.one("cases",n).get().then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.fetchCompany=function(n){var o=e.defer();return t.all("companys/").getList().then(function(e){o.resolve(e)})["catch"](function(e){o.reject(e)}),o.promise},n.prototype.fetchVendorUploadedCases=function(){var n=e.defer();return t.all("allocations/").getList().then(function(e){n.resolve(e)})["catch"](function(e){n.reject(e)}),n.promise},n}]),angular.module("appApp").factory("URLS",function(){var e={QVERIFY_API:"http://app.qverify.dev/api",QVERIFY_SERVER:"http://app.qverify.dev"};switch(window.location.host){case"app.qverify.com":e={QVERIFY_API:"https://app.qverify.com/api",QVERIFY_SERVER:"https://app.qverify.com"};break;case"staging-app.qverify.com":e={QVERIFY_API:"https://staging-app.qverify.com/api",QVERIFY_SERVER:"https://staging-app.qverify.com"}}return e}),angular.module("appApp").factory("Auth",["$log","$http","$q","Session","URLS","OAuthToken",function(e,t,n,o,a,i){var r={},s="Auth.js",l=!1;return r.login=function(r){var l=a.QVERIFY_API+"/third-party/quezx/login";return t.post(l,r,{ignoreAuthModule:!0}).then(function(e){return i.setToken(JSON.parse(e.data)),o.create("oauth",e.data)})["catch"](function(t){return e.log(s,"err",t.data),o.destroy(),n.reject(t.data)})},r.refreshToken=function(){if(l)return e.warn(s,"Refresh token request already sent."),n.reject({warning:"Refresh token request already sent."});l=!0;var i=a.QVERIFY_API+"/third-party/quezx/refresh";return t.post(i,{refresh_token:o.read("oauth").refresh_token},{ignoreAuthModule:!0}).then(function(e){return o.create("oauth",e.data),l=!1,n.resolve(e)})["catch"](function(e){return l=!1,n.reject(e)})},r.logout=function(){var e=a.QVERIFY_API+"/third-party/quezx/logout";return t.post(e,{access_token:o.getAccessToken()}).then(function(e){return o.destroy(),e.data},function(e){return o.destroy(),n.reject(e.data)})},r.setSessionData=function(){return n.all([t.get(a.QVERIFY_API+"/users/me").then(function(e){o.create("userinfo",e.data)})])},r}]),angular.module("appApp").factory("Session",["$window",function(e){var t={};return t.create=function(t,n){e.localStorage[t]=angular.toJson(n)},t.read=function(t){return angular.fromJson(e.localStorage[t])},t.destroy=function(){e.localStorage.clear()},t.isAuthenticated=function(){return!(!t.read("oauth")||!t.read("oauth").access_token)},t.getAccessToken=function(){return t.read("oauth")&&t.read("oauth").access_token},t.isAuthorized=function(e){var n=e;return angular.isArray(n)||(n=[].push(n)),t.isAuthenticated()&&~n.indexOf(t.userRole)},t}]),function(){var e=function t(){_classCallCheck(this,t)};angular.module("appApp").component("main",{templateUrl:"app/main/main.html",controller:e})}(),angular.module("appApp").config(["$stateProvider",function(e){e.state("main",{url:"/",template:"<main></main>"})}]),function(){function e(e,t,n,o){var a=this,i=new t;i.fetchHouseType().then(function(e){a.HouseType=e}),a.createAddress=function(){a.address.case_id=o.case_id,i.createAddress(a.address)}}e.$inject=["$log","QverifyConnection","toaster","$stateParams"],angular.module("appApp").component("address",{templateUrl:"app/routes/address/address.html",controller:e,controllerAs:"Address"})}(),angular.module("appApp").config(["$stateProvider",function(e){e.state("address",{url:"/case/:case_id/address",template:"<address></address>"})}]),function(){function e(e,t){var n=this,o=new e;o.fetchVendor().then(function(e){n.Vendor=e}),o.fetchCases().then(function(e){n.Case=e}),n.create=function(){console.log(n.allocation),o.createAllocation(n.allocation).then(function(e){}),t.pop("success","Allocated")}}e.$inject=["QverifyConnection","toaster"],angular.module("appApp").component("allocation",{templateUrl:"app/routes/allocation/allocation.html",controller:e,controllerAs:"Allocation"})}(),angular.module("appApp").config(["$stateProvider",function(e){e.state("allocation",{url:"/allocation",template:"<allocation></allocation>"})}]),function(){function e(e,t,n,o,a){var i="CandidateComponent",r=this;console.log(i,n.case_id);var s=new t;s.fetchCase(n.case_id).then(function(e){r.Case=e}),r.openCase=function(){switch(r.Case.case_type_id){case 1:o.go("address",{case_id:n.case_id});break;case 2:o.go("criminal",{case_id:n.case_id});break;case 3:o.go("education",{case_id:n.case_id});break;case 4:o.go("site",{case_id:n.case_id})}},r.updateStatus=function(e){a.one("cases",n.case_id).put({status_id:e}).then(function(e){console.log("Request successful")})["catch"](function(e){console.log("Request failed")})}}e.$inject=["$log","QverifyConnection","$stateParams","$state","Restangular"],angular.module("appApp").component("candidate",{templateUrl:"app/routes/candidate/candidate.html",controller:e,controllerAs:"Candidate"})}(),angular.module("appApp").config(["$stateProvider",function(e){e.state("candidate",{url:"/candidate/:case_id",template:"<candidate></candidate>"})}]),function(){function e(e,t){console.log("here");var n=this,o=new e;n.createCompany=function(e){o.company(e).then(function(e){for(var o=0;o<n.Location.length;o++)if(n.Location[o].id==e.location_id){t.pop("success","Company Created",e.name+","+e.address+","+n.Location[o].name);break}void 0==e&&alert("Incorrect"),console.log(e.plain())})["catch"](function(e){console.log(e)});n.create=function(){o.createCompany(n.company)}},o.fetchLocation().then(function(e){n.Location=e}),o.fetchUserType().then(function(e){n.UserType=e})}e.$inject=["QverifyConnection","toaster"],angular.module("appApp").component("company",{templateUrl:"app/routes/company/company.html",controller:e,controllerAs:"Company"})}(),angular.module("appApp").config(["$stateProvider",function(e){e.state("company",{url:"/company",template:"<company></company>"})}]),function(){function e(e,t,n){var o=this,a=new t;a.fetchClient().then(function(e){o.Client=e}),a.fetchCaseTypes().then(function(e){o.CaseTypes=e}),a.fetchDegree().then(function(e){o.Degree=e}),o.create=function(){a.createCase(o["case"]).then(function(e){return n.pop("success","Case Created")})["catch"](function(e){return n.pop("error",e.data?e.data.message:"Unexpected Error")})}}e.$inject=["$log","QverifyConnection","toaster"],angular.module("appApp").component("creation",{templateUrl:"app/routes/creation/creation.html",controller:e,controllerAs:"Creation"})}(),angular.module("appApp").config(["$stateProvider",function(e){e.state("creation",{url:"/creation",template:"<creation></creation>"})}]),function(){function e(e,t,n,o){var a=this,i=new n;i.fetchDesignation().then(function(e){a.Designation=e}),i.fetchStatus().then(function(e){a.Status=e}),a.createCriminal=function(){a.criminal.case_id=t.case_id,console.log(a.criminal.dob),i.createCriminal(a.criminal)}}e.$inject=["$log","$stateParams","QverifyConnection","toaster"],angular.module("appApp").component("criminal",{templateUrl:"app/routes/criminal/criminal.html",controller:e,controllerAs:"Criminal"})}(),angular.module("appApp").config(["$stateProvider",function(e){e.state("criminal",{url:"/case/:case_id/criminal",template:"<criminal></criminal>"})}]),function(){var e=function t(){_classCallCheck(this,t),this.message="Hello"};angular.module("appApp").component("dashboard",{templateUrl:"app/routes/dashboard/dashboard.html",controller:e,controllerAs:"Dashboard"})}(),angular.module("appApp").config(["$stateProvider",function(e){e.state("dashboard",{url:"/dashboard",template:"<dashboard></dashboard>"})}]),function(){function e(e,t,n,o){var a=this,i=new t;i.fetchDesignation().then(function(e){a.Designation=e}),i.fetchUniversityName().then(function(e){a.UniversityName=e}),i.fetchDegree().then(function(e){a.Degree=e}),a.createEducation=function(){a.education.case_id=o.case_id,i.createEducation(a.education)}}e.$inject=["$log","QverifyConnection","toaster","$stateParams"],angular.module("appApp").component("education",{templateUrl:"app/routes/education/education.html",controller:e,controllerAs:"Education"})}(),angular.module("appApp").config(["$stateProvider",function(e){e.state("education",{url:"/case/:case_id/education",template:"<education></education>"})}]),function(){function e(e,t,n,o,a){var i="LoginComponent",r=JSON.parse(localStorage.getItem("user"));void 0!=r&&(console.log(r),3===r.Company.user_type_id?t.go("partner"):t.go("overview"));var s=this;new e;s.user={username:"",password:""},s.login=function(e){console.log(e),n.all("open/users/login").post({username:e.username,password:e.password}).then(function(e){o.setToken(JSON.parse(e)),a.setSessionData().then(function(){var e=JSON.parse(localStorage.getItem("userinfo"));3===e.Company.user_type_id?t.go("partner"):t.go("overview")})})["catch"](function(e){console.log(i,e)})}}e.$inject=["QverifyConnection","$state","Restangular","OAuthToken","Auth"],angular.module("appApp").component("login",{templateUrl:"app/routes/login/login.html",controller:e,controllerAs:"Login"})}(),angular.module("appApp").config(["$stateProvider",function(e){e.state("login",{url:"/login",template:"<login></login>"})}]),function(){function e(e,t){var n=this,o=new t;o.fetchAllocation().then(function(e){n.Allocation=e})}e.$inject=["$log","QverifyConnection"],angular.module("appApp").component("overview",{templateUrl:"app/routes/overview/overview.html",controller:e,controllerAs:"Overview"})}(),angular.module("appApp").config(["$stateProvider",function(e){e.state("overview",{url:"/overview",template:"<overview></overview>"})}]),function(){function e(e,t){var n=this,o=new t;o.fetchAllocationByStatus(1).then(function(e){n.Allocation=e,console.log(n.Allocation)}),o.fetchAllocationByStatus(2).then(function(e){n.Allocated=e})}e.$inject=["$log","QverifyConnection"],angular.module("appApp").component("partner",{templateUrl:"app/routes/partner/partner.html",controller:e,controllerAs:"Partner"})}(),angular.module("appApp").config(["$stateProvider",function(e){e.state("partner",{url:"/partner",template:"<partner></partner>"})}]),function(){function e(e,t){var n=this,o=new e;n.register=function(e){o.register(e).then(function(e){console.log(e),t.pop("success","Registered",e.username+","+e.name+","+e.email_id+","+e.contact),void 0==e&&alert("Incorrect"),console.log(e.plain())})["catch"](function(e){console.log(e)})},o.fetchCompany().then(function(e){n.Company=e})}e.$inject=["QverifyConnection","toaster"],angular.module("appApp").component("register",{templateUrl:"app/routes/register/register.html",controller:e,controllerAs:"Register"})}(),angular.module("appApp").config(["$stateProvider",function(e){e.state("register",{url:"/register",template:"<register></register>"})}]),function(){function e(e,t,n,o){var a=this,i=new t;i.fetchDesignation().then(function(e){a.Designation=e}),a.createSite=function(){a.site.case_id=o.case_id,i.createSite(a.site)}}e.$inject=["$log","QverifyConnection","toaster","$stateParams"],angular.module("appApp").component("site",{templateUrl:"app/routes/site/site.html",controller:e,controllerAs:"Site"})}(),angular.module("appApp").config(["$stateProvider",function(e){e.state("site",{url:"/case/:case_id/site",template:"<site></site>"})}]),function(){function e(e,t,n){var o="ViewComponent",a=this;console.log(o,n.case_id);var i=new t;i.fetchCase(n.case_id).then(function(e){a.Case=e})}e.$inject=["$log","QverifyConnection","$stateParams"],angular.module("appApp").component("view",{templateUrl:"app/routes/view/view.html",controller:e,controllerAs:"View"})}(),angular.module("appApp").config(["$stateProvider",function(e){e.state("view",{url:"/view/:case_id",template:"<view></view>"})}]),angular.module("appApp").directive("footer",function(){return{templateUrl:"components/footer/footer.html",restrict:"E",link:function(e,t){t.addClass("footer")}}}),angular.module("appApp").factory("Modal",["$rootScope","$uibModal",function(e,t){function n(){var n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o=arguments.length<=1||void 0===arguments[1]?"modal-default":arguments[1],a=e.$new();return angular.extend(a,n),t.open({templateUrl:"components/modal/modal.html",windowClass:o,scope:a})}return{confirm:{"delete":function(){var e=arguments.length<=0||void 0===arguments[0]?angular.noop:arguments[0];return function(){var t,o=Array.prototype.slice.call(arguments),a=o.shift();t=n({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+a+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(e){t.close(e)}},{classes:"btn-default",text:"Cancel",click:function(e){t.dismiss(e)}}]}},"modal-danger"),t.result.then(function(t){e.apply(t,o)})}}}}}]);var NavbarController=function e(){_classCallCheck(this,e),this.menu=[{title:"Home",state:"main"}],this.isCollapsed=!0};angular.module("appApp").controller("NavbarController",NavbarController),angular.module("appApp").directive("navbar",function(){return{templateUrl:"components/navbar/navbar.html",restrict:"E",controller:"NavbarController",controllerAs:"nav"}}),function(){function e(e){var t={safeCb:function(e){return angular.isFunction(e)?e:angular.noop},urlParse:function(e){var t=document.createElement("a");return t.href=e,""===t.host&&(t.href=t.href),t},isSameOrigin:function(n,o){return n=t.urlParse(n),o=o&&[].concat(o)||[],o=o.map(t.urlParse),o.push(e.location),o=o.filter(function(e){return n.hostname===e.hostname&&n.port===e.port&&n.protocol===e.protocol}),o.length>=1}};return t}e.$inject=["$window"],angular.module("appApp.util").factory("Util",e)}(),angular.module("appApp").run(["$templateCache",function(e){e.put("app/main/main.html",""),e.put("components/footer/footer.html","<!--.container-->"),e.put("components/modal/modal.html",'<div class="modal-header"><button ng-if="modal.dismissable" type="button" ng-click="$dismiss()" class="close">&times;</button><h4 ng-if="modal.title" ng-bind="modal.title" class="modal-title"></h4></div><div class="modal-body"><p ng-if="modal.text" ng-bind="modal.text"></p><div ng-if="modal.html" ng-bind-html="modal.html"></div></div><div class="modal-footer"><button ng-repeat="button in modal.buttons" ng-class="button.classes" ng-click="button.click($event)" ng-bind="button.text" class="btn"></button></div>'),e.put("components/navbar/navbar.html","<!--div.navbar.navbar-default.navbar-static-top(ng-controller='NavbarController')--><!--  div.container--><!--    div.navbar-header--><!--      button.navbar-toggle(type='button', ng-click='nav.isCollapsed = !nav.isCollapsed')--><!--        span.sr-only Toggle navigation--><!--        span.icon-bar--><!--        span.icon-bar--><!--        span.icon-bar--><!--      a.navbar-brand(href='/') Partner--><!----><!--    div#navbar-main.navbar-collapse.collapse(uib-collapse='nav.isCollapsed')--><!--      ul.nav.navbar-nav--><!--        //li(ng-repeat='item in nav.menu', ui-sref-active='active')--><!--        //  a(ui-sref='{{item.state}}') {{item.title}}--><!--        li(ng-controller='LogoutController as logout')--><!--          a(ng-click='logout.init()') Logout-->"),e.put("app/routes/address/address.html",'<div ui-view="" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"><!--toaster-container(toaster-options="{\'time-out\': 1000, \'position-class\': \'toast-top-right\', \'close-button\':true, \'animation-class\': \'toast-top-right\'}")--><div style="padding-left:2px" class="m-t-xl padder no-margin"><div class="hbox"><div class="wrapper-md bg-light"><form name="form" ng-submit="Address.createAddress()" class="form-validation"><div class="list-group list-group-sm m-b-md"><div class="line line-dashed b-b line-lg pull-in"><div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><label class="col-xs-12 input-group">Visiting address<input type="text" placeholder="eg.Visiting address" ng-model="Address.address.visiting_address" class="form form-control"/></label></div></div></div><div class="line line-dashed b-b line-lg pull-in"><div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><label class="col-xs-12 input-group">Visiting person name<input type="text" placeholder="eg.Visiting person name" ng-model="Address.address.visiting_person_name" class="form form-control"/></label></div></div></div><div class="line line-dashed b-b line-lg pull-in"><div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><label class="col-xs-12 input-group">Relation with candidate<input type="text" placeholder="eg.Relation with candidate" ng-model="Address.address.relation_with_candidate" class="form form-control"/></label></div></div></div><div class="line line-dashed b-b line-lg pull-in"><div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><label class="col-xs-12 input-group">House types id<select type="text" placeholder="eg.House types id" ng-options="item.id as item.name for item in Address.HouseType" ng-model="Address.address.house_type_id" class="form form-control"></select></label></div></div></div><div class="line line-dashed b-b line-lg pull-in"><div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><label class="col-xs-12 input-group">years of staying<input type="text" placeholder="eg.years of staying" ng-model="Address.address.years_of_staying" class="form form-control"/></label></div></div></div><div class="line line-dashed b-b line-lg pull-in"><div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><label class="col-xs-12 input-group">image<input type="file" placeholder="eg.image" ng-model="Address.address.img" base-sixty-four-input="base-sixty-four-input" maxsize="10000" name="file" class="form form-control"/></label></div></div></div><div class="line line-dashed b-b line-lg pull-in"><div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><label class="col-xs-12 input-group">remarks<input type="text" placeholder="eg.Relation with candidate" ng-model="Address.address.remark" class="form form-control"/></label></div></div></div><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'visiting address\' ng-model=\'Address.address.visiting_address\' required)--><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'visiting person name\' ng-model=\'Address.address.visiting_person_name\' required)--><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'relation with candidate\' ng-model=\'Address.address.relation_with_candidate\' required)--><!--.list-group-item: select.form-control.no-border(type=\'text\' placeholder=\'house types id\' ng-options=\'item.id as item.name for item in Address.HouseType\' ng-model=\'Address.address.house_type_id\' required)--><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'years of staying\' ng-model=\'Address.address.years_of_staying\' required)--><!--.list-group-item: input.form-control.no-border(type=\'file\' placeholder=\'image\' ng-model=\'Address.address.img\' base-sixty-four-input maxsize="10000" name=\'file\' required)--><!--.list-group-item: input.form-control.no-border(type=\'text\' placeholder=\'remarks\' ng-model=\'Address.address.remark\' required)--><button type="submit" ng-disabled="form.$invalid" class="btn btn-primary pull-left"><i class="fa fa-upload"></i>&nbsp;&nbsp;Submit</button></div></form></div></div></div></div>'),e.put("app/routes/allocation/allocation.html",'<div class="dashboard-page"><div class="container-fluid"><div class="row"><div class="col-sm-3 col-md-2 sidebar"><div class="text-center"><h2 class="brand">Q Verify</h2><img src="images/11-256-6ac3f3b722.png"/><br/><a ui-sref="login" class="btn btn-white btn-outline btn-rounded btn-sm">Logout</a></div><ul class="nav nav-sidebar"><li ng-class="{active: $state.includes(\'overview\')}"><a ui-sref="overview">Overview<span class="sr-only">(current)</span></a></li><li ng-class="{active: $state.includes(\'company\')}"><a ui-sref="company">Company</a></li><li ng-class="{active: $state.includes(\'register\')}"><a ui-sref="register">Register</a></li><li ng-class="{active: $state.includes(\'allocation\')}"><a ui-sref="allocation">Allocation</a></li><li ng-class="{active: $state.includes(\'creation\')}"><a ui-sref="creation">Creation</a></li></ul></div><div ui-view="" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main"><toaster-container toaster-options="{\'time-out\': 1000, \'position-class\': \'toast-top-right\', \'close-button\':true, \'animation-class\': \'toast-top-right\'}"></toaster-container><div style="padding-left:200px ; padding-right:200px" class="m-t-xl padder no-margin"><div class="hbox"><div class="wrapper-md bg-light"><h1 class="m-n font-thin h3"><span>Case Allocation</span></h1><form name="AllocationDataForm" class="form-horizontal wrapper-md"><div class="row"><!-- Form Block--><div class="col-md-7 col-sm-7 col-xs-7"><!-- Form Items--><div class="line line-dashed b-b line-lg pull-in"><div class="row"><div class="col-md-6 col-sm-6 col-xs-12"><label class="col-xs-12 input-group">Case<select ng-options="item.id as item.name for item in Allocation.Case" ng-model="Allocation.allocation.cases_id" class="form form-control"></select></label></div></div></div><div class="line line-dashed b-b line-lg pull-in"><div class="row"><div class="col-md-6 col-sm-6 col-xs-12"><label class="col-xs-12 input-group">Vendor<select ng-options="item.id as item.name for item in Allocation.Vendor" ng-model="Allocation.allocation.user_id" class="form form-control"></select></label></div></div></div><div class="line line-dashed b-b line-lg pull-in"></div><div class="row"><div class="col-md-4 col-xs-12"><!--ng-disabled=\'AllocationDataForm.$invalid\'--><button type="submit" ng-click="Allocation.create()" class="btn btn-primary pull-left"><i class="fa fa-upload"></i>&nbsp;&nbsp;Submit</button></div></div></div></div></form></div></div></div></div></div></div></div>'),e.put("app/routes/candidate/candidate.html",'<div class="container"><div class="panel panel-default"><div class="panel-heading"><p><h4 style="color:#1750a9" title="{{Candidate.Case.name}}" class="text-ellipsis">{{Candidate.Case.name}}</h4></p></div><div class="panel-body"><ul class="list-group"><li style="color:#383f44" class="list-group-item"> Case Name = {{Candidate.Case.name}}</li><li style="color:#383f44" class="list-group-item"> Address = {{Candidate.Case.address}}</li><li style="color:#383f44" class="list-group-item"> Phone = {{Candidate.Case.phone}}</li><li style="color:#383f44" class="list-group-item"> Client = {{Candidate.Case.User.name}}</li></ul><!--p--><!--  i.fa.fa-bookmark(style="color:#383f44")--><!--    | &nbsp;&nbsp;{{Candidate.Case.name}}--><!--p--><!--  i.fa.fa-briefcase(style="color:#383f44")--><!--    | &nbsp;{{Candidate.Case.address}}--><!--p--><!--  i.fa.fa-briefcase(style="color:#383f44")--><!--    | &nbsp;{{Candidate.Case.phone}}--><!--p--><!--  i.fa.fa-briefcase(style="color:#383f44")--><!--    | &nbsp;{{Candidate.Case.User.name}}-->\n\n<div class="col-md-12"><div class="col-md-3 col-xs-4"><button type="submit" ng-click="Candidate.updateStatus(3)" class="btn btn-primary pull-right">Accept</button></div><div class="col-md-3 col-xs-4"><button type="submit" ng-click="Candidate.openCase()" class="btn btn-success pull-right">Upload</button></div><div class="col-md-3 col-xs-4"><button type="submit" ng-click="Candidate.updateStatus(5)" class="btn btn-danger pull-right">Reject</button></div></div></div></div></div>')}]);