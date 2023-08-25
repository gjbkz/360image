'use strict';
(() => {
  // src/util/dom.mts
  var setAttributes = (node, attrs) => {
    if (attrs) {
      for (const [name, value] of Object.entries(attrs)) {
        switch (typeof value) {
          case 'boolean':
            if (value) {
              node.setAttribute(name, '');
            }
            break;
          case 'number':
            node.setAttribute(name, `${value}`);
            break;
          case 'string':
            node.setAttribute(name, value);
            break;
          default:
        }
      }
    }
    return node;
  };
  var setChildren = (node, children) => {
    for (const child of children) {
      if (typeof child === 'function') {
        node.append(...child(node));
      } else if (typeof child === 'string') {
        node.append(document.createTextNode(child));
      } else if (child instanceof Node) {
        node.append(child);
      }
    }
    return node;
  };
  var SVGNS = 'http://www.w3.org/2000/svg';
  var svg = (tagName, attrs, ...children) => {
    const node = document.createElementNS(SVGNS, tagName);
    return setChildren(setAttributes(node, attrs), children);
  };
  var dom = (tagName, attrs, ...children) => {
    const node = document.createElement(tagName);
    return setChildren(setAttributes(node, attrs), children);
  };

  // src/util/createMarker.mts
  var createMarker = function* (wrappee) {
    const backdrop = dom('div', { class: 'hotspot-marker-backdrop' });
    yield backdrop;
    yield svg('svg', { class: 'hotspot-marker' }, function* (svgElement) {
      const lw = 1;
      const aw2 = 4;
      const ah = 6;
      const path = svg('path', { style: `stroke-width:${lw}px` });
      const observer = new ResizeObserver(([{ target }]) => {
        const rect = target.getBoundingClientRect();
        const pRect = target.parentElement?.getBoundingClientRect();
        if (pRect) {
          Object.assign(backdrop.style, {
            left: `${rect.left - pRect.left}px`,
            top: `${rect.top - pRect.top}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
          });
        }
        const w2 = rect.width / 2;
        const h = rect.height;
        {
          const ww = w2 * 2 + lw * 2;
          const hh = h + ah + lw * 2;
          svgElement.style.width = `${ww}px`;
          svgElement.style.height = `${hh}px`;
          const viewBox = `${ww / -2} ${-hh + ah + lw} ${ww} ${hh}`;
          svgElement.setAttribute('viewBox', viewBox);
        }
        const d = `M${-aw2} 0L0 ${ah}L${aw2} 0Z`;
        path.setAttribute('d', d);
      });
      observer.observe(wrappee);
      wrappee.style.marginBottom = `${ah + lw / 2}px`;
      yield path;
    });
  };

  // src/util/syncMarkersList.mts
  var buttonText = '\u73FE\u5728\u4F4D\u7F6E\u306B\u8FFD\u52A0\u3059\u308B';
  var alertText =
    '\u8FFD\u52A0\u3059\u308B\u306B\u306F\u300C\u753B\u9762\u4E2D\u5FC3\u306E\u5EA7\u6A19\u3092\u8868\u793A\u300D\u3092\u6709\u52B9\u306B\u3057\u3066\u8FFD\u52A0\u4F4D\u7F6E\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002';
  var syncMarkersList = () => {
    const viewer = globalThis.viewerApp.getCurrentViewer();
    if (!viewer) {
      return;
    }
    const container = viewer.getContainer();
    const listElement = container.querySelector('.marker-list');
    if (!listElement) {
      return;
    }
    while (listElement.firstChild) {
      listElement.firstChild.remove();
    }
    const current = viewer.getConfig();
    const markers = current.hotSpots.slice();
    markers.forEach((marker, index) => {
      const dd = dom('dd', null, marker.text);
      dd.addEventListener('click', () => focusMarker(marker.id));
      listElement.append(dom('dt', null, `(${index + 1})`), dd);
    });
    const button = dom('button', null, buttonText);
    listElement.append(button);
    if (container.querySelector('#show-coordinate')?.checked) {
      button.addEventListener('click', () => {
        const yaw = Number(viewer.getYaw().toFixed(3));
        const pitch = Number(viewer.getPitch().toFixed(3));
        const text = prompt(
          `(${yaw.toFixed(2)},${pitch.toFixed(
            2,
          )}) \u306B\u30DE\u30FC\u30AB\u30FC\u3092\u8FFD\u52A0\u3059\u308B`,
          '',
        );
        setMarker({ pitch, yaw, text });
      });
    } else {
      button.classList.add('disabled');
      button.title = alertText;
      button.addEventListener('click', () => alert(alertText));
    }
    const a = container.querySelector('#export-json');
    if (a) {
      const { title, author } = current;
      const data = JSON.stringify(
        {
          title,
          author,
          hotSpots: markers.map(({ pitch, yaw, text }) => ({
            pitch,
            yaw,
            text,
          })),
        },
        null,
        2,
      );
      const BOM = new Uint8Array([239, 187, 191]);
      const blob = new Blob([BOM, data], { type: 'application/json' });
      URL.revokeObjectURL(a.href);
      a.href = URL.createObjectURL(blob);
      const name = isLocalFile ? title : current.panorama;
      a.setAttribute('download', name.replace(/(\.[^.]*?)?$/, '.json'));
    }
  };

  // src/util/setMarker.mts
  var setMarker = (newMarker) => {
    const viewer = globalThis.viewerApp.getCurrentViewer();
    if (!viewer) {
      return false;
    }
    if (newMarker.id) {
      for (const marker of viewer.getConfig().hotSpots) {
        if (marker.id === newMarker.id) {
          viewer.removeHotSpot(marker.id);
        }
      }
    } else {
      newMarker.id = Date.now().toString(16);
    }
    let result = false;
    if (newMarker.text) {
      result = true;
      viewer.addHotSpot(fillHotSpot(newMarker));
    }
    syncMarkersList();
    return result;
  };

  // src/util/focusMarker.mts
  var focusMarker = (id) => {
    const viewer = globalThis.viewerApp.getCurrentViewer();
    if (!viewer) {
      return;
    }
    const marker = viewer.getConfig().hotSpots.find((hs) => hs.id === id);
    if (marker) {
      const { pitch, yaw } = marker;
      const d = Math.hypot(yaw - viewer.getYaw(), pitch - viewer.getPitch());
      if (1e-3 < d) {
        location.hash = `#${marker.id}`;
        viewer.setYaw(yaw);
        viewer.setPitch(pitch);
        coordinateMonitor.track();
      } else {
        const newText = prompt(
          `(${yaw.toFixed(2)},${pitch.toFixed(
            2,
          )}) \u306E\u30DE\u30FC\u30AB\u30FC\u306E\u30C6\u30AD\u30B9\u30C8\u3092\u4FEE\u6B63\u3059\u308B\uFF08\u7A7A\u306B\u3059\u308B\u3068\u524A\u9664\u3057\u307E\u3059\uFF09`,
          marker.text,
        );
        if (newText === null) {
          return;
        }
        setMarker({ ...marker, text: newText });
      }
    }
  };

  // src/util/createTooltip.mts
  var createTooltip = (markerDiv, marker) => {
    markerDiv.dataset.hotspot = marker.id;
    markerDiv.style.backgroundImage = 'none';
    const tooltip = dom('div', { class: 'hotspot-tooltip' }, marker.text);
    markerDiv.append(...createMarker(tooltip), tooltip);
    markerDiv.addEventListener('click', () => {
      focusMarker(marker.id);
    });
  };

  // src/util/fillHotSpot.mts
  var fillHotSpot = (hotSpot) => ({
    ...hotSpot,
    createTooltipFunc: createTooltip,
    createTooltipArgs: hotSpot,
  });

  // src/util/getAppContainer.mts
  var getAppContainer = () => {
    let container = document.querySelector('#panorama');
    if (!container) {
      container = dom('div', { id: 'panorama' });
      document.body.append(container);
    }
    return container;
  };

  // src/viewer.mts
  var viewerMap = /* @__PURE__ */ new WeakMap();
  var start = (params) => {
    const container = getAppContainer();
    const viewer = globalThis.pannellum.viewer(container, {
      title: params.title,
      panorama: `/images/${params.path}.jpg`,
      hotSpots: params.hotSpots.map(fillHotSpot),
      autoLoad: true,
      keyboardZoom: false,
      showControls: false,
      friction: 0.8,
      maxPitch: 38,
      minHfov: 25,
    });
    viewerMap.set(container, viewer);
  };
  var getCurrentViewer = () => viewerMap.get(getAppContainer()) || null;
  Object.assign(globalThis, { viewerApp: { start, getCurrentViewer } });
})();
