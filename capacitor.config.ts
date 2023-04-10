import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'E-Work Request',
  webDir: 'build',
  bundledWebRuntime: true,
  server: {
    cleartext: true
  }
};

export default config;
