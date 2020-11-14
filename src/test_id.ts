
const testIds = [
    'onboarding.welcome.scrollView',
    'onboarding.welcome.button',
] as const;
export type TestID = typeof testIds[number];

export const testId = (testId: TestID) => testId;
