import React from 'react'
import { Divider, Header, Image, Grid, Segment } from 'semantic-ui-react'
import profile_icon from '../../assets/profile.jpg';


const ProfileLayout = ({ username, points }) => (
    <>
      <Segment size='small' padded='very' style={{ width: '85%', margin: 'auto', marginTop: '3em', marginBottom: '3em' }}>
          <Image src={profile_icon} size='mini' /> any questions ?
          <Divider />
          <Grid>
              <Grid.Column floated='left' width={5}>
                  <Header as='h2'>{username}
                      <Header.Subheader>{points}Reputation</Header.Subheader>
                  </Header>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                  <Header>Hello {username}</Header>
              </Grid.Column>
          </Grid>
      </Segment >
    </>
)

export default ProfileLayout
