cd /home/lito/remoteProjects/tomamosunaApp/
rm -rf ./platforms/android/build/outputs/apk/tomamosuna.apk
cordova build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./my-release-key.keystore ./platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk alias_name
