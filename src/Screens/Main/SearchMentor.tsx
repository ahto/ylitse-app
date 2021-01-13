import React from 'react';
import RN, { Alert } from 'react-native';
import * as redux from 'redux';
import { useSelector, useDispatch } from 'react-redux';
// import * as O from 'fp-ts/lib/Option';
import * as RD from '@devexperts/remote-data-ts';

import * as navigationProps from '../../lib/navigation-props';

import * as topicApi from '../../api/topic-storage';
// import { storeTopic } from '../../state/reducers/topic';
import * as actions from '../../state/actions';

// import Background from '../components/Background';
// import Card from '../components/Card';
import fonts from '../components/fonts';
import Message from '../components/Message';
import shadow from '../components/shadow';

import MessageButton from '../components/MessageButton';
import TextButton from '../components/TextButton';
import TitledContainer from '../components/TitledContainer';
import { textShadow } from '../components/shadow';
import colors, { gradients } from '../components/colors';
import NamedInputField from '../components/NamedInputField';

import { SafeAreaView } from 'react-navigation';

// import { TabsRoute } from '../Main/Tabs';
// import navigateMain from '../Onboarding/navigateMain';

import * as mentorState from '../../state/reducers/mentors';
import RemoteData from '../components/RemoteData';
// import * as mentorApi from '../../api/mentors';
import { SearchMentorResultsRoute } from './SearchMentorResults';
import useLayout from '../../lib/use-layout';

export type SearchMentorRoute = {
  'Main/SearchMentor': {};
};

type Props = navigationProps.NavigationProps<SearchMentorRoute, SearchMentorResultsRoute>;

function uniq(a: Iterable<string> | null | undefined) {
  return Array.from(new Set(a));
}

export default ({ navigation }: Props) => {
  const [selectedSkills, selectSkill] = React.useState({selected: []});
  const [skillSearch, setSkillSearch] = React.useState('');

  console.log("selectedSkills", selectedSkills);

  const dispatch = useDispatch<redux.Dispatch<actions.Action>>();
  const fetchMentorsasdasdad = () => {
    console.log("fetchMentorsasdasdad");
    //dispatch({ type: 'mentors/start', payload: undefined });
  };

  const skillsList = RD.remoteData.map(useSelector(mentorState.get), mentors =>
    mentors.map(mentor => mentor.skills) // collect all skills
    .flat() // flatten results into one array
    .filter((item,index,self) => self.indexOf(item)==index) // remove duplicates
    .filter((e)=>(skillSearch ? e.toLowerCase().includes(skillSearch.toLowerCase()):true)) // skill searching
    .sort() // simple alphabetical sort
  );
  console.log('skillsList');
  console.log(skillsList);

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

  const onPressBack = () => {
    navigation.goBack();
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

  const onPressReset = () => {
    setSkillSearch('');
    selectSkill({selected: []})
  };

  const [{ width, height }, onLayout] = useLayout();

  const measuredWidth = width || RN.Dimensions.get('window').width;

  const interval = measuredWidth * (0.85 + 0.15 / 4);

  const deccelerationRate = RN.Platform.OS === 'ios' ? 0.99 : 0.8;

  

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

      <RN.View style={{
        flexDirection: "row"
      }}>
        <RN.TextInput
          style={styles.searchField}
          editable={true}
          onChangeText={setSkillSearch}
          value={skillSearch}
        />
            <RN.Image style={styles.icon} source={require('../images/search.svg')} resizeMode="stretch"
          resizeMethod="scale" />
      </RN.View>


      <RemoteData data={skillsList} fetchData={fetchMentorsasdasdad}>
        {skills => (
          <RN.View style={styles.carouselContainer}>
            <RN.FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={true}
              initialNumToRender={2}
              // decelerationRate={deccelerationRate}
              // snapToInterval={interval}
              contentContainerStyle={{
                padding: 0,
                margin: 0,
                width: 100,
              }}
              data={[...skills]}
              renderItem={renderSkillButton(200, 200, (item) => {return selectedSkills.selected.includes(item)}, (item) => {onPressSkill(item)})}
              keyExtractor={(item) => item}
              // horizontal={true}
              // testID={'components.mentorList'}
            />
          </RN.View>
        )}
      </RemoteData>
      <RN.View style={styles.searcResetContainer}>
        <MessageButton
            style={styles.resetButton}
            messageStyle={styles.resetButtonText}
            onPress={onPressReset}
            messageId={'main.mentorsTitleAndSearchButton.reset'}
            testID={'main.mentorsTitleAndSearchButton.reset'}
          />
        <MessageButton
            style={styles.searchButton}
            onPress={onPressSearch}
            messageId={'main.mentorsTitleAndSearchButton.search'}
            testID={'main.mentorsTitleAndSearchButton.search'}
          />
          
          </RN.View>
    </TitledContainer>
  );
};

const renderSkillButton = (
  maxHeight: number,
  screenWidth: number,
  isSelected: (skill: any) => boolean,
  onPressSkill: (skill: any) => void | undefined,
) => ({ item }: { item: any }) => (
  <TextButton
            style={ isSelected(item) ? styles.deleteAccountButtonSelected : styles.deleteAccountButton}
            onPress={() => onPressSkill(item)}
            text={item}
            textStyle={styles.deleteAccountButtonText}
            // testID={'main.mentorsTitleAndSearchButton.search'}
          />
  
);

const styles = RN.StyleSheet.create({
  icon: {
    tintColor: colors.faintBlue,
    height: 20,
    width: 20,
  },
  searchField: {
    width: 400,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#EBF2F8',
  },
  chevronButton: {
    marginRight: 0,
    marginLeft: 0,
  },
  chevronIcon: {
    tintColor: colors.white,
    width: 48,
    height: 48,
  },
  safeArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  blobTitle: {
    // borderBottomRightRadius: cardBorderRadius,
    // borderBottomLeftRadius: cardBorderRadius,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
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
    flexGrow: 1,
  },
  carouselContainer: {
    flex: 1, 
    flexDirection: 'row',
  },
  scrollContainer: { paddingHorizontal: 16 },
  deleteAccountButton: { backgroundColor: '#9FE1F5', 
  flex: 1,
  // height: 100;
  // margin-bottom: 2%; 
},
  deleteAccountButtonSelected: { backgroundColor: '#00BEEA'},
  deleteAccountButtonText: {},
  searchButton: { backgroundColor: '#A2CD84', marginBottom: 40 },

  resetButton: { backgroundColor: '#EEF4F9', marginBottom: 40 },
  resetButtonText: { color: '#003A6E' },
  searcResetContainer: {
    flexDirection: "row",
  }
  
});
