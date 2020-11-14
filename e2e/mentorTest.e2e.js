import { testId } from '../src/test_id'

describe('Mentor', () => {
    beforeEach(async () => {
      await device.reloadReactNative();
    });

    it('can login', async () => {
      // Detox will wait forever after tapping login button without this
      await device.disableSynchronization();
      await element(by.id(testId('onboarding.welcome.scrollView'))).scrollTo('bottom');
      await element(by.id(testId('onboarding.welcome.button'))).tap();
    });

  });
  