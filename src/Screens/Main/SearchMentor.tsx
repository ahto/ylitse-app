import React from 'react';
import RN, { Alert } from 'react-native';
// import * as redux from 'redux';
import { useSelector, useDispatch } from 'react-redux';
// import * as O from 'fp-ts/lib/Option';
import * as RD from '@devexperts/remote-data-ts';

import * as navigationProps from '../../lib/navigation-props';

// import * as topicApi from '../../api/topic-storage';
// import { storeTopic } from '../../state/reducers/topic';
// import * as actions from '../../state/actions';

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
// import NamedInputField from '../components/NamedInputField';

// import { SafeAreaView } from 'react-navigation';

// import { TabsRoute } from '../Main/Tabs';
// import navigateMain from '../Onboarding/navigateMain';

import * as mentorState from '../../state/reducers/mentors';
import RemoteData from '../components/RemoteData';
// import * as mentorApi from '../../api/mentors';
import { SearchMentorResultsRoute } from './SearchMentorResults';
// import useLayout from '../../lib/use-layout';
// import { color } from 'react-native-reanimated';
import CreatedBySosBanner from '../components/CreatedBySosBanner';
import { cardBorderRadius } from '../components/Card';
// import { SafeAreaView } from 'react-navigation';

export type SearchMentorRoute = {
  'Main/SearchMentor': {};
};

type Props = navigationProps.NavigationProps<SearchMentorRoute, SearchMentorResultsRoute>;


export default ({ navigation }: Props) => {
  const [selectedSkills, selectSkill] = React.useState<{selected: string[]}>({selected: []})
  const [skillSearch, setSkillSearch] = React.useState('');
  // const [skillSkills, setSkills] = React.useState();


  // console.log("selectedSkills", selectedSkills);

  // const dispatch = useDispatch<redux.Dispatch<actions.Action>>();
  const fetchMentorsasdasdad = () => {
    // console.log("fetchMentorsasdasdad");
    //dispatch({ type: 'mentors/start', payload: undefined });
  };

  const skillsList = RD.remoteData.map(useSelector(mentorState.get), mentors =>
    mentors.map(mentor => mentor.skills) // collect all skills
    .flat() // flatten results into one array
    .filter((item,index,self) => self.indexOf(item)==index) // remove duplicates
    .filter((e)=>(skillSearch ? e.toLowerCase().includes(skillSearch.toLowerCase()):true)) // skill searching
    .sort() // simple alphabetical sort
  );
  // console.log('skillsList');
  // console.log(skillsList);
  // setSkills(skillsList.)

  // const select = (topic: O.Option<topicApi.Topic>) => () => {
  //   dispatch(storeTopic(topic));
  //   navigateMain(navigation);
  // };

  // const search = "";

  // const onFilter = () => {
  //   console.log('onFilter');
  // };

  const onPressSearch = () => {
    // console.log('onPressSearch');
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

  // const [{ width, height }, onLayout] = useLayout();
  // const measuredWidth = width || RN.Dimensions.get('window').width;
  // const maxHeight = height - 180;
  // console.log(height);
  // console.log(maxHeight);

  const maxHeight = RN.Dimensions.get('window').height - 370;

  // {
  //   maxHeight: maxHeight - mentorCardBottomMargin,
  //   width: screenWidth * 0.85,
  //   marginRight: (0.15 / 4) * screenWidth,
  // },
  
  const color = colors.blue60;

  return (
    <TitledContainer 
      TitleComponent={
        <RN.View style={{
          paddingVertical: 16,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // flex: 1,
        }}>
          <RN.TouchableOpacity style={{
            marginRight: 0,
            // marginLeft: -40,
            marginTop: -8,
            flex: 1,
            // width: 40,
          }} onPress={onPressBack}>
            <RN.Image
              source={require('../images/chevron-left.svg')}
              style={{
                tintColor: colors.white,
                width: 48,
                height: 48,
              }}
            />
          </RN.TouchableOpacity>
          <Message id="main.searchMentor.title" style={{
            marginTop: 16,
            marginBottom: 16,
            ...fonts.titleLarge,
            ...textShadow,
            textAlign: 'center',
            color: colors.white,
            flex:6,
          }} />
          <RN.View style={{flex: 1}}></RN.View>
        </RN.View>
      }
      gradient={gradients.pillBlue}
    >

<RN.View  style={{
marginTop: 30,
marginLeft: 30,
marginRight: 30,
// backgroundColor: colors.white,
}}>
      <RN.View  style={{
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 30,
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

      <RN.View>
      <RemoteData data={skillsList} fetchData={fetchMentorsasdasdad}>
        {skills => (
          <RN.View >
            <RN.Image
        style={styles.topGradient}
        source={require('../images/gradient.svg')}
        resizeMode="stretch"
        resizeMethod="scale"
      />
          <RN.ScrollView style={{...styles.carouselContainer,height: maxHeight}}
          showsHorizontalScrollIndicator={true}
          // style={styles.content}
        contentContainerStyle={styles.contentContainer}
          >
            <RN.View   style={styles.chipContainer}>
            {skills.map(skill => {
              const isSelected = selectedSkills.selected.includes(skill);
              // const onPressSkill = (item) => {onPressSkill(item)};

              return <TextButton
              key={skill}
              style={ isSelected ? styles.skillPillButtonSelected : styles.skillPillButton}
              onPress={() => onPressSkill(skill)}
              text={skill}
              textStyle={styles.skillPillButtonText}
              // testID={'main.mentorsTitleAndSearchButton.search'}
            />
            })}
            </RN.View>
          </RN.ScrollView>
          <RN.Image
        style={styles.bottomGradient}
        source={require('../images/gradient.svg')}
        resizeMode="stretch"
        resizeMethod="scale"
      />
          </RN.View>
          
        )}
      </RemoteData>
      </RN.View>
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
          </RN.View>
          <CreatedBySosBanner style={styles.banner} />
    </TitledContainer>
  );
};

const styles = RN.StyleSheet.create({
  name: {
    ...fonts.titleBold,
    flex: 1,
    flexWrap: 'wrap',
  },
  blob: {
    borderBottomRightRadius: cardBorderRadius,
    borderBottomLeftRadius: cardBorderRadius,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topGradient: {
    height: 40,
    tintColor: '#EFF5F9',
    marginBottom: -40,
    width: '100%',
    alignSelf: 'stretch',
    zIndex: 1,
  },
  bottomGradient: {
    height: 40,
    tintColor: '#fff',
    marginTop: -40,
    width: '100%',
    alignSelf: 'stretch',
    transform: [{ rotate: '180deg' }],
    zIndex: 1,
  },
  chipContainer: {
    marginTop: 0,
    marginBottom: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contentContainer: {
    padding: 24,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  carouselContainer: {
    // flex: 1, 
    // flexDirection: 'row',
    // flexWrap: "wrap",
    flexShrink: 1,
    // height: 200,
    
  },
  icon: {
    tintColor: colors.faintBlue,
    height: 35,
    width: 35,
    position: "relative",
    marginLeft: -40,
    marginTop: 3,
    // translateX: -40,
    // translateY: 10,
  },
  searchField: {
    flex: 1,
    // width: measuredWidth,
    borderColor: '#D2D9DE',
    borderWidth: 1,
    backgroundColor: '#EBF2F8',
    borderRadius: 20,
    height: 40,
    // margin: "0 auto",
  },
  chevronButton: {
    marginRight: 0,
    // marginLeft: 0,
    marginLeft: -40,
    marginTop: -8,
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
  // scrollView: {
  //   zIndex: 1,
  //   marginTop: -32,
  // },
  skillPillButton: { 
    backgroundColor: '#9FE1F5',
    margin: 4,
    minHeight: 20,
    // alignSelf: 'stretch',
    // // borderRadius,
    // paddingVertical: 4,
    // paddingHorizontal: 16,
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'column',
    // backgroundColor: colors.blue80,
    // backgroundColor: colors.blue40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
    alignSelf: 'baseline',
    // alignSelf: 'stretch',
    // flexGrow: 1,
    paddingTop: 2,
    paddingBottom: 3,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,

    
},
  skillPillButtonSelected: { 
    backgroundColor: '#00BEEA',
    margin: 4,
    minHeight: 20,
    // alignSelf: 'stretch',
    // // borderRadius,
    // paddingVertical: 4,
    // paddingHorizontal: 16,
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'column',
    // backgroundColor: colors.blue80,
    // backgroundColor: colors.blue40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
    alignSelf: 'baseline',
    // alignSelf: 'stretch',
    // flexGrow: 1,
    paddingTop: 2,
    paddingBottom: 3,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillPillButtonText: {
    // margin: 0,
    // padding: 0,
    color: colors.white,
  },
  searchButton: { backgroundColor: '#A2CD84', marginBottom: 40 },
  resetButton: { backgroundColor: '#EEF4F9', marginBottom: 40 },
  resetButtonText: { color: '#003A6E' },
  searcResetContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    // position: 'absolute', bottom: 16, alignSelf: 'center'
  },
    banner: { 
      // position: 'absolute', 
      bottom: 30, 
      alignSelf: 'center' 
    },

});
