(async function () {
  /** @typedef {{panorama: string, config: string, haov: number, vaov: number, voffset: number}} Params */
  /** @type {Partial<Params>} */
  const params = {};
  for (const [name, value] of new URLSearchParams(location.search)) {
    switch (name) {
      case 'haov':
      case 'vaov':
      case 'voffset':
        params[name] = Number(value);
        break;
      case 'image':
        params.panorama = `${value}.jpg`;
        params.config = `${value}.json`;
        break;
      default:
        anError('An invalid configuration parameter was specified: ' + H);
    }
  }
  const res = await fetch(params.config);
  if (!res.ok) {
    anError(`The file ${params.config} could not be accessed.`);
  }
  const config = {
    ...params,
    ...(await res.json()),
    autoLoad: true,
    keyboardZoom: false,
    orientationOnByDefault: true,
  };
  const SVGNS = 'http://www.w3.org/2000/svg';
  const createMarker = () => {
    const marker = document.createElementNS(SVGNS, 'svg');
    marker.setAttribute('viewBox', '0 0 10 10');
    const path = document.createElementNS(SVGNS, 'path');
    path.setAttribute('d', 'M0,0L10,0 5,10z');
    marker.append(path);
    marker.classList.add('hotspot-marker');
    return marker;
  };
  const createTooltipFunc = (hotSpotDiv, hotSpot) => {
    hotSpotDiv.style.backgroundImage = 'none';
    hotSpotDiv.append(createMarker());
    const tooltip = document.createElement('div');
    tooltip.classList.add('hotspot-tooltip');
    tooltip.append(document.createTextNode(hotSpot.text));
    hotSpotDiv.append(tooltip);
  };
  for (const [name, value] of Object.entries(config)) {
    switch (name) {
      case 'title':
        document.title = value;
        break;
      case 'hotSpots':
        value.forEach((hotSpot, index) => {
          hotSpot.id = hotSpot.id || `hs-${index}`;
          hotSpot.createTooltipFunc = createTooltipFunc;
          hotSpot.createTooltipArgs = hotSpot;
        });
        break;
      default:
    }
  }
  const viewer = pannellum.viewer('container', config);
  const container = viewer.getContainer();
  const options = document.createElement('div');
  options.classList.add('app-options');
  const toggle = document.createElement('button');
  toggle.classList.add('toggle');
  toggle.addEventListener('click', () => {
    options.classList.toggle('active');
  });
  const items = document.createElement('section');
  {
    const hotSpots = config.hotSpots.slice();
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = true;
    input.id = 'show-marker';
    const label = document.createElement('label');
    label.append(document.createTextNode('マーカーを表示する'));
    label.htmlFor = input.id;
    items.append(input, label);
    const onChange = () => {
      if (input.checked) {
        hotSpots.forEach((hotSpot) => {
          viewer.addHotSpot(hotSpot);
        });
      } else {
        hotSpots.forEach((hotSpot) => {
          viewer.removeHotSpot(hotSpot.id);
        });
      }
    };
    input.addEventListener('change', onChange);
  }
  {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = false;
    input.id = 'show-coordinate';
    const label = document.createElement('label');
    label.append(document.createTextNode('画面中心の座標を表示する'));
    label.htmlFor = input.id;
    items.append(input, label);
    const coordinateDiv = document.createElement('div');
    coordinateDiv.classList.add('coordinate');
    const coordinateText = document.createElement('button');
    coordinateText.title = 'クリックでコピー';
    coordinateText.addEventListener('pointerup', () => {
      const text = JSON.stringify({
        yaw: Number(viewer.getYaw().toFixed(3)),
        pitch: Number(viewer.getPitch().toFixed(3)),
        text: 'タイトル',
      });
      navigator.clipboard.writeText(text).then(() => {
        coordinateText.textContent = 'コピーしました';
        setTimeout(showCoordinate, 800);
      });
    });
    coordinateDiv.append(coordinateText, createMarker());
    const showCoordinate = () => {
      coordinateText.textContent = `(${viewer.getYaw().toFixed(2)}, ${viewer
        .getPitch()
        .toFixed(2)})`;
    };
    let frameId = requestAnimationFrame(() => {});
    const onPointerDown = () => {
      const onRendering = () => {
        frameId = requestAnimationFrame(onRendering);
        showCoordinate();
      };
      onRendering();
    };
    const onPointerUp = () => {
      cancelAnimationFrame(frameId);
    };
    const onChange = () => {
      if (input.checked) {
        container.append(coordinateDiv);
        viewer.on('mousedown', onPointerDown);
        viewer.on('mouseup', onPointerUp);
        viewer.on('touchstart', onPointerDown);
        viewer.on('touchend', onPointerUp);
        viewer.on('animatefinished', showCoordinate);
        showCoordinate();
      } else {
        coordinateDiv.remove();
        viewer.off('mousedown', onPointerDown);
        viewer.off('mouseup', onPointerUp);
        viewer.off('touchstart', onPointerDown);
        viewer.off('touchend', onPointerUp);
        viewer.off('animatefinished', showCoordinate);
      }
    };
    input.addEventListener('change', onChange);
  }
  options.append(items, toggle);
  container.append(options);
})();
