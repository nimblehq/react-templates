import { InitTemplateOptions } from '../.';
import CopyStrategy from './copyStrategy';
import DownloadStrategy from './downloadStrategy';

export type FetchStrategy = {
  fetchTemplateFiles: (options: InitTemplateOptions) => Promise<void>;
};

export { CopyStrategy, DownloadStrategy };
