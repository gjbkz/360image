import type { Marker, ViewerConfig } from '../../src/util/app.mjs';
import type { ImageTree } from './ImageTree.mjs';
import { imagesDir } from './files.mjs';
import { loadViewerConfig } from './loadViewerConfig.mjs';

export class ImageState {
  public readonly parent: ImageTree;
  public readonly name: string;
  public config: Readonly<ViewerConfig> | null = null;
  private image = false;

  public constructor(parent: ImageTree, name: string) {
    this.parent = parent;
    this.name = name;
  }

  public get htmlPath(): string {
    const { fullPath } = this.parent;
    let result = `${this.name}.html`;
    if (fullPath) {
      result = `${fullPath}/${result}`;
    }
    return result;
  }

  public get filled(): FilledImageState | null {
    return this.image && this.config ? (this as FilledImageState) : null;
  }

  public add(basePath: string, ext: string) {
    if (ext === '.jpg') {
      this.image = true;
    } else if (ext === '.json') {
      this.config = loadViewerConfig(new URL(`${basePath}${ext}`, imagesDir));
    } else {
      throw new Error(`UnexpectedFile: ${basePath}${ext}`);
    }
  }

  public *listMarkers(): Generator<Marker> {
    const { config } = this;
    if (config) {
      const ignored = [...'東西南北'];
      for (const marker of config.markers) {
        if (!ignored.includes(marker.text)) {
          yield marker;
        }
      }
    }
  }
}

export interface FilledImageState extends ImageState {
  readonly config: Readonly<ViewerConfig>;
}
