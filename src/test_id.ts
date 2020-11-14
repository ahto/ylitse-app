
const ids = [
    'onboardingWelcomeScrollView',
    'onboardingWelcomeButton',
] as const;
export type TestID = typeof ids[number];

type ITestIDsMap = {
    [T in TestID]?: TestID;
}

export let testIds: ITestIDsMap = {};
for (let id of ids) {
    testIds[id] = id;
}
