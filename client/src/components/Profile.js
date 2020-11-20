import React from 'react'
import { Container } from 'semantic-ui-react'
import ProfileTabs from './Profile/ProfileTabs';
import ProfileLayout from './Profile/ProfileLayout';
import { useSelector } from 'react-redux'


const Profile = () => {
    const authSelector = useSelector(state => state.authentication)
    return (
        <>
            <ProfileLayout username={authSelector.user_name} member_since={authSelector.member_since} last_seen={authSelector.last_seen} points={authSelector.reputation} />
            <Container>
                <ProfileTabs />
            </Container>
        </>
    )
}

export default Profile;
