---
guide: https://www.youtube.com/watch?v=tGDn3V-mIOM
OAuth_CLIENT_ID: 932993602522-jo89jsohmefkl3o57ph5id33jll6ughk.apps.googleusercontent.com
OAuth_CLIENT_SECRET: pvf7B1LCf1jjE9Ik8CeyTviU
OAuth_REDIRECT_URI: http://localhost
---

# Get code

https://accounts.google.com/o/oauth2/v2/auth?
scope=https://mail.google.com/&
access_type=offline&
include_granted_scopes=true&
response_type=code&
state=state_parameter_passthrough_value&
redirect_uri=http://localhost&
client_id=932993602522-jo89jsohmefkl3o57ph5id33jll6ughk.apps.googleusercontent.com

# From url take code

?state=state_parameter_passthrough_value&code=4%2F0AY0e-g5xjEVDBV4uQhsfS-54fzTw06nlrWZQcCILS3hKbeRRKfgrwHHH2tlWx-2L4nAQOQ&scope=https%3A%2F%2Fmail.google.com%2F#

> code like this 4%2F0AY0e-g5xjEVDBV4uQhsfS-54fzTw06nlrWZQcCILS3hKbeRRKfgrwHHH2tlWx-2L4nAQOQ

# Get refresh token

> need to use curl

pattern

```
curl \
--request POST \
--data "code=[Authentcation code from authorization link]&client_id=[Application Client Id]&client_secret=[Application Client Secret]&redirect_uri=[redirect uri]&grant_type=authoriza..." \
https://accounts.google.com/o/oauth2/...
```

example:

```
curl \
--request POST \
--data "code=4%2F0AY0e-g4uDlDh5qBfvS35KAjOOWqGwtTIajO5LdeehZuNxvHTiczrIUFLYFWy93O3eal41g&client_id=932993602522-jo89jsohmefkl3o57ph5id33jll6ughk.apps.googleusercontent.com&client_secret=pvf7B1LCf1jjE9Ik8CeyTviU&redirect_uri=http://localhost&grant_type=authorization_code" \
https://oauth2.googleapis.com/token
```

# then take a responce like this
{
"access_token": "ya29.a0AfH6SMDLs47exBLmHTMDSuzIz2qJxIGGZ3zyGFq2fg4bqFzoLXBBFVUjkH6x4Xgj_fv6NWMI65bWl80vjeequRPEZRjdTohqPb5k2JyRz-qtiJHJ3-dedI9r5lnafqeow0pjBsm8EKWp0AgJj7IUuokrNqF6",
"expires_in": 3599,
"refresh_token": "1//0c2paKex5ThfcCgYIARAAGAwSNwF-L9Ir7qJXJHXYcCeXn51k2gfYwxApp5w95WBazq5gXMRuFlYM3SI5Yiyep02UxnvB0eu3_8A",
"scope": "https://mail.google.com/",
"token_type": "Bearer"
}


