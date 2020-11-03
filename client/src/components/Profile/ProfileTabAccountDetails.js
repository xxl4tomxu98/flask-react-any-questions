import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'semantic-ui-react';
import { usStatesDictionary } from './states.js';
import { specialtyArr } from './specialties.js';
import { patchUser } from '../../store/authentication'

const stateOptions = usStatesDictionary.map(function (state) {
    return { key: state.name, text: state.name, value: state.abbreviation };
});

const specialtyOptions = specialtyArr.map(function (value, index) {
    return { key: `${value}-${index}`, text: value, value: value };
});


const ProfileTabAccountDetail = () => {
    const authSelector = useSelector(state => state.authentication);
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({
        id: authSelector.id,
        user_name: authSelector.user_name,
        city: authSelector.city,
        state: authSelector.state,
        email: authSelector.email,
        tags: authSelector.tags,
        oldPassword: 'password',
        newPassword: ''
    });


    const handleChange = (e, props) => {
        return setFormState({ ...formState, [props.id]: props.value })
    }

    const handleUserUpdate = async (e) => {
        e.preventDefault();
        await dispatch(patchUser(formState));
    }

    return (
        <>
            <h1>Account Updates</h1>
            <Form action='POST' onSubmit={handleUserUpdate} >
                <Form.Input required fluid label='Username' id='user_name' placeholder='Username' defaultValue={authSelector.user_name} onChange={handleChange} />
                <Form.Input required fluid label='City' id='city' placeholder='City' defaultValue={authSelector.city} onChange={handleChange} />
                <Form.Select
                    fluid
                    label='State'
                    id='state'
                    onChange={handleChange}
                    defaultValue={authSelector.state}
                    required
                    options={stateOptions}
                    placeholder='State'
                />
                <Form.Input required label='Email' type='email' id='email' defaultValue={authSelector.email} placeholder='joe@schmoe.com' onChange={handleChange} />
                <Form.Select
                    fluid
                    label='Tags'
                    id='tags'
                    onChange={handleChange}
                    defaultValue={authSelector.tags}
                    required
                    options={specialtyOptions}
                    placeholder='Tags'
                    multiple
                />
                <Form.Group>
                    <Form.Input label='Old Password' type='password' id='oldPassword' defaultValue='password' onChange={handleChange} />
                    <Form.Input label='New Password' type='password' id='newPassword' placeholder='Enter new password' onChange={handleChange} />
                </Form.Group>
                <Form.Button>Submit</Form.Button>
            </Form>
        </>
    )
}
export default ProfileTabAccountDetail
