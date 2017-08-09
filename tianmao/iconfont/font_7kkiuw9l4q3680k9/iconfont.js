;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-phone" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M755.608533 932.927795 268.394537 932.927795c-28.85637 0-52.204058-20.154016-52.204058-44.995797L216.190479 107.928105c0-24.840758 23.347688-44.995797 52.204058-44.995797l487.213997 0c28.852277 0 52.200988 20.154016 52.200988 44.995797l0 780.003893C807.808498 912.773779 784.46081 932.927795 755.608533 932.927795zM511.999488 887.931998c19.203128 0 34.803046-13.4575 34.803046-30.008454 0-16.549931-15.599919-30.007431-34.803046-30.007431-19.200058 0-34.798953 13.4575-34.798953 30.007431C477.199512 874.474498 492.799431 887.931998 511.999488 887.931998zM755.608533 152.923902l-17.401012 0L285.791455 152.923902l-17.397942 0 0 629.996414 17.397942 0 452.415044 0 17.401012 0L755.60751 152.923902z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-gouwuche" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M510.903527 63.898309c-247.235894 0-447.679066 200.445218-447.679066 447.711811 0 247.235894 200.443172 447.681112 447.679066 447.681112 106.847493 0 204.822922-37.547151 281.780665-99.996458l49.785893-47.631834c71.931263-79.43312 116.145254-184.471408 116.145254-300.05282C958.615339 264.343527 758.165004 63.898309 510.903527 63.898309zM446.507892 832.729745c-25.960255 0-46.99636-20.98494-46.99636-46.867424s21.036106-46.866401 46.99636-46.866401c25.946952 0 47.007617 20.983917 47.007617 46.866401S472.454844 832.729745 446.507892 832.729745zM650.171408 832.729745c-25.960255 0-46.997384-20.98494-46.997384-46.867424s21.037129-46.866401 46.997384-46.866401c25.959232 0 46.995337 20.983917 46.995337 46.866401S676.130639 832.729745 650.171408 832.729745zM791.159466 395.369699l-56.730049 176.677908c-4.470825 16.667611-20.559245 30.812773-37.262672 26.347065L415.15993 598.394672l11.755742 46.866401 254.589372 0c17.300015 0 31.335682 13.992689 31.335682 31.244608 0 17.260106-14.035668 31.245631-31.335682 31.245631L415.15993 707.751313c-3.093455 0.830925-6.561439 0.630357-10.105149 0l-5.54325 0c-17.311271 0-31.335682-13.985526-31.335682-31.245631l-71.29272-277.250488c-4.330632-5.362124-7.037277-12.084223-7.037277-19.508309 0-1.934049 0.232291-3.815909 0.566912-5.65172l-14.603603-56.836473-32.958646 0c-17.297968 0-31.321356-13.985526-31.321356-31.244608 0-17.252943 14.024411-31.244608 31.321356-31.244608l46.99636 0c3.119037-0.831948 6.573719-0.62524 10.118452 0l5.555529 0c17.297968 0 31.321356 13.991666 31.321356 31.244608l15.673981 62.489216 394.764925 0c4.022617-1.031493 8.250918-1.147126 12.542664 0 17.311271 0 31.335682 13.985526 31.335682 31.244608 0 1.211595-0.234337 2.365884-0.361227 3.544733C791.828708 387.532197 792.137747 391.682727 791.159466 395.369699z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-hongxin" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M959.905728 422.699138c0 246.300592-303.624159 387.66011-447.90624 445.946608C387.207297 814.84133 64.093249 668.99973 64.093249 422.699138c0-246.294452 211.665771-345.429287 432.334589-179.206498C741.844294 63.834864 959.905728 176.404686 959.905728 422.699138z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)