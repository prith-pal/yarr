require('./layout.styl')

let NavLeft = React.createClass({
  getDefaultProps(){
    var links = [
      {
        name: 'area1',
        text: 'Area1',
        url: '/dashboard/area1',
        icon: 'fa fa-rocket'
      },
      {
        name: 'area2',
        text: 'Area2',
        url: '/dashboard/area2',
        icon: 'fa fa-space-shuttle'
      }
    ];
    return {links: links}
  },


  render() {
    return (
      <div id="nav-left">
        <div className="nav-header"><i className="fa fa-anchor"></i>YARR</div>
        <div className="nav-links">
          {_.map(this.props.links, (link, i) => {
            return (
              <a className={cs({"nav-link-container": true, active: link.name == this.props.navCurrent})} href={link.url} key={i}>
                <span className="nav-link"><i className={link.icon}/>{link.text}</span> 
              </a>
            )
          })}
        </div>
      </div>
    );
  }
});

let NavTop = React.createClass({
  render() {
    return (
      <div id="nav-top" className="clearfix">
        <div className="pull-right" id="nav-top-right-links">
          <div className="nav-top-right-link">
            <i className="fa fa-bolt " />
          </div>
          <div className="nav-top-right-link">
            <i className="fa fa-cog" />
          </div>
        </div>
      </div>
    );
  }
});

let Layout = React.createClass({
  render() {
    return (
      <div id="layout">
        <NavLeft {...this.props}/>
        <div id="content-prewrapper">
          <NavTop {...this.props}/>
          <div id="content-wrapper">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Layout;
