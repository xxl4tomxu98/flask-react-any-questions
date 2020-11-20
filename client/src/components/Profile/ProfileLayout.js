import React from 'react'
import { Divider, Header, Image, Grid, Segment } from 'semantic-ui-react'
import profile_icon from '../../assets/profile.jpg';


const ProfileLayout = ({ username, member_since, last_seen, points }) => (
    <>
      <Segment size='small' padded='very' style={{ width: '85%', margin: 'auto', marginTop: '3em', marginBottom: '3em' }}>
          <Image src={profile_icon} floated='left' size='mini' /> any questions ?
          <Divider />
          <Grid>
              <Grid.Column floated='left' width={5}>
                  <Header as='h2'>Hello {username}
                      <Header.Subheader>{points}Reputation</Header.Subheader>
                  </Header>
              </Grid.Column>
              <Grid.Column floated='center' width={5}>
                  <Header>Member Since {member_since}</Header>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                  <Header>Last Time LoggedIn {last_seen}</Header>
              </Grid.Column>

          </Grid>
      </Segment >
    </>
)

export default ProfileLayout
