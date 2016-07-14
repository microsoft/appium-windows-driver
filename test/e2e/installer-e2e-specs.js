import { setupWAD } from '../../lib/installer';
import { exec } from 'teen_process';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(chaiAsPromised);

describe('downloading WAD', () => {
  before(async () => {
    // uninstall WAD first
    try {
      await exec('msiexec', ['/X{DDCD58BF-37CF-4758-A15E-A60E7CF20E41}', '/q']);
    } catch (err) {
      // if we get a 1605 error, that's ok, that means nothing was installed
      // if we get some other kind of error, we should fail this test
      if (err.code === 1603) {
        console.log("You need to be an admin to run this test");
      }
      if (err.code !== 1605) {
        throw err;
      }
    }
  });

  it('should download and validate WinAppDriver', async () => {
    await setupWAD(); // contains its own verification of md5 so not much to do
  });
});