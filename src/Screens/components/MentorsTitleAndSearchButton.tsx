import React from 'react';
import RN from 'react-native';

import MessageButton from '../components/MessageButton';
import colors from '../components/colors';
import fonts from '../components/fonts';
import { textShadow } from '../components/shadow';


import * as localization from '../../localization';

interface Props extends RN.TextProps {
  id: localization.MessageId;
  onPress: () => void | undefined;
}

const MentorsTitleAndSearchButton = ({ id, onPress, ...textProps }: Props) => (
  <RN.View>
    <RN.Text {...textProps}>{localization.trans(id)}</RN.Text>
    <MessageButton
            style={styles.deleteAccountButton}
            onPress={onPress}
            messageId={'main.mentorsTitleAndSearchButton.search'}
            testID={'main.mentorsTitleAndSearchButton.search'}
          />
  </RN.View>
  
);


export default MentorsTitleAndSearchButton;

const styles = RN.StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    backgroundColor: colors.danger,
  },
  screenTitleText: {
    marginTop: 16,
    marginBottom: 16,
    ...fonts.titleLarge,
    ...textShadow,
    textAlign: 'center',
    color: colors.white,
  },
  scrollView: {
    zIndex: 1,
    marginTop: -32,
  },
  scrollContent: {
    paddingTop: 48,
    paddingHorizontal: 24,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    ...fonts.largeBold,
    color: colors.deepBlue,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
  },
  deleteAccountButton: { backgroundColor: colors.danger, marginBottom: 40 },
  cancelButton: { backgroundColor: colors.gray, marginBottom: 40 },
});
