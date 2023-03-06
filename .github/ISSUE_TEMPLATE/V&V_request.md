---
name: V&V Request
about: Checklist for V&V
title: 'V&V Request'
labels: 
assignees: '@abbylindsay'

---
***Please title the issue with the detailed study/project name (not just company/hospital name)***

Note: not applicable items will be struck through

**Please explain why a V&V is needed**:

**Will design documentation require revisions?**

**Due date? Justify:**

**File path to V&V document (if exisiting):**

**Additional Comments?**


***V&V Checklist:***

**@biosensics/engineering :** 
- [ ] Team lead determine if full or partial V&V is needed

Server:
- [ ] Request Server ECO number from [Quality](mailto:quality@biosensics.com)
- [ ] APTIBLE_PASSWORD # Aptible bot password
- [ ] SSH_PRIVATE_KEY # SSH private key
- [ ] KNOWN_HOSTS # Known hosts
- [ ] APTIBLE_TEST_SERVER_URL # The TEST server's git remote url on aptible (ends in .git)
- [ ] APTIBLE_TEST_APP_NAME # The TEST server's application name on aptible
- [ ] APTIBLE_PROD_SERVER_URL # The PRODUCTION server's git remote url on aptible (ends in .git)
- [ ] APTIBLE_PROD_APP_NAME # The PRODUCTION server's application name on aptible
- [ ] Create server release issue in server repository using the Release Issue template 
- [ ] Deploy server release candidate to Aptible test server
- [ ] Server ECO Section I submitted to [Quality](mailto:quality@biosensics.com)
- [ ] Server ECO Section I approved
- [ ] Update Server `CHANGELOG.md` "Unreleased" section
- [ ] Confirm any updated Aptible test server configuration values
- [ ] Server link to source code:

Application:
- [ ] Update Application `CHANGELOG.md` "Unreleased" section
- [ ] Create application release issue in application repository using the Release Issue template
- [ ] Link this issue to the correct release version
- [ ] Request App ECO number from [Quality](mailto:quality@biosensics.com)
- [ ] App ECO Section I submitted to [Quality](mailto:quality@biosensics.com)
- [ ] App ECO Section I approved
- [ ] CLI tools set up
- [ ] Confirm internal telehealth meeting room
- [ ] Set GitHub secrets per server configuration values and telehealth meeting room
- [ ] APK connects to server (indicate if Test or Production and record name of CLI tools):
- [ ] Send Application RC build to operations team for V&V
- [ ] App link to source code:

Analyzer Tool:
- [ ] Request ECO number from [Quality](mailto:quality@biosensics.com)
- [ ] ECO Section I submitted to [Quality](mailto:quality@biosensics.com)
- [ ] ECO Section I approved
- [ ] Send Analyzer RC build to operations team for V&V

**@biosensics/operations & @biosensics/quality :**
- [ ] V&V Document Released
- [ ] Complete DCO and submit to [Quality](mailto:quality@biosensics.com)
- [ ] Hexnode portal/policy set up
- [ ] Mobile device operating system is correct
- [ ] Mobile device model is correct (version, iOS/Android, etc.)
- [ ] Sensor firmware is correct
- [ ] Device enrolled in Hexnode
- [ ] Equipment set up for V&V execution
- [ ] Analyzer tool set up for V&V execution
- [ ] Parse account created in correct server
- [ ] Verify if V&V account should be an internal or external Parse account
- [ ] Enter 'study end date' for Parse account in CLI tools (TAK only)
- [ ] List parse account username:

*Ensure all above items have been completed before continuing*

**@biosensics/test-and-manufacturing :**
- [ ] V&V executed
- [ ] Completed V&V submitted to [Quality](mailto:quality@biosensics.com)

**@biosensics/quality :**
- [ ] Approve completed V&V

**@biosensics/engineering :**

Server:
- [ ] Send tagged release source code zip to @biosensics/quality
- [ ] Create server release
- [ ] Deploy server release to Aptible production server
- [ ] Confirm any updated Aptible production server configuration values
- [ ] Merge `release` branch into `develop` on server repository

Application:
- [ ] Merge `release` branch into `master` on Application repository
- [ ] Send release APK and installer to operations and quality for production use


**@biosensics/quality :**
- [ ] App ECO closed & filed to Greenlight Guru
- [ ] Server ECO closed & filed to Greenlight Guru

*Ensure all above items have been completed before continuing*
- [ ] New version approved for customer use

**@biosensics/operations :**
- [ ] Confirm telehealth meeting room on release build
