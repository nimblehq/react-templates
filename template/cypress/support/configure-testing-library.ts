// we are configuring the default lookout of data attribute of
// cypress-testing-library(https://github.com/testing-library/cypress-testing-library).
import { configure } from '@testing-library/cypress';
configure({ testIdAttribute: 'data-test-id' });
