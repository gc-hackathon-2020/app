## Fastlane commands

### Distribution for firebase

#### Requirements

##### Get Firebase token
`npm run [firebase]login`
##### Create file `.env.developemnt` and put corresponding values with your own
```dotenv
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_231.jdk/Contents/Home
TEAM_IDCORDOVA_IOS_TEAM_ID=76LLE95VVQ
ANDROID_APP_ID=1:330447133643:android:2d051b65bd182134b0b44e
IOS_APP_ID=1:330447133643:ios:2028a8a6967e9585b0b44e
GROUP_IOS=ios
GROUP_ANDROID=android
```
##### Install gem dependence's
`bundle install --path ./vendor/bundle`
##### Add ssh key for git
See this [tutorial.](https://confluence.atlassian.com/bitbucket/set-up-ssh-for-git-728138079.html)
##### Install xcode cli tools
`xcode-select --install`

#### Command deployments

##### iOS
`bundle exec fastlane ios firebase --env development`
##### Android
`bundle exec faselane android firebase --env developemnt`
