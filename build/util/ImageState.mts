import type { Marker, ViewerConfig } from '../../src/util/app.mjs';
import type { ImageTree } from './ImageTree.mjs';
import { imagesDir } from './files.mjs';
import { PartialViewerConfig, loadViewerConfig } from './loadViewerConfig.mjs';

export class ImageState {
  public readonly parent: ImageTree;
  public readonly name: string;
  public partialConfig: Readonly<PartialViewerConfig> | null = null;
  private imageExt: string | null = null;

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

  public get imagePath(): string {
    const { fullPath } = this.parent;
    let result = `${this.name}${this.imageExt}`;
    if (fullPath) {
      result = `${fullPath}/${result}`;
    }
    return result;
  }

  public get rootPath() {
    return '../'.repeat(this.parent.depth) || './';
  }

  public get filled(): FilledImageState | null {
    if (!this.imageExt) {
      console.info(`NoImageExt: ${this.imagePath}`);
      return null;
    }
    if (!this.partialConfig) {
      console.info(`NoImageConfig: ${this.imagePath}`);
      return null;
    }
    return this as FilledImageState;
  }

  public async add(basePath: string, ext: string) {
    if (ext === '.jpg') {
      this.imageExt = ext;
    } else if (ext === '.json') {
      try {
        this.partialConfig = await loadViewerConfig(
          new URL(`${basePath}${ext}`, imagesDir),
        );
      } catch (error) {
        console.error(`${basePath}${ext}`, error);
      }
    } else {
      console.error(`UnexpectedFile: ${basePath}${ext}`);
    }
  }

  public *listMarkers(): Generator<Marker> {
    const { partialConfig } = this;
    if (partialConfig) {
      const ignored = [...'東西南北'];
      for (const marker of partialConfig.markers) {
        if (!ignored.includes(marker.text)) {
          yield marker;
        }
      }
    }
  }

  public get filename() {
    return `${this.name}${this.imageExt}`;
  }

  public get config(): Readonly<ViewerConfig> | null {
    const { partialConfig, filename } = this;
    if (!partialConfig) {
      return null;
    }
    return { ...partialConfig, filename, location: this.parent.title };
  }
}

export interface FilledImageState extends ImageState {
  readonly config: Readonly<ViewerConfig>;
}
