<hn-header class="hn-header { navigating : menuOpen }">
  <a href="#" class="nav-toggle" onclick="{ showMenu }">Menu</a>
  <a href="http://riotjs.com" class="logo"><img src="/hn-riot/assets/riot120x.png" alt=""></a>
  <a href="http://riotjs.com" class="logo"><img src="/assets/riot120x.png" alt=""></a>

  <nav>
    <ul>
      <li each={ views }>
        <a href="#{ route }/1" class="{ active : activeRoute == route }" onclick="{ hideMenu }">{ name }</a>
      </li>
    </ul>
  </nav>

  <a href="#" class="overlay" onclick="{ hideMenu }"></a>

  <style>
    :scope {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 56px;
      display: flex;
      background: #e41e48;
      color: #fff;
      padding: 0 16px;
      z-index: 2;
      align-items: center;
      box-shadow: 0 3px 5px rgba(0,0,0,0.25);
    }

    :scope .logo {
      display: flex;
      width: 60px;
      align-items: center;
      margin-right: 16px;
    }

    :scope .logo > img {
      display: block;
      width: 100%;
      height: auto;
      box-shadow: 0 2px 5px rgba(0,0,0,0.25);
    }

    :scope nav {
      display: inline-block;
      height: 100%;
    }

    :scope .overlay {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      background: rgba(0,0,0,0.65);
      opacity: 0;
      visibility: hidden;
      transition: all 0.25s ease;
    }

    :scope .nav-toggle {
      width: 40px;
      height: 40px;
      font-size: 0;
      text-decoration: none;
      display: none;
    }

    :scope .nav-toggle:after {
      content: '\02261';
      font-size: 48px;
      color: #fff;
      line-height: 0.7;
    }

    @media screen and (max-width: 650px) {
      :scope {
        justify-content: space-between;
      }

      :scope .nav-toggle {
        display: block;
      }

      :scope nav {
        position: fixed;
        left: 0;
        z-index: 3;
        background: #e41e48;
        top: 0;
        bottom: 0;
        width: 160px;
        transform: translateX(-100%);
        transition: transform 0.25s ease;
      }

      :scope.navigating nav {
        transform: translateX(0);
      }

      :scope.navigating .overlay {
        visibility: visible;
        opacity: 1;
      }

      :scope nav ul {
        flex-direction: column;
        align-items: flex-start;
      }
      
      :scope nav ul li {
        width: 100%;
      }

      :scope nav ul li a {
        justify-content: flex-start;
      }
    }

    :scope ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      height: 100%;
    }

    :scope ul li {
      display: inline-block;
    }

    :scope ul li a {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      padding: 16px;
      min-width: 80px;
      box-sizing: border-box;
      text-align: center;
      text-decoration: none;
      color: #fff;
    }

    :scope ul li a:hover {
      text-decoration: underline;
    }

    :scope ul li a.active {
      border-bottom: 3px solid #fff;
    }
  </style>

  <script>
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

    shouldUpdate(data, nextOpts) {
      if (self.routing) {
        return true
      }
      return false
    }

    showMenu(e) {
      e.preventDefault()
      this.menuOpen = true
    }

    hideMenu(e) {
      if (e.target.classList.length && e.target.classList[0].indexOf('overlay') !== -1) {
        e.preventDefault()
      }
      this.menuOpen = false
    }
  </script>
</hn-header>