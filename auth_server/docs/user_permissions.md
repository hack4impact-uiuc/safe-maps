---
name: User Permissions
route: /user_permissions
---

import { Playground } from 'docz'
import Box from './box'
import Container from './container'
import Arrow from './arrow'

# User Permissions

<Container>
    <Box borderColor="black" text="Client"/>
    <Container orientation="column">
        <Arrow scale=".5">
            <div>
                jwt
            </div>
        </Arrow>
        <Arrow inverseArrow={true} scale=".5">
            <div>
                {'{...data} and jwt'}
            </div>
        </Arrow>
    </Container>
        <Box borderColor="black" text="API"/>
    <Container orientation="column">
        <Arrow scale=".5">
            <div>
                jwt
            </div>
        </Arrow>
        <Arrow inverseArrow={true} scale=".5">
            <div>
                {'{userLevel, ...} and jwt'}
            </div>
        </Arrow>
    </Container>
    <Box borderColor="black" text="Auth Server"/>
</Container>

Users should be allowed to change the persmission levels of other users if the user has the correct clearance.
Permission levels are associated with a role/title (ex. admin, general user).
All users with the same title have the same permissions and vice-versa.

The auth server maintains the userIDs and role/title associated with each user.

The JSON Web Token(JWT) will encode the userID. and the front-end exchanges this token with the API in the back-end in exhcange for resources.

The back-end devs dictate how the data is limited by roles (ex. general users are not given write access to certain resources, etc).

The back-end should always validate this token with the auth server, which in turn returns the decoded information of the user ID and user role.

The API uses its own discretion on how to serve data based on the user role.

# Endpoints

<Container orientation="column">
    <Container jC="space-between">
        <Box borderColor="black" text="GET /roles"/>
        <Arrow scale=".75">
            <div style={{padding: '.5rem'}}>
                {'{\'generalUser\': 10,\'superAdmin\': -1, ...}'}
            </div>
        </Arrow>
        <Box borderColor="black" text="Client"/>
    </Container>
        <Container jC={'space-between'}>
        <Box borderColor="black" text="POST /roleChange"/>
        <Container orientation="column">
            <Arrow scale=".5">
                <div style={{padding: '.5rem'}}>
                    Success OR list of failed level changes [userID1,userID2,...]
                </div>
            </Arrow>
                    <Arrow inverseArrow={true} scale=".5">
                <div style={{padding: '.5rem'}}>
                    {'{userID: role, userID2: role2, ...}'}
                </div>
            </Arrow>
        </Container>
        <Box borderColor="black" text="Client"/>
    </Container>
</Container>

The Keys are the role/title names and the values are their precedence values. The lower the precedence value a role has, the higher clearance/authority the is given to the role.
The heirarchy of the roles is defined as follows:

(Promotion is moving a user's role to a role with a lower "x" precedence. Demotion is moving a user's role to a higher "x" precedence.)

Roles with precedence "x" can only promote users up to roles with precedence "x" or higher.

Roles with precedence "x" can only demote users with roles of precedence "x" or higher.

## Setting User Permission Workflow

### Step 1: Create the Config File

Here's an example:

```roles:
    root:
        - admin
        - supervisor
        - guest
    admin:
        - supervisor
        - guest
    supervisor:
        - guest
    guest:
```

### Step 2: Run the command

npm run
