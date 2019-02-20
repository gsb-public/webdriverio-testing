# In folder 

 - npm-bundle
 - zip -r tests gsb-devicetest-v4-1.0.0.tgz

# In device farm 'testspec.yml' (it walks you through the steps to build)

```
version: 0.1


# Phases are collection of commands that get executed on Device Farm.
phases:
  # The install phase includes commands that install dependencies that your tests use.
  # Default dependencies for testing frameworks supported on Device Farm are already installed.
  install:
    commands:
     # By default, this testspec file uses Appium server version 1.9.1 which is a prerequisite for iOS 12
      # To use a different appium version, change 'APPIUM_VERSION' below to your desired version.
      # For convenience, we have preinstalled the following versions - 1.6.5, 1.7.1, 1.7.2, 1.8.0, 1.8.1, 1.9.1
      - echo "Chromedriver Version" 
      # - echo $DEVICEFARM_CHROMEDRIVER_EXECUTABLE
      # - export CHROMEDRIVER_VERSION=$DEVICEFARM_CHROMEDRIVER_EXECUTABLE
      - export APPIUM_VERSION=1.10.1
      - avm $APPIUM_VERSION
      - ln -s /usr/local/avm/versions/$APPIUM_VERSION/node_modules/.bin/appium  /usr/local/avm/versions/$APPIUM_VERSION/node_modules/appium/bin/appium.js
      
      # By default the node version installed is 11.4.0
      # you can switch to an alternate node version using below command.
      - nvm install 11.9.0
      
      # Unpackage and install the node modules that you uploaded in the test phase.
      - echo "Navigate to test package directory"
      - cd $DEVICEFARM_TEST_PACKAGE_PATH
      - npm install *.tgz
     
     
  # The pre-test phase includes commands that setup your test environment.
  pre_test:
    commands:
      # We recommend starting appium server process in the background using the command below.
      # Appium server log will go to $DEVICEFARM_LOG_DIR directory.
      # The environment variables below will be auto-populated during run time.
      - >-
        if [ $DEVICEFARM_DEVICE_PLATFORM_NAME = "Android" ];
        then
        echo "Start appium server for android";
        (appium --log-timestamp --log-level debug --browser-name Chrome --device-name $DEVICEFARM_DEVICE_NAME
        --platform-name $DEVICEFARM_DEVICE_PLATFORM_NAME
        --udid $DEVICEFARM_DEVICE_UDID --chromedriver-executable $DEVICEFARM_CHROMEDRIVER_EXECUTABLE  >> $DEVICEFARM_LOG_DIR/appiumlog.txt 2>&1 &);
        fi
        
      # For IOS, Device farm starts the ios-webkit-debug-proxy before starting the appium server.
      # So don't start ios-webkit-debug-proxy in the yaml file.
      # The default WDA used is at DEVICEFARM_WDA_DERIVED_DATA_PATH_V1 (Supports versions iOS 12 and below), it is using commit f865d3. See (https://github.com/appium/appium-xcuitest-driver/tree/f865d32e78a5a8a15469bee30ed2f985d378575d)
      # If you need an older WDA version or need support for node modules, use the WDA at DEVICEFARM_WDA_DERIVED_DATA_PATH_V0. (This version does not suport iOS 12)

      - >-
        if [ $DEVICEFARM_DEVICE_PLATFORM_NAME = "iOS" ];
        then
        echo "Start appium server for iOS";
        (appium --log-timestamp --browser-name Safari --device-name $DEVICEFARM_DEVICE_NAME
        --platform-name $DEVICEFARM_DEVICE_PLATFORM_NAME
        --udid $DEVICEFARM_DEVICE_UDID --automation-name XCUITest
        --default-capabilities "{\"usePrebuiltWDA\": true, \"derivedDataPath\":\"$DEVICEFARM_WDA_DERIVED_DATA_PATH_V1\"}"
        >> $DEVICEFARM_LOG_DIR/appiumlog.txt 2>&1 &);
        fi
        
      - >-
        start_appium_timeout=0;
        while [ true ];
        do
            if [ $start_appium_timeout -gt 60 ];
            then
                echo "appium server never started in 60 seconds. Exiting";
                exit 1;
            fi;
            grep -i "Appium REST http interface listener started on 0.0.0.0:4723" $DEVICEFARM_LOG_DIR/appiumlog.txt >> /dev/null 2>&1;
            if [ $? -eq 0 ];
            then
                echo "Appium REST http interface listener started on 0.0.0.0:4723";
                break;
            else
                echo "Waiting for appium server to start. Sleeping for 1 second";
                sleep 1;
                start_appium_timeout=$((start_appium_timeout+1));
            fi;
        done; 

  # The test phase includes commands that run your test suite execution.
  test:
    commands:
      # Go into the root folder containing your source code and node_modules
      - echo "Navigate to test source code"
      # Change the directory to node_modules folder as it has your test code and the dependency node modules.
      - cd $DEVICEFARM_TEST_PACKAGE_PATH/node_modules/*
      
      - echo "Start Appium Node test"
      # Enter the command below to start the tests . The comamnd should be similar to what you use to run the tests locally.
      # For e.g. assuming you run your tests locally using command "node YOUR_TEST_FILENAME.js.", enter the same command below:
      - npm run devicefarm.browser

  # The post test phase includes are commands that are run after your tests are executed.
  post_test:
    commands:

# The artifacts phase lets you specify the location where your tests logs, device logs will be stored.
# And also let you specify the location of your test logs and artifacts which you want to be collected by Device Farm.
# These logs and artifacts will be available through ListArtifacts API in Device Farm.
artifacts:
  # By default, Device Farm will collect your artifacts from following directories
  - $DEVICEFARM_LOG_DIR
  ```
