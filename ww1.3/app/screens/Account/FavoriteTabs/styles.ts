import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
     container: {
          top: 40,
         flex: 1,
         padding: 20,
         backgroundColor: '#f8f8f8'
     },
     header: {
         fontSize: 24,
         fontWeight: 'bold',
         marginBottom: 20
     },
     autocompleteContainer: {
         marginTop: -50,
         flex: 0,
         width: '100%'
     },
     textInput: {
         fontSize: 18,
         //borderRadius: 15,
         borderColor: '#ddd',
         backgroundColor: '#fff',
         borderWidth: 1,
         padding: 10,
         width: '90%',
     },
     circleAddButton: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#3498db',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 10,
     },
     favoritesList: {
          marginTop: 20,
      },
      favoriteItem: {
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
      },
      favoriteTextContainer: {
          flex: 1,
      },
      favoriteIconContainer: {
          marginRight: 10,
      },
      favoriteName: {
          fontSize: 18,
          fontWeight: 'bold',
      },
      favoriteAddress: {
          fontSize: 16,
          color: '#666',
      },
      removeButton: {
          marginLeft: 10,
          padding: 10,
          borderRadius: 5,
          backgroundColor: 'grey',
      },
      tabsContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
      },
      tab: {
          flex: 1,
          padding: 15,
          alignItems: 'center',
          borderBottomWidth: 2,
          borderBottomColor: 'transparent',
      },
      selectedTab: {
          borderBottomColor: 'tomato',
      },
      contentContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
      },
 });
