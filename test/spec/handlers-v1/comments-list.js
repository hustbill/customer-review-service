/*jshint expr:true */

var expect = require('chai').expect;
var async = require('async');
var mockery = require('mockery');
var util = require('util');

var assert = require('assert');
var superagent = require('superagent');
var status = require('http-status');
 
describe('handlers/v1/reviews/20/comments', function() {

  it('/list', function(done) {
    superagent.get('http://localhost:8086/v1/reviews/20/comments/').end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      var result = JSON.parse(res.text);
      console.log('result = ' + util.inspect(result));
     // assert.deepEqual({ user: 'test' }, result);
      done();
    });
  });
 
  it('returns 404 if comment is not found', function(done) {
     superagent.get('http://localhost:8086/v1/reviews/39/comments/').end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.NOT_FOUND);
      var result = JSON.parse(res.text);
      assert.deepEqual({ error: 'Not Found' }, result);
      done();
    });
  });
  
});


// Reference:  https://strongloop.com/strongblog/nodejs-testing-documenting-apis-mocha-acquit/

