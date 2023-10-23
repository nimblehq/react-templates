import { InitTemplateOptions } from '../.';
import CopyStrategy from './copyStrategy';
import DownloadStrategy from './downloadStrategy';

export type FetchStrategy = {
  selectedTemplate: string;

  fetchTemplateFiles: (options: InitTemplateOptions) => Promise<void>;
}

export { CopyStrategy, DownloadStrategy };
