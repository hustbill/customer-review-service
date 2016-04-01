/*jshint expr:true */

var expect = require('chai').expect;
var async = require('async');
var mockery = require('mockery');
var util = require('util');

var assert = require('assert');
var superagent = require('superagent');
var status = require('http-status');
 
describe('handlers/v1/reviews', function() {

  it('/post', function(done) {
    superagent.post('http://localhost:8086/v1/reviews')
    .set('Accept', 'application/json')
    .set('x-client-id', 'ZlnElLNFjFt6pOBAOQpH8e')
    
    .send({ 
          "code": "240",
          "company-code": "101",
          "review-type": "product",
          "review-type-id": 12,
          "body-html": "data.bodyHtml444",
          "body": "data.body22222",
          "user-id": 13,
          "like-count": 22,
          "star-rating": 5,
          "active": true
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


