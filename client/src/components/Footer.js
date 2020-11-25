import React from 'react';
import { Segment, Header, Divider, Grid, Container, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const discoverFooterItems = ["Questions", "Jobs", "Developer Jobs Directory", "Salary Calculators", "Help Me", "Mobile", "Disable Responsiveness"]
    const ProductFooterItems = ["Teams", "Talent", "Advertising", "Enterprise"]
    const CompanyFooterItems = ["About", "Press", "Work Here", "Legal", "Privacy Policy", "Contact Us"]
    const NetworkFooterItems = ["Technology", "life/Arts", "Cultrual/Recreation", "Science", "Other"]
    const FounderFooterItems = ["About Myself", "LinkedIn", "Github", "AngelList", "Website"]
    return (
        <>
            <Segment inverted vertical style={{
                padding: '5em 0em',
                bottom: 0,
                width: '100%',
            }}>
                <Container>

                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Any Questions' />
                                <List link inverted>
                                    {discoverFooterItems.map((footerItem, idx) =>
                                        <List.Item as={Link} key={`${idx}-${footerItem}`} to='/questions'>{footerItem}</List.Item>
                                    )}
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Forums' />
                                <List link inverted>
                                    {ProductFooterItems.map((footerItem, idx) =>
                                        <List.Item as={Link} key={`${idx}-${footerItem}`} to='/users'>{footerItem}</List.Item>
                                    )}
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Community' />
                                <List link inverted>
                                    {CompanyFooterItems.map((footerItem, idx) =>
                                        <List.Item as={Link} key={`${idx}-${footerItem}`} to='/currentUser'>{footerItem}</List.Item>
                                    )}
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Any Questions Network' />
                                <List link inverted>
                                    {NetworkFooterItems.map((footerItem, idx) =>
                                        <List.Item as={Link} key={`${idx}-${footerItem}`} to='/tags'>{footerItem}</List.Item>
                                    )}
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content="Founder's Bio" />
                                <List link inverted>
                                    {FounderFooterItems.map((footerItem, idx) =>
                                        <List.Item as={Link} key={`${idx}-${footerItem}`} to='/currentUser'>{footerItem}</List.Item>
                                    )}
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={15}>
                            site design / logo © 2020 Any Questions Inc; user contributions licensed under cc by-sa. rev 2020.18.8.78932
                            <Divider />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </>
    )
}
export default Footer;
