# Ionic : Coronavirus Tracker app

## How to Run Locally
    1. Clone this repo.
    2. Open a terminal window, and navigate to this repo on the filesystem.
    3. Run "npm install" to install all required project dependencies.
    4. Run "ionic serve / ionic serve --lab" to run the app in a web browser as web locally.

## Android Developmet
Following step to required Andriod Development

### Install Andriod
    # Download Android Studio from the Android website. More detailed installation. instructions can be found in the User Guide.
    # Environment varibale setting
       I Set the ANDROID_SDK_ROOT environment variable. This path should be the Android SDK Location ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
       I have attched the Environment varibale seeting screenshot for the refernces.

    # Creating an Android Virtual Device
       https://ionicframework.com/docs/developing/android#creating-an-android-virtual-device
    # Set up an Android Device
       Actual Android hardware can also be used for Ionic app development. But first, the device must be set up for development
       1. Enable USB debugging on the device. Open Settings, navigate to Developer options, and enable USB debugging. The Developer options menu may need to be enabled first. might be some extra setting also required as per device
       2. Ensure the device has permission to connect to the computer. For Windows, install the OEM USB drivers
       3. open a terminal find reach to the platform-tools path which alraedy in andriod sdk $HOME/Library/Android/sdk/platform-tools
       and enter the command adb devices
       Ex. $HOME/Library/Android/sdk/platform-tools > adb devices 
          Make sure device should be connected to your pc because this will return you list of connected device

### Cordova Setup
    # Java
       Native Android apps are compiled with the Java programming language. Download JDK8 from the site
    # Gradle
       Gradle is the build tool used in Android apps and must be installed separately.
    I have attched the Environment varibale seeting screenshot for the refernces.

### Project Setup
    1. Generate the native project, if it does not already exist.
       For Capacitor, run the following:
       1 ionic capacitor add android
       For Cordova, run the following:
       1. ionic cordova prepare android

### Running with Capacitor
    1. Develop the Ionic app and sync it to the native project.
       Run following command
       ionic capacitor copy android
    2. In Android Studio, click the Run button and then select the target simulator or device.

### Running with Cordova
    ionic cordova run android -l
    Now, when changes are made to the app's source files, web assets are rebuilt and the changes are reflected on the simulator or device without having to deploy again.
    
### Debugging Android Apps
  Once an app is running on an Android device or emulator, it can be debugged with Chrome DevTools.
  Refer this link for more details https://ionicframework.com/docs/developing/android#debugging-android-apps

 
## How to build apk
    1. ionic cordova platform add android
    2. ionic cordova build android --scan


## Reference
https://www.freecodecamp.org/news/how-to-create-corona-tracker-app-in-3-days/