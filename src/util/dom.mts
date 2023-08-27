type Children<T, S extends Node = Node> = Array<
  Element | string | ((parent: T) => Iterable<S>)
>;

const setAttributes = <T extends Element>(
  node: T,
  attrs: Record<string, boolean | string | undefined> | null,
): T => {
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

const setChildren = <T extends Element>(node: T, children: Children<T>): T => {
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

const SVGNS = 'http://www.w3.org/2000/svg';
export const svg = <K extends keyof SVGElementTagNameMap>(
  tagName: K,
  attrs: Record<string, boolean | string | undefined> | null,
  ...children: Children<SVGElementTagNameMap[K]>
): SVGElementTagNameMap[K] => {
  const node = document.createElementNS(SVGNS, tagName);
  return setChildren(setAttributes(node, attrs), children);
};

export const dom = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attrs: Record<string, boolean | string | undefined> | null,
  ...children: Children<HTMLElementTagNameMap[K]>
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tagName);
  return setChildren(setAttributes(node, attrs), children);
};

export const query = (
  selector: string,
  from: HTMLElement = document.documentElement,
) => {
  const element = from.querySelector(selector);
  if (!element) {
    throw new Error(`NoSuchNode: ${selector}`);
  }
  return element as HTMLElement;
};
