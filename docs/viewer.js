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
  var I_ = Object.create;
  var Ru = Object.defineProperty;
  var P_ = Object.getOwnPropertyDescriptor;
  var O_ = Object.getOwnPropertyNames;
  var D_ = Object.getPrototypeOf,
    M_ = Object.prototype.hasOwnProperty;
  var k = (e, t) => () => (e && (t = e((e = 0))), t);
  var Xt = (e, t) => () => (
      t || e((t = { exports: {} }).exports, t), t.exports
    ),
    V_ = (e, t) => {
      for (var n in t) Ru(e, n, { get: t[n], enumerable: !0 });
    },
    b_ = (e, t, n, r) => {
      if ((t && typeof t == 'object') || typeof t == 'function')
        for (let o of O_(t))
          !M_.call(e, o) &&
            o !== n &&
            Ru(e, o, {
              get: () => t[o],
              enumerable: !(r = P_(t, o)) || r.enumerable,
            });
      return e;
    };
  var De = (e, t, n) => (
    (n = e != null ? I_(D_(e)) : {}),
    b_(
      t || !e || !e.__esModule
        ? Ru(n, 'default', { value: e, enumerable: !0 })
        : n,
      e,
    )
  );
  var Cp,
    kp,
    $_,
    xu,
    Is,
    fr,
    Kr = k(() => {
      'use strict';
      (Cp = (e, t) => {
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
      }),
        (kp = (e, t) => {
          for (let n of t)
            typeof n == 'function'
              ? e.append(...n(e))
              : typeof n == 'string'
              ? e.append(document.createTextNode(n))
              : n instanceof Node && e.append(n);
          return e;
        }),
        ($_ = 'http://www.w3.org/2000/svg'),
        (xu = (e, t, ...n) => {
          let r = document.createElementNS($_, e);
          return kp(Cp(r, t), n);
        }),
        (Is = (e, t, ...n) => {
          let r = document.createElement(e);
          return kp(Cp(r, t), n);
        }),
        (fr = (e, t = document.documentElement) => {
          let n = t.querySelector(e);
          if (!n) throw new Error(`NoSuchNode: ${e}`);
          return n;
        });
    });
  var Pn,
    On,
    Dn,
    ii = k(() => {
      (Pn = class extends Set {}),
        (On = class extends Set {}),
        (Dn = class extends Set {});
    });
  var Ps,
    Os,
    Lp,
    Mn,
    Jt,
    en,
    dr = k(() => {
      ii();
      (Ps = new WeakMap()),
        (Os = new WeakMap()),
        (Lp = new WeakMap()),
        (Mn = (e) => e instanceof Pn),
        (Jt = (e) => e instanceof On),
        (en = (e) => e instanceof Dn);
    });
  var dn,
    Qr,
    si,
    pn,
    U_,
    Yr,
    Zr,
    hn = k(() => {
      (dn = (e) => typeof e == 'string'),
        (Qr = Array.isArray),
        (si = (e) => typeof e == 'function'),
        (pn = (e) => si(e) || (typeof e == 'object' && e !== null)),
        ({
          prototype: { toString: U_ },
        } = Object),
        (Yr = (e) => U_.call(e) === '[object RegExp]'),
        (Zr = (e) =>
          typeof e == 'function' && pn(e) && dn(e.type) && 'definition' in e);
    });
  function Ip(e) {
    return typeof e == 'function'
      ? e
      : Yr(e)
      ? new RegExp(e)
      : Mn(e)
      ? new Pn(e)
      : Jt(e)
      ? new On(e)
      : en(e)
      ? new Dn(e)
      : { ...e };
  }
  var Nu = k(() => {
    dr();
    ii();
    hn();
  });
  var Pp,
    Ds,
    pr,
    F_,
    z_,
    Op,
    B_,
    j_,
    H_,
    Vn,
    qr = k(() => {
      (Pp = (e) => 65 <= e && e <= 90),
        (Ds = (e) => 97 <= e && e <= 122),
        (pr = (e) => 48 <= e && e <= 57),
        (F_ = (e) => 65 <= e && e <= 70),
        (z_ = (e) => 97 <= e && e <= 102),
        (Op = (e) => pr(e) || F_(e) || z_(e)),
        (B_ = (e) => 55296 <= e && e <= 56319),
        (j_ = (e) => 56320 <= e && e <= 57343),
        (H_ = (e) => 55296 <= e && e <= 57343),
        (Vn = function* (e, t = 0) {
          let { length: n } = e;
          for (let r = t; r < n; r++) {
            let o = e.charCodeAt(r);
            if (H_(o)) {
              let i = e.charCodeAt(r + 1);
              B_(o) &&
                j_(i) &&
                ((o = (o - 55296) * 1024 + (i - 56320) + 65536), (r += 1));
            }
            yield o;
          }
        });
    });
  var Ms,
    Dp = k(() => {
      Ms = (e) => {
        let t;
        return () => {
          if (t) return t.value;
          let n = e();
          return (t = { value: n }), n;
        };
      };
    });
  var hr,
    Au = k(() => {
      hr = class extends Error {
        constructor({ code: t, message: n = t, data: r }) {
          super(n), (this.code = t), (this.data = r);
        }
      };
    });
  var W_,
    mr,
    Vs = k(() => {
      dr();
      hn();
      (W_ = Object.keys),
        (mr = (e, t) => {
          if (typeof t == 'function') return t(e);
          if (Yr(t)) return dn(e) && t.test(e);
          if (Mn(t)) return t.has(e);
          if (Jt(t)) {
            for (let n of t) if (mr(e, n)) return !0;
            return !1;
          }
          if (en(t)) {
            for (let n of t) if (!mr(e, n)) return !1;
            return !0;
          }
          if (pn(e)) {
            for (let n of W_(t)) if (!mr(e[n], t[n])) return !1;
            return !0;
          }
          return !1;
        });
    });
  function A(e, t) {
    if (!e)
      throw new hr({ code: 'NoTypeName', data: { type: e, definition: t } });
    if (Zr(t))
      throw new hr({
        code: 'UselessWrapping',
        message: `UselessWrapping: ${e}(${t.name})`,
        data: { type: e, definition: t },
      });
    let n = K_((r) => mr(r, t), {
      type: { value: e },
      name: { value: `is${e}` },
      array: {
        get: Ms(() => {
          let r = A(`Array<${e}>`, (o) => Qr(o) && o.every((i) => n(i)));
          return Ps.set(r, t), r;
        }),
      },
      optional: {
        get: Ms(() => {
          let r = A(`${e}?`, (o) => o === void 0 || n(o));
          return Os.set(r, t), r;
        }),
      },
      dictionary: {
        get: Ms(() => {
          let r = A(
            `Record<string, ${e}>`,
            (o) => pn(o) && G_(o).every(([i, s]) => dn(i) && n(s)),
          );
          return Lp.set(r, t), r;
        }),
      },
      definition: { get: () => Ip(t) },
    });
    return n;
  }
  var G_,
    K_,
    Y = k(() => {
      Dp();
      Nu();
      dr();
      Au();
      hn();
      Vs();
      ({ entries: G_, defineProperties: K_ } = Object);
    });
  var bs,
    $s = k(() => {
      dr();
      ii();
      bs = {
        enum: (...e) => new Pn(e),
        some: (...e) => {
          let t = new On();
          for (let n of e) for (let r of Jt(n) ? [...n] : [n]) t.add(r);
          return t;
        },
        every: (...e) => {
          let t = new Dn();
          for (let n of e) for (let r of en(n) ? [...n] : [n]) t.add(r);
          return t;
        },
      };
    });
  var Q_,
    Us,
    Y_,
    Vp,
    Mp,
    bp = k(() => {
      dr();
      hn();
      (Q_ = Object.keys),
        (Us = (e, t = '', n = []) => [...Y_(e, t, n)].join('').trim()),
        (Y_ = function* (e, t, n) {
          if (n.includes(e))
            yield `${t}(circular)
`;
          else if (Zr(e))
            yield `${t}${e.type}
`;
          else if (si(e)) yield `${t}${e.toString()}`;
          else if (Mn(e))
            yield `${t}${[...e].map((r) => JSON.stringify(r)).join('|')}`;
          else if (Jt(e)) yield* Mp(e, t, n, 'Some');
          else if (en(e)) yield* Mp(e, t, n, 'Every');
          else {
            yield `${t}{
`;
            let r = `${t}  `;
            for (let o of Q_(e))
              yield `${r}${String(o)}: ${Us(e[o], r, Vp(n, e))},
`;
            yield `${t}}
`;
          }
        }),
        (Vp = (e, t) => {
          let n = e.slice();
          return (n[n.length] = t), n;
        }),
        (Mp = function* (e, t, n, r, o = '{', i = '}') {
          yield `${t}${r} ${o}
`;
          let s = `${t}  `,
            l = Vp(n, e);
          for (let a of e)
            yield `${s}${Us(a, s, l)},
`;
          yield `${t}${i}
`;
        });
    });
  function $p(e, t, n) {
    if (mr(e, t)) return e;
    if (n === void 0) {
      let r = vr(e, t, '_') || {
        input: e,
        definition: t,
        path: '_',
        message: "The input doesn't match to the definition.",
      };
      throw new hr({
        code: 'TypeCheckError',
        message: `TypeCheckError: ${Cu(r)}`,
        data: r,
      });
    }
    return n;
  }
  var Z_,
    Cu,
    q_,
    X_,
    J_,
    e1,
    t1,
    n1,
    r1,
    o1,
    vr,
    Up = k(() => {
      dr();
      bp();
      Au();
      hn();
      Vs();
      (Z_ = Object.keys),
        (Cu = (e) =>
          [
            `${e.path}: ${e.message}`,
            `actual: ${JSON.stringify(e.input, null, 2)}`,
            `expected: ${Us(e.definition)}`,
          ].join(`
`)),
        (q_ = (e, t, n) =>
          t(e)
            ? null
            : {
                input: e,
                definition: t,
                path: n,
                message: `The input doesn't pass the test (${t.name}).`,
              }),
        (X_ = (e, t, n) => {
          for (let r of t) if (r === e) return null;
          return {
            input: e,
            definition: t,
            path: n,
            message: `The input (${e}) isn't in enum (${[...t].join(', ')}).`,
          };
        }),
        (J_ = (e, t, n) => {
          let r = [];
          for (let o of t) {
            let i = vr(e, o, n);
            if (!i) return null;
            r.push(i);
          }
          return {
            input: e,
            definition: t,
            path: n,
            message: `The input doesn't pass any tests.
${r.map(Cu).join(`
`)}`,
          };
        }),
        (e1 = (e, t, n) => {
          let r = 0;
          for (let o of t) {
            let i = vr(e, o, n);
            if (i)
              return {
                input: e,
                definition: t,
                path: n,
                message: `#${r} definition returned an error.
${Cu(i)}`,
              };
            r++;
          }
          return null;
        }),
        (t1 = (e, t, n) => {
          if (!pn(e))
            return {
              input: e,
              definition: t,
              path: n,
              message: 'The input is not a map.',
            };
          for (let r of Z_(t)) {
            let o = vr(e[String(r)], t[r], `${n}.${r}`);
            if (o) return o;
          }
          return null;
        }),
        (n1 = (e, t, n) => {
          let { length: r } = e;
          for (let o = 0; o < r; o++) {
            let i = vr(e[o], t, `${n}.${o}`);
            if (i) return i;
          }
          return null;
        }),
        (r1 = (e, t, n) => {
          let r = Ps.get(t);
          return r
            ? Qr(e)
              ? n1(e, r, n)
              : {
                  input: e,
                  definition: r,
                  path: n,
                  message: 'The input is not an array.',
                }
            : ((r = Os.get(t)),
              r ? (e === void 0 ? null : vr(e, r, n)) : vr(e, t.definition, n));
        }),
        (o1 = (e, t, n) =>
          dn(e)
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
              }),
        (vr = (e, t, n) =>
          n
            ? Zr(t)
              ? r1(e, t, n)
              : Yr(t)
              ? o1(e, t, n)
              : si(t)
              ? q_(e, t, n)
              : Mn(t)
              ? X_(e, t, n)
              : Jt(t)
              ? J_(e, t, n)
              : en(t)
              ? e1(e, t, n)
              : t1(e, t, n)
            : {
                input: e,
                definition: t,
                path: n,
                message: 'The type has no path.',
              });
    });
  var Nt,
    ku = k(() => {
      Nt = (
        (e) => (t) =>
          e.call(t).slice(8, -1)
      )(Object.prototype.toString);
    });
  var MI,
    VI,
    bI,
    Fp = k(() => {
      ({ keys: MI, values: VI, entries: bI } = Object);
    });
  var Iu,
    zp,
    Fs = k(() => {
      qr();
      (Iu = function* (e, t = 0) {
        let n = t,
          r = 0,
          o = 0;
        for (let i of Vn(e, t))
          if (pr(i)) {
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
      }),
        (zp = (e, t = 0) => {
          let n = [];
          for (let r of Iu(e, t))
            if (n.push(r.value) === 4)
              return { octets: n, start: t, end: r.end };
          throw new Error(`InvalidIpv4Address: ${e.substr(t, 15)}`);
        });
    });
  var c1,
    f1,
    Bp,
    Pu = k(() => {
      qr();
      Fs();
      (c1 = (e) => (e <= 57 ? e - 48 : e <= 70 ? 10 + e - 65 : 10 + e - 97)),
        (f1 = function* (e, t = 0) {
          let n = t,
            r = 0,
            o = 0;
          for (let i of Vn(e, t))
            if (Op(i)) {
              if (((o = o * 16 + c1(i)), (r += 1), 4 < r))
                throw new Error(`InvalidIpv6Group: ${e.substr(n, r)}`);
            } else if (i === 46) {
              r = o = 0;
              let s = 0;
              for (let l of Iu(e, n))
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
        }),
        (Bp = (e, t = 0) => {
          let n = [],
            r = -1,
            o = t;
          for (let s of f1(e, t)) {
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
          if (!(0 <= r))
            throw new Error(`InvalidIpv6Address: ${e.substr(t, o)}`);
          let i = n.slice(0, r);
          for (let s = 8 - n.length; s--; ) i.push(0);
          return i.push(...n.slice(r)), { groups: i, start: t, end: o };
        });
    });
  var jp = k(() => {});
  var Ou,
    GI,
    Du = k(() => {
      Y();
      (Ou = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
        (GI = A('CapitalLatinString', new RegExp(`^[${Ou}]*$`)));
    });
  var Hp,
    YI,
    Mu = k(() => {
      Y();
      (Hp = 'abcdefghijklmnopqrstuvwxyz'),
        (YI = A('SmallLatinString', /^[a-z]*$/));
    });
  var Vu,
    e2,
    bu = k(() => {
      Y();
      Du();
      Mu();
      (Vu = `${Hp}${Ou}`), (e2 = A('LatinString', new RegExp(`^[${Vu}]*$`)));
    });
  var $u,
    r2,
    Uu = k(() => {
      Y();
      ($u = '0123456789'), (r2 = A('NumberString', new RegExp(`^[${$u}]*$`)));
    });
  var d1,
    a2,
    Wp = k(() => {
      Y();
      bu();
      Uu();
      (d1 = `${Vu}${$u}`),
        (a2 = A('AlphaNumericString', new RegExp(`^[${d1}]*$`)));
    });
  var d2,
    Gp = k(() => {
      Y();
      hn();
      d2 = A('Array', Qr);
    });
  var m2,
    Kp = k(() => {
      Y();
      m2 = A('Base64String', /^[A-Za-z0-9+/]+=*$/);
    });
  var g2,
    Qp = k(() => {
      Y();
      g2 = A('Base64UrlString', /^[A-Za-z0-9\-_]+=*$/);
    });
  var E2,
    Yp = k(() => {
      Y();
      E2 = A('Boolean', (e) => typeof e == 'boolean');
    });
  var R2,
    Zp = k(() => {
      Y();
      R2 = A('CapitalHexString', /^[0-9A-F]*$/);
    });
  var Ee,
    tn = k(() => {
      Y();
      hn();
      Ee = A('String', dn);
    });
  var zs,
    Bs = k(() => {
      qr();
      Y();
      tn();
      zs = A('Domain', (e) => {
        if (!Ee(e)) return !1;
        let t = 45,
          n = !1,
          r = 1;
        for (let o of Vn(e)) {
          if (o === 46) {
            if (!n || t === 45) return !1;
            (n = !1), (r += 1);
          } else if (Ds(o)) n = !0;
          else if (o !== 45 && !pr(o)) return !1;
          t = o;
        }
        return t === 46 || t === 45 ? !1 : 1 < r;
      });
    });
  var I1,
    P1,
    qp,
    Fu = k(() => {
      Y();
      qr();
      tn();
      (I1 = new Set([
        33, 35, 36, 37, 38, 39, 42, 43, 45, 47, 61, 63, 94, 95, 96, 123, 124,
        125, 126,
      ])),
        (P1 = (e) => Ds(e) || Pp(e) || pr(e) || I1.has(e)),
        (qp = A('EmailAddressLocalPart', (e) => {
          if (!Ee(e)) return !1;
          let { length: t } = e;
          if (t === 0 || 64 < t) return !1;
          let n = 46;
          for (let r of Vn(e)) {
            if (r === 46) {
              if (n === 46) return !1;
            } else if (!P1(r)) return !1;
            n = r;
          }
          return n !== 46;
        }));
    });
  var z2,
    Xp = k(() => {
      Y();
      Bs();
      Fu();
      tn();
      z2 = A('EmailAddress', (e) => {
        if (!Ee(e) || 254 < e.length) return !1;
        let t = e.lastIndexOf('@');
        return t < 1 ? !1 : qp(e.slice(0, t)) && zs(e.slice(t + 1));
      });
    });
  var Ge,
    Jr = k(() => {
      Y();
      Ge = A('FiniteNumber', Number.isFinite);
    });
  var Jp,
    eh = k(() => {
      Y();
      Jp = A('Function', (e) => typeof e == 'function');
    });
  var Y2,
    th = k(() => {
      $s();
      Y();
      Y2 = A(
        'HttpMethod',
        bs.enum(
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
    });
  var O1,
    J2,
    nh = k(() => {
      Y();
      $s();
      (O1 = {
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
      }),
        (J2 = A('HttpResponseStatusCode', bs.enum(...Object.values(O1))));
    });
  var rh,
    zu = k(() => {
      Y();
      Fs();
      tn();
      rh = A('Ipv4Address', (e) => {
        if (Ee(e))
          try {
            return zp(e).end === e.length;
          } catch {}
        return !1;
      });
    });
  var oh,
    Bu = k(() => {
      Y();
      Pu();
      tn();
      oh = A('Ipv6Address', (e) => {
        if (Ee(e))
          try {
            return Bp(e).end === e.length;
          } catch {}
        return !1;
      });
    });
  var ih,
    ju = k(() => {
      Y();
      Bs();
      zu();
      Bu();
      tn();
      ih = A('Domain', (e) => {
        if (!Ee(e)) return !1;
        if (e.startsWith('[')) {
          let r = e.indexOf(']');
          if (r < 0 || !oh(e.slice(1, r))) return !1;
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
        return zs(n) || rh(n);
      });
    });
  var gP,
    sh = k(() => {
      Y();
      tn();
      ju();
      gP = A('HttpsUrlString', (e) => {
        if (Ee(e) && e.startsWith('https://')) {
          let t = e.indexOf('/', 8);
          return (
            t < 0 && (t = e.length),
            ih(e.slice(8, t)) ? !e.slice(t).includes(' ') : !1
          );
        }
        return !1;
      });
    });
  var wP,
    lh = k(() => {
      Y();
      Jr();
      wP = A('NegativeFiniteNumber', (e) => Ge(e) && e < 0);
    });
  var bn,
    eo = k(() => {
      Y();
      bn = A('SafeInteger', Number.isSafeInteger);
    });
  var CP,
    ah = k(() => {
      Y();
      eo();
      CP = A('NegativeSafeInteger', (e) => bn(e) && e < 0);
    });
  var PP,
    uh = k(() => {
      Y();
      Jr();
      PP = A('NonNegativeFiniteNumber', (e) => Ge(e) && 0 <= e);
    });
  var VP,
    ch = k(() => {
      Y();
      eo();
      VP = A('NonNegativeSafeInteger', (e) => bn(e) && 0 <= e);
    });
  var FP,
    fh = k(() => {
      Y();
      Jr();
      FP = A('NonPositiveFiniteNumber', (e) => Ge(e) && e <= 0);
    });
  var HP,
    dh = k(() => {
      Y();
      eo();
      HP = A('NonPositiveSafeInteger', (e) => bn(e) && e <= 0);
    });
  var KP,
    ph = k(() => {
      Y();
      KP = A('Null', (e) => e === null);
    });
  var qP,
    hh = k(() => {
      Y();
      hn();
      qP = A('Object', pn);
    });
  var tO,
    mh = k(() => {
      Y();
      Jr();
      tO = A('PositiveFiniteNumber', (e) => Ge(e) && 0 < e);
    });
  var iO,
    vh = k(() => {
      Y();
      eo();
      iO = A('PositiveSafeInteger', (e) => bn(e) && 0 < e);
    });
  var aO,
    yh = k(() => {
      Y();
      aO = A('SmallHexString', /^[0-9a-f]*$/);
    });
  var dO,
    pO,
    hO,
    mO,
    vO,
    yO,
    gO,
    SO,
    _O,
    EO,
    wO,
    gh = k(() => {
      Y();
      ku();
      (dO = A('Uint8Array', (e) => Nt(e) === 'Uint8Array')),
        (pO = A('Uint8ClampedArray', (e) => Nt(e) === 'Uint8ClampedArray')),
        (hO = A('Uint16Array', (e) => Nt(e) === 'Uint16Array')),
        (mO = A('Uint32Array', (e) => Nt(e) === 'Uint32Array')),
        (vO = A('Int8Array', (e) => Nt(e) === 'Int8Array')),
        (yO = A('Int16Array', (e) => Nt(e) === 'Int16Array')),
        (gO = A('Int32Array', (e) => Nt(e) === 'Int32Array')),
        (SO = A('Float32Array', (e) => Nt(e) === 'Float32Array')),
        (_O = A('Float64Array', (e) => Nt(e) === 'Float64Array')),
        (EO = A('BigUint64Array', (e) => Nt(e) === 'BigUint64Array')),
        (wO = A('BigInt64Array', (e) => Nt(e) === 'BigInt64Array'));
    });
  var D1,
    NO,
    Sh = k(() => {
      Y();
      tn();
      (D1 = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/),
        (NO = A('UUID', (e) => Ee(e) && D1.test(e)));
    });
  var kO,
    _h = k(() => {
      Y();
      kO = A('Undefined', (e) => typeof e > 'u');
    });
  var M1,
    V1,
    PO,
    Eh = k(() => {
      Y();
      ({
        prototype: { toString: M1 },
      } = Object),
        (V1 = A('Date', (e) => M1.call(e) === '[object Date]')),
        (PO = A('ValidDate', (e) => V1(e) && 0 < e.getTime()));
    });
  var li = k(() => {
    Nu();
    qr();
    Y();
    $s();
    Up();
    ii();
    ku();
    Fp();
    Fs();
    Pu();
    jp();
    Vs();
    Wp();
    Gp();
    Kp();
    Qp();
    Yp();
    Zp();
    Du();
    Bs();
    Xp();
    Fu();
    Jr();
    eh();
    th();
    nh();
    sh();
    zu();
    Bu();
    bu();
    lh();
    ah();
    uh();
    ch();
    fh();
    dh();
    ph();
    Uu();
    hh();
    mh();
    vh();
    eo();
    yh();
    Mu();
    tn();
    gh();
    Sh();
    _h();
    ju();
    Eh();
  });
  var b1,
    wh,
    Th = k(() => {
      'use strict';
      li();
      (b1 = A('Marker', { pitch: Ge, yaw: Ge, text: Ee, id: Ee })),
        (wh = A('ViewerConfig', {
          path: Ee,
          title: Ee,
          author: Ee.optional,
          markers: b1.array,
          latitude: Ge.optional,
          longitude: Ge.optional,
          altitude: Ge.optional,
          initPitch: Ge,
          initYaw: Ge,
        }));
    });
  var $1,
    ai,
    js,
    ui = k(() => {
      'use strict';
      li();
      Th();
      Kr();
      ($1 = fr('main#panorama')),
        (ai = $p(JSON.parse(`${fr('script#viewer-config').textContent}`), wh)),
        (js = new Promise((e) => {
          let t = globalThis.pannellum.viewer($1, {
            panorama: `/images/${ai.path}.jpg`,
            hotSpots: [],
            autoLoad: !0,
            keyboardZoom: !1,
            showControls: !1,
            friction: 0.8,
            maxPitch: 38,
            minHfov: 25,
          });
          t.on('error', alert);
          let n = () => {
            t.off('load', n), e(t);
          };
          t.on('load', n);
        }));
    });
  var Dh = Xt((ne) => {
    'use strict';
    var ci = Symbol.for('react.element'),
      U1 = Symbol.for('react.portal'),
      F1 = Symbol.for('react.fragment'),
      z1 = Symbol.for('react.strict_mode'),
      B1 = Symbol.for('react.profiler'),
      j1 = Symbol.for('react.provider'),
      H1 = Symbol.for('react.context'),
      W1 = Symbol.for('react.forward_ref'),
      G1 = Symbol.for('react.suspense'),
      K1 = Symbol.for('react.memo'),
      Q1 = Symbol.for('react.lazy'),
      Rh = Symbol.iterator;
    function Y1(e) {
      return e === null || typeof e != 'object'
        ? null
        : ((e = (Rh && e[Rh]) || e['@@iterator']),
          typeof e ==
          'functi\
on'
            ? e
            : null);
    }
    var Ah = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      Ch = Object.assign,
      kh = {};
    function to(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = kh),
        (this.updater = n || Ah);
    }
    to.prototype.isReactComponent = {};
    to.prototype.setState = function (e, t) {
      if (typeof e != 'object' && typeof e != 'function' && e != null)
        throw Error(
          'setState(...): takes an object of state variables to update or a function which returns an object of state variables.',
        );
      this.updater.enqueueSetState(this, e, t, 'setState');
    };
    to.prototype.forceUpdate = function (e) {
      this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
    };
    function Lh() {}
    Lh.prototype = to.prototype;
    function Wu(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = kh),
        (this.updater = n || Ah);
    }
    var Gu = (Wu.prototype = new Lh());
    Gu.constructor = Wu;
    Ch(Gu, to.prototype);
    Gu.isPureReactComponent = !0;
    var xh = Array.isArray,
      Ih = Object.prototype.hasOwnProperty,
      Ku = { current: null },
      Ph = { key: !0, ref: !0, __self: !0, __source: !0 };
    function Oh(e, t, n) {
      var r,
        o = {},
        i = null,
        s = null;
      if (t != null)
        for (r in (t.ref !== void 0 && (s = t.ref),
        t.key !== void 0 && (i = '' + t.key),
        t))
          Ih.call(t, r) && !Ph.hasOwnProperty(r) && (o[r] = t[r]);
      var l = arguments.length - 2;
      if (l === 1) o.children = n;
      else if (1 < l) {
        for (var a = Array(l), u = 0; u < l; u++) a[u] = arguments[u + 2];
        o.children = a;
      }
      if (e && e.defaultProps)
        for (r in ((l = e.defaultProps), l)) o[r] === void 0 && (o[r] = l[r]);
      return {
        $$typeof: ci,
        type: e,
        key: i,
        ref: s,
        props: o,
        _owner: Ku.current,
      };
    }
    function Z1(e, t) {
      return {
        $$typeof: ci,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
      };
    }
    function Qu(e) {
      return typeof e == 'object' && e !== null && e.$$typeof === ci;
    }
    function q1(e) {
      var t = { '=': '=0', ':': '=2' };
      return (
        '$' +
        e.replace(/[=:]/g, function (n) {
          return t[n];
        })
      );
    }
    var Nh = /\/+/g;
    function Hu(e, t) {
      return typeof e == 'object' && e !== null && e.key != null
        ? q1('' + e.key)
        : t.toString(36);
    }
    function Ws(e, t, n, r, o) {
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
              case ci:
              case U1:
                s = !0;
            }
        }
      if (s)
        return (
          (s = e),
          (o = o(s)),
          (e = r === '' ? '.' + Hu(s, 0) : r),
          xh(o)
            ? ((n = ''),
              e != null && (n = e.replace(Nh, '$&/') + '/'),
              Ws(o, t, n, '', function (u) {
                return u;
              }))
            : o != null &&
              (Qu(o) &&
                (o = Z1(
                  o,
                  n +
                    (!o.key || (s && s.key === o.key)
                      ? ''
                      : ('' + o.key).replace(Nh, '$&/') + '/') +
                    e,
                )),
              t.push(o)),
          1
        );
      if (((s = 0), (r = r === '' ? '.' : r + ':'), xh(e)))
        for (var l = 0; l < e.length; l++) {
          i = e[l];
          var a = r + Hu(i, l);
          s += Ws(i, t, n, a, o);
        }
      else if (((a = Y1(e)), typeof a == 'function'))
        for (e = a.call(e), l = 0; !(i = e.next()).done; )
          (i = i.value), (a = r + Hu(i, l++)), (s += Ws(i, t, n, a, o));
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
    function Hs(e, t, n) {
      if (e == null) return e;
      var r = [],
        o = 0;
      return (
        Ws(e, r, '', '', function (i) {
          return t.call(n, i, o++);
        }),
        r
      );
    }
    function X1(e) {
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
    var nt = { current: null },
      Gs = { transition: null },
      J1 = {
        ReactCurrentDispatcher: nt,
        ReactCurrentBatchConfig: Gs,
        ReactCurrentOwner: Ku,
      };
    ne.Children = {
      map: Hs,
      forEach: function (e, t, n) {
        Hs(
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
          Hs(e, function () {
            t++;
          }),
          t
        );
      },
      toArray: function (e) {
        return (
          Hs(e, function (t) {
            return t;
          }) || []
        );
      },
      only: function (e) {
        if (!Qu(e))
          throw Error(
            'React.Children\
.only expected to receive a single React element child.',
          );
        return e;
      },
    };
    ne.Component = to;
    ne.Fragment = F1;
    ne.Profiler = B1;
    ne.PureComponent = Wu;
    ne.StrictMode = z1;
    ne.Suspense = G1;
    ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = J1;
    ne.cloneElement = function (e, t, n) {
      if (e == null)
        throw Error(
          'React.cloneElement(...): The argument must be a React element, but you passed ' +
            e +
            '.',
        );
      var r = Ch({}, e.props),
        o = e.key,
        i = e.ref,
        s = e._owner;
      if (t != null) {
        if (
          (t.ref !== void 0 && ((i = t.ref), (s = Ku.current)),
          t.key !== void 0 && (o = '' + t.key),
          e.type && e.type.defaultProps)
        )
          var l = e.type.defaultProps;
        for (a in t)
          Ih.call(t, a) &&
            !Ph.hasOwnProperty(a) &&
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
        $$typeof: ci,
        type: e.type,
        key: o,
        ref: i,
        props: r,
        _owner: s,
      };
    };
    ne.createContext = function (e) {
      return (
        (e = {
          $$typeof: H1,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (e.Provider = { $$typeof: j1, _context: e }),
        (e.Consumer = e)
      );
    };
    ne.createElement = Oh;
    ne.createFactory = function (e) {
      var t = Oh.bind(null, e);
      return (t.type = e), t;
    };
    ne.createRef = function () {
      return { current: null };
    };
    ne.forwardRef = function (e) {
      return { $$typeof: W1, render: e };
    };
    ne.isValidElement = Qu;
    ne.lazy = function (e) {
      return { $$typeof: Q1, _payload: { _status: -1, _result: e }, _init: X1 };
    };
    ne.memo = function (e, t) {
      return { $$typeof: K1, type: e, compare: t === void 0 ? null : t };
    };
    ne.startTransition = function (e) {
      var t = Gs.transition;
      Gs.transition = {};
      try {
        e();
      } finally {
        Gs.transition = t;
      }
    };
    ne.unstable_act = function () {
      throw Error('act(...) is not supported in production builds of React.');
    };
    ne.useCallback = function (e, t) {
      return nt.current.useCallback(e, t);
    };
    ne.useContext = function (e) {
      return nt.current.useContext(e);
    };
    ne.useDebugValue = function () {};
    ne.useDeferredValue = function (e) {
      return nt.current.useDeferredValue(e);
    };
    ne.useEffect = function (e, t) {
      return nt.current.useEffect(e, t);
    };
    ne.useId = function () {
      return nt.current.useId();
    };
    ne.useImperativeHandle = function (e, t, n) {
      return nt.current.useImperativeHandle(e, t, n);
    };
    ne.useInsertionEffect = function (e, t) {
      return nt.current.useInsertionEffect(e, t);
    };
    ne.useLayoutEffect = function (e, t) {
      return nt.current.useLayoutEffect(e, t);
    };
    ne.useMemo = function (e, t) {
      return nt.current.useMemo(e, t);
    };
    ne.useReducer = function (e, t, n) {
      return nt.current.useReducer(e, t, n);
    };
    ne.useRef = function (e) {
      return nt.current.useRef(e);
    };
    ne.useState = function (e) {
      return nt.current.useState(e);
    };
    ne.useSyncExternalStore = function (e, t, n) {
      return nt.current.useSyncExternalStore(e, t, n);
    };
    ne.useTransition = function () {
      return nt.current.useTransition();
    };
    ne.version = '18.2.0';
  });
  var mn = Xt(($D, Mh) => {
    'use strict';
    Mh.exports = Dh();
  });
  var bh = Xt((Ks) => {
    'use strict';
    var eE = mn(),
      tE = Symbol.for('react.element'),
      nE = Symbol.for('react.fragment'),
      rE = Object.prototype.hasOwnProperty,
      oE =
        eE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
      iE = { key: !0, ref: !0, __self: !0, __source: !0 };
    function Vh(e, t, n) {
      var r,
        o = {},
        i = null,
        s = null;
      n !== void 0 && (i = '' + n),
        t.key !== void 0 && (i = '' + t.key),
        t.ref !== void 0 && (s = t.ref);
      for (r in t) rE.call(t, r) && !iE.hasOwnProperty(r) && (o[r] = t[r]);
      if (e && e.defaultProps)
        for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
      return {
        $$typeof: tE,
        type: e,
        key: i,
        ref: s,
        props: o,
        _owner: oE.current,
      };
    }
    Ks.Fragment = nE;
    Ks.jsx = Vh;
    Ks.jsxs = Vh;
  });
  var zt = Xt((FD, $h) => {
    'use strict';
    $h.exports = bh();
  });
  var Qh = Xt((pe) => {
    'use strict';
    function Xu(e, t) {
      var n = e.length;
      e.push(t);
      e: for (; 0 < n; ) {
        var r = (n - 1) >>> 1,
          o = e[r];
        if (0 < Qs(o, t)) (e[r] = t), (e[n] = o), (n = r);
        else break e;
      }
    }
    function Bt(e) {
      return e.length === 0 ? null : e[0];
    }
    function Zs(e) {
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
          if (0 > Qs(l, n))
            a < o && 0 > Qs(u, l)
              ? ((e[r] = u), (e[a] = n), (r = a))
              : ((e[r] = l), (e[s] = n), (r = s));
          else if (a < o && 0 > Qs(u, n)) (e[r] = u), (e[a] = n), (r = a);
          else break e;
        }
      }
      return t;
    }
    function Qs(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return n !== 0 ? n : e.id - t.id;
    }
    typeof performance == 'object' && typeof performance.now == 'function'
      ? ((Uh = performance),
        (pe.unstable_now = function () {
          return Uh.now();
        }))
      : ((Yu = Date),
        (Fh = Yu.now()),
        (pe.unstable_now = function () {
          return Yu.now() - Fh;
        }));
    var Uh,
      Yu,
      Fh,
      nn = [],
      $n = [],
      sE = 1,
      At = null,
      Ke = 3,
      qs = !1,
      yr = !1,
      di = !1,
      jh = typeof setTimeout == 'function' ? setTimeout : null,
      Hh = typeof clearTimeout == 'function' ? clearTimeout : null,
      zh = typeof setImmediate < 'u' ? setImmediate : null;
    typeof navigator < 'u' &&
      navigator.scheduling !== void 0 &&
      navigator.scheduling.isInputPending !== void 0 &&
      navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Ju(e) {
      for (var t = Bt($n); t !== null; ) {
        if (t.callback === null) Zs($n);
        else if (t.startTime <= e)
          Zs($n), (t.sortIndex = t.expirationTime), Xu(nn, t);
        else break;
        t = Bt($n);
      }
    }
    function ec(e) {
      if (((di = !1), Ju(e), !yr))
        if (Bt(nn) !== null) (yr = !0), nc(tc);
        else {
          var t = Bt($n);
          t !== null && rc(ec, t.startTime - e);
        }
    }
    function tc(e, t) {
      (yr = !1), di && ((di = !1), Hh(pi), (pi = -1)), (qs = !0);
      var n = Ke;
      try {
        for (
          Ju(t), At = Bt(nn);
          At !== null && (!(At.expirationTime > t) || (e && !Kh()));

        ) {
          var r = At.callback;
          if (typeof r == 'function') {
            (At.callback = null), (Ke = At.priorityLevel);
            var o = r(At.expirationTime <= t);
            (t = pe.unstable_now()),
              typeof o == 'function'
                ? (At.callback = o)
                : At === Bt(nn) && Zs(nn),
              Ju(t);
          } else Zs(nn);
          At = Bt(nn);
        }
        if (At !== null) var i = !0;
        else {
          var s = Bt($n);
          s !== null && rc(ec, s.startTime - t), (i = !1);
        }
        return i;
      } finally {
        (At = null), (Ke = n), (qs = !1);
      }
    }
    var Xs = !1,
      Ys = null,
      pi = -1,
      Wh = 5,
      Gh = -1;
    function Kh() {
      return !(pe.unstable_now() - Gh < Wh);
    }
    function Zu() {
      if (Ys !== null) {
        var e = pe.unstable_now();
        Gh = e;
        var t = !0;
        try {
          t = Ys(!0, e);
        } finally {
          t ? fi() : ((Xs = !1), (Ys = null));
        }
      } else Xs = !1;
    }
    var fi;
    typeof zh == 'function'
      ? (fi = function () {
          zh(Zu);
        })
      : typeof MessageChannel < 'u'
      ? ((qu = new MessageChannel()),
        (Bh = qu.port2),
        (qu.port1.onmessage = Zu),
        (fi = function () {
          Bh.postMessage(null);
        }))
      : (fi = function () {
          jh(Zu, 0);
        });
    var qu, Bh;
    function nc(e) {
      (Ys = e), Xs || ((Xs = !0), fi());
    }
    function rc(e, t) {
      pi = jh(function () {
        e(pe.unstable_now());
      }, t);
    }
    pe.unstable_IdlePriority = 5;
    pe.unstable_ImmediatePriority = 1;
    pe.unstable_LowPriority = 4;
    pe.unstable_NormalPriority = 3;
    pe.unstable_Profiling = null;
    pe.unstable_UserBlockingPriority = 2;
    pe.unstable_cancelCallback = function (e) {
      e.callback = null;
    };
    pe.unstable_continueExecution = function () {
      yr || qs || ((yr = !0), nc(tc));
    };
    pe.unstable_forceFrameRate = function (e) {
      0 > e || 125 < e
        ? console.error(
            'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
          )
        : (Wh = 0 < e ? Math.floor(1e3 / e) : 5);
    };
    pe.unstable_getCurrentPriorityLevel = function () {
      return Ke;
    };
    pe.unstable_getFirstCallbackNode = function () {
      return Bt(nn);
    };
    pe.unstable_next = function (e) {
      switch (Ke) {
        case 1:
        case 2:
        case 3:
          var t = 3;
          break;
        default:
          t = Ke;
      }
      var n = Ke;
      Ke = t;
      try {
        return e();
      } finally {
        Ke = n;
      }
    };
    pe.unstable_pauseExecution = function () {};
    pe.unstable_requestPaint = function () {};
    pe.unstable_runWithPriority = function (e, t) {
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
      var n = Ke;
      Ke = e;
      try {
        return t();
      } finally {
        Ke = n;
      }
    };
    pe.unstable_scheduleCallback = function (e, t, n) {
      var r = pe.unstable_now();
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
          id: sE++,
          callback: t,
          priorityLevel: e,
          startTime: n,
          expirationTime: o,
          sortIndex: -1,
        }),
        n > r
          ? ((e.sortIndex = n),
            Xu($n, e),
            Bt(nn) === null &&
              e === Bt($n) &&
              (di ? (Hh(pi), (pi = -1)) : (di = !0), rc(ec, n - r)))
          : ((e.sortIndex = o), Xu(nn, e), yr || qs || ((yr = !0), nc(tc))),
        e
      );
    };
    pe.unstable_shouldYield = Kh;
    pe.unstable_wrapCallback = function (e) {
      var t = Ke;
      return function () {
        var n = Ke;
        Ke = t;
        try {
          return e.apply(this, arguments);
        } finally {
          Ke = n;
        }
      };
    };
  });
  var Zh = Xt((BD, Yh) => {
    'use strict';
    Yh.exports = Qh();
  });
  var n0 = Xt((wt) => {
    'use strict';
    var rv = mn(),
      _t = Zh();
    function C(e) {
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
    var ov = new Set(),
      Mi = {};
    function Lr(e, t) {
      To(e, t), To(e + 'Capture', t);
    }
    function To(e, t) {
      for (Mi[e] = t, e = 0; e < t.length; e++) ov.add(t[e]);
    }
    var En = !(
        typeof window > 'u' ||
        typeof window.document > 'u' ||
        typeof window.document.createElement > 'u'
      ),
      Nc = Object.prototype.hasOwnProperty,
      lE =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      qh = {},
      Xh = {};
    function aE(e) {
      return Nc.call(Xh, e)
        ? !0
        : Nc.call(qh, e)
        ? !1
        : lE.test(e)
        ? (Xh[e] = !0)
        : ((qh[e] = !0), !1);
    }
    function uE(e, t, n, r) {
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
    function cE(e, t, n, r) {
      if (t === null || typeof t > 'u' || uE(e, t, n, r)) return !0;
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
    function it(e, t, n, r, o, i, s) {
      (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = o),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = i),
        (this.removeEmptyString = s);
    }
    var je = {};
    'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
      .split(' ')
      .forEach(function (e) {
        je[e] = new it(e, 0, !1, e, null, !1, !1);
      });
    [
      ['acceptCharset', 'accept-charset'],
      ['className', 'class'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
    ].forEach(function (e) {
      var t = e[0];
      je[t] = new it(t, 1, !1, e[1], null, !1, !1);
    });
    ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(
      function (e) {
        je[e] = new it(e, 2, !1, e.toLowerCase(), null, !1, !1);
      },
    );
    [
      'autoReverse',
      'externalResourcesRequired',
      'focusable',
      'preserveAlpha',
    ].forEach(function (e) {
      je[e] = new it(e, 2, !1, e, null, !1, !1);
    });
    'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noMo\
dule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
      .split(' ')
      .forEach(function (e) {
        je[e] = new it(e, 3, !1, e.toLowerCase(), null, !1, !1);
      });
    ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
      je[e] = new it(e, 3, !0, e, null, !1, !1);
    });
    ['capture', 'download'].forEach(function (e) {
      je[e] = new it(e, 4, !1, e, null, !1, !1);
    });
    ['cols', 'rows', 'size', 'span'].forEach(function (e) {
      je[e] = new it(e, 6, !1, e, null, !1, !1);
    });
    ['rowSpan', 'start'].forEach(function (e) {
      je[e] = new it(e, 5, !1, e.toLowerCase(), null, !1, !1);
    });
    var Sf = /[\-:]([a-z])/g;
    function _f(e) {
      return e[1].toUpperCase();
    }
    'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x \
horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-\
per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
      .split(' ')
      .forEach(function (e) {
        var t = e.replace(Sf, _f);
        je[t] = new it(t, 1, !1, e, null, !1, !1);
      });
    'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
      .split(' ')
      .forEach(function (e) {
        var t = e.replace(Sf, _f);
        je[t] = new it(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
      });
    ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
      var t = e.replace(Sf, _f);
      je[t] = new it(
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
      je[e] = new it(e, 1, !1, e.toLowerCase(), null, !1, !1);
    });
    je.xlinkHref = new it(
      'xlinkHref',
      1,
      !1,
      'xlink:href',
      'http://www.w3.org/1999/xlink',
      !0,
      !1,
    );
    ['src', 'href', 'action', 'formAction'].forEach(function (e) {
      je[e] = new it(e, 1, !1, e.toLowerCase(), null, !0, !0);
    });
    function Ef(e, t, n, r) {
      var o = je.hasOwnProperty(t) ? je[t] : null;
      (o !== null
        ? o.type !== 0
        : r ||
          !(2 < t.length) ||
          (t[0] !== 'o' && t[0] !== 'O') ||
          (t[1] !== 'n' && t[1] !== 'N')) &&
        (cE(t, n, o, r) && (n = null),
        r || o === null
          ? aE(t) &&
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
    var xn = rv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      Js = Symbol.for('react.element'),
      oo = Symbol.for('react.portal'),
      io = Symbol.for('react.fragment'),
      wf = Symbol.for('react.strict_mode'),
      Ac = Symbol.for('react.profiler'),
      iv = Symbol.for('react.provider'),
      sv = Symbol.for('react.context'),
      Tf = Symbol.for('react.forward_ref'),
      Cc = Symbol.for('react.suspense'),
      kc = Symbol.for('react.suspense_list'),
      Rf = Symbol.for('react.memo'),
      Fn = Symbol.for('react.lazy');
    Symbol.for('react.scope');
    Symbol.for('react.debug_trace_mode');
    var lv = Symbol.for('react.offscreen');
    Symbol.for('react.legacy_hidden');
    Symbol.for('react.cache');
    Symbol.for('react.tracing_marker');
    var Jh = Symbol.iterator;
    function hi(e) {
      return e === null || typeof e != 'object'
        ? null
        : ((e = (Jh && e[Jh]) || e['@@iterator']),
          typeof e == 'function' ? e : null);
    }
    var Ne = Object.assign,
      oc;
    function wi(e) {
      if (oc === void 0)
        try {
          throw Error();
        } catch (n) {
          var t = n.stack.trim().match(/\n( *(at )?)/);
          oc = (t && t[1]) || '';
        }
      return (
        `
` +
        oc +
        e
      );
    }
    var ic = !1;
    function sc(e, t) {
      if (!e || ic) return '';
      ic = !0;
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
        (ic = !1), (Error.prepareStackTrace = n);
      }
      return (e = e ? e.displayName || e.name : '') ? wi(e) : '';
    }
    function fE(e) {
      switch (e.tag) {
        case 5:
          return wi(e.type);
        case 16:
          return wi('Lazy');
        case 13:
          return wi('Suspense');
        case 19:
          return wi('SuspenseList');
        case 0:
        case 2:
        case 15:
          return (e = sc(e.type, !1)), e;
        case 11:
          return (e = sc(e.type.render, !1)), e;
        case 1:
          return (e = sc(e.type, !0)), e;
        default:
          return '';
      }
    }
    function Lc(e) {
      if (e == null) return null;
      if (typeof e == 'function') return e.displayName || e.name || null;
      if (typeof e == 'string') return e;
      switch (e) {
        case io:
          return 'Fragment';
        case oo:
          return 'Portal';
        case Ac:
          return 'Profiler';
        case wf:
          return 'StrictMode';
        case Cc:
          return 'Suspense';
        case kc:
          return 'SuspenseList';
      }
      if (typeof e == 'object')
        switch (e.$$typeof) {
          case sv:
            return (e.displayName || 'Context') + '.Consumer';
          case iv:
            return (e._context.displayName || 'Context') + '.Provider';
          case Tf:
            var t = e.render;
            return (
              (e = e.displayName),
              e ||
                ((e = t.displayName || t.name || ''),
                (e = e !== '' ? 'ForwardRef(' + e + ')' : 'ForwardRef')),
              e
            );
          case Rf:
            return (
              (t = e.displayName || null), t !== null ? t : Lc(e.type) || 'Memo'
            );
          case Fn:
            (t = e._payload), (e = e._init);
            try {
              return Lc(e(t));
            } catch {}
        }
      return null;
    }
    function dE(e) {
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
          return Lc(t);
        case 8:
          return t === wf ? 'StrictMode' : 'Mode';
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
    function er(e) {
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
    function av(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        e.toLowerCase() === 'input' &&
        (t === 'checkbox' || t === 'radio')
      );
    }
    function pE(e) {
      var t = av(e) ? 'checked' : 'value',
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
    function el(e) {
      e._valueTracker || (e._valueTracker = pE(e));
    }
    function uv(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        r = '';
      return (
        e && (r = av(e) ? (e.checked ? 'true' : 'false') : e.value),
        (e = r),
        e !== n ? (t.setValue(e), !0) : !1
      );
    }
    function Cl(e) {
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
    function Ic(e, t) {
      var n = t.checked;
      return Ne({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked,
      });
    }
    function em(e, t) {
      var n = t.defaultValue == null ? '' : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
      (n = er(t.value != null ? t.value : n)),
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
    function cv(e, t) {
      (t = t.checked), t != null && Ef(e, 'checked', t, !1);
    }
    function Pc(e, t) {
      cv(e, t);
      var n = er(t.value),
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
        ? Oc(e, t.type, n)
        : t.hasOwnProperty('defaultValue') && Oc(e, t.type, er(t.defaultValue)),
        t.checked == null &&
          t.defaultChecked != null &&
          (e.defaultChecked = !!t.defaultChecked);
    }
    function tm(e, t, n) {
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
    function Oc(e, t, n) {
      (t !== 'number' || Cl(e.ownerDocument) !== e) &&
        (n == null
          ? (e.defaultValue = '' + e._wrapperState.initialValue)
          : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
    }
    var Ti = Array.isArray;
    function yo(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {};
        for (var o = 0; o < n.length; o++) t['$' + n[o]] = !0;
        for (n = 0; n < e.length; n++)
          (o = t.hasOwnProperty('$' + e[n].value)),
            e[n].selected !== o && (e[n].selected = o),
            o && r && (e[n].defaultSelected = !0);
      } else {
        for (n = '' + er(n), t = null, o = 0; o < e.length; o++) {
          if (e[o].value === n) {
            (e[o].selected = !0), r && (e[o].defaultSelected = !0);
            return;
          }
          t !== null || e[o].disabled || (t = e[o]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function Dc(e, t) {
      if (t.dangerouslySetInnerHTML != null) throw Error(C(91));
      return Ne({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: '' + e._wrapperState.initialValue,
      });
    }
    function nm(e, t) {
      var n = t.value;
      if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
          if (t != null) throw Error(C(92));
          if (Ti(n)) {
            if (1 < n.length) throw Error(C(93));
            n = n[0];
          }
          t = n;
        }
        t == null && (t = ''), (n = t);
      }
      e._wrapperState = { initialValue: er(n) };
    }
    function fv(e, t) {
      var n = er(t.value),
        r = er(t.defaultValue);
      n != null &&
        ((n = '' + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = '' + r);
    }
    function rm(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue &&
        t !== '' &&
        t !== null &&
        (e.value = t);
    }
    function dv(e) {
      switch (e) {
        case 'svg':
          return 'http://www.w3.org/2000/svg';
        case 'math':
          return 'http://www.w3.org/1998/Math/MathML';
        default:
          return 'http://www.w3.org/1999/xhtml';
      }
    }
    function Mc(e, t) {
      return e == null || e === 'http://www.w3.org/1999/xhtml'
        ? dv(t)
        : e === 'http://www.w3.org/2000/svg' && t === 'foreignObject'
        ? 'http://www.w3.org/1999/xhtml'
        : e;
    }
    var tl,
      pv = (function (e) {
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
            tl = tl || document.createElement('div'),
              tl.innerHTML = '<svg>' + t.valueOf().toString() + '</svg>',
              t = tl.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      });
    function Vi(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
          n.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var Ni = {
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
      hE = ['Webkit', 'ms', 'Moz', 'O'];
    Object.keys(Ni).forEach(function (e) {
      hE.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Ni[t] = Ni[e]);
      });
    });
    function hv(e, t, n) {
      return t == null || typeof t == 'boolean' || t === ''
        ? ''
        : n ||
          typeof t != 'number' ||
          t === 0 ||
          (Ni.hasOwnProperty(e) && Ni[e])
        ? ('' + t).trim()
        : t + 'px';
    }
    function mv(e, t) {
      e = e.style;
      for (var n in t)
        if (t.hasOwnProperty(n)) {
          var r = n.indexOf('--') === 0,
            o = hv(n, t[n], r);
          n === 'float' && (n = 'cssFloat'),
            r ? e.setProperty(n, o) : (e[n] = o);
        }
    }
    var mE = Ne(
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
    function Vc(e, t) {
      if (t) {
        if (mE[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw Error(C(137, e));
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null) throw Error(C(60));
          if (
            typeof t.dangerouslySetInnerHTML != 'object' ||
            !('__html' in t.dangerouslySetInnerHTML)
          )
            throw Error(C(61));
        }
        if (t.style != null && typeof t.style != 'object') throw Error(C(62));
      }
    }
    function bc(e, t) {
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
    var $c = null;
    function xf(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
      );
    }
    var Uc = null,
      go = null,
      So = null;
    function om(e) {
      if ((e = es(e))) {
        if (typeof Uc != 'function') throw Error(C(280));
        var t = e.stateNode;
        t && ((t = na(t)), Uc(e.stateNode, e.type, t));
      }
    }
    function vv(e) {
      go ? (So ? So.push(e) : (So = [e])) : (go = e);
    }
    function yv() {
      if (go) {
        var e = go,
          t = So;
        if (((So = go = null), om(e), t))
          for (e = 0; e < t.length; e++) om(t[e]);
      }
    }
    function gv(e, t) {
      return e(t);
    }
    function Sv() {}
    var lc = !1;
    function _v(e, t, n) {
      if (lc) return e(t, n);
      lc = !0;
      try {
        return gv(e, t, n);
      } finally {
        (lc = !1), (go !== null || So !== null) && (Sv(), yv());
      }
    }
    function bi(e, t) {
      var n = e.stateNode;
      if (n === null) return null;
      var r = na(n);
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
      if (n && typeof n != 'function') throw Error(C(231, t, typeof n));
      return n;
    }
    var Fc = !1;
    if (En)
      try {
        (no = {}),
          Object.defineProperty(no, 'passive', {
            get: function () {
              Fc = !0;
            },
          }),
          window.addEventListener('test', no, no),
          window.removeEventListener('test', no, no);
      } catch {
        Fc = !1;
      }
    var no;
    function vE(e, t, n, r, o, i, s, l, a) {
      var u = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(n, u);
      } catch (f) {
        this.onError(f);
      }
    }
    var Ai = !1,
      kl = null,
      Ll = !1,
      zc = null,
      yE = {
        onError: function (e) {
          (Ai = !0), (kl = e);
        },
      };
    function gE(e, t, n, r, o, i, s, l, a) {
      (Ai = !1), (kl = null), vE.apply(yE, arguments);
    }
    function SE(e, t, n, r, o, i, s, l, a) {
      if ((gE.apply(this, arguments), Ai)) {
        if (Ai) {
          var u = kl;
          (Ai = !1), (kl = null);
        } else throw Error(C(198));
        Ll || ((Ll = !0), (zc = u));
      }
    }
    function Ir(e) {
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
    function Ev(e) {
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
    function im(e) {
      if (Ir(e) !== e) throw Error(C(188));
    }
    function _E(e) {
      var t = e.alternate;
      if (!t) {
        if (((t = Ir(e)), t === null)) throw Error(C(188));
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
            if (i === n) return im(o), e;
            if (i === r) return im(o), t;
            i = i.sibling;
          }
          throw Error(C(188));
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
            if (!s) throw Error(C(189));
          }
        }
        if (n.alternate !== r) throw Error(C(190));
      }
      if (n.tag !== 3) throw Error(C(188));
      return n.stateNode.current === n ? e : t;
    }
    function wv(e) {
      return (e = _E(e)), e !== null ? Tv(e) : null;
    }
    function Tv(e) {
      if (e.tag === 5 || e.tag === 6) return e;
      for (e = e.child; e !== null; ) {
        var t = Tv(e);
        if (t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var Rv = _t.unstable_scheduleCallback,
      sm = _t.unstable_cancelCallback,
      EE = _t.unstable_shouldYield,
      wE = _t.unstable_requestPaint,
      ke = _t.unstable_now,
      TE = _t.unstable_getCurrentPriorityLevel,
      Nf = _t.unstable_ImmediatePriority,
      xv = _t.unstable_UserBlockingPriority,
      Il = _t.unstable_NormalPriority,
      RE = _t.unstable_LowPriority,
      Nv = _t.unstable_IdlePriority,
      Xl = null,
      ln = null;
    function xE(e) {
      if (ln && typeof ln.onCommitFiberRoot == 'function')
        try {
          ln.onCommitFiberRoot(Xl, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
    }
    var Kt = Math.clz32 ? Math.clz32 : CE,
      NE = Math.log,
      AE = Math.LN2;
    function CE(e) {
      return (e >>>= 0), e === 0 ? 32 : (31 - ((NE(e) / AE) | 0)) | 0;
    }
    var nl = 64,
      rl = 4194304;
    function Ri(e) {
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
    function Pl(e, t) {
      var n = e.pendingLanes;
      if (n === 0) return 0;
      var r = 0,
        o = e.suspendedLanes,
        i = e.pingedLanes,
        s = n & 268435455;
      if (s !== 0) {
        var l = s & ~o;
        l !== 0 ? (r = Ri(l)) : ((i &= s), i !== 0 && (r = Ri(i)));
      } else (s = n & ~o), s !== 0 ? (r = Ri(s)) : i !== 0 && (r = Ri(i));
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
          (n = 31 - Kt(t)), (o = 1 << n), (r |= e[n]), (t &= ~o);
      return r;
    }
    function kE(e, t) {
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
    function LE(e, t) {
      for (
        var n = e.suspendedLanes,
          r = e.pingedLanes,
          o = e.expirationTimes,
          i = e.pendingLanes;
        0 < i;

      ) {
        var s = 31 - Kt(i),
          l = 1 << s,
          a = o[s];
        a === -1
          ? (!(l & n) || l & r) && (o[s] = kE(l, t))
          : a <= t && (e.expiredLanes |= l),
          (i &= ~l);
      }
    }
    function Bc(e) {
      return (
        (e = e.pendingLanes & -1073741825),
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
      );
    }
    function Av() {
      var e = nl;
      return (nl <<= 1), !(nl & 4194240) && (nl = 64), e;
    }
    function ac(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function Xi(e, t, n) {
      (e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - Kt(t)),
        (e[t] = n);
    }
    function IE(e, t) {
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
        var o = 31 - Kt(n),
          i = 1 << o;
        (t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i);
      }
    }
    function Af(e, t) {
      var n = (e.entangledLanes |= t);
      for (e = e.entanglements; n; ) {
        var r = 31 - Kt(n),
          o = 1 << r;
        (o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o);
      }
    }
    var le = 0;
    function Cv(e) {
      return (
        (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
      );
    }
    var kv,
      Cf,
      Lv,
      Iv,
      Pv,
      jc = !1,
      ol = [],
      Gn = null,
      Kn = null,
      Qn = null,
      $i = new Map(),
      Ui = new Map(),
      Bn = [],
      PE =
        'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset \
submit'.split(' ');
    function lm(e, t) {
      switch (e) {
        case 'focusin':
        case 'focusout':
          Gn = null;
          break;
        case 'dragenter':
        case 'dragleave':
          Kn = null;
          break;
        case 'mouseover':
        case 'mouseout':
          Qn = null;
          break;
        case 'pointerover':
        case 'pointerout':
          $i.delete(t.pointerId);
          break;
        case 'gotpointercapture':
        case 'lostpointercapture':
          Ui.delete(t.pointerId);
      }
    }
    function mi(e, t, n, r, o, i) {
      return e === null || e.nativeEvent !== i
        ? ((e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: r,
            nativeEvent: i,
            targetContainers: [o],
          }),
          t !== null && ((t = es(t)), t !== null && Cf(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          o !== null && t.indexOf(o) === -1 && t.push(o),
          e);
    }
    function OE(e, t, n, r, o) {
      switch (t) {
        case 'focusin':
          return (Gn = mi(Gn, e, t, n, r, o)), !0;
        case 'dragenter':
          return (Kn = mi(Kn, e, t, n, r, o)), !0;
        case 'mouseover':
          return (Qn = mi(Qn, e, t, n, r, o)), !0;
        case 'pointerover':
          var i = o.pointerId;
          return $i.set(i, mi($i.get(i) || null, e, t, n, r, o)), !0;
        case 'gotpointercapture':
          return (
            (i = o.pointerId),
            Ui.set(i, mi(Ui.get(i) || null, e, t, n, r, o)),
            !0
          );
      }
      return !1;
    }
    function Ov(e) {
      var t = _r(e.target);
      if (t !== null) {
        var n = Ir(t);
        if (n !== null) {
          if (((t = n.tag), t === 13)) {
            if (((t = Ev(n)), t !== null)) {
              (e.blockedOn = t),
                Pv(e.priority, function () {
                  Lv(n);
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
    function gl(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var n = Hc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
          n = e.nativeEvent;
          var r = new n.constructor(n.type, n);
          ($c = r), n.target.dispatchEvent(r), ($c = null);
        } else return (t = es(n)), t !== null && Cf(t), (e.blockedOn = n), !1;
        t.shift();
      }
      return !0;
    }
    function am(e, t, n) {
      gl(e) && n.delete(t);
    }
    function DE() {
      (jc = !1),
        Gn !== null && gl(Gn) && (Gn = null),
        Kn !== null && gl(Kn) && (Kn = null),
        Qn !== null && gl(Qn) && (Qn = null),
        $i.forEach(am),
        Ui.forEach(am);
    }
    function vi(e, t) {
      e.blockedOn === t &&
        ((e.blockedOn = null),
        jc ||
          ((jc = !0),
          _t.unstable_scheduleCallback(_t.unstable_NormalPriority, DE)));
    }
    function Fi(e) {
      function t(o) {
        return vi(o, e);
      }
      if (0 < ol.length) {
        vi(ol[0], e);
        for (var n = 1; n < ol.length; n++) {
          var r = ol[n];
          r.blockedOn === e && (r.blockedOn = null);
        }
      }
      for (
        Gn !== null && vi(Gn, e),
          Kn !== null && vi(Kn, e),
          Qn !== null && vi(Qn, e),
          $i.forEach(t),
          Ui.forEach(t),
          n = 0;
        n < Bn.length;
        n++
      )
        (r = Bn[n]), r.blockedOn === e && (r.blockedOn = null);
      for (; 0 < Bn.length && ((n = Bn[0]), n.blockedOn === null); )
        Ov(n), n.blockedOn === null && Bn.shift();
    }
    var _o = xn.ReactCurrentBatchConfig,
      Ol = !0;
    function ME(e, t, n, r) {
      var o = le,
        i = _o.transition;
      _o.transition = null;
      try {
        (le = 1), kf(e, t, n, r);
      } finally {
        (le = o), (_o.transition = i);
      }
    }
    function VE(e, t, n, r) {
      var o = le,
        i = _o.transition;
      _o.transition = null;
      try {
        (le = 4), kf(e, t, n, r);
      } finally {
        (le = o), (_o.transition = i);
      }
    }
    function kf(e, t, n, r) {
      if (Ol) {
        var o = Hc(e, t, n, r);
        if (o === null) mc(e, t, r, Dl, n), lm(e, r);
        else if (OE(o, e, t, n, r)) r.stopPropagation();
        else if ((lm(e, r), t & 4 && -1 < PE.indexOf(e))) {
          for (; o !== null; ) {
            var i = es(o);
            if (
              (i !== null && kv(i),
              (i = Hc(e, t, n, r)),
              i === null && mc(e, t, r, Dl, n),
              i === o)
            )
              break;
            o = i;
          }
          o !== null && r.stopPropagation();
        } else mc(e, t, r, null, n);
      }
    }
    var Dl = null;
    function Hc(e, t, n, r) {
      if (((Dl = null), (e = xf(r)), (e = _r(e)), e !== null))
        if (((t = Ir(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
          if (((e = Ev(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      return (Dl = e), null;
    }
    function Dv(e) {
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
          switch (TE()) {
            case Nf:
              return 1;
            case xv:
              return 4;
            case Il:
            case RE:
              return 16;
            case Nv:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var Hn = null,
      Lf = null,
      Sl = null;
    function Mv() {
      if (Sl) return Sl;
      var e,
        t = Lf,
        n = t.length,
        r,
        o = 'value' in Hn ? Hn.value : Hn.textContent,
        i = o.length;
      for (e = 0; e < n && t[e] === o[e]; e++);
      var s = n - e;
      for (r = 1; r <= s && t[n - r] === o[i - r]; r++);
      return (Sl = o.slice(e, 1 < r ? 1 - r : void 0));
    }
    function _l(e) {
      var t = e.keyCode;
      return (
        'charCode' in e
          ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
          : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
      );
    }
    function il() {
      return !0;
    }
    function um() {
      return !1;
    }
    function Et(e) {
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
            ? il
            : um),
          (this.isPropagationStopped = um),
          this
        );
      }
      return (
        Ne(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n &&
              (n.preventDefault
                ? n.preventDefault()
                : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
              (this.isDefaultPrevented = il));
          },
          stopPropagation: function () {
            var n = this.nativeEvent;
            n &&
              (n.stopPropagation
                ? n.stopPropagation()
                : typeof n.cancelBubble !=
                    'u\
nknown' && (n.cancelBubble = !0),
              (this.isPropagationStopped = il));
          },
          persist: function () {},
          isPersistent: il,
        }),
        t
      );
    }
    var Lo = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      If = Et(Lo),
      Ji = Ne({}, Lo, { view: 0, detail: 0 }),
      bE = Et(Ji),
      uc,
      cc,
      yi,
      Jl = Ne({}, Ji, {
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
        getModifierState: Pf,
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
            : (e !== yi &&
                (yi && e.type === 'mousemove'
                  ? ((uc = e.screenX - yi.screenX),
                    (cc = e.screenY - yi.screenY))
                  : (cc = uc = 0),
                (yi = e)),
              uc);
        },
        movementY: function (e) {
          return 'movementY' in e ? e.movementY : cc;
        },
      }),
      cm = Et(Jl),
      $E = Ne({}, Jl, { dataTransfer: 0 }),
      UE = Et($E),
      FE = Ne({}, Ji, { relatedTarget: 0 }),
      fc = Et(FE),
      zE = Ne({}, Lo, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      BE = Et(zE),
      jE = Ne({}, Lo, {
        clipboardData: function (e) {
          return 'clipboardData' in e ? e.clipboardData : window.clipboardData;
        },
      }),
      HE = Et(jE),
      WE = Ne({}, Lo, { data: 0 }),
      fm = Et(WE),
      GE = {
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
      KE = {
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
      QE = {
        Alt: 'altKey',
        Control: 'ctrlKey',
        Meta: 'metaKey',
        Shift: 'shiftKey',
      };
    function YE(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : (e = QE[e])
        ? !!t[e]
        : !1;
    }
    function Pf() {
      return YE;
    }
    var ZE = Ne({}, Ji, {
        key: function (e) {
          if (e.key) {
            var t = GE[e.key] || e.key;
            if (t !== 'Unidentified') return t;
          }
          return e.type === 'keypress'
            ? ((e = _l(e)), e === 13 ? 'Enter' : String.fromCharCode(e))
            : e.type === 'keydown' || e.type === 'keyup'
            ? KE[e.keyCode] || 'Unidentified'
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
        getModifierState: Pf,
        charCode: function (e) {
          return e.type === 'keypress' ? _l(e) : 0;
        },
        keyCode: function (e) {
          return e.type === 'keydown' || e.type === 'keyup' ? e.keyCode : 0;
        },
        which: function (e) {
          return e.type === 'keypress'
            ? _l(e)
            : e.type === 'keydown' || e.type === 'keyup'
            ? e.keyCode
            : 0;
        },
      }),
      qE = Et(ZE),
      XE = Ne({}, Jl, {
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
      dm = Et(XE),
      JE = Ne({}, Ji, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Pf,
      }),
      ew = Et(JE),
      tw = Ne({}, Lo, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      nw = Et(tw),
      rw = Ne({}, Jl, {
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
      ow = Et(rw),
      iw = [9, 13, 27, 32],
      Of = En && 'CompositionEvent' in window,
      Ci = null;
    En && 'documentMode' in document && (Ci = document.documentMode);
    var sw = En && 'TextEvent' in window && !Ci,
      Vv = En && (!Of || (Ci && 8 < Ci && 11 >= Ci)),
      pm = String.fromCharCode(32),
      hm = !1;
    function bv(e, t) {
      switch (e) {
        case 'keyup':
          return iw.indexOf(t.keyCode) !== -1;
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
    function $v(e) {
      return (
        (e = e.detail),
        typeof e ==
          'objec\
t' && 'data' in e
          ? e.data
          : null
      );
    }
    var so = !1;
    function lw(e, t) {
      switch (e) {
        case 'compositionend':
          return $v(t);
        case 'keypress':
          return t.which !== 32 ? null : ((hm = !0), pm);
        case 'textInput':
          return (e = t.data), e === pm && hm ? null : e;
        default:
          return null;
      }
    }
    function aw(e, t) {
      if (so)
        return e === 'compositionend' || (!Of && bv(e, t))
          ? ((e = Mv()), (Sl = Lf = Hn = null), (so = !1), e)
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
          return Vv && t.locale !== 'ko' ? null : t.data;
        default:
          return null;
      }
    }
    var uw = {
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
    function mm(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === 'input' ? !!uw[e.type] : t === 'textarea';
    }
    function Uv(e, t, n, r) {
      vv(r),
        (t = Ml(t, 'onChange')),
        0 < t.length &&
          ((n = new If('onChange', 'change', null, n, r)),
          e.push({ event: n, listeners: t }));
    }
    var ki = null,
      zi = null;
    function cw(e) {
      Zv(e, 0);
    }
    function ea(e) {
      var t = uo(e);
      if (uv(t)) return e;
    }
    function fw(e, t) {
      if (e === 'change') return t;
    }
    var Fv = !1;
    En &&
      (En
        ? ((ll = 'oninput' in document),
          ll ||
            ((dc = document.createElement('div')),
            dc.setAttribute('oninput', 'return;'),
            (ll = typeof dc.oninput == 'function')),
          (sl = ll))
        : (sl = !1),
      (Fv = sl && (!document.documentMode || 9 < document.documentMode)));
    var sl, ll, dc;
    function vm() {
      ki && (ki.detachEvent('onpropertychange', zv), (zi = ki = null));
    }
    function zv(e) {
      if (e.propertyName === 'value' && ea(zi)) {
        var t = [];
        Uv(t, zi, e, xf(e)), _v(cw, t);
      }
    }
    function dw(e, t, n) {
      e === 'focusin'
        ? (vm(), (ki = t), (zi = n), ki.attachEvent('onpropertychange', zv))
        : e === 'focusout' && vm();
    }
    function pw(e) {
      if (e === 'selectionchange' || e === 'keyup' || e === 'keydown')
        return ea(zi);
    }
    function hw(e, t) {
      if (e === 'click') return ea(t);
    }
    function mw(e, t) {
      if (e === 'input' || e === 'change') return ea(t);
    }
    function vw(e, t) {
      return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
    }
    var Yt = typeof Object.is == 'function' ? Object.is : vw;
    function Bi(e, t) {
      if (Yt(e, t)) return !0;
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
        if (!Nc.call(t, o) || !Yt(e[o], t[o])) return !1;
      }
      return !0;
    }
    function ym(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function gm(e, t) {
      var n = ym(e);
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
        n = ym(n);
      }
    }
    function Bv(e, t) {
      return e && t
        ? e === t
          ? !0
          : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
          ? Bv(e, t.parentNode)
          : 'contains' in e
          ? e.contains(t)
          : e.compareDocumentPosition
          ? !!(e.compareDocumentPosition(t) & 16)
          : !1
        : !1;
    }
    function jv() {
      for (var e = window, t = Cl(); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = typeof t.contentWindow.location.href == 'string';
        } catch {
          n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = Cl(e.document);
      }
      return t;
    }
    function Df(e) {
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
    function yw(e) {
      var t = jv(),
        n = e.focusedElem,
        r = e.selectionRange;
      if (
        t !== n &&
        n &&
        n.ownerDocument &&
        Bv(n.ownerDocument.documentElement, n)
      ) {
        if (r !== null && Df(n)) {
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
              (o = gm(n, i));
            var s = gm(n, r);
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
    var gw = En && 'documentMode' in document && 11 >= document.documentMode,
      lo = null,
      Wc = null,
      Li = null,
      Gc = !1;
    function Sm(e, t, n) {
      var r =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      Gc ||
        lo == null ||
        lo !== Cl(r) ||
        ((r = lo),
        'selectionStart' in r && Df(r)
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
        (Li && Bi(Li, r)) ||
          ((Li = r),
          (r = Ml(Wc, 'onSelect')),
          0 < r.length &&
            ((t = new If('onSelect', 'select', null, t, n)),
            e.push({ event: t, listeners: r }),
            (t.target = lo))));
    }
    function al(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n['Webkit' + e] = 'webkit' + t),
        (n['Moz' + e] = 'moz' + t),
        n
      );
    }
    var ao = {
        animationend: al('Animation', 'AnimationEnd'),
        animationiteration: al('Animation', 'AnimationIteration'),
        animationstart: al('Animation', 'AnimationStart'),
        transitionend: al('Transition', 'TransitionEnd'),
      },
      pc = {},
      Hv = {};
    En &&
      ((Hv = document.createElement('div').style),
      'AnimationEvent' in window ||
        (delete ao.animationend.animation,
        delete ao.animationiteration.animation,
        delete ao.animationstart.animation),
      'TransitionEvent' in window || delete ao.transitionend.transition);
    function ta(e) {
      if (pc[e]) return pc[e];
      if (!ao[e]) return e;
      var t = ao[e],
        n;
      for (n in t) if (t.hasOwnProperty(n) && n in Hv) return (pc[e] = t[n]);
      return e;
    }
    var Wv = ta('animationend'),
      Gv = ta('animationiteration'),
      Kv = ta('animationstart'),
      Qv = ta('transitionend'),
      Yv = new Map(),
      _m = '\
abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stall\
ed submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' ',
      );
    function nr(e, t) {
      Yv.set(e, t), Lr(t, [e]);
    }
    for (ul = 0; ul < _m.length; ul++)
      (cl = _m[ul]),
        (Em = cl.toLowerCase()),
        (wm = cl[0].toUpperCase() + cl.slice(1)),
        nr(Em, 'on' + wm);
    var cl, Em, wm, ul;
    nr(Wv, 'onAnimationEnd');
    nr(Gv, 'onAnimationIteration');
    nr(Kv, 'onAnimationStart');
    nr('dblclick', 'onDoubleClick');
    nr('focusin', 'onFocus');
    nr('focusout', 'onBlur');
    nr(Qv, 'onTransitionEnd');
    To('onMouseEnter', ['mouseout', 'mouseover']);
    To('onMouseLeave', ['mouseout', 'mouseover']);
    To('onPointerEnter', ['pointerout', 'pointerover']);
    To('onPointerLeave', ['pointerout', 'pointerover']);
    Lr(
      'onChange',
      'change click focusin focusout input keydown keyup selectionchange'.split(
        ' ',
      ),
    );
    Lr(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' ',
      ),
    );
    Lr('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']);
    Lr(
      'onCompositionEnd',
      'compositionend focusout keydown keypress k\
eyup mousedown'.split(' '),
    );
    Lr(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' '),
    );
    Lr(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' '),
    );
    var xi =
        'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
          ' ',
        ),
      Sw = new Set(
        'cancel close invalid load\
 scroll toggle'
          .split(' ')
          .concat(xi),
      );
    function Tm(e, t, n) {
      var r = e.type || 'unknown-event';
      (e.currentTarget = n), SE(r, t, void 0, e), (e.currentTarget = null);
    }
    function Zv(e, t) {
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
              Tm(o, l, u), (i = a);
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
              Tm(o, l, u), (i = a);
            }
        }
      }
      if (Ll) throw ((e = zc), (Ll = !1), (zc = null), e);
    }
    function me(e, t) {
      var n = t[qc];
      n === void 0 && (n = t[qc] = new Set());
      var r = e + '__bubble';
      n.has(r) || (qv(t, e, 2, !1), n.add(r));
    }
    function hc(e, t, n) {
      var r = 0;
      t && (r |= 4), qv(n, e, r, t);
    }
    var fl = '_reactListening' + Math.random().toString(36).slice(2);
    function ji(e) {
      if (!e[fl]) {
        (e[fl] = !0),
          ov.forEach(function (n) {
            n !== 'selectionchange' &&
              (Sw.has(n) || hc(n, !1, e), hc(n, !0, e));
          });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[fl] || ((t[fl] = !0), hc('selectionchange', !1, t));
      }
    }
    function qv(e, t, n, r) {
      switch (Dv(t)) {
        case 1:
          var o = ME;
          break;
        case 4:
          o = VE;
          break;
        default:
          o = kf;
      }
      (n = o.bind(null, t, n, e)),
        (o = void 0),
        !Fc ||
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
    function mc(e, t, n, r, o) {
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
              if (((s = _r(l)), s === null)) return;
              if (((a = s.tag), a === 5 || a === 6)) {
                r = i = s;
                continue e;
              }
              l = l.parentNode;
            }
          }
          r = r.return;
        }
      _v(function () {
        var u = i,
          f = xf(n),
          p = [];
        e: {
          var m = Yv.get(e);
          if (m !== void 0) {
            var S = If,
              y = e;
            switch (e) {
              case 'keypress':
                if (_l(n) === 0) break e;
              case 'keydown':
              case 'keyup':
                S = qE;
                break;
              case 'focusin':
                (y = 'focus'), (S = fc);
                break;
              case 'focusout':
                (y = 'blur'), (S = fc);
                break;
              case 'beforeblur':
              case 'afterblur':
                S = fc;
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
                S = cm;
                break;
              case 'drag':
              case 'dragend':
              case 'dragenter':
              case 'dragexit':
              case 'dragleave':
              case 'dragover':
              case 'dragstart':
              case 'drop':
                S = UE;
                break;
              case 'touchcancel':
              case 'touchend':
              case 'touchmove':
              case 'touchstart':
                S = ew;
                break;
              case Wv:
              case Gv:
              case Kv:
                S = BE;
                break;
              case Qv:
                S = nw;
                break;
              case 'scroll':
                S = bE;
                break;
              case '\
wheel':
                S = ow;
                break;
              case 'copy':
              case 'cut':
              case 'paste':
                S = HE;
                break;
              case 'gotpointercapture':
              case 'lostpointercapture':
              case 'pointercancel':
              case 'pointerdown':
              case 'pointermove':
              case 'pointerout':
              case 'pointerover':
              case 'pointerup':
                S = dm;
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
                    ((E = bi(c, h)), E != null && w.push(Hi(c, E, d)))),
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
                n !== $c &&
                (y = n.relatedTarget || n.fromElement) &&
                (_r(y) || y[wn]))
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
                  (y = y ? _r(y) : null),
                  y !== null &&
                    ((U = Ir(y)), y !== U || (y.tag !== 5 && y.tag !== 6)) &&
                    (y = null))
                : ((S = null), (y = u)),
              S !== y)
            ) {
              if (
                ((w = cm),
                (E = 'onMouseLeave'),
                (h = 'onMouseEnter'),
                (c = 'mouse'),
                (e === 'pointerout' || e === 'pointerover') &&
                  ((w = dm),
                  (E = 'onPointerLeave'),
                  (h =
                    'onP\
ointerEnter'),
                  (c = 'pointer')),
                (U = S == null ? m : uo(S)),
                (d = y == null ? m : uo(y)),
                (m = new w(E, c + 'leave', S, n, f)),
                (m.target = U),
                (m.relatedTarget = d),
                (E = null),
                _r(f) === u &&
                  ((w = new w(h, c + 'enter', y, n, f)),
                  (w.target = d),
                  (w.relatedTarget = U),
                  (E = w)),
                (U = E),
                S && y)
              )
                t: {
                  for (w = S, h = y, c = 0, d = w; d; d = ro(d)) c++;
                  for (d = 0, E = h; E; E = ro(E)) d++;
                  for (; 0 < c - d; ) (w = ro(w)), c--;
                  for (; 0 < d - c; ) (h = ro(h)), d--;
                  for (; c--; ) {
                    if (w === h || (h !== null && w === h.alternate)) break t;
                    (w = ro(w)), (h = ro(h));
                  }
                  w = null;
                }
              else w = null;
              S !== null && Rm(p, m, S, w, !1),
                y !== null && U !== null && Rm(p, U, y, w, !0);
            }
          }
          e: {
            if (
              ((m = u ? uo(u) : window),
              (S = m.nodeName && m.nodeName.toLowerCase()),
              S === 'select' || (S === 'input' && m.type === 'file'))
            )
              var R = fw;
            else if (mm(m))
              if (Fv) R = mw;
              else {
                R = pw;
                var x = dw;
              }
            else
              (S = m.nodeName) &&
                S.toLowerCase() === 'input' &&
                (m.type === 'checkbox' || m.type === 'radio') &&
                (R = hw);
            if (R && (R = R(e, u))) {
              Uv(p, R, n, f);
              break e;
            }
            x && x(e, m, u),
              e === 'focusout' &&
                (x = m._wrapperState) &&
                x.controlled &&
                m.type === 'number' &&
                Oc(m, 'number', m.value);
          }
          switch (((x = u ? uo(u) : window), e)) {
            case 'focusin':
              (mm(x) || x.contentEditable === 'true') &&
                ((lo = x), (Wc = u), (Li = null));
              break;
            case 'focusout':
              Li = Wc = lo = null;
              break;
            case '\
mousedown':
              Gc = !0;
              break;
            case 'contextmenu':
            case 'mouseup':
            case 'dragend':
              (Gc = !1), Sm(p, n, f);
              break;
            case 'selectionchange':
              if (gw) break;
            case 'keydown':
            case 'keyup':
              Sm(p, n, f);
          }
          var T;
          if (Of)
            e: {
              switch (e) {
                case 'compositionstart':
                  var D = 'onCompositionStart';
                  break e;
                case 'compositionend':
                  D = 'onCompositionEnd';
                  break e;
                case 'compositionupdate':
                  D = 'onCompositionUpdate';
                  break e;
              }
              D = void 0;
            }
          else
            so
              ? bv(e, n) && (D = 'onCompositionEnd')
              : e === 'keydown' &&
                n.keyCode === 229 &&
                (D = 'onCompositionStart');
          D &&
            (Vv &&
              n.locale !== 'ko' &&
              (so ||
              D !==
                'onComposi\
tionStart'
                ? D === 'onCompositionEnd' && so && (T = Mv())
                : ((Hn = f),
                  (Lf = 'value' in Hn ? Hn.value : Hn.textContent),
                  (so = !0))),
            (x = Ml(u, D)),
            0 < x.length &&
              ((D = new fm(D, e, null, n, f)),
              p.push({ event: D, listeners: x }),
              T ? (D.data = T) : ((T = $v(n)), T !== null && (D.data = T)))),
            (T = sw ? lw(e, n) : aw(e, n)) &&
              ((u = Ml(u, 'onBeforeInput')),
              0 < u.length &&
                ((f = new fm('onBeforeInput', 'beforeinput', null, n, f)),
                p.push({ event: f, listeners: u }),
                (f.data = T)));
        }
        Zv(p, t);
      });
    }
    function Hi(e, t, n) {
      return { instance: e, listener: t, currentTarget: n };
    }
    function Ml(e, t) {
      for (var n = t + 'Capture', r = []; e !== null; ) {
        var o = e,
          i = o.stateNode;
        o.tag === 5 &&
          i !== null &&
          ((o = i),
          (i = bi(e, n)),
          i != null && r.unshift(Hi(e, i, o)),
          (i = bi(e, t)),
          i != null && r.push(Hi(e, i, o))),
          (e = e.return);
      }
      return r;
    }
    function ro(e) {
      if (e === null) return null;
      do e = e.return;
      while (e && e.tag !== 5);
      return e || null;
    }
    function Rm(e, t, n, r, o) {
      for (var i = t._reactName, s = []; n !== null && n !== r; ) {
        var l = n,
          a = l.alternate,
          u = l.stateNode;
        if (a !== null && a === r) break;
        l.tag === 5 &&
          u !== null &&
          ((l = u),
          o
            ? ((a = bi(n, i)), a != null && s.unshift(Hi(n, a, l)))
            : o || ((a = bi(n, i)), a != null && s.push(Hi(n, a, l)))),
          (n = n.return);
      }
      s.length !== 0 && e.push({ event: t, listeners: s });
    }
    var _w = /\r\n?/g,
      Ew = /\u0000|\uFFFD/g;
    function xm(e) {
      return (typeof e == 'string' ? e : '' + e)
        .replace(
          _w,
          `
`,
        )
        .replace(Ew, '');
    }
    function dl(e, t, n) {
      if (((t = xm(t)), xm(e) !== t && n)) throw Error(C(425));
    }
    function Vl() {}
    var Kc = null,
      Qc = null;
    function Yc(e, t) {
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
    var Zc = typeof setTimeout == 'function' ? setTimeout : void 0,
      ww = typeof clearTimeout == 'function' ? clearTimeout : void 0,
      Nm = typeof Promise == 'function' ? Promise : void 0,
      Tw =
        typeof queueMicrotask == 'function'
          ? queueMicrotask
          : typeof Nm < 'u'
          ? function (e) {
              return Nm.resolve(null).then(e).catch(Rw);
            }
          : Zc;
    function Rw(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function vc(e, t) {
      var n = t,
        r = 0;
      do {
        var o = n.nextSibling;
        if ((e.removeChild(n), o && o.nodeType === 8))
          if (((n = o.data), n === '/$')) {
            if (r === 0) {
              e.removeChild(o), Fi(t);
              return;
            }
            r--;
          } else (n !== '$' && n !== '$?' && n !== '$!') || r++;
        n = o;
      } while (n);
      Fi(t);
    }
    function Yn(e) {
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
    function Am(e) {
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
    var Io = Math.random().toString(36).slice(2),
      sn = '__reactFiber$' + Io,
      Wi = '__reactProps$' + Io,
      wn = '__reactContainer$' + Io,
      qc = '__reactEvents$' + Io,
      xw = '__reactListeners$' + Io,
      Nw = '__reactHandles$' + Io;
    function _r(e) {
      var t = e[sn];
      if (t) return t;
      for (var n = e.parentNode; n; ) {
        if ((t = n[wn] || n[sn])) {
          if (
            ((n = t.alternate),
            t.child !== null || (n !== null && n.child !== null))
          )
            for (e = Am(e); e !== null; ) {
              if ((n = e[sn])) return n;
              e = Am(e);
            }
          return t;
        }
        (e = n), (n = e.parentNode);
      }
      return null;
    }
    function es(e) {
      return (
        (e = e[sn] || e[wn]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
          ? null
          : e
      );
    }
    function uo(e) {
      if (e.tag === 5 || e.tag === 6) return e.stateNode;
      throw Error(C(33));
    }
    function na(e) {
      return e[Wi] || null;
    }
    var Xc = [],
      co = -1;
    function rr(e) {
      return { current: e };
    }
    function ve(e) {
      0 > co || ((e.current = Xc[co]), (Xc[co] = null), co--);
    }
    function he(e, t) {
      co++, (Xc[co] = e.current), (e.current = t);
    }
    var tr = {},
      qe = rr(tr),
      ft = rr(!1),
      xr = tr;
    function Ro(e, t) {
      var n = e.type.contextTypes;
      if (!n) return tr;
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
    function dt(e) {
      return (e = e.childContextTypes), e != null;
    }
    function bl() {
      ve(ft), ve(qe);
    }
    function Cm(e, t, n) {
      if (qe.current !== tr) throw Error(C(168));
      he(qe, t), he(ft, n);
    }
    function Xv(e, t, n) {
      var r = e.stateNode;
      if (((t = t.childContextTypes), typeof r.getChildContext != 'function'))
        return n;
      r = r.getChildContext();
      for (var o in r)
        if (!(o in t)) throw Error(C(108, dE(e) || 'Unknown', o));
      return Ne({}, n, r);
    }
    function $l(e) {
      return (
        (e =
          ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
          tr),
        (xr = qe.current),
        he(qe, e),
        he(ft, ft.current),
        !0
      );
    }
    function km(e, t, n) {
      var r = e.stateNode;
      if (!r) throw Error(C(169));
      n
        ? ((e = Xv(e, t, xr)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          ve(ft),
          ve(qe),
          he(qe, e))
        : ve(ft),
        he(ft, n);
    }
    var yn = null,
      ra = !1,
      yc = !1;
    function Jv(e) {
      yn === null ? (yn = [e]) : yn.push(e);
    }
    function Aw(e) {
      (ra = !0), Jv(e);
    }
    function or() {
      if (!yc && yn !== null) {
        yc = !0;
        var e = 0,
          t = le;
        try {
          var n = yn;
          for (le = 1; e < n.length; e++) {
            var r = n[e];
            do r = r(!0);
            while (r !== null);
          }
          (yn = null), (ra = !1);
        } catch (o) {
          throw (yn !== null && (yn = yn.slice(e + 1)), Rv(Nf, or), o);
        } finally {
          (le = t), (yc = !1);
        }
      }
      return null;
    }
    var fo = [],
      po = 0,
      Ul = null,
      Fl = 0,
      Ct = [],
      kt = 0,
      Nr = null,
      gn = 1,
      Sn = '';
    function gr(e, t) {
      (fo[po++] = Fl), (fo[po++] = Ul), (Ul = e), (Fl = t);
    }
    function ey(e, t, n) {
      (Ct[kt++] = gn), (Ct[kt++] = Sn), (Ct[kt++] = Nr), (Nr = e);
      var r = gn;
      e = Sn;
      var o = 32 - Kt(r) - 1;
      (r &= ~(1 << o)), (n += 1);
      var i = 32 - Kt(t) + o;
      if (30 < i) {
        var s = o - (o % 5);
        (i = (r & ((1 << s) - 1)).toString(32)),
          (r >>= s),
          (o -= s),
          (gn = (1 << (32 - Kt(t) + o)) | (n << o) | r),
          (Sn = i + e);
      } else (gn = (1 << i) | (n << o) | r), (Sn = e);
    }
    function Mf(e) {
      e.return !== null && (gr(e, 1), ey(e, 1, 0));
    }
    function Vf(e) {
      for (; e === Ul; )
        (Ul = fo[--po]), (fo[po] = null), (Fl = fo[--po]), (fo[po] = null);
      for (; e === Nr; )
        (Nr = Ct[--kt]),
          (Ct[kt] = null),
          (Sn = Ct[--kt]),
          (Ct[kt] = null),
          (gn = Ct[--kt]),
          (Ct[kt] = null);
    }
    var St = null,
      gt = null,
      we = !1,
      Gt = null;
    function ty(e, t) {
      var n = Lt(5, null, null, 0);
      (n.elementType = 'DELETED'),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
    }
    function Lm(e, t) {
      switch (e.tag) {
        case 5:
          var n = e.type;
          return (
            (t =
              t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
                ? null
                : t),
            t !== null
              ? ((e.stateNode = t), (St = e), (gt = Yn(t.firstChild)), !0)
              : !1
          );
        case 6:
          return (
            (t = e.pendingProps === '' || t.nodeType !== 3 ? null : t),
            t !== null ? ((e.stateNode = t), (St = e), (gt = null), !0) : !1
          );
        case 13:
          return (
            (t = t.nodeType !== 8 ? null : t),
            t !== null
              ? ((n = Nr !== null ? { id: gn, overflow: Sn } : null),
                (e.memoizedState = {
                  dehydrated: t,
                  treeContext: n,
                  retryLane: 1073741824,
                }),
                (n = Lt(18, null, null, 0)),
                (n.stateNode = t),
                (n.return = e),
                (e.child = n),
                (St = e),
                (gt = null),
                !0)
              : !1
          );
        default:
          return !1;
      }
    }
    function Jc(e) {
      return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
    }
    function ef(e) {
      if (we) {
        var t = gt;
        if (t) {
          var n = t;
          if (!Lm(e, t)) {
            if (Jc(e)) throw Error(C(418));
            t = Yn(n.nextSibling);
            var r = St;
            t && Lm(e, t)
              ? ty(r, n)
              : ((e.flags = (e.flags & -4097) | 2), (we = !1), (St = e));
          }
        } else {
          if (Jc(e)) throw Error(C(418));
          (e.flags = (e.flags & -4097) | 2), (we = !1), (St = e);
        }
      }
    }
    function Im(e) {
      for (
        e = e.return;
        e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

      )
        e = e.return;
      St = e;
    }
    function pl(e) {
      if (e !== St) return !1;
      if (!we) return Im(e), (we = !0), !1;
      var t;
      if (
        ((t = e.tag !== 3) &&
          !(t = e.tag !== 5) &&
          ((t = e.type),
          (t = t !== 'head' && t !== 'body' && !Yc(e.type, e.memoizedProps))),
        t && (t = gt))
      ) {
        if (Jc(e)) throw (ny(), Error(C(418)));
        for (; t; ) ty(e, t), (t = Yn(t.nextSibling));
      }
      if ((Im(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
          throw Error(C(317));
        e: {
          for (e = e.nextSibling, t = 0; e; ) {
            if (e.nodeType === 8) {
              var n = e.data;
              if (n === '/$') {
                if (t === 0) {
                  gt = Yn(e.nextSibling);
                  break e;
                }
                t--;
              } else (n !== '$' && n !== '$!' && n !== '$?') || t++;
            }
            e = e.nextSibling;
          }
          gt = null;
        }
      } else gt = St ? Yn(e.stateNode.nextSibling) : null;
      return !0;
    }
    function ny() {
      for (var e = gt; e; ) e = Yn(e.nextSibling);
    }
    function xo() {
      (gt = St = null), (we = !1);
    }
    function bf(e) {
      Gt === null ? (Gt = [e]) : Gt.push(e);
    }
    var Cw = xn.ReactCurrentBatchConfig;
    function Ht(e, t) {
      if (e && e.defaultProps) {
        (t = Ne({}, t)), (e = e.defaultProps);
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
      }
      return t;
    }
    var zl = rr(null),
      Bl = null,
      ho = null,
      $f = null;
    function Uf() {
      $f = ho = Bl = null;
    }
    function Ff(e) {
      var t = zl.current;
      ve(zl), (e._currentValue = t);
    }
    function tf(e, t, n) {
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
    function Eo(e, t) {
      (Bl = e),
        ($f = ho = null),
        (e = e.dependencies),
        e !== null &&
          e.firstContext !== null &&
          (e.lanes & t && (ct = !0), (e.firstContext = null));
    }
    function Pt(e) {
      var t = e._currentValue;
      if ($f !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), ho === null)) {
          if (Bl === null) throw Error(C(308));
          (ho = e), (Bl.dependencies = { lanes: 0, firstContext: e });
        } else ho = ho.next = e;
      return t;
    }
    var Er = null;
    function zf(e) {
      Er === null ? (Er = [e]) : Er.push(e);
    }
    function ry(e, t, n, r) {
      var o = t.interleaved;
      return (
        o === null ? ((n.next = n), zf(t)) : ((n.next = o.next), (o.next = n)),
        (t.interleaved = n),
        Tn(e, r)
      );
    }
    function Tn(e, t) {
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
    var zn = !1;
    function Bf(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
      };
    }
    function oy(e, t) {
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
    function _n(e, t) {
      return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
      };
    }
    function Zn(e, t, n) {
      var r = e.updateQueue;
      if (r === null) return null;
      if (((r = r.shared), oe & 2)) {
        var o = r.pending;
        return (
          o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
          (r.pending = t),
          Tn(e, n)
        );
      }
      return (
        (o = r.interleaved),
        o === null ? ((t.next = t), zf(r)) : ((t.next = o.next), (o.next = t)),
        (r.interleaved = t),
        Tn(e, n)
      );
    }
    function El(e, t, n) {
      if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (n & 4194240) !== 0))
      ) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), Af(e, n);
      }
    }
    function Pm(e, t) {
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
    function jl(e, t, n, r) {
      var o = e.updateQueue;
      zn = !1;
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
                  p = Ne({}, p, m);
                  break e;
                case 2:
                  zn = !0;
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
        (Cr |= s), (e.lanes = s), (e.memoizedState = p);
      }
    }
    function Om(e, t, n) {
      if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
          var r = e[t],
            o = r.callback;
          if (o !== null) {
            if (((r.callback = null), (r = n), typeof o != 'function'))
              throw Error(C(191, o));
            o.call(r);
          }
        }
    }
    var iy = new rv.Component().refs;
    function nf(e, t, n, r) {
      (t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : Ne({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n);
    }
    var oa = {
      isMounted: function (e) {
        return (e = e._reactInternals) ? Ir(e) === e : !1;
      },
      enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = ot(),
          o = Xn(e),
          i = _n(r, o);
        (i.payload = t),
          n != null && (i.callback = n),
          (t = Zn(e, i, o)),
          t !== null && (Qt(t, e, o, r), El(t, e, o));
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = ot(),
          o = Xn(e),
          i = _n(r, o);
        (i.tag = 1),
          (i.payload = t),
          n != null && (i.callback = n),
          (t = Zn(e, i, o)),
          t !== null && (Qt(t, e, o, r), El(t, e, o));
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = ot(),
          r = Xn(e),
          o = _n(n, r);
        (o.tag = 2),
          t != null && (o.callback = t),
          (t = Zn(e, o, r)),
          t !== null && (Qt(t, e, r, n), El(t, e, r));
      },
    };
    function Dm(e, t, n, r, o, i, s) {
      return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == 'function'
          ? e.shouldComponentUpdate(r, i, s)
          : t.prototype && t.prototype.isPureReactComponent
          ? !Bi(n, r) || !Bi(o, i)
          : !0
      );
    }
    function sy(e, t, n) {
      var r = !1,
        o = tr,
        i = t.contextType;
      return (
        typeof i == 'object' && i !== null
          ? (i = Pt(i))
          : ((o = dt(t) ? xr : qe.current),
            (r = t.contextTypes),
            (i = (r = r != null) ? Ro(e, o) : tr)),
        (t = new t(n, i)),
        (e.memoizedState =
          t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = oa),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = o),
          (e.__reactInternalMemoizedMaskedChildContext = i)),
        t
      );
    }
    function Mm(e, t, n, r) {
      (e = t.state),
        typeof t.componentWillReceiveProps == 'function' &&
          t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == 'function' &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && oa.enqueueReplaceState(t, t.state, null);
    }
    function rf(e, t, n, r) {
      var o = e.stateNode;
      (o.props = n), (o.state = e.memoizedState), (o.refs = iy), Bf(e);
      var i = t.contextType;
      typeof i ==
        'obje\
ct' && i !== null
        ? (o.context = Pt(i))
        : ((i = dt(t) ? xr : qe.current), (o.context = Ro(e, i))),
        (o.state = e.memoizedState),
        (i = t.getDerivedStateFromProps),
        typeof i == 'function' && (nf(e, t, i, n), (o.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == 'function' ||
          typeof o.getSnapshotBeforeUpdate == 'function' ||
          (typeof o.UNSAFE_componentWillMount != 'function' &&
            typeof o.componentWillMount != 'function') ||
          ((t = o.state),
          typeof o.componentWillMount == 'function' && o.componentWillMount(),
          typeof o.UNSAFE_componentWillMount == 'function' &&
            o.UNSAFE_componentWillMount(),
          t !== o.state && oa.enqueueReplaceState(o, o.state, null),
          jl(e, n, o, r),
          (o.state = e.memoizedState)),
        typeof o.componentDidMount == 'function' && (e.flags |= 4194308);
    }
    function gi(e, t, n) {
      if (
        ((e = n.ref),
        e !== null && typeof e != 'function' && typeof e != 'object')
      ) {
        if (n._owner) {
          if (((n = n._owner), n)) {
            if (n.tag !== 1) throw Error(C(309));
            var r = n.stateNode;
          }
          if (!r) throw Error(C(147, e));
          var o = r,
            i = '' + e;
          return t !== null &&
            t.ref !== null &&
            typeof t.ref == 'function' &&
            t.ref._stringRef === i
            ? t.ref
            : ((t = function (s) {
                var l = o.refs;
                l === iy && (l = o.refs = {}),
                  s === null ? delete l[i] : (l[i] = s);
              }),
              (t._stringRef = i),
              t);
        }
        if (typeof e != 'string') throw Error(C(284));
        if (!n._owner) throw Error(C(290, e));
      }
      return e;
    }
    function hl(e, t) {
      throw (
        ((e = Object.prototype.toString.call(t)),
        Error(
          C(
            31,
            e === '[object Object]'
              ? 'object with keys {' + Object.keys(t).join(', ') + '}'
              : e,
          ),
        ))
      );
    }
    function Vm(e) {
      var t = e._init;
      return t(e._payload);
    }
    function ly(e) {
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
        return (h = Jn(h, c)), (h.index = 0), (h.sibling = null), h;
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
          ? ((c = Rc(d, h.mode, E)), (c.return = h), c)
          : ((c = o(c, d)), (c.return = h), c);
      }
      function a(h, c, d, E) {
        var R = d.type;
        return R === io
          ? f(h, c, d.props.children, E, d.key)
          : c !== null &&
            (c.elementType === R ||
              (typeof R == 'object' &&
                R !== null &&
                R.$$typeof === Fn &&
                Vm(R) === c.type))
          ? ((E = o(c, d.props)), (E.ref = gi(h, c, d)), (E.return = h), E)
          : ((E = Al(d.type, d.key, d.props, null, h.mode, E)),
            (E.ref = gi(h, c, d)),
            (E.return = h),
            E);
      }
      function u(h, c, d, E) {
        return c === null ||
          c.tag !== 4 ||
          c.stateNode.containerInfo !== d.containerInfo ||
          c.stateNode.implementation !== d.implementation
          ? ((c = xc(d, h.mode, E)), (c.return = h), c)
          : ((c = o(c, d.children || [])), (c.return = h), c);
      }
      function f(h, c, d, E, R) {
        return c === null || c.tag !== 7
          ? ((c = Rr(d, h.mode, E, R)), (c.return = h), c)
          : ((c = o(c, d)), (c.return = h), c);
      }
      function p(h, c, d) {
        if ((typeof c == 'string' && c !== '') || typeof c == 'number')
          return (c = Rc('' + c, h.mode, d)), (c.return = h), c;
        if (typeof c == 'object' && c !== null) {
          switch (c.$$typeof) {
            case Js:
              return (
                (d = Al(c.type, c.key, c.props, null, h.mode, d)),
                (d.ref = gi(h, null, c)),
                (d.return = h),
                d
              );
            case oo:
              return (c = xc(c, h.mode, d)), (c.return = h), c;
            case Fn:
              var E = c._init;
              return p(h, E(c._payload), d);
          }
          if (Ti(c) || hi(c))
            return (c = Rr(c, h.mode, d, null)), (c.return = h), c;
          hl(h, c);
        }
        return null;
      }
      function m(h, c, d, E) {
        var R = c !== null ? c.key : null;
        if ((typeof d == 'string' && d !== '') || typeof d == 'number')
          return R !== null ? null : l(h, c, '' + d, E);
        if (typeof d == 'object' && d !== null) {
          switch (d.$$typeof) {
            case Js:
              return d.key === R ? a(h, c, d, E) : null;
            case oo:
              return d.key === R ? u(h, c, d, E) : null;
            case Fn:
              return (R = d._init), m(h, c, R(d._payload), E);
          }
          if (Ti(d) || hi(d)) return R !== null ? null : f(h, c, d, E, null);
          hl(h, d);
        }
        return null;
      }
      function S(h, c, d, E, R) {
        if ((typeof E == 'string' && E !== '') || typeof E == 'number')
          return (h = h.get(d) || null), l(c, h, '' + E, R);
        if (typeof E == 'object' && E !== null) {
          switch (E.$$typeof) {
            case Js:
              return (
                (h = h.get(E.key === null ? d : E.key) || null), a(c, h, E, R)
              );
            case oo:
              return (
                (h = h.get(E.key === null ? d : E.key) || null), u(c, h, E, R)
              );
            case Fn:
              var x = E._init;
              return S(h, c, d, x(E._payload), R);
          }
          if (Ti(E) || hi(E))
            return (h = h.get(d) || null), f(c, h, E, R, null);
          hl(c, E);
        }
        return null;
      }
      function y(h, c, d, E) {
        for (
          var R = null, x = null, T = c, D = (c = 0), re = null;
          T !== null && D < d.length;
          D++
        ) {
          T.index > D ? ((re = T), (T = null)) : (re = T.sibling);
          var b = m(h, T, d[D], E);
          if (b === null) {
            T === null && (T = re);
            break;
          }
          e && T && b.alternate === null && t(h, T),
            (c = i(b, c, D)),
            x === null ? (R = b) : (x.sibling = b),
            (x = b),
            (T = re);
        }
        if (D === d.length) return n(h, T), we && gr(h, D), R;
        if (T === null) {
          for (; D < d.length; D++)
            (T = p(h, d[D], E)),
              T !== null &&
                ((c = i(T, c, D)),
                x === null ? (R = T) : (x.sibling = T),
                (x = T));
          return we && gr(h, D), R;
        }
        for (T = r(h, T); D < d.length; D++)
          (re = S(T, h, D, d[D], E)),
            re !== null &&
              (e &&
                re.alternate !== null &&
                T.delete(re.key === null ? D : re.key),
              (c = i(re, c, D)),
              x === null ? (R = re) : (x.sibling = re),
              (x = re));
        return (
          e &&
            T.forEach(function (fe) {
              return t(h, fe);
            }),
          we && gr(h, D),
          R
        );
      }
      function w(h, c, d, E) {
        var R = hi(d);
        if (typeof R != 'function') throw Error(C(150));
        if (((d = R.call(d)), d == null)) throw Error(C(151));
        for (
          var x = (R = null), T = c, D = (c = 0), re = null, b = d.next();
          T !== null && !b.done;
          D++, b = d.next()
        ) {
          T.index > D ? ((re = T), (T = null)) : (re = T.sibling);
          var fe = m(h, T, b.value, E);
          if (fe === null) {
            T === null && (T = re);
            break;
          }
          e && T && fe.alternate === null && t(h, T),
            (c = i(fe, c, D)),
            x === null ? (R = fe) : (x.sibling = fe),
            (x = fe),
            (T = re);
        }
        if (b.done) return n(h, T), we && gr(h, D), R;
        if (T === null) {
          for (; !b.done; D++, b = d.next())
            (b = p(h, b.value, E)),
              b !== null &&
                ((c = i(b, c, D)),
                x === null ? (R = b) : (x.sibling = b),
                (x = b));
          return we && gr(h, D), R;
        }
        for (T = r(h, T); !b.done; D++, b = d.next())
          (b = S(T, h, D, b.value, E)),
            b !== null &&
              (e &&
                b.alternate !== null &&
                T.delete(b.key === null ? D : b.key),
              (c = i(b, c, D)),
              x === null ? (R = b) : (x.sibling = b),
              (x = b));
        return (
          e &&
            T.forEach(function (bt) {
              return t(h, bt);
            }),
          we && gr(h, D),
          R
        );
      }
      function U(h, c, d, E) {
        if (
          (typeof d == 'object' &&
            d !== null &&
            d.type === io &&
            d.key === null &&
            (d = d.props.children),
          typeof d == 'object' && d !== null)
        ) {
          switch (d.$$typeof) {
            case Js:
              e: {
                for (var R = d.key, x = c; x !== null; ) {
                  if (x.key === R) {
                    if (((R = d.type), R === io)) {
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
                        R.$$typeof === Fn &&
                        Vm(R) === x.type)
                    ) {
                      n(h, x.sibling),
                        (c = o(x, d.props)),
                        (c.ref = gi(h, x, d)),
                        (c.return = h),
                        (h = c);
                      break e;
                    }
                    n(h, x);
                    break;
                  } else t(h, x);
                  x = x.sibling;
                }
                d.type === io
                  ? ((c = Rr(d.props.children, h.mode, E, d.key)),
                    (c.return = h),
                    (h = c))
                  : ((E = Al(d.type, d.key, d.props, null, h.mode, E)),
                    (E.ref = gi(h, c, d)),
                    (E.return = h),
                    (h = E));
              }
              return s(h);
            case oo:
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
                (c = xc(d, h.mode, E)), (c.return = h), (h = c);
              }
              return s(h);
            case Fn:
              return (x = d._init), U(h, c, x(d._payload), E);
          }
          if (Ti(d)) return y(h, c, d, E);
          if (hi(d)) return w(h, c, d, E);
          hl(h, d);
        }
        return (typeof d == 'string' && d !== '') || typeof d == 'number'
          ? ((d = '' + d),
            c !== null && c.tag === 6
              ? (n(h, c.sibling), (c = o(c, d)), (c.return = h), (h = c))
              : (n(h, c), (c = Rc(d, h.mode, E)), (c.return = h), (h = c)),
            s(h))
          : n(h, c);
      }
      return U;
    }
    var No = ly(!0),
      ay = ly(!1),
      ts = {},
      an = rr(ts),
      Gi = rr(ts),
      Ki = rr(ts);
    function wr(e) {
      if (e === ts) throw Error(C(174));
      return e;
    }
    function jf(e, t) {
      switch ((he(Ki, t), he(Gi, e), he(an, ts), (e = t.nodeType), e)) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : Mc(null, '');
          break;
        default:
          (e = e === 8 ? t.parentNode : t),
            (t = e.namespaceURI || null),
            (e = e.tagName),
            (t = Mc(t, e));
      }
      ve(an), he(an, t);
    }
    function Ao() {
      ve(an), ve(Gi), ve(Ki);
    }
    function uy(e) {
      wr(Ki.current);
      var t = wr(an.current),
        n = Mc(t, e.type);
      t !== n && (he(Gi, e), he(an, n));
    }
    function Hf(e) {
      Gi.current === e && (ve(an), ve(Gi));
    }
    var Re = rr(0);
    function Hl(e) {
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
    var gc = [];
    function Wf() {
      for (var e = 0; e < gc.length; e++)
        gc[e]._workInProgressVersionPrimary = null;
      gc.length = 0;
    }
    var wl = xn.ReactCurrentDispatcher,
      Sc = xn.ReactCurrentBatchConfig,
      Ar = 0,
      xe = null,
      Me = null,
      Ue = null,
      Wl = !1,
      Ii = !1,
      Qi = 0,
      kw = 0;
    function Qe() {
      throw Error(C(321));
    }
    function Gf(e, t) {
      if (t === null) return !1;
      for (var n = 0; n < t.length && n < e.length; n++)
        if (!Yt(e[n], t[n])) return !1;
      return !0;
    }
    function Kf(e, t, n, r, o, i) {
      if (
        ((Ar = i),
        (xe = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (wl.current = e === null || e.memoizedState === null ? Ow : Dw),
        (e = n(r, o)),
        Ii)
      ) {
        i = 0;
        do {
          if (((Ii = !1), (Qi = 0), 25 <= i)) throw Error(C(301));
          (i += 1),
            (Ue = Me = null),
            (t.updateQueue = null),
            (wl.current = Mw),
            (e = n(r, o));
        } while (Ii);
      }
      if (
        ((wl.current = Gl),
        (t = Me !== null && Me.next !== null),
        (Ar = 0),
        (Ue = Me = xe = null),
        (Wl = !1),
        t)
      )
        throw Error(C(300));
      return e;
    }
    function Qf() {
      var e = Qi !== 0;
      return (Qi = 0), e;
    }
    function on() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return Ue === null ? (xe.memoizedState = Ue = e) : (Ue = Ue.next = e), Ue;
    }
    function Ot() {
      if (Me === null) {
        var e = xe.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = Me.next;
      var t = Ue === null ? xe.memoizedState : Ue.next;
      if (t !== null) (Ue = t), (Me = e);
      else {
        if (e === null) throw Error(C(310));
        (Me = e),
          (e = {
            memoizedState: Me.memoizedState,
            baseState: Me.baseState,
            baseQueue: Me.baseQueue,
            queue: Me.queue,
            next: null,
          }),
          Ue === null ? (xe.memoizedState = Ue = e) : (Ue = Ue.next = e);
      }
      return Ue;
    }
    function Yi(e, t) {
      return typeof t == 'function' ? t(e) : t;
    }
    function _c(e) {
      var t = Ot(),
        n = t.queue;
      if (n === null) throw Error(C(311));
      n.lastRenderedReducer = e;
      var r = Me,
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
          if ((Ar & f) === f)
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
              (xe.lanes |= f),
              (Cr |= f);
          }
          u = u.next;
        } while (u !== null && u !== i);
        a === null ? (s = r) : (a.next = l),
          Yt(r, t.memoizedState) || (ct = !0),
          (t.memoizedState = r),
          (t.baseState = s),
          (t.baseQueue = a),
          (n.lastRenderedState = r);
      }
      if (((e = n.interleaved), e !== null)) {
        o = e;
        do (i = o.lane), (xe.lanes |= i), (Cr |= i), (o = o.next);
        while (o !== e);
      } else o === null && (n.lanes = 0);
      return [t.memoizedState, n.dispatch];
    }
    function Ec(e) {
      var t = Ot(),
        n = t.queue;
      if (n === null) throw Error(C(311));
      n.lastRenderedReducer = e;
      var r = n.dispatch,
        o = n.pending,
        i = t.memoizedState;
      if (o !== null) {
        n.pending = null;
        var s = (o = o.next);
        do (i = e(i, s.action)), (s = s.next);
        while (s !== o);
        Yt(i, t.memoizedState) || (ct = !0),
          (t.memoizedState = i),
          t.baseQueue === null && (t.baseState = i),
          (n.lastRenderedState = i);
      }
      return [i, r];
    }
    function cy() {}
    function fy(e, t) {
      var n = xe,
        r = Ot(),
        o = t(),
        i = !Yt(r.memoizedState, o);
      if (
        (i && ((r.memoizedState = o), (ct = !0)),
        (r = r.queue),
        Yf(hy.bind(null, n, r, e), [e]),
        r.getSnapshot !== t || i || (Ue !== null && Ue.memoizedState.tag & 1))
      ) {
        if (
          ((n.flags |= 2048),
          Zi(9, py.bind(null, n, r, o, t), void 0, null),
          Fe === null)
        )
          throw Error(C(349));
        Ar & 30 || dy(n, t, o);
      }
      return o;
    }
    function dy(e, t, n) {
      (e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = xe.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (xe.updateQueue = t),
            (t.stores = [e]))
          : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
    }
    function py(e, t, n, r) {
      (t.value = n), (t.getSnapshot = r), my(t) && vy(e);
    }
    function hy(e, t, n) {
      return n(function () {
        my(t) && vy(e);
      });
    }
    function my(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !Yt(e, n);
      } catch {
        return !0;
      }
    }
    function vy(e) {
      var t = Tn(e, 1);
      t !== null && Qt(t, e, 1, -1);
    }
    function bm(e) {
      var t = on();
      return (
        typeof e == 'function' && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Yi,
          lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = Pw.bind(null, xe, e)),
        [t.memoizedState, e]
      );
    }
    function Zi(e, t, n, r) {
      return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = xe.updateQueue),
        t === null
          ? ((t = { lastEffect: null, stores: null }),
            (xe.updateQueue = t),
            (t.lastEffect = e.next = e))
          : ((n = t.lastEffect),
            n === null
              ? (t.lastEffect = e.next = e)
              : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
        e
      );
    }
    function yy() {
      return Ot().memoizedState;
    }
    function Tl(e, t, n, r) {
      var o = on();
      (xe.flags |= e),
        (o.memoizedState = Zi(1 | t, n, void 0, r === void 0 ? null : r));
    }
    function ia(e, t, n, r) {
      var o = Ot();
      r = r === void 0 ? null : r;
      var i = void 0;
      if (Me !== null) {
        var s = Me.memoizedState;
        if (((i = s.destroy), r !== null && Gf(r, s.deps))) {
          o.memoizedState = Zi(t, n, i, r);
          return;
        }
      }
      (xe.flags |= e), (o.memoizedState = Zi(1 | t, n, i, r));
    }
    function $m(e, t) {
      return Tl(8390656, 8, e, t);
    }
    function Yf(e, t) {
      return ia(2048, 8, e, t);
    }
    function gy(e, t) {
      return ia(4, 2, e, t);
    }
    function Sy(e, t) {
      return ia(4, 4, e, t);
    }
    function _y(e, t) {
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
    function Ey(e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null), ia(4, 4, _y.bind(null, t, e), n)
      );
    }
    function Zf() {}
    function wy(e, t) {
      var n = Ot();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return r !== null && t !== null && Gf(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
    }
    function Ty(e, t) {
      var n = Ot();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return r !== null && t !== null && Gf(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
    }
    function Ry(e, t, n) {
      return Ar & 21
        ? (Yt(n, t) ||
            ((n = Av()), (xe.lanes |= n), (Cr |= n), (e.baseState = !0)),
          t)
        : (e.baseState && ((e.baseState = !1), (ct = !0)),
          (e.memoizedState = n));
    }
    function Lw(e, t) {
      var n = le;
      (le = n !== 0 && 4 > n ? n : 4), e(!0);
      var r = Sc.transition;
      Sc.transition = {};
      try {
        e(!1), t();
      } finally {
        (le = n), (Sc.transition = r);
      }
    }
    function xy() {
      return Ot().memoizedState;
    }
    function Iw(e, t, n) {
      var r = Xn(e);
      if (
        ((n = {
          lane: r,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        Ny(e))
      )
        Ay(t, n);
      else if (((n = ry(e, t, n, r)), n !== null)) {
        var o = ot();
        Qt(n, e, r, o), Cy(n, t, r);
      }
    }
    function Pw(e, t, n) {
      var r = Xn(e),
        o = {
          lane: r,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        };
      if (Ny(e)) Ay(t, o);
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
            if (((o.hasEagerState = !0), (o.eagerState = l), Yt(l, s))) {
              var a = t.interleaved;
              a === null
                ? ((o.next = o), zf(t))
                : ((o.next = a.next), (a.next = o)),
                (t.interleaved = o);
              return;
            }
          } catch {
          } finally {
          }
        (n = ry(e, t, o, r)),
          n !== null && ((o = ot()), Qt(n, e, r, o), Cy(n, t, r));
      }
    }
    function Ny(e) {
      var t = e.alternate;
      return e === xe || (t !== null && t === xe);
    }
    function Ay(e, t) {
      Ii = Wl = !0;
      var n = e.pending;
      n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t);
    }
    function Cy(e, t, n) {
      if (n & 4194240) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), Af(e, n);
      }
    }
    var Gl = {
        readContext: Pt,
        useCallback: Qe,
        useContext: Qe,
        useEffect: Qe,
        useImperativeHandle: Qe,
        useInsertionEffect: Qe,
        useLayoutEffect: Qe,
        useMemo: Qe,
        useReducer: Qe,
        useRef: Qe,
        useState: Qe,
        useDebugValue: Qe,
        useDeferredValue: Qe,
        useTransition: Qe,
        useMutableSource: Qe,
        useSyncExternalStore: Qe,
        useId: Qe,
        unstable_isNewReconciler: !1,
      },
      Ow = {
        readContext: Pt,
        useCallback: function (e, t) {
          return (on().memoizedState = [e, t === void 0 ? null : t]), e;
        },
        useContext: Pt,
        useEffect: $m,
        useImperativeHandle: function (e, t, n) {
          return (
            (n = n != null ? n.concat([e]) : null),
            Tl(4194308, 4, _y.bind(null, t, e), n)
          );
        },
        useLayoutEffect: function (e, t) {
          return Tl(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
          return Tl(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = on();
          return (
            (t = t === void 0 ? null : t),
            (e = e()),
            (n.memoizedState = [e, t]),
            e
          );
        },
        useReducer: function (e, t, n) {
          var r = on();
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
            (e = e.dispatch = Iw.bind(null, xe, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          var t = on();
          return (
            (e = {
              current: e,
            }),
            (t.memoizedState = e)
          );
        },
        useState: bm,
        useDebugValue: Zf,
        useDeferredValue: function (e) {
          return (on().memoizedState = e);
        },
        useTransition: function () {
          var e = bm(!1),
            t = e[0];
          return (e = Lw.bind(null, e[1])), (on().memoizedState = e), [t, e];
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
          var r = xe,
            o = on();
          if (we) {
            if (n === void 0) throw Error(C(407));
            n = n();
          } else {
            if (((n = t()), Fe === null)) throw Error(C(349));
            Ar & 30 || dy(r, t, n);
          }
          o.memoizedState = n;
          var i = { value: n, getSnapshot: t };
          return (
            (o.queue = i),
            $m(hy.bind(null, r, i, e), [e]),
            (r.flags |= 2048),
            Zi(9, py.bind(null, r, i, n, t), void 0, null),
            n
          );
        },
        useId: function () {
          var e = on(),
            t = Fe.identifierPrefix;
          if (we) {
            var n = Sn,
              r = gn;
            (n = (r & ~(1 << (32 - Kt(r) - 1))).toString(32) + n),
              (t = ':' + t + 'R' + n),
              (n = Qi++),
              0 < n && (t += 'H' + n.toString(32)),
              (t += ':');
          } else (n = kw++), (t = ':' + t + 'r' + n.toString(32) + ':');
          return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
      },
      Dw = {
        readContext: Pt,
        useCallback: wy,
        useContext: Pt,
        useEffect: Yf,
        useImperativeHandle: Ey,
        useInsertionEffect: gy,
        useLayoutEffect: Sy,
        useMemo: Ty,
        useReducer: _c,
        useRef: yy,
        useState: function () {
          return _c(Yi);
        },
        useDebugValue: Zf,
        useDeferredValue: function (e) {
          var t = Ot();
          return Ry(t, Me.memoizedState, e);
        },
        useTransition: function () {
          var e = _c(Yi)[0],
            t = Ot().memoizedState;
          return [e, t];
        },
        useMutableSource: cy,
        useSyncExternalStore: fy,
        useId: xy,
        unstable_isNewReconciler: !1,
      },
      Mw = {
        readContext: Pt,
        useCallback: wy,
        useContext: Pt,
        useEffect: Yf,
        useImperativeHandle: Ey,
        useInsertionEffect: gy,
        useLayoutEffect: Sy,
        useMemo: Ty,
        useReducer: Ec,
        useRef: yy,
        useState: function () {
          return Ec(Yi);
        },
        useDebugValue: Zf,
        useDeferredValue: function (e) {
          var t = Ot();
          return Me === null
            ? (t.memoizedState = e)
            : Ry(t, Me.memoizedState, e);
        },
        useTransition: function () {
          var e = Ec(Yi)[0],
            t = Ot().memoizedState;
          return [e, t];
        },
        useMutableSource: cy,
        useSyncExternalStore: fy,
        useId: xy,
        unstable_isNewReconciler: !1,
      };
    function Co(e, t) {
      try {
        var n = '',
          r = t;
        do (n += fE(r)), (r = r.return);
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
    function wc(e, t, n) {
      return { value: e, source: null, stack: n ?? null, digest: t ?? null };
    }
    function of(e, t) {
      try {
        console.error(t.value);
      } catch (n) {
        setTimeout(function () {
          throw n;
        });
      }
    }
    var Vw = typeof WeakMap == 'function' ? WeakMap : Map;
    function ky(e, t, n) {
      (n = _n(-1, n)), (n.tag = 3), (n.payload = { element: null });
      var r = t.value;
      return (
        (n.callback = function () {
          Ql || ((Ql = !0), (mf = r)), of(e, t);
        }),
        n
      );
    }
    function Ly(e, t, n) {
      (n = _n(-1, n)), (n.tag = 3);
      var r = e.type.getDerivedStateFromError;
      if (typeof r == 'function') {
        var o = t.value;
        (n.payload = function () {
          return r(o);
        }),
          (n.callback = function () {
            of(e, t);
          });
      }
      var i = e.stateNode;
      return (
        i !== null &&
          typeof i.componentDidCatch == 'function' &&
          (n.callback = function () {
            of(e, t),
              typeof r != 'function' &&
                (qn === null ? (qn = new Set([this])) : qn.add(this));
            var s = t.stack;
            this.componentDidCatch(t.value, {
              componentStack: s !== null ? s : '',
            });
          }),
        n
      );
    }
    function Um(e, t, n) {
      var r = e.pingCache;
      if (r === null) {
        r = e.pingCache = new Vw();
        var o = new Set();
        r.set(t, o);
      } else (o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o));
      o.has(n) || (o.add(n), (e = Zw.bind(null, e, t, n)), t.then(e, e));
    }
    function Fm(e) {
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
    function zm(e, t, n, r, o) {
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
                  : ((t = _n(-1, 1)), (t.tag = 2), Zn(n, t, 1))),
              (n.lanes |= 1)),
          e);
    }
    var bw = xn.ReactCurrentOwner,
      ct = !1;
    function rt(e, t, n, r) {
      t.child = e === null ? ay(t, null, n, r) : No(t, e.child, n, r);
    }
    function Bm(e, t, n, r, o) {
      n = n.render;
      var i = t.ref;
      return (
        Eo(t, o),
        (r = Kf(e, t, n, r, i, o)),
        (n = Qf()),
        e !== null && !ct
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~o),
            Rn(e, t, o))
          : (we && n && Mf(t), (t.flags |= 1), rt(e, t, r, o), t.child)
      );
    }
    function jm(e, t, n, r, o) {
      if (e === null) {
        var i = n.type;
        return typeof i == 'function' &&
          !od(i) &&
          i.defaultProps === void 0 &&
          n.compare === null &&
          n.defaultProps === void 0
          ? ((t.tag = 15), (t.type = i), Iy(e, t, i, r, o))
          : ((e = Al(n.type, null, r, t, t.mode, o)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e));
      }
      if (((i = e.child), !(e.lanes & o))) {
        var s = i.memoizedProps;
        if (
          ((n = n.compare),
          (n = n !== null ? n : Bi),
          n(s, r) && e.ref === t.ref)
        )
          return Rn(e, t, o);
      }
      return (
        (t.flags |= 1),
        (e = Jn(i, r)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
      );
    }
    function Iy(e, t, n, r, o) {
      if (e !== null) {
        var i = e.memoizedProps;
        if (Bi(i, r) && e.ref === t.ref)
          if (((ct = !1), (t.pendingProps = r = i), (e.lanes & o) !== 0))
            e.flags & 131072 && (ct = !0);
          else return (t.lanes = e.lanes), Rn(e, t, o);
      }
      return sf(e, t, n, r, o);
    }
    function Py(e, t, n) {
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
            he(vo, yt),
            (yt |= n);
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
              he(vo, yt),
              (yt |= e),
              null
            );
          (t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            (r = i !== null ? i.baseLanes : n),
            he(vo, yt),
            (yt |= r);
        }
      else
        i !== null
          ? ((r = i.baseLanes | n), (t.memoizedState = null))
          : (r = n),
          he(vo, yt),
          (yt |= r);
      return rt(e, t, o, n), t.child;
    }
    function Oy(e, t) {
      var n = t.ref;
      ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
    }
    function sf(e, t, n, r, o) {
      var i = dt(n) ? xr : qe.current;
      return (
        (i = Ro(t, i)),
        Eo(t, o),
        (n = Kf(e, t, n, r, i, o)),
        (r = Qf()),
        e !== null && !ct
          ? ((t.updateQueue = e.updateQueue),
            (t.flags &= -2053),
            (e.lanes &= ~o),
            Rn(e, t, o))
          : (we && r && Mf(t), (t.flags |= 1), rt(e, t, n, o), t.child)
      );
    }
    function Hm(e, t, n, r, o) {
      if (dt(n)) {
        var i = !0;
        $l(t);
      } else i = !1;
      if ((Eo(t, o), t.stateNode === null))
        Rl(e, t), sy(t, n, r), rf(t, n, r, o), (r = !0);
      else if (e === null) {
        var s = t.stateNode,
          l = t.memoizedProps;
        s.props = l;
        var a = s.context,
          u = n.contextType;
        typeof u ==
          '\
object' && u !== null
          ? (u = Pt(u))
          : ((u = dt(n) ? xr : qe.current), (u = Ro(t, u)));
        var f = n.getDerivedStateFromProps,
          p =
            typeof f == 'function' ||
            typeof s.getSnapshotBeforeUpdate == 'function';
        p ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((l !== r || a !== u) && Mm(t, s, r, u)),
          (zn = !1);
        var m = t.memoizedState;
        (s.state = m),
          jl(t, r, s, o),
          (a = t.memoizedState),
          l !== r || m !== a || ft.current || zn
            ? (typeof f == 'function' &&
                (nf(t, n, f, r), (a = t.memoizedState)),
              (l = zn || Dm(t, n, l, r, m, a, u))
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
          oy(e, t),
          (l = t.memoizedProps),
          (u = t.type === t.elementType ? l : Ht(t.type, l)),
          (s.props = u),
          (p = t.pendingProps),
          (m = s.context),
          (a = n.contextType),
          typeof a == 'object' && a !== null
            ? (a = Pt(a))
            : ((a = dt(n) ? xr : qe.current), (a = Ro(t, a)));
        var S = n.getDerivedStateFromProps;
        (f =
          typeof S == 'function' ||
          typeof s.getSnapshotBeforeUpdate == 'function') ||
          (typeof s.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof s.componentWillReceiveProps != 'function') ||
          ((l !== p || m !== a) && Mm(t, s, r, a)),
          (zn = !1),
          (m = t.memoizedState),
          (s.state = m),
          jl(t, r, s, o);
        var y = t.memoizedState;
        l !== p || m !== y || ft.current || zn
          ? (typeof S == 'function' && (nf(t, n, S, r), (y = t.memoizedState)),
            (u = zn || Dm(t, n, u, r, m, y, a) || !1)
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
      return lf(e, t, n, r, i, o);
    }
    function lf(e, t, n, r, o, i) {
      Oy(e, t);
      var s = (t.flags & 128) !== 0;
      if (!r && !s) return o && km(t, n, !1), Rn(e, t, i);
      (r = t.stateNode), (bw.current = t);
      var l =
        s && typeof n.getDerivedStateFromError != 'function'
          ? null
          : r.render();
      return (
        (t.flags |= 1),
        e !== null && s
          ? ((t.child = No(t, e.child, null, i)), (t.child = No(t, null, l, i)))
          : rt(e, t, l, i),
        (t.memoizedState = r.state),
        o && km(t, n, !0),
        t.child
      );
    }
    function Dy(e) {
      var t = e.stateNode;
      t.pendingContext
        ? Cm(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && Cm(e, t.context, !1),
        jf(e, t.containerInfo);
    }
    function Wm(e, t, n, r, o) {
      return xo(), bf(o), (t.flags |= 256), rt(e, t, n, r), t.child;
    }
    var af = { dehydrated: null, treeContext: null, retryLane: 0 };
    function uf(e) {
      return { baseLanes: e, cachePool: null, transitions: null };
    }
    function My(e, t, n) {
      var r = t.pendingProps,
        o = Re.current,
        i = !1,
        s = (t.flags & 128) !== 0,
        l;
      if (
        ((l = s) ||
          (l = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
        l
          ? ((i = !0), (t.flags &= -129))
          : (e === null || e.memoizedState !== null) && (o |= 1),
        he(Re, o & 1),
        e === null)
      )
        return (
          ef(t),
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
                    : (i = aa(s, r, 0, null)),
                  (e = Rr(e, r, n, null)),
                  (i.return = t),
                  (e.return = t),
                  (i.sibling = e),
                  (t.child = i),
                  (t.child.memoizedState = uf(n)),
                  (t.memoizedState = af),
                  e)
                : qf(t, s))
        );
      if (
        ((o = e.memoizedState), o !== null && ((l = o.dehydrated), l !== null))
      )
        return $w(e, t, s, r, l, o, n);
      if (i) {
        (i = r.fallback), (s = t.mode), (o = e.child), (l = o.sibling);
        var a = { mode: 'hidden', children: r.children };
        return (
          !(s & 1) && t.child !== o
            ? ((r = t.child),
              (r.childLanes = 0),
              (r.pendingProps = a),
              (t.deletions = null))
            : ((r = Jn(o, a)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
          l !== null
            ? (i = Jn(l, i))
            : ((i = Rr(i, s, n, null)), (i.flags |= 2)),
          (i.return = t),
          (r.return = t),
          (r.sibling = i),
          (t.child = r),
          (r = i),
          (i = t.child),
          (s = e.child.memoizedState),
          (s =
            s === null
              ? uf(n)
              : {
                  baseLanes: s.baseLanes | n,
                  cachePool: null,
                  transitions: s.transitions,
                }),
          (i.memoizedState = s),
          (i.childLanes = e.childLanes & ~n),
          (t.memoizedState = af),
          r
        );
      }
      return (
        (i = e.child),
        (e = i.sibling),
        (r = Jn(i, { mode: 'visible', children: r.children })),
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
    function qf(e, t) {
      return (
        (t = aa({ mode: 'visible', children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
      );
    }
    function ml(e, t, n, r) {
      return (
        r !== null && bf(r),
        No(t, e.child, null, n),
        (e = qf(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
      );
    }
    function $w(e, t, n, r, o, i, s) {
      if (n)
        return t.flags & 256
          ? ((t.flags &= -257), (r = wc(Error(C(422)))), ml(e, t, s, r))
          : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((i = r.fallback),
            (o = t.mode),
            (r = aa({ mode: 'visible', children: r.children }, o, 0, null)),
            (i = Rr(i, o, s, null)),
            (i.flags |= 2),
            (r.return = t),
            (i.return = t),
            (r.sibling = i),
            (t.child = r),
            t.mode & 1 && No(t, e.child, null, s),
            (t.child.memoizedState = uf(s)),
            (t.memoizedState = af),
            i);
      if (!(t.mode & 1)) return ml(e, t, s, null);
      if (o.data === '$!') {
        if (((r = o.nextSibling && o.nextSibling.dataset), r)) var l = r.dgst;
        return (
          (r = l), (i = Error(C(419))), (r = wc(i, r, void 0)), ml(e, t, s, r)
        );
      }
      if (((l = (s & e.childLanes) !== 0), ct || l)) {
        if (((r = Fe), r !== null)) {
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
              ((i.retryLane = o), Tn(e, o), Qt(r, e, o, -1));
        }
        return rd(), (r = wc(Error(C(421)))), ml(e, t, s, r);
      }
      return o.data === '$?'
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = qw.bind(null, e)),
          (o._reactRetry = t),
          null)
        : ((e = i.treeContext),
          (gt = Yn(o.nextSibling)),
          (St = t),
          (we = !0),
          (Gt = null),
          e !== null &&
            ((Ct[kt++] = gn),
            (Ct[kt++] = Sn),
            (Ct[kt++] = Nr),
            (gn = e.id),
            (Sn = e.overflow),
            (Nr = t)),
          (t = qf(t, r.children)),
          (t.flags |= 4096),
          t);
    }
    function Gm(e, t, n) {
      e.lanes |= t;
      var r = e.alternate;
      r !== null && (r.lanes |= t), tf(e.return, t, n);
    }
    function Tc(e, t, n, r, o) {
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
    function Vy(e, t, n) {
      var r = t.pendingProps,
        o = r.revealOrder,
        i = r.tail;
      if ((rt(e, t, r.children, n), (r = Re.current), r & 2))
        (r = (r & 1) | 2), (t.flags |= 128);
      else {
        if (e !== null && e.flags & 128)
          e: for (e = t.child; e !== null; ) {
            if (e.tag === 13) e.memoizedState !== null && Gm(e, n, t);
            else if (e.tag === 19) Gm(e, n, t);
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
      if ((he(Re, r), !(t.mode & 1))) t.memoizedState = null;
      else
        switch (o) {
          case 'forwards':
            for (n = t.child, o = null; n !== null; )
              (e = n.alternate),
                e !== null && Hl(e) === null && (o = n),
                (n = n.sibling);
            (n = o),
              n === null
                ? ((o = t.child), (t.child = null))
                : ((o = n.sibling), (n.sibling = null)),
              Tc(t, !1, o, n, i);
            break;
          case 'backwards':
            for (n = null, o = t.child, t.child = null; o !== null; ) {
              if (((e = o.alternate), e !== null && Hl(e) === null)) {
                t.child = o;
                break;
              }
              (e = o.sibling), (o.sibling = n), (n = o), (o = e);
            }
            Tc(t, !0, n, null, i);
            break;
          case 'together':
            Tc(t, !1, null, null, void 0);
            break;
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function Rl(e, t) {
      !(t.mode & 1) &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
    }
    function Rn(e, t, n) {
      if (
        (e !== null && (t.dependencies = e.dependencies),
        (Cr |= t.lanes),
        !(n & t.childLanes))
      )
        return null;
      if (e !== null && t.child !== e.child) throw Error(C(153));
      if (t.child !== null) {
        for (
          e = t.child, n = Jn(e, e.pendingProps), t.child = n, n.return = t;
          e.sibling !== null;

        )
          (e = e.sibling),
            (n = n.sibling = Jn(e, e.pendingProps)),
            (n.return = t);
        n.sibling = null;
      }
      return t.child;
    }
    function Uw(e, t, n) {
      switch (t.tag) {
        case 3:
          Dy(t), xo();
          break;
        case 5:
          uy(t);
          break;
        case 1:
          dt(t.type) && $l(t);
          break;
        case 4:
          jf(t, t.stateNode.containerInfo);
          break;
        case 10:
          var r = t.type._context,
            o = t.memoizedProps.value;
          he(zl, r._currentValue), (r._currentValue = o);
          break;
        case 13:
          if (((r = t.memoizedState), r !== null))
            return r.dehydrated !== null
              ? (he(Re, Re.current & 1), (t.flags |= 128), null)
              : n & t.child.childLanes
              ? My(e, t, n)
              : (he(Re, Re.current & 1),
                (e = Rn(e, t, n)),
                e !== null ? e.sibling : null);
          he(Re, Re.current & 1);
          break;
        case 19:
          if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
            if (r) return Vy(e, t, n);
            t.flags |= 128;
          }
          if (
            ((o = t.memoizedState),
            o !== null &&
              ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
            he(Re, Re.current),
            r)
          )
            break;
          return null;
        case 22:
        case 23:
          return (t.lanes = 0), Py(e, t, n);
      }
      return Rn(e, t, n);
    }
    var by, cf, $y, Uy;
    by = function (e, t) {
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
    cf = function () {};
    $y = function (e, t, n, r) {
      var o = e.memoizedProps;
      if (o !== r) {
        (e = t.stateNode), wr(an.current);
        var i = null;
        switch (n) {
          case 'input':
            (o = Ic(e, o)), (r = Ic(e, r)), (i = []);
            break;
          case 'select':
            (o = Ne({}, o, { value: void 0 })),
              (r = Ne({}, r, { value: void 0 })),
              (i = []);
            break;
          case 'textarea':
            (o = Dc(e, o)), (r = Dc(e, r)), (i = []);
            break;
          default:
            typeof o.onClick != 'function' &&
              typeof r.onClick == 'function' &&
              (e.onclick = Vl);
        }
        Vc(n, r);
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
                (Mi.hasOwnProperty(u)
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
                  (Mi.hasOwnProperty(u)
                    ? (a != null &&
                        u ===
                          'o\
nScroll' &&
                        me('scroll', e),
                      i || l === a || (i = []))
                    : (i = i || []).push(u, a));
        }
        n && (i = i || []).push('style', n);
        var u = i;
        (t.updateQueue = u) && (t.flags |= 4);
      }
    };
    Uy = function (e, t, n, r) {
      n !== r && (t.flags |= 4);
    };
    function Si(e, t) {
      if (!we)
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
    function Ye(e) {
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
    function Fw(e, t, n) {
      var r = t.pendingProps;
      switch ((Vf(t), t.tag)) {
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
          return Ye(t), null;
        case 1:
          return dt(t.type) && bl(), Ye(t), null;
        case 3:
          return (
            (r = t.stateNode),
            Ao(),
            ve(ft),
            ve(qe),
            Wf(),
            r.pendingContext &&
              ((r.context = r.pendingContext), (r.pendingContext = null)),
            (e === null || e.child === null) &&
              (pl(t)
                ? (t.flags |= 4)
                : e === null ||
                  (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                  ((t.flags |= 1024), Gt !== null && (gf(Gt), (Gt = null)))),
            cf(e, t),
            Ye(t),
            null
          );
        case 5:
          Hf(t);
          var o = wr(Ki.current);
          if (((n = t.type), e !== null && t.stateNode != null))
            $y(e, t, n, r, o),
              e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
          else {
            if (!r) {
              if (t.stateNode === null) throw Error(C(166));
              return Ye(t), null;
            }
            if (((e = wr(an.current)), pl(t))) {
              (r = t.stateNode), (n = t.type);
              var i = t.memoizedProps;
              switch (((r[sn] = t), (r[Wi] = i), (e = (t.mode & 1) !== 0), n)) {
                case 'dialog':
                  me('cancel', r), me('close', r);
                  break;
                case 'iframe':
                case 'object':
                case 'embed':
                  me('load', r);
                  break;
                case 'video':
                case 'audio':
                  for (o = 0; o < xi.length; o++) me(xi[o], r);
                  break;
                case 'source':
                  me('error', r);
                  break;
                case 'img':
                case 'image':
                case 'link':
                  me('error', r), me('load', r);
                  break;
                case 'details':
                  me('toggle', r);
                  break;
                case 'input':
                  em(r, i), me('invalid', r);
                  break;
                case '\
select':
                  (r._wrapperState = { wasMultiple: !!i.multiple }),
                    me('invalid', r);
                  break;
                case 'textarea':
                  nm(r, i), me('invalid', r);
              }
              Vc(n, i), (o = null);
              for (var s in i)
                if (i.hasOwnProperty(s)) {
                  var l = i[s];
                  s === 'children'
                    ? typeof l == 'string'
                      ? r.textContent !== l &&
                        (i.suppressHydrationWarning !== !0 &&
                          dl(r.textContent, l, e),
                        (o = ['children', l]))
                      : typeof l == 'number' &&
                        r.textContent !== '' + l &&
                        (i.suppressHydrationWarning !== !0 &&
                          dl(r.textContent, l, e),
                        (o = ['children', '' + l]))
                    : Mi.hasOwnProperty(s) &&
                      l != null &&
                      s === 'onScroll' &&
                      me('scroll', r);
                }
              switch (n) {
                case '\
input':
                  el(r), tm(r, i, !0);
                  break;
                case 'textarea':
                  el(r), rm(r);
                  break;
                case 'select':
                case 'option':
                  break;
                default:
                  typeof i.onClick == 'function' && (r.onclick = Vl);
              }
              (r = o), (t.updateQueue = r), r !== null && (t.flags |= 4);
            } else {
              (s = o.nodeType === 9 ? o : o.ownerDocument),
                e === 'http://www.w3.org/1999/xhtml' && (e = dv(n)),
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
                (e[sn] = t),
                (e[Wi] = r),
                by(e, t, !1, !1),
                (t.stateNode = e);
              e: {
                switch (((s = bc(n, r)), n)) {
                  case 'dialog':
                    me('cancel', e), me('close', e), (o = r);
                    break;
                  case 'iframe':
                  case 'object':
                  case 'embed':
                    me('load', e), (o = r);
                    break;
                  case 'video':
                  case 'audio':
                    for (o = 0; o < xi.length; o++) me(xi[o], e);
                    o = r;
                    break;
                  case 'source':
                    me('error', e), (o = r);
                    break;
                  case 'img':
                  case 'image':
                  case 'link':
                    me('error', e), me('load', e), (o = r);
                    break;
                  case 'details':
                    me('toggle', e), (o = r);
                    break;
                  case 'input':
                    em(e, r), (o = Ic(e, r)), me('invalid', e);
                    break;
                  case 'option':
                    o = r;
                    break;
                  case 'select':
                    (e._wrapperState = { wasMultiple: !!r.multiple }),
                      (o = Ne({}, r, { value: void 0 })),
                      me('invalid', e);
                    break;
                  case 'textarea':
                    nm(e, r), (o = Dc(e, r)), me('invalid', e);
                    break;
                  default:
                    o = r;
                }
                Vc(n, o), (l = o);
                for (i in l)
                  if (l.hasOwnProperty(i)) {
                    var a = l[i];
                    i === 'style'
                      ? mv(e, a)
                      : i === 'dangerouslySetInnerHTML'
                      ? ((a = a ? a.__html : void 0), a != null && pv(e, a))
                      : i === 'children'
                      ? typeof a == 'string'
                        ? (n !== 'textarea' || a !== '') && Vi(e, a)
                        : typeof a == 'number' && Vi(e, '' + a)
                      : i !==
                          'suppressContentEditable\
Warning' &&
                        i !== 'suppressHydrationWarning' &&
                        i !== 'autoFocus' &&
                        (Mi.hasOwnProperty(i)
                          ? a != null && i === 'onScroll' && me('scroll', e)
                          : a != null && Ef(e, i, a, s));
                  }
                switch (n) {
                  case 'input':
                    el(e), tm(e, r, !1);
                    break;
                  case 'textarea':
                    el(e), rm(e);
                    break;
                  case 'option':
                    r.value != null &&
                      e.setAttribute('value', '' + er(r.value));
                    break;
                  case 'select':
                    (e.multiple = !!r.multiple),
                      (i = r.value),
                      i != null
                        ? yo(e, !!r.multiple, i, !1)
                        : r.defaultValue != null &&
                          yo(e, !!r.multiple, r.defaultValue, !0);
                    break;
                  default:
                    typeof o.onClick == 'function' && (e.onclick = Vl);
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
          return Ye(t), null;
        case 6:
          if (e && t.stateNode != null) Uy(e, t, e.memoizedProps, r);
          else {
            if (typeof r != 'string' && t.stateNode === null)
              throw Error(C(166));
            if (((n = wr(Ki.current)), wr(an.current), pl(t))) {
              if (
                ((r = t.stateNode),
                (n = t.memoizedProps),
                (r[sn] = t),
                (i = r.nodeValue !== n) && ((e = St), e !== null))
              )
                switch (e.tag) {
                  case 3:
                    dl(r.nodeValue, n, (e.mode & 1) !== 0);
                    break;
                  case 5:
                    e.memoizedProps.suppressHydrationWarning !== !0 &&
                      dl(r.nodeValue, n, (e.mode & 1) !== 0);
                }
              i && (t.flags |= 4);
            } else
              (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
                (r[sn] = t),
                (t.stateNode = r);
          }
          return Ye(t), null;
        case 13:
          if (
            (ve(Re),
            (r = t.memoizedState),
            e === null ||
              (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
          ) {
            if (we && gt !== null && t.mode & 1 && !(t.flags & 128))
              ny(), xo(), (t.flags |= 98560), (i = !1);
            else if (((i = pl(t)), r !== null && r.dehydrated !== null)) {
              if (e === null) {
                if (!i) throw Error(C(318));
                if (
                  ((i = t.memoizedState),
                  (i = i !== null ? i.dehydrated : null),
                  !i)
                )
                  throw Error(C(317));
                i[sn] = t;
              } else
                xo(),
                  !(t.flags & 128) && (t.memoizedState = null),
                  (t.flags |= 4);
              Ye(t), (i = !1);
            } else Gt !== null && (gf(Gt), (Gt = null)), (i = !0);
            if (!i) return t.flags & 65536 ? t : null;
          }
          return t.flags & 128
            ? ((t.lanes = n), t)
            : ((r = r !== null),
              r !== (e !== null && e.memoizedState !== null) &&
                r &&
                ((t.child.flags |= 8192),
                t.mode & 1 &&
                  (e === null || Re.current & 1 ? Ve === 0 && (Ve = 3) : rd())),
              t.updateQueue !== null && (t.flags |= 4),
              Ye(t),
              null);
        case 4:
          return (
            Ao(),
            cf(e, t),
            e === null && ji(t.stateNode.containerInfo),
            Ye(t),
            null
          );
        case 10:
          return Ff(t.type._context), Ye(t), null;
        case 17:
          return dt(t.type) && bl(), Ye(t), null;
        case 19:
          if ((ve(Re), (i = t.memoizedState), i === null)) return Ye(t), null;
          if (((r = (t.flags & 128) !== 0), (s = i.rendering), s === null))
            if (r) Si(i, !1);
            else {
              if (Ve !== 0 || (e !== null && e.flags & 128))
                for (e = t.child; e !== null; ) {
                  if (((s = Hl(e)), s !== null)) {
                    for (
                      t.flags |= 128,
                        Si(i, !1),
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
                    return he(Re, (Re.current & 1) | 2), t.child;
                  }
                  e = e.sibling;
                }
              i.tail !== null &&
                ke() > ko &&
                ((t.flags |= 128), (r = !0), Si(i, !1), (t.lanes = 4194304));
            }
          else {
            if (!r)
              if (((e = Hl(s)), e !== null)) {
                if (
                  ((t.flags |= 128),
                  (r = !0),
                  (n = e.updateQueue),
                  n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                  Si(i, !0),
                  i.tail === null &&
                    i.tailMode === 'hidden' &&
                    !s.alternate &&
                    !we)
                )
                  return Ye(t), null;
              } else
                2 * ke() - i.renderingStartTime > ko &&
                  n !== 1073741824 &&
                  ((t.flags |= 128), (r = !0), Si(i, !1), (t.lanes = 4194304));
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
              (i.renderingStartTime = ke()),
              (t.sibling = null),
              (n = Re.current),
              he(Re, r ? (n & 1) | 2 : n & 1),
              t)
            : (Ye(t), null);
        case 22:
        case 23:
          return (
            nd(),
            (r = t.memoizedState !== null),
            e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
            r && t.mode & 1
              ? yt & 1073741824 &&
                (Ye(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : Ye(t),
            null
          );
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(C(156, t.tag));
    }
    function zw(e, t) {
      switch ((Vf(t), t.tag)) {
        case 1:
          return (
            dt(t.type) && bl(),
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 3:
          return (
            Ao(),
            ve(ft),
            ve(qe),
            Wf(),
            (e = t.flags),
            e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 5:
          return Hf(t), null;
        case 13:
          if (
            (ve(Re), (e = t.memoizedState), e !== null && e.dehydrated !== null)
          ) {
            if (t.alternate === null) throw Error(C(340));
            xo();
          }
          return (
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 19:
          return ve(Re), null;
        case 4:
          return Ao(), null;
        case 10:
          return Ff(t.type._context), null;
        case 22:
        case 23:
          return nd(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var vl = !1,
      Ze = !1,
      Bw = typeof WeakSet == 'function' ? WeakSet : Set,
      M = null;
    function mo(e, t) {
      var n = e.ref;
      if (n !== null)
        if (typeof n == 'function')
          try {
            n(null);
          } catch (r) {
            Ae(e, t, r);
          }
        else n.current = null;
    }
    function ff(e, t, n) {
      try {
        n();
      } catch (r) {
        Ae(e, t, r);
      }
    }
    var Km = !1;
    function jw(e, t) {
      if (((Kc = Ol), (e = jv()), Df(e))) {
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
        Qc = { focusedElem: e, selectionRange: n }, Ol = !1, M = t;
        M !== null;

      )
        if (
          ((t = M), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
        )
          (e.return = t), (M = e);
        else
          for (; M !== null; ) {
            t = M;
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
                          t.elementType === t.type ? w : Ht(t.type, w),
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
                    throw Error(C(163));
                }
            } catch (E) {
              Ae(t, t.return, E);
            }
            if (((e = t.sibling), e !== null)) {
              (e.return = t.return), (M = e);
              break;
            }
            M = t.return;
          }
      return (y = Km), (Km = !1), y;
    }
    function Pi(e, t, n) {
      var r = t.updateQueue;
      if (((r = r !== null ? r.lastEffect : null), r !== null)) {
        var o = (r = r.next);
        do {
          if ((o.tag & e) === e) {
            var i = o.destroy;
            (o.destroy = void 0), i !== void 0 && ff(t, n, i);
          }
          o = o.next;
        } while (o !== r);
      }
    }
    function sa(e, t) {
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
    function df(e) {
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
    function Fy(e) {
      var t = e.alternate;
      t !== null && ((e.alternate = null), Fy(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
          ((t = e.stateNode),
          t !== null &&
            (delete t[sn],
            delete t[Wi],
            delete t[qc],
            delete t[xw],
            delete t[Nw])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null);
    }
    function zy(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function Qm(e) {
      e: for (;;) {
        for (; e.sibling === null; ) {
          if (e.return === null || zy(e.return)) return null;
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
    function pf(e, t, n) {
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
              n != null || t.onclick !== null || (t.onclick = Vl));
      else if (r !== 4 && ((e = e.child), e !== null))
        for (pf(e, t, n), e = e.sibling; e !== null; )
          pf(e, t, n), (e = e.sibling);
    }
    function hf(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6)
        (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
      else if (r !== 4 && ((e = e.child), e !== null))
        for (hf(e, t, n), e = e.sibling; e !== null; )
          hf(e, t, n), (e = e.sibling);
    }
    var ze = null,
      Wt = !1;
    function Un(e, t, n) {
      for (n = n.child; n !== null; ) By(e, t, n), (n = n.sibling);
    }
    function By(e, t, n) {
      if (
        ln &&
        typeof ln.onCommitFiberUnmount ==
          'fun\
ction'
      )
        try {
          ln.onCommitFiberUnmount(Xl, n);
        } catch {}
      switch (n.tag) {
        case 5:
          Ze || mo(n, t);
        case 6:
          var r = ze,
            o = Wt;
          (ze = null),
            Un(e, t, n),
            (ze = r),
            (Wt = o),
            ze !== null &&
              (Wt
                ? ((e = ze),
                  (n = n.stateNode),
                  e.nodeType === 8
                    ? e.parentNode.removeChild(n)
                    : e.removeChild(n))
                : ze.removeChild(n.stateNode));
          break;
        case 18:
          ze !== null &&
            (Wt
              ? ((e = ze),
                (n = n.stateNode),
                e.nodeType === 8
                  ? vc(e.parentNode, n)
                  : e.nodeType === 1 && vc(e, n),
                Fi(e))
              : vc(ze, n.stateNode));
          break;
        case 4:
          (r = ze),
            (o = Wt),
            (ze = n.stateNode.containerInfo),
            (Wt = !0),
            Un(e, t, n),
            (ze = r),
            (Wt = o);
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (
            !Ze &&
            ((r = n.updateQueue),
            r !== null && ((r = r.lastEffect), r !== null))
          ) {
            o = r = r.next;
            do {
              var i = o,
                s = i.destroy;
              (i = i.tag),
                s !== void 0 && (i & 2 || i & 4) && ff(n, t, s),
                (o = o.next);
            } while (o !== r);
          }
          Un(e, t, n);
          break;
        case 1:
          if (
            !Ze &&
            (mo(n, t),
            (r = n.stateNode),
            typeof r.componentWillUnmount == 'function')
          )
            try {
              (r.props = n.memoizedProps),
                (r.state = n.memoizedState),
                r.componentWillUnmount();
            } catch (l) {
              Ae(n, t, l);
            }
          Un(e, t, n);
          break;
        case 21:
          Un(e, t, n);
          break;
        case 22:
          n.mode & 1
            ? ((Ze = (r = Ze) || n.memoizedState !== null),
              Un(e, t, n),
              (Ze = r))
            : Un(e, t, n);
          break;
        default:
          Un(e, t, n);
      }
    }
    function Ym(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new Bw()),
          t.forEach(function (r) {
            var o = Xw.bind(null, e, r);
            n.has(r) || (n.add(r), r.then(o, o));
          });
      }
    }
    function jt(e, t) {
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
                  (ze = l.stateNode), (Wt = !1);
                  break e;
                case 3:
                  (ze = l.stateNode.containerInfo), (Wt = !0);
                  break e;
                case 4:
                  (ze = l.stateNode.containerInfo), (Wt = !0);
                  break e;
              }
              l = l.return;
            }
            if (ze === null) throw Error(C(160));
            By(i, s, o), (ze = null), (Wt = !1);
            var a = o.alternate;
            a !== null && (a.return = null), (o.return = null);
          } catch (u) {
            Ae(o, t, u);
          }
        }
      if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; ) jy(t, e), (t = t.sibling);
    }
    function jy(e, t) {
      var n = e.alternate,
        r = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if ((jt(t, e), rn(e), r & 4)) {
            try {
              Pi(3, e, e.return), sa(3, e);
            } catch (w) {
              Ae(e, e.return, w);
            }
            try {
              Pi(5, e, e.return);
            } catch (w) {
              Ae(e, e.return, w);
            }
          }
          break;
        case 1:
          jt(t, e), rn(e), r & 512 && n !== null && mo(n, n.return);
          break;
        case 5:
          if (
            (jt(t, e),
            rn(e),
            r & 512 && n !== null && mo(n, n.return),
            e.flags & 32)
          ) {
            var o = e.stateNode;
            try {
              Vi(o, '');
            } catch (w) {
              Ae(e, e.return, w);
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
                  cv(o, i),
                  bc(l, s);
                var u = bc(l, i);
                for (s = 0; s < a.length; s += 2) {
                  var f = a[s],
                    p = a[s + 1];
                  f === 'style'
                    ? mv(o, p)
                    : f === 'dangerouslySetInnerHTML'
                    ? pv(o, p)
                    : f === 'children'
                    ? Vi(o, p)
                    : Ef(o, f, p, u);
                }
                switch (l) {
                  case 'input':
                    Pc(o, i);
                    break;
                  case 'textarea':
                    fv(o, i);
                    break;
                  case 'sel\
ect':
                    var m = o._wrapperState.wasMultiple;
                    o._wrapperState.wasMultiple = !!i.multiple;
                    var S = i.value;
                    S != null
                      ? yo(o, !!i.multiple, S, !1)
                      : m !== !!i.multiple &&
                        (i.defaultValue != null
                          ? yo(o, !!i.multiple, i.defaultValue, !0)
                          : yo(o, !!i.multiple, i.multiple ? [] : '', !1));
                }
                o[Wi] = i;
              } catch (w) {
                Ae(e, e.return, w);
              }
          }
          break;
        case 6:
          if ((jt(t, e), rn(e), r & 4)) {
            if (e.stateNode === null) throw Error(C(162));
            (o = e.stateNode), (i = e.memoizedProps);
            try {
              o.nodeValue = i;
            } catch (w) {
              Ae(e, e.return, w);
            }
          }
          break;
        case 3:
          if (
            (jt(t, e),
            rn(e),
            r & 4 && n !== null && n.memoizedState.isDehydrated)
          )
            try {
              Fi(t.containerInfo);
            } catch (w) {
              Ae(e, e.return, w);
            }
          break;
        case 4:
          jt(t, e), rn(e);
          break;
        case 13:
          jt(t, e),
            rn(e),
            (o = e.child),
            o.flags & 8192 &&
              ((i = o.memoizedState !== null),
              (o.stateNode.isHidden = i),
              !i ||
                (o.alternate !== null && o.alternate.memoizedState !== null) ||
                (ed = ke())),
            r & 4 && Ym(e);
          break;
        case 22:
          if (
            ((f = n !== null && n.memoizedState !== null),
            e.mode & 1 ? ((Ze = (u = Ze) || f), jt(t, e), (Ze = u)) : jt(t, e),
            rn(e),
            r & 8192)
          ) {
            if (
              ((u = e.memoizedState !== null),
              (e.stateNode.isHidden = u) && !f && e.mode & 1)
            )
              for (M = e, f = e.child; f !== null; ) {
                for (p = M = f; M !== null; ) {
                  switch (((m = M), (S = m.child), m.tag)) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      Pi(4, m, m.return);
                      break;
                    case 1:
                      mo(m, m.return);
                      var y = m.stateNode;
                      if (typeof y.componentWillUnmount == 'function') {
                        (r = m), (n = m.return);
                        try {
                          (t = r),
                            (y.props = t.memoizedProps),
                            (y.state = t.memoizedState),
                            y.componentWillUnmount();
                        } catch (w) {
                          Ae(r, n, w);
                        }
                      }
                      break;
                    case 5:
                      mo(m, m.return);
                      break;
                    case 22:
                      if (m.memoizedState !== null) {
                        qm(p);
                        continue;
                      }
                  }
                  S !== null ? ((S.return = m), (M = S)) : qm(p);
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
                          (l.style.display = hv('display', s)));
                  } catch (w) {
                    Ae(e, e.return, w);
                  }
                }
              } else if (p.tag === 6) {
                if (f === null)
                  try {
                    p.stateNode.nodeValue = u ? '' : p.memoizedProps;
                  } catch (w) {
                    Ae(e, e.return, w);
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
          jt(t, e), rn(e), r & 4 && Ym(e);
          break;
        case 21:
          break;
        default:
          jt(t, e), rn(e);
      }
    }
    function rn(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          e: {
            for (var n = e.return; n !== null; ) {
              if (zy(n)) {
                var r = n;
                break e;
              }
              n = n.return;
            }
            throw Error(C(160));
          }
          switch (r.tag) {
            case 5:
              var o = r.stateNode;
              r.flags & 32 && (Vi(o, ''), (r.flags &= -33));
              var i = Qm(e);
              hf(e, i, o);
              break;
            case 3:
            case 4:
              var s = r.stateNode.containerInfo,
                l = Qm(e);
              pf(e, l, s);
              break;
            default:
              throw Error(C(161));
          }
        } catch (a) {
          Ae(e, e.return, a);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function Hw(e, t, n) {
      (M = e), Hy(e, t, n);
    }
    function Hy(e, t, n) {
      for (var r = (e.mode & 1) !== 0; M !== null; ) {
        var o = M,
          i = o.child;
        if (o.tag === 22 && r) {
          var s = o.memoizedState !== null || vl;
          if (!s) {
            var l = o.alternate,
              a = (l !== null && l.memoizedState !== null) || Ze;
            l = vl;
            var u = Ze;
            if (((vl = s), (Ze = a) && !u))
              for (M = o; M !== null; )
                (s = M),
                  (a = s.child),
                  s.tag === 22 && s.memoizedState !== null
                    ? Xm(o)
                    : a !== null
                    ? ((a.return = s), (M = a))
                    : Xm(o);
            for (; i !== null; ) (M = i), Hy(i, t, n), (i = i.sibling);
            (M = o), (vl = l), (Ze = u);
          }
          Zm(e, t, n);
        } else
          o.subtreeFlags & 8772 && i !== null
            ? ((i.return = o), (M = i))
            : Zm(e, t, n);
      }
    }
    function Zm(e) {
      for (; M !== null; ) {
        var t = M;
        if (t.flags & 8772) {
          var n = t.alternate;
          try {
            if (t.flags & 8772)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  Ze || sa(5, t);
                  break;
                case 1:
                  var r = t.stateNode;
                  if (t.flags & 4 && !Ze)
                    if (n === null) r.componentDidMount();
                    else {
                      var o =
                        t.elementType === t.type
                          ? n.memoizedProps
                          : Ht(t.type, n.memoizedProps);
                      r.componentDidUpdate(
                        o,
                        n.memoizedState,
                        r.__reactInternalSnapshotBeforeUpdate,
                      );
                    }
                  var i = t.updateQueue;
                  i !== null && Om(t, i, r);
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
                    Om(t, s, n);
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
                        p !== null && Fi(p);
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
                  throw Error(C(163));
              }
            Ze || (t.flags & 512 && df(t));
          } catch (m) {
            Ae(t, t.return, m);
          }
        }
        if (t === e) {
          M = null;
          break;
        }
        if (((n = t.sibling), n !== null)) {
          (n.return = t.return), (M = n);
          break;
        }
        M = t.return;
      }
    }
    function qm(e) {
      for (; M !== null; ) {
        var t = M;
        if (t === e) {
          M = null;
          break;
        }
        var n = t.sibling;
        if (n !== null) {
          (n.return = t.return), (M = n);
          break;
        }
        M = t.return;
      }
    }
    function Xm(e) {
      for (; M !== null; ) {
        var t = M;
        try {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              var n = t.return;
              try {
                sa(4, t);
              } catch (a) {
                Ae(t, n, a);
              }
              break;
            case 1:
              var r = t.stateNode;
              if (typeof r.componentDidMount == 'function') {
                var o = t.return;
                try {
                  r.componentDidMount();
                } catch (a) {
                  Ae(t, o, a);
                }
              }
              var i = t.return;
              try {
                df(t);
              } catch (a) {
                Ae(t, i, a);
              }
              break;
            case 5:
              var s = t.return;
              try {
                df(t);
              } catch (a) {
                Ae(t, s, a);
              }
          }
        } catch (a) {
          Ae(t, t.return, a);
        }
        if (t === e) {
          M = null;
          break;
        }
        var l = t.sibling;
        if (l !== null) {
          (l.return = t.return), (M = l);
          break;
        }
        M = t.return;
      }
    }
    var Ww = Math.ceil,
      Kl = xn.ReactCurrentDispatcher,
      Xf = xn.ReactCurrentOwner,
      It = xn.ReactCurrentBatchConfig,
      oe = 0,
      Fe = null,
      Ie = null,
      Be = 0,
      yt = 0,
      vo = rr(0),
      Ve = 0,
      qi = null,
      Cr = 0,
      la = 0,
      Jf = 0,
      Oi = null,
      ut = null,
      ed = 0,
      ko = 1 / 0,
      vn = null,
      Ql = !1,
      mf = null,
      qn = null,
      yl = !1,
      Wn = null,
      Yl = 0,
      Di = 0,
      vf = null,
      xl = -1,
      Nl = 0;
    function ot() {
      return oe & 6 ? ke() : xl !== -1 ? xl : (xl = ke());
    }
    function Xn(e) {
      return e.mode & 1
        ? oe & 2 && Be !== 0
          ? Be & -Be
          : Cw.transition !== null
          ? (Nl === 0 && (Nl = Av()), Nl)
          : ((e = le),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : Dv(e.type))),
            e)
        : 1;
    }
    function Qt(e, t, n, r) {
      if (50 < Di) throw ((Di = 0), (vf = null), Error(C(185)));
      Xi(e, n, r),
        (!(oe & 2) || e !== Fe) &&
          (e === Fe && (!(oe & 2) && (la |= n), Ve === 4 && jn(e, Be)),
          pt(e, r),
          n === 1 &&
            oe === 0 &&
            !(t.mode & 1) &&
            ((ko = ke() + 500), ra && or()));
    }
    function pt(e, t) {
      var n = e.callbackNode;
      LE(e, t);
      var r = Pl(e, e === Fe ? Be : 0);
      if (r === 0)
        n !== null && sm(n), (e.callbackNode = null), (e.callbackPriority = 0);
      else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && sm(n), t === 1))
          e.tag === 0 ? Aw(Jm.bind(null, e)) : Jv(Jm.bind(null, e)),
            Tw(function () {
              !(oe & 6) && or();
            }),
            (n = null);
        else {
          switch (Cv(r)) {
            case 1:
              n = Nf;
              break;
            case 4:
              n = xv;
              break;
            case 16:
              n = Il;
              break;
            case 536870912:
              n = Nv;
              break;
            default:
              n = Il;
          }
          n = Xy(n, Wy.bind(null, e));
        }
        (e.callbackPriority = t), (e.callbackNode = n);
      }
    }
    function Wy(e, t) {
      if (((xl = -1), (Nl = 0), oe & 6)) throw Error(C(327));
      var n = e.callbackNode;
      if (wo() && e.callbackNode !== n) return null;
      var r = Pl(e, e === Fe ? Be : 0);
      if (r === 0) return null;
      if (r & 30 || r & e.expiredLanes || t) t = Zl(e, r);
      else {
        t = r;
        var o = oe;
        oe |= 2;
        var i = Ky();
        (Fe !== e || Be !== t) && ((vn = null), (ko = ke() + 500), Tr(e, t));
        do
          try {
            Qw();
            break;
          } catch (l) {
            Gy(e, l);
          }
        while (1);
        Uf(),
          (Kl.current = i),
          (oe = o),
          Ie !== null ? (t = 0) : ((Fe = null), (Be = 0), (t = Ve));
      }
      if (t !== 0) {
        if (
          (t === 2 && ((o = Bc(e)), o !== 0 && ((r = o), (t = yf(e, o)))),
          t === 1)
        )
          throw ((n = qi), Tr(e, 0), jn(e, r), pt(e, ke()), n);
        if (t === 6) jn(e, r);
        else {
          if (
            ((o = e.current.alternate),
            !(r & 30) &&
              !Gw(o) &&
              ((t = Zl(e, r)),
              t === 2 && ((i = Bc(e)), i !== 0 && ((r = i), (t = yf(e, i)))),
              t === 1))
          )
            throw ((n = qi), Tr(e, 0), jn(e, r), pt(e, ke()), n);
          switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
            case 0:
            case 1:
              throw Error(C(345));
            case 2:
              Sr(e, ut, vn);
              break;
            case 3:
              if (
                (jn(e, r),
                (r & 130023424) === r && ((t = ed + 500 - ke()), 10 < t))
              ) {
                if (Pl(e, 0) !== 0) break;
                if (((o = e.suspendedLanes), (o & r) !== r)) {
                  ot(), (e.pingedLanes |= e.suspendedLanes & o);
                  break;
                }
                e.timeoutHandle = Zc(Sr.bind(null, e, ut, vn), t);
                break;
              }
              Sr(e, ut, vn);
              break;
            case 4:
              if ((jn(e, r), (r & 4194240) === r)) break;
              for (t = e.eventTimes, o = -1; 0 < r; ) {
                var s = 31 - Kt(r);
                (i = 1 << s), (s = t[s]), s > o && (o = s), (r &= ~i);
              }
              if (
                ((r = o),
                (r = ke() - r),
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
                    : 1960 * Ww(r / 1960)) - r),
                10 < r)
              ) {
                e.timeoutHandle = Zc(Sr.bind(null, e, ut, vn), r);
                break;
              }
              Sr(e, ut, vn);
              break;
            case 5:
              Sr(e, ut, vn);
              break;
            default:
              throw Error(C(329));
          }
        }
      }
      return pt(e, ke()), e.callbackNode === n ? Wy.bind(null, e) : null;
    }
    function yf(e, t) {
      var n = Oi;
      return (
        e.current.memoizedState.isDehydrated && (Tr(e, t).flags |= 256),
        (e = Zl(e, t)),
        e !== 2 && ((t = ut), (ut = n), t !== null && gf(t)),
        e
      );
    }
    function gf(e) {
      ut === null ? (ut = e) : ut.push.apply(ut, e);
    }
    function Gw(e) {
      for (var t = e; ; ) {
        if (t.flags & 16384) {
          var n = t.updateQueue;
          if (n !== null && ((n = n.stores), n !== null))
            for (var r = 0; r < n.length; r++) {
              var o = n[r],
                i = o.getSnapshot;
              o = o.value;
              try {
                if (!Yt(i(), o)) return !1;
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
    function jn(e, t) {
      for (
        t &= ~Jf,
          t &= ~la,
          e.suspendedLanes |= t,
          e.pingedLanes &= ~t,
          e = e.expirationTimes;
        0 < t;

      ) {
        var n = 31 - Kt(t),
          r = 1 << n;
        (e[n] = -1), (t &= ~r);
      }
    }
    function Jm(e) {
      if (oe & 6) throw Error(C(327));
      wo();
      var t = Pl(e, 0);
      if (!(t & 1)) return pt(e, ke()), null;
      var n = Zl(e, t);
      if (e.tag !== 0 && n === 2) {
        var r = Bc(e);
        r !== 0 && ((t = r), (n = yf(e, r)));
      }
      if (n === 1) throw ((n = qi), Tr(e, 0), jn(e, t), pt(e, ke()), n);
      if (n === 6) throw Error(C(345));
      return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        Sr(e, ut, vn),
        pt(e, ke()),
        null
      );
    }
    function td(e, t) {
      var n = oe;
      oe |= 1;
      try {
        return e(t);
      } finally {
        (oe = n), oe === 0 && ((ko = ke() + 500), ra && or());
      }
    }
    function kr(e) {
      Wn !== null && Wn.tag === 0 && !(oe & 6) && wo();
      var t = oe;
      oe |= 1;
      var n = It.transition,
        r = le;
      try {
        if (((It.transition = null), (le = 1), e)) return e();
      } finally {
        (le = r), (It.transition = n), (oe = t), !(oe & 6) && or();
      }
    }
    function nd() {
      (yt = vo.current), ve(vo);
    }
    function Tr(e, t) {
      (e.finishedWork = null), (e.finishedLanes = 0);
      var n = e.timeoutHandle;
      if ((n !== -1 && ((e.timeoutHandle = -1), ww(n)), Ie !== null))
        for (n = Ie.return; n !== null; ) {
          var r = n;
          switch ((Vf(r), r.tag)) {
            case 1:
              (r = r.type.childContextTypes), r != null && bl();
              break;
            case 3:
              Ao(), ve(ft), ve(qe), Wf();
              break;
            case 5:
              Hf(r);
              break;
            case 4:
              Ao();
              break;
            case 13:
              ve(Re);
              break;
            case 19:
              ve(Re);
              break;
            case 10:
              Ff(r.type._context);
              break;
            case 22:
            case 23:
              nd();
          }
          n = n.return;
        }
      if (
        ((Fe = e),
        (Ie = e = Jn(e.current, null)),
        (Be = yt = t),
        (Ve = 0),
        (qi = null),
        (Jf = la = Cr = 0),
        (ut = Oi = null),
        Er !== null)
      ) {
        for (t = 0; t < Er.length; t++)
          if (((n = Er[t]), (r = n.interleaved), r !== null)) {
            n.interleaved = null;
            var o = r.next,
              i = n.pending;
            if (i !== null) {
              var s = i.next;
              (i.next = o), (r.next = s);
            }
            n.pending = r;
          }
        Er = null;
      }
      return e;
    }
    function Gy(e, t) {
      do {
        var n = Ie;
        try {
          if ((Uf(), (wl.current = Gl), Wl)) {
            for (var r = xe.memoizedState; r !== null; ) {
              var o = r.queue;
              o !== null && (o.pending = null), (r = r.next);
            }
            Wl = !1;
          }
          if (
            ((Ar = 0),
            (Ue = Me = xe = null),
            (Ii = !1),
            (Qi = 0),
            (Xf.current = null),
            n === null || n.return === null)
          ) {
            (Ve = 1), (qi = t), (Ie = null);
            break;
          }
          e: {
            var i = e,
              s = n.return,
              l = n,
              a = t;
            if (
              ((t = Be),
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
              var S = Fm(s);
              if (S !== null) {
                (S.flags &= -257),
                  zm(S, s, l, i, t),
                  S.mode & 1 && Um(i, u, t),
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
                  Um(i, u, t), rd();
                  break e;
                }
                a = Error(C(426));
              }
            } else if (we && l.mode & 1) {
              var U = Fm(s);
              if (U !== null) {
                !(U.flags & 65536) && (U.flags |= 256),
                  zm(U, s, l, i, t),
                  bf(Co(a, l));
                break e;
              }
            }
            (i = a = Co(a, l)),
              Ve !== 4 && (Ve = 2),
              Oi === null ? (Oi = [i]) : Oi.push(i),
              (i = s);
            do {
              switch (i.tag) {
                case 3:
                  (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                  var h = ky(i, a, t);
                  Pm(i, h);
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
                        (qn === null || !qn.has(d))))
                  ) {
                    (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                    var E = Ly(i, l, t);
                    Pm(i, E);
                    break e;
                  }
              }
              i = i.return;
            } while (i !== null);
          }
          Yy(n);
        } catch (R) {
          (t = R), Ie === n && n !== null && (Ie = n = n.return);
          continue;
        }
        break;
      } while (1);
    }
    function Ky() {
      var e = Kl.current;
      return (Kl.current = Gl), e === null ? Gl : e;
    }
    function rd() {
      (Ve === 0 || Ve === 3 || Ve === 2) && (Ve = 4),
        Fe === null || (!(Cr & 268435455) && !(la & 268435455)) || jn(Fe, Be);
    }
    function Zl(e, t) {
      var n = oe;
      oe |= 2;
      var r = Ky();
      (Fe !== e || Be !== t) && ((vn = null), Tr(e, t));
      do
        try {
          Kw();
          break;
        } catch (o) {
          Gy(e, o);
        }
      while (1);
      if ((Uf(), (oe = n), (Kl.current = r), Ie !== null)) throw Error(C(261));
      return (Fe = null), (Be = 0), Ve;
    }
    function Kw() {
      for (; Ie !== null; ) Qy(Ie);
    }
    function Qw() {
      for (; Ie !== null && !EE(); ) Qy(Ie);
    }
    function Qy(e) {
      var t = qy(e.alternate, e, yt);
      (e.memoizedProps = e.pendingProps),
        t === null ? Yy(e) : (Ie = t),
        (Xf.current = null);
    }
    function Yy(e) {
      var t = e;
      do {
        var n = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
          if (((n = zw(n, t)), n !== null)) {
            (n.flags &= 32767), (Ie = n);
            return;
          }
          if (e !== null)
            (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
          else {
            (Ve = 6), (Ie = null);
            return;
          }
        } else if (((n = Fw(n, t, yt)), n !== null)) {
          Ie = n;
          return;
        }
        if (((t = t.sibling), t !== null)) {
          Ie = t;
          return;
        }
        Ie = t = e;
      } while (t !== null);
      Ve === 0 && (Ve = 5);
    }
    function Sr(e, t, n) {
      var r = le,
        o = It.transition;
      try {
        (It.transition = null), (le = 1), Yw(e, t, n, r);
      } finally {
        (It.transition = o), (le = r);
      }
      return null;
    }
    function Yw(e, t, n, r) {
      do wo();
      while (Wn !== null);
      if (oe & 6) throw Error(C(327));
      n = e.finishedWork;
      var o = e.finishedLanes;
      if (n === null) return null;
      if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
        throw Error(C(177));
      (e.callbackNode = null), (e.callbackPriority = 0);
      var i = n.lanes | n.childLanes;
      if (
        (IE(e, i),
        e === Fe && ((Ie = Fe = null), (Be = 0)),
        (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
          yl ||
          ((yl = !0),
          Xy(Il, function () {
            return wo(), null;
          })),
        (i = (n.flags & 15990) !== 0),
        n.subtreeFlags & 15990 || i)
      ) {
        (i = It.transition), (It.transition = null);
        var s = le;
        le = 1;
        var l = oe;
        (oe |= 4),
          (Xf.current = null),
          jw(e, n),
          jy(n, e),
          yw(Qc),
          (Ol = !!Kc),
          (Qc = Kc = null),
          (e.current = n),
          Hw(n, e, o),
          wE(),
          (oe = l),
          (le = s),
          (It.transition = i);
      } else e.current = n;
      if (
        (yl && ((yl = !1), (Wn = e), (Yl = o)),
        (i = e.pendingLanes),
        i === 0 && (qn = null),
        xE(n.stateNode, r),
        pt(e, ke()),
        t !== null)
      )
        for (r = e.onRecoverableError, n = 0; n < t.length; n++)
          (o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest });
      if (Ql) throw ((Ql = !1), (e = mf), (mf = null), e);
      return (
        Yl & 1 && e.tag !== 0 && wo(),
        (i = e.pendingLanes),
        i & 1 ? (e === vf ? Di++ : ((Di = 0), (vf = e))) : (Di = 0),
        or(),
        null
      );
    }
    function wo() {
      if (Wn !== null) {
        var e = Cv(Yl),
          t = It.transition,
          n = le;
        try {
          if (((It.transition = null), (le = 16 > e ? 16 : e), Wn === null))
            var r = !1;
          else {
            if (((e = Wn), (Wn = null), (Yl = 0), oe & 6)) throw Error(C(331));
            var o = oe;
            for (oe |= 4, M = e.current; M !== null; ) {
              var i = M,
                s = i.child;
              if (M.flags & 16) {
                var l = i.deletions;
                if (l !== null) {
                  for (var a = 0; a < l.length; a++) {
                    var u = l[a];
                    for (M = u; M !== null; ) {
                      var f = M;
                      switch (f.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Pi(8, f, i);
                      }
                      var p = f.child;
                      if (p !== null) (p.return = f), (M = p);
                      else
                        for (; M !== null; ) {
                          f = M;
                          var m = f.sibling,
                            S = f.return;
                          if ((Fy(f), f === u)) {
                            M = null;
                            break;
                          }
                          if (m !== null) {
                            (m.return = S), (M = m);
                            break;
                          }
                          M = S;
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
                  M = i;
                }
              }
              if (i.subtreeFlags & 2064 && s !== null) (s.return = i), (M = s);
              else
                e: for (; M !== null; ) {
                  if (((i = M), i.flags & 2048))
                    switch (i.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Pi(9, i, i.return);
                    }
                  var h = i.sibling;
                  if (h !== null) {
                    (h.return = i.return), (M = h);
                    break e;
                  }
                  M = i.return;
                }
            }
            var c = e.current;
            for (M = c; M !== null; ) {
              s = M;
              var d = s.child;
              if (s.subtreeFlags & 2064 && d !== null) (d.return = s), (M = d);
              else
                e: for (s = c; M !== null; ) {
                  if (((l = M), l.flags & 2048))
                    try {
                      switch (l.tag) {
                        case 0:
                        case 11:
                        case 15:
                          sa(9, l);
                      }
                    } catch (R) {
                      Ae(l, l.return, R);
                    }
                  if (l === s) {
                    M = null;
                    break e;
                  }
                  var E = l.sibling;
                  if (E !== null) {
                    (E.return = l.return), (M = E);
                    break e;
                  }
                  M = l.return;
                }
            }
            if (
              ((oe = o),
              or(),
              ln && typeof ln.onPostCommitFiberRoot == 'function')
            )
              try {
                ln.onPostCommitFiberRoot(Xl, e);
              } catch {}
            r = !0;
          }
          return r;
        } finally {
          (le = n), (It.transition = t);
        }
      }
      return !1;
    }
    function ev(e, t, n) {
      (t = Co(n, t)),
        (t = ky(e, t, 1)),
        (e = Zn(e, t, 1)),
        (t = ot()),
        e !== null && (Xi(e, 1, t), pt(e, t));
    }
    function Ae(e, t, n) {
      if (e.tag === 3) ev(e, e, n);
      else
        for (; t !== null; ) {
          if (t.tag === 3) {
            ev(t, e, n);
            break;
          } else if (t.tag === 1) {
            var r = t.stateNode;
            if (
              typeof t.type.getDerivedStateFromError == 'function' ||
              (typeof r.componentDidCatch == 'function' &&
                (qn === null || !qn.has(r)))
            ) {
              (e = Co(n, e)),
                (e = Ly(t, e, 1)),
                (t = Zn(t, e, 1)),
                (e = ot()),
                t !== null && (Xi(t, 1, e), pt(t, e));
              break;
            }
          }
          t = t.return;
        }
    }
    function Zw(e, t, n) {
      var r = e.pingCache;
      r !== null && r.delete(t),
        (t = ot()),
        (e.pingedLanes |= e.suspendedLanes & n),
        Fe === e &&
          (Be & n) === n &&
          (Ve === 4 || (Ve === 3 && (Be & 130023424) === Be && 500 > ke() - ed)
            ? Tr(e, 0)
            : (Jf |= n)),
        pt(e, t);
    }
    function Zy(e, t) {
      t === 0 &&
        (e.mode & 1
          ? ((t = rl), (rl <<= 1), !(rl & 130023424) && (rl = 4194304))
          : (t = 1));
      var n = ot();
      (e = Tn(e, t)), e !== null && (Xi(e, t, n), pt(e, n));
    }
    function qw(e) {
      var t = e.memoizedState,
        n = 0;
      t !== null && (n = t.retryLane), Zy(e, n);
    }
    function Xw(e, t) {
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
          throw Error(C(314));
      }
      r !== null && r.delete(t), Zy(e, n);
    }
    var qy;
    qy = function (e, t, n) {
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps || ft.current) ct = !0;
        else {
          if (!(e.lanes & n) && !(t.flags & 128)) return (ct = !1), Uw(e, t, n);
          ct = !!(e.flags & 131072);
        }
      else (ct = !1), we && t.flags & 1048576 && ey(t, Fl, t.index);
      switch (((t.lanes = 0), t.tag)) {
        case 2:
          var r = t.type;
          Rl(e, t), (e = t.pendingProps);
          var o = Ro(t, qe.current);
          Eo(t, n), (o = Kf(null, t, r, e, o, n));
          var i = Qf();
          return (
            (t.flags |= 1),
            typeof o == 'object' &&
            o !== null &&
            typeof o.render == 'function' &&
            o.$$typeof === void 0
              ? ((t.tag = 1),
                (t.memoizedState = null),
                (t.updateQueue = null),
                dt(r) ? ((i = !0), $l(t)) : (i = !1),
                (t.memoizedState =
                  o.state !== null && o.state !== void 0 ? o.state : null),
                Bf(t),
                (o.updater = oa),
                (t.stateNode = o),
                (o._reactInternals = t),
                rf(t, r, e, n),
                (t = lf(null, t, r, !0, i, n)))
              : ((t.tag = 0),
                we && i && Mf(t),
                rt(null, t, o, n),
                (t = t.child)),
            t
          );
        case 16:
          r = t.elementType;
          e: {
            switch (
              (Rl(e, t),
              (e = t.pendingProps),
              (o = r._init),
              (r = o(r._payload)),
              (t.type = r),
              (o = t.tag = eT(r)),
              (e = Ht(r, e)),
              o)
            ) {
              case 0:
                t = sf(null, t, r, e, n);
                break e;
              case 1:
                t = Hm(null, t, r, e, n);
                break e;
              case 11:
                t = Bm(null, t, r, e, n);
                break e;
              case 14:
                t = jm(null, t, r, Ht(r.type, e), n);
                break e;
            }
            throw Error(C(306, r, ''));
          }
          return t;
        case 0:
          return (
            (r = t.type),
            (o = t.pendingProps),
            (o = t.elementType === r ? o : Ht(r, o)),
            sf(e, t, r, o, n)
          );
        case 1:
          return (
            (r = t.type),
            (o = t.pendingProps),
            (o = t.elementType === r ? o : Ht(r, o)),
            Hm(e, t, r, o, n)
          );
        case 3:
          e: {
            if ((Dy(t), e === null)) throw Error(C(387));
            (r = t.pendingProps),
              (i = t.memoizedState),
              (o = i.element),
              oy(e, t),
              jl(t, r, null, n);
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
                (o = Co(Error(C(423)), t)), (t = Wm(e, t, r, n, o));
                break e;
              } else if (r !== o) {
                (o = Co(Error(C(424)), t)), (t = Wm(e, t, r, n, o));
                break e;
              } else
                for (
                  gt = Yn(t.stateNode.containerInfo.firstChild),
                    St = t,
                    we = !0,
                    Gt = null,
                    n = ay(t, null, r, n),
                    t.child = n;
                  n;

                )
                  (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
            else {
              if ((xo(), r === o)) {
                t = Rn(e, t, n);
                break e;
              }
              rt(e, t, r, n);
            }
            t = t.child;
          }
          return t;
        case 5:
          return (
            uy(t),
            e === null && ef(t),
            (r = t.type),
            (o = t.pendingProps),
            (i = e !== null ? e.memoizedProps : null),
            (s = o.children),
            Yc(r, o) ? (s = null) : i !== null && Yc(r, i) && (t.flags |= 32),
            Oy(e, t),
            rt(e, t, s, n),
            t.child
          );
        case 6:
          return e === null && ef(t), null;
        case 13:
          return My(e, t, n);
        case 4:
          return (
            jf(t, t.stateNode.containerInfo),
            (r = t.pendingProps),
            e === null ? (t.child = No(t, null, r, n)) : rt(e, t, r, n),
            t.child
          );
        case 11:
          return (
            (r = t.type),
            (o = t.pendingProps),
            (o = t.elementType === r ? o : Ht(r, o)),
            Bm(e, t, r, o, n)
          );
        case 7:
          return rt(e, t, t.pendingProps, n), t.child;
        case 8:
          return rt(e, t, t.pendingProps.children, n), t.child;
        case 12:
          return rt(e, t, t.pendingProps.children, n), t.child;
        case 10:
          e: {
            if (
              ((r = t.type._context),
              (o = t.pendingProps),
              (i = t.memoizedProps),
              (s = o.value),
              he(zl, r._currentValue),
              (r._currentValue = s),
              i !== null)
            )
              if (Yt(i.value, s)) {
                if (i.children === o.children && !ft.current) {
                  t = Rn(e, t, n);
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
                          (a = _n(-1, n & -n)), (a.tag = 2);
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
                          tf(i.return, n, t),
                          (l.lanes |= n);
                        break;
                      }
                      a = a.next;
                    }
                  } else if (i.tag === 10)
                    s = i.type === t.type ? null : i.child;
                  else if (i.tag === 18) {
                    if (((s = i.return), s === null)) throw Error(C(341));
                    (s.lanes |= n),
                      (l = s.alternate),
                      l !== null && (l.lanes |= n),
                      tf(s, n, t),
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
            rt(e, t, o.children, n), (t = t.child);
          }
          return t;
        case 9:
          return (
            (o = t.type),
            (r = t.pendingProps.children),
            Eo(t, n),
            (o = Pt(o)),
            (r = r(o)),
            (t.flags |= 1),
            rt(e, t, r, n),
            t.child
          );
        case 14:
          return (
            (r = t.type),
            (o = Ht(r, t.pendingProps)),
            (o = Ht(r.type, o)),
            jm(e, t, r, o, n)
          );
        case 15:
          return Iy(e, t, t.type, t.pendingProps, n);
        case 17:
          return (
            (r = t.type),
            (o = t.pendingProps),
            (o = t.elementType === r ? o : Ht(r, o)),
            Rl(e, t),
            (t.tag = 1),
            dt(r) ? ((e = !0), $l(t)) : (e = !1),
            Eo(t, n),
            sy(t, r, o),
            rf(t, r, o, n),
            lf(null, t, r, !0, e, n)
          );
        case 19:
          return Vy(e, t, n);
        case 22:
          return Py(e, t, n);
      }
      throw Error(C(156, t.tag));
    };
    function Xy(e, t) {
      return Rv(e, t);
    }
    function Jw(e, t, n, r) {
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
    function Lt(e, t, n, r) {
      return new Jw(e, t, n, r);
    }
    function od(e) {
      return (e = e.prototype), !(!e || !e.isReactComponent);
    }
    function eT(e) {
      if (typeof e == 'function') return od(e) ? 1 : 0;
      if (e != null) {
        if (((e = e.$$typeof), e === Tf)) return 11;
        if (e === Rf) return 14;
      }
      return 2;
    }
    function Jn(e, t) {
      var n = e.alternate;
      return (
        n === null
          ? ((n = Lt(e.tag, t, e.key, e.mode)),
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
    function Al(e, t, n, r, o, i) {
      var s = 2;
      if (((r = e), typeof e == 'function')) od(e) && (s = 1);
      else if (typeof e == 'string') s = 5;
      else
        e: switch (e) {
          case io:
            return Rr(n.children, o, i, t);
          case wf:
            (s = 8), (o |= 8);
            break;
          case Ac:
            return (
              (e = Lt(12, n, t, o | 2)), (e.elementType = Ac), (e.lanes = i), e
            );
          case Cc:
            return (
              (e = Lt(13, n, t, o)), (e.elementType = Cc), (e.lanes = i), e
            );
          case kc:
            return (
              (e = Lt(19, n, t, o)), (e.elementType = kc), (e.lanes = i), e
            );
          case lv:
            return aa(n, o, i, t);
          default:
            if (typeof e == 'object' && e !== null)
              switch (e.$$typeof) {
                case iv:
                  s = 10;
                  break e;
                case sv:
                  s = 9;
                  break e;
                case Tf:
                  s = 11;
                  break e;
                case Rf:
                  s = 14;
                  break e;
                case Fn:
                  (s = 16), (r = null);
                  break e;
              }
            throw Error(C(130, e == null ? e : typeof e, ''));
        }
      return (
        (t = Lt(s, n, t, o)),
        (t.elementType = e),
        (t.type = r),
        (t.lanes = i),
        t
      );
    }
    function Rr(e, t, n, r) {
      return (e = Lt(7, e, r, t)), (e.lanes = n), e;
    }
    function aa(e, t, n, r) {
      return (
        (e = Lt(22, e, r, t)),
        (e.elementType = lv),
        (e.lanes = n),
        (e.stateNode = { isHidden: !1 }),
        e
      );
    }
    function Rc(e, t, n) {
      return (e = Lt(6, e, null, t)), (e.lanes = n), e;
    }
    function xc(e, t, n) {
      return (
        (t = Lt(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    function tT(e, t, n, r, o) {
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
        (this.eventTimes = ac(0)),
        (this.expirationTimes = ac(-1)),
        (this.entangledLanes =
          this.finishedLanes =
          this.mutableReadLanes =
          this.expiredLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = ac(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = o),
        (this.mutableSourceEagerHydrationData = null);
    }
    function id(e, t, n, r, o, i, s, l, a) {
      return (
        (e = new tT(e, t, n, l, a)),
        t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
        (i = Lt(3, null, null, t)),
        (e.current = i),
        (i.stateNode = e),
        (i.memoizedState = {
          element: r,
          isDehydrated: n,
          cache: null,
          transitions: null,
          pendingSuspenseBoundaries: null,
        }),
        Bf(i),
        e
      );
    }
    function nT(e, t, n) {
      var r =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: oo,
        key: r == null ? null : '' + r,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    function Jy(e) {
      if (!e) return tr;
      e = e._reactInternals;
      e: {
        if (Ir(e) !== e || e.tag !== 1) throw Error(C(170));
        var t = e;
        do {
          switch (t.tag) {
            case 3:
              t = t.stateNode.context;
              break e;
            case 1:
              if (dt(t.type)) {
                t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                break e;
              }
          }
          t = t.return;
        } while (t !== null);
        throw Error(C(171));
      }
      if (e.tag === 1) {
        var n = e.type;
        if (dt(n)) return Xv(e, n, t);
      }
      return t;
    }
    function e0(e, t, n, r, o, i, s, l, a) {
      return (
        (e = id(n, r, !0, e, o, i, s, l, a)),
        (e.context = Jy(null)),
        (n = e.current),
        (r = ot()),
        (o = Xn(n)),
        (i = _n(r, o)),
        (i.callback = t ?? null),
        Zn(n, i, o),
        (e.current.lanes = o),
        Xi(e, o, r),
        pt(e, r),
        e
      );
    }
    function ua(e, t, n, r) {
      var o = t.current,
        i = ot(),
        s = Xn(o);
      return (
        (n = Jy(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = _n(i, s)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = Zn(o, t, s)),
        e !== null && (Qt(e, o, s, i), El(e, o, s)),
        s
      );
    }
    function ql(e) {
      if (((e = e.current), !e.child)) return null;
      switch (e.child.tag) {
        case 5:
          return e.child.stateNode;
        default:
          return e.child.stateNode;
      }
    }
    function tv(e, t) {
      if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
      }
    }
    function sd(e, t) {
      tv(e, t), (e = e.alternate) && tv(e, t);
    }
    function rT() {
      return null;
    }
    var t0 =
      typeof reportError == 'function'
        ? reportError
        : function (e) {
            console.error(e);
          };
    function ld(e) {
      this._internalRoot = e;
    }
    ca.prototype.render = ld.prototype.render = function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(C(409));
      ua(e, t, null, null);
    };
    ca.prototype.unmount = ld.prototype.unmount = function () {
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        kr(function () {
          ua(null, e, null, null);
        }),
          (t[wn] = null);
      }
    };
    function ca(e) {
      this._internalRoot = e;
    }
    ca.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = Iv();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < Bn.length && t !== 0 && t < Bn[n].priority; n++);
        Bn.splice(n, 0, e), n === 0 && Ov(e);
      }
    };
    function ad(e) {
      return !(
        !e ||
        (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
      );
    }
    function fa(e) {
      return !(
        !e ||
        (e.nodeType !== 1 &&
          e.nodeType !== 9 &&
          e.nodeType !== 11 &&
          (e.nodeType !== 8 || e.nodeValue !== ' react-mount-point-unstable '))
      );
    }
    function nv() {}
    function oT(e, t, n, r, o) {
      if (o) {
        if (typeof r == 'function') {
          var i = r;
          r = function () {
            var u = ql(s);
            i.call(u);
          };
        }
        var s = e0(t, r, e, 0, null, !1, !1, '', nv);
        return (
          (e._reactRootContainer = s),
          (e[wn] = s.current),
          ji(e.nodeType === 8 ? e.parentNode : e),
          kr(),
          s
        );
      }
      for (; (o = e.lastChild); ) e.removeChild(o);
      if (typeof r == 'function') {
        var l = r;
        r = function () {
          var u = ql(a);
          l.call(u);
        };
      }
      var a = id(e, 0, !1, null, null, !1, !1, '', nv);
      return (
        (e._reactRootContainer = a),
        (e[wn] = a.current),
        ji(e.nodeType === 8 ? e.parentNode : e),
        kr(function () {
          ua(t, a, n, r);
        }),
        a
      );
    }
    function da(e, t, n, r, o) {
      var i = n._reactRootContainer;
      if (i) {
        var s = i;
        if (typeof o == 'function') {
          var l = o;
          o = function () {
            var a = ql(s);
            l.call(a);
          };
        }
        ua(t, s, e, o);
      } else s = oT(n, t, e, o, r);
      return ql(s);
    }
    kv = function (e) {
      switch (e.tag) {
        case 3:
          var t = e.stateNode;
          if (t.current.memoizedState.isDehydrated) {
            var n = Ri(t.pendingLanes);
            n !== 0 &&
              (Af(t, n | 1),
              pt(t, ke()),
              !(oe & 6) && ((ko = ke() + 500), or()));
          }
          break;
        case 13:
          kr(function () {
            var r = Tn(e, 1);
            if (r !== null) {
              var o = ot();
              Qt(r, e, 1, o);
            }
          }),
            sd(e, 1);
      }
    };
    Cf = function (e) {
      if (e.tag === 13) {
        var t = Tn(e, 134217728);
        if (t !== null) {
          var n = ot();
          Qt(t, e, 134217728, n);
        }
        sd(e, 134217728);
      }
    };
    Lv = function (e) {
      if (e.tag === 13) {
        var t = Xn(e),
          n = Tn(e, t);
        if (n !== null) {
          var r = ot();
          Qt(n, e, t, r);
        }
        sd(e, t);
      }
    };
    Iv = function () {
      return le;
    };
    Pv = function (e, t) {
      var n = le;
      try {
        return (le = e), t();
      } finally {
        le = n;
      }
    };
    Uc = function (e, t, n) {
      switch (t) {
        case 'input':
          if ((Pc(e, n), (t = n.name), n.type === 'radio' && t != null)) {
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
                var o = na(r);
                if (!o) throw Error(C(90));
                uv(r), Pc(r, o);
              }
            }
          }
          break;
        case 'textarea':
          fv(e, n);
          break;
        case 'select':
          (t = n.value), t != null && yo(e, !!n.multiple, t, !1);
      }
    };
    gv = td;
    Sv = kr;
    var iT = { usingClientEntryPoint: !1, Events: [es, uo, na, vv, yv, td] },
      _i = {
        findFiberByHostInstance: _r,
        bundleType: 0,
        version: '18.2.0',
        rendererPackageName: 'react-dom',
      },
      sT = {
        bundleType: _i.bundleType,
        version: _i.version,
        rendererPackageName: _i.rendererPackageName,
        rendererConfig: _i.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: xn.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
          return (e = wv(e)), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: _i.findFiberByHostInstance || rT,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: '18.2.0-next-9e3b772b8-20220608',
      };
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u' &&
      ((Ei = __REACT_DEVTOOLS_GLOBAL_HOOK__),
      !Ei.isDisabled && Ei.supportsFiber)
    )
      try {
        (Xl = Ei.inject(sT)), (ln = Ei);
      } catch {}
    var Ei;
    wt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = iT;
    wt.createPortal = function (e, t) {
      var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!ad(t)) throw Error(C(200));
      return nT(e, t, null, n);
    };
    wt.createRoot = function (e, t) {
      if (!ad(e)) throw Error(C(299));
      var n = !1,
        r = '',
        o = t0;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
        (t = id(e, 1, !1, null, null, n, !1, r, o)),
        (e[wn] = t.current),
        ji(e.nodeType === 8 ? e.parentNode : e),
        new ld(t)
      );
    };
    wt.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == 'function'
          ? Error(C(188))
          : ((e = Object.keys(e).join(',')), Error(C(268, e)));
      return (e = wv(t)), (e = e === null ? null : e.stateNode), e;
    };
    wt.flushSync = function (e) {
      return kr(e);
    };
    wt.hydrate = function (e, t, n) {
      if (!fa(t)) throw Error(C(200));
      return da(null, e, t, !0, n);
    };
    wt.hydrateRoot = function (e, t, n) {
      if (!ad(e)) throw Error(C(405));
      var r = (n != null && n.hydratedSources) || null,
        o = !1,
        i = '',
        s = t0;
      if (
        (n != null &&
          (n.unstable_strictMode === !0 && (o = !0),
          n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
          n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
        (t = e0(t, null, e, 1, n ?? null, o, !1, i, s)),
        (e[wn] = t.current),
        ji(e),
        r)
      )
        for (e = 0; e < r.length; e++)
          (n = r[e]),
            (o = n._getVersion),
            (o = o(n._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [n, o])
              : t.mutableSourceEagerHydrationData.push(n, o);
      return new ca(t);
    };
    wt.render = function (e, t, n) {
      if (!fa(t)) throw Error(C(200));
      return da(null, e, t, !1, n);
    };
    wt.unmountComponentAtNode = function (e) {
      if (!fa(e)) throw Error(C(40));
      return e._reactRootContainer
        ? (kr(function () {
            da(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[wn] = null);
            });
          }),
          !0)
        : !1;
    };
    wt.unstable_batchedUpdates = td;
    wt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
      if (!fa(n)) throw Error(C(200));
      if (e == null || e._reactInternals === void 0) throw Error(C(38));
      return da(e, t, n, !1, r);
    };
    wt.version = '18.2.0-next-9e3b772b8-20220608';
  });
  var ud = Xt((HD, o0) => {
    'use strict';
    function r0() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r0);
        } catch (e) {
          console.error(e);
        }
    }
    r0(), (o0.exports = n0());
  });
  var s0 = Xt((cd) => {
    'use strict';
    var i0 = ud();
    (cd.createRoot = i0.createRoot), (cd.hydrateRoot = i0.hydrateRoot);
    var WD;
  });
  function lT(e) {
    let t = new Error(e);
    if (t.stack === void 0)
      try {
        throw t;
      } catch {}
    return t;
  }
  function uT(e) {
    return !!e && typeof e.then == 'function';
  }
  function cT(e, t) {
    if (e != null) return e;
    throw Z(t ?? 'Got unexpected null or undefined');
  }
  function Q(e, t, n) {
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
  function ps(e) {
    return Object.freeze(new Sd(e));
  }
  function Pa(e) {
    return Object.freeze(new _d(e));
  }
  function Or(e) {
    return Object.freeze(new Sa(e));
  }
  function L0() {
    return Object.freeze(new Sa(new Promise(() => {})));
  }
  function fT(e) {
    return e.every((t) => t.state === 'hasValue')
      ? ps(e.map((t) => t.contents))
      : e.some((t) => t.state === 'hasError')
      ? Pa(
          Te(
            e.find((t) => t.state === 'hasError'),
            'Invalid loadable passed to loadableAll',
          ).contents,
        )
      : Or(Promise.all(e.map((t) => t.contents)));
  }
  function I0(e) {
    let n = (
        Array.isArray(e) ? e : Object.getOwnPropertyNames(e).map((o) => e[o])
      ).map((o) => (Mo(o) ? o : ye(o) ? Or(o) : ps(o))),
      r = fT(n);
    return Array.isArray(e)
      ? r
      : r.map((o) =>
          Object.getOwnPropertyNames(e).reduce(
            (i, s, l) => ({ ...i, [s]: o[l] }),
            {},
          ),
        );
  }
  function Mo(e) {
    return e instanceof Do;
  }
  function _T(e, t) {
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
      throw Z(`process.env.${e} value must be 'true', 'false', or empty: ${o}`);
    t(o === 'true');
  }
  function ET(e, t) {
    var n;
    let r = (n = process.env[e]) === null || n === void 0 ? void 0 : n.trim();
    r == null || r === '' || t(r.split(/\s*,\s*|\s+/));
  }
  function wT() {
    var e;
    typeof process > 'u' ||
      (((e = process) === null || e === void 0 ? void 0 : e.env) != null &&
        (_T('RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED', (t) => {
          Ed.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = t;
        }),
        ET('RECOIL_GKS_ENABLED', (t) => {
          t.forEach((n) => {
            Ed.RECOIL_GKS_ENABLED.add(n);
          });
        })));
  }
  function Oa(e) {
    return Fo.RECOIL_GKS_ENABLED.has(e);
  }
  function TT(e, t, { error: n } = {}) {
    return null;
  }
  function NT() {
    var e;
    let { ReactCurrentDispatcher: t, ReactCurrentOwner: n } =
        ge.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      o =
        ((e = t?.current) !== null && e !== void 0 ? e : n.currentDispatcher)
          .useSyncExternalStore != null;
    return (
      bd &&
        !o &&
        !l0 &&
        ((l0 = !0),
        st(
          'A React renderer without React 18+ API support is being used with React 18+.',
        )),
      o
    );
  }
  function AT() {
    return ue('recoil_transition_support')
      ? { mode: 'TRANSITION_SUPPORT', early: !0, concurrent: !0 }
      : ue('recoil_sync_external_store') && bd != null
      ? { mode: 'SYNC_EXTERNAL_STORE', early: !0, concurrent: !1 }
      : ue('recoil_mutable_source') &&
        P0 != null &&
        typeof window < 'u' &&
        !window.$disableRecoilValueMutableSource_TEMP_HACK_DO_NOT_USE
      ? ue('recoil_suppress_rerender_in_callback')
        ? {
            mode: 'MUTABLE_SOURC\
E',
            early: !0,
            concurrent: !0,
          }
        : { mode: 'MUTABLE_SOURCE', early: !1, concurrent: !1 }
      : ue('recoil_suppress_rerender_in_callback')
      ? { mode: 'LEGACY', early: !0, concurrent: !1 }
      : { mode: 'LEGACY', early: !1, concurrent: !1 };
  }
  function CT() {
    return !1;
  }
  function kT(e) {
    return e instanceof _a || e instanceof Ea;
  }
  function DT(e, ...t) {}
  function VT(e, t) {
    return (function* () {
      let n = 0;
      for (let r of e) yield t(r, n++);
    })();
  }
  function $T(e) {
    return Ma(e, (t) => Te(Ud.get(t)));
  }
  function UT(e) {
    if (Mr.has(e)) {
      let t = `Duplicate atom key "${e}". This is a FATAL ERROR\
 in
      production. But it is safe to ignore this warning if it occurred because of
      hot module replacement.`;
      console.warn(t);
    }
  }
  function FT(e) {
    Fo.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED && UT(e.key),
      Mr.set(e.key, e);
    let t =
      e.set == null
        ? new Dr.RecoilValueReadOnly(e.key)
        : new Dr.RecoilState(e.key);
    return Ud.set(e.key, t), t;
  }
  function zT(e) {
    let t = Mr.get(e);
    if (t == null) throw new Ta(`Missing definition for RecoilValue: "${e}""`);
    return t;
  }
  function BT(e) {
    return Mr.get(e);
  }
  function jT(e) {
    var t;
    if (!ue('recoil_memory_managament_2020')) return;
    let n = Mr.get(e);
    if (
      n != null &&
      (t = n.shouldDeleteConfigOnRelease) !== null &&
      t !== void 0 &&
      t.call(n)
    ) {
      var r;
      Mr.delete(e), (r = O0(e)) === null || r === void 0 || r(), Ra.delete(e);
    }
  }
  function HT(e, t) {
    ue('recoil_memory_managament_2020') &&
      (t === void 0 ? Ra.delete(e) : Ra.set(e, t));
  }
  function O0(e) {
    return Ra.get(e);
  }
  function WT(e, t) {
    t();
  }
  function KT(e, t) {
    return (t = { exports: {} }), e(t, t.exports), t.exports;
  }
  function Fd(e) {
    return ue('recoil_hamt_2020') ? new Td(e) : new wd(e);
  }
  function XT(e, ...t) {
    let n = new Set();
    e: for (let r of e) {
      for (let o of t) if (o.has(r)) continue e;
      n.add(r);
    }
    return n;
  }
  function JT(e, t) {
    let n = new Map();
    return (
      e.forEach((r, o) => {
        n.set(o, t(r, o));
      }),
      n
    );
  }
  function eR() {
    return { nodeDeps: new Map(), nodeToNodeSubscriptions: new Map() };
  }
  function tR(e) {
    return {
      nodeDeps: xa(e.nodeDeps, (t) => new Set(t)),
      nodeToNodeSubscriptions: xa(e.nodeToNodeSubscriptions, (t) => new Set(t)),
    };
  }
  function hd(e, t, n, r) {
    let { nodeDeps: o, nodeToNodeSubscriptions: i } = n,
      s = o.get(e);
    if (s && r && s !== r.nodeDeps.get(e)) return;
    o.set(e, t);
    let l = s == null ? t : as(t, s);
    for (let a of l) i.has(a) || i.set(a, new Set()), Te(i.get(a)).add(e);
    if (s) {
      let a = as(s, t);
      for (let u of a) {
        if (!i.has(u)) return;
        let f = Te(i.get(u));
        f.delete(e), f.size === 0 && i.delete(u);
      }
    }
  }
  function nR(e, t, n, r) {
    var o, i, s, l;
    let a = n.getState();
    r === a.currentTree.version ||
      r === ((o = a.nextTree) === null || o === void 0 ? void 0 : o.version) ||
      r ===
        ((i = a.previousTree) === null || i === void 0 ? void 0 : i.version) ||
      st('Tried to save dependencies to a discarded tree');
    let u = n.getGraph(r);
    if (
      (hd(e, t, u),
      r ===
        ((s = a.previousTree) === null || s === void 0 ? void 0 : s.version))
    ) {
      let p = n.getGraph(a.currentTree.version);
      hd(e, t, p, u);
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
        hd(e, t, m, u);
      }
    }
  }
  function M0() {
    let e = D0();
    return {
      version: e,
      stateID: e,
      transactionMetadata: {},
      dirtyAtoms: new Set(),
      atomValues: a0(),
      nonvalidatedAtoms: a0(),
    };
  }
  function cR() {
    let e = M0();
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
      graphsByVersion: new Map().set(e.version, uR()),
      retention: {
        referenceCounts: new Map(),
        nodesRetainedByZone: new Map(),
        retainablesToCheckForRelease: new Set(),
      },
      nodeCleanupFunctions: new Map(),
    };
  }
  function fR() {
    return new Na();
  }
  function dR(e, t) {
    let n = new Set(e);
    return n.add(t), n;
  }
  function pR(e, t) {
    let n = new Set(e);
    return n.delete(t), n;
  }
  function hR(e, t, n) {
    let r = new Map(e);
    return r.set(t, n), r;
  }
  function mR(e, t, n) {
    let r = new Map(e);
    return r.set(t, n(r.get(t))), r;
  }
  function vR(e, t) {
    let n = new Map(e);
    return n.delete(t), n;
  }
  function yR(e, t) {
    let n = new Map(e);
    return t.forEach((r) => n.delete(r)), n;
  }
  function* gR(e, t) {
    let n = 0;
    for (let r of e) t(r, n++) && (yield r);
  }
  function SR(e, t) {
    return new Proxy(e, {
      get: (r, o) => (!(o in r) && o in t && (r[o] = t[o]()), r[o]),
      ownKeys: (r) => Object.keys(r),
    });
  }
  function TR(e, t, n) {
    if (!ue('recoil_memory_managament_2020')) return () => {};
    let { nodesRetainedByZone: r } = e.getState().retention;
    function o(i) {
      let s = r.get(i);
      s || r.set(i, (s = new Set())), s.add(t);
    }
    if (n instanceof c0) o(n);
    else if (Array.isArray(n)) for (let i of n) o(i);
    return () => {
      if (!ue('recoil_memory_managament_2020')) return;
      let { retention: i } = e.getState();
      function s(l) {
        let a = i.nodesRetainedByZone.get(l);
        a?.delete(t), a && a.size === 0 && i.nodesRetainedByZone.delete(l);
      }
      if (n instanceof c0) s(n);
      else if (Array.isArray(n)) for (let l of n) s(l);
    };
  }
  function Bd(e, t, n, r) {
    let o = e.getState();
    if (o.nodeCleanupFunctions.has(n)) return;
    let i = vs(n),
      s = TR(e, n, i.retainedBy),
      l = i.init(e, t, r);
    o.nodeCleanupFunctions.set(n, () => {
      l(), s();
    });
  }
  function RR(e, t, n) {
    Bd(e, e.getState().currentTree, t, n);
  }
  function xR(e, t) {
    var n;
    let r = e.getState();
    (n = r.nodeCleanupFunctions.get(t)) === null || n === void 0 || n(),
      r.nodeCleanupFunctions.delete(t);
  }
  function NR(e, t, n) {
    return Bd(e, t, n, 'get'), vs(n).get(e, t);
  }
  function U0(e, t, n) {
    return vs(n).peek(e, t);
  }
  function AR(e, t, n) {
    var r;
    let o = _R(t);
    return (
      o == null || (r = o.invalidate) === null || r === void 0 || r.call(o, e),
      {
        ...e,
        atomValues: e.atomValues.clone().delete(t),
        nonvalidatedAtoms: e.nonvalidatedAtoms.clone().set(t, n),
        dirtyAtoms: ER(e.dirtyAtoms, t),
      }
    );
  }
  function CR(e, t, n, r) {
    let o = vs(n);
    if (o.set == null)
      throw new Rd(`Attempt to set read-only RecoilValue: ${n}`);
    let i = o.set;
    return Bd(e, t, n, 'set'), i(e, t, r);
  }
  function kR(e, t, n) {
    let r = e.getState(),
      o = e.getGraph(t.version),
      i = vs(n).nodeType;
    return $0(
      { type: i },
      {
        loadable: () => U0(e, t, n),
        isActive: () => r.knownAtoms.has(n) || r.knownSelectors.has(n),
        isSet: () => (i === 'selector' ? !1 : t.atomValues.has(n)),
        isModified: () => t.dirtyAtoms.has(n),
        deps: () => {
          var s;
          return u0((s = o.nodeDeps.get(n)) !== null && s !== void 0 ? s : []);
        },
        subscribers: () => {
          var s, l;
          return {
            nodes: u0(zd(F0(e, t, new Set([n])), (a) => a !== n)),
            components: Ma(
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
  function F0(e, t, n) {
    let r = new Set(),
      o = Array.from(n),
      i = e.getGraph(t.version);
    for (let l = o.pop(); l; l = o.pop()) {
      var s;
      r.add(l);
      let a =
        (s = i.nodeToNodeSubscriptions.get(l)) !== null && s !== void 0
          ? s
          : wR;
      for (let u of a) r.has(u) || o.push(u);
    }
    return r;
  }
  function LR(e) {
    z0 = e;
  }
  function IR() {
    var e;
    (e = z0) === null || e === void 0 || e();
  }
  function BR(e, { key: t }, n = e.getState().currentTree) {
    var r, o;
    let i = e.getState();
    n.version === i.currentTree.version ||
      n.version ===
        ((r = i.nextTree) === null || r === void 0 ? void 0 : r.version) ||
      n.version ===
        ((o = i.previousTree) === null || o === void 0 ? void 0 : o.version) ||
      st('Tried to read from a discarded tree');
    let s = j0(e, n, t);
    return s.state === 'loading' && s.contents.catch(() => {}), s;
  }
  function jR(e, t) {
    let n = e.clone();
    return (
      t.forEach((r, o) => {
        r.state === 'hasValue' && r.contents instanceof jd
          ? n.delete(o)
          : n.set(o, r);
      }),
      n
    );
  }
  function HR(e, t, { key: n }, r) {
    if (typeof r == 'function') {
      let o = j0(e, t, n);
      if (o.state === 'loading') {
        let i = `Tried to set atom or selector "${n}" using an updater function while the current state is pending, this is not currently supported.`;
        throw (st(i), Z(i));
      } else if (o.state === 'hasError') throw o.contents;
      return r(o.contents);
    } else return r;
  }
  function WR(e, t, n) {
    if (n.type === 'set') {
      let { recoilValue: o, valueOrUpdater: i } = n,
        s = HR(e, t, o, i),
        l = OR(e, t, o.key, s);
      for (let [a, u] of l.entries()) xd(t, a, u);
    } else if (n.type === 'setLoadable') {
      let {
        recoilValue: { key: o },
        loadable: i,
      } = n;
      xd(t, o, i);
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
        s = H0(o);
      s == null || (r = s.invalidate) === null || r === void 0 || r.call(s, t),
        t.atomValues.delete(o),
        t.nonvalidatedAtoms.set(o, i),
        t.dirtyAtoms.add(o);
    } else st(`Unknown action ${n.type}`);
  }
  function xd(e, t, n) {
    n.state === 'hasValue' && n.contents instanceof jd
      ? e.atomValues.delete(t)
      : e.atomValues.set(t, n),
      e.dirtyAtoms.add(t),
      e.nonvalidatedAtoms.delete(t);
  }
  function W0(e, t) {
    e.replaceState((n) => {
      let r = G0(n);
      for (let o of t) WR(e, r, o);
      return K0(e, r), zR(), r;
    });
  }
  function $a(e, t) {
    if (us.length) {
      let n = us[us.length - 1],
        r = n.get(e);
      r || n.set(e, (r = [])), r.push(t);
    } else W0(e, [t]);
  }
  function GR() {
    let e = new Map();
    return (
      us.push(e),
      () => {
        for (let [n, r] of e) W0(n, r);
        us.pop() !== e && st('Incorrect order of batch popping');
      }
    );
  }
  function G0(e) {
    return {
      ...e,
      atomValues: e.atomValues.clone(),
      nonvalidatedAtoms: e.nonvalidatedAtoms.clone(),
      dirtyAtoms: new Set(e.dirtyAtoms),
    };
  }
  function K0(e, t) {
    let n = PR(e, t, t.dirtyAtoms);
    for (let i of n) {
      var r, o;
      (r = H0(i)) === null ||
        r === void 0 ||
        (o = r.invalidate) === null ||
        o === void 0 ||
        o.call(r, t);
    }
  }
  function Q0(e, t, n) {
    $a(e, { type: 'set', recoilValue: t, valueOrUpdater: n });
  }
  function KR(e, t, n) {
    if (n instanceof jd) return Q0(e, t, n);
    $a(e, { type: 'setLoadable', recoilValue: t, loadable: n });
  }
  function QR(e, t) {
    $a(e, { type: 'markModified', recoilValue: t });
  }
  function YR(e, t, n) {
    $a(e, { type: 'setUnvalidated', recoilValue: t, unvalidatedValue: n });
  }
  function ZR(e, { key: t }, n, r = null) {
    let o = DR(),
      i = e.getState();
    i.nodeToComponentSubscriptions.has(t) ||
      i.nodeToComponentSubscriptions.set(t, new Map()),
      Te(i.nodeToComponentSubscriptions.get(t)).set(o, [
        r ?? '<not captured>',
        n,
      ]);
    let s = VR();
    if (s.early && (s.mode === 'LEGACY' || s.mode === 'MUTABLE_SOURCE')) {
      let l = e.getState().nextTree;
      l && l.dirtyAtoms.has(t) && n(l);
    }
    return {
      release: () => {
        let l = e.getState(),
          a = l.nodeToComponentSubscriptions.get(t);
        if (a === void 0 || !a.has(o)) {
          st(`Subscription missing at release time for atom ${t}\
. This is a bug in Recoil.`);
          return;
        }
        a.delete(o), a.size === 0 && l.nodeToComponentSubscriptions.delete(t);
      },
    };
  }
  function qR(e, t) {
    var n;
    let { currentTree: r } = e.getState(),
      o = MR(t.key);
    (n = o.clearCache) === null || n === void 0 || n.call(o, e, r);
  }
  function XR(e, t, n) {
    let r = e.entries(),
      o = r.next();
    for (; !o.done; ) {
      let i = o.value;
      if (t.call(n, i[1], i[0], e)) return !0;
      o = r.next();
    }
    return !1;
  }
  function X0(e, t) {
    let n = e.getState(),
      r = n.currentTree;
    if (n.nextTree) {
      st(
        'releaseNodesNowOnCurrentTree should only be called at the end of a batch',
      );
      return;
    }
    let o = new Set();
    for (let s of t)
      if (s instanceof Z0) for (let l of sx(n, s)) o.add(l);
      else o.add(s);
    let i = rx(e, o);
    for (let s of i) ix(e, r, s);
  }
  function rx(e, t) {
    let n = e.getState(),
      r = n.currentTree,
      o = e.getGraph(r.version),
      i = new Set(),
      s = new Set();
    return l(t), i;
    function l(a) {
      let u = new Set(),
        f = ox(e, r, a, i, s);
      for (let y of f) {
        var p;
        if (Y0(y).retainedBy === 'recoilRoot') {
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
        if (J0(y).some((U) => n.retention.referenceCounts.get(U))) {
          s.add(y);
          continue;
        }
        let w = o.nodeToNodeSubscriptions.get(y);
        if (w && JR(w, (U) => s.has(U))) {
          s.add(y);
          continue;
        }
        i.add(y), u.add(y);
      }
      let m = new Set();
      for (let y of u)
        for (let w of (S = o.nodeDeps.get(y)) !== null && S !== void 0
          ? S
          : q0) {
          var S;
          i.has(w) || m.add(w);
        }
      m.size && l(m);
    }
  }
  function ox(e, t, n, r, o) {
    let i = e.getGraph(t.version),
      s = [],
      l = new Set();
    for (; n.size > 0; ) a(Te(n.values().next().value));
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
  function ix(e, t, n) {
    if (!ue('recoil_memory_managament_2020')) return;
    ex(e, n);
    let r = e.getState();
    r.knownAtoms.delete(n),
      r.knownSelectors.delete(n),
      r.nodeTransactionSubscriptions.delete(n),
      r.retention.referenceCounts.delete(n);
    let o = J0(n);
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
    tx(n);
  }
  function sx(e, t) {
    var n;
    return (n = e.retention.nodesRetainedByZone.get(t)) !== null && n !== void 0
      ? n
      : q0;
  }
  function J0(e) {
    let t = Y0(e).retainedBy;
    return t === void 0 || t === 'components' || t === 'recoilRoot'
      ? []
      : t instanceof Z0
      ? [t]
      : t;
  }
  function lx(e, t) {
    let n = e.getState();
    n.nextTree
      ? n.retention.retainablesToCheckForRelease.add(t)
      : X0(e, new Set([t]));
  }
  function ax(e, t, n) {
    var r;
    if (!ue('recoil_memory_managament_2020')) return;
    let o = e.getState().retention.referenceCounts,
      i = ((r = o.get(t)) !== null && r !== void 0 ? r : 0) + n;
    i === 0 ? eg(e, t) : o.set(t, i);
  }
  function eg(e, t) {
    if (!ue('recoil_memory_managament_2020')) return;
    e.getState().retention.referenceCounts.delete(t), lx(e, t);
  }
  function ux(e) {
    if (!ue('recoil_memory_managament_2020')) return;
    let t = e.getState();
    X0(e, t.retention.retainablesToCheckForRelease),
      t.retention.retainablesToCheckForRelease.clear();
  }
  function cx(e) {
    return e === void 0 ? 'recoilRoot' : e;
  }
  function* _x(e) {
    for (let t of e) for (let n of t) yield n;
  }
  function Tx(e, t) {
    let n;
    return (...r) => {
      n || (n = {});
      let o = t(...r);
      return Object.hasOwnProperty.call(n, o) || (n[o] = e(...r)), n[o];
    };
  }
  function Rx(e, t) {
    let n, r;
    return (...o) => {
      let i = t(...o);
      return n === i || ((n = i), (r = e(...o))), r;
    };
  }
  function xx(e, t) {
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
  function rg(e, t, n = !1) {
    let r = e.getState(),
      o = n ? Vx() : t.version;
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
        Ma(r.nodeCleanupFunctions.entries(), ([i]) => [i, () => {}]),
      ),
    };
  }
  function Fx(e) {
    let t = new Vo(bx());
    return e != null ? t.map(e) : t;
  }
  function zx(e, t = 'latest') {
    let n = h0(e, t);
    return n.isRetained() ? n : (og(), h0(e, t));
  }
  function Gx(...e) {
    let t = new Set();
    for (let n of e) for (let r of n) t.add(r);
    return t;
  }
  function Yx(e) {
    let t = Qx(e);
    return t.current === e && typeof e == 'function' && (t.current = e()), t;
  }
  function ns() {
    throw Z('This component must be used inside a <RecoilRoot> component.');
  }
  function v0(e) {
    if (Cd)
      throw Z(
        'An atom update was triggered within the execution of a state updater function. State updater functions provided to Recoil must be pure functions.',
      );
    let t = e.getState();
    if (t.nextTree === null) {
      ue('recoil_memory_managament_2020') &&
        ue('recoil_release_on_cascading_update_killswitch_2021') &&
        t.commitDepth > 0 &&
        ag(e);
      let n = t.currentTree.version,
        r = Zx();
      (t.nextTree = {
        ...t.currentTree,
        version: r,
        stateID: r,
        dirtyAtoms: new Set(),
        transactionMetadata: {},
      }),
        t.graphsByVersion.set(r, rN(Te(t.graphsByVersion.get(n))));
    }
  }
  function cN() {
    let e = ug(dg);
    return (
      e == null &&
        $d(
          'Attempted to use a Recoil hook outside of a <RecoilRoot>. <RecoilRoot> must be an ancestor of any component that uses Recoil hooks.',
        ),
      e
    );
  }
  function Wd(e, t, n) {
    let r = Xx(e, n, n.dirtyAtoms);
    for (let o of r) {
      let i = t.nodeToComponentSubscriptions.get(o);
      if (i) for (let [s, [l, a]] of i) a(n);
    }
  }
  function pg(e) {
    let t = e.getState(),
      n = t.currentTree,
      r = n.dirtyAtoms;
    if (r.size) {
      for (let [o, i] of t.nodeTransactionSubscriptions)
        if (r.has(o)) for (let [s, l] of i) l(e);
      for (let [o, i] of t.transactionSubscriptions) i(e);
      (!lg().early || t.suspendedComponentResolvers.size > 0) &&
        (Wd(e, t, n),
        t.suspendedComponentResolvers.forEach((o) => o()),
        t.suspendedComponentResolvers.clear());
    }
    t.queuedComponentCallbacks_DEPRECATED.forEach((o) => o(n)),
      t.queuedComponentCallbacks_DEPRECATED.splice(
        0,
        t.queuedComponentCallbacks_DEPRECATED.length,
      );
  }
  function fN(e) {
    let t = e.getState();
    t.commitDepth++;
    try {
      let { nextTree: n } = t;
      if (n == null) return;
      (t.previousTree = t.currentTree),
        (t.currentTree = n),
        (t.nextTree = null),
        pg(e),
        t.previousTree != null
          ? t.graphsByVersion.delete(t.previousTree.version)
          : st(
              'Ended batch with no previous state, which is unexpected',
              'recoil',
            ),
        (t.previousTree = null),
        ue('recoil_memory_managament_2020') && n == null && ag(e);
    } finally {
      t.commitDepth--;
    }
  }
  function dN({ setNotifyBatcherOfChange: e }) {
    let t = Ba(),
      [, n] = uN([]);
    return (
      e(() => n({})),
      Ad(
        () => (
          e(() => n({})),
          () => {
            e(() => {});
          }
        ),
        [e],
      ),
      Ad(() => {
        GT.enqueueExecution('Batcher', () => {
          fN(t.current);
        });
      }),
      null
    );
  }
  function pN(e, t) {
    let n = ig();
    return (
      t({
        set: (r, o) => {
          let i = n.currentTree,
            s = eN(e, i, r.key, o),
            l = new Set(s.keys()),
            a = i.nonvalidatedAtoms.clone();
          for (let u of l) a.delete(u);
          n.currentTree = {
            ...i,
            dirtyAtoms: Kx(i.dirtyAtoms, l),
            atomValues: oN(i.atomValues, s),
            nonvalidatedAtoms: a,
          };
        },
        setUnvalidatedAtomValues: (r) => {
          r.forEach((o, i) => {
            n.currentTree = tN(n.currentTree, i, o);
          });
        },
      }),
      n
    );
  }
  function hN(e) {
    let t = iN(e),
      n = t.getStore_INTERNAL().getState();
    return (
      t.retain(),
      n.nodeCleanupFunctions.forEach((r) => r()),
      n.nodeCleanupFunctions.clear(),
      n
    );
  }
  function mN({
    initializeState_DEPRECATED: e,
    initializeState: t,
    store_INTERNAL: n,
    children: r,
  }) {
    let o,
      i = (S) => {
        let y = o.current.graphsByVersion;
        if (y.has(S)) return Te(y.get(S));
        let w = nN();
        return y.set(S, w), w;
      },
      s = (S, y) => {
        if (y == null) {
          let { transactionSubscriptions: w } = p.current.getState(),
            U = y0++;
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
          let U = y0++;
          return (
            Te(w.get(y)).set(U, S),
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
        v0(p.current);
        for (let y of Object.keys(S))
          Te(p.current.getState().nextTree).transactionMetadata[y] = S[y];
      },
      a = (S) => {
        v0(p.current);
        let y = Te(o.current.nextTree),
          w;
        try {
          (Cd = !0), (w = S(y));
        } finally {
          Cd = !1;
        }
        w !== y &&
          ((o.current.nextTree = w),
          lg().early && Wd(p.current, o.current, w),
          Te(u.current)());
      },
      u = aN(null),
      f = sN(
        (S) => {
          u.current = S;
        },
        [u],
      ),
      p = m0(
        () =>
          n ?? {
            storeID: sg(),
            getState: () => o.current,
            replaceState: a,
            getGraph: i,
            subscribeToTransactions: s,
            addTransactionMetadata: l,
          },
      );
    n != null && (p.current = n),
      (o = m0(() => (e != null ? pN(p.current, e) : t != null ? hN(t) : ig())));
    let m = lN(() => md?.(o, () => o.current.currentTree.version), [o]);
    return (
      Ad(() => {
        let S = p.current;
        for (let y of new Set(S.getState().knownAtoms)) Jx(S, y, 'get');
        return () => {
          for (let y of S.getState().knownAtoms) qx(S, y);
        };
      }, [p]),
      ge.default.createElement(
        fg.Provider,
        { value: p },
        ge.default.createElement(
          dg.Provider,
          { value: m },
          ge.default.createElement(dN, { setNotifyBatcherOfChange: f }),
          r,
        ),
      )
    );
  }
  function vN(e) {
    let { override: t, ...n } = e,
      r = Ba();
    return t === !1 && r.current !== cg
      ? e.children
      : ge.default.createElement(mN, n);
  }
  function yN() {
    return Ba().current.storeID;
  }
  function gN(e, t) {
    if (e === t) return !0;
    if (e.length !== t.length) return !1;
    for (let n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return !1;
    return !0;
  }
  function wN(e) {
    let t = EN();
    return (
      _N(() => {
        t.current = e;
      }),
      t.current
    );
  }
  function CN(e) {
    if (ue('recoil_memory_managament_2020')) return kN(e);
  }
  function kN(e) {
    let n = (Array.isArray(e) ? e : [e]).map((s) =>
        s instanceof xN ? s : s.key,
      ),
      r = TN();
    NN(() => {
      if (!ue('recoil_memory_managament_2020')) return;
      let s = r.current;
      if (o.current && !g0) window.clearTimeout(o.current), (o.current = null);
      else for (let l of n) rs(s, l, 1);
      return () => {
        for (let l of n) rs(s, l, -1);
      };
    }, [r, ...n]);
    let o = AN(),
      i = hg(n);
    if (!g0 && (i === void 0 || !SN(i, n))) {
      let s = r.current;
      for (let l of n) rs(s, l, 1);
      if (i) for (let l of i) rs(s, l, -1);
      o.current && window.clearTimeout(o.current),
        (o.current = window.setTimeout(() => {
          o.current = null;
          for (let l of n) rs(s, l, -1);
        }, RN));
    }
  }
  function LN() {
    return '<component name not available>';
  }
  function Qd(e, t, n) {
    if (e.state === 'hasValue') return e.contents;
    throw e.state === 'loading'
      ? new Promise((o) => {
          let i = n.current.getState().suspendedComponentResolvers;
          i.add(o),
            $N &&
              ye(e.contents) &&
              e.contents.finally(() => {
                i.delete(o);
              });
        })
      : e.state === 'hasError'
      ? e.contents
      : Z(`Invalid value of loadable atom "${t.key}"`);
  }
  function UN() {
    let e = gs(),
      t = cn(),
      [, n] = Kd([]),
      r = cs(new Set());
    r.current = new Set();
    let o = cs(new Set()),
      i = cs(new Map()),
      s = ht(
        (a) => {
          let u = i.current.get(a);
          u && (u.release(), i.current.delete(a));
        },
        [i],
      ),
      l = ht((a, u) => {
        i.current.has(u) && n([]);
      }, []);
    return (
      $o(() => {
        let a = t.current;
        as(r.current, o.current).forEach((u) => {
          if (i.current.has(u)) {
            $d(`Double subscription to RecoilValue "${u}"`);
            return;
          }
          let f = bo(a, new kd(u), (m) => l(m, u), e);
          i.current.set(u, f),
            a.getState().nextTree
              ? a.getState().queuedComponentCallbacks_DEPRECATED.push(() => {
                  l(a.getState(), u);
                })
              : l(a.getState(), u);
        }),
          as(o.current, r.current).forEach((u) => {
            s(u);
          }),
          (o.current = r.current);
      }),
      $o(() => {
        let a = i.current;
        return (
          as(r.current, new Set(a.keys())).forEach((u) => {
            let f = bo(t.current, new kd(u), (p) => l(p, u), e);
            a.set(u, f);
          }),
          () => a.forEach((u, f) => s(f))
        );
      }, [e, t, s, l]),
      vg(() => {
        function a(y) {
          return (w) => {
            Aa(t.current, y, w);
          };
        }
        function u(y) {
          return () => Aa(t.current, y, mg);
        }
        function f(y) {
          var w;
          r.current.has(y.key) || (r.current = bN(r.current, y.key));
          let U = t.current.getState();
          return Ss(
            t.current,
            y,
            Bo().early && (w = U.nextTree) !== null && w !== void 0
              ? w
              : U.currentTree,
          );
        }
        function p(y) {
          let w = f(y);
          return Qd(w, y, t);
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
  function zN(e) {
    let t = cn(),
      n = gs(),
      r = ht(() => {
        var l;
        let a = t.current,
          u = a.getState(),
          f =
            Bo().early && (l = u.nextTree) !== null && l !== void 0
              ? l
              : u.currentTree;
        return { loadable: Ss(a, e, f), key: e.key };
      }, [t, e]),
      o = ht((l) => {
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
      i = vg(() => o(r), [r, o]),
      s = ht(
        (l) => {
          let a = t.current;
          return bo(a, e, l, n).release;
        },
        [t, e, n],
      );
    return DN(s, i, i).loadable;
  }
  function BN(e) {
    let t = cn(),
      n = ht(() => {
        var u;
        let f = t.current,
          p = f.getState(),
          m =
            Bo().early && (u = p.nextTree) !== null && u !== void 0
              ? u
              : p.currentTree;
        return Ss(f, e, m);
      }, [t, e]),
      r = ht(() => n(), [n]),
      o = gs(),
      i = ht(
        (u, f) => {
          let p = t.current;
          return bo(
            p,
            e,
            () => {
              if (!ue('recoil_suppress_rerender_in_callback')) return f();
              let S = n();
              a.current.is(S) || f(), (a.current = S);
            },
            o,
          ).release;
        },
        [t, e, o, n],
      ),
      s = MN();
    if (s == null)
      throw Z(
        'Recoil hooks must be used in components contained within a <RecoilRoot> component.',
      );
    let l = ON(s, r, i),
      a = cs(l);
    return (
      $o(() => {
        a.current = l;
      }),
      l
    );
  }
  function Ld(e) {
    let t = cn(),
      n = gs(),
      r = ht(() => {
        var a;
        let u = t.current,
          f = u.getState(),
          p =
            Bo().early && (a = f.nextTree) !== null && a !== void 0
              ? a
              : f.currentTree;
        return Ss(u, e, p);
      }, [t, e]),
      o = ht(() => ({ loadable: r(), key: e.key }), [r, e.key]),
      i = ht(
        (a) => {
          let u = o();
          return a.loadable.is(u.loadable) && a.key === u.key ? a : u;
        },
        [o],
      );
    $o(() => {
      let a = bo(
        t.current,
        e,
        (u) => {
          l(i);
        },
        n,
      );
      return l(i), a.release;
    }, [n, e, t, i]);
    let [s, l] = Kd(o);
    return s.key !== e.key ? o().loadable : s.loadable;
  }
  function jN(e) {
    let t = cn(),
      [, n] = Kd([]),
      r = gs(),
      o = ht(() => {
        var l;
        let a = t.current,
          u = a.getState(),
          f =
            Bo().early && (l = u.nextTree) !== null && l !== void 0
              ? l
              : u.currentTree;
        return Ss(a, e, f);
      }, [t, e]),
      i = o(),
      s = cs(i);
    return (
      $o(() => {
        s.current = i;
      }),
      $o(() => {
        let l = t.current,
          a = l.getState(),
          u = bo(
            l,
            e,
            (p) => {
              var m;
              if (!ue('recoil_suppress_rerender_in_callback')) return n([]);
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
          if (!ue('recoil_suppress_rerender_in_callback')) return n([]);
          let p = o();
          ((f = s.current) !== null && f !== void 0 && f.is(p)) || n(p),
            (s.current = p);
        }
        return u.release;
      }, [r, o, e, t]),
      i
    );
  }
  function Yd(e) {
    return (
      ue('recoil_memory_managament_2020') && Gd(e),
      {
        TRANSITION_SUPPORT: Ld,
        SYNC_EXTERNAL_STORE: PN() ? zN : Ld,
        MUTABLE_SOURCE: BN,
        LEGACY: jN,
      }[Bo().mode](e)
    );
  }
  function yg(e) {
    let t = cn(),
      n = Yd(e);
    return Qd(n, e, t);
  }
  function ja(e) {
    let t = cn();
    return ht(
      (n) => {
        Aa(t.current, e, n);
      },
      [t, e],
    );
  }
  function HN(e) {
    let t = cn();
    return ht(() => {
      Aa(t.current, e, mg);
    }, [t, e]);
  }
  function WN(e) {
    return [yg(e), ja(e)];
  }
  function GN(e) {
    return [Yd(e), ja(e)];
  }
  function KN() {
    let e = cn();
    return (t, n = {}) => {
      IN(() => {
        e.current.addTransactionMetadata(n),
          t.forEach((r, o) => VN(e.current, new kd(o), r));
      });
    };
  }
  function gg(e) {
    return ue('recoil_memory_managament_2020') && Gd(e), Ld(e);
  }
  function Sg(e) {
    let t = cn(),
      n = gg(e);
    return Qd(n, e, t);
  }
  function QN(e) {
    return [Sg(e), ja(e)];
  }
  function ZN(e, t) {
    let n = new Map();
    for (let [r, o] of e) t(o, r) && n.set(r, o);
    return n;
  }
  function XN(e, t) {
    let n = new Set();
    for (let r of e) t(r) && n.add(r);
    return n;
  }
  function eA(...e) {
    let t = new Map();
    for (let n = 0; n < e.length; n++) {
      let r = e[n].keys(),
        o;
      for (; !(o = r.next()).done; ) t.set(o.value, e[n].get(o.value));
    }
    return t;
  }
  function Wa(e) {
    let t = Zd();
    Eg(() => t.current.subscribeToTransactions(e).release, [e, t]);
  }
  function E0(e) {
    let t = e.atomValues.toMap(),
      n = xa(
        qN(t, (r, o) => {
          let s = _g(o).persistence_UNSTABLE;
          return s != null && s.type !== 'none' && r.state === 'hasValue';
        }),
        (r) => r.contents,
      );
    return tA(e.nonvalidatedAtoms.toMap(), n);
  }
  function uA(e) {
    Wa(
      Ha(
        (t) => {
          let n = t.getState().previousTree,
            r = t.getState().currentTree;
          n ||
            (st(
              'Transaction subsc\
ribers notified without a previous tree being present -- this is a bug in Recoil',
            ),
            (n = t.getState().currentTree));
          let o = E0(r),
            i = E0(n),
            s = xa(oA, (a) => {
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
            l = JN(r.dirtyAtoms, (a) => o.has(a) || i.has(a));
          e({
            atomValues: o,
            previousAtomValues: i,
            atomInfo: s,
            modifiedAtoms: l,
            transactionMetadata: {
              ...r.transactionMetadata,
            },
          });
        },
        [e],
      ),
    );
  }
  function cA(e) {
    Wa(
      Ha(
        (t) => {
          let n = Ca(t, 'latest'),
            r = Ca(t, 'previous');
          e({ snapshot: n, previousSnapshot: r });
        },
        [e],
      ),
    );
  }
  function fA() {
    let e = Zd(),
      [t, n] = aA(() => Ca(e.current)),
      r = hg(t),
      o = S0(),
      i = S0();
    if (
      (Wa(Ha((l) => n(Ca(l)), [])),
      Eg(() => {
        let l = t.retain();
        if (o.current && !_0) {
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
      r !== t && !_0)
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
        }, lA));
    }
    return t;
  }
  function wg(e, t) {
    var n;
    let r = e.getState(),
      o = (n = r.nextTree) !== null && n !== void 0 ? n : r.currentTree,
      i = t.getStore_INTERNAL().getState().currentTree;
    nA(() => {
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
            _g(f).shouldRestoreFromSnapshots &&
            s.add(f);
        }
      s.forEach((u) => {
        sA(e, new iA(u), i.atomValues.has(u) ? Te(i.atomValues.get(u)) : rA);
      }),
        e.replaceState((u) => ({ ...u, stateID: t.getID() }));
    });
  }
  function dA() {
    let e = Zd();
    return Ha((t) => wg(e.current, t), [e]);
  }
  function mA() {
    let e = hA();
    return ({ key: t }) => pA(e.current, e.current.getState().currentTree, t);
  }
  function EA() {
    yA().mode === 'MUTABLE_SOURCE' &&
      console.warn(
        'Warning: There are known issue\
s using useRecoilBridgeAcrossReactRoots() in recoil_mutable_source rendering mode.  Please consider upgrading to recoil_sync_external_store mode.',
      );
    let e = SA().current;
    return _A(() => {
      function t({ children: n }) {
        return ge.default.createElement(gA, { store_INTERNAL: e }, n);
      }
      return t;
    }, [e]);
  }
  function w0(e) {
    return NA(e.key).nodeType === 'atom';
  }
  function IA(e) {
    return (t) => {
      e.replaceState((n) => {
        let r = new Id(e, n);
        return t(r), r.newTreeState_INTERNAL();
      });
    };
  }
  function DA(e, t) {
    if (!e) throw new Error(t);
  }
  function xg(e, t, n, r) {
    let o = HA,
      i;
    if (
      (bA(() => {
        let l =
          'useRecoilCallback() expects a function that returns a function: it accepts a function of the type (RecoilInterface) => (Args) => ReturnType and returns a callback function (Args) => ReturnType, where RecoilInterface is an object {snapshot, set, ...} and Args and ReturnType are the argument and return types of the callback you want to create.  Please see the docs at recoiljs.org for details.';
        if (typeof t != 'function') throw Z(l);
        let a = $0(
            {
              ...(r ?? {}),
              set: (f, p) => T0(e, f, p),
              reset: (f) => T0(e, f, $A),
              refresh: (f) => FA(e, f),
              gotoSnapshot: (f) => BA(e, f),
              transact_UNSTABLE: (f) => VA(e)(f),
            },
            {
              snapshot: () => {
                let f = zA(e);
                return (i = f.retain()), f;
              },
            },
          ),
          u = t(a);
        if (typeof u != 'function') throw Z(l);
        o = u(...n);
      }),
      o instanceof ka && ls(!1),
      ye(o))
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
  function WA(e, t) {
    let n = UA();
    return jA((...r) => xg(n.current, e, r), t != null ? [...t, n] : void 0);
  }
  function YA(e) {
    let t = GA();
    return QA(() => {
      let n = t.current;
      KA(n, e);
    }, [e, t]);
  }
  function eC(e, t) {
    let n = XA();
    return JA(
      () =>
        (...r) => {
          qA(n.current)((i) => {
            e(i)(...r);
          });
        },
      t != null ? [...t, n] : void 0,
    );
  }
  function fC({ name: e, maxSize: t, mapNodeValue: n = (r) => r }) {
    let r = new uC({ maxSize: t }),
      o = new cC({
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
  function Zt(e, t, n) {
    if (typeof e == 'string' && !e.includes('"') && !e.includes('\\'))
      return `"${e}"`;
    switch (typeof e) {
      case 'undefined':
        return '';
      case 'boolean':
        return e ? 'true' : 'false';
      case 'number':
      case 'symbo\
l':
        return String(e);
      case 'string':
        return JSON.stringify(e);
      case 'function':
        if (t?.allowFunctions !== !0)
          throw Z('Attempt to serialize function in a Recoil cache key');
        return `__FUNCTION(${e.name})__`;
    }
    if (e === null) return 'null';
    if (typeof e != 'object') {
      var r;
      return (r = JSON.stringify(e)) !== null && r !== void 0 ? r : '';
    }
    if (ye(e)) return '__PROMISE__';
    if (Array.isArray(e)) return `[${e.map((o, i) => Zt(o, t, i.toString()))}]`;
    if (typeof e.toJSON == 'function') return Zt(e.toJSON(n), t, n);
    if (e instanceof Map) {
      let o = {};
      for (let [i, s] of e) o[typeof i == 'string' ? i : Zt(i, t)] = s;
      return Zt(o, t, n);
    }
    return e instanceof Set
      ? Zt(
          Array.from(e).sort((o, i) => Zt(o, t).localeCompare(Zt(i, t))),
          t,
          n,
        )
      : Symbol !== void 0 &&
        e[Symbol.iterator] != null &&
        typeof e[Symbol.iterator] == 'function'
      ? Zt(Array.from(e), t, n)
      : `{${Object.keys(e)
          .filter((o) => e[o] !== void 0)
          .sort()
          .map((o) => `${Zt(o, t)}:${Zt(e[o], t, o)}`)
          .join(',')}}`;
  }
  function dC(e, t = { allowFunctions: !1 }) {
    return Zt(e, t);
  }
  function hC(
    {
      equality: e = pa.equality,
      eviction: t = pa.eviction,
      maxSize: n = pa.maxSize,
    } = pa,
    r,
  ) {
    let o = mC(e);
    return vC(t, n, o, r);
  }
  function mC(e) {
    switch (e) {
      case 'reference':
        return (t) => t;
      case 'value':
        return (t) => Ga(t);
    }
    throw Z(`Unrecognized equality policy ${e}`);
  }
  function vC(e, t, n, r) {
    switch (e) {
      case 'keep-all':
        return new pC({ name: r, mapNodeValue: n });
      case 'lru':
        return R0({ name: r, maxSize: Te(t), mapNodeValue: n });
      case 'most-recent':
        return R0({ name: r, maxSize: 1, mapNodeValue: n });
    }
    throw Z(`Unrecognized eviction policy ${e}`);
  }
  function gC(e) {
    return () => null;
  }
  function Ig(e) {
    let t = null,
      { key: n, get: r, cachePolicy_UNSTABLE: o } = e,
      i = e.set != null ? e.set : void 0,
      s = new Set(),
      l = yC(o ?? { equality: 'reference', eviction: 'keep-all' }, n),
      a = kC(e.retainedBy_UNSTABLE),
      u = new Map(),
      f = 0;
    function p() {
      return !ue('recoil_memory_managament_2020') || f > 0;
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
      return NC(n) !== void 0 && !p();
    }
    function y(_, L, I, z, $) {
      In(L, z, $), w(_, I);
    }
    function w(_, L) {
      Je(_, L) && Oe(_), h(L, !0);
    }
    function U(_, L) {
      Je(_, L) && (Te(b(_)).stateVersions.clear(), h(L, !1));
    }
    function h(_, L) {
      let I = va.get(_);
      if (I != null) {
        for (let z of I) N0(z, Te(t));
        L && va.delete(_);
      }
    }
    function c(_, L) {
      let I = va.get(L);
      I == null && va.set(L, (I = new Set())), I.add(_);
    }
    function d(_, L, I, z, $, G) {
      return L.then((W) => {
        if (!p()) throw (Oe(_), os);
        let F = vd(W);
        return y(_, I, $, F, z), W;
      }).catch((W) => {
        if (!p()) throw (Oe(_), os);
        if (ye(W)) return E(_, W, I, z, $, G);
        let F = ha(W);
        throw (y(_, I, $, F, z), W);
      });
    }
    function E(_, L, I, z, $, G) {
      return L.then((W) => {
        if (!p()) throw (Oe(_), os);
        G.loadingDepKey != null && G.loadingDepPromise === L
          ? I.atomValues.set(G.loadingDepKey, vd(W))
          : _.getState().knownSelectors.forEach((ae) => {
              I.atomValues.delete(ae);
            });
        let F = T(_, I);
        if (F && F.state !== 'loading') {
          if (((Je(_, $) || b(_) == null) && w(_, $), F.state === 'hasValue'))
            return F.contents;
          throw F.contents;
        }
        if (!Je(_, $)) {
          let ae = re(_, I);
          if (ae != null) return ae.loadingLoadable.contents;
        }
        let [de, se] = x(_, I, $);
        if (
          (de.state !== 'loading' && y(_, I, $, de, se),
          de.state === 'hasError')
        )
          throw de.contents;
        return de.contents;
      }).catch((W) => {
        if (W instanceof Ia) throw os;
        if (!p()) throw (Oe(_), os);
        let F = ha(W);
        throw (y(_, I, $, F, z), W);
      });
    }
    function R(_, L, I, z) {
      var $, G, W, F;
      if (
        Je(_, z) ||
        L.version ===
          (($ = _.getState()) === null ||
          $ === void 0 ||
          (G = $.currentTree) === null ||
          G === void 0
            ? void 0
            : G.version) ||
        L.version ===
          ((W = _.getState()) === null ||
          W === void 0 ||
          (F = W.nextTree) === null ||
          F === void 0
            ? void 0
            : F.version)
      ) {
        var de, se, ae;
        RC(
          n,
          I,
          _,
          (de =
            (se = _.getState()) === null ||
            se === void 0 ||
            (ae = se.nextTree) === null ||
            ae === void 0
              ? void 0
              : ae.version) !== null && de !== void 0
            ? de
            : _.getState().currentTree.version,
        );
      }
      for (let Se of I) s.add(Se);
    }
    function x(_, L, I) {
      let z = IC(n),
        $ = !0,
        G = !0,
        W = () => {
          z(), (G = !1);
        },
        F,
        de = !1,
        se,
        ae = { loadingDepKey: null, loadingDepPromise: null },
        Se = new Map();
      function Tt({ key: tt }) {
        let Rt = ma(_, L, tt);
        switch (
          (Se.set(tt, Rt),
          $ || (R(_, L, new Set(Se.keys()), I), U(_, I)),
          Rt.state)
        ) {
          case 'hasValue':
            return Rt.contents;
          case 'hasError':
            throw Rt.contents;
          case 'loading':
            throw (
              ((ae.loadingDepKey = tt),
              (ae.loadingDepPromise = Rt.contents),
              Rt.contents)
            );
        }
        throw Z('Invalid Loadable state');
      }
      let Wr =
        (tt) =>
        (...Rt) => {
          if (G)
            throw Z(
              'Callbacks from getCallback() should only be called asynchronously after the selector is evalutated.  It can be used for selectors to return objects with callbacks that \
can work with Recoil state without a subscription.',
            );
          return t == null && ls(!1), LC(_, tt, Rt, { node: t });
        };
      try {
        (F = r({ get: Tt, getCallback: Wr })),
          (F = CC(F) ? Tt(F) : F),
          _C(F) && (F.state === 'hasError' && (de = !0), (F = F.contents)),
          ye(F) ? (F = d(_, F, L, Se, I, ae).finally(W)) : W(),
          (F = F instanceof Lg ? F.value : F);
      } catch (tt) {
        (F = tt),
          ye(F) ? (F = E(_, F, L, Se, I, ae).finally(W)) : ((de = !0), W());
      }
      return (
        de ? (se = ha(F)) : ye(F) ? (se = EC(F)) : (se = vd(F)),
        ($ = !1),
        bt(_, I, Se),
        R(_, L, new Set(Se.keys()), I),
        [se, Se]
      );
    }
    function T(_, L) {
      let I = L.atomValues.get(n);
      if (I != null) return I;
      let z = new Set();
      try {
        I = l.get(
          (G) => (typeof G != 'string' && ls(!1), ma(_, L, G).contents),
          {
            onNodeVisit: (G) => {
              G.type === 'branch' && G.nodeKey !== n && z.add(G.nodeKey);
            },
          },
        );
      } catch (G) {
        throw Z(`Problem with cache lookup for selector "${n}": ${G.message}`);
      }
      if (I) {
        var $;
        L.atomValues.set(n, I),
          R(
            _,
            L,
            z,
            ($ = b(_)) === null || $ === void 0 ? void 0 : $.executionID,
          );
      }
      return I;
    }
    function D(_, L) {
      let I = T(_, L);
      if (I != null) return Oe(_), I;
      let z = re(_, L);
      if (z != null) {
        var $;
        return (
          (($ = z.loadingLoadable) === null || $ === void 0
            ? void 0
            : $.state) === 'loading' && c(_, z.executionID),
          z.loadingLoadable
        );
      }
      let G = PC(),
        [W, F] = x(_, L, G);
      return (
        W.state === 'loading'
          ? (fe(_, G, W, F, L), c(_, G))
          : (Oe(_), In(L, W, F)),
        W
      );
    }
    function re(_, L) {
      let I = tg([
        u.has(_) ? [Te(u.get(_))] : [],
        Ma(
          zd(u, ([$]) => $ !== _),
          ([, $]) => $,
        ),
      ]);
      function z($) {
        for (let [G, W] of $) if (!ma(_, L, G).is(W)) return !0;
        return !1;
      }
      for (let $ of I) {
        if (
          $.stateVersions.get(L.version) ||
          !z($.depValuesDiscoveredSoFarDuringAsyncWork)
        )
          return $.stateVersions.set(L.version, !0), $;
        $.stateVersions.set(L.version, !1);
      }
    }
    function b(_) {
      return u.get(_);
    }
    function fe(_, L, I, z, $) {
      u.set(_, {
        depValuesDiscoveredSoFarDuringAsyncWork: z,
        executionID: L,
        loadingLoadable: I,
        stateVersions: new Map([[$.version, !0]]),
      });
    }
    function bt(_, L, I) {
      if (Je(_, L)) {
        let z = b(_);
        z != null && (z.depValuesDiscoveredSoFarDuringAsyncWork = I);
      }
    }
    function Oe(_) {
      u.delete(_);
    }
    function Je(_, L) {
      var I;
      return (
        L === ((I = b(_)) === null || I === void 0 ? void 0 : I.executionID)
      );
    }
    function Ln(_) {
      return Array.from(_.entries()).map(([L, I]) => [L, I.contents]);
    }
    function In(_, L, I) {
      _.atomValues.set(n, L);
      try {
        l.set(Ln(I), L);
      } catch (z) {
        throw Z(`Problem with s\
etting cache for selector "${n}": ${z.message}`);
      }
    }
    function vt(_) {
      if (is.includes(n)) {
        let L = `Recoil selector has circular dependencies: ${is
          .slice(is.indexOf(n))
          .join(' \u2192 ')}`;
        return ha(Z(L));
      }
      is.push(n);
      try {
        return _();
      } finally {
        is.pop();
      }
    }
    function et(_, L) {
      let I = L.atomValues.get(n);
      return (
        I ??
        l.get((z) => {
          var $;
          return (
            typeof z != 'string' && ls(!1),
            ($ = wC(_, L, z)) === null || $ === void 0 ? void 0 : $.contents
          );
        })
      );
    }
    function $t(_, L) {
      return vt(() => D(_, L));
    }
    function X(_) {
      _.atomValues.delete(n);
    }
    function q(_, L) {
      t == null && ls(!1);
      for (let z of s) {
        var I;
        let $ = AC(z);
        (I = $.clearCache) === null || I === void 0 || I.call($, _, L);
      }
      s.clear(), X(L), l.clear(), N0(_, t);
    }
    return i != null
      ? (t = x0({
          key: n,
          nodeType: 'selector',
          peek: et,
          get: $t,
          set: (L, I, z) => {
            let $ = !1,
              G = new Map();
            function W({ key: ae }) {
              if ($)
                throw Z(
                  'Recoil: Async selector sets are not currently supported.',
                );
              let Se = ma(L, I, ae);
              if (Se.state === 'hasValue') return Se.contents;
              if (Se.state === 'loading') {
                let Tt = `Getting value of asynchronous atom or selector "${ae}" in a pending state while setting selector "${n}\
" is not yet supported.`;
                throw (st(Tt), Z(Tt));
              } else throw Se.contents;
            }
            function F(ae, Se) {
              if ($) {
                let tt =
                  'Recoil: Async selector sets are not currently supported.';
                throw (st(tt), Z(tt));
              }
              let Tt = typeof Se == 'function' ? Se(W(ae)) : Se;
              TC(L, I, ae.key, Tt).forEach((tt, Rt) => G.set(Rt, tt));
            }
            function de(ae) {
              F(ae, xC);
            }
            let se = i({ set: F, get: W, reset: de }, z);
            if (se !== void 0)
              throw ye(se)
                ? Z('Recoil: Async selector sets are not currently supported.')
                : Z('Recoil: selector set should be a void function.');
            return ($ = !0), G;
          },
          init: m,
          invalidate: X,
          clearCache: q,
          shouldDeleteConfigOnRelease: S,
          dangerouslyAllowMutability: e.dangerouslyAllowMutability,
          shouldRestoreFromSnapshots: !1,
          retainedBy: a,
        }))
      : (t = x0({
          key: n,
          nodeType: 'selector',
          peek: et,
          get: $t,
          init: m,
          invalidate: X,
          clearCache: q,
          shouldDeleteConfigOnRelease: S,
          dangerouslyAllowMutability: e.dangerouslyAllowMutability,
          shouldRestoreFromSnapshots: !1,
          retainedBy: a,
        }));
  }
  function BC(e) {
    let { key: t, persistence_UNSTABLE: n } = e,
      r = zC(e.retainedBy_UNSTABLE),
      o = 0;
    function i(c) {
      return gd(
        c
          .then((d) => ((s = Po(d)), d))
          .catch((d) => {
            throw ((s = yd(d)), d);
          }),
      );
    }
    let s = ye(e.default)
      ? i(e.default)
      : OC(e.default)
      ? e.default.state === 'loading'
        ? i(e.default.contents)
        : e.default
      : Po(ss(e.default));
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
              : T.contents) === E && A0(c, h, R),
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
              : T.contents) === E && FC(c, h, yd(R)),
            R)
          );
        });
      return E;
    }
    function p(c, d, E) {
      var R;
      o++;
      let x = () => {
        var b;
        o--,
          (b = a.get(c)) === null || b === void 0 || b.forEach((fe) => fe()),
          a.delete(c);
      };
      if ((c.getState().knownAtoms.add(t), s.state === 'loading')) {
        let b = () => {
          var fe;
          ((fe = c.getState().nextTree) !== null && fe !== void 0
            ? fe
            : c.getState().currentTree
          ).atomValues.has(t) || UC(c, h);
        };
        s.contents.finally(b);
      }
      let T = (R = e.effects) !== null && R !== void 0 ? R : e.effects_UNSTABLE;
      if (T != null) {
        let Je = function (X) {
            if (fe && X.key === t) {
              let q = b;
              return q instanceof ir
                ? m(c, d)
                : ye(q)
                ? gd(q.then((_) => (_ instanceof ir ? s.toPromise() : _)))
                : Po(q);
            }
            return $C(c, X);
          },
          Ln = function (X) {
            return Je(X).toPromise();
          },
          In = function (X) {
            var q;
            let _ = DC(
              c,
              (q = c.getState().nextTree) !== null && q !== void 0
                ? q
                : c.getState().currentTree,
              X.key,
            );
            return fe && X.key === t && !(b instanceof ir)
              ? { ..._, isSet: !0, loadable: Je(X) }
              : _;
          },
          b = Pr,
          fe = !0,
          bt = !1,
          Oe = null,
          vt = (X) => (q) => {
            if (fe) {
              let _ = Je(h),
                L = _.state === 'hasValue' ? _.contents : Pr;
              (b = typeof q == 'function' ? q(L) : q),
                ye(b) &&
                  (b = b.then((I) => ((Oe = { effect: X, value: I }), I)));
            } else {
              if (ye(q))
                throw Z('Setting atoms to async values is not implemented.');
              typeof q != 'function' && (Oe = { effect: X, value: ss(q) }),
                A0(
                  c,
                  h,
                  typeof q == 'function'
                    ? (_) => {
                        let L = ss(q(_));
                        return (Oe = { effect: X, value: L }), L;
                      }
                    : ss(q),
                );
            }
          },
          et = (X) => () => vt(X)(Pr),
          $t = (X) => (q) => {
            var _;
            let { release: L } = c.subscribeToTransactions((I) => {
              var z;
              let { currentTree: $, previousTree: G } = I.getState();
              G ||
                (st(
                  'Transaction subscribers notified without a next tree being present -- this is a bug in Recoil',
                ),
                (G = $));
              let W =
                (z = $.atomValues.get(t)) !== null && z !== void 0 ? z : s;
              if (W.state === 'hasValue') {
                var F, de, se, ae;
                let Se = W.contents,
                  Tt =
                    (F = G.atomValues.get(t)) !== null && F !== void 0 ? F : s,
                  Wr = Tt.state === 'hasValue' ? Tt.contents : Pr;
                ((de = Oe) === null || de === void 0 ? void 0 : de.effect) !==
                  X ||
                ((se = Oe) === null || se === void 0 ? void 0 : se.value) !== Se
                  ? q(Se, Wr, !$.atomValues.has(t))
                  : ((ae = Oe) === null || ae === void 0
                      ? void 0
                      : ae.effect) === X && (Oe = null);
              }
            }, t);
            a.set(c, [
              ...((_ = a.get(c)) !== null && _ !== void 0 ? _ : []),
              L,
            ]);
          };
        for (let X of T)
          try {
            let q = X({
              node: h,
              storeID: c.storeID,
              parentStoreID_UNSTABLE: c.parentStoreID,
              trigger: E,
              setSelf: vt(X),
              resetSelf: et(X),
              onSet: $t(X),
              getPromise: Ln,
              getLoadable: Je,
              getInfo_UNSTABLE: In,
            });
            if (q != null) {
              var D;
              a.set(c, [
                ...((D = a.get(c)) !== null && D !== void 0 ? D : []),
                q,
              ]);
            }
          } catch (q) {
            (b = q), (bt = !0);
          }
        if (((fe = !1), !(b instanceof ir))) {
          var re;
          let X = bt ? yd(b) : ye(b) ? gd(f(c, b)) : Po(ss(b));
          X.contents,
            d.atomValues.set(t, X),
            (re = c.getState().nextTree) === null ||
              re === void 0 ||
              re.atomValues.set(t, X);
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
      if (d.atomValues.has(t)) return Te(d.atomValues.get(t));
      if (d.nonvalidatedAtoms.has(t)) {
        if (l != null) return l;
        if (n == null)
          return (
            $d(
              `Tried to restore a persisted value for atom ${t} but it has no persistence settings.`,
            ),
            s
          );
        let E = d.nonvalidatedAtoms.get(t),
          R = n.validator(E, Pr);
        return (l = R instanceof ir ? s : Po(R)), l;
      } else return s;
    }
    function y() {
      l = void 0;
    }
    function w(c, d, E) {
      if (d.atomValues.has(t)) {
        let R = Te(d.atomValues.get(t));
        if (R.state === 'hasValue' && E === R.contents) return new Map();
      } else if (!d.nonvalidatedAtoms.has(t) && E instanceof ir)
        return new Map();
      return (l = void 0), new Map().set(t, Po(E));
    }
    function U() {
      return Og(t) !== void 0 && o <= 0;
    }
    let h = MC({
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
  function qd(e) {
    let { ...t } = e,
      n = 'default' in e ? e.default : new Promise(() => {});
    return bC(n) ? jC({ ...t, default: n }) : BC({ ...t, default: n });
  }
  function jC(e) {
    let t = qd({
        ...e,
        default: Pr,
        persistence_UNSTABLE:
          e.persistence_UNSTABLE === void 0
            ? void 0
            : {
                ...e.persistence_UNSTABLE,
                validator: (r) =>
                  r instanceof ir
                    ? r
                    : Te(e.persistence_UNSTABLE).validator(r, Pr),
              },
        effects: e.effects,
        effects_UNSTABLE: e.effects_UNSTABLE,
      }),
      n = Uo({
        key: `${e.key}__withFallback`,
        get: ({ get: r }) => {
          let o = r(t);
          return o instanceof ir ? e.default : o;
        },
        set: ({ set: r }, o) => r(t, o),
        cachePolicy_UNSTABLE: { eviction: 'most-recent' },
        dangerouslyAllowMutability: e.dangerouslyAllowMutability,
      });
    return VC(n.key, Og(e.key)), n;
  }
  function QC({
    equality: e = ya.equality,
    eviction: t = ya.eviction,
    maxSize: n = ya.maxSize,
  } = ya) {
    let r = YC(e);
    return ZC(t, n, r);
  }
  function YC(e) {
    switch (e) {
      case 'reference':
        return (t) => t;
      case 'value':
        return (t) => Ga(t);
    }
    throw Z(`Unrecognized equality policy ${e}`);
  }
  function ZC(e, t, n) {
    switch (e) {
      case 'keep-all':
        return new KC({ mapKey: n });
      case 'lru':
        return new C0({ mapKey: n, maxSize: Te(t) });
      case 'most-recent':
        return new C0({ mapKey: n, maxSize: 1 });
    }
    throw Z(`Unrecognized evicti\
on policy ${e}`);
  }
  function XC(e) {
    var t, n;
    let r = Mg({
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
        p = Dg({
          ...u,
          key: `${e.key}__${(i = Ga(o)) !== null && i !== void 0 ? i : 'void'}`,
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
        qC(p.key, () => {
          r.delete(o);
        }),
        p
      );
    };
  }
  function nk(e) {
    var t, n;
    let r = Mg({
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
        throw Z(`Problem with cache lookup for sele\
ctor ${e.key}: ${m.message}`);
      }
      if (s != null) return s;
      let l = `${e.key}__selectorFamily/${
          (i = Ga(o, { allowFunctions: !0 })) !== null && i !== void 0
            ? i
            : 'void'
        }/${tk++}`,
        a = (m) => e.get(o)(m),
        u = e.cachePolicy_UNSTABLE,
        f =
          typeof e.retainedBy_UNSTABLE == 'function'
            ? e.retainedBy_UNSTABLE(o)
            : e.retainedBy_UNSTABLE,
        p;
      if (e.set != null) {
        let m = e.set;
        p = Uo({
          key: l,
          get: a,
          set: (y, w) => m(o)(y, w),
          cachePolicy_UNSTABLE: u,
          dangerouslyAllowMutability: e.dangerouslyAllowMutability,
          retainedBy_UNSTABLE: f,
        });
      } else
        p = Uo({
          key: l,
          get: a,
          cachePolicy_UNSTABLE: u,
          dangerouslyAllowMutability: e.dangerouslyAllowMutability,
          retainedBy_UNSTABLE: f,
        });
      return (
        r.set(o, p),
        ek(p.key, () => {
          r.delete(o);
        }),
        p
      );
    };
  }
  function ok(e) {
    return rk(e);
  }
  function lk(e) {
    return sk(e);
  }
  function uk(e) {
    return e;
  }
  function Ka(e, t) {
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
  function fk(e) {
    return e != null && !ye(e);
  }
  function Qa(e) {
    return Array.isArray(e)
      ? e
      : Object.getOwnPropertyNames(e).map((t) => e[t]);
  }
  function Vd(e, t) {
    return Array.isArray(e)
      ? t
      : Object.getOwnPropertyNames(e).reduce(
          (n, r, o) => ({ ...n, [r]: t[o] }),
          {},
        );
  }
  function Oo(e, t, n) {
    let r = n.map((o, i) => (o == null ? $g(t[i]) : ye(o) ? bg(o) : Vg(o)));
    return Vd(e, r);
  }
  function dk(e, t) {
    return t.map((n, r) => (n === void 0 ? e[r] : n));
  }
  var ge,
    k0,
    aT,
    Z,
    ye,
    Te,
    Do,
    Sd,
    _d,
    Sa,
    dT,
    Vr,
    pT,
    hT,
    mT,
    vT,
    yT,
    gT,
    ST,
    hs,
    Ed,
    Fo,
    ue,
    RT,
    st,
    fd,
    dd,
    pd,
    xT,
    P0,
    bd,
    l0,
    zo,
    fs,
    _a,
    Ea,
    Da,
    LT,
    IT,
    PT,
    OT,
    Dr,
    MT,
    $d,
    Ma,
    KD,
    wa,
    bT,
    Mr,
    Ud,
    Ta,
    Ra,
    mt,
    GT,
    QT,
    wd,
    Td,
    YT,
    ZT,
    qT,
    as,
    xa,
    ms,
    rR,
    oR,
    iR,
    sR,
    lR,
    aR,
    Va,
    a0,
    uR,
    D0,
    V0,
    Na,
    ba,
    b0,
    zd,
    $0,
    vs,
    _R,
    u0,
    c0,
    ER,
    wR,
    Rd,
    sr,
    z0,
    B0,
    PR,
    j0,
    OR,
    DR,
    MR,
    H0,
    jd,
    VR,
    bR,
    $R,
    UR,
    FR,
    zR,
    us,
    un,
    JR,
    ex,
    tx,
    Y0,
    Z0,
    nx,
    q0,
    br,
    fx,
    dx,
    px,
    hx,
    mx,
    vx,
    Hd,
    yx,
    gx,
    Sx,
    Ua,
    tg,
    ng,
    Ex,
    wx,
    ys,
    Nx,
    Nd,
    Ax,
    Cx,
    kx,
    Lx,
    Ix,
    f0,
    d0,
    Px,
    Ox,
    p0,
    Dx,
    ga,
    Mx,
    Vx,
    bx,
    $x,
    Ux,
    Vo,
    h0,
    og,
    ds,
    Fa,
    Bx,
    jx,
    Hx,
    Wx,
    za,
    Kx,
    Qx,
    m0,
    Zx,
    ig,
    qx,
    Xx,
    Jx,
    eN,
    tN,
    nN,
    rN,
    sg,
    md,
    lg,
    oN,
    ag,
    iN,
    sN,
    ug,
    Ad,
    lN,
    aN,
    uN,
    cg,
    Cd,
    fg,
    Ba,
    dg,
    y0,
    Nn,
    SN,
    _N,
    EN,
    hg,
    TN,
    RN,
    rs,
    xN,
    NN,
    AN,
    g0,
    Gd,
    gs,
    IN,
    mg,
    PN,
    Bo,
    ON,
    DN,
    MN,
    cn,
    QD,
    kd,
    Ss,
    Aa,
    VN,
    bo,
    ht,
    $o,
    vg,
    cs,
    Kd,
    bN,
    $N,
    FN,
    YN,
    qN,
    JN,
    tA,
    nA,
    rA,
    _g,
    oA,
    Zd,
    iA,
    sA,
    lA,
    Ca,
    Ha,
    Eg,
    S0,
    aA,
    _0,
    Tg,
    pA,
    hA,
    vA,
    yA,
    gA,
    SA,
    _A,
    wA,
    TA,
    RA,
    xA,
    NA,
    AA,
    CA,
    kA,
    LA,
    Id,
    PA,
    OA,
    Rg,
    MA,
    ls,
    VA,
    bA,
    $A,
    UA,
    FA,
    T0,
    zA,
    BA,
    jA,
    ka,
    HA,
    Ng,
    GA,
    KA,
    QA,
    ZA,
    qA,
    XA,
    JA,
    tC,
    Pd,
    nC,
    rC,
    Ag,
    oC,
    La,
    Od,
    iC,
    sC,
    Cg,
    Dd,
    lC,
    aC,
    kg,
    uC,
    cC,
    R0,
    Ga,
    pC,
    pa,
    yC,
    YD,
    ZD,
    SC,
    _C,
    ha,
    EC,
    vd,
    Lg,
    ma,
    wC,
    TC,
    RC,
    xC,
    NC,
    AC,
    x0,
    CC,
    N0,
    kC,
    LC,
    IC,
    Ia,
    os,
    is,
    va,
    PC,
    Uo,
    OC,
    yd,
    gd,
    Po,
    Pg,
    DC,
    Pr,
    ir,
    Og,
    MC,
    VC,
    bC,
    $C,
    UC,
    A0,
    FC,
    zC,
    ss,
    Dg,
    Md,
    HC,
    WC,
    GC,
    C0,
    KC,
    ya,
    Mg,
    qC,
    JC,
    ek,
    tk,
    lr,
    rk,
    ik,
    sk,
    ak,
    ck,
    Vg,
    bg,
    $g,
    pk,
    hk,
    mk,
    vk,
    yk,
    gk,
    Sk,
    _k,
    Ek,
    wk,
    Tk,
    Rk,
    xk,
    Nk,
    Ak,
    Ck,
    kk,
    Lk,
    Ik,
    Pk,
    Ok,
    Dk,
    Mk,
    Vk,
    bk,
    $k,
    Uk,
    Fk,
    zk,
    Bk,
    jk,
    ee,
    Ug,
    qD,
    XD,
    JD,
    Fg,
    eM,
    tM,
    He,
    Ya,
    nM,
    zg,
    rM,
    oM,
    iM,
    sM,
    lM,
    aM,
    uM,
    cM,
    Za,
    fM,
    qa,
    dM,
    Bg,
    pM,
    hM,
    mM,
    vM,
    yM,
    gM,
    jg,
    SM,
    _M,
    EM,
    wM,
    TM,
    RM,
    xM,
    Dt = k(() => {
      (ge = De(mn())), (k0 = De(ud()));
      (aT = lT), (Z = aT);
      ye = uT;
      Te = cT;
      (Do = class {
        getValue() {
          throw Z('BaseLoadable');
        }
        toPromise() {
          throw Z('BaseLoadable');
        }
        valueMaybe() {
          throw Z('BaseLoadable');
        }
        valueOrThrow() {
          throw Z(`Loadable expected value, but in "${this.state}" state`);
        }
        promiseMaybe() {
          throw Z('BaseLoadable');
        }
        promiseOrThrow() {
          throw Z(`Loadable expected promise, but in "${this.state}" state`);
        }
        errorMaybe() {
          throw Z('BaseLoadable');
        }
        errorOrThrow() {
          throw Z(`Loadable expected error, but in "${this.state}" state`);
        }
        is(t) {
          return t.state === this.state && t.contents === this.contents;
        }
        map(t) {
          throw Z('BaseLoadable');
        }
      }),
        (Sd = class extends Do {
          constructor(t) {
            super(),
              Q(this, 'state', 'hasValue'),
              Q(this, 'contents', void 0),
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
              return ye(n) ? Or(n) : Mo(n) ? n : ps(n);
            } catch (n) {
              return ye(n) ? Or(n.next(() => this.map(t))) : Pa(n);
            }
          }
        }),
        (_d = class extends Do {
          constructor(t) {
            super(),
              Q(this, 'state', 'hasError'),
              Q(this, 'contents', void 0),
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
        }),
        (Sa = class extends Do {
          constructor(t) {
            super(),
              Q(this, 'state', 'loading'),
              Q(this, 'contents', void 0),
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
            return Or(
              this.contents
                .then((n) => {
                  let r = t(n);
                  if (Mo(r)) {
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
                  if (ye(n)) return n.then(() => this.map(t).contents);
                  throw n;
                }),
            );
          }
        });
      (dT = {
        of: (e) => (ye(e) ? Or(e) : Mo(e) ? e : ps(e)),
        error: (e) => Pa(e),
        loading: () => L0(),
        all: I0,
        isLoadable: Mo,
      }),
        (Vr = {
          loadableWithValue: ps,
          loadableWithError: Pa,
          loadableWithPromise: Or,
          loadableLoading: L0,
          loadableAll: I0,
          isLoadable: Mo,
          RecoilLoadable: dT,
        }),
        (pT = Vr.loadableWithValue),
        (hT = Vr.loadableWithError),
        (mT = Vr.loadableWithPromise),
        (vT = Vr.loadableLoading),
        (yT = Vr.loadableAll),
        (gT = Vr.isLoadable),
        (ST = Vr.RecoilLoadable),
        (hs = Object.freeze({
          __proto__: null,
          loadableWithValue: pT,
          loadableWithError: hT,
          loadableWithPromise: mT,
          loadableLoading: vT,
          loadableAll: yT,
          isLoadable: gT,
          RecoilLoadable: ST,
        })),
        (Ed = {
          RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: !0,
          RECOIL_GKS_ENABLED: new Set([
            'recoil_hamt_2020',
            'recoil_sync_external_store',
            'recoil_suppress_rerender_in_callback',
            'recoil_memory_managament_2020',
          ]),
        });
      wT();
      Fo = Ed;
      Oa.setPass = (e) => {
        Fo.RECOIL_GKS_ENABLED.add(e);
      };
      Oa.setFail = (e) => {
        Fo.RECOIL_GKS_ENABLED.delete(e);
      };
      Oa.clear = () => {
        Fo.RECOIL_GKS_ENABLED.clear();
      };
      ue = Oa;
      (RT = TT),
        (st = RT),
        (xT =
          (fd = ge.default.createMutableSource) !== null && fd !== void 0
            ? fd
            : ge.default.unstable_createMutableSource),
        (P0 =
          (dd = ge.default.useMutableSource) !== null && dd !== void 0
            ? dd
            : ge.default.unstable_useMutableSource),
        (bd =
          (pd = ge.default.useSyncExternalStore) !== null && pd !== void 0
            ? pd
            : ge.default.unstable_useSyncExternalStore),
        (l0 = !1);
      (zo = {
        createMutableSource: xT,
        useMutableSource: P0,
        useSyncExternalStore: bd,
        currentRendererSupportsUseSyncExternalStore: NT,
        reactMode: AT,
        isFastRefreshEnabled: CT,
      }),
        (fs = class {
          constructor(t) {
            Q(this, 'key', void 0), (this.key = t);
          }
          toJSON() {
            return { key: this.key };
          }
        }),
        (_a = class extends fs {}),
        (Ea = class extends fs {});
      (Da = {
        AbstractRecoilValue: fs,
        RecoilState: _a,
        RecoilValueReadOnly: Ea,
        isRecoilValue: kT,
      }),
        (LT = Da.AbstractRecoilValue),
        (IT = Da.RecoilState),
        (PT = Da.RecoilValueReadOnly),
        (OT = Da.isRecoilValue),
        (Dr = Object.freeze({
          __proto__: null,
          AbstractRecoilValue: LT,
          RecoilState: IT,
          RecoilValueReadOnly: PT,
          isRecoilValue: OT,
        }));
      (MT = DT), ($d = MT);
      (Ma = VT),
        ({ isFastRefreshEnabled: KD } = zo),
        (wa = class {}),
        (bT = new wa()),
        (Mr = new Map()),
        (Ud = new Map());
      Ta = class extends Error {};
      Ra = new Map();
      mt = {
        nodes: Mr,
        recoilValues: Ud,
        registerNode: FT,
        getNode: zT,
        getNodeMaybe: BT,
        deleteNodeConfigIfPossible: jT,
        setConfigDeletionHandler: HT,
        getConfigDeletionHandler: O0,
        recoilValuesForKeys: $T,
        NodeMissingError: Ta,
        DefaultValue: wa,
        DEFAULT_VALUE: bT,
      };
      GT = { enqueueExecution: WT };
      (QT = KT(function (e) {
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
            if (v === 'number') return g;
            v !== 'string' && (g += '');
            for (var N = 0, P = 0, O = g.length; P < O; ++P) {
              var V = g.charCodeAt(P);
              N = ((N << 5) - N + V) | 0;
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
          w = function (v, N, P, O) {
            var V = O;
            if (!v) {
              var H = O.length;
              V = new Array(H);
              for (var B = 0; B < H; ++B) V[B] = O[B];
            }
            return (V[N] = P), V;
          },
          U = function (v, N, P) {
            var O = P.length - 1,
              V = 0,
              H = 0,
              B = P;
            if (v) V = H = N;
            else for (B = new Array(O); V < N; ) B[H++] = P[V++];
            for (++V; V <= O; ) B[H++] = P[V++];
            return v && (B.length = O), B;
          },
          h = function (v, N, P, O) {
            var V = O.length;
            if (v) {
              for (var H = V; H >= N; ) O[H--] = O[H];
              return (O[N] = P), O;
            }
            for (var B = 0, j = 0, J = new Array(V + 1); B < N; )
              J[j++] = O[B++];
            for (J[N] = P; B < V; ) J[++j] = O[B++];
            return J;
          },
          c = 1,
          d = 2,
          E = 3,
          R = 4,
          x = { __hamt_isEmpty: !0 },
          T = function (v) {
            return v === x || (v && v.__hamt_isEmpty);
          },
          D = function (v, N, P, O) {
            return { type: c, edit: v, hash: N, key: P, value: O, _modify: et };
          },
          re = function (v, N, P) {
            return { type: d, edit: v, hash: N, children: P, _modify: $t };
          },
          b = function (v, N, P) {
            return { type: E, edit: v, mask: N, children: P, _modify: X };
          },
          fe = function (v, N, P) {
            return { type: R, edit: v, size: N, children: P, _modify: q };
          },
          bt = function (v) {
            return v === x || v.type === c || v.type === d;
          },
          Oe = function (v, N, P, O, V) {
            for (var H = [], B = O, j = 0, J = 0; B; ++J)
              B & 1 && (H[J] = V[j++]), (B >>>= 1);
            return (H[N] = P), fe(v, j + 1, H);
          },
          Je = function (v, N, P, O) {
            for (
              var V = new Array(N - 1), H = 0, B = 0, j = 0, J = O.length;
              j < J;
              ++j
            )
              if (j !== P) {
                var _e = O[j];
                _e && !T(_e) && ((V[H++] = _e), (B |= 1 << j));
              }
            return b(v, B, V);
          },
          Ln = function g(v, N, P, O, V, H) {
            if (P === V) return re(v, P, [H, O]);
            var B = m(N, P),
              j = m(N, V);
            return b(
              v,
              S(B) | S(j),
              B === j ? [g(v, N + r, P, O, V, H)] : B < j ? [O, H] : [H, O],
            );
          },
          In = function (v, N, P, O, V, H, B, j) {
            for (var J = V.length, _e = 0; _e < J; ++_e) {
              var at = V[_e];
              if (P(B, at.key)) {
                var $e = at.value,
                  xt = H($e);
                return xt === $e
                  ? V
                  : xt === a
                  ? (--j.value, U(v, _e, V))
                  : w(v, _e, D(N, O, B, xt), V);
              }
            }
            var Ut = H();
            return Ut === a ? V : (++j.value, w(v, J, D(N, O, B, Ut), V));
          },
          vt = function (v, N) {
            return v === N.edit;
          },
          et = function (v, N, P, O, V, H, B) {
            if (N(H, this.key)) {
              var j = O(this.value);
              return j === this.value
                ? this
                : j === a
                ? (--B.value, x)
                : vt(v, this)
                ? ((this.value = j), this)
                : D(v, V, H, j);
            }
            var J = O();
            return J === a
              ? this
              : (++B.value, Ln(v, P, this.hash, this, V, D(v, V, H, J)));
          },
          $t = function (v, N, P, O, V, H, B) {
            if (V === this.hash) {
              var j = vt(v, this),
                J = In(j, v, N, this.hash, this.children, O, H, B);
              return J === this.children
                ? this
                : J.length > 1
                ? re(v, this.hash, J)
                : J[0];
            }
            var _e = O();
            return _e === a
              ? this
              : (++B.value, Ln(v, P, this.hash, this, V, D(v, V, H, _e)));
          },
          X = function (v, N, P, O, V, H, B) {
            var j = this.mask,
              J = this.children,
              _e = m(P, V),
              at = S(_e),
              $e = y(j, at),
              xt = j & at,
              Ut = xt ? J[$e] : x,
              Gr = Ut._modify(v, N, P + r, O, V, H, B);
            if (Ut === Gr) return this;
            var Ls = vt(v, this),
              ri = j,
              oi = void 0;
            if (xt && T(Gr)) {
              if (((ri &= ~at), !ri)) return x;
              if (J.length <= 2 && bt(J[$e ^ 1])) return J[$e ^ 1];
              oi = U(Ls, $e, J);
            } else if (!xt && !T(Gr)) {
              if (J.length >= s) return Oe(v, _e, Gr, j, J);
              (ri |= at), (oi = h(Ls, $e, Gr, J));
            } else oi = w(Ls, $e, Gr, J);
            return Ls
              ? ((this.mask = ri), (this.children = oi), this)
              : b(v, ri, oi);
          },
          q = function (v, N, P, O, V, H, B) {
            var j = this.size,
              J = this.children,
              _e = m(P, V),
              at = J[_e],
              $e = (at || x)._modify(v, N, P + r, O, V, H, B);
            if (at === $e) return this;
            var xt = vt(v, this),
              Ut = void 0;
            if (T(at) && !T($e)) ++j, (Ut = w(xt, _e, $e, J));
            else if (!T(at) && T($e)) {
              if ((--j, j <= l)) return Je(v, j, _e, J);
              Ut = w(xt, _e, x, J);
            } else Ut = w(xt, _e, $e, J);
            return xt
              ? ((this.size = j), (this.children = Ut), this)
              : fe(v, j, Ut);
          };
        x._modify = function (g, v, N, P, O, V, H) {
          var B = P();
          return B === a ? x : (++H.value, D(g, O, V, B));
        };
        function _(g, v, N, P, O) {
          (this._editable = g),
            (this._edit = v),
            (this._config = N),
            (this._root = P),
            (this._size = O);
        }
        _.prototype.setTree = function (g, v) {
          return this._editable
            ? ((this._root = g), (this._size = v), this)
            : g === this._root
            ? this
            : new _(this._editable, this._edit, this._config, g, v);
        };
        var L = (n.tryGetHash = function (g, v, N, P) {
          for (var O = P._root, V = 0, H = P._config.keyEq; ; )
            switch (O.type) {
              case c:
                return H(N, O.key) ? O.value : g;
              case d: {
                if (v === O.hash)
                  for (var B = O.children, j = 0, J = B.length; j < J; ++j) {
                    var _e = B[j];
                    if (H(N, _e.key)) return _e.value;
                  }
                return g;
              }
              case E: {
                var at = m(V, v),
                  $e = S(at);
                if (O.mask & $e) {
                  (O = O.children[y(O.mask, $e)]), (V += r);
                  break;
                }
                return g;
              }
              case R: {
                if (((O = O.children[m(V, v)]), O)) {
                  V += r;
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
        var I = (n.tryGet = function (g, v, N) {
          return L(g, N._config.hash(v), v, N);
        });
        _.prototype.tryGet = function (g, v) {
          return I(g, v, this);
        };
        var z = (n.getHash = function (g, v, N) {
          return L(void 0, g, v, N);
        });
        _.prototype.getHash = function (g, v) {
          return z(g, v, this);
        };
        var $ = (n.get = function (g, v) {
          return L(void 0, v._config.hash(g), g, v);
        });
        _.prototype.get = function (g, v) {
          return I(v, g, this);
        };
        var G = (n.has = function (g, v, N) {
          return L(a, g, v, N) !== a;
        });
        _.prototype.hasHash = function (g, v) {
          return G(g, v, this);
        };
        var W = (n.has = function (g, v) {
          return G(v._config.hash(g), g, v);
        });
        _.prototype.has = function (g) {
          return W(g, this);
        };
        var F = function (v, N) {
          return v === N;
        };
        (n.make = function (g) {
          return new _(
            0,
            0,
            { keyEq: (g && g.keyEq) || F, hash: (g && g.hash) || f },
            x,
            0,
          );
        }),
          (n.empty = n.make());
        var de = (n.isEmpty = function (g) {
          return g && !!T(g._root);
        });
        _.prototype.isEmpty = function () {
          return de(this);
        };
        var se = (n.modifyHash = function (g, v, N, P) {
          var O = { value: P._size },
            V = P._root._modify(
              P._editable ? P._edit : NaN,
              P._config.keyEq,
              0,
              g,
              v,
              N,
              O,
            );
          return P.setTree(V, O.value);
        });
        _.prototype.modifyHash = function (g, v, N) {
          return se(N, g, v, this);
        };
        var ae = (n.modify = function (g, v, N) {
          return se(g, N._config.hash(v), v, N);
        });
        _.prototype.modify = function (g, v) {
          return ae(v, g, this);
        };
        var Se = (n.setHash = function (g, v, N, P) {
          return se(u(N), g, v, P);
        });
        _.prototype.setHash = function (g, v, N) {
          return Se(g, v, N, this);
        };
        var Tt = (n.set = function (g, v, N) {
          return Se(N._config.hash(g), g, v, N);
        });
        _.prototype.set = function (g, v) {
          return Tt(g, v, this);
        };
        var Wr = u(a),
          tt = (n.removeHash = function (g, v, N) {
            return se(Wr, g, v, N);
          });
        _.prototype.removeHash = _.prototype.deleteHash = function (g, v) {
          return tt(g, v, this);
        };
        var Rt = (n.remove = function (g, v) {
          return tt(v._config.hash(g), g, v);
        });
        _.prototype.remove = _.prototype.delete = function (g) {
          return Rt(g, this);
        };
        var Tp = (n.beginMutation = function (g) {
          return new _(
            g._editable + 1,
            g._edit + 1,
            g._config,
            g._root,
            g._size,
          );
        });
        _.prototype.beginMutation = function () {
          return Tp(this);
        };
        var Rp = (n.endMutation = function (g) {
          return (g._editable = g._editable && g._editable - 1), g;
        });
        _.prototype.endMutation = function () {
          return Rp(this);
        };
        var E_ = (n.mutate = function (g, v) {
          var N = Tp(v);
          return g(N), Rp(N);
        });
        _.prototype.mutate = function (g) {
          return E_(g, this);
        };
        var Eu = function (v) {
            return v && xp(v[0], v[1], v[2], v[3], v[4]);
          },
          xp = function (v, N, P, O, V) {
            for (; P < v; ) {
              var H = N[P++];
              if (H && !T(H)) return Np(H, O, [v, N, P, O, V]);
            }
            return Eu(V);
          },
          Np = function (v, N, P) {
            switch (v.type) {
              case c:
                return { value: N(v), rest: P };
              case d:
              case R:
              case E:
                var O = v.children;
                return xp(O.length, O, 0, N, P);
              default:
                return Eu(P);
            }
          },
          w_ = { done: !0 };
        function wu(g) {
          this.v = g;
        }
        (wu.prototype.next = function () {
          if (!this.v) return w_;
          var g = this.v;
          return (this.v = Eu(g.rest)), g;
        }),
          (wu.prototype[Symbol.iterator] = function () {
            return this;
          });
        var Tu = function (v, N) {
            return new wu(Np(v._root, N));
          },
          T_ = function (v) {
            return [v.key, v.value];
          },
          R_ = (n.entries = function (g) {
            return Tu(g, T_);
          });
        _.prototype.entries = _.prototype[Symbol.iterator] = function () {
          return R_(this);
        };
        var x_ = function (v) {
            return v.key;
          },
          N_ = (n.keys = function (g) {
            return Tu(g, x_);
          });
        _.prototype.keys = function () {
          return N_(this);
        };
        var A_ = function (v) {
            return v.value;
          },
          C_ =
            (n.values =
            _.prototype.values =
              function (g) {
                return Tu(g, A_);
              });
        _.prototype.values = function () {
          return C_(this);
        };
        var Ap = (n.fold = function (g, v, N) {
          var P = N._root;
          if (P.type === c) return g(v, P.value, P.key);
          for (var O = [P.children], V = void 0; (V = O.pop()); )
            for (var H = 0, B = V.length; H < B; ) {
              var j = V[H++];
              j &&
                j.type &&
                (j.type === c
                  ? (v = g(v, j.value, j.key))
                  : O.push(j.children));
            }
          return v;
        });
        _.prototype.fold = function (g, v) {
          return Ap(g, v, this);
        };
        var k_ = (n.forEach = function (g, v) {
          return Ap(
            function (N, P, O) {
              return g(P, O, v);
            },
            null,
            v,
          );
        });
        _.prototype.forEach = function (g) {
          return k_(g, this);
        };
        var L_ = (n.count = function (g) {
          return g._size;
        });
        (_.prototype.count = function () {
          return L_(this);
        }),
          Object.defineProperty(_.prototype, 'size', {
            get: _.prototype.count,
          }),
          e.exports ? (e.exports = n) : ((void 0).hamt = n);
      })),
        (wd = class {
          constructor(t) {
            Q(this, '_map', void 0), (this._map = new Map(t?.entries()));
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
            return Fd(this);
          }
          toMap() {
            return new Map(this._map);
          }
        }),
        (Td = class e {
          constructor(t) {
            if ((Q(this, '_hamt', QT.empty.beginMutation()), t instanceof e)) {
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
            return Fd(this);
          }
          toMap() {
            return new Map(this._hamt);
          }
        });
      (YT = { persistentMap: Fd }),
        (ZT = YT.persistentMap),
        (qT = Object.freeze({ __proto__: null, persistentMap: ZT }));
      as = XT;
      xa = JT;
      (ms = { cloneGraph: tR, graph: eR, saveDepsToStore: nR }),
        (rR = 0),
        (oR = () => rR++),
        (iR = 0),
        (sR = () => iR++),
        (lR = 0),
        (aR = () => lR++),
        (Va = {
          getNextTreeStateVersion: oR,
          getNextStoreID: sR,
          getNextComponentID: aR,
        }),
        ({ persistentMap: a0 } = qT),
        ({ graph: uR } = ms),
        ({ getNextTreeStateVersion: D0 } = Va);
      (V0 = {
        makeEmptyTreeState: M0,
        makeEmptyStoreState: cR,
        getNextTreeStateVersion: D0,
      }),
        (Na = class {});
      ba = { RetentionZone: Na, retentionZone: fR };
      b0 = {
        setByAddingToSet: dR,
        setByDeletingFromSet: pR,
        mapBySettingInMap: hR,
        mapByUpdatingInMap: mR,
        mapByDeletingFromMap: vR,
        mapByDeletingMultipleFromMap: yR,
      };
      zd = gR;
      ($0 = SR),
        ({ getNode: vs, getNodeMaybe: _R, recoilValuesForKeys: u0 } = mt),
        ({ RetentionZone: c0 } = ba),
        ({ setByAddingToSet: ER } = b0),
        (wR = Object.freeze(new Set())),
        (Rd = class extends Error {});
      (sr = {
        getNodeLoadable: NR,
        peekNodeLoadable: U0,
        setNodeValue: CR,
        initializeNode: RR,
        cleanUpNode: xR,
        setUnvalidatedAtomValue_DEPRECATED: AR,
        peekNodeInfo: kR,
        getDownstreamNodes: F0,
      }),
        (z0 = null);
      (B0 = {
        setInvalidateMemoizedSnapshot: LR,
        invalidateMemoizedSnapshot: IR,
      }),
        ({
          getDownstreamNodes: PR,
          getNodeLoadable: j0,
          setNodeValue: OR,
        } = sr),
        ({ getNextComponentID: DR } = Va),
        ({ getNode: MR, getNodeMaybe: H0 } = mt),
        ({ DefaultValue: jd } = mt),
        ({ reactMode: VR } = zo),
        ({
          AbstractRecoilValue: bR,
          RecoilState: $R,
          RecoilValueReadOnly: UR,
          isRecoilValue: FR,
        } = Dr),
        ({ invalidateMemoizedSnapshot: zR } = B0);
      us = [];
      un = {
        RecoilValueReadOnly: UR,
        AbstractRecoilValue: bR,
        RecoilState: $R,
        getRecoilValueAsLoadable: BR,
        setRecoilValue: Q0,
        setRecoilValueLoadable: KR,
        markRecoilValueModified: QR,
        setUnvalidatedRecoilValue: YR,
        subscribeToRecoilValue: ZR,
        isRecoilValue: FR,
        applyAtomValueWrites: jR,
        batchStart: GR,
        writeLoadableToTreeState: xd,
        invalidateDownstreams: K0,
        copyTreeState: G0,
        refreshRecoilValue: qR,
      };
      (JR = XR),
        ({ cleanUpNode: ex } = sr),
        ({ deleteNodeConfigIfPossible: tx, getNode: Y0 } = mt),
        ({ RetentionZone: Z0 } = ba),
        (nx = 12e4),
        (q0 = new Set());
      (br = {
        SUSPENSE_TIMEOUT_MS: nx,
        updateRetainCount: ax,
        updateRetainCountToZero: eg,
        releaseScheduledRetainablesNow: ux,
        retainedByOptionWithDefault: cx,
      }),
        ({ unstable_batchedUpdates: fx } = k0.default),
        (dx = { unstable_batchedUpdates: fx }),
        ({ unstable_batchedUpdates: px } = dx),
        (hx = { unstable_batchedUpdates: px }),
        ({ batchStart: mx } = un),
        ({ unstable_batchedUpdates: vx } = hx),
        (Hd = vx || ((e) => e())),
        (yx = (e) => {
          Hd = e;
        }),
        (gx = () => Hd),
        (Sx = (e) => {
          Hd(() => {
            let t = () => {};
            try {
              (t = mx()), e();
            } finally {
              t();
            }
          });
        }),
        (Ua = { getBatcher: gx, setBatcher: yx, batchUpdates: Sx });
      (tg = _x),
        (ng = typeof Window > 'u' || typeof window > 'u'),
        (Ex = (e) => !ng && (e === window || e instanceof Window)),
        (wx = typeof navigator < 'u' && navigator.product === 'ReactNative'),
        (ys = { isSSR: ng, isReactNative: wx, isWindow: Ex });
      (Nx = {
        memoizeWithArgsHash: Tx,
        memoizeOneWithArgsHash: Rx,
        memoizeOneWithArgsHashAndInvalidation: xx,
      }),
        ({ batchUpdates: Nd } = Ua),
        ({ initializeNode: Ax, peekNodeInfo: Cx } = sr),
        ({ graph: kx } = ms),
        ({ getNextStoreID: Lx } = Va),
        ({ DEFAULT_VALUE: Ix, recoilValues: f0, recoilValuesForKeys: d0 } = mt),
        ({
          AbstractRecoilValue: Px,
          getRecoilValueAsLoadable: Ox,
          setRecoilValue: p0,
          setUnvalidatedRecoilValue: Dx,
        } = un),
        ({ updateRetainCount: ga } = br),
        ({ setInvalidateMemoizedSnapshot: Mx } = B0),
        ({ getNextTreeStateVersion: Vx, makeEmptyStoreState: bx } = V0),
        ({ isSSR: $x } = ys),
        ({ memoizeOneWithArgsHashAndInvalidation: Ux } = Nx),
        (Vo = class {
          constructor(t, n) {
            Q(this, '_store', void 0),
              Q(this, '_refCount', 1),
              Q(
                this,
                'getLoadable',
                (r) => (this.checkRefCount_INTERNAL(), Ox(this._store, r)),
              ),
              Q(
                this,
                'getPromise',
                (r) => (
                  this.checkRefCount_INTERNAL(), this.getLoadable(r).toPromise()
                ),
              ),
              Q(this, 'getNodes_UNSTABLE', (r) => {
                if ((this.checkRefCount_INTERNAL(), r?.isModified === !0)) {
                  if (r?.isInitialized === !1) return [];
                  let s = this._store.getState().currentTree;
                  return d0(s.dirtyAtoms);
                }
                let o = this._store.getState().knownAtoms,
                  i = this._store.getState().knownSelectors;
                return r?.isInitialized == null
                  ? f0.values()
                  : r.isInitialized === !0
                  ? d0(tg([o, i]))
                  : zd(f0.values(), ({ key: s }) => !o.has(s) && !i.has(s));
              }),
              Q(
                this,
                'getInfo_UNSTABLE',
                ({ key: r }) => (
                  this.checkRefCount_INTERNAL(),
                  Cx(this._store, this._store.getState().currentTree, r)
                ),
              ),
              Q(this, 'map', (r) => {
                this.checkRefCount_INTERNAL();
                let o = new ds(this, Nd);
                return r(o), o;
              }),
              Q(this, 'asyncMap', async (r) => {
                this.checkRefCount_INTERNAL();
                let o = new ds(this, Nd);
                return o.retain(), await r(o), o.autoRelease_INTERNAL(), o;
              }),
              (this._store = {
                storeID: Lx(),
                parentStoreID: n,
                getState: () => t,
                replaceState: (r) => {
                  t.currentTree = r(t.currentTree);
                },
                getGraph: (r) => {
                  let o = t.graphsByVersion;
                  if (o.has(r)) return Te(o.get(r));
                  let i = kx();
                  return o.set(r, i), i;
                },
                subscribeToTransactions: () => ({ release: () => {} }),
                addTransactionMetadata: () => {
                  throw Z('Cannot subscribe to Snapshots');
                },
              });
            for (let r of this._store.getState().knownAtoms)
              Ax(this._store, r, 'get'), ga(this._store, r, 1);
            this.autoRelease_INTERNAL();
          }
          retain() {
            this._refCount <= 0 &&
              st('Attempt to retain() Snapshot that was already released.'),
              this._refCount++;
            let t = !1;
            return () => {
              t || ((t = !0), this._release());
            };
          }
          autoRelease_INTERNAL() {
            $x || window.setTimeout(() => this._release(), 10);
          }
          _release() {
            if ((this._refCount--, this._refCount === 0)) {
              if (
                (this._store
                  .getState()
                  .nodeCleanupFunctions.forEach((t) => t()),
                this._store.getState().nodeCleanupFunctions.clear(),
                !ue('recoil_memory_managament_2020'))
              )
                return;
            } else this._refCount < 0;
          }
          isRetained() {
            return this._refCount > 0;
          }
          checkRefCount_INTERNAL() {
            ue('recoil_memory_managament_2020') && this._refCount <= 0;
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
        });
      [h0, og] = Ux(
        (e, t) => {
          var n;
          let r = e.getState(),
            o =
              t === 'latest'
                ? (n = r.nextTree) !== null && n !== void 0
                  ? n
                  : r.currentTree
                : Te(r.previousTree);
          return new Vo(rg(e, o), e.storeID);
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
      Mx(og);
      (ds = class extends Vo {
        constructor(t, n) {
          super(
            rg(
              t.getStore_INTERNAL(),
              t.getStore_INTERNAL().getState().currentTree,
              !0,
            ),
            t.getStoreID(),
          ),
            Q(this, '_batch', void 0),
            Q(this, 'set', (r, o) => {
              this.checkRefCount_INTERNAL();
              let i = this.getStore_INTERNAL();
              this._batch(() => {
                ga(i, r.key, 1), p0(this.getStore_INTERNAL(), r, o);
              });
            }),
            Q(this, 'reset', (r) => {
              this.checkRefCount_INTERNAL();
              let o = this.getStore_INTERNAL();
              this._batch(() => {
                ga(o, r.key, 1), p0(this.getStore_INTERNAL(), r, Ix);
              });
            }),
            Q(this, 'setUnvalidatedAtomValues_DEPRECATED', (r) => {
              this.checkRefCount_INTERNAL();
              let o = this.getStore_INTERNAL();
              Nd(() => {
                for (let [i, s] of r.entries())
                  ga(o, i, 1), Dx(o, new Px(i), s);
              });
            }),
            (this._batch = n);
        }
      }),
        (Fa = {
          Snapshot: Vo,
          MutableSnapshot: ds,
          freshSnapshot: Fx,
          cloneSnapshot: zx,
        }),
        (Bx = Fa.Snapshot),
        (jx = Fa.MutableSnapshot),
        (Hx = Fa.freshSnapshot),
        (Wx = Fa.cloneSnapshot),
        (za = Object.freeze({
          __proto__: null,
          Snapshot: Bx,
          MutableSnapshot: jx,
          freshSnapshot: Hx,
          cloneSnapshot: Wx,
        }));
      (Kx = Gx), ({ useRef: Qx } = ge.default);
      (m0 = Yx),
        ({ getNextTreeStateVersion: Zx, makeEmptyStoreState: ig } = V0),
        ({
          cleanUpNode: qx,
          getDownstreamNodes: Xx,
          initializeNode: Jx,
          setNodeValue: eN,
          setUnvalidatedAtomValue_DEPRECATED: tN,
        } = sr),
        ({ graph: nN } = ms),
        ({ cloneGraph: rN } = ms),
        ({ getNextStoreID: sg } = Va),
        ({ createMutableSource: md, reactMode: lg } = zo),
        ({ applyAtomValueWrites: oN } = un),
        ({ releaseScheduledRetainablesNow: ag } = br),
        ({ freshSnapshot: iN } = za),
        ({
          useCallback: sN,
          useContext: ug,
          useEffect: Ad,
          useMemo: lN,
          useRef: aN,
          useState: uN,
        } = ge.default);
      (cg = Object.freeze({
        storeID: sg(),
        getState: ns,
        replaceState: ns,
        getGraph: ns,
        subscribeToTransactions: ns,
        addTransactionMetadata: ns,
      })),
        (Cd = !1);
      (fg = ge.default.createContext({ current: cg })),
        (Ba = () => ug(fg)),
        (dg = ge.default.createContext(null));
      y0 = 0;
      Nn = {
        RecoilRoot: vN,
        useStoreRef: Ba,
        useRecoilMutableSource: cN,
        useRecoilStoreID: yN,
        notifyComponents_FOR_TESTING: Wd,
        sendEndOfBatchNotifications_FOR_TESTING: pg,
      };
      (SN = gN), ({ useEffect: _N, useRef: EN } = ge.default);
      (hg = wN),
        ({ useStoreRef: TN } = Nn),
        ({ SUSPENSE_TIMEOUT_MS: RN } = br),
        ({ updateRetainCount: rs } = br),
        ({ RetentionZone: xN } = ba),
        ({ useEffect: NN, useRef: AN } = ge.default),
        ({ isSSR: g0 } = ys);
      Gd = CN;
      (gs = LN),
        ({ batchUpdates: IN } = Ua),
        ({ DEFAULT_VALUE: mg } = mt),
        ({
          currentRendererSupportsUseSyncExternalStore: PN,
          reactMode: Bo,
          useMutableSource: ON,
          useSyncExternalStore: DN,
        } = zo),
        ({ useRecoilMutableSource: MN, useStoreRef: cn } = Nn),
        ({ isRecoilValue: QD } = Dr),
        ({
          AbstractRecoilValue: kd,
          getRecoilValueAsLoadable: Ss,
          setRecoilValue: Aa,
          setUnvalidatedRecoilValue: VN,
          subscribeToRecoilValue: bo,
        } = un),
        ({
          useCallback: ht,
          useEffect: $o,
          useMemo: vg,
          useRef: cs,
          useState: Kd,
        } = ge.default),
        ({ setByAddingToSet: bN } = b0),
        ({ isSSR: $N } = ys);
      FN = { current: 0 };
      YN = {
        recoilComponentGetRecoilValueCount_FOR_TESTING: FN,
        useRecoilInterface: UN,
        useRecoilState: WN,
        useRecoilStateLoadable: GN,
        useRecoilValue: yg,
        useRecoilValueLoadable: Yd,
        useResetRecoilState: HN,
        useSetRecoilState: ja,
        useSetUnvalidatedAtomValues: KN,
        useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE: gg,
        useRecoilValue_TRANSITION_SUPPORT_UNSTABLE: Sg,
        useRecoilState_TRANSITION_SUPPORT_UNSTABLE: QN,
      };
      qN = ZN;
      JN = XN;
      (tA = eA),
        ({ batchUpdates: nA } = Ua),
        ({ DEFAULT_VALUE: rA, getNode: _g, nodes: oA } = mt),
        ({ useStoreRef: Zd } = Nn),
        ({ AbstractRecoilValue: iA, setRecoilValueLoadable: sA } = un),
        ({ SUSPENSE_TIMEOUT_MS: lA } = br),
        ({ cloneSnapshot: Ca } = za),
        ({
          useCallback: Ha,
          useEffect: Eg,
          useRef: S0,
          useState: aA,
        } = ge.default),
        ({ isSSR: _0 } = ys);
      (Tg = {
        useRecoilSnapshot: fA,
        gotoSnapshot: wg,
        useGotoRecoilSnapshot: dA,
        useRecoilTransactionObserver: cA,
        useTransactionObservation_DEPRECATED: uA,
        useTransactionSubscription_DEPRECATED: Wa,
      }),
        ({ peekNodeInfo: pA } = sr),
        ({ useStoreRef: hA } = Nn);
      (vA = mA),
        ({ reactMode: yA } = zo),
        ({ RecoilRoot: gA, useStoreRef: SA } = Nn),
        ({ useMemo: _A } = ge.default);
      (wA = EA),
        ({ loadableWithValue: TA } = hs),
        ({ initializeNode: RA } = sr),
        ({ DEFAULT_VALUE: xA, getNode: NA } = mt),
        ({
          copyTreeState: AA,
          getRecoilValueAsLoadable: CA,
          invalidateDownstreams: kA,
          writeLoadableToTreeState: LA,
        } = un);
      Id = class {
        constructor(t, n) {
          Q(this, '_store', void 0),
            Q(this, '_treeState', void 0),
            Q(this, '_changes', void 0),
            Q(this, 'get', (r) => {
              if (this._changes.has(r.key)) return this._changes.get(r.key);
              if (!w0(r))
                throw Z(
                  'Reading selectors within atomicUpdate is not supported',
                );
              let o = CA(this._store, r, this._treeState);
              if (o.state === 'hasValue') return o.contents;
              throw o.state === 'hasError'
                ? o.contents
                : Z(
                    `Expected Recoil atom ${r.key} to have a value, but it is in a loading state.`,
                  );
            }),
            Q(this, 'set', (r, o) => {
              if (!w0(r))
                throw Z(
                  'Setting selectors within atomicUpdate is not supp\
orted',
                );
              if (typeof o == 'function') {
                let i = this.get(r);
                this._changes.set(r.key, o(i));
              } else RA(this._store, r.key, 'set'), this._changes.set(r.key, o);
            }),
            Q(this, 'reset', (r) => {
              this.set(r, xA);
            }),
            (this._store = t),
            (this._treeState = n),
            (this._changes = new Map());
        }
        newTreeState_INTERNAL() {
          if (this._changes.size === 0) return this._treeState;
          let t = AA(this._treeState);
          for (let [n, r] of this._changes) LA(t, n, TA(r));
          return kA(this._store, t), t;
        }
      };
      (PA = { atomicUpdater: IA }),
        (OA = PA.atomicUpdater),
        (Rg = Object.freeze({ __proto__: null, atomicUpdater: OA }));
      (MA = DA),
        (ls = MA),
        ({ atomicUpdater: VA } = Rg),
        ({ batchUpdates: bA } = Ua),
        ({ DEFAULT_VALUE: $A } = mt),
        ({ useStoreRef: UA } = Nn),
        ({ refreshRecoilValue: FA, setRecoilValue: T0 } = un),
        ({ cloneSnapshot: zA } = za),
        ({ gotoSnapshot: BA } = Tg),
        ({ useCallback: jA } = ge.default),
        (ka = class {}),
        (HA = new ka());
      (Ng = { recoilCallback: xg, useRecoilCallback: WA }),
        ({ useStoreRef: GA } = Nn),
        ({ refreshRecoilValue: KA } = un),
        ({ useCallback: QA } = ge.default);
      (ZA = YA),
        ({ atomicUpdater: qA } = Rg),
        ({ useStoreRef: XA } = Nn),
        ({ useMemo: JA } = ge.default);
      (tC = eC),
        (Pd = class {
          constructor(t) {
            Q(this, 'value', void 0), (this.value = t);
          }
        }),
        (nC = { WrappedValue: Pd }),
        (rC = nC.WrappedValue),
        (Ag = Object.freeze({ __proto__: null, WrappedValue: rC })),
        ({ isFastRefreshEnabled: oC } = zo),
        (La = class extends Error {}),
        (Od = class {
          constructor(t) {
            var n, r, o;
            Q(this, '_name', void 0),
              Q(this, '_numLeafs', void 0),
              Q(this, '_root', void 0),
              Q(this, '_onHit', void 0),
              Q(this, '_onSet', void 0),
              Q(this, '_mapNodeValue', void 0),
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
              if ((n?.onNodeVisit(r), r.type === 'leaf'))
                return this._onHit(r), r;
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
                  (this._root =
                    (S = this._root) !== null && S !== void 0 ? S : u);
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
                (this._root =
                  (l = this._root) !== null && l !== void 0 ? l : w),
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
              if (i instanceof La) this.clear(), o();
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
            let t = oC()
              ? 'Possible Fast Refresh module reload detected.  This may also be caused by an selector returning inconsistent values. Resetting cache.'
              : 'Invalid cache values.  This happens when selectors do not return consistent values for the same input dependency va\
lues.  That may also be caused when using Fast Refresh to change a selector implementation.  Resetting cache.';
            throw (
              (st(t + (this._name != null ? ` - ${this._name}` : '')), new La())
            );
          }
        }),
        (iC = { TreeCache: Od }),
        (sC = iC.TreeCache),
        (Cg = Object.freeze({ __proto__: null, TreeCache: sC })),
        (Dd = class {
          constructor(t) {
            var n;
            Q(this, '_maxSize', void 0),
              Q(this, '_size', void 0),
              Q(this, '_head', void 0),
              Q(this, '_tail', void 0),
              Q(this, '_map', void 0),
              Q(this, '_keyMapper', void 0),
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
            let r = Te(this._map.get(n)),
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
        }),
        (lC = { LRUCache: Dd }),
        (aC = lC.LRUCache),
        (kg = Object.freeze({ __proto__: null, LRUCache: aC })),
        ({ LRUCache: uC } = kg),
        ({ TreeCache: cC } = Cg);
      R0 = fC;
      (Ga = dC),
        ({ TreeCache: pC } = Cg),
        (pa = { equality: 'reference', eviction: 'keep-all', maxSize: 1 / 0 });
      (yC = hC), ({ isReactNative: YD, isWindow: ZD } = ys);
      (SC = { startPerfBlock: gC }),
        ({
          isLoadable: _C,
          loadableWithError: ha,
          loadableWithPromise: EC,
          loadableWithValue: vd,
        } = hs),
        ({ WrappedValue: Lg } = Ag),
        ({ getNodeLoadable: ma, peekNodeLoadable: wC, setNodeValue: TC } = sr),
        ({ saveDepsToStore: RC } = ms),
        ({
          DEFAULT_VALUE: xC,
          getConfigDeletionHandler: NC,
          getNode: AC,
          registerNode: x0,
        } = mt),
        ({ isRecoilValue: CC } = Dr),
        ({ markRecoilValueModified: N0 } = un),
        ({ retainedByOptionWithDefault: kC } = br),
        ({ recoilCallback: LC } = Ng),
        ({ startPerfBlock: IC } = SC),
        (Ia = class {}),
        (os = new Ia()),
        (is = []),
        (va = new Map()),
        (PC = (() => {
          let e = 0;
          return () => e++;
        })());
      Ig.value = (e) => new Lg(e);
      (Uo = Ig),
        ({
          isLoadable: OC,
          loadableWithError: yd,
          loadableWithPromise: gd,
          loadableWithValue: Po,
        } = hs),
        ({ WrappedValue: Pg } = Ag),
        ({ peekNodeInfo: DC } = sr),
        ({
          DEFAULT_VALUE: Pr,
          DefaultValue: ir,
          getConfigDeletionHandler: Og,
          registerNode: MC,
          setConfigDeletionHandler: VC,
        } = mt),
        ({ isRecoilValue: bC } = Dr),
        ({
          getRecoilValueAsLoadable: $C,
          markRecoilValueModified: UC,
          setRecoilValue: A0,
          setRecoilValueLoadable: FC,
        } = un),
        ({ retainedByOptionWithDefault: zC } = br),
        (ss = (e) => (e instanceof Pg ? e.value : e));
      qd.value = (e) => new Pg(e);
      (Dg = qd),
        (Md = class {
          constructor(t) {
            var n;
            Q(this, '_map', void 0),
              Q(this, '_keyMapper', void 0),
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
        }),
        (HC = { MapCache: Md }),
        (WC = HC.MapCache),
        (GC = Object.freeze({ __proto__: null, MapCache: WC })),
        ({ LRUCache: C0 } = kg),
        ({ MapCache: KC } = GC),
        (ya = { equality: 'reference', eviction: 'none', maxSize: 1 / 0 });
      (Mg = QC), ({ setConfigDeletionHandler: qC } = mt);
      (JC = XC), ({ setConfigDeletionHandler: ek } = mt), (tk = 0);
      (lr = nk),
        (rk = lr({
          key: '__constant',
          get: (e) => () => e,
          cachePolicyForParams_UNSTABLE: { equality: 'reference' },
        }));
      (ik = ok),
        (sk = lr({
          key: '__error',
          get: (e) => () => {
            throw Z(e);
          },
          cachePolicyForParams_UNSTABLE: {
            equality:
              '\
reference',
          },
        }));
      ak = lk;
      (ck = uk),
        ({
          loadableWithError: Vg,
          loadableWithPromise: bg,
          loadableWithValue: $g,
        } = hs);
      (pk = lr({
        key: '__waitForNone',
        get:
          (e) =>
          ({ get: t }) => {
            let n = Qa(e),
              [r, o] = Ka(t, n);
            return Oo(e, r, o);
          },
        dangerouslyAllowMutability: !0,
      })),
        (hk = lr({
          key: '__waitForAny',
          get:
            (e) =>
            ({ get: t }) => {
              let n = Qa(e),
                [r, o] = Ka(t, n);
              return o.some((i) => !ye(i))
                ? Oo(e, r, o)
                : new Promise((i) => {
                    for (let [s, l] of o.entries())
                      ye(l) &&
                        l
                          .then((a) => {
                            (r[s] = a), (o[s] = void 0), i(Oo(e, r, o));
                          })
                          .catch((a) => {
                            (o[s] = a), i(Oo(e, r, o));
                          });
                  });
            },
          dangerouslyAllowMutability: !0,
        })),
        (mk = lr({
          key: '__\
waitForAll',
          get:
            (e) =>
            ({ get: t }) => {
              let n = Qa(e),
                [r, o] = Ka(t, n);
              if (o.every((s) => s == null)) return Vd(e, r);
              let i = o.find(fk);
              if (i != null) throw i;
              return Promise.all(o).then((s) => Vd(e, dk(r, s)));
            },
          dangerouslyAllowMutability: !0,
        })),
        (vk = lr({
          key: '__waitForAllSettled',
          get:
            (e) =>
            ({ get: t }) => {
              let n = Qa(e),
                [r, o] = Ka(t, n);
              return o.every((i) => !ye(i))
                ? Oo(e, r, o)
                : Promise.all(
                    o.map((i, s) =>
                      ye(i)
                        ? i
                            .then((l) => {
                              (r[s] = l), (o[s] = void 0);
                            })
                            .catch((l) => {
                              (r[s] = void 0), (o[s] = l);
                            })
                        : null,
                    ),
                  ).then(() => Oo(e, r, o));
            },
          dangerouslyAllowMutability: !0,
        })),
        (yk = lr({
          key: '__noWait',
          get:
            (e) =>
            ({ get: t }) => {
              try {
                return Uo.value($g(t(e)));
              } catch (n) {
                return Uo.value(ye(n) ? bg(n) : Vg(n));
              }
            },
          dangerouslyAllowMutability: !0,
        })),
        (gk = {
          waitForNone: pk,
          waitForAny: hk,
          waitForAll: mk,
          waitForAllSettled: vk,
          noWait: yk,
        }),
        ({ RecoilLoadable: Sk } = hs),
        ({ DefaultValue: _k } = mt),
        ({ RecoilRoot: Ek, useRecoilStoreID: wk } = Nn),
        ({ isRecoilValue: Tk } = Dr),
        ({ retentionZone: Rk } = ba),
        ({ freshSnapshot: xk } = za),
        ({
          useRecoilState: Nk,
          useRecoilState_TRANSITION_SUPPORT_UNSTABLE: Ak,
          useRecoilStateLoadable: Ck,
          useRecoilValue: kk,
          useRecoilValue_TRANSITION_SUPPORT_UNSTABLE: Lk,
          useRecoilValueLoadable: Ik,
          useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE: Pk,
          useResetRecoilState: Ok,
          useSetRecoilState: Dk,
        } = YN),
        ({
          useGotoRecoilSnapshot: Mk,
          useRecoilSnapshot: Vk,
          useRecoilTransactionObserver: bk,
        } = Tg),
        ({ useRecoilCallback: $k } = Ng),
        ({
          noWait: Uk,
          waitForAll: Fk,
          waitForAllSettled: zk,
          waitForAny: Bk,
          waitForNone: jk,
        } = gk),
        (ee = {
          DefaultValue: _k,
          isRecoilValue: Tk,
          RecoilLoadable: Sk,
          RecoilEnv: Fo,
          RecoilRoot: Ek,
          useRecoilStoreID: wk,
          useRecoilBridgeAcrossReactRoots_UNSTABLE: wA,
          atom: Dg,
          selector: Uo,
          atomFamily: JC,
          selectorFamily: lr,
          constSelector: ik,
          errorSelector: ak,
          readOnlySelector: ck,
          noWait: Uk,
          waitForNone: jk,
          waitForAny: Bk,
          waitForAll: Fk,
          waitForAllSettled: zk,
          useRecoilValue: kk,
          useRecoilValueLoadable: Ik,
          useRecoilState: Nk,
          useRecoilStateLoadable: Ck,
          useSetRecoilState: Dk,
          useResetRecoilState: Ok,
          useGetRecoilValueInfo_UNSTABLE: vA,
          useRecoilRefresher_UNSTABLE: ZA,
          useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE: Pk,
          useRecoilValue_TRANSITION_SUPPORT_UNSTABLE: Lk,
          useRecoilState_TRANSITION_SUPPORT_UNSTABLE: Ak,
          useRecoilCallback: $k,
          useRecoilTransaction_UNSTABLE: tC,
          useGotoRecoilSnapshot: Mk,
          useRecoilSnapshot: Vk,
          useRecoilTransactionObserver_UNSTABLE: bk,
          snapshot_UNSTABLE: xk,
          useRetain: Gd,
          retentionZone: Rk,
        }),
        (Ug = ee.DefaultValue),
        (qD = ee.isRecoilValue),
        (XD = ee.RecoilLoadable),
        (JD = ee.RecoilEnv),
        (Fg = ee.RecoilRoot),
        (eM = ee.useRecoilStoreID),
        (tM = ee.useRecoilBridgeAcrossReactRoots_UNSTABLE),
        (He = ee.atom),
        (Ya = ee.selector),
        (nM = ee.atomFamily),
        (zg = ee.selectorFamily),
        (rM = ee.constSelector),
        (oM = ee.errorSelector),
        (iM = ee.readOnlySelector),
        (sM = ee.noWait),
        (lM = ee.waitForNone),
        (aM = ee.waitForAny),
        (uM = ee.waitForAll),
        (cM = ee.waitForAllSettled),
        (Za = ee.useRecoilValue),
        (fM = ee.useRecoilValueLoadable),
        (qa = ee.useRecoilState),
        (dM = ee.useRecoilStateLoadable),
        (Bg = ee.useSetRecoilState),
        (pM = ee.useResetRecoilState),
        (hM = ee.useGetRecoilValueInfo_UNSTABLE),
        (mM = ee.useRecoilRefresher_UNSTABLE),
        (vM = ee.useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE),
        (yM = ee.useRecoilValue_TRANSITION_SUPPORT_UNSTABLE),
        (gM = ee.useRecoilState_TRANSITION_SUPPORT_UNSTABLE),
        (jg = ee.useRecoilCallback),
        (SM = ee.useRecoilTransaction_UNSTABLE),
        (_M = ee.useGotoRecoilSnapshot),
        (EM = ee.useRecoilSnapshot),
        (wM = ee.useRecoilTransactionObserver_UNSTABLE),
        (TM = ee.snapshot_UNSTABLE),
        (RM = ee.useRetain),
        (xM = ee.retentionZone);
    });
  function _s(e, t, n) {
    if (n || arguments.length === 2)
      for (var r = 0, o = t.length, i; r < o; r++)
        (i || !(r in t)) &&
          (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]));
    return e.concat(i || Array.prototype.slice.call(t));
  }
  var Xe,
    Hg = k(() => {
      Xe = function () {
        return (
          (Xe =
            Object.assign ||
            function (t) {
              for (var n, r = 1, o = arguments.length; r < o; r++) {
                n = arguments[r];
                for (var i in n)
                  Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
              }
              return t;
            }),
          Xe.apply(this, arguments)
        );
      };
    });
  var Wg = k(() => {});
  var Gg = k(() => {
    Wg();
  });
  var Qg = Xt((PM, Kg) => {
    Kg.exports = function (t, n, r, o) {
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
  var ce,
    $r,
    ie,
    Xa,
    ar,
    jo,
    Yg,
    Ja,
    Zg,
    Ho = k(() => {
      (ce = '-ms-'),
        ($r = '-moz-'),
        (ie = '-webkit-'),
        (Xa = 'comm'),
        (ar = 'rule'),
        (jo = 'decl'),
        (Yg = '@import'),
        (Ja = '@keyframes'),
        (Zg = '@layer');
    });
  function Xg(e, t) {
    return Ce(e, 0) ^ 45
      ? (((((((t << 2) ^ Ce(e, 0)) << 2) ^ Ce(e, 1)) << 2) ^ Ce(e, 2)) << 2) ^
          Ce(e, 3)
      : 0;
  }
  function eu(e) {
    return e.trim();
  }
  function qt(e, t) {
    return (e = t.exec(e)) ? e[0] : e;
  }
  function K(e, t, n) {
    return e.replace(t, n);
  }
  function Wo(e, t) {
    return e.indexOf(t);
  }
  function Ce(e, t) {
    return e.charCodeAt(t) | 0;
  }
  function fn(e, t, n) {
    return e.slice(t, n);
  }
  function lt(e) {
    return e.length;
  }
  function tu(e) {
    return e.length;
  }
  function Ur(e, t) {
    return t.push(e), e;
  }
  function Jg(e, t) {
    return e.map(t).join('');
  }
  function Xd(e, t) {
    return e.filter(function (n) {
      return !qt(n, t);
    });
  }
  var qg,
    Es,
    ws,
    Fr = k(() => {
      (qg = Math.abs), (Es = String.fromCharCode), (ws = Object.assign);
    });
  function Ts(e, t, n, r, o, i, s, l) {
    return {
      value: e,
      root: t,
      parent: n,
      type: r,
      props: o,
      children: i,
      line: nu,
      column: Go,
      length: s,
      return: '',
      siblings: l,
    };
  }
  function An(e, t) {
    return ws(
      Ts('', null, null, '', null, null, 0, e.siblings),
      e,
      { length: -e.length },
      t,
    );
  }
  function zr(e) {
    for (; e.root; ) e = An(e.root, { children: [e] });
    Ur(e, e.siblings);
  }
  function tS() {
    return Pe;
  }
  function nS() {
    return (
      (Pe = Mt > 0 ? Ce(Ko, --Mt) : 0), Go--, Pe === 10 && ((Go = 1), nu--), Pe
    );
  }
  function Vt() {
    return (
      (Pe = Mt < eS ? Ce(Ko, Mt++) : 0), Go++, Pe === 10 && ((Go = 1), nu++), Pe
    );
  }
  function ur() {
    return Ce(Ko, Mt);
  }
  function Rs() {
    return Mt;
  }
  function ru(e, t) {
    return fn(Ko, e, t);
  }
  function Jd(e) {
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
  function rS(e) {
    return (nu = Go = 1), (eS = lt((Ko = e))), (Mt = 0), [];
  }
  function oS(e) {
    return (Ko = ''), e;
  }
  function ou(e) {
    return eu(ru(Mt - 1, ep(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
  }
  function iS(e) {
    for (; (Pe = ur()) && Pe < 33; ) Vt();
    return Jd(e) > 2 || Jd(Pe) > 3 ? '' : ' ';
  }
  function sS(e, t) {
    for (
      ;
      --t &&
      Vt() &&
      !(Pe < 48 || Pe > 102 || (Pe > 57 && Pe < 65) || (Pe > 70 && Pe < 97));

    );
    return ru(e, Rs() + (t < 6 && ur() == 32 && Vt() == 32));
  }
  function ep(e) {
    for (; Vt(); )
      switch (Pe) {
        case e:
          return Mt;
        case 34:
        case 39:
          e !== 34 && e !== 39 && ep(Pe);
          break;
        case 40:
          e === 41 && ep(e);
          break;
        case 92:
          Vt();
          break;
      }
    return Mt;
  }
  function lS(e, t) {
    for (; Vt() && e + Pe !== 47 + 10; )
      if (e + Pe === 42 + 42 && ur() === 47) break;
    return '/*' + ru(t, Mt - 1) + '*' + Es(e === 47 ? e : Vt());
  }
  function aS(e) {
    for (; !Jd(ur()); ) Vt();
    return ru(e, Mt);
  }
  var nu,
    Go,
    eS,
    Mt,
    Pe,
    Ko,
    iu = k(() => {
      Fr();
      (nu = 1), (Go = 1), (eS = 0), (Mt = 0), (Pe = 0), (Ko = '');
    });
  function fS(e) {
    return oS(su('', null, null, null, [''], (e = rS(e)), 0, [0], e));
  }
  function su(e, t, n, r, o, i, s, l, a) {
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
      switch (((y = c), (c = Vt()))) {
        case 40:
          if (y != 108 && Ce(T, p - 1) == 58) {
            Wo((T += K(ou(c), '&', '&\f')), '&\f') != -1 && (h = -1);
            break;
          }
        case 34:
        case 39:
        case 91:
          T += ou(c);
          break;
        case 9:
        case 10:
        case 13:
        case 32:
          T += iS(y);
          break;
        case 92:
          T += sS(Rs() - 1, 7);
          continue;
        case 47:
          switch (ur()) {
            case 42:
            case 47:
              Ur(Hk(lS(Vt(), Rs()), t, n, a), a);
              break;
            default:
              T += '/';
          }
          break;
        case 123 * w:
          l[u++] = lt(T) * h;
        case 125 * w:
        case 59:
        case 0:
          switch (c) {
            case 0:
            case 125:
              U = 0;
            case 59 + f:
              h == -1 && (T = K(T, /\f/g, '')),
                S > 0 &&
                  lt(T) - p &&
                  Ur(
                    S > 32
                      ? cS(T + ';', r, n, p - 1, a)
                      : cS(K(T, ' ', '') + ';', r, n, p - 2, a),
                    a,
                  );
              break;
            case 59:
              T += ';';
            default:
              if (
                (Ur(
                  (x = uS(T, t, n, u, f, o, l, d, (E = []), (R = []), p, i)),
                  i,
                ),
                c === 123)
              )
                if (f === 0) su(T, t, x, x, E, i, p, l, R);
                else
                  switch (m === 99 && Ce(T, 3) === 110 ? 100 : m) {
                    case 100:
                    case 108:
                    case 109:
                    case 115:
                      su(
                        e,
                        x,
                        x,
                        r &&
                          Ur(uS(e, x, x, 0, 0, o, l, d, o, (E = []), p, R), R),
                        o,
                        R,
                        p,
                        l,
                        r ? E : R,
                      );
                      break;
                    default:
                      su(T, x, x, x, [''], R, 0, l, R);
                  }
          }
          (u = f = S = 0), (w = h = 1), (d = T = ''), (p = s);
          break;
        case 58:
          (p = 1 + lt(T)), (S = y);
        default:
          if (w < 1) {
            if (c == 123) --w;
            else if (c == 125 && w++ == 0 && nS() == 125) continue;
          }
          switch (((T += Es(c)), c * w)) {
            case 38:
              h = f > 0 ? 1 : ((T += '\f'), -1);
              break;
            case 44:
              (l[u++] = (lt(T) - 1) * h), (h = 1);
              break;
            case 64:
              ur() === 45 && (T += ou(Vt())),
                (m = ur()),
                (f = p = lt((d = T += aS(Rs())))),
                c++;
              break;
            case 45:
              y === 45 && lt(T) == 2 && (w = 0);
          }
      }
    return i;
  }
  function uS(e, t, n, r, o, i, s, l, a, u, f, p) {
    for (
      var m = o - 1, S = o === 0 ? i : [''], y = tu(S), w = 0, U = 0, h = 0;
      w < r;
      ++w
    )
      for (var c = 0, d = fn(e, m + 1, (m = qg((U = s[w])))), E = e; c < y; ++c)
        (E = eu(U > 0 ? S[c] + ' ' + d : K(d, /&\f/g, S[c]))) && (a[h++] = E);
    return Ts(e, t, n, o === 0 ? ar : l, a, u, f, p);
  }
  function Hk(e, t, n, r) {
    return Ts(e, t, n, Xa, Es(tS()), fn(e, 2, -2), 0, r);
  }
  function cS(e, t, n, r, o) {
    return Ts(e, t, n, jo, fn(e, 0, r), fn(e, r + 1, -1), r, o);
  }
  var dS = k(() => {
    Ho();
    Fr();
    iu();
  });
  function tp(e, t, n) {
    switch (Xg(e, t)) {
      case 5103:
        return ie + 'print-' + e + e;
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
        return ie + e + e;
      case 4789:
        return $r + e + e;
      case 5349:
      case 4246:
      case 4810:
      case 6968:
      case 2756:
        return ie + e + $r + e + ce + e + e;
      case 5936:
        switch (Ce(e, t + 11)) {
          case 114:
            return ie + e + ce + K(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
          case 108:
            return ie + e + ce + K(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e;
          case 45:
            return ie + e + ce + K(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
        }
      case 6828:
      case 4268:
      case 2903:
        return ie + e + ce + e + e;
      case 6165:
        return ie + e + ce + 'flex-' + e + e;
      case 5187:
        return (
          ie +
          e +
          K(e, /(\w+).+(:[^]+)/, ie + 'box-$1$2' + ce + 'flex-$1$2') +
          e
        );
      case 5443:
        return (
          ie +
          e +
          ce +
          'flex-item-' +
          K(e, /flex-|-self/g, '') +
          (qt(e, /flex-|baseline/)
            ? ''
            : ce + 'grid-row-' + K(e, /flex-|-self/g, '')) +
          e
        );
      case 4675:
        return (
          ie +
          e +
          ce +
          'flex-line-pack' +
          K(e, /align-content|flex-|-self/g, '') +
          e
        );
      case 5548:
        return ie + e + ce + K(e, 'shrink', 'negative') + e;
      case 5292:
        return ie + e + ce + K(e, 'basis', 'preferred-size') + e;
      case 6060:
        return (
          ie +
          'box-' +
          K(e, '-grow', '') +
          ie +
          e +
          ce +
          K(e, 'grow', 'positive') +
          e
        );
      case 4554:
        return ie + K(e, /([^-])(transform)/g, '$1' + ie + '$2') + e;
      case 6187:
        return (
          K(
            K(K(e, /(zoom-|grab)/, ie + '$1'), /(image-set)/, ie + '$1'),
            e,
            '',
          ) + e
        );
      case 5495:
      case 3959:
        return K(e, /(image-set\([^]*)/, ie + '$1$`$1');
      case 4968:
        return (
          K(
            K(e, /(.+:)(flex-)?(.*)/, ie + 'box-pack:$3' + ce + 'flex-pack:$3'),
            /s.+-b[^;]+/,
            'justify',
          ) +
          ie +
          e +
          e
        );
      case 4200:
        if (!qt(e, /flex-|baseline/))
          return ce + 'grid-column-align' + fn(e, t) + e;
        break;
      case 2592:
      case 3360:
        return ce + K(e, 'template-', '') + e;
      case 4384:
      case 3616:
        return n &&
          n.some(function (r, o) {
            return (t = o), qt(r.props, /grid-\w+-end/);
          })
          ? ~Wo(e + (n = n[t].value), 'span')
            ? e
            : ce +
              K(e, '-start', '') +
              e +
              ce +
              'grid-row-span:' +
              (~Wo(n, 'span') ? qt(n, /\d+/) : +qt(n, /\d+/) - +qt(e, /\d+/)) +
              ';'
          : ce + K(e, '-start', '') + e;
      case 4896:
      case 4128:
        return n &&
          n.some(function (r) {
            return qt(r.props, /grid-\w+-start/);
          })
          ? e
          : ce + K(K(e, '-end', '-span'), 'span ', '') + e;
      case 4095:
      case 3583:
      case 4068:
      case 2532:
        return K(e, /(.+)-inline(.+)/, ie + '$1$2') + e;
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
        if (lt(e) - 1 - t > 6)
          switch (Ce(e, t + 1)) {
            case 109:
              if (Ce(e, t + 4) !== 45) break;
            case 102:
              return (
                K(
                  e,
                  /(.+:)(.+)-([^]+)/,
                  '$1' +
                    ie +
                    '$2-$3$1' +
                    $r +
                    (Ce(e, t + 3) == 108 ? '$3' : '$2-$3'),
                ) + e
              );
            case 115:
              return ~Wo(e, 'stretch')
                ? tp(K(e, 'stretch', 'fill-available'), t, n) + e
                : e;
          }
        break;
      case 5152:
      case 5920:
        return K(
          e,
          /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,
          function (r, o, i, s, l, a, u) {
            return (
              ce +
              o +
              ':' +
              i +
              u +
              (s ? ce + o + '-span:' + (l ? a : +a - +i) + u : '') +
              e
            );
          },
        );
      case 4949:
        if (Ce(e, t + 6) === 121) return K(e, ':', ':' + ie) + e;
        break;
      case 6444:
        switch (Ce(e, Ce(e, 14) === 45 ? 18 : 11)) {
          case 120:
            return (
              K(
                e,
                /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,
                '$1' +
                  ie +
                  (Ce(e, 14) === 45 ? 'inline-' : '') +
                  'box$3$1' +
                  ie +
                  '$2$3$1' +
                  ce +
                  '$2box$3',
              ) + e
            );
          case 100:
            return K(e, ':', ':' + ce) + e;
        }
        break;
      case 5719:
      case 2647:
      case 2135:
      case 3927:
      case 2391:
        return K(e, 'scroll-', 'scroll-snap-') + e;
    }
    return e;
  }
  var np = k(() => {
    Ho();
    Fr();
  });
  function Qo(e, t) {
    for (var n = '', r = 0; r < e.length; r++) n += t(e[r], r, e, t) || '';
    return n;
  }
  function pS(e, t, n, r) {
    switch (e.type) {
      case Zg:
        if (e.children.length) break;
      case Yg:
      case jo:
        return (e.return = e.return || e.value);
      case Xa:
        return '';
      case Ja:
        return (e.return = e.value + '{' + Qo(e.children, r) + '}');
      case ar:
        if (!lt((e.value = e.props.join(',')))) return '';
    }
    return lt((n = Qo(e.children, r)))
      ? (e.return = e.value + '{' + n + '}')
      : '';
  }
  var rp = k(() => {
    Ho();
    Fr();
  });
  function hS(e) {
    var t = tu(e);
    return function (n, r, o, i) {
      for (var s = '', l = 0; l < t; l++) s += e[l](n, r, o, i) || '';
      return s;
    };
  }
  function mS(e) {
    return function (t) {
      t.root || ((t = t.return) && e(t));
    };
  }
  function vS(e, t, n, r) {
    if (e.length > -1 && !e.return)
      switch (e.type) {
        case jo:
          e.return = tp(e.value, e.length, n);
          return;
        case Ja:
          return Qo([An(e, { value: K(e.value, '@', '@' + ie) })], r);
        case ar:
          if (e.length)
            return Jg((n = e.props), function (o) {
              switch (qt(o, (r = /(::plac\w+|:read-\w+)/))) {
                case ':read-only':
                case ':read-write':
                  zr(
                    An(e, {
                      props: [
                        K(
                          o,
                          /:(read-\w+)/,
                          '\
:' +
                            $r +
                            '$1',
                        ),
                      ],
                    }),
                  ),
                    zr(An(e, { props: [o] })),
                    ws(e, { props: Xd(n, r) });
                  break;
                case '::placeholder':
                  zr(
                    An(e, {
                      props: [K(o, /:(plac\w+)/, ':' + ie + 'input-$1')],
                    }),
                  ),
                    zr(An(e, { props: [K(o, /:(plac\w+)/, ':' + $r + '$1')] })),
                    zr(An(e, { props: [K(o, /:(plac\w+)/, ce + 'input-$1')] })),
                    zr(An(e, { props: [o] })),
                    ws(e, { props: Xd(n, r) });
                  break;
              }
              return '';
            });
      }
  }
  var yS = k(() => {
    Ho();
    Fr();
    iu();
    rp();
    np();
  });
  var gS = k(() => {
    Ho();
    Fr();
    dS();
    np();
    iu();
    rp();
    yS();
  });
  var SS,
    _S = k(() => {
      SS = {
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
    });
  function Kk(e, t, n) {
    return (
      n === void 0 && (n = Zo), (e.theme !== n.theme && e.theme) || t || n.theme
    );
  }
  function ES(e) {
    return e.replace(Qk, '-').replace(Yk, '');
  }
  function ap(e) {
    var t,
      n = '';
    for (t = Math.abs(e); t > 52; t = (t / 52) | 0) n = wS(t % 52) + n;
    return (wS(t % 52) + n).replace(Zk, '$1-$2');
  }
  function qk(e) {
    return ap(PS(e) >>> 0);
  }
  function Xk(e) {
    return e.displayName || e.name || 'Component';
  }
  function ip(e) {
    return typeof e == 'string' && !0;
  }
  function TS(e) {
    return ('type' in (t = e) && t.type.$$typeof) === DS
      ? MS
      : '$$typeof' in e
      ? nL[e.$$typeof]
      : eL;
    var t;
  }
  function VS(e, t, n) {
    if (typeof t != 'string') {
      if (xS) {
        var r = sL(t);
        r && r !== xS && VS(e, r, n);
      }
      var o = oL(t);
      RS && (o = o.concat(RS(t)));
      for (var i = TS(e), s = TS(t), l = 0; l < o.length; ++l) {
        var a = o[l];
        if (!(a in tL || (n && n[a]) || (s && a in s) || (i && a in i))) {
          var u = iL(t, a);
          try {
            rL(e, a, u);
          } catch {}
        }
      }
    }
    return e;
  }
  function qo(e) {
    return typeof e == 'function';
  }
  function mp(e) {
    return typeof e == 'object' && 'styledComponentId' in e;
  }
  function Br(e, t) {
    return e && t ? ''.concat(e, ' ').concat(t) : e || t || '';
  }
  function uu(e, t) {
    if (e.length === 0) return '';
    for (var n = e[0], r = 1; r < e.length; r++) n += t ? t + e[r] : e[r];
    return n;
  }
  function xs(e) {
    return (
      e !== null &&
      typeof e == 'object' &&
      e.constructor.name === Object.name &&
      !('props' in e && e.$$typeof)
    );
  }
  function up(e, t, n) {
    if ((n === void 0 && (n = !1), !n && !xs(e) && !Array.isArray(e))) return t;
    if (Array.isArray(t))
      for (var r = 0; r < t.length; r++) e[r] = up(e[r], t[r]);
    else if (xs(t)) for (var r in t) e[r] = up(e[r], t[r]);
    return e;
  }
  function vp(e, t) {
    Object.defineProperty(e, 'toString', { value: t });
  }
  function Cn(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    return new Error(
      'An er\
ror occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#'
        .concat(e, ' for more information.')
        .concat(t.length > 0 ? ' Args: '.concat(t.join(', ')) : ''),
    );
  }
  function cp() {
    return typeof __webpack_nonce__ < 'u' ? __webpack_nonce__ : null;
  }
  function $S(e, t) {
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
          (n.children = $S(n.children, t)),
        n
      );
    });
  }
  function US(e) {
    var t,
      n,
      r,
      o = e === void 0 ? Zo : e,
      i = o.options,
      s = i === void 0 ? Zo : i,
      l = o.plugins,
      a = l === void 0 ? fu : l,
      u = function (m, S, y) {
        return y === n ||
          (y.startsWith(n) && y.endsWith(n) && y.replaceAll(n, '').length > 0)
          ? '.'.concat(t)
          : m;
      },
      f = a.slice();
    f.push(function (m) {
      m.type === ar &&
        m.value.includes('&') &&
        (m.props[0] = m.props[0].replace(yL, n).replace(r, u));
    }),
      s.prefix && f.push(vS),
      f.push(pS);
    var p = function (m, S, y, w) {
      S === void 0 && (S = ''),
        y === void 0 && (y = ''),
        w === void 0 && (w = '&'),
        (t = w),
        (n = S),
        (r = new RegExp('\\'.concat(n, '\\b'), 'g'));
      var U = m.replace(gL, ''),
        h = fS(y || S ? ''.concat(y, ' ').concat(S, ' { ').concat(U, ' }') : U);
      s.namespace && (h = $S(h, s.namespace));
      var c = [];
      return (
        Qo(
          h,
          hS(
            f.concat(
              mS(function (d) {
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
              return S.name || Cn(15), Yo(m, S.name);
            }, 5381)
            .toString()
        : ''),
      p
    );
  }
  function dp() {
    return (0, Le.useContext)(yp);
  }
  function EL(e) {
    var t = (0, Le.useState)(e.stylisPlugins),
      n = t[0],
      r = t[1],
      o = dp().styleSheet,
      i = (0, Le.useMemo)(
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
      s = (0, Le.useMemo)(
        function () {
          return US({
            options: { namespace: e.namespace, prefix: e.enableVendorPrefixes },
            plugins: n,
          });
        },
        [e.enableVendorPrefixes, e.namespace, n],
      );
    return (
      (0, Le.useEffect)(
        function () {
          (0, LS.default)(n, e.stylisPlugins) || r(e.stylisPlugins);
        },
        [e.stylisPlugins],
      ),
      Le.default.createElement(
        yp.Provider,
        {
          value: {
            shouldForwardProp: e.shouldForwardProp,
            styleSheet: i,
            stylis: s,
          },
        },
        Le.default.createElement(_L.Provider, { value: s }, e.children),
      )
    );
  }
  function AS(e) {
    for (var t = '', n = 0; n < e.length; n++) {
      var r = e[n];
      if (n === 1 && r === '-' && e[0] === '-') return e;
      TL(r) ? (t += '-' + r.toLowerCase()) : (t += r);
    }
    return t.startsWith('ms-') ? '-' + t : t;
  }
  function cr(e, t, n, r) {
    if (FS(e)) return [];
    if (mp(e)) return ['.'.concat(e.styledComponentId)];
    if (qo(e)) {
      if (!qo((i = e)) || (i.prototype && i.prototype.isReactComponent) || !t)
        return [e];
      var o = e(t);
      return cr(o, t, n, r);
    }
    var i;
    return e instanceof wL
      ? n
        ? (e.inject(n, r), [e.getName(r)])
        : [e]
      : xs(e)
      ? zS(e)
      : Array.isArray(e)
      ? Array.prototype.concat.apply(
          fu,
          e.map(function (s) {
            return cr(s, t, n, r);
          }),
        )
      : [e.toString()];
  }
  function BS(e) {
    for (var t = 0; t < e.length; t += 1) {
      var n = e[t];
      if (qo(n) && !mp(n)) return !1;
    }
    return !0;
  }
  function NL(e, t, n) {
    var r = mp(e),
      o = e,
      i = !ip(e),
      s = t.attrs,
      l = s === void 0 ? fu : s,
      a = t.componentId,
      u =
        a === void 0
          ? (function (E, R) {
              var x = typeof E != 'string' ? 'sc' : ES(E);
              lp[x] = (lp[x] || 0) + 1;
              var T = ''.concat(x, '-').concat(qk('6.0.7' + x + lp[x]));
              return R ? ''.concat(R, '-').concat(T) : T;
            })(t.displayName, t.parentComponentId)
          : a,
      f = t.displayName,
      p =
        f === void 0
          ? (function (E) {
              return ip(E) ? 'styled.'.concat(E) : 'Styled('.concat(Xk(E), ')');
            })(e)
          : f,
      m =
        t.displayName && t.componentId
          ? ''.concat(ES(t.displayName), '-').concat(t.componentId)
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
    var h = new xL(n, m, r ? o.componentStyle : void 0);
    function c(E, R) {
      return (function (x, T, D) {
        var re = x.attrs,
          b = x.componentStyle,
          fe = x.defaultProps,
          bt = x.foldedComponentIds,
          Oe = x.styledComponentId,
          Je = x.target,
          Ln = Le.default.useContext(jS),
          In = dp(),
          vt = x.shouldForwardProp || In.shouldForwardProp,
          et = (function (I, z, $) {
            for (
              var G, W = Xe(Xe({}, z), { className: void 0, theme: $ }), F = 0;
              F < I.length;
              F += 1
            ) {
              var de = qo((G = I[F])) ? G(W) : G;
              for (var se in de)
                W[se] =
                  se === 'className'
                    ? Br(W[se], de[se])
                    : se === 'style'
                    ? Xe(Xe({}, W[se]), de[se])
                    : de[se];
            }
            return (
              z.className && (W.className = Br(W.className, z.className)), W
            );
          })(re, T, Kk(T, Ln, fe) || Zo),
          $t = et.as || Je,
          X = {};
        for (var q in et)
          et[q] === void 0 ||
            q[0] === '$' ||
            q === 'as' ||
            q === 'theme' ||
            (q === 'forwardedAs'
              ? (X.as = et.forwardedAs)
              : (vt && !vt(q, $t)) || (X[q] = et[q]));
        var _ = (function (I, z) {
            var $ = dp(),
              G = I.generateAndInjectStyles(z, $.styleSheet, $.stylis);
            return G;
          })(b, et),
          L = Br(bt, Oe);
        return (
          _ && (L += ' ' + _),
          et.className && (L += ' ' + et.className),
          (X[ip($t) && !IS.has($t) ? 'class' : 'className'] = L),
          (X.ref = D),
          (0, Le.createElement)($t, X)
        );
      })(d, E, R);
    }
    var d = Le.default.forwardRef(c);
    return (
      (d.attrs = S),
      (d.componentStyle = h),
      (d.shouldForwardProp = y),
      (d.foldedComponentIds = r
        ? Br(o.foldedComponentIds, o.styledComponentId)
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
                for (var D = 0, re = x; D < re.length; D++) up(R, re[D], !0);
                return R;
              })({}, o.defaultProps, E)
            : E;
        },
      }),
      vp(d, function () {
        return '.'.concat(d.styledComponentId);
      }),
      i &&
        VS(d, e, {
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
  function CS(e, t) {
    for (var n = [e[0]], r = 0, o = t.length; r < o; r += 1)
      n.push(t[r], e[r + 1]);
    return n;
  }
  function AL(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    if (qo(e) || xs(e)) {
      var r = e;
      return kS(cr(CS(fu, _s([r], t, !0))));
    }
    var o = e;
    return t.length === 0 && o.length === 1 && typeof o[0] == 'string'
      ? cr(o)
      : kS(cr(CS(o, t)));
  }
  function pp(e, t, n) {
    if ((n === void 0 && (n = Zo), !t)) throw Cn(1, t);
    var r = function (o) {
      for (var i = [], s = 1; s < arguments.length; s++)
        i[s - 1] = arguments[s];
      return e(t, n, AL.apply(void 0, _s([o], i, !1)));
    };
    return (
      (r.attrs = function (o) {
        return pp(
          e,
          t,
          Xe(Xe({}, n), {
            attrs: Array.prototype.concat(n.attrs, o).filter(Boolean),
          }),
        );
      }),
      (r.withConfig = function (o) {
        return pp(e, t, Xe(Xe({}, n), o));
      }),
      r
    );
  }
  var Le,
    LS,
    kn,
    hp,
    Gk,
    fu,
    Zo,
    IS,
    Qk,
    Yk,
    Zk,
    wS,
    op,
    Yo,
    PS,
    OS,
    DS,
    Jk,
    eL,
    tL,
    MS,
    nL,
    rL,
    oL,
    RS,
    iL,
    sL,
    xS,
    lL,
    au,
    cu,
    sp,
    lu,
    aL,
    uL,
    cL,
    fL,
    dL,
    bS,
    pL,
    hL,
    mL,
    NS,
    vL,
    Ns,
    yL,
    gL,
    SL,
    fp,
    yp,
    hV,
    _L,
    wL,
    TL,
    FS,
    zS,
    RL,
    xL,
    jS,
    mV,
    lp,
    kS,
    HS,
    be,
    vV,
    yV,
    gV,
    Xo = k(() => {
      Hg();
      Gg();
      (Le = De(mn())), (LS = De(Qg()));
      gS();
      _S();
      (kn =
        (typeof process < 'u' &&
          process.env !== void 0 &&
          (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR)) ||
        'data-styled'),
        (hp = typeof window < 'u' && 'HTMLElement' in window),
        (Gk = !!(typeof SC_DISABLE_SPEEDY == 'boolean'
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
            process.env.SC_DISABLE_SPEEDY)),
        (fu = Object.freeze([])),
        (Zo = Object.freeze({}));
      (IS = new Set([
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
        '\
dfn',
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
        'summ\
ary',
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
      ])),
        (Qk = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g),
        (Yk = /(^-|-$)/g);
      (Zk = /(a)(d)/gi),
        (wS = function (e) {
          return String.fromCharCode(e + (e > 25 ? 39 : 97));
        });
      (Yo = function (e, t) {
        for (var n = t.length; n; ) e = (33 * e) ^ t.charCodeAt(--n);
        return e;
      }),
        (PS = function (e) {
          return Yo(5381, e);
        });
      (OS = typeof Symbol == 'function' && Symbol.for),
        (DS = OS ? Symbol.for('react.memo') : 60115),
        (Jk = OS ? Symbol.for('react.forward_ref') : 60112),
        (eL = {
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
        }),
        (tL = {
          name: !0,
          length: !0,
          prototype: !0,
          caller: !0,
          callee: !0,
          arguments: !0,
          arity: !0,
        }),
        (MS = {
          $$typeof: !0,
          compare: !0,
          defaultProps: !0,
          displayName: !0,
          propTypes: !0,
          type: !0,
        }),
        (nL =
          (((op = {})[Jk] = {
            $$typeof: !0,
            render: !0,
            defaultProps: !0,
            displayName: !0,
            propTypes: !0,
          }),
          (op[DS] = MS),
          op));
      (rL = Object.defineProperty),
        (oL = Object.getOwnPropertyNames),
        (RS = Object.getOwnPropertySymbols),
        (iL = Object.getOwnPropertyDescriptor),
        (sL = Object.getPrototypeOf),
        (xS = Object.prototype);
      (lL = (function () {
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
                if ((i <<= 1) < 0) throw Cn(16, ''.concat(t));
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
      })()),
        (au = new Map()),
        (cu = new Map()),
        (sp = 1),
        (lu = function (e) {
          if (au.has(e)) return au.get(e);
          for (; cu.has(sp); ) sp++;
          var t = sp++;
          return au.set(e, t), cu.set(t, e), t;
        }),
        (aL = function (e, t) {
          au.set(e, t), cu.set(t, e);
        }),
        (uL = 'style['
          .concat(kn, '][')
          .concat('data-styled-version', '="')
          .concat('6.0.7', '"]')),
        (cL = new RegExp(
          '^'.concat(kn, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),
        )),
        (fL = function (e, t, n) {
          for (var r, o = n.split(','), i = 0, s = o.length; i < s; i++)
            (r = o[i]) && e.registerName(t, r);
        }),
        (dL = function (e, t) {
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
              var a = l.match(cL);
              if (a) {
                var u = 0 | parseInt(a[1], 10),
                  f = a[2];
                u !== 0 &&
                  (aL(f, u), fL(e, f, a[3]), e.getTag().insertRules(u, o)),
                  (o.length = 0);
              } else o.push(l);
            }
          }
        });
      (bS = function (e) {
        var t = document.head,
          n = e || t,
          r = document.createElement('style'),
          o = (function (l) {
            var a = Array.from(l.querySelectorAll('style['.concat(kn, ']')));
            return a[a.length - 1];
          })(n),
          i = o !== void 0 ? o.nextSibling : null;
        r.setAttribute(kn, 'active'),
          r.setAttribute('data-styled-version', '6.0.7');
        var s = cp();
        return s && r.setAttribute('nonce', s), n.insertBefore(r, i), r;
      }),
        (pL = (function () {
          function e(t) {
            (this.element = bS(t)),
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
                throw Cn(17);
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
        })()),
        (hL = (function () {
          function e(t) {
            (this.element = bS(t)),
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
        })()),
        (mL = (function () {
          function e(t) {
            (this.rules = []), (this.length = 0);
          }
          return (
            (e.prototype.insertRule = function (t, n) {
              return (
                t <= this.length &&
                (this.rules.splice(t, 0, n), this.length++, !0)
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
        })()),
        (NS = hp),
        (vL = { isServer: !hp, useCSSOMInjection: !Gk }),
        (Ns = (function () {
          function e(t, n, r) {
            t === void 0 && (t = Zo), n === void 0 && (n = {});
            var o = this;
            (this.options = Xe(Xe({}, vL), t)),
              (this.gs = n),
              (this.names = new Map(r)),
              (this.server = !!t.isServer),
              !this.server &&
                hp &&
                NS &&
                ((NS = !1),
                (function (i) {
                  for (
                    var s = document.querySelectorAll(uL), l = 0, a = s.length;
                    l < a;
                    l++
                  ) {
                    var u = s[l];
                    u &&
                      u.getAttribute(kn) !== 'active' &&
                      (dL(i, u), u.parentNode && u.parentNode.removeChild(u));
                  }
                })(this)),
              vp(this, function () {
                return (function (i) {
                  for (
                    var s = i.getTag(),
                      l = s.length,
                      a = '',
                      u = function (p) {
                        var m = (function (h) {
                          return cu.get(h);
                        })(p);
                        if (m === void 0) return 'continue';
                        var S = i.names.get(m),
                          y = s.getGroup(p);
                        if (S === void 0 || y.length === 0) return 'continue';
                        var w = ''
                            .concat(kn, '.g')
                            .concat(p, '[id="')
                            .concat(m, '"]'),
                          U = '';
                        S !== void 0 &&
                          S.forEach(function (h) {
                            h.length > 0 && (U += ''.concat(h, ','));
                          }),
                          (a += ''
                            .concat(y)
                            .concat(w, '{content:"')
                            .concat(U, '"}').concat(`/*!sc*/
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
              return lu(t);
            }),
            (e.prototype.reconstructWithOptions = function (t, n) {
              return (
                n === void 0 && (n = !0),
                new e(
                  Xe(Xe({}, this.options), t),
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
                    return n.isServer ? new mL(o) : r ? new pL(o) : new hL(o);
                  })(this.options)),
                  new lL(t)))
              );
              var t;
            }),
            (e.prototype.hasNameForId = function (t, n) {
              return this.names.has(t) && this.names.get(t).has(n);
            }),
            (e.prototype.registerName = function (t, n) {
              if ((lu(t), this.names.has(t))) this.names.get(t).add(n);
              else {
                var r = new Set();
                r.add(n), this.names.set(t, r);
              }
            }),
            (e.prototype.insertRules = function (t, n, r) {
              this.registerName(t, n), this.getTag().insertRules(lu(t), r);
            }),
            (e.prototype.clearNames = function (t) {
              this.names.has(t) && this.names.get(t).clear();
            }),
            (e.prototype.clearRules = function (t) {
              this.getTag().clearGroup(lu(t)), this.clearNames(t);
            }),
            (e.prototype.clearTag = function () {
              this.tag = void 0;
            }),
            e
          );
        })()),
        (yL = /&/g),
        (gL = /^\s*\/\/.*$/gm);
      (SL = new Ns()),
        (fp = US()),
        (yp = Le.default.createContext({
          shouldForwardProp: void 0,
          styleSheet: SL,
          stylis: fp,
        })),
        (hV = yp.Consumer),
        (_L = Le.default.createContext(void 0));
      (wL = (function () {
        function e(t, n) {
          var r = this;
          (this.inject = function (o, i) {
            i === void 0 && (i = fp);
            var s = r.name + i.hash;
            o.hasNameForId(r.id, s) ||
              o.insertRules(r.id, s, i(r.rules, s, '@keyframes'));
          }),
            (this.name = t),
            (this.id = 'sc-keyframes-'.concat(t)),
            (this.rules = n),
            vp(this, function () {
              throw Cn(12, String(r.name));
            });
        }
        return (
          (e.prototype.getName = function (t) {
            return t === void 0 && (t = fp), this.name + t.hash;
          }),
          e
        );
      })()),
        (TL = function (e) {
          return e >= 'A' && e <= 'Z';
        });
      (FS = function (e) {
        return e == null || e === !1 || e === '';
      }),
        (zS = function (e) {
          var t,
            n,
            r = [];
          for (var o in e) {
            var i = e[o];
            e.hasOwnProperty(o) &&
              !FS(i) &&
              ((Array.isArray(i) && i.isCss) || qo(i)
                ? r.push(''.concat(AS(o), ':'), i, ';')
                : xs(i)
                ? r.push.apply(
                    r,
                    _s(_s([''.concat(o, ' {')], zS(i), !1), ['}'], !1),
                  )
                : r.push(
                    ''
                      .concat(AS(o), ': ')
                      .concat(
                        ((t = o),
                        (n = i) == null || typeof n == 'boolean' || n === ''
                          ? ''
                          : typeof n != 'number' ||
                            n === 0 ||
                            t in SS ||
                            t.startsWith('--')
                          ? String(n).trim()
                          : ''.concat(n, 'px')),
                        ';',
                      ),
                  ));
          }
          return r;
        });
      (RL = PS('6.0.7')),
        (xL = (function () {
          function e(t, n, r) {
            (this.rules = t),
              (this.staticRulesId = ''),
              (this.isStatic = (r === void 0 || r.isStatic) && BS(t)),
              (this.componentId = n),
              (this.baseHash = Yo(RL, n)),
              (this.baseStyle = r),
              Ns.registerId(n);
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
                  o = Br(o, this.staticRulesId);
                else {
                  var i = uu(cr(this.rules, t, n, r)),
                    s = ap(Yo(this.baseHash, i) >>> 0);
                  if (!n.hasNameForId(this.componentId, s)) {
                    var l = r(i, '.'.concat(s), void 0, this.componentId);
                    n.insertRules(this.componentId, s, l);
                  }
                  (o = Br(o, s)), (this.staticRulesId = s);
                }
              else {
                for (
                  var a = Yo(this.baseHash, r.hash), u = '', f = 0;
                  f < this.rules.length;
                  f++
                ) {
                  var p = this.rules[f];
                  if (typeof p == 'string') u += p;
                  else if (p) {
                    var m = uu(cr(p, t, n, r));
                    (a = Yo(a, m)), (u += m);
                  }
                }
                if (u) {
                  var S = ap(a >>> 0);
                  n.hasNameForId(this.componentId, S) ||
                    n.insertRules(
                      this.componentId,
                      S,
                      r(u, '.'.concat(S), void 0, this.componentId),
                    ),
                    (o = Br(o, S));
                }
              }
              return o;
            }),
            e
          );
        })()),
        (jS = Le.default.createContext(void 0)),
        (mV = jS.Consumer),
        (lp = {});
      kS = function (e) {
        return Object.assign(e, { isCss: !0 });
      };
      (HS = function (e) {
        return pp(NL, e);
      }),
        (be = HS);
      IS.forEach(function (e) {
        be[e] = HS(e);
      });
      (vV = (function () {
        function e(t, n) {
          (this.rules = t),
            (this.componentId = n),
            (this.isStatic = BS(t)),
            Ns.registerId(this.componentId + 1);
        }
        return (
          (e.prototype.createStyles = function (t, n, r, o) {
            var i = o(uu(cr(this.rules, n, r, o)), ''),
              s = this.componentId + t;
            r.insertRules(s, s, i);
          }),
          (e.prototype.removeStyles = function (t, n) {
            n.clearRules(this.componentId + t);
          }),
          (e.prototype.renderStyles = function (t, n, r, o) {
            t > 2 && Ns.registerId(this.componentId + t),
              this.removeStyles(t, r),
              this.createStyles(t, n, r, o);
          }),
          e
        );
      })()),
        (yV = (function () {
          function e() {
            var t = this;
            (this._emitSheetCSS = function () {
              var n = t.instance.toString(),
                r = cp(),
                o = uu(
                  [
                    r && 'nonce="'.concat(r, '"'),
                    ''.concat(kn, '="true"'),
                    ''.concat('data-styled-version', '="').concat('6.0.7', '"'),
                  ].filter(Boolean),
                  ' ',
                );
              return '<style '.concat(o, '>').concat(n, '</style>');
            }),
              (this.getStyleTags = function () {
                if (t.sealed) throw Cn(2);
                return t._emitSheetCSS();
              }),
              (this.getStyleElement = function () {
                var n;
                if (t.sealed) throw Cn(2);
                var r =
                    (((n = {})[kn] = ''),
                    (n['data-styled-version'] = '6.0.7'),
                    (n.dangerouslySetInnerHTML = {
                      __html: t.instance.toString(),
                    }),
                    n),
                  o = cp();
                return (
                  o && (r.nonce = o),
                  [
                    Le.default.createElement(
                      'style',
                      Xe({}, r, { key: 'sc-0-0' }),
                    ),
                  ]
                );
              }),
              (this.seal = function () {
                t.sealed = !0;
              }),
              (this.instance = new Ns({ isServer: !0 })),
              (this.sealed = !1);
          }
          return (
            (e.prototype.collectStyles = function (t) {
              if (this.sealed) throw Cn(2);
              return Le.default.createElement(EL, { sheet: this.instance }, t);
            }),
            (e.prototype.interleaveWithNodeStream = function (t) {
              throw Cn(3);
            }),
            e
          );
        })()),
        (gV = '__sc-'.concat(kn, '__'));
    });
  var WS,
    Jo,
    du = k(() => {
      'use strict';
      (WS = () => new URLSearchParams(location.search)),
        (Jo = {
          get: WS,
          boolean: (e, t = !1) => {
            let n = WS().get(e);
            return n === '1' ? !0 : n === '0' ? !1 : t;
          },
        });
    });
  var GS,
    KS = k(() => {
      'use strict';
      Dt();
      du();
      GS = He({ key: 'ShowMenu', default: Jo.boolean('menu', !1) });
    });
  var QS,
    YS = k(() => {
      'use strict';
      QS =
        '360\u5EA6\u30D1\u30CE\u30E9\u30DE\u753B\u50CF\u30E9\u30A4\u30D6\u30E9\u30EA';
    });
  var ZS,
    qS = k(() => {
      'use strict';
      Dt();
      ui();
      YS();
      ZS = He({
        key: 'Title',
        default: ai.title,
        effects: [
          ({ onSet: e }) => {
            e((t) => {
              document.title = `${t} | ${QS}`;
            });
          },
        ],
      });
    });
  var pu,
    jr,
    gp = k(() => {
      'use strict';
      pu = De(mn(), 1);
      Dt();
      jr = (e) => {
        let [t, n] = qa(e),
          r = (0, pu.useCallback)(() => n((s) => !s), [n]),
          o = (0, pu.useCallback)(() => n(!0), [n]),
          i = (0, pu.useCallback)(() => n(!1), [n]);
        return { state: t, setTrue: o, setFalse: i, toggle: r };
      };
    });
  var hu,
    XS = k(() => {
      'use strict';
      hu = () => {};
    });
  var ei,
    t_,
    Sp,
    JS,
    e_,
    CL,
    kL,
    n_ = k(() => {
      'use strict';
      ei = De(mn(), 1);
      Xo();
      XS();
      (t_ = De(zt(), 1)),
        (Sp = { width: 0, height: 0 }),
        (JS = {}),
        (e_ = ({ opened: e, children: t }) => {
          let [n, r] = (0, ei.useState)(null),
            [o, i] = (0, ei.useState)(e ? JS : Sp);
          return (
            (0, ei.useEffect)(() => {
              if (!n) return hu;
              let s = CL(n);
              if (
                (i({
                  width: Math.max(n.scrollWidth, s.width),
                  height: Math.min(n.scrollHeight, s.height),
                }),
                e)
              )
                return hu;
              let l = setTimeout(() => i(Sp), 10);
              return () => clearTimeout(l);
            }, [e, n]),
            (0, ei.useEffect)(() => {
              if (o === Sp) return hu;
              let s = setTimeout(() => i(JS), 300);
              return () => clearTimeout(s);
            }, [o]),
            (0, t_.jsx)(kL, {
              ref: r,
              style: o,
              className: e ? '' : 'closed',
              children: t,
            })
          );
        }),
        (CL = (e) => {
          let { style: t } = e,
            { width: n, height: r } = t;
          t.width = t.height = '';
          let o = e.getBoundingClientRect();
          return (t.width = n), (t.height = r), o;
        }),
        (kL = be.div`
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
`);
    });
  var r_,
    o_,
    _p,
    i_ = k(() => {
      'use strict';
      Dt();
      li();
      (r_ = []), (o_ = Jp(document.documentElement.requestFullscreen));
      o_ &&
        r_.push(({ onSet: e, setSelf: t }) => {
          e((r) => {
            r && !document.fullscreenElement
              ? document.body.requestFullscreen().catch(alert)
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
      _p = Object.assign(He({ key: 'FullScreen', default: !1, effects: r_ }), {
        available: o_,
      });
    });
  var Hr,
    mu,
    As = k(() => {
      'use strict';
      Dt();
      ui();
      (Hr = He({ key: 'Viewer', default: js })),
        (mu = Ya({
          key: 'ViewerContainer',
          get: ({ get: e }) => e(Hr).getContainer(),
        }));
    });
  var LL,
    ti,
    s_,
    l_,
    a_ = k(() => {
      'use strict';
      Dt();
      Kr();
      ui();
      As();
      (LL = (e, t) => {
        e.append(
          Is('div', null, t.text),
          xu(
            'svg',
            { viewBox: '-5 -1 10 7' },
            xu('path', { d: 'M-4 0L0 6L4 0Z' }),
          ),
        );
      }),
        (ti = He({
          key: 'Markers',
          default: ai.markers,
          effects: [
            ({ onSet: e, getPromise: t }) => {
              let n = async (r) => {
                let o = await t(Hr);
                for (let i of o.getConfig().hotSpots.slice())
                  o.removeHotSpot(i.id);
                for (let i of r)
                  o.addHotSpot({
                    ...i,
                    createTooltipFunc: LL,
                    createTooltipArgs: i,
                  });
              };
              e((r) => {
                n(r).catch(alert);
              }),
                t(ti).then(n).catch(alert);
            },
          ],
        })),
        (s_ = He({
          key: 'FocusedMa\
rker',
          default: null,
          effects: [
            ({ onSet: e, getPromise: t }) => {
              let n = async (r) => {
                let [o, i] = await Promise.all([t(Hr), t(ti)]),
                  s = i.find((l) => l.id === r);
                s &&
                  (o.lookAt(s.pitch, s.yaw, s.hfov || o.getHfov(), 600),
                  (location.hash = `#${r}`));
              };
              e((r) => {
                n(r).catch(alert);
              });
            },
          ],
        })),
        (l_ = zg({
          key: 'Marker',
          get:
            (e) =>
            ({ get: t }) => {
              let r = t(ti).find((o) => o.id === e);
              if (!r) throw new Error(`NoSuchMarker:${e}`);
              return r;
            },
          set:
            (e) =>
            ({ set: t }, n) => {
              n instanceof Ug ||
                t(ti, (r) => {
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
        }));
    });
  var ni,
    vu = k(() => {
      'use strict';
      ni =
        (e) =>
        (...t) => {
          (async () => await e(...t))().catch(alert);
        };
    });
  var u_,
    c_,
    f_ = k(() => {
      'use strict';
      Dt();
      vu();
      As();
      (u_ = He({
        key: 'Orientation',
        default: !1,
        effects: [
          ({ onSet: e, getPromise: t }) => {
            let n = ni(async (r) => {
              let o = await t(Hr);
              o.startOrientation();
            });
            e(n);
          },
        ],
      })),
        (c_ = Ya({
          key: 'OrientationAvailabilty',
          get: ({ get: e }) => e(Hr).isOrientationSupported(),
        }));
    });
  var yu,
    d_ = k(() => {
      'use strict';
      Dt();
      du();
      vu();
      Kr();
      As();
      yu = He({
        key: 'ShowMarkers',
        default: Jo.boolean('markers', !0),
        effects: [
          ({ onSet: e, getPromise: t }) => {
            let n = ni(async (r) => {
              let o = await t(mu),
                i = fr('.pnlm-render-container', o);
              i.dataset.nomarker = r ? '0' : '1';
            });
            e(n), t(yu).then(n).catch(alert);
          },
        ],
      });
    });
  var Ep,
    p_ = k(() => {
      'use strict';
      Dt();
      du();
      vu();
      Kr();
      As();
      Ep = He({
        key: 'VerticalMarker',
        default: Jo.boolean('vertical', !0),
        effects: [
          ({ onSet: e, getPromise: t }) => {
            let n = ni(async (r) => {
              let o = await t(mu),
                i = fr('.pnlm-render-container', o);
              i.dataset.vertical = r ? '1' : '0';
            });
            e(n), t(Ep).then(n).catch(alert);
          },
        ],
      });
    });
  var Cs,
    wp = k(() => {
      'use strict';
      Xo();
      Cs = be.button`
  line-height: 1.2;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
    });
  var h_,
    ks,
    IL,
    m_ = k(() => {
      'use strict';
      Xo();
      (h_ = De(zt(), 1)),
        (ks = ({ state: e, ...t }) =>
          (0, h_.jsx)(IL, { ...t, 'data-state': e ? '1' : '0' })),
        (IL = be.button`
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
`);
    });
  var gu,
    te,
    v_,
    PL,
    OL,
    DL,
    ML,
    VL,
    bL,
    $L,
    UL,
    Su,
    FL,
    zL,
    BL,
    jL,
    y_ = k(() => {
      'use strict';
      li();
      gu = De(mn(), 1);
      Dt();
      Xo();
      i_();
      a_();
      f_();
      d_();
      p_();
      gp();
      wp();
      m_();
      (te = De(zt(), 1)),
        (v_ = () =>
          (0, te.jsxs)(PL, {
            children: [
              (0, te.jsx)(DL, {}),
              (0, te.jsx)('hr', {}),
              (0, te.jsx)($L, {}),
              (0, te.jsx)('hr', {}),
              (0, te.jsx)(OL, {
                href: '/',
                children: '\u4E00\u89A7\u306B\u623B\u308B',
              }),
            ],
          })),
        (PL = be.section`
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
`),
        (OL = be.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`),
        (DL = () => {
          let e = Za(ti);
          return (0, te.jsx)(ML, {
            children: e.map((t, n) =>
              (0, te.jsxs)(
                gu.Fragment,
                {
                  children: [
                    (0, te.jsxs)('div', { children: ['(', n + 1, ')'] }),
                    (0, te.jsx)(VL, { marker: t }),
                    (0, te.jsx)(bL, { marker: t }),
                  ],
                },
                t.id,
              ),
            ),
          });
        }),
        (ML = be.div`
  justify-self: stretch;
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  justify-items: start;
  align-items: center;
  column-gap: 6px;
  row-gap: 4px;
`),
        (VL = ({ marker: e }) => {
          let t = Bg(s_),
            { text: n, id: r } = e,
            o = (0, gu.useCallback)(() => t(r), [r, t]);
          return (0, te.jsx)(Cs, { onClick: o, children: n });
        }),
        (bL = ({ marker: e }) => {
          let t = jg(
            ({ set: n }) =>
              () => {
                let r = prompt(
                  '\u30C6\u30AD\u30B9\u30C8\u3092\u7DE8\u96C6\u3059\u308B\uFF08\u7A7A\u306B\u3059\u308B\u3068\u524A\u9664\u3057\u307E\u3059\uFF09',
                  e.text,
                );
                Ee(r) && n(l_(e.id), { ...e, text: r });
              },
            [e],
          );
          return (0, te.jsx)(Cs, { onClick: t, children: '\u7DE8\u96C6' });
        }),
        ($L = () =>
          (0, te.jsxs)(UL, {
            children: [
              (0, te.jsx)(FL, {}),
              (0, te.jsx)(zL, {}),
              (0, te.jsx)(BL, {}),
              (0, te.jsx)(jL, {}),
            ],
          })),
        (UL = be.div`
  justify-self: stretch;
  display: grid;
  grid-template-columns: 1fr max-content;
  justify-items: start;
  align-items: center;
  column-gap: 6px;
  row-gap: 6px;
`),
        (Su = be.label`
  cursor: pointer;
  user-select: none;
  &:hover {
    text-decoration: underline;
  }
`),
        (FL = () => {
          let { state: e, toggle: t } = jr(yu),
            n = 'toggle-markers';
          return (0, te.jsxs)(te.Fragment, {
            children: [
              (0, te.jsx)(Su, {
                htmlFor: n,
                children:
                  '\u30DE\u30FC\u30AB\u30FC\u3092\u8868\u793A\u3059\u308B',
              }),
              (0, te.jsx)(ks, { id: n, state: e, onClick: t }),
            ],
          });
        }),
        (zL = () => {
          let e = Za(yu),
            { state: t, toggle: n } = jr(Ep),
            r = 'toggle-vertical-marker';
          return (0, te.jsxs)(te.Fragment, {
            children: [
              (0, te.jsx)(Su, {
                htmlFor: r,
                children:
                  '\u30DE\u30FC\u30AB\u30FC\u3092\u7E26\u66F8\u304D\u8868\u793A\u3059\u308B',
              }),
              (0, te.jsx)(ks, { id: r, state: t, onClick: n, disabled: !e }),
            ],
          });
        }),
        (BL = () => {
          let { state: e, toggle: t } = jr(_p),
            n = 'toggle-fullscreen';
          return (0, te.jsxs)(te.Fragment, {
            children: [
              (0, te.jsx)(Su, {
                htmlFor: n,
                children: '\u5168\u753B\u9762\u3067\u8868\u793A\u3059\u308B',
              }),
              (0, te.jsx)(ks, {
                id: n,
                state: e,
                onClick: t,
                disabled: !_p.available,
              }),
            ],
          });
        }),
        (jL = () => {
          let { state: e, toggle: t } = jr(u_),
            n = Za(c_),
            r = 'toggle-orientation';
          return (0, te.jsxs)(te.Fragment, {
            children: [
              (0, te.jsx)(Su, {
                htmlFor: r,
                children:
                  '\u52A0\u901F\u5EA6\u30BB\u30F3\u30B5\u30FC\u3067\u64CD\u4F5C\u3059\u308B',
              }),
              (0, te.jsx)(ks, { id: r, state: e, onClick: t, disabled: !n }),
            ],
          });
        });
    });
  var g_ = {};
  V_(g_, { Menu: () => HL });
  var _u,
    We,
    HL,
    WL,
    GL,
    KL,
    QL,
    YL,
    ZL,
    qL,
    XL,
    S_ = k(() => {
      'use strict';
      _u = De(mn(), 1);
      Dt();
      Xo();
      KS();
      qS();
      gp();
      n_();
      y_();
      wp();
      (We = De(zt(), 1)),
        (HL = () =>
          (0, We.jsx)(Fg, {
            children: (0, We.jsx)(_u.Suspense, {
              fallback: null,
              children: (0, We.jsx)(WL, {}),
            }),
          })),
        (WL = () => {
          let { state: e, toggle: t } = jr(GS);
          return (0, We.jsxs)(We.Fragment, {
            children: [
              (0, We.jsxs)(GL, {
                children: [
                  (0, We.jsx)(YL, { onClick: t }),
                  (0, We.jsx)(KL, {}),
                ],
              }),
              (0, We.jsx)(e_, { opened: e, children: (0, We.jsx)(v_, {}) }),
            ],
          });
        }),
        (GL = be.div`
  --padding: 7px;
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  justify-items: center;
`),
        (KL = () => {
          let [e, t] = qa(ZS),
            n = (0, _u.useCallback)(() => {
              let r = prompt(
                '\u30BF\u30A4\u30C8\u30EB\u3092\u7DE8\u96C6\u3059\u308B',
                e,
              );
              r && t(r);
            }, [e, t]);
          return (0, We.jsx)(QL, {
            onClick: n,
            title: '\u30AF\u30EA\u30C3\u30AF\u3067\u7DE8\u96C6',
            children: e,
          });
        }),
        (QL = be(Cs)`
  padding-inline: 4px;
  margin-inline-end: 6px;
  padding-block: 5px;
`),
        (YL = (e) =>
          (0, We.jsx)(ZL, {
            ...e,
            children: (0, We.jsx)(qL, {
              viewBox: '-12 -12 24 24',
              children: (0, We.jsx)(XL, { d: 'M-9 -7H9M-9 0H9M-9 7H9' }),
            }),
          })),
        (ZL = be.button`
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
`),
        (qL = be.svg`
  inline-size: 20px;
  /* border: solid 1px red; */
`),
        (XL = be.path`
  stroke: currentColor;
  stroke-width: 2.5;
`);
    });
  Kr();
  ui();
  var __ = De(zt(), 1);
  Promise.all([
    js,
    Promise.resolve().then(() => De(s0(), 1)),
    Promise.resolve().then(() => (S_(), g_)),
  ])
    .then(([e, { createRoot: t }, { Menu: n }]) => {
      let r = Is('nav', { class: 'viewer-menu' });
      e.getContainer().after(r), t(r).render((0, __.jsx)(n, {}));
    })
    .catch(alert);
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
*/
