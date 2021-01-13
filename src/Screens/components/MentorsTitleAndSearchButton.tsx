import React from 'react';
import RN from 'react-native';

import MessageButton from '../components/MessageButton';
import colors from '../components/colors';
import fonts from '../components/fonts';
import { textShadow } from '../components/shadow';


import * as localization from '../../localization';
import MessageButtonWithIcon from './MessageButtonWithIcon';

interface Props extends RN.TextProps {
  id: localization.MessageId;
  onPress: () => void | undefined;
}

const MentorsTitleAndSearchButton = ({ id, onPress }: Props) => (
  <RN.View style={{
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // alignContent: "center",
    // alignSelf: "center",
  }}>
    <RN.Text style={styles.mentorsTitle}>{localization.trans(id)}</RN.Text>
    <MessageButtonWithIcon
            style={styles.searchButton}
            messageStyle={styles.searchMessage}
            onPress={onPress}
            messageId={'main.mentorsTitleAndSearchButton.search'}
            testID={'main.mentorsTitleAndSearchButton.search'}
          />
  </RN.View>
  
);


export default MentorsTitleAndSearchButton;

const styles = RN.StyleSheet.create({
  searchButton: { backgroundColor: colors.faintGray,
    marginTop: 24,
    marginBottom: 8,
    height: "50%",
    flexDirection: "row",
    justifyContent: "space-between",

  },
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    backgroundColor: colors.danger,
  },
  searchMessage: {
    color: '#003263',
  },
  mentorsTitle: {
    marginTop: 24,
    marginBottom: 8,
    ...fonts.titleLarge,
    ...textShadow,
    color: colors.white,
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
  
});
