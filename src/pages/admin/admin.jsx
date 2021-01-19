import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'

export default class Admin extends Component {

    render() {
        const user = memoryUtils.user
        if(!user || !user.nickname) {
            return <Redirect to='/login/' />
        }
        return (
            <div>Admin,hello {user.nickname}</div>
        )
    }
}