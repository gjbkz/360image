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
  var Qg = Object.create;
  var bd = Object.defineProperty;
  var Yg = Object.getOwnPropertyDescriptor;
  var Zg = Object.getOwnPropertyNames;
  var qg = Object.getPrototypeOf,
    Xg = Object.prototype.hasOwnProperty;
  var Zt = (e, t) => () => (
    t || e((t = { exports: {} }).exports, t), t.exports
  );
  var Jg = (e, t, n, r) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let o of Zg(t))
        !Xg.call(e, o) &&
          o !== n &&
          bd(e, o, {
            get: () => t[o],
            enumerable: !(r = Yg(t, o)) || r.enumerable,
          });
    return e;
  };
  var fe = (e, t, n) => (
    (n = e != null ? Qg(qg(e)) : {}),
    Jg(
      t || !e || !e.__esModule
        ? bd(n, 'default', { value: e, enumerable: !0 })
        : n,
      e,
    )
  );
  var Yd = Zt((ee) => {
    'use strict';
    var Zo = Symbol.for('react.element'),
      eS = Symbol.for('react.portal'),
      tS = Symbol.for('react.fragment'),
      nS = Symbol.for('react.strict_mode'),
      rS = Symbol.for('react.profiler'),
      oS = Symbol.for('react.provider'),
      iS = Symbol.for('react.context'),
      sS = Symbol.for('react.forward_ref'),
      lS = Symbol.for('react.suspense'),
      aS = Symbol.for('react.memo'),
      uS = Symbol.for('react.lazy'),
      Ud = Symbol.iterator;
    function cS(e) {
      return e === null || typeof e != 'object'
        ? null
        : ((e = (Ud && e[Ud]) || e['@@iterator']),
          typeof e ==
          'functi\
on'
            ? e
            : null);
    }
    var Bd = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      jd = Object.assign,
      Hd = {};
    function jr(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = Hd),
        (this.updater = n || Bd);
    }
    jr.prototype.isReactComponent = {};
    jr.prototype.setState = function (e, t) {
      if (typeof e != 'object' && typeof e != 'function' && e != null)
        throw Error(
          'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
        );
      this.updater.enqueueSetState(this, e, t, 'setState');
    };
    jr.prototype.forceUpdate = function (e) {
      this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
    };
    function Wd() {}
    Wd.prototype = jr.prototype;
    function qa(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = Hd),
        (this.updater = n || Bd);
    }
    var Xa = (qa.prototype = new Wd());
    Xa.constructor = qa;
    jd(Xa, jr.prototype);
    Xa.isPureReactComponent = !0;
    var Fd = Array.isArray,
      Gd = Object.prototype.hasOwnProperty,
      Ja = { current: null },
      Kd = { key: !0, ref: !0, __self: !0, __source: !0 };
    function Qd(e, t, n) {
      var r,
        o = {},
        i = null,
        s = null;
      if (t != null)
        for (r in (t.ref !== void 0 && (s = t.ref),
        t.key !== void 0 && (i = '' + t.key),
        t))
          Gd.call(t, r) && !Kd.hasOwnProperty(r) && (o[r] = t[r]);
      var l = arguments.length - 2;
      if (l === 1) o.children = n;
      else if (1 < l) {
        for (var a = Array(l), u = 0; u < l; u++) a[u] = arguments[u + 2];
        o.children = a;
      }
      if (e && e.defaultProps)
        for (r in ((l = e.defaultProps), l)) o[r] === void 0 && (o[r] = l[r]);
      return {
        $$typeof: Zo,
        type: e,
        key: i,
        ref: s,
        props: o,
        _owner: Ja.current,
      };
    }
    function fS(e, t) {
      return {
        $$typeof: Zo,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
      };
    }
    function eu(e) {
      return typeof e == 'object' && e !== null && e.$$typeof === Zo;
    }
    function dS(e) {
      var t = { '=': '=0', ':': '=2' };
      return (
        '$' +
        e.replace(/[=:]/g, function (n) {
          return t[n];
        })
      );
    }
    var zd = /\/+/g;
    function Za(e, t) {
      return typeof e == 'object' && e !== null && e.key != null
        ? dS('' + e.key)
        : t.toString(36);
    }
    function Ss(e, t, n, r, o) {
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
              case Zo:
              case eS:
                s = !0;
            }
        }
      if (s)
        return (
          (s = e),
          (o = o(s)),
          (e = r === '' ? '.' + Za(s, 0) : r),
          Fd(o)
            ? ((n = ''),
              e != null && (n = e.replace(zd, '$&/') + '/'),
              Ss(o, t, n, '', function (u) {
                return u;
              }))
            : o != null &&
              (eu(o) &&
                (o = fS(
                  o,
                  n +
                    (!o.key || (s && s.key === o.key)
                      ? ''
                      : ('' + o.key).replace(zd, '$&/') + '/') +
                    e,
                )),
              t.push(o)),
          1
        );
      if (((s = 0), (r = r === '' ? '.' : r + ':'), Fd(e)))
        for (var l = 0; l < e.length; l++) {
          i = e[l];
          var a = r + Za(i, l);
          s += Ss(i, t, n, a, o);
        }
      else if (((a = cS(e)), typeof a == 'function'))
        for (e = a.call(e), l = 0; !(i = e.next()).done; )
          (i = i.value), (a = r + Za(i, l++)), (s += Ss(i, t, n, a, o));
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
    function gs(e, t, n) {
      if (e == null) return e;
      var r = [],
        o = 0;
      return (
        Ss(e, r, '', '', function (i) {
          return t.call(n, i, o++);
        }),
        r
      );
    }
    function pS(e) {
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
      _s = { transition: null },
      hS = {
        ReactCurrentDispatcher: Xe,
        ReactCurrentBatchConfig: _s,
        ReactCurrentOwner: Ja,
      };
    ee.Children = {
      map: gs,
      forEach: function (e, t, n) {
        gs(
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
          gs(e, function () {
            t++;
          }),
          t
        );
      },
      toArray: function (e) {
        return (
          gs(e, function (t) {
            return t;
          }) || []
        );
      },
      only: function (e) {
        if (!eu(e))
          throw Error(
            'React.Children\
.only expected to receive a single React element child.',
          );
        return e;
      },
    };
    ee.Component = jr;
    ee.Fragment = tS;
    ee.Profiler = rS;
    ee.PureComponent = qa;
    ee.StrictMode = nS;
    ee.Suspense = lS;
    ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = hS;
    ee.cloneElement = function (e, t, n) {
      if (e == null)
        throw Error(
          'React.cloneElement(...): The argument must be a React element, but you passed ' +
            e +
            '.',
        );
      var r = jd({}, e.props),
        o = e.key,
        i = e.ref,
        s = e._owner;
      if (t != null) {
        if (
          (t.ref !== void 0 && ((i = t.ref), (s = Ja.current)),
          t.key !== void 0 && (o = '' + t.key),
          e.type && e.type.defaultProps)
        )
          var l = e.type.defaultProps;
        for (a in t)
          Gd.call(t, a) &&
            !Kd.hasOwnProperty(a) &&
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
        $$typeof: Zo,
        type: e.type,
        key: o,
        ref: i,
        props: r,
        _owner: s,
      };
    };
    ee.createContext = function (e) {
      return (
        (e = {
          $$typeof: iS,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (e.Provider = { $$typeof: oS, _context: e }),
        (e.Consumer = e)
      );
    };
    ee.createElement = Qd;
    ee.createFactory = function (e) {
      var t = Qd.bind(null, e);
      return (t.type = e), t;
    };
    ee.createRef = function () {
      return { current: null };
    };
    ee.forwardRef = function (e) {
      return { $$typeof: sS, render: e };
    };
    ee.isValidElement = eu;
    ee.lazy = function (e) {
      return { $$typeof: uS, _payload: { _status: -1, _result: e }, _init: pS };
    };
    ee.memo = function (e, t) {
      return { $$typeof: aS, type: e, compare: t === void 0 ? null : t };
    };
    ee.startTransition = function (e) {
      var t = _s.transition;
      _s.transition = {};
      try {
        e();
      } finally {
        _s.transition = t;
      }
    };
    ee.unstable_act = function () {
      throw Error('act(...) is not supported in production builds of React.');
    };
    ee.useCallback = function (e, t) {
      return Xe.current.useCallback(e, t);
    };
    ee.useContext = function (e) {
      return Xe.current.useContext(e);
    };
    ee.useDebugValue = function () {};
    ee.useDeferredValue = function (e) {
      return Xe.current.useDeferredValue(e);
    };
    ee.useEffect = function (e, t) {
      return Xe.current.useEffect(e, t);
    };
    ee.useId = function () {
      return Xe.current.useId();
    };
    ee.useImperativeHandle = function (e, t, n) {
      return Xe.current.useImperativeHandle(e, t, n);
    };
    ee.useInsertionEffect = function (e, t) {
      return Xe.current.useInsertionEffect(e, t);
    };
    ee.useLayoutEffect = function (e, t) {
      return Xe.current.useLayoutEffect(e, t);
    };
    ee.useMemo = function (e, t) {
      return Xe.current.useMemo(e, t);
    };
    ee.useReducer = function (e, t, n) {
      return Xe.current.useReducer(e, t, n);
    };
    ee.useRef = function (e) {
      return Xe.current.useRef(e);
    };
    ee.useState = function (e) {
      return Xe.current.useState(e);
    };
    ee.useSyncExternalStore = function (e, t, n) {
      return Xe.current.useSyncExternalStore(e, t, n);
    };
    ee.useTransition = function () {
      return Xe.current.useTransition();
    };
    ee.version = '18.2.0';
  });
  var Tt = Zt((yk, Zd) => {
    'use strict';
    Zd.exports = Yd();
  });
  var sp = Zt((de) => {
    'use strict';
    function ou(e, t) {
      var n = e.length;
      e.push(t);
      e: for (; 0 < n; ) {
        var r = (n - 1) >>> 1,
          o = e[r];
        if (0 < Es(o, t)) (e[r] = t), (e[n] = o), (n = r);
        else break e;
      }
    }
    function bt(e) {
      return e.length === 0 ? null : e[0];
    }
    function Ts(e) {
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
          if (0 > Es(l, n))
            a < o && 0 > Es(u, l)
              ? ((e[r] = u), (e[a] = n), (r = a))
              : ((e[r] = l), (e[s] = n), (r = s));
          else if (a < o && 0 > Es(u, n)) (e[r] = u), (e[a] = n), (r = a);
          else break e;
        }
      }
      return t;
    }
    function Es(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return n !== 0 ? n : e.id - t.id;
    }
    typeof performance == 'object' && typeof performance.now == 'function'
      ? ((qd = performance),
        (de.unstable_now = function () {
          return qd.now();
        }))
      : ((tu = Date),
        (Xd = tu.now()),
        (de.unstable_now = function () {
          return tu.now() - Xd;
        }));
    var qd,
      tu,
      Xd,
      qt = [],
      Cn = [],
      mS = 1,
      Rt = null,
      Be = 3,
      Rs = !1,
      ar = !1,
      Xo = !1,
      tp = typeof setTimeout == 'function' ? setTimeout : null,
      np = typeof clearTimeout == 'function' ? clearTimeout : null,
      Jd = typeof setImmediate < 'u' ? setImmediate : null;
    typeof navigator < 'u' &&
      navigator.scheduling !== void 0 &&
      navigator.scheduling.isInputPending !== void 0 &&
      navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function iu(e) {
      for (var t = bt(Cn); t !== null; ) {
        if (t.callback === null) Ts(Cn);
        else if (t.startTime <= e)
          Ts(Cn), (t.sortIndex = t.expirationTime), ou(qt, t);
        else break;
        t = bt(Cn);
      }
    }
    function su(e) {
      if (((Xo = !1), iu(e), !ar))
        if (bt(qt) !== null) (ar = !0), au(lu);
        else {
          var t = bt(Cn);
          t !== null && uu(su, t.startTime - e);
        }
    }
    function lu(e, t) {
      (ar = !1), Xo && ((Xo = !1), np(Jo), (Jo = -1)), (Rs = !0);
      var n = Be;
      try {
        for (
          iu(t), Rt = bt(qt);
          Rt !== null && (!(Rt.expirationTime > t) || (e && !ip()));

        ) {
          var r = Rt.callback;
          if (typeof r == 'function') {
            (Rt.callback = null), (Be = Rt.priorityLevel);
            var o = r(Rt.expirationTime <= t);
            (t = de.unstable_now()),
              typeof o == 'function'
                ? (Rt.callback = o)
                : Rt === bt(qt) && Ts(qt),
              iu(t);
          } else Ts(qt);
          Rt = bt(qt);
        }
        if (Rt !== null) var i = !0;
        else {
          var s = bt(Cn);
          s !== null && uu(su, s.startTime - t), (i = !1);
        }
        return i;
      } finally {
        (Rt = null), (Be = n), (Rs = !1);
      }
    }
    var xs = !1,
      ws = null,
      Jo = -1,
      rp = 5,
      op = -1;
    function ip() {
      return !(de.unstable_now() - op < rp);
    }
    function nu() {
      if (ws !== null) {
        var e = de.unstable_now();
        op = e;
        var t = !0;
        try {
          t = ws(!0, e);
        } finally {
          t ? qo() : ((xs = !1), (ws = null));
        }
      } else xs = !1;
    }
    var qo;
    typeof Jd == 'function'
      ? (qo = function () {
          Jd(nu);
        })
      : typeof MessageChannel < 'u'
      ? ((ru = new MessageChannel()),
        (ep = ru.port2),
        (ru.port1.onmessage = nu),
        (qo = function () {
          ep.postMessage(null);
        }))
      : (qo = function () {
          tp(nu, 0);
        });
    var ru, ep;
    function au(e) {
      (ws = e), xs || ((xs = !0), qo());
    }
    function uu(e, t) {
      Jo = tp(function () {
        e(de.unstable_now());
      }, t);
    }
    de.unstable_IdlePriority = 5;
    de.unstable_ImmediatePriority = 1;
    de.unstable_LowPriority = 4;
    de.unstable_NormalPriority = 3;
    de.unstable_Profiling = null;
    de.unstable_UserBlockingPriority = 2;
    de.unstable_cancelCallback = function (e) {
      e.callback = null;
    };
    de.unstable_continueExecution = function () {
      ar || Rs || ((ar = !0), au(lu));
    };
    de.unstable_forceFrameRate = function (e) {
      0 > e || 125 < e
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
          )
        : (rp = 0 < e ? Math.floor(1e3 / e) : 5);
    };
    de.unstable_getCurrentPriorityLevel = function () {
      return Be;
    };
    de.unstable_getFirstCallbackNode = function () {
      return bt(qt);
    };
    de.unstable_next = function (e) {
      switch (Be) {
        case 1:
        case 2:
        case 3:
          var t = 3;
          break;
        default:
          t = Be;
      }
      var n = Be;
      Be = t;
      try {
        return e();
      } finally {
        Be = n;
      }
    };
    de.unstable_pauseExecution = function () {};
    de.unstable_requestPaint = function () {};
    de.unstable_runWithPriority = function (e, t) {
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
      var n = Be;
      Be = e;
      try {
        return t();
      } finally {
        Be = n;
      }
    };
    de.unstable_scheduleCallback = function (e, t, n) {
      var r = de.unstable_now();
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
          id: mS++,
          callback: t,
          priorityLevel: e,
          startTime: n,
          expirationTime: o,
          sortIndex: -1,
        }),
        n > r
          ? ((e.sortIndex = n),
            ou(Cn, e),
            bt(qt) === null &&
              e === bt(Cn) &&
              (Xo ? (np(Jo), (Jo = -1)) : (Xo = !0), uu(su, n - r)))
          : ((e.sortIndex = o), ou(qt, e), ar || Rs || ((ar = !0), au(lu))),
        e
      );
    };
    de.unstable_shouldYield = ip;
    de.unstable_wrapCallback = function (e) {
      var t = Be;
      return function () {
        var n = Be;
        Be = t;
        try {
          return e.apply(this, arguments);
        } finally {
          Be = n;
        }
      };
    };
  });
  var ap = Zt((Sk, lp) => {
    'use strict';
    lp.exports = sp();
  });
  var hv = Zt((St) => {
    'use strict';
    var mh = Tt(),
      yt = ap();
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
    var vh = new Set(),
      Ei = {};
    function Er(e, t) {
      co(e, t), co(e + 'Capture', t);
    }
    function co(e, t) {
      for (Ei[e] = t, e = 0; e < t.length; e++) vh.add(t[e]);
    }
    var hn = !(
        typeof window > 'u' ||
        typeof window.document > 'u' ||
        typeof window.document.createElement > 'u'
      ),
      Pu = Object.prototype.hasOwnProperty,
      vS =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      up = {},
      cp = {};
    function yS(e) {
      return Pu.call(cp, e)
        ? !0
        : Pu.call(up, e)
        ? !1
        : vS.test(e)
        ? (cp[e] = !0)
        : ((up[e] = !0), !1);
    }
    function gS(e, t, n, r) {
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
    function SS(e, t, n, r) {
      if (t === null || typeof t > 'u' || gS(e, t, n, r)) return !0;
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
    function tt(e, t, n, r, o, i, s) {
      (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = o),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = i),
        (this.removeEmptyString = s);
    }
    var ze = {};
    'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
      .split(' ')
      .forEach(function (e) {
        ze[e] = new tt(e, 0, !1, e, null, !1, !1);
      });
    [
      ['acceptCharset', 'accept-charset'],
      ['className', 'class'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
    ].forEach(function (e) {
      var t = e[0];
      ze[t] = new tt(t, 1, !1, e[1], null, !1, !1);
    });
    ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(
      function (e) {
        ze[e] = new tt(e, 2, !1, e.toLowerCase(), null, !1, !1);
      },
    );
    [
      'autoReverse',
      'externalResourcesRequired',
      'focusable',
      'preserveAlpha',
    ].forEach(function (e) {
      ze[e] = new tt(e, 2, !1, e, null, !1, !1);
    });
    'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noMo\
dule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
      .split(' ')
      .forEach(function (e) {
        ze[e] = new tt(e, 3, !1, e.toLowerCase(), null, !1, !1);
      });
    ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
      ze[e] = new tt(e, 3, !0, e, null, !1, !1);
    });
    ['capture', 'download'].forEach(function (e) {
      ze[e] = new tt(e, 4, !1, e, null, !1, !1);
    });
    ['cols', 'rows', 'size', 'span'].forEach(function (e) {
      ze[e] = new tt(e, 6, !1, e, null, !1, !1);
    });
    ['rowSpan', 'start'].forEach(function (e) {
      ze[e] = new tt(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
    var Rc = /[\-:]([a-z])/g;
    function xc(e) {
      return e[1].toUpperCase();
    }
    'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x \
horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-\
per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
      .split(' ')
      .forEach(function (e) {
        var t = e.replace(Rc, xc);
        ze[t] = new tt(t, 1, !1, e, null, !1, !1);
      });
    'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
      .split(' ')
      .forEach(function (e) {
        var t = e.replace(Rc, xc);
        ze[t] = new tt(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
      });
    ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
      var t = e.replace(Rc, xc);
      ze[t] = new tt(
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
      ze[e] = new tt(e, 1, !1, e.toLowerCase(), null, !1, !1);
    });
    ze.xlinkHref = new tt(
      'xlinkHref',
      1,
      !1,
      'xlink:href',
      'http://www.w3.org/1999/xlink',
      !0,
      !1,
    );
    ['src', 'href', 'action', 'formAction'].forEach(function (e) {
      ze[e] = new tt(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
    function Nc(e, t, n, r) {
      var o = ze.hasOwnProperty(t) ? ze[t] : null;
      (o !== null
        ? o.type !== 0
        : r ||
          !(2 < t.length) ||
          (t[0] !== 'o' && t[0] !== 'O') ||
          (t[1] !== 'n' && t[1] !== 'N')) &&
        (SS(t, n, o, r) && (n = null),
        r || o === null
          ? yS(t) &&
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
    var gn = mh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      Ns = Symbol.for('react.element'),
      Gr = Symbol.for('react.portal'),
      Kr = Symbol.for('react.fragment'),
      Ac = Symbol.for('react.strict_mode'),
      Ou = Symbol.for('react.profiler'),
      yh = Symbol.for('react.provider'),
      gh = Symbol.for('react.context'),
      Cc = Symbol.for('react.forward_ref'),
      Du = Symbol.for('react.suspense'),
      Mu = Symbol.for('react.suspense_list'),
      kc = Symbol.for('react.memo'),
      Ln = Symbol.for('react.lazy');
    Symbol.for('react.scope');
    Symbol.for('react.debug_trace_mode');
    var Sh = Symbol.for('react.offscreen');
    Symbol.for('react.legacy_hidden');
    Symbol.for('react.cache');
    Symbol.for('react.tracing_marker');
    var fp = Symbol.iterator;
    function ei(e) {
      return e === null || typeof e != 'object'
        ? null
        : ((e = (fp && e[fp]) || e['@@iterator']),
          typeof e == 'function' ? e : null);
    }
    var xe = Object.assign,
      cu;
    function ai(e) {
      if (cu === void 0)
        try {
          throw Error();
        } catch (n) {
          var t = n.stack.trim().match(/\n( *(at )?)/);
          cu = (t && t[1]) || '';
        }
      return (
        `
` +
        cu +
        e
      );
    }
    var fu = !1;
    function du(e, t) {
      if (!e || fu) return '';
      fu = !0;
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
        (fu = !1), (Error.prepareStackTrace = n);
      }
      return (e = e ? e.displayName || e.name : '') ? ai(e) : '';
    }
    function _S(e) {
      switch (e.tag) {
        case 5:
          return ai(e.type);
        case 16:
          return ai('Lazy');
        case 13:
          return ai('Suspense');
        case 19:
          return ai('SuspenseList');
        case 0:
        case 2:
        case 15:
          return (e = du(e.type, !1)), e;
        case 11:
          return (e = du(e.type.render, !1)), e;
        case 1:
          return (e = du(e.type, !0)), e;
        default:
          return '';
      }
    }
    function Vu(e) {
      if (e == null) return null;
      if (typeof e == 'function') return e.displayName || e.name || null;
      if (typeof e == 'string') return e;
      switch (e) {
        case Kr:
          return 'Fragment';
        case Gr:
          return 'Portal';
        case Ou:
          return 'Profiler';
        case Ac:
          return 'StrictMode';
        case Du:
          return 'Suspense';
        case Mu:
          return 'SuspenseList';
      }
      if (typeof e == 'object')
        switch (e.$$typeof) {
          case gh:
            return (e.displayName || 'Context') + '.Consumer';
          case yh:
            return (e._context.displayName || 'Context') + '.Provider';
          case Cc:
            var t = e.render;
            return (
              (e = e.displayName),
              e ||
                ((e = t.displayName || t.name || ''),
                (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
              e
            );
          case kc:
            return (
              (t = e.displayName || null), t !== null ? t : Vu(e.type) || 'Memo'
            );
          case Ln:
            (t = e._payload), (e = e._init);
            try {
              return Vu(e(t));
            } catch {}
        }
      return null;
    }
    function ES(e) {
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
          return Vu(t);
        case 8:
          return t === Ac ? 'StrictMode' : 'Mode';
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
    function Hn(e) {
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
    function _h(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        e.toLowerCase() === 'input' &&
        (t === 'checkbox' || t === 'radio')
      );
    }
    function wS(e) {
      var t = _h(e) ? 'checked' : 'value',
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
    function As(e) {
      e._valueTracker || (e._valueTracker = wS(e));
    }
    function Eh(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        r = '';
      return (
        e && (r = _h(e) ? (e.checked ? 'true' : 'false') : e.value),
        (e = r),
        e !== n ? (t.setValue(e), !0) : !1
      );
    }
    function tl(e) {
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
    function $u(e, t) {
      var n = t.checked;
      return xe({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked,
      });
    }
    function dp(e, t) {
      var n = t.defaultValue == null ? '' : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
      (n = Hn(t.value != null ? t.value : n)),
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
    function wh(e, t) {
      (t = t.checked), t != null && Nc(e, 'checked', t, !1);
    }
    function bu(e, t) {
      wh(e, t);
      var n = Hn(t.value),
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
        ? Uu(e, t.type, n)
        : t.hasOwnProperty('defaultValue') && Uu(e, t.type, Hn(t.defaultValue)),
        t.checked == null &&
          t.defaultChecked != null &&
          (e.defaultChecked = !!t.defaultChecked);
    }
    function pp(e, t, n) {
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
    function Uu(e, t, n) {
      (t !== 'number' || tl(e.ownerDocument) !== e) &&
        (n == null
          ? (e.defaultValue = '' + e._wrapperState.initialValue)
          : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
    }
    var ui = Array.isArray;
    function oo(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {};
        for (var o = 0; o < n.length; o++) t['$' + n[o]] = !0;
        for (n = 0; n < e.length; n++)
          (o = t.hasOwnProperty('$' + e[n].value)),
            e[n].selected !== o && (e[n].selected = o),
            o && r && (e[n].defaultSelected = !0);
      } else {
        for (n = '' + Hn(n), t = null, o = 0; o < e.length; o++) {
          if (e[o].value === n) {
            (e[o].selected = !0), r && (e[o].defaultSelected = !0);
            return;
          }
          t !== null || e[o].disabled || (t = e[o]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function Fu(e, t) {
      if (t.dangerouslySetInnerHTML != null) throw Error(A(91));
      return xe({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: '' + e._wrapperState.initialValue,
      });
    }
    function hp(e, t) {
      var n = t.value;
      if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
          if (t != null) throw Error(A(92));
          if (ui(n)) {
            if (1 < n.length) throw Error(A(93));
            n = n[0];
          }
          t = n;
        }
        t == null && (t = ''), (n = t);
      }
      e._wrapperState = { initialValue: Hn(n) };
    }
    function Th(e, t) {
      var n = Hn(t.value),
        r = Hn(t.defaultValue);
      n != null &&
        ((n = '' + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = '' + r);
    }
    function mp(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue &&
        t !== '' &&
        t !== null &&
        (e.value = t);
    }
    function Rh(e) {
      switch (e) {
        case 'svg':
          return 'http://www.w3.org/2000/svg';
        case 'math':
          return 'http://www.w3.org/1998/Math/MathML';
        default:
          return 'http://www.w3.org/1999/xhtml';
      }
    }
    function zu(e, t) {
      return e == null || e === 'http://www.w3.org/1999/xhtml'
        ? Rh(t)
        : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
        ? 'http://www.w3.org/1999/xhtml'
        : e;
    }
    var Cs,
      xh = (function (e) {
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
            Cs = Cs || document.createElement('div'),
              Cs.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
              t = Cs.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      });
    function wi(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
          n.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var di = {
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
      TS = ['Webkit', 'ms', 'Moz', 'O'];
    Object.keys(di).forEach(function (e) {
      TS.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (di[t] = di[e]);
      });
    });
    function Nh(e, t, n) {
      return t == null || typeof t == 'boolean' || t === ''
        ? ''
        : n ||
          typeof t != 'number' ||
          t === 0 ||
          (di.hasOwnProperty(e) && di[e])
        ? ('' + t).trim()
        : t + 'px';
    }
    function Ah(e, t) {
      e = e.style;
      for (var n in t)
        if (t.hasOwnProperty(n)) {
          var r = n.indexOf('--') === 0,
            o = Nh(n, t[n], r);
          n === 'float' && (n = 'cssFloat'),
            r ? e.setProperty(n, o) : (e[n] = o);
        }
    }
    var RS = xe(
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
    function Bu(e, t) {
      if (t) {
        if (RS[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
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
    function ju(e, t) {
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
    var Hu = null;
    function Lc(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
      );
    }
    var Wu = null,
      io = null,
      so = null;
    function vp(e) {
      if ((e = Fi(e))) {
        if (typeof Wu != 'function') throw Error(A(280));
        var t = e.stateNode;
        t && ((t = kl(t)), Wu(e.stateNode, e.type, t));
      }
    }
    function Ch(e) {
      io ? (so ? so.push(e) : (so = [e])) : (io = e);
    }
    function kh() {
      if (io) {
        var e = io,
          t = so;
        if (((so = io = null), vp(e), t))
          for (e = 0; e < t.length; e++) vp(t[e]);
      }
    }
    function Lh(e, t) {
      return e(t);
    }
    function Ih() {}
    var pu = !1;
    function Ph(e, t, n) {
      if (pu) return e(t, n);
      pu = !0;
      try {
        return Lh(e, t, n);
      } finally {
        (pu = !1), (io !== null || so !== null) && (Ih(), kh());
      }
    }
    function Ti(e, t) {
      var n = e.stateNode;
      if (n === null) return null;
      var r = kl(n);
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
    var Gu = !1;
    if (hn)
      try {
        (Hr = {}),
          Object.defineProperty(Hr, 'passive', {
            get: function () {
              Gu = !0;
            },
          }),
          window.addEventListener('test', Hr, Hr),
          window.removeEventListener('test', Hr, Hr);
      } catch {
        Gu = !1;
      }
    var Hr;
    function xS(e, t, n, r, o, i, s, l, a) {
      var u = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(n, u);
      } catch (f) {
        this.onError(f);
      }
    }
    var pi = !1,
      nl = null,
      rl = !1,
      Ku = null,
      NS = {
        onError: function (e) {
          (pi = !0), (nl = e);
        },
      };
    function AS(e, t, n, r, o, i, s, l, a) {
      (pi = !1), (nl = null), xS.apply(NS, arguments);
    }
    function CS(e, t, n, r, o, i, s, l, a) {
      if ((AS.apply(this, arguments), pi)) {
        if (pi) {
          var u = nl;
          (pi = !1), (nl = null);
        } else throw Error(A(198));
        rl || ((rl = !0), (Ku = u));
      }
    }
    function wr(e) {
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
    function Oh(e) {
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
    function yp(e) {
      if (wr(e) !== e) throw Error(A(188));
    }
    function kS(e) {
      var t = e.alternate;
      if (!t) {
        if (((t = wr(e)), t === null)) throw Error(A(188));
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
            if (i === n) return yp(o), e;
            if (i === r) return yp(o), t;
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
    function Dh(e) {
      return (e = kS(e)), e !== null ? Mh(e) : null;
    }
    function Mh(e) {
      if (e.tag === 5 || e.tag === 6) return e;
      for (e = e.child; e !== null; ) {
        var t = Mh(e);
        if (t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var Vh = yt.unstable_scheduleCallback,
      gp = yt.unstable_cancelCallback,
      LS = yt.unstable_shouldYield,
      IS = yt.unstable_requestPaint,
      Ce = yt.unstable_now,
      PS = yt.unstable_getCurrentPriorityLevel,
      Ic = yt.unstable_ImmediatePriority,
      $h = yt.unstable_UserBlockingPriority,
      ol = yt.unstable_NormalPriority,
      OS = yt.unstable_LowPriority,
      bh = yt.unstable_IdlePriority,
      xl = null,
      tn = null;
    function DS(e) {
      if (tn && typeof tn.onCommitFiberRoot == 'function')
        try {
          tn.onCommitFiberRoot(xl, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
    }
    var jt = Math.clz32 ? Math.clz32 : $S,
      MS = Math.log,
      VS = Math.LN2;
    function $S(e) {
      return (e >>>= 0), e === 0 ? 32 : (31 - ((MS(e) / VS) | 0)) | 0;
    }
    var ks = 64,
      Ls = 4194304;
    function ci(e) {
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
    function il(e, t) {
      var n = e.pendingLanes;
      if (n === 0) return 0;
      var r = 0,
        o = e.suspendedLanes,
        i = e.pingedLanes,
        s = n & 268435455;
      if (s !== 0) {
        var l = s & ~o;
        l !== 0 ? (r = ci(l)) : ((i &= s), i !== 0 && (r = ci(i)));
      } else (s = n & ~o), s !== 0 ? (r = ci(s)) : i !== 0 && (r = ci(i));
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
          (n = 31 - jt(t)), (o = 1 << n), (r |= e[n]), (t &= ~o);
      return r;
    }
    function bS(e, t) {
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
    function US(e, t) {
      for (
        var n = e.suspendedLanes,
          r = e.pingedLanes,
          o = e.expirationTimes,
          i = e.pendingLanes;
        0 < i;

      ) {
        var s = 31 - jt(i),
          l = 1 << s,
          a = o[s];
        a === -1
          ? (!(l & n) || l & r) && (o[s] = bS(l, t))
          : a <= t && (e.expiredLanes |= l),
          (i &= ~l);
      }
    }
    function Qu(e) {
      return (
        (e = e.pendingLanes & -1073741825),
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
      );
    }
    function Uh() {
      var e = ks;
      return (ks <<= 1), !(ks & 4194240) && (ks = 64), e;
    }
    function hu(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function bi(e, t, n) {
      (e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - jt(t)),
        (e[t] = n);
    }
    function FS(e, t) {
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
        var o = 31 - jt(n),
          i = 1 << o;
        (t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i);
      }
    }
    function Pc(e, t) {
      var n = (e.entangledLanes |= t);
      for (e = e.entanglements; n; ) {
        var r = 31 - jt(n),
          o = 1 << r;
        (o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o);
      }
    }
    var ie = 0;
    function Fh(e) {
      return (
        (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
      );
    }
    var zh,
      Oc,
      Bh,
      jh,
      Hh,
      Yu = !1,
      Is = [],
      Vn = null,
      $n = null,
      bn = null,
      Ri = new Map(),
      xi = new Map(),
      Pn = [],
      zS =
        'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset \
submit'.split(' ');
    function Sp(e, t) {
      switch (e) {
        case 'focusin':
        case 'focusout':
          Vn = null;
          break;
        case 'dragenter':
        case 'dragleave':
          $n = null;
          break;
        case 'mouseover':
        case 'mouseout':
          bn = null;
          break;
        case 'pointerover':
        case 'pointerout':
          Ri.delete(t.pointerId);
          break;
        case 'gotpointercapture':
        case 'lostpointercapture':
          xi.delete(t.pointerId);
      }
    }
    function ti(e, t, n, r, o, i) {
      return e === null || e.nativeEvent !== i
        ? ((e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: r,
            nativeEvent: i,
            targetContainers: [o],
          }),
          t !== null && ((t = Fi(t)), t !== null && Oc(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          o !== null && t.indexOf(o) === -1 && t.push(o),
          e);
    }
    function BS(e, t, n, r, o) {
      switch (t) {
        case 'focusin':
          return (Vn = ti(Vn, e, t, n, r, o)), !0;
        case 'dragenter':
          return ($n = ti($n, e, t, n, r, o)), !0;
        case 'mouseover':
          return (bn = ti(bn, e, t, n, r, o)), !0;
        case 'pointerover':
          var i = o.pointerId;
          return Ri.set(i, ti(Ri.get(i) || null, e, t, n, r, o)), !0;
        case 'gotpointercapture':
          return (
            (i = o.pointerId),
            xi.set(i, ti(xi.get(i) || null, e, t, n, r, o)),
            !0
          );
      }
      return !1;
    }
    function Wh(e) {
      var t = fr(e.target);
      if (t !== null) {
        var n = wr(t);
        if (n !== null) {
          if (((t = n.tag), t === 13)) {
            if (((t = Oh(n)), t !== null)) {
              (e.blockedOn = t),
                Hh(e.priority, function () {
                  Bh(n);
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
    function Ws(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var n = Zu(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
          n = e.nativeEvent;
          var r = new n.constructor(n.type, n);
          (Hu = r), n.target.dispatchEvent(r), (Hu = null);
        } else return (t = Fi(n)), t !== null && Oc(t), (e.blockedOn = n), !1;
        t.shift();
      }
      return !0;
    }
    function _p(e, t, n) {
      Ws(e) && n.delete(t);
    }
    function jS() {
      (Yu = !1),
        Vn !== null && Ws(Vn) && (Vn = null),
        $n !== null && Ws($n) && ($n = null),
        bn !== null && Ws(bn) && (bn = null),
        Ri.forEach(_p),
        xi.forEach(_p);
    }
    function ni(e, t) {
      e.blockedOn === t &&
        ((e.blockedOn = null),
        Yu ||
          ((Yu = !0),
          yt.unstable_scheduleCallback(yt.unstable_NormalPriority, jS)));
    }
    function Ni(e) {
      function t(o) {
        return ni(o, e);
      }
      if (0 < Is.length) {
        ni(Is[0], e);
        for (var n = 1; n < Is.length; n++) {
          var r = Is[n];
          r.blockedOn === e && (r.blockedOn = null);
        }
      }
      for (
        Vn !== null && ni(Vn, e),
          $n !== null && ni($n, e),
          bn !== null && ni(bn, e),
          Ri.forEach(t),
          xi.forEach(t),
          n = 0;
        n < Pn.length;
        n++
      )
        (r = Pn[n]), r.blockedOn === e && (r.blockedOn = null);
      for (; 0 < Pn.length && ((n = Pn[0]), n.blockedOn === null); )
        Wh(n), n.blockedOn === null && Pn.shift();
    }
    var lo = gn.ReactCurrentBatchConfig,
      sl = !0;
    function HS(e, t, n, r) {
      var o = ie,
        i = lo.transition;
      lo.transition = null;
      try {
        (ie = 1), Dc(e, t, n, r);
      } finally {
        (ie = o), (lo.transition = i);
      }
    }
    function WS(e, t, n, r) {
      var o = ie,
        i = lo.transition;
      lo.transition = null;
      try {
        (ie = 4), Dc(e, t, n, r);
      } finally {
        (ie = o), (lo.transition = i);
      }
    }
    function Dc(e, t, n, r) {
      if (sl) {
        var o = Zu(e, t, n, r);
        if (o === null) Eu(e, t, r, ll, n), Sp(e, r);
        else if (BS(o, e, t, n, r)) r.stopPropagation();
        else if ((Sp(e, r), t & 4 && -1 < zS.indexOf(e))) {
          for (; o !== null; ) {
            var i = Fi(o);
            if (
              (i !== null && zh(i),
              (i = Zu(e, t, n, r)),
              i === null && Eu(e, t, r, ll, n),
              i === o)
            )
              break;
            o = i;
          }
          o !== null && r.stopPropagation();
        } else Eu(e, t, r, null, n);
      }
    }
    var ll = null;
    function Zu(e, t, n, r) {
      if (((ll = null), (e = Lc(r)), (e = fr(e)), e !== null))
        if (((t = wr(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
          if (((e = Oh(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      return (ll = e), null;
    }
    function Gh(e) {
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
          switch (PS()) {
            case Ic:
              return 1;
            case $h:
              return 4;
            case ol:
            case OS:
              return 16;
            case bh:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var Dn = null,
      Mc = null,
      Gs = null;
    function Kh() {
      if (Gs) return Gs;
      var e,
        t = Mc,
        n = t.length,
        r,
        o = 'value' in Dn ? Dn.value : Dn.textContent,
        i = o.length;
      for (e = 0; e < n && t[e] === o[e]; e++);
      var s = n - e;
      for (r = 1; r <= s && t[n - r] === o[i - r]; r++);
      return (Gs = o.slice(e, 1 < r ? 1 - r : void 0));
    }
    function Ks(e) {
      var t = e.keyCode;
      return (
        'charCode' in e
          ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
          : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
      );
    }
    function Ps() {
      return !0;
    }
    function Ep() {
      return !1;
    }
    function gt(e) {
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
            ? Ps
            : Ep),
          (this.isPropagationStopped = Ep),
          this
        );
      }
      return (
        xe(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n &&
              (n.preventDefault
                ? n.preventDefault()
                : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
              (this.isDefaultPrevented = Ps));
          },
          stopPropagation: function () {
            var n = this.nativeEvent;
            n &&
              (n.stopPropagation
                ? n.stopPropagation()
                : typeof n.cancelBubble !=
                    'u\
nknown' && (n.cancelBubble = !0),
              (this.isPropagationStopped = Ps));
          },
          persist: function () {},
          isPersistent: Ps,
        }),
        t
      );
    }
    var go = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      Vc = gt(go),
      Ui = xe({}, go, { view: 0, detail: 0 }),
      GS = gt(Ui),
      mu,
      vu,
      ri,
      Nl = xe({}, Ui, {
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
        getModifierState: $c,
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
            : (e !== ri &&
                (ri && e.type === 'mousemove'
                  ? ((mu = e.screenX - ri.screenX),
                    (vu = e.screenY - ri.screenY))
                  : (vu = mu = 0),
                (ri = e)),
              mu);
        },
        movementY: function (e) {
          return 'movementY' in e ? e.movementY : vu;
        },
      }),
      wp = gt(Nl),
      KS = xe({}, Nl, { dataTransfer: 0 }),
      QS = gt(KS),
      YS = xe({}, Ui, { relatedTarget: 0 }),
      yu = gt(YS),
      ZS = xe({}, go, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      qS = gt(ZS),
      XS = xe({}, go, {
        clipboardData: function (e) {
          return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
        },
      }),
      JS = gt(XS),
      e_ = xe({}, go, { data: 0 }),
      Tp = gt(e_),
      t_ = {
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
      n_ = {
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
      r_ = {
        Alt: 'altKey',
        Control: 'ctrlKey',
        Meta: 'metaKey',
        Shift: 'shiftKey',
      };
    function o_(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : (e = r_[e])
        ? !!t[e]
        : !1;
    }
    function $c() {
      return o_;
    }
    var i_ = xe({}, Ui, {
        key: function (e) {
          if (e.key) {
            var t = t_[e.key] || e.key;
            if (t !== 'Unidentified') return t;
          }
          return e.type === 'keypress'
            ? ((e = Ks(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
            : e.type === 'keydown' || e.type === 'keyup'
            ? n_[e.keyCode] || 'Unidentified'
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
        getModifierState: $c,
        charCode: function (e) {
          return e.type === 'keypress' ? Ks(e) : 0;
        },
        keyCode: function (e) {
          return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
        },
        which: function (e) {
          return e.type === 'keypress'
            ? Ks(e)
            : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
        },
      }),
      s_ = gt(i_),
      l_ = xe({}, Nl, {
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
      Rp = gt(l_),
      a_ = xe({}, Ui, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: $c,
      }),
      u_ = gt(a_),
      c_ = xe({}, go, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      f_ = gt(c_),
      d_ = xe({}, Nl, {
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
      p_ = gt(d_),
      h_ = [9, 13, 27, 32],
      bc = hn && 'CompositionEvent' in window,
      hi = null;
    hn && 'documentMode' in document && (hi = document.documentMode);
    var m_ = hn && 'TextEvent' in window && !hi,
      Qh = hn && (!bc || (hi && 8 < hi && 11 >= hi)),
      xp = String.fromCharCode(32),
      Np = !1;
    function Yh(e, t) {
      switch (e) {
        case 'keyup':
          return h_.indexOf(t.keyCode) !== -1;
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
    function Zh(e) {
      return (
        (e = e.detail),
        typeof e ==
          'objec\
t' && 'data' in e
          ? e.data
          : null
      );
    }
    var Qr = !1;
    function v_(e, t) {
      switch (e) {
        case 'compositionend':
          return Zh(t);
        case 'keypress':
          return t.which !== 32 ? null : ((Np = !0), xp);
        case 'textInput':
          return (e = t.data), e === xp && Np ? null : e;
        default:
          return null;
      }
    }
    function y_(e, t) {
      if (Qr)
        return e === 'compositionend' || (!bc && Yh(e, t))
          ? ((e = Kh()), (Gs = Mc = Dn = null), (Qr = !1), e)
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
          return Qh && t.locale !== 'ko' ? null : t.data;
        default:
          return null;
      }
    }
    var g_ = {
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
    function Ap(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === 'input' ? !!g_[e.type] : t === 'textarea';
    }
    function qh(e, t, n, r) {
      Ch(r),
        (t = al(t, 'onChange')),
        0 < t.length &&
          ((n = new Vc('onChange', 'change', null, n, r)),
          e.push({ event: n, listeners: t }));
    }
    var mi = null,
      Ai = null;
    function S_(e) {
      am(e, 0);
    }
    function Al(e) {
      var t = qr(e);
      if (Eh(t)) return e;
    }
    function __(e, t) {
      if (e === 'change') return t;
    }
    var Xh = !1;
    hn &&
      (hn
        ? ((Ds = 'oninput' in document),
          Ds ||
            ((gu = document.createElement('div')),
            gu.setAttribute('oninput', 'return;'),
            (Ds = typeof gu.oninput == 'function')),
          (Os = Ds))
        : (Os = !1),
      (Xh = Os && (!document.documentMode || 9 < document.documentMode)));
    var Os, Ds, gu;
    function Cp() {
      mi && (mi.detachEvent('onpropertychange', Jh), (Ai = mi = null));
    }
    function Jh(e) {
      if (e.propertyName === 'value' && Al(Ai)) {
        var t = [];
        qh(t, Ai, e, Lc(e)), Ph(S_, t);
      }
    }
    function E_(e, t, n) {
      e === 'focusin'
        ? (Cp(), (mi = t), (Ai = n), mi.attachEvent('onpropertychange', Jh))
        : e === 'focusout' && Cp();
    }
    function w_(e) {
      if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
        return Al(Ai);
    }
    function T_(e, t) {
      if (e === 'click') return Al(t);
    }
    function R_(e, t) {
      if (e === 'input' || e === 'change') return Al(t);
    }
    function x_(e, t) {
      return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
    }
    var Wt = typeof Object.is == 'function' ? Object.is : x_;
    function Ci(e, t) {
      if (Wt(e, t)) return !0;
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
        if (!Pu.call(t, o) || !Wt(e[o], t[o])) return !1;
      }
      return !0;
    }
    function kp(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Lp(e, t) {
      var n = kp(e);
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
        n = kp(n);
      }
    }
    function em(e, t) {
      return e && t
        ? e === t
          ? !0
          : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
          ? em(e, t.parentNode)
          : 'contains' in e
          ? e.contains(t)
          : e.compareDocumentPosition
          ? !!(e.compareDocumentPosition(t) & 16)
          : !1
        : !1;
    }
    function tm() {
      for (var e = window, t = tl(); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = typeof t.contentWindow.location.href == 'string';
        } catch {
          n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = tl(e.document);
      }
      return t;
    }
    function Uc(e) {
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
    function N_(e) {
      var t = tm(),
        n = e.focusedElem,
        r = e.selectionRange;
      if (
        t !== n &&
        n &&
        n.ownerDocument &&
        em(n.ownerDocument.documentElement, n)
      ) {
        if (r !== null && Uc(n)) {
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
              (o = Lp(n, i));
            var s = Lp(n, r);
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
    var A_ = hn && 'documentMode' in document && 11 >= document.documentMode,
      Yr = null,
      qu = null,
      vi = null,
      Xu = !1;
    function Ip(e, t, n) {
      var r =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      Xu ||
        Yr == null ||
        Yr !== tl(r) ||
        ((r = Yr),
        'selectionStart' in r && Uc(r)
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
        (vi && Ci(vi, r)) ||
          ((vi = r),
          (r = al(qu, 'onSelect')),
          0 < r.length &&
            ((t = new Vc('onSelect', 'select', null, t, n)),
            e.push({ event: t, listeners: r }),
            (t.target = Yr))));
    }
    function Ms(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n['Webkit' + e] = 'webkit' + t),
        (n['Moz' + e] = 'moz' + t),
        n
      );
    }
    var Zr = {
        animationend: Ms('Animation', 'AnimationEnd'),
        animationiteration: Ms('Animation', 'AnimationIteration'),
        animationstart: Ms('Animation', 'AnimationStart'),
        transitionend: Ms('Transition', 'TransitionEnd'),
      },
      Su = {},
      nm = {};
    hn &&
      ((nm = document.createElement('div').style),
      'AnimationEvent' in window ||
        (delete Zr.animationend.animation,
        delete Zr.animationiteration.animation,
        delete Zr.animationstart.animation),
      'TransitionEvent' in window || delete Zr.transitionend.transition);
    function Cl(e) {
      if (Su[e]) return Su[e];
      if (!Zr[e]) return e;
      var t = Zr[e],
        n;
      for (n in t) if (t.hasOwnProperty(n) && n in nm) return (Su[e] = t[n]);
      return e;
    }
    var rm = Cl('animationend'),
      om = Cl('animationiteration'),
      im = Cl('animationstart'),
      sm = Cl('transitionend'),
      lm = new Map(),
      Pp = '\
abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stall\
ed submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' ',
      );
    function Gn(e, t) {
      lm.set(e, t), Er(t, [e]);
    }
    for (Vs = 0; Vs < Pp.length; Vs++)
      ($s = Pp[Vs]),
        (Op = $s.toLowerCase()),
        (Dp = $s[0].toUpperCase() + $s.slice(1)),
        Gn(Op, 'on' + Dp);
    var $s, Op, Dp, Vs;
    Gn(rm, 'onAnimationEnd');
    Gn(om, 'onAnimationIteration');
    Gn(im, 'onAnimationStart');
    Gn('dblclick', 'onDoubleClick');
    Gn('focusin', 'onFocus');
    Gn('focusout', 'onBlur');
    Gn(sm, 'onTransitionEnd');
    co('onMouseEnter', ['mouseout', 'mouseover']);
    co('onMouseLeave', ['mouseout', 'mouseover']);
    co('onPointerEnter', ['pointerout', 'pointerover']);
    co('onPointerLeave', ['pointerout', 'pointerover']);
    Er(
      'onChange',
      'change click focusin focusout input keydown keyup selectionchange'.split(
        ' ',
      ),
    );
    Er(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' ',
      ),
    );
    Er('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
    Er(
      'onCompositionEnd',
      'compositionend focusout keydown keypress k\
eyup mousedown'.split(' '),
    );
    Er(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' '),
    );
    Er(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' '),
    );
    var fi =
        'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
          ' ',
        ),
      C_ = new Set(
        'cancel close invalid load\
 scroll toggle'
          .split(' ')
          .concat(fi),
      );
    function Mp(e, t, n) {
      var r = e.type || 'unknown-event';
      (e.currentTarget = n), CS(r, t, void 0, e), (e.currentTarget = null);
    }
    function am(e, t) {
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
              Mp(o, l, u), (i = a);
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
              Mp(o, l, u), (i = a);
            }
        }
      }
      if (rl) throw ((e = Ku), (rl = !1), (Ku = null), e);
    }
    function he(e, t) {
      var n = t[rc];
      n === void 0 && (n = t[rc] = new Set());
      var r = e + '__bubble';
      n.has(r) || (um(t, e, 2, !1), n.add(r));
    }
    function _u(e, t, n) {
      var r = 0;
      t && (r |= 4), um(n, e, r, t);
    }
    var bs = '_reactListening' + Math.random().toString(36).slice(2);
    function ki(e) {
      if (!e[bs]) {
        (e[bs] = !0),
          vh.forEach(function (n) {
            n !== 'selectionchange' &&
              (C_.has(n) || _u(n, !1, e), _u(n, !0, e));
          });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[bs] || ((t[bs] = !0), _u('selectionchange', !1, t));
      }
    }
    function um(e, t, n, r) {
      switch (Gh(t)) {
        case 1:
          var o = HS;
          break;
        case 4:
          o = WS;
          break;
        default:
          o = Dc;
      }
      (n = o.bind(null, t, n, e)),
        (o = void 0),
        !Gu ||
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
    function Eu(e, t, n, r, o) {
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
              if (((s = fr(l)), s === null)) return;
              if (((a = s.tag), a === 5 || a === 6)) {
                r = i = s;
                continue e;
              }
              l = l.parentNode;
            }
          }
          r = r.return;
        }
      Ph(function () {
        var u = i,
          f = Lc(n),
          p = [];
        e: {
          var m = lm.get(e);
          if (m !== void 0) {
            var S = Vc,
              y = e;
            switch (e) {
              case 'keypress':
                if (Ks(n) === 0) break e;
              case 'keydown':
              case 'keyup':
                S = s_;
                break;
              case 'focusin':
                (y = 'focus'), (S = yu);
                break;
              case 'focusout':
                (y = 'blur'), (S = yu);
                break;
              case 'beforeblur':
              case 'afterblur':
                S = yu;
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
                S = wp;
                break;
              case 'drag':
              case 'dragend':
              case 'dragenter':
              case 'dragexit':
              case 'dragleave':
              case 'dragover':
              case 'dragstart':
              case 'drop':
                S = QS;
                break;
              case 'touchcancel':
              case 'touchend':
              case 'touchmove':
              case 'touchstart':
                S = u_;
                break;
              case rm:
              case om:
              case im:
                S = qS;
                break;
              case sm:
                S = f_;
                break;
              case 'scroll':
                S = GS;
                break;
              case '\
wheel':
                S = p_;
                break;
              case 'copy':
              case 'cut':
              case 'paste':
                S = JS;
                break;
              case 'gotpointercapture':
              case 'lostpointercapture':
              case 'pointercancel':
              case 'pointerdown':
              case 'pointermove':
              case 'pointerout':
              case 'pointerover':
              case 'pointerup':
                S = Rp;
            }
            var w = (t & 4) !== 0,
              b = !w && e === 'scroll',
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
                    ((E = Ti(c, h)), E != null && w.push(Li(c, E, d)))),
                b)
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
                n !== Hu &&
                (y = n.relatedTarget || n.fromElement) &&
                (fr(y) || y[mn]))
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
                  (y = y ? fr(y) : null),
                  y !== null &&
                    ((b = wr(y)), y !== b || (y.tag !== 5 && y.tag !== 6)) &&
                    (y = null))
                : ((S = null), (y = u)),
              S !== y)
            ) {
              if (
                ((w = wp),
                (E = 'onMouseLeave'),
                (h = 'onMouseEnter'),
                (c = 'mouse'),
                (e === 'pointerout' || e === 'pointerover') &&
                  ((w = Rp),
                  (E = 'onPointerLeave'),
                  (h =
                    'onP\
ointerEnter'),
                  (c = 'pointer')),
                (b = S == null ? m : qr(S)),
                (d = y == null ? m : qr(y)),
                (m = new w(E, c + 'leave', S, n, f)),
                (m.target = b),
                (m.relatedTarget = d),
                (E = null),
                fr(f) === u &&
                  ((w = new w(h, c + 'enter', y, n, f)),
                  (w.target = d),
                  (w.relatedTarget = b),
                  (E = w)),
                (b = E),
                S && y)
              )
                t: {
                  for (w = S, h = y, c = 0, d = w; d; d = Wr(d)) c++;
                  for (d = 0, E = h; E; E = Wr(E)) d++;
                  for (; 0 < c - d; ) (w = Wr(w)), c--;
                  for (; 0 < d - c; ) (h = Wr(h)), d--;
                  for (; c--; ) {
                    if (w === h || (h !== null && w === h.alternate)) break t;
                    (w = Wr(w)), (h = Wr(h));
                  }
                  w = null;
                }
              else w = null;
              S !== null && Vp(p, m, S, w, !1),
                y !== null && b !== null && Vp(p, b, y, w, !0);
            }
          }
          e: {
            if (
              ((m = u ? qr(u) : window),
              (S = m.nodeName && m.nodeName.toLowerCase()),
              S === 'select' || (S === 'input' && m.type === 'file'))
            )
              var R = __;
            else if (Ap(m))
              if (Xh) R = R_;
              else {
                R = w_;
                var x = E_;
              }
            else
              (S = m.nodeName) &&
                S.toLowerCase() === 'input' &&
                (m.type === 'checkbox' || m.type === 'radio') &&
                (R = T_);
            if (R && (R = R(e, u))) {
              qh(p, R, n, f);
              break e;
            }
            x && x(e, m, u),
              e === 'focusout' &&
                (x = m._wrapperState) &&
                x.controlled &&
                m.type === 'number' &&
                Uu(m, 'number', m.value);
          }
          switch (((x = u ? qr(u) : window), e)) {
            case 'focusin':
              (Ap(x) || x.contentEditable === 'true') &&
                ((Yr = x), (qu = u), (vi = null));
              break;
            case 'focusout':
              vi = qu = Yr = null;
              break;
            case '\
mousedown':
              Xu = !0;
              break;
            case 'contextmenu':
            case 'mouseup':
            case 'dragend':
              (Xu = !1), Ip(p, n, f);
              break;
            case 'selectionchange':
              if (A_) break;
            case 'keydown':
            case 'keyup':
              Ip(p, n, f);
          }
          var T;
          if (bc)
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
            Qr
              ? Yh(e, n) && (O = 'onCompositionEnd')
              : e === 'keydown' &&
                n.keyCode === 229 &&
                (O = 'onCompositionStart');
          O &&
            (Qh &&
              n.locale !== 'ko' &&
              (Qr ||
              O !==
                'onComposi\
tionStart'
                ? O === 'onCompositionEnd' && Qr && (T = Kh())
                : ((Dn = f),
                  (Mc = 'value' in Dn ? Dn.value : Dn.textContent),
                  (Qr = !0))),
            (x = al(u, O)),
            0 < x.length &&
              ((O = new Tp(O, e, null, n, f)),
              p.push({ event: O, listeners: x }),
              T ? (O.data = T) : ((T = Zh(n)), T !== null && (O.data = T)))),
            (T = m_ ? v_(e, n) : y_(e, n)) &&
              ((u = al(u, 'onBeforeInput')),
              0 < u.length &&
                ((f = new Tp('onBeforeInput', 'beforeinput', null, n, f)),
                p.push({ event: f, listeners: u }),
                (f.data = T)));
        }
        am(p, t);
      });
    }
    function Li(e, t, n) {
      return { instance: e, listener: t, currentTarget: n };
    }
    function al(e, t) {
      for (var n = t + 'Capture', r = []; e !== null; ) {
        var o = e,
          i = o.stateNode;
        o.tag === 5 &&
          i !== null &&
          ((o = i),
          (i = Ti(e, n)),
          i != null && r.unshift(Li(e, i, o)),
          (i = Ti(e, t)),
          i != null && r.push(Li(e, i, o))),
          (e = e.return);
      }
      return r;
    }
    function Wr(e) {
      if (e === null) return null;
      do e = e.return;
      while (e && e.tag !== 5);
      return e || null;
    }
    function Vp(e, t, n, r, o) {
      for (var i = t._reactName, s = []; n !== null && n !== r; ) {
        var l = n,
          a = l.alternate,
          u = l.stateNode;
        if (a !== null && a === r) break;
        l.tag === 5 &&
          u !== null &&
          ((l = u),
          o
            ? ((a = Ti(n, i)), a != null && s.unshift(Li(n, a, l)))
            : o || ((a = Ti(n, i)), a != null && s.push(Li(n, a, l)))),
          (n = n.return);
      }
      s.length !== 0 && e.push({ event: t, listeners: s });
    }
    var k_ = /\r\n?/g,
      L_ = /\u0000|\uFFFD/g;
    function $p(e) {
      return (typeof e == 'string' ? e : '' + e)
        .replace(
          k_,
          `
`,
        )
        .replace(L_, '');
    }
    function Us(e, t, n) {
      if (((t = $p(t)), $p(e) !== t && n)) throw Error(A(425));
    }
    function ul() {}
    var Ju = null,
      ec = null;
    function tc(e, t) {
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
    var nc = typeof setTimeout == 'function' ? setTimeout : void 0,
      I_ = typeof clearTimeout == 'function' ? clearTimeout : void 0,
      bp = typeof Promise == 'function' ? Promise : void 0,
      P_ =
        typeof queueMicrotask == 'function'
          ? queueMicrotask
          : typeof bp < 'u'
          ? function (e) {
              return bp.resolve(null).then(e).catch(O_);
            }
          : nc;
    function O_(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function wu(e, t) {
      var n = t,
        r = 0;
      do {
        var o = n.nextSibling;
        if ((e.removeChild(n), o && o.nodeType === 8))
          if (((n = o.data), n === '/$')) {
            if (r === 0) {
              e.removeChild(o), Ni(t);
              return;
            }
            r--;
          } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
        n = o;
      } while (n);
      Ni(t);
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
    function Up(e) {
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
    var So = Math.random().toString(36).slice(2),
      en = '__reactFiber$' + So,
      Ii = '__reactProps$' + So,
      mn = '__reactContainer$' + So,
      rc = '__reactEvents$' + So,
      D_ = '__reactListeners$' + So,
      M_ = '__reactHandles$' + So;
    function fr(e) {
      var t = e[en];
      if (t) return t;
      for (var n = e.parentNode; n; ) {
        if ((t = n[mn] || n[en])) {
          if (
            ((n = t.alternate),
            t.child !== null || (n !== null && n.child !== null))
          )
            for (e = Up(e); e !== null; ) {
              if ((n = e[en])) return n;
              e = Up(e);
            }
          return t;
        }
        (e = n), (n = e.parentNode);
      }
      return null;
    }
    function Fi(e) {
      return (
        (e = e[en] || e[mn]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
          ? null
          : e
      );
    }
    function qr(e) {
      if (e.tag === 5 || e.tag === 6) return e.stateNode;
      throw Error(A(33));
    }
    function kl(e) {
      return e[Ii] || null;
    }
    var oc = [],
      Xr = -1;
    function Kn(e) {
      return { current: e };
    }
    function me(e) {
      0 > Xr || ((e.current = oc[Xr]), (oc[Xr] = null), Xr--);
    }
    function pe(e, t) {
      Xr++, (oc[Xr] = e.current), (e.current = t);
    }
    var Wn = {},
      Ge = Kn(Wn),
      at = Kn(!1),
      vr = Wn;
    function fo(e, t) {
      var n = e.type.contextTypes;
      if (!n) return Wn;
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
    function ut(e) {
      return (e = e.childContextTypes), e != null;
    }
    function cl() {
      me(at), me(Ge);
    }
    function Fp(e, t, n) {
      if (Ge.current !== Wn) throw Error(A(168));
      pe(Ge, t), pe(at, n);
    }
    function cm(e, t, n) {
      var r = e.stateNode;
      if (((t = t.childContextTypes), typeof r.getChildContext != 'function'))
        return n;
      r = r.getChildContext();
      for (var o in r)
        if (!(o in t)) throw Error(A(108, ES(e) || 'Unknown', o));
      return xe({}, n, r);
    }
    function fl(e) {
      return (
        (e =
          ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
          Wn),
        (vr = Ge.current),
        pe(Ge, e),
        pe(at, at.current),
        !0
      );
    }
    function zp(e, t, n) {
      var r = e.stateNode;
      if (!r) throw Error(A(169));
      n
        ? ((e = cm(e, t, vr)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          me(at),
          me(Ge),
          pe(Ge, e))
        : me(at),
        pe(at, n);
    }
    var cn = null,
      Ll = !1,
      Tu = !1;
    function fm(e) {
      cn === null ? (cn = [e]) : cn.push(e);
    }
    function V_(e) {
      (Ll = !0), fm(e);
    }
    function Qn() {
      if (!Tu && cn !== null) {
        Tu = !0;
        var e = 0,
          t = ie;
        try {
          var n = cn;
          for (ie = 1; e < n.length; e++) {
            var r = n[e];
            do r = r(!0);
            while (r !== null);
          }
          (cn = null), (Ll = !1);
        } catch (o) {
          throw (cn !== null && (cn = cn.slice(e + 1)), Vh(Ic, Qn), o);
        } finally {
          (ie = t), (Tu = !1);
        }
      }
      return null;
    }
    var Jr = [],
      eo = 0,
      dl = null,
      pl = 0,
      xt = [],
      Nt = 0,
      yr = null,
      fn = 1,
      dn = '';
    function ur(e, t) {
      (Jr[eo++] = pl), (Jr[eo++] = dl), (dl = e), (pl = t);
    }
    function dm(e, t, n) {
      (xt[Nt++] = fn), (xt[Nt++] = dn), (xt[Nt++] = yr), (yr = e);
      var r = fn;
      e = dn;
      var o = 32 - jt(r) - 1;
      (r &= ~(1 << o)), (n += 1);
      var i = 32 - jt(t) + o;
      if (30 < i) {
        var s = o - (o % 5);
        (i = (r & ((1 << s) - 1)).toString(32)),
          (r >>= s),
          (o -= s),
          (fn = (1 << (32 - jt(t) + o)) | (n << o) | r),
          (dn = i + e);
      } else (fn = (1 << i) | (n << o) | r), (dn = e);
    }
    function Fc(e) {
      e.return !== null && (ur(e, 1), dm(e, 1, 0));
    }
    function zc(e) {
      for (; e === dl; )
        (dl = Jr[--eo]), (Jr[eo] = null), (pl = Jr[--eo]), (Jr[eo] = null);
      for (; e === yr; )
        (yr = xt[--Nt]),
          (xt[Nt] = null),
          (dn = xt[--Nt]),
          (xt[Nt] = null),
          (fn = xt[--Nt]),
          (xt[Nt] = null);
    }
    var vt = null,
      mt = null,
      _e = !1,
      Bt = null;
    function pm(e, t) {
      var n = At(5, null, null, 0);
      (n.elementType = 'DELETED'),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
    }
    function Bp(e, t) {
      switch (e.tag) {
        case 5:
          var n = e.type;
          return (
            (t =
              t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
                ? null
                : t),
            t !== null
              ? ((e.stateNode = t), (vt = e), (mt = Un(t.firstChild)), !0)
              : !1
          );
        case 6:
          return (
            (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
            t !== null ? ((e.stateNode = t), (vt = e), (mt = null), !0) : !1
          );
        case 13:
          return (
            (t = t.nodeType !== 8 ? null : t),
            t !== null
              ? ((n = yr !== null ? { id: fn, overflow: dn } : null),
                (e.memoizedState = {
                  dehydrated: t,
                  treeContext: n,
                  retryLane: 1073741824,
                }),
                (n = At(18, null, null, 0)),
                (n.stateNode = t),
                (n.return = e),
                (e.child = n),
                (vt = e),
                (mt = null),
                !0)
              : !1
          );
        default:
          return !1;
      }
    }
    function ic(e) {
      return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
    }
    function sc(e) {
      if (_e) {
        var t = mt;
        if (t) {
          var n = t;
          if (!Bp(e, t)) {
            if (ic(e)) throw Error(A(418));
            t = Un(n.nextSibling);
            var r = vt;
            t && Bp(e, t)
              ? pm(r, n)
              : ((e.flags = (e.flags & -4097) | 2), (_e = !1), (vt = e));
          }
        } else {
          if (ic(e)) throw Error(A(418));
          (e.flags = (e.flags & -4097) | 2), (_e = !1), (vt = e);
        }
      }
    }
    function jp(e) {
      for (
        e = e.return;
        e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

      )
        e = e.return;
      vt = e;
    }
    function Fs(e) {
      if (e !== vt) return !1;
      if (!_e) return jp(e), (_e = !0), !1;
      var t;
      if (
        ((t = e.tag !== 3) &&
          !(t = e.tag !== 5) &&
          ((t = e.type),
          (t = t !== 'head' && t !== 'body' && !tc(e.type, e.memoizedProps))),
        t && (t = mt))
      ) {
        if (ic(e)) throw (hm(), Error(A(418)));
        for (; t; ) pm(e, t), (t = Un(t.nextSibling));
      }
      if ((jp(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
          throw Error(A(317));
        e: {
          for (e = e.nextSibling, t = 0; e; ) {
            if (e.nodeType === 8) {
              var n = e.data;
              if (n === '/$') {
                if (t === 0) {
                  mt = Un(e.nextSibling);
                  break e;
                }
                t--;
              } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
            }
            e = e.nextSibling;
          }
          mt = null;
        }
      } else mt = vt ? Un(e.stateNode.nextSibling) : null;
      return !0;
    }
    function hm() {
      for (var e = mt; e; ) e = Un(e.nextSibling);
    }
    function po() {
      (mt = vt = null), (_e = !1);
    }
    function Bc(e) {
      Bt === null ? (Bt = [e]) : Bt.push(e);
    }
    var $_ = gn.ReactCurrentBatchConfig;
    function Ft(e, t) {
      if (e && e.defaultProps) {
        (t = xe({}, t)), (e = e.defaultProps);
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
      }
      return t;
    }
    var hl = Kn(null),
      ml = null,
      to = null,
      jc = null;
    function Hc() {
      jc = to = ml = null;
    }
    function Wc(e) {
      var t = hl.current;
      me(hl), (e._currentValue = t);
    }
    function lc(e, t, n) {
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
    function ao(e, t) {
      (ml = e),
        (jc = to = null),
        (e = e.dependencies),
        e !== null &&
          e.firstContext !== null &&
          (e.lanes & t && (lt = !0), (e.firstContext = null));
    }
    function kt(e) {
      var t = e._currentValue;
      if (jc !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), to === null)) {
          if (ml === null) throw Error(A(308));
          (to = e), (ml.dependencies = { lanes: 0, firstContext: e });
        } else to = to.next = e;
      return t;
    }
    var dr = null;
    function Gc(e) {
      dr === null ? (dr = [e]) : dr.push(e);
    }
    function mm(e, t, n, r) {
      var o = t.interleaved;
      return (
        o === null ? ((n.next = n), Gc(t)) : ((n.next = o.next), (o.next = n)),
        (t.interleaved = n),
        vn(e, r)
      );
    }
    function vn(e, t) {
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
    var In = !1;
    function Kc(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
      };
    }
    function vm(e, t) {
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
    function pn(e, t) {
      return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
      };
    }
    function Fn(e, t, n) {
      var r = e.updateQueue;
      if (r === null) return null;
      if (((r = r.shared), ne & 2)) {
        var o = r.pending;
        return (
          o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
          (r.pending = t),
          vn(e, n)
        );
      }
      return (
        (o = r.interleaved),
        o === null ? ((t.next = t), Gc(r)) : ((t.next = o.next), (o.next = t)),
        (r.interleaved = t),
        vn(e, n)
      );
    }
    function Qs(e, t, n) {
      if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (n & 4194240) !== 0))
      ) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), Pc(e, n);
      }
    }
    function Hp(e, t) {
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
    function vl(e, t, n, r) {
      var o = e.updateQueue;
      In = !1;
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
                  p = xe({}, p, m);
                  break e;
                case 2:
                  In = !0;
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
        (Sr |= s), (e.lanes = s), (e.memoizedState = p);
      }
    }
    function Wp(e, t, n) {
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
    var ym = new mh.Component().refs;
    function ac(e, t, n, r) {
      (t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : xe({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n);
    }
    var Il = {
      isMounted: function (e) {
        return (e = e._reactInternals) ? wr(e) === e : !1;
      },
      enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = et(),
          o = Bn(e),
          i = pn(r, o);
        (i.payload = t),
          n != null && (i.callback = n),
          (t = Fn(e, i, o)),
          t !== null && (Ht(t, e, o, r), Qs(t, e, o));
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = et(),
          o = Bn(e),
          i = pn(r, o);
        (i.tag = 1),
          (i.payload = t),
          n != null && (i.callback = n),
          (t = Fn(e, i, o)),
          t !== null && (Ht(t, e, o, r), Qs(t, e, o));
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = et(),
          r = Bn(e),
          o = pn(n, r);
        (o.tag = 2),
          t != null && (o.callback = t),
          (t = Fn(e, o, r)),
          t !== null && (Ht(t, e, r, n), Qs(t, e, r));
      },
    };
    function Gp(e, t, n, r, o, i, s) {
      return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == 'function'
          ? e.shouldComponentUpdate(r, i, s)
          : t.prototype && t.prototype.isPureReactComponent
          ? !Ci(n, r) || !Ci(o, i)
          : !0
      );
    }
    function gm(e, t, n) {
      var r = !1,
        o = Wn,
        i = t.contextType;
      return (
        typeof i == 'object' && i !== null
          ? (i = kt(i))
          : ((o = ut(t) ? vr : Ge.current),
            (r = t.contextTypes),
            (i = (r = r != null) ? fo(e, o) : Wn)),
        (t = new t(n, i)),
        (e.memoizedState =
          t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = Il),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = o),
          (e.__reactInternalMemoizedMaskedChildContext = i)),
        t
      );
    }
    function Kp(e, t, n, r) {
      (e = t.state),
        typeof t.componentWillReceiveProps == 'function' &&
          t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && Il.enqueueReplaceState(t, t.state, null);
    }
    function uc(e, t, n, r) {
      var o = e.stateNode;
      (o.props = n), (o.state = e.memoizedState), (o.refs = ym), Kc(e);
      var i = t.contextType;
      typeof i ==
        'obje\
ct' && i !== null
        ? (o.context = kt(i))
        : ((i = ut(t) ? vr : Ge.current), (o.context = fo(e, i))),
        (o.state = e.memoizedState),
        (i = t.getDerivedStateFromProps),
        typeof i == 'function' && (ac(e, t, i, n), (o.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == 'function' ||
          typeof o.getSnapshotBeforeUpdate == 'function' ||
          (typeof o.UNSAFE_componentWillMount != 'function' &&
            typeof o.componentWillMount != 'function') ||
          ((t = o.state),
          typeof o.componentWillMount == 'function' && o.componentWillMount(),
          typeof o.UNSAFE_componentWillMount == 'function' &&
            o.UNSAFE_componentWillMount(),
          t !== o.state && Il.enqueueReplaceState(o, o.state, null),
          vl(e, n, o, r),
          (o.state = e.memoizedState)),
        typeof o.componentDidMount == 'function' && (e.flags |= 4194308);
    }
    function oi(e, t, n) {
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
                l === ym && (l = o.refs = {}),
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
    function zs(e, t) {
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
    function Qp(e) {
      var t = e._init;
      return t(e._payload);
    }
    function Sm(e) {
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
        return (h = jn(h, c)), (h.index = 0), (h.sibling = null), h;
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
          ? ((c = Lu(d, h.mode, E)), (c.return = h), c)
          : ((c = o(c, d)), (c.return = h), c);
      }
      function a(h, c, d, E) {
        var R = d.type;
        return R === Kr
          ? f(h, c, d.props.children, E, d.key)
          : c !== null &&
            (c.elementType === R ||
              (typeof R == 'object' &&
                R !== null &&
                R.$$typeof === Ln &&
                Qp(R) === c.type))
          ? ((E = o(c, d.props)), (E.ref = oi(h, c, d)), (E.return = h), E)
          : ((E = el(d.type, d.key, d.props, null, h.mode, E)),
            (E.ref = oi(h, c, d)),
            (E.return = h),
            E);
      }
      function u(h, c, d, E) {
        return c === null ||
          c.tag !== 4 ||
          c.stateNode.containerInfo !== d.containerInfo ||
          c.stateNode.implementation !== d.implementation
          ? ((c = Iu(d, h.mode, E)), (c.return = h), c)
          : ((c = o(c, d.children || [])), (c.return = h), c);
      }
      function f(h, c, d, E, R) {
        return c === null || c.tag !== 7
          ? ((c = mr(d, h.mode, E, R)), (c.return = h), c)
          : ((c = o(c, d)), (c.return = h), c);
      }
      function p(h, c, d) {
        if ((typeof c == 'string' && c !== '') || typeof c == 'number')
          return (c = Lu('' + c, h.mode, d)), (c.return = h), c;
        if (typeof c == 'object' && c !== null) {
          switch (c.$$typeof) {
            case Ns:
              return (
                (d = el(c.type, c.key, c.props, null, h.mode, d)),
                (d.ref = oi(h, null, c)),
                (d.return = h),
                d
              );
            case Gr:
              return (c = Iu(c, h.mode, d)), (c.return = h), c;
            case Ln:
              var E = c._init;
              return p(h, E(c._payload), d);
          }
          if (ui(c) || ei(c))
            return (c = mr(c, h.mode, d, null)), (c.return = h), c;
          zs(h, c);
        }
        return null;
      }
      function m(h, c, d, E) {
        var R = c !== null ? c.key : null;
        if ((typeof d == 'string' && d !== '') || typeof d == 'number')
          return R !== null ? null : l(h, c, '' + d, E);
        if (typeof d == 'object' && d !== null) {
          switch (d.$$typeof) {
            case Ns:
              return d.key === R ? a(h, c, d, E) : null;
            case Gr:
              return d.key === R ? u(h, c, d, E) : null;
            case Ln:
              return (R = d._init), m(h, c, R(d._payload), E);
          }
          if (ui(d) || ei(d)) return R !== null ? null : f(h, c, d, E, null);
          zs(h, d);
        }
        return null;
      }
      function S(h, c, d, E, R) {
        if ((typeof E == 'string' && E !== '') || typeof E == 'number')
          return (h = h.get(d) || null), l(c, h, '' + E, R);
        if (typeof E == 'object' && E !== null) {
          switch (E.$$typeof) {
            case Ns:
              return (
                (h = h.get(E.key === null ? d : E.key) || null), a(c, h, E, R)
              );
            case Gr:
              return (
                (h = h.get(E.key === null ? d : E.key) || null), u(c, h, E, R)
              );
            case Ln:
              var x = E._init;
              return S(h, c, d, x(E._payload), R);
          }
          if (ui(E) || ei(E))
            return (h = h.get(d) || null), f(c, h, E, R, null);
          zs(c, E);
        }
        return null;
      }
      function y(h, c, d, E) {
        for (
          var R = null, x = null, T = c, O = (c = 0), te = null;
          T !== null && O < d.length;
          O++
        ) {
          T.index > O ? ((te = T), (T = null)) : (te = T.sibling);
          var V = m(h, T, d[O], E);
          if (V === null) {
            T === null && (T = te);
            break;
          }
          e && T && V.alternate === null && t(h, T),
            (c = i(V, c, O)),
            x === null ? (R = V) : (x.sibling = V),
            (x = V),
            (T = te);
        }
        if (O === d.length) return n(h, T), _e && ur(h, O), R;
        if (T === null) {
          for (; O < d.length; O++)
            (T = p(h, d[O], E)),
              T !== null &&
                ((c = i(T, c, O)),
                x === null ? (R = T) : (x.sibling = T),
                (x = T));
          return _e && ur(h, O), R;
        }
        for (T = r(h, T); O < d.length; O++)
          (te = S(T, h, O, d[O], E)),
            te !== null &&
              (e &&
                te.alternate !== null &&
                T.delete(te.key === null ? O : te.key),
              (c = i(te, c, O)),
              x === null ? (R = te) : (x.sibling = te),
              (x = te));
        return (
          e &&
            T.forEach(function (ue) {
              return t(h, ue);
            }),
          _e && ur(h, O),
          R
        );
      }
      function w(h, c, d, E) {
        var R = ei(d);
        if (typeof R != 'function') throw Error(A(150));
        if (((d = R.call(d)), d == null)) throw Error(A(151));
        for (
          var x = (R = null), T = c, O = (c = 0), te = null, V = d.next();
          T !== null && !V.done;
          O++, V = d.next()
        ) {
          T.index > O ? ((te = T), (T = null)) : (te = T.sibling);
          var ue = m(h, T, V.value, E);
          if (ue === null) {
            T === null && (T = te);
            break;
          }
          e && T && ue.alternate === null && t(h, T),
            (c = i(ue, c, O)),
            x === null ? (R = ue) : (x.sibling = ue),
            (x = ue),
            (T = te);
        }
        if (V.done) return n(h, T), _e && ur(h, O), R;
        if (T === null) {
          for (; !V.done; O++, V = d.next())
            (V = p(h, V.value, E)),
              V !== null &&
                ((c = i(V, c, O)),
                x === null ? (R = V) : (x.sibling = V),
                (x = V));
          return _e && ur(h, O), R;
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
            T.forEach(function (Mt) {
              return t(h, Mt);
            }),
          _e && ur(h, O),
          R
        );
      }
      function b(h, c, d, E) {
        if (
          (typeof d == 'object' &&
            d !== null &&
            d.type === Kr &&
            d.key === null &&
            (d = d.props.children),
          typeof d == 'object' && d !== null)
        ) {
          switch (d.$$typeof) {
            case Ns:
              e: {
                for (var R = d.key, x = c; x !== null; ) {
                  if (x.key === R) {
                    if (((R = d.type), R === Kr)) {
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
                        Qp(R) === x.type)
                    ) {
                      n(h, x.sibling),
                        (c = o(x, d.props)),
                        (c.ref = oi(h, x, d)),
                        (c.return = h),
                        (h = c);
                      break e;
                    }
                    n(h, x);
                    break;
                  } else t(h, x);
                  x = x.sibling;
                }
                d.type === Kr
                  ? ((c = mr(d.props.children, h.mode, E, d.key)),
                    (c.return = h),
                    (h = c))
                  : ((E = el(d.type, d.key, d.props, null, h.mode, E)),
                    (E.ref = oi(h, c, d)),
                    (E.return = h),
                    (h = E));
              }
              return s(h);
            case Gr:
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
                (c = Iu(d, h.mode, E)), (c.return = h), (h = c);
              }
              return s(h);
            case Ln:
              return (x = d._init), b(h, c, x(d._payload), E);
          }
          if (ui(d)) return y(h, c, d, E);
          if (ei(d)) return w(h, c, d, E);
          zs(h, d);
        }
        return (typeof d == 'string' && d !== '') || typeof d == 'number'
          ? ((d = '' + d),
            c !== null && c.tag === 6
              ? (n(h, c.sibling), (c = o(c, d)), (c.return = h), (h = c))
              : (n(h, c), (c = Lu(d, h.mode, E)), (c.return = h), (h = c)),
            s(h))
          : n(h, c);
      }
      return b;
    }
    var ho = Sm(!0),
      _m = Sm(!1),
      zi = {},
      nn = Kn(zi),
      Pi = Kn(zi),
      Oi = Kn(zi);
    function pr(e) {
      if (e === zi) throw Error(A(174));
      return e;
    }
    function Qc(e, t) {
      switch ((pe(Oi, t), pe(Pi, e), pe(nn, zi), (e = t.nodeType), e)) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : zu(null, '');
          break;
        default:
          (e = e === 8 ? t.parentNode : t),
            (t = e.namespaceURI || null),
            (e = e.tagName),
            (t = zu(t, e));
      }
      me(nn), pe(nn, t);
    }
    function mo() {
      me(nn), me(Pi), me(Oi);
    }
    function Em(e) {
      pr(Oi.current);
      var t = pr(nn.current),
        n = zu(t, e.type);
      t !== n && (pe(Pi, e), pe(nn, n));
    }
    function Yc(e) {
      Pi.current === e && (me(nn), me(Pi));
    }
    var Te = Kn(0);
    function yl(e) {
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
    var Ru = [];
    function Zc() {
      for (var e = 0; e < Ru.length; e++)
        Ru[e]._workInProgressVersionPrimary = null;
      Ru.length = 0;
    }
    var Ys = gn.ReactCurrentDispatcher,
      xu = gn.ReactCurrentBatchConfig,
      gr = 0,
      Re = null,
      De = null,
      $e = null,
      gl = !1,
      yi = !1,
      Di = 0,
      b_ = 0;
    function je() {
      throw Error(A(321));
    }
    function qc(e, t) {
      if (t === null) return !1;
      for (var n = 0; n < t.length && n < e.length; n++)
        if (!Wt(e[n], t[n])) return !1;
      return !0;
    }
    function Xc(e, t, n, r, o, i) {
      if (
        ((gr = i),
        (Re = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (Ys.current = e === null || e.memoizedState === null ? B_ : j_),
        (e = n(r, o)),
        yi)
      ) {
        i = 0;
        do {
          if (((yi = !1), (Di = 0), 25 <= i)) throw Error(A(301));
          (i += 1),
            ($e = De = null),
            (t.updateQueue = null),
            (Ys.current = H_),
            (e = n(r, o));
        } while (yi);
      }
      if (
        ((Ys.current = Sl),
        (t = De !== null && De.next !== null),
        (gr = 0),
        ($e = De = Re = null),
        (gl = !1),
        t)
      )
        throw Error(A(300));
      return e;
    }
    function Jc() {
      var e = Di !== 0;
      return (Di = 0), e;
    }
    function Jt() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return $e === null ? (Re.memoizedState = $e = e) : ($e = $e.next = e), $e;
    }
    function Lt() {
      if (De === null) {
        var e = Re.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = De.next;
      var t = $e === null ? Re.memoizedState : $e.next;
      if (t !== null) ($e = t), (De = e);
      else {
        if (e === null) throw Error(A(310));
        (De = e),
          (e = {
            memoizedState: De.memoizedState,
            baseState: De.baseState,
            baseQueue: De.baseQueue,
            queue: De.queue,
            next: null,
          }),
          $e === null ? (Re.memoizedState = $e = e) : ($e = $e.next = e);
      }
      return $e;
    }
    function Mi(e, t) {
      return typeof t == 'function' ? t(e) : t;
    }
    function Nu(e) {
      var t = Lt(),
        n = t.queue;
      if (n === null) throw Error(A(311));
      n.lastRenderedReducer = e;
      var r = De,
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
          if ((gr & f) === f)
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
              (Re.lanes |= f),
              (Sr |= f);
          }
          u = u.next;
        } while (u !== null && u !== i);
        a === null ? (s = r) : (a.next = l),
          Wt(r, t.memoizedState) || (lt = !0),
          (t.memoizedState = r),
          (t.baseState = s),
          (t.baseQueue = a),
          (n.lastRenderedState = r);
      }
      if (((e = n.interleaved), e !== null)) {
        o = e;
        do (i = o.lane), (Re.lanes |= i), (Sr |= i), (o = o.next);
        while (o !== e);
      } else o === null && (n.lanes = 0);
      return [t.memoizedState, n.dispatch];
    }
    function Au(e) {
      var t = Lt(),
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
        Wt(i, t.memoizedState) || (lt = !0),
          (t.memoizedState = i),
          t.baseQueue === null && (t.baseState = i),
          (n.lastRenderedState = i);
      }
      return [i, r];
    }
    function wm() {}
    function Tm(e, t) {
      var n = Re,
        r = Lt(),
        o = t(),
        i = !Wt(r.memoizedState, o);
      if (
        (i && ((r.memoizedState = o), (lt = !0)),
        (r = r.queue),
        ef(Nm.bind(null, n, r, e), [e]),
        r.getSnapshot !== t || i || ($e !== null && $e.memoizedState.tag & 1))
      ) {
        if (
          ((n.flags |= 2048),
          Vi(9, xm.bind(null, n, r, o, t), void 0, null),
          be === null)
        )
          throw Error(A(349));
        gr & 30 || Rm(n, t, o);
      }
      return o;
    }
    function Rm(e, t, n) {
      (e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = Re.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (Re.updateQueue = t),
            (t.stores = [e]))
          : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
    }
    function xm(e, t, n, r) {
      (t.value = n), (t.getSnapshot = r), Am(t) && Cm(e);
    }
    function Nm(e, t, n) {
      return n(function () {
        Am(t) && Cm(e);
      });
    }
    function Am(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !Wt(e, n);
      } catch {
        return !0;
      }
    }
    function Cm(e) {
      var t = vn(e, 1);
      t !== null && Ht(t, e, 1, -1);
    }
    function Yp(e) {
      var t = Jt();
      return (
        typeof e == 'function' && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Mi,
          lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = z_.bind(null, Re, e)),
        [t.memoizedState, e]
      );
    }
    function Vi(e, t, n, r) {
      return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = Re.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (Re.updateQueue = t),
            (t.lastEffect = e.next = e))
          : ((n = t.lastEffect),
            n === null
              ? (t.lastEffect = e.next = e)
              : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
        e
      );
    }
    function km() {
      return Lt().memoizedState;
    }
    function Zs(e, t, n, r) {
      var o = Jt();
      (Re.flags |= e),
        (o.memoizedState = Vi(1 | t, n, void 0, r === void 0 ? null : r));
    }
    function Pl(e, t, n, r) {
      var o = Lt();
      r = r === void 0 ? null : r;
      var i = void 0;
      if (De !== null) {
        var s = De.memoizedState;
        if (((i = s.destroy), r !== null && qc(r, s.deps))) {
          o.memoizedState = Vi(t, n, i, r);
          return;
        }
      }
      (Re.flags |= e), (o.memoizedState = Vi(1 | t, n, i, r));
    }
    function Zp(e, t) {
      return Zs(8390656, 8, e, t);
    }
    function ef(e, t) {
      return Pl(2048, 8, e, t);
    }
    function Lm(e, t) {
      return Pl(4, 2, e, t);
    }
    function Im(e, t) {
      return Pl(4, 4, e, t);
    }
    function Pm(e, t) {
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
    function Om(e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null), Pl(4, 4, Pm.bind(null, t, e), n)
      );
    }
    function tf() {}
    function Dm(e, t) {
      var n = Lt();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return r !== null && t !== null && qc(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
    }
    function Mm(e, t) {
      var n = Lt();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return r !== null && t !== null && qc(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
    }
    function Vm(e, t, n) {
      return gr & 21
        ? (Wt(n, t) ||
            ((n = Uh()), (Re.lanes |= n), (Sr |= n), (e.baseState = !0)),
          t)
        : (e.baseState && ((e.baseState = !1), (lt = !0)),
          (e.memoizedState = n));
    }
    function U_(e, t) {
      var n = ie;
      (ie = n !== 0 && 4 > n ? n : 4), e(!0);
      var r = xu.transition;
      xu.transition = {};
      try {
        e(!1), t();
      } finally {
        (ie = n), (xu.transition = r);
      }
    }
    function $m() {
      return Lt().memoizedState;
    }
    function F_(e, t, n) {
      var r = Bn(e);
      if (
        ((n = {
          lane: r,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        bm(e))
      )
        Um(t, n);
      else if (((n = mm(e, t, n, r)), n !== null)) {
        var o = et();
        Ht(n, e, r, o), Fm(n, t, r);
      }
    }
    function z_(e, t, n) {
      var r = Bn(e),
        o = {
          lane: r,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        };
      if (bm(e)) Um(t, o);
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
            if (((o.hasEagerState = !0), (o.eagerState = l), Wt(l, s))) {
              var a = t.interleaved;
              a === null
                ? ((o.next = o), Gc(t))
                : ((o.next = a.next), (a.next = o)),
                (t.interleaved = o);
              return;
            }
          } catch {
          } finally {
          }
        (n = mm(e, t, o, r)),
          n !== null && ((o = et()), Ht(n, e, r, o), Fm(n, t, r));
      }
    }
    function bm(e) {
      var t = e.alternate;
      return e === Re || (t !== null && t === Re);
    }
    function Um(e, t) {
      yi = gl = !0;
      var n = e.pending;
      n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t);
    }
    function Fm(e, t, n) {
      if (n & 4194240) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), Pc(e, n);
      }
    }
    var Sl = {
        readContext: kt,
        useCallback: je,
        useContext: je,
        useEffect: je,
        useImperativeHandle: je,
        useInsertionEffect: je,
        useLayoutEffect: je,
        useMemo: je,
        useReducer: je,
        useRef: je,
        useState: je,
        useDebugValue: je,
        useDeferredValue: je,
        useTransition: je,
        useMutableSource: je,
        useSyncExternalStore: je,
        useId: je,
        unstable_isNewReconciler: !1,
      },
      B_ = {
        readContext: kt,
        useCallback: function (e, t) {
          return (Jt().memoizedState = [e, t === void 0 ? null : t]), e;
        },
        useContext: kt,
        useEffect: Zp,
        useImperativeHandle: function (e, t, n) {
          return (
            (n = n != null ? n.concat([e]) : null),
            Zs(4194308, 4, Pm.bind(null, t, e), n)
          );
        },
        useLayoutEffect: function (e, t) {
          return Zs(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
          return Zs(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = Jt();
          return (
            (t = t === void 0 ? null : t),
            (e = e()),
            (n.memoizedState = [e, t]),
            e
          );
        },
        useReducer: function (e, t, n) {
          var r = Jt();
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
            (e = e.dispatch = F_.bind(null, Re, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          var t = Jt();
          return (
            (e = {
              current: e,
            }),
            (t.memoizedState = e)
          );
        },
        useState: Yp,
        useDebugValue: tf,
        useDeferredValue: function (e) {
          return (Jt().memoizedState = e);
        },
        useTransition: function () {
          var e = Yp(!1),
            t = e[0];
          return (e = U_.bind(null, e[1])), (Jt().memoizedState = e), [t, e];
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
          var r = Re,
            o = Jt();
          if (_e) {
            if (n === void 0) throw Error(A(407));
            n = n();
          } else {
            if (((n = t()), be === null)) throw Error(A(349));
            gr & 30 || Rm(r, t, n);
          }
          o.memoizedState = n;
          var i = { value: n, getSnapshot: t };
          return (
            (o.queue = i),
            Zp(Nm.bind(null, r, i, e), [e]),
            (r.flags |= 2048),
            Vi(9, xm.bind(null, r, i, n, t), void 0, null),
            n
          );
        },
        useId: function () {
          var e = Jt(),
            t = be.identifierPrefix;
          if (_e) {
            var n = dn,
              r = fn;
            (n = (r & ~(1 << (32 - jt(r) - 1))).toString(32) + n),
              (t = ':' + t + 'R' + n),
              (n = Di++),
              0 < n && (t += 'H' + n.toString(32)),
              (t += ':');
          } else (n = b_++), (t = ':' + t + 'r' + n.toString(32) + ':');
          return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
      },
      j_ = {
        readContext: kt,
        useCallback: Dm,
        useContext: kt,
        useEffect: ef,
        useImperativeHandle: Om,
        useInsertionEffect: Lm,
        useLayoutEffect: Im,
        useMemo: Mm,
        useReducer: Nu,
        useRef: km,
        useState: function () {
          return Nu(Mi);
        },
        useDebugValue: tf,
        useDeferredValue: function (e) {
          var t = Lt();
          return Vm(t, De.memoizedState, e);
        },
        useTransition: function () {
          var e = Nu(Mi)[0],
            t = Lt().memoizedState;
          return [e, t];
        },
        useMutableSource: wm,
        useSyncExternalStore: Tm,
        useId: $m,
        unstable_isNewReconciler: !1,
      },
      H_ = {
        readContext: kt,
        useCallback: Dm,
        useContext: kt,
        useEffect: ef,
        useImperativeHandle: Om,
        useInsertionEffect: Lm,
        useLayoutEffect: Im,
        useMemo: Mm,
        useReducer: Au,
        useRef: km,
        useState: function () {
          return Au(Mi);
        },
        useDebugValue: tf,
        useDeferredValue: function (e) {
          var t = Lt();
          return De === null
            ? (t.memoizedState = e)
            : Vm(t, De.memoizedState, e);
        },
        useTransition: function () {
          var e = Au(Mi)[0],
            t = Lt().memoizedState;
          return [e, t];
        },
        useMutableSource: wm,
        useSyncExternalStore: Tm,
        useId: $m,
        unstable_isNewReconciler: !1,
      };
    function vo(e, t) {
      try {
        var n = '',
          r = t;
        do (n += _S(r)), (r = r.return);
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
    function Cu(e, t, n) {
      return { value: e, source: null, stack: n ?? null, digest: t ?? null };
    }
    function cc(e, t) {
      try {
        console.error(t.value);
      } catch (n) {
        setTimeout(function () {
          throw n;
        });
      }
    }
    var W_ = typeof WeakMap == 'function' ? WeakMap : Map;
    function zm(e, t, n) {
      (n = pn(-1, n)), (n.tag = 3), (n.payload = { element: null });
      var r = t.value;
      return (
        (n.callback = function () {
          El || ((El = !0), (_c = r)), cc(e, t);
        }),
        n
      );
    }
    function Bm(e, t, n) {
      (n = pn(-1, n)), (n.tag = 3);
      var r = e.type.getDerivedStateFromError;
      if (typeof r == 'function') {
        var o = t.value;
        (n.payload = function () {
          return r(o);
        }),
          (n.callback = function () {
            cc(e, t);
          });
      }
      var i = e.stateNode;
      return (
        i !== null &&
          typeof i.componentDidCatch == 'function' &&
          (n.callback = function () {
            cc(e, t),
              typeof r != 'function' &&
                (zn === null ? (zn = new Set([this])) : zn.add(this));
            var s = t.stack;
            this.componentDidCatch(t.value, {
              componentStack: s !== null ? s : '',
            });
          }),
        n
      );
    }
    function qp(e, t, n) {
      var r = e.pingCache;
      if (r === null) {
        r = e.pingCache = new W_();
        var o = new Set();
        r.set(t, o);
      } else (o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o));
      o.has(n) || (o.add(n), (e = i1.bind(null, e, t, n)), t.then(e, e));
    }
    function Xp(e) {
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
    function Jp(e, t, n, r, o) {
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
                  : ((t = pn(-1, 1)), (t.tag = 2), Fn(n, t, 1))),
              (n.lanes |= 1)),
          e);
    }
    var G_ = gn.ReactCurrentOwner,
      lt = !1;
    function Je(e, t, n, r) {
      t.child = e === null ? _m(t, null, n, r) : ho(t, e.child, n, r);
    }
    function eh(e, t, n, r, o) {
      n = n.render;
      var i = t.ref;
      return (
        ao(t, o),
        (r = Xc(e, t, n, r, i, o)),
        (n = Jc()),
        e !== null && !lt
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~o),
            yn(e, t, o))
          : (_e && n && Fc(t), (t.flags |= 1), Je(e, t, r, o), t.child)
      );
    }
    function th(e, t, n, r, o) {
      if (e === null) {
        var i = n.type;
        return typeof i == 'function' &&
          !cf(i) &&
          i.defaultProps === void 0 &&
          n.compare === null &&
          n.defaultProps === void 0
          ? ((t.tag = 15), (t.type = i), jm(e, t, i, r, o))
          : ((e = el(n.type, null, r, t, t.mode, o)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e));
      }
      if (((i = e.child), !(e.lanes & o))) {
        var s = i.memoizedProps;
        if (
          ((n = n.compare),
          (n = n !== null ? n : Ci),
          n(s, r) && e.ref === t.ref)
        )
          return yn(e, t, o);
      }
      return (
        (t.flags |= 1),
        (e = jn(i, r)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
      );
    }
    function jm(e, t, n, r, o) {
      if (e !== null) {
        var i = e.memoizedProps;
        if (Ci(i, r) && e.ref === t.ref)
          if (((lt = !1), (t.pendingProps = r = i), (e.lanes & o) !== 0))
            e.flags & 131072 && (lt = !0);
          else return (t.lanes = e.lanes), yn(e, t, o);
      }
      return fc(e, t, n, r, o);
    }
    function Hm(e, t, n) {
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
            pe(ro, ht),
            (ht |= n);
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
              pe(ro, ht),
              (ht |= e),
              null
            );
          (t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            (r = i !== null ? i.baseLanes : n),
            pe(ro, ht),
            (ht |= r);
        }
      else
        i !== null
          ? ((r = i.baseLanes | n), (t.memoizedState = null))
          : (r = n),
          pe(ro, ht),
          (ht |= r);
      return Je(e, t, o, n), t.child;
    }
    function Wm(e, t) {
      var n = t.ref;
      ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
    }
    function fc(e, t, n, r, o) {
      var i = ut(n) ? vr : Ge.current;
      return (
        (i = fo(t, i)),
        ao(t, o),
        (n = Xc(e, t, n, r, i, o)),
        (r = Jc()),
        e !== null && !lt
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~o),
            yn(e, t, o))
          : (_e && r && Fc(t), (t.flags |= 1), Je(e, t, n, o), t.child)
      );
    }
    function nh(e, t, n, r, o) {
      if (ut(n)) {
        var i = !0;
        fl(t);
      } else i = !1;
      if ((ao(t, o), t.stateNode === null))
        qs(e, t), gm(t, n, r), uc(t, n, r, o), (r = !0);
      else if (e === null) {
        var s = t.stateNode,
          l = t.memoizedProps;
        s.props = l;
        var a = s.context,
          u = n.contextType;
        typeof u ==
          '\
object' && u !== null
          ? (u = kt(u))
          : ((u = ut(n) ? vr : Ge.current), (u = fo(t, u)));
        var f = n.getDerivedStateFromProps,
          p =
            typeof f == 'function' ||
            typeof s.getSnapshotBeforeUpdate == 'function';
        p ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((l !== r || a !== u) && Kp(t, s, r, u)),
          (In = !1);
        var m = t.memoizedState;
        (s.state = m),
          vl(t, r, s, o),
          (a = t.memoizedState),
          l !== r || m !== a || at.current || In
            ? (typeof f == 'function' &&
                (ac(t, n, f, r), (a = t.memoizedState)),
              (l = In || Gp(t, n, l, r, m, a, u))
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
          vm(e, t),
          (l = t.memoizedProps),
          (u = t.type === t.elementType ? l : Ft(t.type, l)),
          (s.props = u),
          (p = t.pendingProps),
          (m = s.context),
          (a = n.contextType),
          typeof a == 'object' && a !== null
            ? (a = kt(a))
            : ((a = ut(n) ? vr : Ge.current), (a = fo(t, a)));
        var S = n.getDerivedStateFromProps;
        (f =
          typeof S == 'function' ||
          typeof s.getSnapshotBeforeUpdate == 'function') ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((l !== p || m !== a) && Kp(t, s, r, a)),
          (In = !1),
          (m = t.memoizedState),
          (s.state = m),
          vl(t, r, s, o);
        var y = t.memoizedState;
        l !== p || m !== y || at.current || In
          ? (typeof S == 'function' && (ac(t, n, S, r), (y = t.memoizedState)),
            (u = In || Gp(t, n, u, r, m, y, a) || !1)
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
      return dc(e, t, n, r, i, o);
    }
    function dc(e, t, n, r, o, i) {
      Wm(e, t);
      var s = (t.flags & 128) !== 0;
      if (!r && !s) return o && zp(t, n, !1), yn(e, t, i);
      (r = t.stateNode), (G_.current = t);
      var l =
        s && typeof n.getDerivedStateFromError != 'function'
          ? null
          : r.render();
      return (
        (t.flags |= 1),
        e !== null && s
          ? ((t.child = ho(t, e.child, null, i)), (t.child = ho(t, null, l, i)))
          : Je(e, t, l, i),
        (t.memoizedState = r.state),
        o && zp(t, n, !0),
        t.child
      );
    }
    function Gm(e) {
      var t = e.stateNode;
      t.pendingContext
        ? Fp(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && Fp(e, t.context, !1),
        Qc(e, t.containerInfo);
    }
    function rh(e, t, n, r, o) {
      return po(), Bc(o), (t.flags |= 256), Je(e, t, n, r), t.child;
    }
    var pc = { dehydrated: null, treeContext: null, retryLane: 0 };
    function hc(e) {
      return { baseLanes: e, cachePool: null, transitions: null };
    }
    function Km(e, t, n) {
      var r = t.pendingProps,
        o = Te.current,
        i = !1,
        s = (t.flags & 128) !== 0,
        l;
      if (
        ((l = s) ||
          (l = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
        l
          ? ((i = !0), (t.flags &= -129))
          : (e === null || e.memoizedState !== null) && (o |= 1),
        pe(Te, o & 1),
        e === null)
      )
        return (
          sc(t),
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
                    : (i = Ml(s, r, 0, null)),
                  (e = mr(e, r, n, null)),
                  (i.return = t),
                  (e.return = t),
                  (i.sibling = e),
                  (t.child = i),
                  (t.child.memoizedState = hc(n)),
                  (t.memoizedState = pc),
                  e)
                : nf(t, s))
        );
      if (
        ((o = e.memoizedState), o !== null && ((l = o.dehydrated), l !== null))
      )
        return K_(e, t, s, r, l, o, n);
      if (i) {
        (i = r.fallback), (s = t.mode), (o = e.child), (l = o.sibling);
        var a = { mode: 'hidden', children: r.children };
        return (
          !(s & 1) && t.child !== o
            ? ((r = t.child),
              (r.childLanes = 0),
              (r.pendingProps = a),
              (t.deletions = null))
            : ((r = jn(o, a)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
          l !== null
            ? (i = jn(l, i))
            : ((i = mr(i, s, n, null)), (i.flags |= 2)),
          (i.return = t),
          (r.return = t),
          (r.sibling = i),
          (t.child = r),
          (r = i),
          (i = t.child),
          (s = e.child.memoizedState),
          (s =
            s === null
              ? hc(n)
              : {
                  baseLanes: s.baseLanes | n,
                  cachePool: null,
                  transitions: s.transitions,
                }),
          (i.memoizedState = s),
          (i.childLanes = e.childLanes & ~n),
          (t.memoizedState = pc),
          r
        );
      }
      return (
        (i = e.child),
        (e = i.sibling),
        (r = jn(i, { mode: 'visible', children: r.children })),
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
    function nf(e, t) {
      return (
        (t = Ml({ mode: 'visible', children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
      );
    }
    function Bs(e, t, n, r) {
      return (
        r !== null && Bc(r),
        ho(t, e.child, null, n),
        (e = nf(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
      );
    }
    function K_(e, t, n, r, o, i, s) {
      if (n)
        return t.flags & 256
          ? ((t.flags &= -257), (r = Cu(Error(A(422)))), Bs(e, t, s, r))
          : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((i = r.fallback),
            (o = t.mode),
            (r = Ml({ mode: 'visible', children: r.children }, o, 0, null)),
            (i = mr(i, o, s, null)),
            (i.flags |= 2),
            (r.return = t),
            (i.return = t),
            (r.sibling = i),
            (t.child = r),
            t.mode & 1 && ho(t, e.child, null, s),
            (t.child.memoizedState = hc(s)),
            (t.memoizedState = pc),
            i);
      if (!(t.mode & 1)) return Bs(e, t, s, null);
      if (o.data === '$!') {
        if (((r = o.nextSibling && o.nextSibling.dataset), r)) var l = r.dgst;
        return (
          (r = l), (i = Error(A(419))), (r = Cu(i, r, void 0)), Bs(e, t, s, r)
        );
      }
      if (((l = (s & e.childLanes) !== 0), lt || l)) {
        if (((r = be), r !== null)) {
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
              ((i.retryLane = o), vn(e, o), Ht(r, e, o, -1));
        }
        return uf(), (r = Cu(Error(A(421)))), Bs(e, t, s, r);
      }
      return o.data === '$?'
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = s1.bind(null, e)),
          (o._reactRetry = t),
          null)
        : ((e = i.treeContext),
          (mt = Un(o.nextSibling)),
          (vt = t),
          (_e = !0),
          (Bt = null),
          e !== null &&
            ((xt[Nt++] = fn),
            (xt[Nt++] = dn),
            (xt[Nt++] = yr),
            (fn = e.id),
            (dn = e.overflow),
            (yr = t)),
          (t = nf(t, r.children)),
          (t.flags |= 4096),
          t);
    }
    function oh(e, t, n) {
      e.lanes |= t;
      var r = e.alternate;
      r !== null && (r.lanes |= t), lc(e.return, t, n);
    }
    function ku(e, t, n, r, o) {
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
    function Qm(e, t, n) {
      var r = t.pendingProps,
        o = r.revealOrder,
        i = r.tail;
      if ((Je(e, t, r.children, n), (r = Te.current), r & 2))
        (r = (r & 1) | 2), (t.flags |= 128);
      else {
        if (e !== null && e.flags & 128)
          e: for (e = t.child; e !== null; ) {
            if (e.tag === 13) e.memoizedState !== null && oh(e, n, t);
            else if (e.tag === 19) oh(e, n, t);
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
      if ((pe(Te, r), !(t.mode & 1))) t.memoizedState = null;
      else
        switch (o) {
          case 'forwards':
            for (n = t.child, o = null; n !== null; )
              (e = n.alternate),
                e !== null && yl(e) === null && (o = n),
                (n = n.sibling);
            (n = o),
              n === null
                ? ((o = t.child), (t.child = null))
                : ((o = n.sibling), (n.sibling = null)),
              ku(t, !1, o, n, i);
            break;
          case 'backwards':
            for (n = null, o = t.child, t.child = null; o !== null; ) {
              if (((e = o.alternate), e !== null && yl(e) === null)) {
                t.child = o;
                break;
              }
              (e = o.sibling), (o.sibling = n), (n = o), (o = e);
            }
            ku(t, !0, n, null, i);
            break;
          case 'together':
            ku(t, !1, null, null, void 0);
            break;
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function qs(e, t) {
      !(t.mode & 1) &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
    }
    function yn(e, t, n) {
      if (
        (e !== null && (t.dependencies = e.dependencies),
        (Sr |= t.lanes),
        !(n & t.childLanes))
      )
        return null;
      if (e !== null && t.child !== e.child) throw Error(A(153));
      if (t.child !== null) {
        for (
          e = t.child, n = jn(e, e.pendingProps), t.child = n, n.return = t;
          e.sibling !== null;

        )
          (e = e.sibling),
            (n = n.sibling = jn(e, e.pendingProps)),
            (n.return = t);
        n.sibling = null;
      }
      return t.child;
    }
    function Q_(e, t, n) {
      switch (t.tag) {
        case 3:
          Gm(t), po();
          break;
        case 5:
          Em(t);
          break;
        case 1:
          ut(t.type) && fl(t);
          break;
        case 4:
          Qc(t, t.stateNode.containerInfo);
          break;
        case 10:
          var r = t.type._context,
            o = t.memoizedProps.value;
          pe(hl, r._currentValue), (r._currentValue = o);
          break;
        case 13:
          if (((r = t.memoizedState), r !== null))
            return r.dehydrated !== null
              ? (pe(Te, Te.current & 1), (t.flags |= 128), null)
              : n & t.child.childLanes
              ? Km(e, t, n)
              : (pe(Te, Te.current & 1),
                (e = yn(e, t, n)),
                e !== null ? e.sibling : null);
          pe(Te, Te.current & 1);
          break;
        case 19:
          if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
            if (r) return Qm(e, t, n);
            t.flags |= 128;
          }
          if (
            ((o = t.memoizedState),
            o !== null &&
              ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
            pe(Te, Te.current),
            r)
          )
            break;
          return null;
        case 22:
        case 23:
          return (t.lanes = 0), Hm(e, t, n);
      }
      return yn(e, t, n);
    }
    var Ym, mc, Zm, qm;
    Ym = function (e, t) {
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
    mc = function () {};
    Zm = function (e, t, n, r) {
      var o = e.memoizedProps;
      if (o !== r) {
        (e = t.stateNode), pr(nn.current);
        var i = null;
        switch (n) {
          case 'input':
            (o = $u(e, o)), (r = $u(e, r)), (i = []);
            break;
          case 'select':
            (o = xe({}, o, { value: void 0 })),
              (r = xe({}, r, { value: void 0 })),
              (i = []);
            break;
          case 'textarea':
            (o = Fu(e, o)), (r = Fu(e, r)), (i = []);
            break;
          default:
            typeof o.onClick != 'function' &&
              typeof r.onClick == 'function' &&
              (e.onclick = ul);
        }
        Bu(n, r);
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
                (Ei.hasOwnProperty(u)
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
                  (Ei.hasOwnProperty(u)
                    ? (a != null &&
                        u ===
                          'o\
nScroll' &&
                        he('scroll', e),
                      i || l === a || (i = []))
                    : (i = i || []).push(u, a));
        }
        n && (i = i || []).push('style', n);
        var u = i;
        (t.updateQueue = u) && (t.flags |= 4);
      }
    };
    qm = function (e, t, n, r) {
      n !== r && (t.flags |= 4);
    };
    function ii(e, t) {
      if (!_e)
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
    function He(e) {
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
    function Y_(e, t, n) {
      var r = t.pendingProps;
      switch ((zc(t), t.tag)) {
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
          return He(t), null;
        case 1:
          return ut(t.type) && cl(), He(t), null;
        case 3:
          return (
            (r = t.stateNode),
            mo(),
            me(at),
            me(Ge),
            Zc(),
            r.pendingContext &&
              ((r.context = r.pendingContext), (r.pendingContext = null)),
            (e === null || e.child === null) &&
              (Fs(t)
                ? (t.flags |= 4)
                : e === null ||
                  (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                  ((t.flags |= 1024), Bt !== null && (Tc(Bt), (Bt = null)))),
            mc(e, t),
            He(t),
            null
          );
        case 5:
          Yc(t);
          var o = pr(Oi.current);
          if (((n = t.type), e !== null && t.stateNode != null))
            Zm(e, t, n, r, o),
              e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
          else {
            if (!r) {
              if (t.stateNode === null) throw Error(A(166));
              return He(t), null;
            }
            if (((e = pr(nn.current)), Fs(t))) {
              (r = t.stateNode), (n = t.type);
              var i = t.memoizedProps;
              switch (((r[en] = t), (r[Ii] = i), (e = (t.mode & 1) !== 0), n)) {
                case 'dialog':
                  he('cancel', r), he('close', r);
                  break;
                case 'iframe':
                case 'object':
                case 'embed':
                  he('load', r);
                  break;
                case 'video':
                case 'audio':
                  for (o = 0; o < fi.length; o++) he(fi[o], r);
                  break;
                case 'source':
                  he('error', r);
                  break;
                case 'img':
                case 'image':
                case 'link':
                  he('error', r), he('load', r);
                  break;
                case 'details':
                  he('toggle', r);
                  break;
                case 'input':
                  dp(r, i), he('invalid', r);
                  break;
                case '\
select':
                  (r._wrapperState = { wasMultiple: !!i.multiple }),
                    he('invalid', r);
                  break;
                case 'textarea':
                  hp(r, i), he('invalid', r);
              }
              Bu(n, i), (o = null);
              for (var s in i)
                if (i.hasOwnProperty(s)) {
                  var l = i[s];
                  s === 'children'
                    ? typeof l == 'string'
                      ? r.textContent !== l &&
                        (i.suppressHydrationWarning !== !0 &&
                          Us(r.textContent, l, e),
                        (o = ['children', l]))
                      : typeof l == 'number' &&
                        r.textContent !== '' + l &&
                        (i.suppressHydrationWarning !== !0 &&
                          Us(r.textContent, l, e),
                        (o = ['children', '' + l]))
                    : Ei.hasOwnProperty(s) &&
                      l != null &&
                      s === 'onScroll' &&
                      he('scroll', r);
                }
              switch (n) {
                case '\
input':
                  As(r), pp(r, i, !0);
                  break;
                case 'textarea':
                  As(r), mp(r);
                  break;
                case 'select':
                case 'option':
                  break;
                default:
                  typeof i.onClick == 'function' && (r.onclick = ul);
              }
              (r = o), (t.updateQueue = r), r !== null && (t.flags |= 4);
            } else {
              (s = o.nodeType === 9 ? o : o.ownerDocument),
                e === 'http://www.w3.org/1999/xhtml' && (e = Rh(n)),
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
                (e[en] = t),
                (e[Ii] = r),
                Ym(e, t, !1, !1),
                (t.stateNode = e);
              e: {
                switch (((s = ju(n, r)), n)) {
                  case 'dialog':
                    he('cancel', e), he('close', e), (o = r);
                    break;
                  case 'iframe':
                  case 'object':
                  case 'embed':
                    he('load', e), (o = r);
                    break;
                  case 'video':
                  case 'audio':
                    for (o = 0; o < fi.length; o++) he(fi[o], e);
                    o = r;
                    break;
                  case 'source':
                    he('error', e), (o = r);
                    break;
                  case 'img':
                  case 'image':
                  case 'link':
                    he('error', e), he('load', e), (o = r);
                    break;
                  case 'details':
                    he('toggle', e), (o = r);
                    break;
                  case 'input':
                    dp(e, r), (o = $u(e, r)), he('invalid', e);
                    break;
                  case 'option':
                    o = r;
                    break;
                  case 'select':
                    (e._wrapperState = { wasMultiple: !!r.multiple }),
                      (o = xe({}, r, { value: void 0 })),
                      he('invalid', e);
                    break;
                  case 'textarea':
                    hp(e, r), (o = Fu(e, r)), he('invalid', e);
                    break;
                  default:
                    o = r;
                }
                Bu(n, o), (l = o);
                for (i in l)
                  if (l.hasOwnProperty(i)) {
                    var a = l[i];
                    i === 'style'
                      ? Ah(e, a)
                      : i === 'dangerouslySetInnerHTML'
                      ? ((a = a ? a.__html : void 0), a != null && xh(e, a))
                      : i === 'children'
                      ? typeof a == 'string'
                        ? (n !== 'textarea' || a !== '') && wi(e, a)
                        : typeof a == 'number' && wi(e, '' + a)
                      : i !==
                          'suppressContentEditable\
Warning' &&
                        i !== 'suppressHydrationWarning' &&
                        i !== 'autoFocus' &&
                        (Ei.hasOwnProperty(i)
                          ? a != null && i === 'onScroll' && he('scroll', e)
                          : a != null && Nc(e, i, a, s));
                  }
                switch (n) {
                  case 'input':
                    As(e), pp(e, r, !1);
                    break;
                  case 'textarea':
                    As(e), mp(e);
                    break;
                  case 'option':
                    r.value != null &&
                      e.setAttribute('value', '' + Hn(r.value));
                    break;
                  case 'select':
                    (e.multiple = !!r.multiple),
                      (i = r.value),
                      i != null
                        ? oo(e, !!r.multiple, i, !1)
                        : r.defaultValue != null &&
                          oo(e, !!r.multiple, r.defaultValue, !0);
                    break;
                  default:
                    typeof o.onClick == 'function' && (e.onclick = ul);
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
          return He(t), null;
        case 6:
          if (e && t.stateNode != null) qm(e, t, e.memoizedProps, r);
          else {
            if (typeof r != 'string' && t.stateNode === null)
              throw Error(A(166));
            if (((n = pr(Oi.current)), pr(nn.current), Fs(t))) {
              if (
                ((r = t.stateNode),
                (n = t.memoizedProps),
                (r[en] = t),
                (i = r.nodeValue !== n) && ((e = vt), e !== null))
              )
                switch (e.tag) {
                  case 3:
                    Us(r.nodeValue, n, (e.mode & 1) !== 0);
                    break;
                  case 5:
                    e.memoizedProps.suppressHydrationWarning !== !0 &&
                      Us(r.nodeValue, n, (e.mode & 1) !== 0);
                }
              i && (t.flags |= 4);
            } else
              (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
                (r[en] = t),
                (t.stateNode = r);
          }
          return He(t), null;
        case 13:
          if (
            (me(Te),
            (r = t.memoizedState),
            e === null ||
              (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
          ) {
            if (_e && mt !== null && t.mode & 1 && !(t.flags & 128))
              hm(), po(), (t.flags |= 98560), (i = !1);
            else if (((i = Fs(t)), r !== null && r.dehydrated !== null)) {
              if (e === null) {
                if (!i) throw Error(A(318));
                if (
                  ((i = t.memoizedState),
                  (i = i !== null ? i.dehydrated : null),
                  !i)
                )
                  throw Error(A(317));
                i[en] = t;
              } else
                po(),
                  !(t.flags & 128) && (t.memoizedState = null),
                  (t.flags |= 4);
              He(t), (i = !1);
            } else Bt !== null && (Tc(Bt), (Bt = null)), (i = !0);
            if (!i) return t.flags & 65536 ? t : null;
          }
          return t.flags & 128
            ? ((t.lanes = n), t)
            : ((r = r !== null),
              r !== (e !== null && e.memoizedState !== null) &&
                r &&
                ((t.child.flags |= 8192),
                t.mode & 1 &&
                  (e === null || Te.current & 1 ? Me === 0 && (Me = 3) : uf())),
              t.updateQueue !== null && (t.flags |= 4),
              He(t),
              null);
        case 4:
          return (
            mo(),
            mc(e, t),
            e === null && ki(t.stateNode.containerInfo),
            He(t),
            null
          );
        case 10:
          return Wc(t.type._context), He(t), null;
        case 17:
          return ut(t.type) && cl(), He(t), null;
        case 19:
          if ((me(Te), (i = t.memoizedState), i === null)) return He(t), null;
          if (((r = (t.flags & 128) !== 0), (s = i.rendering), s === null))
            if (r) ii(i, !1);
            else {
              if (Me !== 0 || (e !== null && e.flags & 128))
                for (e = t.child; e !== null; ) {
                  if (((s = yl(e)), s !== null)) {
                    for (
                      t.flags |= 128,
                        ii(i, !1),
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
                    return pe(Te, (Te.current & 1) | 2), t.child;
                  }
                  e = e.sibling;
                }
              i.tail !== null &&
                Ce() > yo &&
                ((t.flags |= 128), (r = !0), ii(i, !1), (t.lanes = 4194304));
            }
          else {
            if (!r)
              if (((e = yl(s)), e !== null)) {
                if (
                  ((t.flags |= 128),
                  (r = !0),
                  (n = e.updateQueue),
                  n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                  ii(i, !0),
                  i.tail === null &&
                    i.tailMode === 'hidden' &&
                    !s.alternate &&
                    !_e)
                )
                  return He(t), null;
              } else
                2 * Ce() - i.renderingStartTime > yo &&
                  n !== 1073741824 &&
                  ((t.flags |= 128), (r = !0), ii(i, !1), (t.lanes = 4194304));
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
              (i.renderingStartTime = Ce()),
              (t.sibling = null),
              (n = Te.current),
              pe(Te, r ? (n & 1) | 2 : n & 1),
              t)
            : (He(t), null);
        case 22:
        case 23:
          return (
            af(),
            (r = t.memoizedState !== null),
            e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
            r && t.mode & 1
              ? ht & 1073741824 &&
                (He(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : He(t),
            null
          );
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(A(156, t.tag));
    }
    function Z_(e, t) {
      switch ((zc(t), t.tag)) {
        case 1:
          return (
            ut(t.type) && cl(),
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 3:
          return (
            mo(),
            me(at),
            me(Ge),
            Zc(),
            (e = t.flags),
            e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 5:
          return Yc(t), null;
        case 13:
          if (
            (me(Te), (e = t.memoizedState), e !== null && e.dehydrated !== null)
          ) {
            if (t.alternate === null) throw Error(A(340));
            po();
          }
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 19:
          return me(Te), null;
        case 4:
          return mo(), null;
        case 10:
          return Wc(t.type._context), null;
        case 22:
        case 23:
          return af(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var js = !1,
      We = !1,
      q_ = typeof WeakSet == 'function' ? WeakSet : Set,
      D = null;
    function no(e, t) {
      var n = e.ref;
      if (n !== null)
        if (typeof n == 'function')
          try {
            n(null);
          } catch (r) {
            Ne(e, t, r);
          }
        else n.current = null;
    }
    function vc(e, t, n) {
      try {
        n();
      } catch (r) {
        Ne(e, t, r);
      }
    }
    var ih = !1;
    function X_(e, t) {
      if (((Ju = sl), (e = tm()), Uc(e))) {
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
        ec = { focusedElem: e, selectionRange: n }, sl = !1, D = t;
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
                        b = y.memoizedState,
                        h = t.stateNode,
                        c = h.getSnapshotBeforeUpdate(
                          t.elementType === t.type ? w : Ft(t.type, w),
                          b,
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
              Ne(t, t.return, E);
            }
            if (((e = t.sibling), e !== null)) {
              (e.return = t.return), (D = e);
              break;
            }
            D = t.return;
          }
      return (y = ih), (ih = !1), y;
    }
    function gi(e, t, n) {
      var r = t.updateQueue;
      if (((r = r !== null ? r.lastEffect : null), r !== null)) {
        var o = (r = r.next);
        do {
          if ((o.tag & e) === e) {
            var i = o.destroy;
            (o.destroy = void 0), i !== void 0 && vc(t, n, i);
          }
          o = o.next;
        } while (o !== r);
      }
    }
    function Ol(e, t) {
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
    function yc(e) {
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
    function Xm(e) {
      var t = e.alternate;
      t !== null && ((e.alternate = null), Xm(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
          ((t = e.stateNode),
          t !== null &&
            (delete t[en],
            delete t[Ii],
            delete t[rc],
            delete t[D_],
            delete t[M_])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null);
    }
    function Jm(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function sh(e) {
      e: for (;;) {
        for (; e.sibling === null; ) {
          if (e.return === null || Jm(e.return)) return null;
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
    function gc(e, t, n) {
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
              n != null || t.onclick !== null || (t.onclick = ul));
      else if (r !== 4 && ((e = e.child), e !== null))
        for (gc(e, t, n), e = e.sibling; e !== null; )
          gc(e, t, n), (e = e.sibling);
    }
    function Sc(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6)
        (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
      else if (r !== 4 && ((e = e.child), e !== null))
        for (Sc(e, t, n), e = e.sibling; e !== null; )
          Sc(e, t, n), (e = e.sibling);
    }
    var Ue = null,
      zt = !1;
    function kn(e, t, n) {
      for (n = n.child; n !== null; ) ev(e, t, n), (n = n.sibling);
    }
    function ev(e, t, n) {
      if (
        tn &&
        typeof tn.onCommitFiberUnmount ==
          'fun\
ction'
      )
        try {
          tn.onCommitFiberUnmount(xl, n);
        } catch {}
      switch (n.tag) {
        case 5:
          We || no(n, t);
        case 6:
          var r = Ue,
            o = zt;
          (Ue = null),
            kn(e, t, n),
            (Ue = r),
            (zt = o),
            Ue !== null &&
              (zt
                ? ((e = Ue),
                  (n = n.stateNode),
                  e.nodeType === 8
                    ? e.parentNode.removeChild(n)
                    : e.removeChild(n))
                : Ue.removeChild(n.stateNode));
          break;
        case 18:
          Ue !== null &&
            (zt
              ? ((e = Ue),
                (n = n.stateNode),
                e.nodeType === 8
                  ? wu(e.parentNode, n)
                  : e.nodeType === 1 && wu(e, n),
                Ni(e))
              : wu(Ue, n.stateNode));
          break;
        case 4:
          (r = Ue),
            (o = zt),
            (Ue = n.stateNode.containerInfo),
            (zt = !0),
            kn(e, t, n),
            (Ue = r),
            (zt = o);
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (
            !We &&
            ((r = n.updateQueue),
            r !== null && ((r = r.lastEffect), r !== null))
          ) {
            o = r = r.next;
            do {
              var i = o,
                s = i.destroy;
              (i = i.tag),
                s !== void 0 && (i & 2 || i & 4) && vc(n, t, s),
                (o = o.next);
            } while (o !== r);
          }
          kn(e, t, n);
          break;
        case 1:
          if (
            !We &&
            (no(n, t),
            (r = n.stateNode),
            typeof r.componentWillUnmount == 'function')
          )
            try {
              (r.props = n.memoizedProps),
                (r.state = n.memoizedState),
                r.componentWillUnmount();
            } catch (l) {
              Ne(n, t, l);
            }
          kn(e, t, n);
          break;
        case 21:
          kn(e, t, n);
          break;
        case 22:
          n.mode & 1
            ? ((We = (r = We) || n.memoizedState !== null),
              kn(e, t, n),
              (We = r))
            : kn(e, t, n);
          break;
        default:
          kn(e, t, n);
      }
    }
    function lh(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new q_()),
          t.forEach(function (r) {
            var o = l1.bind(null, e, r);
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
                  (Ue = l.stateNode), (zt = !1);
                  break e;
                case 3:
                  (Ue = l.stateNode.containerInfo), (zt = !0);
                  break e;
                case 4:
                  (Ue = l.stateNode.containerInfo), (zt = !0);
                  break e;
              }
              l = l.return;
            }
            if (Ue === null) throw Error(A(160));
            ev(i, s, o), (Ue = null), (zt = !1);
            var a = o.alternate;
            a !== null && (a.return = null), (o.return = null);
          } catch (u) {
            Ne(o, t, u);
          }
        }
      if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; ) tv(t, e), (t = t.sibling);
    }
    function tv(e, t) {
      var n = e.alternate,
        r = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if ((Ut(t, e), Xt(e), r & 4)) {
            try {
              gi(3, e, e.return), Ol(3, e);
            } catch (w) {
              Ne(e, e.return, w);
            }
            try {
              gi(5, e, e.return);
            } catch (w) {
              Ne(e, e.return, w);
            }
          }
          break;
        case 1:
          Ut(t, e), Xt(e), r & 512 && n !== null && no(n, n.return);
          break;
        case 5:
          if (
            (Ut(t, e),
            Xt(e),
            r & 512 && n !== null && no(n, n.return),
            e.flags & 32)
          ) {
            var o = e.stateNode;
            try {
              wi(o, '');
            } catch (w) {
              Ne(e, e.return, w);
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
                  wh(o, i),
                  ju(l, s);
                var u = ju(l, i);
                for (s = 0; s < a.length; s += 2) {
                  var f = a[s],
                    p = a[s + 1];
                  f === 'style'
                    ? Ah(o, p)
                    : f === 'dangerouslySetInnerHTML'
                    ? xh(o, p)
                    : f === 'children'
                    ? wi(o, p)
                    : Nc(o, f, p, u);
                }
                switch (l) {
                  case 'input':
                    bu(o, i);
                    break;
                  case 'textarea':
                    Th(o, i);
                    break;
                  case 'sel\
ect':
                    var m = o._wrapperState.wasMultiple;
                    o._wrapperState.wasMultiple = !!i.multiple;
                    var S = i.value;
                    S != null
                      ? oo(o, !!i.multiple, S, !1)
                      : m !== !!i.multiple &&
                        (i.defaultValue != null
                          ? oo(o, !!i.multiple, i.defaultValue, !0)
                          : oo(o, !!i.multiple, i.multiple ? [] : '', !1));
                }
                o[Ii] = i;
              } catch (w) {
                Ne(e, e.return, w);
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
              Ne(e, e.return, w);
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
              Ni(t.containerInfo);
            } catch (w) {
              Ne(e, e.return, w);
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
                (sf = Ce())),
            r & 4 && lh(e);
          break;
        case 22:
          if (
            ((f = n !== null && n.memoizedState !== null),
            e.mode & 1 ? ((We = (u = We) || f), Ut(t, e), (We = u)) : Ut(t, e),
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
                      gi(4, m, m.return);
                      break;
                    case 1:
                      no(m, m.return);
                      var y = m.stateNode;
                      if (typeof y.componentWillUnmount == 'function') {
                        (r = m), (n = m.return);
                        try {
                          (t = r),
                            (y.props = t.memoizedProps),
                            (y.state = t.memoizedState),
                            y.componentWillUnmount();
                        } catch (w) {
                          Ne(r, n, w);
                        }
                      }
                      break;
                    case 5:
                      no(m, m.return);
                      break;
                    case 22:
                      if (m.memoizedState !== null) {
                        uh(p);
                        continue;
                      }
                  }
                  S !== null ? ((S.return = m), (D = S)) : uh(p);
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
                          (l.style.display = Nh('display', s)));
                  } catch (w) {
                    Ne(e, e.return, w);
                  }
                }
              } else if (p.tag === 6) {
                if (f === null)
                  try {
                    p.stateNode.nodeValue = u ? '' : p.memoizedProps;
                  } catch (w) {
                    Ne(e, e.return, w);
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
          Ut(t, e), Xt(e), r & 4 && lh(e);
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
              if (Jm(n)) {
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
              r.flags & 32 && (wi(o, ''), (r.flags &= -33));
              var i = sh(e);
              Sc(e, i, o);
              break;
            case 3:
            case 4:
              var s = r.stateNode.containerInfo,
                l = sh(e);
              gc(e, l, s);
              break;
            default:
              throw Error(A(161));
          }
        } catch (a) {
          Ne(e, e.return, a);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function J_(e, t, n) {
      (D = e), nv(e, t, n);
    }
    function nv(e, t, n) {
      for (var r = (e.mode & 1) !== 0; D !== null; ) {
        var o = D,
          i = o.child;
        if (o.tag === 22 && r) {
          var s = o.memoizedState !== null || js;
          if (!s) {
            var l = o.alternate,
              a = (l !== null && l.memoizedState !== null) || We;
            l = js;
            var u = We;
            if (((js = s), (We = a) && !u))
              for (D = o; D !== null; )
                (s = D),
                  (a = s.child),
                  s.tag === 22 && s.memoizedState !== null
                    ? ch(o)
                    : a !== null
                    ? ((a.return = s), (D = a))
                    : ch(o);
            for (; i !== null; ) (D = i), nv(i, t, n), (i = i.sibling);
            (D = o), (js = l), (We = u);
          }
          ah(e, t, n);
        } else
          o.subtreeFlags & 8772 && i !== null
            ? ((i.return = o), (D = i))
            : ah(e, t, n);
      }
    }
    function ah(e) {
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
                  We || Ol(5, t);
                  break;
                case 1:
                  var r = t.stateNode;
                  if (t.flags & 4 && !We)
                    if (n === null) r.componentDidMount();
                    else {
                      var o =
                        t.elementType === t.type
                          ? n.memoizedProps
                          : Ft(t.type, n.memoizedProps);
                      r.componentDidUpdate(
                        o,
                        n.memoizedState,
                        r.__reactInternalSnapshotBeforeUpdate,
                      );
                    }
                  var i = t.updateQueue;
                  i !== null && Wp(t, i, r);
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
                    Wp(t, s, n);
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
                        p !== null && Ni(p);
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
            We || (t.flags & 512 && yc(t));
          } catch (m) {
            Ne(t, t.return, m);
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
    function uh(e) {
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
    function ch(e) {
      for (; D !== null; ) {
        var t = D;
        try {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              var n = t.return;
              try {
                Ol(4, t);
              } catch (a) {
                Ne(t, n, a);
              }
              break;
            case 1:
              var r = t.stateNode;
              if (typeof r.componentDidMount == 'function') {
                var o = t.return;
                try {
                  r.componentDidMount();
                } catch (a) {
                  Ne(t, o, a);
                }
              }
              var i = t.return;
              try {
                yc(t);
              } catch (a) {
                Ne(t, i, a);
              }
              break;
            case 5:
              var s = t.return;
              try {
                yc(t);
              } catch (a) {
                Ne(t, s, a);
              }
          }
        } catch (a) {
          Ne(t, t.return, a);
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
    var e1 = Math.ceil,
      _l = gn.ReactCurrentDispatcher,
      rf = gn.ReactCurrentOwner,
      Ct = gn.ReactCurrentBatchConfig,
      ne = 0,
      be = null,
      Le = null,
      Fe = 0,
      ht = 0,
      ro = Kn(0),
      Me = 0,
      $i = null,
      Sr = 0,
      Dl = 0,
      of = 0,
      Si = null,
      st = null,
      sf = 0,
      yo = 1 / 0,
      un = null,
      El = !1,
      _c = null,
      zn = null,
      Hs = !1,
      Mn = null,
      wl = 0,
      _i = 0,
      Ec = null,
      Xs = -1,
      Js = 0;
    function et() {
      return ne & 6 ? Ce() : Xs !== -1 ? Xs : (Xs = Ce());
    }
    function Bn(e) {
      return e.mode & 1
        ? ne & 2 && Fe !== 0
          ? Fe & -Fe
          : $_.transition !== null
          ? (Js === 0 && (Js = Uh()), Js)
          : ((e = ie),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : Gh(e.type))),
            e)
        : 1;
    }
    function Ht(e, t, n, r) {
      if (50 < _i) throw ((_i = 0), (Ec = null), Error(A(185)));
      bi(e, n, r),
        (!(ne & 2) || e !== be) &&
          (e === be && (!(ne & 2) && (Dl |= n), Me === 4 && On(e, Fe)),
          ct(e, r),
          n === 1 &&
            ne === 0 &&
            !(t.mode & 1) &&
            ((yo = Ce() + 500), Ll && Qn()));
    }
    function ct(e, t) {
      var n = e.callbackNode;
      US(e, t);
      var r = il(e, e === be ? Fe : 0);
      if (r === 0)
        n !== null && gp(n), (e.callbackNode = null), (e.callbackPriority = 0);
      else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && gp(n), t === 1))
          e.tag === 0 ? V_(fh.bind(null, e)) : fm(fh.bind(null, e)),
            P_(function () {
              !(ne & 6) && Qn();
            }),
            (n = null);
        else {
          switch (Fh(r)) {
            case 1:
              n = Ic;
              break;
            case 4:
              n = $h;
              break;
            case 16:
              n = ol;
              break;
            case 536870912:
              n = bh;
              break;
            default:
              n = ol;
          }
          n = cv(n, rv.bind(null, e));
        }
        (e.callbackPriority = t), (e.callbackNode = n);
      }
    }
    function rv(e, t) {
      if (((Xs = -1), (Js = 0), ne & 6)) throw Error(A(327));
      var n = e.callbackNode;
      if (uo() && e.callbackNode !== n) return null;
      var r = il(e, e === be ? Fe : 0);
      if (r === 0) return null;
      if (r & 30 || r & e.expiredLanes || t) t = Tl(e, r);
      else {
        t = r;
        var o = ne;
        ne |= 2;
        var i = iv();
        (be !== e || Fe !== t) && ((un = null), (yo = Ce() + 500), hr(e, t));
        do
          try {
            r1();
            break;
          } catch (l) {
            ov(e, l);
          }
        while (1);
        Hc(),
          (_l.current = i),
          (ne = o),
          Le !== null ? (t = 0) : ((be = null), (Fe = 0), (t = Me));
      }
      if (t !== 0) {
        if (
          (t === 2 && ((o = Qu(e)), o !== 0 && ((r = o), (t = wc(e, o)))),
          t === 1)
        )
          throw ((n = $i), hr(e, 0), On(e, r), ct(e, Ce()), n);
        if (t === 6) On(e, r);
        else {
          if (
            ((o = e.current.alternate),
            !(r & 30) &&
              !t1(o) &&
              ((t = Tl(e, r)),
              t === 2 && ((i = Qu(e)), i !== 0 && ((r = i), (t = wc(e, i)))),
              t === 1))
          )
            throw ((n = $i), hr(e, 0), On(e, r), ct(e, Ce()), n);
          switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
            case 0:
            case 1:
              throw Error(A(345));
            case 2:
              cr(e, st, un);
              break;
            case 3:
              if (
                (On(e, r),
                (r & 130023424) === r && ((t = sf + 500 - Ce()), 10 < t))
              ) {
                if (il(e, 0) !== 0) break;
                if (((o = e.suspendedLanes), (o & r) !== r)) {
                  et(), (e.pingedLanes |= e.suspendedLanes & o);
                  break;
                }
                e.timeoutHandle = nc(cr.bind(null, e, st, un), t);
                break;
              }
              cr(e, st, un);
              break;
            case 4:
              if ((On(e, r), (r & 4194240) === r)) break;
              for (t = e.eventTimes, o = -1; 0 < r; ) {
                var s = 31 - jt(r);
                (i = 1 << s), (s = t[s]), s > o && (o = s), (r &= ~i);
              }
              if (
                ((r = o),
                (r = Ce() - r),
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
                    : 1960 * e1(r / 1960)) - r),
                10 < r)
              ) {
                e.timeoutHandle = nc(cr.bind(null, e, st, un), r);
                break;
              }
              cr(e, st, un);
              break;
            case 5:
              cr(e, st, un);
              break;
            default:
              throw Error(A(329));
          }
        }
      }
      return ct(e, Ce()), e.callbackNode === n ? rv.bind(null, e) : null;
    }
    function wc(e, t) {
      var n = Si;
      return (
        e.current.memoizedState.isDehydrated && (hr(e, t).flags |= 256),
        (e = Tl(e, t)),
        e !== 2 && ((t = st), (st = n), t !== null && Tc(t)),
        e
      );
    }
    function Tc(e) {
      st === null ? (st = e) : st.push.apply(st, e);
    }
    function t1(e) {
      for (var t = e; ; ) {
        if (t.flags & 16384) {
          var n = t.updateQueue;
          if (n !== null && ((n = n.stores), n !== null))
            for (var r = 0; r < n.length; r++) {
              var o = n[r],
                i = o.getSnapshot;
              o = o.value;
              try {
                if (!Wt(i(), o)) return !1;
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
    function On(e, t) {
      for (
        t &= ~of,
          t &= ~Dl,
          e.suspendedLanes |= t,
          e.pingedLanes &= ~t,
          e = e.expirationTimes;
        0 < t;

      ) {
        var n = 31 - jt(t),
          r = 1 << n;
        (e[n] = -1), (t &= ~r);
      }
    }
    function fh(e) {
      if (ne & 6) throw Error(A(327));
      uo();
      var t = il(e, 0);
      if (!(t & 1)) return ct(e, Ce()), null;
      var n = Tl(e, t);
      if (e.tag !== 0 && n === 2) {
        var r = Qu(e);
        r !== 0 && ((t = r), (n = wc(e, r)));
      }
      if (n === 1) throw ((n = $i), hr(e, 0), On(e, t), ct(e, Ce()), n);
      if (n === 6) throw Error(A(345));
      return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        cr(e, st, un),
        ct(e, Ce()),
        null
      );
    }
    function lf(e, t) {
      var n = ne;
      ne |= 1;
      try {
        return e(t);
      } finally {
        (ne = n), ne === 0 && ((yo = Ce() + 500), Ll && Qn());
      }
    }
    function _r(e) {
      Mn !== null && Mn.tag === 0 && !(ne & 6) && uo();
      var t = ne;
      ne |= 1;
      var n = Ct.transition,
        r = ie;
      try {
        if (((Ct.transition = null), (ie = 1), e)) return e();
      } finally {
        (ie = r), (Ct.transition = n), (ne = t), !(ne & 6) && Qn();
      }
    }
    function af() {
      (ht = ro.current), me(ro);
    }
    function hr(e, t) {
      (e.finishedWork = null), (e.finishedLanes = 0);
      var n = e.timeoutHandle;
      if ((n !== -1 && ((e.timeoutHandle = -1), I_(n)), Le !== null))
        for (n = Le.return; n !== null; ) {
          var r = n;
          switch ((zc(r), r.tag)) {
            case 1:
              (r = r.type.childContextTypes), r != null && cl();
              break;
            case 3:
              mo(), me(at), me(Ge), Zc();
              break;
            case 5:
              Yc(r);
              break;
            case 4:
              mo();
              break;
            case 13:
              me(Te);
              break;
            case 19:
              me(Te);
              break;
            case 10:
              Wc(r.type._context);
              break;
            case 22:
            case 23:
              af();
          }
          n = n.return;
        }
      if (
        ((be = e),
        (Le = e = jn(e.current, null)),
        (Fe = ht = t),
        (Me = 0),
        ($i = null),
        (of = Dl = Sr = 0),
        (st = Si = null),
        dr !== null)
      ) {
        for (t = 0; t < dr.length; t++)
          if (((n = dr[t]), (r = n.interleaved), r !== null)) {
            n.interleaved = null;
            var o = r.next,
              i = n.pending;
            if (i !== null) {
              var s = i.next;
              (i.next = o), (r.next = s);
            }
            n.pending = r;
          }
        dr = null;
      }
      return e;
    }
    function ov(e, t) {
      do {
        var n = Le;
        try {
          if ((Hc(), (Ys.current = Sl), gl)) {
            for (var r = Re.memoizedState; r !== null; ) {
              var o = r.queue;
              o !== null && (o.pending = null), (r = r.next);
            }
            gl = !1;
          }
          if (
            ((gr = 0),
            ($e = De = Re = null),
            (yi = !1),
            (Di = 0),
            (rf.current = null),
            n === null || n.return === null)
          ) {
            (Me = 1), ($i = t), (Le = null);
            break;
          }
          e: {
            var i = e,
              s = n.return,
              l = n,
              a = t;
            if (
              ((t = Fe),
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
              var S = Xp(s);
              if (S !== null) {
                (S.flags &= -257),
                  Jp(S, s, l, i, t),
                  S.mode & 1 && qp(i, u, t),
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
                  qp(i, u, t), uf();
                  break e;
                }
                a = Error(A(426));
              }
            } else if (_e && l.mode & 1) {
              var b = Xp(s);
              if (b !== null) {
                !(b.flags & 65536) && (b.flags |= 256),
                  Jp(b, s, l, i, t),
                  Bc(vo(a, l));
                break e;
              }
            }
            (i = a = vo(a, l)),
              Me !== 4 && (Me = 2),
              Si === null ? (Si = [i]) : Si.push(i),
              (i = s);
            do {
              switch (i.tag) {
                case 3:
                  (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                  var h = zm(i, a, t);
                  Hp(i, h);
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
                        (zn === null || !zn.has(d))))
                  ) {
                    (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                    var E = Bm(i, l, t);
                    Hp(i, E);
                    break e;
                  }
              }
              i = i.return;
            } while (i !== null);
          }
          lv(n);
        } catch (R) {
          (t = R), Le === n && n !== null && (Le = n = n.return);
          continue;
        }
        break;
      } while (1);
    }
    function iv() {
      var e = _l.current;
      return (_l.current = Sl), e === null ? Sl : e;
    }
    function uf() {
      (Me === 0 || Me === 3 || Me === 2) && (Me = 4),
        be === null || (!(Sr & 268435455) && !(Dl & 268435455)) || On(be, Fe);
    }
    function Tl(e, t) {
      var n = ne;
      ne |= 2;
      var r = iv();
      (be !== e || Fe !== t) && ((un = null), hr(e, t));
      do
        try {
          n1();
          break;
        } catch (o) {
          ov(e, o);
        }
      while (1);
      if ((Hc(), (ne = n), (_l.current = r), Le !== null)) throw Error(A(261));
      return (be = null), (Fe = 0), Me;
    }
    function n1() {
      for (; Le !== null; ) sv(Le);
    }
    function r1() {
      for (; Le !== null && !LS(); ) sv(Le);
    }
    function sv(e) {
      var t = uv(e.alternate, e, ht);
      (e.memoizedProps = e.pendingProps),
        t === null ? lv(e) : (Le = t),
        (rf.current = null);
    }
    function lv(e) {
      var t = e;
      do {
        var n = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
          if (((n = Z_(n, t)), n !== null)) {
            (n.flags &= 32767), (Le = n);
            return;
          }
          if (e !== null)
            (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
          else {
            (Me = 6), (Le = null);
            return;
          }
        } else if (((n = Y_(n, t, ht)), n !== null)) {
          Le = n;
          return;
        }
        if (((t = t.sibling), t !== null)) {
          Le = t;
          return;
        }
        Le = t = e;
      } while (t !== null);
      Me === 0 && (Me = 5);
    }
    function cr(e, t, n) {
      var r = ie,
        o = Ct.transition;
      try {
        (Ct.transition = null), (ie = 1), o1(e, t, n, r);
      } finally {
        (Ct.transition = o), (ie = r);
      }
      return null;
    }
    function o1(e, t, n, r) {
      do uo();
      while (Mn !== null);
      if (ne & 6) throw Error(A(327));
      n = e.finishedWork;
      var o = e.finishedLanes;
      if (n === null) return null;
      if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
        throw Error(A(177));
      (e.callbackNode = null), (e.callbackPriority = 0);
      var i = n.lanes | n.childLanes;
      if (
        (FS(e, i),
        e === be && ((Le = be = null), (Fe = 0)),
        (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
          Hs ||
          ((Hs = !0),
          cv(ol, function () {
            return uo(), null;
          })),
        (i = (n.flags & 15990) !== 0),
        n.subtreeFlags & 15990 || i)
      ) {
        (i = Ct.transition), (Ct.transition = null);
        var s = ie;
        ie = 1;
        var l = ne;
        (ne |= 4),
          (rf.current = null),
          X_(e, n),
          tv(n, e),
          N_(ec),
          (sl = !!Ju),
          (ec = Ju = null),
          (e.current = n),
          J_(n, e, o),
          IS(),
          (ne = l),
          (ie = s),
          (Ct.transition = i);
      } else e.current = n;
      if (
        (Hs && ((Hs = !1), (Mn = e), (wl = o)),
        (i = e.pendingLanes),
        i === 0 && (zn = null),
        DS(n.stateNode, r),
        ct(e, Ce()),
        t !== null)
      )
        for (r = e.onRecoverableError, n = 0; n < t.length; n++)
          (o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest });
      if (El) throw ((El = !1), (e = _c), (_c = null), e);
      return (
        wl & 1 && e.tag !== 0 && uo(),
        (i = e.pendingLanes),
        i & 1 ? (e === Ec ? _i++ : ((_i = 0), (Ec = e))) : (_i = 0),
        Qn(),
        null
      );
    }
    function uo() {
      if (Mn !== null) {
        var e = Fh(wl),
          t = Ct.transition,
          n = ie;
        try {
          if (((Ct.transition = null), (ie = 16 > e ? 16 : e), Mn === null))
            var r = !1;
          else {
            if (((e = Mn), (Mn = null), (wl = 0), ne & 6)) throw Error(A(331));
            var o = ne;
            for (ne |= 4, D = e.current; D !== null; ) {
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
                          gi(8, f, i);
                      }
                      var p = f.child;
                      if (p !== null) (p.return = f), (D = p);
                      else
                        for (; D !== null; ) {
                          f = D;
                          var m = f.sibling,
                            S = f.return;
                          if ((Xm(f), f === u)) {
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
                        var b = w.sibling;
                        (w.sibling = null), (w = b);
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
                        gi(9, i, i.return);
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
                          Ol(9, l);
                      }
                    } catch (R) {
                      Ne(l, l.return, R);
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
              ((ne = o),
              Qn(),
              tn && typeof tn.onPostCommitFiberRoot == 'function')
            )
              try {
                tn.onPostCommitFiberRoot(xl, e);
              } catch {}
            r = !0;
          }
          return r;
        } finally {
          (ie = n), (Ct.transition = t);
        }
      }
      return !1;
    }
    function dh(e, t, n) {
      (t = vo(n, t)),
        (t = zm(e, t, 1)),
        (e = Fn(e, t, 1)),
        (t = et()),
        e !== null && (bi(e, 1, t), ct(e, t));
    }
    function Ne(e, t, n) {
      if (e.tag === 3) dh(e, e, n);
      else
        for (; t !== null; ) {
          if (t.tag === 3) {
            dh(t, e, n);
            break;
          } else if (t.tag === 1) {
            var r = t.stateNode;
            if (
              typeof t.type.getDerivedStateFromError == 'function' ||
              (typeof r.componentDidCatch == 'function' &&
                (zn === null || !zn.has(r)))
            ) {
              (e = vo(n, e)),
                (e = Bm(t, e, 1)),
                (t = Fn(t, e, 1)),
                (e = et()),
                t !== null && (bi(t, 1, e), ct(t, e));
              break;
            }
          }
          t = t.return;
        }
    }
    function i1(e, t, n) {
      var r = e.pingCache;
      r !== null && r.delete(t),
        (t = et()),
        (e.pingedLanes |= e.suspendedLanes & n),
        be === e &&
          (Fe & n) === n &&
          (Me === 4 || (Me === 3 && (Fe & 130023424) === Fe && 500 > Ce() - sf)
            ? hr(e, 0)
            : (of |= n)),
        ct(e, t);
    }
    function av(e, t) {
      t === 0 &&
        (e.mode & 1
          ? ((t = Ls), (Ls <<= 1), !(Ls & 130023424) && (Ls = 4194304))
          : (t = 1));
      var n = et();
      (e = vn(e, t)), e !== null && (bi(e, t, n), ct(e, n));
    }
    function s1(e) {
      var t = e.memoizedState,
        n = 0;
      t !== null && (n = t.retryLane), av(e, n);
    }
    function l1(e, t) {
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
      r !== null && r.delete(t), av(e, n);
    }
    var uv;
    uv = function (e, t, n) {
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps || at.current) lt = !0;
        else {
          if (!(e.lanes & n) && !(t.flags & 128)) return (lt = !1), Q_(e, t, n);
          lt = !!(e.flags & 131072);
        }
      else (lt = !1), _e && t.flags & 1048576 && dm(t, pl, t.index);
      switch (((t.lanes = 0), t.tag)) {
        case 2:
          var r = t.type;
          qs(e, t), (e = t.pendingProps);
          var o = fo(t, Ge.current);
          ao(t, n), (o = Xc(null, t, r, e, o, n));
          var i = Jc();
          return (
            (t.flags |= 1),
            typeof o == 'object' &&
            o !== null &&
            typeof o.render == 'function' &&
            o.$$typeof === void 0
              ? ((t.tag = 1),
                (t.memoizedState = null),
                (t.updateQueue = null),
                ut(r) ? ((i = !0), fl(t)) : (i = !1),
                (t.memoizedState =
                  o.state !== null && o.state !== void 0 ? o.state : null),
                Kc(t),
                (o.updater = Il),
                (t.stateNode = o),
                (o._reactInternals = t),
                uc(t, r, e, n),
                (t = dc(null, t, r, !0, i, n)))
              : ((t.tag = 0),
                _e && i && Fc(t),
                Je(null, t, o, n),
                (t = t.child)),
            t
          );
        case 16:
          r = t.elementType;
          e: {
            switch (
              (qs(e, t),
              (e = t.pendingProps),
              (o = r._init),
              (r = o(r._payload)),
              (t.type = r),
              (o = t.tag = u1(r)),
              (e = Ft(r, e)),
              o)
            ) {
              case 0:
                t = fc(null, t, r, e, n);
                break e;
              case 1:
                t = nh(null, t, r, e, n);
                break e;
              case 11:
                t = eh(null, t, r, e, n);
                break e;
              case 14:
                t = th(null, t, r, Ft(r.type, e), n);
                break e;
            }
            throw Error(A(306, r, ''));
          }
          return t;
        case 0:
          return (
            (r = t.type),
            (o = t.pendingProps),
            (o = t.elementType === r ? o : Ft(r, o)),
            fc(e, t, r, o, n)
          );
        case 1:
          return (
            (r = t.type),
            (o = t.pendingProps),
            (o = t.elementType === r ? o : Ft(r, o)),
            nh(e, t, r, o, n)
          );
        case 3:
          e: {
            if ((Gm(t), e === null)) throw Error(A(387));
            (r = t.pendingProps),
              (i = t.memoizedState),
              (o = i.element),
              vm(e, t),
              vl(t, r, null, n);
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
                (o = vo(Error(A(423)), t)), (t = rh(e, t, r, n, o));
                break e;
              } else if (r !== o) {
                (o = vo(Error(A(424)), t)), (t = rh(e, t, r, n, o));
                break e;
              } else
                for (
                  mt = Un(t.stateNode.containerInfo.firstChild),
                    vt = t,
                    _e = !0,
                    Bt = null,
                    n = _m(t, null, r, n),
                    t.child = n;
                  n;

                )
                  (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
            else {
              if ((po(), r === o)) {
                t = yn(e, t, n);
                break e;
              }
              Je(e, t, r, n);
            }
            t = t.child;
          }
          return t;
        case 5:
          return (
            Em(t),
            e === null && sc(t),
            (r = t.type),
            (o = t.pendingProps),
            (i = e !== null ? e.memoizedProps : null),
            (s = o.children),
            tc(r, o) ? (s = null) : i !== null && tc(r, i) && (t.flags |= 32),
            Wm(e, t),
            Je(e, t, s, n),
            t.child
          );
        case 6:
          return e === null && sc(t), null;
        case 13:
          return Km(e, t, n);
        case 4:
          return (
            Qc(t, t.stateNode.containerInfo),
            (r = t.pendingProps),
            e === null ? (t.child = ho(t, null, r, n)) : Je(e, t, r, n),
            t.child
          );
        case 11:
          return (
            (r = t.type),
            (o = t.pendingProps),
            (o = t.elementType === r ? o : Ft(r, o)),
            eh(e, t, r, o, n)
          );
        case 7:
          return Je(e, t, t.pendingProps, n), t.child;
        case 8:
          return Je(e, t, t.pendingProps.children, n), t.child;
        case 12:
          return Je(e, t, t.pendingProps.children, n), t.child;
        case 10:
          e: {
            if (
              ((r = t.type._context),
              (o = t.pendingProps),
              (i = t.memoizedProps),
              (s = o.value),
              pe(hl, r._currentValue),
              (r._currentValue = s),
              i !== null)
            )
              if (Wt(i.value, s)) {
                if (i.children === o.children && !at.current) {
                  t = yn(e, t, n);
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
                          (a = pn(-1, n & -n)), (a.tag = 2);
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
                          lc(i.return, n, t),
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
                      lc(s, n, t),
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
            Je(e, t, o.children, n), (t = t.child);
          }
          return t;
        case 9:
          return (
            (o = t.type),
            (r = t.pendingProps.children),
            ao(t, n),
            (o = kt(o)),
            (r = r(o)),
            (t.flags |= 1),
            Je(e, t, r, n),
            t.child
          );
        case 14:
          return (
            (r = t.type),
            (o = Ft(r, t.pendingProps)),
            (o = Ft(r.type, o)),
            th(e, t, r, o, n)
          );
        case 15:
          return jm(e, t, t.type, t.pendingProps, n);
        case 17:
          return (
            (r = t.type),
            (o = t.pendingProps),
            (o = t.elementType === r ? o : Ft(r, o)),
            qs(e, t),
            (t.tag = 1),
            ut(r) ? ((e = !0), fl(t)) : (e = !1),
            ao(t, n),
            gm(t, r, o),
            uc(t, r, o, n),
            dc(null, t, r, !0, e, n)
          );
        case 19:
          return Qm(e, t, n);
        case 22:
          return Hm(e, t, n);
      }
      throw Error(A(156, t.tag));
    };
    function cv(e, t) {
      return Vh(e, t);
    }
    function a1(e, t, n, r) {
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
      return new a1(e, t, n, r);
    }
    function cf(e) {
      return (e = e.prototype), !(!e || !e.isReactComponent);
    }
    function u1(e) {
      if (typeof e == 'function') return cf(e) ? 1 : 0;
      if (e != null) {
        if (((e = e.$$typeof), e === Cc)) return 11;
        if (e === kc) return 14;
      }
      return 2;
    }
    function jn(e, t) {
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
    function el(e, t, n, r, o, i) {
      var s = 2;
      if (((r = e), typeof e == 'function')) cf(e) && (s = 1);
      else if (typeof e == 'string') s = 5;
      else
        e: switch (e) {
          case Kr:
            return mr(n.children, o, i, t);
          case Ac:
            (s = 8), (o |= 8);
            break;
          case Ou:
            return (
              (e = At(12, n, t, o | 2)), (e.elementType = Ou), (e.lanes = i), e
            );
          case Du:
            return (
              (e = At(13, n, t, o)), (e.elementType = Du), (e.lanes = i), e
            );
          case Mu:
            return (
              (e = At(19, n, t, o)), (e.elementType = Mu), (e.lanes = i), e
            );
          case Sh:
            return Ml(n, o, i, t);
          default:
            if (typeof e == 'object' && e !== null)
              switch (e.$$typeof) {
                case yh:
                  s = 10;
                  break e;
                case gh:
                  s = 9;
                  break e;
                case Cc:
                  s = 11;
                  break e;
                case kc:
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
    function mr(e, t, n, r) {
      return (e = At(7, e, r, t)), (e.lanes = n), e;
    }
    function Ml(e, t, n, r) {
      return (
        (e = At(22, e, r, t)),
        (e.elementType = Sh),
        (e.lanes = n),
        (e.stateNode = { isHidden: !1 }),
        e
      );
    }
    function Lu(e, t, n) {
      return (e = At(6, e, null, t)), (e.lanes = n), e;
    }
    function Iu(e, t, n) {
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
    function c1(e, t, n, r, o) {
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
        (this.eventTimes = hu(0)),
        (this.expirationTimes = hu(-1)),
        (this.entangledLanes =
          this.finishedLanes =
          this.mutableReadLanes =
          this.expiredLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = hu(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = o),
        (this.mutableSourceEagerHydrationData = null);
    }
    function ff(e, t, n, r, o, i, s, l, a) {
      return (
        (e = new c1(e, t, n, l, a)),
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
        Kc(i),
        e
      );
    }
    function f1(e, t, n) {
      var r =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: Gr,
        key: r == null ? null : '' + r,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    function fv(e) {
      if (!e) return Wn;
      e = e._reactInternals;
      e: {
        if (wr(e) !== e || e.tag !== 1) throw Error(A(170));
        var t = e;
        do {
          switch (t.tag) {
            case 3:
              t = t.stateNode.context;
              break e;
            case 1:
              if (ut(t.type)) {
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
        if (ut(n)) return cm(e, n, t);
      }
      return t;
    }
    function dv(e, t, n, r, o, i, s, l, a) {
      return (
        (e = ff(n, r, !0, e, o, i, s, l, a)),
        (e.context = fv(null)),
        (n = e.current),
        (r = et()),
        (o = Bn(n)),
        (i = pn(r, o)),
        (i.callback = t ?? null),
        Fn(n, i, o),
        (e.current.lanes = o),
        bi(e, o, r),
        ct(e, r),
        e
      );
    }
    function Vl(e, t, n, r) {
      var o = t.current,
        i = et(),
        s = Bn(o);
      return (
        (n = fv(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = pn(i, s)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = Fn(o, t, s)),
        e !== null && (Ht(e, o, s, i), Qs(e, o, s)),
        s
      );
    }
    function Rl(e) {
      if (((e = e.current), !e.child)) return null;
      switch (e.child.tag) {
        case 5:
          return e.child.stateNode;
        default:
          return e.child.stateNode;
      }
    }
    function ph(e, t) {
      if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
      }
    }
    function df(e, t) {
      ph(e, t), (e = e.alternate) && ph(e, t);
    }
    function d1() {
      return null;
    }
    var pv =
      typeof reportError == 'function'
        ? reportError
        : function (e) {
            console.error(e);
          };
    function pf(e) {
      this._internalRoot = e;
    }
    $l.prototype.render = pf.prototype.render = function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(A(409));
      Vl(e, t, null, null);
    };
    $l.prototype.unmount = pf.prototype.unmount = function () {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        _r(function () {
          Vl(null, e, null, null);
        }),
          (t[mn] = null);
      }
    };
    function $l(e) {
      this._internalRoot = e;
    }
    $l.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = jh();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < Pn.length && t !== 0 && t < Pn[n].priority; n++);
        Pn.splice(n, 0, e), n === 0 && Wh(e);
      }
    };
    function hf(e) {
      return !(
        !e ||
        (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
      );
    }
    function bl(e) {
      return !(
        !e ||
        (e.nodeType !== 1 &&
          e.nodeType !== 9 &&
          e.nodeType !== 11 &&
          (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
      );
    }
    function hh() {}
    function p1(e, t, n, r, o) {
      if (o) {
        if (typeof r == 'function') {
          var i = r;
          r = function () {
            var u = Rl(s);
            i.call(u);
          };
        }
        var s = dv(t, r, e, 0, null, !1, !1, '', hh);
        return (
          (e._reactRootContainer = s),
          (e[mn] = s.current),
          ki(e.nodeType === 8 ? e.parentNode : e),
          _r(),
          s
        );
      }
      for (; (o = e.lastChild); ) e.removeChild(o);
      if (typeof r == 'function') {
        var l = r;
        r = function () {
          var u = Rl(a);
          l.call(u);
        };
      }
      var a = ff(e, 0, !1, null, null, !1, !1, '', hh);
      return (
        (e._reactRootContainer = a),
        (e[mn] = a.current),
        ki(e.nodeType === 8 ? e.parentNode : e),
        _r(function () {
          Vl(t, a, n, r);
        }),
        a
      );
    }
    function Ul(e, t, n, r, o) {
      var i = n._reactRootContainer;
      if (i) {
        var s = i;
        if (typeof o == 'function') {
          var l = o;
          o = function () {
            var a = Rl(s);
            l.call(a);
          };
        }
        Vl(t, s, e, o);
      } else s = p1(n, t, e, o, r);
      return Rl(s);
    }
    zh = function (e) {
      switch (e.tag) {
        case 3:
          var t = e.stateNode;
          if (t.current.memoizedState.isDehydrated) {
            var n = ci(t.pendingLanes);
            n !== 0 &&
              (Pc(t, n | 1),
              ct(t, Ce()),
              !(ne & 6) && ((yo = Ce() + 500), Qn()));
          }
          break;
        case 13:
          _r(function () {
            var r = vn(e, 1);
            if (r !== null) {
              var o = et();
              Ht(r, e, 1, o);
            }
          }),
            df(e, 1);
      }
    };
    Oc = function (e) {
      if (e.tag === 13) {
        var t = vn(e, 134217728);
        if (t !== null) {
          var n = et();
          Ht(t, e, 134217728, n);
        }
        df(e, 134217728);
      }
    };
    Bh = function (e) {
      if (e.tag === 13) {
        var t = Bn(e),
          n = vn(e, t);
        if (n !== null) {
          var r = et();
          Ht(n, e, t, r);
        }
        df(e, t);
      }
    };
    jh = function () {
      return ie;
    };
    Hh = function (e, t) {
      var n = ie;
      try {
        return (ie = e), t();
      } finally {
        ie = n;
      }
    };
    Wu = function (e, t, n) {
      switch (t) {
        case 'input':
          if ((bu(e, n), (t = n.name), n.type === 'radio' && t != null)) {
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
                var o = kl(r);
                if (!o) throw Error(A(90));
                Eh(r), bu(r, o);
              }
            }
          }
          break;
        case 'textarea':
          Th(e, n);
          break;
        case 'select':
          (t = n.value), t != null && oo(e, !!n.multiple, t, !1);
      }
    };
    Lh = lf;
    Ih = _r;
    var h1 = { usingClientEntryPoint: !1, Events: [Fi, qr, kl, Ch, kh, lf] },
      si = {
        findFiberByHostInstance: fr,
        bundleType: 0,
        version: '18.2.0',
        rendererPackageName: 'react-dom',
      },
      m1 = {
        bundleType: si.bundleType,
        version: si.version,
        rendererPackageName: si.rendererPackageName,
        rendererConfig: si.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: gn.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
          return (e = Dh(e)), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: si.findFiberByHostInstance || d1,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: '18.2.0-next-9e3b772b8-20220608',
      };
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u' &&
      ((li = __REACT_DEVTOOLS_GLOBAL_HOOK__),
      !li.isDisabled && li.supportsFiber)
    )
      try {
        (xl = li.inject(m1)), (tn = li);
      } catch {}
    var li;
    St.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = h1;
    St.createPortal = function (e, t) {
      var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!hf(t)) throw Error(A(200));
      return f1(e, t, null, n);
    };
    St.createRoot = function (e, t) {
      if (!hf(e)) throw Error(A(299));
      var n = !1,
        r = '',
        o = pv;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
        (t = ff(e, 1, !1, null, null, n, !1, r, o)),
        (e[mn] = t.current),
        ki(e.nodeType === 8 ? e.parentNode : e),
        new pf(t)
      );
    };
    St.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == 'function'
          ? Error(A(188))
          : ((e = Object.keys(e).join(',')), Error(A(268, e)));
      return (e = Dh(t)), (e = e === null ? null : e.stateNode), e;
    };
    St.flushSync = function (e) {
      return _r(e);
    };
    St.hydrate = function (e, t, n) {
      if (!bl(t)) throw Error(A(200));
      return Ul(null, e, t, !0, n);
    };
    St.hydrateRoot = function (e, t, n) {
      if (!hf(e)) throw Error(A(405));
      var r = (n != null && n.hydratedSources) || null,
        o = !1,
        i = '',
        s = pv;
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (o = !0),
          n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
        (t = dv(t, null, e, 1, n ?? null, o, !1, i, s)),
        (e[mn] = t.current),
        ki(e),
        r)
      )
        for (e = 0; e < r.length; e++)
          (n = r[e]),
            (o = n._getVersion),
            (o = o(n._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [n, o])
              : t.mutableSourceEagerHydrationData.push(n, o);
      return new $l(t);
    };
    St.render = function (e, t, n) {
      if (!bl(t)) throw Error(A(200));
      return Ul(null, e, t, !1, n);
    };
    St.unmountComponentAtNode = function (e) {
      if (!bl(e)) throw Error(A(40));
      return e._reactRootContainer
        ? (_r(function () {
            Ul(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[mn] = null);
            });
          }),
          !0)
        : !1;
    };
    St.unstable_batchedUpdates = lf;
    St.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
      if (!bl(n)) throw Error(A(200));
      if (e == null || e._reactInternals === void 0) throw Error(A(38));
      return Ul(e, t, n, !1, r);
    };
    St.version = '18.2.0-next-9e3b772b8-20220608';
  });
  var mf = Zt((Ek, vv) => {
    'use strict';
    function mv() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(mv);
        } catch (e) {
          console.error(e);
        }
    }
    mv(), (vv.exports = hv());
  });
  var gv = Zt((vf) => {
    'use strict';
    var yv = mf();
    (vf.createRoot = yv.createRoot), (vf.hydrateRoot = yv.hydrateRoot);
    var wk;
  });
  var E0 = Zt((WO, _0) => {
    _0.exports = function (t, n, r, o) {
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
  var vg = Zt((ja) => {
    'use strict';
    var $C = Tt(),
      bC = Symbol.for('react.element'),
      UC = Symbol.for('react.fragment'),
      FC = Object.prototype.hasOwnProperty,
      zC =
        $C.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
      BC = { key: !0, ref: !0, __self: !0, __source: !0 };
    function mg(e, t, n) {
      var r,
        o = {},
        i = null,
        s = null;
      n !== void 0 && (i = '' + n),
        t.key !== void 0 && (i = '' + t.key),
        t.ref !== void 0 && (s = t.ref);
      for (r in t) FC.call(t, r) && !BC.hasOwnProperty(r) && (o[r] = t[r]);
      if (e && e.defaultProps)
        for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
      return {
        $$typeof: bC,
        type: e,
        key: i,
        ref: s,
        props: o,
        _owner: zC.current,
      };
    }
    ja.Fragment = UC;
    ja.jsx = mg;
    ja.jsxs = mg;
  });
  var ot = Zt((DD, yg) => {
    'use strict';
    yg.exports = vg();
  });
  var Vg = fe(gv(), 1);
  var Fr = fe(Tt(), 1);
  var ye = fe(Tt()),
    zv = fe(mf());
  function v1(e) {
    let t = new Error(e);
    if (t.stack === void 0)
      try {
        throw t;
      } catch {}
    return t;
  }
  var y1 = v1,
    Q = y1;
  function g1(e) {
    return !!e && typeof e.then == 'function';
  }
  var ve = g1;
  function S1(e, t) {
    if (e != null) return e;
    throw Q(t ?? 'Got unexpected null or undefined');
  }
  var Ee = S1;
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
  var wo = class {
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
    xf = class extends wo {
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
          return ve(n) ? Rr(n) : To(n) ? n : Ji(n);
        } catch (n) {
          return ve(n) ? Rr(n.next(() => this.map(t))) : ia(n);
        }
      }
    },
    Nf = class extends wo {
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
    Gl = class extends wo {
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
        return Rr(
          this.contents
            .then((n) => {
              let r = t(n);
              if (To(r)) {
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
              if (ve(n)) return n.then(() => this.map(t).contents);
              throw n;
            }),
        );
      }
    };
  function Ji(e) {
    return Object.freeze(new xf(e));
  }
  function ia(e) {
    return Object.freeze(new Nf(e));
  }
  function Rr(e) {
    return Object.freeze(new Gl(e));
  }
  function Bv() {
    return Object.freeze(new Gl(new Promise(() => {})));
  }
  function _1(e) {
    return e.every((t) => t.state === 'hasValue')
      ? Ji(e.map((t) => t.contents))
      : e.some((t) => t.state === 'hasError')
      ? ia(
          Ee(
            e.find((t) => t.state === 'hasError'),
            'Invalid loadable passed to loadableAll',
          ).contents,
        )
      : Rr(Promise.all(e.map((t) => t.contents)));
  }
  function jv(e) {
    let n = (
        Array.isArray(e) ? e : Object.getOwnPropertyNames(e).map((o) => e[o])
      ).map((o) => (To(o) ? o : ve(o) ? Rr(o) : Ji(o))),
      r = _1(n);
    return Array.isArray(e)
      ? r
      : r.map((o) =>
          Object.getOwnPropertyNames(e).reduce(
            (i, s, l) => ({ ...i, [s]: o[l] }),
            {},
          ),
        );
  }
  function To(e) {
    return e instanceof wo;
  }
  var E1 = {
      of: (e) => (ve(e) ? Rr(e) : To(e) ? e : Ji(e)),
      error: (e) => ia(e),
      loading: () => Bv(),
      all: jv,
      isLoadable: To,
    },
    Ar = {
      loadableWithValue: Ji,
      loadableWithError: ia,
      loadableWithPromise: Rr,
      loadableLoading: Bv,
      loadableAll: jv,
      isLoadable: To,
      RecoilLoadable: E1,
    },
    w1 = Ar.loadableWithValue,
    T1 = Ar.loadableWithError,
    R1 = Ar.loadableWithPromise,
    x1 = Ar.loadableLoading,
    N1 = Ar.loadableAll,
    A1 = Ar.isLoadable,
    C1 = Ar.RecoilLoadable,
    es = Object.freeze({
      __proto__: null,
      loadableWithValue: w1,
      loadableWithError: T1,
      loadableWithPromise: R1,
      loadableLoading: x1,
      loadableAll: N1,
      isLoadable: A1,
      RecoilLoadable: C1,
    }),
    Af = {
      RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: !0,
      RECOIL_GKS_ENABLED: new Set([
        'recoil_hamt_2020',
        'recoil_sync_external_store',
        'recoil_suppress_rerender_in_callback',
        'recoil_memory_managament_2020',
      ]),
    };
  function k1(e, t) {
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
  function L1(e, t) {
    var n;
    let r = (n = process.env[e]) === null || n === void 0 ? void 0 : n.trim();
    r == null || r === '' || t(r.split(/\s*,\s*|\s+/));
  }
  function I1() {
    var e;
    typeof process > 'u' ||
      (((e = process) === null || e === void 0 ? void 0 : e.env) != null &&
        (k1('RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED', (t) => {
          Af.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = t;
        }),
        L1('RECOIL_GKS_ENABLED', (t) => {
          t.forEach((n) => {
            Af.RECOIL_GKS_ENABLED.add(n);
          });
        })));
  }
  I1();
  var Co = Af;
  function sa(e) {
    return Co.RECOIL_GKS_ENABLED.has(e);
  }
  sa.setPass = (e) => {
    Co.RECOIL_GKS_ENABLED.add(e);
  };
  sa.setFail = (e) => {
    Co.RECOIL_GKS_ENABLED.delete(e);
  };
  sa.clear = () => {
    Co.RECOIL_GKS_ENABLED.clear();
  };
  var le = sa;
  function P1(e, t, { error: n } = {}) {
    return null;
  }
  var O1 = P1,
    nt = O1,
    yf,
    gf,
    Sf,
    D1 =
      (yf = ye.default.createMutableSource) !== null && yf !== void 0
        ? yf
        : ye.default.unstable_createMutableSource,
    Hv =
      (gf = ye.default.useMutableSource) !== null && gf !== void 0
        ? gf
        : ye.default.unstable_useMutableSource,
    jf =
      (Sf = ye.default.useSyncExternalStore) !== null && Sf !== void 0
        ? Sf
        : ye.default.unstable_useSyncExternalStore,
    Sv = !1;
  function M1() {
    var e;
    let { ReactCurrentDispatcher: t, ReactCurrentOwner: n } =
        ye.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      o =
        ((e = t?.current) !== null && e !== void 0 ? e : n.currentDispatcher)
          .useSyncExternalStore != null;
    return (
      jf &&
        !o &&
        !Sv &&
        ((Sv = !0),
        nt(
          'A React renderer without React 18+ API support is being used with React 18+.',
        )),
      o
    );
  }
  function V1() {
    return le('recoil_transition_support')
      ? { mode: 'TRANSITION_SUPPORT', early: !0, concurrent: !0 }
      : le('recoil_sync_external_store') && jf != null
      ? { mode: 'SYNC_EXTERNAL_STORE', early: !0, concurrent: !1 }
      : le('recoil_mutable_source') &&
        Hv != null &&
        typeof window < 'u' &&
        !window.$disableRecoilValueMutableSource_TEMP_HACK_DO_NOT_USE
      ? le('recoil_suppress_rerender_in_callback')
        ? { mode: 'MUTABLE_SOURCE', early: !0, concurrent: !0 }
        : { mode: 'MUTABLE_SOURCE', early: !1, concurrent: !1 }
      : le('recoil_suppress_rerender_in_callback')
      ? { mode: 'LEGACY', early: !0, concurrent: !1 }
      : { mode: 'LEGACY', early: !1, concurrent: !1 };
  }
  function $1() {
    return !1;
  }
  var ko = {
      createMutableSource: D1,
      useMutableSource: Hv,
      useSyncExternalStore: jf,
      currentRendererSupportsUseSyncExternalStore: M1,
      reactMode: V1,
      isFastRefreshEnabled: $1,
    },
    qi = class {
      constructor(t) {
        K(this, 'key', void 0), (this.key = t);
      }
      toJSON() {
        return { key: this.key };
      }
    },
    Kl = class extends qi {},
    Ql = class extends qi {};
  function b1(e) {
    return e instanceof Kl || e instanceof Ql;
  }
  var la = {
      AbstractRecoilValue: qi,
      RecoilState: Kl,
      RecoilValueReadOnly: Ql,
      isRecoilValue: b1,
    },
    U1 = la.AbstractRecoilValue,
    F1 = la.RecoilState,
    z1 = la.RecoilValueReadOnly,
    B1 = la.isRecoilValue,
    xr = Object.freeze({
      __proto__: null,
      AbstractRecoilValue: U1,
      RecoilState: F1,
      RecoilValueReadOnly: z1,
      isRecoilValue: B1,
    });
  function j1(e, ...t) {}
  var H1 = j1,
    Hf = H1;
  function W1(e, t) {
    return (function* () {
      let n = 0;
      for (let r of e) yield t(r, n++);
    })();
  }
  var aa = W1,
    { isFastRefreshEnabled: Rk } = ko,
    Yl = class {},
    G1 = new Yl(),
    Nr = new Map(),
    Wf = new Map();
  function K1(e) {
    return aa(e, (t) => Ee(Wf.get(t)));
  }
  function Q1(e) {
    if (Nr.has(e)) {
      let t = `Duplicate atom key "${e}". This is a FATAL ERROR in
      production. But it is safe to ignore this warning if it occurred because of
      hot module replacement.`;
      console.warn(t);
    }
  }
  function Y1(e) {
    Co.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED && Q1(e.key),
      Nr.set(e.key, e);
    let t =
      e.set == null
        ? new xr.RecoilValueReadOnly(e.key)
        : new xr.RecoilState(e.key);
    return Wf.set(e.key, t), t;
  }
  var Zl = class extends Error {};
  function Z1(e) {
    let t = Nr.get(e);
    if (t == null) throw new Zl(`Missing definition for RecoilValue: "${e}""`);
    return t;
  }
  function q1(e) {
    return Nr.get(e);
  }
  var ql = new Map();
  function X1(e) {
    var t;
    if (!le('recoil_memory_managament_2020')) return;
    let n = Nr.get(e);
    if (
      n != null &&
      (t = n.shouldDeleteConfigOnRelease) !== null &&
      t !== void 0 &&
      t.call(n)
    ) {
      var r;
      Nr.delete(e), (r = Wv(e)) === null || r === void 0 || r(), ql.delete(e);
    }
  }
  function J1(e, t) {
    le('recoil_memory_managament_2020') &&
      (t === void 0 ? ql.delete(e) : ql.set(e, t));
  }
  function Wv(e) {
    return ql.get(e);
  }
  var dt = {
    nodes: Nr,
    recoilValues: Wf,
    registerNode: Y1,
    getNode: Z1,
    getNodeMaybe: q1,
    deleteNodeConfigIfPossible: X1,
    setConfigDeletionHandler: J1,
    getConfigDeletionHandler: Wv,
    recoilValuesForKeys: K1,
    NodeMissingError: Zl,
    DefaultValue: Yl,
    DEFAULT_VALUE: G1,
  };
  function eE(e, t) {
    t();
  }
  var tE = { enqueueExecution: eE };
  function nE(e, t) {
    return (t = { exports: {} }), e(t, t.exports), t.exports;
  }
  var rE = nE(function (e) {
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
        b = function (v, N, I) {
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
          for (var z = 0, B = 0, q = new Array(M + 1); z < N; ) q[B++] = P[z++];
          for (q[N] = I; z < M; ) q[++B] = P[z++];
          return q;
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
          return { type: c, edit: v, hash: N, key: I, value: P, _modify: Ze };
        },
        te = function (v, N, I) {
          return { type: d, edit: v, hash: N, children: I, _modify: Vt };
        },
        V = function (v, N, I) {
          return { type: E, edit: v, mask: N, children: I, _modify: Z };
        },
        ue = function (v, N, I) {
          return { type: R, edit: v, size: N, children: I, _modify: Y };
        },
        Mt = function (v) {
          return v === x || v.type === c || v.type === d;
        },
        Oe = function (v, N, I, P, M) {
          for (var j = [], z = P, B = 0, q = 0; z; ++q)
            z & 1 && (j[q] = M[B++]), (z >>>= 1);
          return (j[N] = I), ue(v, B + 1, j);
        },
        Ye = function (v, N, I, P) {
          for (
            var M = new Array(N - 1), j = 0, z = 0, B = 0, q = P.length;
            B < q;
            ++B
          )
            if (B !== I) {
              var Se = P[B];
              Se && !T(Se) && ((M[j++] = Se), (z |= 1 << B));
            }
          return V(v, z, M);
        },
        Nn = function g(v, N, I, P, M, j) {
          if (I === M) return te(v, I, [j, P]);
          var z = m(N, I),
            B = m(N, M);
          return V(
            v,
            S(z) | S(B),
            z === B ? [g(v, N + r, I, P, M, j)] : z < B ? [P, j] : [j, P],
          );
        },
        An = function (v, N, I, P, M, j, z, B) {
          for (var q = M.length, Se = 0; Se < q; ++Se) {
            var it = M[Se];
            if (I(z, it.key)) {
              var Ve = it.value,
                wt = j(Ve);
              return wt === Ve
                ? M
                : wt === a
                ? (--B.value, b(v, Se, M))
                : w(v, Se, O(N, P, z, wt), M);
            }
          }
          var $t = j();
          return $t === a ? M : (++B.value, w(v, q, O(N, P, z, $t), M));
        },
        pt = function (v, N) {
          return v === N.edit;
        },
        Ze = function (v, N, I, P, M, j, z) {
          if (N(j, this.key)) {
            var B = P(this.value);
            return B === this.value
              ? this
              : B === a
              ? (--z.value, x)
              : pt(v, this)
              ? ((this.value = B), this)
              : O(v, M, j, B);
          }
          var q = P();
          return q === a
            ? this
            : (++z.value, Nn(v, I, this.hash, this, M, O(v, M, j, q)));
        },
        Vt = function (v, N, I, P, M, j, z) {
          if (M === this.hash) {
            var B = pt(v, this),
              q = An(B, v, N, this.hash, this.children, P, j, z);
            return q === this.children
              ? this
              : q.length > 1
              ? te(v, this.hash, q)
              : q[0];
          }
          var Se = P();
          return Se === a
            ? this
            : (++z.value, Nn(v, I, this.hash, this, M, O(v, M, j, Se)));
        },
        Z = function (v, N, I, P, M, j, z) {
          var B = this.mask,
            q = this.children,
            Se = m(I, M),
            it = S(Se),
            Ve = y(B, it),
            wt = B & it,
            $t = wt ? q[Ve] : x,
            Br = $t._modify(v, N, I + r, P, M, j, z);
          if ($t === Br) return this;
          var ys = pt(v, this),
            Qo = B,
            Yo = void 0;
          if (wt && T(Br)) {
            if (((Qo &= ~it), !Qo)) return x;
            if (q.length <= 2 && Mt(q[Ve ^ 1])) return q[Ve ^ 1];
            Yo = b(ys, Ve, q);
          } else if (!wt && !T(Br)) {
            if (q.length >= s) return Oe(v, Se, Br, B, q);
            (Qo |= it), (Yo = h(ys, Ve, Br, q));
          } else Yo = w(ys, Ve, Br, q);
          return ys
            ? ((this.mask = Qo), (this.children = Yo), this)
            : V(v, Qo, Yo);
        },
        Y = function (v, N, I, P, M, j, z) {
          var B = this.size,
            q = this.children,
            Se = m(I, M),
            it = q[Se],
            Ve = (it || x)._modify(v, N, I + r, P, M, j, z);
          if (it === Ve) return this;
          var wt = pt(v, this),
            $t = void 0;
          if (T(it) && !T(Ve)) ++B, ($t = w(wt, Se, Ve, q));
          else if (!T(it) && T(Ve)) {
            if ((--B, B <= l)) return Ye(v, B, Se, q);
            $t = w(wt, Se, x, q);
          } else $t = w(wt, Se, Ve, q);
          return wt
            ? ((this.size = B), (this.children = $t), this)
            : ue(v, B, $t);
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
      var k = (n.tryGetHash = function (g, v, N, I) {
        for (var P = I._root, M = 0, j = I._config.keyEq; ; )
          switch (P.type) {
            case c:
              return j(N, P.key) ? P.value : g;
            case d: {
              if (v === P.hash)
                for (var z = P.children, B = 0, q = z.length; B < q; ++B) {
                  var Se = z[B];
                  if (j(N, Se.key)) return Se.value;
                }
              return g;
            }
            case E: {
              var it = m(M, v),
                Ve = S(it);
              if (P.mask & Ve) {
                (P = P.children[y(P.mask, Ve)]), (M += r);
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
        return k(g, v, N, this);
      };
      var L = (n.tryGet = function (g, v, N) {
        return k(g, N._config.hash(v), v, N);
      });
      _.prototype.tryGet = function (g, v) {
        return L(g, v, this);
      };
      var F = (n.getHash = function (g, v, N) {
        return k(void 0, g, v, N);
      });
      _.prototype.getHash = function (g, v) {
        return F(g, v, this);
      };
      var $ = (n.get = function (g, v) {
        return k(void 0, v._config.hash(g), g, v);
      });
      _.prototype.get = function (g, v) {
        return L(v, g, this);
      };
      var W = (n.has = function (g, v, N) {
        return k(a, g, v, N) !== a;
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
      var U = function (v, N) {
        return v === N;
      };
      (n.make = function (g) {
        return new _(
          0,
          0,
          { keyEq: (g && g.keyEq) || U, hash: (g && g.hash) || f },
          x,
          0,
        );
      }),
        (n.empty = n.make());
      var ce = (n.isEmpty = function (g) {
        return g && !!T(g._root);
      });
      _.prototype.isEmpty = function () {
        return ce(this);
      };
      var oe = (n.modifyHash = function (g, v, N, I) {
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
        return oe(N, g, v, this);
      };
      var se = (n.modify = function (g, v, N) {
        return oe(g, N._config.hash(v), v, N);
      });
      _.prototype.modify = function (g, v) {
        return se(v, g, this);
      };
      var ge = (n.setHash = function (g, v, N, I) {
        return oe(u(N), g, v, I);
      });
      _.prototype.setHash = function (g, v, N) {
        return ge(g, v, N, this);
      };
      var _t = (n.set = function (g, v, N) {
        return ge(N._config.hash(g), g, v, N);
      });
      _.prototype.set = function (g, v) {
        return _t(g, v, this);
      };
      var zr = u(a),
        qe = (n.removeHash = function (g, v, N) {
          return oe(zr, g, v, N);
        });
      _.prototype.removeHash = _.prototype.deleteHash = function (g, v) {
        return qe(g, v, this);
      };
      var Et = (n.remove = function (g, v) {
        return qe(v._config.hash(g), g, v);
      });
      _.prototype.remove = _.prototype.delete = function (g) {
        return Et(g, this);
      };
      var Od = (n.beginMutation = function (g) {
        return new _(g._editable + 1, g._edit + 1, g._config, g._root, g._size);
      });
      _.prototype.beginMutation = function () {
        return Od(this);
      };
      var Dd = (n.endMutation = function (g) {
        return (g._editable = g._editable && g._editable - 1), g;
      });
      _.prototype.endMutation = function () {
        return Dd(this);
      };
      var bg = (n.mutate = function (g, v) {
        var N = Od(v);
        return g(N), Dd(N);
      });
      _.prototype.mutate = function (g) {
        return bg(g, this);
      };
      var Ka = function (v) {
          return v && Md(v[0], v[1], v[2], v[3], v[4]);
        },
        Md = function (v, N, I, P, M) {
          for (; I < v; ) {
            var j = N[I++];
            if (j && !T(j)) return Vd(j, P, [v, N, I, P, M]);
          }
          return Ka(M);
        },
        Vd = function (v, N, I) {
          switch (v.type) {
            case c:
              return { value: N(v), rest: I };
            case d:
            case R:
            case E:
              var P = v.children;
              return Md(P.length, P, 0, N, I);
            default:
              return Ka(I);
          }
        },
        Ug = { done: !0 };
      function Qa(g) {
        this.v = g;
      }
      (Qa.prototype.next = function () {
        if (!this.v) return Ug;
        var g = this.v;
        return (this.v = Ka(g.rest)), g;
      }),
        (Qa.prototype[Symbol.iterator] = function () {
          return this;
        });
      var Ya = function (v, N) {
          return new Qa(Vd(v._root, N));
        },
        Fg = function (v) {
          return [v.key, v.value];
        },
        zg = (n.entries = function (g) {
          return Ya(g, Fg);
        });
      _.prototype.entries = _.prototype[Symbol.iterator] = function () {
        return zg(this);
      };
      var Bg = function (v) {
          return v.key;
        },
        jg = (n.keys = function (g) {
          return Ya(g, Bg);
        });
      _.prototype.keys = function () {
        return jg(this);
      };
      var Hg = function (v) {
          return v.value;
        },
        Wg =
          (n.values =
          _.prototype.values =
            function (g) {
              return Ya(g, Hg);
            });
      _.prototype.values = function () {
        return Wg(this);
      };
      var $d = (n.fold = function (g, v, N) {
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
        return $d(g, v, this);
      };
      var Gg = (n.forEach = function (g, v) {
        return $d(
          function (N, I, P) {
            return g(I, P, v);
          },
          null,
          v,
        );
      });
      _.prototype.forEach = function (g) {
        return Gg(g, this);
      };
      var Kg = (n.count = function (g) {
        return g._size;
      });
      (_.prototype.count = function () {
        return Kg(this);
      }),
        Object.defineProperty(_.prototype, 'size', { get: _.prototype.count }),
        e.exports ? (e.exports = n) : ((void 0).hamt = n);
    }),
    Cf = class {
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
        return Gf(this);
      }
      toMap() {
        return new Map(this._map);
      }
    },
    kf = class e {
      constructor(t) {
        if ((K(this, '_hamt', rE.empty.beginMutation()), t instanceof e)) {
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
        return Gf(this);
      }
      toMap() {
        return new Map(this._hamt);
      }
    };
  function Gf(e) {
    return le('recoil_hamt_2020') ? new kf(e) : new Cf(e);
  }
  var oE = { persistentMap: Gf },
    iE = oE.persistentMap,
    sE = Object.freeze({ __proto__: null, persistentMap: iE });
  function lE(e, ...t) {
    let n = new Set();
    e: for (let r of e) {
      for (let o of t) if (o.has(r)) continue e;
      n.add(r);
    }
    return n;
  }
  var Qi = lE;
  function aE(e, t) {
    let n = new Map();
    return (
      e.forEach((r, o) => {
        n.set(o, t(r, o));
      }),
      n
    );
  }
  var Xl = aE;
  function uE() {
    return { nodeDeps: new Map(), nodeToNodeSubscriptions: new Map() };
  }
  function cE(e) {
    return {
      nodeDeps: Xl(e.nodeDeps, (t) => new Set(t)),
      nodeToNodeSubscriptions: Xl(e.nodeToNodeSubscriptions, (t) => new Set(t)),
    };
  }
  function _f(e, t, n, r) {
    let { nodeDeps: o, nodeToNodeSubscriptions: i } = n,
      s = o.get(e);
    if (s && r && s !== r.nodeDeps.get(e)) return;
    o.set(e, t);
    let l = s == null ? t : Qi(t, s);
    for (let a of l) i.has(a) || i.set(a, new Set()), Ee(i.get(a)).add(e);
    if (s) {
      let a = Qi(s, t);
      for (let u of a) {
        if (!i.has(u)) return;
        let f = Ee(i.get(u));
        f.delete(e), f.size === 0 && i.delete(u);
      }
    }
  }
  function fE(e, t, n, r) {
    var o, i, s, l;
    let a = n.getState();
    r === a.currentTree.version ||
      r === ((o = a.nextTree) === null || o === void 0 ? void 0 : o.version) ||
      r ===
        ((i = a.previousTree) === null || i === void 0 ? void 0 : i.version) ||
      nt(
        'Tried to save dependencies to a discar\
ded tree',
      );
    let u = n.getGraph(r);
    if (
      (_f(e, t, u),
      r ===
        ((s = a.previousTree) === null || s === void 0 ? void 0 : s.version))
    ) {
      let p = n.getGraph(a.currentTree.version);
      _f(e, t, p, u);
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
        _f(e, t, m, u);
      }
    }
  }
  var ts = { cloneGraph: cE, graph: uE, saveDepsToStore: fE },
    dE = 0,
    pE = () => dE++,
    hE = 0,
    mE = () => hE++,
    vE = 0,
    yE = () => vE++,
    ua = {
      getNextTreeStateVersion: pE,
      getNextStoreID: mE,
      getNextComponentID: yE,
    },
    { persistentMap: _v } = sE,
    { graph: gE } = ts,
    { getNextTreeStateVersion: Gv } = ua;
  function Kv() {
    let e = Gv();
    return {
      version: e,
      stateID: e,
      transactionMetadata: {},
      dirtyAtoms: new Set(),
      atomValues: _v(),
      nonvalidatedAtoms: _v(),
    };
  }
  function SE() {
    let e = Kv();
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
      graphsByVersion: new Map().set(e.version, gE()),
      retention: {
        referenceCounts: new Map(),
        nodesRetainedByZone: new Map(),
        retainablesToCheckForRelease: new Set(),
      },
      nodeCleanupFunctions: new Map(),
    };
  }
  var Qv = {
      makeEmptyTreeState: Kv,
      makeEmptyStoreState: SE,
      getNextTreeStateVersion: Gv,
    },
    Jl = class {};
  function _E() {
    return new Jl();
  }
  var ca = { RetentionZone: Jl, retentionZone: _E };
  function EE(e, t) {
    let n = new Set(e);
    return n.add(t), n;
  }
  function wE(e, t) {
    let n = new Set(e);
    return n.delete(t), n;
  }
  function TE(e, t, n) {
    let r = new Map(e);
    return r.set(t, n), r;
  }
  function RE(e, t, n) {
    let r = new Map(e);
    return r.set(t, n(r.get(t))), r;
  }
  function xE(e, t) {
    let n = new Map(e);
    return n.delete(t), n;
  }
  function NE(e, t) {
    let n = new Map(e);
    return t.forEach((r) => n.delete(r)), n;
  }
  var Yv = {
    setByAddingToSet: EE,
    setByDeletingFromSet: wE,
    mapBySettingInMap: TE,
    mapByUpdatingInMap: RE,
    mapByDeletingFromMap: xE,
    mapByDeletingMultipleFromMap: NE,
  };
  function* AE(e, t) {
    let n = 0;
    for (let r of e) t(r, n++) && (yield r);
  }
  var Kf = AE;
  function CE(e, t) {
    return new Proxy(e, {
      get: (r, o) => (!(o in r) && o in t && (r[o] = t[o]()), r[o]),
      ownKeys: (r) => Object.keys(r),
    });
  }
  var Zv = CE,
    { getNode: ns, getNodeMaybe: kE, recoilValuesForKeys: Ev } = dt,
    { RetentionZone: wv } = ca,
    { setByAddingToSet: LE } = Yv,
    IE = Object.freeze(new Set()),
    Lf = class extends Error {};
  function PE(e, t, n) {
    if (!le('recoil_memory_managament_2020')) return () => {};
    let { nodesRetainedByZone: r } = e.getState().retention;
    function o(i) {
      let s = r.get(i);
      s || r.set(i, (s = new Set())), s.add(t);
    }
    if (n instanceof wv) o(n);
    else if (Array.isArray(n)) for (let i of n) o(i);
    return () => {
      if (
        !le(
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
      if (n instanceof wv) s(n);
      else if (Array.isArray(n)) for (let l of n) s(l);
    };
  }
  function Qf(e, t, n, r) {
    let o = e.getState();
    if (o.nodeCleanupFunctions.has(n)) return;
    let i = ns(n),
      s = PE(e, n, i.retainedBy),
      l = i.init(e, t, r);
    o.nodeCleanupFunctions.set(n, () => {
      l(), s();
    });
  }
  function OE(e, t, n) {
    Qf(e, e.getState().currentTree, t, n);
  }
  function DE(e, t) {
    var n;
    let r = e.getState();
    (n = r.nodeCleanupFunctions.get(t)) === null || n === void 0 || n(),
      r.nodeCleanupFunctions.delete(t);
  }
  function ME(e, t, n) {
    return Qf(e, t, n, 'get'), ns(n).get(e, t);
  }
  function qv(e, t, n) {
    return ns(n).peek(e, t);
  }
  function VE(e, t, n) {
    var r;
    let o = kE(t);
    return (
      o == null || (r = o.invalidate) === null || r === void 0 || r.call(o, e),
      {
        ...e,
        atomValues: e.atomValues.clone().delete(t),
        nonvalidatedAtoms: e.nonvalidatedAtoms.clone().set(t, n),
        dirtyAtoms: LE(e.dirtyAtoms, t),
      }
    );
  }
  function $E(e, t, n, r) {
    let o = ns(n);
    if (o.set == null)
      throw new Lf(`A\
ttempt to set read-only RecoilValue: ${n}`);
    let i = o.set;
    return Qf(e, t, n, 'set'), i(e, t, r);
  }
  function bE(e, t, n) {
    let r = e.getState(),
      o = e.getGraph(t.version),
      i = ns(n).nodeType;
    return Zv(
      { type: i },
      {
        loadable: () => qv(e, t, n),
        isActive: () => r.knownAtoms.has(n) || r.knownSelectors.has(n),
        isSet: () => (i === 'selector' ? !1 : t.atomValues.has(n)),
        isModified: () => t.dirtyAtoms.has(n),
        deps: () => {
          var s;
          return Ev((s = o.nodeDeps.get(n)) !== null && s !== void 0 ? s : []);
        },
        subscribers: () => {
          var s, l;
          return {
            nodes: Ev(Kf(Xv(e, t, new Set([n])), (a) => a !== n)),
            components: aa(
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
  function Xv(e, t, n) {
    let r = new Set(),
      o = Array.from(n),
      i = e.getGraph(t.version);
    for (let l = o.pop(); l; l = o.pop()) {
      var s;
      r.add(l);
      let a =
        (s = i.nodeToNodeSubscriptions.get(l)) !== null && s !== void 0
          ? s
          : IE;
      for (let u of a) r.has(u) || o.push(u);
    }
    return r;
  }
  var Zn = {
      getNodeLoadable: ME,
      peekNodeLoadable: qv,
      setNodeValue: $E,
      initializeNode: OE,
      cleanUpNode: DE,
      setUnvalidatedAtomValue_DEPRECATED: VE,
      peekNodeInfo: bE,
      getDownstreamNodes: Xv,
    },
    Jv = null;
  function UE(e) {
    Jv = e;
  }
  function FE() {
    var e;
    (e = Jv) === null || e === void 0 || e();
  }
  var ey = {
      setInvalidateMemoizedSnapshot: UE,
      invalidateMemoizedSnapshot: FE,
    },
    { getDownstreamNodes: zE, getNodeLoadable: ty, setNodeValue: BE } = Zn,
    { getNextComponentID: jE } = ua,
    { getNode: HE, getNodeMaybe: ny } = dt,
    { DefaultValue: Yf } = dt,
    { reactMode: WE } = ko,
    {
      AbstractRecoilValue: GE,
      RecoilState: KE,
      RecoilValueReadOnly: QE,
      isRecoilValue: YE,
    } = xr,
    { invalidateMemoizedSnapshot: ZE } = ey;
  function qE(e, { key: t }, n = e.getState().currentTree) {
    var r, o;
    let i = e.getState();
    n.version === i.currentTree.version ||
      n.version ===
        ((r = i.nextTree) === null || r === void 0 ? void 0 : r.version) ||
      n.version ===
        ((o = i.previousTree) === null || o === void 0 ? void 0 : o.version) ||
      nt('Tried to read from a discarded tree');
    let s = ty(e, n, t);
    return s.state === 'loading' && s.contents.catch(() => {}), s;
  }
  function XE(e, t) {
    let n = e.clone();
    return (
      t.forEach((r, o) => {
        r.state === 'hasValue' && r.contents instanceof Yf
          ? n.delete(o)
          : n.set(o, r);
      }),
      n
    );
  }
  function JE(e, t, { key: n }, r) {
    if (
      typeof r ==
      'fun\
ction'
    ) {
      let o = ty(e, t, n);
      if (o.state === 'loading') {
        let i = `Tried to set atom or selector "${n}" using an updater function while the current state is pending, this is not currently supported.`;
        throw (nt(i), Q(i));
      } else if (o.state === 'hasError') throw o.contents;
      return r(o.contents);
    } else return r;
  }
  function ew(e, t, n) {
    if (n.type === 'set') {
      let { recoilValue: o, valueOrUpdater: i } = n,
        s = JE(e, t, o, i),
        l = BE(e, t, o.key, s);
      for (let [a, u] of l.entries()) If(t, a, u);
    } else if (n.type === 'setLoadable') {
      let {
        recoilValue: { key: o },
        loadable: i,
      } = n;
      If(t, o, i);
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
        s = ny(o);
      s == null || (r = s.invalidate) === null || r === void 0 || r.call(s, t),
        t.atomValues.delete(o),
        t.nonvalidatedAtoms.set(o, i),
        t.dirtyAtoms.add(o);
    } else nt(`Unknown action ${n.type}`);
  }
  function If(e, t, n) {
    n.state === 'hasValue' && n.contents instanceof Yf
      ? e.atomValues.delete(t)
      : e.atomValues.set(t, n),
      e.dirtyAtoms.add(t),
      e.nonvalidatedAtoms.delete(t);
  }
  function ry(e, t) {
    e.replaceState((n) => {
      let r = oy(n);
      for (let o of t) ew(e, r, o);
      return iy(e, r), ZE(), r;
    });
  }
  function fa(e, t) {
    if (Yi.length) {
      let n = Yi[Yi.length - 1],
        r = n.get(e);
      r || n.set(e, (r = [])), r.push(t);
    } else ry(e, [t]);
  }
  var Yi = [];
  function tw() {
    let e = new Map();
    return (
      Yi.push(e),
      () => {
        for (let [n, r] of e) ry(n, r);
        Yi.pop() !== e && nt('Incorrect order of batch popping');
      }
    );
  }
  function oy(e) {
    return {
      ...e,
      atomValues: e.atomValues.clone(),
      nonvalidatedAtoms: e.nonvalidatedAtoms.clone(),
      dirtyAtoms: new Set(e.dirtyAtoms),
    };
  }
  function iy(e, t) {
    let n = zE(e, t, t.dirtyAtoms);
    for (let i of n) {
      var r, o;
      (r = ny(i)) === null ||
        r === void 0 ||
        (o = r.invalidate) === null ||
        o === void 0 ||
        o.call(r, t);
    }
  }
  function sy(e, t, n) {
    fa(e, { type: 'set', recoilValue: t, valueOrUpdater: n });
  }
  function nw(e, t, n) {
    if (n instanceof Yf) return sy(e, t, n);
    fa(e, { type: 'setLoadable', recoilValue: t, loadable: n });
  }
  function rw(e, t) {
    fa(e, { type: 'markModified', recoilValue: t });
  }
  function ow(e, t, n) {
    fa(e, { type: 'setUnvalidated', recoilValue: t, unvalidatedValue: n });
  }
  function iw(e, { key: t }, n, r = null) {
    let o = jE(),
      i = e.getState();
    i.nodeToComponentSubscriptions.has(t) ||
      i.nodeToComponentSubscriptions.set(t, new Map()),
      Ee(i.nodeToComponentSubscriptions.get(t)).set(o, [
        r ?? '<not captured>',
        n,
      ]);
    let s = WE();
    if (s.early && (s.mode === 'LEGACY' || s.mode === 'MUTABLE_SOURCE')) {
      let l = e.getState().nextTree;
      l && l.dirtyAtoms.has(t) && n(l);
    }
    return {
      release: () => {
        let l = e.getState(),
          a = l.nodeToComponentSubscriptions.get(t);
        if (a === void 0 || !a.has(o)) {
          nt(
            `Subscription missing at release time for atom ${t}. This is a bug in Recoil.`,
          );
          return;
        }
        a.delete(o), a.size === 0 && l.nodeToComponentSubscriptions.delete(t);
      },
    };
  }
  function sw(e, t) {
    var n;
    let { currentTree: r } = e.getState(),
      o = HE(t.key);
    (n = o.clearCache) === null || n === void 0 || n.call(o, e, r);
  }
  var rn = {
    RecoilValueReadOnly: QE,
    AbstractRecoilValue: GE,
    RecoilState: KE,
    getRecoilValueAsLoadable: qE,
    setRecoilValue: sy,
    setRecoilValueLoadable: nw,
    markRecoilValueModified: rw,
    setUnvalidatedRecoilValue: ow,
    subscribeToRecoilValue: iw,
    isRecoilValue: YE,
    applyAtomValueWrites: XE,
    batchStart: tw,
    writeLoadableToTreeState: If,
    invalidateDownstreams: iy,
    copyTreeState: oy,
    refreshRecoilValue: sw,
  };
  function lw(e, t, n) {
    let r = e.entries(),
      o = r.next();
    for (; !o.done; ) {
      let i = o.value;
      if (t.call(n, i[1], i[0], e)) return !0;
      o = r.next();
    }
    return !1;
  }
  var aw = lw,
    { cleanUpNode: uw } = Zn,
    { deleteNodeConfigIfPossible: cw, getNode: ly } = dt,
    { RetentionZone: ay } = ca,
    fw = 12e4,
    uy = new Set();
  function cy(e, t) {
    let n = e.getState(),
      r = n.currentTree;
    if (n.nextTree) {
      nt(
        'releaseNodesNowOnCurrentTree should only be called at the end of a batch',
      );
      return;
    }
    let o = new Set();
    for (let s of t)
      if (s instanceof ay) for (let l of mw(n, s)) o.add(l);
      else o.add(s);
    let i = dw(e, o);
    for (let s of i) hw(e, r, s);
  }
  function dw(e, t) {
    let n = e.getState(),
      r = n.currentTree,
      o = e.getGraph(r.version),
      i = new Set(),
      s = new Set();
    return l(t), i;
    function l(a) {
      let u = new Set(),
        f = pw(e, r, a, i, s);
      for (let y of f) {
        var p;
        if (ly(y).retainedBy === 'recoilRoot') {
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
        if (fy(y).some((b) => n.retention.referenceCounts.get(b))) {
          s.add(y);
          continue;
        }
        let w = o.nodeToNodeSubscriptions.get(y);
        if (w && aw(w, (b) => s.has(b))) {
          s.add(y);
          continue;
        }
        i.add(y), u.add(y);
      }
      let m = new Set();
      for (let y of u)
        for (let w of (S = o.nodeDeps.get(y)) !== null && S !== void 0
          ? S
          : uy) {
          var S;
          i.has(w) || m.add(w);
        }
      m.size && l(m);
    }
  }
  function pw(e, t, n, r, o) {
    let i = e.getGraph(t.version),
      s = [],
      l = new Set();
    for (; n.size > 0; ) a(Ee(n.values().next().value));
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
  function hw(e, t, n) {
    if (
      !le(
        'recoil_memory_mana\
gament_2020',
      )
    )
      return;
    uw(e, n);
    let r = e.getState();
    r.knownAtoms.delete(n),
      r.knownSelectors.delete(n),
      r.nodeTransactionSubscriptions.delete(n),
      r.retention.referenceCounts.delete(n);
    let o = fy(n);
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
    cw(n);
  }
  function mw(e, t) {
    var n;
    return (n = e.retention.nodesRetainedByZone.get(t)) !== null && n !== void 0
      ? n
      : uy;
  }
  function fy(e) {
    let t = ly(e).retainedBy;
    return t === void 0 || t === 'components' || t === 'recoilRoot'
      ? []
      : t instanceof ay
      ? [t]
      : t;
  }
  function vw(e, t) {
    let n = e.getState();
    n.nextTree
      ? n.retention.retainablesToCheckForRelease.add(t)
      : cy(e, new Set([t]));
  }
  function yw(e, t, n) {
    var r;
    if (!le('recoil_memory_managament_2020')) return;
    let o = e.getState().retention.referenceCounts,
      i = ((r = o.get(t)) !== null && r !== void 0 ? r : 0) + n;
    i === 0 ? dy(e, t) : o.set(t, i);
  }
  function dy(e, t) {
    if (!le('recoil_memory_managament_2020')) return;
    e.getState().retention.referenceCounts.delete(t), vw(e, t);
  }
  function gw(e) {
    if (!le('recoil_memory_managament_2020')) return;
    let t = e.getState();
    cy(e, t.retention.retainablesToCheckForRelease),
      t.retention.retainablesToCheckForRelease.clear();
  }
  function Sw(e) {
    return e === void 0 ? 'recoilRoot' : e;
  }
  var Cr = {
      SUSPENSE_TIMEOUT_MS: fw,
      updateRetainCount: yw,
      updateRetainCountToZero: dy,
      releaseScheduledRetainablesNow: gw,
      retainedByOptionWithDefault: Sw,
    },
    { unstable_batchedUpdates: _w } = zv.default,
    Ew = { unstable_batchedUpdates: _w },
    { unstable_batchedUpdates: ww } = Ew,
    Tw = { unstable_batchedUpdates: ww },
    { batchStart: Rw } = rn,
    { unstable_batchedUpdates: xw } = Tw,
    Zf = xw || ((e) => e()),
    Nw = (e) => {
      Zf = e;
    },
    Aw = () => Zf,
    Cw = (e) => {
      Zf(() => {
        let t = () => {};
        try {
          (t = Rw()), e();
        } finally {
          t();
        }
      });
    },
    da = { getBatcher: Aw, setBatcher: Nw, batchUpdates: Cw };
  function* kw(e) {
    for (let t of e) for (let n of t) yield n;
  }
  var py = kw,
    hy =
      typeof Window > 'u' ||
      typeof window >
        '\
u',
    Lw = (e) => !hy && (e === window || e instanceof Window),
    Iw = typeof navigator < 'u' && navigator.product === 'ReactNative',
    rs = { isSSR: hy, isReactNative: Iw, isWindow: Lw };
  function Pw(e, t) {
    let n;
    return (...r) => {
      n || (n = {});
      let o = t(...r);
      return Object.hasOwnProperty.call(n, o) || (n[o] = e(...r)), n[o];
    };
  }
  function Ow(e, t) {
    let n, r;
    return (...o) => {
      let i = t(...o);
      return n === i || ((n = i), (r = e(...o))), r;
    };
  }
  function Dw(e, t) {
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
  var Mw = {
      memoizeWithArgsHash: Pw,
      memoizeOneWithArgsHash: Ow,
      memoizeOneWithArgsHashAndInvalidation: Dw,
    },
    { batchUpdates: Pf } = da,
    { initializeNode: Vw, peekNodeInfo: $w } = Zn,
    { graph: bw } = ts,
    { getNextStoreID: Uw } = ua,
    { DEFAULT_VALUE: Fw, recoilValues: Tv, recoilValuesForKeys: Rv } = dt,
    {
      AbstractRecoilValue: zw,
      getRecoilValueAsLoadable: Bw,
      setRecoilValue: xv,
      setUnvalidatedRecoilValue: jw,
    } = rn,
    { updateRetainCount: Wl } = Cr,
    { setInvalidateMemoizedSnapshot: Hw } = ey,
    { getNextTreeStateVersion: Ww, makeEmptyStoreState: Gw } = Qv,
    { isSSR: Kw } = rs,
    { memoizeOneWithArgsHashAndInvalidation: Qw } = Mw;
  var Ro = class {
    constructor(t, n) {
      K(this, '_store', void 0),
        K(this, '_refCount', 1),
        K(
          this,
          'getLoadable',
          (r) => (this.checkRefCount_INTERNAL(), Bw(this._store, r)),
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
            return Rv(s.dirtyAtoms);
          }
          let o = this._store.getState().knownAtoms,
            i = this._store.getState().knownSelectors;
          return r?.isInitialized == null
            ? Tv.values()
            : r.isInitialized === !0
            ? Rv(py([o, i]))
            : Kf(Tv.values(), ({ key: s }) => !o.has(s) && !i.has(s));
        }),
        K(
          this,
          'getInfo_UNSTABLE',
          ({ key: r }) => (
            this.checkRefCount_INTERNAL(),
            $w(this._store, this._store.getState().currentTree, r)
          ),
        ),
        K(this, 'map', (r) => {
          this.checkRefCount_INTERNAL();
          let o = new Xi(this, Pf);
          return r(o), o;
        }),
        K(this, 'asyncMap', async (r) => {
          this.checkRefCount_INTERNAL();
          let o = new Xi(this, Pf);
          return o.retain(), await r(o), o.autoRelease_INTERNAL(), o;
        }),
        (this._store = {
          storeID: Uw(),
          parentStoreID: n,
          getState: () => t,
          replaceState: (r) => {
            t.currentTree = r(t.currentTree);
          },
          getGraph: (r) => {
            let o = t.graphsByVersion;
            if (o.has(r)) return Ee(o.get(r));
            let i = bw();
            return o.set(r, i), i;
          },
          subscribeToTransactions: () => ({ release: () => {} }),
          addTransactionMetadata: () => {
            throw Q('Cannot subscribe to Snapshots');
          },
        });
      for (let r of this._store.getState().knownAtoms)
        Vw(this._store, r, 'get'), Wl(this._store, r, 1);
      this.autoRelease_INTERNAL();
    }
    retain() {
      this._refCount <= 0 &&
        nt('Attempt to retain() Snapshot that was already released.'),
        this._refCount++;
      let t = !1;
      return () => {
        t || ((t = !0), this._release());
      };
    }
    autoRelease_INTERNAL() {
      Kw || window.setTimeout(() => this._release(), 10);
    }
    _release() {
      if ((this._refCount--, this._refCount === 0)) {
        if (
          (this._store.getState().nodeCleanupFunctions.forEach((t) => t()),
          this._store.getState().nodeCleanupFunctions.clear(),
          !le('recoil_memory_managament_2020'))
        )
          return;
      } else this._refCount < 0;
    }
    isRetained() {
      return this._refCount > 0;
    }
    checkRefCount_INTERNAL() {
      le('recoil_memory_managament_2020') && this._refCount <= 0;
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
  function my(e, t, n = !1) {
    let r = e.getState(),
      o = n ? Ww() : t.version;
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
        aa(r.nodeCleanupFunctions.entries(), ([i]) => [i, () => {}]),
      ),
    };
  }
  function Yw(e) {
    let t = new Ro(Gw());
    return e != null ? t.map(e) : t;
  }
  var [Nv, vy] = Qw(
    (e, t) => {
      var n;
      let r = e.getState(),
        o =
          t === 'latest'
            ? (n = r.nextTree) !== null && n !== void 0
              ? n
              : r.currentTree
            : Ee(r.previousTree);
      return new Ro(my(e, o), e.storeID);
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
  Hw(vy);
  function Zw(e, t = 'latest') {
    let n = Nv(e, t);
    return n.isRetained() ? n : (vy(), Nv(e, t));
  }
  var Xi = class extends Ro {
      constructor(t, n) {
        super(
          my(
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
              Wl(i, r.key, 1), xv(this.getStore_INTERNAL(), r, o);
            });
          }),
          K(this, 'reset', (r) => {
            this.checkRefCount_INTERNAL();
            let o = this.getStore_INTERNAL();
            this._batch(() => {
              Wl(o, r.key, 1), xv(this.getStore_INTERNAL(), r, Fw);
            });
          }),
          K(
            this,
            'se\
tUnvalidatedAtomValues_DEPRECATED',
            (r) => {
              this.checkRefCount_INTERNAL();
              let o = this.getStore_INTERNAL();
              Pf(() => {
                for (let [i, s] of r.entries())
                  Wl(o, i, 1), jw(o, new zw(i), s);
              });
            },
          ),
          (this._batch = n);
      }
    },
    pa = {
      Snapshot: Ro,
      MutableSnapshot: Xi,
      freshSnapshot: Yw,
      cloneSnapshot: Zw,
    },
    qw = pa.Snapshot,
    Xw = pa.MutableSnapshot,
    Jw = pa.freshSnapshot,
    eT = pa.cloneSnapshot,
    ha = Object.freeze({
      __proto__: null,
      Snapshot: qw,
      MutableSnapshot: Xw,
      freshSnapshot: Jw,
      cloneSnapshot: eT,
    });
  function tT(...e) {
    let t = new Set();
    for (let n of e) for (let r of n) t.add(r);
    return t;
  }
  var nT = tT,
    { useRef: rT } = ye.default;
  function oT(e) {
    let t = rT(e);
    return t.current === e && typeof e == 'function' && (t.current = e()), t;
  }
  var Av = oT,
    { getNextTreeStateVersion: iT, makeEmptyStoreState: yy } = Qv,
    {
      cleanUpNode: sT,
      getDownstreamNodes: lT,
      initializeNode: aT,
      setNodeValue: uT,
      setUnvalidatedAtomValue_DEPRECATED: cT,
    } = Zn,
    { graph: fT } = ts,
    { cloneGraph: dT } = ts,
    { getNextStoreID: gy } = ua,
    { createMutableSource: Ef, reactMode: Sy } = ko,
    { applyAtomValueWrites: pT } = rn,
    { releaseScheduledRetainablesNow: _y } = Cr,
    { freshSnapshot: hT } = ha,
    {
      useCallback: mT,
      useContext: Ey,
      useEffect: Of,
      useMemo: vT,
      useRef: yT,
      useState: gT,
    } = ye.default;
  function Bi() {
    throw Q('This component must be used inside a <RecoilRoot> component.');
  }
  var wy = Object.freeze({
      storeID: gy(),
      getState: Bi,
      replaceState: Bi,
      getGraph: Bi,
      subscribeToTransactions: Bi,
      addTransactionMetadata: Bi,
    }),
    Df = !1;
  function Cv(e) {
    if (Df)
      throw Q(
        'An atom update was triggered within the execution of a state updater function. State updater functions provided to Recoil must be pure functions.',
      );
    let t = e.getState();
    if (t.nextTree === null) {
      le('recoil_memory_managament_2020') &&
        le('recoil_release_on_cascading_update_killswitch_2021') &&
        t.commitDepth > 0 &&
        _y(e);
      let n = t.currentTree.version,
        r = iT();
      (t.nextTree = {
        ...t.currentTree,
        version: r,
        stateID: r,
        dirtyAtoms: new Set(),
        transactionMetadata: {},
      }),
        t.graphsByVersion.set(r, dT(Ee(t.graphsByVersion.get(n))));
    }
  }
  var Ty = ye.default.createContext({ current: wy }),
    ma = () => Ey(Ty),
    Ry = ye.default.createContext(null);
  function ST() {
    let e = Ey(Ry);
    return (
      e == null &&
        Hf(
          'Attempted to use a Recoil hook outside of a <Reco\
ilRoot>. <RecoilRoot> must be an ancestor of any component that uses Recoil hooks.',
        ),
      e
    );
  }
  function qf(e, t, n) {
    let r = lT(e, n, n.dirtyAtoms);
    for (let o of r) {
      let i = t.nodeToComponentSubscriptions.get(o);
      if (i) for (let [s, [l, a]] of i) a(n);
    }
  }
  function xy(e) {
    let t = e.getState(),
      n = t.currentTree,
      r = n.dirtyAtoms;
    if (r.size) {
      for (let [o, i] of t.nodeTransactionSubscriptions)
        if (r.has(o)) for (let [s, l] of i) l(e);
      for (let [o, i] of t.transactionSubscriptions) i(e);
      (!Sy().early || t.suspendedComponentResolvers.size > 0) &&
        (qf(e, t, n),
        t.suspendedComponentResolvers.forEach((o) => o()),
        t.suspendedComponentResolvers.clear());
    }
    t.queuedComponentCallbacks_DEPRECATED.forEach((o) => o(n)),
      t.queuedComponentCallbacks_DEPRECATED.splice(
        0,
        t.queuedComponentCallbacks_DEPRECATED.length,
      );
  }
  function _T(e) {
    let t = e.getState();
    t.commitDepth++;
    try {
      let { nextTree: n } = t;
      if (n == null) return;
      (t.previousTree = t.currentTree),
        (t.currentTree = n),
        (t.nextTree = null),
        xy(e),
        t.previousTree != null
          ? t.graphsByVersion.delete(t.previousTree.version)
          : nt(
              'Ended batch with no previous state, which is unexpected',
              'recoil',
            ),
        (t.previousTree = null),
        le('recoil_memory_managament_2020') && n == null && _y(e);
    } finally {
      t.commitDepth--;
    }
  }
  function ET({ setNotifyBatcherOfChange: e }) {
    let t = ma(),
      [, n] = gT([]);
    return (
      e(() => n({})),
      Of(
        () => (
          e(() => n({})),
          () => {
            e(() => {});
          }
        ),
        [e],
      ),
      Of(() => {
        tE.enqueueExecution('Batcher', () => {
          _T(t.current);
        });
      }),
      null
    );
  }
  function wT(e, t) {
    let n = yy();
    return (
      t({
        set: (r, o) => {
          let i = n.currentTree,
            s = uT(e, i, r.key, o),
            l = new Set(s.keys()),
            a = i.nonvalidatedAtoms.clone();
          for (let u of l) a.delete(u);
          n.currentTree = {
            ...i,
            dirtyAtoms: nT(i.dirtyAtoms, l),
            atomValues: pT(i.atomValues, s),
            nonvalidatedAtoms: a,
          };
        },
        setUnvalidatedAtomValues: (r) => {
          r.forEach((o, i) => {
            n.currentTree = cT(n.currentTree, i, o);
          });
        },
      }),
      n
    );
  }
  function TT(e) {
    let t = hT(e),
      n = t.getStore_INTERNAL().getState();
    return (
      t.retain(),
      n.nodeCleanupFunctions.forEach((r) => r()),
      n.nodeCleanupFunctions.clear(),
      n
    );
  }
  var kv = 0;
  function RT({
    initializeState_DEPRECATED: e,
    initializeState: t,
    store_INTERNAL: n,
    children: r,
  }) {
    let o,
      i = (S) => {
        let y = o.current.graphsByVersion;
        if (y.has(S)) return Ee(y.get(S));
        let w = fT();
        return y.set(S, w), w;
      },
      s = (S, y) => {
        if (y == null) {
          let { transactionSubscriptions: w } = p.current.getState(),
            b = kv++;
          return (
            w.set(b, S),
            {
              release: () => {
                w.delete(b);
              },
            }
          );
        } else {
          let { nodeTransactionSubscriptions: w } = p.current.getState();
          w.has(y) || w.set(y, new Map());
          let b = kv++;
          return (
            Ee(w.get(y)).set(b, S),
            {
              release: () => {
                let h = w.get(y);
                h && (h.delete(b), h.size === 0 && w.delete(y));
              },
            }
          );
        }
      },
      l = (S) => {
        Cv(p.current);
        for (let y of Object.keys(S))
          Ee(p.current.getState().nextTree).transactionMetadata[y] = S[y];
      },
      a = (S) => {
        Cv(p.current);
        let y = Ee(o.current.nextTree),
          w;
        try {
          (Df = !0), (w = S(y));
        } finally {
          Df = !1;
        }
        w !== y &&
          ((o.current.nextTree = w),
          Sy().early && qf(p.current, o.current, w),
          Ee(u.current)());
      },
      u = yT(null),
      f = mT(
        (S) => {
          u.current = S;
        },
        [u],
      ),
      p = Av(
        () =>
          n ?? {
            storeID: gy(),
            getState: () => o.current,
            replaceState: a,
            getGraph: i,
            subscribeToTransactions: s,
            addTransactionMetadata: l,
          },
      );
    n != null && (p.current = n),
      (o = Av(() => (e != null ? wT(p.current, e) : t != null ? TT(t) : yy())));
    let m = vT(() => Ef?.(o, () => o.current.currentTree.version), [o]);
    return (
      Of(() => {
        let S = p.current;
        for (let y of new Set(S.getState().knownAtoms))
          aT(
            S,
            y,
            'g\
et',
          );
        return () => {
          for (let y of S.getState().knownAtoms) sT(S, y);
        };
      }, [p]),
      ye.default.createElement(
        Ty.Provider,
        { value: p },
        ye.default.createElement(
          Ry.Provider,
          { value: m },
          ye.default.createElement(ET, { setNotifyBatcherOfChange: f }),
          r,
        ),
      )
    );
  }
  function xT(e) {
    let { override: t, ...n } = e,
      r = ma();
    return t === !1 && r.current !== wy
      ? e.children
      : ye.default.createElement(RT, n);
  }
  function NT() {
    return ma().current.storeID;
  }
  var Sn = {
    RecoilRoot: xT,
    useStoreRef: ma,
    useRecoilMutableSource: ST,
    useRecoilStoreID: NT,
    notifyComponents_FOR_TESTING: qf,
    sendEndOfBatchNotifications_FOR_TESTING: xy,
  };
  function AT(e, t) {
    if (e === t) return !0;
    if (e.length !== t.length) return !1;
    for (let n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return !1;
    return !0;
  }
  var CT = AT,
    { useEffect: kT, useRef: LT } = ye.default;
  function IT(e) {
    let t = LT();
    return (
      kT(() => {
        t.current = e;
      }),
      t.current
    );
  }
  var Ny = IT,
    { useStoreRef: PT } = Sn,
    { SUSPENSE_TIMEOUT_MS: OT } = Cr,
    { updateRetainCount: ji } = Cr,
    { RetentionZone: DT } = ca,
    { useEffect: MT, useRef: VT } = ye.default,
    { isSSR: Lv } = rs;
  function $T(e) {
    if (le('recoil_memory_managament_2020')) return bT(e);
  }
  function bT(e) {
    let n = (Array.isArray(e) ? e : [e]).map((s) =>
        s instanceof DT ? s : s.key,
      ),
      r = PT();
    MT(() => {
      if (!le('recoil_memory_managament_2020')) return;
      let s = r.current;
      if (o.current && !Lv) window.clearTimeout(o.current), (o.current = null);
      else for (let l of n) ji(s, l, 1);
      return () => {
        for (let l of n) ji(s, l, -1);
      };
    }, [r, ...n]);
    let o = VT(),
      i = Ny(n);
    if (!Lv && (i === void 0 || !CT(i, n))) {
      let s = r.current;
      for (let l of n) ji(s, l, 1);
      if (i) for (let l of i) ji(s, l, -1);
      o.current && window.clearTimeout(o.current),
        (o.current = window.setTimeout(() => {
          o.current = null;
          for (let l of n) ji(s, l, -1);
        }, OT));
    }
  }
  var Xf = $T;
  function UT() {
    return '<component name not available>';
  }
  var os = UT,
    { batchUpdates: FT } = da,
    { DEFAULT_VALUE: Ay } = dt,
    {
      currentRendererSupportsUseSyncExternalStore: zT,
      reactMode: Lo,
      useMutableSource: BT,
      useSyncExternalStore: jT,
    } = ko,
    { useRecoilMutableSource: HT, useStoreRef: on } = Sn,
    { isRecoilValue: xk } = xr,
    {
      AbstractRecoilValue: Mf,
      getRecoilValueAsLoadable: is,
      setRecoilValue: ea,
      setUnvalidatedRecoilValue: WT,
      subscribeToRecoilValue: xo,
    } = rn,
    {
      useCallback: ft,
      useEffect: No,
      useMemo: Cy,
      useRef: Zi,
      useState: Jf,
    } = ye.default,
    { setByAddingToSet: GT } = Yv,
    { isSSR: KT } = rs;
  function ed(e, t, n) {
    if (e.state === 'hasValue') return e.contents;
    throw e.state === 'loading'
      ? new Promise((o) => {
          let i = n.current.getState().suspendedComponentResolvers;
          i.add(o),
            KT &&
              ve(e.contents) &&
              e.contents.finally(() => {
                i.delete(o);
              });
        })
      : e.state === 'hasError'
      ? e.contents
      : Q(`Invalid value of loadable atom "${t.key}"`);
  }
  function QT() {
    let e = os(),
      t = on(),
      [, n] = Jf([]),
      r = Zi(new Set());
    r.current = new Set();
    let o = Zi(new Set()),
      i = Zi(new Map()),
      s = ft(
        (a) => {
          let u = i.current.get(a);
          u && (u.release(), i.current.delete(a));
        },
        [i],
      ),
      l = ft((a, u) => {
        i.current.has(u) && n([]);
      }, []);
    return (
      No(() => {
        let a = t.current;
        Qi(r.current, o.current).forEach((u) => {
          if (i.current.has(u)) {
            Hf(`Double subscription to RecoilValue "${u}"`);
            return;
          }
          let f = xo(a, new Mf(u), (m) => l(m, u), e);
          i.current.set(u, f),
            a.getState().nextTree
              ? a.getState().queuedComponentCallbacks_DEPRECATED.push(() => {
                  l(a.getState(), u);
                })
              : l(a.getState(), u);
        }),
          Qi(o.current, r.current).forEach((u) => {
            s(u);
          }),
          (o.current = r.current);
      }),
      No(() => {
        let a = i.current;
        return (
          Qi(r.current, new Set(a.keys())).forEach((u) => {
            let f = xo(t.current, new Mf(u), (p) => l(p, u), e);
            a.set(u, f);
          }),
          () => a.forEach((u, f) => s(f))
        );
      }, [e, t, s, l]),
      Cy(() => {
        function a(y) {
          return (w) => {
            ea(t.current, y, w);
          };
        }
        function u(y) {
          return () => ea(t.current, y, Ay);
        }
        function f(y) {
          var w;
          r.current.has(y.key) || (r.current = GT(r.current, y.key));
          let b = t.current.getState();
          return is(
            t.current,
            y,
            Lo().early && (w = b.nextTree) !== null && w !== void 0
              ? w
              : b.currentTree,
          );
        }
        function p(y) {
          let w = f(y);
          return ed(w, y, t);
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
  var YT = { current: 0 };
  function ZT(e) {
    let t = on(),
      n = os(),
      r = ft(() => {
        var l;
        let a = t.current,
          u = a.getState(),
          f =
            Lo().early && (l = u.nextTree) !== null && l !== void 0
              ? l
              : u.currentTree;
        return { loadable: is(a, e, f), key: e.key };
      }, [t, e]),
      o = ft((l) => {
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
      i = Cy(() => o(r), [r, o]),
      s = ft(
        (l) => {
          let a = t.current;
          return xo(a, e, l, n).release;
        },
        [t, e, n],
      );
    return jT(s, i, i).loadable;
  }
  function qT(e) {
    let t = on(),
      n = ft(() => {
        var u;
        let f = t.current,
          p = f.getState(),
          m =
            Lo().early && (u = p.nextTree) !== null && u !== void 0
              ? u
              : p.currentTree;
        return is(f, e, m);
      }, [t, e]),
      r = ft(() => n(), [n]),
      o = os(),
      i = ft(
        (u, f) => {
          let p = t.current;
          return xo(
            p,
            e,
            () => {
              if (!le('recoil_suppress_rerender_in_callback')) return f();
              let S = n();
              a.current.is(S) || f(), (a.current = S);
            },
            o,
          ).release;
        },
        [t, e, o, n],
      ),
      s = HT();
    if (s == null)
      throw Q(
        'Recoil hooks must be used in components contained within a <RecoilRoot> component.',
      );
    let l = BT(s, r, i),
      a = Zi(l);
    return (
      No(() => {
        a.current = l;
      }),
      l
    );
  }
  function Vf(e) {
    let t = on(),
      n = os(),
      r = ft(() => {
        var a;
        let u = t.current,
          f = u.getState(),
          p =
            Lo().early && (a = f.nextTree) !== null && a !== void 0
              ? a
              : f.currentTree;
        return is(u, e, p);
      }, [t, e]),
      o = ft(() => ({ loadable: r(), key: e.key }), [r, e.key]),
      i = ft(
        (a) => {
          let u = o();
          return a.loadable.is(u.loadable) && a.key === u.key ? a : u;
        },
        [o],
      );
    No(() => {
      let a = xo(
        t.current,
        e,
        (u) => {
          l(i);
        },
        n,
      );
      return l(i), a.release;
    }, [n, e, t, i]);
    let [s, l] = Jf(o);
    return s.key !== e.key ? o().loadable : s.loadable;
  }
  function XT(e) {
    let t = on(),
      [, n] = Jf([]),
      r = os(),
      o = ft(() => {
        var l;
        let a = t.current,
          u = a.getState(),
          f =
            Lo().early && (l = u.nextTree) !== null && l !== void 0
              ? l
              : u.currentTree;
        return is(a, e, f);
      }, [t, e]),
      i = o(),
      s = Zi(i);
    return (
      No(() => {
        s.current = i;
      }),
      No(() => {
        let l = t.current,
          a = l.getState(),
          u = xo(
            l,
            e,
            (p) => {
              var m;
              if (!le('recoil_suppress_rerender_in_callback')) return n([]);
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
          if (!le('recoil_suppress_rerender_in_callback')) return n([]);
          let p = o();
          ((f = s.current) !== null && f !== void 0 && f.is(p)) || n(p),
            (s.current = p);
        }
        return u.release;
      }, [r, o, e, t]),
      i
    );
  }
  function td(e) {
    return (
      le('recoil_memory_managament_2020') && Xf(e),
      {
        TRANSITION_SUPPORT: Vf,
        SYNC_EXTERNAL_STORE: zT() ? ZT : Vf,
        MUTABLE_SOURCE: qT,
        LEGACY: XT,
      }[Lo().mode](e)
    );
  }
  function ky(e) {
    let t = on(),
      n = td(e);
    return ed(n, e, t);
  }
  function va(e) {
    let t = on();
    return ft(
      (n) => {
        ea(t.current, e, n);
      },
      [t, e],
    );
  }
  function JT(e) {
    let t = on();
    return ft(() => {
      ea(t.current, e, Ay);
    }, [t, e]);
  }
  function eR(e) {
    return [ky(e), va(e)];
  }
  function tR(e) {
    return [td(e), va(e)];
  }
  function nR() {
    let e = on();
    return (t, n = {}) => {
      FT(() => {
        e.current.addTransactionMetadata(n),
          t.forEach((r, o) => WT(e.current, new Mf(o), r));
      });
    };
  }
  function Ly(e) {
    return (
      le(
        'recoil_memor\
y_managament_2020',
      ) && Xf(e),
      Vf(e)
    );
  }
  function Iy(e) {
    let t = on(),
      n = Ly(e);
    return ed(n, e, t);
  }
  function rR(e) {
    return [Iy(e), va(e)];
  }
  var oR = {
    recoilComponentGetRecoilValueCount_FOR_TESTING: YT,
    useRecoilInterface: QT,
    useRecoilState: eR,
    useRecoilStateLoadable: tR,
    useRecoilValue: ky,
    useRecoilValueLoadable: td,
    useResetRecoilState: JT,
    useSetRecoilState: va,
    useSetUnvalidatedAtomValues: nR,
    useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE: Ly,
    useRecoilValue_TRANSITION_SUPPORT_UNSTABLE: Iy,
    useRecoilState_TRANSITION_SUPPORT_UNSTABLE: rR,
  };
  function iR(e, t) {
    let n = new Map();
    for (let [r, o] of e) t(o, r) && n.set(r, o);
    return n;
  }
  var sR = iR;
  function lR(e, t) {
    let n = new Set();
    for (let r of e) t(r) && n.add(r);
    return n;
  }
  var aR = lR;
  function uR(...e) {
    let t = new Map();
    for (let n = 0; n < e.length; n++) {
      let r = e[n].keys(),
        o;
      for (; !(o = r.next()).done; ) t.set(o.value, e[n].get(o.value));
    }
    return t;
  }
  var cR = uR,
    { batchUpdates: fR } = da,
    { DEFAULT_VALUE: dR, getNode: Py, nodes: pR } = dt,
    { useStoreRef: nd } = Sn,
    { AbstractRecoilValue: hR, setRecoilValueLoadable: mR } = rn,
    { SUSPENSE_TIMEOUT_MS: vR } = Cr,
    { cloneSnapshot: ta } = ha,
    { useCallback: ya, useEffect: Oy, useRef: Iv, useState: yR } = ye.default,
    { isSSR: Pv } = rs;
  function ga(e) {
    let t = nd();
    Oy(() => t.current.subscribeToTransactions(e).release, [e, t]);
  }
  function Ov(e) {
    let t = e.atomValues.toMap(),
      n = Xl(
        sR(t, (r, o) => {
          let s = Py(o).persistence_UNSTABLE;
          return s != null && s.type !== 'none' && r.state === 'hasValue';
        }),
        (r) => r.contents,
      );
    return cR(e.nonvalidatedAtoms.toMap(), n);
  }
  function gR(e) {
    ga(
      ya(
        (t) => {
          let n = t.getState().previousTree,
            r = t.getState().currentTree;
          n ||
            (nt(
              'Transaction subscribers notified without \
a previous tree being present -- this is a bug in Recoil',
            ),
            (n = t.getState().currentTree));
          let o = Ov(r),
            i = Ov(n),
            s = Xl(pR, (a) => {
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
            l = aR(r.dirtyAtoms, (a) => o.has(a) || i.has(a));
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
  function SR(e) {
    ga(
      ya(
        (t) => {
          let n = ta(t, 'latest'),
            r = ta(t, 'previous');
          e({ snapshot: n, previousSnapshot: r });
        },
        [e],
      ),
    );
  }
  function _R() {
    let e = nd(),
      [t, n] = yR(() => ta(e.current)),
      r = Ny(t),
      o = Iv(),
      i = Iv();
    if (
      (ga(ya((l) => n(ta(l)), [])),
      Oy(() => {
        let l = t.retain();
        if (o.current && !Pv) {
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
      r !== t && !Pv)
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
        }, vR));
    }
    return t;
  }
  function Dy(e, t) {
    var n;
    let r = e.getState(),
      o = (n = r.nextTree) !== null && n !== void 0 ? n : r.currentTree,
      i = t.getStore_INTERNAL().getState().currentTree;
    fR(() => {
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
            Py(f).shouldRestoreFromSnapshots &&
            s.add(f);
        }
      s.forEach((u) => {
        mR(e, new hR(u), i.atomValues.has(u) ? Ee(i.atomValues.get(u)) : dR);
      }),
        e.replaceState((u) => ({ ...u, stateID: t.getID() }));
    });
  }
  function ER() {
    let e = nd();
    return ya((t) => Dy(e.current, t), [e]);
  }
  var My = {
      useRecoilSnapshot: _R,
      gotoSnapshot: Dy,
      useGotoRecoilSnapshot: ER,
      useRecoilTransactionObserver: SR,
      useTransactionObservation_DEPRECATED: gR,
      useTransactionSubscription_DEPRECATED: ga,
    },
    { peekNodeInfo: wR } = Zn,
    { useStoreRef: TR } = Sn;
  function RR() {
    let e = TR();
    return ({ key: t }) => wR(e.current, e.current.getState().currentTree, t);
  }
  var xR = RR,
    { reactMode: NR } = ko,
    { RecoilRoot: AR, useStoreRef: CR } = Sn,
    { useMemo: kR } = ye.default;
  function LR() {
    NR().mode === 'MUTABLE_SOURCE' &&
      console.warn(
        'Warning: There are known issues using useRecoilBridgeAcrossReactRoots() in recoil_mutable_source rendering mode.  Please consider upgrading to recoil_sync_external_store mode.',
      );
    let e = CR().current;
    return kR(() => {
      function t({ children: n }) {
        return ye.default.createElement(AR, { store_INTERNAL: e }, n);
      }
      return t;
    }, [e]);
  }
  var IR = LR,
    { loadableWithValue: PR } = es,
    { initializeNode: OR } = Zn,
    { DEFAULT_VALUE: DR, getNode: MR } = dt,
    {
      copyTreeState: VR,
      getRecoilValueAsLoadable: $R,
      invalidateDownstreams: bR,
      writeLoadableToTreeState: UR,
    } = rn;
  function Dv(e) {
    return MR(e.key).nodeType === 'atom';
  }
  var $f = class {
    constructor(t, n) {
      K(this, '_store', void 0),
        K(this, '_treeState', void 0),
        K(this, '_changes', void 0),
        K(this, 'get', (r) => {
          if (this._changes.has(r.key)) return this._changes.get(r.key);
          if (!Dv(r))
            throw Q(
              'Reading sel\
ectors within atomicUpdate is not supported',
            );
          let o = $R(this._store, r, this._treeState);
          if (o.state === 'hasValue') return o.contents;
          throw o.state === 'hasError'
            ? o.contents
            : Q(
                `Expected Recoil atom ${r.key} to have a value, but it is in a loading state.`,
              );
        }),
        K(this, 'set', (r, o) => {
          if (!Dv(r))
            throw Q('Setting selectors within atomicUpdate is not supported');
          if (typeof o == 'function') {
            let i = this.get(r);
            this._changes.set(r.key, o(i));
          } else OR(this._store, r.key, 'set'), this._changes.set(r.key, o);
        }),
        K(this, 'reset', (r) => {
          this.set(r, DR);
        }),
        (this._store = t),
        (this._treeState = n),
        (this._changes = new Map());
    }
    newTreeState_INTERNAL() {
      if (this._changes.size === 0) return this._treeState;
      let t = VR(this._treeState);
      for (let [n, r] of this._changes) UR(t, n, PR(r));
      return bR(this._store, t), t;
    }
  };
  function FR(e) {
    return (t) => {
      e.replaceState((n) => {
        let r = new $f(e, n);
        return t(r), r.newTreeState_INTERNAL();
      });
    };
  }
  var zR = { atomicUpdater: FR },
    BR = zR.atomicUpdater,
    Vy = Object.freeze({ __proto__: null, atomicUpdater: BR });
  function jR(e, t) {
    if (!e) throw new Error(t);
  }
  var HR = jR,
    Ki = HR,
    { atomicUpdater: WR } = Vy,
    { batchUpdates: GR } = da,
    { DEFAULT_VALUE: KR } = dt,
    { useStoreRef: QR } = Sn,
    { refreshRecoilValue: YR, setRecoilValue: Mv } = rn,
    { cloneSnapshot: ZR } = ha,
    { gotoSnapshot: qR } = My,
    { useCallback: XR } = ye.default,
    na = class {},
    JR = new na();
  function $y(e, t, n, r) {
    let o = JR,
      i;
    if (
      (GR(() => {
        let l =
          'useRecoilCallback() expects a function that returns a function: it accepts a function of the type (RecoilInterface) => (Args) => ReturnType and returns a callback function (Args) => ReturnType, where RecoilInterface is an object\
 {snapshot, set, ...} and Args and ReturnType are the argument and return types of the callback you want to create.  Please see the docs at recoiljs.org for details.';
        if (typeof t != 'function') throw Q(l);
        let a = Zv(
            {
              ...(r ?? {}),
              set: (f, p) => Mv(e, f, p),
              reset: (f) => Mv(e, f, KR),
              refresh: (f) => YR(e, f),
              gotoSnapshot: (f) => qR(e, f),
              transact_UNSTABLE: (f) => WR(e)(f),
            },
            {
              snapshot: () => {
                let f = ZR(e);
                return (i = f.retain()), f;
              },
            },
          ),
          u = t(a);
        if (typeof u != 'function') throw Q(l);
        o = u(...n);
      }),
      o instanceof na && Ki(!1),
      ve(o))
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
  function ex(e, t) {
    let n = QR();
    return XR((...r) => $y(n.current, e, r), t != null ? [...t, n] : void 0);
  }
  var by = { recoilCallback: $y, useRecoilCallback: ex },
    { useStoreRef: tx } = Sn,
    { refreshRecoilValue: nx } = rn,
    { useCallback: rx } = ye.default;
  function ox(e) {
    let t = tx();
    return rx(() => {
      let n = t.current;
      nx(n, e);
    }, [e, t]);
  }
  var ix = ox,
    { atomicUpdater: sx } = Vy,
    { useStoreRef: lx } = Sn,
    { useMemo: ax } = ye.default;
  function ux(e, t) {
    let n = lx();
    return ax(
      () =>
        (...r) => {
          sx(n.current)((i) => {
            e(i)(...r);
          });
        },
      t != null ? [...t, n] : void 0,
    );
  }
  var cx = ux,
    bf = class {
      constructor(t) {
        K(this, 'value', void 0), (this.value = t);
      }
    },
    fx = { WrappedValue: bf },
    dx = fx.WrappedValue,
    Uy = Object.freeze({ __proto__: null, WrappedValue: dx }),
    { isFastRefreshEnabled: px } = ko,
    ra = class extends Error {},
    Uf = class {
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
          for (let [b, h] of t) {
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
                      nodeKey: b,
                      parent: d,
                      branches: new Map(),
                      branchKey: f,
                    }),
              u.type !== 'branch' || u.nodeKey !== b)
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
          if (i instanceof ra) this.clear(), o();
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
        let t = px()
          ? 'Possible Fast Refresh module reload detected.  This may also be caused by an selector returning inconsistent valu\
es. Resetting cache.'
          : 'Invalid cache values.  This happens when selectors do not return consistent values for the same input dependency values.  That may also be caused when using Fast Refresh to change a selector implementation.  Resetting cache.';
        throw (
          (nt(t + (this._name != null ? ` - ${this._name}` : '')), new ra())
        );
      }
    },
    hx = { TreeCache: Uf },
    mx = hx.TreeCache,
    Fy = Object.freeze({ __proto__: null, TreeCache: mx }),
    Ff = class {
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
        let r = Ee(this._map.get(n)),
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
    vx = { LRUCache: Ff },
    yx = vx.LRUCache,
    zy = Object.freeze({ __proto__: null, LRUCache: yx }),
    { LRUCache: gx } = zy,
    { TreeCache: Sx } = Fy;
  function _x({ name: e, maxSize: t, mapNodeValue: n = (r) => r }) {
    let r = new gx({ maxSize: t }),
      o = new Sx({
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
  var Vv = _x;
  function Gt(e, t, n) {
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
    if (ve(e)) return '__PROMISE__';
    if (Array.isArray(e)) return `[${e.map((o, i) => Gt(o, t, i.toString()))}]`;
    if (typeof e.toJSON == 'function') return Gt(e.toJSON(n), t, n);
    if (e instanceof Map) {
      let o = {};
      for (let [i, s] of e) o[typeof i == 'string' ? i : Gt(i, t)] = s;
      return Gt(o, t, n);
    }
    return e instanceof Set
      ? Gt(
          Array.from(e).sort((o, i) => Gt(o, t).localeCompare(Gt(i, t))),
          t,
          n,
        )
      : Symbol !== void 0 &&
        e[Symbol.iterator] != null &&
        typeof e[Symbol.iterator] == 'function'
      ? Gt(Array.from(e), t, n)
      : `{${Object.keys(e)
          .filter((o) => e[o] !== void 0)
          .sort()
          .map((o) => `${Gt(o, t)}:${Gt(e[o], t, o)}`)
          .join(',')}}`;
  }
  function Ex(e, t = { allowFunctions: !1 }) {
    return Gt(e, t);
  }
  var Sa = Ex,
    { TreeCache: wx } = Fy,
    Fl = { equality: 'reference', eviction: 'keep-all', maxSize: 1 / 0 };
  function Tx(
    {
      equality: e = Fl.equality,
      eviction: t = Fl.eviction,
      maxSize: n = Fl.maxSize,
    } = Fl,
    r,
  ) {
    let o = Rx(e);
    return xx(t, n, o, r);
  }
  function Rx(e) {
    switch (e) {
      case 'reference':
        return (t) => t;
      case 'value':
        return (t) => Sa(t);
    }
    throw Q(`Unrecognized equality policy ${e}`);
  }
  function xx(e, t, n, r) {
    switch (e) {
      case 'keep-all':
        return new wx({ name: r, mapNodeValue: n });
      case '\
lru':
        return Vv({ name: r, maxSize: Ee(t), mapNodeValue: n });
      case 'most-recent':
        return Vv({ name: r, maxSize: 1, mapNodeValue: n });
    }
    throw Q(`Unrecognized eviction policy ${e}`);
  }
  var Nx = Tx;
  var { isReactNative: Nk, isWindow: Ak } = rs;
  function Ax(e) {
    return () => null;
  }
  var Cx = { startPerfBlock: Ax },
    {
      isLoadable: kx,
      loadableWithError: zl,
      loadableWithPromise: Lx,
      loadableWithValue: wf,
    } = es,
    { WrappedValue: By } = Uy,
    { getNodeLoadable: Bl, peekNodeLoadable: Ix, setNodeValue: Px } = Zn,
    { saveDepsToStore: Ox } = ts,
    {
      DEFAULT_VALUE: Dx,
      getConfigDeletionHandler: Mx,
      getNode: Vx,
      registerNode: $v,
    } = dt,
    { isRecoilValue: $x } = xr,
    { markRecoilValueModified: bv } = rn,
    { retainedByOptionWithDefault: bx } = Cr,
    { recoilCallback: Ux } = by,
    { startPerfBlock: Fx } = Cx,
    oa = class {},
    Hi = new oa(),
    Wi = [],
    jl = new Map(),
    zx = (() => {
      let e = 0;
      return () => e++;
    })();
  function jy(e) {
    let t = null,
      { key: n, get: r, cachePolicy_UNSTABLE: o } = e,
      i = e.set != null ? e.set : void 0,
      s = new Set(),
      l = Nx(o ?? { equality: 'reference', eviction: 'keep-all' }, n),
      a = bx(e.retainedBy_UNSTABLE),
      u = new Map(),
      f = 0;
    function p() {
      return !le('recoil_memory_managament_2020') || f > 0;
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
      return Mx(n) !== void 0 && !p();
    }
    function y(_, k, L, F, $) {
      An(k, F, $), w(_, L);
    }
    function w(_, k) {
      Ye(_, k) && Oe(_), h(k, !0);
    }
    function b(_, k) {
      Ye(_, k) && (Ee(V(_)).stateVersions.clear(), h(k, !1));
    }
    function h(_, k) {
      let L = jl.get(_);
      if (L != null) {
        for (let F of L) bv(F, Ee(t));
        k && jl.delete(_);
      }
    }
    function c(_, k) {
      let L = jl.get(k);
      L == null && jl.set(k, (L = new Set())), L.add(_);
    }
    function d(_, k, L, F, $, W) {
      return k
        .then((H) => {
          if (!p()) throw (Oe(_), Hi);
          let U = wf(H);
          return y(_, L, $, U, F), H;
        })
        .catch((H) => {
          if (!p()) throw (Oe(_), Hi);
          if (ve(H)) return E(_, H, L, F, $, W);
          let U = zl(H);
          throw (y(_, L, $, U, F), H);
        });
    }
    function E(_, k, L, F, $, W) {
      return k
        .then((H) => {
          if (!p()) throw (Oe(_), Hi);
          W.loadingDepKey != null && W.loadingDepPromise === k
            ? L.atomValues.set(W.loadingDepKey, wf(H))
            : _.getState().knownSelectors.forEach((se) => {
                L.atomValues.delete(se);
              });
          let U = T(_, L);
          if (U && U.state !== 'loading') {
            if (((Ye(_, $) || V(_) == null) && w(_, $), U.state === 'hasValue'))
              return U.contents;
            throw U.contents;
          }
          if (!Ye(_, $)) {
            let se = te(_, L);
            if (se != null) return se.loadingLoadable.contents;
          }
          let [ce, oe] = x(_, L, $);
          if (
            (ce.state !== 'loading' && y(_, L, $, ce, oe),
            ce.state === 'hasError')
          )
            throw ce.contents;
          return ce.contents;
        })
        .catch((H) => {
          if (H instanceof oa) throw Hi;
          if (!p()) throw (Oe(_), Hi);
          let U = zl(H);
          throw (y(_, L, $, U, F), H);
        });
    }
    function R(_, k, L, F) {
      var $, W, H, U;
      if (
        Ye(_, F) ||
        k.version ===
          (($ = _.getState()) === null ||
          $ === void 0 ||
          (W = $.currentTree) === null ||
          W === void 0
            ? void 0
            : W.version) ||
        k.version ===
          ((H = _.getState()) === null ||
          H === void 0 ||
          (U = H.nextTree) === null ||
          U === void 0
            ? void 0
            : U.version)
      ) {
        var ce, oe, se;
        Ox(
          n,
          L,
          _,
          (ce =
            (oe = _.getState()) === null ||
            oe === void 0 ||
            (se = oe.nextTree) === null ||
            se === void 0
              ? void 0
              : se.version) !== null && ce !== void 0
            ? ce
            : _.getState().currentTree.version,
        );
      }
      for (let ge of L) s.add(ge);
    }
    function x(_, k, L) {
      let F = Fx(n),
        $ = !0,
        W = !0,
        H = () => {
          F(), (W = !1);
        },
        U,
        ce = !1,
        oe,
        se = { loadingDepKey: null, loadingDepPromise: null },
        ge = new Map();
      function _t({ key: qe }) {
        let Et = Bl(_, k, qe);
        switch (
          (ge.set(qe, Et),
          $ || (R(_, k, new Set(ge.keys()), L), b(_, L)),
          Et.state)
        ) {
          case 'hasValue':
            return Et.contents;
          case 'hasError':
            throw Et.contents;
          case 'loading':
            throw (
              ((se.loadingDepKey = qe),
              (se.loadingDepPromise = Et.contents),
              Et.contents)
            );
        }
        throw Q('Invalid Loadable state');
      }
      let zr =
        (qe) =>
        (...Et) => {
          if (W)
            throw Q(
              'Callbacks from getCallback() should only be called asynchron\
ously after the selector is evalutated.  It can be used for selectors to return objects with callbacks that can work with Recoil state without a subscription.',
            );
          return t == null && Ki(!1), Ux(_, qe, Et, { node: t });
        };
      try {
        (U = r({ get: _t, getCallback: zr })),
          (U = $x(U) ? _t(U) : U),
          kx(U) && (U.state === 'hasError' && (ce = !0), (U = U.contents)),
          ve(U) ? (U = d(_, U, k, ge, L, se).finally(H)) : H(),
          (U = U instanceof By ? U.value : U);
      } catch (qe) {
        (U = qe),
          ve(U) ? (U = E(_, U, k, ge, L, se).finally(H)) : ((ce = !0), H());
      }
      return (
        ce ? (oe = zl(U)) : ve(U) ? (oe = Lx(U)) : (oe = wf(U)),
        ($ = !1),
        Mt(_, L, ge),
        R(_, k, new Set(ge.keys()), L),
        [oe, ge]
      );
    }
    function T(_, k) {
      let L = k.atomValues.get(n);
      if (L != null) return L;
      let F = new Set();
      try {
        L = l.get(
          (W) => (typeof W != 'string' && Ki(!1), Bl(_, k, W).contents),
          {
            onNodeVisit: (W) => {
              W.type === 'branch' && W.nodeKey !== n && F.add(W.nodeKey);
            },
          },
        );
      } catch (W) {
        throw Q(`Problem with cache lookup for selector "${n}": ${W.message}`);
      }
      if (L) {
        var $;
        k.atomValues.set(n, L),
          R(
            _,
            k,
            F,
            ($ = V(_)) === null || $ === void 0 ? void 0 : $.executionID,
          );
      }
      return L;
    }
    function O(_, k) {
      let L = T(_, k);
      if (L != null) return Oe(_), L;
      let F = te(_, k);
      if (F != null) {
        var $;
        return (
          (($ = F.loadingLoadable) === null || $ === void 0
            ? void 0
            : $.state) === 'loading' && c(_, F.executionID),
          F.loadingLoadable
        );
      }
      let W = zx(),
        [H, U] = x(_, k, W);
      return (
        H.state === 'loading'
          ? (ue(_, W, H, U, k), c(_, W))
          : (Oe(_), An(k, H, U)),
        H
      );
    }
    function te(_, k) {
      let L = py([
        u.has(_) ? [Ee(u.get(_))] : [],
        aa(
          Kf(u, ([$]) => $ !== _),
          ([, $]) => $,
        ),
      ]);
      function F($) {
        for (let [W, H] of $) if (!Bl(_, k, W).is(H)) return !0;
        return !1;
      }
      for (let $ of L) {
        if (
          $.stateVersions.get(k.version) ||
          !F($.depValuesDiscoveredSoFarDuringAsyncWork)
        )
          return $.stateVersions.set(k.version, !0), $;
        $.stateVersions.set(k.version, !1);
      }
    }
    function V(_) {
      return u.get(_);
    }
    function ue(_, k, L, F, $) {
      u.set(_, {
        depValuesDiscoveredSoFarDuringAsyncWork: F,
        executionID: k,
        loadingLoadable: L,
        stateVersions: new Map([[$.version, !0]]),
      });
    }
    function Mt(_, k, L) {
      if (Ye(_, k)) {
        let F = V(_);
        F != null && (F.depValuesDiscoveredSoFarDuringAsyncWork = L);
      }
    }
    function Oe(_) {
      u.delete(_);
    }
    function Ye(_, k) {
      var L;
      return (
        k === ((L = V(_)) === null || L === void 0 ? void 0 : L.executionID)
      );
    }
    function Nn(_) {
      return Array.from(_.entries()).map(([k, L]) => [k, L.contents]);
    }
    function An(_, k, L) {
      _.atomValues.set(n, k);
      try {
        l.set(Nn(L), k);
      } catch (F) {
        throw Q(`Problem with setting cache for selector "${n}": ${F.message}`);
      }
    }
    function pt(_) {
      if (Wi.includes(n)) {
        let k = `Recoil selector has circular dependencies: ${Wi.slice(
          Wi.indexOf(n),
        ).join(' \u2192 ')}`;
        return zl(Q(k));
      }
      Wi.push(n);
      try {
        return _();
      } finally {
        Wi.pop();
      }
    }
    function Ze(_, k) {
      let L = k.atomValues.get(n);
      return (
        L ??
        l.get((F) => {
          var $;
          return (
            typeof F != 'string' && Ki(!1),
            ($ = Ix(_, k, F)) === null || $ === void 0 ? void 0 : $.contents
          );
        })
      );
    }
    function Vt(_, k) {
      return pt(() => O(_, k));
    }
    function Z(_) {
      _.atomValues.delete(n);
    }
    function Y(_, k) {
      t == null && Ki(!1);
      for (let F of s) {
        var L;
        let $ = Vx(F);
        (L = $.clearCache) === null || L === void 0 || L.call($, _, k);
      }
      s.clear(), Z(k), l.clear(), bv(_, t);
    }
    return i != null
      ? (t = $v({
          key: n,
          nodeType: 'selector',
          peek: Ze,
          get: Vt,
          set: (k, L, F) => {
            let $ = !1,
              W = new Map();
            function H({ key: se }) {
              if ($)
                throw Q(
                  'Recoil: Async selector sets are not currently supported.',
                );
              let ge = Bl(k, L, se);
              if (ge.state === 'hasValue') return ge.contents;
              if (ge.state === 'loading') {
                let _t = `Getting\
 value of asynchronous atom or selector "${se}" in a pending state while setting selector "${n}" is not yet supported.`;
                throw (nt(_t), Q(_t));
              } else throw ge.contents;
            }
            function U(se, ge) {
              if ($) {
                let qe =
                  'Recoil: Async selector sets are not currently supported.';
                throw (nt(qe), Q(qe));
              }
              let _t = typeof ge == 'function' ? ge(H(se)) : ge;
              Px(k, L, se.key, _t).forEach((qe, Et) => W.set(Et, qe));
            }
            function ce(se) {
              U(se, Dx);
            }
            let oe = i({ set: U, get: H, reset: ce }, F);
            if (oe !== void 0)
              throw ve(oe)
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
      : (t = $v({
          key: n,
          nodeType: 'selector',
          peek: Ze,
          get: Vt,
          init: m,
          invalidate: Z,
          clearCache: Y,
          shouldDeleteConfigOnRelease: S,
          dangerouslyAllowMutability: e.dangerouslyAllowMutability,
          shouldRestoreFromSnapshots: !1,
          retainedBy: a,
        }));
  }
  jy.value = (e) => new By(e);
  var Ao = jy,
    {
      isLoadable: Bx,
      loadableWithError: Tf,
      loadableWithPromise: Rf,
      loadableWithValue: _o,
    } = es,
    { WrappedValue: Hy } = Uy,
    { peekNodeInfo: jx } = Zn,
    {
      DEFAULT_VALUE: Tr,
      DefaultValue: Yn,
      getConfigDeletionHandler: Wy,
      registerNode: Hx,
      setConfigDeletionHandler: Wx,
    } = dt,
    { isRecoilValue: Gx } = xr,
    {
      getRecoilValueAsLoadable: Kx,
      markRecoilValueModified: Qx,
      setRecoilValue: Uv,
      setRecoilValueLoadable: Yx,
    } = rn,
    { retainedByOptionWithDefault: Zx } = Cr,
    Gi = (e) => (e instanceof Hy ? e.value : e);
  function qx(e) {
    let { key: t, persistence_UNSTABLE: n } = e,
      r = Zx(e.retainedBy_UNSTABLE),
      o = 0;
    function i(c) {
      return Rf(
        c
          .then((d) => ((s = _o(d)), d))
          .catch((d) => {
            throw ((s = Tf(d)), d);
          }),
      );
    }
    let s = ve(e.default)
      ? i(e.default)
      : Bx(e.default)
      ? e.default.state === 'loading'
        ? i(e.default.contents)
        : e.default
      : _o(Gi(e.default));
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
              : T.contents) === E && Uv(c, h, R),
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
              : T.contents) === E && Yx(c, h, Tf(R)),
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
          (V = a.get(c)) === null || V === void 0 || V.forEach((ue) => ue()),
          a.delete(c);
      };
      if ((c.getState().knownAtoms.add(t), s.state === 'loading')) {
        let V = () => {
          var ue;
          ((ue = c.getState().nextTree) !== null && ue !== void 0
            ? ue
            : c.getState().currentTree
          ).atomValues.has(t) || Qx(c, h);
        };
        s.contents.finally(V);
      }
      let T = (R = e.effects) !== null && R !== void 0 ? R : e.effects_UNSTABLE;
      if (T != null) {
        let Ye = function (Z) {
            if (ue && Z.key === t) {
              let Y = V;
              return Y instanceof Yn
                ? m(c, d)
                : ve(Y)
                ? Rf(Y.then((_) => (_ instanceof Yn ? s.toPromise() : _)))
                : _o(Y);
            }
            return Kx(c, Z);
          },
          Nn = function (Z) {
            return Ye(Z).toPromise();
          },
          An = function (Z) {
            var Y;
            let _ = jx(
              c,
              (Y = c.getState().nextTree) !== null && Y !== void 0
                ? Y
                : c.getState().currentTree,
              Z.key,
            );
            return ue && Z.key === t && !(V instanceof Yn)
              ? { ..._, isSet: !0, loadable: Ye(Z) }
              : _;
          },
          V = Tr,
          ue = !0,
          Mt = !1,
          Oe = null,
          pt = (Z) => (Y) => {
            if (ue) {
              let _ = Ye(h),
                k = _.state === 'hasValue' ? _.contents : Tr;
              (V =
                typeof Y ==
                'functio\
n'
                  ? Y(k)
                  : Y),
                ve(V) &&
                  (V = V.then((L) => ((Oe = { effect: Z, value: L }), L)));
            } else {
              if (ve(Y))
                throw Q('Setting atoms to async values is not implemented.');
              typeof Y != 'function' && (Oe = { effect: Z, value: Gi(Y) }),
                Uv(
                  c,
                  h,
                  typeof Y == 'function'
                    ? (_) => {
                        let k = Gi(Y(_));
                        return (Oe = { effect: Z, value: k }), k;
                      }
                    : Gi(Y),
                );
            }
          },
          Ze = (Z) => () => pt(Z)(Tr),
          Vt = (Z) => (Y) => {
            var _;
            let { release: k } = c.subscribeToTransactions((L) => {
              var F;
              let { currentTree: $, previousTree: W } = L.getState();
              W ||
                (nt(
                  'Transaction subscribers notified without a next tree being present -- this is a bug in \
Recoil',
                ),
                (W = $));
              let H =
                (F = $.atomValues.get(t)) !== null && F !== void 0 ? F : s;
              if (H.state === 'hasValue') {
                var U, ce, oe, se;
                let ge = H.contents,
                  _t =
                    (U = W.atomValues.get(t)) !== null && U !== void 0 ? U : s,
                  zr = _t.state === 'hasValue' ? _t.contents : Tr;
                ((ce = Oe) === null || ce === void 0 ? void 0 : ce.effect) !==
                  Z ||
                ((oe = Oe) === null || oe === void 0 ? void 0 : oe.value) !== ge
                  ? Y(ge, zr, !$.atomValues.has(t))
                  : ((se = Oe) === null || se === void 0
                      ? void 0
                      : se.effect) === Z && (Oe = null);
              }
            }, t);
            a.set(c, [
              ...((_ = a.get(c)) !== null && _ !== void 0 ? _ : []),
              k,
            ]);
          };
        for (let Z of T)
          try {
            let Y = Z({
              node: h,
              storeID: c.storeID,
              parentStoreID_UNSTABLE: c.parentStoreID,
              trigger: E,
              setSelf: pt(Z),
              resetSelf: Ze(Z),
              onSet: Vt(Z),
              getPromise: Nn,
              getLoadable: Ye,
              getInfo_UNSTABLE: An,
            });
            if (Y != null) {
              var O;
              a.set(c, [
                ...((O = a.get(c)) !== null && O !== void 0 ? O : []),
                Y,
              ]);
            }
          } catch (Y) {
            (V = Y), (Mt = !0);
          }
        if (((ue = !1), !(V instanceof Yn))) {
          var te;
          let Z = Mt ? Tf(V) : ve(V) ? Rf(f(c, V)) : _o(Gi(V));
          Z.contents,
            d.atomValues.set(t, Z),
            (te = c.getState().nextTree) === null ||
              te === void 0 ||
              te.atomValues.set(t, Z);
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
      if (d.atomValues.has(t)) return Ee(d.atomValues.get(t));
      if (d.nonvalidatedAtoms.has(t)) {
        if (l != null) return l;
        if (n == null)
          return (
            Hf(
              `Tried to restore a persisted value for atom ${t} but it has no persistence settings.`,
            ),
            s
          );
        let E = d.nonvalidatedAtoms.get(t),
          R = n.validator(E, Tr);
        return (l = R instanceof Yn ? s : _o(R)), l;
      } else return s;
    }
    function y() {
      l = void 0;
    }
    function w(c, d, E) {
      if (d.atomValues.has(t)) {
        let R = Ee(d.atomValues.get(t));
        if (R.state === 'hasValue' && E === R.contents) return new Map();
      } else if (!d.nonvalidatedAtoms.has(t) && E instanceof Yn)
        return new Map();
      return (l = void 0), new Map().set(t, _o(E));
    }
    function b() {
      return Wy(t) !== void 0 && o <= 0;
    }
    let h = Hx({
      key: t,
      nodeType: 'atom',
      peek: m,
      get: S,
      set: w,
      init: p,
      invalidate: y,
      shouldDeleteConfigOnRelease: b,
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
  function rd(e) {
    let { ...t } = e,
      n = 'default' in e ? e.default : new Promise(() => {});
    return Gx(n) ? Xx({ ...t, default: n }) : qx({ ...t, default: n });
  }
  function Xx(e) {
    let t = rd({
        ...e,
        default: Tr,
        persistence_UNSTABLE:
          e.persistence_UNSTABLE === void 0
            ? void 0
            : {
                ...e.persistence_UNSTABLE,
                validator: (r) =>
                  r instanceof Yn
                    ? r
                    : Ee(e.persistence_UNSTABLE).validator(r, Tr),
              },
        effects: e.effects,
        effects_UNSTABLE: e.effects_UNSTABLE,
      }),
      n = Ao({
        key: `${e.key}__withFallback`,
        get: ({ get: r }) => {
          let o = r(t);
          return o instanceof Yn ? e.default : o;
        },
        set: ({ set: r }, o) => r(t, o),
        cachePolicy_UNSTABLE: { eviction: 'most-recent' },
        dangerouslyAllowMutability: e.dangerouslyAllowMutability,
      });
    return Wx(n.key, Wy(e.key)), n;
  }
  rd.value = (e) => new Hy(e);
  var Gy = rd,
    zf = class {
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
    Jx = { MapCache: zf },
    eN = Jx.MapCache,
    tN = Object.freeze({ __proto__: null, MapCache: eN }),
    { LRUCache: Fv } = zy,
    { MapCache: nN } = tN,
    Hl = { equality: 'reference', eviction: 'none', maxSize: 1 / 0 };
  function rN({
    equality: e = Hl.equality,
    eviction: t = Hl.eviction,
    maxSize: n = Hl.maxSize,
  } = Hl) {
    let r = oN(e);
    return iN(t, n, r);
  }
  function oN(e) {
    switch (e) {
      case 'reference':
        return (t) => t;
      case 'value':
        return (t) => Sa(t);
    }
    throw Q(`Unrecognized equality policy ${e}`);
  }
  function iN(e, t, n) {
    switch (e) {
      case 'keep-all':
        return new nN({ mapKey: n });
      case 'lru':
        return new Fv({ mapKey: n, maxSize: Ee(t) });
      case 'most-recent':
        return new Fv({ mapKey: n, maxSize: 1 });
    }
    throw Q(`Unrecognized eviction policy ${e}`);
  }
  var Ky = rN,
    { setConfigDeletionHandler: sN } = dt;
  function lN(e) {
    var t, n;
    let r = Ky({
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
        p = Gy({
          ...u,
          key: `${e.key}__${(i = Sa(o)) !== null && i !== void 0 ? i : 'void'}`,
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
        sN(p.key, () => {
          r.delete(o);
        }),
        p
      );
    };
  }
  var aN = lN,
    { setConfigDeletionHandler: uN } = dt,
    cN = 0;
  function fN(e) {
    var t, n;
    let r = Ky({
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
          (i = Sa(o, { allowFunctions: !0 })) !== null && i !== void 0
            ? i
            : 'void'
        }/${cN++}`,
        a = (m) => e.get(o)(m),
        u = e.cachePolicy_UNSTABLE,
        f =
          typeof e.retainedBy_UNSTABLE == 'function'
            ? e.retainedBy_UNSTABLE(o)
            : e.retainedBy_UNSTABLE,
        p;
      if (e.set != null) {
        let m = e.set;
        p = Ao({
          key: l,
          get: a,
          set: (y, w) => m(o)(y, w),
          cachePolicy_UNSTABLE: u,
          dangerouslyAllowMutability: e.dangerouslyAllowMutability,
          retainedBy_UNSTABLE: f,
        });
      } else
        p = Ao({
          key: l,
          get: a,
          cachePolicy_UNSTABLE: u,
          dangerouslyAllowMutability: e.dangerouslyAllowMutability,
          retainedBy_UNSTABLE: f,
        });
      return (
        r.set(o, p),
        uN(p.key, () => {
          r.delete(o);
        }),
        p
      );
    };
  }
  var qn = fN,
    dN = qn({
      key: '__constant',
      get: (e) => () => e,
      cachePolicyForParams_UNSTABLE: { equality: 'reference' },
    });
  function pN(e) {
    return dN(e);
  }
  var hN = pN,
    mN = qn({
      key: '__error',
      get: (e) => () => {
        throw Q(e);
      },
      cachePolicyForParams_UNSTABLE: { equality: 'reference' },
    });
  function vN(e) {
    return mN(e);
  }
  var yN = vN;
  function gN(e) {
    return e;
  }
  var SN = gN,
    {
      loadableWithError: Qy,
      loadableWithPromise: Yy,
      loadableWithValue: Zy,
    } = es;
  function _a(e, t) {
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
  function _N(e) {
    return e != null && !ve(e);
  }
  function Ea(e) {
    return Array.isArray(e)
      ? e
      : Object.getOwnPropertyNames(e).map((t) => e[t]);
  }
  function Bf(e, t) {
    return Array.isArray(e)
      ? t
      : Object.getOwnPropertyNames(e).reduce(
          (n, r, o) => ({ ...n, [r]: t[o] }),
          {},
        );
  }
  function Eo(e, t, n) {
    let r = n.map((o, i) => (o == null ? Zy(t[i]) : ve(o) ? Yy(o) : Qy(o)));
    return Bf(e, r);
  }
  function EN(e, t) {
    return t.map((n, r) => (n === void 0 ? e[r] : n));
  }
  var wN = qn({
      key: '__waitForNone',
      get:
        (e) =>
        ({ get: t }) => {
          let n = Ea(e),
            [r, o] = _a(t, n);
          return Eo(e, r, o);
        },
      dangerouslyAllowMutability: !0,
    }),
    TN = qn({
      key: '__waitForAny',
      get:
        (e) =>
        ({ get: t }) => {
          let n = Ea(e),
            [r, o] = _a(t, n);
          return o.some((i) => !ve(i))
            ? Eo(e, r, o)
            : new Promise((i) => {
                for (let [s, l] of o.entries())
                  ve(l) &&
                    l
                      .then((a) => {
                        (r[s] = a), (o[s] = void 0), i(Eo(e, r, o));
                      })
                      .catch((a) => {
                        (o[s] = a), i(Eo(e, r, o));
                      });
              });
        },
      dangerouslyAllowMutability: !0,
    }),
    RN = qn({
      key: '__waitForAll',
      get:
        (e) =>
        ({ get: t }) => {
          let n = Ea(e),
            [r, o] = _a(t, n);
          if (o.every((s) => s == null)) return Bf(e, r);
          let i = o.find(_N);
          if (i != null) throw i;
          return Promise.all(o).then((s) => Bf(e, EN(r, s)));
        },
      dangerouslyAllowMutability: !0,
    }),
    xN = qn({
      key: '__waitForAllSettled',
      get:
        (e) =>
        ({ get: t }) => {
          let n = Ea(e),
            [r, o] = _a(t, n);
          return o.every((i) => !ve(i))
            ? Eo(e, r, o)
            : Promise.all(
                o.map((i, s) =>
                  ve(i)
                    ? i
                        .then((l) => {
                          (r[s] = l), (o[s] = void 0);
                        })
                        .catch((l) => {
                          (r[s] = void 0), (o[s] = l);
                        })
                    : null,
                ),
              ).then(() => Eo(e, r, o));
        },
      dangerouslyAllowMutability: !0,
    }),
    NN = qn({
      key: '__noWait',
      get:
        (e) =>
        ({ get: t }) => {
          try {
            return Ao.value(Zy(t(e)));
          } catch (n) {
            return Ao.value(ve(n) ? Yy(n) : Qy(n));
          }
        },
      dangerouslyAllowMutability: !0,
    }),
    AN = {
      waitForNone: wN,
      waitForAny: TN,
      waitForAll: RN,
      waitForAllSettled: xN,
      noWait: NN,
    },
    { RecoilLoadable: CN } = es,
    { DefaultValue: kN } = dt,
    { RecoilRoot: LN, useRecoilStoreID: IN } = Sn,
    { isRecoilValue: PN } = xr,
    { retentionZone: ON } = ca,
    { freshSnapshot: DN } = ha,
    {
      useRecoilState: MN,
      useRecoilState_TRANSITION_SUPPORT_UNSTABLE: VN,
      useRecoilStateLoadable: $N,
      useRecoilValue: bN,
      useRecoilValue_TRANSITION_SUPPORT_UNSTABLE: UN,
      useRecoilValueLoadable: FN,
      useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE: zN,
      useResetRecoilState: BN,
      useSetRecoilState: jN,
    } = oR,
    {
      useGotoRecoilSnapshot: HN,
      useRecoilSnapshot: WN,
      useRecoilTransactionObserver: GN,
    } = My,
    { useRecoilCallback: KN } = by,
    {
      noWait: QN,
      waitForAll: YN,
      waitForAllSettled: ZN,
      waitForAny: qN,
      waitForNone: XN,
    } = AN,
    X = {
      DefaultValue: kN,
      isRecoilValue: PN,
      RecoilLoadable: CN,
      RecoilEnv: Co,
      RecoilRoot: LN,
      useRecoilStoreID: IN,
      useRecoilBridgeAcrossReactRoots_UNSTABLE: IR,
      atom: Gy,
      selector: Ao,
      atomFamily: aN,
      selectorFamily: qn,
      constSelector: hN,
      errorSelector: yN,
      readOnlySelector: SN,
      noWait: QN,
      waitForNone: XN,
      waitForAny: qN,
      waitForAll: YN,
      waitForAllSettled: ZN,
      useRecoilValue: bN,
      useRecoilValueLoadable: FN,
      useRecoilState: MN,
      useRecoilStateLoadable: $N,
      useSetRecoilState: jN,
      useResetRecoilState: BN,
      useGetRecoilValueInfo_UNSTABLE: xR,
      useRecoilRefresher_UNSTABLE: ix,
      useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE: zN,
      useRecoilValue_TRANSITION_SUPPORT_UNSTABLE: UN,
      useRecoilState_TRANSITION_SUPPORT_UNSTABLE: VN,
      useRecoilCallback: KN,
      useRecoilTransaction_UNSTABLE: cx,
      useGotoRecoilSnapshot: HN,
      useRecoilSnapshot: WN,
      useRecoilTransactionObserver_UNSTABLE: GN,
      snapshot_UNSTABLE: DN,
      useRetain: Xf,
      retentionZone: ON,
    },
    qy = X.DefaultValue,
    Ck = X.isRecoilValue,
    kk = X.RecoilLoadable,
    Lk = X.RecoilEnv,
    Xy = X.RecoilRoot,
    Ik = X.useRecoilStoreID,
    Pk = X.useRecoilBridgeAcrossReactRoots_UNSTABLE,
    It = X.atom,
    Ok = X.selector,
    Dk = X.atomFamily,
    Jy = X.selectorFamily,
    Mk = X.constSelector,
    Vk = X.errorSelector,
    $k = X.readOnlySelector,
    bk = X.noWait,
    Uk = X.waitForNone,
    Fk = X.waitForAny,
    zk = X.waitForAll,
    Bk = X.waitForAllSettled,
    ss = X.useRecoilValue,
    jk = X.useRecoilValueLoadable,
    e0 = X.useRecoilState,
    Hk = X.useRecoilStateLoadable,
    Wk = X.useSetRecoilState,
    Gk = X.useResetRecoilState,
    Kk = X.useGetRecoilValueInfo_UNSTABLE,
    Qk = X.useRecoilRefresher_UNSTABLE,
    Yk = X.useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE,
    Zk = X.useRecoilValue_TRANSITION_SUPPORT_UNSTABLE,
    qk = X.useRecoilState_TRANSITION_SUPPORT_UNSTABLE,
    t0 = X.useRecoilCallback,
    Xk = X.useRecoilTransaction_UNSTABLE,
    Jk = X.useGotoRecoilSnapshot,
    eL = X.useRecoilSnapshot,
    tL = X.useRecoilTransactionObserver_UNSTABLE,
    nL = X.snapshot_UNSTABLE,
    rL = X.useRetain,
    oL = X.retentionZone;
  var n0 = fe(Tt(), 1),
    kr = (0, n0.createContext)(null);
  var Io = () => {};
  var Xn = class extends Set {},
    Jn = class extends Set {},
    er = class extends Set {};
  var wa = new WeakMap(),
    Ta = new WeakMap(),
    r0 = new WeakMap(),
    tr = (e) => e instanceof Xn,
    sn = (e) => e instanceof Jn,
    ln = (e) => e instanceof er;
  var _n = (e) => typeof e == 'string',
    Po = Array.isArray,
    ls = (e) => typeof e == 'function',
    En = (e) => ls(e) || (typeof e == 'object' && e !== null),
    {
      prototype: { toString: JN },
    } = Object,
    Oo = (e) => JN.call(e) === '[object RegExp]',
    Do = (e) =>
      typeof e == 'function' && En(e) && _n(e.type) && 'definition' in e;
  function o0(e) {
    return typeof e == 'function'
      ? e
      : Oo(e)
      ? new RegExp(e)
      : tr(e)
      ? new Xn(e)
      : sn(e)
      ? new Jn(e)
      : ln(e)
      ? new er(e)
      : { ...e };
  }
  var i0 = (e) => 65 <= e && e <= 90,
    Ra = (e) => 97 <= e && e <= 122;
  var Lr = (e) => 48 <= e && e <= 57,
    eA = (e) => 65 <= e && e <= 70,
    tA = (e) => 97 <= e && e <= 102;
  var s0 = (e) => Lr(e) || eA(e) || tA(e);
  var nA = (e) => 55296 <= e && e <= 56319,
    rA = (e) => 56320 <= e && e <= 57343,
    oA = (e) => 55296 <= e && e <= 57343,
    nr = function* (e, t = 0) {
      let { length: n } = e;
      for (let r = t; r < n; r++) {
        let o = e.charCodeAt(r);
        if (oA(o)) {
          let i = e.charCodeAt(r + 1);
          nA(o) &&
            rA(i) &&
            ((o = (o - 55296) * 1024 + (i - 56320) + 65536), (r += 1));
        }
        yield o;
      }
    };
  var xa = (e) => {
    let t;
    return () => {
      if (t) return t.value;
      let n = e();
      return (t = { value: n }), n;
    };
  };
  var Ir = class extends Error {
    constructor({ code: t, message: n = t, data: r }) {
      super(n), (this.code = t), (this.data = r);
    }
  };
  var iA = Object.keys,
    Pr = (e, t) => {
      if (typeof t == 'function') return t(e);
      if (Oo(t)) return _n(e) && t.test(e);
      if (tr(t)) return t.has(e);
      if (sn(t)) {
        for (let n of t) if (Pr(e, n)) return !0;
        return !1;
      }
      if (ln(t)) {
        for (let n of t) if (!Pr(e, n)) return !1;
        return !0;
      }
      if (En(e)) {
        for (let n of iA(t)) if (!Pr(e[n], t[n])) return !1;
        return !0;
      }
      return !1;
    };
  var { entries: sA, defineProperties: lA } = Object;
  function C(e, t) {
    if (!e)
      throw new Ir({ code: 'NoTypeName', data: { type: e, definition: t } });
    if (Do(t))
      throw new Ir({
        code: 'UselessWrapping',
        message: `UselessWrapping: ${e}(${t.name})`,
        data: { type: e, definition: t },
      });
    let n = lA((r) => Pr(r, t), {
      type: { value: e },
      name: { value: `is${e}` },
      array: {
        get: xa(() => {
          let r = C(`Array<${e}>`, (o) => Po(o) && o.every((i) => n(i)));
          return wa.set(r, t), r;
        }),
      },
      optional: {
        get: xa(() => {
          let r = C(`${e}?`, (o) => o === void 0 || n(o));
          return Ta.set(r, t), r;
        }),
      },
      dictionary: {
        get: xa(() => {
          let r = C(
            `Record<string, ${e}>`,
            (o) => En(o) && sA(o).every(([i, s]) => _n(i) && n(s)),
          );
          return r0.set(r, t), r;
        }),
      },
      definition: { get: () => o0(t) },
    });
    return n;
  }
  var Na = {
    enum: (...e) => new Xn(e),
    some: (...e) => {
      let t = new Jn();
      for (let n of e) for (let r of sn(n) ? [...n] : [n]) t.add(r);
      return t;
    },
    every: (...e) => {
      let t = new er();
      for (let n of e) for (let r of ln(n) ? [...n] : [n]) t.add(r);
      return t;
    },
  };
  var aA = Object.keys,
    Aa = (e, t = '', n = []) => [...uA(e, t, n)].join('').trim(),
    uA = function* (e, t, n) {
      if (n.includes(e))
        yield `${t}(circular)
`;
      else if (Do(e))
        yield `${t}${e.type}
`;
      else if (ls(e)) yield `${t}${e.toString()}`;
      else if (tr(e))
        yield `${t}${[...e].map((r) => JSON.stringify(r)).join('|')}`;
      else if (sn(e)) yield* l0(e, t, n, 'Some');
      else if (ln(e)) yield* l0(e, t, n, 'Every');
      else {
        yield `${t}{
`;
        let r = `${t}  `;
        for (let o of aA(e))
          yield `${r}${String(o)}: ${Aa(e[o], r, a0(n, e))},
`;
        yield `${t}}
`;
      }
    },
    a0 = (e, t) => {
      let n = e.slice();
      return (n[n.length] = t), n;
    },
    l0 = function* (e, t, n, r, o = '{', i = '}') {
      yield `${t}${r} ${o}
`;
      let s = `${t}  `,
        l = a0(n, e);
      for (let a of e)
        yield `${s}${Aa(a, s, l)},
`;
      yield `${t}${i}
`;
    };
  var cA = Object.keys,
    od = (e) =>
      [
        `${e.path}: ${e.message}`,
        `actual: ${JSON.stringify(e.input, null, 2)}`,
        `expected: ${Aa(e.definition)}`,
      ].join(`
`),
    fA = (e, t, n) =>
      t(e)
        ? null
        : {
            input: e,
            definition: t,
            path: n,
            message: `The input doesn't pass the test (${t.name}).`,
          },
    dA = (e, t, n) => {
      for (let r of t) if (r === e) return null;
      return {
        input: e,
        definition: t,
        path: n,
        message: `The input (${e}) isn't in enum (${[...t].join(', ')}).`,
      };
    },
    pA = (e, t, n) => {
      let r = [];
      for (let o of t) {
        let i = Or(e, o, n);
        if (!i) return null;
        r.push(i);
      }
      return {
        input: e,
        definition: t,
        path: n,
        message: `The input doesn't pass any tests.
${r.map(od).join(`
`)}`,
      };
    },
    hA = (e, t, n) => {
      let r = 0;
      for (let o of t) {
        let i = Or(e, o, n);
        if (i)
          return {
            input: e,
            definition: t,
            path: n,
            message: `#${r} definition returned an error.
${od(i)}`,
          };
        r++;
      }
      return null;
    },
    mA = (e, t, n) => {
      if (!En(e))
        return {
          input: e,
          definition: t,
          path: n,
          message: 'The input is not a map.',
        };
      for (let r of cA(t)) {
        let o = Or(e[String(r)], t[r], `${n}.${r}`);
        if (o) return o;
      }
      return null;
    },
    vA = (e, t, n) => {
      let { length: r } = e;
      for (let o = 0; o < r; o++) {
        let i = Or(e[o], t, `${n}.${o}`);
        if (i) return i;
      }
      return null;
    },
    yA = (e, t, n) => {
      let r = wa.get(t);
      return r
        ? Po(e)
          ? vA(e, r, n)
          : {
              input: e,
              definition: r,
              path: n,
              message: 'The input is not an array.',
            }
        : ((r = Ta.get(t)),
          r ? (e === void 0 ? null : Or(e, r, n)) : Or(e, t.definition, n));
    },
    gA = (e, t, n) =>
      _n(e)
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
    Or = (e, t, n) =>
      n
        ? Do(t)
          ? yA(e, t, n)
          : Oo(t)
          ? gA(e, t, n)
          : ls(t)
          ? fA(e, t, n)
          : tr(t)
          ? dA(e, t, n)
          : sn(t)
          ? pA(e, t, n)
          : ln(t)
          ? hA(e, t, n)
          : mA(e, t, n)
        : {
            input: e,
            definition: t,
            path: n,
            message: 'The type has no path.',
          };
  function u0(e, t, n) {
    if (Pr(e, t)) return e;
    if (n === void 0) {
      let r = Or(e, t, '_') || {
        input: e,
        definition: t,
        path: '_',
        message: "The input doesn't match to the definition.",
      };
      throw new Ir({
        code: 'TypeCheckError',
        message: `TypeCheckError: ${od(r)}`,
        data: r,
      });
    }
    return n;
  }
  var Pt = (
    (e) => (t) =>
      e.call(t).slice(8, -1)
  )(Object.prototype.toString);
  var { keys: BL, values: jL, entries: HL } = Object;
  var sd = function* (e, t = 0) {
      let n = t,
        r = 0,
        o = 0;
      for (let i of nr(e, t))
        if (Lr(i)) {
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
    c0 = (e, t = 0) => {
      let n = [];
      for (let r of sd(e, t))
        if (n.push(r.value) === 4) return { octets: n, start: t, end: r.end };
      throw new Error(`InvalidIpv4Address: ${e.substr(t, 15)}`);
    };
  var RA = (e) => (e <= 57 ? e - 48 : e <= 70 ? 10 + e - 65 : 10 + e - 97),
    xA = function* (e, t = 0) {
      let n = t,
        r = 0,
        o = 0;
      for (let i of nr(e, t))
        if (s0(i)) {
          if (((o = o * 16 + RA(i)), (r += 1), 4 < r))
            throw new Error(`InvalidIpv6Group: ${e.substr(n, r)}`);
        } else if (i === 46) {
          r = o = 0;
          let s = 0;
          for (let l of sd(e, n))
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
    f0 = (e, t = 0) => {
      let n = [],
        r = -1,
        o = t;
      for (let s of xA(e, t)) {
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
  var ld = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    JL = C('CapitalLatinString', new RegExp(`^[${ld}]*$`));
  var d0 = 'abcdefghijklmnopqrstuvwxyz',
    nI = C('SmallLatinString', /^[a-z]*$/);
  var ad = `${d0}${ld}`,
    lI = C('LatinString', new RegExp(`^[${ad}]*$`));
  var ud = '0123456789',
    cI = C('NumberString', new RegExp(`^[${ud}]*$`));
  var NA = `${ad}${ud}`,
    mI = C('AlphaNumericString', new RegExp(`^[${NA}]*$`));
  var SI = C('Array', Po);
  var wI = C('Base64String', /^[A-Za-z0-9+/]+=*$/);
  var xI = C('Base64UrlString', /^[A-Za-z0-9\-_]+=*$/);
  var CI = C('Boolean', (e) => typeof e == 'boolean');
  var II = C('CapitalHexString', /^[0-9A-F]*$/);
  var we = C('String', _n);
  var Ca = C('Domain', (e) => {
    if (!we(e)) return !1;
    let t = 45,
      n = !1,
      r = 1;
    for (let o of nr(e)) {
      if (o === 46) {
        if (!n || t === 45) return !1;
        (n = !1), (r += 1);
      } else if (Ra(o)) n = !0;
      else if (o !== 45 && !Lr(o)) return !1;
      t = o;
    }
    return t === 46 || t === 45 ? !1 : 1 < r;
  });
  var WA = new Set([
      33, 35, 36, 37, 38, 39, 42, 43, 45, 47, 61, 63, 94, 95, 96, 123, 124, 125,
      126,
    ]),
    GA = (e) => Ra(e) || i0(e) || Lr(e) || WA.has(e),
    p0 = C('EmailAddressLocalPart', (e) => {
      if (!we(e)) return !1;
      let { length: t } = e;
      if (t === 0 || 64 < t) return !1;
      let n = 46;
      for (let r of nr(e)) {
        if (r === 46) {
          if (n === 46) return !1;
        } else if (!GA(r)) return !1;
        n = r;
      }
      return n !== 46;
    });
  var QI = C('EmailAddress', (e) => {
    if (!we(e) || 254 < e.length) return !1;
    let t = e.lastIndexOf('@');
    return t < 1 ? !1 : p0(e.slice(0, t)) && Ca(e.slice(t + 1));
  });
  var Ke = C('FiniteNumber', Number.isFinite);
  var h0 = C('Function', (e) => typeof e == 'function');
  var n2 = C(
    'HttpMethod',
    Na.enum(
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
  var KA = {
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
    s2 = C('HttpResponseStatusCode', Na.enum(...Object.values(KA)));
  var m0 = C('Ipv4Address', (e) => {
    if (we(e))
      try {
        return c0(e).end === e.length;
      } catch {}
    return !1;
  });
  var v0 = C('Ipv6Address', (e) => {
    if (we(e))
      try {
        return f0(e).end === e.length;
      } catch {}
    return !1;
  });
  var y0 = C('Domain', (e) => {
    if (!we(e)) return !1;
    if (e.startsWith('[')) {
      let r = e.indexOf(']');
      if (r < 0 || !v0(e.slice(1, r))) return !1;
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
    return Ca(n) || m0(n);
  });
  var x2 = C('HttpsUrlString', (e) => {
    if (we(e) && e.startsWith('https://')) {
      let t = e.indexOf('/', 8);
      return (
        t < 0 && (t = e.length),
        y0(e.slice(8, t)) ? !e.slice(t).includes(' ') : !1
      );
    }
    return !1;
  });
  var k2 = C('NegativeFiniteNumber', (e) => Ke(e) && e < 0);
  var rr = C('SafeInteger', Number.isSafeInteger);
  var M2 = C('NegativeSafeInteger', (e) => rr(e) && e < 0);
  var U2 = C('NonNegativeFiniteNumber', (e) => Ke(e) && 0 <= e);
  var j2 = C('NonNegativeSafeInteger', (e) => rr(e) && 0 <= e);
  var K2 = C('NonPositiveFiniteNumber', (e) => Ke(e) && e <= 0);
  var q2 = C('NonPositiveSafeInteger', (e) => rr(e) && e <= 0);
  var eP = C('Null', (e) => e === null);
  var oP = C('Object', En);
  var aP = C('PositiveFiniteNumber', (e) => Ke(e) && 0 < e);
  var dP = C('PositiveSafeInteger', (e) => rr(e) && 0 < e);
  var mP = C('SmallHexString', /^[0-9a-f]*$/);
  var SP = C('Uint8Array', (e) => Pt(e) === 'Uint8Array'),
    _P = C('Uint8ClampedArray', (e) => Pt(e) === 'Uint8ClampedArray'),
    EP = C('Uint16Array', (e) => Pt(e) === 'Uint16Array'),
    wP = C('Uint32Array', (e) => Pt(e) === 'Uint32Array'),
    TP = C('Int8Array', (e) => Pt(e) === 'Int8Array'),
    RP = C('Int16Array', (e) => Pt(e) === 'Int16Array'),
    xP = C('Int32Array', (e) => Pt(e) === 'Int32Array'),
    NP = C('Float32Array', (e) => Pt(e) === 'Float32Array'),
    AP = C('Float64Array', (e) => Pt(e) === 'Float64Array'),
    CP = C('BigUint64Array', (e) => Pt(e) === 'BigUint64Array'),
    kP = C(
      'BigInt64Array',
      (e) =>
        Pt(e) ===
        'B\
igInt64Array',
    );
  var QA = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    OP = C('UUID', (e) => we(e) && QA.test(e));
  var VP = C('Undefined', (e) => typeof e > 'u');
  var {
      prototype: { toString: YA },
    } = Object,
    ZA = C('Date', (e) => YA.call(e) === '[object Date]'),
    UP = C('ValidDate', (e) => ZA(e) && 0 < e.getTime());
  var qA = C('Marker', { pitch: Ke, yaw: Ke, text: we, id: we }),
    XA = C('ViewerConfig', {
      path: we,
      title: we,
      author: we.optional,
      markers: qA.array,
      latitude: Ke.optional,
      longitude: Ke.optional,
      altitude: Ke.optional,
      initPitch: Ke,
      initYaw: Ke,
    }),
    g0 = 'script#viewer-config',
    S0 = document.querySelector(g0);
  if (!S0) throw new Error(`NoSuchNode: ${g0}`);
  var Vo = u0(JSON.parse(`${S0.textContent}`), XA);
  var Qe = function () {
    return (
      (Qe =
        Object.assign ||
        function (t) {
          for (var n, r = 1, o = arguments.length; r < o; r++) {
            n = arguments[r];
            for (var i in n)
              Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
          }
          return t;
        }),
      Qe.apply(this, arguments)
    );
  };
  function as(e, t, n) {
    if (n || arguments.length === 2)
      for (var r = 0, o = t.length, i; r < o; r++)
        (i || !(r in t)) &&
          (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]));
    return e.concat(i || Array.prototype.slice.call(t));
  }
  var ke = fe(Tt()),
    J0 = fe(E0());
  var ae = '-ms-',
    Dr = '-moz-',
    re = '-webkit-',
    ka = 'comm',
    or = 'rule',
    $o = 'decl';
  var w0 = '@import';
  var La = '@keyframes';
  var T0 = '@layer';
  var R0 = Math.abs,
    us = String.fromCharCode,
    cs = Object.assign;
  function x0(e, t) {
    return Ae(e, 0) ^ 45
      ? (((((((t << 2) ^ Ae(e, 0)) << 2) ^ Ae(e, 1)) << 2) ^ Ae(e, 2)) << 2) ^
          Ae(e, 3)
      : 0;
  }
  function Ia(e) {
    return e.trim();
  }
  function Qt(e, t) {
    return (e = t.exec(e)) ? e[0] : e;
  }
  function G(e, t, n) {
    return e.replace(t, n);
  }
  function bo(e, t) {
    return e.indexOf(t);
  }
  function Ae(e, t) {
    return e.charCodeAt(t) | 0;
  }
  function an(e, t, n) {
    return e.slice(t, n);
  }
  function rt(e) {
    return e.length;
  }
  function Pa(e) {
    return e.length;
  }
  function Mr(e, t) {
    return t.push(e), e;
  }
  function N0(e, t) {
    return e.map(t).join('');
  }
  function cd(e, t) {
    return e.filter(function (n) {
      return !Qt(n, t);
    });
  }
  var Oa = 1,
    Uo = 1,
    A0 = 0,
    Ot = 0,
    Ie = 0,
    Fo = '';
  function fs(e, t, n, r, o, i, s, l) {
    return {
      value: e,
      root: t,
      parent: n,
      type: r,
      props: o,
      children: i,
      line: Oa,
      column: Uo,
      length: s,
      return: '',
      siblings: l,
    };
  }
  function wn(e, t) {
    return cs(
      fs('', null, null, '', null, null, 0, e.siblings),
      e,
      { length: -e.length },
      t,
    );
  }
  function Vr(e) {
    for (; e.root; ) e = wn(e.root, { children: [e] });
    Mr(e, e.siblings);
  }
  function C0() {
    return Ie;
  }
  function k0() {
    return (
      (Ie = Ot > 0 ? Ae(Fo, --Ot) : 0), Uo--, Ie === 10 && ((Uo = 1), Oa--), Ie
    );
  }
  function Dt() {
    return (
      (Ie = Ot < A0 ? Ae(Fo, Ot++) : 0), Uo++, Ie === 10 && ((Uo = 1), Oa++), Ie
    );
  }
  function ir() {
    return Ae(Fo, Ot);
  }
  function ds() {
    return Ot;
  }
  function Da(e, t) {
    return an(Fo, e, t);
  }
  function fd(e) {
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
  function L0(e) {
    return (Oa = Uo = 1), (A0 = rt((Fo = e))), (Ot = 0), [];
  }
  function I0(e) {
    return (Fo = ''), e;
  }
  function Ma(e) {
    return Ia(Da(Ot - 1, dd(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
  }
  function P0(e) {
    for (; (Ie = ir()) && Ie < 33; ) Dt();
    return fd(e) > 2 || fd(Ie) > 3 ? '' : ' ';
  }
  function O0(e, t) {
    for (
      ;
      --t &&
      Dt() &&
      !(Ie < 48 || Ie > 102 || (Ie > 57 && Ie < 65) || (Ie > 70 && Ie < 97));

    );
    return Da(e, ds() + (t < 6 && ir() == 32 && Dt() == 32));
  }
  function dd(e) {
    for (; Dt(); )
      switch (Ie) {
        case e:
          return Ot;
        case 34:
        case 39:
          e !== 34 && e !== 39 && dd(Ie);
          break;
        case 40:
          e === 41 && dd(e);
          break;
        case 92:
          Dt();
          break;
      }
    return Ot;
  }
  function D0(e, t) {
    for (; Dt() && e + Ie !== 47 + 10; )
      if (e + Ie === 42 + 42 && ir() === 47) break;
    return '/*' + Da(t, Ot - 1) + '*' + us(e === 47 ? e : Dt());
  }
  function M0(e) {
    for (; !fd(ir()); ) Dt();
    return Da(e, Ot);
  }
  function b0(e) {
    return I0(Va('', null, null, null, [''], (e = L0(e)), 0, [0], e));
  }
  function Va(e, t, n, r, o, i, s, l, a) {
    for (
      var u = 0,
        f = 0,
        p = s,
        m = 0,
        S = 0,
        y = 0,
        w = 1,
        b = 1,
        h = 1,
        c = 0,
        d = '',
        E = o,
        R = i,
        x = r,
        T = d;
      b;

    )
      switch (((y = c), (c = Dt()))) {
        case 40:
          if (y != 108 && Ae(T, p - 1) == 58) {
            bo((T += G(Ma(c), '&', '&\f')), '&\f') != -1 && (h = -1);
            break;
          }
        case 34:
        case 39:
        case 91:
          T += Ma(c);
          break;
        case 9:
        case 10:
        case 13:
        case 32:
          T += P0(y);
          break;
        case 92:
          T += O0(ds() - 1, 7);
          continue;
        case 47:
          switch (ir()) {
            case 42:
            case 47:
              Mr(JA(D0(Dt(), ds()), t, n, a), a);
              break;
            default:
              T += '/';
          }
          break;
        case 123 * w:
          l[u++] = rt(T) * h;
        case 125 * w:
        case 59:
        case 0:
          switch (c) {
            case 0:
            case 125:
              b = 0;
            case 59 + f:
              h == -1 && (T = G(T, /\f/g, '')),
                S > 0 &&
                  rt(T) - p &&
                  Mr(
                    S > 32
                      ? $0(T + ';', r, n, p - 1, a)
                      : $0(G(T, ' ', '') + ';', r, n, p - 2, a),
                    a,
                  );
              break;
            case 59:
              T += ';';
            default:
              if (
                (Mr(
                  (x = V0(T, t, n, u, f, o, l, d, (E = []), (R = []), p, i)),
                  i,
                ),
                c === 123)
              )
                if (f === 0) Va(T, t, x, x, E, i, p, l, R);
                else
                  switch (m === 99 && Ae(T, 3) === 110 ? 100 : m) {
                    case 100:
                    case 108:
                    case 109:
                    case 115:
                      Va(
                        e,
                        x,
                        x,
                        r &&
                          Mr(V0(e, x, x, 0, 0, o, l, d, o, (E = []), p, R), R),
                        o,
                        R,
                        p,
                        l,
                        r ? E : R,
                      );
                      break;
                    default:
                      Va(T, x, x, x, [''], R, 0, l, R);
                  }
          }
          (u = f = S = 0), (w = h = 1), (d = T = ''), (p = s);
          break;
        case 58:
          (p = 1 + rt(T)), (S = y);
        default:
          if (w < 1) {
            if (c == 123) --w;
            else if (c == 125 && w++ == 0 && k0() == 125) continue;
          }
          switch (((T += us(c)), c * w)) {
            case 38:
              h = f > 0 ? 1 : ((T += '\f'), -1);
              break;
            case 44:
              (l[u++] = (rt(T) - 1) * h), (h = 1);
              break;
            case 64:
              ir() === 45 && (T += Ma(Dt())),
                (m = ir()),
                (f = p = rt((d = T += M0(ds())))),
                c++;
              break;
            case 45:
              y === 45 && rt(T) == 2 && (w = 0);
          }
      }
    return i;
  }
  function V0(e, t, n, r, o, i, s, l, a, u, f, p) {
    for (
      var m = o - 1, S = o === 0 ? i : [''], y = Pa(S), w = 0, b = 0, h = 0;
      w < r;
      ++w
    )
      for (var c = 0, d = an(e, m + 1, (m = R0((b = s[w])))), E = e; c < y; ++c)
        (E = Ia(b > 0 ? S[c] + ' ' + d : G(d, /&\f/g, S[c]))) && (a[h++] = E);
    return fs(e, t, n, o === 0 ? or : l, a, u, f, p);
  }
  function JA(e, t, n, r) {
    return fs(e, t, n, ka, us(C0()), an(e, 2, -2), 0, r);
  }
  function $0(e, t, n, r, o) {
    return fs(e, t, n, $o, an(e, 0, r), an(e, r + 1, -1), r, o);
  }
  function pd(e, t, n) {
    switch (x0(e, t)) {
      case 5103:
        return re + 'print-' + e + e;
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
        return re + e + e;
      case 4789:
        return Dr + e + e;
      case 5349:
      case 4246:
      case 4810:
      case 6968:
      case 2756:
        return re + e + Dr + e + ae + e + e;
      case 5936:
        switch (Ae(e, t + 11)) {
          case 114:
            return re + e + ae + G(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
          case 108:
            return re + e + ae + G(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
          case 45:
            return re + e + ae + G(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
        }
      case 6828:
      case 4268:
      case 2903:
        return re + e + ae + e + e;
      case 6165:
        return re + e + ae + 'flex-' + e + e;
      case 5187:
        return (
          re +
          e +
          G(e, /(\w+).+(:[^]+)/, re + 'box-$1$2' + ae + 'flex-$1$2') +
          e
        );
      case 5443:
        return (
          re +
          e +
          ae +
          'flex-item-' +
          G(e, /flex-|-self/g, '') +
          (Qt(e, /flex-|baseline/)
            ? ''
            : ae + 'grid-row-' + G(e, /flex-|-self/g, '')) +
          e
        );
      case 4675:
        return (
          re +
          e +
          ae +
          'flex-line-pack' +
          G(e, /align-content|flex-|-self/g, '') +
          e
        );
      case 5548:
        return re + e + ae + G(e, 'shrink', 'negative') + e;
      case 5292:
        return re + e + ae + G(e, 'basis', 'preferred-size') + e;
      case 6060:
        return (
          re +
          'box-' +
          G(e, '-grow', '') +
          re +
          e +
          ae +
          G(e, 'grow', 'positive') +
          e
        );
      case 4554:
        return re + G(e, /([^-])(transform)/g, '$1' + re + '$2') + e;
      case 6187:
        return (
          G(
            G(G(e, /(zoom-|grab)/, re + '$1'), /(image-set)/, re + '$1'),
            e,
            '',
          ) + e
        );
      case 5495:
      case 3959:
        return G(e, /(image-set\([^]*)/, re + '$1$`$1');
      case 4968:
        return (
          G(
            G(e, /(.+:)(flex-)?(.*)/, re + 'box-pack:$3' + ae + 'flex-pack:$3'),
            /s.+-b[^;]+/,
            'justify',
          ) +
          re +
          e +
          e
        );
      case 4200:
        if (!Qt(e, /flex-|baseline/))
          return ae + 'grid-column-align' + an(e, t) + e;
        break;
      case 2592:
      case 3360:
        return ae + G(e, 'template-', '') + e;
      case 4384:
      case 3616:
        return n &&
          n.some(function (r, o) {
            return (t = o), Qt(r.props, /grid-\w+-end/);
          })
          ? ~bo(e + (n = n[t].value), 'span')
            ? e
            : ae +
              G(e, '-start', '') +
              e +
              ae +
              'grid-row-span:' +
              (~bo(n, 'span') ? Qt(n, /\d+/) : +Qt(n, /\d+/) - +Qt(e, /\d+/)) +
              ';'
          : ae + G(e, '-start', '') + e;
      case 4896:
      case 4128:
        return n &&
          n.some(function (r) {
            return Qt(r.props, /grid-\w+-start/);
          })
          ? e
          : ae + G(G(e, '-end', '-span'), 'span ', '') + e;
      case 4095:
      case 3583:
      case 4068:
      case 2532:
        return G(e, /(.+)-inline(.+)/, re + '$1$2') + e;
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
        if (rt(e) - 1 - t > 6)
          switch (Ae(e, t + 1)) {
            case 109:
              if (Ae(e, t + 4) !== 45) break;
            case 102:
              return (
                G(
                  e,
                  /(.+:)(.+)-([^]+)/,
                  '$1' +
                    re +
                    '$2-$3$1' +
                    Dr +
                    (Ae(e, t + 3) == 108 ? '$3' : '$2-$3'),
                ) + e
              );
            case 115:
              return ~bo(e, 'stretch')
                ? pd(G(e, 'stretch', 'fill-available'), t, n) + e
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
              ae +
              o +
              ':' +
              i +
              u +
              (s ? ae + o + '-span:' + (l ? a : +a - +i) + u : '') +
              e
            );
          },
        );
      case 4949:
        if (Ae(e, t + 6) === 121) return G(e, ':', ':' + re) + e;
        break;
      case 6444:
        switch (Ae(e, Ae(e, 14) === 45 ? 18 : 11)) {
          case 120:
            return (
              G(
                e,
                /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,
                '$1' +
                  re +
                  (Ae(e, 14) === 45 ? 'inline-' : '') +
                  'box$3$1' +
                  re +
                  '$2$3$1' +
                  ae +
                  '$2box$3',
              ) + e
            );
          case 100:
            return G(e, ':', ':' + ae) + e;
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
  function zo(e, t) {
    for (var n = '', r = 0; r < e.length; r++) n += t(e[r], r, e, t) || '';
    return n;
  }
  function U0(e, t, n, r) {
    switch (e.type) {
      case T0:
        if (e.children.length) break;
      case w0:
      case $o:
        return (e.return = e.return || e.value);
      case ka:
        return '';
      case La:
        return (e.return = e.value + '{' + zo(e.children, r) + '}');
      case or:
        if (!rt((e.value = e.props.join(',')))) return '';
    }
    return rt((n = zo(e.children, r)))
      ? (e.return = e.value + '{' + n + '}')
      : '';
  }
  function F0(e) {
    var t = Pa(e);
    return function (n, r, o, i) {
      for (var s = '', l = 0; l < t; l++) s += e[l](n, r, o, i) || '';
      return s;
    };
  }
  function z0(e) {
    return function (t) {
      t.root || ((t = t.return) && e(t));
    };
  }
  function B0(e, t, n, r) {
    if (e.length > -1 && !e.return)
      switch (e.type) {
        case $o:
          e.return = pd(e.value, e.length, n);
          return;
        case La:
          return zo([wn(e, { value: G(e.value, '@', '@' + re) })], r);
        case or:
          if (e.length)
            return N0((n = e.props), function (o) {
              switch (Qt(o, (r = /(::plac\w+|:read-\w+)/))) {
                case ':read-only':
                case ':read-write':
                  Vr(
                    wn(e, {
                      props: [
                        G(
                          o,
                          /:(read-\w+)/,
                          '\
:' +
                            Dr +
                            '$1',
                        ),
                      ],
                    }),
                  ),
                    Vr(wn(e, { props: [o] })),
                    cs(e, { props: cd(n, r) });
                  break;
                case '::placeholder':
                  Vr(
                    wn(e, {
                      props: [G(o, /:(plac\w+)/, ':' + re + 'input-$1')],
                    }),
                  ),
                    Vr(wn(e, { props: [G(o, /:(plac\w+)/, ':' + Dr + '$1')] })),
                    Vr(wn(e, { props: [G(o, /:(plac\w+)/, ae + 'input-$1')] })),
                    Vr(wn(e, { props: [o] })),
                    cs(e, { props: cd(n, r) });
                  break;
              }
              return '';
            });
      }
  }
  var j0 = {
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
  var Rn =
    (typeof process < 'u' &&
      process.env !== void 0 &&
      (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR)) ||
    'data-styled';
  var Rd = typeof window < 'u' && 'HTMLElement' in window,
    eC = !!(typeof SC_DISABLE_SPEEDY == 'boolean'
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
  var za = Object.freeze([]),
    jo = Object.freeze({});
  function tC(e, t, n) {
    return (
      n === void 0 && (n = jo), (e.theme !== n.theme && e.theme) || t || n.theme
    );
  }
  var eg = new Set([
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
    nC = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,
    rC = /(^-|-$)/g;
  function H0(e) {
    return e.replace(nC, '-').replace(rC, '');
  }
  var oC = /(a)(d)/gi,
    W0 = function (e) {
      return String.fromCharCode(e + (e > 25 ? 39 : 97));
    };
  function gd(e) {
    var t,
      n = '';
    for (t = Math.abs(e); t > 52; t = (t / 52) | 0) n = W0(t % 52) + n;
    return (W0(t % 52) + n).replace(oC, '$1-$2');
  }
  var hd,
    Bo = function (e, t) {
      for (var n = t.length; n; ) e = (33 * e) ^ t.charCodeAt(--n);
      return e;
    },
    tg = function (e) {
      return Bo(5381, e);
    };
  function iC(e) {
    return gd(tg(e) >>> 0);
  }
  function sC(e) {
    return e.displayName || e.name || 'Component';
  }
  function md(e) {
    return typeof e == 'string' && !0;
  }
  var ng = typeof Symbol == 'function' && Symbol.for,
    rg = ng ? Symbol.for('react.memo') : 60115,
    lC = ng ? Symbol.for('react.forward_ref') : 60112,
    aC = {
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
    uC = {
      name: !0,
      length: !0,
      prototype: !0,
      caller: !0,
      callee: !0,
      arguments: !0,
      arity: !0,
    },
    og = {
      $$typeof: !0,
      compare: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
      type: !0,
    },
    cC =
      (((hd = {})[lC] = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
      }),
      (hd[rg] = og),
      hd);
  function G0(e) {
    return ('type' in (t = e) && t.type.$$typeof) === rg
      ? og
      : '$$typeof' in e
      ? cC[e.$$typeof]
      : aC;
    var t;
  }
  var fC = Object.defineProperty,
    dC = Object.getOwnPropertyNames,
    K0 = Object.getOwnPropertySymbols,
    pC = Object.getOwnPropertyDescriptor,
    hC = Object.getPrototypeOf,
    Q0 = Object.prototype;
  function ig(e, t, n) {
    if (typeof t != 'string') {
      if (Q0) {
        var r = hC(t);
        r && r !== Q0 && ig(e, r, n);
      }
      var o = dC(t);
      K0 && (o = o.concat(K0(t)));
      for (var i = G0(e), s = G0(t), l = 0; l < o.length; ++l) {
        var a = o[l];
        if (!(a in uC || (n && n[a]) || (s && a in s) || (i && a in i))) {
          var u = pC(t, a);
          try {
            fC(e, a, u);
          } catch {}
        }
      }
    }
    return e;
  }
  function Ho(e) {
    return typeof e == 'function';
  }
  function xd(e) {
    return typeof e == 'object' && 'styledComponentId' in e;
  }
  function $r(e, t) {
    return e && t ? ''.concat(e, ' ').concat(t) : e || t || '';
  }
  function Ua(e, t) {
    if (e.length === 0) return '';
    for (var n = e[0], r = 1; r < e.length; r++) n += t ? t + e[r] : e[r];
    return n;
  }
  function ps(e) {
    return (
      e !== null &&
      typeof e == 'object' &&
      e.constructor.name === Object.name &&
      !('props' in e && e.$$typeof)
    );
  }
  function Sd(e, t, n) {
    if ((n === void 0 && (n = !1), !n && !ps(e) && !Array.isArray(e))) return t;
    if (Array.isArray(t))
      for (var r = 0; r < t.length; r++) e[r] = Sd(e[r], t[r]);
    else if (ps(t)) for (var r in t) e[r] = Sd(e[r], t[r]);
    return e;
  }
  function Nd(e, t) {
    Object.defineProperty(e, 'toString', { value: t });
  }
  function Tn(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    return new Error(
      'An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#'
        .concat(e, ' for more information.')
        .concat(t.length > 0 ? ' Args: '.concat(t.join(', ')) : ''),
    );
  }
  var mC = (function () {
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
              if ((i <<= 1) < 0) throw Tn(16, ''.concat(t));
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
    ba = new Map(),
    Fa = new Map(),
    vd = 1,
    $a = function (e) {
      if (ba.has(e)) return ba.get(e);
      for (; Fa.has(vd); ) vd++;
      var t = vd++;
      return ba.set(e, t), Fa.set(t, e), t;
    },
    vC = function (e, t) {
      ba.set(e, t), Fa.set(t, e);
    },
    yC = 'style['
      .concat(Rn, '][')
      .concat('data-styled-version', '="')
      .concat('6.0.7', '"]'),
    gC = new RegExp(
      '^'.concat(Rn, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),
    ),
    SC = function (e, t, n) {
      for (var r, o = n.split(','), i = 0, s = o.length; i < s; i++)
        (r = o[i]) && e.registerName(t, r);
    },
    _C = function (e, t) {
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
          var a = l.match(gC);
          if (a) {
            var u = 0 | parseInt(a[1], 10),
              f = a[2];
            u !== 0 && (vC(f, u), SC(e, f, a[3]), e.getTag().insertRules(u, o)),
              (o.length = 0);
          } else o.push(l);
        }
      }
    };
  function _d() {
    return typeof __webpack_nonce__ < 'u' ? __webpack_nonce__ : null;
  }
  var sg = function (e) {
      var t = document.head,
        n = e || t,
        r = document.createElement('style'),
        o = (function (l) {
          var a = Array.from(l.querySelectorAll('style['.concat(Rn, ']')));
          return a[a.length - 1];
        })(n),
        i = o !== void 0 ? o.nextSibling : null;
      r.setAttribute(Rn, 'active'),
        r.setAttribute('data-styled-version', '6.0.7');
      var s = _d();
      return s && r.setAttribute('nonce', s), n.insertBefore(r, i), r;
    },
    EC = (function () {
      function e(t) {
        (this.element = sg(t)),
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
            throw Tn(17);
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
    wC = (function () {
      function e(t) {
        (this.element = sg(t)),
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
    TC = (function () {
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
    Y0 = Rd,
    RC = { isServer: !Rd, useCSSOMInjection: !eC },
    hs = (function () {
      function e(t, n, r) {
        t === void 0 && (t = jo), n === void 0 && (n = {});
        var o = this;
        (this.options = Qe(Qe({}, RC), t)),
          (this.gs = n),
          (this.names = new Map(r)),
          (this.server = !!t.isServer),
          !this.server &&
            Rd &&
            Y0 &&
            ((Y0 = !1),
            (function (i) {
              for (
                var s = document.querySelectorAll(yC), l = 0, a = s.length;
                l < a;
                l++
              ) {
                var u = s[l];
                u &&
                  u.getAttribute(Rn) !== 'active' &&
                  (_C(i, u), u.parentNode && u.parentNode.removeChild(u));
              }
            })(this)),
          Nd(this, function () {
            return (function (i) {
              for (
                var s = i.getTag(),
                  l = s.length,
                  a = '',
                  u = function (p) {
                    var m = (function (h) {
                      return Fa.get(h);
                    })(p);
                    if (m === void 0) return 'continue';
                    var S = i.names.get(m),
                      y = s.getGroup(p);
                    if (S === void 0 || y.length === 0) return 'continue';
                    var w = ''
                        .concat(Rn, '.g')
                        .concat(p, '[id="')
                        .concat(m, '"]'),
                      b = '';
                    S !== void 0 &&
                      S.forEach(function (h) {
                        h.length > 0 && (b += ''.concat(h, ','));
                      }),
                      (a += ''.concat(y).concat(w, '{content:"').concat(b, '"}')
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
          return $a(t);
        }),
        (e.prototype.reconstructWithOptions = function (t, n) {
          return (
            n === void 0 && (n = !0),
            new e(
              Qe(Qe({}, this.options), t),
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
                return n.isServer ? new TC(o) : r ? new EC(o) : new wC(o);
              })(this.options)),
              new mC(t)))
          );
          var t;
        }),
        (e.prototype.hasNameForId = function (t, n) {
          return this.names.has(t) && this.names.get(t).has(n);
        }),
        (e.prototype.registerName = function (t, n) {
          if (($a(t), this.names.has(t))) this.names.get(t).add(n);
          else {
            var r = new Set();
            r.add(n), this.names.set(t, r);
          }
        }),
        (e.prototype.insertRules = function (t, n, r) {
          this.registerName(t, n), this.getTag().insertRules($a(t), r);
        }),
        (e.prototype.clearNames = function (t) {
          this.names.has(t) && this.names.get(t).clear();
        }),
        (e.prototype.clearRules = function (t) {
          this.getTag().clearGroup($a(t)), this.clearNames(t);
        }),
        (e.prototype.clearTag = function () {
          this.tag = void 0;
        }),
        e
      );
    })(),
    xC = /&/g,
    NC = /^\s*\/\/.*$/gm;
  function lg(e, t) {
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
          (n.children = lg(n.children, t)),
        n
      );
    });
  }
  function ag(e) {
    var t,
      n,
      r,
      o = e === void 0 ? jo : e,
      i = o.options,
      s = i === void 0 ? jo : i,
      l = o.plugins,
      a = l === void 0 ? za : l,
      u = function (m, S, y) {
        return y === n ||
          (y.startsWith(n) && y.endsWith(n) && y.replaceAll(n, '').length > 0)
          ? '.'.concat(t)
          : m;
      },
      f = a.slice();
    f.push(function (m) {
      m.type === or &&
        m.value.includes('&') &&
        (m.props[0] = m.props[0].replace(xC, n).replace(r, u));
    }),
      s.prefix && f.push(B0),
      f.push(U0);
    var p = function (m, S, y, w) {
      S === void 0 && (S = ''),
        y === void 0 && (y = ''),
        w === void 0 && (w = '&'),
        (t = w),
        (n = S),
        (r = new RegExp('\\'.concat(n, '\\b'), 'g'));
      var b = m.replace(NC, ''),
        h = b0(y || S ? ''.concat(y, ' ').concat(S, ' { ').concat(b, ' }') : b);
      s.namespace && (h = lg(h, s.namespace));
      var c = [];
      return (
        zo(
          h,
          F0(
            f.concat(
              z0(function (d) {
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
              return S.name || Tn(15), Bo(m, S.name);
            }, 5381)
            .toString()
        : ''),
      p
    );
  }
  var AC = new hs(),
    Ed = ag(),
    Ad = ke.default.createContext({
      shouldForwardProp: void 0,
      styleSheet: AC,
      stylis: Ed,
    }),
    ED = Ad.Consumer,
    CC = ke.default.createContext(void 0);
  function wd() {
    return (0, ke.useContext)(Ad);
  }
  function kC(e) {
    var t = (0, ke.useState)(e.stylisPlugins),
      n = t[0],
      r = t[1],
      o = wd().styleSheet,
      i = (0, ke.useMemo)(
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
      s = (0, ke.useMemo)(
        function () {
          return ag({
            options: { namespace: e.namespace, prefix: e.enableVendorPrefixes },
            plugins: n,
          });
        },
        [e.enableVendorPrefixes, e.namespace, n],
      );
    return (
      (0, ke.useEffect)(
        function () {
          (0, J0.default)(n, e.stylisPlugins) || r(e.stylisPlugins);
        },
        [e.stylisPlugins],
      ),
      ke.default.createElement(
        Ad.Provider,
        {
          value: {
            shouldForwardProp: e.shouldForwardProp,
            styleSheet: i,
            stylis: s,
          },
        },
        ke.default.createElement(CC.Provider, { value: s }, e.children),
      )
    );
  }
  var LC = (function () {
      function e(t, n) {
        var r = this;
        (this.inject = function (o, i) {
          i === void 0 && (i = Ed);
          var s = r.name + i.hash;
          o.hasNameForId(r.id, s) ||
            o.insertRules(r.id, s, i(r.rules, s, '@keyframes'));
        }),
          (this.name = t),
          (this.id = 'sc-keyframes-'.concat(t)),
          (this.rules = n),
          Nd(this, function () {
            throw Tn(12, String(r.name));
          });
      }
      return (
        (e.prototype.getName = function (t) {
          return t === void 0 && (t = Ed), this.name + t.hash;
        }),
        e
      );
    })(),
    IC = function (e) {
      return e >= 'A' && e <= 'Z';
    };
  function Z0(e) {
    for (var t = '', n = 0; n < e.length; n++) {
      var r = e[n];
      if (n === 1 && r === '-' && e[0] === '-') return e;
      IC(r) ? (t += '-' + r.toLowerCase()) : (t += r);
    }
    return t.startsWith('ms-') ? '-' + t : t;
  }
  var ug = function (e) {
      return e == null || e === !1 || e === '';
    },
    cg = function (e) {
      var t,
        n,
        r = [];
      for (var o in e) {
        var i = e[o];
        e.hasOwnProperty(o) &&
          !ug(i) &&
          ((Array.isArray(i) && i.isCss) || Ho(i)
            ? r.push(''.concat(Z0(o), ':'), i, ';')
            : ps(i)
            ? r.push.apply(
                r,
                as(as([''.concat(o, ' {')], cg(i), !1), ['}'], !1),
              )
            : r.push(
                ''
                  .concat(Z0(o), ': ')
                  .concat(
                    ((t = o),
                    (n = i) == null || typeof n == 'boolean' || n === ''
                      ? ''
                      : typeof n != 'number' ||
                        n === 0 ||
                        t in j0 ||
                        t.startsWith('--')
                      ? String(n).trim()
                      : ''.concat(n, 'px')),
                    ';',
                  ),
              ));
      }
      return r;
    };
  function sr(e, t, n, r) {
    if (ug(e)) return [];
    if (xd(e)) return ['.'.concat(e.styledComponentId)];
    if (Ho(e)) {
      if (!Ho((i = e)) || (i.prototype && i.prototype.isReactComponent) || !t)
        return [e];
      var o = e(t);
      return sr(o, t, n, r);
    }
    var i;
    return e instanceof LC
      ? n
        ? (e.inject(n, r), [e.getName(r)])
        : [e]
      : ps(e)
      ? cg(e)
      : Array.isArray(e)
      ? Array.prototype.concat.apply(
          za,
          e.map(function (s) {
            return sr(s, t, n, r);
          }),
        )
      : [e.toString()];
  }
  function fg(e) {
    for (var t = 0; t < e.length; t += 1) {
      var n = e[t];
      if (Ho(n) && !xd(n)) return !1;
    }
    return !0;
  }
  var PC = tg('6.0.7'),
    OC = (function () {
      function e(t, n, r) {
        (this.rules = t),
          (this.staticRulesId = ''),
          (this.isStatic = (r === void 0 || r.isStatic) && fg(t)),
          (this.componentId = n),
          (this.baseHash = Bo(PC, n)),
          (this.baseStyle = r),
          hs.registerId(n);
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
              o = $r(o, this.staticRulesId);
            else {
              var i = Ua(sr(this.rules, t, n, r)),
                s = gd(Bo(this.baseHash, i) >>> 0);
              if (!n.hasNameForId(this.componentId, s)) {
                var l = r(i, '.'.concat(s), void 0, this.componentId);
                n.insertRules(this.componentId, s, l);
              }
              (o = $r(o, s)), (this.staticRulesId = s);
            }
          else {
            for (
              var a = Bo(this.baseHash, r.hash), u = '', f = 0;
              f < this.rules.length;
              f++
            ) {
              var p = this.rules[f];
              if (typeof p == 'string') u += p;
              else if (p) {
                var m = Ua(sr(p, t, n, r));
                (a = Bo(a, m)), (u += m);
              }
            }
            if (u) {
              var S = gd(a >>> 0);
              n.hasNameForId(this.componentId, S) ||
                n.insertRules(
                  this.componentId,
                  S,
                  r(u, '.'.concat(S), void 0, this.componentId),
                ),
                (o = $r(o, S));
            }
          }
          return o;
        }),
        e
      );
    })(),
    dg = ke.default.createContext(void 0),
    wD = dg.Consumer;
  var yd = {};
  function DC(e, t, n) {
    var r = xd(e),
      o = e,
      i = !md(e),
      s = t.attrs,
      l = s === void 0 ? za : s,
      a = t.componentId,
      u =
        a === void 0
          ? (function (E, R) {
              var x = typeof E != 'string' ? 'sc' : H0(E);
              yd[x] = (yd[x] || 0) + 1;
              var T = ''.concat(x, '-').concat(iC('6.0.7' + x + yd[x]));
              return R ? ''.concat(R, '-').concat(T) : T;
            })(t.displayName, t.parentComponentId)
          : a,
      f = t.displayName,
      p =
        f === void 0
          ? (function (E) {
              return md(E) ? 'styled.'.concat(E) : 'Styled('.concat(sC(E), ')');
            })(e)
          : f,
      m =
        t.displayName && t.componentId
          ? ''.concat(H0(t.displayName), '-').concat(t.componentId)
          : t.componentId || u,
      S = r && o.attrs ? o.attrs.concat(l).filter(Boolean) : l,
      y = t.shouldForwardProp;
    if (r && o.shouldForwardProp) {
      var w = o.shouldForwardProp;
      if (t.shouldForwardProp) {
        var b = t.shouldForwardProp;
        y = function (E, R) {
          return w(E, R) && b(E, R);
        };
      } else y = w;
    }
    var h = new OC(n, m, r ? o.componentStyle : void 0);
    function c(E, R) {
      return (function (x, T, O) {
        var te = x.attrs,
          V = x.componentStyle,
          ue = x.defaultProps,
          Mt = x.foldedComponentIds,
          Oe = x.styledComponentId,
          Ye = x.target,
          Nn = ke.default.useContext(dg),
          An = wd(),
          pt = x.shouldForwardProp || An.shouldForwardProp,
          Ze = (function (L, F, $) {
            for (
              var W, H = Qe(Qe({}, F), { className: void 0, theme: $ }), U = 0;
              U < L.length;
              U += 1
            ) {
              var ce = Ho((W = L[U])) ? W(H) : W;
              for (var oe in ce)
                H[oe] =
                  oe === 'className'
                    ? $r(H[oe], ce[oe])
                    : oe === 'style'
                    ? Qe(Qe({}, H[oe]), ce[oe])
                    : ce[oe];
            }
            return (
              F.className && (H.className = $r(H.className, F.className)), H
            );
          })(te, T, tC(T, Nn, ue) || jo),
          Vt = Ze.as || Ye,
          Z = {};
        for (var Y in Ze)
          Ze[Y] === void 0 ||
            Y[0] === '$' ||
            Y === 'as' ||
            Y === 'theme' ||
            (Y === 'forwardedAs'
              ? (Z.as = Ze.forwardedAs)
              : (pt && !pt(Y, Vt)) || (Z[Y] = Ze[Y]));
        var _ = (function (L, F) {
            var $ = wd(),
              W = L.generateAndInjectStyles(F, $.styleSheet, $.stylis);
            return W;
          })(V, Ze),
          k = $r(Mt, Oe);
        return (
          _ && (k += ' ' + _),
          Ze.className && (k += ' ' + Ze.className),
          (Z[md(Vt) && !eg.has(Vt) ? 'class' : 'className'] = k),
          (Z.ref = O),
          (0, ke.createElement)(Vt, Z)
        );
      })(d, E, R);
    }
    var d = ke.default.forwardRef(c);
    return (
      (d.attrs = S),
      (d.componentStyle = h),
      (d.shouldForwardProp = y),
      (d.foldedComponentIds = r
        ? $r(o.foldedComponentIds, o.styledComponentId)
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
                for (var O = 0, te = x; O < te.length; O++) Sd(R, te[O], !0);
                return R;
              })({}, o.defaultProps, E)
            : E;
        },
      }),
      Nd(d, function () {
        return '.'.concat(d.styledComponentId);
      }),
      i &&
        ig(d, e, {
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
  function q0(e, t) {
    for (var n = [e[0]], r = 0, o = t.length; r < o; r += 1)
      n.push(t[r], e[r + 1]);
    return n;
  }
  var X0 = function (e) {
    return Object.assign(e, {
      isCss: !0,
    });
  };
  function MC(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    if (Ho(e) || ps(e)) {
      var r = e;
      return X0(sr(q0(za, as([r], t, !0))));
    }
    var o = e;
    return t.length === 0 && o.length === 1 && typeof o[0] == 'string'
      ? sr(o)
      : X0(sr(q0(o, t)));
  }
  function Td(e, t, n) {
    if ((n === void 0 && (n = jo), !t)) throw Tn(1, t);
    var r = function (o) {
      for (var i = [], s = 1; s < arguments.length; s++)
        i[s - 1] = arguments[s];
      return e(t, n, MC.apply(void 0, as([o], i, !1)));
    };
    return (
      (r.attrs = function (o) {
        return Td(
          e,
          t,
          Qe(Qe({}, n), {
            attrs: Array.prototype.concat(n.attrs, o).filter(Boolean),
          }),
        );
      }),
      (r.withConfig = function (o) {
        return Td(e, t, Qe(Qe({}, n), o));
      }),
      r
    );
  }
  var pg = function (e) {
      return Td(DC, e);
    },
    Pe = pg;
  eg.forEach(function (e) {
    Pe[e] = pg(e);
  });
  var TD = (function () {
    function e(t, n) {
      (this.rules = t),
        (this.componentId = n),
        (this.isStatic = fg(t)),
        hs.registerId(this.componentId + 1);
    }
    return (
      (e.prototype.createStyles = function (t, n, r, o) {
        var i = o(Ua(sr(this.rules, n, r, o)), ''),
          s = this.componentId + t;
        r.insertRules(s, s, i);
      }),
      (e.prototype.removeStyles = function (t, n) {
        n.clearRules(this.componentId + t);
      }),
      (e.prototype.renderStyles = function (t, n, r, o) {
        t > 2 && hs.registerId(this.componentId + t),
          this.removeStyles(t, r),
          this.createStyles(t, n, r, o);
      }),
      e
    );
  })();
  var RD = (function () {
    function e() {
      var t = this;
      (this._emitSheetCSS = function () {
        var n = t.instance.toString(),
          r = _d(),
          o = Ua(
            [
              r && 'nonce="'.concat(r, '"'),
              ''.concat(Rn, '="true"'),
              ''.concat('data-styled-version', '="').concat('6.0.7', '"'),
            ].filter(Boolean),
            ' ',
          );
        return '<style '.concat(o, '>').concat(n, '</style>');
      }),
        (this.getStyleTags = function () {
          if (t.sealed) throw Tn(2);
          return t._emitSheetCSS();
        }),
        (this.getStyleElement = function () {
          var n;
          if (t.sealed) throw Tn(2);
          var r =
              (((n = {})[Rn] = ''),
              (n['data-styled-version'] = '6.0.7'),
              (n.dangerouslySetInnerHTML = { __html: t.instance.toString() }),
              n),
            o = _d();
          return (
            o && (r.nonce = o),
            [ke.default.createElement('style', Qe({}, r, { key: 'sc-0-0' }))]
          );
        }),
        (this.seal = function () {
          t.sealed = !0;
        }),
        (this.instance = new hs({ isServer: !0 })),
        (this.sealed = !1);
    }
    return (
      (e.prototype.collectStyles = function (t) {
        if (this.sealed) throw Tn(2);
        return ke.default.createElement(kC, { sheet: this.instance }, t);
      }),
      (e.prototype.interleaveWithNodeStream = function (t) {
        throw Tn(3);
      }),
      e
    );
  })();
  var xD = '__sc-'.concat(Rn, '__');
  var VC = () => new URLSearchParams(location.search),
    Wo = {
      boolean: (e, t = !1) => {
        let n = VC().get(e);
        return n === '1' ? !0 : n === '0' ? !1 : t;
      },
    };
  var hg = It({ key: 'ShowMenu', default: Wo.boolean('menu', !1) });
  var Ba = fe(Tt(), 1);
  var br = (e) => {
    let [t, n] = e0(e),
      r = (0, Ba.useCallback)(() => n((s) => !s), [n]),
      o = (0, Ba.useCallback)(() => n(!0), [n]),
      i = (0, Ba.useCallback)(() => n(!1), [n]);
    return { state: t, setTrue: o, setFalse: i, toggle: r };
  };
  var Go = fe(Tt(), 1);
  var _g = fe(ot(), 1),
    Cd = { width: 0, height: 0 },
    gg = {},
    Sg = ({ opened: e, children: t }) => {
      let [n, r] = (0, Go.useState)(null),
        [o, i] = (0, Go.useState)(e ? gg : Cd);
      return (
        (0, Go.useEffect)(() => {
          if (!n) return Io;
          let s = jC(n);
          if (
            (i({
              width: Math.max(n.scrollWidth, s.width),
              height: Math.min(n.scrollHeight, s.height),
            }),
            e)
          )
            return Io;
          let l = setTimeout(() => i(Cd), 10);
          return () => clearTimeout(l);
        }, [e, n]),
        (0, Go.useEffect)(() => {
          if (o === Cd) return Io;
          let s = setTimeout(() => i(gg), 300);
          return () => clearTimeout(s);
        }, [o]),
        (0, _g.jsx)(HC, {
          ref: r,
          style: o,
          className: e ? '' : 'closed',
          children: t,
        })
      );
    },
    jC = (e) => {
      let { style: t } = e,
        { width: n, height: r } = t;
      t.width = t.height = '';
      let o = e.getBoundingClientRect();
      return (t.width = n), (t.height = r), o;
    },
    HC = Pe.div`
  overflow: auto;
  transition-property: width, height, opacity;
  transition-timing-function: ease-in-out, ease-in-out, linear;
  transition-duration: 150ms, 150ms, 150ms;
  transition-delay: 0s, 0s, 150ms;
  opacity: 1;
  &.closed {
    transition-delay: 150ms, 150ms, 0s;
    opacity: 0;
  }
`;
  var Wa = fe(Tt(), 1);
  var lr = () => {
    let e = document.querySelector('main#panorama');
    if (!e) throw new Error('NoContainer: #panorama');
    return e;
  };
  var Eg = [],
    wg = h0(document.documentElement.requestFullscreen);
  wg &&
    Eg.push(({ onSet: e, setSelf: t }) => {
      e((r) => {
        r && !document.fullscreenElement
          ? lr().requestFullscreen().catch(alert)
          : document.fullscreenElement &&
            document.exitFullscreen().catch(alert);
      });
      let n = new AbortController();
      return (
        document.addEventListener(
          'fullscreenchange',
          () => t(!!document.fullscreenElement),
          { signal: n.signal },
        ),
        () => n.abort()
      );
    });
  var kd = Object.assign(It({ key: 'FullScreen', default: !1, effects: Eg }), {
    available: wg,
  });
  var Ko = It({ key: 'Markers', default: Vo.markers }),
    Tg = Jy({
      key: 'Marker',
      get:
        (e) =>
        ({ get: t }) => {
          let r = t(Ko).find((o) => o.id === e);
          if (!r) throw new Error(`NoSuchMarker:${e}`);
          return r;
        },
      set:
        (e) =>
        ({ set: t }, n) => {
          n instanceof qy ||
            t(Ko, (r) => {
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
  var Rg = It({ key: 'Orientation', default: !1 });
  var Ha = It({
    key: 'ShowMarkers',
    default: Wo.boolean('markers', !0),
    effects: [
      ({ onSet: e, getPromise: t }) => {
        let n = (r) => {
          let o = '.pnlm-render-container',
            i = lr().querySelector(o);
          i && (i.dataset.nomarker = r ? '0' : '1');
        };
        e(n), t(Ha).then(n).catch(alert);
      },
    ],
  });
  var Ld = It({
    key: 'VerticalMarker',
    default: Wo.boolean('vertical', !0),
    effects: [
      ({ onSet: e, getPromise: t }) => {
        let n = (r) => {
          let o = '.pnlm-render-container',
            i = lr().querySelector(o);
          i && (i.dataset.vertical = r ? '1' : '0');
        };
        e(n), t(Ld).then(n).catch(alert);
      },
    ],
  });
  var xg = fe(Tt(), 1),
    ms = (e) => {
      let t = (0, xg.useContext)(e);
      if (t === null)
        throw Object.assign(
          new Error(`${e.displayName || 'context'} is null`),
          { context: e },
        );
      return t;
    };
  var Id = Pe.button`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
  var Ng = fe(ot(), 1),
    vs = ({ state: e, ...t }) =>
      (0, Ng.jsx)(WC, { ...t, 'data-state': e ? '1' : '0' }),
    WC = Pe.button`
  --width: 48px;
  --height: 20px;
  --margin: 0px;
  --knobHeight: calc(var(--height) - 2 * var(--margin));
  --knobWidth: 32px;
  --col-on: #1fb917;
  width: var(--width);
  height: var(--height);
  border-radius: calc(var(--height) / 2);
  box-shadow:
    0 0 0 1.25px currentColor inset,
    0 0 2px 1.25px rgba(0, 0, 0, 0.5) inset;
  outline: 0;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0);
  }
  &:hover {
    &::before {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  &:active {
    &::before {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  &::after {
    content: 'OFF';
    position: absolute;
    display: grid;
    place-content: center;
    left: var(--margin);
    top: var(--margin);
    width: var(--knobWidth);
    height: var(--knobHeight);
    border-radius: calc(var(--knobHeight) / 2);
    color: var(--col-text);
    background-color: rgba(255, 255, 255, 1);
    transition-property: left;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
    font-size: 11px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }
  background-image: linear-gradient(0deg, var(--col-on), var(--col-on));
  background-size: 50% 100%;
  background-position: left center;
  &[data-state='1'] {
    &::after {
      content: 'ON';
      left: calc(var(--width) - var(--margin) - var(--knobWidth));
    }
  }
  &[disabled] {
    &::after {
      content: 'N/A';
    }
  }
`;
  var J = fe(ot(), 1),
    Ag = () =>
      (0, J.jsxs)(GC, {
        children: [
          (0, J.jsx)(QC, {}),
          (0, J.jsx)('hr', {}),
          (0, J.jsx)(XC, {}),
          (0, J.jsx)('hr', {}),
          (0, J.jsx)(KC, {
            href: '/',
            children: '\u4E00\u89A7\u306B\u623B\u308B',
          }),
        ],
      }),
    GC = Pe.section`
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
    KC = Pe.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`,
    QC = () => {
      let e = ss(Ko);
      return (0, J.jsx)(YC, {
        children: e.map((t, n) =>
          (0, J.jsxs)(
            Wa.Fragment,
            {
              children: [
                (0, J.jsxs)('div', { children: ['(', n + 1, ')'] }),
                (0, J.jsx)(ZC, { marker: t }),
                (0, J.jsx)(qC, { marker: t }),
              ],
            },
            t.id,
          ),
        ),
      });
    },
    YC = Pe.div`
  justify-self: stretch;
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  justify-items: start;
  align-items: center;
  column-gap: 6px;
`,
    ZC = ({ marker: e }) => {
      let t = ms(kr),
        { text: n, pitch: r, yaw: o, hfov: i } = e,
        s = (0, Wa.useCallback)(() => {
          t.lookAt(r, o, i || t.getHfov(), 600);
        }, [t, r, o]);
      return (0, J.jsx)(Id, { onClick: s, children: n });
    },
    qC = ({ marker: e }) => {
      let t = t0(
        ({ set: n }) =>
          () => {
            let r = prompt(
              '\u30C6\u30AD\u30B9\u30C8\u3092\u7DE8\u96C6\u3059\u308B\uFF08\u7A7A\u306B\u3059\u308B\u3068\u524A\u9664\u3057\u307E\u3059\uFF09',
              e.text,
            );
            we(r) && n(Tg(e.id), { ...e, text: r });
          },
        [e],
      );
      return (0, J.jsx)(Id, { onClick: t, children: '\u7DE8\u96C6' });
    },
    XC = () =>
      (0, J.jsxs)(JC, {
        children: [
          (0, J.jsx)(ek, {}),
          (0, J.jsx)(tk, {}),
          (0, J.jsx)(nk, {}),
          (0, J.jsx)(rk, {}),
        ],
      }),
    JC = Pe.div`
  justify-self: stretch;
  display: grid;
  grid-template-columns: 1fr max-content;
  justify-items: start;
  align-items: center;
  column-gap: 6px;
  row-gap: 6px;
`,
    Ga = Pe.label`
  cursor: pointer;
  user-select: none;
  &:hover {
    text-decoration: underline;
  }
`,
    ek = () => {
      let { state: e, toggle: t } = br(Ha),
        n = 'toggle-markers';
      return (0, J.jsxs)(J.Fragment, {
        children: [
          (0, J.jsx)(Ga, {
            htmlFor: n,
            children: '\u30DE\u30FC\u30AB\u30FC\u3092\u8868\u793A\u3059\u308B',
          }),
          (0, J.jsx)(vs, { id: n, state: e, onClick: t }),
        ],
      });
    },
    tk = () => {
      let e = ss(Ha),
        { state: t, toggle: n } = br(Ld),
        r = 'toggle-vertical-marker';
      return (0, J.jsxs)(J.Fragment, {
        children: [
          (0, J.jsx)(Ga, {
            htmlFor: r,
            children:
              '\u30DE\u30FC\u30AB\u30FC\u3092\u7E26\u66F8\u304D\u8868\u793A\u3059\u308B',
          }),
          (0, J.jsx)(vs, { id: r, state: t, onClick: n, disabled: !e }),
        ],
      });
    },
    nk = () => {
      let { state: e, toggle: t } = br(kd),
        n = 'toggle-fullscreen';
      return (0, J.jsxs)(J.Fragment, {
        children: [
          (0, J.jsx)(Ga, {
            htmlFor: n,
            children: '\u5168\u753B\u9762\u3067\u8868\u793A\u3059\u308B',
          }),
          (0, J.jsx)(vs, {
            id: n,
            state: e,
            onClick: t,
            disabled: !kd.available,
          }),
        ],
      });
    },
    rk = () => {
      let { state: e, toggle: t } = br(Rg),
        n = ms(kr),
        r = 'toggle-orientation';
      return (0, J.jsxs)(J.Fragment, {
        children: [
          (0, J.jsx)(Ga, {
            htmlFor: r,
            children:
              '\u52A0\u901F\u5EA6\u30BB\u30F3\u30B5\u30FC\u3067\u64CD\u4F5C\u3059\u308B',
          }),
          (0, J.jsx)(vs, {
            id: r,
            state: e,
            onClick: t,
            disabled: !n.isOrientationSupported(),
          }),
        ],
      });
    };
  var Yt = fe(ot(), 1),
    Cg = () => {
      let { state: e, toggle: t } = br(hg);
      return (0, Yt.jsxs)(ok, {
        children: [
          (0, Yt.jsxs)(ik, {
            children: [
              (0, Yt.jsx)(lk, { onClick: t }),
              (0, Yt.jsx)(sk, { children: Vo.title }),
            ],
          }),
          (0, Yt.jsx)(Sg, { opened: e, children: (0, Yt.jsx)(Ag, {}) }),
        ],
      });
    },
    ok = Pe.div`
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
  backdrop-filter: blur(4px);
`,
    ik = Pe.div`
  --padding: 7px;
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
`,
    sk = Pe.div`
  padding-inline-start: 4px;
  padding-inline-end: 11px;
  padding-block: 5px;
  line-height: 1.2;
`,
    lk = (e) =>
      (0, Yt.jsx)(ak, {
        ...e,
        children: (0, Yt.jsx)(uk, {
          viewBox: '-12 -12 24 24',
          children: (0, Yt.jsx)(ck, { d: 'M-9 -7H9M-9 0H9M-9 7H9' }),
        }),
      }),
    ak = Pe.button`
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
    uk = Pe.svg`
  inline-size: 20px;
  /* border: solid 1px red; */
`,
    ck = Pe.path`
  stroke: currentColor;
  stroke-width: 2.5;
`;
  var Pg = fe(Tt(), 1);
  var kg = (e, t) => {
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
    Lg = (e, t) => {
      for (let n of t)
        typeof n == 'function'
          ? e.append(...n(e))
          : typeof n == 'string'
          ? e.append(document.createTextNode(n))
          : n instanceof Node && e.append(n);
      return e;
    },
    fk = 'http://www.w3.org/2000/svg',
    Pd = (e, t, ...n) => {
      let r = document.createElementNS(fk, e);
      return Lg(kg(r, t), n);
    },
    Ig = (e, t, ...n) => {
      let r = document.createElement(e);
      return Lg(kg(r, t), n);
    };
  var Og = () => {
      let e = ms(kr),
        t = ss(Ko);
      return (
        (0, Pg.useEffect)(() => {
          for (let n of e.getConfig().hotSpots.slice()) e.removeHotSpot(n.id);
          for (let n of t)
            e.addHotSpot({ ...n, createTooltipFunc: dk, createTooltipArgs: n });
        }, [e, t]),
        null
      );
    },
    dk = (e, t) => {
      (e.dataset.id = t.id),
        e.append(
          Ig('div', null, t.text),
          Pd(
            'svg',
            { viewBox: '-5 -1 10 7' },
            Pd('path', { d: 'M-4 0L0 6L4 0Z' }),
          ),
        );
    };
  var Ur = fe(ot(), 1),
    Dg = () =>
      (0, Ur.jsxs)(Ur.Fragment, {
        children: [(0, Ur.jsx)(Og, {}), (0, Ur.jsx)(Cg, {})],
      });
  var xn = fe(ot(), 1),
    Mg = () => {
      let [e, t] = (0, Fr.useState)(null),
        n = pk(e),
        r = hk(n);
      return (0, xn.jsxs)(xn.Fragment, {
        children: [
          (0, xn.jsx)('div', { ref: t }),
          n &&
            (0, xn.jsx)(kr.Provider, {
              value: n,
              children:
                !r && (0, xn.jsx)(Xy, { children: (0, xn.jsx)(Dg, {}) }),
            }),
        ],
      });
    },
    pk = (e) => {
      let [t, n] = (0, Fr.useState)(null);
      return (
        (0, Fr.useEffect)(() => {
          if (!e) return Io;
          let r = globalThis.pannellum.viewer(e, {
            panorama: `/images/${Vo.path}.jpg`,
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
    hk = (e) => {
      let [t, n] = (0, Fr.useState)(!0);
      return (
        (0, Fr.useEffect)(
          () => (e && e.on('load', () => n(!1)), () => n(!0)),
          [e],
        ),
        t
      );
    };
  var $g = fe(ot(), 1);
  (0, Vg.createRoot)(lr()).render((0, $g.jsx)(Mg, {}));
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
