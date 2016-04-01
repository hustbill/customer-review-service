/*jshint expr:true */

var expect = require('chai').expect;
var async = require('async');
var mockery = require('mockery');
var util = require('util');

var assert = require('assert');
var superagent = require('superagent');
var status = require('http-status');
 
describe('handlers/v1/reviews/21/3/replies', function() {

  it('/post', function(done) {
    superagent.post('http://localhost:8086/v1/reviews/21/3/replies')
    
    .send({ 
        "review-comment-id": 3,
          "company-code": "101",
          "body-html": "data.bodyHtml2222",
          "body": "data.body",
          "user-id": 13
    })
    .end(function(err, res) {
       
      assert.ifError(err);
      assert.equal(res.status, status.CREATED);
      var result = JSON.parse(res.text);
      console.log('result = ' + util.inspect(result));
     // assert.deepEqual({ user: 'test' }, result);
      done();
    });
  });

});


// Reference:  https://strongloop.com/strongblog/nodejs-testing-documenting-apis-mocha-acquit/


