riot.tag2('app', '<hn-header></hn-header> <route></route>', 'app,[data-is="app"]{ position: relative; display: block; padding-top: 56px; }', '', function(opts) {
    router.routes([
      new Router.Route({path: 'news/:page', tag: 'hn-list', api: {path: 'news'}}),
      new Router.Route({path: 'newest/:page', tag: 'hn-list', api: {path: 'newest'}}),
      new Router.Route({path: 'show/:page', tag: 'hn-list', api: {path: 'show'}}),
      new Router.Route({path: 'ask/:page', tag: 'hn-list', api: {path: 'ask'}}),
      new Router.Route({path: 'jobs/:page', tag: 'hn-list', api: {path: 'jobs'}}),
      new Router.Route({path: 'item/:id', tag: 'hn-item'}),
      new Router.Route({path: 'user/:id', tag: 'hn-user'}),

      new Router.RedirectRoute({from: '', to: 'news/1'})
    ])
    router.start()
});
riot.tag2('hn-comment', '<div class="by"> <a href="#user/{data.user}">{user}</a> <a href="#item/{data.id}">{time_ago}</a> </div> <div class="text"> <p each="{string, i in formatComment(data.content)}">{string}</p> </div> <div class="comments" if="{data.comments.length}"> <input type="checkbox" name="show-comments" value=""> <span class="comment-toggle"> <span>{data.comments.length} replies collapsed</span> </span> <hn-comment each="{data.comments}" data="{this}"></hn-comment> </div>', 'hn-comment,[data-is="hn-comment"]{ display: block; padding: 16px 0; margin-top: -8px; border-top: 1px solid #dedede; } hn-comment .by,[data-is="hn-comment"] .by{ margin-bottom: 8px; } hn-comment .comments,[data-is="hn-comment"] .comments{ position: relative; } hn-comment input[type=checkbox],[data-is="hn-comment"] input[type=checkbox]{ opacity: 0; width: 18px; height: 18px; top: 0; left: 0; margin: 0; position: absolute;; z-index: 2; cursor: pointer; } hn-comment .comment-toggle > span,[data-is="hn-comment"] .comment-toggle > span{ display: none; } hn-comment .comment-toggle:before,[data-is="hn-comment"] .comment-toggle:before{ content: \'[\\2013]\'; } hn-comment input[type=checkbox]:checked ~ .comment-toggle:before,[data-is="hn-comment"] input[type=checkbox]:checked ~ .comment-toggle:before{ content: \'[+]\'; } hn-comment input[type=checkbox]:checked ~ .comment-toggle > span,[data-is="hn-comment"] input[type=checkbox]:checked ~ .comment-toggle > span{ display: inline; } hn-comment input[type=checkbox]:checked ~ hn-comment,[data-is="hn-comment"] input[type=checkbox]:checked ~ hn-comment{ display: none; } hn-comment hn-comment { margin-left: 24px; }', '', function(opts) {
    this.data = opts.data || []

    this.unescapeHTML = function(input) {
      var doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent;
    }.bind(this)

    this.formatComment = function(input) {
      var self = this;
      var content = []
      var paragraphs = input.split(/<p>|<\/p>/)

      paragraphs.forEach(function(paragraph) {
        if (paragraph.length > 0) {
          content.push(self.unescapeHTML(paragraph))
        }
      })

      return content
    }.bind(this)
});
riot.tag2('hn-header', '<a href="#" class="nav-toggle" onclick="{showMenu}">Menu</a> <a href="http://riotjs.com" class="logo"><img src="http://riotjs.com/img/logo/riot120x.png" alt=""></a> <nav> <ul> <li each="{views}"> <a href="#{route}/1" class="{active : activeRoute == route}" onclick="{hideMenu}">{name}</a> </li> </ul> </nav> <a href="#" class="overlay" onclick="{hideMenu}"></a>', 'hn-header,[data-is="hn-header"]{ position: fixed; top: 0; left: 0; right: 0; height: 56px; display: flex; background: #e41e48; color: #fff; padding: 0 16px; z-index: 2; align-items: center; box-shadow: 0 3px 5px rgba(0,0,0,0.25); } hn-header .logo,[data-is="hn-header"] .logo{ display: flex; width: 60px; align-items: center; margin-right: 16px; } hn-header .logo > img,[data-is="hn-header"] .logo > img{ display: block; width: 100%; height: auto; box-shadow: 0 2px 5px rgba(0,0,0,0.25); } hn-header nav,[data-is="hn-header"] nav{ display: inline-block; height: 100%; } hn-header .overlay,[data-is="hn-header"] .overlay{ position: fixed; left: 0; top: 0; right: 0; bottom: 0; z-index: 2; background: rgba(0,0,0,0.65); opacity: 0; visibility: hidden; transition: all 0.25s ease; } hn-header .nav-toggle,[data-is="hn-header"] .nav-toggle{ width: 40px; height: 40px; font-size: 0; text-decoration: none; display: none; } hn-header .nav-toggle:after,[data-is="hn-header"] .nav-toggle:after{ content: \'\\02261\'; font-size: 48px; color: #fff; line-height: 0.7; } @media screen and (max-width: 650px) { hn-header,[data-is="hn-header"]{ justify-content: space-between; } hn-header .nav-toggle,[data-is="hn-header"] .nav-toggle{ display: block; } hn-header nav,[data-is="hn-header"] nav{ position: fixed; left: 0; z-index: 3; background: #e41e48; top: 0; bottom: 0; width: 160px; transform: translateX(-100%); transition: transform 0.25s ease; } hn-header.navigating nav,[data-is="hn-header"].navigating nav{ transform: translateX(0); } hn-header.navigating .overlay,[data-is="hn-header"].navigating .overlay{ visibility: visible; opacity: 1; } hn-header nav ul,[data-is="hn-header"] nav ul{ flex-direction: column; align-items: flex-start; } hn-header nav ul li,[data-is="hn-header"] nav ul li{ width: 100%; } hn-header nav ul li a,[data-is="hn-header"] nav ul li a{ justify-content: flex-start; } } hn-header ul,[data-is="hn-header"] ul{ list-style: none; margin: 0; padding: 0; display: flex; height: 100%; } hn-header ul li,[data-is="hn-header"] ul li{ display: inline-block; } hn-header ul li a,[data-is="hn-header"] ul li a{ display: flex; height: 100%; justify-content: center; align-items: center; padding: 16px; min-width: 80px; box-sizing: border-box; text-align: center; text-decoration: none; color: #fff; } hn-header ul li a:hover,[data-is="hn-header"] ul li a:hover{ text-decoration: underline; } hn-header ul li a.active,[data-is="hn-header"] ul li a.active{ border-bottom: 3px solid #fff; }', 'class="hn-header {navigating : menuOpen}"', function(opts) {
    var self = this
    this.menuOpen = false
    this.activeRoute = 'news'
    this.previousRoute = 'news'
    this.routing = false
    this.views = [
      {name: 'Top', route: 'news'},
      {name: 'New', route: 'newest'},
      {name: 'Show', route: 'show'},
      {name: 'Ask', route: 'ask'},
      {name: 'Jobs', route: 'jobs'}
    ]

    router.on('route:updated', function(route) {
      var newRoute = route.uri.match(/[a-z,A-Z]+/)[0]

      if (self.activeRoute !== newRoute) {
        self.routing = true
        self.previousRoute = self.activeRoute
        self.activeRoute = newRoute
        self.update()
        self.routing = false
      }
    })

    this.on('mount', function() {
      self.routing = true
      self.activeRoute = router.current.uri.match(/[a-z,A-Z]+/)[0]
      self.update()
      self.routing = false
    })

    this.shouldUpdate = function(data, nextOpts) {
      if (self.routing) {
        return true
      }
      return false
    }.bind(this)

    this.showMenu = function(e) {
      e.preventDefault()
      this.menuOpen = true
    }.bind(this)

    this.hideMenu = function(e) {
      if (e.target.classList.length && e.target.classList[0].indexOf('overlay') !== -1) {
        e.preventDefault()
      }
      this.menuOpen = false
    }.bind(this)
});
riot.tag2('hn-item', '<header> <h1><a href="{data.url}">{data.title}</a> <span if="{data.domain}">({data.domain})</span></h1> <p>{data.points} points | by <a href="#user/{data.user}">{data.user}</a> {data.time_ago}</p> </header> <section> <h4>{data.comments.length} comments</h4> <hr> <hn-comment each="{data.comments}" data="{this}"></hn-comment> </section>', 'hn-item,[data-is="hn-item"]{ background: #eee; display: block; } hn-item header,[data-is="hn-item"] header{ padding: 16px; box-sizing: border-box; border-bottom: 1px solid #dedede; box-shadow: 0 2px 3px rgba(0,0,0,0.15); margin-bottom: 16px; background: #fff; } hn-item header h1,[data-is="hn-item"] header h1{ margin: 0 0 16px 0; font-size: 24px; } hn-item section,[data-is="hn-item"] section{ padding: 16px; background: #fff; border-top: 1px solid #dedede; }', '', function(opts) {
    this.id = opts.id || 'null'

    var self = this
    var fetchBaseUrl = 'https://node-hnapi.herokuapp.com/item/'
    this.fetching = false
    this.data = [];

    this.on('mount', function() {
      if (!self.fetching) {
        self.fetching = true
        self.fetchItem(self.id)
      } else {
        self.fetching = false
      }
    })

    this.on('update', function() {
      if (!self.fetching) {
        self.fetching = true
        self.fetchItem(self.id)
      } else {
        self.fetching = false
      }
    })

    this.unescapeHTML = function(input) {
      var doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent;
    }.bind(this)

    this.formatComment = function(input) {
      var self = this;
      var content = []
      var paragraphs = input.split(/<p>|<\/p>/)

      paragraphs.forEach(function(paragraph) {
        if (paragraph.length > 0) {
          content.push(self.unescapeHTML(paragraph))
        }
      })

      return content
    }.bind(this)

    this.fetch = function(url) {
      return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest()
        request.onerror = reject
        request.onload = function() {
          resolve({
            json: function() {
              return Promise.resolve(request.responseText).then(JSON.parse)
            }
          })
        }
        request.open('get', url);
        request.send();
      })
    }.bind(this)

    this.makeFetch = function(url) {
      return self.fetch(url).then(function(response) {
        return response.json().then(function(data) {
          return data;
        });
      }).catch(function(reject) {
        return Promise.reject(reject);
      });
    }.bind(this)

    this.fetchItem = function(id) {
      if (id) {
        var url = fetchBaseUrl + id;
        self.makeFetch(url).then(function(data) {
          self.data = data
          self.update()
        });
      }
    }.bind(this)
});
riot.tag2('hn-list', '<div class="paging"> <a if="{page > 1}" href="#{path}/{page - 1}" class="prev">< Prev</a> <a if="{page <= 1}" class="prev disabled">< Prev</a> <p>Page {page}</p> <a if="{data.length >= 30}" href="#{path}/{parseInt(page, 10) + 1}" class="next">Next ></a> <a if="{data.length < 30}" class="next disabled">Next ></a> </div> <ul> <li each="{item, index in data}" id="{id}"> <span class="index">{(index + 1) + (30 * (parseInt(page, 10) - 1))}</span> <span class="title"> <a href="{item.url}">{item.title}</a> <span class="host">({item.domain})</span> </span> <span class="meta"> <span class="score">{item.points} points</span> <span class="by">by <a href="#/user/{item.user}">{item.user}</a></span> <span class="time">{item.time_ago}</span> <span class="comments_link"> | <a href="#item/{item.id}">{item.comments_count} comments</a> </span> </span> </li> </ul>', 'hn-list,[data-is="hn-list"]{ background: #eee; display: block; padding: 64px 16px 16px 16px; } hn-list .paging,[data-is="hn-list"] .paging{ display: flex; justify-content: space-between; position: fixed; top: 56px; left: 0; right: 0; padding: 16px; height: 56px; box-sizing: border-box; background: #fff; z-index: 1; border-bottom: 1px solid #dedede; box-shadow: 0 3px 5px rgba(0,0,0,0.25); } hn-list ul,[data-is="hn-list"] ul{ list-style: none; padding: 0; margin: 0; } hn-list ul li,[data-is="hn-list"] ul li{ position: relative; padding: 16px 16px 16px 56px; box-sizing: border-box; margin: 16px 0; border: 1px solid #dedede; box-shadow: 0 2px 3px rgba(0,0,0,0.15); background: #fff; } hn-list ul li > *,[data-is="hn-list"] ul li > *{ display: block; } hn-list .index,[data-is="hn-list"] .index{ position: absolute; left: 16px; top: 50%; transform: translateY(-50%); } hn-list .title,[data-is="hn-list"] .title{ display: block; margin-bottom: 8px; }', '', function(opts) {
    var self = this
    var fetchBaseUrl = 'https://node-hnapi.herokuapp.com'
    this.fetching = false
    this.data = [];
    this.page = opts.page || 1
    this.path = opts.path || 'top'

    this.on('mount', function() {
      if (!self.fetching) {
        self.fetching = true
        self.fetchList(self.path, self.page)
      } else {
        self.fetching = false
      }
    })

    this.on('update', function() {
      if (!self.fetching) {
        self.fetching = true
        self.fetchList(self.path, self.page)
      } else {
        self.fetching = false
      }
    })

    this.fetch = function(url) {
      return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest()
        request.onerror = reject
        request.onload = function() {
          resolve({
            json: function() {
              return Promise.resolve(request.responseText).then(JSON.parse)
            }
          })
        }
        request.open('get', url);
        request.send();
      })
    }.bind(this)

    this.makeFetch = function(url) {
      return self.fetch(url).then(function(response) {
        return response.json().then(function(data) {
          return data;
        });
      }).catch(function(reject) {
        return Promise.reject(reject);
      });
    }.bind(this)

    this.fetchList = function(path, page) {
      if (path) {
        var url = fetchBaseUrl + '/' + path;
        if (page) {
          url += '?page=' + page;
        }
        self.makeFetch(url).then(function(data) {
          self.data = data
          self.update()
        });
      }
    }.bind(this)
});
riot.tag2('hn-user', '<div if="{user.id}"> <h1>User: {user.id}</h1> <p>Created: {user.created}</p> <p>Karma: {user.karma}</p> <br> <div> <p> <a href="https://news.ycombinator.com/submitted?id={user.id}">sumbmissions</a> &#x7C; <a href="https://news.ycombinator.com/threads?id={user.id}">comments</a> | <a href="https://news.ycombinator.com/favorites?id={user.id}">favorites</a> </p> </div> </div> <div if="{!user.id}"> <h1>User not found</h1> </div>', 'hn-user,[data-is="hn-user"]{ display: block; padding: 16px; } hn-user h1,[data-is="hn-user"] h1{ margin: 0 0 16px 0; font-size: 24px; }', '', function(opts) {
    this.user = {}
    this.id = opts.id || null

    var self = this
    var fetchBaseUrl = 'https://node-hnapi.herokuapp.com/user/'
    this.fetching = false
    this.data = [];

    this.on('mount', function() {
      if (!self.fetching) {
        self.fetching = true
        self.fetchUser(self.id)
      } else {
        self.fetching = false
      }
    })

    this.on('update', function() {
      if (!self.fetching) {
        self.fetching = true
        self.fetchUser(self.id)
      } else {
        self.fetching = false
      }
    })

    this.fetch = function(url) {
      return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest()
        request.onerror = reject
        request.onload = function() {
          resolve({
            json: function() {
              return Promise.resolve(request.responseText).then(JSON.parse)
            }
          })
        }
        request.open('get', url);
        request.send();
      })
    }.bind(this)

    this.makeFetch = function(url) {
      return self.fetch(url).then(function(response) {
        return response.json().then(function(data) {
          return data;
        });
      }).catch(function(reject) {
        return Promise.reject(reject);
      });
    }.bind(this)

    this.fetchUser = function(id) {
      if (id) {
        var url = fetchBaseUrl + id;
        self.makeFetch(url).then(function(data) {
          self.user = data
          self.update()
        });
      }
    }.bind(this)
});