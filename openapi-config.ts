import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: '',
  apiFile: './lib/store/baseFlexApi.ts',
  apiImport: 'baseFlexApi',
  outputFile: './lib/store/FlexApi.ts',
  exportName: 'FlexApi',
  hooks: {
    queries: true,
    lazyQueries: true,
    mutations: true,
  },
  flattenArg: true,
  useEnumType: true,
};

export default config;
