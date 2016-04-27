Review-Service
==============

Review-Service is a Node.js application that provides for product reviews, event reviews, and so on


# Fetch and Setup

    cd $HOME/git
    git clone git@github.com:hustbill/customer-review-service.git
    cd customer-review-service
    make
    

# Start and stop using [pm2](https://github.com/Unitech/PM2)
    mkdir -p /etc/pm2
    cp pm2_config.json.sample pm2_config.json
    # edit review-service.json file, change `script` and `run_as_user` properties:
    # `script` is the absolute path of the `server.js` file.
    # `run_as_user` is the user you want to run the service as. You can use your login user.
    # make sure `error_file` and `out_file` are created and `run_as_user` has permission to write then.
    pm2 start pm2_config.json    # start the service
    pm2 stop|restart|reload|delete review-service

# Setup if not using pm2
    cd $HOME/git/review-service
    npm install     # install dependent modules
    cp config.json.production config.json   # create the config file
    node index.js | ./node_modules/bunyan/bin/bunyan
