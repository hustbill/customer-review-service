#!/bin/bash

./node_modules/mocha/bin/mocha -R spec -t 120000 ./test/spec/routes/listReviewRouteTest.js
