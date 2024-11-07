import { Alert, Linking, Platform, } from 'react-native';
import { requestMultiple, PERMISSIONS, check, RESULTS } from 'react-native-permissions';

export async function checkPermission() {

  const permissions =
    Platform.OS === 'ios'
      ? [PERMISSIONS.IOS.CAMERA]
      : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.READ_SMS, PERMISSIONS.ANDROID.RECEIVE_SMS,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      ];
  // Call our permission service and check for permissions

  const isPermissionGranted = await checkMultiplePermissions(permissions);
  console.log("isPermissionGranted..." + isPermissionGranted);
  if (!isPermissionGranted) {
    // Show an alert in case permission was not granted
    Alert.alert(
      'Permission Request',
      'Please allow requested permission',
      [
        {
          text: 'Go to Settings',
          onPress: () => {
            Linking.openSettings();
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }
  return isPermissionGranted;
};

export async function checkMultiplePermissions(permissions) {
  let isPermissionGranted = false;
  const statuses = await requestMultiple(permissions);
  for (var index in permissions) {
    console.log("permission name." + permissions[index]);
    console.log("status..." + index + statuses[permissions[index]])
    if (statuses[permissions[index]] === RESULTS.GRANTED||statuses[permissions[index]] === RESULTS.UNAVAILABLE) {
      isPermissionGranted = true;
    } else {
      isPermissionGranted = false;
      break;
    }
  }
  return isPermissionGranted;
}

