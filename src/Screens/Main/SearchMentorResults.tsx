import React from 'react';
import RN from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-navigation';

import * as navigationProps from '../../lib/navigation-props';

import * as mentorApi from '../../api/mentors';

import MentorTitle from '../components/MentorTitle';
import MentorStory from '../components/MentorStory';
import Skills from '../components/Skills';
import Message from '../components/Message';
import getBuddyColor from '../components/getBuddyColor';
import Button from '../components/Button';
import colors, { gradients } from '../components/colors';
import fonts from '../components/fonts';

import { MentorCardExpandedRoute } from './MentorCardExpanded';
import MentorListComponent from '../components/MentorList';
import TitledContainer from '../components/TitledContainer';
import { textShadow } from '../components/shadow';


const langMap: Record<string, RN.ImageSourcePropType> = {
  Finnish: require('../images/flags/fi.svg'),
  Italian: require('../images/flags/it.svg'),
  English: require('../images/flags/gb.svg'),
  Swedish: require('../images/flags/se.svg'),
  Russian: require('../images/flags/ru.svg'),
};

export type SearchMentorResultsRoute = {
  'Main/SearchMentorResults': { skills: any };
};

type OwnProps = navigationProps.NavigationProps<
SearchMentorResultsRoute,
MentorCardExpandedRoute
>;

type Props = OwnProps;

const SearchMentorResults = ({ navigation }: Props) => {
  const skills = navigation.getParam('skills');
  // console.log("SKILLLSLSLSLLSLSLS",skills)
  // const color = getBuddyColor(mentor.buddyId);
  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressMentor = (mentor: mentorApi.Mentor) => {
    navigation.navigate('Main/MentorCardExpanded', { mentor });
  };
  // const navigateToChat = () => {
  //   navigation.navigate('Main/Chat', { buddyId: mentor.buddyId });
  // };
  return (
    <TitledContainer
      TitleComponent={
        <RN.View style={styles.blobTitle}>

          <RN.TouchableOpacity style={styles.chevronButton} onPress={onPressBack}>
            <RN.Image
              source={require('../images/chevron-left.svg')}
              style={styles.chevronIcon}
            />
          </RN.TouchableOpacity>
          <Message id="main.searchMentor.title" style={styles.screenTitleText} />
        </RN.View>
      }
      gradient={gradients.pillBlue}
    >
      <RN.View style={styles.results}></RN.View>
        <MentorListComponent skills={skills} onPress={onPressMentor} />
      
      </TitledContainer>
    // </LinearGradient>
  );
};

const styles = RN.StyleSheet.create({
  results: {
    marginTop: 20,
  },
  screenTitleText: {
    marginTop: 16,
    marginBottom: 16,
    ...fonts.titleLarge,
    ...textShadow,
    textAlign: 'center',
    color: colors.white,
  },
  chevronButton: {
    marginRight: 0,
    marginLeft: 0,
  },
  chevronIcon: {
    tintColor: colors.white,
    width: 48,
    height: 48,
    marginLeft: -40,
    marginTop: -8,
  },
  blobTitle: {
    // borderBottomRightRadius: cardBorderRadius,
    // borderBottomLeftRadius: cardBorderRadius,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  mentorTitle: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  scrollContent: {
    paddingHorizontal: 24,
    justifyContent: 'space-evenly',
    flexGrow: 1,
    paddingBottom: 40,
  },
  flagContainer: {
    alignSelf: 'stretch',
    marginTop: 32,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flag: {
    borderRadius: 24,
    marginRight: 16,
    width: 48,
    height: 48,
  },
  subtitle: {
    ...fonts.largeBold,
    color: colors.deepBlue,
    textAlign: 'left',
  },
  story: {
    marginTop: 16,
  },
  skills: {
    marginTop: 24,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: 24,
    marginHorizontal: 24,
  },
});

export default SearchMentorResults;
