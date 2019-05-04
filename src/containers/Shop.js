import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions'

import { Switch, Route } from 'react-router'

import Donate from '../components/Donate'

class Shop extends React.Component {
    componentWillMount () {
        const { shop } = this.props.match.params
        this.props.getShop(shop)
    }

    render() {
        const shop = (
            <div>
                Shop Plugins
                <Route exact path="/flip/donate" component={Donate}/>
            </div>
        )
        return this.props.shop ? shop : "Loading..."
    }
}

const mapStateToProps = state => {
    return {
        shop: state.shop.shopData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getShop: slug => dispatch(actions.getShop(slug))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)