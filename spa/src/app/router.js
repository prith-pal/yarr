var sitemap = [
  {
    routes: ['/'],
    redirect: '/area1'
  },
  {
    routes: ['/area1'],
    handler: require('areas/area1/area1')
  },
  {
    routes: ['/area2'],
    handler: require('areas/area2/area2')
  }
];

var Router = React.createClass({
  getInitialState() {
    return {
      component: null
    }
  },

  componentDidMount() {
    let self = this,
      pathRoot = "/dashboard";
    _.each(sitemap, (area) => {
      _.each(area.routes, (route) => {
        let routeNormalized = pathRoot + route;
        
        page(routeNormalized, (ctx, next) => {

          if(area.redirect) {
            console.log("redirecting to ", area.redirect)
            setTimeout( () => {
              page(pathRoot + area.redirect);
            }, 10)
            
          } else {
            console.log("Setting handler", area.handler.displayName)
            self.setState({
              component: area.handler
            });
          }
            
        })
      })
    });
    page.start();
  },

  render() {
    let Component = this.state.component;
    if(!Component)
      return null;
    return <Component/>
  }
})

module.exports = Router;
