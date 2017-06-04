import {Meteor} from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';
import {Links} from '../imports/collections/links';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor
    .publish('links', function () {
      return Links.find({});
    })
});

// Executed whenever a user visits with a route like localhost:300/xxxx
function onRoute(req, res, next) {
  const link = Links.findOne({token: req.params.token});

  if (link) {
    Links.update(link, { $inc: { clicks: 1} });
    res.writeHead(307, {'Location': link.url});
    res.end();
  } else {
    next();
  }
}

const middleware = ConnectRoute(function (router) {
  router.get('/:token', onRoute);
})

WebApp
  .connectHandlers
  .use(middleware);