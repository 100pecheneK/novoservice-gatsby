---
register: https://console.cloud.google.com/apis/credentials/oauthclient/932993602522-jo89jsohmefkl3o57ph5id33jll6ughk.apps.googleusercontent.com?project=novoservice-312812
guide: https://www.youtube.com/watch?v=tGDn3V-mIOM
OAuth_CLIENT_ID: 1086523655060-oqvc0hgrgeri3aluap8b965run43ork9.apps.googleusercontent.com
OAuth_CLIENT_SECRET: N120IyzjbZNr10WVzzlh_dP_
OAuth_REDIRECT_URI: http://localhost
REFRESH: 1//0cJbBXKK-eGP3CgYIARAAGAwSNwF-L9IrVd56QuKyv3c5fgxaF7nsl5RZM2TceOBtT5_d_7ydETIkawZvxcmQNU09HL2ZBpcQrvg
---

# Get code

https://accounts.google.com/o/oauth2/v2/auth?
scope=https://mail.google.com/&
access_type=offline&
include_granted_scopes=true&
response_type=code&
state=state_parameter_passthrough_value&
redirect_uri=http://localhost&
client_id=778010059769-q478u3fe540ev6au7rhhrm8dpptn2coc.apps.googleusercontent.com
# From url take code

http://localhost/?state=state_parameter_passthrough_value&code=4/0AY0e-g6Vq_wAbmYHf0jBx8mMDYpVEKLlZkPeFt8thFY0fqCv_M0rRM53iv_lYsDe7AwEhg&scope=https://mail.google.com/

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
--data "code=4/0AY0e-g4DWtbpa6oA7Ni1XS96uJzAgBf1I8IiKVcEeNhpWltliJWITChiqu3j4Df7sInf-Q&client_id=778010059769-q478u3fe540ev6au7rhhrm8dpptn2coc.apps.googleusercontent.com&client_secret=3eIA4u7fOTbGzaDEWzHXUgoY&redirect_uri=http://localhost&grant_type=authorization_code" \
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


