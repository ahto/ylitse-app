#!/usr/bin/env bash

# exit on first error
set -e

tee config.json > /dev/null <<EOF
{
    "baseUrl": "$YLITSE_BASEURL",
    "loginUrl": "$YLITSE_LOGINURL",
    "feedBackUrl": "$YLITSE_FEEDBACKURL",
    "termsUrl": "$YLITSE_TERMSURL",
    "userGuideUrl": "$YLITSE_USERGUIDEURL",
    "messageFetchDelay": $YLITSE_MESSAGEFETCHDELAY
}
EOF

echo "APPCENTER_BUILD_IDAPPCENTER_BUILD_IDAPPCENTER_BUILD_IDAPPCENTER_BUILD_ID"
echo $APPCENTER_BUILD_ID
echo "APPCENTER_BUILD_IDAPPCENTER_BUILD_IDAPPCENTER_BUILD_IDAPPCENTER_BUILD_ID"
