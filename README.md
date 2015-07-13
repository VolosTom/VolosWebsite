# FrontEnd
Installation Guide
==================

NW.JS
-----




Angular Documentation Guide
===========================

The AngularJS project uses a form of [jsdoc](http://usejsdoc.org/) for all of its documentation.

This means that all the docs are stored inline in the source code and so are kept in sync as the code changes.

It also means that since we generate the documentation from the source code, we can easily provide version-specific documentation by simply checking out a version of AngularJS and running the build.

## Using `ngdoc`
The flavour of jsdoc used by AngularJS is called ngdoc and is parsed by a Node.js utility called [Dgeni](https://github.com/angular/dgeni).  The documentation is best built using grunt:

```
grunt package
```

This will generate all the AngularJS distribution files and also the documentation.  Look for them inside `/build/docs`.

*Note: ngdoc and its processing utility is only related to the documentation of the AngularJS project and is not part of the AngularJS distribution JavaScript files.*

### Standard supported jsdoc directives
The ngdoc utility has basic support for many of the standard jsdoc directives.  But in particular it is
interested in the following directives:

* `@name name` - the name of the ngdoc document
* `@param {type} name description` - describes a parameter of a function
* `@returns {type} description` - describes what a function returns
* `@requires` - normally indicates that a JavaScript module is required; in an Angular service it is used to describe what other services this service relies on
* `@property` - describes a property of an object
* `@description` - used to provide a description of a component in markdown
* `@link` - specifies a link to a URL or a type in the API reference. **NOTE**: to link to `ng.$rootScope.Scope#$on` insert `methods_` between `#` and the actual method name: `{@link ng.$rootScope.Scope#methods_$on listen}`. Same goes for properties and events.
* `@example` - specifies an example that will be formatted as a code block
* `@deprecated` - specifies that the following code is deprecated and should not be used
* `@this` - specifies what `this` refers to in the context of a documented function


The `type` must be wrapped in `{}` curly braces; e.g. {Object|Array}
Parameters can be made optional by putting the `[name]` in square brackets; e.g. `@param {boolean} [ownPropsOnly=false]`
Descriptions can contain markdown formatting

### AngularJS specific ngdoc directives

*Note: This section is a bit outdated. More up-to-date information can be found in [the Dgeni project](https://github.com/angular/dgeni-packages/blob/master/NOTES.md).*

In addition to the standard jsdoc directives, there are a number that are specific to the Angular
code-base:

* `@ngdoc` - specifies the type of thing being documented. See below for more detail.
* `@scope` - specifies that the documented directive will create a new scope
* `@priority` - specifies the documented directive's priority
* `@animations` - specifies the animations that the documented directive supports
* `@restrict` - specifies how directives should be shown in the usage section. For example, for [E]lement, [A]ttribute, and [C]lass, use `@restrict ECA`
* `@methodOf type` - links a method to the object/service where it is defined
* `@propertyOf type` - links a property to the object/service where it is defined
* `@eventOf type` - links a method to the object/service where it is defined
* `@eventType emit|broadcast` - specifies whether the event is emitted or broadcast

### The `@ngdoc` Directive
This directive helps to specify the template used to render the item being documented.  For instance,
a directive would have different properties to a filter and so would be documented differently.  The
commonly used types are:

* `overview` - Give an overview of the file/module being documented
* `interface` - Describe the interface of an object or service, specified by the `@name` directive.   *(abstract: use `@object` or `@service` instead)*
  * `service` - Describe an AngularJS service, such as `$compile` or `$http`, for instance.
  * `object` - Describe a well defined object (often exposed as a service)
    * `function` - Describe a function that will be available to other methods *(such as a helper function within the ng module)*
    * `method` - Describe a method on an object/service
    * `property` - Describe a property on an object/service
    * `event` - Describe an AngularJS event that will propagate through the `$scope` tree.
* `directive` - Describe an AngularJS  directive
* `filter` - Describe an AngularJS filter
* `inputType` - Describe a specific type of AngularJS input directive (such as `text`, `email` or `checkbox`)
* `error` - Describe a minErr error message

In addition there is support for the following `@ngdoc` types. But they do not seem to appear in the 
current documentation:
* `parameters`
* `returns`
* `this`
* `directiveInfo`

## Code blocks
In line code can be specified by enclosing the code in back-ticks (\`).
A block of multi-line code can be enclosed in triple back-ticks (\`\`\`) but it is formatted better if
it is enclosed in &lt;pre&gt;...&lt;/pre&gt; tags and the code lines themselves are indented.

## Writing examples and e2e scenarios
It is possible to embed examples in the documentation along with appropriate e2e scenarios.  These
examples and scenarios will be converted to runnable code within the documentation.  So it is important
that they work correctly.  To ensure this, all these e2e scenarios are run as part of the automated test
tasks in Travis and the CI server.

In the documentation you find two different methods for specifying a runnable example: using an `<example>` tag or using a `<doc:example>` tag.

### `<example>` tag
This tag identifies a block of HTML that will define a runnable example can take the following attributes:

* `module` - specify an AngularJS module containing code that must be loaded to support this example.
* `animation` - if set to `true` then this example uses ngAnimations.

Within this tag we provide `<file>` tags that specify what files contain the example code.

```
<example module="..." deps="..." animation="true|false">
  ...
  <file src="..." tag="..." name="...">
    ... <docs tag="...">...</docs> ...
  </file>
  ...
</example>
```

### `<doc:example>` tag
This tag also identifies a block of HTML that will define a runnable example. In this case it will contain `<doc:source>` to specify the application code and `<doc:scenario>` to specify the e2e scenario test code.

```
<doc:example module="...">
  ...
  <doc:source>
    ...
    <script></script> <!-- Contents will be extracted into a script.js file -->
    ...
    <style></style> <!-- Contents will be extracted into a style.css file -->
    ...
  </doc:source>
  <doc:scenario>
    ...
  </doc:scenario>
</doc:example>
```


Angular Style Guide
===================

Controllers
-----------

* ControllerAs Syntax

```html
  <!-- avoid -->
  <div ng-controller="Customer">
      {{ name }}
  </div>
  ```

  ```html
  <!-- recommended -->
  <div ng-controller="Customer as customer">
      {{ customer.name }}
  </div>
  ```
  
  * Use getter/setter methods instead of variable
  
  ```javascript
  /* avoid */
  var app = angular.module('app');
  app.controller('SomeController', SomeController);

  function SomeController() { }
  ```

  ```javascript
  /* recommended */
  angular
      .module('app')
      .controller('SomeController', SomeController);

  function SomeController() { }
  ```
  
  * Set functions to variables, then define functions below (readability)
  
  ```javascript
  /* avoid */
  function Sessions() {
      var vm = this;

      vm.gotoSession = function() {
        /* ... */
      };
      vm.refresh = function() {
        /* ... */
      };
      vm.search = function() {
        /* ... */
      };
      vm.sessions = [];
      vm.title = 'Sessions';
  ```

  ```javascript
  /* recommended */
  function Sessions() {
      var vm = this;

      vm.gotoSession = gotoSession;
      vm.refresh = refresh;
      vm.search = search;
      vm.sessions = [];
      vm.title = 'Sessions';

      ////////////

      function gotoSession() {
        /* */
      }

      function refresh() {
        /* */
      }

      function search() {
        /* */
      }
  ```
  
  * Use variable for “this”, instead of $scope / don’t call methods on $scope
  
  ```javascript
  /* avoid */
  function Customer($scope) {
      $scope.name = {};
      $scope.sendMessage = function() { };
  }
  ```
  
  ```javascript
  /* avoid */
  function Customer() {
      this.name = {};
      this.sendMessage = function() { };
  }
  ```

  ```javascript
  /* recommended */
  function Customer() {
      var vm = this;
      vm.name = {};
      vm.sendMessage = function() { };
  }
  ```

* Make an array for injections / dependencies

  ```javascript
    /* recommended */
    angular
        .module('app')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['$location', '$routeParams', 'common', 'dataservice'];

    function Dashboard($location, $routeParams, common, dataservice) {
    }
    ```

Directives
----------

* One directive per file

```javascript
  /* avoid */
  /* directives.js */

  angular
      .module('app.widgets')

      /* order directive that is specific to the order module */
      .directive('orderCalendarRange', orderCalendarRange)

      /* sales directive that can be used anywhere across the sales app */
      .directive('salesCustomerInfo', salesCustomerInfo)

      /* spinner directive that can be used anywhere across apps */
      .directive('sharedSpinner', sharedSpinner);

  function orderCalendarRange() {
      /* implementation details */
  }

  function salesCustomerInfo() {
      /* implementation details */
  }

  function sharedSpinner() {
      /* implementation details */
  }
  ```

  ```javascript
  /* recommended */
  /* calendarRange.directive.js */

  /**
   * @desc order directive that is specific to the order module at a company named Acme
   * @example <div acme-order-calendar-range></div>
   */
  angular
      .module('sales.order')
      .directive('acmeOrderCalendarRange', orderCalendarRange);

  function orderCalendarRange() {
      /* implementation details */
  }
  ```

  ```javascript
  /* recommended */
  /* customerInfo.directive.js */

  /**
   * @desc sales directive that can be used anywhere across the sales app at a company named Acme
   * @example <div acme-sales-customer-info></div>
   */
  angular
      .module('sales.widgets')
      .directive('acmeSalesCustomerInfo', salesCustomerInfo);

  function salesCustomerInfo() {
      /* implementation details */
  }
  ```

  ```javascript
  /* recommended */
  /* spinner.directive.js */

  /**
   * @desc spinner directive that can be used anywhere across apps at a company named Acme
   * @example <div acme-shared-spinner></div>
   */
  angular
      .module('shared.widgets')
      .directive('acmeSharedSpinner', sharedSpinner);

  function sharedSpinner() {
      /* implementation details */
  }
  ```

Other
===================

```
	console.log(module)
	// load the service's module
	beforeEach(function () {

		module('Second.option')
	});

	// instantiate service
	var service;

```
