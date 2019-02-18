# In folder 

 - npm-bundle
 - zip -r tests gsb-devicetest-v4-1.0.0.tgz

# In device farm 'testspec.yml' (it walks you through the steps to build)

- Find test command section (around line 89)
  npm run android.browser

TODO:

- Add other devices and test 
- Figure out $DEVICEFARM_LOG_DIR to export screenshots that are made to artifacts bundle


