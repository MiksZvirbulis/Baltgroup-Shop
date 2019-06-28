import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../store/actions'

import config from '../config'

import { Input } from './Input'
import { handleChange } from '../utils/handleChange'
import { handleUnlockCode } from '../utils/handleUnlockCode'
import { updateObject } from '../utils/updateObject'

import { PayPalButton } from 'react-paypal-button-v2'

const initialState = {
    message: null,
    payment: null,
    formValid: false,
    paymentInterval: null
}

class Plugin extends React.Component {
    
    constructor(props) {
        super(props)

        this.initialState = {
            formData: {
                ...this.props.formData,
                code: {
                    attr: {
                        type: "hidden"
                    },
                    value: "",
                    valid: { isValid: null, messages: [] }
                }
            },
            message: null,
            payment: null,
            formValid: false,
            paymentInterval: null
        }

        this.groupTypes = this.props.groupTypes ? [ ...this.props.groupTypes ] : null

        this.state = {
            ...this.initialState
        }
    }

    handleSMS() {
        // This function gets a generated SMS Key from the API and sets an interval that checks if the key has been paid
        this.props.getSMSKey(this.state.formData.price.value)
        clearInterval(this.state.paymentInterval)
        this.setState({ payment: "sms", paymentInterval: setInterval(() => this.props.checkSMSKey("B" + this.props.smsKey), config.CHECK_SMS_KEY_INTERVAL * 1000) })
    }

    handlePayPal() {
        // This function simply sets the payment method to PayPal
        if (this.state.paymentInterval !== false) {
            clearInterval(this.state.paymentInterval)
        }
        this.setState({ payment: "paypal" })
    }

    handleUnlockCode() {
        // This function checks if the interval has come back with an unlock code and updates the form with the unlockCode that was received
        if (this.state.paymentInterval !== false || this.state.payment === "paypal") {
            clearInterval(this.state.paymentInterval)
            const handledUnlockCode = handleUnlockCode(this.state, this.props.unlockCode)
            this.setState(handledUnlockCode.newState, this.handleChange({ id: "code", ...handledUnlockCode.newCodeInput }, this.props.unlockCode ), this.groupTypes)
        }
    }

    handlePayment() {
        // This function checks if the unlockCode matches the price via API and if successful, handles success
        this.props.checkUnlockCode({
            userId: this.props.shop.id,
            price: this.state.formData.price.value,
            unlockCode: this.state.formData.code.value
        }).then(() => {
            if (this.props.unlockCodePaid === true) {
                this.handleSuccess()
            }
        })
    }

    handlePayPalPayment(paymentId) {
        // Handled when received paymentId from PayPal's payment, then calling API for unlockCode and handling when received
        this.props.getPayPalKey(paymentId).then(() => {
            this.handleUnlockCode()
        })
    }

    resetForm() {
        // After success, this resets the form and adds an optional message
        const newState = { ...initialState }
        this.setState(newState)
    }

    setMessage(message, type) {
        const newMessage = updateObject(this.state.message, { text: message, type })
        this.setState({ message: newMessage })
    }

    handleSuccess() {
        // Here we send data to the API, when the payment is confirmed and the form submitted
        let formData = []
        for (let key in this.state.formData) {
            formData.push({ id: key, value: this.state.formData[key].value })
        }
        /*this.props.sendSuccessData(this.props.displayName, {
            unlockCode: this.props.unlockCode,
            ...formData
        })*/
        this.props.resetUnlockCode()
        this.resetForm()
        this.setMessage(this.props.successMessage, "success")
    }

    componentWillReceiveProps() {
        // Checks if unlockCode is finally received and calls for the unlock code handler function
        if (this.props.unlockCode !== null) {
            this.handleUnlockCode()
        }
    }

    handleChange(input, newValue) {
        // Handling changes in the form - inputs, select etc.
        this.setState(handleChange(this.state, input, newValue, this.groupTypes))
        if (this.state.payment === "sms" && input.id === "price") {
            this.props.getSMSKey(newValue)
        }
    }

    render() {
        // Iterating over form inputs found in state and pushing them to an array
        let formData = []
        for (let key in this.state.formData) {
            formData.push({ id: key, ...this.state.formData[key] })
        }
        return (
            <>
                <h3>{this.props.displayName}</h3>
                {/* Display success message only if it has been set in state */}
                {this.state.message ? (
                    <div className={`alert alert-${this.state.message.type}`} role="alert">
                        {this.state.message.text}
                    </div>
                ) : null}
                <form>
                    {formData.map((input, index) => <Input change={(event) => this.handleChange(input, event.target.value)} key={index} {...input} /> )}
                    {/* Display only if payment method is SMS */}
                    {(this.state.payment === "sms" && this.props.smsKey !== null) ?
                    <div className="alert alert-primary" role="alert">
                        {this.props.smsKey === null ? "..." : `Sūti SMS ${this.props.shop.smskey} B${this.props.smsKey} uz numuru 1881.`}<br />
                        <small>Maksa ({this.state.formData.price.value.toFixed(2)} {config.CURRENCY}) tiks pievienota telefona rēķinam vai atrēķināta no priekšapmaksas kartes.</small>
                    </div>
                    : (
                        this.state.payment === "paypal" ?
                        <div className="alert alert-primary" role="alert" style={{textAlign: "center"}}>
                            {/* Display only if payment method is PayPal */}
                            <PayPalButton
                                amount={this.state.formData.price.value.toFixed(2)}
                                onSuccess={ (details, data) => this.handlePayPalPayment(data.id) }
                                onError={ (err) => this.setMessage("There was an error during the payment. Please contact baltGro for more information.", "danger") }
                                onCancel={ (data) => this.setMessage("You cancelled the transaction.", "danger") }
                                options={{
                                    clientId: config.DEBUG ? config.PAYPAL_SANDBOX_ID : config.PAYPAL_PRODUCTION_ID,
                                    currency: config.CURRENCY,
                                    disableFunding: "card"
                                }}
                                style={config.PAYPAL_BTN_STYLE}
                            />
                            <small>Maksa ({this.state.formData.price.value.toFixed(2)} {config.CURRENCY}) tiks atrēķināta no izvēlētā PayPal konta.</small>
                        </div>
                        : ""
                    )
                    }
                    {/* Show buttons only if price has been selected */}
                    {this.state.formData.price.value !== 0 ?
                    (
                        <>
                        {/* Show confirmation button only if unlockCode has been received */}
                        {this.state.formData.code.value ?
                            <button className="btn btn-primary" type="button" onClick={() => this.handlePayment()} disabled={this.state.formValid ? null : "disabled"}>Apstiprināt</button>
                        :
                            (
                                <> {/* Otherwise, show payment method choice */}
                                    <button className="btn btn-primary" type="button" onClick={() => this.handlePayPal()} disabled={this.state.payment === "paypal" ? "disabled" : null}>PayPal</button>
                                    <button className="btn btn-primary" type="button" onClick={() => this.handleSMS()} disabled={this.state.payment === "sms" ? "disabled" : null}>SMS</button>
                                </>
                            )
                        }
                        </>
                    ) : null}
                    
                </form>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        shop: state.shop.shopData,
        smsKey: state.payment.smsKey,
        playerName: state.shop.playerName,
        unlockCode: state.payment.unlockCode,
        unlockCodePaid: state.payment.unlockCodePaid
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSMSKey: price => dispatch(actions.getSMSKey(price)),
        checkSMSKey: SMSKey => dispatch(actions.checkSMSKey(SMSKey)),
        checkUnlockCode: paymentData => dispatch(actions.checkUnlockCode(paymentData)),
        resetUnlockCode: () => dispatch(actions.resetUnlockCode()),
        sendSuccessData: (type, data) => dispatch(actions.sendSuccessData(type, data)),
        getPayPalKey: paymentId => dispatch(actions.getPayPalKey(paymentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plugin)