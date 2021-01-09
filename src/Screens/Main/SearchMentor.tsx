import React from 'react';
import RN from 'react-native';
import * as redux from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as O from 'fp-ts/lib/Option';
import * as RD from '@devexperts/remote-data-ts';

import * as navigationProps from '../../lib/navigation-props';

import * as topicApi from '../../api/topic-storage';
import { storeTopic } from '../../state/reducers/topic';
import * as actions from '../../state/actions';

import Background from '../components/Background';
import Card from '../components/Card';
import fonts from '../components/fonts';
import Message from '../components/Message';
import shadow from '../components/shadow';

import MessageButton from '../components/MessageButton';
import TextButton from '../components/TextButton';
import TitledContainer from '../components/TitledContainer';
import { textShadow } from '../components/shadow';
import colors, { gradients } from '../components/colors';
import NamedInputField from '../components/NamedInputField';


import { TabsRoute } from '../Main/Tabs';
import navigateMain from '../Onboarding/navigateMain';

import * as mentorState from '../../state/reducers/mentors';
import RemoteData from '../components/RemoteData';
import * as mentorApi from '../../api/mentors';
import { SearchMentorResultsRoute } from './SearchMentorResults';


const topics: topicApi.Topic[] = [
  'Lastensuojelu',
  'Lasinen lapsuus',
  'Vanhemmat lastensuojelussa',
];

export type SearchMentorRoute = {
  'Main/SearchMentor': {};
};

type Props = navigationProps.NavigationProps<SearchMentorRoute, SearchMentorResultsRoute>;

export default ({ navigation }: Props) => {
  const [selectedSkills, selectSkill] = React.useState({selected: []});
  const [skillSearch, setSkillSearch] = React.useState('');

  console.log("selectedSkills", selectedSkills);

  const dispatch = useDispatch<redux.Dispatch<actions.Action>>();
  const fetchMentors = () => {
    dispatch({ type: 'mentors/start', payload: undefined });
  };

  const skillsList = RD.remoteData.map(useSelector(mentorState.get), mentors =>
    mentors.map(mentor => mentor.skills).flat().filter((e)=>(skillSearch ? e.toLowerCase().includes(skillSearch.toLowerCase()):true)),
  );
  // console.dir(mentorList);

  // const select = (topic: O.Option<topicApi.Topic>) => () => {
  //   dispatch(storeTopic(topic));
  //   navigateMain(navigation);
  // };

  const search = "";

  const onFilter = () => {
    console.log('onFilter');
  };

  const onPressSearch = () => {
    console.log('onPressSearch');
    navigation.navigate('Main/SearchMentorResults', { skills: selectedSkills.selected });
  };

  const onPressSkill = (item: any) => {
    let s = selectedSkills.selected.slice();
    if(s.includes(item)){
      const filteredAry = s.filter(e => e !== item)
      selectSkill({selected: filteredAry});
    }else{
      s.push(item);
      selectSkill({selected: s});
    }
  }

  

  return (
    <TitledContainer
      TitleComponent={
        <Message id="main.searchMentor.title" style={styles.screenTitleText} />
      }
      gradient={gradients.pillBlue}
    >
      <RN.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        testID={'main.searchMentor.view'}
      >
        <NamedInputField
                // style={styles.field}
                name="main.searchMentor.skillSearch.title"
                value={skillSearch}
                onChangeText={setSkillSearch}
                testID="main.settings.account.email.input"
              />
      <RemoteData data={skillsList} fetchData={fetchMentors}>
        {skills => (
          <RN.View style={styles.carouselContainer}>
            <RN.FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              initialNumToRender={2}
              // decelerationRate={deccelerationRate}
              // snapToInterval={interval}
              // contentContainerStyle={{
              //   paddingLeft: (0.15 / 2) * measuredWidth,
              // }}
              data={[...skills]}
              renderItem={renderSkillButton(200, 200, (item) => {return selectedSkills.selected.includes(item)}, (item) => {onPressSkill(item)})}
              keyExtractor={(item) => item}
              horizontal={true}
              // testID={'components.mentorList'}
            />
          </RN.View>
        )}
      </RemoteData>
      <MessageButton
            style={styles.deleteAccountButton}
            onPress={onPressSearch}
            messageId={'main.mentorsTitleAndSearchButton.search'}
            testID={'main.mentorsTitleAndSearchButton.search'}
          />
      </RN.ScrollView>
    </TitledContainer>
    // <Background testID="onboarding.selectTopic.view">
    //     <Message
    //       style={styles.title}
    //       id="onboarding.selectTopic.title"
    //       testID="onboarding.selectTopic.title"
    //     />
    //     <Message style={styles.subtitle} id="onboarding.selectTopic.subtitle" />
    //     {topics.map(topic => (
    //       <TextButton
    //         key={topic}
    //         text={topic}
    //         style={styles.button}
    //         textStyle={styles.buttonText}
    //         onPress={select(O.some(topic))}
    //       />
    //     ))}
    //     <MessageButton
    //       style={styles.skipButton}
    //       messageStyle={styles.buttonText}
    //       messageId="onboarding.selectTopic.skip"
    //       onPress={select(O.none)}
    //       testID="onboarding.selectTopic.skip"
    //     />
    // </Background>
  );
};

const renderSkillButton = (
  maxHeight: number,
  screenWidth: number,
  isSelected: (skill: any) => boolean,
  onPressSkill: (skill: any) => void | undefined,
) => ({ item }: { item: any }) => (
  // <MentorCard
  //   style={[
  //     styles.card,
  //     {
  //       maxHeight: maxHeight - mentorCardBottomMargin,
  //       width: screenWidth * 0.85,
  //       marginRight: (0.15 / 4) * screenWidth,
  //     },
  //   ]}
  //   mentor={item}
  //   onPress={onPress}
  // />
  <TextButton
            style={ isSelected(item) ? styles.deleteAccountButtonSelected : styles.deleteAccountButton}
            onPress={() => onPressSkill(item)}
            text={item}
            // testID={'main.mentorsTitleAndSearchButton.search'}
          />
  
);

const styles = RN.StyleSheet.create({
  card: {
    padding: 24,
    alignSelf: 'stretch',
  },
  title: {
    ...fonts.titleBold,
    textAlign: 'center',
  },
  subtitle: {
    ...fonts.small,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonText: { ...fonts.titleBold, textAlign: 'center', color: colors.black },
  button: {
    minHeight: 64,
    marginBottom: 16,
    marginHorizontal: 16,
    backgroundColor: colors.blue60,
    justifyContent: 'center',
    ...shadow(7),
  },
  skipButton: {
    minHeight: 64,
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.faintGray,
    justifyContent: 'center',
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
    paddingBottom: 320,
    paddingHorizontal: 16,
  },
  mentorListContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    alignSelf: 'stretch',
  },
  carouselContainer: {
    flex: 1,
  },
  scrollContainer: { paddingHorizontal: 16 },
  deleteAccountButton: { backgroundColor: colors.danger, marginBottom: 40 },
  deleteAccountButtonSelected: { backgroundColor: colors.darkBlue, marginBottom: 40 },
});
