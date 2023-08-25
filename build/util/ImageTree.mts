import type * as app from '@gjbkz/360image';
import type { FilledImageState } from './ImageState.mjs';
import { ImageState } from './ImageState.mjs';
import { loadGroupConfig } from './loadGroupConfig.mjs';
import { imagesDir } from './files.mjs';

const dirPath = (pagePath: string) => {
  const slashIndex = pagePath.lastIndexOf('/');
  return slashIndex < 0 ? '' : pagePath.slice(0, slashIndex);
};

export class ImageTree {
  private readonly parent: ImageTree | null;
  private readonly leaves = new Map<string, ImageState>();
  public group: Readonly<app.GroupConfig> | null = null;
  private readonly children = new Map<string, ImageTree>();
  private readonly lookup = new WeakMap<ImageTree, string>();

  public constructor(parent: ImageTree | null = null) {
    this.parent = parent;
  }

  private addChild(path: string, child: ImageTree) {
    this.children.set(path, child);
    this.lookup.set(child, path);
  }

  private getLeaf(name: string) {
    name = name.replace(/^.*\//, '');
    let leaf = this.leaves.get(name);
    if (!leaf) {
      leaf = new ImageState(this, name);
      this.leaves.set(name, leaf);
    }
    return leaf;
  }

  public getChildPath(child: ImageTree) {
    const path = this.lookup.get(child);
    if (!path) {
      throw new Error('NoChild');
    }
    return path;
  }

  private get path(): string {
    const { parent } = this;
    return parent ? parent.getChildPath(this) : '';
  }

  public get fullPath(): string {
    let result = this.path;
    const parentFullPath = this.parent?.fullPath;
    if (parentFullPath) {
      result = `${parentFullPath}/${result}`;
    }
    return result;
  }

  private getChild(name: string): ImageTree {
    let child = this.children.get(name);
    if (!child) {
      child = new ImageTree(this);
      this.addChild(name, child);
    }
    return child;
  }

  private getNode(path: string): ImageTree {
    if (path === '') {
      return this;
    }
    let slashIndex = path.indexOf('/');
    if (slashIndex < 0) {
      slashIndex = path.length;
    }
    const child = this.getChild(path.slice(0, slashIndex));
    return child.getNode(path.slice(slashIndex + 1));
  }

  private loadGroupConfig() {
    const jsonPath = new URL(`${this.fullPath}/group.json`, imagesDir);
    this.group = loadGroupConfig(jsonPath);
    return this;
  }

  public add(relativeFilePath: string) {
    if (relativeFilePath.endsWith('/group.json')) {
      const path = relativeFilePath.slice(0, -'/group.json'.length);
      this.getNode(path).loadGroupConfig();
      return null;
    }
    const ext = relativeFilePath.slice(relativeFilePath.lastIndexOf('.'));
    const pagePath = relativeFilePath.slice(0, -ext.length);
    const node = this.getNode(dirPath(pagePath));
    const leaf = node.getLeaf(pagePath);
    leaf.add(pagePath, ext);
    return leaf.filled;
  }

  private get sortedChildren(): Array<[string, ImageTree]> {
    return [...this.children.entries()].sort((a, b) =>
      a[0].localeCompare(b[0]),
    );
  }

  public *groupLeaves(): Generator<
    [FilledImageNode | null, Array<FilledImageState>]
  > {
    const leaves: Array<FilledImageState> = [];
    for (const [, child] of this.sortedChildren) {
      for (const entry of child.groupLeaves()) {
        if (entry[0]) {
          yield entry;
        } else {
          leaves.push(...entry[1]);
        }
      }
    }
    for (const { filled } of this.leaves.values()) {
      if (filled) {
        leaves.push(filled);
      }
    }
    if (0 < leaves.length) {
      yield [
        this.group ? (this as FilledImageNode) : null,
        leaves.sort((a, b) => a.name.localeCompare(b.name)),
      ];
    }
  }

  public get title(): string {
    const { group, parent } = this;
    let result = group ? group.title : '';
    if (parent) {
      result = `${parent.title} ${result}`;
    }
    return result.trim();
  }
}

export interface FilledImageNode extends ImageTree {
  readonly group: Readonly<app.GroupConfig>;
}
