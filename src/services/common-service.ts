import { Alert, BackHandler } from 'react-native';

export const closeApp = () => {
  Alert.alert(
    'Exit App',
    'Are you sure you want to close the application ?',
    [
      { text: 'No', onPress: () => {} },
      { text: 'Yes', onPress: () => BackHandler.exitApp() },
    ],
    { cancelable: true },
  );
  return true;
};

export const confirmationAlert = ({
  title = 'Confirmation',
  desc = 'Are you sure?',
  yes,
  no,
  cancelable = true,
}: {
  title?: string;
  desc?: string;
  yes(): void;
  no(): void;
  cancelable?: boolean;
}) => {
  Alert.alert(
    title,
    desc,
    [
      { text: 'No', onPress: no },
      { text: 'Yes', onPress: yes },
    ],
    { cancelable },
  );
};
