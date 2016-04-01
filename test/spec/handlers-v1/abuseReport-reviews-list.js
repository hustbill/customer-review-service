/*jshint expr:true */

var expect = require('chai').expect;
var async = require('async');
var mockery = require('mockery');
var util = require('util');

var assert = require('assert');
var superagent = require('superagent');
var status = require('http-status');
 
describe('http://localhost:8086/v1/reviews/21/comments/3/abuse-reports', function() {

  it('/list', function(done) {
    superagent.get('http://localhost:8086/v1/reviews/21/comments/3/abuse-reports').end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      var result = JSON.parse(res.text);
      console.log('result = ' + util.inspect(result));
     // assert.deepEqual({ user: 'test' }, result);
      done();
    });
  });

  
});


// Reference:  https://strongloop.com/strongblog/nodejs-testing-documenting-apis-mocha-acquit/


