// Pannellum 2.5.6, https://github.com/mpetroff/pannellum
window.libpannellum = (function (E, g, p) {
  function Ba(K) {
    function ja(a, e) {
      return 1 == a.level && 1 != e.level
        ? -1
        : 1 == e.level && 1 != a.level
        ? 1
        : e.timestamp - a.timestamp;
    }
    function Q(a, e) {
      return a.level != e.level ? a.level - e.level : a.diff - e.diff;
    }
    function ka(a, e, c, g, l, h) {
      this.vertices = a;
      this.side = e;
      this.level = c;
      this.x = g;
      this.y = l;
      this.path = h
        .replace('%s', e)
        .replace('%l', c)
        .replace('%x', g)
        .replace('%y', l);
    }
    function Ja(a, e, g, p, l) {
      var h;
      var d = e.vertices;
      h = la(a, d.slice(0, 3));
      var u = la(a, d.slice(3, 6)),
        x = la(a, d.slice(6, 9)),
        d = la(a, d.slice(9, 12)),
        t = h[0] + u[0] + x[0] + d[0];
      -4 == t || 4 == t
        ? (h = !1)
        : ((t = h[1] + u[1] + x[1] + d[1]),
          (h = -4 == t || 4 == t ? !1 : 4 != h[2] + u[2] + x[2] + d[2]));
      if (h) {
        h = e.vertices;
        u = h[0] + h[3] + h[6] + h[9];
        x = h[1] + h[4] + h[7] + h[10];
        d = h[2] + h[5] + h[8] + h[11];
        t = Math.sqrt(u * u + x * x + d * d);
        d = Math.asin(d / t);
        u = Math.atan2(x, u) - p;
        u += u > Math.PI ? -2 * Math.PI : u < -Math.PI ? 2 * Math.PI : 0;
        u = Math.abs(u);
        e.diff = Math.acos(
          Math.sin(g) * Math.sin(d) + Math.cos(g) * Math.cos(d) * Math.cos(u),
        );
        u = !1;
        for (x = 0; x < c.nodeCache.length; x++)
          if (c.nodeCache[x].path == e.path) {
            u = !0;
            c.nodeCache[x].timestamp = c.nodeCacheTimestamp++;
            c.nodeCache[x].diff = e.diff;
            c.currentNodes.push(c.nodeCache[x]);
            break;
          }
        u ||
          ((e.timestamp = c.nodeCacheTimestamp++),
          c.currentNodes.push(e),
          c.nodeCache.push(e));
        if (e.level < c.level) {
          var d = m.cubeResolution * Math.pow(2, e.level - m.maxLevel),
            u = Math.ceil(d * m.invTileResolution) - 1,
            x = (d % m.tileResolution) * 2,
            k = (2 * d) % m.tileResolution;
          0 === k && (k = m.tileResolution);
          0 === x && (x = 2 * m.tileResolution);
          t = 0.5;
          if (e.x == u || e.y == u)
            t = 1 - m.tileResolution / (m.tileResolution + k);
          var y = 1 - t,
            d = [],
            s = t,
            z = t,
            D = t,
            I = y,
            A = y,
            B = y;
          if (k < m.tileResolution)
            if (e.x == u && e.y != u) {
              if (((A = z = 0.5), 'd' == e.side || 'u' == e.side)) B = D = 0.5;
            } else
              e.x != u &&
                e.y == u &&
                ((I = s = 0.5), 'l' == e.side || 'r' == e.side) &&
                (B = D = 0.5);
          x <= m.tileResolution &&
            (e.x == u &&
              ((s = 0), (I = 1), 'l' == e.side || 'r' == e.side) &&
              ((D = 0), (B = 1)),
            e.y == u &&
              ((z = 0), (A = 1), 'd' == e.side || 'u' == e.side) &&
              ((D = 0), (B = 1)));
          k = [
            h[0],
            h[1],
            h[2],
            h[0] * s + h[3] * I,
            h[1] * t + h[4] * y,
            h[2] * D + h[5] * B,
            h[0] * s + h[6] * I,
            h[1] * z + h[7] * A,
            h[2] * D + h[8] * B,
            h[0] * t + h[9] * y,
            h[1] * z + h[10] * A,
            h[2] * D + h[11] * B,
          ];
          k = new ka(k, e.side, e.level + 1, 2 * e.x, 2 * e.y, m.fullpath);
          d.push(k);
          (e.x == u && x <= m.tileResolution) ||
            ((k = [
              h[0] * s + h[3] * I,
              h[1] * t + h[4] * y,
              h[2] * D + h[5] * B,
              h[3],
              h[4],
              h[5],
              h[3] * t + h[6] * y,
              h[4] * z + h[7] * A,
              h[5] * D + h[8] * B,
              h[0] * s + h[6] * I,
              h[1] * z + h[7] * A,
              h[2] * D + h[8] * B,
            ]),
            (k = new ka(
              k,
              e.side,
              e.level + 1,
              2 * e.x + 1,
              2 * e.y,
              m.fullpath,
            )),
            d.push(k));
          (e.x == u && x <= m.tileResolution) ||
            (e.y == u && x <= m.tileResolution) ||
            ((k = [
              h[0] * s + h[6] * I,
              h[1] * z + h[7] * A,
              h[2] * D + h[8] * B,
              h[3] * t + h[6] * y,
              h[4] * z + h[7] * A,
              h[5] * D + h[8] * B,
              h[6],
              h[7],
              h[8],
              h[9] * s + h[6] * I,
              h[10] * t + h[7] * y,
              h[11] * D + h[8] * B,
            ]),
            (k = new ka(
              k,
              e.side,
              e.level + 1,
              2 * e.x + 1,
              2 * e.y + 1,
              m.fullpath,
            )),
            d.push(k));
          (e.y == u && x <= m.tileResolution) ||
            ((k = [
              h[0] * t + h[9] * y,
              h[1] * z + h[10] * A,
              h[2] * D + h[11] * B,
              h[0] * s + h[6] * I,
              h[1] * z + h[7] * A,
              h[2] * D + h[8] * B,
              h[9] * s + h[6] * I,
              h[10] * t + h[7] * y,
              h[11] * D + h[8] * B,
              h[9],
              h[10],
              h[11],
            ]),
            (k = new ka(
              k,
              e.side,
              e.level + 1,
              2 * e.x,
              2 * e.y + 1,
              m.fullpath,
            )),
            d.push(k));
          for (e = 0; e < d.length; e++) Ja(a, d[e], g, p, l);
        }
      }
    }
    function ta() {
      return [
        -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, 1, -1, 1, 1, -1, -1,
        1, 1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1,
        -1, 1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, 1,
        1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1,
      ];
    }
    function ua(a, e, c) {
      var g = Math.sin(e);
      e = Math.cos(e);
      if ('x' == c)
        return [
          a[0],
          e * a[1] + g * a[2],
          e * a[2] - g * a[1],
          a[3],
          e * a[4] + g * a[5],
          e * a[5] - g * a[4],
          a[6],
          e * a[7] + g * a[8],
          e * a[8] - g * a[7],
        ];
      if ('y' == c)
        return [
          e * a[0] - g * a[2],
          a[1],
          e * a[2] + g * a[0],
          e * a[3] - g * a[5],
          a[4],
          e * a[5] + g * a[3],
          e * a[6] - g * a[8],
          a[7],
          e * a[8] + g * a[6],
        ];
      if ('z' == c)
        return [
          e * a[0] + g * a[1],
          e * a[1] - g * a[0],
          a[2],
          e * a[3] + g * a[4],
          e * a[4] - g * a[3],
          a[5],
          e * a[6] + g * a[7],
          e * a[7] - g * a[6],
          a[8],
        ];
    }
    function ma(a) {
      return [
        a[0],
        a[4],
        a[8],
        a[12],
        a[1],
        a[5],
        a[9],
        a[13],
        a[2],
        a[6],
        a[10],
        a[14],
        a[3],
        a[7],
        a[11],
        a[15],
      ];
    }
    function Ka(a) {
      La(
        a,
        a.path + '.' + m.extension,
        function (e, c) {
          a.texture = e;
          a.textureLoaded = c ? 2 : 1;
        },
        va.crossOrigin,
      );
    }
    function la(a, e) {
      var c = [
          a[0] * e[0] + a[1] * e[1] + a[2] * e[2],
          a[4] * e[0] + a[5] * e[1] + a[6] * e[2],
          a[11] + a[8] * e[0] + a[9] * e[1] + a[10] * e[2],
          1 / (a[12] * e[0] + a[13] * e[1] + a[14] * e[2]),
        ],
        g = c[0] * c[3],
        l = c[1] * c[3],
        c = c[2] * c[3],
        h = [0, 0, 0];
      -1 > g && (h[0] = -1);
      1 < g && (h[0] = 1);
      -1 > l && (h[1] = -1);
      1 < l && (h[1] = 1);
      if (-1 > c || 1 < c) h[2] = 1;
      return h;
    }
    function Ea() {
      console.log('Reducing canvas size due to error 1286!');
      A.width = Math.round(A.width / 2);
      A.height = Math.round(A.height / 2);
    }
    var A = g.createElement('canvas');
    A.style.width = A.style.height = '100%';
    K.appendChild(A);
    var c, a, U, V, $, R, wa, ga, m, z, F, ca, Fa, Y, na, va;
    this.init = function (L, e, Ca, H, l, h, d, u) {
      function x(a) {
        if (E) {
          var e = a * a * 4,
            h = new Uint8ClampedArray(e),
            c = u.backgroundColor ? u.backgroundColor : [0, 0, 0];
          c[0] *= 255;
          c[1] *= 255;
          c[2] *= 255;
          for (var b = 0; b < e; b++)
            (h[b++] = c[0]), (h[b++] = c[1]), (h[b++] = c[2]);
          a = new ImageData(h, a, a);
          for (t = 0; 6 > t; t++) 0 == m[t].width && (m[t] = a);
        }
      }
      e === p && (e = 'equirectangular');
      if ('equirectangular' != e && 'cubemap' != e && 'multires' != e)
        throw (
          (console.log('Error: invalid image type specified!'),
          { type: 'config error' })
        );
      z = e;
      m = L;
      F = Ca;
      va = u || {};
      if (c) {
        U && (a.detachShader(c, U), a.deleteShader(U));
        V && (a.detachShader(c, V), a.deleteShader(V));
        a.bindBuffer(a.ARRAY_BUFFER, null);
        a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, null);
        c.texture && a.deleteTexture(c.texture);
        if (c.nodeCache)
          for (L = 0; L < c.nodeCache.length; L++)
            a.deleteTexture(c.nodeCache[L].texture);
        a.deleteProgram(c);
        c = p;
      }
      ga = p;
      var t,
        E = !1,
        y;
      if ('cubemap' == z)
        for (t = 0; 6 > t; t++)
          0 < m[t].width
            ? (y === p && (y = m[t].width),
              y != m[t].width &&
                console.log(
                  'Cube faces have inconsistent widths: ' +
                    y +
                    ' vs. ' +
                    m[t].width,
                ))
            : (E = !0);
      ('cubemap' == z &&
        0 !== (y & (y - 1)) &&
        (navigator.userAgent
          .toLowerCase()
          .match(/(iphone|ipod|ipad).* os 8_/) ||
          navigator.userAgent
            .toLowerCase()
            .match(/(iphone|ipod|ipad).* os 9_/) ||
          navigator.userAgent
            .toLowerCase()
            .match(/(iphone|ipod|ipad).* os 10_/) ||
          navigator.userAgent.match(/Trident.*rv[ :]*11\./))) ||
        (a ||
          (a = A.getContext('experimental-webgl', { alpha: !1, depth: !1 })),
        a && 1286 == a.getError() && Ea());
      if (
        !a &&
        (('multires' == z && m.hasOwnProperty('fallbackPath')) ||
          'cubemap' == z) &&
        ('WebkitAppearance' in g.documentElement.style ||
          navigator.userAgent.match(/Trident.*rv[ :]*11\./) ||
          -1 !== navigator.appVersion.indexOf('MSIE 10'))
      ) {
        R && K.removeChild(R);
        R = g.createElement('div');
        R.className = 'pnlm-world';
        H = m.basePath ? m.basePath + m.fallbackPath : m.fallbackPath;
        var Q = 'frblud'.split(''),
          S = 0;
        l = function () {
          var a = g.createElement('canvas');
          a.className = 'pnlm-face pnlm-' + Q[this.side] + 'face';
          R.appendChild(a);
          var e = a.getContext('2d');
          a.style.width = this.width + 4 + 'px';
          a.style.height = this.height + 4 + 'px';
          a.width = this.width + 4;
          a.height = this.height + 4;
          e.drawImage(this, 2, 2);
          var h = e.getImageData(0, 0, a.width, a.height),
            c = h.data,
            b,
            d;
          for (b = 2; b < a.width - 2; b++)
            for (d = 0; 4 > d; d++)
              (c[4 * (b + a.width) + d] = c[4 * (b + 2 * a.width) + d]),
                (c[4 * (b + a.width * (a.height - 2)) + d] =
                  c[4 * (b + a.width * (a.height - 3)) + d]);
          for (b = 2; b < a.height - 2; b++)
            for (d = 0; 4 > d; d++)
              (c[4 * (b * a.width + 1) + d] = c[4 * (b * a.width + 2) + d]),
                (c[4 * ((b + 1) * a.width - 2) + d] =
                  c[4 * ((b + 1) * a.width - 3) + d]);
          for (d = 0; 4 > d; d++)
            (c[4 * (a.width + 1) + d] = c[4 * (2 * a.width + 2) + d]),
              (c[4 * (2 * a.width - 2) + d] = c[4 * (3 * a.width - 3) + d]),
              (c[4 * (a.width * (a.height - 2) + 1) + d] =
                c[4 * (a.width * (a.height - 3) + 2) + d]),
              (c[4 * (a.width * (a.height - 1) - 2) + d] =
                c[4 * (a.width * (a.height - 2) - 3) + d]);
          for (b = 1; b < a.width - 1; b++)
            for (d = 0; 4 > d; d++)
              (c[4 * b + d] = c[4 * (b + a.width) + d]),
                (c[4 * (b + a.width * (a.height - 1)) + d] =
                  c[4 * (b + a.width * (a.height - 2)) + d]);
          for (b = 1; b < a.height - 1; b++)
            for (d = 0; 4 > d; d++)
              (c[b * a.width * 4 + d] = c[4 * (b * a.width + 1) + d]),
                (c[4 * ((b + 1) * a.width - 1) + d] =
                  c[4 * ((b + 1) * a.width - 2) + d]);
          for (d = 0; 4 > d; d++)
            (c[d] = c[4 * (a.width + 1) + d]),
              (c[4 * (a.width - 1) + d] = c[4 * (2 * a.width - 2) + d]),
              (c[a.width * (a.height - 1) * 4 + d] =
                c[4 * (a.width * (a.height - 2) + 1) + d]),
              (c[4 * (a.width * a.height - 1) + d] =
                c[4 * (a.width * (a.height - 1) - 2) + d]);
          e.putImageData(h, 0, 0);
          D.call(this);
        };
        var D = function () {
            0 < this.width
              ? ($ === p && ($ = this.width),
                $ != this.width &&
                  console.log(
                    'Fallback faces have inconsistent widths: ' +
                      $ +
                      ' vs. ' +
                      this.width,
                  ))
              : (E = !0);
            S++;
            6 == S && (($ = this.width), K.appendChild(R), d());
          },
          E = !1;
        for (t = 0; 6 > t; t++)
          (h = new Image()),
            (h.crossOrigin = va.crossOrigin ? va.crossOrigin : 'anonymous'),
            (h.side = t),
            (h.onload = l),
            (h.onerror = D),
            (h.src =
              'multires' == z
                ? H.replace('%s', Q[t]) + '.' + m.extension
                : m[t].src);
        x($);
      } else {
        if (!a)
          throw (
            (console.log('Error: no WebGL support detected!'),
            { type: 'no webgl' })
          );
        'cubemap' == z && x(y);
        m.fullpath = m.basePath ? m.basePath + m.path : m.path;
        m.invTileResolution = 1 / m.tileResolution;
        L = ta();
        wa = [];
        for (t = 0; 6 > t; t++)
          (wa[t] = L.slice(12 * t, 12 * t + 12)), (L = ta());
        L = 0;
        if ('equirectangular' == z) {
          if (
            ((L = a.getParameter(a.MAX_TEXTURE_SIZE)),
            Math.max(m.width / 2, m.height) > L)
          )
            throw (
              (console.log(
                "Error: The image is too big; it's " +
                  m.width +
                  "px wide, but this device's maximum supported size is " +
                  2 * L +
                  'px.',
              ),
              { type: 'webgl size error', width: m.width, maxWidth: 2 * L })
            );
        } else if (
          'cubemap' == z &&
          y > a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE)
        )
          throw (
            (console.log(
              "Error: The image is too big; it's " +
                y +
                "px wide, but this device's maximum supported size is " +
                L +
                'px.',
            ),
            { type: 'webgl size error', width: y, maxWidth: L })
          );
        u === p ||
          (u.horizonPitch === p && u.horizonRoll === p) ||
          (ga = [
            u.horizonPitch == p ? 0 : u.horizonPitch,
            u.horizonRoll == p ? 0 : u.horizonRoll,
          ]);
        y = a.TEXTURE_2D;
        a.viewport(0, 0, a.drawingBufferWidth, a.drawingBufferHeight);
        a.getShaderPrecisionFormat &&
          (e = a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT)) &&
          1 > e.precision &&
          (oa = oa.replace('highp', 'mediump'));
        U = a.createShader(a.VERTEX_SHADER);
        e = s;
        'multires' == z && (e = k);
        a.shaderSource(U, e);
        a.compileShader(U);
        V = a.createShader(a.FRAGMENT_SHADER);
        e = pa;
        'cubemap' == z
          ? ((y = a.TEXTURE_CUBE_MAP), (e = qa))
          : 'multires' == z && (e = bb);
        a.shaderSource(V, e);
        a.compileShader(V);
        c = a.createProgram();
        a.attachShader(c, U);
        a.attachShader(c, V);
        a.linkProgram(c);
        a.getShaderParameter(U, a.COMPILE_STATUS) ||
          console.log(a.getShaderInfoLog(U));
        a.getShaderParameter(V, a.COMPILE_STATUS) ||
          console.log(a.getShaderInfoLog(V));
        a.getProgramParameter(c, a.LINK_STATUS) ||
          console.log(a.getProgramInfoLog(c));
        a.useProgram(c);
        c.drawInProgress = !1;
        e = u.backgroundColor ? u.backgroundColor : [0, 0, 0];
        a.clearColor(e[0], e[1], e[2], 1);
        a.clear(a.COLOR_BUFFER_BIT);
        c.texCoordLocation = a.getAttribLocation(c, 'a_texCoord');
        a.enableVertexAttribArray(c.texCoordLocation);
        'multires' != z
          ? (ca || (ca = a.createBuffer()),
            a.bindBuffer(a.ARRAY_BUFFER, ca),
            a.bufferData(
              a.ARRAY_BUFFER,
              new Float32Array([-1, 1, 1, 1, 1, -1, -1, 1, 1, -1, -1, -1]),
              a.STATIC_DRAW,
            ),
            a.vertexAttribPointer(c.texCoordLocation, 2, a.FLOAT, !1, 0, 0),
            (c.aspectRatio = a.getUniformLocation(c, 'u_aspectRatio')),
            a.uniform1f(
              c.aspectRatio,
              a.drawingBufferWidth / a.drawingBufferHeight,
            ),
            (c.psi = a.getUniformLocation(c, 'u_psi')),
            (c.theta = a.getUniformLocation(c, 'u_theta')),
            (c.f = a.getUniformLocation(c, 'u_f')),
            (c.h = a.getUniformLocation(c, 'u_h')),
            (c.v = a.getUniformLocation(c, 'u_v')),
            (c.vo = a.getUniformLocation(c, 'u_vo')),
            (c.rot = a.getUniformLocation(c, 'u_rot')),
            a.uniform1f(c.h, H / (2 * Math.PI)),
            a.uniform1f(c.v, l / Math.PI),
            a.uniform1f(c.vo, (h / Math.PI) * 2),
            'equirectangular' == z &&
              ((c.backgroundColor = a.getUniformLocation(
                c,
                'u_backgroundColor',
              )),
              a.uniform4fv(c.backgroundColor, e.concat([1]))),
            (c.texture = a.createTexture()),
            a.bindTexture(y, c.texture),
            'cubemap' == z
              ? (a.texImage2D(
                  a.TEXTURE_CUBE_MAP_POSITIVE_X,
                  0,
                  a.RGB,
                  a.RGB,
                  a.UNSIGNED_BYTE,
                  m[1],
                ),
                a.texImage2D(
                  a.TEXTURE_CUBE_MAP_NEGATIVE_X,
                  0,
                  a.RGB,
                  a.RGB,
                  a.UNSIGNED_BYTE,
                  m[3],
                ),
                a.texImage2D(
                  a.TEXTURE_CUBE_MAP_POSITIVE_Y,
                  0,
                  a.RGB,
                  a.RGB,
                  a.UNSIGNED_BYTE,
                  m[4],
                ),
                a.texImage2D(
                  a.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                  0,
                  a.RGB,
                  a.RGB,
                  a.UNSIGNED_BYTE,
                  m[5],
                ),
                a.texImage2D(
                  a.TEXTURE_CUBE_MAP_POSITIVE_Z,
                  0,
                  a.RGB,
                  a.RGB,
                  a.UNSIGNED_BYTE,
                  m[0],
                ),
                a.texImage2D(
                  a.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                  0,
                  a.RGB,
                  a.RGB,
                  a.UNSIGNED_BYTE,
                  m[2],
                ))
              : m.width <= L
              ? (a.uniform1i(a.getUniformLocation(c, 'u_splitImage'), 0),
                a.texImage2D(y, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, m))
              : (a.uniform1i(a.getUniformLocation(c, 'u_splitImage'), 1),
                (H = g.createElement('canvas')),
                (H.width = m.width / 2),
                (H.height = m.height),
                (H = H.getContext('2d')),
                H.drawImage(m, 0, 0),
                (l = H.getImageData(0, 0, m.width / 2, m.height)),
                a.texImage2D(y, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, l),
                (c.texture2 = a.createTexture()),
                a.activeTexture(a.TEXTURE1),
                a.bindTexture(y, c.texture2),
                a.uniform1i(a.getUniformLocation(c, 'u_image1'), 1),
                H.drawImage(m, -m.width / 2, 0),
                (l = H.getImageData(0, 0, m.width / 2, m.height)),
                a.texImage2D(y, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, l),
                a.texParameteri(y, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE),
                a.texParameteri(y, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE),
                a.texParameteri(y, a.TEXTURE_MIN_FILTER, a.LINEAR),
                a.texParameteri(y, a.TEXTURE_MAG_FILTER, a.LINEAR),
                a.activeTexture(a.TEXTURE0)),
            a.texParameteri(y, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE),
            a.texParameteri(y, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE),
            a.texParameteri(y, a.TEXTURE_MIN_FILTER, a.LINEAR),
            a.texParameteri(y, a.TEXTURE_MAG_FILTER, a.LINEAR))
          : ((c.vertPosLocation = a.getAttribLocation(c, 'a_vertCoord')),
            a.enableVertexAttribArray(c.vertPosLocation),
            Fa || (Fa = a.createBuffer()),
            Y || (Y = a.createBuffer()),
            na || (na = a.createBuffer()),
            a.bindBuffer(a.ARRAY_BUFFER, Y),
            a.bufferData(
              a.ARRAY_BUFFER,
              new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
              a.STATIC_DRAW,
            ),
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, na),
            a.bufferData(
              a.ELEMENT_ARRAY_BUFFER,
              new Uint16Array([0, 1, 2, 0, 2, 3]),
              a.STATIC_DRAW,
            ),
            (c.perspUniform = a.getUniformLocation(c, 'u_perspMatrix')),
            (c.cubeUniform = a.getUniformLocation(c, 'u_cubeMatrix')),
            (c.level = -1),
            (c.currentNodes = []),
            (c.nodeCache = []),
            (c.nodeCacheTimestamp = 0));
        H = a.getError();
        if (0 !== H)
          throw (
            (console.log('Error: Something went wrong with WebGL!', H),
            { type: 'webgl error' })
          );
        d();
      }
    };
    this.destroy = function () {
      K !== p &&
        (A !== p && K.contains(A) && K.removeChild(A),
        R !== p && K.contains(R) && K.removeChild(R));
      if (a) {
        var c = a.getExtension('WEBGL_lose_context');
        c && c.loseContext();
      }
    };
    this.resize = function () {
      var g = E.devicePixelRatio || 1;
      A.width = A.clientWidth * g;
      A.height = A.clientHeight * g;
      a &&
        (1286 == a.getError() && Ea(),
        a.viewport(0, 0, a.drawingBufferWidth, a.drawingBufferHeight),
        'multires' != z &&
          a.uniform1f(c.aspectRatio, A.clientWidth / A.clientHeight));
    };
    this.resize();
    this.setPose = function (a, c) {
      ga = [a, c];
    };
    this.render = function (g, e, k, s) {
      var l,
        h = 0;
      s === p && (s = {});
      s.roll && (h = s.roll);
      if (ga !== p) {
        l = ga[0];
        var d = ga[1],
          u = g,
          x = e,
          t =
            Math.cos(d) * Math.sin(g) * Math.sin(l) +
            Math.cos(g) *
              (Math.cos(l) * Math.cos(e) +
                Math.sin(d) * Math.sin(l) * Math.sin(e)),
          E =
            -Math.sin(g) * Math.sin(d) +
            Math.cos(g) * Math.cos(d) * Math.sin(e);
        g =
          Math.cos(d) * Math.cos(l) * Math.sin(g) +
          Math.cos(g) *
            (-Math.cos(e) * Math.sin(l) +
              Math.cos(l) * Math.sin(d) * Math.sin(e));
        g = Math.asin(Math.max(Math.min(g, 1), -1));
        e = Math.atan2(E, t);
        l = [
          Math.cos(u) *
            (Math.sin(d) * Math.sin(l) * Math.cos(x) -
              Math.cos(l) * Math.sin(x)),
          Math.cos(u) * Math.cos(d) * Math.cos(x),
          Math.cos(u) *
            (Math.cos(l) * Math.sin(d) * Math.cos(x) +
              Math.sin(x) * Math.sin(l)),
        ];
        d = [-Math.cos(g) * Math.sin(e), Math.cos(g) * Math.cos(e)];
        d = Math.acos(
          Math.max(
            Math.min(
              (l[0] * d[0] + l[1] * d[1]) /
                (Math.sqrt(l[0] * l[0] + l[1] * l[1] + l[2] * l[2]) *
                  Math.sqrt(d[0] * d[0] + d[1] * d[1])),
              1,
            ),
            -1,
          ),
        );
        0 > l[2] && (d = 2 * Math.PI - d);
        h += d;
      }
      if (a || ('multires' != z && 'cubemap' != z)) {
        if ('multires' != z)
          (k =
            2 *
            Math.atan(
              Math.tan(0.5 * k) /
                (a.drawingBufferWidth / a.drawingBufferHeight),
            )),
            (k = 1 / Math.tan(0.5 * k)),
            a.uniform1f(c.psi, e),
            a.uniform1f(c.theta, g),
            a.uniform1f(c.rot, h),
            a.uniform1f(c.f, k),
            !0 === F &&
              'equirectangular' == z &&
              (a.bindTexture(a.TEXTURE_2D, c.texture),
              a.texImage2D(a.TEXTURE_2D, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, m)),
            a.drawArrays(a.TRIANGLES, 0, 6);
        else {
          l = a.drawingBufferWidth / a.drawingBufferHeight;
          d =
            2 *
            Math.atan(
              (Math.tan(k / 2) * a.drawingBufferHeight) / a.drawingBufferWidth,
            );
          d = 1 / Math.tan(d / 2);
          l = [
            d / l,
            0,
            0,
            0,
            0,
            d,
            0,
            0,
            0,
            0,
            100.1 / -99.9,
            20 / -99.9,
            0,
            0,
            -1,
            0,
          ];
          for (
            d = 1;
            d < m.maxLevel &&
            a.drawingBufferWidth >
              m.tileResolution * Math.pow(2, d - 1) * Math.tan(k / 2) * 0.707;

          )
            d++;
          c.level = d;
          d = [1, 0, 0, 0, 1, 0, 0, 0, 1];
          d = ua(d, -h, 'z');
          d = ua(d, -g, 'x');
          d = ua(d, e, 'y');
          d = [
            d[0],
            d[1],
            d[2],
            0,
            d[3],
            d[4],
            d[5],
            0,
            d[6],
            d[7],
            d[8],
            0,
            0,
            0,
            0,
            1,
          ];
          a.uniformMatrix4fv(c.perspUniform, !1, new Float32Array(ma(l)));
          a.uniformMatrix4fv(c.cubeUniform, !1, new Float32Array(ma(d)));
          h = [
            l[0] * d[0],
            l[0] * d[1],
            l[0] * d[2],
            0,
            l[5] * d[4],
            l[5] * d[5],
            l[5] * d[6],
            0,
            l[10] * d[8],
            l[10] * d[9],
            l[10] * d[10],
            l[11],
            -d[8],
            -d[9],
            -d[10],
            0,
          ];
          c.nodeCache.sort(ja);
          if (
            200 < c.nodeCache.length &&
            c.nodeCache.length > c.currentNodes.length + 50
          )
            for (
              l = c.nodeCache.splice(200, c.nodeCache.length - 200), d = 0;
              d < l.length;
              d++
            )
              a.deleteTexture(l[d].texture);
          c.currentNodes = [];
          d = 'fbudlr'.split('');
          for (l = 0; 6 > l; l++)
            (u = new ka(wa[l], d[l], 1, 0, 0, m.fullpath)), Ja(h, u, g, e, k);
          c.currentNodes.sort(Q);
          for (g = S.length - 1; 0 <= g; g--)
            -1 === c.currentNodes.indexOf(S[g].node) &&
              ((S[g].node.textureLoad = !1), S.splice(g, 1));
          if (0 === S.length)
            for (g = 0; g < c.currentNodes.length; g++)
              if (((e = c.currentNodes[g]), !e.texture && !e.textureLoad)) {
                e.textureLoad = !0;
                setTimeout(Ka, 0, e);
                break;
              }
          if (!c.drawInProgress) {
            c.drawInProgress = !0;
            a.clear(a.COLOR_BUFFER_BIT);
            for (g = 0; g < c.currentNodes.length; g++)
              1 < c.currentNodes[g].textureLoaded &&
                (a.bindBuffer(a.ARRAY_BUFFER, Fa),
                a.bufferData(
                  a.ARRAY_BUFFER,
                  new Float32Array(c.currentNodes[g].vertices),
                  a.STATIC_DRAW,
                ),
                a.vertexAttribPointer(c.vertPosLocation, 3, a.FLOAT, !1, 0, 0),
                a.bindBuffer(a.ARRAY_BUFFER, Y),
                a.vertexAttribPointer(c.texCoordLocation, 2, a.FLOAT, !1, 0, 0),
                a.bindTexture(a.TEXTURE_2D, c.currentNodes[g].texture),
                a.drawElements(a.TRIANGLES, 6, a.UNSIGNED_SHORT, 0));
            c.drawInProgress = !1;
          }
        }
        if (s.returnImage !== p) return A.toDataURL('image/png');
      } else
        for (
          l = $ / 2,
            s = {
              f:
                'translate3d(-' +
                (l + 2) +
                'px, -' +
                (l + 2) +
                'px, -' +
                l +
                'px)',
              b:
                'translate3d(' +
                (l + 2) +
                'px, -' +
                (l + 2) +
                'px, ' +
                l +
                'px) rotateX(180deg) rotateZ(180deg)',
              u:
                'translate3d(-' +
                (l + 2) +
                'px, -' +
                l +
                'px, ' +
                (l + 2) +
                'px) rotateX(270deg)',
              d:
                'translate3d(-' +
                (l + 2) +
                'px, ' +
                l +
                'px, -' +
                (l + 2) +
                'px) rotateX(90deg)',
              l:
                'translate3d(-' +
                l +
                'px, -' +
                (l + 2) +
                'px, ' +
                (l + 2) +
                'px) rotateX(180deg) rotateY(90deg) rotateZ(180deg)',
              r:
                'translate3d(' +
                l +
                'px, -' +
                (l + 2) +
                'px, -' +
                (l + 2) +
                'px) rotateY(270deg)',
            },
            k = 1 / Math.tan(k / 2),
            k = (k * A.clientWidth) / 2 + 'px',
            e =
              'perspective(' +
              k +
              ') translateZ(' +
              k +
              ') rotateX(' +
              g +
              'rad) rotateY(' +
              e +
              'rad) ',
            k = Object.keys(s),
            g = 0;
          6 > g;
          g++
        )
          if ((h = R.querySelector('.pnlm-' + k[g] + 'face')))
            (h.style.webkitTransform = e + s[k[g]]),
              (h.style.transform = e + s[k[g]]);
    };
    this.isLoading = function () {
      if (a && 'multires' == z)
        for (var g = 0; g < c.currentNodes.length; g++)
          if (!c.currentNodes[g].textureLoaded) return !0;
      return !1;
    };
    this.getCanvas = function () {
      return A;
    };
    var S = [],
      La = (function () {
        function c() {
          var d = this;
          this.texture = this.callback = null;
          this.image = new Image();
          this.image.crossOrigin = l ? l : 'anonymous';
          var e = function () {
            if (0 < d.image.width && 0 < d.image.height) {
              var c = d.image;
              a.bindTexture(a.TEXTURE_2D, d.texture);
              a.texImage2D(a.TEXTURE_2D, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, c);
              a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
              a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
              a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
              a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
              a.bindTexture(a.TEXTURE_2D, null);
              d.callback(d.texture, !0);
            } else d.callback(d.texture, !1);
            S.length
              ? ((c = S.shift()), d.loadTexture(c.src, c.texture, c.callback))
              : (k[g++] = d);
          };
          this.image.addEventListener('load', e);
          this.image.addEventListener('error', e);
        }
        function e(a, c, e, g) {
          this.node = a;
          this.src = c;
          this.texture = e;
          this.callback = g;
        }
        var g = 4,
          k = {},
          l;
        c.prototype.loadTexture = function (a, c, e) {
          this.texture = c;
          this.callback = e;
          this.image.src = a;
        };
        for (var h = 0; h < g; h++) k[h] = new c();
        return function (c, h, m, p) {
          l = p;
          p = a.createTexture();
          g ? k[--g].loadTexture(h, p, m) : S.push(new e(c, h, p, m));
          return p;
        };
      })();
  }
  var s =
      'attribute vec2 a_texCoord;varying vec2 v_texCoord;void main() {gl_Position = vec4(a_texCoord, 0.0, 1.0);v_texCoord = a_texCoord;}',
    k =
      'attribute vec3 a_vertCoord;attribute vec2 a_texCoord;uniform mat4 u_cubeMatrix;uniform mat4 u_perspMatrix;varying mediump vec2 v_texCoord;void main(void) {gl_Position = u_perspMatrix * u_cubeMatrix * vec4(a_vertCoord, 1.0);v_texCoord = a_texCoord;}',
    oa =
      'precision highp float;\nuniform float u_aspectRatio;\nuniform float u_psi;\nuniform float u_theta;\nuniform float u_f;\nuniform float u_h;\nuniform float u_v;\nuniform float u_vo;\nuniform float u_rot;\nconst float PI = 3.14159265358979323846264;\nuniform sampler2D u_image0;\nuniform sampler2D u_image1;\nuniform bool u_splitImage;\nuniform samplerCube u_imageCube;\nvarying vec2 v_texCoord;\nuniform vec4 u_backgroundColor;\nvoid main() {\nfloat x = v_texCoord.x * u_aspectRatio;\nfloat y = v_texCoord.y;\nfloat sinrot = sin(u_rot);\nfloat cosrot = cos(u_rot);\nfloat rot_x = x * cosrot - y * sinrot;\nfloat rot_y = x * sinrot + y * cosrot;\nfloat sintheta = sin(u_theta);\nfloat costheta = cos(u_theta);\nfloat a = u_f * costheta - rot_y * sintheta;\nfloat root = sqrt(rot_x * rot_x + a * a);\nfloat lambda = atan(rot_x / root, a / root) + u_psi;\nfloat phi = atan((rot_y * costheta + u_f * sintheta) / root);',
    qa =
      oa +
      'float cosphi = cos(phi);\ngl_FragColor = textureCube(u_imageCube, vec3(cosphi*sin(lambda), sin(phi), cosphi*cos(lambda)));\n}',
    pa =
      oa +
      'lambda = mod(lambda + PI, PI * 2.0) - PI;\nvec2 coord = vec2(lambda / PI, phi / (PI / 2.0));\nif(coord.x < -u_h || coord.x > u_h || coord.y < -u_v + u_vo || coord.y > u_v + u_vo)\ngl_FragColor = u_backgroundColor;\nelse {\nif(u_splitImage) {\nif(coord.x < 0.0)\ngl_FragColor = texture2D(u_image0, vec2((coord.x + u_h) / u_h, (-coord.y + u_v + u_vo) / (u_v * 2.0)));\nelse\ngl_FragColor = texture2D(u_image1, vec2((coord.x + u_h) / u_h - 1.0, (-coord.y + u_v + u_vo) / (u_v * 2.0)));\n} else {\ngl_FragColor = texture2D(u_image0, vec2((coord.x + u_h) / (u_h * 2.0), (-coord.y + u_v + u_vo) / (u_v * 2.0)));\n}\n}\n}',
    bb =
      'varying mediump vec2 v_texCoord;uniform sampler2D u_sampler;void main(void) {gl_FragColor = texture2D(u_sampler, v_texCoord);}';
  return {
    renderer: function (g, k, p, s) {
      return new Ba(g, k, p, s);
    },
  };
})(window, document);
window.pannellum = (function (E, g, p) {
  function Ba(s, k) {
    function oa() {
      var a = g.createElement('div');
      a.innerHTML = '\x3c!--[if lte IE 9]><i></i><![endif]--\x3e';
      if (1 == a.getElementsByTagName('i').length) K();
      else {
        ra = b.hfov;
        Ga = b.pitch;
        var f;
        if ('cubemap' == b.type) {
          P = [];
          for (a = 0; 6 > a; a++)
            P.push(new Image()), (P[a].crossOrigin = b.crossOrigin);
          q.load.lbox.style.display = 'block';
          q.load.lbar.style.display = 'none';
        } else if ('multires' == b.type)
          (a = JSON.parse(JSON.stringify(b.multiRes))),
            b.basePath &&
            b.multiRes.basePath &&
            !/^(?:[a-z]+:)?\/\//i.test(b.multiRes.basePath)
              ? (a.basePath = b.basePath + b.multiRes.basePath)
              : b.multiRes.basePath
              ? (a.basePath = b.multiRes.basePath)
              : b.basePath && (a.basePath = b.basePath),
            (P = a);
        else if (!0 === b.dynamic) P = b.panorama;
        else {
          if (b.panorama === p) {
            K(b.strings.noPanoramaError);
            return;
          }
          P = new Image();
        }
        if ('cubemap' == b.type)
          for (
            var n = 6,
              c = function () {
                n--;
                0 === n && pa();
              },
              d = function (a) {
                var ea = g.createElement('a');
                ea.href = a.target.src;
                ea.textContent = ea.href;
                K(b.strings.fileAccessError.replace('%s', ea.outerHTML));
              },
              a = 0;
            a < P.length;
            a++
          )
            (f = b.cubeMap[a]),
              'null' == f
                ? (console.log(
                    'Will use background instead of missing cubemap face ' + a,
                  ),
                  c())
                : (b.basePath && !qa(f) && (f = b.basePath + f),
                  (P[a].onload = c),
                  (P[a].onerror = d),
                  (P[a].src = I(f)));
        else if ('multires' == b.type) pa();
        else if (((f = ''), b.basePath && (f = b.basePath), !0 !== b.dynamic)) {
          f = qa(b.panorama) ? b.panorama : f + b.panorama;
          P.onload = function () {
            E.URL.revokeObjectURL(this.src);
            pa();
          };
          var e = new XMLHttpRequest();
          e.onloadend = function () {
            if (200 != e.status) {
              var a = g.createElement('a');
              a.href = f;
              a.textContent = a.href;
              K(b.strings.fileAccessError.replace('%s', a.outerHTML));
            }
            Ba(this.response);
            q.load.msg.innerHTML = '';
          };
          e.onprogress = function (a) {
            if (a.lengthComputable) {
              q.load.lbarFill.style.width = (a.loaded / a.total) * 100 + '%';
              var b, ea;
              1e6 < a.total
                ? ((b = 'MB'),
                  (ea = (a.loaded / 1e6).toFixed(2)),
                  (a = (a.total / 1e6).toFixed(2)))
                : 1e3 < a.total
                ? ((b = 'kB'),
                  (ea = (a.loaded / 1e3).toFixed(1)),
                  (a = (a.total / 1e3).toFixed(1)))
                : ((b = 'B'), (ea = a.loaded), (a = a.total));
              q.load.msg.innerHTML = ea + ' / ' + a + ' ' + b;
            } else
              (q.load.lbox.style.display = 'block'),
                (q.load.lbar.style.display = 'none');
          };
          try {
            e.open('GET', f, !0);
          } catch (h) {
            K(b.strings.malformedURLError);
          }
          e.responseType = 'blob';
          e.setRequestHeader('Accept', 'image/*,*/*;q=0.9');
          e.withCredentials = 'use-credentials' === b.crossOrigin;
          e.send();
        }
        b.draggable && J.classList.add('pnlm-grab');
        J.classList.remove('pnlm-grabbing');
        Ma = !0 === b.dynamicUpdate;
        b.dynamic && Ma && ((P = b.panorama), pa());
      }
    }
    function qa(a) {
      return (
        /^(?:[a-z]+:)?\/\//i.test(a) || '/' == a[0] || 'blob:' == a.slice(0, 5)
      );
    }
    function pa() {
      C || (C = new libpannellum.renderer(M));
      Sa ||
        ((Sa = !0),
        W.addEventListener('mousedown', ka, !1),
        g.addEventListener('mousemove', ua, !1),
        g.addEventListener('mouseup', ma, !1),
        b.mouseZoom &&
          (J.addEventListener('mousewheel', U, !1),
          J.addEventListener('DOMMouseScroll', U, !1)),
        b.doubleClickZoom && W.addEventListener('dblclick', Ja, !1),
        s.addEventListener('mozfullscreenchange', d, !1),
        s.addEventListener('webkitfullscreenchange', d, !1),
        s.addEventListener('msfullscreenchange', d, !1),
        s.addEventListener('fullscreenchange', d, !1),
        E.addEventListener('resize', z, !1),
        E.addEventListener('orientationchange', z, !1),
        b.disableKeyboardCtrl ||
          (s.addEventListener('keydown', V, !1),
          s.addEventListener('keyup', R, !1),
          s.addEventListener('blur', $, !1)),
        g.addEventListener('mouseleave', ma, !1),
        '' === g.documentElement.style.pointerAction &&
        '' === g.documentElement.style.touchAction
          ? (W.addEventListener('pointerdown', A, !1),
            W.addEventListener('pointermove', c, !1),
            W.addEventListener('pointerup', a, !1),
            W.addEventListener('pointerleave', a, !1))
          : (W.addEventListener('touchstart', Ka, !1),
            W.addEventListener('touchmove', la, !1),
            W.addEventListener('touchend', Ea, !1)),
        E.navigator.pointerEnabled && (s.style.touchAction = 'none'));
      va();
      x(b.hfov);
      setTimeout(function () {}, 500);
    }
    function Ba(a) {
      var f = new FileReader();
      f.addEventListener('loadend', function () {
        var n = f.result;
        if (
          navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad).* os 8_/)
        ) {
          var c = n.indexOf('\u00ff\u00c2');
          (0 > c || 65536 < c) && K(b.strings.iOS8WebGLError);
        }
        c = n.indexOf('<x:xmpmeta');
        if (-1 < c && !0 !== b.ignoreGPanoXMP) {
          var d = n.substring(c, n.indexOf('</x:xmpmeta>') + 12),
            e = function (a) {
              var b;
              0 <= d.indexOf(a + '="')
                ? ((b = d.substring(d.indexOf(a + '="') + a.length + 2)),
                  (b = b.substring(0, b.indexOf('"'))))
                : 0 <= d.indexOf(a + '>') &&
                  ((b = d.substring(d.indexOf(a + '>') + a.length + 1)),
                  (b = b.substring(0, b.indexOf('<'))));
              return b !== p ? Number(b) : null;
            },
            n = e('GPano:FullPanoWidthPixels'),
            c = e('GPano:CroppedAreaImageWidthPixels'),
            g = e('GPano:FullPanoHeightPixels'),
            h = e('GPano:CroppedAreaImageHeightPixels'),
            l = e('GPano:CroppedAreaTopPixels'),
            k = e('GPano:PoseHeadingDegrees'),
            m = e('GPano:PosePitchDegrees'),
            e = e('GPano:PoseRollDegrees');
          null !== n &&
            null !== c &&
            null !== g &&
            null !== h &&
            null !== l &&
            (0 > aa.indexOf('haov') && (b.haov = (c / n) * 360),
            0 > aa.indexOf('vaov') && (b.vaov = (h / g) * 180),
            0 > aa.indexOf('vOffset') &&
              (b.vOffset = -180 * ((l + h / 2) / g - 0.5)),
            null !== k &&
              0 > aa.indexOf('northOffset') &&
              ((b.northOffset = k), !1 !== b.compass && (b.compass = !0)),
            null !== m &&
              null !== e &&
              (0 > aa.indexOf('horizonPitch') && (b.horizonPitch = m),
              0 > aa.indexOf('horizonRoll') && (b.horizonRoll = e)));
        }
        P.src = E.URL.createObjectURL(a);
      });
      f.readAsBinaryString !== p ? f.readAsBinaryString(a) : f.readAsText(a);
    }
    function K(a) {
      a === p && (a = b.strings.genericWebGLError);
      q.errorMsg.innerHTML = '<p>' + a + '</p>';
      v.load.style.display = 'none';
      q.load.box.style.display = 'none';
      q.errorMsg.style.display = 'table';
      Na = !0;
      G = p;
      M.style.display = 'none';
      B('error', a);
    }
    function ja(a) {
      var b = Q(a);
      fa.style.left = b.x + 'px';
      fa.style.top = b.y + 'px';
      clearTimeout(ja.t1);
      clearTimeout(ja.t2);
      fa.style.display = 'block';
      fa.style.opacity = 1;
      ja.t1 = setTimeout(function () {
        fa.style.opacity = 0;
      }, 2e3);
      ja.t2 = setTimeout(function () {
        fa.style.display = 'none';
      }, 2500);
      a.preventDefault();
    }
    function Q(a) {
      var b = s.getBoundingClientRect(),
        n = {};
      n.x = (a.clientX || a.pageX) - b.left;
      n.y = (a.clientY || a.pageY) - b.top;
      return n;
    }
    function ka(a) {
      a.preventDefault();
      s.focus();
      if (G && b.draggable) {
        var f = Q(a);
        if (b.hotSpotDebug) {
          var n = ta(a);
          console.log(
            'Pitch: ' +
              n[0] +
              ', Yaw: ' +
              n[1] +
              ', Center Pitch: ' +
              b.pitch +
              ', Center Yaw: ' +
              b.yaw +
              ', HFOV: ' +
              b.hfov,
          );
        }
        t();
        Da();
        b.roll = 0;
        w.hfov = 0;
        ha = !0;
        N = Date.now();
        xa = f.x;
        ya = f.y;
        Oa = b.yaw;
        Pa = b.pitch;
        J.classList.add('pnlm-grabbing');
        J.classList.remove('pnlm-grab');
        B('mousedown', a);
        F();
      }
    }
    function Ja(a) {
      b.minHfov === b.hfov
        ? da.setHfov(ra, 1e3)
        : ((a = ta(a)), da.lookAt(a[0], a[1], b.minHfov, 1e3));
    }
    function ta(a) {
      var f = Q(a);
      a = C.getCanvas();
      var n = a.clientWidth,
        c = a.clientHeight;
      a = (f.x / n) * 2 - 1;
      var c = ((1 - (f.y / c) * 2) * c) / n,
        e = 1 / Math.tan((b.hfov * Math.PI) / 360),
        d = Math.sin((b.pitch * Math.PI) / 180),
        g = Math.cos((b.pitch * Math.PI) / 180),
        f = e * g - c * d,
        n = Math.sqrt(a * a + f * f),
        c = (180 * Math.atan((c * g + e * d) / n)) / Math.PI;
      a = (180 * Math.atan2(a / n, f / n)) / Math.PI + b.yaw;
      -180 > a && (a += 360);
      180 < a && (a -= 360);
      return [c, a];
    }
    function ua(a) {
      if (ha && G) {
        N = Date.now();
        var f = C.getCanvas(),
          n = f.clientWidth,
          f = f.clientHeight;
        a = Q(a);
        var c =
          (((180 *
            (Math.atan((xa / n) * 2 - 1) - Math.atan((a.x / n) * 2 - 1))) /
            Math.PI) *
            b.hfov) /
            90 +
          Oa;
        w.yaw = ((c - b.yaw) % 360) * 0.2;
        b.yaw = c;
        n =
          (360 * Math.atan((Math.tan((b.hfov / 360) * Math.PI) * f) / n)) /
          Math.PI;
        n =
          (((180 *
            (Math.atan((a.y / f) * 2 - 1) - Math.atan((ya / f) * 2 - 1))) /
            Math.PI) *
            n) /
            90 +
          Pa;
        w.pitch = 0.2 * (n - b.pitch);
        b.pitch = n;
      }
    }
    function ma(a) {
      ha &&
        ((ha = !1),
        15 < Date.now() - N && (w.pitch = w.yaw = 0),
        J.classList.add('pnlm-grab'),
        J.classList.remove('pnlm-grabbing'),
        (N = Date.now()),
        B('mouseup', a));
    }
    function Ka(a) {
      if (G && b.draggable) {
        t();
        Da();
        b.roll = 0;
        w.hfov = 0;
        var f = Q(a.targetTouches[0]);
        xa = f.x;
        ya = f.y;
        if (2 == a.targetTouches.length) {
          var n = Q(a.targetTouches[1]);
          xa += 0.5 * (n.x - f.x);
          ya += 0.5 * (n.y - f.y);
          Ha = Math.sqrt((f.x - n.x) * (f.x - n.x) + (f.y - n.y) * (f.y - n.y));
        }
        ha = !0;
        N = Date.now();
        Oa = b.yaw;
        Pa = b.pitch;
        B('touchstart', a);
        F();
      }
    }
    function la(a) {
      if (b.draggable && (a.preventDefault(), G && (N = Date.now()), ha && G)) {
        var f = Q(a.targetTouches[0]),
          n = f.x,
          c = f.y;
        2 == a.targetTouches.length &&
          -1 != Ha &&
          ((a = Q(a.targetTouches[1])),
          (n += 0.5 * (a.x - f.x)),
          (c += 0.5 * (a.y - f.y)),
          (f = Math.sqrt(
            (f.x - a.x) * (f.x - a.x) + (f.y - a.y) * (f.y - a.y),
          )),
          x(b.hfov + 0.1 * (Ha - f)),
          (Ha = f));
        f = (b.hfov / 360) * b.touchPanSpeedCoeffFactor;
        n = (xa - n) * f + Oa;
        w.yaw = ((n - b.yaw) % 360) * 0.2;
        b.yaw = n;
        c = (c - ya) * f + Pa;
        w.pitch = 0.2 * (c - b.pitch);
        b.pitch = c;
      }
    }
    function Ea() {
      ha = !1;
      150 < Date.now() - N && (w.pitch = w.yaw = 0);
      Ha = -1;
      N = Date.now();
      B('touchend', event);
    }
    function A(a) {
      'touch' == a.pointerType &&
        G &&
        b.draggable &&
        (ia.push(a.pointerId),
        za.push({ clientX: a.clientX, clientY: a.clientY }),
        (a.targetTouches = za),
        Ka(a),
        a.preventDefault());
    }
    function c(a) {
      if ('touch' == a.pointerType && b.draggable)
        for (var f = 0; f < ia.length; f++)
          if (a.pointerId == ia[f]) {
            za[f].clientX = a.clientX;
            za[f].clientY = a.clientY;
            a.targetTouches = za;
            la(a);
            a.preventDefault();
            break;
          }
    }
    function a(a) {
      if ('touch' == a.pointerType) {
        for (var b = !1, n = 0; n < ia.length; n++)
          a.pointerId == ia[n] && (ia[n] = p), ia[n] && (b = !0);
        b || ((ia = []), (za = []), Ea());
        a.preventDefault();
      }
    }
    function U(a) {
      G &&
        ('fullscreenonly' != b.mouseZoom || Aa) &&
        (a.preventDefault(),
        t(),
        (N = Date.now()),
        a.wheelDeltaY
          ? (x(b.hfov - 0.05 * a.wheelDeltaY),
            (w.hfov = 0 > a.wheelDelta ? 1 : -1))
          : a.wheelDelta
          ? (x(b.hfov - 0.05 * a.wheelDelta),
            (w.hfov = 0 > a.wheelDelta ? 1 : -1))
          : a.detail &&
            (x(b.hfov + 1.5 * a.detail), (w.hfov = 0 < a.detail ? 1 : -1)),
        F());
    }
    function V(a) {
      t();
      N = Date.now();
      Da();
      b.roll = 0;
      var f = a.which || a.keycode;
      0 > b.capturedKeyNumbers.indexOf(f) ||
        (a.preventDefault(), 27 == f ? Aa && h() : wa(f, !0));
    }
    function $() {
      for (var a = 0; 10 > a; a++) r[a] = !1;
    }
    function R(a) {
      var f = a.which || a.keycode;
      0 > b.capturedKeyNumbers.indexOf(f) || (a.preventDefault(), wa(f, !1));
    }
    function wa(a, b) {
      var n = !1;
      switch (a) {
        case 109:
        case 189:
        case 17:
        case 173:
          r[0] != b && (n = !0);
          r[0] = b;
          break;
        case 107:
        case 187:
        case 16:
        case 61:
          r[1] != b && (n = !0);
          r[1] = b;
          break;
        case 38:
          r[2] != b && (n = !0);
          r[2] = b;
          break;
        case 87:
          r[6] != b && (n = !0);
          r[6] = b;
          break;
        case 40:
          r[3] != b && (n = !0);
          r[3] = b;
          break;
        case 83:
          r[7] != b && (n = !0);
          r[7] = b;
          break;
        case 37:
          r[4] != b && (n = !0);
          r[4] = b;
          break;
        case 65:
          r[8] != b && (n = !0);
          r[8] = b;
          break;
        case 39:
          r[5] != b && (n = !0);
          r[5] = b;
          break;
        case 68:
          r[9] != b && (n = !0), (r[9] = b);
      }
      n &&
        b &&
        ((ba =
          'undefined' !== typeof performance && performance.now()
            ? performance.now()
            : Date.now()),
        F());
    }
    function ga() {
      if (G) {
        var a = !1,
          f = b.pitch,
          n = b.yaw,
          c = b.hfov,
          e;
        e =
          'undefined' !== typeof performance && performance.now()
            ? performance.now()
            : Date.now();
        ba === p && (ba = e);
        var d = ((e - ba) * b.hfov) / 1700,
          d = Math.min(d, 1);
        r[0] &&
          !0 === b.keyboardZoom &&
          (x(b.hfov + (0.8 * w.hfov + 0.5) * d), (a = !0));
        r[1] &&
          !0 === b.keyboardZoom &&
          (x(b.hfov + (0.8 * w.hfov - 0.2) * d), (a = !0));
        if (r[2] || r[6]) (b.pitch += (0.8 * w.pitch + 0.2) * d), (a = !0);
        if (r[3] || r[7]) (b.pitch += (0.8 * w.pitch - 0.2) * d), (a = !0);
        if (r[4] || r[8]) (b.yaw += (0.8 * w.yaw - 0.2) * d), (a = !0);
        if (r[5] || r[9]) (b.yaw += (0.8 * w.yaw + 0.2) * d), (a = !0);
        a && (N = Date.now());
        if (b.autoRotate) {
          if (0.001 < e - ba) {
            var a = (e - ba) / 1e3,
              g = ((w.yaw / a) * d - 0.2 * b.autoRotate) * a,
              g =
                (0 < -b.autoRotate ? 1 : -1) *
                Math.min(Math.abs(b.autoRotate * a), Math.abs(g));
            b.yaw += g;
          }
          b.autoRotateStopDelay &&
            ((b.autoRotateStopDelay -= e - ba),
            0 >= b.autoRotateStopDelay &&
              ((b.autoRotateStopDelay = !1),
              (Z = b.autoRotate),
              (b.autoRotate = 0)));
        }
        O.pitch && (m('pitch'), (f = b.pitch));
        O.yaw && (m('yaw'), (n = b.yaw));
        O.hfov && (m('hfov'), (c = b.hfov));
        0 < d &&
          !b.autoRotate &&
          ((a = 1 - b.friction),
          r[4] || r[5] || r[8] || r[9] || O.yaw || (b.yaw += w.yaw * d * a),
          r[2] ||
            r[3] ||
            r[6] ||
            r[7] ||
            O.pitch ||
            (b.pitch += w.pitch * d * a),
          r[0] || r[1] || O.hfov || x(b.hfov + w.hfov * d * a));
        ba = e;
        0 < d &&
          ((w.yaw = 0.8 * w.yaw + ((b.yaw - n) / d) * 0.2),
          (w.pitch = 0.8 * w.pitch + ((b.pitch - f) / d) * 0.2),
          (w.hfov = 0.8 * w.hfov + ((b.hfov - c) / d) * 0.2),
          (f = b.autoRotate ? Math.abs(b.autoRotate) : 5),
          (w.yaw = Math.min(f, Math.max(w.yaw, -f))),
          (w.pitch = Math.min(f, Math.max(w.pitch, -f))),
          (w.hfov = Math.min(f, Math.max(w.hfov, -f))));
        r[0] && r[1] && (w.hfov = 0);
        (r[2] || r[6]) && (r[3] || r[7]) && (w.pitch = 0);
        (r[4] || r[8]) && (r[5] || r[9]) && (w.yaw = 0);
      }
    }
    function m(a) {
      var f = O[a],
        n = Math.min(
          1,
          Math.max((Date.now() - f.startTime) / 1e3 / (f.duration / 1e3), 0),
        ),
        n =
          f.startPosition +
          b.animationTimingFunction(n) * (f.endPosition - f.startPosition);
      if (
        (f.endPosition > f.startPosition && n >= f.endPosition) ||
        (f.endPosition < f.startPosition && n <= f.endPosition) ||
        f.endPosition === f.startPosition
      )
        (n = f.endPosition), (w[a] = 0), delete O[a];
      b[a] = n;
    }
    function z() {
      d('resize');
    }
    function F() {
      Ta || ((Ta = !0), ca());
    }
    function ca() {
      if (!Za)
        if ((Fa(), Qa && clearTimeout(Qa), ha || !0 === X))
          requestAnimationFrame(ca);
        else if (
          r[0] ||
          r[1] ||
          r[2] ||
          r[3] ||
          r[4] ||
          r[5] ||
          r[6] ||
          r[7] ||
          r[8] ||
          r[9] ||
          b.autoRotate ||
          O.pitch ||
          O.yaw ||
          O.hfov ||
          0.01 < Math.abs(w.yaw) ||
          0.01 < Math.abs(w.pitch) ||
          0.01 < Math.abs(w.hfov)
        )
          ga(),
            0 <= b.autoRotateInactivityDelay &&
              Z &&
              Date.now() - N > b.autoRotateInactivityDelay &&
              !b.autoRotate &&
              ((b.autoRotate = Z), da.lookAt(Ga, p, ra, 3e3)),
            requestAnimationFrame(ca);
        else if (C && (C.isLoading() || (!0 === b.dynamic && Ma)))
          requestAnimationFrame(ca);
        else {
          B('animatefinished', {
            pitch: da.getPitch(),
            yaw: da.getYaw(),
            hfov: da.getHfov(),
          });
          Ta = !1;
          ba = p;
          var a = b.autoRotateInactivityDelay - (Date.now() - N);
          0 < a
            ? (Qa = setTimeout(function () {
                b.autoRotate = Z;
                da.lookAt(Ga, p, ra, 3e3);
                F();
              }, a))
            : 0 <= b.autoRotateInactivityDelay &&
              Z &&
              ((b.autoRotate = Z), da.lookAt(Ga, p, ra, 3e3), F());
        }
    }
    function Fa() {
      var a;
      if (G) {
        var f = C.getCanvas();
        !1 !== b.autoRotate &&
          (360 < b.yaw ? (b.yaw -= 360) : -360 > b.yaw && (b.yaw += 360));
        a = b.yaw;
        var n = 0;
        if (b.avoidShowingBackground) {
          var c = b.hfov / 2,
            d =
              (180 *
                Math.atan2(Math.tan((c / 180) * Math.PI), f.width / f.height)) /
              Math.PI;
          b.vaov > b.haov
            ? Math.min(
                Math.cos(((b.pitch - c) / 180) * Math.PI),
                Math.cos(((b.pitch + c) / 180) * Math.PI),
              )
            : (n =
                c *
                (1 -
                  Math.min(
                    Math.cos(((b.pitch - d) / 180) * Math.PI),
                    Math.cos(((b.pitch + d) / 180) * Math.PI),
                  )));
        }
        var c = b.maxYaw - b.minYaw,
          d = -180,
          e = 180;
        360 > c &&
          ((d = b.minYaw + b.hfov / 2 + n),
          (e = b.maxYaw - b.hfov / 2 - n),
          c < b.hfov && (d = e = (d + e) / 2),
          (b.yaw = Math.max(d, Math.min(e, b.yaw))));
        !1 === b.autoRotate &&
          (360 < b.yaw ? (b.yaw -= 360) : -360 > b.yaw && (b.yaw += 360));
        !1 !== b.autoRotate && a != b.yaw && ba !== p && (b.autoRotate *= -1);
        a =
          ((2 *
            Math.atan(
              Math.tan((b.hfov / 180) * Math.PI * 0.5) / (f.width / f.height),
            )) /
            Math.PI) *
          180;
        f = b.minPitch + a / 2;
        n = b.maxPitch - a / 2;
        b.maxPitch - b.minPitch < a && (f = n = (f + n) / 2);
        isNaN(f) && (f = -90);
        isNaN(n) && (n = 90);
        b.pitch = Math.max(f, Math.min(n, b.pitch));
        C.render(
          (b.pitch * Math.PI) / 180,
          (b.yaw * Math.PI) / 180,
          (b.hfov * Math.PI) / 180,
          { roll: (b.roll * Math.PI) / 180 },
        );
        b.hotSpots.forEach(Ca);
        b.compass &&
          ((Ia.style.transform = 'rotate(' + (-b.yaw - b.northOffset) + 'deg)'),
          (Ia.style.webkitTransform =
            'rotate(' + (-b.yaw - b.northOffset) + 'deg)'));
      }
    }
    function Y(a, b, c, d) {
      this.w = a;
      this.x = b;
      this.y = c;
      this.z = d;
    }
    function na(a) {
      var f;
      f = a.alpha;
      var c = a.beta;
      a = a.gamma;
      c = [
        c ? (c * Math.PI) / 180 / 2 : 0,
        a ? (a * Math.PI) / 180 / 2 : 0,
        f ? (f * Math.PI) / 180 / 2 : 0,
      ];
      f = [Math.cos(c[0]), Math.cos(c[1]), Math.cos(c[2])];
      c = [Math.sin(c[0]), Math.sin(c[1]), Math.sin(c[2])];
      f = new Y(
        f[0] * f[1] * f[2] - c[0] * c[1] * c[2],
        c[0] * f[1] * f[2] - f[0] * c[1] * c[2],
        f[0] * c[1] * f[2] + c[0] * f[1] * c[2],
        f[0] * f[1] * c[2] + c[0] * c[1] * f[2],
      );
      f = f.multiply(new Y(Math.sqrt(0.5), -Math.sqrt(0.5), 0, 0));
      c = E.orientation ? (-E.orientation * Math.PI) / 180 / 2 : 0;
      f = f.multiply(new Y(Math.cos(c), 0, -Math.sin(c), 0)).toEulerAngles();
      'number' == typeof X && 10 > X
        ? (X += 1)
        : 10 === X
        ? (($a = (f[2] / Math.PI) * 180 + b.yaw),
          (X = !0),
          requestAnimationFrame(ca))
        : ((b.pitch = (f[0] / Math.PI) * 180),
          (b.roll = (-f[1] / Math.PI) * 180),
          (b.yaw = (-f[2] / Math.PI) * 180 + $a));
    }
    function va() {
      try {
        var a = {};
        b.horizonPitch !== p &&
          (a.horizonPitch = (b.horizonPitch * Math.PI) / 180);
        b.horizonRoll !== p &&
          (a.horizonRoll = (b.horizonRoll * Math.PI) / 180);
        b.backgroundColor !== p && (a.backgroundColor = b.backgroundColor);
        C.init(
          P,
          b.type,
          b.dynamic,
          (b.haov * Math.PI) / 180,
          (b.vaov * Math.PI) / 180,
          (b.vOffset * Math.PI) / 180,
          S,
          a,
        );
        !0 !== b.dynamic && (P = p);
      } catch (f) {
        if ('webgl error' == f.type || 'no webgl' == f.type) K();
        else if ('webgl size error' == f.type)
          K(
            b.strings.textureSizeError
              .replace('%s', f.width)
              .replace('%s', f.maxWidth),
          );
        else throw (K(b.strings.unknownError), f);
      }
    }
    function S() {
      if (b.sceneFadeDuration && C.fadeImg !== p) {
        C.fadeImg.style.opacity = 0;
        var a = C.fadeImg;
        delete C.fadeImg;
        setTimeout(function () {
          M.removeChild(a);
          B('scenechangefadedone');
        }, b.sceneFadeDuration);
      }
      Ia.style.display = b.compass ? 'inline' : 'none';
      L();
      q.load.box.style.display = 'none';
      sa !== p && (M.removeChild(sa), (sa = p));
      G = !0;
      B('load');
      F();
    }
    function La(a) {
      a.pitch = Number(a.pitch) || 0;
      a.yaw = Number(a.yaw) || 0;
      var f = g.createElement('div');
      f.className = 'pnlm-hotspot-base';
      f.className = a.cssClass
        ? f.className + (' ' + a.cssClass)
        : f.className + (' pnlm-hotspot pnlm-sprite pnlm-' + D(a.type));
      var c = g.createElement('span');
      a.text && (c.innerHTML = D(a.text));
      var d;
      if (a.video) {
        d = g.createElement('video');
        var e = a.video;
        b.basePath && !qa(e) && (e = b.basePath + e);
        d.src = I(e);
        d.controls = !0;
        d.style.width = a.width + 'px';
        M.appendChild(f);
        c.appendChild(d);
      } else if (a.image) {
        e = a.image;
        b.basePath && !qa(e) && (e = b.basePath + e);
        d = g.createElement('a');
        d.href = I(a.URL ? a.URL : e, !0);
        d.target = '_blank';
        c.appendChild(d);
        var h = g.createElement('img');
        h.src = I(e);
        h.style.width = a.width + 'px';
        h.style.paddingTop = '5px';
        M.appendChild(f);
        d.appendChild(h);
        c.style.maxWidth = 'initial';
      } else if (a.URL) {
        d = g.createElement('a');
        d.href = I(a.URL, !0);
        if (a.attributes)
          for (e in a.attributes) d.setAttribute(e, a.attributes[e]);
        else d.target = '_blank';
        M.appendChild(d);
        f.className += ' pnlm-pointer';
        c.className += ' pnlm-pointer';
        d.appendChild(f);
      } else
        a.sceneId &&
          ((f.onclick = f.ontouchend =
            function () {
              f.clicked ||
                ((f.clicked = !0),
                y(a.sceneId, a.targetPitch, a.targetYaw, a.targetHfov));
              return !1;
            }),
          (f.className += ' pnlm-pointer'),
          (c.className += ' pnlm-pointer')),
          M.appendChild(f);
      if (a.createTooltipFunc) a.createTooltipFunc(f, a.createTooltipArgs);
      else if (a.text || a.video || a.image)
        f.classList.add('pnlm-tooltip'),
          f.appendChild(c),
          (c.style.width = c.scrollWidth - 20 + 'px'),
          (c.style.marginLeft = -(c.scrollWidth - f.offsetWidth) / 2 + 'px'),
          (c.style.marginTop = -c.scrollHeight - 12 + 'px');
      a.clickHandlerFunc &&
        (f.addEventListener(
          'click',
          function (b) {
            a.clickHandlerFunc(b, a.clickHandlerArgs);
          },
          'false',
        ),
        (f.className += ' pnlm-pointer'),
        (c.className += ' pnlm-pointer'));
      a.div = f;
    }
    function L() {
      Ua ||
        (b.hotSpots
          ? ((b.hotSpots = b.hotSpots.sort(function (a, b) {
              return a.pitch < b.pitch;
            })),
            b.hotSpots.forEach(La))
          : (b.hotSpots = []),
        (Ua = !0),
        b.hotSpots.forEach(Ca));
    }
    function e() {
      var a = b.hotSpots;
      Ua = !1;
      delete b.hotSpots;
      if (a)
        for (var f = 0; f < a.length; f++) {
          var c = a[f].div;
          if (c) {
            for (; c.parentNode && c.parentNode != M; ) c = c.parentNode;
            M.removeChild(c);
          }
          delete a[f].div;
        }
    }
    function Ca(a) {
      var f = Math.sin((a.pitch * Math.PI) / 180),
        c = Math.cos((a.pitch * Math.PI) / 180),
        d = Math.sin((b.pitch * Math.PI) / 180),
        e = Math.cos((b.pitch * Math.PI) / 180),
        g = Math.cos(((-a.yaw + b.yaw) * Math.PI) / 180),
        h = f * d + c * g * e;
      if (
        (90 >= a.yaw && -90 < a.yaw && 0 >= h) ||
        ((90 < a.yaw || -90 >= a.yaw) && 0 >= h)
      )
        a.div.style.visibility = 'hidden';
      else {
        var l = Math.sin(((-a.yaw + b.yaw) * Math.PI) / 180),
          k = Math.tan((b.hfov * Math.PI) / 360);
        a.div.style.visibility = 'visible';
        var m = C.getCanvas(),
          p = m.clientWidth,
          m = m.clientHeight,
          f = [
            ((-p / k) * l * c) / h / 2,
            ((-p / k) * (f * e - c * g * d)) / h / 2,
          ],
          c = Math.sin((b.roll * Math.PI) / 180),
          d = Math.cos((b.roll * Math.PI) / 180),
          f = [f[0] * d - f[1] * c, f[0] * c + f[1] * d];
        f[0] += (p - a.div.offsetWidth) / 2;
        f[1] += (m - a.div.offsetHeight) / 2;
        p =
          'translate(' +
          f[0] +
          'px, ' +
          f[1] +
          'px) translateZ(9999px) rotate(' +
          b.roll +
          'deg)';
        a.scale && (p += ' scale(' + ra / b.hfov / h + ')');
        a.div.style.webkitTransform = p;
        a.div.style.MozTransform = p;
        a.div.style.transform = p;
      }
    }
    function H(a) {
      b = {};
      var f,
        c,
        d = 'haov vaov vOffset northOffset horizonPitch horizonRoll'.split(' ');
      aa = [];
      for (f in Va) Va.hasOwnProperty(f) && (b[f] = Va[f]);
      for (f in k.default)
        if (k.default.hasOwnProperty(f))
          if ('strings' == f)
            for (c in k.default.strings)
              k.default.strings.hasOwnProperty(c) &&
                (b.strings[c] = D(k.default.strings[c]));
          else (b[f] = k.default[f]), 0 <= d.indexOf(f) && aa.push(f);
      if (null !== a && '' !== a && k.scenes && k.scenes[a]) {
        var e = k.scenes[a];
        for (f in e)
          if (e.hasOwnProperty(f))
            if ('strings' == f)
              for (c in e.strings)
                e.strings.hasOwnProperty(c) && (b.strings[c] = D(e.strings[c]));
            else (b[f] = e[f]), 0 <= d.indexOf(f) && aa.push(f);
        b.scene = a;
      }
      for (f in k)
        if (k.hasOwnProperty(f))
          if ('strings' == f)
            for (c in k.strings)
              k.strings.hasOwnProperty(c) && (b.strings[c] = D(k.strings[c]));
          else (b[f] = k[f]), 0 <= d.indexOf(f) && aa.push(f);
    }
    function l(a) {
      if ((a = a ? a : !1) && 'preview' in b) {
        var c = b.preview;
        b.basePath && !qa(c) && (c = b.basePath + c);
        sa = g.createElement('div');
        sa.className = 'pnlm-preview-img';
        sa.style.backgroundImage =
          "url('" + I(c).replace(/"/g, '%22').replace(/'/g, '%27') + "')";
        M.appendChild(sa);
      }
      var c = b.title,
        d = b.author;
      a &&
        ('previewTitle' in b && (b.title = b.previewTitle),
        'previewAuthor' in b && (b.author = b.previewAuthor));
      b.hasOwnProperty('title') || (q.title.innerHTML = '');
      b.hasOwnProperty('author') || (q.author.innerHTML = '');
      b.hasOwnProperty('title') ||
        b.hasOwnProperty('author') ||
        (q.container.style.display = 'none');
      v.load.innerHTML = '<p>' + b.strings.loadButtonLabel + '</p>';
      q.load.boxp.innerHTML = b.strings.loadingLabel;
      for (var e in b)
        if (b.hasOwnProperty(e))
          switch (e) {
            case 'title':
              q.title.innerHTML = D(b[e]);
              q.container.style.display = 'inline';
              break;
            case 'author':
              var h = D(b[e]);
              b.authorURL &&
                ((h = g.createElement('a')),
                (h.href = I(b.authorURL, !0)),
                (h.target = '_blank'),
                (h.innerHTML = D(b[e])),
                (h = h.outerHTML));
              q.author.innerHTML = b.strings.bylineLabel.replace('%s', h);
              q.container.style.display = 'inline';
              break;
            case 'fallback':
              h = g.createElement('a');
              h.href = I(b[e], !0);
              h.target = '_blank';
              h.textContent =
                'Click here to view this panorama in an alternative viewer.';
              var k = g.createElement('p');
              k.textContent = 'Your browser does not support WebGL.';
              k.appendChild(g.createElement('br'));
              k.appendChild(h);
              q.errorMsg.innerHTML = '';
              q.errorMsg.appendChild(k);
              break;
            case 'hfov':
              x(Number(b[e]));
              break;
            case 'autoLoad':
              !0 === b[e] &&
                C === p &&
                ((q.load.box.style.display = 'inline'),
                (v.load.style.display = 'none'),
                oa());
              break;
            case 'showZoomCtrl':
              v.zoom.style.display =
                b[e] && !1 != b.showControls ? 'block' : 'none';
              break;
            case 'showFullscreenCtrl':
              v.fullscreen.style.display =
                b[e] &&
                !1 != b.showControls &&
                ('fullscreen' in g ||
                  'mozFullScreen' in g ||
                  'webkitIsFullScreen' in g ||
                  'msFullscreenElement' in g)
                  ? 'block'
                  : 'none';
              break;
            case 'hotSpotDebug':
              Wa.style.display = b[e] ? 'block' : 'none';
              break;
            case 'showControls':
              b[e] ||
                ((v.orientation.style.display = 'none'),
                (v.zoom.style.display = 'none'),
                (v.fullscreen.style.display = 'none'));
              break;
            case 'orientationOnByDefault':
              b[e] && Ra();
          }
      a &&
        (c ? (b.title = c) : delete b.title,
        d ? (b.author = d) : delete b.author);
    }
    function h() {
      if (G && !Na)
        if (Aa)
          g.exitFullscreen
            ? g.exitFullscreen()
            : g.mozCancelFullScreen
            ? g.mozCancelFullScreen()
            : g.webkitCancelFullScreen
            ? g.webkitCancelFullScreen()
            : g.msExitFullscreen && g.msExitFullscreen();
        else
          try {
            s.requestFullscreen
              ? s.requestFullscreen()
              : s.mozRequestFullScreen
              ? s.mozRequestFullScreen()
              : s.msRequestFullscreen
              ? s.msRequestFullscreen()
              : s.webkitRequestFullScreen();
          } catch (a) {}
    }
    function d(a) {
      g.fullscreenElement ||
      g.fullscreen ||
      g.mozFullScreen ||
      g.webkitIsFullScreen ||
      g.msFullscreenElement
        ? (v.fullscreen.classList.add('pnlm-fullscreen-toggle-button-active'),
          (Aa = !0))
        : (v.fullscreen.classList.remove(
            'pnlm-fullscreen-toggle-button-active',
          ),
          (Aa = !1));
      'resize' !== a && B('fullscreenchange', Aa);
      C.resize();
      x(b.hfov);
      F();
    }
    function u(a) {
      var c = b.minHfov;
      'multires' == b.type &&
        C &&
        !b.multiResMinHfov &&
        (c = Math.min(
          c,
          C.getCanvas().width / ((b.multiRes.cubeResolution / 90) * 0.9),
        ));
      if (c > b.maxHfov)
        return (
          console.log('HFOV bounds do not make sense (minHfov > maxHfov).'),
          b.hfov
        );
      var d = b.hfov,
        d = a < c ? c : a > b.maxHfov ? b.maxHfov : a;
      b.avoidShowingBackground &&
        C &&
        ((a = C.getCanvas()),
        (d = Math.min(
          d,
          (360 *
            Math.atan(
              (Math.tan(((b.maxPitch - b.minPitch) / 360) * Math.PI) /
                a.height) *
                a.width,
            )) /
            Math.PI,
        )));
      return d;
    }
    function x(a) {
      b.hfov = u(a);
      B('zoomchange', b.hfov);
    }
    function t() {
      O = {};
      Z = b.autoRotate ? b.autoRotate : Z;
      b.autoRotate = !1;
    }
    function Ya() {
      Na &&
        ((q.load.box.style.display = 'none'),
        (q.errorMsg.style.display = 'none'),
        (Na = !1),
        (M.style.display = 'block'),
        B('errorcleared'));
      G = !1;
      v.load.style.display = 'none';
      q.load.box.style.display = 'inline';
      oa();
    }
    function y(a, c, d, h, g) {
      G || (g = !0);
      G = !1;
      O = {};
      var m, q;
      if (
        b.sceneFadeDuration &&
        !g &&
        ((m = C.render(
          (b.pitch * Math.PI) / 180,
          (b.yaw * Math.PI) / 180,
          (b.hfov * Math.PI) / 180,
          { returnImage: !0 },
        )),
        m !== p)
      ) {
        g = new Image();
        g.className = 'pnlm-fade-img';
        g.style.transition = 'opacity ' + b.sceneFadeDuration / 1e3 + 's';
        g.style.width = '100%';
        g.style.height = '100%';
        g.onload = function () {
          y(a, c, d, h, !0);
        };
        g.src = m;
        M.appendChild(g);
        C.fadeImg = g;
        return;
      }
      g = 'same' === c ? b.pitch : c;
      m =
        'same' === d
          ? b.yaw
          : 'sameAzimuth' === d
          ? b.yaw + (b.northOffset || 0) - (k.scenes[a].northOffset || 0)
          : d;
      q = 'same' === h ? b.hfov : h;
      e();
      H(a);
      w.yaw = w.pitch = w.hfov = 0;
      l();
      g !== p && (b.pitch = g);
      m !== p && (b.yaw = m);
      q !== p && (b.hfov = q);
      B('scenechange', a);
      Ya();
    }
    function Da() {
      E.removeEventListener('deviceorientation', na);
      v.orientation.classList.remove('pnlm-orientation-button-active');
      X = !1;
    }
    function Ra() {
      'function' === typeof DeviceMotionEvent.requestPermission
        ? DeviceOrientationEvent.requestPermission().then(function (a) {
            'granted' == a &&
              ((X = 1),
              E.addEventListener('deviceorientation', na),
              v.orientation.classList.add('pnlm-orientation-button-active'));
          })
        : ((X = 1),
          E.addEventListener('deviceorientation', na),
          v.orientation.classList.add('pnlm-orientation-button-active'));
    }
    function D(a) {
      return k.escapeHTML
        ? String(a)
            .split(/&/g)
            .join('&amp;')
            .split('"')
            .join('&quot;')
            .split("'")
            .join('&#39;')
            .split('<')
            .join('&lt;')
            .split('>')
            .join('&gt;')
            .split('/')
            .join('&#x2f;')
            .split('\n')
            .join('<br>')
        : String(a).split('\n').join('<br>');
    }
    function I(a, b) {
      try {
        var c = decodeURIComponent(ab(a))
          .replace(/[^\w:]/g, '')
          .toLowerCase();
      } catch (d) {
        return 'about:blank';
      }
      return 0 === c.indexOf('javascript:') || 0 === c.indexOf('vbscript:')
        ? (console.log('Script URL removed.'), 'about:blank')
        : b && 0 === c.indexOf('data:')
        ? (console.log('Data URI removed from link.'), 'about:blank')
        : a;
    }
    function ab(a) {
      return a.replace(
        /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
        function (a, b) {
          b = b.toLowerCase();
          return 'colon' === b
            ? ':'
            : '#' === b.charAt(0)
            ? 'x' === b.charAt(1)
              ? String.fromCharCode(parseInt(b.substring(2), 16))
              : String.fromCharCode(+b.substring(1))
            : '';
        },
      );
    }
    function B(a) {
      if (a in T)
        for (var b = T[a].length; 0 < b; b--)
          T[a][T[a].length - b].apply(null, [].slice.call(arguments, 1));
    }
    var da = this,
      b,
      C,
      sa,
      ha = !1,
      N = Date.now(),
      xa = 0,
      ya = 0,
      Ha = -1,
      Oa = 0,
      Pa = 0,
      r = Array(10),
      Aa = !1,
      G,
      Na = !1,
      Sa = !1,
      P,
      ba,
      w = { yaw: 0, pitch: 0, hfov: 0 },
      Ta = !1,
      X = !1,
      $a = 0,
      Qa,
      Z = 0,
      ra,
      Ga,
      O = {},
      T = {},
      aa = [],
      Ma = !1,
      Ua = !1,
      Za = !1,
      Va = {
        hfov: 100,
        minHfov: 50,
        multiResMinHfov: !1,
        maxHfov: 120,
        pitch: 0,
        minPitch: p,
        maxPitch: p,
        yaw: 0,
        minYaw: -180,
        maxYaw: 180,
        roll: 0,
        haov: 360,
        vaov: 180,
        vOffset: 0,
        autoRotate: !1,
        autoRotateInactivityDelay: -1,
        autoRotateStopDelay: p,
        type: 'equirectangular',
        northOffset: 0,
        showFullscreenCtrl: !0,
        dynamic: !1,
        dynamicUpdate: !1,
        doubleClickZoom: !0,
        keyboardZoom: !0,
        mouseZoom: !0,
        showZoomCtrl: !0,
        autoLoad: !1,
        showControls: !0,
        orientationOnByDefault: !1,
        hotSpotDebug: !1,
        backgroundColor: [0, 0, 0],
        avoidShowingBackground: !1,
        animationTimingFunction: function (a) {
          return 0.5 > a ? 2 * a * a : -1 + (4 - 2 * a) * a;
        },
        draggable: !0,
        disableKeyboardCtrl: !1,
        crossOrigin: 'anonymous',
        touchPanSpeedCoeffFactor: 1,
        capturedKeyNumbers: [
          16, 17, 27, 37, 38, 39, 40, 61, 65, 68, 83, 87, 107, 109, 173, 187,
          189,
        ],
        friction: 0.15,
        strings: {
          loadButtonLabel: 'Click to<br>Load<br>Panorama',
          loadingLabel: 'Loading...',
          bylineLabel: 'by %s',
          noPanoramaError: 'No panorama image was specified.',
          fileAccessError: 'The file %s could not be accessed.',
          malformedURLError: 'There is something wrong with the panorama URL.',
          iOS8WebGLError:
            "Due to iOS 8's broken WebGL implementation, only progressive encoded JPEGs work for your device (this panorama uses standard encoding).",
          genericWebGLError:
            'Your browser does not have the necessary WebGL support to display this panorama.',
          textureSizeError:
            "This panorama is too big for your device! It's %spx wide, but your device only supports images up to %spx wide. Try another device. (If you're the author, try scaling down the image.)",
          unknownError: 'Unknown error. Check developer console.',
        },
      };
    s = 'string' === typeof s ? g.getElementById(s) : s;
    s.classList.add('pnlm-container');
    s.tabIndex = 0;
    var J = g.createElement('div');
    J.className = 'pnlm-ui';
    s.appendChild(J);
    var M = g.createElement('div');
    M.className = 'pnlm-render-container';
    s.appendChild(M);
    var W = g.createElement('div');
    W.className = 'pnlm-dragfix';
    J.appendChild(W);
    var fa = g.createElement('span');
    fa.className = 'pnlm-about-msg';
    fa.innerHTML =
      '<a href="https://pannellum.org/" target="_blank">Pannellum</a> 2.5.6';
    J.appendChild(fa);
    W.addEventListener('contextmenu', ja);
    var q = {},
      Wa = g.createElement('div');
    Wa.className = 'pnlm-sprite pnlm-hot-spot-debug-indicator';
    J.appendChild(Wa);
    q.container = g.createElement('div');
    q.container.className = 'pnlm-panorama-info';
    q.title = g.createElement('div');
    q.title.className = 'pnlm-title-box';
    q.container.appendChild(q.title);
    q.author = g.createElement('div');
    q.author.className = 'pnlm-author-box';
    q.container.appendChild(q.author);
    J.appendChild(q.container);
    q.load = {};
    q.load.box = g.createElement('div');
    q.load.box.className = 'pnlm-load-box';
    q.load.boxp = g.createElement('p');
    q.load.box.appendChild(q.load.boxp);
    q.load.lbox = g.createElement('div');
    q.load.lbox.className = 'pnlm-lbox';
    q.load.lbox.innerHTML = '<div class="pnlm-loading"></div>';
    q.load.box.appendChild(q.load.lbox);
    q.load.lbar = g.createElement('div');
    q.load.lbar.className = 'pnlm-lbar';
    q.load.lbarFill = g.createElement('div');
    q.load.lbarFill.className = 'pnlm-lbar-fill';
    q.load.lbar.appendChild(q.load.lbarFill);
    q.load.box.appendChild(q.load.lbar);
    q.load.msg = g.createElement('p');
    q.load.msg.className = 'pnlm-lmsg';
    q.load.box.appendChild(q.load.msg);
    J.appendChild(q.load.box);
    q.errorMsg = g.createElement('div');
    q.errorMsg.className = 'pnlm-error-msg pnlm-info-box';
    J.appendChild(q.errorMsg);
    var v = {};
    v.container = g.createElement('div');
    v.container.className = 'pnlm-controls-container';
    J.appendChild(v.container);
    v.load = g.createElement('div');
    v.load.className = 'pnlm-load-button';
    v.load.addEventListener('click', function () {
      l();
      Ya();
    });
    J.appendChild(v.load);
    v.zoom = g.createElement('div');
    v.zoom.className = 'pnlm-zoom-controls pnlm-controls';
    v.zoomIn = g.createElement('div');
    v.zoomIn.className = 'pnlm-zoom-in pnlm-sprite pnlm-control';
    v.zoomIn.addEventListener('click', function () {
      G && (x(b.hfov - 5), F());
    });
    v.zoom.appendChild(v.zoomIn);
    v.zoomOut = g.createElement('div');
    v.zoomOut.className = 'pnlm-zoom-out pnlm-sprite pnlm-control';
    v.zoomOut.addEventListener('click', function () {
      G && (x(b.hfov + 5), F());
    });
    v.zoom.appendChild(v.zoomOut);
    v.container.appendChild(v.zoom);
    v.fullscreen = g.createElement('div');
    v.fullscreen.addEventListener('click', h);
    v.fullscreen.className =
      'pnlm-fullscreen-toggle-button pnlm-sprite pnlm-fullscreen-toggle-button-inactive pnlm-controls pnlm-control';
    (g.fullscreenEnabled ||
      g.mozFullScreenEnabled ||
      g.webkitFullscreenEnabled ||
      g.msFullscreenEnabled) &&
      v.container.appendChild(v.fullscreen);
    v.orientation = g.createElement('div');
    v.orientation.addEventListener('click', function (a) {
      X ? Da() : Ra();
    });
    v.orientation.addEventListener('mousedown', function (a) {
      a.stopPropagation();
    });
    v.orientation.addEventListener('touchstart', function (a) {
      a.stopPropagation();
    });
    v.orientation.addEventListener('pointerdown', function (a) {
      a.stopPropagation();
    });
    v.orientation.className =
      'pnlm-orientation-button pnlm-orientation-button-inactive pnlm-sprite pnlm-controls pnlm-control';
    var Xa = !1;
    E.DeviceOrientationEvent &&
      'https:' == location.protocol &&
      0 <= navigator.userAgent.toLowerCase().indexOf('mobi') &&
      (v.container.appendChild(v.orientation), (Xa = !0));
    var Ia = g.createElement('div');
    Ia.className = 'pnlm-compass pnlm-controls pnlm-control';
    J.appendChild(Ia);
    k.firstScene
      ? H(k.firstScene)
      : k.default && k.default.firstScene
      ? H(k.default.firstScene)
      : H(null);
    l(!0);
    var ia = [],
      za = [];
    Y.prototype.multiply = function (a) {
      return new Y(
        this.w * a.w - this.x * a.x - this.y * a.y - this.z * a.z,
        this.x * a.w + this.w * a.x + this.y * a.z - this.z * a.y,
        this.y * a.w + this.w * a.y + this.z * a.x - this.x * a.z,
        this.z * a.w + this.w * a.z + this.x * a.y - this.y * a.x,
      );
    };
    Y.prototype.toEulerAngles = function () {
      var a = Math.atan2(
          2 * (this.w * this.x + this.y * this.z),
          1 - 2 * (this.x * this.x + this.y * this.y),
        ),
        b = Math.asin(2 * (this.w * this.y - this.z * this.x)),
        c = Math.atan2(
          2 * (this.w * this.z + this.x * this.y),
          1 - 2 * (this.y * this.y + this.z * this.z),
        );
      return [a, b, c];
    };
    this.isLoaded = function () {
      return Boolean(G);
    };
    this.getPitch = function () {
      return b.pitch;
    };
    this.setPitch = function (a, c, d, e) {
      N = Date.now();
      if (1e-6 >= Math.abs(a - b.pitch))
        return 'function' == typeof d && d(e), this;
      (c = c == p ? 1e3 : Number(c))
        ? ((O.pitch = {
            startTime: Date.now(),
            startPosition: b.pitch,
            endPosition: a,
            duration: c,
          }),
          'function' == typeof d &&
            setTimeout(function () {
              d(e);
            }, c))
        : (b.pitch = a);
      F();
      return this;
    };
    this.getPitchBounds = function () {
      return [b.minPitch, b.maxPitch];
    };
    this.setPitchBounds = function (a) {
      b.minPitch = Math.max(-90, Math.min(a[0], 90));
      b.maxPitch = Math.max(-90, Math.min(a[1], 90));
      return this;
    };
    this.getYaw = function () {
      return ((b.yaw + 540) % 360) - 180;
    };
    this.setYaw = function (a, c, d, e) {
      N = Date.now();
      if (1e-6 >= Math.abs(a - b.yaw))
        return 'function' == typeof d && d(e), this;
      c = c == p ? 1e3 : Number(c);
      a = ((a + 180) % 360) - 180;
      c
        ? (180 < b.yaw - a ? (a += 360) : 180 < a - b.yaw && (a -= 360),
          (O.yaw = {
            startTime: Date.now(),
            startPosition: b.yaw,
            endPosition: a,
            duration: c,
          }),
          'function' == typeof d &&
            setTimeout(function () {
              d(e);
            }, c))
        : (b.yaw = a);
      F();
      return this;
    };
    this.getYawBounds = function () {
      return [b.minYaw, b.maxYaw];
    };
    this.setYawBounds = function (a) {
      b.minYaw = Math.max(-360, Math.min(a[0], 360));
      b.maxYaw = Math.max(-360, Math.min(a[1], 360));
      return this;
    };
    this.getHfov = function () {
      return b.hfov;
    };
    this.setHfov = function (a, c, d, e) {
      N = Date.now();
      if (1e-6 >= Math.abs(a - b.hfov))
        return 'function' == typeof d && d(e), this;
      (c = c == p ? 1e3 : Number(c))
        ? ((O.hfov = {
            startTime: Date.now(),
            startPosition: b.hfov,
            endPosition: u(a),
            duration: c,
          }),
          'function' == typeof d &&
            setTimeout(function () {
              d(e);
            }, c))
        : x(a);
      F();
      return this;
    };
    this.getHfovBounds = function () {
      return [b.minHfov, b.maxHfov];
    };
    this.setHfovBounds = function (a) {
      b.minHfov = Math.max(0, a[0]);
      b.maxHfov = Math.max(0, a[1]);
      return this;
    };
    this.lookAt = function (a, c, d, e, g, h) {
      e = e == p ? 1e3 : Number(e);
      a !== p &&
        1e-6 < Math.abs(a - b.pitch) &&
        (this.setPitch(a, e, g, h), (g = p));
      c !== p &&
        1e-6 < Math.abs(c - b.yaw) &&
        (this.setYaw(c, e, g, h), (g = p));
      d !== p &&
        1e-6 < Math.abs(d - b.hfov) &&
        (this.setHfov(d, e, g, h), (g = p));
      'function' == typeof g && g(h);
      return this;
    };
    this.getNorthOffset = function () {
      return b.northOffset;
    };
    this.setNorthOffset = function (a) {
      b.northOffset = Math.min(360, Math.max(0, a));
      F();
      return this;
    };
    this.getHorizonRoll = function () {
      return b.horizonRoll;
    };
    this.setHorizonRoll = function (a) {
      b.horizonRoll = Math.min(90, Math.max(-90, a));
      C.setPose(
        (b.horizonPitch * Math.PI) / 180,
        (b.horizonRoll * Math.PI) / 180,
      );
      F();
      return this;
    };
    this.getHorizonPitch = function () {
      return b.horizonPitch;
    };
    this.setHorizonPitch = function (a) {
      b.horizonPitch = Math.min(90, Math.max(-90, a));
      C.setPose(
        (b.horizonPitch * Math.PI) / 180,
        (b.horizonRoll * Math.PI) / 180,
      );
      F();
      return this;
    };
    this.startAutoRotate = function (a, c) {
      a = a || Z || 1;
      c = c === p ? Ga : c;
      b.autoRotate = a;
      da.lookAt(c, p, ra, 3e3);
      F();
      return this;
    };
    this.stopAutoRotate = function () {
      Z = b.autoRotate ? b.autoRotate : Z;
      b.autoRotate = !1;
      b.autoRotateInactivityDelay = -1;
      return this;
    };
    this.stopMovement = function () {
      t();
      w = { yaw: 0, pitch: 0, hfov: 0 };
    };
    this.getRenderer = function () {
      return C;
    };
    this.setUpdate = function (a) {
      Ma = !0 === a;
      C === p ? pa() : F();
      return this;
    };
    this.mouseEventToCoords = function (a) {
      return ta(a);
    };
    this.loadScene = function (a, b, c, d) {
      !1 !== G && y(a, b, c, d);
      return this;
    };
    this.getScene = function () {
      return b.scene;
    };
    this.addScene = function (a, b) {
      k.scenes[a] = b;
      return this;
    };
    this.removeScene = function (a) {
      if (b.scene === a || !k.scenes.hasOwnProperty(a)) return !1;
      delete k.scenes[a];
      return !0;
    };
    this.toggleFullscreen = function () {
      h();
      return this;
    };
    this.getConfig = function () {
      return b;
    };
    this.getContainer = function () {
      return s;
    };
    this.addHotSpot = function (a, c) {
      if (c === p && b.scene === p) b.hotSpots.push(a);
      else {
        var d = c !== p ? c : b.scene;
        if (k.scenes.hasOwnProperty(d))
          k.scenes[d].hasOwnProperty('hotSpots') ||
            ((k.scenes[d].hotSpots = []),
            d == b.scene && (b.hotSpots = k.scenes[d].hotSpots)),
            k.scenes[d].hotSpots.push(a);
        else throw 'Invalid scene ID!';
      }
      if (c === p || b.scene == c) La(a), G && Ca(a);
      return this;
    };
    this.removeHotSpot = function (a, c) {
      if (c === p || b.scene == c) {
        if (!b.hotSpots) return !1;
        for (var d = 0; d < b.hotSpots.length; d++)
          if (b.hotSpots[d].hasOwnProperty('id') && b.hotSpots[d].id === a) {
            for (var e = b.hotSpots[d].div; e.parentNode != M; )
              e = e.parentNode;
            M.removeChild(e);
            delete b.hotSpots[d].div;
            b.hotSpots.splice(d, 1);
            return !0;
          }
      } else if (k.scenes.hasOwnProperty(c)) {
        if (!k.scenes[c].hasOwnProperty('hotSpots')) return !1;
        for (d = 0; d < k.scenes[c].hotSpots.length; d++)
          if (
            k.scenes[c].hotSpots[d].hasOwnProperty('id') &&
            k.scenes[c].hotSpots[d].id === a
          )
            return k.scenes[c].hotSpots.splice(d, 1), !0;
      } else return !1;
    };
    this.resize = function () {
      C && z();
    };
    this.isLoaded = function () {
      return G;
    };
    this.isOrientationSupported = function () {
      return Xa || !1;
    };
    this.stopOrientation = function () {
      Da();
    };
    this.startOrientation = function () {
      Xa && Ra();
    };
    this.isOrientationActive = function () {
      return Boolean(X);
    };
    this.on = function (a, b) {
      T[a] = T[a] || [];
      T[a].push(b);
      return this;
    };
    this.off = function (a, b) {
      if (!a) return (T = {}), this;
      if (b) {
        var c = T[a].indexOf(b);
        0 <= c && T[a].splice(c, 1);
        0 == T[a].length && delete T[a];
      } else delete T[a];
      return this;
    };
    this.destroy = function () {
      Za = !0;
      clearTimeout(Qa);
      C && C.destroy();
      Sa &&
        (g.removeEventListener('mousemove', ua, !1),
        g.removeEventListener('mouseup', ma, !1),
        s.removeEventListener('mozfullscreenchange', d, !1),
        s.removeEventListener('webkitfullscreenchange', d, !1),
        s.removeEventListener('msfullscreenchange', d, !1),
        s.removeEventListener('fullscreenchange', d, !1),
        E.removeEventListener('resize', z, !1),
        E.removeEventListener('orientationchange', z, !1),
        s.removeEventListener('keydown', V, !1),
        s.removeEventListener('keyup', R, !1),
        s.removeEventListener('blur', $, !1),
        g.removeEventListener('mouseleave', ma, !1));
      s.innerHTML = '';
      s.classList.remove('pnlm-container');
    };
  }
  return {
    viewer: function (g, k) {
      return new Ba(g, k);
    },
  };
})(window, document);

('use strict');
(() => {
  var Og = Object.create;
  var Ld = Object.defineProperty;
  var Dg = Object.getOwnPropertyDescriptor;
  var Mg = Object.getOwnPropertyNames;
  var Vg = Object.getPrototypeOf,
    $g = Object.prototype.hasOwnProperty;
  var Yt = (e, t) => () => (
    t || e((t = { exports: {} }).exports, t), t.exports
  );
  var Ug = (e, t, n, r) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let o of Mg(t))
        !$g.call(e, o) &&
          o !== n &&
          Ld(e, o, {
            get: () => t[o],
            enumerable: !(r = Dg(t, o)) || r.enumerable,
          });
    return e;
  };
  var ge = (e, t, n) => (
    (n = e != null ? Og(Vg(e)) : {}),
    Ug(
      t || !e || !e.__esModule
        ? Ld(n, 'default', { value: e, enumerable: !0 })
        : n,
      e,
    )
  );
  var Fd = Yt((J) => {
    'use strict';
    var Go = Symbol.for('react.element'),
      bg = Symbol.for('react.portal'),
      Fg = Symbol.for('react.fragment'),
      zg = Symbol.for('react.strict_mode'),
      Bg = Symbol.for('react.profiler'),
      jg = Symbol.for('react.provider'),
      Hg = Symbol.for('react.context'),
      Wg = Symbol.for('react.forward_ref'),
      Gg = Symbol.for('react.suspense'),
      Kg = Symbol.for('react.memo'),
      Qg = Symbol.for('react.lazy'),
      kd = Symbol.iterator;
    function Yg(e) {
      return e === null || typeof e != 'object'
        ? null
        : ((e = (kd && e[kd]) || e['@@iterator']),
          typeof e ==
          'functio\
n'
            ? e
            : null);
    }
    var Od = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      Dd = Object.assign,
      Md = {};
    function br(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = Md),
        (this.updater = n || Od);
    }
    br.prototype.isReactComponent = {};
    br.prototype.setState = function (e, t) {
      if (typeof e != 'object' && typeof e != 'function' && e != null)
        throw Error(
          'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
        );
      this.updater.enqueueSetState(this, e, t, 'setState');
    };
    br.prototype.forceUpdate = function (e) {
      this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
    };
    function Vd() {}
    Vd.prototype = br.prototype;
    function Ha(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = Md),
        (this.updater = n || Od);
    }
    var Wa = (Ha.prototype = new Vd());
    Wa.constructor = Ha;
    Dd(Wa, br.prototype);
    Wa.isPureReactComponent = !0;
    var Id = Array.isArray,
      $d = Object.prototype.hasOwnProperty,
      Ga = { current: null },
      Ud = { key: !0, ref: !0, __self: !0, __source: !0 };
    function bd(e, t, n) {
      var r,
        o = {},
        i = null,
        s = null;
      if (t != null)
        for (r in (t.ref !== void 0 && (s = t.ref),
        t.key !== void 0 && (i = '' + t.key),
        t))
          $d.call(t, r) && !Ud.hasOwnProperty(r) && (o[r] = t[r]);
      var l = arguments.length - 2;
      if (l === 1) o.children = n;
      else if (1 < l) {
        for (var a = Array(l), u = 0; u < l; u++) a[u] = arguments[u + 2];
        o.children = a;
      }
      if (e && e.defaultProps)
        for (r in ((l = e.defaultProps), l)) o[r] === void 0 && (o[r] = l[r]);
      return {
        $$typeof: Go,
        type: e,
        key: i,
        ref: s,
        props: o,
        _owner: Ga.current,
      };
    }
    function Zg(e, t) {
      return {
        $$typeof: Go,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
      };
    }
    function Ka(e) {
      return typeof e == 'object' && e !== null && e.$$typeof === Go;
    }
    function Xg(e) {
      var t = { '=': '=0', ':': '=2' };
      return (
        '$' +
        e.replace(/[=:]/g, function (n) {
          return t[n];
        })
      );
    }
    var Pd = /\/+/g;
    function ja(e, t) {
      return typeof e == 'object' && e !== null && e.key != null
        ? Xg('' + e.key)
        : t.toString(36);
    }
    function ds(e, t, n, r, o) {
      var i = typeof e;
      (i === 'undefined' || i === 'boolean') && (e = null);
      var s = !1;
      if (e === null) s = !0;
      else
        switch (i) {
          case 'string':
          case 'number':
            s = !0;
            break;
          case 'object':
            switch (e.$$typeof) {
              case Go:
              case bg:
                s = !0;
            }
        }
      if (s)
        return (
          (s = e),
          (o = o(s)),
          (e = r === '' ? '.' + ja(s, 0) : r),
          Id(o)
            ? ((n = ''),
              e != null && (n = e.replace(Pd, '$&/') + '/'),
              ds(o, t, n, '', function (u) {
                return u;
              }))
            : o != null &&
              (Ka(o) &&
                (o = Zg(
                  o,
                  n +
                    (!o.key || (s && s.key === o.key)
                      ? ''
                      : ('' + o.key).replace(Pd, '$&/') + '/') +
                    e,
                )),
              t.push(o)),
          1
        );
      if (((s = 0), (r = r === '' ? '.' : r + ':'), Id(e)))
        for (var l = 0; l < e.length; l++) {
          i = e[l];
          var a = r + ja(i, l);
          s += ds(i, t, n, a, o);
        }
      else if (((a = Yg(e)), typeof a == 'function'))
        for (e = a.call(e), l = 0; !(i = e.next()).done; )
          (i = i.value), (a = r + ja(i, l++)), (s += ds(i, t, n, a, o));
      else if (i === 'object')
        throw (
          ((t = String(e)),
          Error(
            'Objects are no\
t valid as a React child (found: ' +
              (t === '[object Object]'
                ? 'object with keys {' + Object.keys(e).join(', ') + '}'
                : t) +
              '). If you meant to render a collection of children, use an array instead.',
          ))
        );
      return s;
    }
    function fs(e, t, n) {
      if (e == null) return e;
      var r = [],
        o = 0;
      return (
        ds(e, r, '', '', function (i) {
          return t.call(n, i, o++);
        }),
        r
      );
    }
    function qg(e) {
      if (e._status === -1) {
        var t = e._result;
        (t = t()),
          t.then(
            function (n) {
              (e._status === 0 || e._status === -1) &&
                ((e._status = 1), (e._result = n));
            },
            function (n) {
              (e._status === 0 || e._status === -1) &&
                ((e._status = 2), (e._result = n));
            },
          ),
          e._status === -1 && ((e._status = 0), (e._result = t));
      }
      if (e._status === 1) return e._result.default;
      throw e._result;
    }
    var Xe = { current: null },
      ps = { transition: null },
      Jg = {
        ReactCurrentDispatcher: Xe,
        ReactCurrentBatchConfig: ps,
        ReactCurrentOwner: Ga,
      };
    J.Children = {
      map: fs,
      forEach: function (e, t, n) {
        fs(
          e,
          function () {
            t.apply(this, arguments);
          },
          n,
        );
      },
      count: function (e) {
        var t = 0;
        return (
          fs(e, function () {
            t++;
          }),
          t
        );
      },
      toArray: function (e) {
        return (
          fs(e, function (t) {
            return t;
          }) || []
        );
      },
      only: function (e) {
        if (!Ka(e))
          throw Error(
            'React.Children.\
only expected to receive a single React element child.',
          );
        return e;
      },
    };
    J.Component = br;
    J.Fragment = Fg;
    J.Profiler = Bg;
    J.PureComponent = Ha;
    J.StrictMode = zg;
    J.Suspense = Gg;
    J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Jg;
    J.cloneElement = function (e, t, n) {
      if (e == null)
        throw Error(
          'React.cloneElement(...): The argument must be a React element, but you passed ' +
            e +
            '.',
        );
      var r = Dd({}, e.props),
        o = e.key,
        i = e.ref,
        s = e._owner;
      if (t != null) {
        if (
          (t.ref !== void 0 && ((i = t.ref), (s = Ga.current)),
          t.key !== void 0 && (o = '' + t.key),
          e.type && e.type.defaultProps)
        )
          var l = e.type.defaultProps;
        for (a in t)
          $d.call(t, a) &&
            !Ud.hasOwnProperty(a) &&
            (r[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a]);
      }
      var a = arguments.length - 2;
      if (a === 1) r.children = n;
      else if (1 < a) {
        l = Array(a);
        for (var u = 0; u < a; u++) l[u] = arguments[u + 2];
        r.children = l;
      }
      return {
        $$typeof: Go,
        type: e.type,
        key: o,
        ref: i,
        props: r,
        _owner: s,
      };
    };
    J.createContext = function (e) {
      return (
        (e = {
          $$typeof: Hg,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (e.Provider = { $$typeof: jg, _context: e }),
        (e.Consumer = e)
      );
    };
    J.createElement = bd;
    J.createFactory = function (e) {
      var t = bd.bind(null, e);
      return (t.type = e), t;
    };
    J.createRef = function () {
      return { current: null };
    };
    J.forwardRef = function (e) {
      return { $$typeof: Wg, render: e };
    };
    J.isValidElement = Ka;
    J.lazy = function (e) {
      return { $$typeof: Qg, _payload: { _status: -1, _result: e }, _init: qg };
    };
    J.memo = function (e, t) {
      return { $$typeof: Kg, type: e, compare: t === void 0 ? null : t };
    };
    J.startTransition = function (e) {
      var t = ps.transition;
      ps.transition = {};
      try {
        e();
      } finally {
        ps.transition = t;
      }
    };
    J.unstable_act = function () {
      throw Error('act(...) is not supported in production builds of React.');
    };
    J.useCallback = function (e, t) {
      return Xe.current.useCallback(e, t);
    };
    J.useContext = function (e) {
      return Xe.current.useContext(e);
    };
    J.useDebugValue = function () {};
    J.useDeferredValue = function (e) {
      return Xe.current.useDeferredValue(e);
    };
    J.useEffect = function (e, t) {
      return Xe.current.useEffect(e, t);
    };
    J.useId = function () {
      return Xe.current.useId();
    };
    J.useImperativeHandle = function (e, t, n) {
      return Xe.current.useImperativeHandle(e, t, n);
    };
    J.useInsertionEffect = function (e, t) {
      return Xe.current.useInsertionEffect(e, t);
    };
    J.useLayoutEffect = function (e, t) {
      return Xe.current.useLayoutEffect(e, t);
    };
    J.useMemo = function (e, t) {
      return Xe.current.useMemo(e, t);
    };
    J.useReducer = function (e, t, n) {
      return Xe.current.useReducer(e, t, n);
    };
    J.useRef = function (e) {
      return Xe.current.useRef(e);
    };
    J.useState = function (e) {
      return Xe.current.useState(e);
    };
    J.useSyncExternalStore = function (e, t, n) {
      return Xe.current.useSyncExternalStore(e, t, n);
    };
    J.useTransition = function () {
      return Xe.current.useTransition();
    };
    J.version = '18.2.0';
  });
  var Tt = Yt((YC, zd) => {
    'use strict';
    zd.exports = Fd();
  });
  var Xd = Yt((ce) => {
    'use strict';
    function Xa(e, t) {
      var n = e.length;
      e.push(t);
      e: for (; 0 < n; ) {
        var r = (n - 1) >>> 1,
          o = e[r];
        if (0 < hs(o, t)) (e[r] = t), (e[n] = o), (n = r);
        else break e;
      }
    }
    function $t(e) {
      return e.length === 0 ? null : e[0];
    }
    function vs(e) {
      if (e.length === 0) return null;
      var t = e[0],
        n = e.pop();
      if (n !== t) {
        e[0] = n;
        e: for (var r = 0, o = e.length, i = o >>> 1; r < i; ) {
          var s = 2 * (r + 1) - 1,
            l = e[s],
            a = s + 1,
            u = e[a];
          if (0 > hs(l, n))
            a < o && 0 > hs(u, l)
              ? ((e[r] = u), (e[a] = n), (r = a))
              : ((e[r] = l), (e[s] = n), (r = s));
          else if (a < o && 0 > hs(u, n)) (e[r] = u), (e[a] = n), (r = a);
          else break e;
        }
      }
      return t;
    }
    function hs(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return n !== 0 ? n : e.id - t.id;
    }
    typeof performance == 'object' && typeof performance.now == 'function'
      ? ((Bd = performance),
        (ce.unstable_now = function () {
          return Bd.now();
        }))
      : ((Qa = Date),
        (jd = Qa.now()),
        (ce.unstable_now = function () {
          return Qa.now() - jd;
        }));
    var Bd,
      Qa,
      jd,
      Zt = [],
      An = [],
      eS = 1,
      Rt = null,
      Fe = 3,
      ys = !1,
      sr = !1,
      Qo = !1,
      Gd = typeof setTimeout == 'function' ? setTimeout : null,
      Kd = typeof clearTimeout == 'function' ? clearTimeout : null,
      Hd = typeof setImmediate < 'u' ? setImmediate : null;
    typeof navigator < 'u' &&
      navigator.scheduling !== void 0 &&
      navigator.scheduling.isInputPending !== void 0 &&
      navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function qa(e) {
      for (var t = $t(An); t !== null; ) {
        if (t.callback === null) vs(An);
        else if (t.startTime <= e)
          vs(An), (t.sortIndex = t.expirationTime), Xa(Zt, t);
        else break;
        t = $t(An);
      }
    }
    function Ja(e) {
      if (((Qo = !1), qa(e), !sr))
        if ($t(Zt) !== null) (sr = !0), tu(eu);
        else {
          var t = $t(An);
          t !== null && nu(Ja, t.startTime - e);
        }
    }
    function eu(e, t) {
      (sr = !1), Qo && ((Qo = !1), Kd(Yo), (Yo = -1)), (ys = !0);
      var n = Fe;
      try {
        for (
          qa(t), Rt = $t(Zt);
          Rt !== null && (!(Rt.expirationTime > t) || (e && !Zd()));

        ) {
          var r = Rt.callback;
          if (typeof r == 'function') {
            (Rt.callback = null), (Fe = Rt.priorityLevel);
            var o = r(Rt.expirationTime <= t);
            (t = ce.unstable_now()),
              typeof o == 'function'
                ? (Rt.callback = o)
                : Rt === $t(Zt) && vs(Zt),
              qa(t);
          } else vs(Zt);
          Rt = $t(Zt);
        }
        if (Rt !== null) var i = !0;
        else {
          var s = $t(An);
          s !== null && nu(Ja, s.startTime - t), (i = !1);
        }
        return i;
      } finally {
        (Rt = null), (Fe = n), (ys = !1);
      }
    }
    var gs = !1,
      ms = null,
      Yo = -1,
      Qd = 5,
      Yd = -1;
    function Zd() {
      return !(ce.unstable_now() - Yd < Qd);
    }
    function Ya() {
      if (ms !== null) {
        var e = ce.unstable_now();
        Yd = e;
        var t = !0;
        try {
          t = ms(!0, e);
        } finally {
          t ? Ko() : ((gs = !1), (ms = null));
        }
      } else gs = !1;
    }
    var Ko;
    typeof Hd == 'function'
      ? (Ko = function () {
          Hd(Ya);
        })
      : typeof MessageChannel < 'u'
      ? ((Za = new MessageChannel()),
        (Wd = Za.port2),
        (Za.port1.onmessage = Ya),
        (Ko = function () {
          Wd.postMessage(null);
        }))
      : (Ko = function () {
          Gd(Ya, 0);
        });
    var Za, Wd;
    function tu(e) {
      (ms = e), gs || ((gs = !0), Ko());
    }
    function nu(e, t) {
      Yo = Gd(function () {
        e(ce.unstable_now());
      }, t);
    }
    ce.unstable_IdlePriority = 5;
    ce.unstable_ImmediatePriority = 1;
    ce.unstable_LowPriority = 4;
    ce.unstable_NormalPriority = 3;
    ce.unstable_Profiling = null;
    ce.unstable_UserBlockingPriority = 2;
    ce.unstable_cancelCallback = function (e) {
      e.callback = null;
    };
    ce.unstable_continueExecution = function () {
      sr || ys || ((sr = !0), tu(eu));
    };
    ce.unstable_forceFrameRate = function (e) {
      0 > e || 125 < e
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
          )
        : (Qd = 0 < e ? Math.floor(1e3 / e) : 5);
    };
    ce.unstable_getCurrentPriorityLevel = function () {
      return Fe;
    };
    ce.unstable_getFirstCallbackNode = function () {
      return $t(Zt);
    };
    ce.unstable_next = function (e) {
      switch (Fe) {
        case 1:
        case 2:
        case 3:
          var t = 3;
          break;
        default:
          t = Fe;
      }
      var n = Fe;
      Fe = t;
      try {
        return e();
      } finally {
        Fe = n;
      }
    };
    ce.unstable_pauseExecution = function () {};
    ce.unstable_requestPaint = function () {};
    ce.unstable_runWithPriority = function (e, t) {
      switch (e) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          e = 3;
      }
      var n = Fe;
      Fe = e;
      try {
        return t();
      } finally {
        Fe = n;
      }
    };
    ce.unstable_scheduleCallback = function (e, t, n) {
      var r = ce.unstable_now();
      switch (
        (typeof n == 'object' && n !== null
          ? ((n = n.delay), (n = typeof n == 'number' && 0 < n ? r + n : r))
          : (n = r),
        e)
      ) {
        case 1:
          var o = -1;
          break;
        case 2:
          o = 250;
          break;
        case 5:
          o = 1073741823;
          break;
        case 4:
          o = 1e4;
          break;
        default:
          o = 5e3;
      }
      return (
        (o = n + o),
        (e = {
          id: eS++,
          callback: t,
          priorityLevel: e,
          startTime: n,
          expirationTime: o,
          sortIndex: -1,
        }),
        n > r
          ? ((e.sortIndex = n),
            Xa(An, e),
            $t(Zt) === null &&
              e === $t(An) &&
              (Qo ? (Kd(Yo), (Yo = -1)) : (Qo = !0), nu(Ja, n - r)))
          : ((e.sortIndex = o), Xa(Zt, e), sr || ys || ((sr = !0), tu(eu))),
        e
      );
    };
    ce.unstable_shouldYield = Zd;
    ce.unstable_wrapCallback = function (e) {
      var t = Fe;
      return function () {
        var n = Fe;
        Fe = t;
        try {
          return e.apply(this, arguments);
        } finally {
          Fe = n;
        }
      };
    };
  });
  var Jd = Yt((XC, qd) => {
    'use strict';
    qd.exports = Xd();
  });
  var iv = Yt((yt) => {
    'use strict';
    var sh = Tt(),
      mt = Jd();
    function A(e) {
      for (
        var t = 'https://reactjs.org/docs/error-decoder.html?invariant=' + e,
          n = 1;
        n < arguments.length;
        n++
      )
        t += '&args[]=' + encodeURIComponent(arguments[n]);
      return (
        'Minified React error #' +
        e +
        '; visit ' +
        t +
        ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
      );
    }
    var lh = new Set(),
      yi = {};
    function Sr(e, t) {
      so(e, t), so(e + 'Capture', t);
    }
    function so(e, t) {
      for (yi[e] = t, e = 0; e < t.length; e++) lh.add(t[e]);
    }
    var pn = !(
        typeof window > 'u' ||
        typeof window.document > 'u' ||
        typeof window.document.createElement > 'u'
      ),
      xu = Object.prototype.hasOwnProperty,
      tS =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      ep = {},
      tp = {};
    function nS(e) {
      return xu.call(tp, e)
        ? !0
        : xu.call(ep, e)
        ? !1
        : tS.test(e)
        ? (tp[e] = !0)
        : ((ep[e] = !0), !1);
    }
    function rS(e, t, n, r) {
      if (n !== null && n.type === 0) return !1;
      switch (typeof t) {
        case 'function':
        case 'symbol':
          return !0;
        case 'boolean':
          return r
            ? !1
            : n !== null
            ? !n.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)),
              e !== 'data-' && e !== 'aria-');
        default:
          return !1;
      }
    }
    function oS(e, t, n, r) {
      if (t === null || typeof t > 'u' || rS(e, t, n, r)) return !0;
      if (r) return !1;
      if (n !== null)
        switch (n.type) {
          case 3:
            return !t;
          case 4:
            return t === !1;
          case 5:
            return isNaN(t);
          case 6:
            return isNaN(t) || 1 > t;
        }
      return !1;
    }
    function et(e, t, n, r, o, i, s) {
      (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = o),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = i),
        (this.removeEmptyString = s);
    }
    var be = {};
    'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
      .split(' ')
      .forEach(function (e) {
        be[e] = new et(e, 0, !1, e, null, !1, !1);
      });
    [
      ['acceptCharset', 'accept-charset'],
      ['className', 'class'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
    ].forEach(function (e) {
      var t = e[0];
      be[t] = new et(t, 1, !1, e[1], null, !1, !1);
    });
    ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(
      function (e) {
        be[e] = new et(e, 2, !1, e.toLowerCase(), null, !1, !1);
      },
    );
    [
      'autoReverse',
      'externalResourcesRequired',
      'focusable',
      'preserveAlpha',
    ].forEach(function (e) {
      be[e] = new et(e, 2, !1, e, null, !1, !1);
    });
    'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noMo\
dule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
      .split(' ')
      .forEach(function (e) {
        be[e] = new et(e, 3, !1, e.toLowerCase(), null, !1, !1);
      });
    ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
      be[e] = new et(e, 3, !0, e, null, !1, !1);
    });
    ['capture', 'download'].forEach(function (e) {
      be[e] = new et(e, 4, !1, e, null, !1, !1);
    });
    ['cols', 'rows', 'size', 'span'].forEach(function (e) {
      be[e] = new et(e, 6, !1, e, null, !1, !1);
    });
    ['rowSpan', 'start'].forEach(function (e) {
      be[e] = new et(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
    var yc = /[\-:]([a-z])/g;
    function gc(e) {
      return e[1].toUpperCase();
    }
    'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x \
horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-\
per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
      .split(' ')
      .forEach(function (e) {
        var t = e.replace(yc, gc);
        be[t] = new et(t, 1, !1, e, null, !1, !1);
      });
    'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
      .split(' ')
      .forEach(function (e) {
        var t = e.replace(yc, gc);
        be[t] = new et(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
      });
    ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
      var t = e.replace(yc, gc);
      be[t] = new et(
        t,
        1,
        !1,
        e,
        'http://www.w3.org/XML/1998/namespace',
        !1,
        !1,
      );
    });
    ['tabIndex', 'crossOrigin'].forEach(function (e) {
      be[e] = new et(e, 1, !1, e.toLowerCase(), null, !1, !1);
    });
    be.xlinkHref = new et(
      'xlinkHref',
      1,
      !1,
      'xlink:href',
      'http://www.w3.org/1999/xlink',
      !0,
      !1,
    );
    ['src', 'href', 'action', 'formAction'].forEach(function (e) {
      be[e] = new et(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
    function Sc(e, t, n, r) {
      var o = be.hasOwnProperty(t) ? be[t] : null;
      (o !== null
        ? o.type !== 0
        : r ||
          !(2 < t.length) ||
          (t[0] !== 'o' && t[0] !== 'O') ||
          (t[1] !== 'n' && t[1] !== 'N')) &&
        (oS(t, n, o, r) && (n = null),
        r || o === null
          ? nS(t) &&
            (n === null ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
          : o.mustUseProperty
          ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : '') : n)
          : ((t = o.attributeName),
            (r = o.attributeNamespace),
            n === null
              ? e.removeAttribute(t)
              : ((o = o.type),
                (n = o === 3 || (o === 4 && n === !0) ? '' : '' + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
    }
    var yn = sh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      Ss = Symbol.for('react.element'),
      Br = Symbol.for('react.portal'),
      jr = Symbol.for('react.fragment'),
      _c = Symbol.for('react.strict_mode'),
      Nu = Symbol.for('react.profiler'),
      ah = Symbol.for('react.provider'),
      uh = Symbol.for('react.context'),
      Ec = Symbol.for('react.forward_ref'),
      Au = Symbol.for('react.suspense'),
      Cu = Symbol.for('react.suspense_list'),
      wc = Symbol.for('react.memo'),
      Ln = Symbol.for('react.lazy');
    Symbol.for('react.scope');
    Symbol.for('react.debug_trace_mode');
    var ch = Symbol.for('react.offscreen');
    Symbol.for('react.legacy_hidden');
    Symbol.for('react.cache');
    Symbol.for('react.tracing_marker');
    var np = Symbol.iterator;
    function Zo(e) {
      return e === null || typeof e != 'object'
        ? null
        : ((e = (np && e[np]) || e['@@iterator']),
          typeof e == 'function' ? e : null);
    }
    var Re = Object.assign,
      ru;
    function oi(e) {
      if (ru === void 0)
        try {
          throw Error();
        } catch (n) {
          var t = n.stack.trim().match(/\n( *(at )?)/);
          ru = (t && t[1]) || '';
        }
      return (
        `
` +
        ru +
        e
      );
    }
    var ou = !1;
    function iu(e, t) {
      if (!e || ou) return '';
      ou = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (t)
          if (
            ((t = function () {
              throw Error();
            }),
            Object.defineProperty(t.prototype, 'props', {
              set: function () {
                throw Error();
              },
            }),
            typeof Reflect == 'object' && Reflect.construct)
          ) {
            try {
              Reflect.construct(t, []);
            } catch (u) {
              var r = u;
            }
            Reflect.construct(e, [], t);
          } else {
            try {
              t.call();
            } catch (u) {
              r = u;
            }
            e.call(t.prototype);
          }
        else {
          try {
            throw Error();
          } catch (u) {
            r = u;
          }
          e();
        }
      } catch (u) {
        if (u && r && typeof u.stack == 'string') {
          for (
            var o = u.stack.split(`
`),
              i = r.stack.split(`
`),
              s = o.length - 1,
              l = i.length - 1;
            1 <= s && 0 <= l && o[s] !== i[l];

          )
            l--;
          for (; 1 <= s && 0 <= l; s--, l--)
            if (o[s] !== i[l]) {
              if (s !== 1 || l !== 1)
                do
                  if ((s--, l--, 0 > l || o[s] !== i[l])) {
                    var a =
                      `
` + o[s].replace(' at new ', ' at ');
                    return (
                      e.displayName &&
                        a.includes('<anonymous>') &&
                        (a = a.replace('<anonymous>', e.displayName)),
                      a
                    );
                  }
                while (1 <= s && 0 <= l);
              break;
            }
        }
      } finally {
        (ou = !1), (Error.prepareStackTrace = n);
      }
      return (e = e ? e.displayName || e.name : '') ? oi(e) : '';
    }
    function iS(e) {
      switch (e.tag) {
        case 5:
          return oi(e.type);
        case 16:
          return oi('Lazy');
        case 13:
          return oi('Suspense');
        case 19:
          return oi('SuspenseList');
        case 0:
        case 2:
        case 15:
          return (e = iu(e.type, !1)), e;
        case 11:
          return (e = iu(e.type.render, !1)), e;
        case 1:
          return (e = iu(e.type, !0)), e;
        default:
          return '';
      }
    }
    function Lu(e) {
      if (e == null) return null;
      if (typeof e == 'function') return e.displayName || e.name || null;
      if (typeof e == 'string') return e;
      switch (e) {
        case jr:
          return 'Fragment';
        case Br:
          return 'Portal';
        case Nu:
          return 'Profiler';
        case _c:
          return 'StrictMode';
        case Au:
          return 'Suspense';
        case Cu:
          return 'SuspenseList';
      }
      if (typeof e == 'object')
        switch (e.$$typeof) {
          case uh:
            return (e.displayName || 'Context') + '.Consumer';
          case ah:
            return (e._context.displayName || 'Context') + '.Provider';
          case Ec:
            var t = e.render;
            return (
              (e = e.displayName),
              e ||
                ((e = t.displayName || t.name || ''),
                (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
              e
            );
          case wc:
            return (
              (t = e.displayName || null), t !== null ? t : Lu(e.type) || 'Memo'
            );
          case Ln:
            (t = e._payload), (e = e._init);
            try {
              return Lu(e(t));
            } catch {}
        }
      return null;
    }
    function sS(e) {
      var t = e.type;
      switch (e.tag) {
        case 24:
          return 'Cache';
        case 9:
          return (t.displayName || 'Context') + '.Consumer';
        case 10:
          return (t._context.displayName || 'Context') + '.Provider';
        case 18:
          return 'DehydratedFragment';
        case 11:
          return (
            (e = t.render),
            (e = e.displayName || e.name || ''),
            t.displayName || (e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')
          );
        case 7:
          return 'Fragment';
        case 5:
          return t;
        case 4:
          return 'Portal';
        case 3:
          return 'Root';
        case 6:
          return 'Text';
        case 16:
          return Lu(t);
        case 8:
          return t === _c ? 'StrictMode' : 'Mode';
        case 22:
          return 'Offscreen';
        case 12:
          return 'Profiler';
        case 21:
          return 'Scope';
        case 13:
          return 'Suspense';
        case 19:
          return 'SuspenseList';
        case 25:
          return 'TracingMarker';
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
          if (typeof t == 'function') return t.displayName || t.name || null;
          if (typeof t == 'string') return t;
      }
      return null;
    }
    function jn(e) {
      switch (typeof e) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'undefined':
          return e;
        case 'object':
          return e;
        default:
          return '';
      }
    }
    function fh(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        e.toLowerCase() === 'input' &&
        (t === 'checkbox' || t === 'radio')
      );
    }
    function lS(e) {
      var t = fh(e) ? 'checked' : 'value',
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = '' + e[t];
      if (
        !e.hasOwnProperty(t) &&
        typeof n < 'u' &&
        typeof n.get == 'function' &&
        typeof n.set == 'function'
      ) {
        var o = n.get,
          i = n.set;
        return (
          Object.defineProperty(e, t, {
            configurable: !0,
            get: function () {
              return o.call(this);
            },
            set: function (s) {
              (r = '' + s), i.call(this, s);
            },
          }),
          Object.defineProperty(e, t, { enumerable: n.enumerable }),
          {
            getValue: function () {
              return r;
            },
            setValue: function (s) {
              r = '' + s;
            },
            stopTracking: function () {
              (e._valueTracker = null), delete e[t];
            },
          }
        );
      }
    }
    function _s(e) {
      e._valueTracker || (e._valueTracker = lS(e));
    }
    function dh(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        r = '';
      return (
        e && (r = fh(e) ? (e.checked ? 'true' : 'false') : e.value),
        (e = r),
        e !== n ? (t.setValue(e), !0) : !1
      );
    }
    function Qs(e) {
      if (
        ((e = e || (typeof document < 'u' ? document : void 0)), typeof e > 'u')
      )
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function ku(e, t) {
      var n = t.checked;
      return Re({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked,
      });
    }
    function rp(e, t) {
      var n = t.defaultValue == null ? '' : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
      (n = jn(t.value != null ? t.value : n)),
        (e._wrapperState = {
          initialChecked: r,
          initialValue: n,
          controlled:
            t.type ===
              '\
checkbox' || t.type === 'radio'
              ? t.checked != null
              : t.value != null,
        });
    }
    function ph(e, t) {
      (t = t.checked), t != null && Sc(e, 'checked', t, !1);
    }
    function Iu(e, t) {
      ph(e, t);
      var n = jn(t.value),
        r = t.type;
      if (n != null)
        r === 'number'
          ? ((n === 0 && e.value === '') || e.value != n) && (e.value = '' + n)
          : e.value !== '' + n && (e.value = '' + n);
      else if (r === 'submit' || r === 'reset') {
        e.removeAttribute('value');
        return;
      }
      t.hasOwnProperty('value')
        ? Pu(e, t.type, n)
        : t.hasOwnProperty('defaultValue') && Pu(e, t.type, jn(t.defaultValue)),
        t.checked == null &&
          t.defaultChecked != null &&
          (e.defaultChecked = !!t.defaultChecked);
    }
    function op(e, t, n) {
      if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
        var r = t.type;
        if (
          !(
            (r !== 'submit' && r !== 'reset') ||
            (t.value !== void 0 && t.value !== null)
          )
        )
          return;
        (t = '' + e._wrapperState.initialValue),
          n || t === e.value || (e.value = t),
          (e.defaultValue = t);
      }
      (n = e.name),
        n !== '' && (e.name = ''),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        n !== '' && (e.name = n);
    }
    function Pu(e, t, n) {
      (t !== 'number' || Qs(e.ownerDocument) !== e) &&
        (n == null
          ? (e.defaultValue = '' + e._wrapperState.initialValue)
          : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
    }
    var ii = Array.isArray;
    function eo(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {};
        for (var o = 0; o < n.length; o++) t['$' + n[o]] = !0;
        for (n = 0; n < e.length; n++)
          (o = t.hasOwnProperty('$' + e[n].value)),
            e[n].selected !== o && (e[n].selected = o),
            o && r && (e[n].defaultSelected = !0);
      } else {
        for (n = '' + jn(n), t = null, o = 0; o < e.length; o++) {
          if (e[o].value === n) {
            (e[o].selected = !0), r && (e[o].defaultSelected = !0);
            return;
          }
          t !== null || e[o].disabled || (t = e[o]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function Ou(e, t) {
      if (t.dangerouslySetInnerHTML != null) throw Error(A(91));
      return Re({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: '' + e._wrapperState.initialValue,
      });
    }
    function ip(e, t) {
      var n = t.value;
      if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
          if (t != null) throw Error(A(92));
          if (ii(n)) {
            if (1 < n.length) throw Error(A(93));
            n = n[0];
          }
          t = n;
        }
        t == null && (t = ''), (n = t);
      }
      e._wrapperState = { initialValue: jn(n) };
    }
    function hh(e, t) {
      var n = jn(t.value),
        r = jn(t.defaultValue);
      n != null &&
        ((n = '' + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = '' + r);
    }
    function sp(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue &&
        t !== '' &&
        t !== null &&
        (e.value = t);
    }
    function mh(e) {
      switch (e) {
        case 'svg':
          return 'http://www.w3.org/2000/svg';
        case 'math':
          return 'http://www.w3.org/1998/Math/MathML';
        default:
          return 'http://www.w3.org/1999/xhtml';
      }
    }
    function Du(e, t) {
      return e == null || e === 'http://www.w3.org/1999/xhtml'
        ? mh(t)
        : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
        ? 'http://www.w3.org/1999/xhtml'
        : e;
    }
    var Es,
      vh = (function (e) {
        return typeof MSApp < 'u' && MSApp.execUnsafeLocalFunction
          ? function (t, n, r, o) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(t, n, r, o);
              });
            }
          : e;
      })(function (e, t) {
        if (e.namespaceURI !== 'http://www.w3.org/2000/svg' || 'innerHTML' in e)
          e.innerHTML = t;
        else {
          for (
            Es = Es || document.createElement('div'),
              Es.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
              t = Es.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      });
    function gi(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
          n.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var ai = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      },
      aS = ['Webkit', 'ms', 'Moz', 'O'];
    Object.keys(ai).forEach(function (e) {
      aS.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (ai[t] = ai[e]);
      });
    });
    function yh(e, t, n) {
      return t == null || typeof t == 'boolean' || t === ''
        ? ''
        : n ||
          typeof t != 'number' ||
          t === 0 ||
          (ai.hasOwnProperty(e) && ai[e])
        ? ('' + t).trim()
        : t + 'px';
    }
    function gh(e, t) {
      e = e.style;
      for (var n in t)
        if (t.hasOwnProperty(n)) {
          var r = n.indexOf('--') === 0,
            o = yh(n, t[n], r);
          n === 'float' && (n = 'cssFloat'),
            r ? e.setProperty(n, o) : (e[n] = o);
        }
    }
    var uS = Re(
      { menuitem: !0 },
      {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
      },
    );
    function Mu(e, t) {
      if (t) {
        if (uS[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw Error(A(137, e));
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null) throw Error(A(60));
          if (
            typeof t.dangerouslySetInnerHTML != 'object' ||
            !('__html' in t.dangerouslySetInnerHTML)
          )
            throw Error(A(61));
        }
        if (t.style != null && typeof t.style != 'object') throw Error(A(62));
      }
    }
    function Vu(e, t) {
      if (e.indexOf('-') === -1) return typeof t.is == 'string';
      switch (e) {
        case 'annotation-xml':
        case 'color-profile':
        case 'font-face':
        case 'font-face-src':
        case 'font-face-uri':
        case 'font-face-format':
        case 'font-face-name':
        case 'missing-glyph':
          return !1;
        default:
          return !0;
      }
    }
    var $u = null;
    function Tc(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
      );
    }
    var Uu = null,
      to = null,
      no = null;
    function lp(e) {
      if ((e = Vi(e))) {
        if (typeof Uu != 'function') throw Error(A(280));
        var t = e.stateNode;
        t && ((t = wl(t)), Uu(e.stateNode, e.type, t));
      }
    }
    function Sh(e) {
      to ? (no ? no.push(e) : (no = [e])) : (to = e);
    }
    function _h() {
      if (to) {
        var e = to,
          t = no;
        if (((no = to = null), lp(e), t))
          for (e = 0; e < t.length; e++) lp(t[e]);
      }
    }
    function Eh(e, t) {
      return e(t);
    }
    function wh() {}
    var su = !1;
    function Th(e, t, n) {
      if (su) return e(t, n);
      su = !0;
      try {
        return Eh(e, t, n);
      } finally {
        (su = !1), (to !== null || no !== null) && (wh(), _h());
      }
    }
    function Si(e, t) {
      var n = e.stateNode;
      if (n === null) return null;
      var r = wl(n);
      if (r === null) return null;
      n = r[t];
      e: switch (t) {
        case 'onClick':
        case 'onClickCapture':
        case 'onDoubleClick':
        case 'onDoubleClickCapture':
        case 'onMouseDown':
        case 'onMouseDownCapture':
        case 'onMouseMove':
        case 'onMouseMoveCapture':
        case 'onMouseUp':
        case 'onMouseUpCapture':
        case 'onMouseEnter':
          (r = !r.disabled) ||
            ((e = e.type),
            (r = !(
              e === 'button' ||
              e === 'input' ||
              e === 'select' ||
              e === 'textarea'
            ))),
            (e = !r);
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (n && typeof n != 'function') throw Error(A(231, t, typeof n));
      return n;
    }
    var bu = !1;
    if (pn)
      try {
        (Fr = {}),
          Object.defineProperty(Fr, 'passive', {
            get: function () {
              bu = !0;
            },
          }),
          window.addEventListener('test', Fr, Fr),
          window.removeEventListener('test', Fr, Fr);
      } catch {
        bu = !1;
      }
    var Fr;
    function cS(e, t, n, r, o, i, s, l, a) {
      var u = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(n, u);
      } catch (f) {
        this.onError(f);
      }
    }
    var ui = !1,
      Ys = null,
      Zs = !1,
      Fu = null,
      fS = {
        onError: function (e) {
          (ui = !0), (Ys = e);
        },
      };
    function dS(e, t, n, r, o, i, s, l, a) {
      (ui = !1), (Ys = null), cS.apply(fS, arguments);
    }
    function pS(e, t, n, r, o, i, s, l, a) {
      if ((dS.apply(this, arguments), ui)) {
        if (ui) {
          var u = Ys;
          (ui = !1), (Ys = null);
        } else throw Error(A(198));
        Zs || ((Zs = !0), (Fu = u));
      }
    }
    function _r(e) {
      var t = e,
        n = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
        while (e);
      }
      return t.tag === 3 ? n : null;
    }
    function Rh(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (
          (t === null &&
            ((e = e.alternate), e !== null && (t = e.memoizedState)),
          t !== null)
        )
          return t.dehydrated;
      }
      return null;
    }
    function ap(e) {
      if (_r(e) !== e) throw Error(A(188));
    }
    function hS(e) {
      var t = e.alternate;
      if (!t) {
        if (((t = _r(e)), t === null)) throw Error(A(188));
        return t !== e ? null : e;
      }
      for (var n = e, r = t; ; ) {
        var o = n.return;
        if (o === null) break;
        var i = o.alternate;
        if (i === null) {
          if (((r = o.return), r !== null)) {
            n = r;
            continue;
          }
          break;
        }
        if (o.child === i.child) {
          for (i = o.child; i; ) {
            if (i === n) return ap(o), e;
            if (i === r) return ap(o), t;
            i = i.sibling;
          }
          throw Error(A(188));
        }
        if (n.return !== r.return) (n = o), (r = i);
        else {
          for (var s = !1, l = o.child; l; ) {
            if (l === n) {
              (s = !0), (n = o), (r = i);
              break;
            }
            if (l === r) {
              (s = !0), (r = o), (n = i);
              break;
            }
            l = l.sibling;
          }
          if (!s) {
            for (l = i.child; l; ) {
              if (l === n) {
                (s = !0), (n = i), (r = o);
                break;
              }
              if (l === r) {
                (s = !0), (r = i), (n = o);
                break;
              }
              l = l.sibling;
            }
            if (!s) throw Error(A(189));
          }
        }
        if (n.alternate !== r) throw Error(A(190));
      }
      if (n.tag !== 3) throw Error(A(188));
      return n.stateNode.current === n ? e : t;
    }
    function xh(e) {
      return (e = hS(e)), e !== null ? Nh(e) : null;
    }
    function Nh(e) {
      if (e.tag === 5 || e.tag === 6) return e;
      for (e = e.child; e !== null; ) {
        var t = Nh(e);
        if (t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var Ah = mt.unstable_scheduleCallback,
      up = mt.unstable_cancelCallback,
      mS = mt.unstable_shouldYield,
      vS = mt.unstable_requestPaint,
      Ae = mt.unstable_now,
      yS = mt.unstable_getCurrentPriorityLevel,
      Rc = mt.unstable_ImmediatePriority,
      Ch = mt.unstable_UserBlockingPriority,
      Xs = mt.unstable_NormalPriority,
      gS = mt.unstable_LowPriority,
      Lh = mt.unstable_IdlePriority,
      gl = null,
      en = null;
    function SS(e) {
      if (en && typeof en.onCommitFiberRoot == 'function')
        try {
          en.onCommitFiberRoot(gl, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
    }
    var Bt = Math.clz32 ? Math.clz32 : wS,
      _S = Math.log,
      ES = Math.LN2;
    function wS(e) {
      return (e >>>= 0), e === 0 ? 32 : (31 - ((_S(e) / ES) | 0)) | 0;
    }
    var ws = 64,
      Ts = 4194304;
    function si(e) {
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return e & 130023424;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 1073741824;
        default:
          return e;
      }
    }
    function qs(e, t) {
      var n = e.pendingLanes;
      if (n === 0) return 0;
      var r = 0,
        o = e.suspendedLanes,
        i = e.pingedLanes,
        s = n & 268435455;
      if (s !== 0) {
        var l = s & ~o;
        l !== 0 ? (r = si(l)) : ((i &= s), i !== 0 && (r = si(i)));
      } else (s = n & ~o), s !== 0 ? (r = si(s)) : i !== 0 && (r = si(i));
      if (r === 0) return 0;
      if (
        t !== 0 &&
        t !== r &&
        !(t & o) &&
        ((o = r & -r),
        (i = t & -t),
        o >= i || (o === 16 && (i & 4194240) !== 0))
      )
        return t;
      if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= r; 0 < t; )
          (n = 31 - Bt(t)), (o = 1 << n), (r |= e[n]), (t &= ~o);
      return r;
    }
    function TS(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
          return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function RS(e, t) {
      for (
        var n = e.suspendedLanes,
          r = e.pingedLanes,
          o = e.expirationTimes,
          i = e.pendingLanes;
        0 < i;

      ) {
        var s = 31 - Bt(i),
          l = 1 << s,
          a = o[s];
        a === -1
          ? (!(l & n) || l & r) && (o[s] = TS(l, t))
          : a <= t && (e.expiredLanes |= l),
          (i &= ~l);
      }
    }
    function zu(e) {
      return (
        (e = e.pendingLanes & -1073741825),
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
      );
    }
    function kh() {
      var e = ws;
      return (ws <<= 1), !(ws & 4194240) && (ws = 64), e;
    }
    function lu(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function Di(e, t, n) {
      (e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - Bt(t)),
        (e[t] = n);
    }
    function xS(e, t) {
      var n = e.pendingLanes & ~t;
      (e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements);
      var r = e.eventTimes;
      for (e = e.expirationTimes; 0 < n; ) {
        var o = 31 - Bt(n),
          i = 1 << o;
        (t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i);
      }
    }
    function xc(e, t) {
      var n = (e.entangledLanes |= t);
      for (e = e.entanglements; n; ) {
        var r = 31 - Bt(n),
          o = 1 << r;
        (o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o);
      }
    }
    var oe = 0;
    function Ih(e) {
      return (
        (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
      );
    }
    var Ph,
      Nc,
      Oh,
      Dh,
      Mh,
      Bu = !1,
      Rs = [],
      Mn = null,
      Vn = null,
      $n = null,
      _i = new Map(),
      Ei = new Map(),
      In = [],
      NS =
        'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset \
submit'.split(' ');
    function cp(e, t) {
      switch (e) {
        case 'focusin':
        case 'focusout':
          Mn = null;
          break;
        case 'dragenter':
        case 'dragleave':
          Vn = null;
          break;
        case 'mouseover':
        case 'mouseout':
          $n = null;
          break;
        case 'pointerover':
        case 'pointerout':
          _i.delete(t.pointerId);
          break;
        case 'gotpointercapture':
        case 'lostpointercapture':
          Ei.delete(t.pointerId);
      }
    }
    function Xo(e, t, n, r, o, i) {
      return e === null || e.nativeEvent !== i
        ? ((e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: r,
            nativeEvent: i,
            targetContainers: [o],
          }),
          t !== null && ((t = Vi(t)), t !== null && Nc(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          o !== null && t.indexOf(o) === -1 && t.push(o),
          e);
    }
    function AS(e, t, n, r, o) {
      switch (t) {
        case 'focusin':
          return (Mn = Xo(Mn, e, t, n, r, o)), !0;
        case 'dragenter':
          return (Vn = Xo(Vn, e, t, n, r, o)), !0;
        case 'mouseover':
          return ($n = Xo($n, e, t, n, r, o)), !0;
        case 'pointerover':
          var i = o.pointerId;
          return _i.set(i, Xo(_i.get(i) || null, e, t, n, r, o)), !0;
        case 'gotpointercapture':
          return (
            (i = o.pointerId),
            Ei.set(i, Xo(Ei.get(i) || null, e, t, n, r, o)),
            !0
          );
      }
      return !1;
    }
    function Vh(e) {
      var t = ur(e.target);
      if (t !== null) {
        var n = _r(t);
        if (n !== null) {
          if (((t = n.tag), t === 13)) {
            if (((t = Rh(n)), t !== null)) {
              (e.blockedOn = t),
                Mh(e.priority, function () {
                  Oh(n);
                });
              return;
            }
          } else if (
            t === 3 &&
            n.stateNode.current.memoizedState.isDehydrated
          ) {
            e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function Us(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var n = ju(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
          n = e.nativeEvent;
          var r = new n.constructor(n.type, n);
          ($u = r), n.target.dispatchEvent(r), ($u = null);
        } else return (t = Vi(n)), t !== null && Nc(t), (e.blockedOn = n), !1;
        t.shift();
      }
      return !0;
    }
    function fp(e, t, n) {
      Us(e) && n.delete(t);
    }
    function CS() {
      (Bu = !1),
        Mn !== null && Us(Mn) && (Mn = null),
        Vn !== null && Us(Vn) && (Vn = null),
        $n !== null && Us($n) && ($n = null),
        _i.forEach(fp),
        Ei.forEach(fp);
    }
    function qo(e, t) {
      e.blockedOn === t &&
        ((e.blockedOn = null),
        Bu ||
          ((Bu = !0),
          mt.unstable_scheduleCallback(mt.unstable_NormalPriority, CS)));
    }
    function wi(e) {
      function t(o) {
        return qo(o, e);
      }
      if (0 < Rs.length) {
        qo(Rs[0], e);
        for (var n = 1; n < Rs.length; n++) {
          var r = Rs[n];
          r.blockedOn === e && (r.blockedOn = null);
        }
      }
      for (
        Mn !== null && qo(Mn, e),
          Vn !== null && qo(Vn, e),
          $n !== null && qo($n, e),
          _i.forEach(t),
          Ei.forEach(t),
          n = 0;
        n < In.length;
        n++
      )
        (r = In[n]), r.blockedOn === e && (r.blockedOn = null);
      for (; 0 < In.length && ((n = In[0]), n.blockedOn === null); )
        Vh(n), n.blockedOn === null && In.shift();
    }
    var ro = yn.ReactCurrentBatchConfig,
      Js = !0;
    function LS(e, t, n, r) {
      var o = oe,
        i = ro.transition;
      ro.transition = null;
      try {
        (oe = 1), Ac(e, t, n, r);
      } finally {
        (oe = o), (ro.transition = i);
      }
    }
    function kS(e, t, n, r) {
      var o = oe,
        i = ro.transition;
      ro.transition = null;
      try {
        (oe = 4), Ac(e, t, n, r);
      } finally {
        (oe = o), (ro.transition = i);
      }
    }
    function Ac(e, t, n, r) {
      if (Js) {
        var o = ju(e, t, n, r);
        if (o === null) hu(e, t, r, el, n), cp(e, r);
        else if (AS(o, e, t, n, r)) r.stopPropagation();
        else if ((cp(e, r), t & 4 && -1 < NS.indexOf(e))) {
          for (; o !== null; ) {
            var i = Vi(o);
            if (
              (i !== null && Ph(i),
              (i = ju(e, t, n, r)),
              i === null && hu(e, t, r, el, n),
              i === o)
            )
              break;
            o = i;
          }
          o !== null && r.stopPropagation();
        } else hu(e, t, r, null, n);
      }
    }
    var el = null;
    function ju(e, t, n, r) {
      if (((el = null), (e = Tc(r)), (e = ur(e)), e !== null))
        if (((t = _r(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
          if (((e = Rh(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      return (el = e), null;
    }
    function $h(e) {
      switch (e) {
        case 'cancel':
        case 'click':
        case 'close':
        case 'contextmenu':
        case 'copy':
        case 'cut':
        case 'auxclick':
        case 'dblclick':
        case 'dragend':
        case 'dragstart':
        case 'drop':
        case 'focusin':
        case 'focusout':
        case 'input':
        case 'invalid':
        case 'keydown':
        case 'keypress':
        case 'keyup':
        case 'mousedown':
        case 'mouseup':
        case 'paste':
        case 'pause':
        case 'play':
        case 'pointercancel':
        case '\
pointerdown':
        case 'pointerup':
        case 'ratechange':
        case 'reset':
        case 'resize':
        case 'seeked':
        case 'submit':
        case 'touchcancel':
        case 'touchend':
        case 'touchstart':
        case 'volumechange':
        case 'change':
        case 'selectionchange':
        case 'textInput':
        case 'compositionstart':
        case 'compositionend':
        case 'compositionupdate':
        case 'beforeblur':
        case 'afterblur':
        case 'beforeinput':
        case 'blur':
        case 'fullscreenchange':
        case 'focus':
        case 'hashchange':
        case 'popstate':
        case 'select':
        case 'selectstart':
          return 1;
        case 'drag':
        case 'dragenter':
        case 'dragexit':
        case '\
dragleave':
        case 'dragover':
        case 'mousemove':
        case 'mouseout':
        case 'mouseover':
        case 'pointermove':
        case 'pointerout':
        case 'pointerover':
        case 'scroll':
        case 'toggle':
        case 'touchmove':
        case 'wheel':
        case 'mouseenter':
        case 'mouseleave':
        case 'pointerenter':
        case 'pointerleave':
          return 4;
        case 'message':
          switch (yS()) {
            case Rc:
              return 1;
            case Ch:
              return 4;
            case Xs:
            case gS:
              return 16;
            case Lh:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var On = null,
      Cc = null,
      bs = null;
    function Uh() {
      if (bs) return bs;
      var e,
        t = Cc,
        n = t.length,
        r,
        o = 'value' in On ? On.value : On.textContent,
        i = o.length;
      for (e = 0; e < n && t[e] === o[e]; e++);
      var s = n - e;
      for (r = 1; r <= s && t[n - r] === o[i - r]; r++);
      return (bs = o.slice(e, 1 < r ? 1 - r : void 0));
    }
    function Fs(e) {
      var t = e.keyCode;
      return (
        'charCode' in e
          ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
          : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
      );
    }
    function xs() {
      return !0;
    }
    function dp() {
      return !1;
    }
    function vt(e) {
      function t(n, r, o, i, s) {
        (this._reactName = n),
          (this._targetInst = o),
          (this.type = r),
          (this.nativeEvent = i),
          (this.target = s),
          (this.currentTarget = null);
        for (var l in e)
          e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(i) : i[l]));
        return (
          (this.isDefaultPrevented = (
            i.defaultPrevented != null
              ? i.defaultPrevented
              : i.returnValue === !1
          )
            ? xs
            : dp),
          (this.isPropagationStopped = dp),
          this
        );
      }
      return (
        Re(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n &&
              (n.preventDefault
                ? n.preventDefault()
                : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
              (this.isDefaultPrevented = xs));
          },
          stopPropagation: function () {
            var n = this.nativeEvent;
            n &&
              (n.stopPropagation
                ? n.stopPropagation()
                : typeof n.cancelBubble !=
                    'u\
nknown' && (n.cancelBubble = !0),
              (this.isPropagationStopped = xs));
          },
          persist: function () {},
          isPersistent: xs,
        }),
        t
      );
    }
    var ho = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      Lc = vt(ho),
      Mi = Re({}, ho, { view: 0, detail: 0 }),
      IS = vt(Mi),
      au,
      uu,
      Jo,
      Sl = Re({}, Mi, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: kc,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
          return e.relatedTarget === void 0
            ? e.fromElement === e.srcElement
              ? e.toElement
              : e.fromElement
            : e.relatedTarget;
        },
        movementX: function (e) {
          return 'movementX' in e
            ? e.movementX
            : (e !== Jo &&
                (Jo && e.type === 'mousemove'
                  ? ((au = e.screenX - Jo.screenX),
                    (uu = e.screenY - Jo.screenY))
                  : (uu = au = 0),
                (Jo = e)),
              au);
        },
        movementY: function (e) {
          return 'movementY' in e ? e.movementY : uu;
        },
      }),
      pp = vt(Sl),
      PS = Re({}, Sl, { dataTransfer: 0 }),
      OS = vt(PS),
      DS = Re({}, Mi, { relatedTarget: 0 }),
      cu = vt(DS),
      MS = Re({}, ho, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      VS = vt(MS),
      $S = Re({}, ho, {
        clipboardData: function (e) {
          return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
        },
      }),
      US = vt($S),
      bS = Re({}, ho, { data: 0 }),
      hp = vt(bS),
      FS = {
        Esc: 'Escape',
        Spacebar: ' ',
        Left: 'ArrowLeft',
        Up: 'ArrowUp',
        Right: 'ArrowRight',
        Down: 'ArrowDown',
        Del: 'Delete',
        Win: 'OS',
        Menu: 'ContextMenu',
        Apps: 'ContextMenu',
        Scroll: 'ScrollLock',
        MozPrintableKey: 'Unidentified',
      },
      zS = {
        8: 'Backspace',
        9: 'Tab',
        12: 'Clear',
        13: 'Enter',
        16: 'Shift',
        17: 'Control',
        18: 'Alt',
        19: 'Pause',
        20: 'CapsLock',
        27: 'Escape',
        32: ' ',
        33: 'PageUp',
        34: 'PageDown',
        35: 'End',
        36: 'Home',
        37: 'ArrowLeft',
        38: 'ArrowUp',
        39: 'ArrowR\
ight',
        40: 'ArrowDown',
        45: 'Insert',
        46: 'Delete',
        112: 'F1',
        113: 'F2',
        114: 'F3',
        115: 'F4',
        116: 'F5',
        117: 'F6',
        118: 'F7',
        119: 'F8',
        120: 'F9',
        121: 'F10',
        122: 'F11',
        123: 'F12',
        144: 'NumLock',
        145: 'ScrollLock',
        224: 'Meta',
      },
      BS = {
        Alt: 'altKey',
        Control: 'ctrlKey',
        Meta: 'metaKey',
        Shift: 'shiftKey',
      };
    function jS(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : (e = BS[e])
        ? !!t[e]
        : !1;
    }
    function kc() {
      return jS;
    }
    var HS = Re({}, Mi, {
        key: function (e) {
          if (e.key) {
            var t = FS[e.key] || e.key;
            if (t !== 'Unidentified') return t;
          }
          return e.type === 'keypress'
            ? ((e = Fs(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
            : e.type === 'keydown' || e.type === 'keyup'
            ? zS[e.keyCode] || 'Unidentified'
            : '';
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: kc,
        charCode: function (e) {
          return e.type === 'keypress' ? Fs(e) : 0;
        },
        keyCode: function (e) {
          return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
        },
        which: function (e) {
          return e.type === 'keypress'
            ? Fs(e)
            : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
        },
      }),
      WS = vt(HS),
      GS = Re({}, Sl, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
      }),
      mp = vt(GS),
      KS = Re({}, Mi, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: kc,
      }),
      QS = vt(KS),
      YS = Re({}, ho, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      ZS = vt(YS),
      XS = Re({}, Sl, {
        deltaX: function (e) {
          return 'deltaX' in e
            ? e.deltaX
            : 'wheelDeltaX' in e
            ? -e.wheelDeltaX
            : 0;
        },
        deltaY: function (e) {
          return 'deltaY' in e
            ? e.deltaY
            : 'wheelDeltaY' in e
            ? -e.wheelDeltaY
            : 'wheelDelta' in e
            ? -e.wheelDelta
            : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
      }),
      qS = vt(XS),
      JS = [9, 13, 27, 32],
      Ic = pn && 'CompositionEvent' in window,
      ci = null;
    pn && 'documentMode' in document && (ci = document.documentMode);
    var e_ = pn && 'TextEvent' in window && !ci,
      bh = pn && (!Ic || (ci && 8 < ci && 11 >= ci)),
      vp = String.fromCharCode(32),
      yp = !1;
    function Fh(e, t) {
      switch (e) {
        case 'keyup':
          return JS.indexOf(t.keyCode) !== -1;
        case 'keydown':
          return t.keyCode !== 229;
        case 'keypress':
        case 'mousedown':
        case 'focusout':
          return !0;
        default:
          return !1;
      }
    }
    function zh(e) {
      return (
        (e = e.detail),
        typeof e ==
          'objec\
t' && 'data' in e
          ? e.data
          : null
      );
    }
    var Hr = !1;
    function t_(e, t) {
      switch (e) {
        case 'compositionend':
          return zh(t);
        case 'keypress':
          return t.which !== 32 ? null : ((yp = !0), vp);
        case 'textInput':
          return (e = t.data), e === vp && yp ? null : e;
        default:
          return null;
      }
    }
    function n_(e, t) {
      if (Hr)
        return e === 'compositionend' || (!Ic && Fh(e, t))
          ? ((e = Uh()), (bs = Cc = On = null), (Hr = !1), e)
          : null;
      switch (e) {
        case 'paste':
          return null;
        case 'keypress':
          if (
            !(t.ctrlKey || t.altKey || t.metaKey) ||
            (t.ctrlKey && t.altKey)
          ) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case 'compositionend':
          return bh && t.locale !== 'ko' ? null : t.data;
        default:
          return null;
      }
    }
    var r_ = {
      'color': !0,
      'date': !0,
      'datetime': !0,
      'datetime-local': !0,
      'email': !0,
      'month': !0,
      'number': !0,
      'password': !0,
      'range': !0,
      'search': !0,
      'tel': !0,
      'text': !0,
      'time': !0,
      'url': !0,
      'week': !0,
    };
    function gp(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === 'input' ? !!r_[e.type] : t === 'textarea';
    }
    function Bh(e, t, n, r) {
      Sh(r),
        (t = tl(t, 'onChange')),
        0 < t.length &&
          ((n = new Lc('onChange', 'change', null, n, r)),
          e.push({ event: n, listeners: t }));
    }
    var fi = null,
      Ti = null;
    function o_(e) {
      Jh(e, 0);
    }
    function _l(e) {
      var t = Kr(e);
      if (dh(t)) return e;
    }
    function i_(e, t) {
      if (e === 'change') return t;
    }
    var jh = !1;
    pn &&
      (pn
        ? ((As = 'oninput' in document),
          As ||
            ((fu = document.createElement('div')),
            fu.setAttribute('oninput', 'return;'),
            (As = typeof fu.oninput == 'function')),
          (Ns = As))
        : (Ns = !1),
      (jh = Ns && (!document.documentMode || 9 < document.documentMode)));
    var Ns, As, fu;
    function Sp() {
      fi && (fi.detachEvent('onpropertychange', Hh), (Ti = fi = null));
    }
    function Hh(e) {
      if (e.propertyName === 'value' && _l(Ti)) {
        var t = [];
        Bh(t, Ti, e, Tc(e)), Th(o_, t);
      }
    }
    function s_(e, t, n) {
      e === 'focusin'
        ? (Sp(), (fi = t), (Ti = n), fi.attachEvent('onpropertychange', Hh))
        : e === 'focusout' && Sp();
    }
    function l_(e) {
      if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
        return _l(Ti);
    }
    function a_(e, t) {
      if (e === 'click') return _l(t);
    }
    function u_(e, t) {
      if (e === 'input' || e === 'change') return _l(t);
    }
    function c_(e, t) {
      return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
    }
    var Ht = typeof Object.is == 'function' ? Object.is : c_;
    function Ri(e, t) {
      if (Ht(e, t)) return !0;
      if (
        typeof e != 'object' ||
        e === null ||
        typeof t !=
          'o\
bject' ||
        t === null
      )
        return !1;
      var n = Object.keys(e),
        r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++) {
        var o = n[r];
        if (!xu.call(t, o) || !Ht(e[o], t[o])) return !1;
      }
      return !0;
    }
    function _p(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Ep(e, t) {
      var n = _p(e);
      e = 0;
      for (var r; n; ) {
        if (n.nodeType === 3) {
          if (((r = e + n.textContent.length), e <= t && r >= t))
            return { node: n, offset: t - e };
          e = r;
        }
        e: {
          for (; n; ) {
            if (n.nextSibling) {
              n = n.nextSibling;
              break e;
            }
            n = n.parentNode;
          }
          n = void 0;
        }
        n = _p(n);
      }
    }
    function Wh(e, t) {
      return e && t
        ? e === t
          ? !0
          : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
          ? Wh(e, t.parentNode)
          : 'contains' in e
          ? e.contains(t)
          : e.compareDocumentPosition
          ? !!(e.compareDocumentPosition(t) & 16)
          : !1
        : !1;
    }
    function Gh() {
      for (var e = window, t = Qs(); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = typeof t.contentWindow.location.href == 'string';
        } catch {
          n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = Qs(e.document);
      }
      return t;
    }
    function Pc(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        t &&
        ((t === 'input' &&
          (e.type === 'text' ||
            e.type === 'search' ||
            e.type === 'tel' ||
            e.type === 'url' ||
            e.type === 'password')) ||
          t === 'textarea' ||
          e.contentEditable === 'true')
      );
    }
    function f_(e) {
      var t = Gh(),
        n = e.focusedElem,
        r = e.selectionRange;
      if (
        t !== n &&
        n &&
        n.ownerDocument &&
        Wh(n.ownerDocument.documentElement, n)
      ) {
        if (r !== null && Pc(n)) {
          if (
            ((t = r.start),
            (e = r.end),
            e === void 0 && (e = t),
            'selectionStart' in n)
          )
            (n.selectionStart = t),
              (n.selectionEnd = Math.min(e, n.value.length));
          else if (
            ((e =
              ((t = n.ownerDocument || document) && t.defaultView) || window),
            e.getSelection)
          ) {
            e = e.getSelection();
            var o = n.textContent.length,
              i = Math.min(r.start, o);
            (r = r.end === void 0 ? i : Math.min(r.end, o)),
              !e.extend && i > r && ((o = r), (r = i), (i = o)),
              (o = Ep(n, i));
            var s = Ep(n, r);
            o &&
              s &&
              (e.rangeCount !== 1 ||
                e.anchorNode !== o.node ||
                e.anchorOffset !== o.offset ||
                e.focusNode !== s.node ||
                e.focusOffset !== s.offset) &&
              ((t = t.createRange()),
              t.setStart(o.node, o.offset),
              e.removeAllRanges(),
              i > r
                ? (e.addRange(t), e.extend(s.node, s.offset))
                : (t.setEnd(s.node, s.offset), e.addRange(t)));
          }
        }
        for (t = [], e = n; (e = e.parentNode); )
          e.nodeType === 1 &&
            t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
        for (
          typeof n.focus == 'function' && n.focus(), n = 0;
          n < t.length;
          n++
        )
          (e = t[n]),
            (e.element.scrollLeft = e.left),
            (e.element.scrollTop = e.top);
      }
    }
    var d_ = pn && 'documentMode' in document && 11 >= document.documentMode,
      Wr = null,
      Hu = null,
      di = null,
      Wu = !1;
    function wp(e, t, n) {
      var r =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      Wu ||
        Wr == null ||
        Wr !== Qs(r) ||
        ((r = Wr),
        'selectionStart' in r && Pc(r)
          ? (r = { start: r.selectionStart, end: r.selectionEnd })
          : ((r = (
              (r.ownerDocument && r.ownerDocument.defaultView) ||
              window
            ).getSelection()),
            (r = {
              anchorNode: r.anchorNode,
              anchorOffset: r.anchorOffset,
              focusNode: r.focusNode,
              focusOffset: r.focusOffset,
            })),
        (di && Ri(di, r)) ||
          ((di = r),
          (r = tl(Hu, 'onSelect')),
          0 < r.length &&
            ((t = new Lc('onSelect', 'select', null, t, n)),
            e.push({ event: t, listeners: r }),
            (t.target = Wr))));
    }
    function Cs(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n['Webkit' + e] = 'webkit' + t),
        (n['Moz' + e] = 'moz' + t),
        n
      );
    }
    var Gr = {
        animationend: Cs('Animation', 'AnimationEnd'),
        animationiteration: Cs('Animation', 'AnimationIteration'),
        animationstart: Cs('Animation', 'AnimationStart'),
        transitionend: Cs('Transition', 'TransitionEnd'),
      },
      du = {},
      Kh = {};
    pn &&
      ((Kh = document.createElement('div').style),
      'AnimationEvent' in window ||
        (delete Gr.animationend.animation,
        delete Gr.animationiteration.animation,
        delete Gr.animationstart.animation),
      'TransitionEvent' in window || delete Gr.transitionend.transition);
    function El(e) {
      if (du[e]) return du[e];
      if (!Gr[e]) return e;
      var t = Gr[e],
        n;
      for (n in t) if (t.hasOwnProperty(n) && n in Kh) return (du[e] = t[n]);
      return e;
    }
    var Qh = El('animationend'),
      Yh = El('animationiteration'),
      Zh = El('animationstart'),
      Xh = El('transitionend'),
      qh = new Map(),
      Tp = '\
abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stall\
ed submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' ',
      );
    function Wn(e, t) {
      qh.set(e, t), Sr(t, [e]);
    }
    for (Ls = 0; Ls < Tp.length; Ls++)
      (ks = Tp[Ls]),
        (Rp = ks.toLowerCase()),
        (xp = ks[0].toUpperCase() + ks.slice(1)),
        Wn(Rp, 'on' + xp);
    var ks, Rp, xp, Ls;
    Wn(Qh, 'onAnimationEnd');
    Wn(Yh, 'onAnimationIteration');
    Wn(Zh, 'onAnimationStart');
    Wn('dblclick', 'onDoubleClick');
    Wn('focusin', 'onFocus');
    Wn('focusout', 'onBlur');
    Wn(Xh, 'onTransitionEnd');
    so('onMouseEnter', ['mouseout', 'mouseover']);
    so('onMouseLeave', ['mouseout', 'mouseover']);
    so('onPointerEnter', ['pointerout', 'pointerover']);
    so('onPointerLeave', ['pointerout', 'pointerover']);
    Sr(
      'onChange',
      'change click focusin focusout input keydown keyup selectionchange'.split(
        ' ',
      ),
    );
    Sr(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' ',
      ),
    );
    Sr('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
    Sr(
      'onCompositionEnd',
      'compositionend focusout keydown keypress k\
eyup mousedown'.split(' '),
    );
    Sr(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' '),
    );
    Sr(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' '),
    );
    var li =
        'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
          ' ',
        ),
      p_ = new Set(
        'cancel close invalid load\
 scroll toggle'
          .split(' ')
          .concat(li),
      );
    function Np(e, t, n) {
      var r = e.type || 'unknown-event';
      (e.currentTarget = n), pS(r, t, void 0, e), (e.currentTarget = null);
    }
    function Jh(e, t) {
      t = (t & 4) !== 0;
      for (var n = 0; n < e.length; n++) {
        var r = e[n],
          o = r.event;
        r = r.listeners;
        e: {
          var i = void 0;
          if (t)
            for (var s = r.length - 1; 0 <= s; s--) {
              var l = r[s],
                a = l.instance,
                u = l.currentTarget;
              if (((l = l.listener), a !== i && o.isPropagationStopped()))
                break e;
              Np(o, l, u), (i = a);
            }
          else
            for (s = 0; s < r.length; s++) {
              if (
                ((l = r[s]),
                (a = l.instance),
                (u = l.currentTarget),
                (l = l.listener),
                a !== i && o.isPropagationStopped())
              )
                break e;
              Np(o, l, u), (i = a);
            }
        }
      }
      if (Zs) throw ((e = Fu), (Zs = !1), (Fu = null), e);
    }
    function de(e, t) {
      var n = t[Zu];
      n === void 0 && (n = t[Zu] = new Set());
      var r = e + '__bubble';
      n.has(r) || (em(t, e, 2, !1), n.add(r));
    }
    function pu(e, t, n) {
      var r = 0;
      t && (r |= 4), em(n, e, r, t);
    }
    var Is = '_reactListening' + Math.random().toString(36).slice(2);
    function xi(e) {
      if (!e[Is]) {
        (e[Is] = !0),
          lh.forEach(function (n) {
            n !== 'selectionchange' &&
              (p_.has(n) || pu(n, !1, e), pu(n, !0, e));
          });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Is] || ((t[Is] = !0), pu('selectionchange', !1, t));
      }
    }
    function em(e, t, n, r) {
      switch ($h(t)) {
        case 1:
          var o = LS;
          break;
        case 4:
          o = kS;
          break;
        default:
          o = Ac;
      }
      (n = o.bind(null, t, n, e)),
        (o = void 0),
        !bu ||
          (t !== 'touchstart' && t !== 'touchmove' && t !== 'wheel') ||
          (o = !0),
        r
          ? o !== void 0
            ? e.addEventListener(t, n, { capture: !0, passive: o })
            : e.addEventListener(t, n, !0)
          : o !== void 0
          ? e.addEventListener(t, n, { passive: o })
          : e.addEventListener(t, n, !1);
    }
    function hu(e, t, n, r, o) {
      var i = r;
      if (!(t & 1) && !(t & 2) && r !== null)
        e: for (;;) {
          if (r === null) return;
          var s = r.tag;
          if (s === 3 || s === 4) {
            var l = r.stateNode.containerInfo;
            if (l === o || (l.nodeType === 8 && l.parentNode === o)) break;
            if (s === 4)
              for (s = r.return; s !== null; ) {
                var a = s.tag;
                if (
                  (a === 3 || a === 4) &&
                  ((a = s.stateNode.containerInfo),
                  a === o || (a.nodeType === 8 && a.parentNode === o))
                )
                  return;
                s = s.return;
              }
            for (; l !== null; ) {
              if (((s = ur(l)), s === null)) return;
              if (((a = s.tag), a === 5 || a === 6)) {
                r = i = s;
                continue e;
              }
              l = l.parentNode;
            }
          }
          r = r.return;
        }
      Th(function () {
        var u = i,
          f = Tc(n),
          p = [];
        e: {
          var m = qh.get(e);
          if (m !== void 0) {
            var S = Lc,
              y = e;
            switch (e) {
              case 'keypress':
                if (Fs(n) === 0) break e;
              case 'keydown':
              case 'keyup':
                S = WS;
                break;
              case 'focusin':
                (y = 'focus'), (S = cu);
                break;
              case 'focusout':
                (y = 'blur'), (S = cu);
                break;
              case 'beforeblur':
              case 'afterblur':
                S = cu;
                break;
              case 'click':
                if (n.button === 2) break e;
              case 'auxclick':
              case 'dblclick':
              case 'mousedown':
              case 'mousemove':
              case 'mouseup':
              case 'mouseout':
              case 'mouseover':
              case 'contextmenu':
                S = pp;
                break;
              case 'drag':
              case 'dragend':
              case 'dragenter':
              case 'dragexit':
              case 'dragleave':
              case 'dragover':
              case 'dragstart':
              case 'drop':
                S = OS;
                break;
              case 'touchcancel':
              case 'touchend':
              case 'touchmove':
              case 'touchstart':
                S = QS;
                break;
              case Qh:
              case Yh:
              case Zh:
                S = VS;
                break;
              case Xh:
                S = ZS;
                break;
              case 'scroll':
                S = IS;
                break;
              case '\
wheel':
                S = qS;
                break;
              case 'copy':
              case 'cut':
              case 'paste':
                S = US;
                break;
              case 'gotpointercapture':
              case 'lostpointercapture':
              case 'pointercancel':
              case 'pointerdown':
              case 'pointermove':
              case 'pointerout':
              case 'pointerover':
              case 'pointerup':
                S = mp;
            }
            var w = (t & 4) !== 0,
              U = !w && e === 'scroll',
              h = w ? (m !== null ? m + 'Capture' : null) : m;
            w = [];
            for (var c = u, d; c !== null; ) {
              d = c;
              var E = d.stateNode;
              if (
                (d.tag === 5 &&
                  E !== null &&
                  ((d = E),
                  h !== null &&
                    ((E = Si(c, h)), E != null && w.push(Ni(c, E, d)))),
                U)
              )
                break;
              c = c.return;
            }
            0 < w.length &&
              ((m = new S(m, y, null, n, f)),
              p.push({ event: m, listeners: w }));
          }
        }
        if (!(t & 7)) {
          e: {
            if (
              ((m = e === 'mouseover' || e === 'pointerover'),
              (S = e === 'mouseout' || e === 'pointerout'),
              m &&
                n !== $u &&
                (y = n.relatedTarget || n.fromElement) &&
                (ur(y) || y[hn]))
            )
              break e;
            if (
              (S || m) &&
              ((m =
                f.window === f
                  ? f
                  : (m = f.ownerDocument)
                  ? m.defaultView || m.parentWindow
                  : window),
              S
                ? ((y = n.relatedTarget || n.toElement),
                  (S = u),
                  (y = y ? ur(y) : null),
                  y !== null &&
                    ((U = _r(y)), y !== U || (y.tag !== 5 && y.tag !== 6)) &&
                    (y = null))
                : ((S = null), (y = u)),
              S !== y)
            ) {
              if (
                ((w = pp),
                (E = 'onMouseLeave'),
                (h = 'onMouseEnter'),
                (c = 'mouse'),
                (e === 'pointerout' || e === 'pointerover') &&
                  ((w = mp),
                  (E = 'onPointerLeave'),
                  (h =
                    'onP\
ointerEnter'),
                  (c = 'pointer')),
                (U = S == null ? m : Kr(S)),
                (d = y == null ? m : Kr(y)),
                (m = new w(E, c + 'leave', S, n, f)),
                (m.target = U),
                (m.relatedTarget = d),
                (E = null),
                ur(f) === u &&
                  ((w = new w(h, c + 'enter', y, n, f)),
                  (w.target = d),
                  (w.relatedTarget = U),
                  (E = w)),
                (U = E),
                S && y)
              )
                t: {
                  for (w = S, h = y, c = 0, d = w; d; d = zr(d)) c++;
                  for (d = 0, E = h; E; E = zr(E)) d++;
                  for (; 0 < c - d; ) (w = zr(w)), c--;
                  for (; 0 < d - c; ) (h = zr(h)), d--;
                  for (; c--; ) {
                    if (w === h || (h !== null && w === h.alternate)) break t;
                    (w = zr(w)), (h = zr(h));
                  }
                  w = null;
                }
              else w = null;
              S !== null && Ap(p, m, S, w, !1),
                y !== null && U !== null && Ap(p, U, y, w, !0);
            }
          }
          e: {
            if (
              ((m = u ? Kr(u) : window),
              (S = m.nodeName && m.nodeName.toLowerCase()),
              S === 'select' || (S === 'input' && m.type === 'file'))
            )
              var R = i_;
            else if (gp(m))
              if (jh) R = u_;
              else {
                R = l_;
                var x = s_;
              }
            else
              (S = m.nodeName) &&
                S.toLowerCase() === 'input' &&
                (m.type === 'checkbox' || m.type === 'radio') &&
                (R = a_);
            if (R && (R = R(e, u))) {
              Bh(p, R, n, f);
              break e;
            }
            x && x(e, m, u),
              e === 'focusout' &&
                (x = m._wrapperState) &&
                x.controlled &&
                m.type === 'number' &&
                Pu(m, 'number', m.value);
          }
          switch (((x = u ? Kr(u) : window), e)) {
            case 'focusin':
              (gp(x) || x.contentEditable === 'true') &&
                ((Wr = x), (Hu = u), (di = null));
              break;
            case 'focusout':
              di = Hu = Wr = null;
              break;
            case '\
mousedown':
              Wu = !0;
              break;
            case 'contextmenu':
            case 'mouseup':
            case 'dragend':
              (Wu = !1), wp(p, n, f);
              break;
            case 'selectionchange':
              if (d_) break;
            case 'keydown':
            case 'keyup':
              wp(p, n, f);
          }
          var T;
          if (Ic)
            e: {
              switch (e) {
                case 'compositionstart':
                  var O = 'onCompositionStart';
                  break e;
                case 'compositionend':
                  O = 'onCompositionEnd';
                  break e;
                case 'compositionupdate':
                  O = 'onCompositionUpdate';
                  break e;
              }
              O = void 0;
            }
          else
            Hr
              ? Fh(e, n) && (O = 'onCompositionEnd')
              : e === 'keydown' &&
                n.keyCode === 229 &&
                (O = 'onCompositionStart');
          O &&
            (bh &&
              n.locale !== 'ko' &&
              (Hr ||
              O !==
                'onComposi\
tionStart'
                ? O === 'onCompositionEnd' && Hr && (T = Uh())
                : ((On = f),
                  (Cc = 'value' in On ? On.value : On.textContent),
                  (Hr = !0))),
            (x = tl(u, O)),
            0 < x.length &&
              ((O = new hp(O, e, null, n, f)),
              p.push({ event: O, listeners: x }),
              T ? (O.data = T) : ((T = zh(n)), T !== null && (O.data = T)))),
            (T = e_ ? t_(e, n) : n_(e, n)) &&
              ((u = tl(u, 'onBeforeInput')),
              0 < u.length &&
                ((f = new hp('onBeforeInput', 'beforeinput', null, n, f)),
                p.push({ event: f, listeners: u }),
                (f.data = T)));
        }
        Jh(p, t);
      });
    }
    function Ni(e, t, n) {
      return { instance: e, listener: t, currentTarget: n };
    }
    function tl(e, t) {
      for (var n = t + 'Capture', r = []; e !== null; ) {
        var o = e,
          i = o.stateNode;
        o.tag === 5 &&
          i !== null &&
          ((o = i),
          (i = Si(e, n)),
          i != null && r.unshift(Ni(e, i, o)),
          (i = Si(e, t)),
          i != null && r.push(Ni(e, i, o))),
          (e = e.return);
      }
      return r;
    }
    function zr(e) {
      if (e === null) return null;
      do e = e.return;
      while (e && e.tag !== 5);
      return e || null;
    }
    function Ap(e, t, n, r, o) {
      for (var i = t._reactName, s = []; n !== null && n !== r; ) {
        var l = n,
          a = l.alternate,
          u = l.stateNode;
        if (a !== null && a === r) break;
        l.tag === 5 &&
          u !== null &&
          ((l = u),
          o
            ? ((a = Si(n, i)), a != null && s.unshift(Ni(n, a, l)))
            : o || ((a = Si(n, i)), a != null && s.push(Ni(n, a, l)))),
          (n = n.return);
      }
      s.length !== 0 && e.push({ event: t, listeners: s });
    }
    var h_ = /\r\n?/g,
      m_ = /\u0000|\uFFFD/g;
    function Cp(e) {
      return (typeof e == 'string' ? e : '' + e)
        .replace(
          h_,
          `
`,
        )
        .replace(m_, '');
    }
    function Ps(e, t, n) {
      if (((t = Cp(t)), Cp(e) !== t && n)) throw Error(A(425));
    }
    function nl() {}
    var Gu = null,
      Ku = null;
    function Qu(e, t) {
      return (
        e === 'textarea' ||
        e === 'noscript' ||
        typeof t.children == 'string' ||
        typeof t.children == 'number' ||
        (typeof t.dangerouslySetInnerHTML == 'object' &&
          t.dangerouslySetInnerHTML !== null &&
          t.dangerouslySetInnerHTML.__html != null)
      );
    }
    var Yu = typeof setTimeout == 'function' ? setTimeout : void 0,
      v_ = typeof clearTimeout == 'function' ? clearTimeout : void 0,
      Lp = typeof Promise == 'function' ? Promise : void 0,
      y_ =
        typeof queueMicrotask == 'function'
          ? queueMicrotask
          : typeof Lp < 'u'
          ? function (e) {
              return Lp.resolve(null).then(e).catch(g_);
            }
          : Yu;
    function g_(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function mu(e, t) {
      var n = t,
        r = 0;
      do {
        var o = n.nextSibling;
        if ((e.removeChild(n), o && o.nodeType === 8))
          if (((n = o.data), n === '/$')) {
            if (r === 0) {
              e.removeChild(o), wi(t);
              return;
            }
            r--;
          } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
        n = o;
      } while (n);
      wi(t);
    }
    function Un(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (((t = e.data), t === '$' || t === '$!' || t === '$?')) break;
          if (t === '/$') return null;
        }
      }
      return e;
    }
    function kp(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === '$' || n === '$!' || n === '$?') {
            if (t === 0) return e;
            t--;
          } else n === '/$' && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    var mo = Math.random().toString(36).slice(2),
      Jt = '__reactFiber$' + mo,
      Ai = '__reactProps$' + mo,
      hn = '__reactContainer$' + mo,
      Zu = '__reactEvents$' + mo,
      S_ = '__reactListeners$' + mo,
      __ = '__reactHandles$' + mo;
    function ur(e) {
      var t = e[Jt];
      if (t) return t;
      for (var n = e.parentNode; n; ) {
        if ((t = n[hn] || n[Jt])) {
          if (
            ((n = t.alternate),
            t.child !== null || (n !== null && n.child !== null))
          )
            for (e = kp(e); e !== null; ) {
              if ((n = e[Jt])) return n;
              e = kp(e);
            }
          return t;
        }
        (e = n), (n = e.parentNode);
      }
      return null;
    }
    function Vi(e) {
      return (
        (e = e[Jt] || e[hn]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
          ? null
          : e
      );
    }
    function Kr(e) {
      if (e.tag === 5 || e.tag === 6) return e.stateNode;
      throw Error(A(33));
    }
    function wl(e) {
      return e[Ai] || null;
    }
    var Xu = [],
      Qr = -1;
    function Gn(e) {
      return { current: e };
    }
    function pe(e) {
      0 > Qr || ((e.current = Xu[Qr]), (Xu[Qr] = null), Qr--);
    }
    function fe(e, t) {
      Qr++, (Xu[Qr] = e.current), (e.current = t);
    }
    var Hn = {},
      He = Gn(Hn),
      st = Gn(!1),
      hr = Hn;
    function lo(e, t) {
      var n = e.type.contextTypes;
      if (!n) return Hn;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var o = {},
        i;
      for (i in n) o[i] = t[i];
      return (
        r &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = t),
          (e.__reactInternalMemoizedMaskedChildContext = o)),
        o
      );
    }
    function lt(e) {
      return (e = e.childContextTypes), e != null;
    }
    function rl() {
      pe(st), pe(He);
    }
    function Ip(e, t, n) {
      if (He.current !== Hn) throw Error(A(168));
      fe(He, t), fe(st, n);
    }
    function tm(e, t, n) {
      var r = e.stateNode;
      if (((t = t.childContextTypes), typeof r.getChildContext != 'function'))
        return n;
      r = r.getChildContext();
      for (var o in r)
        if (!(o in t)) throw Error(A(108, sS(e) || 'Unknown', o));
      return Re({}, n, r);
    }
    function ol(e) {
      return (
        (e =
          ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
          Hn),
        (hr = He.current),
        fe(He, e),
        fe(st, st.current),
        !0
      );
    }
    function Pp(e, t, n) {
      var r = e.stateNode;
      if (!r) throw Error(A(169));
      n
        ? ((e = tm(e, t, hr)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          pe(st),
          pe(He),
          fe(He, e))
        : pe(st),
        fe(st, n);
    }
    var un = null,
      Tl = !1,
      vu = !1;
    function nm(e) {
      un === null ? (un = [e]) : un.push(e);
    }
    function E_(e) {
      (Tl = !0), nm(e);
    }
    function Kn() {
      if (!vu && un !== null) {
        vu = !0;
        var e = 0,
          t = oe;
        try {
          var n = un;
          for (oe = 1; e < n.length; e++) {
            var r = n[e];
            do r = r(!0);
            while (r !== null);
          }
          (un = null), (Tl = !1);
        } catch (o) {
          throw (un !== null && (un = un.slice(e + 1)), Ah(Rc, Kn), o);
        } finally {
          (oe = t), (vu = !1);
        }
      }
      return null;
    }
    var Yr = [],
      Zr = 0,
      il = null,
      sl = 0,
      xt = [],
      Nt = 0,
      mr = null,
      cn = 1,
      fn = '';
    function lr(e, t) {
      (Yr[Zr++] = sl), (Yr[Zr++] = il), (il = e), (sl = t);
    }
    function rm(e, t, n) {
      (xt[Nt++] = cn), (xt[Nt++] = fn), (xt[Nt++] = mr), (mr = e);
      var r = cn;
      e = fn;
      var o = 32 - Bt(r) - 1;
      (r &= ~(1 << o)), (n += 1);
      var i = 32 - Bt(t) + o;
      if (30 < i) {
        var s = o - (o % 5);
        (i = (r & ((1 << s) - 1)).toString(32)),
          (r >>= s),
          (o -= s),
          (cn = (1 << (32 - Bt(t) + o)) | (n << o) | r),
          (fn = i + e);
      } else (cn = (1 << i) | (n << o) | r), (fn = e);
    }
    function Oc(e) {
      e.return !== null && (lr(e, 1), rm(e, 1, 0));
    }
    function Dc(e) {
      for (; e === il; )
        (il = Yr[--Zr]), (Yr[Zr] = null), (sl = Yr[--Zr]), (Yr[Zr] = null);
      for (; e === mr; )
        (mr = xt[--Nt]),
          (xt[Nt] = null),
          (fn = xt[--Nt]),
          (xt[Nt] = null),
          (cn = xt[--Nt]),
          (xt[Nt] = null);
    }
    var ht = null,
      pt = null,
      Se = !1,
      zt = null;
    function om(e, t) {
      var n = At(5, null, null, 0);
      (n.elementType = 'DELETED'),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
    }
    function Op(e, t) {
      switch (e.tag) {
        case 5:
          var n = e.type;
          return (
            (t =
              t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
                ? null
                : t),
            t !== null
              ? ((e.stateNode = t), (ht = e), (pt = Un(t.firstChild)), !0)
              : !1
          );
        case 6:
          return (
            (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
            t !== null ? ((e.stateNode = t), (ht = e), (pt = null), !0) : !1
          );
        case 13:
          return (
            (t = t.nodeType !== 8 ? null : t),
            t !== null
              ? ((n = mr !== null ? { id: cn, overflow: fn } : null),
                (e.memoizedState = {
                  dehydrated: t,
                  treeContext: n,
                  retryLane: 1073741824,
                }),
                (n = At(18, null, null, 0)),
                (n.stateNode = t),
                (n.return = e),
                (e.child = n),
                (ht = e),
                (pt = null),
                !0)
              : !1
          );
        default:
          return !1;
      }
    }
    function qu(e) {
      return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
    }
    function Ju(e) {
      if (Se) {
        var t = pt;
        if (t) {
          var n = t;
          if (!Op(e, t)) {
            if (qu(e)) throw Error(A(418));
            t = Un(n.nextSibling);
            var r = ht;
            t && Op(e, t)
              ? om(r, n)
              : ((e.flags = (e.flags & -4097) | 2), (Se = !1), (ht = e));
          }
        } else {
          if (qu(e)) throw Error(A(418));
          (e.flags = (e.flags & -4097) | 2), (Se = !1), (ht = e);
        }
      }
    }
    function Dp(e) {
      for (
        e = e.return;
        e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

      )
        e = e.return;
      ht = e;
    }
    function Os(e) {
      if (e !== ht) return !1;
      if (!Se) return Dp(e), (Se = !0), !1;
      var t;
      if (
        ((t = e.tag !== 3) &&
          !(t = e.tag !== 5) &&
          ((t = e.type),
          (t = t !== 'head' && t !== 'body' && !Qu(e.type, e.memoizedProps))),
        t && (t = pt))
      ) {
        if (qu(e)) throw (im(), Error(A(418)));
        for (; t; ) om(e, t), (t = Un(t.nextSibling));
      }
      if ((Dp(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
          throw Error(A(317));
        e: {
          for (e = e.nextSibling, t = 0; e; ) {
            if (e.nodeType === 8) {
              var n = e.data;
              if (n === '/$') {
                if (t === 0) {
                  pt = Un(e.nextSibling);
                  break e;
                }
                t--;
              } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
            }
            e = e.nextSibling;
          }
          pt = null;
        }
      } else pt = ht ? Un(e.stateNode.nextSibling) : null;
      return !0;
    }
    function im() {
      for (var e = pt; e; ) e = Un(e.nextSibling);
    }
    function ao() {
      (pt = ht = null), (Se = !1);
    }
    function Mc(e) {
      zt === null ? (zt = [e]) : zt.push(e);
    }
    var w_ = yn.ReactCurrentBatchConfig;
    function bt(e, t) {
      if (e && e.defaultProps) {
        (t = Re({}, t)), (e = e.defaultProps);
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
      }
      return t;
    }
    var ll = Gn(null),
      al = null,
      Xr = null,
      Vc = null;
    function $c() {
      Vc = Xr = al = null;
    }
    function Uc(e) {
      var t = ll.current;
      pe(ll), (e._currentValue = t);
    }
    function ec(e, t, n) {
      for (; e !== null; ) {
        var r = e.alternate;
        if (
          ((e.childLanes & t) !== t
            ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
            : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
          e === n)
        )
          break;
        e = e.return;
      }
    }
    function oo(e, t) {
      (al = e),
        (Vc = Xr = null),
        (e = e.dependencies),
        e !== null &&
          e.firstContext !== null &&
          (e.lanes & t && (it = !0), (e.firstContext = null));
    }
    function Lt(e) {
      var t = e._currentValue;
      if (Vc !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), Xr === null)) {
          if (al === null) throw Error(A(308));
          (Xr = e), (al.dependencies = { lanes: 0, firstContext: e });
        } else Xr = Xr.next = e;
      return t;
    }
    var cr = null;
    function bc(e) {
      cr === null ? (cr = [e]) : cr.push(e);
    }
    function sm(e, t, n, r) {
      var o = t.interleaved;
      return (
        o === null ? ((n.next = n), bc(t)) : ((n.next = o.next), (o.next = n)),
        (t.interleaved = n),
        mn(e, r)
      );
    }
    function mn(e, t) {
      e.lanes |= t;
      var n = e.alternate;
      for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
        (e.childLanes |= t),
          (n = e.alternate),
          n !== null && (n.childLanes |= t),
          (n = e),
          (e = e.return);
      return n.tag === 3 ? n.stateNode : null;
    }
    var kn = !1;
    function Fc(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
      };
    }
    function lm(e, t) {
      (e = e.updateQueue),
        t.updateQueue === e &&
          (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            effects: e.effects,
          });
    }
    function dn(e, t) {
      return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
      };
    }
    function bn(e, t, n) {
      var r = e.updateQueue;
      if (r === null) return null;
      if (((r = r.shared), te & 2)) {
        var o = r.pending;
        return (
          o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
          (r.pending = t),
          mn(e, n)
        );
      }
      return (
        (o = r.interleaved),
        o === null ? ((t.next = t), bc(r)) : ((t.next = o.next), (o.next = t)),
        (r.interleaved = t),
        mn(e, n)
      );
    }
    function zs(e, t, n) {
      if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (n & 4194240) !== 0))
      ) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), xc(e, n);
      }
    }
    function Mp(e, t) {
      var n = e.updateQueue,
        r = e.alternate;
      if (r !== null && ((r = r.updateQueue), n === r)) {
        var o = null,
          i = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
          do {
            var s = {
              eventTime: n.eventTime,
              lane: n.lane,
              tag: n.tag,
              payload: n.payload,
              callback: n.callback,
              next: null,
            };
            i === null ? (o = i = s) : (i = i.next = s), (n = n.next);
          } while (n !== null);
          i === null ? (o = i = t) : (i = i.next = t);
        } else o = i = t;
        (n = {
          baseState: r.baseState,
          firstBaseUpdate: o,
          lastBaseUpdate: i,
          shared: r.shared,
          effects: r.effects,
        }),
          (e.updateQueue = n);
        return;
      }
      (e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t);
    }
    function ul(e, t, n, r) {
      var o = e.updateQueue;
      kn = !1;
      var i = o.firstBaseUpdate,
        s = o.lastBaseUpdate,
        l = o.shared.pending;
      if (l !== null) {
        o.shared.pending = null;
        var a = l,
          u = a.next;
        (a.next = null), s === null ? (i = u) : (s.next = u), (s = a);
        var f = e.alternate;
        f !== null &&
          ((f = f.updateQueue),
          (l = f.lastBaseUpdate),
          l !== s &&
            (l === null ? (f.firstBaseUpdate = u) : (l.next = u),
            (f.lastBaseUpdate = a)));
      }
      if (i !== null) {
        var p = o.baseState;
        (s = 0), (f = u = a = null), (l = i);
        do {
          var m = l.lane,
            S = l.eventTime;
          if ((r & m) === m) {
            f !== null &&
              (f = f.next =
                {
                  eventTime: S,
                  lane: 0,
                  tag: l.tag,
                  payload: l.payload,
                  callback: l.callback,
                  next: null,
                });
            e: {
              var y = e,
                w = l;
              switch (((m = t), (S = n), w.tag)) {
                case 1:
                  if (((y = w.payload), typeof y == 'function')) {
                    p = y.call(S, p, m);
                    break e;
                  }
                  p = y;
                  break e;
                case 3:
                  y.flags = (y.flags & -65537) | 128;
                case 0:
                  if (
                    ((y = w.payload),
                    (m = typeof y == 'function' ? y.call(S, p, m) : y),
                    m == null)
                  )
                    break e;
                  p = Re({}, p, m);
                  break e;
                case 2:
                  kn = !0;
              }
            }
            l.callback !== null &&
              l.lane !== 0 &&
              ((e.flags |= 64),
              (m = o.effects),
              m === null ? (o.effects = [l]) : m.push(l));
          } else
            (S = {
              eventTime: S,
              lane: m,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            }),
              f === null ? ((u = f = S), (a = p)) : (f = f.next = S),
              (s |= m);
          if (((l = l.next), l === null)) {
            if (((l = o.shared.pending), l === null)) break;
            (m = l),
              (l = m.next),
              (m.next = null),
              (o.lastBaseUpdate = m),
              (o.shared.pending = null);
          }
        } while (1);
        if (
          (f === null && (a = p),
          (o.baseState = a),
          (o.firstBaseUpdate = u),
          (o.lastBaseUpdate = f),
          (t = o.shared.interleaved),
          t !== null)
        ) {
          o = t;
          do (s |= o.lane), (o = o.next);
          while (o !== t);
        } else i === null && (o.shared.lanes = 0);
        (yr |= s), (e.lanes = s), (e.memoizedState = p);
      }
    }
    function Vp(e, t, n) {
      if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
          var r = e[t],
            o = r.callback;
          if (o !== null) {
            if (((r.callback = null), (r = n), typeof o != 'function'))
              throw Error(A(191, o));
            o.call(r);
          }
        }
    }
    var am = new sh.Component().refs;
    function tc(e, t, n, r) {
      (t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : Re({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n);
    }
    var Rl = {
      isMounted: function (e) {
        return (e = e._reactInternals) ? _r(e) === e : !1;
      },
      enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = Je(),
          o = zn(e),
          i = dn(r, o);
        (i.payload = t),
          n != null && (i.callback = n),
          (t = bn(e, i, o)),
          t !== null && (jt(t, e, o, r), zs(t, e, o));
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = Je(),
          o = zn(e),
          i = dn(r, o);
        (i.tag = 1),
          (i.payload = t),
          n != null && (i.callback = n),
          (t = bn(e, i, o)),
          t !== null && (jt(t, e, o, r), zs(t, e, o));
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = Je(),
          r = zn(e),
          o = dn(n, r);
        (o.tag = 2),
          t != null && (o.callback = t),
          (t = bn(e, o, r)),
          t !== null && (jt(t, e, r, n), zs(t, e, r));
      },
    };
    function $p(e, t, n, r, o, i, s) {
      return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == 'function'
          ? e.shouldComponentUpdate(r, i, s)
          : t.prototype && t.prototype.isPureReactComponent
          ? !Ri(n, r) || !Ri(o, i)
          : !0
      );
    }
    function um(e, t, n) {
      var r = !1,
        o = Hn,
        i = t.contextType;
      return (
        typeof i == 'object' && i !== null
          ? (i = Lt(i))
          : ((o = lt(t) ? hr : He.current),
            (r = t.contextTypes),
            (i = (r = r != null) ? lo(e, o) : Hn)),
        (t = new t(n, i)),
        (e.memoizedState =
          t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = Rl),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = o),
          (e.__reactInternalMemoizedMaskedChildContext = i)),
        t
      );
    }
    function Up(e, t, n, r) {
      (e = t.state),
        typeof t.componentWillReceiveProps == 'function' &&
          t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && Rl.enqueueReplaceState(t, t.state, null);
    }
    function nc(e, t, n, r) {
      var o = e.stateNode;
      (o.props = n), (o.state = e.memoizedState), (o.refs = am), Fc(e);
      var i = t.contextType;
      typeof i ==
        'obje\
ct' && i !== null
        ? (o.context = Lt(i))
        : ((i = lt(t) ? hr : He.current), (o.context = lo(e, i))),
        (o.state = e.memoizedState),
        (i = t.getDerivedStateFromProps),
        typeof i == 'function' && (tc(e, t, i, n), (o.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == 'function' ||
          typeof o.getSnapshotBeforeUpdate == 'function' ||
          (typeof o.UNSAFE_componentWillMount != 'function' &&
            typeof o.componentWillMount != 'function') ||
          ((t = o.state),
          typeof o.componentWillMount == 'function' && o.componentWillMount(),
          typeof o.UNSAFE_componentWillMount == 'function' &&
            o.UNSAFE_componentWillMount(),
          t !== o.state && Rl.enqueueReplaceState(o, o.state, null),
          ul(e, n, o, r),
          (o.state = e.memoizedState)),
        typeof o.componentDidMount == 'function' && (e.flags |= 4194308);
    }
    function ei(e, t, n) {
      if (
        ((e = n.ref),
        e !== null && typeof e != 'function' && typeof e != 'object')
      ) {
        if (n._owner) {
          if (((n = n._owner), n)) {
            if (n.tag !== 1) throw Error(A(309));
            var r = n.stateNode;
          }
          if (!r) throw Error(A(147, e));
          var o = r,
            i = '' + e;
          return t !== null &&
            t.ref !== null &&
            typeof t.ref == 'function' &&
            t.ref._stringRef === i
            ? t.ref
            : ((t = function (s) {
                var l = o.refs;
                l === am && (l = o.refs = {}),
                  s === null ? delete l[i] : (l[i] = s);
              }),
              (t._stringRef = i),
              t);
        }
        if (typeof e != 'string') throw Error(A(284));
        if (!n._owner) throw Error(A(290, e));
      }
      return e;
    }
    function Ds(e, t) {
      throw (
        ((e = Object.prototype.toString.call(t)),
        Error(
          A(
            31,
            e === '[object Object]'
              ? 'object with keys {' + Object.keys(t).join(', ') + '}'
              : e,
          ),
        ))
      );
    }
    function bp(e) {
      var t = e._init;
      return t(e._payload);
    }
    function cm(e) {
      function t(h, c) {
        if (e) {
          var d = h.deletions;
          d === null ? ((h.deletions = [c]), (h.flags |= 16)) : d.push(c);
        }
      }
      function n(h, c) {
        if (!e) return null;
        for (; c !== null; ) t(h, c), (c = c.sibling);
        return null;
      }
      function r(h, c) {
        for (h = new Map(); c !== null; )
          c.key !== null ? h.set(c.key, c) : h.set(c.index, c), (c = c.sibling);
        return h;
      }
      function o(h, c) {
        return (h = Bn(h, c)), (h.index = 0), (h.sibling = null), h;
      }
      function i(h, c, d) {
        return (
          (h.index = d),
          e
            ? ((d = h.alternate),
              d !== null
                ? ((d = d.index), d < c ? ((h.flags |= 2), c) : d)
                : ((h.flags |= 2), c))
            : ((h.flags |= 1048576), c)
        );
      }
      function s(h) {
        return e && h.alternate === null && (h.flags |= 2), h;
      }
      function l(h, c, d, E) {
        return c === null || c.tag !== 6
          ? ((c = Tu(d, h.mode, E)), (c.return = h), c)
          : ((c = o(c, d)), (c.return = h), c);
      }
      function a(h, c, d, E) {
        var R = d.type;
        return R === jr
          ? f(h, c, d.props.children, E, d.key)
          : c !== null &&
            (c.elementType === R ||
              (typeof R == 'object' &&
                R !== null &&
                R.$$typeof === Ln &&
                bp(R) === c.type))
          ? ((E = o(c, d.props)), (E.ref = ei(h, c, d)), (E.return = h), E)
          : ((E = Ks(d.type, d.key, d.props, null, h.mode, E)),
            (E.ref = ei(h, c, d)),
            (E.return = h),
            E);
      }
      function u(h, c, d, E) {
        return c === null ||
          c.tag !== 4 ||
          c.stateNode.containerInfo !== d.containerInfo ||
          c.stateNode.implementation !== d.implementation
          ? ((c = Ru(d, h.mode, E)), (c.return = h), c)
          : ((c = o(c, d.children || [])), (c.return = h), c);
      }
      function f(h, c, d, E, R) {
        return c === null || c.tag !== 7
          ? ((c = pr(d, h.mode, E, R)), (c.return = h), c)
          : ((c = o(c, d)), (c.return = h), c);
      }
      function p(h, c, d) {
        if ((typeof c == 'string' && c !== '') || typeof c == 'number')
          return (c = Tu('' + c, h.mode, d)), (c.return = h), c;
        if (typeof c == 'object' && c !== null) {
          switch (c.$$typeof) {
            case Ss:
              return (
                (d = Ks(c.type, c.key, c.props, null, h.mode, d)),
                (d.ref = ei(h, null, c)),
                (d.return = h),
                d
              );
            case Br:
              return (c = Ru(c, h.mode, d)), (c.return = h), c;
            case Ln:
              var E = c._init;
              return p(h, E(c._payload), d);
          }
          if (ii(c) || Zo(c))
            return (c = pr(c, h.mode, d, null)), (c.return = h), c;
          Ds(h, c);
        }
        return null;
      }
      function m(h, c, d, E) {
        var R = c !== null ? c.key : null;
        if ((typeof d == 'string' && d !== '') || typeof d == 'number')
          return R !== null ? null : l(h, c, '' + d, E);
        if (typeof d == 'object' && d !== null) {
          switch (d.$$typeof) {
            case Ss:
              return d.key === R ? a(h, c, d, E) : null;
            case Br:
              return d.key === R ? u(h, c, d, E) : null;
            case Ln:
              return (R = d._init), m(h, c, R(d._payload), E);
          }
          if (ii(d) || Zo(d)) return R !== null ? null : f(h, c, d, E, null);
          Ds(h, d);
        }
        return null;
      }
      function S(h, c, d, E, R) {
        if ((typeof E == 'string' && E !== '') || typeof E == 'number')
          return (h = h.get(d) || null), l(c, h, '' + E, R);
        if (typeof E == 'object' && E !== null) {
          switch (E.$$typeof) {
            case Ss:
              return (
                (h = h.get(E.key === null ? d : E.key) || null), a(c, h, E, R)
              );
            case Br:
              return (
                (h = h.get(E.key === null ? d : E.key) || null), u(c, h, E, R)
              );
            case Ln:
              var x = E._init;
              return S(h, c, d, x(E._payload), R);
          }
          if (ii(E) || Zo(E))
            return (h = h.get(d) || null), f(c, h, E, R, null);
          Ds(c, E);
        }
        return null;
      }
      function y(h, c, d, E) {
        for (
          var R = null, x = null, T = c, O = (c = 0), ee = null;
          T !== null && O < d.length;
          O++
        ) {
          T.index > O ? ((ee = T), (T = null)) : (ee = T.sibling);
          var V = m(h, T, d[O], E);
          if (V === null) {
            T === null && (T = ee);
            break;
          }
          e && T && V.alternate === null && t(h, T),
            (c = i(V, c, O)),
            x === null ? (R = V) : (x.sibling = V),
            (x = V),
            (T = ee);
        }
        if (O === d.length) return n(h, T), Se && lr(h, O), R;
        if (T === null) {
          for (; O < d.length; O++)
            (T = p(h, d[O], E)),
              T !== null &&
                ((c = i(T, c, O)),
                x === null ? (R = T) : (x.sibling = T),
                (x = T));
          return Se && lr(h, O), R;
        }
        for (T = r(h, T); O < d.length; O++)
          (ee = S(T, h, O, d[O], E)),
            ee !== null &&
              (e &&
                ee.alternate !== null &&
                T.delete(ee.key === null ? O : ee.key),
              (c = i(ee, c, O)),
              x === null ? (R = ee) : (x.sibling = ee),
              (x = ee));
        return (
          e &&
            T.forEach(function (ae) {
              return t(h, ae);
            }),
          Se && lr(h, O),
          R
        );
      }
      function w(h, c, d, E) {
        var R = Zo(d);
        if (typeof R != 'function') throw Error(A(150));
        if (((d = R.call(d)), d == null)) throw Error(A(151));
        for (
          var x = (R = null), T = c, O = (c = 0), ee = null, V = d.next();
          T !== null && !V.done;
          O++, V = d.next()
        ) {
          T.index > O ? ((ee = T), (T = null)) : (ee = T.sibling);
          var ae = m(h, T, V.value, E);
          if (ae === null) {
            T === null && (T = ee);
            break;
          }
          e && T && ae.alternate === null && t(h, T),
            (c = i(ae, c, O)),
            x === null ? (R = ae) : (x.sibling = ae),
            (x = ae),
            (T = ee);
        }
        if (V.done) return n(h, T), Se && lr(h, O), R;
        if (T === null) {
          for (; !V.done; O++, V = d.next())
            (V = p(h, V.value, E)),
              V !== null &&
                ((c = i(V, c, O)),
                x === null ? (R = V) : (x.sibling = V),
                (x = V));
          return Se && lr(h, O), R;
        }
        for (T = r(h, T); !V.done; O++, V = d.next())
          (V = S(T, h, O, V.value, E)),
            V !== null &&
              (e &&
                V.alternate !== null &&
                T.delete(V.key === null ? O : V.key),
              (c = i(V, c, O)),
              x === null ? (R = V) : (x.sibling = V),
              (x = V));
        return (
          e &&
            T.forEach(function (Dt) {
              return t(h, Dt);
            }),
          Se && lr(h, O),
          R
        );
      }
      function U(h, c, d, E) {
        if (
          (typeof d == 'object' &&
            d !== null &&
            d.type === jr &&
            d.key === null &&
            (d = d.props.children),
          typeof d == 'object' && d !== null)
        ) {
          switch (d.$$typeof) {
            case Ss:
              e: {
                for (var R = d.key, x = c; x !== null; ) {
                  if (x.key === R) {
                    if (((R = d.type), R === jr)) {
                      if (x.tag === 7) {
                        n(h, x.sibling),
                          (c = o(x, d.props.children)),
                          (c.return = h),
                          (h = c);
                        break e;
                      }
                    } else if (
                      x.elementType === R ||
                      (typeof R == 'object' &&
                        R !== null &&
                        R.$$typeof === Ln &&
                        bp(R) === x.type)
                    ) {
                      n(h, x.sibling),
                        (c = o(x, d.props)),
                        (c.ref = ei(h, x, d)),
                        (c.return = h),
                        (h = c);
                      break e;
                    }
                    n(h, x);
                    break;
                  } else t(h, x);
                  x = x.sibling;
                }
                d.type === jr
                  ? ((c = pr(d.props.children, h.mode, E, d.key)),
                    (c.return = h),
                    (h = c))
                  : ((E = Ks(d.type, d.key, d.props, null, h.mode, E)),
                    (E.ref = ei(h, c, d)),
                    (E.return = h),
                    (h = E));
              }
              return s(h);
            case Br:
              e: {
                for (x = d.key; c !== null; ) {
                  if (c.key === x)
                    if (
                      c.tag === 4 &&
                      c.stateNode.containerInfo === d.containerInfo &&
                      c.stateNode.implementation === d.implementation
                    ) {
                      n(h, c.sibling),
                        (c = o(c, d.children || [])),
                        (c.return = h),
                        (h = c);
                      break e;
                    } else {
                      n(h, c);
                      break;
                    }
                  else t(h, c);
                  c = c.sibling;
                }
                (c = Ru(d, h.mode, E)), (c.return = h), (h = c);
              }
              return s(h);
            case Ln:
              return (x = d._init), U(h, c, x(d._payload), E);
          }
          if (ii(d)) return y(h, c, d, E);
          if (Zo(d)) return w(h, c, d, E);
          Ds(h, d);
        }
        return (typeof d == 'string' && d !== '') || typeof d == 'number'
          ? ((d = '' + d),
            c !== null && c.tag === 6
              ? (n(h, c.sibling), (c = o(c, d)), (c.return = h), (h = c))
              : (n(h, c), (c = Tu(d, h.mode, E)), (c.return = h), (h = c)),
            s(h))
          : n(h, c);
      }
      return U;
    }
    var uo = cm(!0),
      fm = cm(!1),
      $i = {},
      tn = Gn($i),
      Ci = Gn($i),
      Li = Gn($i);
    function fr(e) {
      if (e === $i) throw Error(A(174));
      return e;
    }
    function zc(e, t) {
      switch ((fe(Li, t), fe(Ci, e), fe(tn, $i), (e = t.nodeType), e)) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : Du(null, '');
          break;
        default:
          (e = e === 8 ? t.parentNode : t),
            (t = e.namespaceURI || null),
            (e = e.tagName),
            (t = Du(t, e));
      }
      pe(tn), fe(tn, t);
    }
    function co() {
      pe(tn), pe(Ci), pe(Li);
    }
    function dm(e) {
      fr(Li.current);
      var t = fr(tn.current),
        n = Du(t, e.type);
      t !== n && (fe(Ci, e), fe(tn, n));
    }
    function Bc(e) {
      Ci.current === e && (pe(tn), pe(Ci));
    }
    var we = Gn(0);
    function cl(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var n = t.memoizedState;
          if (
            n !== null &&
            ((n = n.dehydrated),
            n === null || n.data === '$?' || n.data === '$!')
          )
            return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
          if (t.flags & 128) return t;
        } else if (t.child !== null) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
      return null;
    }
    var yu = [];
    function jc() {
      for (var e = 0; e < yu.length; e++)
        yu[e]._workInProgressVersionPrimary = null;
      yu.length = 0;
    }
    var Bs = yn.ReactCurrentDispatcher,
      gu = yn.ReactCurrentBatchConfig,
      vr = 0,
      Te = null,
      Pe = null,
      Me = null,
      fl = !1,
      pi = !1,
      ki = 0,
      T_ = 0;
    function ze() {
      throw Error(A(321));
    }
    function Hc(e, t) {
      if (t === null) return !1;
      for (var n = 0; n < t.length && n < e.length; n++)
        if (!Ht(e[n], t[n])) return !1;
      return !0;
    }
    function Wc(e, t, n, r, o, i) {
      if (
        ((vr = i),
        (Te = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (Bs.current = e === null || e.memoizedState === null ? A_ : C_),
        (e = n(r, o)),
        pi)
      ) {
        i = 0;
        do {
          if (((pi = !1), (ki = 0), 25 <= i)) throw Error(A(301));
          (i += 1),
            (Me = Pe = null),
            (t.updateQueue = null),
            (Bs.current = L_),
            (e = n(r, o));
        } while (pi);
      }
      if (
        ((Bs.current = dl),
        (t = Pe !== null && Pe.next !== null),
        (vr = 0),
        (Me = Pe = Te = null),
        (fl = !1),
        t)
      )
        throw Error(A(300));
      return e;
    }
    function Gc() {
      var e = ki !== 0;
      return (ki = 0), e;
    }
    function qt() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return Me === null ? (Te.memoizedState = Me = e) : (Me = Me.next = e), Me;
    }
    function kt() {
      if (Pe === null) {
        var e = Te.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = Pe.next;
      var t = Me === null ? Te.memoizedState : Me.next;
      if (t !== null) (Me = t), (Pe = e);
      else {
        if (e === null) throw Error(A(310));
        (Pe = e),
          (e = {
            memoizedState: Pe.memoizedState,
            baseState: Pe.baseState,
            baseQueue: Pe.baseQueue,
            queue: Pe.queue,
            next: null,
          }),
          Me === null ? (Te.memoizedState = Me = e) : (Me = Me.next = e);
      }
      return Me;
    }
    function Ii(e, t) {
      return typeof t == 'function' ? t(e) : t;
    }
    function Su(e) {
      var t = kt(),
        n = t.queue;
      if (n === null) throw Error(A(311));
      n.lastRenderedReducer = e;
      var r = Pe,
        o = r.baseQueue,
        i = n.pending;
      if (i !== null) {
        if (o !== null) {
          var s = o.next;
          (o.next = i.next), (i.next = s);
        }
        (r.baseQueue = o = i), (n.pending = null);
      }
      if (o !== null) {
        (i = o.next), (r = r.baseState);
        var l = (s = null),
          a = null,
          u = i;
        do {
          var f = u.lane;
          if ((vr & f) === f)
            a !== null &&
              (a = a.next =
                {
                  lane: 0,
                  action: u.action,
                  hasEagerState: u.hasEagerState,
                  eagerState: u.eagerState,
                  next: null,
                }),
              (r = u.hasEagerState ? u.eagerState : e(r, u.action));
          else {
            var p = {
              lane: f,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            };
            a === null ? ((l = a = p), (s = r)) : (a = a.next = p),
              (Te.lanes |= f),
              (yr |= f);
          }
          u = u.next;
        } while (u !== null && u !== i);
        a === null ? (s = r) : (a.next = l),
          Ht(r, t.memoizedState) || (it = !0),
          (t.memoizedState = r),
          (t.baseState = s),
          (t.baseQueue = a),
          (n.lastRenderedState = r);
      }
      if (((e = n.interleaved), e !== null)) {
        o = e;
        do (i = o.lane), (Te.lanes |= i), (yr |= i), (o = o.next);
        while (o !== e);
      } else o === null && (n.lanes = 0);
      return [t.memoizedState, n.dispatch];
    }
    function _u(e) {
      var t = kt(),
        n = t.queue;
      if (n === null) throw Error(A(311));
      n.lastRenderedReducer = e;
      var r = n.dispatch,
        o = n.pending,
        i = t.memoizedState;
      if (o !== null) {
        n.pending = null;
        var s = (o = o.next);
        do (i = e(i, s.action)), (s = s.next);
        while (s !== o);
        Ht(i, t.memoizedState) || (it = !0),
          (t.memoizedState = i),
          t.baseQueue === null && (t.baseState = i),
          (n.lastRenderedState = i);
      }
      return [i, r];
    }
    function pm() {}
    function hm(e, t) {
      var n = Te,
        r = kt(),
        o = t(),
        i = !Ht(r.memoizedState, o);
      if (
        (i && ((r.memoizedState = o), (it = !0)),
        (r = r.queue),
        Kc(ym.bind(null, n, r, e), [e]),
        r.getSnapshot !== t || i || (Me !== null && Me.memoizedState.tag & 1))
      ) {
        if (
          ((n.flags |= 2048),
          Pi(9, vm.bind(null, n, r, o, t), void 0, null),
          Ve === null)
        )
          throw Error(A(349));
        vr & 30 || mm(n, t, o);
      }
      return o;
    }
    function mm(e, t, n) {
      (e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = Te.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (Te.updateQueue = t),
            (t.stores = [e]))
          : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
    }
    function vm(e, t, n, r) {
      (t.value = n), (t.getSnapshot = r), gm(t) && Sm(e);
    }
    function ym(e, t, n) {
      return n(function () {
        gm(t) && Sm(e);
      });
    }
    function gm(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !Ht(e, n);
      } catch {
        return !0;
      }
    }
    function Sm(e) {
      var t = mn(e, 1);
      t !== null && jt(t, e, 1, -1);
    }
    function Fp(e) {
      var t = qt();
      return (
        typeof e == 'function' && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Ii,
          lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = N_.bind(null, Te, e)),
        [t.memoizedState, e]
      );
    }
    function Pi(e, t, n, r) {
      return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = Te.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (Te.updateQueue = t),
            (t.lastEffect = e.next = e))
          : ((n = t.lastEffect),
            n === null
              ? (t.lastEffect = e.next = e)
              : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
        e
      );
    }
    function _m() {
      return kt().memoizedState;
    }
    function js(e, t, n, r) {
      var o = qt();
      (Te.flags |= e),
        (o.memoizedState = Pi(1 | t, n, void 0, r === void 0 ? null : r));
    }
    function xl(e, t, n, r) {
      var o = kt();
      r = r === void 0 ? null : r;
      var i = void 0;
      if (Pe !== null) {
        var s = Pe.memoizedState;
        if (((i = s.destroy), r !== null && Hc(r, s.deps))) {
          o.memoizedState = Pi(t, n, i, r);
          return;
        }
      }
      (Te.flags |= e), (o.memoizedState = Pi(1 | t, n, i, r));
    }
    function zp(e, t) {
      return js(8390656, 8, e, t);
    }
    function Kc(e, t) {
      return xl(2048, 8, e, t);
    }
    function Em(e, t) {
      return xl(4, 2, e, t);
    }
    function wm(e, t) {
      return xl(4, 4, e, t);
    }
    function Tm(e, t) {
      if (typeof t == 'function')
        return (
          (e = e()),
          t(e),
          function () {
            t(null);
          }
        );
      if (t != null)
        return (
          (e = e()),
          (t.current = e),
          function () {
            t.current = null;
          }
        );
    }
    function Rm(e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null), xl(4, 4, Tm.bind(null, t, e), n)
      );
    }
    function Qc() {}
    function xm(e, t) {
      var n = kt();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return r !== null && t !== null && Hc(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
    }
    function Nm(e, t) {
      var n = kt();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return r !== null && t !== null && Hc(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
    }
    function Am(e, t, n) {
      return vr & 21
        ? (Ht(n, t) ||
            ((n = kh()), (Te.lanes |= n), (yr |= n), (e.baseState = !0)),
          t)
        : (e.baseState && ((e.baseState = !1), (it = !0)),
          (e.memoizedState = n));
    }
    function R_(e, t) {
      var n = oe;
      (oe = n !== 0 && 4 > n ? n : 4), e(!0);
      var r = gu.transition;
      gu.transition = {};
      try {
        e(!1), t();
      } finally {
        (oe = n), (gu.transition = r);
      }
    }
    function Cm() {
      return kt().memoizedState;
    }
    function x_(e, t, n) {
      var r = zn(e);
      if (
        ((n = {
          lane: r,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        Lm(e))
      )
        km(t, n);
      else if (((n = sm(e, t, n, r)), n !== null)) {
        var o = Je();
        jt(n, e, r, o), Im(n, t, r);
      }
    }
    function N_(e, t, n) {
      var r = zn(e),
        o = {
          lane: r,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        };
      if (Lm(e)) km(t, o);
      else {
        var i = e.alternate;
        if (
          e.lanes === 0 &&
          (i === null || i.lanes === 0) &&
          ((i = t.lastRenderedReducer), i !== null)
        )
          try {
            var s = t.lastRenderedState,
              l = i(s, n);
            if (((o.hasEagerState = !0), (o.eagerState = l), Ht(l, s))) {
              var a = t.interleaved;
              a === null
                ? ((o.next = o), bc(t))
                : ((o.next = a.next), (a.next = o)),
                (t.interleaved = o);
              return;
            }
          } catch {
          } finally {
          }
        (n = sm(e, t, o, r)),
          n !== null && ((o = Je()), jt(n, e, r, o), Im(n, t, r));
      }
    }
    function Lm(e) {
      var t = e.alternate;
      return e === Te || (t !== null && t === Te);
    }
    function km(e, t) {
      pi = fl = !0;
      var n = e.pending;
      n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t);
    }
    function Im(e, t, n) {
      if (n & 4194240) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), xc(e, n);
      }
    }
    var dl = {
        readContext: Lt,
        useCallback: ze,
        useContext: ze,
        useEffect: ze,
        useImperativeHandle: ze,
        useInsertionEffect: ze,
        useLayoutEffect: ze,
        useMemo: ze,
        useReducer: ze,
        useRef: ze,
        useState: ze,
        useDebugValue: ze,
        useDeferredValue: ze,
        useTransition: ze,
        useMutableSource: ze,
        useSyncExternalStore: ze,
        useId: ze,
        unstable_isNewReconciler: !1,
      },
      A_ = {
        readContext: Lt,
        useCallback: function (e, t) {
          return (qt().memoizedState = [e, t === void 0 ? null : t]), e;
        },
        useContext: Lt,
        useEffect: zp,
        useImperativeHandle: function (e, t, n) {
          return (
            (n = n != null ? n.concat([e]) : null),
            js(4194308, 4, Tm.bind(null, t, e), n)
          );
        },
        useLayoutEffect: function (e, t) {
          return js(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
          return js(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = qt();
          return (
            (t = t === void 0 ? null : t),
            (e = e()),
            (n.memoizedState = [e, t]),
            e
          );
        },
        useReducer: function (e, t, n) {
          var r = qt();
          return (
            (t = n !== void 0 ? n(t) : t),
            (r.memoizedState = r.baseState = t),
            (e = {
              pending: null,
              interleaved: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: e,
              lastRenderedState: t,
            }),
            (r.queue = e),
            (e = e.dispatch = x_.bind(null, Te, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          var t = qt();
          return (
            (e = {
              current: e,
            }),
            (t.memoizedState = e)
          );
        },
        useState: Fp,
        useDebugValue: Qc,
        useDeferredValue: function (e) {
          return (qt().memoizedState = e);
        },
        useTransition: function () {
          var e = Fp(!1),
            t = e[0];
          return (e = R_.bind(null, e[1])), (qt().memoizedState = e), [t, e];
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
          var r = Te,
            o = qt();
          if (Se) {
            if (n === void 0) throw Error(A(407));
            n = n();
          } else {
            if (((n = t()), Ve === null)) throw Error(A(349));
            vr & 30 || mm(r, t, n);
          }
          o.memoizedState = n;
          var i = { value: n, getSnapshot: t };
          return (
            (o.queue = i),
            zp(ym.bind(null, r, i, e), [e]),
            (r.flags |= 2048),
            Pi(9, vm.bind(null, r, i, n, t), void 0, null),
            n
          );
        },
        useId: function () {
          var e = qt(),
            t = Ve.identifierPrefix;
          if (Se) {
            var n = fn,
              r = cn;
            (n = (r & ~(1 << (32 - Bt(r) - 1))).toString(32) + n),
              (t = ':' + t + 'R' + n),
              (n = ki++),
              0 < n && (t += 'H' + n.toString(32)),
              (t += ':');
          } else (n = T_++), (t = ':' + t + 'r' + n.toString(32) + ':');
          return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
      },
      C_ = {
        readContext: Lt,
        useCallback: xm,
        useContext: Lt,
        useEffect: Kc,
        useImperativeHandle: Rm,
        useInsertionEffect: Em,
        useLayoutEffect: wm,
        useMemo: Nm,
        useReducer: Su,
        useRef: _m,
        useState: function () {
          return Su(Ii);
        },
        useDebugValue: Qc,
        useDeferredValue: function (e) {
          var t = kt();
          return Am(t, Pe.memoizedState, e);
        },
        useTransition: function () {
          var e = Su(Ii)[0],
            t = kt().memoizedState;
          return [e, t];
        },
        useMutableSource: pm,
        useSyncExternalStore: hm,
        useId: Cm,
        unstable_isNewReconciler: !1,
      },
      L_ = {
        readContext: Lt,
        useCallback: xm,
        useContext: Lt,
        useEffect: Kc,
        useImperativeHandle: Rm,
        useInsertionEffect: Em,
        useLayoutEffect: wm,
        useMemo: Nm,
        useReducer: _u,
        useRef: _m,
        useState: function () {
          return _u(Ii);
        },
        useDebugValue: Qc,
        useDeferredValue: function (e) {
          var t = kt();
          return Pe === null
            ? (t.memoizedState = e)
            : Am(t, Pe.memoizedState, e);
        },
        useTransition: function () {
          var e = _u(Ii)[0],
            t = kt().memoizedState;
          return [e, t];
        },
        useMutableSource: pm,
        useSyncExternalStore: hm,
        useId: Cm,
        unstable_isNewReconciler: !1,
      };
    function fo(e, t) {
      try {
        var n = '',
          r = t;
        do (n += iS(r)), (r = r.return);
        while (r);
        var o = n;
      } catch (i) {
        o =
          `
Error generating stack: ` +
          i.message +
          `
` +
          i.stack;
      }
      return { value: e, source: t, stack: o, digest: null };
    }
    function Eu(e, t, n) {
      return { value: e, source: null, stack: n ?? null, digest: t ?? null };
    }
    function rc(e, t) {
      try {
        console.error(t.value);
      } catch (n) {
        setTimeout(function () {
          throw n;
        });
      }
    }
    var k_ = typeof WeakMap == 'function' ? WeakMap : Map;
    function Pm(e, t, n) {
      (n = dn(-1, n)), (n.tag = 3), (n.payload = { element: null });
      var r = t.value;
      return (
        (n.callback = function () {
          hl || ((hl = !0), (pc = r)), rc(e, t);
        }),
        n
      );
    }
    function Om(e, t, n) {
      (n = dn(-1, n)), (n.tag = 3);
      var r = e.type.getDerivedStateFromError;
      if (typeof r == 'function') {
        var o = t.value;
        (n.payload = function () {
          return r(o);
        }),
          (n.callback = function () {
            rc(e, t);
          });
      }
      var i = e.stateNode;
      return (
        i !== null &&
          typeof i.componentDidCatch == 'function' &&
          (n.callback = function () {
            rc(e, t),
              typeof r != 'function' &&
                (Fn === null ? (Fn = new Set([this])) : Fn.add(this));
            var s = t.stack;
            this.componentDidCatch(t.value, {
              componentStack: s !== null ? s : '',
            });
          }),
        n
      );
    }
    function Bp(e, t, n) {
      var r = e.pingCache;
      if (r === null) {
        r = e.pingCache = new k_();
        var o = new Set();
        r.set(t, o);
      } else (o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o));
      o.has(n) || (o.add(n), (e = H_.bind(null, e, t, n)), t.then(e, e));
    }
    function jp(e) {
      do {
        var t;
        if (
          ((t = e.tag === 13) &&
            ((t = e.memoizedState),
            (t = t !== null ? t.dehydrated !== null : !0)),
          t)
        )
          return e;
        e = e.return;
      } while (e !== null);
      return null;
    }
    function Hp(e, t, n, r, o) {
      return e.mode & 1
        ? ((e.flags |= 65536), (e.lanes = o), e)
        : (e === t
            ? (e.flags |= 65536)
            : ((e.flags |= 128),
              (n.flags |= 131072),
              (n.flags &= -52805),
              n.tag === 1 &&
                (n.alternate === null
                  ? (n.tag = 17)
                  : ((t = dn(-1, 1)), (t.tag = 2), bn(n, t, 1))),
              (n.lanes |= 1)),
          e);
    }
    var I_ = yn.ReactCurrentOwner,
      it = !1;
    function qe(e, t, n, r) {
      t.child = e === null ? fm(t, null, n, r) : uo(t, e.child, n, r);
    }
    function Wp(e, t, n, r, o) {
      n = n.render;
      var i = t.ref;
      return (
        oo(t, o),
        (r = Wc(e, t, n, r, i, o)),
        (n = Gc()),
        e !== null && !it
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~o),
            vn(e, t, o))
          : (Se && n && Oc(t), (t.flags |= 1), qe(e, t, r, o), t.child)
      );
    }
    function Gp(e, t, n, r, o) {
      if (e === null) {
        var i = n.type;
        return typeof i == 'function' &&
          !nf(i) &&
          i.defaultProps === void 0 &&
          n.compare === null &&
          n.defaultProps === void 0
          ? ((t.tag = 15), (t.type = i), Dm(e, t, i, r, o))
          : ((e = Ks(n.type, null, r, t, t.mode, o)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e));
      }
      if (((i = e.child), !(e.lanes & o))) {
        var s = i.memoizedProps;
        if (
          ((n = n.compare),
          (n = n !== null ? n : Ri),
          n(s, r) && e.ref === t.ref)
        )
          return vn(e, t, o);
      }
      return (
        (t.flags |= 1),
        (e = Bn(i, r)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
      );
    }
    function Dm(e, t, n, r, o) {
      if (e !== null) {
        var i = e.memoizedProps;
        if (Ri(i, r) && e.ref === t.ref)
          if (((it = !1), (t.pendingProps = r = i), (e.lanes & o) !== 0))
            e.flags & 131072 && (it = !0);
          else return (t.lanes = e.lanes), vn(e, t, o);
      }
      return oc(e, t, n, r, o);
    }
    function Mm(e, t, n) {
      var r = t.pendingProps,
        o = r.children,
        i = e !== null ? e.memoizedState : null;
      if (r.mode === 'hidden')
        if (!(t.mode & 1))
          (t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            fe(Jr, dt),
            (dt |= n);
        else {
          if (!(n & 1073741824))
            return (
              (e = i !== null ? i.baseLanes | n : n),
              (t.lanes = t.childLanes = 1073741824),
              (t.memoizedState = {
                baseLanes: e,
                cachePool: null,
                transitions: null,
              }),
              (t.updateQueue = null),
              fe(Jr, dt),
              (dt |= e),
              null
            );
          (t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            (r = i !== null ? i.baseLanes : n),
            fe(Jr, dt),
            (dt |= r);
        }
      else
        i !== null
          ? ((r = i.baseLanes | n), (t.memoizedState = null))
          : (r = n),
          fe(Jr, dt),
          (dt |= r);
      return qe(e, t, o, n), t.child;
    }
    function Vm(e, t) {
      var n = t.ref;
      ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
    }
    function oc(e, t, n, r, o) {
      var i = lt(n) ? hr : He.current;
      return (
        (i = lo(t, i)),
        oo(t, o),
        (n = Wc(e, t, n, r, i, o)),
        (r = Gc()),
        e !== null && !it
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~o),
            vn(e, t, o))
          : (Se && r && Oc(t), (t.flags |= 1), qe(e, t, n, o), t.child)
      );
    }
    function Kp(e, t, n, r, o) {
      if (lt(n)) {
        var i = !0;
        ol(t);
      } else i = !1;
      if ((oo(t, o), t.stateNode === null))
        Hs(e, t), um(t, n, r), nc(t, n, r, o), (r = !0);
      else if (e === null) {
        var s = t.stateNode,
          l = t.memoizedProps;
        s.props = l;
        var a = s.context,
          u = n.contextType;
        typeof u ==
          '\
object' && u !== null
          ? (u = Lt(u))
          : ((u = lt(n) ? hr : He.current), (u = lo(t, u)));
        var f = n.getDerivedStateFromProps,
          p =
            typeof f == 'function' ||
            typeof s.getSnapshotBeforeUpdate == 'function';
        p ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((l !== r || a !== u) && Up(t, s, r, u)),
          (kn = !1);
        var m = t.memoizedState;
        (s.state = m),
          ul(t, r, s, o),
          (a = t.memoizedState),
          l !== r || m !== a || st.current || kn
            ? (typeof f == 'function' &&
                (tc(t, n, f, r), (a = t.memoizedState)),
              (l = kn || $p(t, n, l, r, m, a, u))
                ? (p ||
                    (typeof s.UNSAFE_componentWillMount != 'function' &&
                      typeof s.componentWillMount != 'function') ||
                    (typeof s.componentWillMount == 'function' &&
                      s.componentWillMount(),
                    typeof s.UNSAFE_componentWillMount == 'function' &&
                      s.UNSAFE_componentWillMount()),
                  typeof s.componentDidMount == 'function' &&
                    (t.flags |= 4194308))
                : (typeof s.componentDidMount == 'function' &&
                    (t.flags |= 4194308),
                  (t.memoizedProps = r),
                  (t.memoizedState = a)),
              (s.props = r),
              (s.state = a),
              (s.context = u),
              (r = l))
            : (typeof s.componentDidMount == 'function' && (t.flags |= 4194308),
              (r = !1));
      } else {
        (s = t.stateNode),
          lm(e, t),
          (l = t.memoizedProps),
          (u = t.type === t.elementType ? l : bt(t.type, l)),
          (s.props = u),
          (p = t.pendingProps),
          (m = s.context),
          (a = n.contextType),
          typeof a == 'object' && a !== null
            ? (a = Lt(a))
            : ((a = lt(n) ? hr : He.current), (a = lo(t, a)));
        var S = n.getDerivedStateFromProps;
        (f =
          typeof S == 'function' ||
          typeof s.getSnapshotBeforeUpdate == 'function') ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((l !== p || m !== a) && Up(t, s, r, a)),
          (kn = !1),
          (m = t.memoizedState),
          (s.state = m),
          ul(t, r, s, o);
        var y = t.memoizedState;
        l !== p || m !== y || st.current || kn
          ? (typeof S == 'function' && (tc(t, n, S, r), (y = t.memoizedState)),
            (u = kn || $p(t, n, u, r, m, y, a) || !1)
              ? (f ||
                  (typeof s.UNSAFE_componentWillUpdate != 'function' &&
                    typeof s.componentWillUpdate != 'function') ||
                  (typeof s.componentWillUpdate == 'function' &&
                    s.componentWillUpdate(r, y, a),
                  typeof s.UNSAFE_componentWillUpdate == 'function' &&
                    s.UNSAFE_componentWillUpdate(r, y, a)),
                typeof s.componentDidUpdate == 'function' && (t.flags |= 4),
                typeof s.getSnapshotBeforeUpdate == 'function' &&
                  (t.flags |= 1024))
              : (typeof s.componentDidUpdate != 'function' ||
                  (l === e.memoizedProps && m === e.memoizedState) ||
                  (t.flags |= 4),
                typeof s.getSnapshotBeforeUpdate != 'function' ||
                  (l === e.memoizedProps && m === e.memoizedState) ||
                  (t.flags |= 1024),
                (t.memoizedProps = r),
                (t.memoizedState = y)),
            (s.props = r),
            (s.state = y),
            (s.context = a),
            (r = u))
          : (typeof s.componentDidUpdate != 'function' ||
              (l === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != 'function' ||
              (l === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 1024),
            (r = !1));
      }
      return ic(e, t, n, r, i, o);
    }
    function ic(e, t, n, r, o, i) {
      Vm(e, t);
      var s = (t.flags & 128) !== 0;
      if (!r && !s) return o && Pp(t, n, !1), vn(e, t, i);
      (r = t.stateNode), (I_.current = t);
      var l =
        s && typeof n.getDerivedStateFromError != 'function'
          ? null
          : r.render();
      return (
        (t.flags |= 1),
        e !== null && s
          ? ((t.child = uo(t, e.child, null, i)), (t.child = uo(t, null, l, i)))
          : qe(e, t, l, i),
        (t.memoizedState = r.state),
        o && Pp(t, n, !0),
        t.child
      );
    }
    function $m(e) {
      var t = e.stateNode;
      t.pendingContext
        ? Ip(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && Ip(e, t.context, !1),
        zc(e, t.containerInfo);
    }
    function Qp(e, t, n, r, o) {
      return ao(), Mc(o), (t.flags |= 256), qe(e, t, n, r), t.child;
    }
    var sc = { dehydrated: null, treeContext: null, retryLane: 0 };
    function lc(e) {
      return { baseLanes: e, cachePool: null, transitions: null };
    }
    function Um(e, t, n) {
      var r = t.pendingProps,
        o = we.current,
        i = !1,
        s = (t.flags & 128) !== 0,
        l;
      if (
        ((l = s) ||
          (l = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
        l
          ? ((i = !0), (t.flags &= -129))
          : (e === null || e.memoizedState !== null) && (o |= 1),
        fe(we, o & 1),
        e === null)
      )
        return (
          Ju(t),
          (e = t.memoizedState),
          e !== null && ((e = e.dehydrated), e !== null)
            ? (t.mode & 1
                ? e.data === '$!'
                  ? (t.lanes = 8)
                  : (t.lanes = 1073741824)
                : (t.lanes = 1),
              null)
            : ((s = r.children),
              (e = r.fallback),
              i
                ? ((r = t.mode),
                  (i = t.child),
                  (s = { mode: 'hidden', children: s }),
                  !(r & 1) && i !== null
                    ? ((i.childLanes = 0), (i.pendingProps = s))
                    : (i = Cl(s, r, 0, null)),
                  (e = pr(e, r, n, null)),
                  (i.return = t),
                  (e.return = t),
                  (i.sibling = e),
                  (t.child = i),
                  (t.child.memoizedState = lc(n)),
                  (t.memoizedState = sc),
                  e)
                : Yc(t, s))
        );
      if (
        ((o = e.memoizedState), o !== null && ((l = o.dehydrated), l !== null))
      )
        return P_(e, t, s, r, l, o, n);
      if (i) {
        (i = r.fallback), (s = t.mode), (o = e.child), (l = o.sibling);
        var a = { mode: 'hidden', children: r.children };
        return (
          !(s & 1) && t.child !== o
            ? ((r = t.child),
              (r.childLanes = 0),
              (r.pendingProps = a),
              (t.deletions = null))
            : ((r = Bn(o, a)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
          l !== null
            ? (i = Bn(l, i))
            : ((i = pr(i, s, n, null)), (i.flags |= 2)),
          (i.return = t),
          (r.return = t),
          (r.sibling = i),
          (t.child = r),
          (r = i),
          (i = t.child),
          (s = e.child.memoizedState),
          (s =
            s === null
              ? lc(n)
              : {
                  baseLanes: s.baseLanes | n,
                  cachePool: null,
                  transitions: s.transitions,
                }),
          (i.memoizedState = s),
          (i.childLanes = e.childLanes & ~n),
          (t.memoizedState = sc),
          r
        );
      }
      return (
        (i = e.child),
        (e = i.sibling),
        (r = Bn(i, { mode: 'visible', children: r.children })),
        !(t.mode & 1) && (r.lanes = n),
        (r.return = t),
        (r.sibling = null),
        e !== null &&
          ((n = t.deletions),
          n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
        (t.child = r),
        (t.memoizedState = null),
        r
      );
    }
    function Yc(e, t) {
      return (
        (t = Cl({ mode: 'visible', children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
      );
    }
    function Ms(e, t, n, r) {
      return (
        r !== null && Mc(r),
        uo(t, e.child, null, n),
        (e = Yc(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
      );
    }
    function P_(e, t, n, r, o, i, s) {
      if (n)
        return t.flags & 256
          ? ((t.flags &= -257), (r = Eu(Error(A(422)))), Ms(e, t, s, r))
          : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((i = r.fallback),
            (o = t.mode),
            (r = Cl({ mode: 'visible', children: r.children }, o, 0, null)),
            (i = pr(i, o, s, null)),
            (i.flags |= 2),
            (r.return = t),
            (i.return = t),
            (r.sibling = i),
            (t.child = r),
            t.mode & 1 && uo(t, e.child, null, s),
            (t.child.memoizedState = lc(s)),
            (t.memoizedState = sc),
            i);
      if (!(t.mode & 1)) return Ms(e, t, s, null);
      if (o.data === '$!') {
        if (((r = o.nextSibling && o.nextSibling.dataset), r)) var l = r.dgst;
        return (
          (r = l), (i = Error(A(419))), (r = Eu(i, r, void 0)), Ms(e, t, s, r)
        );
      }
      if (((l = (s & e.childLanes) !== 0), it || l)) {
        if (((r = Ve), r !== null)) {
          switch (s & -s) {
            case 4:
              o = 2;
              break;
            case 16:
              o = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              o = 32;
              break;
            case 536870912:
              o = 268435456;
              break;
            default:
              o = 0;
          }
          (o = o & (r.suspendedLanes | s) ? 0 : o),
            o !== 0 &&
              o !== i.retryLane &&
              ((i.retryLane = o), mn(e, o), jt(r, e, o, -1));
        }
        return tf(), (r = Eu(Error(A(421)))), Ms(e, t, s, r);
      }
      return o.data === '$?'
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = W_.bind(null, e)),
          (o._reactRetry = t),
          null)
        : ((e = i.treeContext),
          (pt = Un(o.nextSibling)),
          (ht = t),
          (Se = !0),
          (zt = null),
          e !== null &&
            ((xt[Nt++] = cn),
            (xt[Nt++] = fn),
            (xt[Nt++] = mr),
            (cn = e.id),
            (fn = e.overflow),
            (mr = t)),
          (t = Yc(t, r.children)),
          (t.flags |= 4096),
          t);
    }
    function Yp(e, t, n) {
      e.lanes |= t;
      var r = e.alternate;
      r !== null && (r.lanes |= t), ec(e.return, t, n);
    }
    function wu(e, t, n, r, o) {
      var i = e.memoizedState;
      i === null
        ? (e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: n,
            tailMode: o,
          })
        : ((i.isBackwards = t),
          (i.rendering = null),
          (i.renderingStartTime = 0),
          (i.last = r),
          (i.tail = n),
          (i.tailMode = o));
    }
    function bm(e, t, n) {
      var r = t.pendingProps,
        o = r.revealOrder,
        i = r.tail;
      if ((qe(e, t, r.children, n), (r = we.current), r & 2))
        (r = (r & 1) | 2), (t.flags |= 128);
      else {
        if (e !== null && e.flags & 128)
          e: for (e = t.child; e !== null; ) {
            if (e.tag === 13) e.memoizedState !== null && Yp(e, n, t);
            else if (e.tag === 19) Yp(e, n, t);
            else if (e.child !== null) {
              (e.child.return = e), (e = e.child);
              continue;
            }
            if (e === t) break e;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break e;
              e = e.return;
            }
            (e.sibling.return = e.return), (e = e.sibling);
          }
        r &= 1;
      }
      if ((fe(we, r), !(t.mode & 1))) t.memoizedState = null;
      else
        switch (o) {
          case 'forwards':
            for (n = t.child, o = null; n !== null; )
              (e = n.alternate),
                e !== null && cl(e) === null && (o = n),
                (n = n.sibling);
            (n = o),
              n === null
                ? ((o = t.child), (t.child = null))
                : ((o = n.sibling), (n.sibling = null)),
              wu(t, !1, o, n, i);
            break;
          case 'backwards':
            for (n = null, o = t.child, t.child = null; o !== null; ) {
              if (((e = o.alternate), e !== null && cl(e) === null)) {
                t.child = o;
                break;
              }
              (e = o.sibling), (o.sibling = n), (n = o), (o = e);
            }
            wu(t, !0, n, null, i);
            break;
          case 'together':
            wu(t, !1, null, null, void 0);
            break;
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function Hs(e, t) {
      !(t.mode & 1) &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
    }
    function vn(e, t, n) {
      if (
        (e !== null && (t.dependencies = e.dependencies),
        (yr |= t.lanes),
        !(n & t.childLanes))
      )
        return null;
      if (e !== null && t.child !== e.child) throw Error(A(153));
      if (t.child !== null) {
        for (
          e = t.child, n = Bn(e, e.pendingProps), t.child = n, n.return = t;
          e.sibling !== null;

        )
          (e = e.sibling),
            (n = n.sibling = Bn(e, e.pendingProps)),
            (n.return = t);
        n.sibling = null;
      }
      return t.child;
    }
    function O_(e, t, n) {
      switch (t.tag) {
        case 3:
          $m(t), ao();
          break;
        case 5:
          dm(t);
          break;
        case 1:
          lt(t.type) && ol(t);
          break;
        case 4:
          zc(t, t.stateNode.containerInfo);
          break;
        case 10:
          var r = t.type._context,
            o = t.memoizedProps.value;
          fe(ll, r._currentValue), (r._currentValue = o);
          break;
        case 13:
          if (((r = t.memoizedState), r !== null))
            return r.dehydrated !== null
              ? (fe(we, we.current & 1), (t.flags |= 128), null)
              : n & t.child.childLanes
              ? Um(e, t, n)
              : (fe(we, we.current & 1),
                (e = vn(e, t, n)),
                e !== null ? e.sibling : null);
          fe(we, we.current & 1);
          break;
        case 19:
          if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
            if (r) return bm(e, t, n);
            t.flags |= 128;
          }
          if (
            ((o = t.memoizedState),
            o !== null &&
              ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
            fe(we, we.current),
            r)
          )
            break;
          return null;
        case 22:
        case 23:
          return (t.lanes = 0), Mm(e, t, n);
      }
      return vn(e, t, n);
    }
    var Fm, ac, zm, Bm;
    Fm = function (e, t) {
      for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
          (n.child.return = n), (n = n.child);
          continue;
        }
        if (n === t) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === t) return;
          n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
      }
    };
    ac = function () {};
    zm = function (e, t, n, r) {
      var o = e.memoizedProps;
      if (o !== r) {
        (e = t.stateNode), fr(tn.current);
        var i = null;
        switch (n) {
          case 'input':
            (o = ku(e, o)), (r = ku(e, r)), (i = []);
            break;
          case 'select':
            (o = Re({}, o, { value: void 0 })),
              (r = Re({}, r, { value: void 0 })),
              (i = []);
            break;
          case 'textarea':
            (o = Ou(e, o)), (r = Ou(e, r)), (i = []);
            break;
          default:
            typeof o.onClick != 'function' &&
              typeof r.onClick == 'function' &&
              (e.onclick = nl);
        }
        Mu(n, r);
        var s;
        n = null;
        for (u in o)
          if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
            if (u === 'style') {
              var l = o[u];
              for (s in l) l.hasOwnProperty(s) && (n || (n = {}), (n[s] = ''));
            } else
              u !== 'dangerouslySetInnerHTML' &&
                u !== 'children' &&
                u !== 'suppressContentEditableWarning' &&
                u !== 'suppressHydrationWarning' &&
                u !== 'autoFocus' &&
                (yi.hasOwnProperty(u)
                  ? i || (i = [])
                  : (i = i || []).push(u, null));
        for (u in r) {
          var a = r[u];
          if (
            ((l = o?.[u]),
            r.hasOwnProperty(u) && a !== l && (a != null || l != null))
          )
            if (u === 'style')
              if (l) {
                for (s in l)
                  !l.hasOwnProperty(s) ||
                    (a && a.hasOwnProperty(s)) ||
                    (n || (n = {}), (n[s] = ''));
                for (s in a)
                  a.hasOwnProperty(s) &&
                    l[s] !== a[s] &&
                    (n || (n = {}), (n[s] = a[s]));
              } else n || (i || (i = []), i.push(u, n)), (n = a);
            else
              u === 'dangerouslySetInnerHTML'
                ? ((a = a ? a.__html : void 0),
                  (l = l ? l.__html : void 0),
                  a != null && l !== a && (i = i || []).push(u, a))
                : u === 'children'
                ? (typeof a != 'string' && typeof a != 'number') ||
                  (i = i || []).push(u, '' + a)
                : u !== 'suppressContentEditableWarning' &&
                  u !== 'suppressHydrationWarning' &&
                  (yi.hasOwnProperty(u)
                    ? (a != null &&
                        u ===
                          'o\
nScroll' &&
                        de('scroll', e),
                      i || l === a || (i = []))
                    : (i = i || []).push(u, a));
        }
        n && (i = i || []).push('style', n);
        var u = i;
        (t.updateQueue = u) && (t.flags |= 4);
      }
    };
    Bm = function (e, t, n, r) {
      n !== r && (t.flags |= 4);
    };
    function ti(e, t) {
      if (!Se)
        switch (e.tailMode) {
          case 'hidden':
            t = e.tail;
            for (var n = null; t !== null; )
              t.alternate !== null && (n = t), (t = t.sibling);
            n === null ? (e.tail = null) : (n.sibling = null);
            break;
          case 'collapsed':
            n = e.tail;
            for (var r = null; n !== null; )
              n.alternate !== null && (r = n), (n = n.sibling);
            r === null
              ? t || e.tail === null
                ? (e.tail = null)
                : (e.tail.sibling = null)
              : (r.sibling = null);
        }
    }
    function Be(e) {
      var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
      if (t)
        for (var o = e.child; o !== null; )
          (n |= o.lanes | o.childLanes),
            (r |= o.subtreeFlags & 14680064),
            (r |= o.flags & 14680064),
            (o.return = e),
            (o = o.sibling);
      else
        for (o = e.child; o !== null; )
          (n |= o.lanes | o.childLanes),
            (r |= o.subtreeFlags),
            (r |= o.flags),
            (o.return = e),
            (o = o.sibling);
      return (e.subtreeFlags |= r), (e.childLanes = n), t;
    }
    function D_(e, t, n) {
      var r = t.pendingProps;
      switch ((Dc(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return Be(t), null;
        case 1:
          return lt(t.type) && rl(), Be(t), null;
        case 3:
          return (
            (r = t.stateNode),
            co(),
            pe(st),
            pe(He),
            jc(),
            r.pendingContext &&
              ((r.context = r.pendingContext), (r.pendingContext = null)),
            (e === null || e.child === null) &&
              (Os(t)
                ? (t.flags |= 4)
                : e === null ||
                  (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                  ((t.flags |= 1024), zt !== null && (vc(zt), (zt = null)))),
            ac(e, t),
            Be(t),
            null
          );
        case 5:
          Bc(t);
          var o = fr(Li.current);
          if (((n = t.type), e !== null && t.stateNode != null))
            zm(e, t, n, r, o),
              e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
          else {
            if (!r) {
              if (t.stateNode === null) throw Error(A(166));
              return Be(t), null;
            }
            if (((e = fr(tn.current)), Os(t))) {
              (r = t.stateNode), (n = t.type);
              var i = t.memoizedProps;
              switch (((r[Jt] = t), (r[Ai] = i), (e = (t.mode & 1) !== 0), n)) {
                case 'dialog':
                  de('cancel', r), de('close', r);
                  break;
                case 'iframe':
                case 'object':
                case 'embed':
                  de('load', r);
                  break;
                case 'video':
                case 'audio':
                  for (o = 0; o < li.length; o++) de(li[o], r);
                  break;
                case 'source':
                  de('error', r);
                  break;
                case 'img':
                case 'image':
                case 'link':
                  de('error', r), de('load', r);
                  break;
                case 'details':
                  de('toggle', r);
                  break;
                case 'input':
                  rp(r, i), de('invalid', r);
                  break;
                case '\
select':
                  (r._wrapperState = { wasMultiple: !!i.multiple }),
                    de('invalid', r);
                  break;
                case 'textarea':
                  ip(r, i), de('invalid', r);
              }
              Mu(n, i), (o = null);
              for (var s in i)
                if (i.hasOwnProperty(s)) {
                  var l = i[s];
                  s === 'children'
                    ? typeof l == 'string'
                      ? r.textContent !== l &&
                        (i.suppressHydrationWarning !== !0 &&
                          Ps(r.textContent, l, e),
                        (o = ['children', l]))
                      : typeof l == 'number' &&
                        r.textContent !== '' + l &&
                        (i.suppressHydrationWarning !== !0 &&
                          Ps(r.textContent, l, e),
                        (o = ['children', '' + l]))
                    : yi.hasOwnProperty(s) &&
                      l != null &&
                      s === 'onScroll' &&
                      de('scroll', r);
                }
              switch (n) {
                case '\
input':
                  _s(r), op(r, i, !0);
                  break;
                case 'textarea':
                  _s(r), sp(r);
                  break;
                case 'select':
                case 'option':
                  break;
                default:
                  typeof i.onClick == 'function' && (r.onclick = nl);
              }
              (r = o), (t.updateQueue = r), r !== null && (t.flags |= 4);
            } else {
              (s = o.nodeType === 9 ? o : o.ownerDocument),
                e === 'http://www.w3.org/1999/xhtml' && (e = mh(n)),
                e === 'http://www.w3.org/1999/xhtml'
                  ? n === 'script'
                    ? ((e = s.createElement('div')),
                      (e.innerHTML = '<script></script>'),
                      (e = e.removeChild(e.firstChild)))
                    : typeof r.is == 'string'
                    ? (e = s.createElement(n, { is: r.is }))
                    : ((e = s.createElement(n)),
                      n ===
                        'selec\
t' && ((s = e), r.multiple ? (s.multiple = !0) : r.size && (s.size = r.size)))
                  : (e = s.createElementNS(e, n)),
                (e[Jt] = t),
                (e[Ai] = r),
                Fm(e, t, !1, !1),
                (t.stateNode = e);
              e: {
                switch (((s = Vu(n, r)), n)) {
                  case 'dialog':
                    de('cancel', e), de('close', e), (o = r);
                    break;
                  case 'iframe':
                  case 'object':
                  case 'embed':
                    de('load', e), (o = r);
                    break;
                  case 'video':
                  case 'audio':
                    for (o = 0; o < li.length; o++) de(li[o], e);
                    o = r;
                    break;
                  case 'source':
                    de('error', e), (o = r);
                    break;
                  case 'img':
                  case 'image':
                  case 'link':
                    de('error', e), de('load', e), (o = r);
                    break;
                  case 'details':
                    de('toggle', e), (o = r);
                    break;
                  case 'input':
                    rp(e, r), (o = ku(e, r)), de('invalid', e);
                    break;
                  case 'option':
                    o = r;
                    break;
                  case 'select':
                    (e._wrapperState = { wasMultiple: !!r.multiple }),
                      (o = Re({}, r, { value: void 0 })),
                      de('invalid', e);
                    break;
                  case 'textarea':
                    ip(e, r), (o = Ou(e, r)), de('invalid', e);
                    break;
                  default:
                    o = r;
                }
                Mu(n, o), (l = o);
                for (i in l)
                  if (l.hasOwnProperty(i)) {
                    var a = l[i];
                    i === 'style'
                      ? gh(e, a)
                      : i === 'dangerouslySetInnerHTML'
                      ? ((a = a ? a.__html : void 0), a != null && vh(e, a))
                      : i === 'children'
                      ? typeof a == 'string'
                        ? (n !== 'textarea' || a !== '') && gi(e, a)
                        : typeof a == 'number' && gi(e, '' + a)
                      : i !==
                          'suppressContentEditable\
Warning' &&
                        i !== 'suppressHydrationWarning' &&
                        i !== 'autoFocus' &&
                        (yi.hasOwnProperty(i)
                          ? a != null && i === 'onScroll' && de('scroll', e)
                          : a != null && Sc(e, i, a, s));
                  }
                switch (n) {
                  case 'input':
                    _s(e), op(e, r, !1);
                    break;
                  case 'textarea':
                    _s(e), sp(e);
                    break;
                  case 'option':
                    r.value != null &&
                      e.setAttribute('value', '' + jn(r.value));
                    break;
                  case 'select':
                    (e.multiple = !!r.multiple),
                      (i = r.value),
                      i != null
                        ? eo(e, !!r.multiple, i, !1)
                        : r.defaultValue != null &&
                          eo(e, !!r.multiple, r.defaultValue, !0);
                    break;
                  default:
                    typeof o.onClick == 'function' && (e.onclick = nl);
                }
                switch (n) {
                  case '\
button':
                  case 'input':
                  case 'select':
                  case 'textarea':
                    r = !!r.autoFocus;
                    break e;
                  case 'img':
                    r = !0;
                    break e;
                  default:
                    r = !1;
                }
              }
              r && (t.flags |= 4);
            }
            t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
          }
          return Be(t), null;
        case 6:
          if (e && t.stateNode != null) Bm(e, t, e.memoizedProps, r);
          else {
            if (typeof r != 'string' && t.stateNode === null)
              throw Error(A(166));
            if (((n = fr(Li.current)), fr(tn.current), Os(t))) {
              if (
                ((r = t.stateNode),
                (n = t.memoizedProps),
                (r[Jt] = t),
                (i = r.nodeValue !== n) && ((e = ht), e !== null))
              )
                switch (e.tag) {
                  case 3:
                    Ps(r.nodeValue, n, (e.mode & 1) !== 0);
                    break;
                  case 5:
                    e.memoizedProps.suppressHydrationWarning !== !0 &&
                      Ps(r.nodeValue, n, (e.mode & 1) !== 0);
                }
              i && (t.flags |= 4);
            } else
              (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
                (r[Jt] = t),
                (t.stateNode = r);
          }
          return Be(t), null;
        case 13:
          if (
            (pe(we),
            (r = t.memoizedState),
            e === null ||
              (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
          ) {
            if (Se && pt !== null && t.mode & 1 && !(t.flags & 128))
              im(), ao(), (t.flags |= 98560), (i = !1);
            else if (((i = Os(t)), r !== null && r.dehydrated !== null)) {
              if (e === null) {
                if (!i) throw Error(A(318));
                if (
                  ((i = t.memoizedState),
                  (i = i !== null ? i.dehydrated : null),
                  !i)
                )
                  throw Error(A(317));
                i[Jt] = t;
              } else
                ao(),
                  !(t.flags & 128) && (t.memoizedState = null),
                  (t.flags |= 4);
              Be(t), (i = !1);
            } else zt !== null && (vc(zt), (zt = null)), (i = !0);
            if (!i) return t.flags & 65536 ? t : null;
          }
          return t.flags & 128
            ? ((t.lanes = n), t)
            : ((r = r !== null),
              r !== (e !== null && e.memoizedState !== null) &&
                r &&
                ((t.child.flags |= 8192),
                t.mode & 1 &&
                  (e === null || we.current & 1 ? Oe === 0 && (Oe = 3) : tf())),
              t.updateQueue !== null && (t.flags |= 4),
              Be(t),
              null);
        case 4:
          return (
            co(),
            ac(e, t),
            e === null && xi(t.stateNode.containerInfo),
            Be(t),
            null
          );
        case 10:
          return Uc(t.type._context), Be(t), null;
        case 17:
          return lt(t.type) && rl(), Be(t), null;
        case 19:
          if ((pe(we), (i = t.memoizedState), i === null)) return Be(t), null;
          if (((r = (t.flags & 128) !== 0), (s = i.rendering), s === null))
            if (r) ti(i, !1);
            else {
              if (Oe !== 0 || (e !== null && e.flags & 128))
                for (e = t.child; e !== null; ) {
                  if (((s = cl(e)), s !== null)) {
                    for (
                      t.flags |= 128,
                        ti(i, !1),
                        r = s.updateQueue,
                        r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                        t.subtreeFlags = 0,
                        r = n,
                        n = t.child;
                      n !== null;

                    )
                      (i = n),
                        (e = r),
                        (i.flags &= 14680066),
                        (s = i.alternate),
                        s === null
                          ? ((i.childLanes = 0),
                            (i.lanes = e),
                            (i.child = null),
                            (i.subtreeFlags = 0),
                            (i.memoizedProps = null),
                            (i.memoizedState = null),
                            (i.updateQueue = null),
                            (i.dependencies = null),
                            (i.stateNode = null))
                          : ((i.childLanes = s.childLanes),
                            (i.lanes = s.lanes),
                            (i.child = s.child),
                            (i.subtreeFlags = 0),
                            (i.deletions = null),
                            (i.memoizedProps = s.memoizedProps),
                            (i.memoizedState = s.memoizedState),
                            (i.updateQueue = s.updateQueue),
                            (i.type = s.type),
                            (e = s.dependencies),
                            (i.dependencies =
                              e === null
                                ? null
                                : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext,
                                  })),
                        (n = n.sibling);
                    return fe(we, (we.current & 1) | 2), t.child;
                  }
                  e = e.sibling;
                }
              i.tail !== null &&
                Ae() > po &&
                ((t.flags |= 128), (r = !0), ti(i, !1), (t.lanes = 4194304));
            }
          else {
            if (!r)
              if (((e = cl(s)), e !== null)) {
                if (
                  ((t.flags |= 128),
                  (r = !0),
                  (n = e.updateQueue),
                  n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                  ti(i, !0),
                  i.tail === null &&
                    i.tailMode === 'hidden' &&
                    !s.alternate &&
                    !Se)
                )
                  return Be(t), null;
              } else
                2 * Ae() - i.renderingStartTime > po &&
                  n !== 1073741824 &&
                  ((t.flags |= 128), (r = !0), ti(i, !1), (t.lanes = 4194304));
            i.isBackwards
              ? ((s.sibling = t.child), (t.child = s))
              : ((n = i.last),
                n !== null ? (n.sibling = s) : (t.child = s),
                (i.last = s));
          }
          return i.tail !== null
            ? ((t = i.tail),
              (i.rendering = t),
              (i.tail = t.sibling),
              (i.renderingStartTime = Ae()),
              (t.sibling = null),
              (n = we.current),
              fe(we, r ? (n & 1) | 2 : n & 1),
              t)
            : (Be(t), null);
        case 22:
        case 23:
          return (
            ef(),
            (r = t.memoizedState !== null),
            e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
            r && t.mode & 1
              ? dt & 1073741824 &&
                (Be(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : Be(t),
            null
          );
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(A(156, t.tag));
    }
    function M_(e, t) {
      switch ((Dc(t), t.tag)) {
        case 1:
          return (
            lt(t.type) && rl(),
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 3:
          return (
            co(),
            pe(st),
            pe(He),
            jc(),
            (e = t.flags),
            e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 5:
          return Bc(t), null;
        case 13:
          if (
            (pe(we), (e = t.memoizedState), e !== null && e.dehydrated !== null)
          ) {
            if (t.alternate === null) throw Error(A(340));
            ao();
          }
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 19:
          return pe(we), null;
        case 4:
          return co(), null;
        case 10:
          return Uc(t.type._context), null;
        case 22:
        case 23:
          return ef(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var Vs = !1,
      je = !1,
      V_ = typeof WeakSet == 'function' ? WeakSet : Set,
      D = null;
    function qr(e, t) {
      var n = e.ref;
      if (n !== null)
        if (typeof n == 'function')
          try {
            n(null);
          } catch (r) {
            xe(e, t, r);
          }
        else n.current = null;
    }
    function uc(e, t, n) {
      try {
        n();
      } catch (r) {
        xe(e, t, r);
      }
    }
    var Zp = !1;
    function $_(e, t) {
      if (((Gu = Js), (e = Gh()), Pc(e))) {
        if ('selectionStart' in e)
          var n = { start: e.selectionStart, end: e.selectionEnd };
        else
          e: {
            n = ((n = e.ownerDocument) && n.defaultView) || window;
            var r = n.getSelection && n.getSelection();
            if (r && r.rangeCount !== 0) {
              n = r.anchorNode;
              var o = r.anchorOffset,
                i = r.focusNode;
              r = r.focusOffset;
              try {
                n.nodeType, i.nodeType;
              } catch {
                n = null;
                break e;
              }
              var s = 0,
                l = -1,
                a = -1,
                u = 0,
                f = 0,
                p = e,
                m = null;
              t: for (;;) {
                for (
                  var S;
                  p !== n || (o !== 0 && p.nodeType !== 3) || (l = s + o),
                    p !== i || (r !== 0 && p.nodeType !== 3) || (a = s + r),
                    p.nodeType === 3 && (s += p.nodeValue.length),
                    (S = p.firstChild) !== null;

                )
                  (m = p), (p = S);
                for (;;) {
                  if (p === e) break t;
                  if (
                    (m === n && ++u === o && (l = s),
                    m === i && ++f === r && (a = s),
                    (S = p.nextSibling) !== null)
                  )
                    break;
                  (p = m), (m = p.parentNode);
                }
                p = S;
              }
              n = l === -1 || a === -1 ? null : { start: l, end: a };
            } else n = null;
          }
        n = n || { start: 0, end: 0 };
      } else n = null;
      for (
        Ku = { focusedElem: e, selectionRange: n }, Js = !1, D = t;
        D !== null;

      )
        if (
          ((t = D), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
        )
          (e.return = t), (D = e);
        else
          for (; D !== null; ) {
            t = D;
            try {
              var y = t.alternate;
              if (t.flags & 1024)
                switch (t.tag) {
                  case 0:
                  case 11:
                  case 15:
                    break;
                  case 1:
                    if (y !== null) {
                      var w = y.memoizedProps,
                        U = y.memoizedState,
                        h = t.stateNode,
                        c = h.getSnapshotBeforeUpdate(
                          t.elementType === t.type ? w : bt(t.type, w),
                          U,
                        );
                      h.__reactInternalSnapshotBeforeUpdate = c;
                    }
                    break;
                  case 3:
                    var d = t.stateNode.containerInfo;
                    d.nodeType === 1
                      ? (d.textContent = '')
                      : d.nodeType === 9 &&
                        d.documentElement &&
                        d.removeChild(d.documentElement);
                    break;
                  case 5:
                  case 6:
                  case 4:
                  case 17:
                    break;
                  default:
                    throw Error(A(163));
                }
            } catch (E) {
              xe(t, t.return, E);
            }
            if (((e = t.sibling), e !== null)) {
              (e.return = t.return), (D = e);
              break;
            }
            D = t.return;
          }
      return (y = Zp), (Zp = !1), y;
    }
    function hi(e, t, n) {
      var r = t.updateQueue;
      if (((r = r !== null ? r.lastEffect : null), r !== null)) {
        var o = (r = r.next);
        do {
          if ((o.tag & e) === e) {
            var i = o.destroy;
            (o.destroy = void 0), i !== void 0 && uc(t, n, i);
          }
          o = o.next;
        } while (o !== r);
      }
    }
    function Nl(e, t) {
      if (
        ((t = t.updateQueue),
        (t = t !== null ? t.lastEffect : null),
        t !== null)
      ) {
        var n = (t = t.next);
        do {
          if ((n.tag & e) === e) {
            var r = n.create;
            n.destroy = r();
          }
          n = n.next;
        } while (n !== t);
      }
    }
    function cc(e) {
      var t = e.ref;
      if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
          case 5:
            e = n;
            break;
          default:
            e = n;
        }
        typeof t == 'function' ? t(e) : (t.current = e);
      }
    }
    function jm(e) {
      var t = e.alternate;
      t !== null && ((e.alternate = null), jm(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
          ((t = e.stateNode),
          t !== null &&
            (delete t[Jt],
            delete t[Ai],
            delete t[Zu],
            delete t[S_],
            delete t[__])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null);
    }
    function Hm(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function Xp(e) {
      e: for (;;) {
        for (; e.sibling === null; ) {
          if (e.return === null || Hm(e.return)) return null;
          e = e.return;
        }
        for (
          e.sibling.return = e.return, e = e.sibling;
          e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

        ) {
          if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
          (e.child.return = e), (e = e.child);
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function fc(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6)
        (e = e.stateNode),
          t
            ? n.nodeType === 8
              ? n.parentNode.insertBefore(e, t)
              : n.insertBefore(e, t)
            : (n.nodeType === 8
                ? ((t = n.parentNode), t.insertBefore(e, n))
                : ((t = n), t.appendChild(e)),
              (n = n._reactRootContainer),
              n != null || t.onclick !== null || (t.onclick = nl));
      else if (r !== 4 && ((e = e.child), e !== null))
        for (fc(e, t, n), e = e.sibling; e !== null; )
          fc(e, t, n), (e = e.sibling);
    }
    function dc(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6)
        (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
      else if (r !== 4 && ((e = e.child), e !== null))
        for (dc(e, t, n), e = e.sibling; e !== null; )
          dc(e, t, n), (e = e.sibling);
    }
    var $e = null,
      Ft = !1;
    function Cn(e, t, n) {
      for (n = n.child; n !== null; ) Wm(e, t, n), (n = n.sibling);
    }
    function Wm(e, t, n) {
      if (
        en &&
        typeof en.onCommitFiberUnmount ==
          'fun\
ction'
      )
        try {
          en.onCommitFiberUnmount(gl, n);
        } catch {}
      switch (n.tag) {
        case 5:
          je || qr(n, t);
        case 6:
          var r = $e,
            o = Ft;
          ($e = null),
            Cn(e, t, n),
            ($e = r),
            (Ft = o),
            $e !== null &&
              (Ft
                ? ((e = $e),
                  (n = n.stateNode),
                  e.nodeType === 8
                    ? e.parentNode.removeChild(n)
                    : e.removeChild(n))
                : $e.removeChild(n.stateNode));
          break;
        case 18:
          $e !== null &&
            (Ft
              ? ((e = $e),
                (n = n.stateNode),
                e.nodeType === 8
                  ? mu(e.parentNode, n)
                  : e.nodeType === 1 && mu(e, n),
                wi(e))
              : mu($e, n.stateNode));
          break;
        case 4:
          (r = $e),
            (o = Ft),
            ($e = n.stateNode.containerInfo),
            (Ft = !0),
            Cn(e, t, n),
            ($e = r),
            (Ft = o);
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (
            !je &&
            ((r = n.updateQueue),
            r !== null && ((r = r.lastEffect), r !== null))
          ) {
            o = r = r.next;
            do {
              var i = o,
                s = i.destroy;
              (i = i.tag),
                s !== void 0 && (i & 2 || i & 4) && uc(n, t, s),
                (o = o.next);
            } while (o !== r);
          }
          Cn(e, t, n);
          break;
        case 1:
          if (
            !je &&
            (qr(n, t),
            (r = n.stateNode),
            typeof r.componentWillUnmount == 'function')
          )
            try {
              (r.props = n.memoizedProps),
                (r.state = n.memoizedState),
                r.componentWillUnmount();
            } catch (l) {
              xe(n, t, l);
            }
          Cn(e, t, n);
          break;
        case 21:
          Cn(e, t, n);
          break;
        case 22:
          n.mode & 1
            ? ((je = (r = je) || n.memoizedState !== null),
              Cn(e, t, n),
              (je = r))
            : Cn(e, t, n);
          break;
        default:
          Cn(e, t, n);
      }
    }
    function qp(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new V_()),
          t.forEach(function (r) {
            var o = G_.bind(null, e, r);
            n.has(r) || (n.add(r), r.then(o, o));
          });
      }
    }
    function Ut(e, t) {
      var n = t.deletions;
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var o = n[r];
          try {
            var i = e,
              s = t,
              l = s;
            e: for (; l !== null; ) {
              switch (l.tag) {
                case 5:
                  ($e = l.stateNode), (Ft = !1);
                  break e;
                case 3:
                  ($e = l.stateNode.containerInfo), (Ft = !0);
                  break e;
                case 4:
                  ($e = l.stateNode.containerInfo), (Ft = !0);
                  break e;
              }
              l = l.return;
            }
            if ($e === null) throw Error(A(160));
            Wm(i, s, o), ($e = null), (Ft = !1);
            var a = o.alternate;
            a !== null && (a.return = null), (o.return = null);
          } catch (u) {
            xe(o, t, u);
          }
        }
      if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; ) Gm(t, e), (t = t.sibling);
    }
    function Gm(e, t) {
      var n = e.alternate,
        r = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if ((Ut(t, e), Xt(e), r & 4)) {
            try {
              hi(3, e, e.return), Nl(3, e);
            } catch (w) {
              xe(e, e.return, w);
            }
            try {
              hi(5, e, e.return);
            } catch (w) {
              xe(e, e.return, w);
            }
          }
          break;
        case 1:
          Ut(t, e), Xt(e), r & 512 && n !== null && qr(n, n.return);
          break;
        case 5:
          if (
            (Ut(t, e),
            Xt(e),
            r & 512 && n !== null && qr(n, n.return),
            e.flags & 32)
          ) {
            var o = e.stateNode;
            try {
              gi(o, '');
            } catch (w) {
              xe(e, e.return, w);
            }
          }
          if (r & 4 && ((o = e.stateNode), o != null)) {
            var i = e.memoizedProps,
              s = n !== null ? n.memoizedProps : i,
              l = e.type,
              a = e.updateQueue;
            if (((e.updateQueue = null), a !== null))
              try {
                l === 'input' &&
                  i.type === 'radio' &&
                  i.name != null &&
                  ph(o, i),
                  Vu(l, s);
                var u = Vu(l, i);
                for (s = 0; s < a.length; s += 2) {
                  var f = a[s],
                    p = a[s + 1];
                  f === 'style'
                    ? gh(o, p)
                    : f === 'dangerouslySetInnerHTML'
                    ? vh(o, p)
                    : f === 'children'
                    ? gi(o, p)
                    : Sc(o, f, p, u);
                }
                switch (l) {
                  case 'input':
                    Iu(o, i);
                    break;
                  case 'textarea':
                    hh(o, i);
                    break;
                  case 'sel\
ect':
                    var m = o._wrapperState.wasMultiple;
                    o._wrapperState.wasMultiple = !!i.multiple;
                    var S = i.value;
                    S != null
                      ? eo(o, !!i.multiple, S, !1)
                      : m !== !!i.multiple &&
                        (i.defaultValue != null
                          ? eo(o, !!i.multiple, i.defaultValue, !0)
                          : eo(o, !!i.multiple, i.multiple ? [] : '', !1));
                }
                o[Ai] = i;
              } catch (w) {
                xe(e, e.return, w);
              }
          }
          break;
        case 6:
          if ((Ut(t, e), Xt(e), r & 4)) {
            if (e.stateNode === null) throw Error(A(162));
            (o = e.stateNode), (i = e.memoizedProps);
            try {
              o.nodeValue = i;
            } catch (w) {
              xe(e, e.return, w);
            }
          }
          break;
        case 3:
          if (
            (Ut(t, e),
            Xt(e),
            r & 4 && n !== null && n.memoizedState.isDehydrated)
          )
            try {
              wi(t.containerInfo);
            } catch (w) {
              xe(e, e.return, w);
            }
          break;
        case 4:
          Ut(t, e), Xt(e);
          break;
        case 13:
          Ut(t, e),
            Xt(e),
            (o = e.child),
            o.flags & 8192 &&
              ((i = o.memoizedState !== null),
              (o.stateNode.isHidden = i),
              !i ||
                (o.alternate !== null && o.alternate.memoizedState !== null) ||
                (qc = Ae())),
            r & 4 && qp(e);
          break;
        case 22:
          if (
            ((f = n !== null && n.memoizedState !== null),
            e.mode & 1 ? ((je = (u = je) || f), Ut(t, e), (je = u)) : Ut(t, e),
            Xt(e),
            r & 8192)
          ) {
            if (
              ((u = e.memoizedState !== null),
              (e.stateNode.isHidden = u) && !f && e.mode & 1)
            )
              for (D = e, f = e.child; f !== null; ) {
                for (p = D = f; D !== null; ) {
                  switch (((m = D), (S = m.child), m.tag)) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      hi(4, m, m.return);
                      break;
                    case 1:
                      qr(m, m.return);
                      var y = m.stateNode;
                      if (typeof y.componentWillUnmount == 'function') {
                        (r = m), (n = m.return);
                        try {
                          (t = r),
                            (y.props = t.memoizedProps),
                            (y.state = t.memoizedState),
                            y.componentWillUnmount();
                        } catch (w) {
                          xe(r, n, w);
                        }
                      }
                      break;
                    case 5:
                      qr(m, m.return);
                      break;
                    case 22:
                      if (m.memoizedState !== null) {
                        eh(p);
                        continue;
                      }
                  }
                  S !== null ? ((S.return = m), (D = S)) : eh(p);
                }
                f = f.sibling;
              }
            e: for (f = null, p = e; ; ) {
              if (p.tag === 5) {
                if (f === null) {
                  f = p;
                  try {
                    (o = p.stateNode),
                      u
                        ? ((i = o.style),
                          typeof i.setProperty == 'function'
                            ? i.setProperty('display', 'none', 'important')
                            : (i.display = 'none'))
                        : ((l = p.stateNode),
                          (a = p.memoizedProps.style),
                          (s =
                            a != null && a.hasOwnProperty('display')
                              ? a.display
                              : null),
                          (l.style.display = yh('display', s)));
                  } catch (w) {
                    xe(e, e.return, w);
                  }
                }
              } else if (p.tag === 6) {
                if (f === null)
                  try {
                    p.stateNode.nodeValue = u ? '' : p.memoizedProps;
                  } catch (w) {
                    xe(e, e.return, w);
                  }
              } else if (
                ((p.tag !== 22 && p.tag !== 23) ||
                  p.memoizedState === null ||
                  p === e) &&
                p.child !== null
              ) {
                (p.child.return = p), (p = p.child);
                continue;
              }
              if (p === e) break e;
              for (; p.sibling === null; ) {
                if (p.return === null || p.return === e) break e;
                f === p && (f = null), (p = p.return);
              }
              f === p && (f = null),
                (p.sibling.return = p.return),
                (p = p.sibling);
            }
          }
          break;
        case 19:
          Ut(t, e), Xt(e), r & 4 && qp(e);
          break;
        case 21:
          break;
        default:
          Ut(t, e), Xt(e);
      }
    }
    function Xt(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          e: {
            for (var n = e.return; n !== null; ) {
              if (Hm(n)) {
                var r = n;
                break e;
              }
              n = n.return;
            }
            throw Error(A(160));
          }
          switch (r.tag) {
            case 5:
              var o = r.stateNode;
              r.flags & 32 && (gi(o, ''), (r.flags &= -33));
              var i = Xp(e);
              dc(e, i, o);
              break;
            case 3:
            case 4:
              var s = r.stateNode.containerInfo,
                l = Xp(e);
              fc(e, l, s);
              break;
            default:
              throw Error(A(161));
          }
        } catch (a) {
          xe(e, e.return, a);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function U_(e, t, n) {
      (D = e), Km(e, t, n);
    }
    function Km(e, t, n) {
      for (var r = (e.mode & 1) !== 0; D !== null; ) {
        var o = D,
          i = o.child;
        if (o.tag === 22 && r) {
          var s = o.memoizedState !== null || Vs;
          if (!s) {
            var l = o.alternate,
              a = (l !== null && l.memoizedState !== null) || je;
            l = Vs;
            var u = je;
            if (((Vs = s), (je = a) && !u))
              for (D = o; D !== null; )
                (s = D),
                  (a = s.child),
                  s.tag === 22 && s.memoizedState !== null
                    ? th(o)
                    : a !== null
                    ? ((a.return = s), (D = a))
                    : th(o);
            for (; i !== null; ) (D = i), Km(i, t, n), (i = i.sibling);
            (D = o), (Vs = l), (je = u);
          }
          Jp(e, t, n);
        } else
          o.subtreeFlags & 8772 && i !== null
            ? ((i.return = o), (D = i))
            : Jp(e, t, n);
      }
    }
    function Jp(e) {
      for (; D !== null; ) {
        var t = D;
        if (t.flags & 8772) {
          var n = t.alternate;
          try {
            if (t.flags & 8772)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  je || Nl(5, t);
                  break;
                case 1:
                  var r = t.stateNode;
                  if (t.flags & 4 && !je)
                    if (n === null) r.componentDidMount();
                    else {
                      var o =
                        t.elementType === t.type
                          ? n.memoizedProps
                          : bt(t.type, n.memoizedProps);
                      r.componentDidUpdate(
                        o,
                        n.memoizedState,
                        r.__reactInternalSnapshotBeforeUpdate,
                      );
                    }
                  var i = t.updateQueue;
                  i !== null && Vp(t, i, r);
                  break;
                case 3:
                  var s = t.updateQueue;
                  if (s !== null) {
                    if (((n = null), t.child !== null))
                      switch (t.child.tag) {
                        case 5:
                          n = t.child.stateNode;
                          break;
                        case 1:
                          n = t.child.stateNode;
                      }
                    Vp(t, s, n);
                  }
                  break;
                case 5:
                  var l = t.stateNode;
                  if (n === null && t.flags & 4) {
                    n = l;
                    var a = t.memoizedProps;
                    switch (t.type) {
                      case 'button':
                      case 'input':
                      case 'select':
                      case 'textarea':
                        a.autoFocus && n.focus();
                        break;
                      case 'img':
                        a.src && (n.src = a.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (t.memoizedState === null) {
                    var u = t.alternate;
                    if (u !== null) {
                      var f = u.memoizedState;
                      if (f !== null) {
                        var p = f.dehydrated;
                        p !== null && wi(p);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(A(163));
              }
            je || (t.flags & 512 && cc(t));
          } catch (m) {
            xe(t, t.return, m);
          }
        }
        if (t === e) {
          D = null;
          break;
        }
        if (((n = t.sibling), n !== null)) {
          (n.return = t.return), (D = n);
          break;
        }
        D = t.return;
      }
    }
    function eh(e) {
      for (; D !== null; ) {
        var t = D;
        if (t === e) {
          D = null;
          break;
        }
        var n = t.sibling;
        if (n !== null) {
          (n.return = t.return), (D = n);
          break;
        }
        D = t.return;
      }
    }
    function th(e) {
      for (; D !== null; ) {
        var t = D;
        try {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              var n = t.return;
              try {
                Nl(4, t);
              } catch (a) {
                xe(t, n, a);
              }
              break;
            case 1:
              var r = t.stateNode;
              if (typeof r.componentDidMount == 'function') {
                var o = t.return;
                try {
                  r.componentDidMount();
                } catch (a) {
                  xe(t, o, a);
                }
              }
              var i = t.return;
              try {
                cc(t);
              } catch (a) {
                xe(t, i, a);
              }
              break;
            case 5:
              var s = t.return;
              try {
                cc(t);
              } catch (a) {
                xe(t, s, a);
              }
          }
        } catch (a) {
          xe(t, t.return, a);
        }
        if (t === e) {
          D = null;
          break;
        }
        var l = t.sibling;
        if (l !== null) {
          (l.return = t.return), (D = l);
          break;
        }
        D = t.return;
      }
    }
    var b_ = Math.ceil,
      pl = yn.ReactCurrentDispatcher,
      Zc = yn.ReactCurrentOwner,
      Ct = yn.ReactCurrentBatchConfig,
      te = 0,
      Ve = null,
      Le = null,
      Ue = 0,
      dt = 0,
      Jr = Gn(0),
      Oe = 0,
      Oi = null,
      yr = 0,
      Al = 0,
      Xc = 0,
      mi = null,
      ot = null,
      qc = 0,
      po = 1 / 0,
      an = null,
      hl = !1,
      pc = null,
      Fn = null,
      $s = !1,
      Dn = null,
      ml = 0,
      vi = 0,
      hc = null,
      Ws = -1,
      Gs = 0;
    function Je() {
      return te & 6 ? Ae() : Ws !== -1 ? Ws : (Ws = Ae());
    }
    function zn(e) {
      return e.mode & 1
        ? te & 2 && Ue !== 0
          ? Ue & -Ue
          : w_.transition !== null
          ? (Gs === 0 && (Gs = kh()), Gs)
          : ((e = oe),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : $h(e.type))),
            e)
        : 1;
    }
    function jt(e, t, n, r) {
      if (50 < vi) throw ((vi = 0), (hc = null), Error(A(185)));
      Di(e, n, r),
        (!(te & 2) || e !== Ve) &&
          (e === Ve && (!(te & 2) && (Al |= n), Oe === 4 && Pn(e, Ue)),
          at(e, r),
          n === 1 &&
            te === 0 &&
            !(t.mode & 1) &&
            ((po = Ae() + 500), Tl && Kn()));
    }
    function at(e, t) {
      var n = e.callbackNode;
      RS(e, t);
      var r = qs(e, e === Ve ? Ue : 0);
      if (r === 0)
        n !== null && up(n), (e.callbackNode = null), (e.callbackPriority = 0);
      else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && up(n), t === 1))
          e.tag === 0 ? E_(nh.bind(null, e)) : nm(nh.bind(null, e)),
            y_(function () {
              !(te & 6) && Kn();
            }),
            (n = null);
        else {
          switch (Ih(r)) {
            case 1:
              n = Rc;
              break;
            case 4:
              n = Ch;
              break;
            case 16:
              n = Xs;
              break;
            case 536870912:
              n = Lh;
              break;
            default:
              n = Xs;
          }
          n = tv(n, Qm.bind(null, e));
        }
        (e.callbackPriority = t), (e.callbackNode = n);
      }
    }
    function Qm(e, t) {
      if (((Ws = -1), (Gs = 0), te & 6)) throw Error(A(327));
      var n = e.callbackNode;
      if (io() && e.callbackNode !== n) return null;
      var r = qs(e, e === Ve ? Ue : 0);
      if (r === 0) return null;
      if (r & 30 || r & e.expiredLanes || t) t = vl(e, r);
      else {
        t = r;
        var o = te;
        te |= 2;
        var i = Zm();
        (Ve !== e || Ue !== t) && ((an = null), (po = Ae() + 500), dr(e, t));
        do
          try {
            B_();
            break;
          } catch (l) {
            Ym(e, l);
          }
        while (1);
        $c(),
          (pl.current = i),
          (te = o),
          Le !== null ? (t = 0) : ((Ve = null), (Ue = 0), (t = Oe));
      }
      if (t !== 0) {
        if (
          (t === 2 && ((o = zu(e)), o !== 0 && ((r = o), (t = mc(e, o)))),
          t === 1)
        )
          throw ((n = Oi), dr(e, 0), Pn(e, r), at(e, Ae()), n);
        if (t === 6) Pn(e, r);
        else {
          if (
            ((o = e.current.alternate),
            !(r & 30) &&
              !F_(o) &&
              ((t = vl(e, r)),
              t === 2 && ((i = zu(e)), i !== 0 && ((r = i), (t = mc(e, i)))),
              t === 1))
          )
            throw ((n = Oi), dr(e, 0), Pn(e, r), at(e, Ae()), n);
          switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
            case 0:
            case 1:
              throw Error(A(345));
            case 2:
              ar(e, ot, an);
              break;
            case 3:
              if (
                (Pn(e, r),
                (r & 130023424) === r && ((t = qc + 500 - Ae()), 10 < t))
              ) {
                if (qs(e, 0) !== 0) break;
                if (((o = e.suspendedLanes), (o & r) !== r)) {
                  Je(), (e.pingedLanes |= e.suspendedLanes & o);
                  break;
                }
                e.timeoutHandle = Yu(ar.bind(null, e, ot, an), t);
                break;
              }
              ar(e, ot, an);
              break;
            case 4:
              if ((Pn(e, r), (r & 4194240) === r)) break;
              for (t = e.eventTimes, o = -1; 0 < r; ) {
                var s = 31 - Bt(r);
                (i = 1 << s), (s = t[s]), s > o && (o = s), (r &= ~i);
              }
              if (
                ((r = o),
                (r = Ae() - r),
                (r =
                  (120 > r
                    ? 120
                    : 480 > r
                    ? 480
                    : 1080 > r
                    ? 1080
                    : 1920 > r
                    ? 1920
                    : 3e3 > r
                    ? 3e3
                    : 4320 > r
                    ? 4320
                    : 1960 * b_(r / 1960)) - r),
                10 < r)
              ) {
                e.timeoutHandle = Yu(ar.bind(null, e, ot, an), r);
                break;
              }
              ar(e, ot, an);
              break;
            case 5:
              ar(e, ot, an);
              break;
            default:
              throw Error(A(329));
          }
        }
      }
      return at(e, Ae()), e.callbackNode === n ? Qm.bind(null, e) : null;
    }
    function mc(e, t) {
      var n = mi;
      return (
        e.current.memoizedState.isDehydrated && (dr(e, t).flags |= 256),
        (e = vl(e, t)),
        e !== 2 && ((t = ot), (ot = n), t !== null && vc(t)),
        e
      );
    }
    function vc(e) {
      ot === null ? (ot = e) : ot.push.apply(ot, e);
    }
    function F_(e) {
      for (var t = e; ; ) {
        if (t.flags & 16384) {
          var n = t.updateQueue;
          if (n !== null && ((n = n.stores), n !== null))
            for (var r = 0; r < n.length; r++) {
              var o = n[r],
                i = o.getSnapshot;
              o = o.value;
              try {
                if (!Ht(i(), o)) return !1;
              } catch {
                return !1;
              }
            }
        }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
          (n.return = t), (t = n);
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return !0;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
      }
      return !0;
    }
    function Pn(e, t) {
      for (
        t &= ~Xc,
          t &= ~Al,
          e.suspendedLanes |= t,
          e.pingedLanes &= ~t,
          e = e.expirationTimes;
        0 < t;

      ) {
        var n = 31 - Bt(t),
          r = 1 << n;
        (e[n] = -1), (t &= ~r);
      }
    }
    function nh(e) {
      if (te & 6) throw Error(A(327));
      io();
      var t = qs(e, 0);
      if (!(t & 1)) return at(e, Ae()), null;
      var n = vl(e, t);
      if (e.tag !== 0 && n === 2) {
        var r = zu(e);
        r !== 0 && ((t = r), (n = mc(e, r)));
      }
      if (n === 1) throw ((n = Oi), dr(e, 0), Pn(e, t), at(e, Ae()), n);
      if (n === 6) throw Error(A(345));
      return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        ar(e, ot, an),
        at(e, Ae()),
        null
      );
    }
    function Jc(e, t) {
      var n = te;
      te |= 1;
      try {
        return e(t);
      } finally {
        (te = n), te === 0 && ((po = Ae() + 500), Tl && Kn());
      }
    }
    function gr(e) {
      Dn !== null && Dn.tag === 0 && !(te & 6) && io();
      var t = te;
      te |= 1;
      var n = Ct.transition,
        r = oe;
      try {
        if (((Ct.transition = null), (oe = 1), e)) return e();
      } finally {
        (oe = r), (Ct.transition = n), (te = t), !(te & 6) && Kn();
      }
    }
    function ef() {
      (dt = Jr.current), pe(Jr);
    }
    function dr(e, t) {
      (e.finishedWork = null), (e.finishedLanes = 0);
      var n = e.timeoutHandle;
      if ((n !== -1 && ((e.timeoutHandle = -1), v_(n)), Le !== null))
        for (n = Le.return; n !== null; ) {
          var r = n;
          switch ((Dc(r), r.tag)) {
            case 1:
              (r = r.type.childContextTypes), r != null && rl();
              break;
            case 3:
              co(), pe(st), pe(He), jc();
              break;
            case 5:
              Bc(r);
              break;
            case 4:
              co();
              break;
            case 13:
              pe(we);
              break;
            case 19:
              pe(we);
              break;
            case 10:
              Uc(r.type._context);
              break;
            case 22:
            case 23:
              ef();
          }
          n = n.return;
        }
      if (
        ((Ve = e),
        (Le = e = Bn(e.current, null)),
        (Ue = dt = t),
        (Oe = 0),
        (Oi = null),
        (Xc = Al = yr = 0),
        (ot = mi = null),
        cr !== null)
      ) {
        for (t = 0; t < cr.length; t++)
          if (((n = cr[t]), (r = n.interleaved), r !== null)) {
            n.interleaved = null;
            var o = r.next,
              i = n.pending;
            if (i !== null) {
              var s = i.next;
              (i.next = o), (r.next = s);
            }
            n.pending = r;
          }
        cr = null;
      }
      return e;
    }
    function Ym(e, t) {
      do {
        var n = Le;
        try {
          if (($c(), (Bs.current = dl), fl)) {
            for (var r = Te.memoizedState; r !== null; ) {
              var o = r.queue;
              o !== null && (o.pending = null), (r = r.next);
            }
            fl = !1;
          }
          if (
            ((vr = 0),
            (Me = Pe = Te = null),
            (pi = !1),
            (ki = 0),
            (Zc.current = null),
            n === null || n.return === null)
          ) {
            (Oe = 1), (Oi = t), (Le = null);
            break;
          }
          e: {
            var i = e,
              s = n.return,
              l = n,
              a = t;
            if (
              ((t = Ue),
              (l.flags |= 32768),
              a !== null && typeof a == 'object' && typeof a.then == 'function')
            ) {
              var u = a,
                f = l,
                p = f.tag;
              if (!(f.mode & 1) && (p === 0 || p === 11 || p === 15)) {
                var m = f.alternate;
                m
                  ? ((f.updateQueue = m.updateQueue),
                    (f.memoizedState = m.memoizedState),
                    (f.lanes = m.lanes))
                  : ((f.updateQueue = null), (f.memoizedState = null));
              }
              var S = jp(s);
              if (S !== null) {
                (S.flags &= -257),
                  Hp(S, s, l, i, t),
                  S.mode & 1 && Bp(i, u, t),
                  (t = S),
                  (a = u);
                var y = t.updateQueue;
                if (y === null) {
                  var w = new Set();
                  w.add(a), (t.updateQueue = w);
                } else y.add(a);
                break e;
              } else {
                if (!(t & 1)) {
                  Bp(i, u, t), tf();
                  break e;
                }
                a = Error(A(426));
              }
            } else if (Se && l.mode & 1) {
              var U = jp(s);
              if (U !== null) {
                !(U.flags & 65536) && (U.flags |= 256),
                  Hp(U, s, l, i, t),
                  Mc(fo(a, l));
                break e;
              }
            }
            (i = a = fo(a, l)),
              Oe !== 4 && (Oe = 2),
              mi === null ? (mi = [i]) : mi.push(i),
              (i = s);
            do {
              switch (i.tag) {
                case 3:
                  (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                  var h = Pm(i, a, t);
                  Mp(i, h);
                  break e;
                case 1:
                  l = a;
                  var c = i.type,
                    d = i.stateNode;
                  if (
                    !(i.flags & 128) &&
                    (typeof c.getDerivedStateFromError == 'function' ||
                      (d !== null &&
                        typeof d.componentDidCatch == 'function' &&
                        (Fn === null || !Fn.has(d))))
                  ) {
                    (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                    var E = Om(i, l, t);
                    Mp(i, E);
                    break e;
                  }
              }
              i = i.return;
            } while (i !== null);
          }
          qm(n);
        } catch (R) {
          (t = R), Le === n && n !== null && (Le = n = n.return);
          continue;
        }
        break;
      } while (1);
    }
    function Zm() {
      var e = pl.current;
      return (pl.current = dl), e === null ? dl : e;
    }
    function tf() {
      (Oe === 0 || Oe === 3 || Oe === 2) && (Oe = 4),
        Ve === null || (!(yr & 268435455) && !(Al & 268435455)) || Pn(Ve, Ue);
    }
    function vl(e, t) {
      var n = te;
      te |= 2;
      var r = Zm();
      (Ve !== e || Ue !== t) && ((an = null), dr(e, t));
      do
        try {
          z_();
          break;
        } catch (o) {
          Ym(e, o);
        }
      while (1);
      if (($c(), (te = n), (pl.current = r), Le !== null)) throw Error(A(261));
      return (Ve = null), (Ue = 0), Oe;
    }
    function z_() {
      for (; Le !== null; ) Xm(Le);
    }
    function B_() {
      for (; Le !== null && !mS(); ) Xm(Le);
    }
    function Xm(e) {
      var t = ev(e.alternate, e, dt);
      (e.memoizedProps = e.pendingProps),
        t === null ? qm(e) : (Le = t),
        (Zc.current = null);
    }
    function qm(e) {
      var t = e;
      do {
        var n = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
          if (((n = M_(n, t)), n !== null)) {
            (n.flags &= 32767), (Le = n);
            return;
          }
          if (e !== null)
            (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
          else {
            (Oe = 6), (Le = null);
            return;
          }
        } else if (((n = D_(n, t, dt)), n !== null)) {
          Le = n;
          return;
        }
        if (((t = t.sibling), t !== null)) {
          Le = t;
          return;
        }
        Le = t = e;
      } while (t !== null);
      Oe === 0 && (Oe = 5);
    }
    function ar(e, t, n) {
      var r = oe,
        o = Ct.transition;
      try {
        (Ct.transition = null), (oe = 1), j_(e, t, n, r);
      } finally {
        (Ct.transition = o), (oe = r);
      }
      return null;
    }
    function j_(e, t, n, r) {
      do io();
      while (Dn !== null);
      if (te & 6) throw Error(A(327));
      n = e.finishedWork;
      var o = e.finishedLanes;
      if (n === null) return null;
      if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
        throw Error(A(177));
      (e.callbackNode = null), (e.callbackPriority = 0);
      var i = n.lanes | n.childLanes;
      if (
        (xS(e, i),
        e === Ve && ((Le = Ve = null), (Ue = 0)),
        (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
          $s ||
          (($s = !0),
          tv(Xs, function () {
            return io(), null;
          })),
        (i = (n.flags & 15990) !== 0),
        n.subtreeFlags & 15990 || i)
      ) {
        (i = Ct.transition), (Ct.transition = null);
        var s = oe;
        oe = 1;
        var l = te;
        (te |= 4),
          (Zc.current = null),
          $_(e, n),
          Gm(n, e),
          f_(Ku),
          (Js = !!Gu),
          (Ku = Gu = null),
          (e.current = n),
          U_(n, e, o),
          vS(),
          (te = l),
          (oe = s),
          (Ct.transition = i);
      } else e.current = n;
      if (
        ($s && (($s = !1), (Dn = e), (ml = o)),
        (i = e.pendingLanes),
        i === 0 && (Fn = null),
        SS(n.stateNode, r),
        at(e, Ae()),
        t !== null)
      )
        for (r = e.onRecoverableError, n = 0; n < t.length; n++)
          (o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest });
      if (hl) throw ((hl = !1), (e = pc), (pc = null), e);
      return (
        ml & 1 && e.tag !== 0 && io(),
        (i = e.pendingLanes),
        i & 1 ? (e === hc ? vi++ : ((vi = 0), (hc = e))) : (vi = 0),
        Kn(),
        null
      );
    }
    function io() {
      if (Dn !== null) {
        var e = Ih(ml),
          t = Ct.transition,
          n = oe;
        try {
          if (((Ct.transition = null), (oe = 16 > e ? 16 : e), Dn === null))
            var r = !1;
          else {
            if (((e = Dn), (Dn = null), (ml = 0), te & 6)) throw Error(A(331));
            var o = te;
            for (te |= 4, D = e.current; D !== null; ) {
              var i = D,
                s = i.child;
              if (D.flags & 16) {
                var l = i.deletions;
                if (l !== null) {
                  for (var a = 0; a < l.length; a++) {
                    var u = l[a];
                    for (D = u; D !== null; ) {
                      var f = D;
                      switch (f.tag) {
                        case 0:
                        case 11:
                        case 15:
                          hi(8, f, i);
                      }
                      var p = f.child;
                      if (p !== null) (p.return = f), (D = p);
                      else
                        for (; D !== null; ) {
                          f = D;
                          var m = f.sibling,
                            S = f.return;
                          if ((jm(f), f === u)) {
                            D = null;
                            break;
                          }
                          if (m !== null) {
                            (m.return = S), (D = m);
                            break;
                          }
                          D = S;
                        }
                    }
                  }
                  var y = i.alternate;
                  if (y !== null) {
                    var w = y.child;
                    if (w !== null) {
                      y.child = null;
                      do {
                        var U = w.sibling;
                        (w.sibling = null), (w = U);
                      } while (w !== null);
                    }
                  }
                  D = i;
                }
              }
              if (i.subtreeFlags & 2064 && s !== null) (s.return = i), (D = s);
              else
                e: for (; D !== null; ) {
                  if (((i = D), i.flags & 2048))
                    switch (i.tag) {
                      case 0:
                      case 11:
                      case 15:
                        hi(9, i, i.return);
                    }
                  var h = i.sibling;
                  if (h !== null) {
                    (h.return = i.return), (D = h);
                    break e;
                  }
                  D = i.return;
                }
            }
            var c = e.current;
            for (D = c; D !== null; ) {
              s = D;
              var d = s.child;
              if (s.subtreeFlags & 2064 && d !== null) (d.return = s), (D = d);
              else
                e: for (s = c; D !== null; ) {
                  if (((l = D), l.flags & 2048))
                    try {
                      switch (l.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Nl(9, l);
                      }
                    } catch (R) {
                      xe(l, l.return, R);
                    }
                  if (l === s) {
                    D = null;
                    break e;
                  }
                  var E = l.sibling;
                  if (E !== null) {
                    (E.return = l.return), (D = E);
                    break e;
                  }
                  D = l.return;
                }
            }
            if (
              ((te = o),
              Kn(),
              en && typeof en.onPostCommitFiberRoot == 'function')
            )
              try {
                en.onPostCommitFiberRoot(gl, e);
              } catch {}
            r = !0;
          }
          return r;
        } finally {
          (oe = n), (Ct.transition = t);
        }
      }
      return !1;
    }
    function rh(e, t, n) {
      (t = fo(n, t)),
        (t = Pm(e, t, 1)),
        (e = bn(e, t, 1)),
        (t = Je()),
        e !== null && (Di(e, 1, t), at(e, t));
    }
    function xe(e, t, n) {
      if (e.tag === 3) rh(e, e, n);
      else
        for (; t !== null; ) {
          if (t.tag === 3) {
            rh(t, e, n);
            break;
          } else if (t.tag === 1) {
            var r = t.stateNode;
            if (
              typeof t.type.getDerivedStateFromError == 'function' ||
              (typeof r.componentDidCatch == 'function' &&
                (Fn === null || !Fn.has(r)))
            ) {
              (e = fo(n, e)),
                (e = Om(t, e, 1)),
                (t = bn(t, e, 1)),
                (e = Je()),
                t !== null && (Di(t, 1, e), at(t, e));
              break;
            }
          }
          t = t.return;
        }
    }
    function H_(e, t, n) {
      var r = e.pingCache;
      r !== null && r.delete(t),
        (t = Je()),
        (e.pingedLanes |= e.suspendedLanes & n),
        Ve === e &&
          (Ue & n) === n &&
          (Oe === 4 || (Oe === 3 && (Ue & 130023424) === Ue && 500 > Ae() - qc)
            ? dr(e, 0)
            : (Xc |= n)),
        at(e, t);
    }
    function Jm(e, t) {
      t === 0 &&
        (e.mode & 1
          ? ((t = Ts), (Ts <<= 1), !(Ts & 130023424) && (Ts = 4194304))
          : (t = 1));
      var n = Je();
      (e = mn(e, t)), e !== null && (Di(e, t, n), at(e, n));
    }
    function W_(e) {
      var t = e.memoizedState,
        n = 0;
      t !== null && (n = t.retryLane), Jm(e, n);
    }
    function G_(e, t) {
      var n = 0;
      switch (e.tag) {
        case 13:
          var r = e.stateNode,
            o = e.memoizedState;
          o !== null && (n = o.retryLane);
          break;
        case 19:
          r = e.stateNode;
          break;
        default:
          throw Error(A(314));
      }
      r !== null && r.delete(t), Jm(e, n);
    }
    var ev;
    ev = function (e, t, n) {
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps || st.current) it = !0;
        else {
          if (!(e.lanes & n) && !(t.flags & 128)) return (it = !1), O_(e, t, n);
          it = !!(e.flags & 131072);
        }
      else (it = !1), Se && t.flags & 1048576 && rm(t, sl, t.index);
      switch (((t.lanes = 0), t.tag)) {
        case 2:
          var r = t.type;
          Hs(e, t), (e = t.pendingProps);
          var o = lo(t, He.current);
          oo(t, n), (o = Wc(null, t, r, e, o, n));
          var i = Gc();
          return (
            (t.flags |= 1),
            typeof o == 'object' &&
            o !== null &&
            typeof o.render == 'function' &&
            o.$$typeof === void 0
              ? ((t.tag = 1),
                (t.memoizedState = null),
                (t.updateQueue = null),
                lt(r) ? ((i = !0), ol(t)) : (i = !1),
                (t.memoizedState =
                  o.state !== null && o.state !== void 0 ? o.state : null),
                Fc(t),
                (o.updater = Rl),
                (t.stateNode = o),
                (o._reactInternals = t),
                nc(t, r, e, n),
                (t = ic(null, t, r, !0, i, n)))
              : ((t.tag = 0),
                Se && i && Oc(t),
                qe(null, t, o, n),
                (t = t.child)),
            t
          );
        case 16:
          r = t.elementType;
          e: {
            switch (
              (Hs(e, t),
              (e = t.pendingProps),
              (o = r._init),
              (r = o(r._payload)),
              (t.type = r),
              (o = t.tag = Q_(r)),
              (e = bt(r, e)),
              o)
            ) {
              case 0:
                t = oc(null, t, r, e, n);
                break e;
              case 1:
                t = Kp(null, t, r, e, n);
                break e;
              case 11:
                t = Wp(null, t, r, e, n);
                break e;
              case 14:
                t = Gp(null, t, r, bt(r.type, e), n);
                break e;
            }
            throw Error(A(306, r, ''));
          }
          return t;
        case 0:
          return (
            (r = t.type),
            (o = t.pendingProps),
            (o = t.elementType === r ? o : bt(r, o)),
            oc(e, t, r, o, n)
          );
        case 1:
          return (
            (r = t.type),
            (o = t.pendingProps),
            (o = t.elementType === r ? o : bt(r, o)),
            Kp(e, t, r, o, n)
          );
        case 3:
          e: {
            if (($m(t), e === null)) throw Error(A(387));
            (r = t.pendingProps),
              (i = t.memoizedState),
              (o = i.element),
              lm(e, t),
              ul(t, r, null, n);
            var s = t.memoizedState;
            if (((r = s.element), i.isDehydrated))
              if (
                ((i = {
                  element: r,
                  isDehydrated: !1,
                  cache: s.cache,
                  pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
                  transitions: s.transitions,
                }),
                (t.updateQueue.baseState = i),
                (t.memoizedState = i),
                t.flags & 256)
              ) {
                (o = fo(Error(A(423)), t)), (t = Qp(e, t, r, n, o));
                break e;
              } else if (r !== o) {
                (o = fo(Error(A(424)), t)), (t = Qp(e, t, r, n, o));
                break e;
              } else
                for (
                  pt = Un(t.stateNode.containerInfo.firstChild),
                    ht = t,
                    Se = !0,
                    zt = null,
                    n = fm(t, null, r, n),
                    t.child = n;
                  n;

                )
                  (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
            else {
              if ((ao(), r === o)) {
                t = vn(e, t, n);
                break e;
              }
              qe(e, t, r, n);
            }
            t = t.child;
          }
          return t;
        case 5:
          return (
            dm(t),
            e === null && Ju(t),
            (r = t.type),
            (o = t.pendingProps),
            (i = e !== null ? e.memoizedProps : null),
            (s = o.children),
            Qu(r, o) ? (s = null) : i !== null && Qu(r, i) && (t.flags |= 32),
            Vm(e, t),
            qe(e, t, s, n),
            t.child
          );
        case 6:
          return e === null && Ju(t), null;
        case 13:
          return Um(e, t, n);
        case 4:
          return (
            zc(t, t.stateNode.containerInfo),
            (r = t.pendingProps),
            e === null ? (t.child = uo(t, null, r, n)) : qe(e, t, r, n),
            t.child
          );
        case 11:
          return (
            (r = t.type),
            (o = t.pendingProps),
            (o = t.elementType === r ? o : bt(r, o)),
            Wp(e, t, r, o, n)
          );
        case 7:
          return qe(e, t, t.pendingProps, n), t.child;
        case 8:
          return qe(e, t, t.pendingProps.children, n), t.child;
        case 12:
          return qe(e, t, t.pendingProps.children, n), t.child;
        case 10:
          e: {
            if (
              ((r = t.type._context),
              (o = t.pendingProps),
              (i = t.memoizedProps),
              (s = o.value),
              fe(ll, r._currentValue),
              (r._currentValue = s),
              i !== null)
            )
              if (Ht(i.value, s)) {
                if (i.children === o.children && !st.current) {
                  t = vn(e, t, n);
                  break e;
                }
              } else
                for (i = t.child, i !== null && (i.return = t); i !== null; ) {
                  var l = i.dependencies;
                  if (l !== null) {
                    s = i.child;
                    for (var a = l.firstContext; a !== null; ) {
                      if (a.context === r) {
                        if (i.tag === 1) {
                          (a = dn(-1, n & -n)), (a.tag = 2);
                          var u = i.updateQueue;
                          if (u !== null) {
                            u = u.shared;
                            var f = u.pending;
                            f === null
                              ? (a.next = a)
                              : ((a.next = f.next), (f.next = a)),
                              (u.pending = a);
                          }
                        }
                        (i.lanes |= n),
                          (a = i.alternate),
                          a !== null && (a.lanes |= n),
                          ec(i.return, n, t),
                          (l.lanes |= n);
                        break;
                      }
                      a = a.next;
                    }
                  } else if (i.tag === 10)
                    s = i.type === t.type ? null : i.child;
                  else if (i.tag === 18) {
                    if (((s = i.return), s === null)) throw Error(A(341));
                    (s.lanes |= n),
                      (l = s.alternate),
                      l !== null && (l.lanes |= n),
                      ec(s, n, t),
                      (s = i.sibling);
                  } else s = i.child;
                  if (s !== null) s.return = i;
                  else
                    for (s = i; s !== null; ) {
                      if (s === t) {
                        s = null;
                        break;
                      }
                      if (((i = s.sibling), i !== null)) {
                        (i.return = s.return), (s = i);
                        break;
                      }
                      s = s.return;
                    }
                  i = s;
                }
            qe(e, t, o.children, n), (t = t.child);
          }
          return t;
        case 9:
          return (
            (o = t.type),
            (r = t.pendingProps.children),
            oo(t, n),
            (o = Lt(o)),
            (r = r(o)),
            (t.flags |= 1),
            qe(e, t, r, n),
            t.child
          );
        case 14:
          return (
            (r = t.type),
            (o = bt(r, t.pendingProps)),
            (o = bt(r.type, o)),
            Gp(e, t, r, o, n)
          );
        case 15:
          return Dm(e, t, t.type, t.pendingProps, n);
        case 17:
          return (
            (r = t.type),
            (o = t.pendingProps),
            (o = t.elementType === r ? o : bt(r, o)),
            Hs(e, t),
            (t.tag = 1),
            lt(r) ? ((e = !0), ol(t)) : (e = !1),
            oo(t, n),
            um(t, r, o),
            nc(t, r, o, n),
            ic(null, t, r, !0, e, n)
          );
        case 19:
          return bm(e, t, n);
        case 22:
          return Mm(e, t, n);
      }
      throw Error(A(156, t.tag));
    };
    function tv(e, t) {
      return Ah(e, t);
    }
    function K_(e, t, n, r) {
      (this.tag = e),
        (this.key = n),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
          this.memoizedState =
          this.updateQueue =
          this.memoizedProps =
            null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
    }
    function At(e, t, n, r) {
      return new K_(e, t, n, r);
    }
    function nf(e) {
      return (e = e.prototype), !(!e || !e.isReactComponent);
    }
    function Q_(e) {
      if (typeof e == 'function') return nf(e) ? 1 : 0;
      if (e != null) {
        if (((e = e.$$typeof), e === Ec)) return 11;
        if (e === wc) return 14;
      }
      return 2;
    }
    function Bn(e, t) {
      var n = e.alternate;
      return (
        n === null
          ? ((n = At(e.tag, t, e.key, e.mode)),
            (n.elementType = e.elementType),
            (n.type = e.type),
            (n.stateNode = e.stateNode),
            (n.alternate = e),
            (e.alternate = n))
          : ((n.pendingProps = t),
            (n.type = e.type),
            (n.flags = 0),
            (n.subtreeFlags = 0),
            (n.deletions = null)),
        (n.flags = e.flags & 14680064),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
          t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
      );
    }
    function Ks(e, t, n, r, o, i) {
      var s = 2;
      if (((r = e), typeof e == 'function')) nf(e) && (s = 1);
      else if (typeof e == 'string') s = 5;
      else
        e: switch (e) {
          case jr:
            return pr(n.children, o, i, t);
          case _c:
            (s = 8), (o |= 8);
            break;
          case Nu:
            return (
              (e = At(12, n, t, o | 2)), (e.elementType = Nu), (e.lanes = i), e
            );
          case Au:
            return (
              (e = At(13, n, t, o)), (e.elementType = Au), (e.lanes = i), e
            );
          case Cu:
            return (
              (e = At(19, n, t, o)), (e.elementType = Cu), (e.lanes = i), e
            );
          case ch:
            return Cl(n, o, i, t);
          default:
            if (typeof e == 'object' && e !== null)
              switch (e.$$typeof) {
                case ah:
                  s = 10;
                  break e;
                case uh:
                  s = 9;
                  break e;
                case Ec:
                  s = 11;
                  break e;
                case wc:
                  s = 14;
                  break e;
                case Ln:
                  (s = 16), (r = null);
                  break e;
              }
            throw Error(A(130, e == null ? e : typeof e, ''));
        }
      return (
        (t = At(s, n, t, o)),
        (t.elementType = e),
        (t.type = r),
        (t.lanes = i),
        t
      );
    }
    function pr(e, t, n, r) {
      return (e = At(7, e, r, t)), (e.lanes = n), e;
    }
    function Cl(e, t, n, r) {
      return (
        (e = At(22, e, r, t)),
        (e.elementType = ch),
        (e.lanes = n),
        (e.stateNode = { isHidden: !1 }),
        e
      );
    }
    function Tu(e, t, n) {
      return (e = At(6, e, null, t)), (e.lanes = n), e;
    }
    function Ru(e, t, n) {
      return (
        (t = At(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    function Y_(e, t, n, r, o) {
      (this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork =
          this.pingCache =
          this.current =
          this.pendingChildren =
            null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = lu(0)),
        (this.expirationTimes = lu(-1)),
        (this.entangledLanes =
          this.finishedLanes =
          this.mutableReadLanes =
          this.expiredLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = lu(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = o),
        (this.mutableSourceEagerHydrationData = null);
    }
    function rf(e, t, n, r, o, i, s, l, a) {
      return (
        (e = new Y_(e, t, n, l, a)),
        t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
        (i = At(3, null, null, t)),
        (e.current = i),
        (i.stateNode = e),
        (i.memoizedState = {
          element: r,
          isDehydrated: n,
          cache: null,
          transitions: null,
          pendingSuspenseBoundaries: null,
        }),
        Fc(i),
        e
      );
    }
    function Z_(e, t, n) {
      var r =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: Br,
        key: r == null ? null : '' + r,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    function nv(e) {
      if (!e) return Hn;
      e = e._reactInternals;
      e: {
        if (_r(e) !== e || e.tag !== 1) throw Error(A(170));
        var t = e;
        do {
          switch (t.tag) {
            case 3:
              t = t.stateNode.context;
              break e;
            case 1:
              if (lt(t.type)) {
                t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                break e;
              }
          }
          t = t.return;
        } while (t !== null);
        throw Error(A(171));
      }
      if (e.tag === 1) {
        var n = e.type;
        if (lt(n)) return tm(e, n, t);
      }
      return t;
    }
    function rv(e, t, n, r, o, i, s, l, a) {
      return (
        (e = rf(n, r, !0, e, o, i, s, l, a)),
        (e.context = nv(null)),
        (n = e.current),
        (r = Je()),
        (o = zn(n)),
        (i = dn(r, o)),
        (i.callback = t ?? null),
        bn(n, i, o),
        (e.current.lanes = o),
        Di(e, o, r),
        at(e, r),
        e
      );
    }
    function Ll(e, t, n, r) {
      var o = t.current,
        i = Je(),
        s = zn(o);
      return (
        (n = nv(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = dn(i, s)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = bn(o, t, s)),
        e !== null && (jt(e, o, s, i), zs(e, o, s)),
        s
      );
    }
    function yl(e) {
      if (((e = e.current), !e.child)) return null;
      switch (e.child.tag) {
        case 5:
          return e.child.stateNode;
        default:
          return e.child.stateNode;
      }
    }
    function oh(e, t) {
      if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
      }
    }
    function of(e, t) {
      oh(e, t), (e = e.alternate) && oh(e, t);
    }
    function X_() {
      return null;
    }
    var ov =
      typeof reportError == 'function'
        ? reportError
        : function (e) {
            console.error(e);
          };
    function sf(e) {
      this._internalRoot = e;
    }
    kl.prototype.render = sf.prototype.render = function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(A(409));
      Ll(e, t, null, null);
    };
    kl.prototype.unmount = sf.prototype.unmount = function () {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        gr(function () {
          Ll(null, e, null, null);
        }),
          (t[hn] = null);
      }
    };
    function kl(e) {
      this._internalRoot = e;
    }
    kl.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = Dh();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < In.length && t !== 0 && t < In[n].priority; n++);
        In.splice(n, 0, e), n === 0 && Vh(e);
      }
    };
    function lf(e) {
      return !(
        !e ||
        (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
      );
    }
    function Il(e) {
      return !(
        !e ||
        (e.nodeType !== 1 &&
          e.nodeType !== 9 &&
          e.nodeType !== 11 &&
          (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
      );
    }
    function ih() {}
    function q_(e, t, n, r, o) {
      if (o) {
        if (typeof r == 'function') {
          var i = r;
          r = function () {
            var u = yl(s);
            i.call(u);
          };
        }
        var s = rv(t, r, e, 0, null, !1, !1, '', ih);
        return (
          (e._reactRootContainer = s),
          (e[hn] = s.current),
          xi(e.nodeType === 8 ? e.parentNode : e),
          gr(),
          s
        );
      }
      for (; (o = e.lastChild); ) e.removeChild(o);
      if (typeof r == 'function') {
        var l = r;
        r = function () {
          var u = yl(a);
          l.call(u);
        };
      }
      var a = rf(e, 0, !1, null, null, !1, !1, '', ih);
      return (
        (e._reactRootContainer = a),
        (e[hn] = a.current),
        xi(e.nodeType === 8 ? e.parentNode : e),
        gr(function () {
          Ll(t, a, n, r);
        }),
        a
      );
    }
    function Pl(e, t, n, r, o) {
      var i = n._reactRootContainer;
      if (i) {
        var s = i;
        if (typeof o == 'function') {
          var l = o;
          o = function () {
            var a = yl(s);
            l.call(a);
          };
        }
        Ll(t, s, e, o);
      } else s = q_(n, t, e, o, r);
      return yl(s);
    }
    Ph = function (e) {
      switch (e.tag) {
        case 3:
          var t = e.stateNode;
          if (t.current.memoizedState.isDehydrated) {
            var n = si(t.pendingLanes);
            n !== 0 &&
              (xc(t, n | 1),
              at(t, Ae()),
              !(te & 6) && ((po = Ae() + 500), Kn()));
          }
          break;
        case 13:
          gr(function () {
            var r = mn(e, 1);
            if (r !== null) {
              var o = Je();
              jt(r, e, 1, o);
            }
          }),
            of(e, 1);
      }
    };
    Nc = function (e) {
      if (e.tag === 13) {
        var t = mn(e, 134217728);
        if (t !== null) {
          var n = Je();
          jt(t, e, 134217728, n);
        }
        of(e, 134217728);
      }
    };
    Oh = function (e) {
      if (e.tag === 13) {
        var t = zn(e),
          n = mn(e, t);
        if (n !== null) {
          var r = Je();
          jt(n, e, t, r);
        }
        of(e, t);
      }
    };
    Dh = function () {
      return oe;
    };
    Mh = function (e, t) {
      var n = oe;
      try {
        return (oe = e), t();
      } finally {
        oe = n;
      }
    };
    Uu = function (e, t, n) {
      switch (t) {
        case 'input':
          if ((Iu(e, n), (t = n.name), n.type === 'radio' && t != null)) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                'input[name=' + JSON.stringify('' + t) + '][type="radio"]',
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var o = wl(r);
                if (!o) throw Error(A(90));
                dh(r), Iu(r, o);
              }
            }
          }
          break;
        case 'textarea':
          hh(e, n);
          break;
        case 'select':
          (t = n.value), t != null && eo(e, !!n.multiple, t, !1);
      }
    };
    Eh = Jc;
    wh = gr;
    var J_ = { usingClientEntryPoint: !1, Events: [Vi, Kr, wl, Sh, _h, Jc] },
      ni = {
        findFiberByHostInstance: ur,
        bundleType: 0,
        version: '18.2.0',
        rendererPackageName: 'react-dom',
      },
      e1 = {
        bundleType: ni.bundleType,
        version: ni.version,
        rendererPackageName: ni.rendererPackageName,
        rendererConfig: ni.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: yn.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
          return (e = xh(e)), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: ni.findFiberByHostInstance || X_,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: '18.2.0-next-9e3b772b8-20220608',
      };
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u' &&
      ((ri = __REACT_DEVTOOLS_GLOBAL_HOOK__),
      !ri.isDisabled && ri.supportsFiber)
    )
      try {
        (gl = ri.inject(e1)), (en = ri);
      } catch {}
    var ri;
    yt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = J_;
    yt.createPortal = function (e, t) {
      var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!lf(t)) throw Error(A(200));
      return Z_(e, t, null, n);
    };
    yt.createRoot = function (e, t) {
      if (!lf(e)) throw Error(A(299));
      var n = !1,
        r = '',
        o = ov;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
        (t = rf(e, 1, !1, null, null, n, !1, r, o)),
        (e[hn] = t.current),
        xi(e.nodeType === 8 ? e.parentNode : e),
        new sf(t)
      );
    };
    yt.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == 'function'
          ? Error(A(188))
          : ((e = Object.keys(e).join(',')), Error(A(268, e)));
      return (e = xh(t)), (e = e === null ? null : e.stateNode), e;
    };
    yt.flushSync = function (e) {
      return gr(e);
    };
    yt.hydrate = function (e, t, n) {
      if (!Il(t)) throw Error(A(200));
      return Pl(null, e, t, !0, n);
    };
    yt.hydrateRoot = function (e, t, n) {
      if (!lf(e)) throw Error(A(405));
      var r = (n != null && n.hydratedSources) || null,
        o = !1,
        i = '',
        s = ov;
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (o = !0),
          n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
        (t = rv(t, null, e, 1, n ?? null, o, !1, i, s)),
        (e[hn] = t.current),
        xi(e),
        r)
      )
        for (e = 0; e < r.length; e++)
          (n = r[e]),
            (o = n._getVersion),
            (o = o(n._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [n, o])
              : t.mutableSourceEagerHydrationData.push(n, o);
      return new kl(t);
    };
    yt.render = function (e, t, n) {
      if (!Il(t)) throw Error(A(200));
      return Pl(null, e, t, !1, n);
    };
    yt.unmountComponentAtNode = function (e) {
      if (!Il(e)) throw Error(A(40));
      return e._reactRootContainer
        ? (gr(function () {
            Pl(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[hn] = null);
            });
          }),
          !0)
        : !1;
    };
    yt.unstable_batchedUpdates = Jc;
    yt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
      if (!Il(n)) throw Error(A(200));
      if (e == null || e._reactInternals === void 0) throw Error(A(38));
      return Pl(e, t, n, !1, r);
    };
    yt.version = '18.2.0-next-9e3b772b8-20220608';
  });
  var af = Yt((JC, lv) => {
    'use strict';
    function sv() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sv);
        } catch (e) {
          console.error(e);
        }
    }
    sv(), (lv.exports = iv());
  });
  var uv = Yt((uf) => {
    'use strict';
    var av = af();
    (uf.createRoot = av.createRoot), (uf.hydrateRoot = av.hydrateRoot);
    var eL;
  });
  var f0 = Yt((xO, c0) => {
    c0.exports = function (t, n, r, o) {
      var i = r ? r.call(o, t, n) : void 0;
      if (i !== void 0) return !!i;
      if (t === n) return !0;
      if (typeof t != 'object' || !t || typeof n != 'object' || !n) return !1;
      var s = Object.keys(t),
        l = Object.keys(n);
      if (s.length !== l.length) return !1;
      for (
        var a = Object.prototype.hasOwnProperty.bind(n), u = 0;
        u < s.length;
        u++
      ) {
        var f = s[u];
        if (!a(f)) return !1;
        var p = t[f],
          m = n[f];
        if (
          ((i = r ? r.call(o, p, m, f) : void 0),
          i === !1 || (i === void 0 && p !== m))
        )
          return !1;
      }
      return !0;
    };
  });
  var ig = Yt((Va) => {
    'use strict';
    var EC = Tt(),
      wC = Symbol.for('react.element'),
      TC = Symbol.for('react.fragment'),
      RC = Object.prototype.hasOwnProperty,
      xC =
        EC.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
      NC = { key: !0, ref: !0, __self: !0, __source: !0 };
    function og(e, t, n) {
      var r,
        o = {},
        i = null,
        s = null;
      n !== void 0 && (i = '' + n),
        t.key !== void 0 && (i = '' + t.key),
        t.ref !== void 0 && (s = t.ref);
      for (r in t) RC.call(t, r) && !NC.hasOwnProperty(r) && (o[r] = t[r]);
      if (e && e.defaultProps)
        for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
      return {
        $$typeof: wC,
        type: e,
        key: i,
        ref: s,
        props: o,
        _owner: xC.current,
      };
    }
    Va.Fragment = TC;
    Va.jsx = og;
    Va.jsxs = og;
  });
  var gt = Yt((aD, sg) => {
    'use strict';
    sg.exports = ig();
  });
  var _g = ge(uv(), 1);
  var Vr = ge(Tt(), 1);
  var me = ge(Tt()),
    Pv = ge(af());
  function t1(e) {
    let t = new Error(e);
    if (t.stack === void 0)
      try {
        throw t;
      } catch {}
    return t;
  }
  var n1 = t1,
    Q = n1;
  function r1(e) {
    return !!e && typeof e.then == 'function';
  }
  var he = r1;
  function o1(e, t) {
    if (e != null) return e;
    throw Q(t ?? 'Got unexpected null or undefined');
  }
  var _e = o1;
  function K(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  var go = class {
      getValue() {
        throw Q('BaseLoadable');
      }
      toPromise() {
        throw Q('BaseLoadable');
      }
      valueMaybe() {
        throw Q('BaseLoadable');
      }
      valueOrThrow() {
        throw Q(`Loadable expected value, but in "${this.state}" state`);
      }
      promiseMaybe() {
        throw Q('BaseLoadable');
      }
      promiseOrThrow() {
        throw Q(`Loadable expected promise, but in "${this.state}" state`);
      }
      errorMaybe() {
        throw Q('BaseLoadable');
      }
      errorOrThrow() {
        throw Q(`Loadable expected error, but in "${this.state}" state`);
      }
      is(t) {
        return t.state === this.state && t.contents === this.contents;
      }
      map(t) {
        throw Q('BaseLoadable');
      }
    },
    gf = class extends go {
      constructor(t) {
        super(),
          K(this, 'state', 'hasValue'),
          K(this, 'contents', void 0),
          (this.contents = t);
      }
      getValue() {
        return this.contents;
      }
      toPromise() {
        return Promise.resolve(this.contents);
      }
      valueMaybe() {
        return this.contents;
      }
      valueOrThrow() {
        return this.contents;
      }
      promiseMaybe() {}
      errorMaybe() {}
      map(t) {
        try {
          let n = t(this.contents);
          return he(n) ? wr(n) : So(n) ? n : Yi(n);
        } catch (n) {
          return he(n) ? wr(n.next(() => this.map(t))) : ql(n);
        }
      }
    },
    Sf = class extends go {
      constructor(t) {
        super(),
          K(this, 'state', 'hasError'),
          K(this, 'contents', void 0),
          (this.contents = t);
      }
      getValue() {
        throw this.contents;
      }
      toPromise() {
        return Promise.reject(this.contents);
      }
      valueMaybe() {}
      promiseMaybe() {}
      errorMaybe() {
        return this.contents;
      }
      errorOrThrow() {
        return this.contents;
      }
      map(t) {
        return this;
      }
    },
    bl = class extends go {
      constructor(t) {
        super(),
          K(this, 'state', 'loading'),
          K(this, 'contents', void 0),
          (this.contents = t);
      }
      getValue() {
        throw this.contents;
      }
      toPromise() {
        return this.contents;
      }
      valueMaybe() {}
      promiseMaybe() {
        return this.contents;
      }
      promiseOrThrow() {
        return this.contents;
      }
      errorMaybe() {}
      map(t) {
        return wr(
          this.contents
            .then((n) => {
              let r = t(n);
              if (So(r)) {
                let o = r;
                switch (o.state) {
                  case 'hasValue':
                    return o.contents;
                  case 'hasError':
                    throw o.contents;
                  case 'loading':
                    return o.contents;
                }
              }
              return r;
            })
            .catch((n) => {
              if (he(n)) return n.then(() => this.map(t).contents);
              throw n;
            }),
        );
      }
    };
  function Yi(e) {
    return Object.freeze(new gf(e));
  }
  function ql(e) {
    return Object.freeze(new Sf(e));
  }
  function wr(e) {
    return Object.freeze(new bl(e));
  }
  function Ov() {
    return Object.freeze(new bl(new Promise(() => {})));
  }
  function i1(e) {
    return e.every((t) => t.state === 'hasValue')
      ? Yi(e.map((t) => t.contents))
      : e.some((t) => t.state === 'hasError')
      ? ql(
          _e(
            e.find((t) => t.state === 'hasError'),
            'Invalid loadable passed to loadableAll',
          ).contents,
        )
      : wr(Promise.all(e.map((t) => t.contents)));
  }
  function Dv(e) {
    let n = (
        Array.isArray(e) ? e : Object.getOwnPropertyNames(e).map((o) => e[o])
      ).map((o) => (So(o) ? o : he(o) ? wr(o) : Yi(o))),
      r = i1(n);
    return Array.isArray(e)
      ? r
      : r.map((o) =>
          Object.getOwnPropertyNames(e).reduce(
            (i, s, l) => ({ ...i, [s]: o[l] }),
            {},
          ),
        );
  }
  function So(e) {
    return e instanceof go;
  }
  var s1 = {
      of: (e) => (he(e) ? wr(e) : So(e) ? e : Yi(e)),
      error: (e) => ql(e),
      loading: () => Ov(),
      all: Dv,
      isLoadable: So,
    },
    xr = {
      loadableWithValue: Yi,
      loadableWithError: ql,
      loadableWithPromise: wr,
      loadableLoading: Ov,
      loadableAll: Dv,
      isLoadable: So,
      RecoilLoadable: s1,
    },
    l1 = xr.loadableWithValue,
    a1 = xr.loadableWithError,
    u1 = xr.loadableWithPromise,
    c1 = xr.loadableLoading,
    f1 = xr.loadableAll,
    d1 = xr.isLoadable,
    p1 = xr.RecoilLoadable,
    Zi = Object.freeze({
      __proto__: null,
      loadableWithValue: l1,
      loadableWithError: a1,
      loadableWithPromise: u1,
      loadableLoading: c1,
      loadableAll: f1,
      isLoadable: d1,
      RecoilLoadable: p1,
    }),
    _f = {
      RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: !0,
      RECOIL_GKS_ENABLED: new Set([
        'recoil_hamt_2020',
        'recoil_sync_external_store',
        'recoil_suppress_rerender_in_callback',
        'recoil_memory_managament_2020',
      ]),
    };
  function h1(e, t) {
    var n, r;
    let o =
      (n = process.env[e]) === null ||
      n === void 0 ||
      (r = n.toLowerCase()) === null ||
      r === void 0
        ? void 0
        : r.trim();
    if (o == null || o === '') return;
    if (!['true', 'false'].includes(o))
      throw Q(`process.env.${e} value must be 'true', 'false', or empty: ${o}`);
    t(o === 'true');
  }
  function m1(e, t) {
    var n;
    let r = (n = process.env[e]) === null || n === void 0 ? void 0 : n.trim();
    r == null || r === '' || t(r.split(/\s*,\s*|\s+/));
  }
  function v1() {
    var e;
    typeof process > 'u' ||
      (((e = process) === null || e === void 0 ? void 0 : e.env) != null &&
        (h1('RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED', (t) => {
          _f.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = t;
        }),
        m1('RECOIL_GKS_ENABLED', (t) => {
          t.forEach((n) => {
            _f.RECOIL_GKS_ENABLED.add(n);
          });
        })));
  }
  v1();
  var Ro = _f;
  function Jl(e) {
    return Ro.RECOIL_GKS_ENABLED.has(e);
  }
  Jl.setPass = (e) => {
    Ro.RECOIL_GKS_ENABLED.add(e);
  };
  Jl.setFail = (e) => {
    Ro.RECOIL_GKS_ENABLED.delete(e);
  };
  Jl.clear = () => {
    Ro.RECOIL_GKS_ENABLED.clear();
  };
  var se = Jl;
  function y1(e, t, { error: n } = {}) {
    return null;
  }
  var g1 = y1,
    tt = g1,
    cf,
    ff,
    df,
    S1 =
      (cf = me.default.createMutableSource) !== null && cf !== void 0
        ? cf
        : me.default.unstable_createMutableSource,
    Mv =
      (ff = me.default.useMutableSource) !== null && ff !== void 0
        ? ff
        : me.default.unstable_useMutableSource,
    Vf =
      (df = me.default.useSyncExternalStore) !== null && df !== void 0
        ? df
        : me.default.unstable_useSyncExternalStore,
    cv = !1;
  function _1() {
    var e;
    let { ReactCurrentDispatcher: t, ReactCurrentOwner: n } =
        me.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      o =
        ((e = t?.current) !== null && e !== void 0 ? e : n.currentDispatcher)
          .useSyncExternalStore != null;
    return (
      Vf &&
        !o &&
        !cv &&
        ((cv = !0),
        tt(
          'A React renderer without React 18+ API support is being used with React 18+.',
        )),
      o
    );
  }
  function E1() {
    return se('recoil_transition_support')
      ? { mode: 'TRANSITION_SUPPORT', early: !0, concurrent: !0 }
      : se('recoil_sync_external_store') && Vf != null
      ? { mode: 'SYNC_EXTERNAL_STORE', early: !0, concurrent: !1 }
      : se('recoil_mutable_source') &&
        Mv != null &&
        typeof window < 'u' &&
        !window.$disableRecoilValueMutableSource_TEMP_HACK_DO_NOT_USE
      ? se('recoil_suppress_rerender_in_callback')
        ? { mode: 'MUTABLE_SOURCE', early: !0, concurrent: !0 }
        : { mode: 'MUTABLE_SOURCE', early: !1, concurrent: !1 }
      : se('recoil_suppress_rerender_in_callback')
      ? { mode: 'LEGACY', early: !0, concurrent: !1 }
      : { mode: 'LEGACY', early: !1, concurrent: !1 };
  }
  function w1() {
    return !1;
  }
  var xo = {
      createMutableSource: S1,
      useMutableSource: Mv,
      useSyncExternalStore: Vf,
      currentRendererSupportsUseSyncExternalStore: _1,
      reactMode: E1,
      isFastRefreshEnabled: w1,
    },
    Ki = class {
      constructor(t) {
        K(this, 'key', void 0), (this.key = t);
      }
      toJSON() {
        return { key: this.key };
      }
    },
    Fl = class extends Ki {},
    zl = class extends Ki {};
  function T1(e) {
    return e instanceof Fl || e instanceof zl;
  }
  var ea = {
      AbstractRecoilValue: Ki,
      RecoilState: Fl,
      RecoilValueReadOnly: zl,
      isRecoilValue: T1,
    },
    R1 = ea.AbstractRecoilValue,
    x1 = ea.RecoilState,
    N1 = ea.RecoilValueReadOnly,
    A1 = ea.isRecoilValue,
    Tr = Object.freeze({
      __proto__: null,
      AbstractRecoilValue: R1,
      RecoilState: x1,
      RecoilValueReadOnly: N1,
      isRecoilValue: A1,
    });
  function C1(e, ...t) {}
  var L1 = C1,
    $f = L1;
  function k1(e, t) {
    return (function* () {
      let n = 0;
      for (let r of e) yield t(r, n++);
    })();
  }
  var ta = k1,
    { isFastRefreshEnabled: nL } = xo,
    Bl = class {},
    I1 = new Bl(),
    Rr = new Map(),
    Uf = new Map();
  function P1(e) {
    return ta(e, (t) => _e(Uf.get(t)));
  }
  function O1(e) {
    if (Rr.has(e)) {
      let t = `Duplicate atom key "${e}". This is a FATAL ERROR in
      production. But it is safe to ignore this warning if it occurred because of
      hot module replacement.`;
      console.warn(t);
    }
  }
  function D1(e) {
    Ro.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED && O1(e.key),
      Rr.set(e.key, e);
    let t =
      e.set == null
        ? new Tr.RecoilValueReadOnly(e.key)
        : new Tr.RecoilState(e.key);
    return Uf.set(e.key, t), t;
  }
  var jl = class extends Error {};
  function M1(e) {
    let t = Rr.get(e);
    if (t == null) throw new jl(`Missing definition for RecoilValue: "${e}""`);
    return t;
  }
  function V1(e) {
    return Rr.get(e);
  }
  var Hl = new Map();
  function $1(e) {
    var t;
    if (!se('recoil_memory_managament_2020')) return;
    let n = Rr.get(e);
    if (
      n != null &&
      (t = n.shouldDeleteConfigOnRelease) !== null &&
      t !== void 0 &&
      t.call(n)
    ) {
      var r;
      Rr.delete(e), (r = Vv(e)) === null || r === void 0 || r(), Hl.delete(e);
    }
  }
  function U1(e, t) {
    se('recoil_memory_managament_2020') &&
      (t === void 0 ? Hl.delete(e) : Hl.set(e, t));
  }
  function Vv(e) {
    return Hl.get(e);
  }
  var ct = {
    nodes: Rr,
    recoilValues: Uf,
    registerNode: D1,
    getNode: M1,
    getNodeMaybe: V1,
    deleteNodeConfigIfPossible: $1,
    setConfigDeletionHandler: U1,
    getConfigDeletionHandler: Vv,
    recoilValuesForKeys: P1,
    NodeMissingError: jl,
    DefaultValue: Bl,
    DEFAULT_VALUE: I1,
  };
  function b1(e, t) {
    t();
  }
  var F1 = { enqueueExecution: b1 };
  function z1(e, t) {
    return (t = { exports: {} }), e(t, t.exports), t.exports;
  }
  var B1 = z1(function (e) {
      var t =
          typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
            ? function (g) {
                return typeof g;
              }
            : function (g) {
                return g &&
                  typeof Symbol == 'function' &&
                  g.constructor === Symbol &&
                  g !== Symbol.prototype
                  ? 'symbol'
                  : typeof g;
              },
        n = {},
        r = 5,
        o = Math.pow(2, r),
        i = o - 1,
        s = o / 2,
        l = o / 4,
        a = {},
        u = function (v) {
          return function () {
            return v;
          };
        },
        f = (n.hash = function (g) {
          var v = typeof g > 'u' ? 'undefined' : t(g);
          if (
            v ===
            '\
number'
          )
            return g;
          v !== 'string' && (g += '');
          for (var N = 0, I = 0, P = g.length; I < P; ++I) {
            var M = g.charCodeAt(I);
            N = ((N << 5) - N + M) | 0;
          }
          return N;
        }),
        p = function (v) {
          return (
            (v -= (v >> 1) & 1431655765),
            (v = (v & 858993459) + ((v >> 2) & 858993459)),
            (v = (v + (v >> 4)) & 252645135),
            (v += v >> 8),
            (v += v >> 16),
            v & 127
          );
        },
        m = function (v, N) {
          return (N >>> v) & i;
        },
        S = function (v) {
          return 1 << v;
        },
        y = function (v, N) {
          return p(v & (N - 1));
        },
        w = function (v, N, I, P) {
          var M = P;
          if (!v) {
            var j = P.length;
            M = new Array(j);
            for (var z = 0; z < j; ++z) M[z] = P[z];
          }
          return (M[N] = I), M;
        },
        U = function (v, N, I) {
          var P = I.length - 1,
            M = 0,
            j = 0,
            z = I;
          if (v) M = j = N;
          else for (z = new Array(P); M < N; ) z[j++] = I[M++];
          for (++M; M <= P; ) z[j++] = I[M++];
          return v && (z.length = P), z;
        },
        h = function (v, N, I, P) {
          var M = P.length;
          if (v) {
            for (var j = M; j >= N; ) P[j--] = P[j];
            return (P[N] = I), P;
          }
          for (var z = 0, B = 0, X = new Array(M + 1); z < N; ) X[B++] = P[z++];
          for (X[N] = I; z < M; ) X[++B] = P[z++];
          return X;
        },
        c = 1,
        d = 2,
        E = 3,
        R = 4,
        x = { __hamt_isEmpty: !0 },
        T = function (v) {
          return v === x || (v && v.__hamt_isEmpty);
        },
        O = function (v, N, I, P) {
          return { type: c, edit: v, hash: N, key: I, value: P, _modify: Ye };
        },
        ee = function (v, N, I) {
          return { type: d, edit: v, hash: N, children: I, _modify: Mt };
        },
        V = function (v, N, I) {
          return { type: E, edit: v, mask: N, children: I, _modify: Z };
        },
        ae = function (v, N, I) {
          return { type: R, edit: v, size: N, children: I, _modify: Y };
        },
        Dt = function (v) {
          return v === x || v.type === c || v.type === d;
        },
        Ie = function (v, N, I, P, M) {
          for (var j = [], z = P, B = 0, X = 0; z; ++X)
            z & 1 && (j[X] = M[B++]), (z >>>= 1);
          return (j[N] = I), ae(v, B + 1, j);
        },
        Qe = function (v, N, I, P) {
          for (
            var M = new Array(N - 1), j = 0, z = 0, B = 0, X = P.length;
            B < X;
            ++B
          )
            if (B !== I) {
              var ye = P[B];
              ye && !T(ye) && ((M[j++] = ye), (z |= 1 << B));
            }
          return V(v, z, M);
        },
        xn = function g(v, N, I, P, M, j) {
          if (I === M) return ee(v, I, [j, P]);
          var z = m(N, I),
            B = m(N, M);
          return V(
            v,
            S(z) | S(B),
            z === B ? [g(v, N + r, I, P, M, j)] : z < B ? [P, j] : [j, P],
          );
        },
        Nn = function (v, N, I, P, M, j, z, B) {
          for (var X = M.length, ye = 0; ye < X; ++ye) {
            var rt = M[ye];
            if (I(z, rt.key)) {
              var De = rt.value,
                wt = j(De);
              return wt === De
                ? M
                : wt === a
                ? (--B.value, U(v, ye, M))
                : w(v, ye, O(N, P, z, wt), M);
            }
          }
          var Vt = j();
          return Vt === a ? M : (++B.value, w(v, X, O(N, P, z, Vt), M));
        },
        ft = function (v, N) {
          return v === N.edit;
        },
        Ye = function (v, N, I, P, M, j, z) {
          if (N(j, this.key)) {
            var B = P(this.value);
            return B === this.value
              ? this
              : B === a
              ? (--z.value, x)
              : ft(v, this)
              ? ((this.value = B), this)
              : O(v, M, j, B);
          }
          var X = P();
          return X === a
            ? this
            : (++z.value, xn(v, I, this.hash, this, M, O(v, M, j, X)));
        },
        Mt = function (v, N, I, P, M, j, z) {
          if (M === this.hash) {
            var B = ft(v, this),
              X = Nn(B, v, N, this.hash, this.children, P, j, z);
            return X === this.children
              ? this
              : X.length > 1
              ? ee(v, this.hash, X)
              : X[0];
          }
          var ye = P();
          return ye === a
            ? this
            : (++z.value, xn(v, I, this.hash, this, M, O(v, M, j, ye)));
        },
        Z = function (v, N, I, P, M, j, z) {
          var B = this.mask,
            X = this.children,
            ye = m(I, M),
            rt = S(ye),
            De = y(B, rt),
            wt = B & rt,
            Vt = wt ? X[De] : x,
            Ur = Vt._modify(v, N, I + r, P, M, j, z);
          if (Vt === Ur) return this;
          var cs = ft(v, this),
            Ho = B,
            Wo = void 0;
          if (wt && T(Ur)) {
            if (((Ho &= ~rt), !Ho)) return x;
            if (X.length <= 2 && Dt(X[De ^ 1])) return X[De ^ 1];
            Wo = U(cs, De, X);
          } else if (!wt && !T(Ur)) {
            if (X.length >= s) return Ie(v, ye, Ur, B, X);
            (Ho |= rt), (Wo = h(cs, De, Ur, X));
          } else Wo = w(cs, De, Ur, X);
          return cs
            ? ((this.mask = Ho), (this.children = Wo), this)
            : V(v, Ho, Wo);
        },
        Y = function (v, N, I, P, M, j, z) {
          var B = this.size,
            X = this.children,
            ye = m(I, M),
            rt = X[ye],
            De = (rt || x)._modify(v, N, I + r, P, M, j, z);
          if (rt === De) return this;
          var wt = ft(v, this),
            Vt = void 0;
          if (T(rt) && !T(De)) ++B, (Vt = w(wt, ye, De, X));
          else if (!T(rt) && T(De)) {
            if ((--B, B <= l)) return Qe(v, B, ye, X);
            Vt = w(wt, ye, x, X);
          } else Vt = w(wt, ye, De, X);
          return wt
            ? ((this.size = B), (this.children = Vt), this)
            : ae(v, B, Vt);
        };
      x._modify = function (g, v, N, I, P, M, j) {
        var z = I();
        return z === a ? x : (++j.value, O(g, P, M, z));
      };
      function _(g, v, N, I, P) {
        (this._editable = g),
          (this._edit = v),
          (this._config = N),
          (this._root = I),
          (this._size = P);
      }
      _.prototype.setTree = function (g, v) {
        return this._editable
          ? ((this._root = g), (this._size = v), this)
          : g === this._root
          ? this
          : new _(this._editable, this._edit, this._config, g, v);
      };
      var L = (n.tryGetHash = function (g, v, N, I) {
        for (var P = I._root, M = 0, j = I._config.keyEq; ; )
          switch (P.type) {
            case c:
              return j(N, P.key) ? P.value : g;
            case d: {
              if (v === P.hash)
                for (var z = P.children, B = 0, X = z.length; B < X; ++B) {
                  var ye = z[B];
                  if (j(N, ye.key)) return ye.value;
                }
              return g;
            }
            case E: {
              var rt = m(M, v),
                De = S(rt);
              if (P.mask & De) {
                (P = P.children[y(P.mask, De)]), (M += r);
                break;
              }
              return g;
            }
            case R: {
              if (((P = P.children[m(M, v)]), P)) {
                M += r;
                break;
              }
              return g;
            }
            default:
              return g;
          }
      });
      _.prototype.tryGetHash = function (g, v, N) {
        return L(g, v, N, this);
      };
      var k = (n.tryGet = function (g, v, N) {
        return L(g, N._config.hash(v), v, N);
      });
      _.prototype.tryGet = function (g, v) {
        return k(g, v, this);
      };
      var F = (n.getHash = function (g, v, N) {
        return L(void 0, g, v, N);
      });
      _.prototype.getHash = function (g, v) {
        return F(g, v, this);
      };
      var $ = (n.get = function (g, v) {
        return L(void 0, v._config.hash(g), g, v);
      });
      _.prototype.get = function (g, v) {
        return k(v, g, this);
      };
      var W = (n.has = function (g, v, N) {
        return L(a, g, v, N) !== a;
      });
      _.prototype.hasHash = function (g, v) {
        return W(g, v, this);
      };
      var H = (n.has = function (g, v) {
        return W(v._config.hash(g), g, v);
      });
      _.prototype.has = function (g) {
        return H(g, this);
      };
      var b = function (v, N) {
        return v === N;
      };
      (n.make = function (g) {
        return new _(
          0,
          0,
          { keyEq: (g && g.keyEq) || b, hash: (g && g.hash) || f },
          x,
          0,
        );
      }),
        (n.empty = n.make());
      var ue = (n.isEmpty = function (g) {
        return g && !!T(g._root);
      });
      _.prototype.isEmpty = function () {
        return ue(this);
      };
      var re = (n.modifyHash = function (g, v, N, I) {
        var P = { value: I._size },
          M = I._root._modify(
            I._editable ? I._edit : NaN,
            I._config.keyEq,
            0,
            g,
            v,
            N,
            P,
          );
        return I.setTree(M, P.value);
      });
      _.prototype.modifyHash = function (g, v, N) {
        return re(N, g, v, this);
      };
      var ie = (n.modify = function (g, v, N) {
        return re(g, N._config.hash(v), v, N);
      });
      _.prototype.modify = function (g, v) {
        return ie(v, g, this);
      };
      var ve = (n.setHash = function (g, v, N, I) {
        return re(u(N), g, v, I);
      });
      _.prototype.setHash = function (g, v, N) {
        return ve(g, v, N, this);
      };
      var _t = (n.set = function (g, v, N) {
        return ve(N._config.hash(g), g, v, N);
      });
      _.prototype.set = function (g, v) {
        return _t(g, v, this);
      };
      var $r = u(a),
        Ze = (n.removeHash = function (g, v, N) {
          return re($r, g, v, N);
        });
      _.prototype.removeHash = _.prototype.deleteHash = function (g, v) {
        return Ze(g, v, this);
      };
      var Et = (n.remove = function (g, v) {
        return Ze(v._config.hash(g), g, v);
      });
      _.prototype.remove = _.prototype.delete = function (g) {
        return Et(g, this);
      };
      var Rd = (n.beginMutation = function (g) {
        return new _(g._editable + 1, g._edit + 1, g._config, g._root, g._size);
      });
      _.prototype.beginMutation = function () {
        return Rd(this);
      };
      var xd = (n.endMutation = function (g) {
        return (g._editable = g._editable && g._editable - 1), g;
      });
      _.prototype.endMutation = function () {
        return xd(this);
      };
      var Tg = (n.mutate = function (g, v) {
        var N = Rd(v);
        return g(N), xd(N);
      });
      _.prototype.mutate = function (g) {
        return Tg(g, this);
      };
      var Fa = function (v) {
          return v && Nd(v[0], v[1], v[2], v[3], v[4]);
        },
        Nd = function (v, N, I, P, M) {
          for (; I < v; ) {
            var j = N[I++];
            if (j && !T(j)) return Ad(j, P, [v, N, I, P, M]);
          }
          return Fa(M);
        },
        Ad = function (v, N, I) {
          switch (v.type) {
            case c:
              return { value: N(v), rest: I };
            case d:
            case R:
            case E:
              var P = v.children;
              return Nd(P.length, P, 0, N, I);
            default:
              return Fa(I);
          }
        },
        Rg = { done: !0 };
      function za(g) {
        this.v = g;
      }
      (za.prototype.next = function () {
        if (!this.v) return Rg;
        var g = this.v;
        return (this.v = Fa(g.rest)), g;
      }),
        (za.prototype[Symbol.iterator] = function () {
          return this;
        });
      var Ba = function (v, N) {
          return new za(Ad(v._root, N));
        },
        xg = function (v) {
          return [v.key, v.value];
        },
        Ng = (n.entries = function (g) {
          return Ba(g, xg);
        });
      _.prototype.entries = _.prototype[Symbol.iterator] = function () {
        return Ng(this);
      };
      var Ag = function (v) {
          return v.key;
        },
        Cg = (n.keys = function (g) {
          return Ba(g, Ag);
        });
      _.prototype.keys = function () {
        return Cg(this);
      };
      var Lg = function (v) {
          return v.value;
        },
        kg =
          (n.values =
          _.prototype.values =
            function (g) {
              return Ba(g, Lg);
            });
      _.prototype.values = function () {
        return kg(this);
      };
      var Cd = (n.fold = function (g, v, N) {
        var I = N._root;
        if (I.type === c) return g(v, I.value, I.key);
        for (var P = [I.children], M = void 0; (M = P.pop()); )
          for (var j = 0, z = M.length; j < z; ) {
            var B = M[j++];
            B &&
              B.type &&
              (B.type === c ? (v = g(v, B.value, B.key)) : P.push(B.children));
          }
        return v;
      });
      _.prototype.fold = function (g, v) {
        return Cd(g, v, this);
      };
      var Ig = (n.forEach = function (g, v) {
        return Cd(
          function (N, I, P) {
            return g(I, P, v);
          },
          null,
          v,
        );
      });
      _.prototype.forEach = function (g) {
        return Ig(g, this);
      };
      var Pg = (n.count = function (g) {
        return g._size;
      });
      (_.prototype.count = function () {
        return Pg(this);
      }),
        Object.defineProperty(_.prototype, 'size', { get: _.prototype.count }),
        e.exports ? (e.exports = n) : ((void 0).hamt = n);
    }),
    Ef = class {
      constructor(t) {
        K(this, '_map', void 0), (this._map = new Map(t?.entries()));
      }
      keys() {
        return this._map.keys();
      }
      entries() {
        return this._map.entries();
      }
      get(t) {
        return this._map.get(t);
      }
      has(t) {
        return this._map.has(t);
      }
      set(t, n) {
        return this._map.set(t, n), this;
      }
      delete(t) {
        return this._map.delete(t), this;
      }
      clone() {
        return bf(this);
      }
      toMap() {
        return new Map(this._map);
      }
    },
    wf = class e {
      constructor(t) {
        if ((K(this, '_hamt', B1.empty.beginMutation()), t instanceof e)) {
          let n = t._hamt.endMutation();
          (t._hamt = n.beginMutation()), (this._hamt = n.beginMutation());
        } else if (t) for (let [n, r] of t.entries()) this._hamt.set(n, r);
      }
      keys() {
        return this._hamt.keys();
      }
      entries() {
        return this._hamt.entries();
      }
      get(t) {
        return this._hamt.get(t);
      }
      has(t) {
        return this._hamt.has(t);
      }
      set(t, n) {
        return this._hamt.set(t, n), this;
      }
      delete(t) {
        return this._hamt.delete(t), this;
      }
      clone() {
        return bf(this);
      }
      toMap() {
        return new Map(this._hamt);
      }
    };
  function bf(e) {
    return se('recoil_hamt_2020') ? new wf(e) : new Ef(e);
  }
  var j1 = { persistentMap: bf },
    H1 = j1.persistentMap,
    W1 = Object.freeze({ __proto__: null, persistentMap: H1 });
  function G1(e, ...t) {
    let n = new Set();
    e: for (let r of e) {
      for (let o of t) if (o.has(r)) continue e;
      n.add(r);
    }
    return n;
  }
  var Hi = G1;
  function K1(e, t) {
    let n = new Map();
    return (
      e.forEach((r, o) => {
        n.set(o, t(r, o));
      }),
      n
    );
  }
  var Wl = K1;
  function Q1() {
    return { nodeDeps: new Map(), nodeToNodeSubscriptions: new Map() };
  }
  function Y1(e) {
    return {
      nodeDeps: Wl(e.nodeDeps, (t) => new Set(t)),
      nodeToNodeSubscriptions: Wl(e.nodeToNodeSubscriptions, (t) => new Set(t)),
    };
  }
  function pf(e, t, n, r) {
    let { nodeDeps: o, nodeToNodeSubscriptions: i } = n,
      s = o.get(e);
    if (s && r && s !== r.nodeDeps.get(e)) return;
    o.set(e, t);
    let l = s == null ? t : Hi(t, s);
    for (let a of l) i.has(a) || i.set(a, new Set()), _e(i.get(a)).add(e);
    if (s) {
      let a = Hi(s, t);
      for (let u of a) {
        if (!i.has(u)) return;
        let f = _e(i.get(u));
        f.delete(e), f.size === 0 && i.delete(u);
      }
    }
  }
  function Z1(e, t, n, r) {
    var o, i, s, l;
    let a = n.getState();
    r === a.currentTree.version ||
      r === ((o = a.nextTree) === null || o === void 0 ? void 0 : o.version) ||
      r ===
        ((i = a.previousTree) === null || i === void 0 ? void 0 : i.version) ||
      tt(
        'Tried to save dependencies to a discar\
ded tree',
      );
    let u = n.getGraph(r);
    if (
      (pf(e, t, u),
      r ===
        ((s = a.previousTree) === null || s === void 0 ? void 0 : s.version))
    ) {
      let p = n.getGraph(a.currentTree.version);
      pf(e, t, p, u);
    }
    if (
      r ===
        ((l = a.previousTree) === null || l === void 0 ? void 0 : l.version) ||
      r === a.currentTree.version
    ) {
      var f;
      let p = (f = a.nextTree) === null || f === void 0 ? void 0 : f.version;
      if (p !== void 0) {
        let m = n.getGraph(p);
        pf(e, t, m, u);
      }
    }
  }
  var Xi = { cloneGraph: Y1, graph: Q1, saveDepsToStore: Z1 },
    X1 = 0,
    q1 = () => X1++,
    J1 = 0,
    eE = () => J1++,
    tE = 0,
    nE = () => tE++,
    na = {
      getNextTreeStateVersion: q1,
      getNextStoreID: eE,
      getNextComponentID: nE,
    },
    { persistentMap: fv } = W1,
    { graph: rE } = Xi,
    { getNextTreeStateVersion: $v } = na;
  function Uv() {
    let e = $v();
    return {
      version: e,
      stateID: e,
      transactionMetadata: {},
      dirtyAtoms: new Set(),
      atomValues: fv(),
      nonvalidatedAtoms: fv(),
    };
  }
  function oE() {
    let e = Uv();
    return {
      currentTree: e,
      nextTree: null,
      previousTree: null,
      commitDepth: 0,
      knownAtoms: new Set(),
      knownSelectors: new Set(),
      transactionSubscriptions: new Map(),
      nodeTransactionSubscriptions: new Map(),
      nodeToComponentSubscriptions: new Map(),
      queuedComponentCallbacks_DEPRECATED: [],
      suspendedComponentResolvers: new Set(),
      graphsByVersion: new Map().set(e.version, rE()),
      retention: {
        referenceCounts: new Map(),
        nodesRetainedByZone: new Map(),
        retainablesToCheckForRelease: new Set(),
      },
      nodeCleanupFunctions: new Map(),
    };
  }
  var bv = {
      makeEmptyTreeState: Uv,
      makeEmptyStoreState: oE,
      getNextTreeStateVersion: $v,
    },
    Gl = class {};
  function iE() {
    return new Gl();
  }
  var ra = { RetentionZone: Gl, retentionZone: iE };
  function sE(e, t) {
    let n = new Set(e);
    return n.add(t), n;
  }
  function lE(e, t) {
    let n = new Set(e);
    return n.delete(t), n;
  }
  function aE(e, t, n) {
    let r = new Map(e);
    return r.set(t, n), r;
  }
  function uE(e, t, n) {
    let r = new Map(e);
    return r.set(t, n(r.get(t))), r;
  }
  function cE(e, t) {
    let n = new Map(e);
    return n.delete(t), n;
  }
  function fE(e, t) {
    let n = new Map(e);
    return t.forEach((r) => n.delete(r)), n;
  }
  var Fv = {
    setByAddingToSet: sE,
    setByDeletingFromSet: lE,
    mapBySettingInMap: aE,
    mapByUpdatingInMap: uE,
    mapByDeletingFromMap: cE,
    mapByDeletingMultipleFromMap: fE,
  };
  function* dE(e, t) {
    let n = 0;
    for (let r of e) t(r, n++) && (yield r);
  }
  var Ff = dE;
  function pE(e, t) {
    return new Proxy(e, {
      get: (r, o) => (!(o in r) && o in t && (r[o] = t[o]()), r[o]),
      ownKeys: (r) => Object.keys(r),
    });
  }
  var zv = pE,
    { getNode: qi, getNodeMaybe: hE, recoilValuesForKeys: dv } = ct,
    { RetentionZone: pv } = ra,
    { setByAddingToSet: mE } = Fv,
    vE = Object.freeze(new Set()),
    Tf = class extends Error {};
  function yE(e, t, n) {
    if (!se('recoil_memory_managament_2020')) return () => {};
    let { nodesRetainedByZone: r } = e.getState().retention;
    function o(i) {
      let s = r.get(i);
      s || r.set(i, (s = new Set())), s.add(t);
    }
    if (n instanceof pv) o(n);
    else if (Array.isArray(n)) for (let i of n) o(i);
    return () => {
      if (
        !se(
          'recoil_\
memory_managament_2020',
        )
      )
        return;
      let { retention: i } = e.getState();
      function s(l) {
        let a = i.nodesRetainedByZone.get(l);
        a?.delete(t), a && a.size === 0 && i.nodesRetainedByZone.delete(l);
      }
      if (n instanceof pv) s(n);
      else if (Array.isArray(n)) for (let l of n) s(l);
    };
  }
  function zf(e, t, n, r) {
    let o = e.getState();
    if (o.nodeCleanupFunctions.has(n)) return;
    let i = qi(n),
      s = yE(e, n, i.retainedBy),
      l = i.init(e, t, r);
    o.nodeCleanupFunctions.set(n, () => {
      l(), s();
    });
  }
  function gE(e, t, n) {
    zf(e, e.getState().currentTree, t, n);
  }
  function SE(e, t) {
    var n;
    let r = e.getState();
    (n = r.nodeCleanupFunctions.get(t)) === null || n === void 0 || n(),
      r.nodeCleanupFunctions.delete(t);
  }
  function _E(e, t, n) {
    return zf(e, t, n, 'get'), qi(n).get(e, t);
  }
  function Bv(e, t, n) {
    return qi(n).peek(e, t);
  }
  function EE(e, t, n) {
    var r;
    let o = hE(t);
    return (
      o == null || (r = o.invalidate) === null || r === void 0 || r.call(o, e),
      {
        ...e,
        atomValues: e.atomValues.clone().delete(t),
        nonvalidatedAtoms: e.nonvalidatedAtoms.clone().set(t, n),
        dirtyAtoms: mE(e.dirtyAtoms, t),
      }
    );
  }
  function wE(e, t, n, r) {
    let o = qi(n);
    if (o.set == null)
      throw new Tf(`A\
ttempt to set read-only RecoilValue: ${n}`);
    let i = o.set;
    return zf(e, t, n, 'set'), i(e, t, r);
  }
  function TE(e, t, n) {
    let r = e.getState(),
      o = e.getGraph(t.version),
      i = qi(n).nodeType;
    return zv(
      { type: i },
      {
        loadable: () => Bv(e, t, n),
        isActive: () => r.knownAtoms.has(n) || r.knownSelectors.has(n),
        isSet: () => (i === 'selector' ? !1 : t.atomValues.has(n)),
        isModified: () => t.dirtyAtoms.has(n),
        deps: () => {
          var s;
          return dv((s = o.nodeDeps.get(n)) !== null && s !== void 0 ? s : []);
        },
        subscribers: () => {
          var s, l;
          return {
            nodes: dv(Ff(jv(e, t, new Set([n])), (a) => a !== n)),
            components: ta(
              (s =
                (l = r.nodeToComponentSubscriptions.get(n)) === null ||
                l === void 0
                  ? void 0
                  : l.values()) !== null && s !== void 0
                ? s
                : [],
              ([a]) => ({ name: a }),
            ),
          };
        },
      },
    );
  }
  function jv(e, t, n) {
    let r = new Set(),
      o = Array.from(n),
      i = e.getGraph(t.version);
    for (let l = o.pop(); l; l = o.pop()) {
      var s;
      r.add(l);
      let a =
        (s = i.nodeToNodeSubscriptions.get(l)) !== null && s !== void 0
          ? s
          : vE;
      for (let u of a) r.has(u) || o.push(u);
    }
    return r;
  }
  var Yn = {
      getNodeLoadable: _E,
      peekNodeLoadable: Bv,
      setNodeValue: wE,
      initializeNode: gE,
      cleanUpNode: SE,
      setUnvalidatedAtomValue_DEPRECATED: EE,
      peekNodeInfo: TE,
      getDownstreamNodes: jv,
    },
    Hv = null;
  function RE(e) {
    Hv = e;
  }
  function xE() {
    var e;
    (e = Hv) === null || e === void 0 || e();
  }
  var Wv = {
      setInvalidateMemoizedSnapshot: RE,
      invalidateMemoizedSnapshot: xE,
    },
    { getDownstreamNodes: NE, getNodeLoadable: Gv, setNodeValue: AE } = Yn,
    { getNextComponentID: CE } = na,
    { getNode: LE, getNodeMaybe: Kv } = ct,
    { DefaultValue: Bf } = ct,
    { reactMode: kE } = xo,
    {
      AbstractRecoilValue: IE,
      RecoilState: PE,
      RecoilValueReadOnly: OE,
      isRecoilValue: DE,
    } = Tr,
    { invalidateMemoizedSnapshot: ME } = Wv;
  function VE(e, { key: t }, n = e.getState().currentTree) {
    var r, o;
    let i = e.getState();
    n.version === i.currentTree.version ||
      n.version ===
        ((r = i.nextTree) === null || r === void 0 ? void 0 : r.version) ||
      n.version ===
        ((o = i.previousTree) === null || o === void 0 ? void 0 : o.version) ||
      tt('Tried to read from a discarded tree');
    let s = Gv(e, n, t);
    return s.state === 'loading' && s.contents.catch(() => {}), s;
  }
  function $E(e, t) {
    let n = e.clone();
    return (
      t.forEach((r, o) => {
        r.state === 'hasValue' && r.contents instanceof Bf
          ? n.delete(o)
          : n.set(o, r);
      }),
      n
    );
  }
  function UE(e, t, { key: n }, r) {
    if (
      typeof r ==
      'fun\
ction'
    ) {
      let o = Gv(e, t, n);
      if (o.state === 'loading') {
        let i = `Tried to set atom or selector "${n}" using an updater function while the current state is pending, this is not currently supported.`;
        throw (tt(i), Q(i));
      } else if (o.state === 'hasError') throw o.contents;
      return r(o.contents);
    } else return r;
  }
  function bE(e, t, n) {
    if (n.type === 'set') {
      let { recoilValue: o, valueOrUpdater: i } = n,
        s = UE(e, t, o, i),
        l = AE(e, t, o.key, s);
      for (let [a, u] of l.entries()) Rf(t, a, u);
    } else if (n.type === 'setLoadable') {
      let {
        recoilValue: { key: o },
        loadable: i,
      } = n;
      Rf(t, o, i);
    } else if (n.type === 'markModified') {
      let {
        recoilValue: { key: o },
      } = n;
      t.dirtyAtoms.add(o);
    } else if (n.type === 'setUnvalidated') {
      var r;
      let {
          recoilValue: { key: o },
          unvalidatedValue: i,
        } = n,
        s = Kv(o);
      s == null || (r = s.invalidate) === null || r === void 0 || r.call(s, t),
        t.atomValues.delete(o),
        t.nonvalidatedAtoms.set(o, i),
        t.dirtyAtoms.add(o);
    } else tt(`Unknown action ${n.type}`);
  }
  function Rf(e, t, n) {
    n.state === 'hasValue' && n.contents instanceof Bf
      ? e.atomValues.delete(t)
      : e.atomValues.set(t, n),
      e.dirtyAtoms.add(t),
      e.nonvalidatedAtoms.delete(t);
  }
  function Qv(e, t) {
    e.replaceState((n) => {
      let r = Yv(n);
      for (let o of t) bE(e, r, o);
      return Zv(e, r), ME(), r;
    });
  }
  function oa(e, t) {
    if (Wi.length) {
      let n = Wi[Wi.length - 1],
        r = n.get(e);
      r || n.set(e, (r = [])), r.push(t);
    } else Qv(e, [t]);
  }
  var Wi = [];
  function FE() {
    let e = new Map();
    return (
      Wi.push(e),
      () => {
        for (let [n, r] of e) Qv(n, r);
        Wi.pop() !== e && tt('Incorrect order of batch popping');
      }
    );
  }
  function Yv(e) {
    return {
      ...e,
      atomValues: e.atomValues.clone(),
      nonvalidatedAtoms: e.nonvalidatedAtoms.clone(),
      dirtyAtoms: new Set(e.dirtyAtoms),
    };
  }
  function Zv(e, t) {
    let n = NE(e, t, t.dirtyAtoms);
    for (let i of n) {
      var r, o;
      (r = Kv(i)) === null ||
        r === void 0 ||
        (o = r.invalidate) === null ||
        o === void 0 ||
        o.call(r, t);
    }
  }
  function Xv(e, t, n) {
    oa(e, { type: 'set', recoilValue: t, valueOrUpdater: n });
  }
  function zE(e, t, n) {
    if (n instanceof Bf) return Xv(e, t, n);
    oa(e, { type: 'setLoadable', recoilValue: t, loadable: n });
  }
  function BE(e, t) {
    oa(e, { type: 'markModified', recoilValue: t });
  }
  function jE(e, t, n) {
    oa(e, { type: 'setUnvalidated', recoilValue: t, unvalidatedValue: n });
  }
  function HE(e, { key: t }, n, r = null) {
    let o = CE(),
      i = e.getState();
    i.nodeToComponentSubscriptions.has(t) ||
      i.nodeToComponentSubscriptions.set(t, new Map()),
      _e(i.nodeToComponentSubscriptions.get(t)).set(o, [
        r ?? '<not captured>',
        n,
      ]);
    let s = kE();
    if (s.early && (s.mode === 'LEGACY' || s.mode === 'MUTABLE_SOURCE')) {
      let l = e.getState().nextTree;
      l && l.dirtyAtoms.has(t) && n(l);
    }
    return {
      release: () => {
        let l = e.getState(),
          a = l.nodeToComponentSubscriptions.get(t);
        if (a === void 0 || !a.has(o)) {
          tt(
            `Subscription missing at release time for atom ${t}. This is a bug in Recoil.`,
          );
          return;
        }
        a.delete(o), a.size === 0 && l.nodeToComponentSubscriptions.delete(t);
      },
    };
  }
  function WE(e, t) {
    var n;
    let { currentTree: r } = e.getState(),
      o = LE(t.key);
    (n = o.clearCache) === null || n === void 0 || n.call(o, e, r);
  }
  var nn = {
    RecoilValueReadOnly: OE,
    AbstractRecoilValue: IE,
    RecoilState: PE,
    getRecoilValueAsLoadable: VE,
    setRecoilValue: Xv,
    setRecoilValueLoadable: zE,
    markRecoilValueModified: BE,
    setUnvalidatedRecoilValue: jE,
    subscribeToRecoilValue: HE,
    isRecoilValue: DE,
    applyAtomValueWrites: $E,
    batchStart: FE,
    writeLoadableToTreeState: Rf,
    invalidateDownstreams: Zv,
    copyTreeState: Yv,
    refreshRecoilValue: WE,
  };
  function GE(e, t, n) {
    let r = e.entries(),
      o = r.next();
    for (; !o.done; ) {
      let i = o.value;
      if (t.call(n, i[1], i[0], e)) return !0;
      o = r.next();
    }
    return !1;
  }
  var KE = GE,
    { cleanUpNode: QE } = Yn,
    { deleteNodeConfigIfPossible: YE, getNode: qv } = ct,
    { RetentionZone: Jv } = ra,
    ZE = 12e4,
    ey = new Set();
  function ty(e, t) {
    let n = e.getState(),
      r = n.currentTree;
    if (n.nextTree) {
      tt(
        'releaseNodesNowOnCurrentTree should only be called at the end of a batch',
      );
      return;
    }
    let o = new Set();
    for (let s of t)
      if (s instanceof Jv) for (let l of ew(n, s)) o.add(l);
      else o.add(s);
    let i = XE(e, o);
    for (let s of i) JE(e, r, s);
  }
  function XE(e, t) {
    let n = e.getState(),
      r = n.currentTree,
      o = e.getGraph(r.version),
      i = new Set(),
      s = new Set();
    return l(t), i;
    function l(a) {
      let u = new Set(),
        f = qE(e, r, a, i, s);
      for (let y of f) {
        var p;
        if (qv(y).retainedBy === 'recoilRoot') {
          s.add(y);
          continue;
        }
        if (
          ((p = n.retention.referenceCounts.get(y)) !== null && p !== void 0
            ? p
            : 0) > 0
        ) {
          s.add(y);
          continue;
        }
        if (ny(y).some((U) => n.retention.referenceCounts.get(U))) {
          s.add(y);
          continue;
        }
        let w = o.nodeToNodeSubscriptions.get(y);
        if (w && KE(w, (U) => s.has(U))) {
          s.add(y);
          continue;
        }
        i.add(y), u.add(y);
      }
      let m = new Set();
      for (let y of u)
        for (let w of (S = o.nodeDeps.get(y)) !== null && S !== void 0
          ? S
          : ey) {
          var S;
          i.has(w) || m.add(w);
        }
      m.size && l(m);
    }
  }
  function qE(e, t, n, r, o) {
    let i = e.getGraph(t.version),
      s = [],
      l = new Set();
    for (; n.size > 0; ) a(_e(n.values().next().value));
    return s;
    function a(u) {
      if (r.has(u) || o.has(u)) {
        n.delete(u);
        return;
      }
      if (l.has(u)) return;
      let f = i.nodeToNodeSubscriptions.get(u);
      if (f) for (let p of f) a(p);
      l.add(u), n.delete(u), s.push(u);
    }
  }
  function JE(e, t, n) {
    if (
      !se(
        'recoil_memory_mana\
gament_2020',
      )
    )
      return;
    QE(e, n);
    let r = e.getState();
    r.knownAtoms.delete(n),
      r.knownSelectors.delete(n),
      r.nodeTransactionSubscriptions.delete(n),
      r.retention.referenceCounts.delete(n);
    let o = ny(n);
    for (let a of o) {
      var i;
      (i = r.retention.nodesRetainedByZone.get(a)) === null ||
        i === void 0 ||
        i.delete(n);
    }
    t.atomValues.delete(n),
      t.dirtyAtoms.delete(n),
      t.nonvalidatedAtoms.delete(n);
    let s = r.graphsByVersion.get(t.version);
    if (s) {
      let a = s.nodeDeps.get(n);
      if (a !== void 0) {
        s.nodeDeps.delete(n);
        for (let u of a) {
          var l;
          (l = s.nodeToNodeSubscriptions.get(u)) === null ||
            l === void 0 ||
            l.delete(n);
        }
      }
      s.nodeToNodeSubscriptions.delete(n);
    }
    YE(n);
  }
  function ew(e, t) {
    var n;
    return (n = e.retention.nodesRetainedByZone.get(t)) !== null && n !== void 0
      ? n
      : ey;
  }
  function ny(e) {
    let t = qv(e).retainedBy;
    return t === void 0 || t === 'components' || t === 'recoilRoot'
      ? []
      : t instanceof Jv
      ? [t]
      : t;
  }
  function tw(e, t) {
    let n = e.getState();
    n.nextTree
      ? n.retention.retainablesToCheckForRelease.add(t)
      : ty(e, new Set([t]));
  }
  function nw(e, t, n) {
    var r;
    if (!se('recoil_memory_managament_2020')) return;
    let o = e.getState().retention.referenceCounts,
      i = ((r = o.get(t)) !== null && r !== void 0 ? r : 0) + n;
    i === 0 ? ry(e, t) : o.set(t, i);
  }
  function ry(e, t) {
    if (!se('recoil_memory_managament_2020')) return;
    e.getState().retention.referenceCounts.delete(t), tw(e, t);
  }
  function rw(e) {
    if (!se('recoil_memory_managament_2020')) return;
    let t = e.getState();
    ty(e, t.retention.retainablesToCheckForRelease),
      t.retention.retainablesToCheckForRelease.clear();
  }
  function ow(e) {
    return e === void 0 ? 'recoilRoot' : e;
  }
  var Nr = {
      SUSPENSE_TIMEOUT_MS: ZE,
      updateRetainCount: nw,
      updateRetainCountToZero: ry,
      releaseScheduledRetainablesNow: rw,
      retainedByOptionWithDefault: ow,
    },
    { unstable_batchedUpdates: iw } = Pv.default,
    sw = { unstable_batchedUpdates: iw },
    { unstable_batchedUpdates: lw } = sw,
    aw = { unstable_batchedUpdates: lw },
    { batchStart: uw } = nn,
    { unstable_batchedUpdates: cw } = aw,
    jf = cw || ((e) => e()),
    fw = (e) => {
      jf = e;
    },
    dw = () => jf,
    pw = (e) => {
      jf(() => {
        let t = () => {};
        try {
          (t = uw()), e();
        } finally {
          t();
        }
      });
    },
    ia = { getBatcher: dw, setBatcher: fw, batchUpdates: pw };
  function* hw(e) {
    for (let t of e) for (let n of t) yield n;
  }
  var oy = hw,
    iy =
      typeof Window > 'u' ||
      typeof window >
        '\
u',
    mw = (e) => !iy && (e === window || e instanceof Window),
    vw = typeof navigator < 'u' && navigator.product === 'ReactNative',
    Ji = { isSSR: iy, isReactNative: vw, isWindow: mw };
  function yw(e, t) {
    let n;
    return (...r) => {
      n || (n = {});
      let o = t(...r);
      return Object.hasOwnProperty.call(n, o) || (n[o] = e(...r)), n[o];
    };
  }
  function gw(e, t) {
    let n, r;
    return (...o) => {
      let i = t(...o);
      return n === i || ((n = i), (r = e(...o))), r;
    };
  }
  function Sw(e, t) {
    let n, r;
    return [
      (...s) => {
        let l = t(...s);
        return n === l || ((n = l), (r = e(...s))), r;
      },
      () => {
        n = null;
      },
    ];
  }
  var _w = {
      memoizeWithArgsHash: yw,
      memoizeOneWithArgsHash: gw,
      memoizeOneWithArgsHashAndInvalidation: Sw,
    },
    { batchUpdates: xf } = ia,
    { initializeNode: Ew, peekNodeInfo: ww } = Yn,
    { graph: Tw } = Xi,
    { getNextStoreID: Rw } = na,
    { DEFAULT_VALUE: xw, recoilValues: hv, recoilValuesForKeys: mv } = ct,
    {
      AbstractRecoilValue: Nw,
      getRecoilValueAsLoadable: Aw,
      setRecoilValue: vv,
      setUnvalidatedRecoilValue: Cw,
    } = nn,
    { updateRetainCount: Ul } = Nr,
    { setInvalidateMemoizedSnapshot: Lw } = Wv,
    { getNextTreeStateVersion: kw, makeEmptyStoreState: Iw } = bv,
    { isSSR: Pw } = Ji,
    { memoizeOneWithArgsHashAndInvalidation: Ow } = _w;
  var _o = class {
    constructor(t, n) {
      K(this, '_store', void 0),
        K(this, '_refCount', 1),
        K(
          this,
          'getLoadable',
          (r) => (this.checkRefCount_INTERNAL(), Aw(this._store, r)),
        ),
        K(
          this,
          'getPromise',
          (r) => (
            this.checkRefCount_INTERNAL(), this.getLoadable(r).toPromise()
          ),
        ),
        K(this, 'getNodes_UNSTABLE', (r) => {
          if ((this.checkRefCount_INTERNAL(), r?.isModified === !0)) {
            if (r?.isInitialized === !1) return [];
            let s = this._store.getState().currentTree;
            return mv(s.dirtyAtoms);
          }
          let o = this._store.getState().knownAtoms,
            i = this._store.getState().knownSelectors;
          return r?.isInitialized == null
            ? hv.values()
            : r.isInitialized === !0
            ? mv(oy([o, i]))
            : Ff(hv.values(), ({ key: s }) => !o.has(s) && !i.has(s));
        }),
        K(
          this,
          'getInfo_UNSTABLE',
          ({ key: r }) => (
            this.checkRefCount_INTERNAL(),
            ww(this._store, this._store.getState().currentTree, r)
          ),
        ),
        K(this, 'map', (r) => {
          this.checkRefCount_INTERNAL();
          let o = new Qi(this, xf);
          return r(o), o;
        }),
        K(this, 'asyncMap', async (r) => {
          this.checkRefCount_INTERNAL();
          let o = new Qi(this, xf);
          return o.retain(), await r(o), o.autoRelease_INTERNAL(), o;
        }),
        (this._store = {
          storeID: Rw(),
          parentStoreID: n,
          getState: () => t,
          replaceState: (r) => {
            t.currentTree = r(t.currentTree);
          },
          getGraph: (r) => {
            let o = t.graphsByVersion;
            if (o.has(r)) return _e(o.get(r));
            let i = Tw();
            return o.set(r, i), i;
          },
          subscribeToTransactions: () => ({ release: () => {} }),
          addTransactionMetadata: () => {
            throw Q('Cannot subscribe to Snapshots');
          },
        });
      for (let r of this._store.getState().knownAtoms)
        Ew(this._store, r, 'get'), Ul(this._store, r, 1);
      this.autoRelease_INTERNAL();
    }
    retain() {
      this._refCount <= 0 &&
        tt('Attempt to retain() Snapshot that was already released.'),
        this._refCount++;
      let t = !1;
      return () => {
        t || ((t = !0), this._release());
      };
    }
    autoRelease_INTERNAL() {
      Pw || window.setTimeout(() => this._release(), 10);
    }
    _release() {
      if ((this._refCount--, this._refCount === 0)) {
        if (
          (this._store.getState().nodeCleanupFunctions.forEach((t) => t()),
          this._store.getState().nodeCleanupFunctions.clear(),
          !se('recoil_memory_managament_2020'))
        )
          return;
      } else this._refCount < 0;
    }
    isRetained() {
      return this._refCount > 0;
    }
    checkRefCount_INTERNAL() {
      se('recoil_memory_managament_2020') && this._refCount <= 0;
    }
    getStore_INTERNAL() {
      return this.checkRefCount_INTERNAL(), this._store;
    }
    getID() {
      return (
        this.checkRefCount_INTERNAL(),
        this._store.getState().currentTree.stateID
      );
    }
    getStoreID() {
      return this.checkRefCount_INTERNAL(), this._store.storeID;
    }
  };
  function sy(e, t, n = !1) {
    let r = e.getState(),
      o = n ? kw() : t.version;
    return {
      currentTree: {
        version: n ? o : t.version,
        stateID: n ? o : t.stateID,
        transactionMetadata: { ...t.transactionMetadata },
        dirtyAtoms: new Set(t.dirtyAtoms),
        atomValues: t.atomValues.clone(),
        nonvalidatedAtoms: t.nonvalidatedAtoms.clone(),
      },
      commitDepth: 0,
      nextTree: null,
      previousTree: null,
      knownAtoms: new Set(r.knownAtoms),
      knownSelectors: new Set(r.knownSelectors),
      transactionSubscriptions: new Map(),
      nodeTransactionSubscriptions: new Map(),
      nodeToComponentSubscriptions: new Map(),
      queuedComponentCallbacks_DEPRECATED: [],
      suspendedComponentResolvers: new Set(),
      graphsByVersion: new Map().set(o, e.getGraph(t.version)),
      retention: {
        referenceCounts: new Map(),
        nodesRetainedByZone: new Map(),
        retainablesToCheckForRelease: new Set(),
      },
      nodeCleanupFunctions: new Map(
        ta(r.nodeCleanupFunctions.entries(), ([i]) => [i, () => {}]),
      ),
    };
  }
  function Dw(e) {
    let t = new _o(Iw());
    return e != null ? t.map(e) : t;
  }
  var [yv, ly] = Ow(
    (e, t) => {
      var n;
      let r = e.getState(),
        o =
          t === 'latest'
            ? (n = r.nextTree) !== null && n !== void 0
              ? n
              : r.currentTree
            : _e(r.previousTree);
      return new _o(sy(e, o), e.storeID);
    },
    (e, t) => {
      var n, r;
      return (
        String(t) +
        String(e.storeID) +
        String(
          (n = e.getState().nextTree) === null || n === void 0
            ? void 0
            : n.version,
        ) +
        String(e.getState().currentTree.version) +
        String(
          (r = e.getState().previousTree) === null || r === void 0
            ? void 0
            : r.version,
        )
      );
    },
  );
  Lw(ly);
  function Mw(e, t = 'latest') {
    let n = yv(e, t);
    return n.isRetained() ? n : (ly(), yv(e, t));
  }
  var Qi = class extends _o {
      constructor(t, n) {
        super(
          sy(
            t.getStore_INTERNAL(),
            t.getStore_INTERNAL().getState().currentTree,
            !0,
          ),
          t.getStoreID(),
        ),
          K(this, '_batch', void 0),
          K(this, 'set', (r, o) => {
            this.checkRefCount_INTERNAL();
            let i = this.getStore_INTERNAL();
            this._batch(() => {
              Ul(i, r.key, 1), vv(this.getStore_INTERNAL(), r, o);
            });
          }),
          K(this, 'reset', (r) => {
            this.checkRefCount_INTERNAL();
            let o = this.getStore_INTERNAL();
            this._batch(() => {
              Ul(o, r.key, 1), vv(this.getStore_INTERNAL(), r, xw);
            });
          }),
          K(
            this,
            'se\
tUnvalidatedAtomValues_DEPRECATED',
            (r) => {
              this.checkRefCount_INTERNAL();
              let o = this.getStore_INTERNAL();
              xf(() => {
                for (let [i, s] of r.entries())
                  Ul(o, i, 1), Cw(o, new Nw(i), s);
              });
            },
          ),
          (this._batch = n);
      }
    },
    sa = {
      Snapshot: _o,
      MutableSnapshot: Qi,
      freshSnapshot: Dw,
      cloneSnapshot: Mw,
    },
    Vw = sa.Snapshot,
    $w = sa.MutableSnapshot,
    Uw = sa.freshSnapshot,
    bw = sa.cloneSnapshot,
    la = Object.freeze({
      __proto__: null,
      Snapshot: Vw,
      MutableSnapshot: $w,
      freshSnapshot: Uw,
      cloneSnapshot: bw,
    });
  function Fw(...e) {
    let t = new Set();
    for (let n of e) for (let r of n) t.add(r);
    return t;
  }
  var zw = Fw,
    { useRef: Bw } = me.default;
  function jw(e) {
    let t = Bw(e);
    return t.current === e && typeof e == 'function' && (t.current = e()), t;
  }
  var gv = jw,
    { getNextTreeStateVersion: Hw, makeEmptyStoreState: ay } = bv,
    {
      cleanUpNode: Ww,
      getDownstreamNodes: Gw,
      initializeNode: Kw,
      setNodeValue: Qw,
      setUnvalidatedAtomValue_DEPRECATED: Yw,
    } = Yn,
    { graph: Zw } = Xi,
    { cloneGraph: Xw } = Xi,
    { getNextStoreID: uy } = na,
    { createMutableSource: hf, reactMode: cy } = xo,
    { applyAtomValueWrites: qw } = nn,
    { releaseScheduledRetainablesNow: fy } = Nr,
    { freshSnapshot: Jw } = la,
    {
      useCallback: eT,
      useContext: dy,
      useEffect: Nf,
      useMemo: tT,
      useRef: nT,
      useState: rT,
    } = me.default;
  function Ui() {
    throw Q('This component must be used inside a <RecoilRoot> component.');
  }
  var py = Object.freeze({
      storeID: uy(),
      getState: Ui,
      replaceState: Ui,
      getGraph: Ui,
      subscribeToTransactions: Ui,
      addTransactionMetadata: Ui,
    }),
    Af = !1;
  function Sv(e) {
    if (Af)
      throw Q(
        'An atom update was triggered within the execution of a state updater function. State updater functions provided to Recoil must be pure functions.',
      );
    let t = e.getState();
    if (t.nextTree === null) {
      se('recoil_memory_managament_2020') &&
        se('recoil_release_on_cascading_update_killswitch_2021') &&
        t.commitDepth > 0 &&
        fy(e);
      let n = t.currentTree.version,
        r = Hw();
      (t.nextTree = {
        ...t.currentTree,
        version: r,
        stateID: r,
        dirtyAtoms: new Set(),
        transactionMetadata: {},
      }),
        t.graphsByVersion.set(r, Xw(_e(t.graphsByVersion.get(n))));
    }
  }
  var hy = me.default.createContext({ current: py }),
    aa = () => dy(hy),
    my = me.default.createContext(null);
  function oT() {
    let e = dy(my);
    return (
      e == null &&
        $f(
          'Attempted to use a Recoil hook outside of a <Reco\
ilRoot>. <RecoilRoot> must be an ancestor of any component that uses Recoil hooks.',
        ),
      e
    );
  }
  function Hf(e, t, n) {
    let r = Gw(e, n, n.dirtyAtoms);
    for (let o of r) {
      let i = t.nodeToComponentSubscriptions.get(o);
      if (i) for (let [s, [l, a]] of i) a(n);
    }
  }
  function vy(e) {
    let t = e.getState(),
      n = t.currentTree,
      r = n.dirtyAtoms;
    if (r.size) {
      for (let [o, i] of t.nodeTransactionSubscriptions)
        if (r.has(o)) for (let [s, l] of i) l(e);
      for (let [o, i] of t.transactionSubscriptions) i(e);
      (!cy().early || t.suspendedComponentResolvers.size > 0) &&
        (Hf(e, t, n),
        t.suspendedComponentResolvers.forEach((o) => o()),
        t.suspendedComponentResolvers.clear());
    }
    t.queuedComponentCallbacks_DEPRECATED.forEach((o) => o(n)),
      t.queuedComponentCallbacks_DEPRECATED.splice(
        0,
        t.queuedComponentCallbacks_DEPRECATED.length,
      );
  }
  function iT(e) {
    let t = e.getState();
    t.commitDepth++;
    try {
      let { nextTree: n } = t;
      if (n == null) return;
      (t.previousTree = t.currentTree),
        (t.currentTree = n),
        (t.nextTree = null),
        vy(e),
        t.previousTree != null
          ? t.graphsByVersion.delete(t.previousTree.version)
          : tt(
              'Ended batch with no previous state, which is unexpected',
              'recoil',
            ),
        (t.previousTree = null),
        se('recoil_memory_managament_2020') && n == null && fy(e);
    } finally {
      t.commitDepth--;
    }
  }
  function sT({ setNotifyBatcherOfChange: e }) {
    let t = aa(),
      [, n] = rT([]);
    return (
      e(() => n({})),
      Nf(
        () => (
          e(() => n({})),
          () => {
            e(() => {});
          }
        ),
        [e],
      ),
      Nf(() => {
        F1.enqueueExecution('Batcher', () => {
          iT(t.current);
        });
      }),
      null
    );
  }
  function lT(e, t) {
    let n = ay();
    return (
      t({
        set: (r, o) => {
          let i = n.currentTree,
            s = Qw(e, i, r.key, o),
            l = new Set(s.keys()),
            a = i.nonvalidatedAtoms.clone();
          for (let u of l) a.delete(u);
          n.currentTree = {
            ...i,
            dirtyAtoms: zw(i.dirtyAtoms, l),
            atomValues: qw(i.atomValues, s),
            nonvalidatedAtoms: a,
          };
        },
        setUnvalidatedAtomValues: (r) => {
          r.forEach((o, i) => {
            n.currentTree = Yw(n.currentTree, i, o);
          });
        },
      }),
      n
    );
  }
  function aT(e) {
    let t = Jw(e),
      n = t.getStore_INTERNAL().getState();
    return (
      t.retain(),
      n.nodeCleanupFunctions.forEach((r) => r()),
      n.nodeCleanupFunctions.clear(),
      n
    );
  }
  var _v = 0;
  function uT({
    initializeState_DEPRECATED: e,
    initializeState: t,
    store_INTERNAL: n,
    children: r,
  }) {
    let o,
      i = (S) => {
        let y = o.current.graphsByVersion;
        if (y.has(S)) return _e(y.get(S));
        let w = Zw();
        return y.set(S, w), w;
      },
      s = (S, y) => {
        if (y == null) {
          let { transactionSubscriptions: w } = p.current.getState(),
            U = _v++;
          return (
            w.set(U, S),
            {
              release: () => {
                w.delete(U);
              },
            }
          );
        } else {
          let { nodeTransactionSubscriptions: w } = p.current.getState();
          w.has(y) || w.set(y, new Map());
          let U = _v++;
          return (
            _e(w.get(y)).set(U, S),
            {
              release: () => {
                let h = w.get(y);
                h && (h.delete(U), h.size === 0 && w.delete(y));
              },
            }
          );
        }
      },
      l = (S) => {
        Sv(p.current);
        for (let y of Object.keys(S))
          _e(p.current.getState().nextTree).transactionMetadata[y] = S[y];
      },
      a = (S) => {
        Sv(p.current);
        let y = _e(o.current.nextTree),
          w;
        try {
          (Af = !0), (w = S(y));
        } finally {
          Af = !1;
        }
        w !== y &&
          ((o.current.nextTree = w),
          cy().early && Hf(p.current, o.current, w),
          _e(u.current)());
      },
      u = nT(null),
      f = eT(
        (S) => {
          u.current = S;
        },
        [u],
      ),
      p = gv(
        () =>
          n ?? {
            storeID: uy(),
            getState: () => o.current,
            replaceState: a,
            getGraph: i,
            subscribeToTransactions: s,
            addTransactionMetadata: l,
          },
      );
    n != null && (p.current = n),
      (o = gv(() => (e != null ? lT(p.current, e) : t != null ? aT(t) : ay())));
    let m = tT(() => hf?.(o, () => o.current.currentTree.version), [o]);
    return (
      Nf(() => {
        let S = p.current;
        for (let y of new Set(S.getState().knownAtoms))
          Kw(
            S,
            y,
            'g\
et',
          );
        return () => {
          for (let y of S.getState().knownAtoms) Ww(S, y);
        };
      }, [p]),
      me.default.createElement(
        hy.Provider,
        { value: p },
        me.default.createElement(
          my.Provider,
          { value: m },
          me.default.createElement(sT, { setNotifyBatcherOfChange: f }),
          r,
        ),
      )
    );
  }
  function cT(e) {
    let { override: t, ...n } = e,
      r = aa();
    return t === !1 && r.current !== py
      ? e.children
      : me.default.createElement(uT, n);
  }
  function fT() {
    return aa().current.storeID;
  }
  var gn = {
    RecoilRoot: cT,
    useStoreRef: aa,
    useRecoilMutableSource: oT,
    useRecoilStoreID: fT,
    notifyComponents_FOR_TESTING: Hf,
    sendEndOfBatchNotifications_FOR_TESTING: vy,
  };
  function dT(e, t) {
    if (e === t) return !0;
    if (e.length !== t.length) return !1;
    for (let n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return !1;
    return !0;
  }
  var pT = dT,
    { useEffect: hT, useRef: mT } = me.default;
  function vT(e) {
    let t = mT();
    return (
      hT(() => {
        t.current = e;
      }),
      t.current
    );
  }
  var yy = vT,
    { useStoreRef: yT } = gn,
    { SUSPENSE_TIMEOUT_MS: gT } = Nr,
    { updateRetainCount: bi } = Nr,
    { RetentionZone: ST } = ra,
    { useEffect: _T, useRef: ET } = me.default,
    { isSSR: Ev } = Ji;
  function wT(e) {
    if (se('recoil_memory_managament_2020')) return TT(e);
  }
  function TT(e) {
    let n = (Array.isArray(e) ? e : [e]).map((s) =>
        s instanceof ST ? s : s.key,
      ),
      r = yT();
    _T(() => {
      if (!se('recoil_memory_managament_2020')) return;
      let s = r.current;
      if (o.current && !Ev) window.clearTimeout(o.current), (o.current = null);
      else for (let l of n) bi(s, l, 1);
      return () => {
        for (let l of n) bi(s, l, -1);
      };
    }, [r, ...n]);
    let o = ET(),
      i = yy(n);
    if (!Ev && (i === void 0 || !pT(i, n))) {
      let s = r.current;
      for (let l of n) bi(s, l, 1);
      if (i) for (let l of i) bi(s, l, -1);
      o.current && window.clearTimeout(o.current),
        (o.current = window.setTimeout(() => {
          o.current = null;
          for (let l of n) bi(s, l, -1);
        }, gT));
    }
  }
  var Wf = wT;
  function RT() {
    return '<component name not available>';
  }
  var es = RT,
    { batchUpdates: xT } = ia,
    { DEFAULT_VALUE: gy } = ct,
    {
      currentRendererSupportsUseSyncExternalStore: NT,
      reactMode: No,
      useMutableSource: AT,
      useSyncExternalStore: CT,
    } = xo,
    { useRecoilMutableSource: LT, useStoreRef: rn } = gn,
    { isRecoilValue: rL } = Tr,
    {
      AbstractRecoilValue: Cf,
      getRecoilValueAsLoadable: ts,
      setRecoilValue: Kl,
      setUnvalidatedRecoilValue: kT,
      subscribeToRecoilValue: Eo,
    } = nn,
    {
      useCallback: ut,
      useEffect: wo,
      useMemo: Sy,
      useRef: Gi,
      useState: Gf,
    } = me.default,
    { setByAddingToSet: IT } = Fv,
    { isSSR: PT } = Ji;
  function Kf(e, t, n) {
    if (e.state === 'hasValue') return e.contents;
    throw e.state === 'loading'
      ? new Promise((o) => {
          let i = n.current.getState().suspendedComponentResolvers;
          i.add(o),
            PT &&
              he(e.contents) &&
              e.contents.finally(() => {
                i.delete(o);
              });
        })
      : e.state === 'hasError'
      ? e.contents
      : Q(`Invalid value of loadable atom "${t.key}"`);
  }
  function OT() {
    let e = es(),
      t = rn(),
      [, n] = Gf([]),
      r = Gi(new Set());
    r.current = new Set();
    let o = Gi(new Set()),
      i = Gi(new Map()),
      s = ut(
        (a) => {
          let u = i.current.get(a);
          u && (u.release(), i.current.delete(a));
        },
        [i],
      ),
      l = ut((a, u) => {
        i.current.has(u) && n([]);
      }, []);
    return (
      wo(() => {
        let a = t.current;
        Hi(r.current, o.current).forEach((u) => {
          if (i.current.has(u)) {
            $f(`Double subscription to RecoilValue "${u}"`);
            return;
          }
          let f = Eo(a, new Cf(u), (m) => l(m, u), e);
          i.current.set(u, f),
            a.getState().nextTree
              ? a.getState().queuedComponentCallbacks_DEPRECATED.push(() => {
                  l(a.getState(), u);
                })
              : l(a.getState(), u);
        }),
          Hi(o.current, r.current).forEach((u) => {
            s(u);
          }),
          (o.current = r.current);
      }),
      wo(() => {
        let a = i.current;
        return (
          Hi(r.current, new Set(a.keys())).forEach((u) => {
            let f = Eo(t.current, new Cf(u), (p) => l(p, u), e);
            a.set(u, f);
          }),
          () => a.forEach((u, f) => s(f))
        );
      }, [e, t, s, l]),
      Sy(() => {
        function a(y) {
          return (w) => {
            Kl(t.current, y, w);
          };
        }
        function u(y) {
          return () => Kl(t.current, y, gy);
        }
        function f(y) {
          var w;
          r.current.has(y.key) || (r.current = IT(r.current, y.key));
          let U = t.current.getState();
          return ts(
            t.current,
            y,
            No().early && (w = U.nextTree) !== null && w !== void 0
              ? w
              : U.currentTree,
          );
        }
        function p(y) {
          let w = f(y);
          return Kf(w, y, t);
        }
        function m(y) {
          return [p(y), a(y)];
        }
        function S(y) {
          return [f(y), a(y)];
        }
        return {
          getRecoilValue: p,
          getRecoilValueLoadable: f,
          getRecoilState: m,
          getRecoilStateLoadable: S,
          getSetRecoilState: a,
          getResetRecoilState: u,
        };
      }, [r, t])
    );
  }
  var DT = { current: 0 };
  function MT(e) {
    let t = rn(),
      n = es(),
      r = ut(() => {
        var l;
        let a = t.current,
          u = a.getState(),
          f =
            No().early && (l = u.nextTree) !== null && l !== void 0
              ? l
              : u.currentTree;
        return { loadable: ts(a, e, f), key: e.key };
      }, [t, e]),
      o = ut((l) => {
        let a;
        return () => {
          var u, f;
          let p = l();
          return (u = a) !== null &&
            u !== void 0 &&
            u.loadable.is(p.loadable) &&
            ((f = a) === null || f === void 0 ? void 0 : f.key) === p.key
            ? a
            : ((a = p), p);
        };
      }, []),
      i = Sy(() => o(r), [r, o]),
      s = ut(
        (l) => {
          let a = t.current;
          return Eo(a, e, l, n).release;
        },
        [t, e, n],
      );
    return CT(s, i, i).loadable;
  }
  function VT(e) {
    let t = rn(),
      n = ut(() => {
        var u;
        let f = t.current,
          p = f.getState(),
          m =
            No().early && (u = p.nextTree) !== null && u !== void 0
              ? u
              : p.currentTree;
        return ts(f, e, m);
      }, [t, e]),
      r = ut(() => n(), [n]),
      o = es(),
      i = ut(
        (u, f) => {
          let p = t.current;
          return Eo(
            p,
            e,
            () => {
              if (!se('recoil_suppress_rerender_in_callback')) return f();
              let S = n();
              a.current.is(S) || f(), (a.current = S);
            },
            o,
          ).release;
        },
        [t, e, o, n],
      ),
      s = LT();
    if (s == null)
      throw Q(
        'Recoil hooks must be used in components contained within a <RecoilRoot> component.',
      );
    let l = AT(s, r, i),
      a = Gi(l);
    return (
      wo(() => {
        a.current = l;
      }),
      l
    );
  }
  function Lf(e) {
    let t = rn(),
      n = es(),
      r = ut(() => {
        var a;
        let u = t.current,
          f = u.getState(),
          p =
            No().early && (a = f.nextTree) !== null && a !== void 0
              ? a
              : f.currentTree;
        return ts(u, e, p);
      }, [t, e]),
      o = ut(() => ({ loadable: r(), key: e.key }), [r, e.key]),
      i = ut(
        (a) => {
          let u = o();
          return a.loadable.is(u.loadable) && a.key === u.key ? a : u;
        },
        [o],
      );
    wo(() => {
      let a = Eo(
        t.current,
        e,
        (u) => {
          l(i);
        },
        n,
      );
      return l(i), a.release;
    }, [n, e, t, i]);
    let [s, l] = Gf(o);
    return s.key !== e.key ? o().loadable : s.loadable;
  }
  function $T(e) {
    let t = rn(),
      [, n] = Gf([]),
      r = es(),
      o = ut(() => {
        var l;
        let a = t.current,
          u = a.getState(),
          f =
            No().early && (l = u.nextTree) !== null && l !== void 0
              ? l
              : u.currentTree;
        return ts(a, e, f);
      }, [t, e]),
      i = o(),
      s = Gi(i);
    return (
      wo(() => {
        s.current = i;
      }),
      wo(() => {
        let l = t.current,
          a = l.getState(),
          u = Eo(
            l,
            e,
            (p) => {
              var m;
              if (!se('recoil_suppress_rerender_in_callback')) return n([]);
              let S = o();
              ((m = s.current) !== null && m !== void 0 && m.is(S)) || n(S),
                (s.current = S);
            },
            r,
          );
        if (a.nextTree)
          l.getState().queuedComponentCallbacks_DEPRECATED.push(() => {
            (s.current = null), n([]);
          });
        else {
          var f;
          if (!se('recoil_suppress_rerender_in_callback')) return n([]);
          let p = o();
          ((f = s.current) !== null && f !== void 0 && f.is(p)) || n(p),
            (s.current = p);
        }
        return u.release;
      }, [r, o, e, t]),
      i
    );
  }
  function Qf(e) {
    return (
      se('recoil_memory_managament_2020') && Wf(e),
      {
        TRANSITION_SUPPORT: Lf,
        SYNC_EXTERNAL_STORE: NT() ? MT : Lf,
        MUTABLE_SOURCE: VT,
        LEGACY: $T,
      }[No().mode](e)
    );
  }
  function _y(e) {
    let t = rn(),
      n = Qf(e);
    return Kf(n, e, t);
  }
  function ua(e) {
    let t = rn();
    return ut(
      (n) => {
        Kl(t.current, e, n);
      },
      [t, e],
    );
  }
  function UT(e) {
    let t = rn();
    return ut(() => {
      Kl(t.current, e, gy);
    }, [t, e]);
  }
  function bT(e) {
    return [_y(e), ua(e)];
  }
  function FT(e) {
    return [Qf(e), ua(e)];
  }
  function zT() {
    let e = rn();
    return (t, n = {}) => {
      xT(() => {
        e.current.addTransactionMetadata(n),
          t.forEach((r, o) => kT(e.current, new Cf(o), r));
      });
    };
  }
  function Ey(e) {
    return (
      se(
        'recoil_memor\
y_managament_2020',
      ) && Wf(e),
      Lf(e)
    );
  }
  function wy(e) {
    let t = rn(),
      n = Ey(e);
    return Kf(n, e, t);
  }
  function BT(e) {
    return [wy(e), ua(e)];
  }
  var jT = {
    recoilComponentGetRecoilValueCount_FOR_TESTING: DT,
    useRecoilInterface: OT,
    useRecoilState: bT,
    useRecoilStateLoadable: FT,
    useRecoilValue: _y,
    useRecoilValueLoadable: Qf,
    useResetRecoilState: UT,
    useSetRecoilState: ua,
    useSetUnvalidatedAtomValues: zT,
    useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE: Ey,
    useRecoilValue_TRANSITION_SUPPORT_UNSTABLE: wy,
    useRecoilState_TRANSITION_SUPPORT_UNSTABLE: BT,
  };
  function HT(e, t) {
    let n = new Map();
    for (let [r, o] of e) t(o, r) && n.set(r, o);
    return n;
  }
  var WT = HT;
  function GT(e, t) {
    let n = new Set();
    for (let r of e) t(r) && n.add(r);
    return n;
  }
  var KT = GT;
  function QT(...e) {
    let t = new Map();
    for (let n = 0; n < e.length; n++) {
      let r = e[n].keys(),
        o;
      for (; !(o = r.next()).done; ) t.set(o.value, e[n].get(o.value));
    }
    return t;
  }
  var YT = QT,
    { batchUpdates: ZT } = ia,
    { DEFAULT_VALUE: XT, getNode: Ty, nodes: qT } = ct,
    { useStoreRef: Yf } = gn,
    { AbstractRecoilValue: JT, setRecoilValueLoadable: eR } = nn,
    { SUSPENSE_TIMEOUT_MS: tR } = Nr,
    { cloneSnapshot: Ql } = la,
    { useCallback: ca, useEffect: Ry, useRef: wv, useState: nR } = me.default,
    { isSSR: Tv } = Ji;
  function fa(e) {
    let t = Yf();
    Ry(() => t.current.subscribeToTransactions(e).release, [e, t]);
  }
  function Rv(e) {
    let t = e.atomValues.toMap(),
      n = Wl(
        WT(t, (r, o) => {
          let s = Ty(o).persistence_UNSTABLE;
          return s != null && s.type !== 'none' && r.state === 'hasValue';
        }),
        (r) => r.contents,
      );
    return YT(e.nonvalidatedAtoms.toMap(), n);
  }
  function rR(e) {
    fa(
      ca(
        (t) => {
          let n = t.getState().previousTree,
            r = t.getState().currentTree;
          n ||
            (tt(
              'Transaction subscribers notified without \
a previous tree being present -- this is a bug in Recoil',
            ),
            (n = t.getState().currentTree));
          let o = Rv(r),
            i = Rv(n),
            s = Wl(qT, (a) => {
              var u, f, p, m;
              return {
                persistence_UNSTABLE: {
                  type:
                    (u =
                      (f = a.persistence_UNSTABLE) === null || f === void 0
                        ? void 0
                        : f.type) !== null && u !== void 0
                      ? u
                      : 'none',
                  backButton:
                    (p =
                      (m = a.persistence_UNSTABLE) === null || m === void 0
                        ? void 0
                        : m.backButton) !== null && p !== void 0
                      ? p
                      : !1,
                },
              };
            }),
            l = KT(r.dirtyAtoms, (a) => o.has(a) || i.has(a));
          e({
            atomValues: o,
            previousAtomValues: i,
            atomInfo: s,
            modifiedAtoms: l,
            transactionMetadata: { ...r.transactionMetadata },
          });
        },
        [e],
      ),
    );
  }
  function oR(e) {
    fa(
      ca(
        (t) => {
          let n = Ql(t, 'latest'),
            r = Ql(t, 'previous');
          e({ snapshot: n, previousSnapshot: r });
        },
        [e],
      ),
    );
  }
  function iR() {
    let e = Yf(),
      [t, n] = nR(() => Ql(e.current)),
      r = yy(t),
      o = wv(),
      i = wv();
    if (
      (fa(ca((l) => n(Ql(l)), [])),
      Ry(() => {
        let l = t.retain();
        if (o.current && !Tv) {
          var a;
          window.clearTimeout(o.current),
            (o.current = null),
            (a = i.current) === null || a === void 0 || a.call(i),
            (i.current = null);
        }
        return () => {
          window.setTimeout(l, 10);
        };
      }, [t]),
      r !== t && !Tv)
    ) {
      if (o.current) {
        var s;
        window.clearTimeout(o.current),
          (o.current = null),
          (s = i.current) === null || s === void 0 || s.call(i),
          (i.current = null);
      }
      (i.current = t.retain()),
        (o.current = window.setTimeout(() => {
          var l;
          (o.current = null),
            (l = i.current) === null || l === void 0 || l.call(i),
            (i.current = null);
        }, tR));
    }
    return t;
  }
  function xy(e, t) {
    var n;
    let r = e.getState(),
      o = (n = r.nextTree) !== null && n !== void 0 ? n : r.currentTree,
      i = t.getStore_INTERNAL().getState().currentTree;
    ZT(() => {
      let s = new Set();
      for (let u of [o.atomValues.keys(), i.atomValues.keys()])
        for (let f of u) {
          var l, a;
          ((l = o.atomValues.get(f)) === null || l === void 0
            ? void 0
            : l.contents) !==
            ((a = i.atomValues.get(f)) === null || a === void 0
              ? void 0
              : a.contents) &&
            Ty(f).shouldRestoreFromSnapshots &&
            s.add(f);
        }
      s.forEach((u) => {
        eR(e, new JT(u), i.atomValues.has(u) ? _e(i.atomValues.get(u)) : XT);
      }),
        e.replaceState((u) => ({ ...u, stateID: t.getID() }));
    });
  }
  function sR() {
    let e = Yf();
    return ca((t) => xy(e.current, t), [e]);
  }
  var Ny = {
      useRecoilSnapshot: iR,
      gotoSnapshot: xy,
      useGotoRecoilSnapshot: sR,
      useRecoilTransactionObserver: oR,
      useTransactionObservation_DEPRECATED: rR,
      useTransactionSubscription_DEPRECATED: fa,
    },
    { peekNodeInfo: lR } = Yn,
    { useStoreRef: aR } = gn;
  function uR() {
    let e = aR();
    return ({ key: t }) => lR(e.current, e.current.getState().currentTree, t);
  }
  var cR = uR,
    { reactMode: fR } = xo,
    { RecoilRoot: dR, useStoreRef: pR } = gn,
    { useMemo: hR } = me.default;
  function mR() {
    fR().mode === 'MUTABLE_SOURCE' &&
      console.warn(
        'Warning: There are known issues using useRecoilBridgeAcrossReactRoots() in recoil_mutable_source rendering mode.  Please consider upgrading to recoil_sync_external_store mode.',
      );
    let e = pR().current;
    return hR(() => {
      function t({ children: n }) {
        return me.default.createElement(dR, { store_INTERNAL: e }, n);
      }
      return t;
    }, [e]);
  }
  var vR = mR,
    { loadableWithValue: yR } = Zi,
    { initializeNode: gR } = Yn,
    { DEFAULT_VALUE: SR, getNode: _R } = ct,
    {
      copyTreeState: ER,
      getRecoilValueAsLoadable: wR,
      invalidateDownstreams: TR,
      writeLoadableToTreeState: RR,
    } = nn;
  function xv(e) {
    return _R(e.key).nodeType === 'atom';
  }
  var kf = class {
    constructor(t, n) {
      K(this, '_store', void 0),
        K(this, '_treeState', void 0),
        K(this, '_changes', void 0),
        K(this, 'get', (r) => {
          if (this._changes.has(r.key)) return this._changes.get(r.key);
          if (!xv(r))
            throw Q(
              'Reading sel\
ectors within atomicUpdate is not supported',
            );
          let o = wR(this._store, r, this._treeState);
          if (o.state === 'hasValue') return o.contents;
          throw o.state === 'hasError'
            ? o.contents
            : Q(
                `Expected Recoil atom ${r.key} to have a value, but it is in a loading state.`,
              );
        }),
        K(this, 'set', (r, o) => {
          if (!xv(r))
            throw Q('Setting selectors within atomicUpdate is not supported');
          if (typeof o == 'function') {
            let i = this.get(r);
            this._changes.set(r.key, o(i));
          } else gR(this._store, r.key, 'set'), this._changes.set(r.key, o);
        }),
        K(this, 'reset', (r) => {
          this.set(r, SR);
        }),
        (this._store = t),
        (this._treeState = n),
        (this._changes = new Map());
    }
    newTreeState_INTERNAL() {
      if (this._changes.size === 0) return this._treeState;
      let t = ER(this._treeState);
      for (let [n, r] of this._changes) RR(t, n, yR(r));
      return TR(this._store, t), t;
    }
  };
  function xR(e) {
    return (t) => {
      e.replaceState((n) => {
        let r = new kf(e, n);
        return t(r), r.newTreeState_INTERNAL();
      });
    };
  }
  var NR = { atomicUpdater: xR },
    AR = NR.atomicUpdater,
    Ay = Object.freeze({ __proto__: null, atomicUpdater: AR });
  function CR(e, t) {
    if (!e) throw new Error(t);
  }
  var LR = CR,
    ji = LR,
    { atomicUpdater: kR } = Ay,
    { batchUpdates: IR } = ia,
    { DEFAULT_VALUE: PR } = ct,
    { useStoreRef: OR } = gn,
    { refreshRecoilValue: DR, setRecoilValue: Nv } = nn,
    { cloneSnapshot: MR } = la,
    { gotoSnapshot: VR } = Ny,
    { useCallback: $R } = me.default,
    Yl = class {},
    UR = new Yl();
  function Cy(e, t, n, r) {
    let o = UR,
      i;
    if (
      (IR(() => {
        let l =
          'useRecoilCallback() expects a function that returns a function: it accepts a function of the type (RecoilInterface) => (Args) => ReturnType and returns a callback function (Args) => ReturnType, where RecoilInterface is an object\
 {snapshot, set, ...} and Args and ReturnType are the argument and return types of the callback you want to create.  Please see the docs at recoiljs.org for details.';
        if (typeof t != 'function') throw Q(l);
        let a = zv(
            {
              ...(r ?? {}),
              set: (f, p) => Nv(e, f, p),
              reset: (f) => Nv(e, f, PR),
              refresh: (f) => DR(e, f),
              gotoSnapshot: (f) => VR(e, f),
              transact_UNSTABLE: (f) => kR(e)(f),
            },
            {
              snapshot: () => {
                let f = MR(e);
                return (i = f.retain()), f;
              },
            },
          ),
          u = t(a);
        if (typeof u != 'function') throw Q(l);
        o = u(...n);
      }),
      o instanceof Yl && ji(!1),
      he(o))
    )
      o = o.finally(() => {
        var l;
        (l = i) === null || l === void 0 || l();
      });
    else {
      var s;
      (s = i) === null || s === void 0 || s();
    }
    return o;
  }
  function bR(e, t) {
    let n = OR();
    return $R((...r) => Cy(n.current, e, r), t != null ? [...t, n] : void 0);
  }
  var Ly = { recoilCallback: Cy, useRecoilCallback: bR },
    { useStoreRef: FR } = gn,
    { refreshRecoilValue: zR } = nn,
    { useCallback: BR } = me.default;
  function jR(e) {
    let t = FR();
    return BR(() => {
      let n = t.current;
      zR(n, e);
    }, [e, t]);
  }
  var HR = jR,
    { atomicUpdater: WR } = Ay,
    { useStoreRef: GR } = gn,
    { useMemo: KR } = me.default;
  function QR(e, t) {
    let n = GR();
    return KR(
      () =>
        (...r) => {
          WR(n.current)((i) => {
            e(i)(...r);
          });
        },
      t != null ? [...t, n] : void 0,
    );
  }
  var YR = QR,
    If = class {
      constructor(t) {
        K(this, 'value', void 0), (this.value = t);
      }
    },
    ZR = { WrappedValue: If },
    XR = ZR.WrappedValue,
    ky = Object.freeze({ __proto__: null, WrappedValue: XR }),
    { isFastRefreshEnabled: qR } = xo,
    Zl = class extends Error {},
    Pf = class {
      constructor(t) {
        var n, r, o;
        K(this, '_name', void 0),
          K(this, '_numLeafs', void 0),
          K(this, '_root', void 0),
          K(this, '_onHit', void 0),
          K(this, '_onSet', void 0),
          K(this, '_mapNodeValue', void 0),
          (this._name = t?.name),
          (this._numLeafs = 0),
          (this._root = null),
          (this._onHit =
            (n = t?.onHit) !== null && n !== void 0 ? n : () => {}),
          (this._onSet =
            (r = t?.onSet) !== null && r !== void 0 ? r : () => {}),
          (this._mapNodeValue =
            (o = t?.mapNodeValue) !== null && o !== void 0 ? o : (i) => i);
      }
      size() {
        return this._numLeafs;
      }
      root() {
        return this._root;
      }
      get(t, n) {
        var r;
        return (r = this.getLeafNode(t, n)) === null || r === void 0
          ? void 0
          : r.value;
      }
      getLeafNode(t, n) {
        if (this._root == null) return;
        let r = this._root;
        for (; r; ) {
          if ((n?.onNodeVisit(r), r.type === 'leaf')) return this._onHit(r), r;
          let o = this._mapNodeValue(t(r.nodeKey));
          r = r.branches.get(o);
        }
      }
      set(t, n, r) {
        let o = () => {
          var i, s, l, a;
          let u, f;
          for (let [U, h] of t) {
            var p, m, S;
            let c = this._root;
            if (c?.type === 'leaf') throw this.invalidCacheError();
            let d = u;
            if (
              ((u = d ? d.branches.get(f) : c),
              (u =
                (p = u) !== null && p !== void 0
                  ? p
                  : {
                      type: 'branch',
                      nodeKey: U,
                      parent: d,
                      branches: new Map(),
                      branchKey: f,
                    }),
              u.type !== 'branch' || u.nodeKey !== U)
            )
              throw this.invalidCacheError();
            d?.branches.set(f, u),
              r == null ||
                (m = r.onNodeVisit) === null ||
                m === void 0 ||
                m.call(r, u),
              (f = this._mapNodeValue(h)),
              (this._root = (S = this._root) !== null && S !== void 0 ? S : u);
          }
          let y = u
            ? (i = u) === null || i === void 0
              ? void 0
              : i.branches.get(f)
            : this._root;
          if (y != null && (y.type !== 'leaf' || y.branchKey !== f))
            throw this.invalidCacheError();
          let w = { type: 'leaf', value: n, parent: u, branchKey: f };
          (s = u) === null || s === void 0 || s.branches.set(f, w),
            (this._root = (l = this._root) !== null && l !== void 0 ? l : w),
            this._numLeafs++,
            this._onSet(w),
            r == null ||
              (a = r.onNodeVisit) === null ||
              a === void 0 ||
              a.call(r, w);
        };
        try {
          o();
        } catch (i) {
          if (i instanceof Zl) this.clear(), o();
          else throw i;
        }
      }
      delete(t) {
        let n = this.root();
        if (!n) return !1;
        if (t === n) return (this._root = null), (this._numLeafs = 0), !0;
        let r = t.parent,
          o = t.branchKey;
        for (; r; ) {
          var i;
          if ((r.branches.delete(o), r === n))
            return (
              r.branches.size === 0
                ? ((this._root = null), (this._numLeafs = 0))
                : this._numLeafs--,
              !0
            );
          if (r.branches.size > 0) break;
          (o = (i = r) === null || i === void 0 ? void 0 : i.branchKey),
            (r = r.parent);
        }
        for (; r !== n; r = r.parent) if (r == null) return !1;
        return this._numLeafs--, !0;
      }
      clear() {
        (this._numLeafs = 0), (this._root = null);
      }
      invalidCacheError() {
        let t = qR()
          ? 'Possible Fast Refresh module reload detected.  This may also be caused by an selector returning inconsistent valu\
es. Resetting cache.'
          : 'Invalid cache values.  This happens when selectors do not return consistent values for the same input dependency values.  That may also be caused when using Fast Refresh to change a selector implementation.  Resetting cache.';
        throw (
          (tt(t + (this._name != null ? ` - ${this._name}` : '')), new Zl())
        );
      }
    },
    JR = { TreeCache: Pf },
    ex = JR.TreeCache,
    Iy = Object.freeze({ __proto__: null, TreeCache: ex }),
    Of = class {
      constructor(t) {
        var n;
        K(this, '_maxSize', void 0),
          K(this, '_size', void 0),
          K(this, '_head', void 0),
          K(this, '_tail', void 0),
          K(this, '_map', void 0),
          K(this, '_keyMapper', void 0),
          (this._maxSize = t.maxSize),
          (this._size = 0),
          (this._head = null),
          (this._tail = null),
          (this._map = new Map()),
          (this._keyMapper =
            (n = t.mapKey) !== null && n !== void 0 ? n : (r) => r);
      }
      head() {
        return this._head;
      }
      tail() {
        return this._tail;
      }
      size() {
        return this._size;
      }
      maxSize() {
        return this._maxSize;
      }
      has(t) {
        return this._map.has(this._keyMapper(t));
      }
      get(t) {
        let n = this._keyMapper(t),
          r = this._map.get(n);
        if (r) return this.set(t, r.value), r.value;
      }
      set(t, n) {
        let r = this._keyMapper(t);
        this._map.get(r) && this.delete(t);
        let i = this.head(),
          s = { key: t, right: i, left: null, value: n };
        i ? (i.left = s) : (this._tail = s),
          this._map.set(r, s),
          (this._head = s),
          this._size++,
          this._maybeDeleteLRU();
      }
      _maybeDeleteLRU() {
        this.size() > this.maxSize() && this.deleteLru();
      }
      deleteLru() {
        let t = this.tail();
        t && this.delete(t.key);
      }
      delete(t) {
        let n = this._keyMapper(t);
        if (!this._size || !this._map.has(n)) return;
        let r = _e(this._map.get(n)),
          o = r.right,
          i = r.left;
        o && (o.left = r.left),
          i && (i.right = r.right),
          r === this.head() && (this._head = o),
          r === this.tail() && (this._tail = i),
          this._map.delete(n),
          this._size--;
      }
      clear() {
        (this._size = 0),
          (this._head = null),
          (this._tail = null),
          (this._map = new Map());
      }
    },
    tx = { LRUCache: Of },
    nx = tx.LRUCache,
    Py = Object.freeze({ __proto__: null, LRUCache: nx }),
    { LRUCache: rx } = Py,
    { TreeCache: ox } = Iy;
  function ix({ name: e, maxSize: t, mapNodeValue: n = (r) => r }) {
    let r = new rx({ maxSize: t }),
      o = new ox({
        name: e,
        mapNodeValue: n,
        onHit: (i) => {
          r.set(i, !0);
        },
        onSet: (i) => {
          let s = r.tail();
          r.set(i, !0), s && o.size() > t && o.delete(s.key);
        },
      });
    return o;
  }
  var Av = ix;
  function Wt(e, t, n) {
    if (typeof e == 'string' && !e.includes('"') && !e.includes('\\'))
      return `"${e}"`;
    switch (typeof e) {
      case 'undefined':
        return '';
      case 'boolean':
        return e ? 'true' : 'false';
      case 'number':
      case 'symbol':
        return String(e);
      case 'string':
        return JSON.stringify(e);
      case 'function':
        if (t?.allowFunctions !== !0)
          throw Q('Attempt to serialize function in a Recoil cache key');
        return `__FUNCTION(${e.name})__`;
    }
    if (e === null) return 'null';
    if (typeof e != 'object') {
      var r;
      return (r = JSON.stringify(e)) !== null && r !== void 0 ? r : '';
    }
    if (he(e)) return '__PROMISE__';
    if (Array.isArray(e)) return `[${e.map((o, i) => Wt(o, t, i.toString()))}]`;
    if (typeof e.toJSON == 'function') return Wt(e.toJSON(n), t, n);
    if (e instanceof Map) {
      let o = {};
      for (let [i, s] of e) o[typeof i == 'string' ? i : Wt(i, t)] = s;
      return Wt(o, t, n);
    }
    return e instanceof Set
      ? Wt(
          Array.from(e).sort((o, i) => Wt(o, t).localeCompare(Wt(i, t))),
          t,
          n,
        )
      : Symbol !== void 0 &&
        e[Symbol.iterator] != null &&
        typeof e[Symbol.iterator] == 'function'
      ? Wt(Array.from(e), t, n)
      : `{${Object.keys(e)
          .filter((o) => e[o] !== void 0)
          .sort()
          .map((o) => `${Wt(o, t)}:${Wt(e[o], t, o)}`)
          .join(',')}}`;
  }
  function sx(e, t = { allowFunctions: !1 }) {
    return Wt(e, t);
  }
  var da = sx,
    { TreeCache: lx } = Iy,
    Ol = { equality: 'reference', eviction: 'keep-all', maxSize: 1 / 0 };
  function ax(
    {
      equality: e = Ol.equality,
      eviction: t = Ol.eviction,
      maxSize: n = Ol.maxSize,
    } = Ol,
    r,
  ) {
    let o = ux(e);
    return cx(t, n, o, r);
  }
  function ux(e) {
    switch (e) {
      case 'reference':
        return (t) => t;
      case 'value':
        return (t) => da(t);
    }
    throw Q(`Unrecognized equality policy ${e}`);
  }
  function cx(e, t, n, r) {
    switch (e) {
      case 'keep-all':
        return new lx({ name: r, mapNodeValue: n });
      case '\
lru':
        return Av({ name: r, maxSize: _e(t), mapNodeValue: n });
      case 'most-recent':
        return Av({ name: r, maxSize: 1, mapNodeValue: n });
    }
    throw Q(`Unrecognized eviction policy ${e}`);
  }
  var fx = ax;
  var { isReactNative: oL, isWindow: iL } = Ji;
  function dx(e) {
    return () => null;
  }
  var px = { startPerfBlock: dx },
    {
      isLoadable: hx,
      loadableWithError: Dl,
      loadableWithPromise: mx,
      loadableWithValue: mf,
    } = Zi,
    { WrappedValue: Oy } = ky,
    { getNodeLoadable: Ml, peekNodeLoadable: vx, setNodeValue: yx } = Yn,
    { saveDepsToStore: gx } = Xi,
    {
      DEFAULT_VALUE: Sx,
      getConfigDeletionHandler: _x,
      getNode: Ex,
      registerNode: Cv,
    } = ct,
    { isRecoilValue: wx } = Tr,
    { markRecoilValueModified: Lv } = nn,
    { retainedByOptionWithDefault: Tx } = Nr,
    { recoilCallback: Rx } = Ly,
    { startPerfBlock: xx } = px,
    Xl = class {},
    Fi = new Xl(),
    zi = [],
    Vl = new Map(),
    Nx = (() => {
      let e = 0;
      return () => e++;
    })();
  function Dy(e) {
    let t = null,
      { key: n, get: r, cachePolicy_UNSTABLE: o } = e,
      i = e.set != null ? e.set : void 0,
      s = new Set(),
      l = fx(o ?? { equality: 'reference', eviction: 'keep-all' }, n),
      a = Tx(e.retainedBy_UNSTABLE),
      u = new Map(),
      f = 0;
    function p() {
      return !se('recoil_memory_managament_2020') || f > 0;
    }
    function m(_) {
      return (
        _.getState().knownSelectors.add(n),
        f++,
        () => {
          f--;
        }
      );
    }
    function S() {
      return _x(n) !== void 0 && !p();
    }
    function y(_, L, k, F, $) {
      Nn(L, F, $), w(_, k);
    }
    function w(_, L) {
      Qe(_, L) && Ie(_), h(L, !0);
    }
    function U(_, L) {
      Qe(_, L) && (_e(V(_)).stateVersions.clear(), h(L, !1));
    }
    function h(_, L) {
      let k = Vl.get(_);
      if (k != null) {
        for (let F of k) Lv(F, _e(t));
        L && Vl.delete(_);
      }
    }
    function c(_, L) {
      let k = Vl.get(L);
      k == null && Vl.set(L, (k = new Set())), k.add(_);
    }
    function d(_, L, k, F, $, W) {
      return L.then((H) => {
        if (!p()) throw (Ie(_), Fi);
        let b = mf(H);
        return y(_, k, $, b, F), H;
      }).catch((H) => {
        if (!p()) throw (Ie(_), Fi);
        if (he(H)) return E(_, H, k, F, $, W);
        let b = Dl(H);
        throw (y(_, k, $, b, F), H);
      });
    }
    function E(_, L, k, F, $, W) {
      return L.then((H) => {
        if (!p()) throw (Ie(_), Fi);
        W.loadingDepKey != null && W.loadingDepPromise === L
          ? k.atomValues.set(W.loadingDepKey, mf(H))
          : _.getState().knownSelectors.forEach((ie) => {
              k.atomValues.delete(ie);
            });
        let b = T(_, k);
        if (b && b.state !== 'loading') {
          if (((Qe(_, $) || V(_) == null) && w(_, $), b.state === 'hasValue'))
            return b.contents;
          throw b.contents;
        }
        if (!Qe(_, $)) {
          let ie = ee(_, k);
          if (ie != null) return ie.loadingLoadable.contents;
        }
        let [ue, re] = x(_, k, $);
        if (
          (ue.state !== 'loading' && y(_, k, $, ue, re),
          ue.state === 'hasError')
        )
          throw ue.contents;
        return ue.contents;
      }).catch((H) => {
        if (H instanceof Xl) throw Fi;
        if (!p()) throw (Ie(_), Fi);
        let b = Dl(H);
        throw (y(_, k, $, b, F), H);
      });
    }
    function R(_, L, k, F) {
      var $, W, H, b;
      if (
        Qe(_, F) ||
        L.version ===
          (($ = _.getState()) === null ||
          $ === void 0 ||
          (W = $.currentTree) === null ||
          W === void 0
            ? void 0
            : W.version) ||
        L.version ===
          ((H = _.getState()) === null ||
          H === void 0 ||
          (b = H.nextTree) === null ||
          b === void 0
            ? void 0
            : b.version)
      ) {
        var ue, re, ie;
        gx(
          n,
          k,
          _,
          (ue =
            (re = _.getState()) === null ||
            re === void 0 ||
            (ie = re.nextTree) === null ||
            ie === void 0
              ? void 0
              : ie.version) !== null && ue !== void 0
            ? ue
            : _.getState().currentTree.version,
        );
      }
      for (let ve of k) s.add(ve);
    }
    function x(_, L, k) {
      let F = xx(n),
        $ = !0,
        W = !0,
        H = () => {
          F(), (W = !1);
        },
        b,
        ue = !1,
        re,
        ie = { loadingDepKey: null, loadingDepPromise: null },
        ve = new Map();
      function _t({ key: Ze }) {
        let Et = Ml(_, L, Ze);
        switch (
          (ve.set(Ze, Et),
          $ || (R(_, L, new Set(ve.keys()), k), U(_, k)),
          Et.state)
        ) {
          case 'hasValue':
            return Et.contents;
          case 'hasError':
            throw Et.contents;
          case 'loading':
            throw (
              ((ie.loadingDepKey = Ze),
              (ie.loadingDepPromise = Et.contents),
              Et.contents)
            );
        }
        throw Q('Invalid Loadable state');
      }
      let $r =
        (Ze) =>
        (...Et) => {
          if (W)
            throw Q(
              'Callbacks from getCallback() should only be called asynchron\
ously after the selector is evalutated.  It can be used for selectors to return objects with callbacks that can work with Recoil state without a subscription.',
            );
          return t == null && ji(!1), Rx(_, Ze, Et, { node: t });
        };
      try {
        (b = r({ get: _t, getCallback: $r })),
          (b = wx(b) ? _t(b) : b),
          hx(b) && (b.state === 'hasError' && (ue = !0), (b = b.contents)),
          he(b) ? (b = d(_, b, L, ve, k, ie).finally(H)) : H(),
          (b = b instanceof Oy ? b.value : b);
      } catch (Ze) {
        (b = Ze),
          he(b) ? (b = E(_, b, L, ve, k, ie).finally(H)) : ((ue = !0), H());
      }
      return (
        ue ? (re = Dl(b)) : he(b) ? (re = mx(b)) : (re = mf(b)),
        ($ = !1),
        Dt(_, k, ve),
        R(_, L, new Set(ve.keys()), k),
        [re, ve]
      );
    }
    function T(_, L) {
      let k = L.atomValues.get(n);
      if (k != null) return k;
      let F = new Set();
      try {
        k = l.get(
          (W) => (typeof W != 'string' && ji(!1), Ml(_, L, W).contents),
          {
            onNodeVisit: (W) => {
              W.type === 'branch' && W.nodeKey !== n && F.add(W.nodeKey);
            },
          },
        );
      } catch (W) {
        throw Q(`Problem with cache lookup for selector "${n}": ${W.message}`);
      }
      if (k) {
        var $;
        L.atomValues.set(n, k),
          R(
            _,
            L,
            F,
            ($ = V(_)) === null || $ === void 0 ? void 0 : $.executionID,
          );
      }
      return k;
    }
    function O(_, L) {
      let k = T(_, L);
      if (k != null) return Ie(_), k;
      let F = ee(_, L);
      if (F != null) {
        var $;
        return (
          (($ = F.loadingLoadable) === null || $ === void 0
            ? void 0
            : $.state) === 'loading' && c(_, F.executionID),
          F.loadingLoadable
        );
      }
      let W = Nx(),
        [H, b] = x(_, L, W);
      return (
        H.state === 'loading'
          ? (ae(_, W, H, b, L), c(_, W))
          : (Ie(_), Nn(L, H, b)),
        H
      );
    }
    function ee(_, L) {
      let k = oy([
        u.has(_) ? [_e(u.get(_))] : [],
        ta(
          Ff(u, ([$]) => $ !== _),
          ([, $]) => $,
        ),
      ]);
      function F($) {
        for (let [W, H] of $) if (!Ml(_, L, W).is(H)) return !0;
        return !1;
      }
      for (let $ of k) {
        if (
          $.stateVersions.get(L.version) ||
          !F($.depValuesDiscoveredSoFarDuringAsyncWork)
        )
          return $.stateVersions.set(L.version, !0), $;
        $.stateVersions.set(L.version, !1);
      }
    }
    function V(_) {
      return u.get(_);
    }
    function ae(_, L, k, F, $) {
      u.set(_, {
        depValuesDiscoveredSoFarDuringAsyncWork: F,
        executionID: L,
        loadingLoadable: k,
        stateVersions: new Map([[$.version, !0]]),
      });
    }
    function Dt(_, L, k) {
      if (Qe(_, L)) {
        let F = V(_);
        F != null && (F.depValuesDiscoveredSoFarDuringAsyncWork = k);
      }
    }
    function Ie(_) {
      u.delete(_);
    }
    function Qe(_, L) {
      var k;
      return (
        L === ((k = V(_)) === null || k === void 0 ? void 0 : k.executionID)
      );
    }
    function xn(_) {
      return Array.from(_.entries()).map(([L, k]) => [L, k.contents]);
    }
    function Nn(_, L, k) {
      _.atomValues.set(n, L);
      try {
        l.set(xn(k), L);
      } catch (F) {
        throw Q(`Problem with setting cache for selector "${n}": ${F.message}`);
      }
    }
    function ft(_) {
      if (zi.includes(n)) {
        let L = `Recoil selector has circular dependencies: ${zi
          .slice(zi.indexOf(n))
          .join(' \u2192 ')}`;
        return Dl(Q(L));
      }
      zi.push(n);
      try {
        return _();
      } finally {
        zi.pop();
      }
    }
    function Ye(_, L) {
      let k = L.atomValues.get(n);
      return (
        k ??
        l.get((F) => {
          var $;
          return (
            typeof F != 'string' && ji(!1),
            ($ = vx(_, L, F)) === null || $ === void 0 ? void 0 : $.contents
          );
        })
      );
    }
    function Mt(_, L) {
      return ft(() => O(_, L));
    }
    function Z(_) {
      _.atomValues.delete(n);
    }
    function Y(_, L) {
      t == null && ji(!1);
      for (let F of s) {
        var k;
        let $ = Ex(F);
        (k = $.clearCache) === null || k === void 0 || k.call($, _, L);
      }
      s.clear(), Z(L), l.clear(), Lv(_, t);
    }
    return i != null
      ? (t = Cv({
          key: n,
          nodeType: 'selector',
          peek: Ye,
          get: Mt,
          set: (L, k, F) => {
            let $ = !1,
              W = new Map();
            function H({ key: ie }) {
              if ($)
                throw Q(
                  'Recoil: Async selector sets are not currently supported.',
                );
              let ve = Ml(L, k, ie);
              if (ve.state === 'hasValue') return ve.contents;
              if (ve.state === 'loading') {
                let _t = `Getting\
 value of asynchronous atom or selector "${ie}" in a pending state while setting selector "${n}" is not yet supported.`;
                throw (tt(_t), Q(_t));
              } else throw ve.contents;
            }
            function b(ie, ve) {
              if ($) {
                let Ze =
                  'Recoil: Async selector sets are not currently supported.';
                throw (tt(Ze), Q(Ze));
              }
              let _t = typeof ve == 'function' ? ve(H(ie)) : ve;
              yx(L, k, ie.key, _t).forEach((Ze, Et) => W.set(Et, Ze));
            }
            function ue(ie) {
              b(ie, Sx);
            }
            let re = i({ set: b, get: H, reset: ue }, F);
            if (re !== void 0)
              throw he(re)
                ? Q(
                    'Recoil: Async selector sets are not currently s\
upported.',
                  )
                : Q('Recoil: selector set should be a void function.');
            return ($ = !0), W;
          },
          init: m,
          invalidate: Z,
          clearCache: Y,
          shouldDeleteConfigOnRelease: S,
          dangerouslyAllowMutability: e.dangerouslyAllowMutability,
          shouldRestoreFromSnapshots: !1,
          retainedBy: a,
        }))
      : (t = Cv({
          key: n,
          nodeType: 'selector',
          peek: Ye,
          get: Mt,
          init: m,
          invalidate: Z,
          clearCache: Y,
          shouldDeleteConfigOnRelease: S,
          dangerouslyAllowMutability: e.dangerouslyAllowMutability,
          shouldRestoreFromSnapshots: !1,
          retainedBy: a,
        }));
  }
  Dy.value = (e) => new Oy(e);
  var To = Dy,
    {
      isLoadable: Ax,
      loadableWithError: vf,
      loadableWithPromise: yf,
      loadableWithValue: vo,
    } = Zi,
    { WrappedValue: My } = ky,
    { peekNodeInfo: Cx } = Yn,
    {
      DEFAULT_VALUE: Er,
      DefaultValue: Qn,
      getConfigDeletionHandler: Vy,
      registerNode: Lx,
      setConfigDeletionHandler: kx,
    } = ct,
    { isRecoilValue: Ix } = Tr,
    {
      getRecoilValueAsLoadable: Px,
      markRecoilValueModified: Ox,
      setRecoilValue: kv,
      setRecoilValueLoadable: Dx,
    } = nn,
    { retainedByOptionWithDefault: Mx } = Nr,
    Bi = (e) => (e instanceof My ? e.value : e);
  function Vx(e) {
    let { key: t, persistence_UNSTABLE: n } = e,
      r = Mx(e.retainedBy_UNSTABLE),
      o = 0;
    function i(c) {
      return yf(
        c
          .then((d) => ((s = vo(d)), d))
          .catch((d) => {
            throw ((s = vf(d)), d);
          }),
      );
    }
    let s = he(e.default)
      ? i(e.default)
      : Ax(e.default)
      ? e.default.state === 'loading'
        ? i(e.default.contents)
        : e.default
      : vo(Bi(e.default));
    s.contents;
    let l,
      a = new Map();
    function u(c) {
      return c;
    }
    function f(c, d) {
      let E = d
        .then((R) => {
          var x, T;
          return (
            ((T = (
              (x = c.getState().nextTree) !== null && x !== void 0
                ? x
                : c.getState().currentTree
            ).atomValues.get(t)) === null || T === void 0
              ? void 0
              : T.contents) === E && kv(c, h, R),
            R
          );
        })
        .catch((R) => {
          var x, T;
          throw (
            (((T = (
              (x = c.getState().nextTree) !== null && x !== void 0
                ? x
                : c.getState().currentTree
            ).atomValues.get(t)) === null || T === void 0
              ? void 0
              : T.contents) === E && Dx(c, h, vf(R)),
            R)
          );
        });
      return E;
    }
    function p(c, d, E) {
      var R;
      o++;
      let x = () => {
        var V;
        o--,
          (V = a.get(c)) === null || V === void 0 || V.forEach((ae) => ae()),
          a.delete(c);
      };
      if ((c.getState().knownAtoms.add(t), s.state === 'loading')) {
        let V = () => {
          var ae;
          ((ae = c.getState().nextTree) !== null && ae !== void 0
            ? ae
            : c.getState().currentTree
          ).atomValues.has(t) || Ox(c, h);
        };
        s.contents.finally(V);
      }
      let T = (R = e.effects) !== null && R !== void 0 ? R : e.effects_UNSTABLE;
      if (T != null) {
        let Qe = function (Z) {
            if (ae && Z.key === t) {
              let Y = V;
              return Y instanceof Qn
                ? m(c, d)
                : he(Y)
                ? yf(Y.then((_) => (_ instanceof Qn ? s.toPromise() : _)))
                : vo(Y);
            }
            return Px(c, Z);
          },
          xn = function (Z) {
            return Qe(Z).toPromise();
          },
          Nn = function (Z) {
            var Y;
            let _ = Cx(
              c,
              (Y = c.getState().nextTree) !== null && Y !== void 0
                ? Y
                : c.getState().currentTree,
              Z.key,
            );
            return ae && Z.key === t && !(V instanceof Qn)
              ? { ..._, isSet: !0, loadable: Qe(Z) }
              : _;
          },
          V = Er,
          ae = !0,
          Dt = !1,
          Ie = null,
          ft = (Z) => (Y) => {
            if (ae) {
              let _ = Qe(h),
                L = _.state === 'hasValue' ? _.contents : Er;
              (V =
                typeof Y ==
                'functio\
n'
                  ? Y(L)
                  : Y),
                he(V) &&
                  (V = V.then((k) => ((Ie = { effect: Z, value: k }), k)));
            } else {
              if (he(Y))
                throw Q('Setting atoms to async values is not implemented.');
              typeof Y != 'function' && (Ie = { effect: Z, value: Bi(Y) }),
                kv(
                  c,
                  h,
                  typeof Y == 'function'
                    ? (_) => {
                        let L = Bi(Y(_));
                        return (Ie = { effect: Z, value: L }), L;
                      }
                    : Bi(Y),
                );
            }
          },
          Ye = (Z) => () => ft(Z)(Er),
          Mt = (Z) => (Y) => {
            var _;
            let { release: L } = c.subscribeToTransactions((k) => {
              var F;
              let { currentTree: $, previousTree: W } = k.getState();
              W ||
                (tt(
                  'Transaction subscribers notified without a next tree being present -- this is a bug in \
Recoil',
                ),
                (W = $));
              let H =
                (F = $.atomValues.get(t)) !== null && F !== void 0 ? F : s;
              if (H.state === 'hasValue') {
                var b, ue, re, ie;
                let ve = H.contents,
                  _t =
                    (b = W.atomValues.get(t)) !== null && b !== void 0 ? b : s,
                  $r = _t.state === 'hasValue' ? _t.contents : Er;
                ((ue = Ie) === null || ue === void 0 ? void 0 : ue.effect) !==
                  Z ||
                ((re = Ie) === null || re === void 0 ? void 0 : re.value) !== ve
                  ? Y(ve, $r, !$.atomValues.has(t))
                  : ((ie = Ie) === null || ie === void 0
                      ? void 0
                      : ie.effect) === Z && (Ie = null);
              }
            }, t);
            a.set(c, [
              ...((_ = a.get(c)) !== null && _ !== void 0 ? _ : []),
              L,
            ]);
          };
        for (let Z of T)
          try {
            let Y = Z({
              node: h,
              storeID: c.storeID,
              parentStoreID_UNSTABLE: c.parentStoreID,
              trigger: E,
              setSelf: ft(Z),
              resetSelf: Ye(Z),
              onSet: Mt(Z),
              getPromise: xn,
              getLoadable: Qe,
              getInfo_UNSTABLE: Nn,
            });
            if (Y != null) {
              var O;
              a.set(c, [
                ...((O = a.get(c)) !== null && O !== void 0 ? O : []),
                Y,
              ]);
            }
          } catch (Y) {
            (V = Y), (Dt = !0);
          }
        if (((ae = !1), !(V instanceof Qn))) {
          var ee;
          let Z = Dt ? vf(V) : he(V) ? yf(f(c, V)) : vo(Bi(V));
          Z.contents,
            d.atomValues.set(t, Z),
            (ee = c.getState().nextTree) === null ||
              ee === void 0 ||
              ee.atomValues.set(t, Z);
        }
      }
      return x;
    }
    function m(c, d) {
      var E, R;
      return (E =
        (R = d.atomValues.get(t)) !== null && R !== void 0 ? R : l) !== null &&
        E !== void 0
        ? E
        : s;
    }
    function S(c, d) {
      if (d.atomValues.has(t)) return _e(d.atomValues.get(t));
      if (d.nonvalidatedAtoms.has(t)) {
        if (l != null) return l;
        if (n == null)
          return (
            $f(
              `Tried to restore a persisted value for atom ${t} but it has no persistence settings.`,
            ),
            s
          );
        let E = d.nonvalidatedAtoms.get(t),
          R = n.validator(E, Er);
        return (l = R instanceof Qn ? s : vo(R)), l;
      } else return s;
    }
    function y() {
      l = void 0;
    }
    function w(c, d, E) {
      if (d.atomValues.has(t)) {
        let R = _e(d.atomValues.get(t));
        if (R.state === 'hasValue' && E === R.contents) return new Map();
      } else if (!d.nonvalidatedAtoms.has(t) && E instanceof Qn)
        return new Map();
      return (l = void 0), new Map().set(t, vo(E));
    }
    function U() {
      return Vy(t) !== void 0 && o <= 0;
    }
    let h = Lx({
      key: t,
      nodeType: 'atom',
      peek: m,
      get: S,
      set: w,
      init: p,
      invalidate: y,
      shouldDeleteConfigOnRelease: U,
      dangerouslyAllowMutability: e.dangerouslyAllowMutability,
      persistence_UNSTABLE: e.persistence_UNSTABLE
        ? {
            type: e.persistence_UNSTABLE.type,
            backButton: e.persistence_UNSTABLE.backButton,
          }
        : void 0,
      shouldRestoreFromSnapshots: !0,
      retainedBy: r,
    });
    return h;
  }
  function Zf(e) {
    let { ...t } = e,
      n = 'default' in e ? e.default : new Promise(() => {});
    return Ix(n) ? $x({ ...t, default: n }) : Vx({ ...t, default: n });
  }
  function $x(e) {
    let t = Zf({
        ...e,
        default: Er,
        persistence_UNSTABLE:
          e.persistence_UNSTABLE === void 0
            ? void 0
            : {
                ...e.persistence_UNSTABLE,
                validator: (r) =>
                  r instanceof Qn
                    ? r
                    : _e(e.persistence_UNSTABLE).validator(r, Er),
              },
        effects: e.effects,
        effects_UNSTABLE: e.effects_UNSTABLE,
      }),
      n = To({
        key: `${e.key}__withFallback`,
        get: ({ get: r }) => {
          let o = r(t);
          return o instanceof Qn ? e.default : o;
        },
        set: ({ set: r }, o) => r(t, o),
        cachePolicy_UNSTABLE: { eviction: 'most-recent' },
        dangerouslyAllowMutability: e.dangerouslyAllowMutability,
      });
    return kx(n.key, Vy(e.key)), n;
  }
  Zf.value = (e) => new My(e);
  var $y = Zf,
    Df = class {
      constructor(t) {
        var n;
        K(this, '_map', void 0),
          K(this, '_keyMapper', void 0),
          (this._map = new Map()),
          (this._keyMapper =
            (n = t?.mapKey) !== null && n !== void 0 ? n : (r) => r);
      }
      size() {
        return this._map.size;
      }
      has(t) {
        return this._map.has(this._keyMapper(t));
      }
      get(t) {
        return this._map.get(this._keyMapper(t));
      }
      set(t, n) {
        this._map.set(this._keyMapper(t), n);
      }
      delete(t) {
        this._map.delete(this._keyMapper(t));
      }
      clear() {
        this._map.clear();
      }
    },
    Ux = { MapCache: Df },
    bx = Ux.MapCache,
    Fx = Object.freeze({ __proto__: null, MapCache: bx }),
    { LRUCache: Iv } = Py,
    { MapCache: zx } = Fx,
    $l = { equality: 'reference', eviction: 'none', maxSize: 1 / 0 };
  function Bx({
    equality: e = $l.equality,
    eviction: t = $l.eviction,
    maxSize: n = $l.maxSize,
  } = $l) {
    let r = jx(e);
    return Hx(t, n, r);
  }
  function jx(e) {
    switch (e) {
      case 'reference':
        return (t) => t;
      case 'value':
        return (t) => da(t);
    }
    throw Q(`Unrecognized equality policy ${e}`);
  }
  function Hx(e, t, n) {
    switch (e) {
      case 'keep-all':
        return new zx({ mapKey: n });
      case 'lru':
        return new Iv({ mapKey: n, maxSize: _e(t) });
      case 'most-recent':
        return new Iv({ mapKey: n, maxSize: 1 });
    }
    throw Q(`Unrecognized eviction policy ${e}`);
  }
  var Uy = Bx,
    { setConfigDeletionHandler: Wx } = ct;
  function Gx(e) {
    var t, n;
    let r = Uy({
      equality:
        (t =
          (n = e.cachePolicyForParams_UNSTABLE) === null || n === void 0
            ? void 0
            : n.equality) !== null && t !== void 0
          ? t
          : 'value',
      eviction: 'keep-all',
    });
    return (o) => {
      var i, s;
      let l = r.get(o);
      if (l != null) return l;
      let { cachePolicyForParams_UNSTABLE: a, ...u } = e,
        f = 'default' in e ? e.default : new Promise(() => {}),
        p = $y({
          ...u,
          key: `${e.key}__${(i = da(o)) !== null && i !== void 0 ? i : 'void'}`,
          default: typeof f == 'function' ? f(o) : f,
          retainedBy_UNSTABLE:
            typeof e.retainedBy_UNSTABLE == 'function'
              ? e.retainedBy_UNSTABLE(o)
              : e.retainedBy_UNSTABLE,
          effects:
            typeof e.effects == 'function'
              ? e.effects(o)
              : typeof e.effects_UNSTABLE == 'function'
              ? e.effects_UNSTABLE(o)
              : (s = e.effects) !== null && s !== void 0
              ? s
              : e.effects_UNSTABLE,
        });
      return (
        r.set(o, p),
        Wx(p.key, () => {
          r.delete(o);
        }),
        p
      );
    };
  }
  var Kx = Gx,
    { setConfigDeletionHandler: Qx } = ct,
    Yx = 0;
  function Zx(e) {
    var t, n;
    let r = Uy({
      equality:
        (t =
          (n = e.cachePolicyForParams_UNSTABLE) === null || n === void 0
            ? void 0
            : n.equality) !== null && t !== void 0
          ? t
          : 'value',
      eviction: 'keep-all',
    });
    return (o) => {
      var i;
      let s;
      try {
        s = r.get(o);
      } catch (m) {
        throw Q(
          `Problem with cache lookup for selector ${e.key}: ${m.message}`,
        );
      }
      if (s != null) return s;
      let l = `${e.key}__selectorFamily/${
          (i = da(o, { allowFunctions: !0 })) !== null && i !== void 0
            ? i
            : 'void'
        }/${Yx++}`,
        a = (m) => e.get(o)(m),
        u = e.cachePolicy_UNSTABLE,
        f =
          typeof e.retainedBy_UNSTABLE == 'function'
            ? e.retainedBy_UNSTABLE(o)
            : e.retainedBy_UNSTABLE,
        p;
      if (e.set != null) {
        let m = e.set;
        p = To({
          key: l,
          get: a,
          set: (y, w) => m(o)(y, w),
          cachePolicy_UNSTABLE: u,
          dangerouslyAllowMutability: e.dangerouslyAllowMutability,
          retainedBy_UNSTABLE: f,
        });
      } else
        p = To({
          key: l,
          get: a,
          cachePolicy_UNSTABLE: u,
          dangerouslyAllowMutability: e.dangerouslyAllowMutability,
          retainedBy_UNSTABLE: f,
        });
      return (
        r.set(o, p),
        Qx(p.key, () => {
          r.delete(o);
        }),
        p
      );
    };
  }
  var Zn = Zx,
    Xx = Zn({
      key: '__constant',
      get: (e) => () => e,
      cachePolicyForParams_UNSTABLE: { equality: 'reference' },
    });
  function qx(e) {
    return Xx(e);
  }
  var Jx = qx,
    eN = Zn({
      key: '__error',
      get: (e) => () => {
        throw Q(e);
      },
      cachePolicyForParams_UNSTABLE: { equality: 'reference' },
    });
  function tN(e) {
    return eN(e);
  }
  var nN = tN;
  function rN(e) {
    return e;
  }
  var oN = rN,
    {
      loadableWithError: by,
      loadableWithPromise: Fy,
      loadableWithValue: zy,
    } = Zi;
  function pa(e, t) {
    let n = Array(t.length).fill(void 0),
      r = Array(t.length).fill(void 0);
    for (let [o, i] of t.entries())
      try {
        n[o] = e(i);
      } catch (s) {
        r[o] = s;
      }
    return [n, r];
  }
  function iN(e) {
    return e != null && !he(e);
  }
  function ha(e) {
    return Array.isArray(e)
      ? e
      : Object.getOwnPropertyNames(e).map((t) => e[t]);
  }
  function Mf(e, t) {
    return Array.isArray(e)
      ? t
      : Object.getOwnPropertyNames(e).reduce(
          (n, r, o) => ({ ...n, [r]: t[o] }),
          {},
        );
  }
  function yo(e, t, n) {
    let r = n.map((o, i) => (o == null ? zy(t[i]) : he(o) ? Fy(o) : by(o)));
    return Mf(e, r);
  }
  function sN(e, t) {
    return t.map((n, r) => (n === void 0 ? e[r] : n));
  }
  var lN = Zn({
      key: '__waitForNone',
      get:
        (e) =>
        ({ get: t }) => {
          let n = ha(e),
            [r, o] = pa(t, n);
          return yo(e, r, o);
        },
      dangerouslyAllowMutability: !0,
    }),
    aN = Zn({
      key: '__waitForAny',
      get:
        (e) =>
        ({ get: t }) => {
          let n = ha(e),
            [r, o] = pa(t, n);
          return o.some((i) => !he(i))
            ? yo(e, r, o)
            : new Promise((i) => {
                for (let [s, l] of o.entries())
                  he(l) &&
                    l
                      .then((a) => {
                        (r[s] = a), (o[s] = void 0), i(yo(e, r, o));
                      })
                      .catch((a) => {
                        (o[s] = a), i(yo(e, r, o));
                      });
              });
        },
      dangerouslyAllowMutability: !0,
    }),
    uN = Zn({
      key: '__waitForAll',
      get:
        (e) =>
        ({ get: t }) => {
          let n = ha(e),
            [r, o] = pa(t, n);
          if (o.every((s) => s == null)) return Mf(e, r);
          let i = o.find(iN);
          if (i != null) throw i;
          return Promise.all(o).then((s) => Mf(e, sN(r, s)));
        },
      dangerouslyAllowMutability: !0,
    }),
    cN = Zn({
      key: '__waitForAllSettled',
      get:
        (e) =>
        ({ get: t }) => {
          let n = ha(e),
            [r, o] = pa(t, n);
          return o.every((i) => !he(i))
            ? yo(e, r, o)
            : Promise.all(
                o.map((i, s) =>
                  he(i)
                    ? i
                        .then((l) => {
                          (r[s] = l), (o[s] = void 0);
                        })
                        .catch((l) => {
                          (r[s] = void 0), (o[s] = l);
                        })
                    : null,
                ),
              ).then(() => yo(e, r, o));
        },
      dangerouslyAllowMutability: !0,
    }),
    fN = Zn({
      key: '__noWait',
      get:
        (e) =>
        ({ get: t }) => {
          try {
            return To.value(zy(t(e)));
          } catch (n) {
            return To.value(he(n) ? Fy(n) : by(n));
          }
        },
      dangerouslyAllowMutability: !0,
    }),
    dN = {
      waitForNone: lN,
      waitForAny: aN,
      waitForAll: uN,
      waitForAllSettled: cN,
      noWait: fN,
    },
    { RecoilLoadable: pN } = Zi,
    { DefaultValue: hN } = ct,
    { RecoilRoot: mN, useRecoilStoreID: vN } = gn,
    { isRecoilValue: yN } = Tr,
    { retentionZone: gN } = ra,
    { freshSnapshot: SN } = la,
    {
      useRecoilState: _N,
      useRecoilState_TRANSITION_SUPPORT_UNSTABLE: EN,
      useRecoilStateLoadable: wN,
      useRecoilValue: TN,
      useRecoilValue_TRANSITION_SUPPORT_UNSTABLE: RN,
      useRecoilValueLoadable: xN,
      useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE: NN,
      useResetRecoilState: AN,
      useSetRecoilState: CN,
    } = jT,
    {
      useGotoRecoilSnapshot: LN,
      useRecoilSnapshot: kN,
      useRecoilTransactionObserver: IN,
    } = Ny,
    { useRecoilCallback: PN } = Ly,
    {
      noWait: ON,
      waitForAll: DN,
      waitForAllSettled: MN,
      waitForAny: VN,
      waitForNone: $N,
    } = dN,
    q = {
      DefaultValue: hN,
      isRecoilValue: yN,
      RecoilLoadable: pN,
      RecoilEnv: Ro,
      RecoilRoot: mN,
      useRecoilStoreID: vN,
      useRecoilBridgeAcrossReactRoots_UNSTABLE: vR,
      atom: $y,
      selector: To,
      atomFamily: Kx,
      selectorFamily: Zn,
      constSelector: Jx,
      errorSelector: nN,
      readOnlySelector: oN,
      noWait: ON,
      waitForNone: $N,
      waitForAny: VN,
      waitForAll: DN,
      waitForAllSettled: MN,
      useRecoilValue: TN,
      useRecoilValueLoadable: xN,
      useRecoilState: _N,
      useRecoilStateLoadable: wN,
      useSetRecoilState: CN,
      useResetRecoilState: AN,
      useGetRecoilValueInfo_UNSTABLE: cR,
      useRecoilRefresher_UNSTABLE: HR,
      useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE: NN,
      useRecoilValue_TRANSITION_SUPPORT_UNSTABLE: RN,
      useRecoilState_TRANSITION_SUPPORT_UNSTABLE: EN,
      useRecoilCallback: PN,
      useRecoilTransaction_UNSTABLE: YR,
      useGotoRecoilSnapshot: LN,
      useRecoilSnapshot: kN,
      useRecoilTransactionObserver_UNSTABLE: IN,
      snapshot_UNSTABLE: SN,
      useRetain: Wf,
      retentionZone: gN,
    },
    By = q.DefaultValue,
    sL = q.isRecoilValue,
    lL = q.RecoilLoadable,
    aL = q.RecoilEnv,
    jy = q.RecoilRoot,
    uL = q.useRecoilStoreID,
    cL = q.useRecoilBridgeAcrossReactRoots_UNSTABLE,
    Hy = q.atom,
    fL = q.selector,
    dL = q.atomFamily,
    Wy = q.selectorFamily,
    pL = q.constSelector,
    hL = q.errorSelector,
    mL = q.readOnlySelector,
    vL = q.noWait,
    yL = q.waitForNone,
    gL = q.waitForAny,
    SL = q.waitForAll,
    _L = q.waitForAllSettled,
    ma = q.useRecoilValue,
    EL = q.useRecoilValueLoadable,
    wL = q.useRecoilState,
    TL = q.useRecoilStateLoadable,
    RL = q.useSetRecoilState,
    xL = q.useResetRecoilState,
    NL = q.useGetRecoilValueInfo_UNSTABLE,
    AL = q.useRecoilRefresher_UNSTABLE,
    CL = q.useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE,
    LL = q.useRecoilValue_TRANSITION_SUPPORT_UNSTABLE,
    kL = q.useRecoilState_TRANSITION_SUPPORT_UNSTABLE,
    Gy = q.useRecoilCallback,
    IL = q.useRecoilTransaction_UNSTABLE,
    PL = q.useGotoRecoilSnapshot,
    OL = q.useRecoilSnapshot,
    DL = q.useRecoilTransactionObserver_UNSTABLE,
    ML = q.snapshot_UNSTABLE,
    VL = q.useRetain,
    $L = q.retentionZone;
  var Ky = ge(Tt(), 1),
    Ao = (0, Ky.createContext)(null);
  var Co = () => {};
  var Xn = class extends Set {},
    qn = class extends Set {},
    Jn = class extends Set {};
  var va = new WeakMap(),
    ya = new WeakMap(),
    Qy = new WeakMap(),
    er = (e) => e instanceof Xn,
    on = (e) => e instanceof qn,
    sn = (e) => e instanceof Jn;
  var Sn = (e) => typeof e == 'string',
    Lo = Array.isArray,
    ns = (e) => typeof e == 'function',
    _n = (e) => ns(e) || (typeof e == 'object' && e !== null),
    {
      prototype: { toString: UN },
    } = Object,
    ko = (e) => UN.call(e) === '[object RegExp]',
    Io = (e) =>
      typeof e == 'function' && _n(e) && Sn(e.type) && 'definition' in e;
  function Yy(e) {
    return typeof e == 'function'
      ? e
      : ko(e)
      ? new RegExp(e)
      : er(e)
      ? new Xn(e)
      : on(e)
      ? new qn(e)
      : sn(e)
      ? new Jn(e)
      : { ...e };
  }
  var Zy = (e) => 65 <= e && e <= 90,
    ga = (e) => 97 <= e && e <= 122;
  var Ar = (e) => 48 <= e && e <= 57,
    bN = (e) => 65 <= e && e <= 70,
    FN = (e) => 97 <= e && e <= 102;
  var Xy = (e) => Ar(e) || bN(e) || FN(e);
  var zN = (e) => 55296 <= e && e <= 56319,
    BN = (e) => 56320 <= e && e <= 57343,
    jN = (e) => 55296 <= e && e <= 57343,
    tr = function* (e, t = 0) {
      let { length: n } = e;
      for (let r = t; r < n; r++) {
        let o = e.charCodeAt(r);
        if (jN(o)) {
          let i = e.charCodeAt(r + 1);
          zN(o) &&
            BN(i) &&
            ((o = (o - 55296) * 1024 + (i - 56320) + 65536), (r += 1));
        }
        yield o;
      }
    };
  var Sa = (e) => {
    let t;
    return () => {
      if (t) return t.value;
      let n = e();
      return (t = { value: n }), n;
    };
  };
  var Cr = class extends Error {
    constructor({ code: t, message: n = t, data: r }) {
      super(n), (this.code = t), (this.data = r);
    }
  };
  var HN = Object.keys,
    Lr = (e, t) => {
      if (typeof t == 'function') return t(e);
      if (ko(t)) return Sn(e) && t.test(e);
      if (er(t)) return t.has(e);
      if (on(t)) {
        for (let n of t) if (Lr(e, n)) return !0;
        return !1;
      }
      if (sn(t)) {
        for (let n of t) if (!Lr(e, n)) return !1;
        return !0;
      }
      if (_n(e)) {
        for (let n of HN(t)) if (!Lr(e[n], t[n])) return !1;
        return !0;
      }
      return !1;
    };
  var { entries: WN, defineProperties: GN } = Object;
  function C(e, t) {
    if (!e)
      throw new Cr({ code: 'NoTypeName', data: { type: e, definition: t } });
    if (Io(t))
      throw new Cr({
        code: 'UselessWrapping',
        message: `UselessWrapping: ${e}(${t.name})`,
        data: { type: e, definition: t },
      });
    let n = GN((r) => Lr(r, t), {
      type: { value: e },
      name: { value: `is${e}` },
      array: {
        get: Sa(() => {
          let r = C(`Array<${e}>`, (o) => Lo(o) && o.every((i) => n(i)));
          return va.set(r, t), r;
        }),
      },
      optional: {
        get: Sa(() => {
          let r = C(`${e}?`, (o) => o === void 0 || n(o));
          return ya.set(r, t), r;
        }),
      },
      dictionary: {
        get: Sa(() => {
          let r = C(
            `Record<string, ${e}>`,
            (o) => _n(o) && WN(o).every(([i, s]) => Sn(i) && n(s)),
          );
          return Qy.set(r, t), r;
        }),
      },
      definition: { get: () => Yy(t) },
    });
    return n;
  }
  var _a = {
    enum: (...e) => new Xn(e),
    some: (...e) => {
      let t = new qn();
      for (let n of e) for (let r of on(n) ? [...n] : [n]) t.add(r);
      return t;
    },
    every: (...e) => {
      let t = new Jn();
      for (let n of e) for (let r of sn(n) ? [...n] : [n]) t.add(r);
      return t;
    },
  };
  var KN = Object.keys,
    Ea = (e, t = '', n = []) => [...QN(e, t, n)].join('').trim(),
    QN = function* (e, t, n) {
      if (n.includes(e))
        yield `${t}(circular)
`;
      else if (Io(e))
        yield `${t}${e.type}
`;
      else if (ns(e)) yield `${t}${e.toString()}`;
      else if (er(e))
        yield `${t}${[...e].map((r) => JSON.stringify(r)).join('|')}`;
      else if (on(e)) yield* qy(e, t, n, 'Some');
      else if (sn(e)) yield* qy(e, t, n, 'Every');
      else {
        yield `${t}{
`;
        let r = `${t}  `;
        for (let o of KN(e))
          yield `${r}${String(o)}: ${Ea(e[o], r, Jy(n, e))},
`;
        yield `${t}}
`;
      }
    },
    Jy = (e, t) => {
      let n = e.slice();
      return (n[n.length] = t), n;
    },
    qy = function* (e, t, n, r, o = '{', i = '}') {
      yield `${t}${r} ${o}
`;
      let s = `${t}  `,
        l = Jy(n, e);
      for (let a of e)
        yield `${s}${Ea(a, s, l)},
`;
      yield `${t}${i}
`;
    };
  var YN = Object.keys,
    Xf = (e) =>
      [
        `${e.path}: ${e.message}`,
        `actual: ${JSON.stringify(e.input, null, 2)}`,
        `expected: ${Ea(e.definition)}`,
      ].join(`
`),
    ZN = (e, t, n) =>
      t(e)
        ? null
        : {
            input: e,
            definition: t,
            path: n,
            message: `The input doesn't pass the test (${t.name}).`,
          },
    XN = (e, t, n) => {
      for (let r of t) if (r === e) return null;
      return {
        input: e,
        definition: t,
        path: n,
        message: `The input (${e}) isn't in enum (${[...t].join(', ')}).`,
      };
    },
    qN = (e, t, n) => {
      let r = [];
      for (let o of t) {
        let i = kr(e, o, n);
        if (!i) return null;
        r.push(i);
      }
      return {
        input: e,
        definition: t,
        path: n,
        message: `The input doesn't pass any tests.
${r.map(Xf).join(`
`)}`,
      };
    },
    JN = (e, t, n) => {
      let r = 0;
      for (let o of t) {
        let i = kr(e, o, n);
        if (i)
          return {
            input: e,
            definition: t,
            path: n,
            message: `#${r} definition returned an error.
${Xf(i)}`,
          };
        r++;
      }
      return null;
    },
    eA = (e, t, n) => {
      if (!_n(e))
        return {
          input: e,
          definition: t,
          path: n,
          message: 'The input is not a map.',
        };
      for (let r of YN(t)) {
        let o = kr(e[String(r)], t[r], `${n}.${r}`);
        if (o) return o;
      }
      return null;
    },
    tA = (e, t, n) => {
      let { length: r } = e;
      for (let o = 0; o < r; o++) {
        let i = kr(e[o], t, `${n}.${o}`);
        if (i) return i;
      }
      return null;
    },
    nA = (e, t, n) => {
      let r = va.get(t);
      return r
        ? Lo(e)
          ? tA(e, r, n)
          : {
              input: e,
              definition: r,
              path: n,
              message: 'The input is not an array.',
            }
        : ((r = ya.get(t)),
          r ? (e === void 0 ? null : kr(e, r, n)) : kr(e, t.definition, n));
    },
    rA = (e, t, n) =>
      Sn(e)
        ? t.test(e)
          ? null
          : {
              input: e,
              definition: t,
              path: n,
              message: `"${e}" doesn't match to ${t}.`,
            }
        : {
            input: e,
            definition: t,
            path: n,
            message: 'The input is not a string.',
          },
    kr = (e, t, n) =>
      n
        ? Io(t)
          ? nA(e, t, n)
          : ko(t)
          ? rA(e, t, n)
          : ns(t)
          ? ZN(e, t, n)
          : er(t)
          ? XN(e, t, n)
          : on(t)
          ? qN(e, t, n)
          : sn(t)
          ? JN(e, t, n)
          : eA(e, t, n)
        : {
            input: e,
            definition: t,
            path: n,
            message: 'The type has no path.',
          };
  function e0(e, t, n) {
    if (Lr(e, t)) return e;
    if (n === void 0) {
      let r = kr(e, t, '_') || {
        input: e,
        definition: t,
        path: '_',
        message: "The input doesn't match to the definition.",
      };
      throw new Cr({
        code: 'TypeCheckError',
        message: `TypeCheckError: ${Xf(r)}`,
        data: r,
      });
    }
    return n;
  }
  var It = (
    (e) => (t) =>
      e.call(t).slice(8, -1)
  )(Object.prototype.toString);
  var { keys: Ek, values: wk, entries: Tk } = Object;
  var Jf = function* (e, t = 0) {
      let n = t,
        r = 0,
        o = 0;
      for (let i of tr(e, t))
        if (Ar(i)) {
          if (0 < r && o === 0)
            throw new Error(`InvalidIpv4Octet: ${e.substr(n, r)}`);
          if (((o = o * 10 + i - 48), (r += 1), 255 < o || 3 < r))
            throw new Error(`InvalidIpv4Octet: ${e.substr(n, r)}`);
        } else if (
          (0 < r && (yield { value: o, start: n, end: n + r }),
          (n += r + 1),
          (r = o = 0),
          i !== 46)
        )
          break;
      0 < r && (yield { value: o, start: n, end: n + r });
    },
    t0 = (e, t = 0) => {
      let n = [];
      for (let r of Jf(e, t))
        if (n.push(r.value) === 4) return { octets: n, start: t, end: r.end };
      throw new Error(`InvalidIpv4Address: ${e.substr(t, 15)}`);
    };
  var uA = (e) => (e <= 57 ? e - 48 : e <= 70 ? 10 + e - 65 : 10 + e - 97),
    cA = function* (e, t = 0) {
      let n = t,
        r = 0,
        o = 0;
      for (let i of tr(e, t))
        if (Xy(i)) {
          if (((o = o * 16 + uA(i)), (r += 1), 4 < r))
            throw new Error(`InvalidIpv6Group: ${e.substr(n, r)}`);
        } else if (i === 46) {
          r = o = 0;
          let s = 0;
          for (let l of Jf(e, n))
            s % 2 === 0
              ? ((o = l.value), (n = l.start))
              : yield { value: o * 256 + l.value, start: n, end: l.end },
              (s += 1);
          break;
        } else if (
          ((0 < r || t < n) &&
            (yield { value: 0 < r ? o : null, start: n, end: n + r }),
          (n += r + 1),
          (r = o = 0),
          i !== 58)
        )
          break;
      0 < r && (yield { value: o, start: n, end: n + r });
    },
    n0 = (e, t = 0) => {
      let n = [],
        r = -1,
        o = t;
      for (let s of cA(e, t)) {
        let { value: l } = s;
        if (l === null) {
          if (7 <= n.length)
            throw new Error(`InvalidIpv6Address: ${e.substr(t, o)}`);
          if (((o = s.end + 1), 0 <= r))
            throw new Error(`DuplicatedCompressor: ${e.slice(t, s.end)}`);
          r = n.length;
        } else {
          o = s.end;
          let a = n.push(l);
          if (0 <= r && a === 7)
            return n.splice(r, 0, 0), { groups: n, start: t, end: o };
          if (a === 8) return { groups: n, start: t, end: o };
        }
      }
      if (!(0 <= r)) throw new Error(`InvalidIpv6Address: ${e.substr(t, o)}`);
      let i = n.slice(0, r);
      for (let s = 8 - n.length; s--; ) i.push(0);
      return i.push(...n.slice(r)), { groups: i, start: t, end: o };
    };
  var ed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    Pk = C('CapitalLatinString', new RegExp(`^[${ed}]*$`));
  var r0 = 'abcdefghijklmnopqrstuvwxyz',
    Mk = C('SmallLatinString', /^[a-z]*$/);
  var td = `${r0}${ed}`,
    Fk = C('LatinString', new RegExp(`^[${td}]*$`));
  var nd = '0123456789',
    jk = C('NumberString', new RegExp(`^[${nd}]*$`));
  var fA = `${td}${nd}`,
    Qk = C('AlphaNumericString', new RegExp(`^[${fA}]*$`));
  var qk = C('Array', Lo);
  var tI = C('Base64String', /^[A-Za-z0-9+/]+=*$/);
  var oI = C('Base64UrlString', /^[A-Za-z0-9\-_]+=*$/);
  var lI = C('Boolean', (e) => typeof e == 'boolean');
  var cI = C('CapitalHexString', /^[0-9A-F]*$/);
  var Ee = C('String', Sn);
  var wa = C('Domain', (e) => {
    if (!Ee(e)) return !1;
    let t = 45,
      n = !1,
      r = 1;
    for (let o of tr(e)) {
      if (o === 46) {
        if (!n || t === 45) return !1;
        (n = !1), (r += 1);
      } else if (ga(o)) n = !0;
      else if (o !== 45 && !Ar(o)) return !1;
      t = o;
    }
    return t === 46 || t === 45 ? !1 : 1 < r;
  });
  var kA = new Set([
      33, 35, 36, 37, 38, 39, 42, 43, 45, 47, 61, 63, 94, 95, 96, 123, 124, 125,
      126,
    ]),
    IA = (e) => ga(e) || Zy(e) || Ar(e) || kA.has(e),
    o0 = C('EmailAddressLocalPart', (e) => {
      if (!Ee(e)) return !1;
      let { length: t } = e;
      if (t === 0 || 64 < t) return !1;
      let n = 46;
      for (let r of tr(e)) {
        if (r === 46) {
          if (n === 46) return !1;
        } else if (!IA(r)) return !1;
        n = r;
      }
      return n !== 46;
    });
  var AI = C('EmailAddress', (e) => {
    if (!Ee(e) || 254 < e.length) return !1;
    let t = e.lastIndexOf('@');
    return t < 1 ? !1 : o0(e.slice(0, t)) && wa(e.slice(t + 1));
  });
  var We = C('FiniteNumber', Number.isFinite);
  var PI = C('Function', (e) => typeof e == 'function');
  var VI = C(
    'HttpMethod',
    _a.enum(
      'CONNECT',
      'DELETE',
      'GET',
      'HEAD',
      'OPTIONS',
      'PATCH',
      'POST',
      'PUT',
      'TRACE',
    ),
  );
  var PA = {
      Continue: 100,
      SwitchingProtocol: 101,
      Processing: 102,
      EarlyHints: 103,
      OK: 200,
      Created: 201,
      Accepted: 202,
      NonAuthoritativeInformation: 203,
      NoContent: 204,
      ResetContent: 205,
      PartialContent: 206,
      MultiStatus: 207,
      AlreadyReported: 208,
      IMUsed: 226,
      MultipleChoice: 300,
      MovedPermanently: 301,
      Found: 302,
      SeeOther: 303,
      NotModified: 304,
      UseProxy: 305,
      Unused: 306,
      TemporaryRedirect: 307,
      PermanentRedirect: 308,
      BadRequest: 400,
      Unauthorized: 401,
      PaymentRequired: 402,
      Forbidden: 403,
      NotFound: 404,
      MethodNotAllowed: 405,
      NotAcceptable: 406,
      ProxyAuthenticationRequired: 407,
      RequestTimeout: 408,
      Conflict: 409,
      Gone: 410,
      LengthRequired: 411,
      PreconditionFailed: 412,
      PayloadTooLarge: 413,
      URITooLong: 414,
      UnsupportedMediaType: 415,
      RangeNotSatisfiable: 416,
      ExpectationFailed: 417,
      MisdirectedRequest: 421,
      UnprocessableEntity: 422,
      Locked: 423,
      FailedDependency: 424,
      TooEarly: 425,
      UpgradeRequired: 426,
      PreconditionRequired: 428,
      TooManyRequests: 429,
      RequestHeaderFieldsTooLarge: 431,
      UnavailableForLegalReasons: 451,
      InternalServerError: 500,
      NotImplemented: 501,
      BadGateway: 502,
      ServiceUnavailable: 503,
      GatewayTimeout: 504,
      HTTPVersionNotSupported: 505,
      VariantAlsoNegotiates: 506,
      InsufficientStorage: 507,
      LoopDetected: 508,
      NotExtended: 510,
      NetworkAuthenticationRequired: 511,
    },
    FI = C('HttpResponseStatusCode', _a.enum(...Object.values(PA)));
  var i0 = C('Ipv4Address', (e) => {
    if (Ee(e))
      try {
        return t0(e).end === e.length;
      } catch {}
    return !1;
  });
  var s0 = C('Ipv6Address', (e) => {
    if (Ee(e))
      try {
        return n0(e).end === e.length;
      } catch {}
    return !1;
  });
  var l0 = C('Domain', (e) => {
    if (!Ee(e)) return !1;
    if (e.startsWith('[')) {
      let r = e.indexOf(']');
      if (r < 0 || !s0(e.slice(1, r))) return !1;
      let o = e.slice(r + 1);
      return !o || /^:\d+$/.test(o);
    }
    let t = e.indexOf(':');
    if (t < 0) t = e.length;
    else {
      let r = e.slice(t);
      if (!/^:\d+$/.test(r)) return !1;
    }
    let n = e.slice(0, t);
    return wa(n) || i0(n);
  });
  var i2 = C('HttpsUrlString', (e) => {
    if (Ee(e) && e.startsWith('https://')) {
      let t = e.indexOf('/', 8);
      return (
        t < 0 && (t = e.length),
        l0(e.slice(8, t)) ? !e.slice(t).includes(' ') : !1
      );
    }
    return !1;
  });
  var u2 = C('NegativeFiniteNumber', (e) => We(e) && e < 0);
  var nr = C('SafeInteger', Number.isSafeInteger);
  var m2 = C('NegativeSafeInteger', (e) => nr(e) && e < 0);
  var S2 = C('NonNegativeFiniteNumber', (e) => We(e) && 0 <= e);
  var T2 = C('NonNegativeSafeInteger', (e) => nr(e) && 0 <= e);
  var A2 = C('NonPositiveFiniteNumber', (e) => We(e) && e <= 0);
  var I2 = C('NonPositiveSafeInteger', (e) => nr(e) && e <= 0);
  var D2 = C('Null', (e) => e === null);
  var U2 = C('Object', _n);
  var B2 = C('PositiveFiniteNumber', (e) => We(e) && 0 < e);
  var G2 = C('PositiveSafeInteger', (e) => nr(e) && 0 < e);
  var Y2 = C('SmallHexString', /^[0-9a-f]*$/);
  var J2 = C('Uint8Array', (e) => It(e) === 'Uint8Array'),
    eP = C('Uint8ClampedArray', (e) => It(e) === 'Uint8ClampedArray'),
    tP = C('Uint16Array', (e) => It(e) === 'Uint16Array'),
    nP = C('Uint32Array', (e) => It(e) === 'Uint32Array'),
    rP = C('Int8Array', (e) => It(e) === 'Int8Array'),
    oP = C('Int16Array', (e) => It(e) === 'Int16Array'),
    iP = C('Int32Array', (e) => It(e) === 'Int32Array'),
    sP = C('Float32Array', (e) => It(e) === 'Float32Array'),
    lP = C('Float64Array', (e) => It(e) === 'Float64Array'),
    aP = C('BigUint64Array', (e) => It(e) === 'BigUint64Array'),
    uP = C(
      'BigInt64Array',
      (e) =>
        It(e) ===
        'B\
igInt64Array',
    );
  var OA = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    pP = C('UUID', (e) => Ee(e) && OA.test(e));
  var vP = C('Undefined', (e) => typeof e > 'u');
  var {
      prototype: { toString: DA },
    } = Object,
    MA = C('Date', (e) => DA.call(e) === '[object Date]'),
    SP = C('ValidDate', (e) => MA(e) && 0 < e.getTime());
  var VA = C('Marker', { pitch: We, yaw: We, text: Ee, id: Ee }),
    $A = C('ViewerConfig', {
      path: Ee,
      title: Ee,
      author: Ee.optional,
      markers: VA.array,
      latitude: We.optional,
      longitude: We.optional,
      altitude: We.optional,
      initPitch: We,
      initYaw: We,
    }),
    a0 = 'script#viewer-config',
    u0 = document.querySelector(a0);
  if (!u0) throw new Error(`NoSuchNode: ${a0}`);
  var Oo = e0(JSON.parse(`${u0.textContent}`), $A);
  var ba = ge(Tt(), 1);
  var Ge = function () {
    return (
      (Ge =
        Object.assign ||
        function (t) {
          for (var n, r = 1, o = arguments.length; r < o; r++) {
            n = arguments[r];
            for (var i in n)
              Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
          }
          return t;
        }),
      Ge.apply(this, arguments)
    );
  };
  function rs(e, t, n) {
    if (n || arguments.length === 2)
      for (var r = 0, o = t.length, i; r < o; r++)
        (i || !(r in t)) &&
          (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]));
    return e.concat(i || Array.prototype.slice.call(t));
  }
  var Ce = ge(Tt()),
    j0 = ge(f0());
  var le = '-ms-',
    Ir = '-moz-',
    ne = '-webkit-',
    Ta = 'comm',
    rr = 'rule',
    Do = 'decl';
  var d0 = '@import';
  var Ra = '@keyframes';
  var p0 = '@layer';
  var h0 = Math.abs,
    os = String.fromCharCode,
    is = Object.assign;
  function m0(e, t) {
    return Ne(e, 0) ^ 45
      ? (((((((t << 2) ^ Ne(e, 0)) << 2) ^ Ne(e, 1)) << 2) ^ Ne(e, 2)) << 2) ^
          Ne(e, 3)
      : 0;
  }
  function xa(e) {
    return e.trim();
  }
  function Kt(e, t) {
    return (e = t.exec(e)) ? e[0] : e;
  }
  function G(e, t, n) {
    return e.replace(t, n);
  }
  function Mo(e, t) {
    return e.indexOf(t);
  }
  function Ne(e, t) {
    return e.charCodeAt(t) | 0;
  }
  function ln(e, t, n) {
    return e.slice(t, n);
  }
  function nt(e) {
    return e.length;
  }
  function Na(e) {
    return e.length;
  }
  function Pr(e, t) {
    return t.push(e), e;
  }
  function v0(e, t) {
    return e.map(t).join('');
  }
  function rd(e, t) {
    return e.filter(function (n) {
      return !Kt(n, t);
    });
  }
  var Aa = 1,
    Vo = 1,
    y0 = 0,
    Pt = 0,
    ke = 0,
    $o = '';
  function ss(e, t, n, r, o, i, s, l) {
    return {
      value: e,
      root: t,
      parent: n,
      type: r,
      props: o,
      children: i,
      line: Aa,
      column: Vo,
      length: s,
      return: '',
      siblings: l,
    };
  }
  function En(e, t) {
    return is(
      ss('', null, null, '', null, null, 0, e.siblings),
      e,
      { length: -e.length },
      t,
    );
  }
  function Or(e) {
    for (; e.root; ) e = En(e.root, { children: [e] });
    Pr(e, e.siblings);
  }
  function g0() {
    return ke;
  }
  function S0() {
    return (
      (ke = Pt > 0 ? Ne($o, --Pt) : 0), Vo--, ke === 10 && ((Vo = 1), Aa--), ke
    );
  }
  function Ot() {
    return (
      (ke = Pt < y0 ? Ne($o, Pt++) : 0), Vo++, ke === 10 && ((Vo = 1), Aa++), ke
    );
  }
  function or() {
    return Ne($o, Pt);
  }
  function ls() {
    return Pt;
  }
  function Ca(e, t) {
    return ln($o, e, t);
  }
  function od(e) {
    switch (e) {
      case 0:
      case 9:
      case 10:
      case 13:
      case 32:
        return 5;
      case 33:
      case 43:
      case 44:
      case 47:
      case 62:
      case 64:
      case 126:
      case 59:
      case 123:
      case 125:
        return 4;
      case 58:
        return 3;
      case 34:
      case 39:
      case 40:
      case 91:
        return 2;
      case 41:
      case 93:
        return 1;
    }
    return 0;
  }
  function _0(e) {
    return (Aa = Vo = 1), (y0 = nt(($o = e))), (Pt = 0), [];
  }
  function E0(e) {
    return ($o = ''), e;
  }
  function La(e) {
    return xa(Ca(Pt - 1, id(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
  }
  function w0(e) {
    for (; (ke = or()) && ke < 33; ) Ot();
    return od(e) > 2 || od(ke) > 3 ? '' : ' ';
  }
  function T0(e, t) {
    for (
      ;
      --t &&
      Ot() &&
      !(ke < 48 || ke > 102 || (ke > 57 && ke < 65) || (ke > 70 && ke < 97));

    );
    return Ca(e, ls() + (t < 6 && or() == 32 && Ot() == 32));
  }
  function id(e) {
    for (; Ot(); )
      switch (ke) {
        case e:
          return Pt;
        case 34:
        case 39:
          e !== 34 && e !== 39 && id(ke);
          break;
        case 40:
          e === 41 && id(e);
          break;
        case 92:
          Ot();
          break;
      }
    return Pt;
  }
  function R0(e, t) {
    for (; Ot() && e + ke !== 47 + 10; )
      if (e + ke === 42 + 42 && or() === 47) break;
    return '/*' + Ca(t, Pt - 1) + '*' + os(e === 47 ? e : Ot());
  }
  function x0(e) {
    for (; !od(or()); ) Ot();
    return Ca(e, Pt);
  }
  function C0(e) {
    return E0(ka('', null, null, null, [''], (e = _0(e)), 0, [0], e));
  }
  function ka(e, t, n, r, o, i, s, l, a) {
    for (
      var u = 0,
        f = 0,
        p = s,
        m = 0,
        S = 0,
        y = 0,
        w = 1,
        U = 1,
        h = 1,
        c = 0,
        d = '',
        E = o,
        R = i,
        x = r,
        T = d;
      U;

    )
      switch (((y = c), (c = Ot()))) {
        case 40:
          if (y != 108 && Ne(T, p - 1) == 58) {
            Mo((T += G(La(c), '&', '&\f')), '&\f') != -1 && (h = -1);
            break;
          }
        case 34:
        case 39:
        case 91:
          T += La(c);
          break;
        case 9:
        case 10:
        case 13:
        case 32:
          T += w0(y);
          break;
        case 92:
          T += T0(ls() - 1, 7);
          continue;
        case 47:
          switch (or()) {
            case 42:
            case 47:
              Pr(UA(R0(Ot(), ls()), t, n, a), a);
              break;
            default:
              T += '/';
          }
          break;
        case 123 * w:
          l[u++] = nt(T) * h;
        case 125 * w:
        case 59:
        case 0:
          switch (c) {
            case 0:
            case 125:
              U = 0;
            case 59 + f:
              h == -1 && (T = G(T, /\f/g, '')),
                S > 0 &&
                  nt(T) - p &&
                  Pr(
                    S > 32
                      ? A0(T + ';', r, n, p - 1, a)
                      : A0(G(T, ' ', '') + ';', r, n, p - 2, a),
                    a,
                  );
              break;
            case 59:
              T += ';';
            default:
              if (
                (Pr(
                  (x = N0(T, t, n, u, f, o, l, d, (E = []), (R = []), p, i)),
                  i,
                ),
                c === 123)
              )
                if (f === 0) ka(T, t, x, x, E, i, p, l, R);
                else
                  switch (m === 99 && Ne(T, 3) === 110 ? 100 : m) {
                    case 100:
                    case 108:
                    case 109:
                    case 115:
                      ka(
                        e,
                        x,
                        x,
                        r &&
                          Pr(N0(e, x, x, 0, 0, o, l, d, o, (E = []), p, R), R),
                        o,
                        R,
                        p,
                        l,
                        r ? E : R,
                      );
                      break;
                    default:
                      ka(T, x, x, x, [''], R, 0, l, R);
                  }
          }
          (u = f = S = 0), (w = h = 1), (d = T = ''), (p = s);
          break;
        case 58:
          (p = 1 + nt(T)), (S = y);
        default:
          if (w < 1) {
            if (c == 123) --w;
            else if (c == 125 && w++ == 0 && S0() == 125) continue;
          }
          switch (((T += os(c)), c * w)) {
            case 38:
              h = f > 0 ? 1 : ((T += '\f'), -1);
              break;
            case 44:
              (l[u++] = (nt(T) - 1) * h), (h = 1);
              break;
            case 64:
              or() === 45 && (T += La(Ot())),
                (m = or()),
                (f = p = nt((d = T += x0(ls())))),
                c++;
              break;
            case 45:
              y === 45 && nt(T) == 2 && (w = 0);
          }
      }
    return i;
  }
  function N0(e, t, n, r, o, i, s, l, a, u, f, p) {
    for (
      var m = o - 1, S = o === 0 ? i : [''], y = Na(S), w = 0, U = 0, h = 0;
      w < r;
      ++w
    )
      for (var c = 0, d = ln(e, m + 1, (m = h0((U = s[w])))), E = e; c < y; ++c)
        (E = xa(U > 0 ? S[c] + ' ' + d : G(d, /&\f/g, S[c]))) && (a[h++] = E);
    return ss(e, t, n, o === 0 ? rr : l, a, u, f, p);
  }
  function UA(e, t, n, r) {
    return ss(e, t, n, Ta, os(g0()), ln(e, 2, -2), 0, r);
  }
  function A0(e, t, n, r, o) {
    return ss(e, t, n, Do, ln(e, 0, r), ln(e, r + 1, -1), r, o);
  }
  function sd(e, t, n) {
    switch (m0(e, t)) {
      case 5103:
        return ne + 'print-' + e + e;
      case 5737:
      case 4201:
      case 3177:
      case 3433:
      case 1641:
      case 4457:
      case 2921:
      case 5572:
      case 6356:
      case 5844:
      case 3191:
      case 6645:
      case 3005:
      case 6391:
      case 5879:
      case 5623:
      case 6135:
      case 4599:
      case 4855:
      case 4215:
      case 6389:
      case 5109:
      case 5365:
      case 5621:
      case 3829:
        return ne + e + e;
      case 4789:
        return Ir + e + e;
      case 5349:
      case 4246:
      case 4810:
      case 6968:
      case 2756:
        return ne + e + Ir + e + le + e + e;
      case 5936:
        switch (Ne(e, t + 11)) {
          case 114:
            return ne + e + le + G(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
          case 108:
            return ne + e + le + G(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
          case 45:
            return ne + e + le + G(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
        }
      case 6828:
      case 4268:
      case 2903:
        return ne + e + le + e + e;
      case 6165:
        return ne + e + le + 'flex-' + e + e;
      case 5187:
        return (
          ne +
          e +
          G(e, /(\w+).+(:[^]+)/, ne + 'box-$1$2' + le + 'flex-$1$2') +
          e
        );
      case 5443:
        return (
          ne +
          e +
          le +
          'flex-item-' +
          G(e, /flex-|-self/g, '') +
          (Kt(e, /flex-|baseline/)
            ? ''
            : le + 'grid-row-' + G(e, /flex-|-self/g, '')) +
          e
        );
      case 4675:
        return (
          ne +
          e +
          le +
          'flex-line-pack' +
          G(e, /align-content|flex-|-self/g, '') +
          e
        );
      case 5548:
        return ne + e + le + G(e, 'shrink', 'negative') + e;
      case 5292:
        return ne + e + le + G(e, 'basis', 'preferred-size') + e;
      case 6060:
        return (
          ne +
          'box-' +
          G(e, '-grow', '') +
          ne +
          e +
          le +
          G(e, 'grow', 'positive') +
          e
        );
      case 4554:
        return ne + G(e, /([^-])(transform)/g, '$1' + ne + '$2') + e;
      case 6187:
        return (
          G(
            G(G(e, /(zoom-|grab)/, ne + '$1'), /(image-set)/, ne + '$1'),
            e,
            '',
          ) + e
        );
      case 5495:
      case 3959:
        return G(e, /(image-set\([^]*)/, ne + '$1$`$1');
      case 4968:
        return (
          G(
            G(e, /(.+:)(flex-)?(.*)/, ne + 'box-pack:$3' + le + 'flex-pack:$3'),
            /s.+-b[^;]+/,
            'justify',
          ) +
          ne +
          e +
          e
        );
      case 4200:
        if (!Kt(e, /flex-|baseline/))
          return le + 'grid-column-align' + ln(e, t) + e;
        break;
      case 2592:
      case 3360:
        return le + G(e, 'template-', '') + e;
      case 4384:
      case 3616:
        return n &&
          n.some(function (r, o) {
            return (t = o), Kt(r.props, /grid-\w+-end/);
          })
          ? ~Mo(e + (n = n[t].value), 'span')
            ? e
            : le +
              G(e, '-start', '') +
              e +
              le +
              'grid-row-span:' +
              (~Mo(n, 'span') ? Kt(n, /\d+/) : +Kt(n, /\d+/) - +Kt(e, /\d+/)) +
              ';'
          : le + G(e, '-start', '') + e;
      case 4896:
      case 4128:
        return n &&
          n.some(function (r) {
            return Kt(r.props, /grid-\w+-start/);
          })
          ? e
          : le + G(G(e, '-end', '-span'), 'span ', '') + e;
      case 4095:
      case 3583:
      case 4068:
      case 2532:
        return G(e, /(.+)-inline(.+)/, ne + '$1$2') + e;
      case 8116:
      case 7059:
      case 5753:
      case 5535:
      case 5445:
      case 5701:
      case 4933:
      case 4677:
      case 5533:
      case 5789:
      case 5021:
      case 4765:
        if (nt(e) - 1 - t > 6)
          switch (Ne(e, t + 1)) {
            case 109:
              if (Ne(e, t + 4) !== 45) break;
            case 102:
              return (
                G(
                  e,
                  /(.+:)(.+)-([^]+)/,
                  '$1' +
                    ne +
                    '$2-$3$1' +
                    Ir +
                    (Ne(e, t + 3) == 108 ? '$3' : '$2-$3'),
                ) + e
              );
            case 115:
              return ~Mo(e, 'stretch')
                ? sd(G(e, 'stretch', 'fill-available'), t, n) + e
                : e;
          }
        break;
      case 5152:
      case 5920:
        return G(
          e,
          /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,
          function (r, o, i, s, l, a, u) {
            return (
              le +
              o +
              ':' +
              i +
              u +
              (s ? le + o + '-span:' + (l ? a : +a - +i) + u : '') +
              e
            );
          },
        );
      case 4949:
        if (Ne(e, t + 6) === 121) return G(e, ':', ':' + ne) + e;
        break;
      case 6444:
        switch (Ne(e, Ne(e, 14) === 45 ? 18 : 11)) {
          case 120:
            return (
              G(
                e,
                /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,
                '$1' +
                  ne +
                  (Ne(e, 14) === 45 ? 'inline-' : '') +
                  'box$3$1' +
                  ne +
                  '$2$3$1' +
                  le +
                  '$2box$3',
              ) + e
            );
          case 100:
            return G(e, ':', ':' + le) + e;
        }
        break;
      case 5719:
      case 2647:
      case 2135:
      case 3927:
      case 2391:
        return G(e, 'scroll-', 'scroll-snap-') + e;
    }
    return e;
  }
  function Uo(e, t) {
    for (var n = '', r = 0; r < e.length; r++) n += t(e[r], r, e, t) || '';
    return n;
  }
  function L0(e, t, n, r) {
    switch (e.type) {
      case p0:
        if (e.children.length) break;
      case d0:
      case Do:
        return (e.return = e.return || e.value);
      case Ta:
        return '';
      case Ra:
        return (e.return = e.value + '{' + Uo(e.children, r) + '}');
      case rr:
        if (!nt((e.value = e.props.join(',')))) return '';
    }
    return nt((n = Uo(e.children, r)))
      ? (e.return = e.value + '{' + n + '}')
      : '';
  }
  function k0(e) {
    var t = Na(e);
    return function (n, r, o, i) {
      for (var s = '', l = 0; l < t; l++) s += e[l](n, r, o, i) || '';
      return s;
    };
  }
  function I0(e) {
    return function (t) {
      t.root || ((t = t.return) && e(t));
    };
  }
  function P0(e, t, n, r) {
    if (e.length > -1 && !e.return)
      switch (e.type) {
        case Do:
          e.return = sd(e.value, e.length, n);
          return;
        case Ra:
          return Uo([En(e, { value: G(e.value, '@', '@' + ne) })], r);
        case rr:
          if (e.length)
            return v0((n = e.props), function (o) {
              switch (Kt(o, (r = /(::plac\w+|:read-\w+)/))) {
                case ':read-only':
                case ':read-write':
                  Or(
                    En(e, {
                      props: [
                        G(
                          o,
                          /:(read-\w+)/,
                          '\
:' +
                            Ir +
                            '$1',
                        ),
                      ],
                    }),
                  ),
                    Or(En(e, { props: [o] })),
                    is(e, { props: rd(n, r) });
                  break;
                case '::placeholder':
                  Or(
                    En(e, {
                      props: [G(o, /:(plac\w+)/, ':' + ne + 'input-$1')],
                    }),
                  ),
                    Or(En(e, { props: [G(o, /:(plac\w+)/, ':' + Ir + '$1')] })),
                    Or(En(e, { props: [G(o, /:(plac\w+)/, le + 'input-$1')] })),
                    Or(En(e, { props: [o] })),
                    is(e, { props: rd(n, r) });
                  break;
              }
              return '';
            });
      }
  }
  var O0 = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  };
  var Tn =
    (typeof process < 'u' &&
      process.env !== void 0 &&
      (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR)) ||
    'data-styled';
  var yd = typeof window < 'u' && 'HTMLElement' in window,
    bA = !!(typeof SC_DISABLE_SPEEDY == 'boolean'
      ? SC_DISABLE_SPEEDY
      : typeof process < 'u' &&
        process.env !== void 0 &&
        process.env.REACT_APP_SC_DISABLE_SPEEDY !== void 0 &&
        process.env.REACT_APP_SC_DISABLE_SPEEDY !== ''
      ? process.env.REACT_APP_SC_DISABLE_SPEEDY !== 'false' &&
        process.env.REACT_APP_SC_DISABLE_SPEEDY
      : typeof process < 'u' &&
        process.env !== void 0 &&
        process.env.SC_DISABLE_SPEEDY !== void 0 &&
        process.env.SC_DISABLE_SPEEDY !== '' &&
        process.env.SC_DISABLE_SPEEDY !== 'false' &&
        process.env.SC_DISABLE_SPEEDY);
  var Ma = Object.freeze([]),
    Fo = Object.freeze({});
  function FA(e, t, n) {
    return (
      n === void 0 && (n = Fo), (e.theme !== n.theme && e.theme) || t || n.theme
    );
  }
  var H0 = new Set([
      'a',
      'abbr',
      'address',
      'area',
      'article',
      'aside',
      'audio',
      'b',
      'base',
      'bdi',
      'bdo',
      'big',
      'blockquote',
      'body',
      'br',
      'button',
      'canvas',
      'caption',
      'cite',
      'code',
      'col',
      'colgroup',
      'data',
      'datalist',
      'dd',
      'del',
      'details',
      'dfn',
      'dialog',
      'div',
      'dl',
      'dt',
      'em',
      'embed',
      'fieldset',
      'figcaption',
      'figure',
      'footer',
      'form',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'head',
      'header',
      'hgroup',
      'hr',
      'html',
      'i',
      'iframe',
      'img',
      'input',
      'ins',
      'kbd',
      'keygen',
      'label',
      'legend',
      'li',
      'link',
      'main',
      'map',
      'mark',
      'menu',
      'menuitem',
      'meta',
      'meter',
      'nav',
      'noscript',
      'object',
      'ol',
      'optgroup',
      'option',
      'output',
      'p',
      'param',
      'picture',
      'pre',
      'progress',
      'q',
      'rp',
      'rt',
      'ruby',
      's',
      'samp',
      'script',
      'section',
      'select',
      'small',
      'source',
      'span',
      'strong',
      'style',
      'sub',
      'summary',
      'sup',
      'table',
      'tbody',
      'td',
      'textarea',
      'tfoot',
      'th',
      'thead',
      'time',
      'title',
      'tr',
      'track',
      'u',
      'ul',
      'use',
      'var',
      'video',
      'wbr',
      'circle',
      'clipPath',
      'defs',
      'ellipse',
      'foreignObject',
      'g',
      'image',
      'line',
      'linearGradient',
      'marker',
      'mask',
      'path',
      'pattern',
      'polygon',
      'polyline',
      'radialGradient',
      'rect',
      'stop',
      'svg',
      'text',
      'tspan',
    ]),
    zA = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,
    BA = /(^-|-$)/g;
  function D0(e) {
    return e.replace(zA, '-').replace(BA, '');
  }
  var jA = /(a)(d)/gi,
    M0 = function (e) {
      return String.fromCharCode(e + (e > 25 ? 39 : 97));
    };
  function fd(e) {
    var t,
      n = '';
    for (t = Math.abs(e); t > 52; t = (t / 52) | 0) n = M0(t % 52) + n;
    return (M0(t % 52) + n).replace(jA, '$1-$2');
  }
  var ld,
    bo = function (e, t) {
      for (var n = t.length; n; ) e = (33 * e) ^ t.charCodeAt(--n);
      return e;
    },
    W0 = function (e) {
      return bo(5381, e);
    };
  function HA(e) {
    return fd(W0(e) >>> 0);
  }
  function WA(e) {
    return e.displayName || e.name || 'Component';
  }
  function ad(e) {
    return typeof e == 'string' && !0;
  }
  var G0 = typeof Symbol == 'function' && Symbol.for,
    K0 = G0 ? Symbol.for('react.memo') : 60115,
    GA = G0 ? Symbol.for('react.forward_ref') : 60112,
    KA = {
      childContextTypes: !0,
      contextType: !0,
      contextTypes: !0,
      defaultProps: !0,
      displayName: !0,
      getDefaultProps: !0,
      getDerivedStateFromError: !0,
      getDerivedStateFromProps: !0,
      mixins: !0,
      propTypes: !0,
      type: !0,
    },
    QA = {
      name: !0,
      length: !0,
      prototype: !0,
      caller: !0,
      callee: !0,
      arguments: !0,
      arity: !0,
    },
    Q0 = {
      $$typeof: !0,
      compare: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
      type: !0,
    },
    YA =
      (((ld = {})[GA] = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
      }),
      (ld[K0] = Q0),
      ld);
  function V0(e) {
    return ('type' in (t = e) && t.type.$$typeof) === K0
      ? Q0
      : '$$typeof' in e
      ? YA[e.$$typeof]
      : KA;
    var t;
  }
  var ZA = Object.defineProperty,
    XA = Object.getOwnPropertyNames,
    $0 = Object.getOwnPropertySymbols,
    qA = Object.getOwnPropertyDescriptor,
    JA = Object.getPrototypeOf,
    U0 = Object.prototype;
  function Y0(e, t, n) {
    if (typeof t != 'string') {
      if (U0) {
        var r = JA(t);
        r && r !== U0 && Y0(e, r, n);
      }
      var o = XA(t);
      $0 && (o = o.concat($0(t)));
      for (var i = V0(e), s = V0(t), l = 0; l < o.length; ++l) {
        var a = o[l];
        if (!(a in QA || (n && n[a]) || (s && a in s) || (i && a in i))) {
          var u = qA(t, a);
          try {
            ZA(e, a, u);
          } catch {}
        }
      }
    }
    return e;
  }
  function zo(e) {
    return typeof e == 'function';
  }
  function gd(e) {
    return typeof e == 'object' && 'styledComponentId' in e;
  }
  function Dr(e, t) {
    return e && t ? ''.concat(e, ' ').concat(t) : e || t || '';
  }
  function Oa(e, t) {
    if (e.length === 0) return '';
    for (var n = e[0], r = 1; r < e.length; r++) n += t ? t + e[r] : e[r];
    return n;
  }
  function as(e) {
    return (
      e !== null &&
      typeof e == 'object' &&
      e.constructor.name === Object.name &&
      !('props' in e && e.$$typeof)
    );
  }
  function dd(e, t, n) {
    if ((n === void 0 && (n = !1), !n && !as(e) && !Array.isArray(e))) return t;
    if (Array.isArray(t))
      for (var r = 0; r < t.length; r++) e[r] = dd(e[r], t[r]);
    else if (as(t)) for (var r in t) e[r] = dd(e[r], t[r]);
    return e;
  }
  function Sd(e, t) {
    Object.defineProperty(e, 'toString', { value: t });
  }
  function wn(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    return new Error(
      'An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#'
        .concat(e, ' for more information.')
        .concat(t.length > 0 ? ' Args: '.concat(t.join(', ')) : ''),
    );
  }
  var eC = (function () {
      function e(t) {
        (this.groupSizes = new Uint32Array(512)),
          (this.length = 512),
          (this.tag = t);
      }
      return (
        (e.prototype.indexOfGroup = function (t) {
          for (var n = 0, r = 0; r < t; r++) n += this.groupSizes[r];
          return n;
        }),
        (e.prototype.insertRules = function (t, n) {
          if (t >= this.groupSizes.length) {
            for (var r = this.groupSizes, o = r.length, i = o; t >= i; )
              if ((i <<= 1) < 0) throw wn(16, ''.concat(t));
            (this.groupSizes = new Uint32Array(i)),
              this.groupSizes.set(r),
              (this.length = i);
            for (var s = o; s < i; s++) this.groupSizes[s] = 0;
          }
          for (
            var l = this.indexOfGroup(t + 1), a = ((s = 0), n.length);
            s < a;
            s++
          )
            this.tag.insertRule(l, n[s]) && (this.groupSizes[t]++, l++);
        }),
        (e.prototype.clearGroup = function (t) {
          if (t < this.length) {
            var n = this.groupSizes[t],
              r = this.indexOfGroup(t),
              o = r + n;
            this.groupSizes[t] = 0;
            for (var i = r; i < o; i++) this.tag.deleteRule(r);
          }
        }),
        (e.prototype.getGroup = function (t) {
          var n = '';
          if (t >= this.length || this.groupSizes[t] === 0) return n;
          for (
            var r = this.groupSizes[t],
              o = this.indexOfGroup(t),
              i = o + r,
              s = o;
            s < i;
            s++
          )
            n += ''.concat(this.tag.getRule(s)).concat(`/*!sc*/
`);
          return n;
        }),
        e
      );
    })(),
    Pa = new Map(),
    Da = new Map(),
    ud = 1,
    Ia = function (e) {
      if (Pa.has(e)) return Pa.get(e);
      for (; Da.has(ud); ) ud++;
      var t = ud++;
      return Pa.set(e, t), Da.set(t, e), t;
    },
    tC = function (e, t) {
      Pa.set(e, t), Da.set(t, e);
    },
    nC = 'style['
      .concat(Tn, '][')
      .concat('data-styled-version', '="')
      .concat('6.0.7', '"]'),
    rC = new RegExp(
      '^'.concat(Tn, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),
    ),
    oC = function (e, t, n) {
      for (var r, o = n.split(','), i = 0, s = o.length; i < s; i++)
        (r = o[i]) && e.registerName(t, r);
    },
    iC = function (e, t) {
      for (
        var n,
          r = ((n = t.textContent) !== null && n !== void 0 ? n : '')
            .split(`/*!sc*/
`),
          o = [],
          i = 0,
          s = r.length;
        i < s;
        i++
      ) {
        var l = r[i].trim();
        if (l) {
          var a = l.match(rC);
          if (a) {
            var u = 0 | parseInt(a[1], 10),
              f = a[2];
            u !== 0 && (tC(f, u), oC(e, f, a[3]), e.getTag().insertRules(u, o)),
              (o.length = 0);
          } else o.push(l);
        }
      }
    };
  function pd() {
    return typeof __webpack_nonce__ < 'u' ? __webpack_nonce__ : null;
  }
  var Z0 = function (e) {
      var t = document.head,
        n = e || t,
        r = document.createElement('style'),
        o = (function (l) {
          var a = Array.from(l.querySelectorAll('style['.concat(Tn, ']')));
          return a[a.length - 1];
        })(n),
        i = o !== void 0 ? o.nextSibling : null;
      r.setAttribute(Tn, 'active'),
        r.setAttribute('data-styled-version', '6.0.7');
      var s = pd();
      return s && r.setAttribute('nonce', s), n.insertBefore(r, i), r;
    },
    sC = (function () {
      function e(t) {
        (this.element = Z0(t)),
          this.element.appendChild(document.createTextNode('')),
          (this.sheet = (function (n) {
            if (n.sheet) return n.sheet;
            for (
              var r = document.styleSheets, o = 0, i = r.length;
              o < i;
              o++
            ) {
              var s = r[o];
              if (s.ownerNode === n) return s;
            }
            throw wn(17);
          })(this.element)),
          (this.length = 0);
      }
      return (
        (e.prototype.insertRule = function (t, n) {
          try {
            return this.sheet.insertRule(n, t), this.length++, !0;
          } catch {
            return !1;
          }
        }),
        (e.prototype.deleteRule = function (t) {
          this.sheet.deleteRule(t), this.length--;
        }),
        (e.prototype.getRule = function (t) {
          var n = this.sheet.cssRules[t];
          return n && n.cssText ? n.cssText : '';
        }),
        e
      );
    })(),
    lC = (function () {
      function e(t) {
        (this.element = Z0(t)),
          (this.nodes = this.element.childNodes),
          (this.length = 0);
      }
      return (
        (e.prototype.insertRule = function (t, n) {
          if (t <= this.length && t >= 0) {
            var r = document.createTextNode(n);
            return (
              this.element.insertBefore(r, this.nodes[t] || null),
              this.length++,
              !0
            );
          }
          return !1;
        }),
        (e.prototype.deleteRule = function (t) {
          this.element.removeChild(this.nodes[t]), this.length--;
        }),
        (e.prototype.getRule = function (t) {
          return t < this.length ? this.nodes[t].textContent : '';
        }),
        e
      );
    })(),
    aC = (function () {
      function e(t) {
        (this.rules = []), (this.length = 0);
      }
      return (
        (e.prototype.insertRule = function (t, n) {
          return (
            t <= this.length && (this.rules.splice(t, 0, n), this.length++, !0)
          );
        }),
        (e.prototype.deleteRule = function (t) {
          this.rules.splice(t, 1), this.length--;
        }),
        (e.prototype.getRule = function (t) {
          return t < this.length ? this.rules[t] : '';
        }),
        e
      );
    })(),
    b0 = yd,
    uC = { isServer: !yd, useCSSOMInjection: !bA },
    us = (function () {
      function e(t, n, r) {
        t === void 0 && (t = Fo), n === void 0 && (n = {});
        var o = this;
        (this.options = Ge(Ge({}, uC), t)),
          (this.gs = n),
          (this.names = new Map(r)),
          (this.server = !!t.isServer),
          !this.server &&
            yd &&
            b0 &&
            ((b0 = !1),
            (function (i) {
              for (
                var s = document.querySelectorAll(nC), l = 0, a = s.length;
                l < a;
                l++
              ) {
                var u = s[l];
                u &&
                  u.getAttribute(Tn) !== 'active' &&
                  (iC(i, u), u.parentNode && u.parentNode.removeChild(u));
              }
            })(this)),
          Sd(this, function () {
            return (function (i) {
              for (
                var s = i.getTag(),
                  l = s.length,
                  a = '',
                  u = function (p) {
                    var m = (function (h) {
                      return Da.get(h);
                    })(p);
                    if (m === void 0) return 'continue';
                    var S = i.names.get(m),
                      y = s.getGroup(p);
                    if (S === void 0 || y.length === 0) return 'continue';
                    var w = ''
                        .concat(Tn, '.g')
                        .concat(p, '[id="')
                        .concat(m, '"]'),
                      U = '';
                    S !== void 0 &&
                      S.forEach(function (h) {
                        h.length > 0 && (U += ''.concat(h, ','));
                      }),
                      (a += ''.concat(y).concat(w, '{content:"').concat(U, '"}')
                        .concat(`/*!sc*/
`));
                  },
                  f = 0;
                f < l;
                f++
              )
                u(f);
              return a;
            })(o);
          });
      }
      return (
        (e.registerId = function (t) {
          return Ia(t);
        }),
        (e.prototype.reconstructWithOptions = function (t, n) {
          return (
            n === void 0 && (n = !0),
            new e(
              Ge(Ge({}, this.options), t),
              this.gs,
              (n && this.names) || void 0,
            )
          );
        }),
        (e.prototype.allocateGSInstance = function (t) {
          return (this.gs[t] = (this.gs[t] || 0) + 1);
        }),
        (e.prototype.getTag = function () {
          return (
            this.tag ||
            (this.tag =
              ((t = (function (n) {
                var r = n.useCSSOMInjection,
                  o = n.target;
                return n.isServer ? new aC(o) : r ? new sC(o) : new lC(o);
              })(this.options)),
              new eC(t)))
          );
          var t;
        }),
        (e.prototype.hasNameForId = function (t, n) {
          return this.names.has(t) && this.names.get(t).has(n);
        }),
        (e.prototype.registerName = function (t, n) {
          if ((Ia(t), this.names.has(t))) this.names.get(t).add(n);
          else {
            var r = new Set();
            r.add(n), this.names.set(t, r);
          }
        }),
        (e.prototype.insertRules = function (t, n, r) {
          this.registerName(t, n), this.getTag().insertRules(Ia(t), r);
        }),
        (e.prototype.clearNames = function (t) {
          this.names.has(t) && this.names.get(t).clear();
        }),
        (e.prototype.clearRules = function (t) {
          this.getTag().clearGroup(Ia(t)), this.clearNames(t);
        }),
        (e.prototype.clearTag = function () {
          this.tag = void 0;
        }),
        e
      );
    })(),
    cC = /&/g,
    fC = /^\s*\/\/.*$/gm;
  function X0(e, t) {
    return e.map(function (n) {
      return (
        n.type === 'rule' &&
          ((n.value = ''.concat(t, ' ').concat(n.value)),
          (n.value = n.value.replaceAll(',', ','.concat(t, ' '))),
          (n.props = n.props.map(function (r) {
            return ''.concat(t, ' ').concat(r);
          }))),
        Array.isArray(n.children) &&
          n.type !== '@keyframes' &&
          (n.children = X0(n.children, t)),
        n
      );
    });
  }
  function q0(e) {
    var t,
      n,
      r,
      o = e === void 0 ? Fo : e,
      i = o.options,
      s = i === void 0 ? Fo : i,
      l = o.plugins,
      a = l === void 0 ? Ma : l,
      u = function (m, S, y) {
        return y === n ||
          (y.startsWith(n) && y.endsWith(n) && y.replaceAll(n, '').length > 0)
          ? '.'.concat(t)
          : m;
      },
      f = a.slice();
    f.push(function (m) {
      m.type === rr &&
        m.value.includes('&') &&
        (m.props[0] = m.props[0].replace(cC, n).replace(r, u));
    }),
      s.prefix && f.push(P0),
      f.push(L0);
    var p = function (m, S, y, w) {
      S === void 0 && (S = ''),
        y === void 0 && (y = ''),
        w === void 0 && (w = '&'),
        (t = w),
        (n = S),
        (r = new RegExp('\\'.concat(n, '\\b'), 'g'));
      var U = m.replace(fC, ''),
        h = C0(y || S ? ''.concat(y, ' ').concat(S, ' { ').concat(U, ' }') : U);
      s.namespace && (h = X0(h, s.namespace));
      var c = [];
      return (
        Uo(
          h,
          k0(
            f.concat(
              I0(function (d) {
                return c.push(d);
              }),
            ),
          ),
        ),
        c
      );
    };
    return (
      (p.hash = a.length
        ? a
            .reduce(function (m, S) {
              return S.name || wn(15), bo(m, S.name);
            }, 5381)
            .toString()
        : ''),
      p
    );
  }
  var dC = new us(),
    hd = q0(),
    _d = Ce.default.createContext({
      shouldForwardProp: void 0,
      styleSheet: dC,
      stylis: hd,
    }),
    tD = _d.Consumer,
    pC = Ce.default.createContext(void 0);
  function md() {
    return (0, Ce.useContext)(_d);
  }
  function hC(e) {
    var t = (0, Ce.useState)(e.stylisPlugins),
      n = t[0],
      r = t[1],
      o = md().styleSheet,
      i = (0, Ce.useMemo)(
        function () {
          var l = o;
          return (
            e.sheet
              ? (l = e.sheet)
              : e.target &&
                (l = l.reconstructWithOptions({ target: e.target }, !1)),
            e.disableCSSOMInjection &&
              (l = l.reconstructWithOptions({ useCSSOMInjection: !1 })),
            l
          );
        },
        [e.disableCSSOMInjection, e.sheet, e.target, o],
      ),
      s = (0, Ce.useMemo)(
        function () {
          return q0({
            options: { namespace: e.namespace, prefix: e.enableVendorPrefixes },
            plugins: n,
          });
        },
        [e.enableVendorPrefixes, e.namespace, n],
      );
    return (
      (0, Ce.useEffect)(
        function () {
          (0, j0.default)(n, e.stylisPlugins) || r(e.stylisPlugins);
        },
        [e.stylisPlugins],
      ),
      Ce.default.createElement(
        _d.Provider,
        {
          value: {
            shouldForwardProp: e.shouldForwardProp,
            styleSheet: i,
            stylis: s,
          },
        },
        Ce.default.createElement(pC.Provider, { value: s }, e.children),
      )
    );
  }
  var mC = (function () {
      function e(t, n) {
        var r = this;
        (this.inject = function (o, i) {
          i === void 0 && (i = hd);
          var s = r.name + i.hash;
          o.hasNameForId(r.id, s) ||
            o.insertRules(r.id, s, i(r.rules, s, '@keyframes'));
        }),
          (this.name = t),
          (this.id = 'sc-keyframes-'.concat(t)),
          (this.rules = n),
          Sd(this, function () {
            throw wn(12, String(r.name));
          });
      }
      return (
        (e.prototype.getName = function (t) {
          return t === void 0 && (t = hd), this.name + t.hash;
        }),
        e
      );
    })(),
    vC = function (e) {
      return e >= 'A' && e <= 'Z';
    };
  function F0(e) {
    for (var t = '', n = 0; n < e.length; n++) {
      var r = e[n];
      if (n === 1 && r === '-' && e[0] === '-') return e;
      vC(r) ? (t += '-' + r.toLowerCase()) : (t += r);
    }
    return t.startsWith('ms-') ? '-' + t : t;
  }
  var J0 = function (e) {
      return e == null || e === !1 || e === '';
    },
    eg = function (e) {
      var t,
        n,
        r = [];
      for (var o in e) {
        var i = e[o];
        e.hasOwnProperty(o) &&
          !J0(i) &&
          ((Array.isArray(i) && i.isCss) || zo(i)
            ? r.push(''.concat(F0(o), ':'), i, ';')
            : as(i)
            ? r.push.apply(
                r,
                rs(rs([''.concat(o, ' {')], eg(i), !1), ['}'], !1),
              )
            : r.push(
                ''
                  .concat(F0(o), ': ')
                  .concat(
                    ((t = o),
                    (n = i) == null || typeof n == 'boolean' || n === ''
                      ? ''
                      : typeof n != 'number' ||
                        n === 0 ||
                        t in O0 ||
                        t.startsWith('--')
                      ? String(n).trim()
                      : ''.concat(n, 'px')),
                    ';',
                  ),
              ));
      }
      return r;
    };
  function ir(e, t, n, r) {
    if (J0(e)) return [];
    if (gd(e)) return ['.'.concat(e.styledComponentId)];
    if (zo(e)) {
      if (!zo((i = e)) || (i.prototype && i.prototype.isReactComponent) || !t)
        return [e];
      var o = e(t);
      return ir(o, t, n, r);
    }
    var i;
    return e instanceof mC
      ? n
        ? (e.inject(n, r), [e.getName(r)])
        : [e]
      : as(e)
      ? eg(e)
      : Array.isArray(e)
      ? Array.prototype.concat.apply(
          Ma,
          e.map(function (s) {
            return ir(s, t, n, r);
          }),
        )
      : [e.toString()];
  }
  function tg(e) {
    for (var t = 0; t < e.length; t += 1) {
      var n = e[t];
      if (zo(n) && !gd(n)) return !1;
    }
    return !0;
  }
  var yC = W0('6.0.7'),
    gC = (function () {
      function e(t, n, r) {
        (this.rules = t),
          (this.staticRulesId = ''),
          (this.isStatic = (r === void 0 || r.isStatic) && tg(t)),
          (this.componentId = n),
          (this.baseHash = bo(yC, n)),
          (this.baseStyle = r),
          us.registerId(n);
      }
      return (
        (e.prototype.generateAndInjectStyles = function (t, n, r) {
          var o = this.baseStyle
            ? this.baseStyle.generateAndInjectStyles(t, n, r)
            : '';
          if (this.isStatic && !r.hash)
            if (
              this.staticRulesId &&
              n.hasNameForId(this.componentId, this.staticRulesId)
            )
              o = Dr(o, this.staticRulesId);
            else {
              var i = Oa(ir(this.rules, t, n, r)),
                s = fd(bo(this.baseHash, i) >>> 0);
              if (!n.hasNameForId(this.componentId, s)) {
                var l = r(i, '.'.concat(s), void 0, this.componentId);
                n.insertRules(this.componentId, s, l);
              }
              (o = Dr(o, s)), (this.staticRulesId = s);
            }
          else {
            for (
              var a = bo(this.baseHash, r.hash), u = '', f = 0;
              f < this.rules.length;
              f++
            ) {
              var p = this.rules[f];
              if (typeof p == 'string') u += p;
              else if (p) {
                var m = Oa(ir(p, t, n, r));
                (a = bo(a, m)), (u += m);
              }
            }
            if (u) {
              var S = fd(a >>> 0);
              n.hasNameForId(this.componentId, S) ||
                n.insertRules(
                  this.componentId,
                  S,
                  r(u, '.'.concat(S), void 0, this.componentId),
                ),
                (o = Dr(o, S));
            }
          }
          return o;
        }),
        e
      );
    })(),
    ng = Ce.default.createContext(void 0),
    nD = ng.Consumer;
  var cd = {};
  function SC(e, t, n) {
    var r = gd(e),
      o = e,
      i = !ad(e),
      s = t.attrs,
      l = s === void 0 ? Ma : s,
      a = t.componentId,
      u =
        a === void 0
          ? (function (E, R) {
              var x = typeof E != 'string' ? 'sc' : D0(E);
              cd[x] = (cd[x] || 0) + 1;
              var T = ''.concat(x, '-').concat(HA('6.0.7' + x + cd[x]));
              return R ? ''.concat(R, '-').concat(T) : T;
            })(t.displayName, t.parentComponentId)
          : a,
      f = t.displayName,
      p =
        f === void 0
          ? (function (E) {
              return ad(E) ? 'styled.'.concat(E) : 'Styled('.concat(WA(E), ')');
            })(e)
          : f,
      m =
        t.displayName && t.componentId
          ? ''.concat(D0(t.displayName), '-').concat(t.componentId)
          : t.componentId || u,
      S = r && o.attrs ? o.attrs.concat(l).filter(Boolean) : l,
      y = t.shouldForwardProp;
    if (r && o.shouldForwardProp) {
      var w = o.shouldForwardProp;
      if (t.shouldForwardProp) {
        var U = t.shouldForwardProp;
        y = function (E, R) {
          return w(E, R) && U(E, R);
        };
      } else y = w;
    }
    var h = new gC(n, m, r ? o.componentStyle : void 0);
    function c(E, R) {
      return (function (x, T, O) {
        var ee = x.attrs,
          V = x.componentStyle,
          ae = x.defaultProps,
          Dt = x.foldedComponentIds,
          Ie = x.styledComponentId,
          Qe = x.target,
          xn = Ce.default.useContext(ng),
          Nn = md(),
          ft = x.shouldForwardProp || Nn.shouldForwardProp,
          Ye = (function (k, F, $) {
            for (
              var W, H = Ge(Ge({}, F), { className: void 0, theme: $ }), b = 0;
              b < k.length;
              b += 1
            ) {
              var ue = zo((W = k[b])) ? W(H) : W;
              for (var re in ue)
                H[re] =
                  re === 'className'
                    ? Dr(H[re], ue[re])
                    : re === 'style'
                    ? Ge(Ge({}, H[re]), ue[re])
                    : ue[re];
            }
            return (
              F.className && (H.className = Dr(H.className, F.className)), H
            );
          })(ee, T, FA(T, xn, ae) || Fo),
          Mt = Ye.as || Qe,
          Z = {};
        for (var Y in Ye)
          Ye[Y] === void 0 ||
            Y[0] === '$' ||
            Y === 'as' ||
            Y === 'theme' ||
            (Y === 'forwardedAs'
              ? (Z.as = Ye.forwardedAs)
              : (ft && !ft(Y, Mt)) || (Z[Y] = Ye[Y]));
        var _ = (function (k, F) {
            var $ = md(),
              W = k.generateAndInjectStyles(F, $.styleSheet, $.stylis);
            return W;
          })(V, Ye),
          L = Dr(Dt, Ie);
        return (
          _ && (L += ' ' + _),
          Ye.className && (L += ' ' + Ye.className),
          (Z[ad(Mt) && !H0.has(Mt) ? 'class' : 'className'] = L),
          (Z.ref = O),
          (0, Ce.createElement)(Mt, Z)
        );
      })(d, E, R);
    }
    var d = Ce.default.forwardRef(c);
    return (
      (d.attrs = S),
      (d.componentStyle = h),
      (d.shouldForwardProp = y),
      (d.foldedComponentIds = r
        ? Dr(o.foldedComponentIds, o.styledComponentId)
        : ''),
      (d.styledComponentId = m),
      (d.target = r ? o.target : e),
      Object.defineProperty(d, 'defaultProps', {
        get: function () {
          return this._foldedDefaultProps;
        },
        set: function (E) {
          this._foldedDefaultProps = r
            ? (function (R) {
                for (var x = [], T = 1; T < arguments.length; T++)
                  x[T - 1] = arguments[T];
                for (var O = 0, ee = x; O < ee.length; O++) dd(R, ee[O], !0);
                return R;
              })({}, o.defaultProps, E)
            : E;
        },
      }),
      Sd(d, function () {
        return '.'.concat(d.styledComponentId);
      }),
      i &&
        Y0(d, e, {
          attrs: !0,
          componentStyle: !0,
          displayName: !0,
          foldedComponentIds: !0,
          shouldForwardProp: !0,
          styledComponentId: !0,
          target: !0,
        }),
      d
    );
  }
  function z0(e, t) {
    for (var n = [e[0]], r = 0, o = t.length; r < o; r += 1)
      n.push(t[r], e[r + 1]);
    return n;
  }
  var B0 = function (e) {
    return Object.assign(e, {
      isCss: !0,
    });
  };
  function _C(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    if (zo(e) || as(e)) {
      var r = e;
      return B0(ir(z0(Ma, rs([r], t, !0))));
    }
    var o = e;
    return t.length === 0 && o.length === 1 && typeof o[0] == 'string'
      ? ir(o)
      : B0(ir(z0(o, t)));
  }
  function vd(e, t, n) {
    if ((n === void 0 && (n = Fo), !t)) throw wn(1, t);
    var r = function (o) {
      for (var i = [], s = 1; s < arguments.length; s++)
        i[s - 1] = arguments[s];
      return e(t, n, _C.apply(void 0, rs([o], i, !1)));
    };
    return (
      (r.attrs = function (o) {
        return vd(
          e,
          t,
          Ge(Ge({}, n), {
            attrs: Array.prototype.concat(n.attrs, o).filter(Boolean),
          }),
        );
      }),
      (r.withConfig = function (o) {
        return vd(e, t, Ge(Ge({}, n), o));
      }),
      r
    );
  }
  var rg = function (e) {
      return vd(SC, e);
    },
    Ke = rg;
  H0.forEach(function (e) {
    Ke[e] = rg(e);
  });
  var rD = (function () {
    function e(t, n) {
      (this.rules = t),
        (this.componentId = n),
        (this.isStatic = tg(t)),
        us.registerId(this.componentId + 1);
    }
    return (
      (e.prototype.createStyles = function (t, n, r, o) {
        var i = o(Oa(ir(this.rules, n, r, o)), ''),
          s = this.componentId + t;
        r.insertRules(s, s, i);
      }),
      (e.prototype.removeStyles = function (t, n) {
        n.clearRules(this.componentId + t);
      }),
      (e.prototype.renderStyles = function (t, n, r, o) {
        t > 2 && us.registerId(this.componentId + t),
          this.removeStyles(t, r),
          this.createStyles(t, n, r, o);
      }),
      e
    );
  })();
  var oD = (function () {
    function e() {
      var t = this;
      (this._emitSheetCSS = function () {
        var n = t.instance.toString(),
          r = pd(),
          o = Oa(
            [
              r && 'nonce="'.concat(r, '"'),
              ''.concat(Tn, '="true"'),
              ''.concat('data-styled-version', '="').concat('6.0.7', '"'),
            ].filter(Boolean),
            ' ',
          );
        return '<style '.concat(o, '>').concat(n, '</style>');
      }),
        (this.getStyleTags = function () {
          if (t.sealed) throw wn(2);
          return t._emitSheetCSS();
        }),
        (this.getStyleElement = function () {
          var n;
          if (t.sealed) throw wn(2);
          var r =
              (((n = {})[Tn] = ''),
              (n['data-styled-version'] = '6.0.7'),
              (n.dangerouslySetInnerHTML = { __html: t.instance.toString() }),
              n),
            o = pd();
          return (
            o && (r.nonce = o),
            [Ce.default.createElement('style', Ge({}, r, { key: 'sc-0-0' }))]
          );
        }),
        (this.seal = function () {
          t.sealed = !0;
        }),
        (this.instance = new us({ isServer: !0 })),
        (this.sealed = !1);
    }
    return (
      (e.prototype.collectStyles = function (t) {
        if (this.sealed) throw wn(2);
        return Ce.default.createElement(hC, { sheet: this.instance }, t);
      }),
      (e.prototype.interleaveWithNodeStream = function (t) {
        throw wn(3);
      }),
      e
    );
  })();
  var iD = '__sc-'.concat(Tn, '__');
  var Bo = ge(Tt(), 1);
  var ag = ge(gt(), 1),
    Ed = { width: 0, height: 0 },
    lg = ({ opened: e, children: t }) => {
      let [n, r] = (0, Bo.useState)(null),
        [o, i] = (0, Bo.useState)(Ed);
      return (
        (0, Bo.useEffect)(() => {
          if (!n) return Co;
          let s = AC(n);
          if (
            (i({
              width: Math.max(n.scrollWidth, s.width),
              height: Math.min(n.scrollHeight, s.height),
            }),
            e)
          )
            return Co;
          let l = setTimeout(() => i(Ed));
          return () => clearTimeout(l);
        }, [e, n]),
        (0, Bo.useEffect)(() => {
          if (o === Ed) return Co;
          let s = setTimeout(() => i({}), 300);
          return () => clearTimeout(s);
        }, [o]),
        (0, ag.jsx)(CC, {
          ref: r,
          style: o,
          className: e ? 'opened' : '',
          children: t,
        })
      );
    },
    AC = (e) => {
      let { style: t } = e,
        { width: n, height: r } = t;
      t.width = t.height = '';
      let o = e.getBoundingClientRect();
      return (t.width = n), (t.height = r), o;
    },
    CC = Ke.div`
  overflow: hidden;
  transition-property: width, height, opacity;
  transition-timing-function: ease-in-out, ease-in-out, linear;
  transition-duration: 0.2s, 0.2s, 0.2s;
  transition-delay: 0.2s, 0.2s, 0s;
  opacity: 0;
  overflow: auto;
  &.opened {
    transition-delay: 0s, 0s, 0.2s;
    opacity: 1;
  }
`;
  var Ua = ge(Tt(), 1);
  var jo = Hy({ key: 'Markers', default: Oo.markers }),
    ug = Wy({
      key: 'Marker',
      get:
        (e) =>
        ({ get: t }) => {
          let r = t(jo).find((o) => o.id === e);
          if (!r) throw new Error(`NoSuchMarker:${e}`);
          return r;
        },
      set:
        (e) =>
        ({ set: t }, n) => {
          n instanceof By ||
            t(jo, (r) => {
              let o = r.findIndex((s) => s.id === e),
                i = [...r];
              return (
                o < 0
                  ? n.text && i.push(n)
                  : n.text
                  ? (i[o] = n)
                  : i.splice(o, 1),
                i
              );
            });
        },
    });
  var cg = ge(Tt(), 1),
    $a = (e) => {
      let t = (0, cg.useContext)(e);
      if (t === null)
        throw Object.assign(
          new Error(`${e.displayName || 'context'} is null`),
          { context: e },
        );
      return t;
    };
  var wd = Ke.button`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
  var St = ge(gt(), 1),
    fg = () =>
      (0, St.jsxs)(LC, {
        children: [
          (0, St.jsx)(IC, {}),
          (0, St.jsx)('hr', {}),
          (0, St.jsx)(kC, {
            href: '/',
            children: '\u4E00\u89A7\u306B\u623B\u308B',
          }),
        ],
      }),
    LC = Ke.section`
  --padding-h: 8px;
  --padding-v: 8px;
  display: grid;
  grid-auto-flow: row;
  row-gap: var(--padding-v);
  justify-items: start;
  padding-block: var(--padding-v);
  padding-inline: var(--padding-h);
  min-inline-size: 200px;
  overflow-y: auto;
  &::before {
    content: '';
    position: absolute;
    inset-block-start: 0;
    inset-inline: var(--padding-h);
    block-size: 1px;
    background-color: currentColor;
  }
  & > hr {
    inline-size: 100%;
    block-size: 1px;
    background-color: currentColor;
  }
`,
    kC = Ke.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`,
    IC = () => {
      let e = ma(jo);
      return (0, St.jsx)(PC, {
        children: e.map((t, n) =>
          (0, St.jsxs)(
            Ua.Fragment,
            {
              children: [
                (0, St.jsxs)('div', { children: ['(', n + 1, ')'] }),
                (0, St.jsx)(OC, { marker: t }),
                (0, St.jsx)(DC, { marker: t }),
              ],
            },
            t.id,
          ),
        ),
      });
    },
    PC = Ke.div`
  justify-self: stretch;
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  justify-items: start;
  column-gap: 6px;
`,
    OC = ({ marker: e }) => {
      let t = $a(Ao),
        { text: n, pitch: r, yaw: o } = e,
        i = (0, Ua.useCallback)(() => {
          t.lookAt(r, o, t.getHfov(), 600);
        }, [t, r, o]);
      return (0, St.jsx)(wd, { onClick: i, children: n });
    },
    DC = ({ marker: e }) => {
      let t = Gy(
        ({ set: n }) =>
          () => {
            let r = prompt(
              '\u30C6\u30AD\u30B9\u30C8\u3092\u7DE8\u96C6\u3059\u308B\uFF08\u7A7A\u306B\u3059\u308B\u3068\u524A\u9664\u3057\u307E\u3059\uFF09',
              e.text,
            );
            Ee(r) && n(ug(e.id), { ...e, text: r });
          },
        [e],
      );
      return (0, St.jsx)(wd, { onClick: t, children: '\u7DE8\u96C6' });
    };
  var Qt = ge(gt(), 1),
    dg = () => {
      let [e, t] = (0, ba.useState)(!1),
        n = (0, ba.useCallback)(() => t((r) => !r), []);
      return (0, Qt.jsxs)(MC, {
        children: [
          (0, Qt.jsxs)(VC, {
            children: [
              (0, Qt.jsx)(UC, { onClick: n }),
              (0, Qt.jsx)($C, { children: Oo.title }),
            ],
          }),
          (0, Qt.jsx)(lg, { opened: e, children: (0, Qt.jsx)(fg, {}) }),
        ],
      });
    },
    MC = Ke.div`
  --border-radius: 4px;
  --inset: 10px;
  position: absolute;
  top: var(--inset);
  left: var(--inset);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr;
  max-inline-size: calc(100% - 2 * var(--inset));
  max-block-size: calc(100% - 2 * var(--inset));
  border-radius: var(--border-radius);
  color: #ffffff;
  overflow: hidden;
  background-color: var(--ui-background);
  backdrop-filter: blur(2px);
`,
    VC = Ke.div`
  --padding: 7px;
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
`,
    $C = Ke.div`
  padding-inline-start: 4px;
  padding-inline-end: 11px;
  padding-block: 5px;
  line-height: 1.2;
`,
    UC = (e) =>
      (0, Qt.jsx)(bC, {
        ...e,
        children: (0, Qt.jsx)(FC, {
          viewBox: '-12 -12 24 24',
          children: (0, Qt.jsx)(zC, { d: 'M-9 -7H9M-9 0H9M-9 7H9' }),
        }),
      }),
    bC = Ke.button`
  display: grid;
  place-content: center;
  padding: 4px;
  margin: 2px;
  border-radius: var(--border-radius);
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`,
    FC = Ke.svg`
  inline-size: 20px;
  /* border: solid 1px red; */
`,
    zC = Ke.path`
  stroke: currentColor;
  stroke-width: 2.5;
`;
  var vg = ge(Tt(), 1);
  var pg = (e, t) => {
      if (t)
        for (let [n, r] of Object.entries(t))
          switch (typeof r) {
            case 'boolean':
              r && e.setAttribute(n, '');
              break;
            case 'number':
              e.setAttribute(n, `${r}`);
              break;
            case 'string':
              e.setAttribute(n, r);
              break;
            default:
          }
      return e;
    },
    hg = (e, t) => {
      for (let n of t)
        typeof n == 'function'
          ? e.append(...n(e))
          : typeof n == 'string'
          ? e.append(document.createTextNode(n))
          : n instanceof Node && e.append(n);
      return e;
    },
    BC = 'http://www.w3.org/2000/svg',
    Td = (e, t, ...n) => {
      let r = document.createElementNS(BC, e);
      return hg(pg(r, t), n);
    },
    mg = (e, t, ...n) => {
      let r = document.createElement(e);
      return hg(pg(r, t), n);
    };
  var yg = () => {
      let e = $a(Ao),
        t = ma(jo);
      return (
        (0, vg.useEffect)(() => {
          for (let n of e.getConfig().hotSpots.slice()) e.removeHotSpot(n.id);
          for (let n of t)
            e.addHotSpot({ ...n, createTooltipFunc: jC, createTooltipArgs: n });
        }, [e, t]),
        null
      );
    },
    jC = (e, t) => {
      (e.dataset.id = t.id),
        e.append(
          mg('div', null, t.text),
          Td(
            'svg',
            { viewBox: '-5 -1 10 7' },
            Td('path', { d: 'M-4 0L0 6L4 0Z' }),
          ),
        );
    };
  var Mr = ge(gt(), 1),
    gg = () =>
      (0, Mr.jsxs)(Mr.Fragment, {
        children: [(0, Mr.jsx)(yg, {}), (0, Mr.jsx)(dg, {})],
      });
  var Rn = ge(gt(), 1),
    Sg = () => {
      let [e, t] = (0, Vr.useState)(null),
        n = HC(e),
        r = WC(n);
      return (0, Rn.jsxs)(Rn.Fragment, {
        children: [
          (0, Rn.jsx)('div', { ref: t }),
          n &&
            (0, Rn.jsx)(Ao.Provider, {
              value: n,
              children:
                !r && (0, Rn.jsx)(jy, { children: (0, Rn.jsx)(gg, {}) }),
            }),
        ],
      });
    },
    HC = (e) => {
      let [t, n] = (0, Vr.useState)(null);
      return (
        (0, Vr.useEffect)(() => {
          if (!e) return Co;
          let r = globalThis.pannellum.viewer(e, {
            panorama: `/images/${Oo.path}.jpg`,
            hotSpots: [],
            autoLoad: !0,
            keyboardZoom: !1,
            showControls: !1,
            friction: 0.8,
            maxPitch: 38,
            minHfov: 25,
          });
          return (
            n(r),
            () => {
              r.destroy(), n(null);
            }
          );
        }, [e]),
        t
      );
    },
    WC = (e) => {
      let [t, n] = (0, Vr.useState)(!0);
      return (
        (0, Vr.useEffect)(
          () => (e && e.on('load', () => n(!1)), () => n(!0)),
          [e],
        ),
        t
      );
    };
  var wg = ge(gt(), 1),
    Eg = document.querySelector('#panorama');
  if (!Eg) throw new Error('NoContainer: #panorama');
  var GC = (0, _g.createRoot)(Eg);
  GC.render((0, wg.jsx)(Sg, {}));
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
