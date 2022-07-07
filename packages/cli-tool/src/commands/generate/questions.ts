import getChoices from '../../helpers/choices';
import { UI_FRAMEWORK_OPTIONS } from './ui-framework/index';
import { VERSION_CONTROL_OPTIONS } from './version-control';

const uiFrameworkChoices = getChoices(UI_FRAMEWORK_OPTIONS);
const versionControlChoices = getChoices(VERSION_CONTROL_OPTIONS);

export const questions = [
  {
    type: 'list',
    name: 'versionControl',
    message: 'Select a version control service:',
    choices: versionControlChoices,
  },
  {
    type: 'list',
    name: 'uiFramework',
    message: 'Select a UI Framework:',
    choices: uiFrameworkChoices,
  },
];
